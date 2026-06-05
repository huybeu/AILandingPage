import { Icon } from '@iconify/react';
import { TESTIMONIALS } from '@/lib/testimonials';

const Stars = () => (
  <div className="tc-stars">
    {[...Array(5)].map((_, i) => (
      <Icon key={i} icon="lucide:star" width={13} color="#EDB84A" style={{ fill: '#EDB84A' }} />
    ))}
  </div>
);

export default function TestimonialsSection() {
  return (
    <section id="testimonials">
      <div className="wrap">
        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
          <span className="tag rv">Học Viên Chia Sẻ</span>
          <h2 className="h2 rv">
            Kết Quả <span className="gold">Sau Khoá Học</span>
          </h2>
        </div>
        <div className="testi-grid">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="tcard rv">
              <Stars />
              <div className="tc-text" dangerouslySetInnerHTML={{ __html: t.text }} />
              <div className="tc-author">
                <div className="tc-avatar">
                  <Icon icon={t.avatarIcon} width={18} color={t.avatarColor} />
                </div>
                <div>
                  <div className="tc-name">{t.name}</div>
                  <div className="tc-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
