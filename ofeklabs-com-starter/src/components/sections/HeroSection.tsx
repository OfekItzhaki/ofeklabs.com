import type { SiteConfig } from '@/types';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/motion/FadeIn';

interface HeroSectionProps {
  config: SiteConfig;
}

export function HeroSection({ config }: HeroSectionProps) {
  const headline = config.hero?.headline;
  const subheadline = config.hero?.subheadline;
  const ctaText = config.hero?.ctaText;
  const ctaTarget = config.hero?.ctaTarget;

  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--background)] to-transparent pointer-events-none" />

      <Container>
        <FadeIn duration={400}>
          <div className="relative z-10 flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            {/* Badge/tagline above headline */}
            {config.tagline && (
              <div className="inline-flex items-center rounded-full border border-[var(--card-border)] bg-[var(--card)] px-4 py-1.5 text-sm text-[var(--muted)]">
                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                {config.tagline}
              </div>
            )}

            {headline && (
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-[var(--foreground)] leading-[1.05]">
                {headline}
              </h1>
            )}
            {subheadline && (
              <p className="text-lg md:text-xl lg:text-2xl text-[var(--muted)] max-w-2xl leading-relaxed">
                {subheadline}
              </p>
            )}
            {ctaText && ctaTarget && (
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <Button href={ctaTarget} size="lg">
                  {ctaText}
                </Button>
                <a
                  href="#about"
                  className="text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-200"
                >
                  Learn more →
                </a>
              </div>
            )}
          </div>
        </FadeIn>
      </Container>

    </section>
  );
}
