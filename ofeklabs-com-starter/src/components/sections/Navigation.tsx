import type { SiteConfig, NavLink } from '@/types';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import MobileMenu from '@/components/motion/MobileMenu';

interface NavigationProps {
  config: SiteConfig;
}

const navLinks: NavLink[] = [
  { label: 'Products', href: '#products' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation({ config }: NavigationProps) {
  const ctaText = config.hero?.ctaText ?? 'Explore Products';
  const ctaHref = config.hero?.ctaTarget ?? '#products';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--card-border)]">
      <Container className="flex items-center justify-between h-16">
        {/* Logo / Company name */}
        <a
          href="#"
          className="text-lg font-semibold text-[var(--foreground)] whitespace-nowrap"
        >
          {config.name}
        </a>

        {/* Desktop navigation links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA button */}
        <div className="hidden md:block">
          <Button href={ctaHref} size="sm">
            {ctaText}
          </Button>
        </div>

        {/* Mobile menu */}
        <MobileMenu links={navLinks} ctaText={ctaText} ctaHref={ctaHref} />
      </Container>
    </header>
  );
}
