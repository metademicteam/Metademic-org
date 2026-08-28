-- Metademic + RACN Supabase schema
-- Run in Supabase SQL Editor (https://pskhrwhaojvprozpcgff.supabase.co)
-- Idempotent where possible

-- extensions
create extension if not exists "pgcrypto";

-- profiles mirrors auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  avatar_url text,
  created_at timestamptz default now()
);

-- credits ledger
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
  created_at timestamptz default now()
);

-- RACN nodes (user's installed peer nodes)
create table if not exists public.racn_nodes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  node_id text not null unique,
  display_name text,
  status text not null default 'offline' check (status in ('online','offline','busy')),
  last_seen timestamptz,
  created_at timestamptz default now()
);

-- conversations & messages (chat history)
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

-- RACN jobs (proxy of coordinator jobs, for history/billing)
create table if not exists public.racn_jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  conversation_id uuid references public.conversations(id) on delete set null,
  coordinator_job_id text,
  prompt text not null,
  privacy_tier text not null default 'public' check (privacy_tier in ('public','protected','confidential','local_only')),
  status text not null default 'queued' check (status in ('queued','running','completed','failed')),
  output text,
  credits_spent integer not null default 10,
  created_at timestamptz default now(),
  completed_at timestamptz
);

-- triggers: new user bootstrap
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path=public as $$
begin
  insert into public.profiles (id, email, display_name) values (new.id, new.email, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email,'@',1))) on conflict (id) do nothing;
  insert into public.credits (user_id, balance) values (new.id, 500) on conflict (user_id) do nothing;
  insert into public.credit_ledger (user_id, delta, reason) values (new.id, 500, 'bootstrap');
  return new;
end; $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- updated_at trigger for conversations
create or replace function public.touch_updated_at() returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end; $$;
drop trigger if exists conversations_touch on public.conversations;
create trigger conversations_touch before update on public.conversations for each row execute function public.touch_updated_at();

-- RLS
alter table public.profiles enable row level security;
alter table public.credits enable row level security;
alter table public.credit_ledger enable row level security;
alter table public.racn_nodes enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.racn_jobs enable row level security;

-- policies: user can read/update own rows; service_role bypasses RLS
drop policy if exists "profiles own" on public.profiles;
create policy "profiles own" on public.profiles for all using (auth.uid() = id) with check (auth.uid() = id);
drop policy if exists "credits own" on public.credits;
create policy "credits own" on public.credits for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "ledger own read" on public.credit_ledger;
create policy "ledger own read" on public.credit_ledger for select using (auth.uid() = user_id);
drop policy if exists "nodes own" on public.racn_nodes;
create policy "nodes own" on public.racn_nodes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "convos own" on public.conversations;
create policy "convos own" on public.conversations for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "messages own" on public.messages;
create policy "messages own" on public.messages for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
drop policy if exists "jobs own" on public.racn_jobs;
create policy "jobs own" on public.racn_jobs for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- atomic credit spend (prevents race) — coordinator picks best GPU, p2p path: prompt → /prompt → generate()
create or replace function public.spend_credits(p_user_id uuid, p_amount integer, p_reason text, p_job_id uuid default null)
returns boolean language plpgsql security definer set search_path=public as $$
declare v_balance integer;
begin
  select balance into v_balance from public.credits where user_id = p_user_id for update;
  if v_balance is null then return false; end if;
  if v_balance < p_amount then return false; end if;
  update public.credits set balance = balance - p_amount, updated_at = now() where user_id = p_user_id;
  insert into public.credit_ledger (user_id, delta, reason, job_id) values (p_user_id, -p_amount, p_reason, p_job_id);
  return true;
end; $$;

-- public read for anon on profiles display (optional, not needed)
