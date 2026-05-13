/**
 * URL Centralization Module
 * All URL logic lives here — no hardcoded URLs scattered across components.
 */

/**
 * Get the base site URL from environment variable
 * @returns Base URL without trailing slash (e.g., "https://ofeklabs.com")
 */
export function getBaseUrl(): string {
    const envUrl = process.env.NEXT_PUBLIC_SITE_URL;

    if (envUrl && envUrl.trim()) {
        return envUrl.replace(/\/+$/, "");
    }

    return "https://ofeklabs.com";
}

/**
 * Get a product URL by product ID from a products array
 * @param productId - The ID of the product
 * @param products - Array of products (from Sanity)
 * @returns Product URL or null if not found
 */
export function getProductUrl(productId: string, products: any[] = []): string | null {
    try {
        const product = products.find((p: any) => p.id === productId);
        return product?.url ?? null;
    } catch (error) {
        console.error(`Error retrieving product URL for ${productId}:`, error);
        return null;
    }
}

/**
 * Build a full URL from a relative path
 * @param path - Relative path (with or without leading slash)
 * @returns Full URL (e.g., "https://ofeklabs.com/about")
 */
export function buildFullUrl(path: string): string {
    const baseUrl = getBaseUrl();

    if (!path || path.trim() === "") {
        return baseUrl;
    }

    const cleanPath = path.replace(/^\/+/, "").replace(/\/+/g, "/");
    const normalizedPath = cleanPath ? `/${cleanPath}` : "";

    const fullUrl = `${baseUrl}${normalizedPath}`;
    return fullUrl.replace(/\/+$/, "");
}

/**
 * Get all product URLs as a map
 * @param products - Array of products (from Sanity)
 * @returns Record of product IDs to URLs
 */
export function getAllProductUrls(products: any[] = []): Record<string, string> {
    const urlMap: Record<string, string> = {};

    for (const product of products) {
        if (product.id && product.url) {
            urlMap[product.id] = product.url;
        }
    }

    return urlMap;
}
