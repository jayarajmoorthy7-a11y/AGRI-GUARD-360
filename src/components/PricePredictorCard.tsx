import React, { useState } from 'react';
import { Language } from '../types';

interface PricePredictorCardProps {
  language: Language;
  onOpenFullChart: (cropId: string) => void;
}

interface CommodityForecast {
  id: string;
  nameTa: string;
  nameEn: string;
  currentPrice: string;
  forecast7d: string;
  adviceTa: string;
  adviceEn: string;
  percentageChange: string;
  isPositive: boolean;
  actionCode: 'WAIT' | 'SELL_NOW' | 'HOLD_PARTIAL';
}

const COMMODITIES: CommodityForecast[] = [
  {
    id: 'tomato',
    nameTa: 'தக்காளி (Tomato)',
    nameEn: 'Tomato',
    currentPrice: '₹38 / கிலோ',
    forecast7d: '₹45 - ₹48 / கிலோ',
    adviceTa: 'காத்திருக்கவும் (WAIT)',
    adviceEn: 'WAIT (Hold Stock)',
    percentageChange: '+18% உயரும் வாய்ப்பு',
    isPositive: true,
    actionCode: 'WAIT',
  },
  {
    id: 'onion',
    nameTa: 'வெங்காயம்',
    nameEn: 'Small Onion',
    currentPrice: '₹65 / கிலோ',
    forecast7d: '₹68 - ₹72 / கிலோ',
    adviceTa: 'படிப்படியாக விற்கவும் (HOLD PARTIAL)',
    adviceEn: 'HOLD PARTIAL (Staggered Sale)',
    percentageChange: '+9% உயரும் வாய்ப்பு',
    isPositive: true,
    actionCode: 'HOLD_PARTIAL',
  },
  {
    id: 'paddy',
    nameTa: 'நெல் (Paddy)',
    nameEn: 'Paddy Grade A',
    currentPrice: '₹24 / கிலோ',
    forecast7d: '₹24.50 / கிலோ',
    adviceTa: 'இப்போதே விற்கவும் (SELL NOW)',
    adviceEn: 'SELL NOW (Steady Govt MSP)',
    percentageChange: 'சீர் நிலை (Stable)',
    isPositive: true,
    actionCode: 'SELL_NOW',
  },
  {
    id: 'banana',
    nameTa: 'வாழை',
    nameEn: 'Banana Nendran',
    currentPrice: '₹46 / கிலோ',
    forecast7d: '₹52 - ₹55 / கிலோ',
    adviceTa: 'காத்திருக்கவும் (WAIT)',
    adviceEn: 'WAIT (Festival Demand)',
    percentageChange: '+15% உயரும் வாய்ப்பு',
    isPositive: true,
    actionCode: 'WAIT',
  },
];

export const PricePredictorCard: React.FC<PricePredictorCardProps> = ({
  language,
  onOpenFullChart,
}) => {
  const [selectedCrop, setSelectedCrop] = useState<string>('tomato');

  const currentCommodity = COMMODITIES.find((c) => c.id === selectedCrop) || COMMODITIES[0];

  return (
    <article
      className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
      id="price-ai"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-14 h-14 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[32px] fill-icon">trending_up</span>
          </div>
          <span className="bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm px-2.5 py-1 rounded-full font-bold">
            {language === 'ta' ? '92% துல்லிய கணிப்பு' : '92% Accuracy Rate'}
          </span>
        </div>

        <h3 className="font-headline-lg text-headline-lg font-bold text-on-surface leading-snug">
          {language === 'ta' ? 'AI விலை கணிப்பு' : 'AI Mandi Price Predictor'}
        </h3>
        <p className="font-label-md text-label-md text-secondary font-bold">
          AI Mandi Price Forecast Engine
        </p>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
          {language === 'ta'
            ? 'அடுத்த 7 மற்றும் 30 நாட்கள் சந்தை விலை போக்கு. எப்போது விற்றால் அதிக லாபம் கிடைக்கும்?'
            : 'Next 7-day & 30-day commodity trends using TN Mandi arrivals data, weather, and interstate trade flow.'}
        </p>

        {/* Commodity Tabs and Recommendation */}
        <div className="mt-4 p-3.5 bg-surface-container-low rounded-xl border border-outline-variant space-y-3">
          {/* Crop Selector Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {COMMODITIES.map((commodity) => (
              <button
                key={commodity.id}
                type="button"
                onClick={() => setSelectedCrop(commodity.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-bold shrink-0 transition-colors cursor-pointer ${
                  selectedCrop === commodity.id
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-container-lowest border border-outline-variant text-on-surface hover:bg-surface-container'
                }`}
              >
                {language === 'ta' ? commodity.nameTa : commodity.nameEn}
              </button>
            ))}
          </div>

          {/* Recommendation Banner */}
          <div className="bg-surface-container-lowest p-3 rounded-lg border-2 border-primary flex items-center justify-between">
            <div>
              <span className="text-xs text-on-surface-variant font-bold block">
                {language === 'ta' ? 'AI பரிந்துரை (Action Advice):' : 'AI Action Advice:'}
              </span>
              <span className="font-headline-md text-headline-md font-extrabold text-primary flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-[20px]">verified</span>
                <span>
                  {language === 'ta' ? currentCommodity.adviceTa : currentCommodity.adviceEn}
                </span>
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-on-surface-variant block">
                {language === 'ta' ? 'அடுத்த வாரம்:' : 'Next 7 Days:'}
              </span>
              <span className="font-bold text-primary font-label-lg text-label-lg">
                {currentCommodity.percentageChange}
              </span>
            </div>
          </div>

          {/* Price Stats Breakdown */}
          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="bg-surface-container-lowest p-2 rounded border border-outline-variant">
              <span className="text-on-surface-variant block">
                {language === 'ta' ? 'இன்றைய விலை' : "Today's Price"}
              </span>
              <span className="font-bold text-on-surface text-sm">
                {currentCommodity.currentPrice}
              </span>
            </div>
            <div className="bg-surface-container-lowest p-2 rounded border border-outline-variant">
              <span className="text-on-surface-variant block">
                {language === 'ta' ? '7 நாள் கணிப்பு' : '7-Day Forecast'}
              </span>
              <span className="font-bold text-primary text-sm">
                {currentCommodity.forecast7d}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3">
        <button
          type="button"
          onClick={() => onOpenFullChart(selectedCrop)}
          className="w-full min-h-[52px] bg-primary text-on-primary rounded-xl font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-xs hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer font-bold"
        >
          <span className="material-symbols-outlined text-[22px]">insights</span>
          <span>
            {language === 'ta'
              ? 'முழு 30 நாள் வரைபடம் (Full Chart)'
              : 'Full 30-Day Trend Chart & Details'}
          </span>
        </button>
      </div>
    </article>
  );
};
