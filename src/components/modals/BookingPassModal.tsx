import React from 'react';
import { Language, BookingSlot } from '../../types';

interface BookingPassModalProps {
  language: Language;
  slot: BookingSlot;
  onClose: () => void;
}

export const BookingPassModal: React.FC<BookingPassModalProps> = ({
  language,
  slot,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant max-w-md w-full shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-primary text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[24px]">verified</span>
            <span className="font-bold text-sm">
              {language === 'ta' ? 'முன்பதிவு உறுதி செய்யப்பட்டது' : 'Slot Booking Confirmed'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* Pass Card */}
        <div className="p-6 text-center space-y-4">
          <div className="bg-surface-container-low p-4 rounded-xl border-2 border-dashed border-primary flex flex-col items-center">
            <span className="text-[11px] font-bold text-secondary uppercase tracking-widest">
              {language === 'ta' ? 'ஒழுங்குமுறை விற்பனைக்கூடம் நுழைவு அனுமதி' : 'Regulated Market Gate Entry Pass'}
            </span>
            <h3 className="font-headline-lg text-headline-lg font-extrabold text-primary mt-1">
              {slot.qrToken}
            </h3>

            {/* QR Code graphic */}
            <div className="my-3 p-3 bg-white rounded-lg border border-outline-variant shadow-xs flex flex-col items-center">
              <div className="w-32 h-32 bg-slate-900 flex flex-col items-center justify-center rounded p-2 text-white">
                <span className="material-symbols-outlined text-[80px]">qr_code_2</span>
                <span className="text-[9px] font-mono tracking-widest">{slot.id}</span>
              </div>
              <span className="text-[10px] text-on-surface-variant font-mono mt-1">
                GATE ENTRANCE SCAN CODE
              </span>
            </div>

            {/* Pass Metadata List */}
            <div className="w-full text-left text-xs divide-y divide-outline-variant/40 space-y-2 pt-2">
              <div className="flex justify-between pt-1">
                <span className="text-on-surface-variant">உழவர் பெயர்:</span>
                <span className="font-bold text-on-surface">{slot.farmerName}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-on-surface-variant">சேவை:</span>
                <span className="font-bold text-primary truncate max-w-[200px]">{slot.serviceTa}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-on-surface-variant">ஒதுக்கப்பட்ட நேரம்:</span>
                <span className="font-bold text-on-surface">{slot.time} ({slot.date})</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-on-surface-variant">நுழைவு மேடை:</span>
                <span className="font-bold text-secondary">{slot.gateNo}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-on-surface-variant">வாகன எண்:</span>
                <span className="font-bold text-on-surface font-mono">{slot.vehicleNo}</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-outline italic">
            * மண்டி கேட் நுழைவு வாயிலில் இந்த QR குறியீட்டை காட்டி எடை மேடைக்குள் நுழையவும்.
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 bg-surface-container border-t border-outline-variant flex items-center justify-between">
          <button
            onClick={() => window.print()}
            className="text-xs font-bold text-primary flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">print</span>
            <span>{language === 'ta' ? 'அச்சிடு / சேமி (Print)' : 'Print Pass'}</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-primary text-on-primary font-bold text-xs rounded-lg cursor-pointer hover:opacity-90"
          >
            {language === 'ta' ? 'முடிந்தது (Done)' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};
