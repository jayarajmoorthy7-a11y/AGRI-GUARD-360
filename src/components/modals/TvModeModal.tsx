import React, { useState, useEffect } from 'react';
import { Language, QueueItem } from '../../types';

interface TvModeModalProps {
  language: Language;
  queue: QueueItem[];
  onClose: () => void;
  onCallNext: () => void;
}

export const TvModeModal: React.FC<TvModeModalProps> = ({
  language,
  queue,
  onClose,
  onCallNext,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const currentToken = queue.find((q) => q.status === 'called') || queue[0];
  const upcomingQueue = queue.filter((q) => q.status === 'waiting');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const playVoiceChime = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const text = `டோக்கன் எண் ${currentToken.tokenNumber}, ${currentToken.farmerName}, மேடை எண் மூன்றுக்கு வரவும்.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ta-IN';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0f172a] text-white flex flex-col p-4 sm:p-8 select-none">
      {/* Top Banner */}
      <div className="flex items-center justify-between border-b border-slate-700 pb-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-emerald-700 flex items-center justify-center text-white border-2 border-emerald-400">
            <span className="material-symbols-outlined text-3xl">agriculture</span>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-emerald-400">
              திருச்சி ஒழுங்குமுறை விற்பனைக்கூடம் (RMC TRICHY)
            </h1>
            <p className="text-sm text-slate-400">
              நேரடி எடை மேடை டிஜிட்டல் வரிசைப் பலகை (Electronic Weighbridge Broadcast Screen)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right font-mono">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 block">
              {currentTime}
            </span>
            <span className="text-xs text-slate-400">15 மே 2025</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
            title="வெளியேறுக (Exit TV Mode)"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>
      </div>

      {/* Main TV Screen Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 my-6 items-center">
        {/* Left Big Calling Box (7 Cols) */}
        <div className="lg:col-span-7 bg-slate-900 border-4 border-emerald-500 rounded-3xl p-6 sm:p-10 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-4 left-6 flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-sm uppercase font-bold text-emerald-400 tracking-widest">
              தற்போது அழைக்கப்படும் டோக்கன் (NOW CALLING)
            </span>
          </div>

          <div className="my-6">
            <span className="text-8xl sm:text-9xl font-black text-emerald-400 tracking-tighter drop-shadow-md">
              #{currentToken ? currentToken.tokenNumber : 48}
            </span>
          </div>

          <div className="space-y-2 bg-slate-800/80 w-full py-4 px-6 rounded-2xl border border-slate-700">
            <p className="text-2xl sm:text-3xl font-bold text-amber-400">
              {currentToken ? currentToken.gate : 'மேடை எண்: 03 (Weighbridge Gate 3)'}
            </p>
            <p className="text-xl font-semibold text-white">
              உழவர்: {currentToken ? currentToken.farmerName : 'சண்முகம் வே.'} • {currentToken ? currentToken.commodity : 'நெல் 4.2 டன்'}
            </p>
            <p className="text-sm font-mono text-slate-300">
              வாகன எண்: {currentToken ? currentToken.vehicleNo : 'TN 48 B 9812'}
            </p>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={playVoiceChime}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold flex items-center gap-2 shadow-lg active:scale-95 transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl">campaign</span>
              <span>ஒலி அறிவிப்பு (Play Chime)</span>
            </button>
            <button
              onClick={onCallNext}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold flex items-center gap-2 shadow-lg active:scale-95 transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl">skip_next</span>
              <span>அடுத்த டோக்கன் (Call Next)</span>
            </button>
          </div>
        </div>

        {/* Right Upcoming Queue Column (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h2 className="text-lg font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400">format_list_numbered</span>
                <span>அடுத்த டோக்கன்கள் (UPCOMING QUEUE)</span>
              </h2>
              <span className="text-xs text-slate-400 font-mono">12 நிமிடம் காத்திருப்பு</span>
            </div>

            <div className="space-y-3">
              {upcomingQueue.map((item, index) => (
                <div
                  key={item.tokenNumber}
                  className={`p-3.5 rounded-xl border flex items-center justify-between transition-colors ${
                    item.tokenNumber === 52
                      ? 'bg-amber-950/60 border-amber-500 ring-2 ring-amber-400'
                      : 'bg-slate-800/60 border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center font-mono font-extrabold text-lg text-emerald-400">
                      #{item.tokenNumber}
                    </span>
                    <div>
                      <p className="font-bold text-sm text-white">
                        {item.farmerName} {item.tokenNumber === 52 && <span className="text-amber-400 text-xs">(நீங்கள்)</span>}
                      </p>
                      <p className="text-xs text-slate-400">
                        {item.commodity} • {item.vehicleNo}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-300">
                    +{index * 3 + 3} நிமிடம்
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
            ஒழுங்குமுறை விற்பனைக்கூடம், தமிழ்நாடு வேளாண்மை & உழவர் நலத்துறை 2025
          </div>
        </div>
      </div>
    </div>
  );
};
