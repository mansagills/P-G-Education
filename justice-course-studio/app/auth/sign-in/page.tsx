'use client';

import { FormEvent, useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<string>('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) {
        setStatus(error.message);
        return;
      }
      setStatus('Magic link sent. Check your email inbox.');
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Unexpected error while signing in.');
    }
  }

  return (
    <section className="mx-auto max-w-md space-y-4 rounded-lg border border-slate-200 bg-white p-6">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <label className="block text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded border border-slate-300 px-3 py-2"
          placeholder="educator@example.com"
        />
        <button className="rounded bg-brand-700 px-4 py-2 text-white" type="submit">
          Send magic link
        </button>
      </form>
      {status ? <p className="text-sm text-slate-600">{status}</p> : null}
    </section>
  );
}
