import type { BrandVoice, GeneratedCopy, LandingConfig } from '../types';

function voiceFlavor(voice: BrandVoice) {
  switch (voice) {
    case 'Bold':
      return {
        power: 'Unleash',
        edge: 'dominate',
        trust: 'backed by real results',
        vibe: 'confident',
      };
    case 'Friendly':
      return {
        power: 'Say hello to',
        edge: 'make life easier',
        trust: 'trusted by people like you',
        vibe: 'warm',
      };
    case 'Premium':
      return {
        power: 'Experience',
        edge: 'set a new standard',
        trust: 'crafted with obsessive detail',
        vibe: 'elevated',
      };
    case 'Playful':
      return {
        power: 'Meet',
        edge: 'turn chaos into chill',
        trust: 'loved by early insiders',
        vibe: 'cheeky',
      };
    case 'Technical':
      return {
        power: 'Introducing',
        edge: 'optimize your workflow',
        trust: 'validated by data',
        vibe: 'precise',
      };
  }
}

export function generateCopy(cfg: LandingConfig): GeneratedCopy {
  const v = voiceFlavor(cfg.brandVoice);
  const p = cfg.productName || 'your product';
  const a = cfg.targetAudience || 'your audience';
  const pain = cfg.painPoint || 'the friction slowing you down';
  const angle = cfg.uniqueAngle || 'a fresh, no-compromise approach';

  const headline = `${v.power} ${p}: ${angle}`;

  const subheadline = `Built for ${a} to ${v.edge} — finally solve ${pain} with ${p}.`;

  const valueBullets = [
    `${p} removes ${pain} with an intuitive, focused experience.`,
    `Engineered to ${v.edge} so you can move faster and do more with less.`,
    `Trusted by early users and ${v.trust}.`,
  ];

  const earlyBenefits = cfg.exclusiveBenefits && cfg.exclusiveBenefits.length > 0
    ? cfg.exclusiveBenefits
    : [
        'Founders’ Circle access and private roadmap influence',
        'VIP onboarding and priority support',
        'Limited lifetime discount locked in at launch',
      ];

  const ctaPrimary = cfg.ctaAction || 'Get Early Access';
  const ctaSecondary = cfg.ctaIncentive || 'Join the waitlist — it’s free';

  const scarcityLine = cfg.scarcityStatement || 'Spots are limited for the first cohort — secure yours now.';

  return {
    headline,
    subheadline,
    valueBullets,
    earlyBenefits,
    ctaPrimary,
    ctaSecondary,
    scarcityLine,
    socialBlocks: cfg.socialProof,
  };
}
