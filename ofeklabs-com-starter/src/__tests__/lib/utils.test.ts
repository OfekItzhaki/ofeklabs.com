// Feature: ofeklabs-landing-page
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { truncate, truncateToSentences, formatCopyright, classifyCta, sortProducts } from '@/lib/utils';

describe('Property-based tests for utility functions', () => {
  // Feature: ofeklabs-landing-page, Property 4: Sentence truncation
  describe('Property 4: Sentence truncation', () => {
    /**
     * Validates: Requirements 6.2
     */
    it('truncateToSentences returns at most maxSentences sentence-ending marks and output is a prefix of input', () => {
      fc.assert(
        fc.property(
          fc.string(),
          fc.integer({ min: 1, max: 20 }),
          (input, maxSentences) => {
            const result = truncateToSentences(input, maxSentences);

            // Count sentence-ending marks in the result
            const sentenceMarks = (result.match(/[.!?]/g) || []).length;
            expect(sentenceMarks).toBeLessThanOrEqual(maxSentences);

            // Output is always a prefix of the original string
            expect(input.startsWith(result)).toBe(true);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  // Feature: ofeklabs-landing-page, Property 7: Copyright notice formatting
  describe('Property 7: Copyright notice formatting', () => {
    /**
     * Validates: Requirements 8.3
     */
    it('formatCopyright produces a string matching © {currentYear} {name}', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1 }),
          (name) => {
            const result = formatCopyright(name);
            const currentYear = new Date().getFullYear();
            expect(result).toBe(`© ${currentYear} ${name}`);
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  // Feature: ofeklabs-landing-page, Property 11: String truncation to maximum length
  describe('Property 11: String truncation to maximum length', () => {
    /**
     * Validates: Requirements 12.1, 12.2
     */
    it('truncate returns a string whose length is at most maxLength, and equals input if input length <= maxLength', () => {
      fc.assert(
        fc.property(
          fc.string(),
          fc.integer({ min: 1, max: 1000 }),
          (input, maxLength) => {
            const result = truncate(input, maxLength);

            // Output length is at most maxLength
            expect(result.length).toBeLessThanOrEqual(maxLength);

            // If input length <= maxLength, output equals input
            if (input.length <= maxLength) {
              expect(result).toBe(input);
            }
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  // Feature: ofeklabs-landing-page, Property 2: CTA target classification
  describe('Property 2: CTA target classification', () => {
    /**
     * Validates: Requirements 3.5, 3.6
     */
    it('classifyCta returns anchor for # prefixed strings and external for http(s):// prefixed strings', () => {
      fc.assert(
        fc.property(
          fc.string({ minLength: 1 }),
          (suffix) => {
            // Strings starting with # should be classified as anchor
            const anchorTarget = `#${suffix}`;
            expect(classifyCta(anchorTarget)).toBe('anchor');

            // Strings starting with http:// should be classified as external
            const httpTarget = `http://${suffix}`;
            expect(classifyCta(httpTarget)).toBe('external');

            // Strings starting with https:// should be classified as external
            const httpsTarget = `https://${suffix}`;
            expect(classifyCta(httpsTarget)).toBe('external');
          }
        ),
        { numRuns: 100 }
      );
    });
  });
});


// Feature: ofeklabs-landing-page, Property 3: Product ordering invariant
describe('Property 3: Product ordering invariant', () => {
  /**
   * Validates: Requirements 4.3, 5.3
   */
  it('sortProducts produces correct ordering with undefined values last', () => {
    const productArb = fc.record({
      id: fc.string({ minLength: 1, maxLength: 10 }),
      name: fc.string({ minLength: 1, maxLength: 20 }),
      status: fc.constantFrom('active' as const, 'beta' as const, 'dev' as const, 'coming-soon' as const),
      badge: fc.string({ minLength: 1, maxLength: 10 }),
      url: fc.constant('https://example.com'),
      features: fc.array(fc.string({ minLength: 1 }), { minLength: 1, maxLength: 5 }),
      order: fc.option(fc.nat({ max: 1000 }), { nil: undefined }),
    });

    fc.assert(
      fc.property(
        fc.array(productArb, { minLength: 0, maxLength: 20 }),
        (products) => {
          const sorted = sortProducts(products as any);

          // All products with defined order come before those without
          let seenUndefined = false;
          for (const p of sorted) {
            if (p.order == null) {
              seenUndefined = true;
            } else if (seenUndefined) {
              // A defined order after an undefined one violates the invariant
              return false;
            }
          }

          // Among defined-order products, order values are non-decreasing
          const defined = sorted.filter(p => p.order != null);
          for (let i = 1; i < defined.length; i++) {
            if (defined[i].order! < defined[i - 1].order!) {
              return false;
            }
          }

          return true;
        }
      ),
      { numRuns: 100 }
    );
  });
});
