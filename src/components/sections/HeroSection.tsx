import type { SiteConfig } from '@/types';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { FadeIn } from '@/components/motion/FadeIn';

interface HeroSectionProps {
  config: SiteConfig;
}

export function HeroSection({ config }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      <Container>
        <FadeIn duration={400}>
          <div className="relative z-10 max-w-3xl">
            {/* Status line */}
            <div className="flex items-center gap-3 mb-8">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-mono text-[var(--muted)]">Building in production</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--foreground)] leading-[1.1] mb-6">
              Independent software lab.<br />
              <span className="text-[var(--muted)]">Production-grade systems.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-[var(--muted)] max-w-xl leading-relaxed mb-10">
              OfekLabs designs and ships complete software products — from authentication and scheduling to workflow platforms. Built for reliability, not demos.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Button href="#products" size="lg">
                View Products
              </Button>
              <a
                href="#capabilities"
                className="inline-flex items-center h-12 px-6 text-sm font-medium text-[var(--muted)] border border-[var(--card-border)] rounded-lg hover:text-[var(--foreground)] hover:border-[var(--card-hover-border)] transition-colors duration-200"
              >
                What we build →
              </a>
            </div>
          </div>

          {/* Terminal-inspired visual */}
          <div className="hidden lg:block absolute top-1/2 right-0 -translate-y-1/2 translate-x-[10%] w-[420px] opacity-60">
            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 font-mono text-xs text-[var(--muted)] shadow-2xl">
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[var(--card-border)]">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
                <span className="ml-2 text-[10px] text-[var(--muted)]">ofeklabs — systems</span>
              </div>
              <div className="space-y-1.5">
                <p><span className="text-emerald-400">→</span> shifter.ofeklabs.com <span className="text-emerald-400">live</span></p>
                <p><span className="text-[var(--muted)]">  ├─</span> auth: multi-tenant</p>
                <p><span className="text-[var(--muted)]">  ├─</span> scheduler: CP-SAT engine</p>
                <p><span className="text-[var(--muted)]">  ├─</span> api: REST + WebSocket</p>
                <p><span className="text-[var(--muted)]">  └─</span> deploy: Vercel + Railway</p>
                <p className="mt-3"><span className="text-blue-400">→</span> next project <span className="text-yellow-400">in progress</span></p>
                <p><span className="text-[var(--muted)]">  └─</span> status: architecture phase</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
