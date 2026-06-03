'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

const NAV = [
  { label: 'Người Dùng', href: '/admin/users', icon: 'lucide:users' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  return (
    <aside className="adm-sidebar">
      <div className="adm-logo">
        <div>
          <div className="adm-logo-name">WebAI Admin</div>
          <div className="adm-logo-sub">Quản Trị Hệ Thống</div>
        </div>
      </div>

      <nav className="adm-nav">
        <div className="adm-nav-label">Menu chính</div>
        {NAV.map(item => (
          <Link key={item.href} href={item.href}
            className={`adm-nav-item ${pathname.startsWith(item.href) ? 'active' : ''}`}>
            <Icon icon={item.icon} width={16} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="adm-footer">
        <div className="adm-avatar">A</div>
        <div>
          <div className="adm-user-name">Admin</div>
          <div className="adm-user-role">Quản trị viên</div>
        </div>
        <button className="adm-logout" onClick={logout} title="Đăng xuất">
          <Icon icon="lucide:log-out" width={14} />
        </button>
      </div>
    </aside>
  );
}
