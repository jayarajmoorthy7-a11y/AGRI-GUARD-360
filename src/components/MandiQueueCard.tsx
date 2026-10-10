import React, { useState } from 'react';
import { Language, QueueItem } from '../types';

interface MandiQueueCardProps {
  language: Language;
  queue: QueueItem[];
  onOpenTvMode: () => void;
  onSetTokenAlert: () => void;
}

export const MandiQueueCard: React.FC<MandiQueueCardProps> = ({
  language,
  queue,
  onOpenTvMode,
  onSetTokenAlert,
}) => {
  const currentToken = queue.find((q) => q.status === 'called') || queue[0];
  const upcomingTokens = queue.filter((q) => q.status === 'waiting').slice(0, 5);

  const [alertEnabled, setAlertEnabled] = useState(false);

  const handleToggleAlert = () => {
    setAlertEnabled(!alertEnabled);
    onSetTokenAlert();
  };

  return (
    <article
      className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
      id="mandi"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-14 h-14 rounded-xl bg-secondary text-on-secondary flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[32px] fill-icon">queue</span>
          </div>
          <span className="inline-flex items-center gap-1.5 bg-error-container text-on-error-container font-label-sm text-label-sm px-2.5 py-1 rounded-full font-bold">
            <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
            {language === 'ta' ? 'நேரலை வரிசை' : 'Live Queue Active'}
          </span>
        </div>

        <h3 className="font-headline-lg text-headline-lg font-bold text-on-surface leading-snug">
          {language === 'ta' ? 'நேரடி மண்டி வரிசை' : 'Live Mandi Queue'}
        </h3>
        <p className="font-label-md text-label-md text-secondary font-bold">
          Live Mandi Queue Dashboard
        </p>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
          {language === 'ta'
            ? 'ஒழுங்குமுறை விற்பனைக்கூடத்தின் நேரடி டோக்கன் அறிவிப்பு & டிஜிட்டல் திரை (Mandi TV Screen).'
            : 'Live digital token broadcast & electronic weighbridge status board for Trichy Regulated Market.'}
        </p>

        {/* Queue Token Live Screen Box */}
        <div className="mt-4 p-4 bg-inverse-surface text-inverse-on-surface rounded-xl shadow-inner space-y-3">
          <div className="flex items-center justify-between border-b border-outline pb-2">
            <span className="text-xs uppercase tracking-wider text-secondary-fixed font-bold">
              {language === 'ta' ? 'திருச்சி ஒழுங்குமுறை கூடம்' : 'Trichy Regulated Market RMC'}
            </span>
            <button
              onClick={onOpenTvMode}
              className="text-xs text-primary-fixed flex items-center gap-1 font-bold hover:underline"
              title="டிவி மோட் திறக்க (Open TV Mode)"
            >
              <span className="material-symbols-outlined text-sm">tv</span>
              <span>TV MODE ON</span>
            </button>
          </div>

          {/* Main Token Display */}
          <div className="text-center py-1">
            <span className="text-xs font-semibold text-surface-variant block">
              {language === 'ta' ? 'தற்போது அழைக்கப்படும் டோக்கன்:' : 'Now Calling Token:'}
            </span>
            <span className="text-4xl font-extrabold text-primary-fixed tracking-wider">
              #{currentToken ? currentToken.tokenNumber : 48}
            </span>
            <p className="text-xs text-surface-variant mt-0.5">
              {currentToken ? currentToken.gate : 'மேடை எண்: 03 (Weighbridge Gate 3)'}
            </p>
          </div>

          {/* Next 5 upcoming tokens */}
          <div className="bg-surface-container-lowest/10 rounded-lg p-2 text-xs">
            <span className="text-surface-dim block mb-1 font-medium">
              {language === 'ta' ? 'அடுத்த 5 டோக்கன்கள் (Upcoming Queue):' : 'Upcoming 5 Tokens:'}
            </span>
            <div className="flex items-center justify-between font-mono font-bold text-sm text-inverse-primary">
              {upcomingTokens.map((item) => (
                <span
                  key={item.tokenNumber}
                  className={`px-2 py-0.5 rounded ${
                    item.tokenNumber === 52 ? 'bg-secondary text-white font-extrabold ring-1 ring-white' : 'bg-surface-container-lowest/20'
                  }`}
                  title={`${item.farmerName} - ${item.commodity}`}
                >
                  #{item.tokenNumber}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-surface-variant pt-1">
            <span>
              {language === 'ta' ? 'தோராய காத்திருப்பு:' : 'Est. Wait Time:'}{' '}
              <strong className="text-white">12 நிமிடங்கள்</strong>
            </span>
            <span className="text-secondary-fixed">
              {language === 'ta' ? 'மொத்த லாரிகள்: 18' : 'Trucks in Queue: 18'}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3 flex gap-2">
        <button
          type="button"
          onClick={handleToggleAlert}
          className={`flex-1 min-h-[52px] rounded-xl font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-xs active:scale-[0.98] transition-all cursor-pointer font-bold ${
            alertEnabled
              ? 'bg-primary text-on-primary'
              : 'bg-secondary text-on-secondary hover:opacity-95'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">
            {alertEnabled ? 'check_circle' : 'notifications_active'}
          </span>
          <span>
            {alertEnabled
              ? (language === 'ta' ? 'டோக்கன் #52 கண்காணிக்கப்படுகிறது' : 'Monitoring Token #52')
              : (language === 'ta' ? 'என் டோக்கன் எச்சரிக்கை' : 'Alert for My Token')}
          </span>
        </button>

        <button
          type="button"
          onClick={onOpenTvMode}
          className="px-3 min-h-[52px] border border-outline rounded-xl bg-surface-container-lowest hover:bg-surface-container text-on-surface flex items-center justify-center active:scale-[0.98] transition-colors cursor-pointer"
          title="முழுத்திரை மண்டி டிஸ்ப்ளே (Full Mandi Display Screen)"
        >
          <span className="material-symbols-outlined text-[22px]">fullscreen</span>
        </button>
      </div>
    </article>
  );
};
