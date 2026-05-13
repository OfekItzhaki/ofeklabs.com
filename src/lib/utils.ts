import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ContactFormData, ContactFormErrors, Product } from '@/types';

/**
 * Combines clsx and tailwind-merge for conditional class names.
 * Resolves Tailwind class conflicts intelligently.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Truncates a string to a maximum length.
 * Returns the input unchanged if it is shorter than or equal to maxLength.
 */
export function truncate(input: string, maxLength: number): string {
  if (input.length <= maxLength) {
    return input;
  }
  return input.slice(0, maxLength);
}

/**
 * Returns at most N sentences from the input string.
 * Sentences are split on '.', '!', or '?'.
 * The output is always a prefix of the original string.
 */
export function truncateToSentences(input: string, maxSentences: number): string {
  if (maxSentences <= 0) {
    return '';
  }

  let count = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char === '.' || char === '!' || char === '?') {
      count++;
      if (count >= maxSentences) {
        return input.slice(0, i + 1);
      }
    }
  }

  // Fewer sentences than maxSentences — return the full input
  return input;
}

/**
 * Returns a formatted copyright string: © {currentYear} {name}
 */
export function formatCopyright(name: string): string {
  const currentYear = new Date().getFullYear();
  return `© ${currentYear} ${name}`;
}

/**
 * Classifies a CTA target string as 'anchor' (in-page) or 'external' (new tab).
 * - Starts with '#' → anchor
 * - Starts with 'http://' or 'https://' → external
 * - All other cases default to 'anchor'
 */
export function classifyCta(target: string): 'anchor' | 'external' {
  if (target.startsWith('http://') || target.startsWith('https://')) {
    return 'external';
  }
  return 'anchor';
}

/**
 * Validates contact form data.
 * - name: must be non-empty
 * - email: must match a valid email format
 * - message: must be at least 10 characters
 *
 * Returns an object with error strings for invalid fields.
 * Returns an empty object if all fields are valid.
 */
export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'Name is required';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.message || data.message.length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return errors;
}

/**
 * Sorts products by the `order` field ascending.
 * Products without an order value appear last.
 */
export function sortProducts(products: Product[]): Product[] {
  return [...products].sort((a, b) => {
    if (a.order == null && b.order == null) return 0;
    if (a.order == null) return 1;
    if (b.order == null) return -1;
    return a.order - b.order;
  });
}
