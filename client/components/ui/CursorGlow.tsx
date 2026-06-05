'use client';

import { useEffect, useRef } from 'react';

const useCanvasCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    type ExtendedCtx = CanvasRenderingContext2D & { running?: boolean; frame?: number };

    let ctx: ExtendedCtx | null = null;
    let f: any;
    let e = 0;
    let pos = { x: 0, y: 0 };
    let lines: any[] = [];
    const E = { debug: true, friction: 0.5, trails: 20, size: 50, dampening: 0.25, tension: 0.98 };

    function Oscillator(this: any, options: any = {}) {
      this.phase     = options.phase     || 0;
      this.offset    = options.offset    || 0;
      this.frequency = options.frequency || 0.001;
      this.amplitude = options.amplitude || 1;
    }
    Oscillator.prototype.update = function () {
      this.phase += this.frequency;
      e = this.offset + Math.sin(this.phase) * this.amplitude;
      return e;
    };
    Oscillator.prototype.value = function () { return e; };

    function Node(this: any) { this.x = 0; this.y = 0; this.vy = 0; this.vx = 0; }

    function Line(this: any, options: any = {}) {
      this.spring  = (options.spring || 0.45) + (0.1 * Math.random() - 0.02);
      this.friction = E.friction + (0.01 * Math.random() - 0.002);
      this.nodes   = [];
      for (let i = 0; i < E.size; i++) {
        const node = new (Node as any)();
        node.x = pos.x; node.y = pos.y;
        this.nodes.push(node);
      }
    }
    Line.prototype.update = function () {
      let spring = this.spring;
      let node = this.nodes[0];
      node.vx += (pos.x - node.x) * spring;
      node.vy += (pos.y - node.y) * spring;
      for (let i = 0, len = this.nodes.length; i < len; i++) {
        node = this.nodes[i];
        if (i > 0) {
          const prev = this.nodes[i - 1];
          node.vx += (prev.x - node.x) * spring;
          node.vy += (prev.y - node.y) * spring;
          node.vx += prev.vx * E.dampening;
          node.vy += prev.vy * E.dampening;
        }
        node.vx *= this.friction; node.vy *= this.friction;
        node.x  += node.vx;      node.y  += node.vy;
        spring  *= E.tension;
      }
    };
    Line.prototype.draw = function () {
      if (!ctx) return;
      let x = this.nodes[0].x, y = this.nodes[0].y;
      ctx.beginPath();
      ctx.moveTo(x, y);
      for (let i = 1, len = this.nodes.length - 2; i < len; i++) {
        const cur  = this.nodes[i];
        const next = this.nodes[i + 1];
        x = 0.5 * (cur.x + next.x);
        y = 0.5 * (cur.y + next.y);
        ctx.quadraticCurveTo(cur.x, cur.y, x, y);
      }
      if (this.nodes.length > 2) {
        const i = this.nodes.length - 2;
        ctx.quadraticCurveTo(this.nodes[i].x, this.nodes[i].y, this.nodes[i + 1].x, this.nodes[i + 1].y);
      }
      ctx.stroke();
      ctx.closePath();
    };

    function createLines() {
      lines = [];
      for (let i = 0; i < E.trails; i++)
        lines.push(new (Line as any)({ spring: 0.4 + (i / E.trails) * 0.025 }));
    }

    function handlePointerMove(e: MouseEvent | TouchEvent) {
      if ('touches' in e && e.touches.length > 0) {
        pos.x = e.touches[0].pageX;
        pos.y = e.touches[0].pageY;
      } else if (!('touches' in e)) {
        pos.x = e.clientX;
        pos.y = e.clientY;
      }
      if (e.cancelable) e.preventDefault();
    }

    function handleTouchStart(e: TouchEvent) {
      if (e.touches.length === 1) { pos.x = e.touches[0].pageX; pos.y = e.touches[0].pageY; }
    }

    function render() {
      if (!ctx || ctx.running === false) return;
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = 'lighter';
      try {
        const hue = Math.round(f.update());
        ctx.strokeStyle = `hsla(${hue},50%,50%,0.2)`;
        ctx.lineWidth   = 1;
        for (const line of lines) { line.update(); line.draw(); }
        if (ctx.frame !== undefined) ctx.frame++;
        window.requestAnimationFrame(render);
      } catch (err) {
        console.error(err);
        if (ctx) ctx.running = false;
      }
    }

    function resizeCanvas() {
      if (!canvasRef.current) return;
      canvasRef.current.width  = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }

    const handleFocus = () => { if (ctx && !ctx.running) { ctx.running = true; render(); } };
    const handleBlur  = () => { if (ctx) ctx.running = true; };

    function onFirstMove(e: MouseEvent | TouchEvent) {
      document.removeEventListener('mousemove', onFirstMove as any);
      document.removeEventListener('touchstart', onFirstMove as any);
      document.addEventListener('mousemove',  handlePointerMove);
      document.addEventListener('touchmove',  handlePointerMove, { passive: true });
      document.addEventListener('touchstart', handleTouchStart);
      handlePointerMove(e);
      createLines();
      render();
    }

    const canvas = canvasRef.current;
    ctx = canvas.getContext('2d') as ExtendedCtx;
    if (!ctx) return;
    ctx.running = true;
    ctx.frame   = 1;

    f = new (Oscillator as any)({
      phase: Math.random() * 2 * Math.PI,
      amplitude: 85,
      frequency: 0.0015,
      offset: 285,
    });

    document.addEventListener('mousemove',  onFirstMove as any);
    document.addEventListener('touchstart', onFirstMove as any);
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur',  handleBlur);

    resizeCanvas();
    pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    createLines();
    render();

    return () => {
      if (ctx) ctx.running = false;
      document.removeEventListener('mousemove',  onFirstMove as any);
      document.removeEventListener('touchstart', onFirstMove as any);
      document.removeEventListener('mousemove',  handlePointerMove);
      document.removeEventListener('touchmove',  handlePointerMove);
      document.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur',  handleBlur);
    };
  }, []);

  return canvasRef;
};

export default function CursorGlow() {
  const canvasRef = useCanvasCursor();
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
}
