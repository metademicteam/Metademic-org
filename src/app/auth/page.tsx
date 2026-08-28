"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AuthPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${location.origin}/chat` } });
    if (error) setErr(error.message);
    else setSent(true);
  }

  return (
    <div className="oai-container py-12">
      <div className="mx-auto max-w-md rounded-[22px] border border-zinc-200 p-6">
        <h1 className="text-xl font-semibold tracking-tight">Sign in to Metademic</h1>
        <p className="mt-1 text-sm text-zinc-600">Magic link — we send a link to your email. 500 credits on signup.</p>
        <form onSubmit={onSubmit} className="mt-6 grid gap-3">
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@university.edu" type="email" required className="h-11 rounded-full border border-zinc-200 px-4 text-sm outline-none focus:border-zinc-300 focus:ring-4 focus:ring-zinc-100" />
          <button className="h-11 rounded-full bg-black text-sm font-medium text-white hover:bg-zinc-800">Send magic link</button>
        </form>
        {sent && <p className="mt-3 text-sm text-emerald-700">Check your email — link sent.</p>}
        {err && <p className="mt-3 text-sm text-red-600">{err}</p>}
      </div>
    </div>
  );
}
