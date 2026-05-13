import type { Product, SubdomainEntry } from '@/types';

const SCRAPE_TIMEOUT_MS = 10000;
const BASE_DOMAIN = 'ofeklabs.com';

/**
 * Scrapes product information from a subdomain's landing page.
 * Extracts title, tagline, description, and features from the HTML.
 */
async function scrapeSubdomain(entry: SubdomainEntry): Promise<Product | null> {
  const url = `https://${entry.slug}.${BASE_DOMAIN}`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), SCRAPE_TIMEOUT_MS);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'OfekLabs-ProductDiscovery/1.0',
      },
    });

    clearTimeout(timeout);

    if (!response.ok) {
      console.warn(`[Scraper] ${url} returned ${response.status}`);
      return null;
    }

    const html = await response.text();
    const product = parseProductFromHtml(html, entry, url);
    return product;
  } catch (error) {
    console.warn(`[Scraper] Failed to fetch ${url}:`, error instanceof Error ? error.message : 'Unknown error');
    return null;
  }
}

/**
 * Parses product information from raw HTML.
 * Uses regex-based extraction (no DOM parser needed on server).
 */
function parseProductFromHtml(html: string, entry: SubdomainEntry, url: string): Product {
  // Extract title from <title> tag or first <h1>
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
    || html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  const rawTitle = titleMatch?.[1]?.trim() || entry.slug;

  // Extract meta description
  const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)
    || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i);
  const description = metaDescMatch?.[1]?.trim() || '';

  // Extract first meaningful paragraph as tagline (from hero area)
  const taglineMatch = html.match(/<h1[^>]*>[^<]*<\/h1>\s*(?:<[^>]+>)*\s*<p[^>]*>([^<]+)<\/p>/i);
  const tagline = taglineMatch?.[1]?.trim() || description.split('.')[0] || '';

  // Extract features from h3 headings (common pattern for feature sections)
  const featureMatches = html.matchAll(/<h3[^>]*>([^<]+)<\/h3>/gi);
  const features: string[] = [];
  for (const match of featureMatches) {
    const feature = match[1].trim();
    if (feature.length > 2 && feature.length < 60) {
      features.push(feature);
    }
    if (features.length >= 6) break;
  }

  return {
    id: entry.slug,
    name: entry.overrideName || cleanTitle(rawTitle),
    tagline: entry.overrideTagline || tagline,
    description,
    status: entry.status || 'active',
    badge: getBadgeText(entry.status || 'active'),
    url,
    features: features.slice(0, 4),
    order: entry.order,
  };
}

/**
 * Cleans a page title by removing common suffixes like " | Company Name"
 */
function cleanTitle(title: string): string {
  // Remove common title separators and suffixes
  return title
    .replace(/\s*[|–—-]\s*.+$/, '')
    .replace(/\s*·\s*.+$/, '')
    .trim();
}

/**
 * Maps product status to badge display text
 */
function getBadgeText(status: string): string {
  const badges: Record<string, string> = {
    active: 'Live',
    beta: 'Beta',
    dev: 'In Development',
    'coming-soon': 'Coming Soon',
  };
  return badges[status] || 'Live';
}

/**
 * Fetches product data from all enabled subdomains.
 * Returns an array of Product objects scraped from subdomain landing pages.
 */
export async function getProductsFromSubdomains(subdomains: SubdomainEntry[] | undefined): Promise<Product[]> {
  if (!subdomains || subdomains.length === 0) {
    return [];
  }

  const enabledSubdomains = subdomains.filter((s) => s.enabled !== false);

  if (enabledSubdomains.length === 0) {
    return [];
  }

  const results = await Promise.allSettled(
    enabledSubdomains.map((entry) => scrapeSubdomain(entry))
  );

  const products: Product[] = [];
  for (const result of results) {
    if (result.status === 'fulfilled' && result.value) {
      products.push(result.value);
    }
  }

  return products;
}
