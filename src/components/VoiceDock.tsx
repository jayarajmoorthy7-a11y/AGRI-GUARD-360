import React from 'react';
import { Language } from '../types';

interface VoiceDockProps {
  language: Language;
  onOpenVoiceModal: () => void;
}

export const VoiceDock: React.FC<VoiceDockProps> = ({
  language,
  onOpenVoiceModal,
}) => {
  return (
    <div className="fixed bottom-16 lg:bottom-4 left-0 right-0 z-40 px-4 pointer-events-none">
      <div className="max-w-xl mx-auto pointer-events-auto">
        <div className="bg-surface-container-lowest border-2 border-primary rounded-full shadow-lg p-1.5 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onOpenVoiceModal}
            className="w-12 h-12 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-md active:scale-95 transition-all cursor-pointer"
            title="பேச அழுத்தவும் (Tap to Speak)"
          >
            <span className="material-symbols-outlined text-[26px] fill-icon">mic</span>
          </button>

          <div
            className="flex-1 text-left px-2 truncate cursor-pointer"
            onClick={onOpenVoiceModal}
          >
            <span className="font-label-md text-label-md font-bold text-on-surface block leading-tight truncate">
              {language === 'ta'
                ? 'பேசி தேட இங்கே அழுத்தவும் (Tap here to speak)'
                : 'Tap here to speak (Tamil / English)'}
            </span>
            <span className="text-xs text-on-surface-variant truncate block">
              {language === 'ta'
                ? 'விலை, டோக்கன், பயிர் நோய் பற்றி தமிழில் கேளுங்கள்'
                : 'Ask about Mandi prices, queue tokens, weather, or crop disease'}
            </span>
          </div>

          <button
            type="button"
            onClick={onOpenVoiceModal}
            className="px-3.5 py-1.5 bg-primary-container text-on-primary rounded-full text-xs font-bold hover:opacity-90 shrink-0 active:scale-[0.98] cursor-pointer"
          >
            {language === 'ta' ? 'கேளுங்கள் (Ask)' : 'Ask AI'}
          </button>
        </div>
      </div>
    </div>
  );
};
