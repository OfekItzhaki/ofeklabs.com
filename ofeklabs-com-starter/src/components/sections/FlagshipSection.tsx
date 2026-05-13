import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import imageUrlBuilder from '@sanity/image-url';
import { config } from '@/lib/sanity';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import ScrollReveal from '@/components/motion/ScrollReveal';
import type { Product } from '@/types';

interface FlagshipSectionProps {
  product: Product;
}

const builder = imageUrlBuilder(config);

function urlFor(source: { asset: { _ref: string } }) {
  return builder.image(source);
}

export default function FlagshipSection({ product }: FlagshipSectionProps) {
  const features = product.features.slice(0, 4);
  const hasScreenshot = product.screenshot?.asset?._ref;

  return (
    <section id="flagship" className="py-20">
      <Container>
        <ScrollReveal>
          <div
            className={`grid gap-12 items-center ${
              hasScreenshot ? 'md:grid-cols-2' : 'md:grid-cols-1'
            }`}
          >
            {/* Left: Product info */}
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {product.name}
              </h2>

              {product.description && (
                <p className="text-[var(--muted)]">{product.description}</p>
              )}

              {features.length > 0 && (
                <ul className="flex flex-col gap-3">
                  {features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-[var(--foreground)]"
                    >
                      <CheckCircle className="h-5 w-5 shrink-0 text-[var(--accent)]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div>
                <Button href={product.url} variant="primary">
                  Try it now
                </Button>
              </div>
            </div>

            {/* Right: Screenshot image */}
            {hasScreenshot && product.screenshot && (
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-[var(--card-border)]">
                <Image
                  src={urlFor(product.screenshot).width(800).height(450).url()}
                  alt={`${product.name} screenshot`}
                  fill
                  loading="lazy"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            )}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
