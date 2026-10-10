import React from 'react';
import { Language } from '../types';

interface WhatsAppBotCardProps {
  language: Language;
  onOpenWhatsAppSimulator: () => void;
}

export const WhatsAppBotCard: React.FC<WhatsAppBotCardProps> = ({
  language,
  onOpenWhatsAppSimulator,
}) => {
  return (
    <article
      className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
      id="whatsapp-bot"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-14 h-14 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[32px] fill-icon">chat</span>
          </div>
          <span className="bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm px-2.5 py-1 rounded-full font-bold">
            {language === 'ta' ? '24/7 உழவர் பாட்' : '24/7 Uzhavar Bot'}
          </span>
        </div>

        <h3 className="font-headline-lg text-headline-lg font-bold text-on-surface leading-snug">
          {language === 'ta' ? 'வாட்ஸ்அப் சேவை மையம்' : 'WhatsApp Uzhavar Center'}
        </h3>
        <p className="font-label-md text-label-md text-secondary font-bold">
          WhatsApp Kisan Bot (Instant)
        </p>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
          {language === 'ta'
            ? 'ஸ்மார்ட்போனில் வாட்ஸ்அப் செயலி மூலம் டோக்கன் நிலை, விலை மற்றும் அரசு திட்டங்களை நொடியில் அறியலாம்.'
            : 'Access queue tokens, live mandi prices, and crop remedies directly through official WhatsApp bot.'}
        </p>

        {/* WhatsApp Interactive Preview */}
        <div className="mt-4 p-3.5 bg-surface-container-low rounded-xl border border-outline-variant space-y-3">
          <div className="flex items-center gap-3 bg-surface-container-lowest p-2.5 rounded-lg border border-outline-variant">
            {/* QR Code Box representation */}
            <div className="w-14 h-14 bg-on-background text-surface flex flex-col items-center justify-center rounded p-1 shrink-0 text-center">
              <span className="material-symbols-outlined text-[30px] text-white">qr_code_scanner</span>
              <span className="text-[8px] font-mono leading-none text-gray-300">SCAN WA</span>
            </div>
            <div>
              <span className="font-bold text-xs text-on-surface block">
                {language === 'ta' ? 'அரசு வாட்ஸ்அப் எண்:' : 'Govt WhatsApp Number:'}
              </span>
              <span className="font-mono text-sm font-extrabold text-primary block">
                +91 94450 15510
              </span>
              <p className="text-[11px] text-on-surface-variant">
                {language === 'ta' ? "'வணக்கம்' என அனுப்பவும்" : "Send 'Hi' or 'Vanakkam'"}
              </p>
            </div>
          </div>

          {/* Command Quick List */}
          <div className="text-xs space-y-1 bg-surface-container-lowest p-2 rounded border border-outline-variant">
            <span className="font-bold text-on-surface block mb-1">
              {language === 'ta' ? 'உடனடி கட்டளைகள் (Quick Commands):' : 'Quick Chat Commands:'}
            </span>
            <div className="grid grid-cols-2 gap-1 text-[11px] font-medium text-on-surface-variant">
              <span className="flex items-center gap-1">
                <strong>1)</strong> {language === 'ta' ? 'முன்பதிவு (Slot)' : 'Slot (Booking)'}
              </span>
              <span className="flex items-center gap-1">
                <strong>2)</strong> {language === 'ta' ? 'டோக்கன் (Queue)' : 'Token (Queue)'}
              </span>
              <span className="flex items-center gap-1">
                <strong>3)</strong> {language === 'ta' ? 'விலை (Price)' : 'Price (Rates)'}
              </span>
              <span className="flex items-center gap-1">
                <strong>4)</strong> {language === 'ta' ? 'பூச்சி மருந்து (Remedy)' : 'Remedy (Doctor)'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3">
        <button
          type="button"
          onClick={onOpenWhatsAppSimulator}
          className="w-full min-h-[52px] bg-primary text-on-primary rounded-xl font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-xs hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer font-bold"
        >
          <span className="material-symbols-outlined text-[22px]">send</span>
          <span>
            {language === 'ta'
              ? 'வாட்ஸ்அப்பில் தொடங்குக (Chat on WhatsApp)'
              : 'Chat on WhatsApp / Open Bot'}
          </span>
        </button>
      </div>
    </article>
  );
};
