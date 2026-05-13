// Feature: ofeklabs-landing-page
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as fc from 'fast-check';
import { buildFullUrl, getProductUrl, getBaseUrl } from '@/config/urls';

describe('URL Module - Property-Based Tests', () => {
  describe('Property 8: URL path normalization', () => {
    // Feature: ofeklabs-landing-page, Property 8: URL path normalization
    // **Validates: Requirements 9.1, 14.1**
    it('buildFullUrl produces no consecutive forward slashes after protocol and no trailing slash', () => {
      fc.assert(
        fc.property(fc.string(), (path) => {
          const result = buildFullUrl(path);

          // After the protocol "://", there should be no consecutive forward slashes
          const afterProtocol = result.replace(/^https?:\/\//, '');
          expect(afterProtocol).not.toMatch(/\/\//);

          // No trailing forward slash
          expect(result).not.toMatch(/\/$/);
        }),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 9: Product URL lookup', () => {
    // Feature: ofeklabs-landing-page, Property 9: Product URL lookup
    // **Validates: Requirements 9.2, 9.3, 14.3**
    it('getProductUrl returns the correct URL for matching IDs and null for non-matching IDs', () => {
      const productArb = fc.record({
        id: fc.string({ minLength: 1 }),
        url: fc.webUrl(),
      });

      fc.assert(
        fc.property(
          fc.array(productArb, { minLength: 0, maxLength: 20 }),
          fc.string({ minLength: 1 }),
          (products, searchId) => {
            const result = getProductUrl(searchId, products);
            const matchingProduct = products.find((p) => p.id === searchId);

            if (matchingProduct) {
              expect(result).toBe(matchingProduct.url);
            } else {
              expect(result).toBeNull();
            }
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 10: Base URL trailing slash normalization', () => {
    // Feature: ofeklabs-landing-page, Property 10: Base URL trailing slash normalization
    // **Validates: Requirements 9.5**
    const originalEnv = process.env.NEXT_PUBLIC_SITE_URL;

    afterEach(() => {
      if (originalEnv !== undefined) {
        process.env.NEXT_PUBLIC_SITE_URL = originalEnv;
      } else {
        delete process.env.NEXT_PUBLIC_SITE_URL;
      }
    });

    it('getBaseUrl returns the URL with all trailing slashes removed', () => {
      const trailingSlashesArb = fc.integer({ min: 1, max: 5 }).map((n) => '/'.repeat(n));

      fc.assert(
        fc.property(
          fc.webUrl(),
          trailingSlashesArb,
          (baseUrl, trailingSlashes) => {
            // Remove any existing trailing slashes from the base URL first
            const cleanBase = baseUrl.replace(/\/+$/, '');
            const urlWithSlashes = cleanBase + trailingSlashes;

            process.env.NEXT_PUBLIC_SITE_URL = urlWithSlashes;
            const result = getBaseUrl();

            // Result should not end with a slash
            expect(result).not.toMatch(/\/$/);
            // Result should equal the clean base URL
            expect(result).toBe(cleanBase);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 12: buildFullUrl whitespace handling', () => {
    // Feature: ofeklabs-landing-page, Property 12: buildFullUrl whitespace handling
    // **Validates: Requirements 14.2**
    it('buildFullUrl with whitespace-only input returns exactly getBaseUrl()', () => {
      const whitespaceArb = fc.string({ unit: fc.constantFrom(' ', '\t', '\n', '\r', '\f', '\v'), minLength: 1, maxLength: 50 });

      fc.assert(
        fc.property(whitespaceArb, (whitespaceStr) => {
          const result = buildFullUrl(whitespaceStr);
          const baseUrl = getBaseUrl();

          expect(result).toBe(baseUrl);
        }),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 13: buildFullUrl round-trip', () => {
    // Feature: ofeklabs-landing-page, Property 13: buildFullUrl round-trip
    // **Validates: Requirements 14.5**
    it('building a full URL and extracting the path produces the original normalized path', () => {
      // Generate valid path segments: alphanumeric, hyphens, underscores
      const segmentArb = fc.string({
        unit: fc.constantFrom(
          ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_'.split('')
        ),
        minLength: 1,
        maxLength: 20,
      });

      // Build a path from segments joined by /
      const pathArb = fc
        .array(segmentArb, { minLength: 1, maxLength: 5 })
        .map((segments) => segments.join('/'));

      fc.assert(
        fc.property(pathArb, (path) => {
          const fullUrl = buildFullUrl(path);
          const baseUrl = getBaseUrl();

          // Extract the path portion by removing the base URL
          const extractedPath = fullUrl.slice(baseUrl.length);

          // The normalized path should have exactly one leading slash and no trailing slash
          const normalizedOriginal = '/' + path.replace(/^\/+/, '').replace(/\/+$/, '');

          expect(extractedPath).toBe(normalizedOriginal);
        }),
        { numRuns: 100 }
      );
    });
  });
});
