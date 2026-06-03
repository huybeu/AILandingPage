'use client';
import { useEffect } from 'react';
import { Icon } from '@iconify/react';

interface ChoiceModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (type: 'online' | 'offline') => void;
}

export default function ChoiceModal({ open, onClose, onSelect }: ChoiceModalProps) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="choice-overlay" onClick={onClose}>
      <div className="choice-box" onClick={e => e.stopPropagation()}>
        <button className="modal-close choice-close" onClick={onClose}>
          <Icon icon="lucide:x" width={13} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'var(--teal)', textTransform: 'uppercase', marginBottom: 10 }}>
            Chọn Hình Thức Học
          </div>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(20px,3vw,28px)', fontWeight: 900, lineHeight: 1.2 }}>
            Bạn Muốn Học Theo Hình Thức Nào?
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 8 }}>
            Chọn 1 trong 2 hình thức — giá học phí sẽ hiển thị tương ứng
          </div>
        </div>

        <div className="choice-cards">
          {/* ONLINE */}
          <button className="choice-card choice-card-gold" onClick={() => onSelect('online')}>
            <div className="choice-card-icon">
              <Icon icon="lucide:monitor" width={36} color="var(--gold)" />
            </div>
            <div className="choice-card-mode">Online</div>
            <div className="choice-card-channel">Zoom / Live Stream HD</div>
            <div className="choice-card-price">686.000đ</div>
            <div className="choice-card-old">3.600.000đ</div>
            <ul className="choice-card-perks">
              <li>✓ Xem lại 7 ngày</li>
              <li>✓ Học mọi lúc mọi nơi</li>
              <li>✓ Nhóm hỗ trợ riêng</li>
            </ul>
            <div className="choice-card-btn choice-btn-gold">
              Chọn Online
              <Icon icon="lucide:arrow-right" width={13} style={{ marginLeft: 6 }} />
            </div>
          </button>

          {/* OFFLINE */}
          <button className="choice-card choice-card-teal" onClick={() => onSelect('offline')}>
            <div className="choice-card-icon">
              <Icon icon="lucide:building-2" width={36} color="var(--teal)" />
            </div>
            <div className="choice-card-mode" style={{ color: 'var(--teal)' }}>Offline</div>
            <div className="choice-card-channel">Học Trực Tiếp Cùng Diễn Giả</div>
            <div className="choice-card-price" style={{ color: 'var(--teal)' }}>979.000đ</div>
            <div className="choice-card-old">5.200.000đ</div>
            <ul className="choice-card-perks">
              <li>✓ Demo LIVE tại lớp</li>
              <li>✓ Networking CEO</li>
              <li>✓ Workbook &amp; tài liệu in</li>
            </ul>
            <div className="choice-card-btn choice-btn-teal">
              Chọn Offline
              <Icon icon="lucide:arrow-right" width={13} style={{ marginLeft: 6 }} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
