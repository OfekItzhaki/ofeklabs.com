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
              One engineer. Full stack. End to end.
            </h2>
            <div className="space-y-4 text-[var(--muted)] leading-relaxed">
              <p>
                OfekLabs is a one-person software lab. I architect, build, and operate production systems — from database schema and API design to deployment pipelines and monitoring.
              </p>
              <p>
                Backend-heavy by nature: multi-tenant SaaS, constraint-solving algorithms, auth systems, real-time infrastructure. Every product ships with the same rigor you&apos;d expect from a well-staffed engineering team.
              </p>
            </div>

            {/* Tech identity markers */}
            <div className="mt-8 flex flex-wrap gap-2">
              {['TypeScript', 'Next.js', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'Vercel', 'Railway'].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono text-[var(--muted)] border border-[var(--card-border)] rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
