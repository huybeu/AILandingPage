'use client';
import { Icon } from '@iconify/react';

interface CtaSectionProps {
  onRegister: () => void;
}

export default function CtaSection({ onRegister }: CtaSectionProps) {
  return (
    <section id="cta-final">
      <div className="wrap">
        <div className="cta-box rv">
          <span className="tag" style={{ marginBottom: 16 }}>Đăng Ký Ngay Hôm Nay</span>
          <h2 className="h2" style={{ fontSize: 'clamp(24px,4vw,42px)' }}>
            Sẵn Sàng Trở Thành <span className="gold">Lãnh Đạo AI</span>?
          </h2>
          <p className="lead" style={{ maxWidth: 500, margin: '12px auto 28px' }}>
            Chỉ còn vài suất ưu đãi — Online từ 686K, Offline từ 979K. Đừng để học phí trở lại giá gốc mới quyết định.
          </p>
          <button className="btn-primary" onClick={onRegister} style={{ margin: '0 auto' }}>
            <Icon icon="lucide:sparkles" width={17} />
            Đăng Ký Học Ngay — Từ 686.000đ
          </button>

          <div className="contact-grid" style={{ marginTop: 32 }}>
            {[
              { icon: 'lucide:phone',       label: 'Hotline',   val: '0931 722 777' },
              { icon: 'lucide:mail',         label: 'Email',     val: 'lecongnang03@gmail.com' },
              { icon: 'lucide:landmark',     label: 'MB Bank',   val: '9996469999' },
              { icon: 'lucide:clock',        label: 'Xác nhận',  val: 'Trong 30 phút' },
            ].map((c) => (
              <div key={c.label} className="contact-row">
                <div className="co-ico">
                  <Icon icon={c.icon} width={20} color="var(--gold-l)" />
                </div>
                <div>
                  <div className="co-lbl">{c.label}</div>
                  <div className="co-val">{c.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
