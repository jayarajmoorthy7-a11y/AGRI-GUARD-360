import React from 'react';
import { Language } from '../../types';

interface FarmerProfileModalProps {
  language: Language;
  onClose: () => void;
}

export const FarmerProfileModal: React.FC<FarmerProfileModalProps> = ({ language, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant max-w-lg w-full shadow-2xl overflow-hidden">
        {/* Card Header (TN Green) */}
        <div className="p-5 bg-primary text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary-container border-2 border-white/40 flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined text-[28px] fill-icon">agriculture</span>
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md font-bold">
                {language === 'ta' ? 'தமிழ்நாடு உழவர் அடையாள அட்டை' : 'Tamil Nadu Digital Uzhavar Pass'}
              </h3>
              <p className="text-xs text-primary-fixed">
                {language === 'ta' ? 'அங்கீகரிக்கப்பட்ட டிஜிட்டல் பாஸ் (Uzhavar ID)' : 'Official Agricultural Identification'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* Card Content (Pass format) */}
        <div className="p-5 space-y-4">
          <div className="flex items-center gap-4 bg-surface-container-low p-4 rounded-xl border border-outline-variant">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold text-2xl shadow-xs shrink-0">
              ரா
            </div>
            <div className="flex-1">
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider block">
                {language === 'ta' ? 'உழவர் பெயர்:' : 'Farmer Name:'}
              </span>
              <h4 className="font-headline-md text-headline-md font-extrabold text-on-surface">
                {language === 'ta' ? 'ராமையா க.' : 'Ramaiya K.'}
              </h4>
              <p className="text-xs text-on-surface-variant font-mono">
                {language === 'ta' ? 'உழவர் எண்:' : 'Uzhavar ID:'} TN-UZH-2025-48102
              </p>
            </div>
            {/* Verification Seal */}
            <div className="text-center shrink-0">
              <span className="material-symbols-outlined text-primary text-[32px] fill-icon">
                verified
              </span>
              <span className="text-[10px] text-primary font-bold block">சரிபார்க்கப்பட்டது</span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-surface-container rounded-lg border border-outline-variant">
              <span className="text-on-surface-variant block font-medium">மாவட்டம் & வட்டம்:</span>
              <span className="font-bold text-on-surface text-sm">திருச்சி / மணிகண்டம்</span>
            </div>
            <div className="p-3 bg-surface-container rounded-lg border border-outline-variant">
              <span className="text-on-surface-variant block font-medium">நிலப் பரப்பளவு:</span>
              <span className="font-bold text-on-surface text-sm">3.5 ஏக்கர் (நஞ்சை)</span>
            </div>
            <div className="p-3 bg-surface-container rounded-lg border border-outline-variant">
              <span className="text-on-surface-variant block font-medium">முதன்மை பயிர்:</span>
              <span className="font-bold text-primary text-sm">நெல் (CR 1009 Sub 1)</span>
            </div>
            <div className="p-3 bg-surface-container rounded-lg border border-outline-variant">
              <span className="text-on-surface-variant block font-medium">ஆதார் இணைப்பு:</span>
              <span className="font-bold text-on-surface text-sm">XXXX-XXXX-8921 ✓</span>
            </div>
          </div>

          {/* Scheme Badges */}
          <div className="bg-surface-container-low p-3.5 rounded-xl border border-outline-variant space-y-2">
            <span className="text-xs font-bold text-on-surface block">
              {language === 'ta' ? 'செயலில் உள்ள அரசு திட்டங்கள்:' : 'Enrolled Government Schemes:'}
            </span>
            <div className="flex flex-wrap gap-1.5 text-xs font-semibold">
              <span className="px-2.5 py-1 rounded-md bg-primary-fixed text-on-primary-fixed">
                ✓ PM-Kisan (17வது தவணை பெறப்பட்டது)
              </span>
              <span className="px-2.5 py-1 rounded-md bg-secondary-container text-on-secondary-container">
                ✓ PMFBY பயிர் காப்பீடு 2024-25
              </span>
              <span className="px-2.5 py-1 rounded-md bg-surface-container text-primary border border-primary/30">
                ✓ உழவர் பாதுகாப்பு அட்டை
              </span>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-surface-container border-t border-outline-variant flex items-center justify-between">
          <button
            onClick={() => alert('உழவர் அடையாள அட்டை PDF வடிவில் பதிவிறக்கம் செய்யப்படுகிறது.')}
            className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            <span>{language === 'ta' ? 'அட்டை பதிவிறக்கம் (PDF)' : 'Download Card'}</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary text-on-primary font-bold text-xs rounded-lg cursor-pointer hover:opacity-90"
          >
            {language === 'ta' ? 'சரி (Close)' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
