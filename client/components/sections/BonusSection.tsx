'use client';
import { Icon } from '@iconify/react';

const BONUSES = [
  {
    badge: 'Marketing',
    badgeStyle: {},
    icon: 'lucide:megaphone',
    iconColor: 'var(--gold)',
    title: 'Giám Đốc Marketing AI',
    desc: 'Viết content đa kênh, kịch bản video, caption đúng Brand Voice của bạn — không cần brief lại mỗi lần',
    tasks: ['Bài viết MXH', 'Kịch bản video', 'Email marketing'],
    featured: true,
  },
  {
    badge: 'Sales',
    badgeStyle: { background: 'rgba(11,168,152,.1)', borderColor: 'rgba(11,168,152,.3)', color: 'var(--teal)' },
    icon: 'lucide:target',
    iconColor: 'var(--teal)',
    title: 'Giám Đốc Sales AI',
    desc: 'Kịch bản chốt sale cá nhân hoá, xử lý từ chối tự động — tăng tỷ lệ chuyển đổi ngay tháng đầu',
    tasks: ['Kịch bản chốt sale', 'Xử lý objection'],
    featured: false,
  },
  {
    badge: 'HR',
    badgeStyle: { background: 'rgba(26,148,98,.1)', borderColor: 'rgba(26,148,98,.3)', color: 'var(--green)' },
    icon: 'lucide:users',
    iconColor: 'var(--green)',
    title: 'Giám Đốc HR AI',
    desc: 'Tự động lọc & chấm điểm CV theo JD, thiết kế khung đào tạo, soạn quy chế nhân sự chuẩn',
    tasks: ['Lọc CV tự động', 'Khung đào tạo'],
    featured: false,
  },
  {
    badge: 'Pháp chế',
    badgeStyle: { background: 'rgba(123,170,245,.1)', borderColor: 'rgba(123,170,245,.3)', color: '#7BAAF5' },
    icon: 'lucide:scale',
    iconColor: '#7BAAF5',
    title: 'Giám Đốc Pháp Chế AI',
    desc: 'Rà soát hợp đồng, cảnh báo điều khoản rủi ro — bảo vệ doanh nghiệp trước khi ký kết',
    tasks: ['Kiểm tra hợp đồng', 'Cảnh báo rủi ro'],
    featured: false,
  },
  {
    badge: 'Chiến lược',
    badgeStyle: { background: 'rgba(200,148,42,.1)', borderColor: 'rgba(200,148,42,.3)', color: 'var(--gold-l)' },
    icon: 'lucide:bar-chart-2',
    iconColor: 'var(--gold-l)',
    title: 'Giám Đốc Chiến Lược AI',
    desc: 'Phân tích đối thủ, nghiên cứu thị trường, đề xuất chiến lược sát với ngữ cảnh thực tế công ty',
    tasks: ['Phân tích đối thủ', 'Chiến lược tăng trưởng'],
    featured: false,
  },
  {
    badge: 'CEO Riêng',
    badgeStyle: {},
    icon: 'lucide:pen-line',
    iconColor: 'var(--gold)',
    title: 'Trợ Lý Cá Nhân CEO',
    desc: 'Học giọng văn & triết lý của riêng bạn — ghostwriter tận tâm cho phát biểu và personal brand',
    tasks: ['Bài phát biểu', 'Personal branding'],
    featured: false,
    special: true,
  },
];

const CheckItem = () => (
  <div style={{
    width: 18, height: 18, borderRadius: '50%',
    background: 'rgba(26,148,98,.12)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  }}>
    <Icon icon="lucide:check" width={11} color="var(--green)" />
  </div>
);

export default function BonusSection() {
  return (
    <section id="bonus">
      <div className="wrap">
        <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
          <div className="rv bonus-badge">
            <Icon icon="lucide:gift" width={14} color="var(--gold-l)" />
            QUÀ TẶNG ĐẶC BIỆT — TẶNG KÈM MIỄN PHÍ KHI ĐĂNG KÝ
          </div>
          <h2 className="h2 rv" style={{ fontSize: 'clamp(26px,4.5vw,46px)' }}>
            Mang Về <span className="gold">6 Giám Đốc Chuyên Môn AI</span>
            <br />Vận Hành Doanh Nghiệp Của Bạn
          </h2>
          <p className="lead rv" style={{ fontSize: 15.5 }}>
            Mỗi trợ lý được{' '}
            <strong style={{ color: 'var(--text)' }}>huấn luyện cá nhân hoá</strong> theo đặc thù
            công ty bạn — không phải AI đại trà. Như có 6 nhân sự cấp cao làm việc{' '}
            <strong style={{ color: 'var(--gold-l)' }}>24/7 với chi phí 0đ/tháng</strong>.
          </p>
          <div className="rv" style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 20, flexWrap: 'wrap' }}>
            {[
              { icon: 'lucide:cpu', label: 'Không cần nhân sự IT' },
              { icon: 'lucide:rocket',  label: 'Bắt đầu trong ngày' },
              { icon: 'lucide:badge-dollar-sign', label: 'Chi phí duy trì: 0đ' },
            ].map((t) => (
              <div key={t.label} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: 'var(--text-dim)' }}>
                <Icon icon={t.icon} width={14} color="var(--green)" /> {t.label}
              </div>
            ))}
          </div>
        </div>

        <div className="bonus-grid" style={{ marginTop: 44 }}>
          {BONUSES.map((b) => (
            <div
              key={b.title}
              className={`bcard rv${b.featured ? ' bcard-featured' : ''}`}
              style={b.special ? { borderColor: 'var(--gold)', background: 'linear-gradient(135deg,rgba(200,148,42,.07),rgba(200,148,42,.02))' } : {}}
            >
              <div className="bcard-badge" style={b.badgeStyle}>{b.badge}</div>
              <div className="bc-ico">
                <Icon icon={b.icon} width={24} color={b.iconColor} />
              </div>
              <div className="bc-title">{b.title}</div>
              <div className="bc-desc" dangerouslySetInnerHTML={{ __html: b.desc }} />
              <div className="bcard-tasks">
                {b.tasks.map((t) => (
                  <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Icon icon="lucide:check-circle-2" width={12} color="var(--gold)" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bonus-total-bar rv">
          <div className="btb-text">
            <strong>6 Giám Đốc AI làm việc 24/7</strong>
            Không lương · Không nghỉ phép · Không thôi việc
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="btb-val">Chi phí: 0đ</div>
            <div className="btb-sub">mỗi tháng sau khoá học</div>
          </div>
        </div>
      </div>
    </section>
  );
}
