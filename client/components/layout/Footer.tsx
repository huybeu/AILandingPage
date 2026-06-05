import { Icon } from '@iconify/react';

const LINKS = [
  {
    heading: 'Công Ty',
    items: [
      { label: 'Wondertour',     href: 'https://wondertour.vn',     icon: 'lucide:globe' },
      { label: 'VEF Global',     href: 'https://vefglobal.com',     icon: 'lucide:globe' },
      { label: 'lecongnang.com', href: 'https://lecongnang.com',    icon: 'lucide:user' },
      { label: 'Wonder Event',   href: 'https://wondertour.vn',     icon: 'lucide:calendar' },
    ],
  },
  {
    heading: 'Khoá Học',
    items: [
      { label: 'Giới thiệu khoá học', href: '#hero',         icon: 'lucide:book-open' },
      { label: 'Chương trình học',    href: '#curriculum',   icon: 'lucide:list-checks' },
      { label: 'Học phí & Đăng ký',   href: '#pricing',      icon: 'lucide:credit-card' },
      { label: 'Học viên chia sẻ',    href: '#testimonials', icon: 'lucide:message-square' },
    ],
  },
  {
    heading: 'Liên Hệ',
    items: [
      { label: '0931 722 777',                href: 'tel:0931722777',                     icon: 'lucide:phone' },
      { label: 'lecongnang03@gmail.com',      href: 'mailto:lecongnang03@gmail.com',      icon: 'lucide:mail' },
      { label: '129 Nguyễn Ngọc Doãn, HN',   href: '#',                                  icon: 'lucide:map-pin' },
      { label: 'MB Bank · 9996469999',        href: '#',                                  icon: 'lucide:landmark' },
    ],
  },
];

const SOCIALS = [
  { icon: 'simple-icons:facebook', href: 'https://www.facebook.com/lecongnang86',  label: 'Facebook' },
  { icon: 'simple-icons:youtube',  href: 'https://www.youtube.com/@lecongnang',    label: 'YouTube' },
  { icon: 'simple-icons:tiktok',   href: 'https://www.tiktok.com/@nangdongai',     label: 'TikTok' },
  { icon: 'simple-icons:instagram',href: 'https://www.instagram.com/lecongnang86', label: 'Instagram' },
];

export default function Footer() {
  return (
    <footer id="footer">
      <div className="wrap">
        {/* ── Top grid ── */}
        <div className="ft-grid">
          {/* Brand column */}
          <div className="ft-brand-col">
            <div className="ft-logo">
              <Icon icon="lucide:bot" width={22} color="var(--gold-l)" />
              <span>AI Leadership</span>
            </div>
            <p className="ft-tagline">
              Khoá học <strong>Tư Duy Chiến Lược &amp; Quản Trị AI</strong> dành cho
              CEO &amp; Chủ Doanh Nghiệp — bởi diễn giả Lê Công Năng.
            </p>
            <div className="ft-socials">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="ft-social-btn" aria-label={s.label}>
                  <Icon icon={s.icon} width={16} />
                </a>
              ))}
            </div>
            <div className="ft-press-row">
              <span className="ft-press-lbl">Xuất hiện trên</span>
              {['VTV1', 'VTV2', 'VTV3', 'VOV', 'HTV'].map((c) => (
                <span key={c} className="ft-press-chip">{c}</span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {LINKS.map((col) => (
            <div key={col.heading} className="ft-link-col">
              <div className="ft-col-heading">{col.heading}</div>
              <ul className="ft-link-list">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="ft-link">
                      <Icon icon={item.icon} width={13} />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="ft-divider" />

        {/* ── Bottom bar ── */}
        <div className="ft-bottom">
          <span className="ft-copy">
            © {new Date().getFullYear()} Lê Công Năng · AI Leadership Academy.
            Bảo lưu mọi quyền.
          </span>
          <div className="ft-bottom-links">
            <span className="ft-bottom-tag">
              <Icon icon="lucide:shield-check" width={12} />
              Bảo mật thông tin
            </span>
            <span className="ft-bottom-tag">
              <Icon icon="lucide:file-text" width={12} />
              Điều khoản dịch vụ
            </span>
            <span className="ft-bottom-tag">
              <Icon icon="lucide:zap" width={12} color="var(--gold)" />
              Học phí: 686K Online · 979K Offline
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
