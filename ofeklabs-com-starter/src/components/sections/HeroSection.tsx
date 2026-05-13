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
      className="min-h-screen flex items-center justify-center pt-20"
    >
      <Container>
        <FadeIn duration={400}>
          <div className="flex flex-col items-center text-center space-y-6">
            {headline && (
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                {headline}
              </h1>
            )}
            {subheadline && (
              <p className="text-lg md:text-xl text-[#A1A1AA] max-w-2xl">
                {subheadline}
              </p>
            )}
            {ctaText && ctaTarget && (
              <Button href={ctaTarget} size="lg">
                {ctaText}
              </Button>
            )}
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
