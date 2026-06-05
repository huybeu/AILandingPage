'use client';
import { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';

interface ModalFormProps {
  open: boolean;
  onClose: () => void;
  type: 'online' | 'offline';
}

export default function ModalForm({ open, onClose, type }: ModalFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const overlayRef = useRef<HTMLDivElement>(null);

  const isOnline = type === 'online';
  const price = isOnline ? '686.000đ' : '979.000đ';
  const priceIcon  = isOnline ? 'lucide:monitor' : 'lucide:building-2';
  const priceLabel = isOnline ? 'Online — Zoom / Live Stream' : 'Offline — Học Trực Tiếp';

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    setSubmitted(false);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim())  { alert('Vui lòng nhập họ và tên!'); return; }
    if (!phone.trim()) { alert('Vui lòng nhập số điện thoại!'); return; }
    if (!email.trim()) { alert('Vui lòng nhập email!'); return; }

    setLoading(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone: phone.trim(), email: email.trim(), title, company, learnType: type }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || 'Đăng ký thất bại, vui lòng thử lại.');
        return;
      }
      setSubmitted(true);
    } catch {
      alert('Lỗi kết nối. Vui lòng thử lại hoặc gọi 0931 722 777.');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div id="modal-overlay" className="open" ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}>
      <div className="modal" id="modal-inner">
        <div className="modal-head">
          <div>
            <div className="modal-title">Đăng Ký Khoá Học</div>
            <div className="modal-sub">
              <span style={{
                display: 'inline-block', padding: '2px 10px', borderRadius: 20,
                background: isOnline ? 'var(--gold-dim)' : 'var(--teal-dim)',
                border: `1px solid ${isOnline ? 'rgba(200,148,42,.4)' : 'rgba(11,168,152,.4)'}`,
                color: isOnline ? 'var(--gold-l)' : 'var(--teal)',
                fontSize: 11, fontWeight: 700, marginRight: 8,
              }}>
                <Icon icon={priceIcon} width={11} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                {priceLabel}
              </span>
              Điền thông tin — đội ngũ xác nhận trong 30 phút
            </div>
          </div>
          <div className="modal-close" onClick={onClose}>
            <Icon icon="lucide:x" width={14} />
          </div>
        </div>

        {!submitted ? (
          <>
            <div className="modal-body">
              <div className="fg">
                <label className="fl">Họ và tên <span>*</span></label>
                <input className="fi" type="text" placeholder="Nguyễn Văn A" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div className="fg">
                <label className="fl">Số điện thoại <span>*</span></label>
                <input className="fi" type="tel" placeholder="0901 234 567" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
              <div className="fg">
                <label className="fl">Email <span>*</span></label>
                <input className="fi" type="email" placeholder="email@company.com" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="fg">
                <label className="fl">Chức vụ</label>
                <select className="fi" value={title} onChange={e => setTitle(e.target.value)}>
                  <option value="">— Chọn —</option>
                  <option>CEO / Tổng Giám Đốc</option>
                  <option>Chủ Doanh Nghiệp</option>
                  <option>Giám Đốc Điều Hành</option>
                  <option>Giám Đốc Marketing</option>
                  <option>Giám Đốc Kinh Doanh</option>
                  <option>Quản Lý Cấp Trung</option>
                  <option>Khác</option>
                </select>
              </div>
              <div className="fg full">
                <label className="fl">Tên doanh nghiệp</label>
                <input className="fi" type="text" placeholder="Công ty TNHH ABC" value={company} onChange={e => setCompany(e.target.value)} />
              </div>
            </div>

            <div className="modal-pay" id="m-pay">
              <div className="mp-title">
                <Icon icon="lucide:credit-card" width={14} color="#EDB84A" />
                Thanh Toán Học Phí —&nbsp;
                <span style={{ color: isOnline ? 'var(--gold-l)' : 'var(--teal)' }}>{price}</span>
              </div>
              <div className="mp-grid">
                <div className="mp-rows">
                  {[
                    { icon: 'lucide:landmark',    l: 'Ngân hàng',     v: 'MB Bank' },
                    { icon: 'lucide:credit-card', l: 'Số tài khoản',  v: '9996469999' },
                    { icon: 'lucide:user',        l: 'Chủ tài khoản', v: 'LÊ CÔNG NĂNG' },
                    { icon: 'lucide:banknote',    l: 'Học phí',       v: price },
                  ].map(r => (
                    <div key={r.l} className="mp-row">
                      <div className="mp-ico"><Icon icon={r.icon} width={18} color="var(--gold-l)" /></div>
                      <div>
                        <div className="mp-l">{r.l}</div>
                        <div className="mp-v">{r.v}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mp-qr">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/qr-mbbank.jpg" alt="QR MB Bank" />
                  <div className="mp-qr-lbl">Quét QR chuyển khoản</div>
                </div>
              </div>
              <div className="mp-note" style={{ display: 'flex', gap: 7, alignItems: 'flex-start' }}>
                <Icon icon="lucide:lightbulb" width={14} color="var(--gold)" style={{ flexShrink: 0, marginTop: 1 }} />
                <span>Sau khi chuyển khoản, nhắn tin SMS/Zalo <strong>0931 722 777</strong> kèm tên, email &amp; hình thức học (<strong>{isOnline ? 'Online' : 'Offline'}</strong>) để xác nhận.</span>
              </div>
            </div>

            <div className="modal-foot" id="m-foot">
              <button className="btn-submit" onClick={handleSubmit} disabled={loading}
                style={!isOnline ? { background: 'var(--teal)' } : {}}>
                <Icon icon={loading ? 'lucide:loader-2' : 'lucide:send'} width={15}
                  style={loading ? { animation: 'spin .8s linear infinite' } : {}} />
                {loading ? 'Đang gửi...' : `Xác Nhận Đăng Ký ${isOnline ? 'Online' : 'Offline'} — ${price}`}
              </button>
              <div className="modal-terms">Bằng việc đăng ký, bạn đồng ý với điều khoản sử dụng dịch vụ</div>
            </div>
          </>
        ) : (
          <div className="modal-success show">
            <div style={{ marginBottom: 16 }}>
              <Icon icon="lucide:party-popper" width={52} color="var(--gold-l)" />
            </div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 24, fontWeight: 900, marginBottom: 8 }}>
              Đăng Ký Thành Công!
            </h3>
            <p style={{ color: 'var(--text-dim)', fontSize: 14, lineHeight: 1.75, marginBottom: 20 }}>
              Cảm ơn <strong style={{ color: 'var(--text)' }}>{name}</strong>! Đội ngũ sẽ liên hệ xác nhận trong{' '}
              <strong style={{ color: 'var(--gold-l)' }}>30 phút</strong>.
              <br />Vui lòng hoàn tất thanh toán <strong style={{ color: isOnline ? 'var(--gold-l)' : 'var(--teal)' }}>{price}</strong> qua MB Bank.
            </p>
            <button className="btn-primary" onClick={onClose} style={{ margin: '0 auto' }}>
              Đóng
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
