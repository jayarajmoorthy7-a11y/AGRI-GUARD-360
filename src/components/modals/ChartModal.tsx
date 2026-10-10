import React, { useState } from 'react';
import { Language } from '../../types';

interface ChartModalProps {
  language: Language;
  cropId: string;
  onClose: () => void;
}

export const ChartModal: React.FC<ChartModalProps> = ({
  language,
  cropId,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'30days' | 'arrivals' | 'factors'>('30days');

  // 30 days mock points
  const points = [
    { day: '1 மே', price: 32 },
    { day: '5 மே', price: 34 },
    { day: '10 மே', price: 35 },
    { day: '15 மே (இன்று)', price: 38 },
    { day: '20 மே (கணிப்பு)', price: 44 },
    { day: '25 மே (கணிப்பு)', price: 48 },
    { day: '30 மே (கணிப்பு)', price: 46 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-primary text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">insights</span>
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md font-bold">
                {language === 'ta'
                  ? '30 நாள் AI சந்தை விலை வரைபடம்'
                  : '30-Day Mandi Price Forecast Chart'}
              </h3>
              <p className="text-xs text-primary-fixed">
                தக்காளி (Tomato) • கோயம்பேடு & மதுரை சந்தை பகுப்பாய்வு
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* Tab Sub-nav */}
        <div className="p-3 bg-surface-container-low border-b border-outline-variant flex gap-2">
          <button
            onClick={() => setActiveTab('30days')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeTab === '30days'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
            }`}
          >
            30 நாள் விலை வரைபடம்
          </button>
          <button
            onClick={() => setActiveTab('arrivals')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'arrivals'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
            }`}
          >
            வரத்து & தேவை நிலை
          </button>
          <button
            onClick={() => setActiveTab('factors')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'factors'
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container'
            }`}
          >
            சந்தை காரணிகள்
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {activeTab === '30days' && (
            <div className="space-y-4">
              {/* Chart Visualizer */}
              <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-on-surface">விலை உயர்வு போக்கு (₹/கிலோ):</span>
                  <span className="text-xs font-bold text-primary bg-primary-fixed px-2 py-0.5 rounded-full">
                    அடுத்த வாரம் +18% உயர்வு
                  </span>
                </div>

                {/* SVG Line / Bar Graphic */}
                <div className="h-44 flex items-end justify-between gap-2 pt-6 pb-2 border-b border-outline-variant">
                  {points.map((pt, idx) => {
                    const heightPercent = ((pt.price - 25) / 30) * 100;
                    const isToday = pt.day.includes('இன்று');
                    const isForecast = pt.day.includes('கணிப்பு');
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                        <span className="text-[10px] font-bold text-on-surface">
                          ₹{pt.price}
                        </span>
                        <div
                          style={{ height: `${Math.max(20, heightPercent)}%` }}
                          className={`w-full rounded-t-md transition-all ${
                            isToday
                              ? 'bg-secondary'
                              : isForecast
                              ? 'bg-primary-container border-t-2 border-dashed border-primary'
                              : 'bg-primary'
                          }`}
                        ></div>
                        <span className="text-[9px] text-on-surface-variant text-center truncate w-full mt-1">
                          {pt.day.split(' ')[0]} {pt.day.split(' ')[1]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Advice Callout */}
              <div className="p-4 bg-surface-container rounded-xl border-l-4 border-l-primary border border-outline-variant">
                <h5 className="font-bold text-sm text-primary mb-1">
                  உழவர் விற்பனை உத்தி (Farmer Strategy):
                </h5>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  ஆந்திரா மற்றும் கர்நாடக சந்தைகளில் இருந்து தக்காளி வரத்து அடுத்த 10 நாட்களுக்கு குறைய வாய்ப்புள்ளது. எனவே உள்ளூர் சந்தைகளில் தேவை அதிகரிக்கும். உங்கள் தக்காளியை குளிர்சாதன கிடங்கில் 4-5 நாட்கள் சேமித்து விற்றால் கூடுதல் லாபம் பெறலாம்.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'arrivals' && (
            <div className="space-y-3 text-xs">
              <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant flex justify-between">
                <span>கோயம்பேடு இன்றைய வரத்து:</span>
                <strong className="text-primary">420 டன் (சராசரியை விட 15% குறைவு)</strong>
              </div>
              <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant flex justify-between">
                <span>மாட்டுத்தாவணி (மதுரை):</span>
                <strong className="text-primary">280 டன் (நிலையான வரத்து)</strong>
              </div>
              <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant flex justify-between">
                <span>திருச்சி காந்தி சந்தை:</span>
                <strong className="text-secondary">390 டன் (விற்பனை விறுவிறுப்பு)</strong>
              </div>
            </div>
          )}

          {activeTab === 'factors' && (
            <div className="space-y-2 text-xs text-on-surface-variant">
              <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant">
                <span className="font-bold text-on-surface block">1. வானிலை தாக்கம்:</span>
                டெல்டா மாவட்டங்களில் மழை எச்சரிக்கை காரணமாக வரத்து தாமதமாகலாம்.
              </div>
              <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant">
                <span className="font-bold text-on-surface block">2. திருவிழா தேவை:</span>
                வைகாசி மாத விசேஷங்கள் காரணமாக காய்கறி தேவை 25% அதிகரித்துள்ளது.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-surface-container border-t border-outline-variant flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-primary text-on-primary font-bold text-xs rounded-lg cursor-pointer hover:opacity-90"
          >
            {language === 'ta' ? 'சரி (Close)' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
