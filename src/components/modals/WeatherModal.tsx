import React from 'react';
import { Language, WeatherData } from '../../types';

interface WeatherModalProps {
  language: Language;
  weather: WeatherData;
  onClose: () => void;
}

export const WeatherModal: React.FC<WeatherModalProps> = ({ language, weather, onClose }) => {
  const forecasts = [
    { dayTa: 'வியாழன் (இன்று)', dayEn: 'Thursday (Today)', rain: '65%', temp: '31°C / 26°C', wind: '18 km/h', cond: 'இடியுடன் மழை' },
    { dayTa: 'வெள்ளி (நாளை)', dayEn: 'Friday (Tomorrow)', rain: '70%', temp: '29°C / 25°C', wind: '22 km/h', cond: 'மிதமான மழை' },
    { dayTa: 'சனி', dayEn: 'Saturday', rain: '45%', temp: '32°C / 26°C', wind: '15 km/h', cond: 'மேகமூட்டம்' },
    { dayTa: 'ஞாயிறு', dayEn: 'Sunday', rain: '20%', temp: '34°C / 27°C', wind: '12 km/h', cond: 'வெயில்' },
    { dayTa: 'திங்கள்', dayEn: 'Monday', rain: '15%', temp: '35°C / 27°C', wind: '10 km/h', cond: 'வெயில்' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-secondary text-on-secondary flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">thunderstorm</span>
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md font-bold">
                {language === 'ta' ? 'வானிலை & பயிர் பாதுகாப்பு அறிக்கை' : 'Regional Agro-Weather Advisory'}
              </h3>
              <p className="text-xs text-secondary-fixed">
                {language === 'ta' ? 'தமிழ்நாடு வேளாண் பல்கலைக்கழகம் (TNAU) வழிகாட்டல்' : 'Issued by IMD Chennai & TNAU'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {/* Main Alert Banner */}
          <div className="p-4 bg-secondary-container/30 border border-secondary rounded-xl">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-secondary text-[22px]">warning</span>
              <h4 className="font-bold text-on-surface">
                {language === 'ta' ? weather.titleTa : weather.titleEn}
              </h4>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed mt-1">
              {language === 'ta' ? weather.descriptionTa : weather.descriptionEn}
            </p>
          </div>

          {/* Dam & Reservoir Status */}
          <div className="p-3.5 bg-surface-container rounded-xl border border-outline-variant flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[22px]">water</span>
            </div>
            <div className="text-xs">
              <span className="font-bold text-primary block">
                {language === 'ta' ? 'அணை நீர்மட்ட நிலவரம்:' : 'Reservoir Inflow & Water Status:'}
              </span>
              <p className="text-on-surface font-semibold mt-0.5">{weather.damLevel}</p>
            </div>
          </div>

          {/* 5-Day Agro Forecast Table */}
          <div>
            <h5 className="font-bold text-sm text-on-surface mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[18px]">calendar_month</span>
              <span>{language === 'ta' ? '5 நாட்கள் டெல்டா வானிலை கணிப்பு' : '5-Day Delta Agro Weather'}</span>
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
              {forecasts.map((f, i) => (
                <div key={i} className="p-2.5 rounded-lg border border-outline-variant bg-surface-container-low text-center text-xs">
                  <span className="font-bold block text-on-surface">
                    {language === 'ta' ? f.dayTa : f.dayEn}
                  </span>
                  <span className="text-secondary font-extrabold text-sm block mt-1">
                    {f.rain} மழை
                  </span>
                  <span className="text-on-surface-variant block text-[11px] mt-0.5">{f.temp}</span>
                  <span className="text-primary font-medium block text-[10px] mt-1">{f.cond}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Farmer Advisory Guidelines */}
          <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant space-y-2">
            <h5 className="font-bold text-xs text-primary uppercase tracking-wider">
              {language === 'ta' ? 'விவசாயிகளுக்கான அவசர குறிப்புகள்:' : 'Urgent Farmer Actions:'}
            </h5>
            <ul className="text-xs text-on-surface-variant space-y-1.5 list-disc pl-4">
              <li>{language === 'ta' ? 'வயலில் தேங்கும் உபரி நீரை உடனடியாக வடிய வைக்கும் வாய்க்கால்களை சுத்தம் செய்யவும்.' : 'Ensure proper drainage channels in paddy fields to clear stagnant rain water.'}</li>
              <li>{language === 'ta' ? 'களம் அல்லது வீடுகளில் உலர்த்தி வைத்துள்ள தானியங்களை தார்ப்பாய் கொண்டு மூடவும்.' : 'Cover harvested open paddy threshing floors with secure tarpaulins.'}</li>
              <li>{language === 'ta' ? 'மழை நேரங்களில் பூச்சிக்கொல்லி தெளிப்பதை தவிர்க்கவும்; மருந்து வீணாகும்.' : 'Postpone all chemical spraying during rainfall to prevent pesticide wash-off.'}</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-surface-container border-t border-outline-variant flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-primary text-on-primary font-bold rounded-lg cursor-pointer hover:opacity-90"
          >
            {language === 'ta' ? 'புரிந்தது (OK)' : 'Understood'}
          </button>
        </div>
      </div>
    </div>
  );
};
