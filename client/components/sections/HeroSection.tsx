interface HeroSectionProps {
  onRegister: () => void;
}

export default function HeroSection({ onRegister }: HeroSectionProps) {
  return (
    <section id="hero">
      <div className="hero-glow" />
      <div className="hero-stars" />

      <div className="hero-2col wrap">
        {/* ── LEFT: text ── */}
        <div className="hero-left-col">
          <div className="hero-eyebrow rv">
            <div className="ey-line" />
            <span className="ey-text">Khoá Học Dành Cho CEO &amp; Chủ Doanh Nghiệp</span>
          </div>
          <h1 className="hero-h1 rv">
            Tư Duy Chiến Lược
            <br />
            &amp; <em>&ldquo;Quản Trị AI&rdquo;</em>
            <br />
            Cho Lãnh Đạo
          </h1>
          <p className="hero-sub rv">
            Chuyển đổi từ{' '}
            <strong style={{ color: 'var(--text)' }}>người dùng công cụ</strong> sang{' '}
            <strong style={{ color: 'var(--gold-l)' }}>nhà kiến tạo hệ thống AI</strong>{' '}
            — trang bị tư duy đúng, công thức thực chiến và lộ trình triển khai ngay ngày hôm sau.
          </p>
          <div className="hero-pills rv">
            <span className="pill hot">🏆 180 Phút Thực Chiến</span>
            <span className="pill hot">🎁 Tặng 6 Trợ Lý AI Cá Nhân Hoá</span>
            <span className="pill">✅ Demo Live Thực Tế</span>
            <span className="pill">✅ Action Plan Ngày Mai</span>
          </div>
          <div className="hero-cta-block rv">
            <button className="btn-primary" onClick={onRegister}>
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                <path d="M8.5 1.5l2.1 4.25 4.65.68-3.37 3.28.8 4.62-4.18-2.2-4.18 2.2.8-4.62L1.75 6.43l4.65-.68z" fill="currentColor" />
              </svg>
              Đăng Ký Học Ngay
            </button>
          </div>
        </div>

        {/* ── RIGHT: visual dashboard ── */}
        <div className="hero-right-col rv-r">
          {/* Main AI package card */}
          <div className="hv-main-card">
            <div className="hvc-glow" />
            <div className="hvc-top">
              <div className="hvc-icon">🤖</div>
              <div>
                <div className="hvc-title">AI Leadership System</div>
                <div className="hvc-sub">Khoá học + 6 AI Cá Nhân Hoá</div>
              </div>
              <div className="hvc-badge">LIVE</div>
            </div>

            {/* AI assistants mini list */}
            <div className="hvc-ai-list">
              {[
                { icon: '📣', name: 'Marketing AI', color: 'var(--gold)' },
                { icon: '🎯', name: 'Sales AI', color: 'var(--teal)' },
                { icon: '👥', name: 'HR AI', color: 'var(--green)' },
                { icon: '⚖️', name: 'Pháp Chế AI', color: '#7BAAF5' },
                { icon: '📊', name: 'Chiến Lược AI', color: 'var(--gold-l)' },
                { icon: '✍️', name: 'CEO Assistant', color: '#C084FC' },
              ].map((ai) => (
                <div key={ai.name} className="hvc-ai-item">
                  <div className="hvc-ai-dot" style={{ background: ai.color }} />
                  <span className="hvc-ai-icon">{ai.icon}</span>
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
            <div className="hv-stat">
              <div className="hvs-num">500<span>+</span></div>
              <div className="hvs-lbl">CEO đã học</div>
            </div>
            <div className="hv-stat-sep" />
            <div className="hv-stat">
              <div className="hvs-num">180<span>&apos;</span></div>
              <div className="hvs-lbl">Thực chiến</div>
            </div>
            <div className="hv-stat-sep" />
            <div className="hv-stat">
              <div className="hvs-num">6<span>×</span></div>
              <div className="hvs-lbl">AI tặng kèm</div>
            </div>
            <div className="hv-stat-sep" />
            <div className="hv-stat">
              <div className="hvs-num">15<span>+</span></div>
              <div className="hvs-lbl">Quốc gia</div>
            </div>
          </div>

          {/* Testimonial mini card */}
          <div className="hv-quote-card">
            <div className="hvq-mark">&ldquo;</div>
            <div className="hvq-text">Tuần đầu tiên tôi đã tiết kiệm được <strong>12 giờ</strong> làm việc nhờ AI.</div>
            <div className="hvq-author">
              <div className="hvq-avatar">🛍️</div>
              <div>
                <div className="hvq-name">Trần Thị Lan Anh</div>
                <div className="hvq-role">Chủ chuỗi thời trang · 5 chi nhánh</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="trust-bar" style={{ marginTop: 0 }}>
        <div className="trust-inner wrap">
          <div className="trust-item">🎓 CEO &amp; Chủ Doanh Nghiệp</div>
          <div className="trust-sep" />
          <div className="trust-item">⚡ 180 Phút Thực Chiến</div>
          <div className="trust-sep" />
          <div className="trust-item">🎁 6 AI Tặng Kèm</div>
          <div className="trust-sep" />
          <div className="trust-item">📺 VTV · VOV · HTV</div>
          <div className="trust-sep" />
          <div className="trust-item">🌏 15+ Quốc Gia</div>
        </div>
      </div>
    </section>
  );
}
