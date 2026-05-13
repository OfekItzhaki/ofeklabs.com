import { cn } from '@/lib/utils';

interface BadgeProps {
  text: string;
  status: 'active' | 'beta' | 'dev' | 'coming-soon';
  className?: string;
}

const statusStyles: Record<BadgeProps['status'], string> = {
  active: 'bg-emerald-500/10 text-emerald-400',
  beta: 'bg-blue-500/10 text-blue-400',
  dev: 'bg-amber-500/10 text-amber-400',
  'coming-soon': 'bg-zinc-500/10 text-zinc-400',
};

export function Badge({ text, status, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        statusStyles[status],
        className
      )}
    >
      {text}
    </span>
  );
}
