import type { Product } from '@/types';
import { ProductCard } from '@/components/ui/ProductCard';
import ScrollReveal from '@/components/motion/ScrollReveal';
import { Container } from '@/components/ui/Container';

interface ProductsSectionProps {
  products: Product[];
}

export function ProductsSection({ products }: ProductsSectionProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section id="products" className="py-20">
      <Container>
        <h2 className="mb-10 text-3xl font-bold text-white">Our Products</h2>
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
