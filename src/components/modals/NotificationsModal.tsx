import React from 'react';
import { Language } from '../../types';

interface NotificationsModalProps {
  language: Language;
  onClose: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  language,
  onClose,
}) => {
  const notifications = [
    {
      id: 'n1',
      titleTa: 'வானிலை எச்சரிக்கை: காவேரி டெல்டா',
      titleEn: 'Weather Warning: Cauvery Delta',
      bodyTa: 'அடுத்த 48 மணி நேரத்தில் மிதமான மழை வாய்ப்பு. நெல்லை பாதுகாக்கவும்.',
      time: '15 நிமிடம் முன்பு',
      type: 'warning',
    },
    {
      id: 'n2',
      titleTa: 'டோக்கன் #48 எடை மேடைக்கு அழைக்கப்பட்டது',
      titleEn: 'Token #48 Called to Weighbridge',
      bodyTa: 'மேடை எண் 03 தயார் நிலையில் உள்ளது. உங்கள் டோக்கன் #52 விரைவில் வரும்.',
      time: '5 நிமிடம் முன்பு',
      type: 'queue',
    },
    {
      id: 'n3',
      titleTa: 'யூரியா உரம் புதிய வரத்து',
      titleEn: 'Urea Fertilizer Stock Inflow',
      bodyTa: 'மணிகண்டம் தொடக்க வேளாண்மை கூட்டுறவு வங்கியில் 500 மூட்டைகள் இருப்பு வந்துள்ளது.',
      time: '2 மணி நேரம் முன்பு',
      type: 'info',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant max-w-md w-full shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-primary text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <h3 className="font-bold text-sm">
              {language === 'ta' ? 'அறிவிப்புகள் (Notifications)' : 'Notifications'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* List */}
        <div className="p-4 divide-y divide-outline-variant/60 max-h-96 overflow-y-auto space-y-3">
          {notifications.map((item) => (
            <div key={item.id} className="pt-3 first:pt-0 flex items-start gap-3">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-white ${
                  item.type === 'warning'
                    ? 'bg-secondary'
                    : item.type === 'queue'
                    ? 'bg-primary'
                    : 'bg-primary-container'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {item.type === 'warning'
                    ? 'warning'
                    : item.type === 'queue'
                    ? 'confirmation_number'
                    : 'info'}
                </span>
              </div>
              <div className="flex-1 text-xs">
                <h5 className="font-bold text-on-surface">
                  {language === 'ta' ? item.titleTa : item.titleEn}
                </h5>
                <p className="text-on-surface-variant mt-0.5 leading-snug">
                  {item.bodyTa}
                </p>
                <span className="text-[10px] text-outline mt-1 block font-mono">
                  {item.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-surface-container border-t border-outline-variant text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-primary text-on-primary font-bold text-xs rounded-lg cursor-pointer hover:opacity-90"
          >
            {language === 'ta' ? 'அனைத்தும் படித்தாயிற்று' : 'Mark All Read'}
          </button>
        </div>
      </div>
    </div>
  );
};
