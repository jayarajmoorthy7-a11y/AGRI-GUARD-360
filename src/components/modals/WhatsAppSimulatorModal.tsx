import React, { useState } from 'react';
import { Language } from '../../types';

interface WhatsAppSimulatorModalProps {
  language: Language;
  onClose: () => void;
}

interface Message {
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

export const WhatsAppSimulatorModal: React.FC<WhatsAppSimulatorModalProps> = ({
  language,
  onClose,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'வணக்கம்! தமிழ்நாடு அரசு வேளாண்மை & உழவர் நலத்துறை வாட்ஸ்அப் உதவி மையத்திற்கு நல்வரவு. \n\nஉங்களுக்கு தேவையான தகவலைப் பெற எண்ணைத் தேர்ந்தெடுக்கவும்:\n1️⃣ முன்பதிவு (Slot Booking)\n2️⃣ மண்டி டோக்கன் நிலை (Queue Token)\n3️⃣ இன்றைய சந்தை விலை (Mandi Price)\n4️⃣ பயிர் நோய் மருந்து (Leaf Remedy)',
      time: '10:30 AM',
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    const userMsg: Message = {
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');

    // Generate Bot response
    setTimeout(() => {
      let reply = '';
      const lower = text.toLowerCase().trim();

      if (lower === '1' || lower.includes('slot') || lower.includes('முன்பதிவு')) {
        reply = '✅ திருச்சி ஒழுங்குமுறை கூடம்: நெல் எடை முன்பதிவு இன்று 42 இடங்கள் மீதம் உள்ளன. ஒதுக்கப்பட்ட நேரம்: 08:00 AM (மேடை எண் 3). \nநுழைவு பாஸ் குறியீடு: TN-PASS-48192.';
      } else if (lower === '2' || lower.includes('queue') || lower.includes('டோக்கன்')) {
        reply = '🚛 திருச்சி மண்டி நேரலை டோக்கன்:\nதற்போது அழைக்கப்படும் டோக்கன்: #48\nஉங்கள் டோக்கன்: #52 (காத்திருப்பு: ~12 நிமிடங்கள்). மேடை 3 தயார் நிலையில் உள்ளது.';
      } else if (lower === '3' || lower.includes('price') || lower.includes('விலை')) {
        reply = '📊 இன்றைய முக்கிய மண்டி விலைகள்:\n• தக்காளி (Koyambedu): ₹38/கிலோ\n• சின்ன வெங்காயம் (Dindigul): ₹65/கிலோ\n• நெல் கிரேடு ஏ (Trichy): ₹24/கிலோ\n• மஞ்சள் (Erode): ₹145/கிலோ\n\n💡 AI கணிப்பு: தக்காளி அடுத்த வாரம் 18% உயரும் வாய்ப்பு.';
      } else if (lower === '4' || lower.includes('remedy') || lower.includes('மருந்து')) {
        reply = '🌾 நெல் இலை கருகல் நோய்க்கு:\nமருந்து: Azoxystrobin 23% SC (1 மி.லி / லிட்டர்)\nஇயற்கை முறை: 10% மூலிகை பூச்சிவிரட்டி தெளிக்கவும்.\nவேளாண் உதவிக்கு: 1551 அழைக்கவும்.';
      } else {
        reply = 'வணக்கம்! தயவுசெய்து 1, 2, 3 அல்லது 4 என தட்டச்சு செய்து அனுப்பவும்.';
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#efeae2] rounded-2xl border border-outline-variant max-w-md w-full h-[620px] max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* WhatsApp Top Bar (Official Green) */}
        <div className="bg-[#075e54] text-white p-3.5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center border border-white/30 text-white font-bold text-sm">
              <span className="material-symbols-outlined text-2xl">agriculture</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm">AgriGuard TN Bot</h3>
                <span className="material-symbols-outlined text-sm text-emerald-300">verified</span>
              </div>
              <p className="text-[11px] text-emerald-200">+91 94450 15510 (Official)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* Quick Command Suggestions Header */}
        <div className="bg-[#f0f2f5] p-2 flex items-center gap-1.5 overflow-x-auto text-xs border-b border-gray-300">
          <button
            onClick={() => handleSend('1')}
            className="px-2.5 py-1 bg-white rounded-full border border-gray-300 font-semibold text-gray-800 hover:bg-gray-100 shrink-0 cursor-pointer"
          >
            1️⃣ முன்பதிவு
          </button>
          <button
            onClick={() => handleSend('2')}
            className="px-2.5 py-1 bg-white rounded-full border border-gray-300 font-semibold text-gray-800 hover:bg-gray-100 shrink-0 cursor-pointer"
          >
            2️⃣ டோக்கன்
          </button>
          <button
            onClick={() => handleSend('3')}
            className="px-2.5 py-1 bg-white rounded-full border border-gray-300 font-semibold text-gray-800 hover:bg-gray-100 shrink-0 cursor-pointer"
          >
            3️⃣ விலை
          </button>
          <button
            onClick={() => handleSend('4')}
            className="px-2.5 py-1 bg-white rounded-full border border-gray-300 font-semibold text-gray-800 hover:bg-gray-100 shrink-0 cursor-pointer"
          >
            4️⃣ பூச்சி மருந்து
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-lg p-3 text-xs leading-relaxed shadow-xs ${
                  m.sender === 'user'
                    ? 'bg-[#d9fdd3] text-gray-900 rounded-tr-none'
                    : 'bg-white text-gray-900 rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-line">{m.text}</p>
                <span className="text-[9px] text-gray-500 float-right mt-1 block font-mono">
                  {m.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <div className="bg-[#f0f2f5] p-2.5 flex items-center gap-2 border-t border-gray-300">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="செய்தியை தட்டச்சு செய்யவும் (1, 2, 3...)"
            className="flex-1 bg-white rounded-full px-4 py-2 text-xs border border-gray-300 focus:outline-hidden focus:ring-1 focus:ring-[#075e54]"
          />
          <button
            onClick={() => handleSend()}
            className="w-10 h-10 rounded-full bg-[#075e54] text-white flex items-center justify-center shadow-xs hover:opacity-90 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
