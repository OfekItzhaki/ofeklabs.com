'use client';

import { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export function Constellation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Draw static constellation
      drawStatic(canvas, ctx);
      return;
    }

    function getColor() {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      return isLight ? '37, 99, 235' : '59, 130, 246';
    }

    function getOpacityMultiplier() {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      return isLight ? 2.5 : 1;
    }

    let animationId: number;
    const points: Point[] = [];
    const numPoints = 40;
    const connectionDistance = 150;
    const speed = 0.3;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas!.width = canvas!.offsetWidth * dpr;
      canvas!.height = canvas!.offsetHeight * dpr;
      ctx!.scale(dpr, dpr);
    }

    function init() {
      resize();
      points.length = 0;
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;

      for (let i = 0; i < numPoints; i++) {
        points.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
        });
      }
    }

    function animate() {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      ctx!.clearRect(0, 0, w, h);

      // Update positions
      for (const point of points) {
        point.x += point.vx;
        point.y += point.vy;

        if (point.x < 0 || point.x > w) point.vx *= -1;
        if (point.y < 0 || point.y > h) point.vy *= -1;
      }

      // Draw connections
      const color = getColor();
      const opMult = getOpacityMultiplier();
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.15 * opMult;
            ctx!.beginPath();
            ctx!.moveTo(points[i].x, points[i].y);
            ctx!.lineTo(points[j].x, points[j].y);
            ctx!.strokeStyle = `rgba(${color}, ${opacity})`;
            ctx!.lineWidth = 1;
            ctx!.stroke();
          }
        }
      }

      // Draw points
      for (const point of points) {
        ctx!.beginPath();
        ctx!.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${color}, ${0.4 * opMult})`;
        ctx!.fill();
      }

      animationId = requestAnimationFrame(animate);
    }

    function drawStatic(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);

      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      const staticPoints: Point[] = [];

      for (let i = 0; i < numPoints; i++) {
        staticPoints.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: 0,
          vy: 0,
        });
      }

      for (let i = 0; i < staticPoints.length; i++) {
        for (let j = i + 1; j < staticPoints.length; j++) {
          const dx = staticPoints[i].x - staticPoints[j].x;
          const dy = staticPoints[i].y - staticPoints[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.12;
            ctx.beginPath();
            ctx.moveTo(staticPoints[i].x, staticPoints[i].y);
            ctx.lineTo(staticPoints[j].x, staticPoints[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      for (const point of staticPoints) {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
        ctx.fill();
      }
    }

    init();
    animate();

    window.addEventListener('resize', () => {
      init();
    });

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ width: '100vw', height: '100vh' }}
      aria-hidden="true"
    />
  );
}
