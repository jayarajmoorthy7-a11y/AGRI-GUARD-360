import React, { useState, useEffect } from 'react';
import { Language } from '../types';

interface AudioBannerProps {
  language: Language;
  onClose: () => void;
}

export const AudioBanner: React.FC<AudioBannerProps> = ({ language, onClose }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  const textTa = 'அக்ரிகார்ட் முகப்புக்கு நல்வரவு. டோக்கன், முன்பதிவு மற்றும் சந்தை விலை அறிய கீழே உள்ள அட்டைகளை தொடவும். மைக் அழுத்தி உங்கள் குரல் வழியிலும் பேசலாம்.';
  const textEn = 'Welcome to AgriGuard TN Portal. Tap cards below to book slots, view live mandi queues, forecast prices, or diagnose leaf diseases. Tap the mic to speak in Tamil or English.';

  const currentText = language === 'ta' ? textTa : textEn;

  useEffect(() => {
    let utterance: SpeechSynthesisUtterance | null = null;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      utterance = new SpeechSynthesisUtterance(currentText);
      utterance.lang = language === 'ta' ? 'ta-IN' : 'en-IN';
      utterance.rate = 0.95;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      try {
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      } catch (err) {
        console.warn('Speech synthesis error', err);
      }
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [currentText, language]);

  const handleTogglePlay = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(currentText);
        utterance.lang = language === 'ta' ? 'ta-IN' : 'en-IN';
        utterance.rate = 0.95;
        utterance.onend = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="bg-tertiary text-on-tertiary px-4 py-2 border-b border-outline transition-all shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
        <div className="flex items-center gap-2.5 flex-1">
          <button 
            onClick={handleTogglePlay}
            className="w-8 h-8 rounded-full bg-tertiary-container hover:bg-secondary text-on-tertiary flex items-center justify-center transition-colors shadow-xs shrink-0"
            title={isPlaying ? 'நிறுத்தவும் (Pause)' : 'மீண்டும் ஒலிக்கவும் (Replay)'}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
          </button>
          <span className="material-symbols-outlined mic-pulsing text-secondary-fixed shrink-0">
            campaign
          </span>
          <div className="text-xs sm:text-sm">
            <span className="font-bold mr-1 text-secondary-fixed">
              {language === 'ta' ? 'ஒலி வழிகாட்டி இயங்குகிறது:' : 'Audio Guide Active:'}
            </span>
            <span className="opacity-95">"{currentText}"</span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            onClick={handleTogglePlay}
            className="px-2 py-0.5 rounded text-xs bg-tertiary-container/80 hover:bg-tertiary-container text-white font-medium"
          >
            {isPlaying ? (language === 'ta' ? 'இடைநிறுத்து' : 'Pause') : (language === 'ta' ? 'மீண்டும் கேள்' : 'Replay')}
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-tertiary-container rounded transition-colors text-white"
            title="மூடுக (Close banner)"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      </div>
    </div>
  );
};
