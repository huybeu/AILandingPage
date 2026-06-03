'use client';
import { useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';

interface TopbarProps {
  onRegister: () => void;
}

export default function Topbar({ onRegister }: TopbarProps) {
  const progRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const t = document.body.scrollHeight - window.innerHeight;
      if (progRef.current) {
        progRef.current.style.width = t > 0 ? `${(scrollY / t) * 100}%` : '0';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div id="topbar">
      <div className="tb-brand">
        <div className="tb-dot" />
        Quản Trị AI Cho Lãnh Đạo — Lê Công Năng
      </div>
      <div className="tb-price">
        <span className="tb-price-main">686.000đ <s>3.600K</s></span>
        <span className="tb-shop">
          <Icon icon="lucide:store" width={12} />
          Tech Shop
        </span>
      </div>
      <button className="tb-cta" onClick={onRegister}>
        <Icon icon="lucide:arrow-right" width={13} />
        Đăng Ký Ngay
      </button>
      <div className="tb-progress" ref={progRef} />
    </div>
  );
}
