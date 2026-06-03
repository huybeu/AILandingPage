const STEPS = [
  {
    num: '01',
    cls: 'n1',
    badge: '45\'',
    badgeStyle: {},
    title: 'Phá Băng & Tái Định Vị Tư Duy',
    desc: 'Đập tan 3 lầm tưởng lớn nhất — định vị AI như "thực tập sinh xuất chúng" cần được giao việc đúng cách.',
  },
  {
    num: '02',
    cls: 'n2',
    badge: '90\' — Cốt lõi',
    badgeStyle: { background: 'var(--teal-dim)', borderColor: 'rgba(15,191,170,.35)', color: 'var(--teal)' },
    title: '6 Tư Duy Lãnh Đạo AI',
    desc: 'Chống FOMO · Phân rã & Đóng gói · Ủy quyền · Meta-Prompting · Vòng lặp tối ưu · Bảo vệ thương hiệu',
  },
  {
    num: '03',
    cls: 'n3',
    badge: '60\' + Demo Live',
    badgeStyle: { background: 'rgba(59,111,212,.1)', borderColor: 'rgba(59,111,212,.3)', color: '#7BAAF5' },
    title: 'Bản Đồ Ứng Dụng → ROI Ngay',
    desc: 'Phễu 3 tầng: Cá nhân · Phòng ban · Quy trình lõi. Demo LIVE giải quyết bài toán thực của học viên trong 5 phút.',
  },
  {
    num: '04',
    cls: 'n4',
    badge: '60\' — Thực hành',
    badgeStyle: {},
    title: 'Nhân Bản "Chuyên Viên AI" 0đ',
    desc: 'Khung Identity → Knowledge → Workflow → Output. Xây Thư viện Prompt riêng. 1 AI Mẹ → 10 AI Con chuyên biệt.',
  },
  {
    num: '05',
    cls: 'n5',
    badge: '45\' — Action Plan',
    badgeStyle: { background: 'var(--green-dim)', borderColor: 'rgba(37,184,122,.3)', color: 'var(--green)' },
    title: 'Lộ Trình Thực Thi & Quản Trị Rủi Ro',
    desc: 'AI Taskforce · Thí điểm đo lường · Cẩm nang AI nội bộ · Quy tắc bảo mật dữ liệu sống còn.',
  },
];

export default function CurriculumSection() {
  return (
    <section id="curriculum" style={{ padding: '80px 0', background: 'var(--bg2)' }}>
      <div className="wrap">
        <div style={{ textAlign: 'center', maxWidth: 580, margin: '0 auto' }}>
          <span className="tag rv">5 Phần Học · 180&apos;</span>
          <h2 className="h2 rv">
            <span className="gold">Roadmap Thực Chiến</span>
            <br />
            Thay Đổi Cách Vận Hành Doanh Nghiệp
          </h2>
        </div>

        <div className="curr-compact rv">
          {STEPS.map((s, idx) => (
            <div
              key={s.num}
              className="cc-step"
              style={idx === STEPS.length - 1 ? { borderBottom: 'none' } : {}}
            >
              <div className={`cc-num ${s.cls}`}>{s.num}</div>
              <div className="cc-body">
                <div className="cc-badge" style={s.badgeStyle}>{s.badge}</div>
                <div className="cc-title">{s.title}</div>
                <div className="cc-desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
