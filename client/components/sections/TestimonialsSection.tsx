const TESTIMONIALS = [
  {
    avatar: '🏗️',
    text: 'Trước khi học, tôi nghĩ AI chỉ dành cho IT. Sau khoá học, tôi đã xây được <strong>trợ lý AI cho phòng Sales</strong> — đội ngũ giờ tự xử lý được 80% câu hỏi khách hàng mà không cần tôi can thiệp.',
    name: 'Nguyễn Minh Tú',
    role: 'Giám đốc Công ty Xây dựng & Nội thất',
  },
  {
    avatar: '🛍️',
    text: 'Tôi đã thử nhiều khoá AI nhưng toàn lý thuyết. Khoá này khác: anh Năng dạy tôi cách <strong>phân rã bài toán kinh doanh</strong> để giao cho AI. Tuần đầu tiên tôi đã tiết kiệm được 12 giờ làm việc.',
    name: 'Trần Thị Lan Anh',
    role: 'Chủ chuỗi cửa hàng thời trang (5 chi nhánh)',
  },
  {
    avatar: '🏥',
    text: 'Phần <strong>Meta-Prompting</strong> là tuyệt nhất — tôi không còn mất hàng giờ viết prompt nữa. Quan trọng hơn là tôi hiểu cách bảo vệ thương hiệu cá nhân khi dùng AI làm content.',
    name: 'BS. Lê Quang Vinh',
    role: 'Giám đốc Phòng khám Đa khoa',
  },
  {
    avatar: '🏭',
    text: 'Ứng dụng ngay sau khoá: tôi xây được <strong>Giám Đốc HR AI</strong> đọc và chấm điểm CV theo tiêu chí riêng của công ty. Vòng lọc đầu từ 3 ngày xuống còn 2 giờ.',
    name: 'Phạm Duy Khánh',
    role: 'CEO Công ty Sản xuất thực phẩm (200 NV)',
  },
  {
    avatar: '✈️',
    text: 'Là CEO du lịch, tôi đặc biệt ấn tượng với phần <strong>demo live phân tích đối thủ cạnh tranh</strong> trong 5 phút. Anh Năng có kinh nghiệm thực tế nên ví dụ rất sát với ngành của tôi.',
    name: 'Vũ Thị Hương',
    role: 'Giám đốc Công ty Du lịch & Lữ hành',
  },
  {
    avatar: '💰',
    text: '490K mà tặng kèm 6 AI cá nhân hoá — thực sự đáng giá. Tôi đã áp dụng ngay <strong>Lộ trình 3 bước</strong> và trong tháng đầu đã có 2 quy trình AI chạy ổn định trong công ty.',
    name: 'Đỗ Ngọc Bình',
    role: 'Giám đốc Công ty Tư vấn Tài chính',
  },
];

const Stars = () => (
  <div className="tc-stars">
    {[...Array(5)].map((_, i) => <span key={i} className="tc-star">⭐</span>)}
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
                <div className="tc-avatar">{t.avatar}</div>
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
