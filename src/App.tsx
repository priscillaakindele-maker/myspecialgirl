import React, { useState } from 'react';
import { FloatingHearts } from './components/FloatingHearts';
import { Header } from './components/Header';
import { PhotoGallery } from './components/PhotoGallery';
import { LoveLetter } from './components/LoveLetter';
import { InteractiveMoments } from './components/InteractiveMoments';
import { DEFAULT_PHOTOS, DEFAULT_MESSAGE, DEFAULT_REASONS } from './data/defaultData';
import { PhotoMemory, LoveMessage, LoveReason } from './types';
import { Heart } from 'lucide-react';

export default function App() {
  const photos = DEFAULT_PHOTOS;
  const message = DEFAULT_MESSAGE;
  const [reasons, setReasons] = useState<LoveReason[]>(DEFAULT_REASONS);
  const [loveCount, setLoveCount] = useState(1);

  const handleAddReason = (text: string) => {
    const newReason: LoveReason = {
      id: Date.now().toString(),
      text,
    };
    setReasons((prev) => [...prev, newReason]);
  };

  return (
    <div className="min-h-screen bg-[#F9F6F1] text-[#2D2926] font-sans selection:bg-[#8C2D38] selection:text-[#F9F6F1] relative overflow-x-hidden pb-16">
      {/* Ambient Floating Hearts Background */}
      <FloatingHearts />

      {/* Hero Header */}
      <Header
        recipientName={message.recipientName}
        senderName={message.senderName}
        loveCount={loveCount}
        onIncrementLove={() => setLoveCount((prev) => prev + 1)}
      />

      {/* Main Content Area */}
      <main className="space-y-4">
        {/* Section 1: The Three Pictures Gallery */}
        <PhotoGallery photos={photos} />

        {/* Section 2: The Heartfelt Message from Him to Her */}
        <LoveLetter message={message} />

        {/* Section 3: Interactive Reasons & Hugs */}
        <InteractiveMoments
          reasons={reasons}
          onAddReason={handleAddReason}
          recipientName={message.recipientName}
        />
      </main>

      {/* Footer */}
      <footer className="mt-16 text-center text-xs text-[#9A938A] py-8 border-t border-[#2D2926]/20 max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-center gap-1.5 mb-2 text-[#2D2926] font-medium uppercase tracking-[0.2em] text-[11px]">
          <span>Curated with</span>
          <Heart className="w-3.5 h-3.5 text-[#8C2D38] fill-[#8C2D38]" />
          <span>for My Queen on Girlfriend's Day</span>
        </div>
        <p className="font-serif italic text-xs text-[#5C5855]">
          A collector's edition single-page keepsake • Designed with timeless affection
        </p>
      </footer>
    </div>
  );
}
