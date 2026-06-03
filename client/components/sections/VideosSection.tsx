'use client';
import { Icon } from '@iconify/react';

interface VideosSectionProps {
  onPlay: (videoId: string) => void;
}

const VIDEOS = [
  { id: 'fjQ6wQm_A68', label: 'Talkshow Industry 5.0' },
  { id: 'wAJd7juxQTc', label: 'Chuyên gia AI Doanh Nghiệp' },
  { id: 'gJ_h4JzeTdQ', label: 'Diễn giả Khởi nghiệp & AI' },
  { id: '_956Tr0Byyo', label: 'Tọa đàm Doanh nghiệp số' },
  { id: 'McaqoZsdMvw', label: 'Quản trị AI Doanh nghiệp' },
];

export default function VideosSection({ onPlay }: VideosSectionProps) {
  return (
    <section id="videos">
      <div className="wrap">
        <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
          <span className="tag rv">Media &amp; Truyền Hình</span>
          <h2 className="h2 rv">
            Lê Công Năng <span className="gold">Trên Sóng Truyền Hình</span>
          </h2>
        </div>
        <div className="vid-grid rv">
          {VIDEOS.map((v) => (
            <div key={v.id} className="vid-card" onClick={() => onPlay(v.id)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://img.youtube.com/vi/${v.id}/mqdefault.jpg`} alt={v.label} />
              <div className="vid-overlay" />
              <div className="vid-play">
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: 'rgba(200,148,42,.88)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon icon="lucide:play" width={20} color="#fff" style={{ marginLeft: 2 }} />
                </div>
              </div>
              <div className="vid-lbl">{v.label}</div>
            </div>
          ))}

          <div className="vid-more" style={{ color: 'var(--text-dim)', fontSize: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              border: '1.5px solid rgba(197,46,46,.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon icon="lucide:plus" width={18} color="var(--red)" />
            </div>
            <span style={{ fontWeight: 700, color: 'var(--text-dim)' }}>30+ Video</span>
            <span style={{ fontSize: 10 }}>trên YouTube &amp; các kênh</span>
          </div>
        </div>
      </div>
    </section>
  );
}
