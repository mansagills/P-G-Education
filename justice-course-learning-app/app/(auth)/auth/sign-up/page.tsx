'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  async function signUpWithPassword(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` }
    });

    setStatus(error ? error.message : 'Account created. Check email for confirmation if required, then sign in.');
    setLoading(false);
  }

  async function sendMagicLink() {
    setLoading(true);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithOtp({ email });
    setStatus(error ? error.message : 'Magic link sent.');
    setLoading(false);
  }

  return (
    <section className="mx-auto max-w-md rounded-lg border border-slate-200 bg-white p-6">
      <h1 className="text-2xl font-semibold">Create Account</h1>
      <form onSubmit={signUpWithPassword} className="mt-4 space-y-3">
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
          minLength={8}
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded border border-slate-300 px-3 py-2"
        />
        <button disabled={loading} className="w-full rounded bg-brand-700 px-4 py-2 text-white" type="submit">
          {loading ? 'Creating...' : 'Sign up with Password'}
        </button>
      </form>
      <button onClick={sendMagicLink} disabled={loading || !email} className="mt-3 w-full rounded border border-slate-300 px-4 py-2 text-sm text-slate-700">
        Use Magic Link Instead
      </button>
      {status ? <p className="mt-3 text-sm text-slate-600">{status}</p> : null}
      <p className="mt-4 text-sm text-slate-600">
        Have an account? <Link href="/auth/sign-in" className="text-brand-700">Sign in</Link>
      </p>
    </section>
  );
}
