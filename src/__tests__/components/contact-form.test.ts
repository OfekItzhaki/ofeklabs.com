// Feature: ofeklabs-landing-page, Property 6: Contact form validation
import { describe, it, expect } from 'vitest';
import * as fc from 'fast-check';
import { validateContactForm } from '@/lib/utils';
import type { ContactFormData } from '@/types';

/**
 * **Validates: Requirements 7.4, 7.6**
 *
 * Property 6: Contact form validation
 * For any ContactFormData object, validateContactForm(data) SHALL return errors
 * for exactly the fields that are invalid:
 * - name is invalid if empty (after trimming)
 * - email is invalid if it does not match a standard email format
 * - message is invalid if fewer than 10 characters
 *
 * If all fields are valid, the function SHALL return an empty object (no keys).
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Arbitrary for valid names (non-empty after trimming)
const validNameArb = fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0);

// Arbitrary for invalid names (empty after trimming)
const invalidNameArb = fc.constantFrom('', ' ', '  ', '\t', '\n', '   \t\n  ');

// Arbitrary for valid emails matching the regex
const validEmailArb = fc
  .tuple(
    fc.string({ minLength: 1 }).filter((s) => !s.includes('@') && !s.includes(' ') && s.length > 0),
    fc.string({ minLength: 1 }).filter((s) => !s.includes('@') && !s.includes(' ') && s.length > 0),
    fc.string({ minLength: 1 }).filter((s) => !s.includes('@') && !s.includes(' ') && s.length > 0)
  )
  .map(([local, domain, tld]) => `${local}@${domain}.${tld}`)
  .filter((email) => EMAIL_REGEX.test(email));

// Arbitrary for invalid emails (don't match the regex)
const invalidEmailArb = fc.oneof(
  fc.constant(''),
  fc.constant('plaintext'),
  fc.constant('missing@tld'),
  fc.constant('@nodomain.com'),
  fc.constant('spaces in@email.com'),
  fc.string().filter((s) => !EMAIL_REGEX.test(s))
);

// Arbitrary for valid messages (>= 10 characters)
const validMessageArb = fc.string({ minLength: 10 });

// Arbitrary for invalid messages (< 10 characters)
const invalidMessageArb = fc.string({ minLength: 0, maxLength: 9 });

describe('Property 6: Contact form validation', () => {
  it('returns no errors when all fields are valid', () => {
    fc.assert(
      fc.property(validNameArb, validEmailArb, validMessageArb, (name, email, message) => {
        const data: ContactFormData = { name, email, message };
        const errors = validateContactForm(data);
        expect(Object.keys(errors)).toHaveLength(0);
      }),
      { numRuns: 100 }
    );
  });

  it('returns a name error if and only if name is empty after trimming', () => {
    fc.assert(
      fc.property(
        fc.oneof(validNameArb, invalidNameArb),
        validEmailArb,
        validMessageArb,
        (name, email, message) => {
          const data: ContactFormData = { name, email, message };
          const errors = validateContactForm(data);
          const nameIsInvalid = name.trim().length === 0;

          if (nameIsInvalid) {
            expect(errors.name).toBeDefined();
          } else {
            expect(errors.name).toBeUndefined();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('returns an email error if and only if email does not match the standard format', () => {
    fc.assert(
      fc.property(
        validNameArb,
        fc.oneof(validEmailArb, invalidEmailArb),
        validMessageArb,
        (name, email, message) => {
          const data: ContactFormData = { name, email, message };
          const errors = validateContactForm(data);
          const emailIsInvalid = !EMAIL_REGEX.test(email);

          if (emailIsInvalid) {
            expect(errors.email).toBeDefined();
          } else {
            expect(errors.email).toBeUndefined();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('returns a message error if and only if message is fewer than 10 characters', () => {
    fc.assert(
      fc.property(
        validNameArb,
        validEmailArb,
        fc.oneof(validMessageArb, invalidMessageArb),
        (name, email, message) => {
          const data: ContactFormData = { name, email, message };
          const errors = validateContactForm(data);
          const messageIsInvalid = message.length < 10;

          if (messageIsInvalid) {
            expect(errors.message).toBeDefined();
          } else {
            expect(errors.message).toBeUndefined();
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it('returns errors for exactly the invalid fields (combined property)', () => {
    fc.assert(
      fc.property(
        fc.oneof(validNameArb, invalidNameArb),
        fc.oneof(validEmailArb, invalidEmailArb),
        fc.oneof(validMessageArb, invalidMessageArb),
        (name, email, message) => {
          const data: ContactFormData = { name, email, message };
          const errors = validateContactForm(data);

          const nameIsInvalid = name.trim().length === 0;
          const emailIsInvalid = !EMAIL_REGEX.test(email);
          const messageIsInvalid = message.length < 10;

          // Errors should be present for exactly the invalid fields
          if (nameIsInvalid) {
            expect(errors.name).toBeDefined();
          } else {
            expect(errors.name).toBeUndefined();
          }

          if (emailIsInvalid) {
            expect(errors.email).toBeDefined();
          } else {
            expect(errors.email).toBeUndefined();
          }

          if (messageIsInvalid) {
            expect(errors.message).toBeDefined();
          } else {
            expect(errors.message).toBeUndefined();
          }

          // If all valid, no keys
          if (!nameIsInvalid && !emailIsInvalid && !messageIsInvalid) {
            expect(Object.keys(errors)).toHaveLength(0);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
