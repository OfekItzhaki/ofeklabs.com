import { Container } from '@/components/ui/Container';
import ScrollReveal from '@/components/motion/ScrollReveal';

export function BuilderSection() {
  return (
    <section id="about" className="py-24">
      <Container>
        <ScrollReveal>
          <div className="max-w-2xl">
            <p className="text-sm font-mono text-[var(--accent)] mb-3">// builder</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] tracking-tight mb-6">
              One engineer. Complete systems.
            </h2>
            <div className="space-y-4 text-[var(--muted)] leading-relaxed">
              <p>
                OfekLabs is a one-person software lab. I design, build, and ship production systems end-to-end — from database schema to deployed product.
              </p>
              <p>
                My focus is backend-heavy full-stack work: multi-tenant architectures, scheduling algorithms, authentication flows, and the infrastructure that keeps it all running. I care about code that&apos;s maintainable, systems that scale, and products that actually solve problems.
              </p>
              <p>
                Every product here is built with the same standards I&apos;d expect from a well-run engineering team — because that&apos;s the bar, regardless of team size.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
