import { Container } from '@/components/ui/Container';
import ScrollReveal from '@/components/motion/ScrollReveal';

const values = [
  {
    icon: '🎯',
    title: 'Solve Real Problems',
    description: 'Every product starts from a real pain point. We build what people actually need, not what sounds impressive.',
  },
  {
    icon: '⚙️',
    title: 'Works Out of the Box',
    description: 'No complex setup, no steep learning curve. Our tools are ready to use from day one.',
  },
  {
    icon: '🔄',
    title: 'Continuously Improved',
    description: 'We ship updates based on real user feedback. Products get better every week.',
  },
];

const stats = [
  { value: '5+', label: 'Active teams' },
  { value: '1,000+', label: 'Schedules created' },
  { value: '99.9%', label: 'Uptime' },
];

export function ValueSection() {
  return (
    <section className="py-24 relative">
      <div className="section-divider" aria-hidden="true" />

      {/* Stats bar */}
      <Container>
        <div className="mt-16 mb-20 grid grid-cols-3 gap-4 max-w-lg mx-auto text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl md:text-3xl font-bold text-[var(--foreground)]">{stat.value}</div>
              <div className="text-xs md:text-sm text-[var(--muted)] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Value cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <ScrollReveal key={value.title} delay={index * 100}>
              <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-8 text-center hover:border-[var(--card-hover-border)] transition-colors duration-300">
                <div className="text-3xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-3">{value.title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{value.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
