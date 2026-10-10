import React from 'react';
import { Language } from '../types';

interface BottomNavBarProps {
  language: Language;
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenVoice: () => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  language,
  activeSection,
  onNavigate,
  onOpenVoice,
}) => {
  return (
    <nav
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-2 bg-surface-container-lowest shadow-lg border-t border-outline-variant"
    >
      {/* Tab 1: முகப்பு (Home) */}
      <button
        type="button"
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-xl active:scale-[0.98] transition-transform duration-150 cursor-pointer ${
          activeSection === 'home'
            ? 'bg-primary-container text-on-primary-container font-bold'
            : 'text-on-surface-variant hover:bg-surface-container-low'
        }`}
      >
        <span className="material-symbols-outlined text-[22px] fill-icon">home</span>
        <span className="font-label-sm text-label-sm mt-0.5">
          {language === 'ta' ? 'முகப்பு (Home)' : 'Home'}
        </span>
      </button>

      {/* Tab 2: வரிசை (Mandi) */}
      <button
        type="button"
        onClick={() => onNavigate('mandi')}
        className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-xl active:scale-[0.98] transition-transform duration-150 cursor-pointer ${
          activeSection === 'mandi'
            ? 'bg-primary-container text-on-primary-container font-bold'
            : 'text-on-surface-variant hover:bg-surface-container-low'
        }`}
      >
        <span className="material-symbols-outlined text-[22px]">queue</span>
        <span className="font-label-sm text-label-sm mt-0.5">
          {language === 'ta' ? 'வரிசை (Mandi)' : 'Queue'}
        </span>
      </button>

      {/* Tab 3: குரல் (Voice) */}
      <button
        type="button"
        onClick={onOpenVoice}
        className="flex flex-col items-center justify-center text-on-surface-variant px-3 py-1.5 rounded-xl active:scale-[0.98] transition-transform duration-150 hover:bg-surface-container-low cursor-pointer"
      >
        <span className="material-symbols-outlined text-[22px] text-secondary">mic</span>
        <span className="font-label-sm text-label-sm mt-0.5">
          {language === 'ta' ? 'குரல் (Voice)' : 'Voice'}
        </span>
      </button>

      {/* Tab 4: முன்பதிவு (Pass) */}
      <button
        type="button"
        onClick={() => onNavigate('slots')}
        className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-xl active:scale-[0.98] transition-transform duration-150 cursor-pointer ${
          activeSection === 'slots'
            ? 'bg-primary-container text-on-primary-container font-bold'
            : 'text-on-surface-variant hover:bg-surface-container-low'
        }`}
      >
        <span className="material-symbols-outlined text-[22px]">confirmation_number</span>
        <span className="font-label-sm text-label-sm mt-0.5">
          {language === 'ta' ? 'முன்பதிவு (Pass)' : 'Slots'}
        </span>
      </button>

      {/* Tab 5: ஆலோசனை (Crop) */}
      <button
        type="button"
        onClick={() => onNavigate('crop-doctor')}
        className={`flex flex-col items-center justify-center px-3 py-1.5 rounded-xl active:scale-[0.98] transition-transform duration-150 cursor-pointer ${
          activeSection === 'crop-doctor'
            ? 'bg-primary-container text-on-primary-container font-bold'
            : 'text-on-surface-variant hover:bg-surface-container-low'
        }`}
      >
        <span className="material-symbols-outlined text-[22px]">local_florist</span>
        <span className="font-label-sm text-label-sm mt-0.5">
          {language === 'ta' ? 'ஆலோசனை (Crop)' : 'Crop AI'}
        </span>
      </button>
    </nav>
  );
};
