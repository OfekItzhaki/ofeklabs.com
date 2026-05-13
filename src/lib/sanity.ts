import { createClient, type SanityClient } from 'next-sanity';

export const config = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-02-04',
    useCdn: process.env.NODE_ENV === 'production',
};

const hasValidProjectId = config.projectId && config.projectId !== 'placeholder';

export const client: SanityClient | null = hasValidProjectId
    ? createClient(config)
    : null;

/** Timeout duration for Sanity requests (5 seconds) */
const SANITY_TIMEOUT_MS = 5000;

/**
 * Wraps a promise with a timeout. Rejects if the promise doesn't resolve within the given ms.
 */
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error(`Sanity request timed out after ${ms}ms`));
        }, ms);

        promise
            .then((result) => {
                clearTimeout(timer);
                resolve(result);
            })
            .catch((error) => {
                clearTimeout(timer);
                reject(error);
            });
    });
}

/**
 * Fetch all products from Sanity CMS
 */
export async function getProducts() {
    if (!client) return [];

    try {
        const products = await withTimeout(
            client.fetch(
                `*[_type == "product"] | order(order asc) {
                    "id": id.current,
                    "name": title,
                    tagline,
                    description,
                    status,
                    badge,
                    url,
                    features,
                    screenshot,
                    order
                }`
            ),
            SANITY_TIMEOUT_MS
        );
        return products;
    } catch (error) {
        console.warn("Sanity connection failed. Using fallback data.");
        return [];
    }
}

/**
 * Fetch site configuration from Sanity CMS
 * Bypasses CDN to ensure fresh data on every request
 */
export async function getSiteConfig() {
    if (!client) return null;

    try {
        const data = await withTimeout(
            client.fetch(
                `*[_type == "siteConfig"][0] {
                    name,
                    tagline,
                    description,
                    email,
                    whatsapp,
                    phone,
                    socials {
                        github,
                        linkedin,
                        twitter
                    },
                    legal {
                        privacy,
                        terms
                    },
                    hero {
                        headline,
                        subheadline,
                        ctaText,
                        ctaTarget
                    },
                    navLinks[] {
                        label,
                        href
                    },
                    sectionHeadings {
                        productsTitle,
                        aboutLabel,
                        aboutTitle,
                        contactLabel,
                        contactTitle,
                        contactSubmitText,
                        contactSuccessMessage,
                        contactErrorMessage
                    },
                    subdomains[] {
                        slug,
                        enabled,
                        overrideName,
                        overrideTagline,
                        status,
                        order
                    }
                }`,
                {},
                { useCdn: false }
            ),
            SANITY_TIMEOUT_MS
        );

        if (!data) return null;

        return {
            ...data,
            contact: {
                email: data.email,
                whatsapp: data.whatsapp,
                phone: data.phone,
            },
        };
    } catch (error) {
        console.warn("Failed to fetch site config from Sanity.");
        return null;
    }
}
