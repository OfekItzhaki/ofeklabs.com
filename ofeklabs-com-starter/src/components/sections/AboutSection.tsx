import { truncateToSentences } from '@/lib/utils';
import { Container } from '@/components/ui/Container';
import ScrollReveal from '@/components/motion/ScrollReveal';
import type { SiteConfig } from '@/types';

interface AboutSectionProps {
  config: SiteConfig;
}

export default function AboutSection({ config }: AboutSectionProps) {
  if (!config.description) {
    return null;
  }

  const text = truncateToSentences(config.description, 3);

  return (
    <section id="about" className="py-24 relative">
      <div className="section-divider mb-24" aria-hidden="true" />
      <Container>
        <ScrollReveal>
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-[var(--accent)] mb-4">
              About
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Who we are
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              {text}
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
