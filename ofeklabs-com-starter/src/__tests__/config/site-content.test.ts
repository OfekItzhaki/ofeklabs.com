// Feature: ofeklabs-landing-page
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as fc from 'fast-check';

vi.mock('@/lib/sanity', () => ({
  getSiteConfig: vi.fn(),
  getProducts: vi.fn(),
}));

import { getSiteConfiguration } from '@/config/site-content';
import { getSiteConfig } from '@/lib/sanity';

const mockedGetSiteConfig = vi.mocked(getSiteConfig);

describe('Property 1: Fallback configuration completeness', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Feature: ofeklabs-landing-page, Property 1: Fallback configuration completeness
  // **Validates: Requirements 1.2, 1.5**
  it('should return a complete configuration with non-empty values when Sanity returns null', async () => {
    await fc.assert(
      fc.asyncProperty(fc.constant(null), async () => {
        mockedGetSiteConfig.mockResolvedValue(null);

        const config = await getSiteConfiguration();

        // Verify all required fields are non-empty strings
        expect(config.name).toBeTruthy();
        expect(typeof config.name).toBe('string');
        expect(config.name.length).toBeGreaterThan(0);

        expect(config.contact.email).toBeTruthy();
        expect(typeof config.contact.email).toBe('string');
        expect(config.contact.email.length).toBeGreaterThan(0);

        expect(config.socials.github).toBeTruthy();
        expect(typeof config.socials.github).toBe('string');
        expect(config.socials.github!.length).toBeGreaterThan(0);

        expect(config.socials.linkedin).toBeTruthy();
        expect(typeof config.socials.linkedin).toBe('string');
        expect(config.socials.linkedin!.length).toBeGreaterThan(0);

        expect(config.hero?.headline).toBeTruthy();
        expect(typeof config.hero?.headline).toBe('string');
        expect(config.hero!.headline.length).toBeGreaterThan(0);

        expect(config.hero?.subheadline).toBeTruthy();
        expect(typeof config.hero?.subheadline).toBe('string');
        expect(config.hero!.subheadline.length).toBeGreaterThan(0);

        expect(config.hero?.ctaText).toBeTruthy();
        expect(typeof config.hero?.ctaText).toBe('string');
        expect(config.hero!.ctaText.length).toBeGreaterThan(0);

        expect(config.hero?.ctaTarget).toBeTruthy();
        expect(typeof config.hero?.ctaTarget).toBe('string');
        expect(config.hero!.ctaTarget.length).toBeGreaterThan(0);

        expect(config.description).toBeTruthy();
        expect(typeof config.description).toBe('string');
        expect(config.description!.length).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });

  it('should return a complete configuration with non-empty values when Sanity returns undefined', async () => {
    await fc.assert(
      fc.asyncProperty(fc.constant(undefined), async () => {
        mockedGetSiteConfig.mockResolvedValue(undefined as any);

        const config = await getSiteConfiguration();

        expect(config.name.length).toBeGreaterThan(0);
        expect(config.contact.email.length).toBeGreaterThan(0);
        expect(config.socials.github!.length).toBeGreaterThan(0);
        expect(config.socials.linkedin!.length).toBeGreaterThan(0);
        expect(config.hero!.headline.length).toBeGreaterThan(0);
        expect(config.hero!.subheadline.length).toBeGreaterThan(0);
        expect(config.hero!.ctaText.length).toBeGreaterThan(0);
        expect(config.hero!.ctaTarget.length).toBeGreaterThan(0);
        expect(config.description!.length).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });

  it('should fill missing fields from defaults when Sanity returns partial data', async () => {
    // Generate arbitrary partial config objects with some fields missing
    const partialConfigArb = fc.record({
      name: fc.option(fc.string({ minLength: 0, maxLength: 5 }), { nil: undefined }),
      tagline: fc.option(fc.string(), { nil: undefined }),
      description: fc.option(fc.string({ minLength: 0, maxLength: 5 }), { nil: undefined }),
      domain: fc.option(fc.string(), { nil: undefined }),
      email: fc.option(fc.string({ minLength: 0, maxLength: 5 }), { nil: undefined }),
      contact: fc.option(
        fc.record({
          email: fc.option(fc.string({ minLength: 0, maxLength: 5 }), { nil: undefined }),
          whatsapp: fc.option(fc.string(), { nil: undefined }),
          phone: fc.option(fc.string(), { nil: undefined }),
        }),
        { nil: undefined }
      ),
      socials: fc.option(
        fc.record({
          github: fc.option(fc.string({ minLength: 0, maxLength: 5 }), { nil: undefined }),
          linkedin: fc.option(fc.string({ minLength: 0, maxLength: 5 }), { nil: undefined }),
          twitter: fc.option(fc.string(), { nil: undefined }),
        }),
        { nil: undefined }
      ),
      hero: fc.option(
        fc.record({
          headline: fc.option(fc.string({ minLength: 0, maxLength: 5 }), { nil: undefined }),
          subheadline: fc.option(fc.string({ minLength: 0, maxLength: 5 }), { nil: undefined }),
          ctaText: fc.option(fc.string({ minLength: 0, maxLength: 5 }), { nil: undefined }),
          ctaTarget: fc.option(fc.string({ minLength: 0, maxLength: 5 }), { nil: undefined }),
        }),
        { nil: undefined }
      ),
    });

    await fc.assert(
      fc.asyncProperty(partialConfigArb, async (partialConfig) => {
        mockedGetSiteConfig.mockResolvedValue(partialConfig as any);

        const config = await getSiteConfiguration();

        // All required fields must be non-empty strings regardless of input
        expect(config.name.length).toBeGreaterThan(0);
        expect(config.contact.email.length).toBeGreaterThan(0);
        expect(config.socials.github!.length).toBeGreaterThan(0);
        expect(config.socials.linkedin!.length).toBeGreaterThan(0);
        expect(config.hero!.headline.length).toBeGreaterThan(0);
        expect(config.hero!.subheadline.length).toBeGreaterThan(0);
        expect(config.hero!.ctaText.length).toBeGreaterThan(0);
        expect(config.hero!.ctaTarget.length).toBeGreaterThan(0);
        expect(config.description!.length).toBeGreaterThan(0);
      }),
      { numRuns: 100 }
    );
  });
});
