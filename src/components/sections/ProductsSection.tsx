import type { Product, SectionHeadings } from '@/types';
import ScrollReveal from '@/components/motion/ScrollReveal';
import { Container } from '@/components/ui/Container';

interface ProductsSectionProps {
  products: Product[];
  headings?: SectionHeadings;
}

export function ProductsSection({ products }: ProductsSectionProps) {
  if (products.length === 0) {
    return null;
  }

  const featured = products[0];
  const rest = products.slice(1);

  return (
    <section id="products" className="py-24">
      <Container>
        <ScrollReveal>
          <div className="mb-12">
            <p className="text-sm font-mono text-[var(--accent)] mb-3">// products</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] tracking-tight">
              Shipped & running
            </h2>
          </div>
        </ScrollReveal>

        {/* Featured product */}
        {featured && (
          <ScrollReveal>
            <a
              href={featured.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group mb-6"
            >
              <div className="p-6 md:p-8 rounded-xl border border-[var(--card-border)] bg-[var(--card)] hover:border-[var(--card-hover-border)] transition-colors duration-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                      {featured.name}
                    </h3>
                    {featured.tagline && (
                      <p className="mt-1 text-[var(--muted)]">{featured.tagline}</p>
                    )}
                  </div>
                  <span className="shrink-0 ml-4 px-2.5 py-1 text-xs font-mono rounded-md border border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                    {featured.badge || 'live'}
                  </span>
                </div>
                {featured.description && (
                  <p className="text-sm text-[var(--muted)] leading-relaxed max-w-2xl mb-4">
                    {featured.description}
                  </p>
                )}
                {featured.features && featured.features.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {featured.features.slice(0, 4).map((feature) => (
                      <span
                        key={feature}
                        className="px-2.5 py-1 text-xs font-mono text-[var(--muted)] border border-[var(--card-border)] rounded-md"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </a>
          </ScrollReveal>
        )}

        {/* Other products */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rest.map((product, index) => (
              <ScrollReveal key={product.id} delay={index * 80}>
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group h-full"
                >
                  <div className="h-full p-5 rounded-lg border border-[var(--card-border)] bg-[var(--card)] hover:border-[var(--card-hover-border)] transition-colors duration-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                        {product.name}
                      </h3>
                      <span className="text-xs font-mono text-[var(--muted)]">
                        {product.badge || product.status}
                      </span>
                    </div>
                    {product.tagline && (
                      <p className="text-sm text-[var(--muted)]">{product.tagline}</p>
                    )}
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
