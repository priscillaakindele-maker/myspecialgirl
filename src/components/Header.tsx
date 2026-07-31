import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Music, VolumeX, Edit3, Share2, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeaderProps {
  recipientName: string;
  senderName: string;
  onOpenCustomize?: () => void;
  loveCount: number;
  onIncrementLove: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  recipientName,
  senderName,
  onOpenCustomize,
  loveCount,
  onIncrementLove,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  // Gentle synth chime / melody generator on audio toggle
  const toggleAmbientVibe = () => {
    if (isPlayingAudio) {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setIsPlayingAudio(false);
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        // Play a gentle pentatonic chord sequence
        const notes = [261.63, 329.63, 392.00, 523.25, 659.25]; // C4, E4, G4, C5, E5
        let noteIndex = 0;

        const playNextNote = () => {
          if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(notes[noteIndex % notes.length], ctx.currentTime);

          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.3);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.2);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start();
          osc.stop(ctx.currentTime + 2.3);

          noteIndex++;
          setTimeout(playNextNote, 1400);
        };

        playNextNote();
        setIsPlayingAudio(true);
      } catch (err) {
        console.log('Audio Context failed to start', err);
      }
    }
  };

  const handleBurstHearts = (e: React.MouseEvent) => {
    onIncrementLove();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 25,
      spread: 60,
      origin: { x, y },
      shapes: ['star', 'circle'],
      colors: ['#f43f5e', '#fb7185', '#ffe4e6', '#fda4af', '#e11d48'],
      scalar: 1.2,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <header className="relative pt-10 pb-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10 text-[#2D2926]">
      {/* Editorial Volume Header Bar */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col sm:flex-row items-center justify-between border-b border-[#2D2926]/20 pb-4 mb-8 gap-2 text-center sm:text-left"
      >
        <div className="flex items-center gap-2">
          <span className="uppercase text-[10px] sm:text-[11px] font-bold tracking-[0.3em] text-[#2D2926]/70">
            THE COLLECTOR'S EDITION — VOL. 01
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#8C2D38]" />
        </div>
        <div className="text-[11px] uppercase tracking-[0.25em] text-[#9A938A] font-medium flex items-center gap-2">
          <span>NATIONAL GIRLFRIEND'S DAY</span>
          <span>•</span>
          <span className="font-serif italic text-xs lowercase">a special tribute</span>
        </div>
      </motion.div>

      {/* Main Title Block */}
      <div className="text-center my-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block"
        >
          <span className="uppercase text-[11px] font-semibold tracking-[0.4em] text-[#9A938A] block mb-2">
            A DEDICATED TRIBUTE FOR
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-serif italic tracking-tighter leading-[0.9] text-[#2D2926] mb-4"
        >
          Girlfriend's{' '}
          <span className="not-italic text-[#8C2D38] font-normal border-b-2 border-[#8C2D38]/30 pb-1">
            Day
          </span>
        </motion.h1>

        {/* Recipient Name Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-3 flex items-center justify-center gap-3"
        >
          <div className="w-8 sm:w-16 h-[1px] bg-[#2D2926]/30" />
          <h2 className="text-2xl sm:text-4xl font-serif italic text-[#2D2926]">
            To{' '}
            <span className="not-italic font-semibold text-[#8C2D38]">
              {recipientName || 'My Love'}
            </span>
          </h2>
          <div className="w-8 sm:w-16 h-[1px] bg-[#2D2926]/30" />
        </motion.div>

        {/* Subtitle Message */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-[#5C5855] text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed mt-4 mb-8 italic"
        >
          "In the simple moments of every day, you are the most beautiful presence. Thank you for being my constant light and making life feel like a masterpiece."
        </motion.p>
      </div>

      {/* Action Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2 border-t border-[#2D2926]/10"
      >
        {/* Heart Burst Button */}
        <button
          onClick={handleBurstHearts}
          className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-none bg-[#2D2926] text-[#F9F6F1] font-medium text-xs tracking-[0.15em] uppercase hover:bg-[#8C2D38] active:bg-[#8C2D38] transition-all duration-300 cursor-pointer border border-[#2D2926] shadow-2xs"
        >
          <Heart className="w-4 h-4 fill-[#F9F6F1]" />
          <span>Send Love ({loveCount})</span>
        </button>

        {/* Ambient Music Button */}
        <button
          onClick={toggleAmbientVibe}
          className={`w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-none border text-xs tracking-[0.15em] uppercase font-medium transition-all duration-300 cursor-pointer ${
            isPlayingAudio
              ? 'bg-[#E8E2D9] border-[#2D2926] text-[#2D2926]'
              : 'bg-[#F9F6F1] border-[#D4CEC5] text-[#2D2926] hover:border-[#2D2926]'
          }`}
        >
          {isPlayingAudio ? (
            <>
              <Music className="w-4 h-4 text-[#8C2D38] animate-spin" />
              <span>Playing Vibe</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4 text-[#9A938A]" />
              <span>Romantic Vibe</span>
            </>
          )}
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-none bg-[#F9F6F1] border border-[#D4CEC5] text-[#2D2926] hover:border-[#2D2926] text-xs tracking-[0.15em] uppercase font-medium transition-all cursor-pointer"
          title="Share page link"
        >
          {copiedLink ? (
            <>
              <Check className="w-4 h-4 text-emerald-700" />
              <span className="text-emerald-800 font-bold">Link Copied</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-[#9A938A]" />
              <span>Share Page</span>
            </>
          )}
        </button>
      </motion.div>
    </header>
  );
};
