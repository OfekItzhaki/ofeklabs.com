import { getProducts, getSiteConfig } from '@/lib/sanity';
import type { SiteConfig, DefaultSiteConfig } from '@/types';

/**
 * SITE CONFIGURATION
 * All content is managed in Sanity Studio at /studio
 * This file provides data fetching functions with fallback defaults.
 */

/**
 * Default fallback config (used only if Sanity is unavailable)
 */
const DEFAULT_SITE_CONFIG: DefaultSiteConfig = {
    name: "OfekLabs",
    domain: "ofeklabs.com",
    email: "ofeklabs@outlook.com",
    contact: {
        email: "ofeklabs@outlook.com",
        whatsapp: "",
        phone: "",
    },
    socials: {
        github: "https://github.com/ofekitzhaki",
        linkedin: "https://linkedin.com/in/ofekitzhaki",
    },
    hero: {
        headline: "Software that works as hard as you do",
        subheadline: "We build tools for productivity, automation, and workflow management.",
        ctaText: "Explore Products",
        ctaTarget: "#products",
    },
    description: "OfekLabs builds developer-first productivity tools. We focus on quality, reliability, and seamless workflows that help teams ship faster.",
    legal: {
        privacy: "",
        terms: "",
    },
};

/**
 * Get site configuration from Sanity CMS
 * Merges CMS data with defaults as fallback for any missing fields
 */
export async function getSiteConfiguration(): Promise<SiteConfig> {
    const config = await getSiteConfig();

    if (!config) {
        return DEFAULT_SITE_CONFIG;
    }

    return {
        name: config.name || DEFAULT_SITE_CONFIG.name,
        tagline: config.tagline,
        description: config.description || DEFAULT_SITE_CONFIG.description,
        domain: config.domain || DEFAULT_SITE_CONFIG.domain,
        email: config.email || DEFAULT_SITE_CONFIG.email,
        contact: {
            email: config.contact?.email || DEFAULT_SITE_CONFIG.contact.email,
            whatsapp: config.contact?.whatsapp || DEFAULT_SITE_CONFIG.contact.whatsapp,
            phone: config.contact?.phone || DEFAULT_SITE_CONFIG.contact.phone,
        },
        socials: {
            github: config.socials?.github || DEFAULT_SITE_CONFIG.socials.github,
            linkedin: config.socials?.linkedin || DEFAULT_SITE_CONFIG.socials.linkedin,
            twitter: config.socials?.twitter,
        },
        legal: {
            privacy: config.legal?.privacy || DEFAULT_SITE_CONFIG.legal.privacy,
            terms: config.legal?.terms || DEFAULT_SITE_CONFIG.legal.terms,
        },
        hero: {
            headline: config.hero?.headline || DEFAULT_SITE_CONFIG.hero.headline,
            subheadline: config.hero?.subheadline || DEFAULT_SITE_CONFIG.hero.subheadline,
            ctaText: config.hero?.ctaText || DEFAULT_SITE_CONFIG.hero.ctaText,
            ctaTarget: config.hero?.ctaTarget || DEFAULT_SITE_CONFIG.hero.ctaTarget,
        },
    };
}

/**
 * Get products from Sanity CMS
 */
export async function getProductsList() {
    const products = await getProducts();
    return products || [];
}

// Export for backward compatibility and type reference
export const SITE_CONFIG = DEFAULT_SITE_CONFIG;
