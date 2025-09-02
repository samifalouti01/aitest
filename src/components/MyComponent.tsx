import { useMemo, useState } from 'react';

interface Props {
  ctaLabel: string;
  onSuccess?: (email: string) => void;
  incentive?: string;
}

const EMAIL_RE = /[^\s@]+@[^\s@]+\.[^\s@]+/;

export function MyComponent({ ctaLabel, incentive, onSuccess }: Props) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const slotsLeft = useMemo(() => {
    // Pseudo scarcity: dynamic but stable per session
    const base = 120; // pretend cohort size
    const start = Number(sessionStorage.getItem('cohortStart') || Date.now());
    sessionStorage.setItem('cohortStart', String(start));
    const elapsedMins = Math.floor((Date.now() - start) / 60000);
    const reduced = Math.min(base - 35, Math.floor(base * 0.7 - elapsedMins));
    const left = Math.max(12, reduced);
    return left;
  }, []);

  async function submit() {
    setError(null);
    if (!EMAIL_RE.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    try {
      // Fake API: store locally to simulate success
      const list = JSON.parse(localStorage.getItem('waitlist') || '[]');
      if (!list.includes(email)) list.push(email);
      localStorage.setItem('waitlist', JSON.stringify(list));
      await new Promise((r) => setTimeout(r, 700));
      setDone(true);
      onSuccess?.(email);
    } catch (e) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="card p-6 text-center">
        <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-green-500/15 text-green-400 ring-1 ring-inset ring-green-500/40 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 7 9 18l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h4 className="text-xl font-semibold">You're on the list! ✅</h4>
        {incentive && <p className="mt-2 text-slate-300">{incentive}</p>}
        <p className="mt-2 text-sm text-slate-400">We’ll email you when your invite is ready. Keep an eye on your inbox.</p>
      </div>
    );
  }

  return (
    <div className="card p-2 sm:p-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your best email"
            className="w-full rounded-xl border border-slate-800/60 bg-slate-950/50 px-4 py-3 text-slate-100 placeholder-slate-500 shadow-inner outline-none focus:border-brand-500/60 focus:ring-2 focus:ring-brand-500/30"
            aria-label="Email"
          />
          {incentive && (
            <div className="pointer-events-none absolute -bottom-6 left-1 text-xs text-slate-400">
              {incentive}
            </div>
          )}
        </div>
        <button
          onClick={submit}
          disabled={loading}
          className="btn btn-primary whitespace-nowrap"
        >
          {loading ? 'Joining…' : ctaLabel}
        </button>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
        <span>We respect your privacy. Unsubscribe anytime.</span>
        <span className="badge">Only {slotsLeft} early spots left</span>
      </div>
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
    </div>
  );
}
