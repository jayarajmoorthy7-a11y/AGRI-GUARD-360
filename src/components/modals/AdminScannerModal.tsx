import React, { useState } from 'react';
import { Language } from '../../types';

interface AdminScannerModalProps {
  language: Language;
  onClose: () => void;
}

export const AdminScannerModal: React.FC<AdminScannerModalProps> = ({
  language,
  onClose,
}) => {
  const [scannedResult, setScannedResult] = useState<{
    token: string;
    farmer: string;
    vehicle: string;
    commodity: string;
    status: string;
  } | null>(null);
  const [isScanning, setIsScanning] = useState(true);

  const simulatePassScan = (tokenNum: string) => {
    setIsScanning(false);
    setScannedResult({
      token: tokenNum,
      farmer: 'ராமையா க. (உழவர் ID: TN-UZH-2025-48102)',
      vehicle: 'TN 48 B 9812 (டிராக்டர் டிரெய்லர்)',
      commodity: 'நெல் (CR 1009 Sub 1) - 45 மூட்டைகள் (4.5 டன்)',
      status: 'அங்கீகரிக்கப்பட்டது (VERIFIED)',
    });
  };

  const resetScan = () => {
    setScannedResult(null);
    setIsScanning(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant max-w-lg w-full shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-tertiary text-on-tertiary flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[24px]">qr_code_scanner</span>
            <div>
              <h3 className="font-bold text-sm">
                {language === 'ta' ? 'மண்டி கேட் நுழைவு ஸ்கேனர்' : 'Mandi Gate Entrance Scanner'}
              </h3>
              <p className="text-[11px] text-tertiary-fixed">
                திருச்சி ஒழுங்குமுறை கூடம் - கேட் 01 (Gate 1)
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

        {/* Scanner Viewfinder */}
        <div className="p-6 space-y-4">
          {isScanning ? (
            <div className="relative bg-black rounded-xl h-60 flex flex-col items-center justify-center text-white overflow-hidden border-2 border-tertiary">
              <span className="material-symbols-outlined text-6xl text-amber-400 animate-pulse">
                document_scanner
              </span>
              <p className="font-bold text-sm mt-3">
                {language === 'ta'
                  ? 'உழவர் QR பாஸை கேமராவின் முன் காட்டவும்'
                  : 'Position Farmer QR Gate Pass inside scanner'}
              </p>
              <div className="absolute inset-x-0 h-0.5 bg-amber-400 shadow-[0_0_8px_#f59e0b] top-1/2 -translate-y-1/2 animate-bounce"></div>

              {/* Quick simulation buttons for testing */}
              <div className="absolute bottom-3 flex gap-2">
                <button
                  onClick={() => simulatePassScan('TN-PASS-8841')}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded shadow-md cursor-pointer"
                >
                  மாதிரி பாஸ் ஸ்கேன் (TN-PASS-8841)
                </button>
              </div>
            </div>
          ) : (
            scannedResult && (
              <div className="space-y-3">
                <div className="p-4 bg-primary-container/10 border-2 border-primary rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-primary text-base">
                      {scannedResult.token}
                    </span>
                    <span className="bg-primary text-on-primary text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                      {scannedResult.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-xs text-on-surface">
                    <p>
                      <strong className="text-on-surface-variant">உழவர்:</strong> {scannedResult.farmer}
                    </p>
                    <p>
                      <strong className="text-on-surface-variant">வாகனம்:</strong> {scannedResult.vehicle}
                    </p>
                    <p>
                      <strong className="text-on-surface-variant">பயிர்:</strong> {scannedResult.commodity}
                    </p>
                    <p className="text-primary font-bold pt-1">
                      ஒதுக்கப்பட்ட எடை மேடை: மேடை எண் 03 (Gate 3)
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      alert('கேட் திறக்கப்பட்டது! வாகனம் எடை மேடை எண் 3க்கு அனுமதிக்கப்பட்டது.');
                      resetScan();
                    }}
                    className="flex-1 py-3 bg-primary text-on-primary font-bold text-xs rounded-xl shadow-xs hover:opacity-90 cursor-pointer"
                  >
                    கேட் திறக்க அனுமதி (Allow Entry)
                  </button>
                  <button
                    onClick={resetScan}
                    className="px-4 py-3 bg-surface-container border border-outline rounded-xl text-xs font-bold text-on-surface hover:bg-surface-container-high cursor-pointer"
                  >
                    மீண்டும் ஸ்கேன்
                  </button>
                </div>
              </div>
            )
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-surface-container border-t border-outline-variant text-right">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-surface-container-lowest border border-outline rounded-lg text-xs font-bold text-on-surface hover:bg-surface-container cursor-pointer"
          >
            {language === 'ta' ? 'மூடுக (Close)' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
