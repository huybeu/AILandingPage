'use client';
import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((x) => {
          if (x.isIntersecting) {
            x.target.classList.add('in');
            obs.unobserve(x.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );

    const els = document.querySelectorAll<HTMLElement>('.rv,.rv-l,.rv-r');
    els.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 6) * 0.09}s`;
      obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);
}
