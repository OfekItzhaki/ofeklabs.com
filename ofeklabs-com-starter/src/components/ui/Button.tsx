import { cn, classifyCta } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

const variantStyles: Record<string, string> = {
  primary:
    'bg-[var(--accent)] text-white hover:bg-blue-600 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]',
  secondary:
    'bg-[var(--card)] text-[var(--foreground)] border border-[var(--card-border)] hover:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]',
  ghost:
    'bg-transparent text-[var(--foreground)] hover:bg-[var(--card)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]',
};

const sizeStyles: Record<string, string> = {
  sm: 'min-h-[36px] min-w-[36px] px-3 py-1.5 text-sm',
  default: 'min-h-[44px] min-w-[44px] px-5 py-2.5 text-base',
  lg: 'min-h-[52px] min-w-[52px] px-7 py-3 text-lg',
};

export function Button({
  children,
  href,
  variant = 'primary',
  size = 'default',
  className,
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-lg font-medium transition-colors duration-200 outline-none cursor-pointer';

  const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

  if (href) {
    const type = classifyCta(href);

    if (type === 'external') {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }

    // Anchor (in-page) link — smooth scroll handled by html { scroll-behavior: smooth }
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes}>
      {children}
    </button>
  );
}
