import { useEffect, useState } from 'react';
import type { LandingConfig } from '../types';

interface Props {
  open: boolean;
  onClose: () => void;
  value: LandingConfig;
  onChange: (v: LandingConfig) => void;
}

export function CustomizePanel({ open, onClose, value, onChange }: Props) {
  const [local, setLocal] = useState<LandingConfig>(value);

  useEffect(() => {
    setLocal(value);
  }, [value]);

  function set<K extends keyof LandingConfig>(key: K, val: LandingConfig[K]) {
    const next = { ...local, [key]: val } as LandingConfig;
    setLocal(next);
    onChange(next);
    localStorage.setItem('landingConfig', JSON.stringify(next));
  }

  return (
    <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`} aria-hidden={!open}>
      <div
        className={`absolute inset-0 bg-black/60 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-xl transform bg-slate-950/95 backdrop-blur-xl shadow-2xl transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between border-b border-slate-800/60 p-4">
          <h3 className="text-lg font-semibold">Customize Landing Copy</h3>
          <button className="btn btn-ghost" onClick={onClose}>Close</button>
        </div>
        <div className="h-[calc(100%-64px)] overflow-y-auto p-4">
          <div className="grid grid-cols-1 gap-4">
            <Field label="Brand Name">
              <input className="input" value={local.brandName} onChange={(e) => set('brandName', e.target.value)} />
            </Field>
            <Field label="Product/Service">
              <input className="input" value={local.productName} onChange={(e) => set('productName', e.target.value)} />
            </Field>
            <Field label="Target Audience">
              <input className="input" value={local.targetAudience} onChange={(e) => set('targetAudience', e.target.value)} />
            </Field>
            <Field label="Customer Pain Point">
              <input className="input" value={local.painPoint} onChange={(e) => set('painPoint', e.target.value)} />
            </Field>
            <Field label="Unique Angle / Value">
              <input className="input" value={local.uniqueAngle} onChange={(e) => set('uniqueAngle', e.target.value)} />
            </Field>
            <Field label="Exclusive Benefits (comma separated)">
              <input
                className="input"
                value={local.exclusiveBenefits.join(', ')}
                onChange={(e) => set('exclusiveBenefits', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))}
              />
            </Field>
            <Field label="CTA Action">
              <input className="input" value={local.ctaAction} onChange={(e) => set('ctaAction', e.target.value)} />
            </Field>
            <Field label="CTA Incentive">
              <input className="input" value={local.ctaIncentive} onChange={(e) => set('ctaIncentive', e.target.value)} />
            </Field>
            <Field label="Scarcity Statement">
              <input className="input" value={local.scarcityStatement} onChange={(e) => set('scarcityStatement', e.target.value)} />
            </Field>
            <Field label="Brand Voice">
              <select className="input" value={local.brandVoice} onChange={(e) => set('brandVoice', e.target.value as any)}>
                <option>Bold</option>
                <option>Friendly</option>
                <option>Premium</option>
                <option>Playful</option>
                <option>Technical</option>
              </select>
            </Field>
            <fieldset className="card p-4">
              <legend className="mb-2 text-sm font-semibold text-slate-300">Social Proof</legend>
              <SocialEditor value={local.socialProof} onChange={(sp) => set('socialProof', sp)} />
            </fieldset>
          </div>
        </div>
      </aside>
      <style>{`.input{ @apply w-full rounded-xl border border-slate-800/60 bg-slate-900/60 px-3 py-2 text-slate-100 outline-none focus:border-brand-500/60 focus:ring-2 focus:ring-brand-500/30 }`}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm text-slate-300">{label}</span>
      {children}
    </label>
  );
}

function SocialEditor({ value, onChange }: { value: any[]; onChange: (v: any[]) => void }) {
  function add(type: 'testimonial' | 'press' | 'stat' | 'influencer') {
    const base: any =
      type === 'testimonial'
        ? { type, quote: '', author: '', role: '' }
        : type === 'press'
        ? { type, outlet: '', quote: '' }
        : type === 'stat'
        ? { type, label: '', value: '' }
        : { type, name: '', handle: '', quote: '' };
    onChange([...(value || []), base]);
  }

  function update(idx: number, key: string, val: string) {
    const next = [...(value || [])];
    next[idx] = { ...next[idx], [key]: val };
    onChange(next);
  }

  function remove(idx: number) {
    const next = [...(value || [])];
    next.splice(idx, 1);
    onChange(next);
  }

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn btn-ghost" onClick={() => add('testimonial')}>+ Testimonial</button>
        <button type="button" className="btn btn-ghost" onClick={() => add('press')}>+ Press</button>
        <button type="button" className="btn btn-ghost" onClick={() => add('stat')}>+ Stat</button>
        <button type="button" className="btn btn-ghost" onClick={() => add('influencer')}>+ Influencer</button>
      </div>
      <div className="grid gap-3">
        {(value || []).map((item, idx) => (
          <div key={idx} className="card p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="badge uppercase">{item.type}</span>
              <button className="btn btn-ghost" onClick={() => remove(idx)}>Remove</button>
            </div>
            {item.type === 'testimonial' && (
              <div className="grid gap-2">
                <input className="input" placeholder="Quote" value={item.quote} onChange={(e) => update(idx, 'quote', e.target.value)} />
                <div className="grid grid-cols-2 gap-2">
                  <input className="input" placeholder="Author" value={item.author} onChange={(e) => update(idx, 'author', e.target.value)} />
                  <input className="input" placeholder="Role" value={item.role || ''} onChange={(e) => update(idx, 'role', e.target.value)} />
                </div>
              </div>
            )}
            {item.type === 'press' && (
              <div className="grid gap-2">
                <input className="input" placeholder="Outlet" value={item.outlet} onChange={(e) => update(idx, 'outlet', e.target.value)} />
                <input className="input" placeholder="Quote (optional)" value={item.quote || ''} onChange={(e) => update(idx, 'quote', e.target.value)} />
              </div>
            )}
            {item.type === 'stat' && (
              <div className="grid gap-2">
                <input className="input" placeholder="Label" value={item.label} onChange={(e) => update(idx, 'label', e.target.value)} />
                <input className="input" placeholder="Value" value={item.value} onChange={(e) => update(idx, 'value', e.target.value)} />
              </div>
            )}
            {item.type === 'influencer' && (
              <div className="grid gap-2">
                <input className="input" placeholder="Name" value={item.name} onChange={(e) => update(idx, 'name', e.target.value)} />
                <input className="input" placeholder="Handle" value={item.handle || ''} onChange={(e) => update(idx, 'handle', e.target.value)} />
                <input className="input" placeholder="Quote" value={item.quote} onChange={(e) => update(idx, 'quote', e.target.value)} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
