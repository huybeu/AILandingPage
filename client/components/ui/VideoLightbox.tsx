'use client';
import { useEffect } from 'react';

interface VideoLightboxProps {
  videoId: string | null;
  onClose: () => void;
}

export default function VideoLightbox({ videoId, onClose }: VideoLightboxProps) {
  useEffect(() => {
    if (!videoId) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [videoId, onClose]);

  if (!videoId) return null;

  return (
    <div
      id="vid-lb"
      className="open"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="vlb-inner">
        <button className="vlb-close" onClick={onClose}>✕ Đóng</button>
        <div className="vlb-frame">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Video"
          />
        </div>
      </div>
    </div>
  );
}
