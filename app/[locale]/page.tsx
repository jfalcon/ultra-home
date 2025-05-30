'use client';

import { CSSProperties } from 'react';
import { useTranslations } from 'next-intl';

const cardStyle: CSSProperties = {
  backgroundColor: 'var(--background)',
  color: 'var(--foreground)',
};

export default function Home() {
  const t = useTranslations('Login');

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form style={cardStyle} className="p-6 rounded shadow-md w-full max-w-xs">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="email">
            {t('email')}
          </label>
          <input
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            type="email"
            id="email"
            placeholder="you@example.com"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1" htmlFor="password">
            {t('password')}
          </label>
          <input
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring"
            type="password"
            id="password"
            placeholder="********"
          />
        </div>
        <button
          type="submit"
          className="primary w-full py-2 rounded transition"
        >
          {t('signIn')}
        </button>
      </form>
    </main>
  );
}
