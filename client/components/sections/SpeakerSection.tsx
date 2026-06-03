const CREDENTIALS = [
  {
    icon: '🏆',
    title: 'Chủ tịch HĐQT Wondertour & VEF Global',
    desc: 'Doanh nghiệp hoạt động tại 15+ quốc gia, kết nối hàng nghìn doanh nhân quốc tế',
  },
  {
    icon: '📺',
    title: 'Chuyên gia AI xuất hiện trên VTV1, VTV2, VTV3, VOV, HTV',
    desc: 'Diễn giả được tin tưởng bởi các cơ quan truyền thông quốc gia hàng đầu',
  },
  {
    icon: '🎓',
    title: 'Diễn giả tại 30+ trường Đại học & Doanh nghiệp lớn',
    desc: 'Đào tạo trực tiếp hàng nghìn CEO, Giám đốc và nhà quản lý cấp cao',
  },
  {
    icon: '🌏',
    title: 'Kết nối mạng lưới doanh nhân 15+ quốc gia',
    desc: 'Thành viên các tổ chức kinh doanh quốc tế, diễn đàn lãnh đạo khu vực Châu Á',
  },
];

export default function SpeakerSection() {
  return (
    <section id="speaker">
      <div className="wrap">
        <div className="spk-grid">
          <div className="rv-l">
            <div className="spk-img-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="spk-img" src="/speaker.jpg" alt="Lê Công Năng" />
              <div className="spk-quote">
                &ldquo;AI không thay thế lãnh đạo — AI nhân bản năng lực lãnh đạo của bạn.&rdquo;
              </div>
            </div>
          </div>

          <div className="rv">
            <span className="tag">Diễn Giả &amp; Chuyên Gia</span>
            <h2 className="h2">
              Lê Công Năng —{' '}
              <span className="gold">Người Tiên Phong</span>
              <br />
              Ứng Dụng AI Vào Doanh Nghiệp
            </h2>
            <p className="lead" style={{ marginBottom: 8 }}>
              Từ người đầu tiên ứng dụng AI vào vận hành doanh nghiệp du lịch quốc tế đến việc{' '}
              <strong style={{ color: 'var(--text)' }}>đào tạo hàng nghìn lãnh đạo</strong>{' '}
              cách tư duy và triển khai AI thực chiến.
            </p>
            <div className="cred-list">
              {CREDENTIALS.map((c) => (
                <div key={c.title} className="cred">
                  <div className="cred-ico">{c.icon}</div>
                  <div className="cred-text">
                    <b>{c.title}</b>
                    {c.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
