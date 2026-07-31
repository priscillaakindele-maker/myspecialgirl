import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Save, Image as ImageIcon, MessageSquare, Heart, Upload, RefreshCw } from 'lucide-react';
import { PhotoMemory, LoveMessage } from '../types';

interface CustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: LoveMessage;
  photos: PhotoMemory[];
  onSaveMessage: (newMessage: LoveMessage) => void;
  onSavePhotos: (newPhotos: PhotoMemory[]) => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  onClose,
  message,
  photos,
  onSaveMessage,
  onSavePhotos,
}) => {
  const [activeTab, setActiveTab] = useState<'names' | 'letter' | 'photos'>('names');

  // Form states
  const [recipientName, setRecipientName] = useState(message.recipientName);
  const [senderName, setSenderName] = useState(message.senderName);
  const [headline, setHeadline] = useState(message.headline);
  const [bodyText, setBodyText] = useState(message.body.join('\n\n'));

  const [editedPhotos, setEditedPhotos] = useState<PhotoMemory[]>([...photos]);

  if (!isOpen) return null;

  const handlePhotoChange = (index: number, field: keyof PhotoMemory, value: string) => {
    const updated = [...editedPhotos];
    updated[index] = { ...updated[index], [field]: value };
    setEditedPhotos(updated);
  };

  const handleFileUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          handlePhotoChange(index, 'url', event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAll = () => {
    onSaveMessage({
      ...message,
      recipientName,
      senderName,
      headline,
      body: bodyText.split('\n\n').filter((p) => p.trim().length > 0),
    });

    onSavePhotos(editedPhotos);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-[#2D2926]/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto text-[#2D2926]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#F9F6F1] border-4 border-[#F0EBE3] max-w-2xl w-full shadow-2xl overflow-hidden my-8"
        >
          {/* Modal Header */}
          <div className="px-6 py-5 border-b border-[#2D2926]/20 flex items-center justify-between bg-[#F0EBE3]">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#8C2D38] text-[#F9F6F1]">
                <Heart className="w-4 h-4 fill-[#F9F6F1]" />
              </div>
              <div>
                <h3 className="font-serif italic font-bold text-xl text-[#2D2926]">
                  Curate Collector's Archive
                </h3>
                <p className="text-[#9A938A] text-[11px] uppercase tracking-wider font-semibold">
                  Personalize portraits, names, and dedicated correspondence
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-[#2D2926] text-[#F9F6F1] hover:bg-[#8C2D38] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#2D2926]/20 px-6 pt-3 bg-[#F0EBE3]/50 gap-6 text-xs font-bold uppercase tracking-[0.15em]">
            <button
              onClick={() => setActiveTab('names')}
              className={`pb-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'names'
                  ? 'border-[#8C2D38] text-[#8C2D38]'
                  : 'border-transparent text-[#9A938A] hover:text-[#2D2926]'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              <span>01. Names</span>
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={`pb-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'photos'
                  ? 'border-[#8C2D38] text-[#8C2D38]'
                  : 'border-transparent text-[#9A938A] hover:text-[#2D2926]'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>02. Three Portraits</span>
            </button>
            <button
              onClick={() => setActiveTab('letter')}
              className={`pb-3 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'letter'
                  ? 'border-[#8C2D38] text-[#8C2D38]'
                  : 'border-transparent text-[#9A938A] hover:text-[#2D2926]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>03. Dedicated Letter</span>
            </button>
          </div>

          {/* Tab Contents */}
          <div className="p-6 max-h-[60vh] overflow-y-auto space-y-6">
            {/* Tab 1: Names */}
            {activeTab === 'names' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#2D2926] uppercase tracking-[0.2em] mb-1.5">
                    Her Name (Girlfriend)
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="e.g. Sophia, My Love"
                    className="w-full px-4 py-2.5 bg-[#F9F6F1] border border-[#2D2926] text-sm font-serif focus:ring-1 focus:ring-[#8C2D38] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#2D2926] uppercase tracking-[0.2em] mb-1.5">
                    His Name (Your Name)
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Jameson, Yours Always"
                    className="w-full px-4 py-2.5 bg-[#F9F6F1] border border-[#2D2926] text-sm font-serif focus:ring-1 focus:ring-[#8C2D38] focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Tab 2: Photos */}
            {activeTab === 'photos' && (
              <div className="space-y-6">
                <p className="text-xs text-[#5C5855] font-serif italic">
                  Update the three portraits and memory titles. You may supply external image URLs or upload local image files.
                </p>

                {editedPhotos.map((photo, index) => (
                  <div
                    key={index}
                    className="p-4 border border-[#D4CEC5] bg-[#F0EBE3] space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#8C2D38] uppercase tracking-[0.25em]">
                        PORTRAIT PLATE 0{index + 1}
                      </span>
                      <label className="text-[10px] uppercase tracking-wider text-[#2D2926] hover:text-[#8C2D38] cursor-pointer inline-flex items-center gap-1 font-bold bg-[#F9F6F1] px-3 py-1 border border-[#2D2926]">
                        <Upload className="w-3 h-3 text-[#9A938A]" />
                        <span>Upload Photo File</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(index, e)}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="flex items-center gap-4">
                      <img
                        src={photo.url}
                        alt={`Photo ${index + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 object-cover border border-[#2D2926] flex-shrink-0"
                      />
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          value={photo.title}
                          onChange={(e) => handlePhotoChange(index, 'title', e.target.value)}
                          placeholder="Portrait Title"
                          className="w-full px-3 py-1.5 bg-[#F9F6F1] border border-[#D4CEC5] text-xs font-serif italic focus:outline-none focus:border-[#2D2926]"
                        />
                        <input
                          type="text"
                          value={photo.caption}
                          onChange={(e) => handlePhotoChange(index, 'caption', e.target.value)}
                          placeholder="Memory Caption"
                          className="w-full px-3 py-1.5 bg-[#F9F6F1] border border-[#D4CEC5] text-xs font-serif focus:outline-none focus:border-[#2D2926]"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Love Message */}
            {activeTab === 'letter' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#2D2926] uppercase tracking-[0.2em] mb-1.5">
                    Correspondence Headline
                  </label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="e.g. Happy Girlfriend's Day, My Beloved"
                    className="w-full px-4 py-2.5 bg-[#F9F6F1] border border-[#2D2926] text-sm focus:ring-1 focus:ring-[#8C2D38] focus:outline-none font-serif font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#2D2926] uppercase tracking-[0.2em] mb-1.5">
                    Letter Body Paragraphs (Separate with double line breaks)
                  </label>
                  <textarea
                    rows={8}
                    value={bodyText}
                    onChange={(e) => setBodyText(e.target.value)}
                    placeholder="Write your heartfelt message here..."
                    className="w-full px-4 py-3 bg-[#F9F6F1] border border-[#2D2926] text-sm focus:ring-1 focus:ring-[#8C2D38] focus:outline-none font-serif leading-relaxed"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="px-6 py-4 border-t border-[#2D2926]/20 bg-[#F0EBE3] flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#E8E2D9] border border-[#D4CEC5] text-[#2D2926] hover:bg-[#D4CEC5] text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleSaveAll}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#2D2926] hover:bg-[#8C2D38] text-[#F9F6F1] font-medium text-xs uppercase tracking-[0.15em] transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save & Publish Edition</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
