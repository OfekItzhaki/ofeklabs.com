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
      <Container>
        <ScrollReveal>
          <div className="mt-16 text-center max-w-3xl mx-auto">
            <p className="text-sm font-medium uppercase tracking-widest text-[var(--accent)] mb-4">
              {label}
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[var(--foreground)]">
              {title}
            </h2>
            <p className="mt-8 text-lg leading-relaxed text-[var(--muted)]">
              {text}
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
