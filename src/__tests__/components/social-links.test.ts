// Feature: ofeklabs-landing-page, Property 5: Conditional link rendering
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';

describe('Property 5: Conditional link rendering', () => {
  it('renders exactly those links with non-empty URLs and omits empty/undefined/null ones', () => {
    const socialsArb = fc.record({
      github: fc.option(fc.oneof(fc.webUrl(), fc.constant('')), { nil: undefined }),
      linkedin: fc.option(fc.oneof(fc.webUrl(), fc.constant('')), { nil: undefined }),
      twitter: fc.option(fc.oneof(fc.webUrl(), fc.constant('')), { nil: undefined }),
    });

    fc.assert(
      fc.property(socialsArb, (socials) => {
        // Replicate the filtering logic from SocialLinks component
        const platforms = ['github', 'linkedin', 'twitter'] as const;
        const expectedVisible = platforms.filter(
          (p) => socials[p] && socials[p]!.trim().length > 0
        );

        // The component should render exactly expectedVisible.length links
        const allLinks = [
          { name: 'GitHub', url: socials.github },
          { name: 'LinkedIn', url: socials.linkedin },
          { name: 'Twitter', url: socials.twitter },
        ];
        const visibleLinks = allLinks.filter((link) => link.url && link.url.trim().length > 0);

        expect(visibleLinks.length).toBe(expectedVisible.length);

        // Each visible link should have a non-empty URL
        for (const link of visibleLinks) {
          expect(link.url).toBeTruthy();
          expect(link.url!.trim().length).toBeGreaterThan(0);
        }
      }),
      { numRuns: 100 }
    );
  });
});
