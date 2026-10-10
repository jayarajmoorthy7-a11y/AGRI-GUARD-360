import React, { useState } from 'react';
import { Language, QueueItem, MandiRate } from '../../types';

interface AdminDashboardModalProps {
  language: Language;
  queue: QueueItem[];
  mandis: MandiRate[];
  onCallNextToken: () => void;
  onUpdateMandiPrice: (mandiId: string, newPrice: number) => void;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  language,
  queue,
  mandis,
  onCallNextToken,
  onUpdateMandiPrice,
  onClose,
}) => {
  const [selectedMandiId, setSelectedMandiId] = useState(mandis[0]?.id || 'm3');
  const [newPrice, setNewPrice] = useState(38);
  const [noticeMessage, setNoticeMessage] = useState('');

  const currentCalled = queue.find((q) => q.status === 'called');

  const handlePriceUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateMandiPrice(selectedMandiId, Number(newPrice));
    setNoticeMessage('விலை வெற்றிகரமாக புதுப்பிக்கப்பட்டது!');
    setTimeout(() => setNoticeMessage(''), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-tertiary text-on-tertiary flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-tertiary-container flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[24px]">admin_panel_settings</span>
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md font-bold">
                {language === 'ta' ? 'மண்டி கண்காணிப்பாளர் கட்டுப்பாட்டுப் பிரிவு' : 'Mandi Superintendent Dashboard'}
              </h3>
              <p className="text-xs text-tertiary-fixed">
                ஒழுங்குமுறை விற்பனைக்கூடம், தமிழ்நாடு அரசு
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

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {noticeMessage && (
            <div className="p-3 bg-primary-container text-on-primary rounded-xl text-xs font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              <span>{noticeMessage}</span>
            </div>
          )}

          {/* Section 1: Live Weighbridge Token Advancement */}
          <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-on-surface">
                  {language === 'ta' ? 'எடை மேடை டோக்கன் அழைப்பாளர்' : 'Weighbridge Token Controller'}
                </h4>
                <p className="text-xs text-on-surface-variant">
                  தற்போது அழைக்கப்படும் டோக்கன்: #{currentCalled ? currentCalled.tokenNumber : 48} ({currentCalled?.farmerName})
                </p>
              </div>

              <button
                type="button"
                onClick={onCallNextToken}
                className="px-4 py-2.5 bg-secondary text-on-secondary font-bold text-xs rounded-xl shadow-xs hover:opacity-90 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">skip_next</span>
                <span>{language === 'ta' ? 'அடுத்த டோக்கனை அழைக்கவும்' : 'Call Next Token'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-mono">
              <div className="p-2 bg-surface-container-lowest rounded border border-outline-variant">
                <span className="text-[10px] text-on-surface-variant block">மேடை 1:</span>
                <span className="font-bold text-primary">#47 (முடிந்தது)</span>
              </div>
              <div className="p-2 bg-surface-container-lowest rounded border border-outline-variant">
                <span className="text-[10px] text-on-surface-variant block">மேடை 2:</span>
                <span className="font-bold text-primary">#46 (முடிந்தது)</span>
              </div>
              <div className="p-2 bg-secondary-container/20 border border-secondary rounded">
                <span className="text-[10px] text-secondary font-bold block">மேடை 3 (இயங்குகிறது):</span>
                <span className="font-bold text-secondary">#{currentCalled?.tokenNumber}</span>
              </div>
              <div className="p-2 bg-surface-container-lowest rounded border border-outline-variant">
                <span className="text-[10px] text-on-surface-variant block">அடுத்தது:</span>
                <span className="font-bold text-on-surface">#{(currentCalled?.tokenNumber || 48) + 1}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Daily Commodity Rate Update */}
          <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant space-y-3">
            <h4 className="font-bold text-sm text-on-surface">
              {language === 'ta' ? 'இன்றைய விலை நிலவரம் புதுப்பிப்பு' : 'Update Today Mandi Prices'}
            </h4>
            <form onSubmit={handlePriceUpdate} className="flex flex-col sm:flex-row gap-3 items-end">
              <div className="flex-1 w-full">
                <label className="block text-xs font-bold text-on-surface mb-1">
                  மண்டி & பயிர் தேர்வு:
                </label>
                <select
                  value={selectedMandiId}
                  onChange={(e) => setSelectedMandiId(e.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-tertiary focus:outline-hidden"
                >
                  {mandis.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.nameTa} - {m.commodityTa} (தற்போது: ₹{m.pricePerKg}/கிலோ)
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full sm:w-36">
                <label className="block text-xs font-bold text-on-surface mb-1">
                  புதிய விலை (₹/கிலோ):
                </label>
                <input
                  type="number"
                  value={newPrice}
                  onChange={(e) => setNewPrice(Number(e.target.value))}
                  min={1}
                  className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-xs font-bold focus:ring-2 focus:ring-tertiary focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2 bg-primary text-on-primary font-bold text-xs rounded-lg shadow-xs hover:opacity-90 cursor-pointer"
              >
                புதுப்பி (Update)
              </button>
            </form>
          </div>

          {/* Section 3: Daily Tonnage Summary */}
          <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant">
            <h4 className="font-bold text-sm text-on-surface mb-2">
              {language === 'ta' ? 'இன்றைய கொள்முதல் கணக்கு' : 'Daily Mandi Procurement Stats'}
            </h4>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-3 bg-surface-container-lowest rounded-lg border border-outline-variant">
                <span className="text-on-surface-variant block">மொத்த வரத்து</span>
                <span className="font-extrabold text-base text-primary">390 டன்</span>
              </div>
              <div className="p-3 bg-surface-container-lowest rounded-lg border border-outline-variant">
                <span className="text-on-surface-variant block">எடை போடப்பட்டவை</span>
                <span className="font-extrabold text-base text-secondary">248 டன்</span>
              </div>
              <div className="p-3 bg-surface-container-lowest rounded-lg border border-outline-variant">
                <span className="text-on-surface-variant block">காத்திருக்கும் லாரிகள்</span>
                <span className="font-extrabold text-base text-on-surface">18 லாரிகள்</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-surface-container border-t border-outline-variant flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-primary text-on-primary font-bold text-xs rounded-lg cursor-pointer hover:opacity-90"
          >
            {language === 'ta' ? 'முடிந்தது (Close)' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
