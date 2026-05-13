import { Container } from '@/components/ui/Container';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { formatCopyright } from '@/lib/utils';
import type { SiteConfig } from '@/types';

interface FooterProps {
  config: SiteConfig;
}

export function Footer({ config }: FooterProps) {
  const navLinks = config.navLinks?.length ? config.navLinks : [
    { label: 'Products', href: '#products' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const hasPrivacy = config.legal?.privacy && config.legal.privacy.trim().length > 0;
  const hasTerms = config.legal?.terms && config.legal.terms.trim().length > 0;

  return (
    <footer className="border-t border-[var(--card-border)] bg-[var(--card)] py-16 mt-12">
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Company info */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--foreground)]">{config.name}</h3>
            {config.tagline && (
              <p className="mt-2 text-sm text-[var(--muted)]">{config.tagline}</p>
            )}
          </div>

          {/* Navigation links */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--foreground)]">Navigation</h4>
            <ul className="mt-3 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--muted)] transition-colors duration-200 hover:text-[var(--foreground)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--foreground)]">Connect</h4>
            <div className="mt-3">
              <SocialLinks socials={config.socials} />
            </div>
          </div>
        </div>

        {/* Bottom bar: legal links + copyright */}
        <div className="mt-10 border-t border-[var(--card-border)] pt-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            {/* Legal links */}
            {(hasPrivacy || hasTerms) && (
              <div className="flex gap-4">
                {hasPrivacy && (
                  <a
                    href={config.legal!.privacy!}
                    className="text-xs text-zinc-500 transition-colors duration-200 hover:text-zinc-300"
                  >
                    Privacy Policy
                  </a>
                )}
                {hasTerms && (
                  <a
                    href={config.legal!.terms!}
                    className="text-xs text-zinc-500 transition-colors duration-200 hover:text-zinc-300"
                  >
                    Terms of Service
                  </a>
                )}
              </div>
            )}

            {/* Copyright */}
            <p className="text-xs text-zinc-500">
              {formatCopyright(config.name)}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
