import React from 'react';
import { Language, CropDisease } from '../types';

interface CropDoctorCardProps {
  language: Language;
  currentDisease: CropDisease;
  onOpenScanModal: () => void;
}

export const CropDoctorCard: React.FC<CropDoctorCardProps> = ({
  language,
  currentDisease,
  onOpenScanModal,
}) => {
  return (
    <article
      className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
      id="crop-doctor"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-14 h-14 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[32px] fill-icon">psychiatry</span>
          </div>
          <span className="bg-surface-container-high text-on-surface font-label-sm text-label-sm px-2.5 py-1 rounded-full font-bold border border-outline-variant">
            {language === 'ta' ? 'AI கேமரா மருத்துவர்' : 'AI Camera Doctor'}
          </span>
        </div>

        <h3 className="font-headline-lg text-headline-lg font-bold text-on-surface leading-snug">
          {language === 'ta' ? 'பயிர் நோய் & மருத்துவக் கூடம்' : 'Crop Disease & Leaf Clinic'}
        </h3>
        <p className="font-label-md text-label-md text-secondary font-bold">
          Crop Disease QR &amp; Leaf Advisory
        </p>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
          {language === 'ta'
            ? 'தாக்கப்பட்ட இலை அல்லது தண்டை புகைப்படம் எடுத்து உடனடியாக மருத்துவ தீர்வு மற்றும் மருந்து பரிந்துரை பெறுங்கள்.'
            : 'Snap or scan affected leaves/stems for instant disease diagnosis, chemical prescriptions & organic remedies.'}
        </p>

        {/* Leaf Diagnostic Scanner Preview Card */}
        <div className="mt-4 p-3.5 bg-surface-container-low rounded-xl border border-outline-variant space-y-2.5">
          {/* Leaf Scan Result Mockup */}
          <div className="flex items-center gap-3 bg-surface-container-lowest p-2.5 rounded-lg border border-outline-variant">
            <div className="w-12 h-12 rounded bg-surface-dim flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[28px] fill-icon">eco</span>
            </div>
            <div className="text-xs">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-error">
                  {language === 'ta'
                    ? `கண்டறியப்பட்டது: ${currentDisease.nameTa}`
                    : `Detected: ${currentDisease.nameEn}`}
                </span>
              </div>
              <span className="text-on-surface-variant block mt-0.5">
                {language === 'ta'
                  ? `பயிர்: ${currentDisease.cropTa}`
                  : `Crop: ${currentDisease.cropEn}`}
              </span>
              <span className="text-[11px] bg-error-container text-on-error-container px-1.5 py-0.2 rounded font-bold inline-block mt-0.5">
                {language === 'ta' ? currentDisease.severityTa : currentDisease.severityEn}
              </span>
            </div>
          </div>

          {/* Recommendation Box */}
          <div className="bg-surface-container-lowest p-2.5 rounded-lg border border-outline-variant text-xs">
            <span className="font-bold text-primary block">
              {language === 'ta' ? 'பரிந்துரைக்கப்படும் மருந்து (Prescription):' : 'Prescription Remedy:'}
            </span>
            <p className="font-semibold text-on-surface mt-0.5">
              {language === 'ta' ? currentDisease.prescriptionTa : currentDisease.prescriptionEn}
            </p>
            <p className="text-on-surface-variant mt-0.5 text-[11px]">
              {language === 'ta'
                ? currentDisease.applicationIntervalTa
                : currentDisease.applicationIntervalEn}
            </p>
          </div>

          {/* Safety Disclaimer */}
          <p className="text-[11px] text-outline italic">
            {language === 'ta'
              ? '* பூச்சிக்கொல்லி லேபிளை கவனமாக படித்து வேளாண் அலுவலரை ஆலோசிக்கவும்.'
              : '* Read pesticide label carefully and consult agricultural extension officer.'}
          </p>
        </div>
      </div>

      <div className="mt-5 pt-3">
        <button
          type="button"
          onClick={onOpenScanModal}
          className="w-full min-h-[52px] bg-primary-container text-on-primary rounded-xl font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-xs hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer font-bold"
        >
          <span className="material-symbols-outlined text-[22px]">photo_camera</span>
          <span>
            {language === 'ta'
              ? 'இலை படம் எடுத்து ஸ்கேன் செய் (Scan Leaf)'
              : 'Scan Leaf with Camera'}
          </span>
        </button>
      </div>
    </article>
  );
};
