-- Metademic + RACN — unified Supabase schema (single database)
-- Run in Supabase SQL Editor (project pskhrwhaojvprozpcgff)
-- https://pskhrwhaojvprozpcgff.supabase.co  → SQL Editor → paste → Run
-- Idempotent where possible (IF NOT EXISTS / CREATE OR REPLACE).

create extension if not exists "pgcrypto";

-- ------------------------------------------------------------------ profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  avatar_url text,
  created_at timestamptz default now()
);

-- ------------------------------------------------------------------ credits
create table if not exists public.credits (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  balance integer not null default 500,
  updated_at timestamptz default now()
);

create table if not exists public.credit_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  delta integer not null,
  reason text not null,
  job_id uuid,
  related_job text,
  created_at timestamptz default now()
);

-- ------------------------------------------------------------------ racn nodes (user's peer nodes)
create table if not exists public.racn_nodes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  node_id text not null unique,
  display_name text,
  status text not null default 'offline' check (status in ('online','offline','busy')),
  last_seen timestamptz,
  created_at timestamptz default now()
);

-- ------------------------------------------------------------------ registry: coordinator's live peer fleet (single DB)
-- Replaces the coordinator's SQLite `nodes` table. Every peer that registers
-- over WS/HTTP upserts here; the scheduler reads active_nodes() from here.
create table if not exists public.racn_registry (
  node_id text primary key,
  gpu_tier text not null default 'cpu' check (gpu_tier in ('cpu','medium','high','storage')),
  gpu_vendor text default 'none',
  gpu_name text default '',
  vram_gb double precision default 0,
  memory_gb double precision default 8,
  bandwidth_mbps double precision default 100,
  latency_ms double precision default 20,
  trust_score double precision default 0.5,
  role text default 'compute',
  shards text default '[]',
  hosted_models text default '[]',
  current_load double precision default 0,
  active boolean default true,
  last_heartbeat timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index if not exists idx_racn_registry_active on public.racn_registry(active, last_heartbeat);

-- ------------------------------------------------------------------ ledger: coordinator credit accounts (mirrors racn.db accounts)
-- Kept as node_id-keyed so the coordinator path needs no auth.users join.
-- Top-level users that also have a profile keep balance in `credits` too;
-- these two ledgers are bridged by the sync triggers/functions below.
create table if not exists public.racn_accounts (
  node_id text primary key,
  balance integer not null default 100,
  lifetime_earned integer not null default 0,
  lifetime_spent integer not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create table if not exists public.racn_ledger_entries (
  id bigserial primary key,
  ts double precision default extract(epoch from now()),
  node_id text not null,
  kind text not null check (kind in ('bootstrap','spend','earn','refund')),
  amount integer not null,
  related_job text,
  note text
);
create index if not exists idx_racn_ledger_node on public.racn_ledger_entries(node_id, ts desc);

-- ------------------------------------------------------------------ conversations & messages
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null default 'New chat',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  role text not null check (role in ('user','assistant','system')),
  content text not null,
  created_at timestamptz default now()
);
create index if not exists idx_messages_conversation on public.messages(conversation_id, created_at);

-- ------------------------------------------------------------------ racn jobs (Supabase-side history + provenance)
create table if not exists public.racn_jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  conversation_id uuid references public.conversations(id) on delete set null,
  coordinator_job_id text,
  prompt text not null,
  privacy_tier text not null default 'public' check (privacy_tier in ('public','protected','confidential','local_only')),
  status text not null default 'queued' check (status in ('queued','running','completed','failed','assigned','dead_letter')),
  output text,
  credits_spent integer not null default 10,
  -- provenance: who answered (filled by coordinator callback / poll)
  answered_by_node_id text,
  answered_by_gpu_tier text,
  answered_by_gpu_name text,
  backend text,
  tokens_per_sec double precision,
  prompt_tokens integer,
  completion_tokens integer,
  assigned_workers text,
  outputs_verified text,
  created_at timestamptz default now(),
  completed_at timestamptz
);
create index if not exists idx_racn_jobs_user on public.racn_jobs(user_id, created_at desc);
create index if not exists idx_racn_jobs_coord on public.racn_jobs(coordinator_job_id);

-- ------------------------------------------------------------------ live telemetry (Task Manager)
-- Each peer's :18001 reports CPU/RAM/GPU/bandwidth every heartbeat (~15s).
-- `updated_at` drives "online if seen < 45s" (same window the coordinator uses).
create table if not exists public.racn_telemetry (
  node_id text primary key references public.racn_registry(node_id) on delete cascade,
  cpu_percent double precision default 0,
  ram_percent double precision default 0,
  ram_used_gb double precision default 0,
  ram_total_gb double precision default 0,
  gpu_percent double precision,
  gpu_temp_c double precision,
  vram_used_gb double precision,
  vram_total_gb double precision,
  bandwidth_mbps double precision,
  active_jobs integer default 0,
  backend text,
  model_id text,
  updated_at timestamptz default now()
);

-- ------------------------------------------------------------------ triggers: new auth user bootstrap
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path=public as $$
begin
  insert into public.profiles (id, email, display_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email,'@',1)))
  on conflict (id) do nothing;
  insert into public.credits (user_id, balance) values (new.id, 500) on conflict (user_id) do nothing;
  insert into public.credit_ledger (user_id, delta, reason) values (new.id, 500, 'bootstrap');
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- updated_at triggers
create or replace function public.touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists conversations_touch on public.conversations;
create trigger conversations_touch before update on public.conversations for each row execute function public.touch_updated_at();

create or replace function public.touch_racn_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;
drop trigger if exists racn_registry_touch on public.racn_registry;
create trigger racn_registry_touch before update on public.racn_registry for each row execute function public.touch_racn_updated_at();
drop trigger if exists racn_accounts_touch on public.racn_accounts;
create trigger racn_accounts_touch before update on public.racn_accounts for each row execute function public.touch_racn_updated_at();
drop trigger if exists racn_jobs_touch on public.racn_jobs;
create trigger racn_jobs_touch before update on public.racn_jobs for each row execute function public.touch_racn_updated_at();

create or replace function public.touch_telemetry_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;
drop trigger if exists racn_telemetry_touch on public.racn_telemetry;
create trigger racn_telemetry_touch before update on public.racn_telemetry for each row execute function public.touch_telemetry_updated_at();

-- ------------------------------------------------------------------ RLS
alter table public.profiles enable row level security;
alter table public.credits enable row level security;
alter table public.credit_ledger enable row level security;
alter table public.racn_nodes enable row level security;
alter table public.racn_registry enable row level security;
alter table public.racn_accounts enable row level security;
alter table public.racn_ledger_entries enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.racn_jobs enable row level security;
alter table public.racn_telemetry enable row level security;

drop policy if exists "profiles own" on public.profiles;
create policy "profiles own" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
drop policy if exists "credits own" on public.credits;
create policy "credits own" on public.credits for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "ledger own read" on public.credit_ledger;
create policy "ledger own read" on public.credit_ledger for select using (auth.uid() = user_id);
-- service_role can insert ledger rows (see spend_credits below — SECURITY DEFINER)
drop policy if exists "nodes own" on public.racn_nodes;
create policy "nodes own" on public.racn_nodes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "convos own" on public.conversations;
create policy "convos own" on public.conversations for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "messages own" on public.messages;
create policy "messages own" on public.messages for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "jobs own" on public.racn_jobs;
create policy "jobs own" on public.racn_jobs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Registry/accounts/telemetry: any authenticated user can read the fleet (network view + task manager).
-- Writes are coordinator/service_role only (service_role bypasses RLS). Add explicit authenticated SELECT.
drop policy if exists "registry authed read" on public.racn_registry;
create policy "registry authed read" on public.racn_registry for select using (auth.role() = 'authenticated');
drop policy if exists "accounts authed read" on public.racn_accounts;
create policy "accounts authed read" on public.racn_accounts for select using (auth.role() = 'authenticated');
drop policy if exists "ledger authed read" on public.racn_ledger_entries;
create policy "ledger authed read" on public.racn_ledger_entries for select using (auth.role() = 'authenticated');
drop policy if exists "telemetry authed read" on public.racn_telemetry;
create policy "telemetry authed read" on public.racn_telemetry for select using (auth.role() = 'authenticated');
-- Authenticated users may upsert their own telemetry row via the peer heartbeat (node_id == their peer id;
-- relaxed check — the peer authenticates to the coordinator, not to Supabase directly).
drop policy if exists "telemetry own write" on public.racn_telemetry;
create policy "telemetry own write" on public.racn_telemetry for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ------------------------------------------------------------------ PL/pgSQL helpers

-- Atomic credit spend (prevents race) — coordinator picks best GPU, p2p path: prompt → /prompt → generate()
create or replace function public.spend_credits(p_user_id uuid, p_amount integer, p_reason text, p_job_id uuid default null)
returns boolean language plpgsql security definer set search_path=public as $$
declare v_balance integer;
begin
  select balance into v_balance from public.credits where user_id = p_user_id for update;
  if v_balance is null then return false; end if;
  if v_balance < p_amount then return false; end if;
  update public.credits set balance = balance - p_amount, updated_at = now() where user_id = p_user_id;
  insert into public.credit_ledger (user_id, delta, reason, job_id) values (p_user_id, -p_amount, p_reason, p_job_id);
  -- also bridge to racn_accounts when the user_id maps to a node_id (optional)
  return true;
end; $$;

-- Registry upsert (called by coordinator + peer heartbeat proxy)
create or replace function public.racn_register_node(
  p_node_id text, p_gpu_tier text, p_gpu_vendor text, p_gpu_name text,
  p_vram_gb double precision, p_memory_gb double precision, p_bandwidth_mbps double precision,
  p_latency_ms double precision, p_trust_score double precision, p_role text,
  p_shards text, p_hosted_models text, p_current_load double precision
) returns void language plpgsql security definer set search_path=public as $$
begin
  insert into public.racn_registry (node_id, gpu_tier, gpu_vendor, gpu_name, vram_gb, memory_gb, bandwidth_mbps, latency_ms, trust_score, role, shards, hosted_models, current_load, active, last_heartbeat)
  values (p_node_id, coalesce(p_gpu_tier,'cpu'), coalesce(p_gpu_vendor,'none'), coalesce(p_gpu_name,''),
          coalesce(p_vram_gb,0), coalesce(p_memory_gb,8), coalesce(p_bandwidth_mbps,100),
          coalesce(p_latency_ms,20), coalesce(p_trust_score,0.5), coalesce(p_role,'compute'),
          coalesce(p_shards,'[]'), coalesce(p_hosted_models,'[]'), coalesce(p_current_load,0), true, now())
  on conflict (node_id) do update set
    gpu_tier = excluded.gpu_tier, gpu_vendor = excluded.gpu_vendor, gpu_name = excluded.gpu_name,
    vram_gb = excluded.vram_gb, memory_gb = excluded.memory_gb, bandwidth_mbps = excluded.bandwidth_mbps,
    latency_ms = excluded.latency_ms, trust_score = excluded.trust_score, role = excluded.role,
    shards = excluded.shards, hosted_models = excluded.hosted_models, current_load = excluded.current_load,
    active = true, last_heartbeat = now(), updated_at = now();
end; $$;

create or replace function public.racn_heartbeat(p_node_id text, p_current_load double precision default 0)
returns void language plpgsql security definer set search_path=public as $$
begin
  update public.racn_registry set current_load = p_current_load, active = true, last_heartbeat = now(), updated_at = now()
  where node_id = p_node_id;
end; $$;

create or replace function public.racn_active_nodes()
returns setof public.racn_registry language sql security definer set search_path=public as $$
  select * from public.racn_registry where active and last_heartbeat > now() - interval '45 seconds' order by last_heartbeat desc;
$$;

-- Telemetry upsert (Task Manager feed)
create or replace function public.racn_report_telemetry(
  p_node_id text, p_cpu_percent double precision, p_ram_percent double precision,
  p_ram_used_gb double precision, p_ram_total_gb double precision,
  p_gpu_percent double precision, p_gpu_temp_c double precision,
  p_vram_used_gb double precision, p_vram_total_gb double precision,
  p_bandwidth_mbps double precision, p_active_jobs integer, p_backend text, p_model_id text
) returns void language plpgsql security definer set search_path=public as $$
begin
  insert into public.racn_telemetry (node_id, cpu_percent, ram_percent, ram_used_gb, ram_total_gb, gpu_percent, gpu_temp_c, vram_used_gb, vram_total_gb, bandwidth_mbps, active_jobs, backend, model_id)
  values (p_node_id, p_cpu_percent, p_ram_percent, p_ram_used_gb, p_ram_total_gb, p_gpu_percent, p_gpu_temp_c, p_vram_used_gb, p_vram_total_gb, p_bandwidth_mbps, coalesce(p_active_jobs,0), p_backend, p_model_id)
  on conflict (node_id) do update set
    cpu_percent = excluded.cpu_percent, ram_percent = excluded.ram_percent,
    ram_used_gb = excluded.ram_used_gb, ram_total_gb = excluded.ram_total_gb,
    gpu_percent = excluded.gpu_percent, gpu_temp_c = excluded.gpu_temp_c,
    vram_used_gb = excluded.vram_used_gb, vram_total_gb = excluded.vram_total_gb,
    bandwidth_mbps = excluded.bandwidth_mbps, active_jobs = excluded.active_jobs,
    backend = excluded.backend, model_id = excluded.model_id, updated_at = now();
end; $$;

-- Credit helpers (mirror racn.db accounts)
create or replace function public.racn_bootstrap(p_node_id text, p_amount integer default 100)
returns integer language plpgsql security definer set search_path=public as $$
declare v_bal integer;
begin
  select balance into v_bal from public.racn_accounts where node_id = p_node_id;
  if v_bal is not null then return v_bal; end if;
  insert into public.racn_accounts (node_id, balance) values (p_node_id, p_amount) on conflict (node_id) do nothing;
  insert into public.racn_ledger_entries (ts, node_id, kind, amount, note) values (extract(epoch from now()), p_node_id, 'bootstrap', p_amount, 'starter credits');
  return p_amount;
end; $$;

create or replace function public.racn_balance(p_node_id text)
returns integer language plpgsql security definer set search_path=public as $$
declare v integer;
begin
  select balance into v from public.racn_accounts where node_id = p_node_id;
  return coalesce(v, 0);
end; $$;

create or replace function public.racn_spend(p_node_id text, p_amount integer, p_job_id text)
returns boolean language plpgsql security definer set search_path=public as $$
declare v integer;
begin
  select balance into v from public.racn_accounts where node_id = p_node_id for update;
  if v is null or v < p_amount then return false; end if;
  update public.racn_accounts set balance = balance - p_amount, lifetime_spent = lifetime_spent + p_amount, updated_at = now() where node_id = p_node_id;
  insert into public.racn_ledger_entries (ts, node_id, kind, amount, related_job, note) values (extract(epoch from now()), p_node_id, 'spend', -p_amount, p_job_id, 'job admission');
  return true;
end; $$;

create or replace function public.racn_earn(p_node_id text, p_amount integer, p_job_id text)
returns void language plpgsql security definer set search_path=public as $$
begin
  update public.racn_accounts set balance = balance + p_amount, lifetime_earned = lifetime_earned + p_amount, updated_at = now() where node_id = p_node_id;
  insert into public.racn_ledger_entries (ts, node_id, kind, amount, related_job, note) values (extract(epoch from now()), p_node_id, 'earn', p_amount, p_job_id, 'task completed & verified');
end; $$;

-- Provenance: record who answered a Supabase job (called by next/api poll or coordinator webhook)
create or replace function public.racn_job_provenance(
  p_job_id uuid, p_answered_by_node_id text, p_gpu_tier text, p_gpu_name text,
  p_backend text, p_tokens_per_sec double precision, p_prompt_tokens integer, p_completion_tokens integer,
  p_assigned_workers text
) returns void language plpgsql security definer set search_path=public as $$
begin
  update public.racn_jobs set
    answered_by_node_id = p_answered_by_node_id,
    answered_by_gpu_tier = p_gpu_tier,
    answered_by_gpu_name = p_gpu_name,
    backend = coalesce(p_backend, backend),
    tokens_per_sec = coalesce(p_tokens_per_sec, tokens_per_sec),
    prompt_tokens = coalesce(p_prompt_tokens, prompt_tokens),
    completion_tokens = coalesce(p_completion_tokens, completion_tokens),
    assigned_workers = coalesce(p_assigned_workers, assigned_workers)
  where id = p_job_id;
end; $$;
