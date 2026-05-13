import { Container } from '@/components/ui/Container';
import ScrollReveal from '@/components/motion/ScrollReveal';

const capabilities = [
  { label: 'SaaS Products', detail: 'Multi-tenant platforms with auth, billing, and real user workflows' },
  { label: 'Scheduling Systems', detail: 'Constraint-optimization engines for fair, automated shift distribution' },
  { label: 'Authentication & Identity', detail: 'JWT, refresh tokens, role-based access, session management' },
  { label: 'Backend Architecture', detail: 'REST APIs, WebSockets, job queues, database design, caching layers' },
  { label: 'Infrastructure', detail: 'CI/CD pipelines, containerization, monitoring, zero-downtime deploys' },
  { label: 'Frontend Engineering', detail: 'React/Next.js, server components, real-time UI, mobile-first design' },
];

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="py-24">
      <Container>
        <ScrollReveal>
          <div className="mb-12">
            <p className="text-sm font-mono text-[var(--accent)] mb-3">// capabilities</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] tracking-tight">
              Systems we build
            </h2>
            <p className="mt-4 text-[var(--muted)] max-w-lg">
              Each product starts from a real operational problem. The work spans the full stack, but the core is always backend architecture and reliable infrastructure.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {capabilities.map((cap, index) => (
            <ScrollReveal key={cap.label} delay={index * 50}>
              <div className="group p-5 rounded-lg border border-[var(--card-border)] bg-[var(--card)] hover:border-[var(--card-hover-border)] transition-colors duration-200">
                <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1">{cap.label}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{cap.detail}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
