import { truncateToSentences } from '@/lib/utils';
import { Container } from '@/components/ui/Container';
import ScrollReveal from '@/components/motion/ScrollReveal';
import type { SiteConfig, SectionHeadings } from '@/types';

interface AboutSectionProps {
  config: SiteConfig;
  headings?: SectionHeadings;
}

export default function AboutSection({ config, headings }: AboutSectionProps) {
  if (!config.description) {
    return null;
  }

  const text = truncateToSentences(config.description, 3);
  const label = headings?.aboutLabel || 'About';
  const title = headings?.aboutTitle || 'Who we are';

  return (
    <section id="about" className="py-24 relative">
      <div className="section-divider mb-24" aria-hidden="true" />
      <Container>
        <ScrollReveal>
          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-[var(--accent)] mb-4">
              {label}
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {title}
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
