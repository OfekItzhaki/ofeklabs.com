import { getProducts, getSiteConfig } from '@/lib/sanity';
import { getProductsFromSubdomains } from '@/lib/subdomain-scraper';
import type { SiteConfig, DefaultSiteConfig, Product } from '@/types';

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
        headline: "OfekLabs builds operational software.",
        subheadline: "An independent software lab focused on backend-heavy SaaS products. Scheduling engines, multi-tenant platforms, auth systems — designed around real constraints, shipped to real users.",
        ctaText: "View Products",
        ctaTarget: "#products",
    },
    description: "OfekLabs is an independent software lab building production-grade SaaS products and backend systems. Every product is architected, built, and operated end-to-end — from database design through deployment and monitoring.",
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
        navLinks: config.navLinks,
        sectionHeadings: config.sectionHeadings,
        subdomains: config.subdomains,
    };
}

/**
 * Fallback products shown when no CMS or subdomain data is available.
 */
const FALLBACK_PRODUCTS: Product[] = [
    {
        id: 'shifter',
        name: 'Shifter',
        tagline: 'Automated shift scheduling for teams',
        description: 'Constraint-optimization engine that generates fair, balanced shift schedules. Handles minimum rest, qualifications, personal preferences, and workload distribution automatically.',
        status: 'active',
        badge: 'Live',
        url: 'https://shifter.ofeklabs.com',
        features: ['CP-SAT solver', 'Multi-tenant', 'Mobile-first', 'Real-time sync'],
        order: 1,
    },
];

/**
 * Get products from Sanity CMS, merged with auto-discovered subdomain products.
 * Falls back to hardcoded products when no data sources are available.
 */
export async function getProductsList(config?: SiteConfig): Promise<Product[]> {
    const [sanityProducts, scrapedProducts] = await Promise.all([
        getProducts(),
        getProductsFromSubdomains(config?.subdomains),
    ]);

    const products = sanityProducts || [];

    // Merge: Sanity products override scraped ones with same ID
    const sanityIds = new Set(products.map((p: Product) => p.id));
    const uniqueScraped = scrapedProducts.filter((p) => !sanityIds.has(p.id));

    const merged = [...products, ...uniqueScraped];

    // If no products from any source, use fallback
    if (merged.length === 0) {
        return FALLBACK_PRODUCTS;
    }

    return merged;
}

// Export for backward compatibility and type reference
export const SITE_CONFIG = DEFAULT_SITE_CONFIG;
