import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Smile, Plus, Sparkles, Check, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LoveReason } from '../types';

interface InteractiveMomentsProps {
  reasons: LoveReason[];
  onAddReason: (text: string) => void;
  recipientName: string;
}

export const InteractiveMoments: React.FC<InteractiveMomentsProps> = ({
  reasons,
  onAddReason,
  recipientName,
}) => {
  const [newReasonText, setNewReasonText] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({
    '1': true,
    '2': true,
  });
  const [hugCount, setHugCount] = useState(0);

  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReasonText.trim()) {
      onAddReason(newReasonText.trim());
      setNewReasonText('');
      setIsAdding(false);
    }
  };

  const handleSendHug = (e: React.MouseEvent) => {
    setHugCount((prev) => prev + 1);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 35,
      spread: 70,
      origin: { x, y },
      colors: ['#e11d48', '#f43f5e', '#fb7185', '#f472b6', '#fca5a5'],
      scalar: 1.1,
    });
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto z-10 relative text-[#2D2926]">
      {/* Container Box */}
      <div className="bg-[#F0EBE3] border-2 border-[#D4CEC5] p-6 sm:p-10 shadow-sm relative">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#2D2926]/20">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="uppercase text-[10px] font-bold tracking-[0.3em] text-[#8C2D38]">
                REASONS OF AFFECTION
              </span>
            </div>
            <h2 className="text-3xl font-serif italic font-bold text-[#2D2926]">
              Why I Love You
            </h2>
            <p className="text-[#5C5855] text-xs font-serif italic mt-0.5">
              Tap any entry to reveal the hidden reason
            </p>
          </div>

          {/* Virtual Hug Action */}
          <button
            onClick={handleSendHug}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#2D2926] text-[#F9F6F1] font-medium text-xs tracking-[0.15em] uppercase hover:bg-[#8C2D38] transition-colors cursor-pointer border border-[#2D2926]"
          >
            <Gift className="w-3.5 h-3.5 text-[#F9F6F1]" />
            <span>Send Virtual Hug ({hugCount})</span>
          </button>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reasons.map((reason, idx) => {
            const isRevealed = revealedIds[reason.id] ?? false;
            return (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onClick={() => toggleReveal(reason.id)}
                className={`p-4 border transition-all cursor-pointer flex items-start gap-3.5 ${
                  isRevealed
                    ? 'bg-[#F9F6F1] border-[#2D2926] shadow-2xs'
                    : 'bg-[#E8E2D9] border-[#D4CEC5] hover:border-[#2D2926]'
                }`}
              >
                <div
                  className={`p-2 rounded-none transition-colors flex-shrink-0 ${
                    isRevealed ? 'bg-[#8C2D38] text-[#F9F6F1]' : 'bg-[#D4CEC5] text-[#5C5855]'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${isRevealed ? 'fill-[#F9F6F1]' : ''}`} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] font-bold text-[#9A938A] mb-1">
                    <span>ENTRY NO. 0{idx + 1}</span>
                    <span className="text-[#8C2D38] lowercase italic font-serif text-xs font-normal">
                      {isRevealed ? 'unlocked' : 'tap to reveal'}
                    </span>
                  </div>
                  {isRevealed ? (
                    <p className="text-[#2D2926] font-serif text-base leading-relaxed">
                      {reason.text}
                    </p>
                  ) : (
                    <p className="text-[#9A938A] text-sm italic font-serif select-none">
                      •••••••• •••••••• ••••••
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Add Reason Form / Button */}
        <div className="mt-8 pt-6 border-t border-[#2D2926]/20">
          {!isAdding ? (
            <button
              onClick={() => setIsAdding(true)}
              className="min-h-[44px] inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-bold text-[#8C2D38] hover:text-[#2D2926] transition-colors cursor-pointer py-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Custom Reason to Archive...</span>
            </button>
          ) : (
            <form onSubmit={handleAddSubmit} className="flex flex-col sm:flex-row gap-2 max-w-lg">
              <input
                type="text"
                value={newReasonText}
                onChange={(e) => setNewReasonText(e.target.value)}
                placeholder={`Why do you love ${recipientName || 'her'}?`}
                className="flex-1 px-4 py-3 min-h-[44px] bg-[#F9F6F1] border border-[#2D2926] text-sm font-serif focus:outline-none focus:ring-1 focus:ring-[#8C2D38]"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 sm:flex-none min-h-[44px] px-6 py-3 bg-[#2D2926] text-[#F9F6F1] text-xs uppercase tracking-wider font-bold hover:bg-[#8C2D38] transition-colors cursor-pointer"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="flex-1 sm:flex-none min-h-[44px] px-5 py-3 bg-[#E8E2D9] border border-[#D4CEC5] text-[#2D2926] text-xs uppercase tracking-wider font-bold hover:bg-[#D4CEC5] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
