import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Calendar, X, Camera, ChevronLeft, ChevronRight } from 'lucide-react';
import { PhotoMemory } from '../types';

interface PhotoGalleryProps {
  photos: PhotoMemory[];
  onEditPhoto?: (index: number) => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, onEditPhoto }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const activePhoto = selectedPhotoIndex !== null ? photos[selectedPhotoIndex] : null;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % photos.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + photos.length) % photos.length);
    }
  };

  // Asymmetric editorial shapes for the 3 portrait frames
  const shapeStyles = [
    'rounded-tr-[60px]',
    'rounded-bl-[60px]',
    'rounded-tl-[60px]',
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10 relative text-[#2D2926]">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-[1px] bg-[#2D2926]/40" />
          <span className="uppercase text-[11px] font-bold tracking-[0.3em] text-[#9A938A]">
            PORTRAIT ARCHIVE • THREE MEMORIES
          </span>
          <div className="w-8 h-[1px] bg-[#2D2926]/40" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif italic text-[#2D2926]">
          The Three Portraits
        </h2>
        <p className="text-[#5C5855] text-xs uppercase tracking-[0.2em] mt-1 font-medium">
          Click any frame to view in full resolution
        </p>
      </div>

      {/* Grid of 3 Pictures */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id || index}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="group bg-[#F0EBE3] p-4 border border-[#D4CEC5] transition-all duration-300 flex flex-col relative shadow-2xs hover:shadow-md"
          >
            {/* Editorial Number Tag */}
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.25em] text-[#9A938A] mb-3 px-1">
              <span>PLATE NO. 0{index + 1}</span>
              <span className="font-serif italic text-xs capitalize text-[#8C2D38]">
                {photo.date || `Memory 0${index + 1}`}
              </span>
            </div>

            {/* Image Container with Elegant Frame Styling */}
            <div
              onClick={() => setSelectedPhotoIndex(index)}
              className="relative aspect-[3/4] sm:aspect-[4/5] w-full overflow-hidden bg-[#EFE9E0] cursor-pointer mb-4 border-2 border-[#D4CEC5] rounded-sm p-1 shadow-inner flex items-center justify-center"
            >
              <img
                src={photo.url}
                alt={photo.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500 rounded-xs"
              />
              {/* Overlay hover effect */}
              <div className="absolute inset-0 bg-[#2D2926]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="p-3 bg-[#F9F6F1] text-[#2D2926] shadow-md border border-[#D4CEC5] text-xs uppercase tracking-widest font-semibold">
                  View Frame
                </span>
              </div>
            </div>

            {/* Photo Title & Caption */}
            <div className="flex-1 flex flex-col justify-between px-1">
              <div>
                <h3 className="font-serif italic font-bold text-xl text-[#2D2926] group-hover:text-[#8C2D38] transition-colors">
                  {photo.title}
                </h3>
                <p className="text-[#5C5855] text-xs sm:text-sm mt-2 leading-relaxed font-serif italic border-l-2 border-[#8C2D38]/30 pl-3 py-0.5">
                  "{photo.caption}"
                </p>
              </div>

              {/* Bottom Card Actions */}
              <div className="mt-5 pt-3 border-t border-[#D4CEC5]/60 flex items-center justify-between text-[11px] uppercase tracking-wider text-[#9A938A]">
                <span className="flex items-center gap-1 font-medium text-[#2D2926]">
                  <Heart className="w-3.5 h-3.5 fill-[#8C2D38] text-[#8C2D38]" /> Memory 0{index + 1}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPhotoIndex(index);
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1.5 min-h-[38px] bg-[#2D2926] text-[#F9F6F1] font-medium text-[10px] tracking-widest uppercase hover:bg-[#8C2D38] active:bg-[#8C2D38] transition-colors cursor-pointer shadow-2xs"
                >
                  View Frame
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhotoIndex(null)}
            className="fixed inset-0 z-50 bg-[#2D2926]/90 backdrop-blur-xs p-2 sm:p-6 flex items-center justify-center overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#F9F6F1] border-2 sm:border-4 border-[#F0EBE3] shadow-2xl flex flex-col md:flex-row overflow-hidden text-[#2D2926] max-h-[92vh] md:max-h-none overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhotoIndex(null)}
                className="absolute top-3 right-3 z-50 w-11 h-11 bg-[#2D2926] text-[#F9F6F1] hover:bg-[#8C2D38] active:bg-[#8C2D38] transition-colors cursor-pointer flex items-center justify-center shadow-md border border-[#F9F6F1]/20"
                aria-label="Close photo view"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next Navigation Buttons */}
              <button
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 w-11 h-11 bg-[#2D2926]/90 text-[#F9F6F1] hover:bg-[#8C2D38] shadow-lg transition-colors cursor-pointer flex items-center justify-center rounded-full border border-[#F9F6F1]/30"
                title="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-40 w-11 h-11 bg-[#2D2926]/90 text-[#F9F6F1] hover:bg-[#8C2D38] shadow-lg transition-colors cursor-pointer flex items-center justify-center rounded-full border border-[#F9F6F1]/30"
                title="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Modal Image */}
              <div className="md:w-3/5 bg-[#2D2926] flex items-center justify-center relative min-h-[320px] sm:min-h-[400px] p-4">
                <img
                  src={activePhoto.url}
                  alt={activePhoto.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[60vh] md:max-h-[75vh] w-auto object-contain border border-[#F0EBE3]/20"
                />
              </div>

              {/* Modal Details */}
              <div className="md:w-2/5 p-5 sm:p-8 flex flex-col justify-between bg-[#F9F6F1] border-t md:border-t-0 md:border-l border-[#D4CEC5]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8C2D38] block mb-2">
                    PORTRAIT NO. 0{selectedPhotoIndex + 1} OF 03
                  </span>
                  <h3 className="text-2xl font-serif italic font-bold text-[#2D2926] mb-2">
                    {activePhoto.title}
                  </h3>
                  <p className="text-xs text-[#9A938A] uppercase tracking-wider mb-4 sm:mb-6">
                    {activePhoto.date}
                  </p>
                  <p className="text-[#5C5855] text-sm leading-relaxed font-serif italic border-l-2 border-[#2D2926]/40 pl-4 py-1">
                    "{activePhoto.caption}"
                  </p>
                </div>

                <div className="mt-6 sm:mt-8 pt-4 border-t border-[#D4CEC5] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-[11px] uppercase tracking-wider">
                  <div className="flex items-center justify-between sm:justify-start gap-2">
                    <button
                      onClick={handlePrev}
                      className="flex-1 sm:flex-none min-h-[44px] px-4 py-2 bg-[#EFE9E0] border border-[#2D2926] text-[#2D2926] hover:bg-[#2D2926] hover:text-[#F9F6F1] active:bg-[#8C2D38] transition-colors cursor-pointer flex items-center justify-center gap-1 font-bold text-xs"
                    >
                      <ChevronLeft className="w-4 h-4" /> Prev
                    </button>
                    <button
                      onClick={handleNext}
                      className="flex-1 sm:flex-none min-h-[44px] px-4 py-2 bg-[#EFE9E0] border border-[#2D2926] text-[#2D2926] hover:bg-[#2D2926] hover:text-[#F9F6F1] active:bg-[#8C2D38] transition-colors cursor-pointer flex items-center justify-center gap-1 font-bold text-xs"
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => setSelectedPhotoIndex(null)}
                    className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 bg-[#2D2926] text-[#F9F6F1] font-medium text-xs tracking-widest hover:bg-[#8C2D38] active:bg-[#8C2D38] transition-colors cursor-pointer flex items-center justify-center"
                  >
                    Close Frame
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
