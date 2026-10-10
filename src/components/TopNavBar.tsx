import React, { useState } from 'react';
import { Language } from '../types';

interface TopNavBarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onToggleAudioBanner: () => void;
  isAudioBannerOpen: boolean;
  onOpenNotifications: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({
  language,
  onLanguageChange,
  onToggleAudioBanner,
  isAudioBannerOpen,
  onOpenNotifications,
  activeSection,
  onNavigate,
}) => {
  const [unreadCount] = useState(2);

  const navLinks = [
    { id: 'home', labelTa: 'முகப்பு (Home)', labelEn: 'Home' },
    { id: 'slots', labelTa: 'முன்பதிவு (Slots)', labelEn: 'Slot Booking' },
    { id: 'mandi', labelTa: 'மண்டி வரிசை (Live Mandi)', labelEn: 'Mandi Queue' },
    { id: 'price-ai', labelTa: 'விலை கணிப்பு (Predictor)', labelEn: 'Price Forecast' },
    { id: 'crop-doctor', labelTa: 'பயிர் மருத்துவர் (Disease QR)', labelEn: 'Crop Doctor' },
  ];

  return (
    <header className="bg-surface-container-lowest sticky top-0 z-50 shadow-xs border-b border-outline-variant">
      <div className="flex items-center justify-between px-4 lg:px-8 max-w-7xl mx-auto w-full py-2.5">
        {/* Brand & TN Seal Badge */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => onNavigate('home')}
        >
          <div 
            className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-xs border border-outline-variant shrink-0" 
            title="Tamil Nadu Agriculture Seal"
          >
            <span className="material-symbols-outlined text-[26px] fill-icon">agriculture</span>
          </div>
          <div className="flex flex-col">
            <div className="font-headline-md text-headline-md font-bold text-primary flex items-center gap-1.5 leading-tight">
              <span>AgriGuard TN</span>
              <span className="text-secondary font-headline-md text-headline-md">| அக்ரிகார்ட்</span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
              {language === 'ta' ? 'தமிழ்நாடு வேளாண்மை & உழவர் நலத்துறை' : 'Tamil Nadu Agriculture & Farmers Welfare Dept'}
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-6">
          {navLinks.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`transition-colors pb-1 text-sm font-bold ${
                  isActive
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {language === 'ta' ? item.labelTa : item.labelEn}
              </button>
            );
          })}
        </nav>

        {/* Trailing Action Badges & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Toll-Free Kisan Helpline Badge */}
          <a
            href="tel:1551"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold border border-secondary shadow-xs active:scale-[0.98] transition-transform"
            title="Kisan Call Center: 1551"
          >
            <span className="material-symbols-outlined text-[18px]">support_agent</span>
            <span>{language === 'ta' ? 'உதவி எண் 1551 (Helpline)' : 'Toll-Free 1551 (Helpline)'}</span>
          </a>

          {/* Bilingual Audio Explanation Trigger */}
          <button
            onClick={onToggleAudioBanner}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border font-label-md text-label-md transition-colors shadow-xs active:scale-[0.98] ${
              isAudioBannerOpen 
                ? 'bg-primary text-on-primary border-primary' 
                : 'border-primary text-primary bg-surface-container-lowest hover:bg-surface-container-low'
            }`}
            title="ஒலி வடிவில் விளக்கம் கேட்கவும் (Listen to Audio Explanation)"
          >
            <span className="material-symbols-outlined text-[20px] fill-icon">volume_up</span>
            <span className="hidden md:inline font-bold">
              {language === 'ta' ? 'ஒலி விளக்கம்' : 'Audio Guide'}
            </span>
            <span className="text-xs text-on-surface-variant hidden lg:inline">
              {isAudioBannerOpen ? '(இயங்குகிறது)' : '(Audio)'}
            </span>
          </button>

          {/* Active Language Switcher Pill */}
          <div
            aria-label="Language selection"
            className="flex items-center bg-surface-container p-0.5 rounded-full border border-outline-variant"
            role="group"
          >
            <button
              onClick={() => onLanguageChange('ta')}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                language === 'ta'
                  ? 'bg-primary-container text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              தமிழ்
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                language === 'en'
                  ? 'bg-primary-container text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              ENG
            </button>
          </div>

          {/* Notification Button */}
          <button
            onClick={onOpenNotifications}
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors"
            title="அறிவிப்புகள் (Notifications)"
            aria-label="View notifications"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-error text-on-error text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
