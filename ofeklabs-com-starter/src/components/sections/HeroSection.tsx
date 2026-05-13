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
      className="relative min-h-[85vh] flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background glow */}
      <div className="hero-glow" aria-hidden="true" />

      <Container>
        <FadeIn duration={400}>
          <div className="relative z-10 flex flex-col items-center text-center space-y-8">
            {headline && (
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.1]">
                {headline}
              </h1>
            )}
            {subheadline && (
              <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-relaxed">
                {subheadline}
              </p>
            )}
            {ctaText && ctaTarget && (
              <div className="pt-2">
                <Button href={ctaTarget} size="lg">
                  {ctaText}
                </Button>
              </div>
            )}
          </div>
        </FadeIn>
      </Container>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent pointer-events-none" />
    </section>
  );
}
