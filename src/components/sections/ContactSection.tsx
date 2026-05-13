'use client';

import { useState } from 'react';
import type { SiteConfig, ContactFormData, ContactFormErrors, SectionHeadings } from '@/types';
import { validateContactForm } from '@/lib/utils';
import { Container } from '@/components/ui/Container';
import { SocialLinks } from '@/components/ui/SocialLinks';
import ScrollReveal from '@/components/motion/ScrollReveal';

interface ContactSectionProps {
  config: SiteConfig;
  headings?: SectionHeadings;
}

export default function ContactSection({ config, headings }: ContactSectionProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field being edited
    if (errors[name as keyof ContactFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitStatus('idle');

    const validationErrors = validateContactForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Simulate submission — in production this would call an API
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } catch {
      setSubmitStatus('error');
    }
  }

  const inputStyles =
    'w-full rounded-lg border border-[var(--card-border)] bg-[var(--card)] px-4 py-3 text-[var(--foreground)] placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-colors duration-200';

  return (
    <section id="contact" className="py-24 relative">
      <Container>
        <ScrollReveal>
          <div className="mx-auto max-w-2xl">
            <div className="mb-8">
              <p className="text-sm font-mono text-[var(--accent)] mb-3">// contact</p>
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] tracking-tight">
                Let&apos;s talk
              </h2>
              <p className="mt-3 text-[var(--muted)]">
                Building something complex? Have a technical problem that needs proper architecture? I&apos;m open to conversations.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-4">
              {config.contact.email && (
                <a
                  href={`mailto:${config.contact.email}`}
                  className="text-sm font-mono text-[var(--accent)] hover:underline"
                >
                  {config.contact.email}
                </a>
              )}
              <SocialLinks socials={config.socials} />
            </div>

            {submitStatus === 'success' && (
              <div
                className="mt-8 rounded-lg border border-green-500/30 bg-green-500/10 p-4 text-center text-green-400"
                role="status"
              >
                {headings?.contactSuccessMessage || 'Thank you! Your message has been sent successfully.'}
              </div>
            )}

            {submitStatus === 'error' && (
              <div
                className="mt-8 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-center text-red-400"
                role="alert"
              >
                {headings?.contactErrorMessage || 'Something went wrong. Please try again later.'}
              </div>
            )}

            {submitStatus !== 'success' && (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-8 flex flex-col gap-5"
              >
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block text-sm font-medium text-[var(--foreground)]"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    maxLength={100}
                    className={inputStyles}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-sm text-red-400">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block text-sm font-medium text-[var(--foreground)]"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    maxLength={254}
                    className={inputStyles}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-sm text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block text-sm font-medium text-[var(--foreground)]"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    maxLength={2000}
                    rows={5}
                    className={inputStyles}
                    placeholder="Your message (at least 10 characters)"
                  />
                  {errors.message && (
                    <p className="mt-1.5 text-sm text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="min-h-[44px] min-w-[44px] rounded-lg bg-[var(--accent)] px-5 py-2.5 font-medium text-white transition-colors duration-200 hover:bg-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] cursor-pointer"
                >
                  {headings?.contactSubmitText || 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
