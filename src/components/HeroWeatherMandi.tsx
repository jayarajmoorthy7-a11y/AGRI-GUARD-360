import React from 'react';
import { Language, WeatherData, MandiRate } from '../types';

interface HeroWeatherMandiProps {
  language: Language;
  weather: WeatherData;
  mandis: MandiRate[];
  onOpenWeatherModal: () => void;
  onOpenAllMandisModal: () => void;
  onOpenFarmerModal: () => void;
}

export const HeroWeatherMandi: React.FC<HeroWeatherMandiProps> = ({
  language,
  weather,
  mandis,
  onOpenWeatherModal,
  onOpenAllMandisModal,
  onOpenFarmerModal,
}) => {
  return (
    <section className="mb-8" id="home">
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant shadow-xs overflow-hidden p-5 sm:p-7">
        {/* Welcome Greeting & Farmer Status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-outline-variant">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">
                <span className="w-2 h-2 rounded-full bg-primary inline-block animate-pulse"></span>
                {language === 'ta' ? 'நேரலை சேவை (Live Portal)' : 'Live Portal'}
              </span>
              <span className="text-on-surface-variant font-label-sm text-label-sm">
                | {language === 'ta' ? 'இன்று: வியாழன், 15 மே 2025' : 'Today: Thursday, 15 May 2025'}
              </span>
            </div>
            
            <h1 className="font-headline-xl text-headline-xl text-on-surface font-extrabold tracking-tight">
              வணக்கம் உழவரே!{' '}
              <span className="text-primary font-headline-lg text-headline-lg font-bold block sm:inline">
                (Welcome Farmer!)
              </span>
            </h1>
            
            <p className="text-on-surface-variant font-body-lg text-body-lg mt-0.5">
              {language === 'ta' ? 'உங்கள் உழவர் சேவை மையம்' : 'Your Uzhavar Unified Command Hub'}{' '}
              <span className="font-body-sm text-body-sm text-outline">
                (Tamil Nadu Digital Uzhavar Unified Command Hub)
              </span>
            </p>
          </div>

          {/* Quick Action: Farmer Identity Card Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenFarmerModal}
              className="bg-surface-container-low hover:bg-surface-container border border-outline-variant rounded-xl p-3 flex items-center gap-3 text-left transition-all active:scale-[0.98] shadow-xs group"
              title="உழவர் அட்டை காண அழுத்தவும் (View Farmer Card)"
            >
              <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[24px]">verified_user</span>
              </div>
              <div>
                <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                  <span>{language === 'ta' ? 'அங்கீகரிக்கப்பட்ட உழவர்' : 'Verified Farmer'}</span>
                  <span className="material-symbols-outlined text-primary text-xs">check_circle</span>
                </p>
                <p className="font-label-lg text-label-lg text-on-surface font-bold group-hover:text-primary transition-colors">
                  {language === 'ta' ? 'ராமையா க. (திருச்சி)' : 'Ramaiya K. (Trichy)'}
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Bento Row: Severe Weather Alert Box + Quick Today Mandi Status Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-5">
          {/* Severe Weather Alert Box (5 Cols) */}
          <div className="lg:col-span-5 bg-surface-container rounded-xl p-4 border-l-4 border-l-secondary border border-outline-variant flex flex-col justify-between">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[24px]">thunderstorm</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-label-sm text-label-sm font-bold text-secondary uppercase tracking-wider">
                    {language === 'ta' ? 'வானிலை எச்சரிக்கை' : 'Weather Alert'}
                  </span>
                  <span className="text-[11px] bg-secondary-container text-on-secondary-container px-1.5 py-0.5 rounded font-bold">
                    {weather.regionTa.includes('டெல்டா') ? 'டெல்டா' : 'Delta'}
                  </span>
                </div>
                <h4 className="font-headline-md text-headline-md text-on-surface font-bold mt-1 leading-snug">
                  {language === 'ta' ? weather.titleTa : weather.titleEn}
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-snug">
                  {language === 'ta' ? weather.descriptionTa : weather.descriptionEn}
                </p>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-outline-variant flex items-center justify-between text-xs font-semibold text-on-surface">
              <span className="flex items-center gap-1 text-primary">
                <span className="material-symbols-outlined text-[16px]">air</span> {weather.windSpeed} காற்று
              </span>
              <span className="flex items-center gap-1 text-secondary">
                <span className="material-symbols-outlined text-[16px]">water_drop</span> ஈரப்பதம் {weather.humidity}
              </span>
              <button
                onClick={onOpenWeatherModal}
                className="text-primary hover:underline font-bold flex items-center gap-0.5"
              >
                {language === 'ta' ? 'முழு அறிக்கை' : 'Full Report'}
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Quick Today Mandi Status Grid (7 Cols) */}
          <div className="lg:col-span-7 bg-surface-container-low rounded-xl p-4 border border-outline-variant flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">storefront</span>
                <span className="font-headline-md text-headline-md font-bold text-on-surface">
                  {language === 'ta' ? 'முக்கிய மண்டிகள் இன்றைய நிலை' : 'Today Mandi Market Rates'}
                </span>
                <span className="text-xs bg-primary-fixed text-on-primary-fixed font-bold px-2 py-0.5 rounded-full">
                  {language === 'ta' ? 'லைவ் (Live Rates)' : 'Live Rates'}
                </span>
              </div>
              <span className="text-xs text-on-surface-variant hidden sm:inline">
                {language === 'ta' ? 'புதுப்பிக்கப்பட்டது: 10 நிமிடம் முன்பு' : 'Updated: 10m ago'}
              </span>
            </div>

            {/* Mandi Cards List */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-2">
              {mandis.map((mandi, idx) => (
                <div
                  key={mandi.id}
                  className={`bg-surface-container-lowest p-2.5 rounded-lg border border-outline-variant text-center shadow-xs transition-transform hover:-translate-y-0.5 ${
                    idx === mandis.length - 1 ? 'col-span-2 sm:col-span-1' : ''
                  }`}
                >
                  <p className="font-label-sm text-label-sm font-bold text-on-surface truncate" title={mandi.nameTa}>
                    {language === 'ta' ? mandi.nameTa : mandi.nameEn}
                  </p>
                  <p className="text-xs text-on-surface-variant truncate">
                    {language === 'ta' ? mandi.districtTa : mandi.districtEn}
                  </p>
                  <div
                    className={`mt-1 font-label-md text-label-md font-bold flex items-center justify-center gap-0.5 ${
                      mandi.trend === 'up'
                        ? 'text-primary'
                        : mandi.trend === 'down'
                        ? 'text-secondary'
                        : 'text-on-surface'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {mandi.trend === 'up' ? 'trending_up' : mandi.trend === 'down' ? 'trending_down' : 'trending_flat'}
                    </span>
                    <span>₹{mandi.pricePerKg}/கிலோ</span>
                  </div>
                  <span
                    className={`text-[10px] font-medium block truncate ${
                      mandi.trend === 'up'
                        ? 'text-primary'
                        : mandi.trend === 'down'
                        ? 'text-secondary'
                        : 'text-on-surface-variant'
                    }`}
                  >
                    {language === 'ta' ? mandi.tagTa : mandi.tagEn}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-2 text-right">
              <button
                onClick={onOpenAllMandisModal}
                className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
              >
                {language === 'ta'
                  ? 'அனைத்து 48 ஒழுங்குமுறை விற்பனைக் கூடங்கள் காண'
                  : 'View All 48 Regulated Market Hubs'}
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
