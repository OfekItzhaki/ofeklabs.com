import type { Product, SectionHeadings } from '@/types';
import { ProductCard } from '@/components/ui/ProductCard';
import ScrollReveal from '@/components/motion/ScrollReveal';
import { Container } from '@/components/ui/Container';

interface ProductsSectionProps {
  products: Product[];
  headings?: SectionHeadings;
}

export function ProductsSection({ products, headings }: ProductsSectionProps) {
  if (products.length === 0) {
    return null;
  }

  const title = headings?.productsTitle || 'Our Products';

  return (
    <section id="products" className="py-24 relative">
      <Container>
        <h2 className="mb-10 text-3xl font-bold text-white">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product, index) => (
            <ScrollReveal key={product.id} delay={index * 100}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
