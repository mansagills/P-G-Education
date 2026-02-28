'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithPassword(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setStatus(error.message);
      setLoading(false);
      return;
    }

    window.location.href = '/dashboard';
  }

  async function sendMagicLink() {
    setLoading(true);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithOtp({ email });
    setStatus(error ? error.message : 'Magic link sent. Check your inbox.');
    setLoading(false);
  }

  return (
    <section className="mx-auto max-w-md rounded-lg border border-slate-200 bg-white p-6">
      <h1 className="text-2xl font-semibold">Sign In</h1>
      <form onSubmit={signInWithPassword} className="mt-4 space-y-3">
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded border border-slate-300 px-3 py-2"
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded border border-slate-300 px-3 py-2"
        />
        <button disabled={loading} className="w-full rounded bg-brand-700 px-4 py-2 text-white" type="submit">
          {loading ? 'Signing in...' : 'Sign in with Password'}
        </button>
      </form>

      <button onClick={sendMagicLink} disabled={loading || !email} className="mt-3 w-full rounded border border-slate-300 px-4 py-2 text-sm text-slate-700">
        Send Magic Link Instead
      </button>

      {status ? <p className="mt-3 text-sm text-slate-600">{status}</p> : null}
      <p className="mt-4 text-sm text-slate-600">
        No account? <Link href="/auth/sign-up" className="text-brand-700">Create one</Link>
      </p>
    </section>
  );
}
