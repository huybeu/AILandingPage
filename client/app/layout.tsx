import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Khoá Học Quản Trị AI Cho Lãnh Đạo — Lê Công Năng',
  description: 'Chuyển đổi từ người dùng công cụ sang nhà kiến tạo hệ thống AI. Khoá học 180 phút thực chiến dành cho CEO & Chủ Doanh Nghiệp.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🤖</text></svg>",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
