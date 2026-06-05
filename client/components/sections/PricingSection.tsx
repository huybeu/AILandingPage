'use client';
import { Icon } from '@iconify/react';

const INCLUDES_ONLINE = [
  '5 phần học thực chiến — 180 phút nội dung đặc biệt',
  'Học qua Zoom / Live Stream HD — xem lại 7 ngày',
  '<strong style="color:var(--gold-l)">BONUS:</strong> 6 Giám Đốc AI cá nhân hoá cho doanh nghiệp bạn',
  'Bộ Thư viện Prompt Nội bộ mẫu cho 6 phòng ban',
  'Action Plan cụ thể — bắt đầu triển khai ngay ngày mai',
  'Tài liệu & template dùng ngay — không cần IT hỗ trợ',
  'Hỗ trợ sau khoá học qua nhóm riêng',
];

const INCLUDES_OFFLINE = [
  '5 phần học thực chiến — 180 phút nội dung đặc biệt',
  'Học trực tiếp cùng diễn giả Lê Công Năng',
  '<strong style="color:var(--gold-l)">BONUS:</strong> 6 Giám Đốc AI cá nhân hoá cho doanh nghiệp bạn',
  'Bộ Thư viện Prompt Nội bộ mẫu cho 6 phòng ban',
  'Demo LIVE — giải quyết bài toán thực tế ngay tại lớp',
  'Tài liệu in ấn & workbook thực hành tại chỗ',
  'Networking với CEO & lãnh đạo doanh nghiệp',
  'Hỗ trợ sau khoá học qua nhóm VIP riêng',
];

const CheckItem = ({ teal }: { teal?: boolean }) => (
  <div className="check-icon" style={teal ? { background: 'var(--teal-dim)', borderColor: 'rgba(11,168,152,.3)' } : {}}>
    <Icon icon="lucide:check" width={10} color={teal ? 'var(--teal)' : '#25B87A'} strokeWidth={2.5} />
  </div>
);

interface PricingSectionProps {
  onRegister: (type: 'online' | 'offline') => void;
  seats: number;
}

export default function PricingSection({ onRegister, seats }: PricingSectionProps) {
  return (
    <section id="pricing">
      <div className="wrap">
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="tag rv">Học Phí &amp; Đăng Ký</span>
          <h2 className="h2 rv">
            Ưu Đãi Early Bird — Chỉ Dành Cho{' '}
            <span style={{ color: 'var(--red)' }}>100 Người Đầu Tiên</span>
          </h2>
          <p className="lead rv">
            Khoá học trị giá{' '}
            <strong style={{ textDecoration: 'line-through', color: 'var(--text-muted)' }}>3.600.000đ</strong>{' '}
            — Đăng ký sớm từ{' '}
            <strong style={{ color: 'var(--gold-l)', fontSize: 18 }}>686.000đ</strong> · Còn lại{' '}
            <span style={{ color: 'var(--red)', fontWeight: 800 }}>{seats} suất</span>/100
          </p>
        </div>

        {/* Early bird banner */}
        <div className="early-bird-box rv" style={{ marginBottom: 32 }}>
          <div className="eb-icon"><Icon icon="lucide:flame" width={24} color="var(--red)" /></div>
          <div>
            <div className="eb-title">Ưu Đãi Early Bird — Chỉ Còn {seats}/100 Suất</div>
            <div className="eb-sub">Sau khi hết suất, học phí sẽ trở lại giá gốc ban đầu</div>
          </div>
        </div>

        {/* Two pricing cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 40 }}>

          {/* ONLINE */}
          <div className="pcard rv-l">
            <div className="pcard-head">
              <div className="pcard-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon icon="lucide:monitor" width={13} /> ONLINE
              </div>
              <div className="pcard-price">
                <span className="pp-amt">686</span>
                <span className="pp-suf">K</span>
              </div>
              <div>
                <span className="pp-cross">3.600.000đ</span>
                <span className="pp-save">Tiết kiệm 81%</span>
              </div>
            </div>
            <div className="pcard-body">
              <div className="inc-list">
                {INCLUDES_ONLINE.map((item, i) => (
                  <div key={i} className="inc-item">
                    <CheckItem />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="pcard-foot">
              <button className="btn-buy" onClick={() => onRegister('online')}>
                <Icon icon="lucide:sparkles" width={16} />
                Đăng Ký Online — 686.000đ
              </button>
            </div>
          </div>

          {/* OFFLINE */}
          <div className="pcard rv-r" style={{ borderColor: 'var(--teal)' }}>
            <div className="pcard-ribbon" style={{ background: 'var(--teal)' }}>Offline</div>
            <div className="pcard-head" style={{ background: 'linear-gradient(135deg,rgba(11,168,152,.1),rgba(11,168,152,.03))', borderBottomColor: 'rgba(11,168,152,.15)' }}>
              <div className="pcard-label" style={{ color: 'var(--teal)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon icon="lucide:building-2" width={13} /> OFFLINE
              </div>
              <div className="pcard-price">
                <span className="pp-amt" style={{ color: 'var(--teal)' }}>979</span>
                <span className="pp-suf" style={{ color: 'var(--teal)' }}>K</span>
              </div>
              <div>
                <span className="pp-cross">5.200.000đ</span>
                <span className="pp-save">Tiết kiệm 81%</span>
              </div>
            </div>
            <div className="pcard-body">
              <div className="inc-list">
                {INCLUDES_OFFLINE.map((item, i) => (
                  <div key={i} className="inc-item">
                    <CheckItem teal />
                    <span dangerouslySetInnerHTML={{ __html: item }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="pcard-foot">
              <button className="btn-buy" onClick={() => onRegister('offline')}
                style={{ background: 'var(--teal)', color: '#fff' }}
                onMouseOver={e => (e.currentTarget.style.background = '#0a8c7c')}
                onMouseOut={e => (e.currentTarget.style.background = 'var(--teal)')}>
                <Icon icon="lucide:sparkles" width={16} />
                Đăng Ký Offline — 979.000đ
              </button>
            </div>
          </div>
        </div>

        {/* Payment info */}
        <div className="pay-box rv">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'start' }}>
            <div>
              <div className="pay-title">
                <Icon icon="lucide:credit-card" width={16} color="var(--gold-l)" />
                Thông Tin Thanh Toán
              </div>
              <div className="pay-rows">
                {[
                  { icon: 'lucide:landmark',     label: 'Ngân hàng',     val: 'MB Bank' },
                  { icon: 'lucide:credit-card',  label: 'Số tài khoản',  val: '9996469999' },
                  { icon: 'lucide:user',         label: 'Chủ tài khoản', val: 'LÊ CÔNG NĂNG' },
                  { icon: 'lucide:monitor',      label: 'Online',        val: '686.000đ',   accent: true },
                  { icon: 'lucide:building-2',   label: 'Offline',       val: '979.000đ',   accent: true },
                ].map(r => (
                  <div key={r.label} className="pay-row">
                    <div className="pay-ico"><Icon icon={r.icon} width={20} color="var(--gold-l)" /></div>
                    <div>
                      <div className="pay-lbl">{r.label}</div>
                      <div className="pay-val" style={r.accent ? { color: 'var(--red)' } : {}}>{r.val}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pay-note" style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
                <Icon icon="lucide:lightbulb" width={14} color="var(--gold)" style={{ flexShrink: 0, marginTop: 1 }} />
                <span>Sau chuyển khoản, nhắn tin hotline <strong>0931 722 777</strong> kèm tên, email &amp; hình thức học (Online/Offline) để xác nhận trong 30 phút.</span>
              </div>
            </div>
            <div className="pay-qr-wrap" style={{ borderTop: 'none', paddingTop: 0, minWidth: 180 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/qr-mbbank.jpg" alt="QR MB Bank" />
              <div className="pay-qr-lbl">Quét để chuyển khoản nhanh</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
