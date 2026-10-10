import React, { useState } from 'react';
import { Language, MandiRate } from '../../types';
import { ALL_48_MANDIS } from '../../data/agriData';

interface AllMandisModalProps {
  language: Language;
  onClose: () => void;
}

export const AllMandisModal: React.FC<AllMandisModalProps> = ({ language, onClose }) => {
  const [search, setSearch] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');

  const districts = ['ALL', 'சென்னை', 'மதுரை', 'திருச்சி', 'திண்டுக்கல்', 'ஈரோடு', 'கோயம்புத்தூர்', 'தஞ்சாவூர்', 'சேலம்', 'கடலூர்', 'விருதுநகர்', 'திருநெல்வேலி'];

  const filteredMandis = ALL_48_MANDIS.filter((mandi) => {
    const matchesSearch =
      mandi.nameTa.toLowerCase().includes(search.toLowerCase()) ||
      mandi.nameEn.toLowerCase().includes(search.toLowerCase()) ||
      mandi.commodityTa.toLowerCase().includes(search.toLowerCase()) ||
      mandi.commodityEn.toLowerCase().includes(search.toLowerCase());

    const matchesDistrict =
      selectedDistrict === 'ALL' || mandi.districtTa === selectedDistrict;

    return matchesSearch && matchesDistrict;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-primary text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">storefront</span>
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md font-bold">
                {language === 'ta'
                  ? 'தமிழ்நாடு 48 ஒழுங்குமுறை விற்பனைக் கூடங்கள்'
                  : 'Tamil Nadu 48 Regulated Market Hubs'}
              </h3>
              <p className="text-xs text-primary-fixed">
                {language === 'ta'
                  ? 'நேரலை சந்தை விலை நிலவரம் & வரத்து விவரங்கள்'
                  : 'Live Mandi Market Rates & Commodity Arrivals'}
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

        {/* Search & Filter Bar */}
        <div className="p-4 bg-surface-container-low border-b border-outline-variant space-y-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[20px]">
                search
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={
                  language === 'ta'
                    ? 'மண்டி பெயர் அல்லது பயிர் தேடவும் (எ.கா: தக்காளி, மஞ்சள்)...'
                    : 'Search mandi name or crop (e.g. Tomato, Turmeric)...'
                }
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant text-sm font-medium focus:ring-2 focus:ring-primary focus:outline-hidden"
              />
            </div>
          </div>

          {/* District Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="font-bold text-on-surface-variant shrink-0 mr-1">
              {language === 'ta' ? 'மாவட்டம்:' : 'District:'}
            </span>
            {districts.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDistrict(d)}
                className={`px-2.5 py-1 rounded-full shrink-0 font-semibold cursor-pointer transition-colors ${
                  selectedDistrict === d
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-lowest border border-outline-variant text-on-surface hover:bg-surface-container'
                }`}
              >
                {d === 'ALL' ? (language === 'ta' ? 'அனைத்தும் (All)' : 'All') : d}
              </button>
            ))}
          </div>
        </div>

        {/* Mandis Table / Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-outline-variant/50 space-y-3">
          {filteredMandis.map((mandi) => (
            <div
              key={mandi.id}
              className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface-container-low/50 p-2 rounded-lg transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined text-[20px]">store</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-on-surface">
                    {language === 'ta' ? mandi.nameTa : mandi.nameEn}
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    {language === 'ta' ? mandi.districtTa : mandi.districtEn} •{' '}
                    <span className="font-semibold text-primary">
                      {language === 'ta' ? mandi.commodityTa : mandi.commodityEn}
                    </span>
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-outline">
                    <span>
                      {language === 'ta' ? 'வரத்து:' : 'Arrivals:'} {mandi.arrivalsTons} டன்
                    </span>
                    <span>•</span>
                    <span>{mandi.lastUpdated}</span>
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between shrink-0">
                <div className="text-right">
                  <span className="font-bold text-lg text-primary block">
                    ₹{mandi.pricePerKg} <span className="text-xs text-on-surface-variant">/ கிலோ</span>
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-bold">
                    {language === 'ta' ? mandi.tagTa : mandi.tagEn}
                  </span>
                </div>
                <a
                  href="tel:1551"
                  className="mt-2 text-xs text-secondary font-bold hover:underline flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">call</span>
                  <span>{language === 'ta' ? 'தொடர்பு கொள்க' : 'Contact RMC'}</span>
                </a>
              </div>
            </div>
          ))}

          {filteredMandis.length === 0 && (
            <div className="py-12 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-4xl mb-2 text-outline">search_off</span>
              <p className="font-bold">{language === 'ta' ? 'மண்டி விவரம் கிடைக்கவில்லை' : 'No Mandi Found'}</p>
              <p className="text-xs mt-1">{language === 'ta' ? 'வேறு தேடல் சொல்லை முயற்சிக்கவும்' : 'Try searching another crop or district'}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-surface-container border-t border-outline-variant flex items-center justify-between text-xs text-on-surface-variant">
          <span>{language === 'ta' ? 'மொத்தம் 48 மண்டிகள் இணைக்கப்பட்டுள்ளன' : 'Total 48 Regulated Markets Linked'}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary text-on-primary font-bold rounded-lg cursor-pointer hover:opacity-90"
          >
            {language === 'ta' ? 'சரி (Close)' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
