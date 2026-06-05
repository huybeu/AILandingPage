'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import AdminSidebar from '@/components/admin/AdminSidebar';

type PayStatus = 'paid' | 'pending' | 'unpaid';
type LearnType = 'online' | 'offline';
type SortDir = 'asc' | 'desc';
type SortCol = 'name' | 'phone' | 'email' | 'title' | 'company' | 'registeredAt' | 'payStatus' | 'learnType';

interface User {
  id: number; name: string; phone: string; email: string;
  title: string; company: string; registeredAt: string;
  payStatus: PayStatus; learnType: LearnType;
}

const PAY_LABEL: Record<PayStatus, string> = {
  paid: 'Đã Thanh Toán', pending: 'Chờ Xác Nhận', unpaid: 'Chưa Thanh Toán',
};
const PAY_CYCLE: Record<PayStatus, PayStatus> = { unpaid: 'pending', pending: 'paid', paid: 'unpaid' };
const PRICE: Record<LearnType, string> = { online: '686.000đ', offline: '979.000đ' };

function ColFilter({ options, selected, onChange, onClose }: {
  options: { value: string; label: string }[];
  selected: string[]; onChange: (v: string[]) => void; onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [onClose]);
  return (
    <div ref={ref} className="adm-filter-drop">
      {options.map(o => (
        <label key={o.value} className="adm-filter-option">
          <input type="checkbox" checked={selected.includes(o.value)}
            onChange={() => onChange(selected.includes(o.value) ? selected.filter(x => x !== o.value) : [...selected, o.value])} />
          {o.label}
        </label>
      ))}
      {selected.length > 0 && <div className="adm-filter-clear" onClick={() => onChange([])}>Xóa bộ lọc</div>}
    </div>
  );
}

function SortArrow({ col, sortCol, dir }: { col: string; sortCol: string | null; dir: SortDir }) {
  const on = sortCol === col;
  return (
    <span className={`adm-sort ${on ? 'active' : ''}`}>
      <Icon icon="lucide:chevron-up"   width={8} color={on && dir === 'asc'  ? '#b8882e' : 'currentColor'} />
      <Icon icon="lucide:chevron-down" width={8} color={on && dir === 'desc' ? '#b8882e' : 'currentColor'} />
    </span>
  );
}

export default function AdminUsersPage() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [token,  setToken]  = useState('');

  useEffect(() => {
    const t = localStorage.getItem('admin_token');
    if (!t) { router.replace('/admin/login'); return; }
    setToken(t);
    setAuthed(true);
  }, [router]);

  const [users,   setUsers]   = useState<User[]>([]);
  const [total,   setTotal]   = useState(0);
  const [loading, setLoading] = useState(false);

  const [search,  setSearch]  = useState('');
  const [sortCol, setSortCol] = useState<SortCol | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [fType,   setFType]   = useState<string[]>([]);
  const [fStatus, setFStatus] = useState<string[]>([]);
  const [fTitle,  setFTitle]  = useState<string[]>([]);
  const [tabType, setTabType] = useState<'all' | 'online' | 'offline'>('all');

  const fetchUsers = useCallback(async (tok: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ limit: '200' });
      if (search)             params.set('search', search);
      if (tabType !== 'all')  params.set('learnType', tabType);
      if (fStatus.length === 1) params.set('payStatus', fStatus[0]);
      if (sortCol)            { params.set('sortCol', sortCol); params.set('sortDir', sortDir); }

      const res = await fetch(`/api/admin/users?${params}`, {
        headers: { Authorization: `Bearer ${tok}` },
      });
      if (res.status === 401) { localStorage.removeItem('admin_token'); router.replace('/admin/login'); return; }
      const data = await res.json();
      setUsers(data.users ?? []);
      setTotal(data.total ?? 0);
    } catch {
      /* network error — keep existing data */
    } finally {
      setLoading(false);
    }
  }, [search, tabType, fStatus, sortCol, sortDir, router]);

  useEffect(() => {
    if (token) fetchUsers(token);
  }, [token, fetchUsers]);

  const handleSort = (col: SortCol) => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col); setSortDir('asc'); }
    setOpenFilter(null);
  };

  const handleUpdatePayStatus = async (user: User) => {
    const next = PAY_CYCLE[user.payStatus];
    const res = await fetch(`/api/admin/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ payStatus: next }),
    });
    if (res.ok) setUsers(prev => prev.map(u => u.id === user.id ? { ...u, payStatus: next } : u));
  };

  const handleDelete = async (user: User) => {
    if (!confirm(`Xóa "${user.name}"? Hành động này không thể hoàn tác.`)) return;
    const res = await fetch(`/api/admin/users/${user.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) { setUsers(prev => prev.filter(u => u.id !== user.id)); setTotal(t => t - 1); }
  };

  const handleExport = () => {
    const a = document.createElement('a');
    a.href = `/api/admin/export?token=${encodeURIComponent(token)}`;
    a.download = 'dang-ky.csv';
    a.click();
  };

  // Client-side filter for title (multi-select)
  const filtered = fTitle.length > 0 ? users.filter(u => fTitle.includes(u.title)) : users;
  const titles   = [...new Set(users.map(u => u.title).filter(Boolean))];

  const cOnline  = users.filter(u => u.learnType === 'online').length;
  const cOffline = users.filter(u => u.learnType === 'offline').length;
  const cPaid    = users.filter(u => u.payStatus === 'paid').length;

  const Th = ({ col, children, fKey, fOpts, fVal, fSet }: {
    col?: SortCol; children: React.ReactNode;
    fKey?: string; fOpts?: { value: string; label: string }[];
    fVal?: string[]; fSet?: (v: string[]) => void;
  }) => (
    <th className={col ? 'sortable adm-th-wrap' : 'adm-th-wrap'}
      onClick={() => col && handleSort(col)}
      style={{ position: 'relative', userSelect: 'none' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
        {children}
        {col && <SortArrow col={col} sortCol={sortCol} dir={sortDir} />}
        {fKey && fOpts && fVal && fSet && (
          <button className={`adm-filter-btn ${fVal.length > 0 ? 'active' : ''}`}
            onClick={e => { e.stopPropagation(); setOpenFilter(o => o === fKey ? null : fKey); }}
            title="Lọc">
            <Icon icon="lucide:filter" width={8} />
          </button>
        )}
      </span>
      {fKey && openFilter === fKey && fOpts && fVal && fSet && (
        <ColFilter options={fOpts} selected={fVal} onChange={fSet} onClose={() => setOpenFilter(null)} />
      )}
    </th>
  );

  if (!authed) return null;

  return (
    <div className="admin-app">
      <AdminSidebar />
      <div className="adm-main">
        <header className="adm-header">
          <div>
            <div className="adm-header-title">Quản Lý Người Dùng</div>
            <div className="adm-breadcrumb">Trang chủ <span>›</span> Người Dùng</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="adm-hbtn" title="Làm mới" onClick={() => fetchUsers(token)}>
              <Icon icon="lucide:refresh-cw" width={15} />
            </button>
            <button className="adm-hbtn" title="Cài đặt"><Icon icon="lucide:settings" width={15} /></button>
          </div>
        </header>

        <main className="adm-page">
          {/* Stats */}
          <div className="adm-stats">
            {[
              { icon: 'lucide:users',        color: 'gold',   val: total,    label: 'Tổng đăng ký' },
              { icon: 'lucide:check-circle', color: 'green',  val: cPaid,    label: 'Đã thanh toán' },
              { icon: 'lucide:monitor',      color: 'blue',   val: cOnline,  label: 'Học Online' },
              { icon: 'lucide:building-2',   color: 'yellow', val: cOffline, label: 'Học Offline' },
            ].map(s => (
              <div key={s.label} className="adm-stat">
                <div className={`adm-stat-icon ${s.color}`}>
                  <Icon icon={s.icon} width={20} />
                </div>
                <div>
                  <div className="adm-stat-val">{s.val}</div>
                  <div className="adm-stat-label">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="adm-tabs">
            {(['all', 'online', 'offline'] as const).map(t => (
              <button key={t} className={`adm-tab ${tabType === t ? 'active' : ''}`} onClick={() => setTabType(t)}>
                {t !== 'all' && <Icon icon={t === 'online' ? 'lucide:monitor' : 'lucide:building-2'} width={13} />}
                {t === 'all' ? 'Tất Cả' : t === 'online' ? 'Online' : 'Offline'}
                <span className="adm-tab-count">
                  {t === 'all' ? total : t === 'online' ? cOnline : cOffline}
                </span>
              </button>
            ))}
          </div>

          {/* Toolbar */}
          <div className="adm-toolbar">
            <div className="adm-toolbar-title">
              Danh Sách Đăng Ký
              <span style={{ marginLeft: 8, fontSize: 12, color: '#9099b4', fontWeight: 400 }}>
                ({filtered.length}/{total})
              </span>
            </div>
            <div className="adm-search">
              <span className="adm-search-icon"><Icon icon="lucide:search" width={13} /></span>
              <input type="text" placeholder="Tìm theo tên, email, SĐT..."
                value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <button className="adm-btn-export" onClick={handleExport}>
              <Icon icon="lucide:download" width={13} />
              Xuất CSV
            </button>
          </div>

          {/* Table */}
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>#</th>
                  <Th col="name">Họ và Tên</Th>
                  <Th col="phone">Điện Thoại</Th>
                  <Th col="email">Email</Th>
                  <Th col="title" fKey="title"
                    fOpts={titles.map(t => ({ value: t, label: t }))}
                    fVal={fTitle} fSet={setFTitle}>Chức Vụ</Th>
                  <Th col="company">Doanh Nghiệp</Th>
                  <Th col="learnType" fKey="learnType"
                    fOpts={[{ value: 'online', label: 'Online — 686.000đ' }, { value: 'offline', label: 'Offline — 979.000đ' }]}
                    fVal={fType} fSet={setFType}>Hình Thức</Th>
                  <Th col="registeredAt">Ngày Đăng Ký</Th>
                  <Th col="payStatus" fKey="payStatus"
                    fOpts={[{ value: 'paid', label: 'Đã Thanh Toán' }, { value: 'pending', label: 'Chờ Xác Nhận' }, { value: 'unpaid', label: 'Chưa Thanh Toán' }]}
                    fVal={fStatus} fSet={setFStatus}>Thanh Toán</Th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {loading && filtered.length === 0 && (
                  <tr><td colSpan={10}>
                    <div className="adm-empty">
                      <Icon icon="lucide:loader-2" width={32} color="#4a5168"
                        style={{ animation: 'spin .8s linear infinite' }} />
                    </div>
                  </td></tr>
                )}
                {!loading && filtered.length === 0 && (
                  <tr><td colSpan={10}>
                    <div className="adm-empty">
                      <Icon icon="lucide:inbox" width={52} className="adm-empty-icon" color="#4a5168" />
                      <div className="adm-empty-title">Chưa có dữ liệu đăng ký</div>
                      <div className="adm-empty-sub">
                        Khi có người đăng ký từ landing page,<br />danh sách sẽ hiển thị tại đây.
                      </div>
                    </div>
                  </td></tr>
                )}
                {filtered.map(user => (
                  <tr key={user.id}>
                    <td style={{ color: '#9099b4', fontSize: 12 }}>{user.id}</td>
                    <td>
                      <div className="adm-cell-name">
                        <div className="adm-avatar-sm"
                          style={{ background: user.learnType === 'online' ? '#b8882e' : '#0ba898' }}>
                          {user.name.trim().split(' ').pop()?.[0]?.toUpperCase() ?? 'U'}
                        </div>
                        <div className="adm-name-text">{user.name}</div>
                      </div>
                    </td>
                    <td><span className="adm-cell-mono">{user.phone}</span></td>
                    <td><span className="adm-cell-dim">{user.email}</span></td>
                    <td><span className="adm-badge role">{user.title || '—'}</span></td>
                    <td><span className="adm-cell-dim">{user.company || '—'}</span></td>
                    <td>
                      <span className={`adm-badge ${user.learnType === 'online' ? 'type-online' : 'type-offline'}`}>
                        <Icon icon={user.learnType === 'online' ? 'lucide:monitor' : 'lucide:building-2'} width={11} style={{ marginRight: 3 }} />
                        {user.learnType === 'online' ? 'Online' : 'Offline'}
                        <span style={{ marginLeft: 4, opacity: .65, fontSize: 10 }}>{PRICE[user.learnType]}</span>
                      </span>
                    </td>
                    <td><span className="adm-cell-muted">{user.registeredAt}</span></td>
                    <td>
                      <span className={`adm-badge ${user.payStatus}`}
                        title="Click để chuyển trạng thái"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleUpdatePayStatus(user)}>
                        <span className="adm-dot" />{PAY_LABEL[user.payStatus]}
                      </span>
                    </td>
                    <td>
                      <div className="adm-actions">
                        <button className="adm-action-btn danger" title="Xóa"
                          onClick={() => handleDelete(user)}>
                          <Icon icon="lucide:trash-2" width={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="adm-pagination">
              <div className="adm-pag-info">Hiển thị {filtered.length} / {total} người dùng</div>
            </div>
          </div>
        </main>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
