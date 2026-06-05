'use client';

import type { CSSProperties } from 'react';
import React, { useEffect, useId, useRef } from 'react';

interface AuroraTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  speed?: number;
}

export function AuroraText({
  children,
  className = '',
  colors = ['#c8942a', '#e8b84b', '#0ba898', '#0dd4c3', '#7BAAF5', '#C084FC'],
  speed = 1,
}: AuroraTextProps) {
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const textRef       = useRef<SVGTextElement>(null);
  const containerRef  = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize]       = React.useState(0);
  const [dimensions, setDimensions]   = React.useState({ width: 0, height: 0 });
  const [isReady, setIsReady]         = React.useState(false);
  const [textStyle, setTextStyle]     = React.useState<Partial<CSSStyleDeclaration>>({});
  const maskId = useId();

  useEffect(() => {
    if (!containerRef.current) return;
    const s = window.getComputedStyle(containerRef.current);
    requestAnimationFrame(() => {
      setTextStyle({
        fontSize: s.fontSize, fontFamily: s.fontFamily,
        fontWeight: s.fontWeight, fontStyle: s.fontStyle,
        letterSpacing: s.letterSpacing, lineHeight: s.lineHeight,
        textTransform: s.textTransform, fontVariant: s.fontVariant,
        fontStretch: s.fontStretch, fontFeatureSettings: s.fontFeatureSettings,
      });
    });
  }, [className]);

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const size = parseFloat(window.getComputedStyle(containerRef.current).fontSize);
      requestAnimationFrame(() => setFontSize(size));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [className]);

  useEffect(() => {
    const update = () => {
      if (!textRef.current) return;
      const bbox = textRef.current.getBBox();
      setDimensions({ width: bbox.width, height: bbox.height });
      setIsReady(true);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [children, fontSize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width  = dimensions.width;
    canvas.height = dimensions.height;

    let time = 0;
    const base = 0.008;
    let raf: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += base * speed;

      colors.forEach((color, i) => {
        const x = canvas.width  * (0.5 + Math.cos(time * 0.8 + i * 1.3) * 0.4 + Math.sin(time * 0.5 + i * 0.7) * 0.2);
        const y = canvas.height * (0.5 + Math.sin(time * 0.7 + i * 1.5) * 0.4 + Math.cos(time * 0.6 + i * 0.8) * 0.2);
        const g = ctx.createRadialGradient(x, y, 0, x, y, canvas.width * 0.4);
        g.addColorStop(0,   `${color}99`);
        g.addColorStop(0.5, `${color}33`);
        g.addColorStop(1,   '#00000000');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });

      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(raf);
  }, [dimensions, colors, speed]);

  return (
    <span
      ref={containerRef}
      className={className}
      style={{ position: 'relative', display: 'inline-block', verticalAlign: 'middle',
               width: dimensions.width || 'auto', height: dimensions.height || 'auto' }}
    >
      {/* SEO text */}
      <span style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1,
                     overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap', border: 0 }}>
        {children}
      </span>

      {/* Placeholder while canvas loads */}
      <span aria-hidden="true" style={{
        opacity: isReady ? 0 : 1, transition: 'opacity 0.2s',
        position: isReady ? 'absolute' : 'relative', display: 'inline-block', whiteSpace: 'nowrap',
      }}>
        {children}
      </span>

      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: isReady ? 1 : 0, transition: 'opacity 0.2s' }}>
        <svg width={dimensions.width} height={dimensions.height} style={{ position: 'absolute', inset: 0 }}>
          <defs>
            <clipPath id={maskId}>
              <text ref={textRef} x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
                    style={textStyle as CSSProperties}>
                {children}
              </text>
            </clipPath>
          </defs>
        </svg>
        <canvas
          ref={canvasRef}
          style={{ clipPath: `url(#${maskId})`, WebkitClipPath: `url(#${maskId})`,
                   width: '100%', height: '100%' }}
        />
      </div>
    </span>
  );
}
