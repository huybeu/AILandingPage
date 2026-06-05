import { Icon } from '@iconify/react';
import TestimonialCarousel from '@/components/ui/TestimonialCarousel';
import { AuroraText } from '@/components/ui/AuroraText';

interface HeroSectionProps {
  onRegister: () => void;
}

const AI_LIST = [
  { icon: 'lucide:megaphone',   name: 'Marketing AI',  color: 'var(--gold)' },
  { icon: 'lucide:target',      name: 'Sales AI',       color: 'var(--teal)' },
  { icon: 'lucide:users',       name: 'HR AI',          color: 'var(--green)' },
  { icon: 'lucide:scale',       name: 'Pháp Chế AI',    color: '#7BAAF5' },
  { icon: 'lucide:bar-chart-2', name: 'Chiến Lược AI',  color: 'var(--gold-l)' },
  { icon: 'lucide:pen-line',    name: 'CEO Assistant',  color: '#C084FC' },
];

const TRUST_ITEMS = [
  { icon: 'lucide:graduation-cap', label: 'CEO & Chủ Doanh Nghiệp' },
  { icon: 'lucide:zap',            label: '180 Phút Thực Chiến' },
  { icon: 'lucide:gift',           label: '6 AI Tặng Kèm' },
  { icon: 'lucide:tv-2',           label: 'VTV · VOV · HTV' },
  { icon: 'lucide:globe',          label: '15+ Quốc Gia' },
];

export default function HeroSection({ onRegister }: HeroSectionProps) {
  return (
    <section id="hero">
      <div className="hero-glow" />
      <div className="hero-stars" />

      <div className="hero-2col wrap">
        {/* ── LEFT ── */}
        <div className="hero-left-col">
          <div className="hero-eyebrow rv">
            <div className="ey-line" />
            <span className="ey-text">Khoá Học Dành Cho CEO &amp; Chủ Doanh Nghiệp</span>
          </div>
          <h1 className="hero-h1 rv">
            Tư Duy Chiến Lược<br />
            Và &ldquo;<AuroraText colors={['#d97706','#c8942a','#f97316','#0ba898','#7c3aed','#0891b2']} speed={0.9}>Quản Trị AI</AuroraText>&rdquo;<br />
            Cho Lãnh Đạo
          </h1>
          <p className="hero-sub rv">
            Chuyển đổi từ{' '}
            <strong style={{ color: 'var(--text)' }}>người dùng công cụ</strong> sang{' '}
            <strong style={{ color: 'var(--gold-l)' }}>nhà kiến tạo hệ thống AI</strong>{' '}
            — trang bị tư duy đúng, công thức thực chiến và lộ trình triển khai ngay ngày hôm sau.
          </p>
          <div className="hero-pills rv">
            <span className="pill hot">
              <Icon icon="lucide:trophy" width={13} /> 180 Phút Thực Chiến
            </span>
            <span className="pill hot">
              <Icon icon="lucide:gift" width={13} /> Tặng 6 Trợ Lý AI Cá Nhân Hoá
            </span>
            <span className="pill">
              <Icon icon="lucide:circle-check" width={13} /> Demo Live Thực Tế
            </span>
            <span className="pill">
              <Icon icon="lucide:circle-check" width={13} /> Action Plan Ngày Mai
            </span>
          </div>
          <div className="hero-cta-block rv">
            <button className="btn-primary" onClick={onRegister}>
              <Icon icon="lucide:star" width={17} />
              Đăng Ký Học Ngay
            </button>
          </div>

          <div className="hero-social-proof rv">
            <span className="hsp-stars">★★★★★</span>
            <span className="hsp-text">500+ CEO &amp; Chủ Doanh Nghiệp đã hoàn thành</span>
            <span className="hsp-sep" />
            <span className="hsp-text">15 quốc gia</span>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className="hero-right-col rv-r">
          {/* Main AI card */}
          <div className="hv-main-card">
            <div className="hvc-glow" />
            <div className="hvc-top">
              <div className="hvc-icon">
                <Icon icon="lucide:bot" width={26} color="var(--gold-l)" />
              </div>
              <div>
                <div className="hvc-title">AI Leadership System</div>
                <div className="hvc-sub">Khoá học + 6 AI Cá Nhân Hoá</div>
              </div>
              <div className="hvc-badge">LIVE</div>
            </div>
            <div className="hvc-ai-list">
              {AI_LIST.map((ai) => (
                <div key={ai.name} className="hvc-ai-item">
                  <div className="hvc-ai-dot" style={{ background: ai.color }} />
                  <Icon icon={ai.icon} width={14} color={ai.color} />
                  <span className="hvc-ai-name">{ai.name}</span>
                  <span className="hvc-ai-status">Active</span>
                </div>
              ))}
            </div>
            <div className="hvc-footer">
              <span>6 AI hoạt động 24/7</span>
              <span className="hvc-cost">Chi phí: <strong>0đ/tháng</strong></span>
            </div>
          </div>

          {/* Stats row */}
          <div className="hv-stats-row">
            {[
              { num: '500', sup: '+', lbl: 'CEO đã học' },
              { num: '180', sup: "'", lbl: 'Thực chiến' },
              { num: '6',   sup: '×', lbl: 'AI tặng kèm' },
              { num: '15',  sup: '+', lbl: 'Quốc gia' },
            ].map((s, i, arr) => (
              <div key={s.lbl} style={{ display: 'contents' }}>
                <div className="hv-stat">
                  <div className="hvs-num">{s.num}<span>{s.sup}</span></div>
                  <div className="hvs-lbl">{s.lbl}</div>
                </div>
                {i < arr.length - 1 && <div className="hv-stat-sep" />}
              </div>
            ))}
          </div>

          {/* Testimonial carousel */}
          <TestimonialCarousel />
        </div>
      </div>

      {/* Trust bar */}
      <div id="trust-bar">
        <div className="trust-inner wrap">
          {TRUST_ITEMS.map((t, i, arr) => (
            <div key={t.label} style={{ display: 'contents' }}>
              <div className="trust-item">
                <Icon icon={t.icon} width={14} />
                {t.label}
              </div>
              {i < arr.length - 1 && <div className="trust-sep" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
