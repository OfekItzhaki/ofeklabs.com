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
              Solo lab. Production standards.
            </h2>
            <div className="space-y-4 text-[var(--muted)] leading-relaxed">
              <p>
                I run OfekLabs as a one-person operation. Every system goes from initial architecture through to production — schema design, API layer, deployment pipeline, monitoring. All one person, all the way through.
              </p>
              <p>
                The focus is backend-heavy: constraint solvers, multi-tenant data isolation, token-based auth, job queues, real-time sync. The frontend ships clean, but the hard problems are in the infrastructure underneath.
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
