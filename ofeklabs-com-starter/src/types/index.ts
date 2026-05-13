/** Site configuration from Sanity CMS siteConfig document */
export interface SiteConfig {
  name: string;
  tagline?: string;
  description?: string;
  domain?: string;
  email?: string;
  contact: {
    email: string;
    whatsapp?: string;
    phone?: string;
  };
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  legal?: {
    privacy?: string;
    terms?: string;
  };
  hero?: {
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaTarget: string;
  };
}

/** Product document from Sanity CMS */
export interface Product {
  id: string;
  name: string;
  tagline?: string;
  description?: string;
  status: 'active' | 'beta' | 'dev' | 'coming-soon';
  badge: string;
  url: string;
  features: string[];
  screenshot?: SanityImage | null;
  order?: number;
}

/** Sanity image reference */
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

/** Contact form data */
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

/** Contact form validation errors */
export interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

/** Navigation link item */
export interface NavLink {
  label: string;
  href: string;
}

/** Default fallback configuration (complete for all sections) */
export interface DefaultSiteConfig {
  name: string;
  domain: string;
  email: string;
  contact: {
    email: string;
    whatsapp: string;
    phone: string;
  };
  socials: {
    github: string;
    linkedin: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    ctaText: string;
    ctaTarget: string;
  };
  description: string;
  legal: {
    privacy: string;
    terms: string;
  };
}
