'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme') as 'dark' | 'light' | null;
    const preferred = stored || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    setTheme(preferred);
    document.documentElement.setAttribute('data-theme', preferred);
  }, []);

  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  }

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="flex items-center justify-center w-9 h-9 rounded-lg border border-[var(--card-border)] bg-[var(--card)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--card-hover-border)] transition-colors duration-200 cursor-pointer"
    >
      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
