'use client';

import { useState, useEffect } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
}

export function FadeIn({
  children,
  duration = 400,
  delay = 0,
  className,
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(true); // Default visible to prevent flash

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    // Start hidden, then fade in
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: `opacity ${duration}ms ease-out`,
      }}
    >
      {children}
    </div>
  );
}
