'use client';
import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const dotRef    = useRef<HTMLDivElement>(null);
  const ringRef   = useRef<HTMLDivElement>(null);
  const glowRef   = useRef<HTMLDivElement>(null);
  const sparksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot     = dotRef.current;
    const ringEl  = ringRef.current;
    const glowEl  = glowRef.current;
    const sparksC = sparksRef.current;
    if (!dot || !ringEl || !glowEl || !sparksC) return;

    let mouse    = { x: -400, y: -400 };
    let ring     = { x: -400, y: -400 };
    let glow     = { x: -400, y: -400 };
    let hovering = false;
    let ready    = false;
    let raf: number;

    /* ── mouse move ─────────────────────────────────────── */
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (!ready) {
        ready = true;
        ring.x = e.clientX; ring.y = e.clientY;
        glow.x = e.clientX; glow.y = e.clientY;
        document.body.style.cursor = 'none';
        dot.style.opacity    = '1';
        ringEl.style.opacity = '0.75';
        glowEl.style.opacity = '1';
      }

      const t = e.target as Element;
      hovering = !!t.closest('button, a, [role="button"], input, label, select');
    };

    /* ── click sparks ────────────────────────────────────── */
    const COLORS = ['#c8942a','#0ba898','#c8942a','#0ba898','#c8942a','#0ba898','#c8942a','#0ba898'];
    const onClick = (e: MouseEvent) => {
      if (!ready) return;
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const dist  = 30 + Math.random() * 22;
        const tx    = Math.cos(angle) * dist;
        const ty    = Math.sin(angle) * dist;

        const s = document.createElement('div');
        Object.assign(s.style, {
          position:     'fixed',
          top:          `${e.clientY - 3}px`,
          left:         `${e.clientX - 3}px`,
          width:        '6px',
          height:       '6px',
          borderRadius: '50%',
          background:   COLORS[i],
          pointerEvents:'none',
          zIndex:       '100000',
          opacity:      '1',
          transition:   'transform 0.55s ease-out, opacity 0.55s ease-out',
        });
        sparksC.appendChild(s);

        requestAnimationFrame(() => {
          s.style.transform = `translate(${tx}px,${ty}px)`;
          s.style.opacity   = '0';
        });

        setTimeout(() => s.remove(), 620);
      }
    };

    /* ── RAF loop ────────────────────────────────────────── */
    const tick = () => {
      raf = requestAnimationFrame(tick);

      ring.x += (mouse.x - ring.x) * 0.18;
      ring.y += (mouse.y - ring.y) * 0.18;
      glow.x += (mouse.x - glow.x) * 0.055;
      glow.y += (mouse.y - glow.y) * 0.055;

      /* dot — snaps to cursor exactly */
      dot.style.transform = `translate(${mouse.x - 4}px,${mouse.y - 4}px)`;

      /* ring — lerps, reacts to hover */
      const rSize = hovering ? 48 : 32;
      ringEl.style.transform   = `translate(${ring.x - rSize / 2}px,${ring.y - rSize / 2}px)`;
      ringEl.style.width       = `${rSize}px`;
      ringEl.style.height      = `${rSize}px`;
      ringEl.style.borderColor = hovering ? '#0ba898' : '#c8942a';
      ringEl.style.opacity     = hovering ? '0.95' : '0.75';

      /* glow — slow spotlight */
      glowEl.style.transform = `translate(${glow.x - 160}px,${glow.y - 160}px)`;
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('click', onClick);
    tick();

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <>
      {/* Gold dot — snaps to cursor */}
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: 8, height: 8, borderRadius: '50%',
        background: '#c8942a',
        pointerEvents: 'none', zIndex: 99999,
        opacity: 0, transition: 'opacity 0.3s',
        willChange: 'transform',
      }} />

      {/* Ring — lerps behind cursor, teal on hover */}
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: 32, height: 32, borderRadius: '50%',
        border: '2px solid #c8942a',
        pointerEvents: 'none', zIndex: 99998,
        opacity: 0,
        transition: 'border-color 0.2s, width 0.15s, height 0.15s',
        willChange: 'transform',
      }} />

      {/* Radial glow — slow spotlight effect */}
      <div ref={glowRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: 320, height: 320, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,148,42,0.08) 0%, transparent 68%)',
        pointerEvents: 'none', zIndex: 99997,
        opacity: 0,
        willChange: 'transform',
      }} />

      {/* Sparks portal */}
      <div ref={sparksRef} style={{
        position: 'fixed', inset: 0,
        pointerEvents: 'none', zIndex: 100000,
      }} />
    </>
  );
}
