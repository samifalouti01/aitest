import { useEffect, useMemo, useState } from 'react';
import { Logo } from '../components/Logo';
import { MyComponent } from '../components/MyComponent';
import { CustomizePanel } from '../components/CustomizePanel';
import { generateCopy } from '../utils/copy';
import type { LandingConfig } from '../types';
import { Star, Quote } from 'lucide-react';

const defaultConfig: LandingConfig = {
  brandName: 'Nova',
  productName: '{PRODUCT/SERVICE}',
  targetAudience: '{TARGET AUDIENCE}',
  painPoint: '{CUSTOMER PAIN POINT}',
  uniqueAngle: 'the faster way to your next big win',
  exclusiveBenefits: ['Founders’ Circle access', 'VIP onboarding + priority support', 'Limited lifetime discount at launch'],
  ctaAction: 'Get Early Access',
  ctaIncentive: 'Join the waitlist — first invites go to early sign-ups',
  scarcityStatement: '{SCARCITY STATEMENT}',
  brandVoice: 'Bold',
  socialProof: [
    { type: 'stat', label: 'Beta users improved speed by', value: '43%' },
    { type: 'press', outlet: 'TechDaily', quote: 'A smart, no-nonsense approach.' },
    { type: 'testimonial', quote: 'This felt like a cheat code for our launch.', author: 'A. Rivera', role: 'Founder, Lightbox' },
  ],
};

export function Index() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [config, setConfig] = useState<LandingConfig>(() => {
    try {
      const saved = localStorage.getItem('landingConfig');
      if (saved) return JSON.parse(saved);
    } catch {}
    return defaultConfig;
  });

  useEffect(() => {
    document.title = `${config.brandName} – Early Access`;
  }, [config.brandName]);

  const copy = useMemo(() => generateCopy(config), [config]);

  return (
    <div className="min-h-screen bg-grid-radial">
      <header className="container-section flex items-center justify-between py-5">
        <Logo brand={config.brandName} />
        <div className="flex items-center gap-3">
          <button className="btn btn-ghost" onClick={() => setPanelOpen(true)}>Customize</button>
          <a href="#waitlist" className="btn btn-primary">{config.ctaAction}</a>
        </div>
      </header>

      <main>
        <section className="container-section relative overflow-hidden py-16 sm:py-20">
          <div className="relative mx-auto max-w-3xl text-center">
            <span className="badge mb-4">Early Access</span>
            <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              {copy.headline}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
              {copy.subheadline}
            </p>
            <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <a href="#waitlist" className="btn btn-primary text-base">{copy.ctaPrimary}</a>
              <a href="#benefits" className="btn btn-ghost text-base">See early-access perks</a>
            </div>
            {copy.scarcityLine && (
              <p className="mt-4 text-sm text-slate-400">{copy.scarcityLine}</p>
            )}
          </div>

          <div className="pointer-events-none absolute -left-48 -top-24 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-48 -bottom-24 h-72 w-72 rounded-full bg-brand-800/30 blur-3xl" />
        </section>

        <section className="container-section grid gap-6 py-6 sm:grid-cols-2 lg:grid-cols-3" id="value">
          {copy.valueBullets.map((v, i) => (
            <div key={i} className="card p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 ring-1 ring-inset ring-white/10">
                <Star className="h-5 w-5 text-brand-400" />
              </div>
              <p className="text-slate-200">{v}</p>
            </div>
          ))}
        </section>

        <section className="container-section mt-6 grid items-start gap-6 lg:grid-cols-2">
          <div className="card p-6">
            <h3 className="text-xl font-semibold">Exclusive Benefits for Early Sign-Ups</h3>
            <ul className="mt-4 space-y-3 text-slate-300" id="benefits">
              {copy.earlyBenefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-500/15 text-green-400 ring-1 ring-inset ring-green-500/40">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 7 9 18l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-sm text-slate-400">
              Move to the front of the line and help shape what we build next.
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-xl font-semibold">Be first in line</h3>
            <p className="mt-2 text-slate-300">{config.ctaIncentive}</p>
            <div className="mt-4" id="waitlist">
              <MyComponent ctaLabel={config.ctaAction} incentive={config.ctaIncentive} />
            </div>
          </div>
        </section>

        <section className="container-section mt-10 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold">Social Proof & Credibility</h3>
            <p className="mt-2 text-slate-300">Signals that build confidence to take action.</p>
          </div>
          <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
            {copy.socialBlocks.map((s, i) => (
              <div key={i} className="card p-4">
                {s.type === 'stat' && (
                  <div>
                    <div className="text-3xl font-extrabold text-brand-400">{s.value}</div>
                    <div className="mt-1 text-slate-300">{s.label}</div>
                  </div>
                )}
                {s.type === 'press' && (
                  <div>
                    <div className="text-sm uppercase tracking-wide text-slate-400">As seen in</div>
                    <div className="mt-1 text-lg font-semibold">{s.outlet}</div>
                    {s.quote && <p className="mt-2 text-slate-300">“{s.quote}”</p>}
                  </div>
                )}
                {s.type === 'testimonial' && (
                  <div>
                    <Quote className="h-6 w-6 text-brand-400" />
                    <p className="mt-2 text-slate-200">“{s.quote}”</p>
                    <div className="mt-2 text-sm text-slate-400">— {s.author}{s.role ? `, ${s.role}` : ''}</div>
                  </div>
                )}
                {s.type === 'influencer' && (
                  <div>
                    <div className="text-sm uppercase tracking-wide text-slate-400">Endorsement</div>
                    <p className="mt-2 text-slate-200">“{s.quote}”</p>
                    <div className="mt-2 text-sm text-slate-400">— {s.name}{s.handle ? ` (${s.handle})` : ''}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="container-section mt-12">
          <div className="card relative overflow-hidden p-6 sm:p-10">
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-500/10 blur-3xl" />
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="text-2xl font-bold">Ready to lead the line?</h3>
                <p className="mt-2 text-slate-300">Sign up now and get the earliest access to {config.productName} when we launch.</p>
                <p className="mt-1 text-sm text-slate-400">No spam. One-click unsubscribe.</p>
              </div>
              <div className="sm:justify-self-end">
                <a href="#waitlist" className="btn btn-primary">{copy.ctaPrimary}</a>
                {copy.ctaSecondary && (
                  <div className="mt-2 text-sm text-slate-400">{copy.ctaSecondary}</div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="container-section mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-800/60 py-8 sm:flex-row">
        <Logo brand={config.brandName} />
        <div className="text-sm text-slate-500">© {new Date().getFullYear()} {config.brandName}. All rights reserved.</div>
      </footer>

      <CustomizePanel open={panelOpen} onClose={() => setPanelOpen(false)} value={config} onChange={setConfig} />
    </div>
  );
}
