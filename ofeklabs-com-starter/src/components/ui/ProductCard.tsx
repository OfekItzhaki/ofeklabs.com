import type { Product } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'block rounded-lg border border-[var(--card-border)] bg-[var(--card)] p-6 transition-colors hover:border-[#3f3f46]',
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-white">{product.name}</h3>
        <Badge text={product.badge} status={product.status} />
      </div>
      {product.tagline && (
        <p className="mt-2 text-sm text-[var(--muted)]">{product.tagline}</p>
      )}
    </a>
  );
}
