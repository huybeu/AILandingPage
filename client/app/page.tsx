'use client';
import { useState, useEffect } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

import Topbar from '@/components/layout/Topbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import VideosSection from '@/components/sections/VideosSection';
import PressSection from '@/components/sections/PressSection';
import SpeakerSection from '@/components/sections/SpeakerSection';
import CurriculumSection from '@/components/sections/CurriculumSection';
import BonusSection from '@/components/sections/BonusSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import PricingSection from '@/components/sections/PricingSection';
import CtaSection from '@/components/sections/CtaSection';
import ModalForm from '@/components/ui/ModalForm';
import ChoiceModal from '@/components/ui/ChoiceModal';
import VideoLightbox from '@/components/ui/VideoLightbox';
import ChatWidget from '@/components/ui/ChatWidget';
import ThreeBackground from '@/components/ui/ThreeBackground';

export default function HomePage() {
  const [modalOpen, setModalOpen]   = useState(false);
  const [choiceOpen, setChoiceOpen] = useState(false);
  const [modalType, setModalType]   = useState<'online' | 'offline'>('online');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [seats, setSeats] = useState(47);

  useScrollReveal();

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.15 && seats > 43) setSeats((s) => s - 1);
    }, 7500);
    return () => clearInterval(interval);
  }, [seats]);

  /* nút Hero / Topbar / CTA → hỏi chọn hình thức */
  const openChoice = () => setChoiceOpen(true);

  /* nút trong PricingSection đã biết type */
  const openModalWithType = (type: 'online' | 'offline') => {
    setModalType(type);
    setModalOpen(true);
  };

  /* người dùng chọn trong ChoiceModal */
  const handleChoiceSelect = (type: 'online' | 'offline') => {
    setChoiceOpen(false);
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <>
      <ThreeBackground />

      <Topbar onRegister={openChoice} />

      <main>
        <HeroSection onRegister={openChoice} />
        <hr className="divline" />
        <VideosSection onPlay={setActiveVideo} />
        <hr className="divline" />
        <PressSection />
        <hr className="divline" />
        <SpeakerSection />
        <hr className="divline" />
        <CurriculumSection />
        <hr className="divline" />
        <BonusSection />
        <hr className="divline" />
        <TestimonialsSection />
        <hr className="divline" />
        <PricingSection onRegister={openModalWithType} seats={seats} />
        <hr className="divline" />
        <CtaSection onRegister={openChoice} />
      </main>

      <Footer />

      <ChoiceModal
        open={choiceOpen}
        onClose={() => setChoiceOpen(false)}
        onSelect={handleChoiceSelect}
      />
      <ModalForm
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
      />
      <VideoLightbox videoId={activeVideo} onClose={() => setActiveVideo(null)} />
      <ChatWidget />
    </>
  );
}
