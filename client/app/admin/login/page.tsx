'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('admin_token')) {
      router.replace('/admin/users');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Sai tên đăng nhập hoặc mật khẩu');
        return;
      }
      localStorage.setItem('admin_token', data.token);
      router.push('/admin/users');
    } catch {
      setError('Lỗi kết nối máy chủ, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adm-login-wrap">
      <div className="adm-login-card">
        <div className="adm-login-brand">
          <div className="adm-login-icon">
            <Icon icon="lucide:layout-dashboard" width={26} color="#b8882e" />
          </div>
          <div className="adm-login-title">WebAI Admin</div>
          <div className="adm-login-sub">Đăng nhập để quản trị hệ thống</div>
        </div>

        <form className="adm-login-form" onSubmit={handleSubmit}>
          <div className="adm-form-group">
            <label className="adm-form-label">Tên đăng nhập</label>
            <div className="adm-form-input-wrap">
              <span className="adm-form-input-icon">
                <Icon icon="lucide:user" width={16} />
              </span>
              <input className="adm-form-input" type="text" placeholder="admin"
                value={username} onChange={e => setUsername(e.target.value)}
                autoComplete="username" required />
            </div>
          </div>

          <div className="adm-form-group">
            <label className="adm-form-label">Mật khẩu</label>
            <div className="adm-form-input-wrap">
              <span className="adm-form-input-icon">
                <Icon icon="lucide:lock" width={16} />
              </span>
              <input className="adm-form-input" type={showPass ? 'text' : 'password'}
                placeholder="••••••••" value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password" required style={{ paddingRight: 40 }} />
              <button type="button" onClick={() => setShowPass(v => !v)}
                style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9099b4', padding: 4, display: 'flex' }}>
                <Icon icon={showPass ? 'lucide:eye-off' : 'lucide:eye'} width={16} />
              </button>
            </div>
          </div>

          {error && (
            <div className="adm-login-error">
              <Icon icon="lucide:alert-circle" width={15} />
              {error}
            </div>
          )}

          <button className="adm-login-btn" type="submit" disabled={loading}>
            {loading ? (
              <>
                <Icon icon="lucide:loader-2" width={16} style={{ animation: 'spin .8s linear infinite' }} />
                Đang đăng nhập...
              </>
            ) : (
              <>
                Đăng Nhập
                <Icon icon="lucide:arrow-right" width={15} />
              </>
            )}
          </button>
        </form>

        <div className="adm-login-hint">
          Đăng nhập bằng tài khoản quản trị đã cấu hình
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
