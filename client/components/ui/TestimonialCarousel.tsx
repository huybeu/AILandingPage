'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Icon } from '@iconify/react';
import { TESTIMONIALS } from '@/lib/testimonials';

const AUTO_INTERVAL = 4000;

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [animDir, setAnimDir] = useState<'left' | 'right' | null>(null);
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const total = TESTIMONIALS.length;

  const go = useCallback((dir: 'left' | 'right') => {
    setAnimDir(dir);
    setVisible(false);
    setTimeout(() => {
      setCurrent((c) =>
        dir === 'left' ? (c + 1) % total : (c - 1 + total) % total
      );
      setVisible(true);
      setAnimDir(null);
    }, 260);
  }, [total]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => go('left'), AUTO_INTERVAL);
  }, [go]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  const handlePrev = () => { go('right'); resetTimer(); };
  const handleNext = () => { go('left');  resetTimer(); };
  const handleDot  = (i: number) => {
    if (i === current) return;
    go(i > current ? 'left' : 'right');
    resetTimer();
  };

  /* touch / swipe */
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const dx = touchStartX.current - touchEndX.current;
    if (Math.abs(dx) > 40) dx > 0 ? handleNext() : handlePrev();
  };

  const t = TESTIMONIALS[current];

  const slideStyle: React.CSSProperties = {
    transition: visible ? 'opacity .26s ease, transform .26s ease' : 'none',
    opacity: visible ? 1 : 0,
    transform: visible
      ? 'translateX(0)'
      : animDir === 'left'
        ? 'translateX(-18px)'
        : 'translateX(18px)',
  };

  return (
    <div className="tcar-wrap"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* quote mark */}
      <div className="tcar-qmark">&ldquo;</div>

      {/* slide content */}
      <div style={slideStyle}>
        <p className="tcar-quote">&ldquo;{t.quote}&rdquo;</p>
        <div className="tcar-author">
          <div className="tcar-avatar">
            <Icon icon={t.avatarIcon} width={15} color={t.avatarColor} />
          </div>
          <div>
            <div className="tcar-name">{t.name}</div>
            <div className="tcar-role">{t.role}</div>
          </div>
        </div>
      </div>

      {/* controls */}
      <div className="tcar-controls">
        <button className="tcar-arrow" onClick={handlePrev} aria-label="Trước">
          <Icon icon="lucide:chevron-left" width={14} />
        </button>
        <div className="tcar-dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`tcar-dot${i === current ? ' active' : ''}`}
              onClick={() => handleDot(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <button className="tcar-arrow" onClick={handleNext} aria-label="Tiếp">
          <Icon icon="lucide:chevron-right" width={14} />
        </button>
      </div>
    </div>
  );
}
