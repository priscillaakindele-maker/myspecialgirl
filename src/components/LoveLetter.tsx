import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Heart, Sparkles, Copy, Check, RefreshCw, Feather, Edit3 } from 'lucide-react';
import { LoveMessage } from '../types';

interface LoveLetterProps {
  message: LoveMessage;
  onEditMessage?: () => void;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({ message, onEditMessage }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);

  const handleCopy = () => {
    const fullText = `${message.headline}\n\nTo ${message.recipientName},\n\n${message.body.join('\n\n')}\n\n${message.signature}\n${message.senderName}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReplay = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIsOpen(true);
    }, 400);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto z-10 relative text-[#2D2926]">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-12 h-[1px] bg-[#2D2926] mb-3 opacity-40" />
        <span className="uppercase text-[11px] font-bold tracking-[0.3em] text-[#9A938A] mb-1">
          PERSONAL CORRESPONDENCE
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif italic text-[#2D2926]">
          The Dedicated Message
        </h2>
      </div>

      {/* Main Interactive Envelope / Letter Container */}
      <div className="relative mx-auto">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            /* Closed Sealed Envelope View */
            <motion.div
              key="closed-envelope"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={() => setIsOpen(true)}
              className="max-w-lg mx-auto bg-[#F0EBE3] p-8 sm:p-12 border-2 border-[#D4CEC5] text-center cursor-pointer hover:border-[#2D2926] transition-all duration-300 relative group shadow-sm"
            >
              {/* Wax Seal Icon */}
              <div className="w-16 h-16 mx-auto rounded-full bg-[#2D2926] text-[#F9F6F1] flex items-center justify-center shadow-md group-hover:bg-[#8C2D38] transition-colors mb-4">
                <Heart className="w-7 h-7 fill-[#F9F6F1]" />
              </div>

              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#9A938A] block mb-1">
                SEALED LETTER
              </span>
              <h3 className="font-serif italic font-bold text-2xl text-[#2D2926]">
                For {message.recipientName || 'My Love'}
              </h3>
              <p className="text-[#5C5855] text-xs mt-2 italic font-serif">
                A personal message written with affection
              </p>

              <div className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] w-full sm:w-auto bg-[#2D2926] text-[#F9F6F1] text-xs tracking-[0.15em] uppercase font-bold group-hover:bg-[#8C2D38] transition-colors shadow-2xs">
                <Mail className="w-4 h-4" />
                <span>Open Letter</span>
              </div>
            </motion.div>
          ) : (
            /* Open Unfolded Letter View */
            <motion.div
              key="open-letter"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="bg-[#F9F6F1] p-6 sm:p-14 border-2 sm:border-4 border-[#F0EBE3] shadow-lg relative text-[#2D2926]"
            >
              {/* Top Editorial Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-[#2D2926]/20 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-none bg-[#8C2D38] text-[#F9F6F1] flex items-center justify-center shadow-2xs">
                    <Heart className="w-3.5 h-3.5 fill-[#F9F6F1]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8C2D38] block">
                      {message.specialDate || "National Girlfriend's Day"}
                    </span>
                    <span className="text-[#9A938A] text-xs uppercase tracking-wider">
                      Volume No. 01 • Collector's Issue
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto w-full sm:w-auto">
                  <button
                    onClick={handleCopy}
                    className="w-full sm:w-auto min-h-[44px] px-4 py-2 border border-[#2D2926] hover:bg-[#2D2926] hover:text-[#F9F6F1] bg-[#F9F6F1] text-[#2D2926] transition-colors cursor-pointer text-xs uppercase tracking-wider font-bold flex items-center justify-center gap-2"
                    title="Copy letter"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-700" />
                        <span className="text-emerald-800 font-bold">Copied to Clipboard</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#8C2D38]" />
                        <span>Copy Letter</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Letter Title */}
              <div className="mb-8">
                <h3 className="text-3xl sm:text-4xl font-serif font-bold text-[#2D2926] tracking-tight leading-tight">
                  {message.headline}
                </h3>
                <p className="text-[#8C2D38] font-serif italic text-xl mt-2">
                  To {message.recipientName},
                </p>
              </div>

              {/* Letter Content Paragraphs with Editorial Typography */}
              <div className="space-y-6 text-[#2D2926] font-serif text-lg sm:text-xl leading-relaxed sm:leading-loose">
                {message.body.map((paragraph, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 * idx }}
                    className={idx === 0 ? "first-letter:float-left first-letter:text-5xl first-letter:pr-3 first-letter:font-bold first-letter:text-[#8C2D38] first-letter:font-serif" : ""}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Editorial Signed With Affection Sign-off */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-12 pt-8 border-t border-[#2D2926]/20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6"
              >
                <div>
                  <div className="h-[1px] bg-[#2D2926] w-24 mb-4 opacity-40" />
                  <span className="text-[10px] uppercase tracking-[0.4em] block mb-1 text-[#9A938A] font-bold">
                    SIGNED WITH AFFECTION
                  </span>
                  <p className="font-serif text-4xl sm:text-5xl text-[#2D2926]">
                    {message.signature || 'Always Yours,'}
                  </p>
                  <p className="font-serif text-2xl sm:text-3xl italic mt-1 text-[#8C2D38]">
                    {message.senderName || 'Your Air Marshal'}
                  </p>
                </div>

                <button
                  onClick={handleReplay}
                  className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#F0EBE3] border border-[#2D2926] text-[#2D2926] hover:bg-[#2D2926] hover:text-[#F9F6F1] text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4 text-[#8C2D38]" />
                  <span>Fold Letter</span>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
