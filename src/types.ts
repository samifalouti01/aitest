export type BrandVoice = 'Bold' | 'Friendly' | 'Premium' | 'Playful' | 'Technical';

export type SocialProofItem =
  | { type: 'testimonial'; quote: string; author: string; role?: string }
  | { type: 'press'; outlet: string; quote?: string }
  | { type: 'stat'; label: string; value: string }
  | { type: 'influencer'; name: string; handle?: string; quote: string };

export interface LandingConfig {
  brandName: string;
  productName: string;
  targetAudience: string;
  painPoint: string;
  uniqueAngle: string;
  exclusiveBenefits: string[];
  ctaAction: string;
  ctaIncentive: string;
  scarcityStatement: string;
  brandVoice: BrandVoice;
  socialProof: SocialProofItem[];
}

export interface GeneratedCopy {
  headline: string;
  subheadline: string;
  valueBullets: string[];
  earlyBenefits: string[];
  ctaPrimary: string;
  ctaSecondary?: string;
  scarcityLine?: string;
  socialBlocks: SocialProofItem[];
}
