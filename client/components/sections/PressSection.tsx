const LOGOS = [
  { src: '/press-vtv1.jpg',         alt: 'VTV1' },
  { src: '/press-vnews.jpg',        alt: 'VNews' },
  { src: '/press-vov.jpg',          alt: 'VOV' },
  { src: '/press-htv.jpg',          alt: 'HTV' },
  { src: '/press-antv.jpg',         alt: 'ANTV' },
  { src: '/press-dantri.jpg',       alt: 'Dân Trí' },
  { src: '/press-thanhnien.jpg',    alt: 'Thanh Niên' },
  { src: '/press-vietnamnet.jpg',   alt: 'Vietnamnet' },
  { src: '/press-tintuc.jpg',       alt: 'Tin Tức TTXVN' },
  { src: '/press-nhandan.jpg',      alt: 'Nhân Dân' },
  { src: '/press-vnexpress.jpg',    alt: 'VnExpress' },
  { src: '/press-danviet.jpg',      alt: 'Dân Việt' },
  { src: '/press-vietnamplus.jpg',  alt: 'Vietnam+' },
  { src: '/press-dautuvietnam.jpg', alt: 'Đầu Tư' },
  { src: '/press-kinhtedothi.jpg',  alt: 'Kinh Tế & Đô Thị' },
  { src: '/press-taichinhvn.jpg',   alt: 'Tài Chính VN' },
  { src: '/press-tuoitrethudo.jpg', alt: 'Tuổi Trẻ Thủ Đô' },
  { src: '/press-more.jpg',         alt: '30+ Kênh truyền thông' },
];

const ROW1 = LOGOS.slice(0, 9);
const ROW2 = LOGOS.slice(9);

function LogoItem({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="logo-box">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} />
    </div>
  );
}

export default function PressSection() {
  return (
    <section id="press">
      <div className="wrap">
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <span className="tag rv">Báo Chí &amp; Truyền Thông</span>
          <h2 className="h2 rv">
            Tin Tưởng Bởi Các Cơ Quan <span className="gold">Truyền Thông Uy Tín</span>
          </h2>
        </div>
      </div>

      {/* Row 1 — left to right: 4× duplicate so seam is never visible */}
      <div className="marquee-outer">
        <div className="marquee-track marquee-ltr">
          {[...ROW1, ...ROW1, ...ROW1, ...ROW1].map((logo, i) => (
            <LogoItem key={i} src={logo.src} alt={logo.alt} />
          ))}
        </div>
      </div>

      {/* Row 2 — right to left */}
      <div className="marquee-outer">
        <div className="marquee-track marquee-rtl">
          {[...ROW2, ...ROW2, ...ROW2, ...ROW2].map((logo, i) => (
            <LogoItem key={i} src={logo.src} alt={logo.alt} />
          ))}
        </div>
      </div>
    </section>
  );
}
