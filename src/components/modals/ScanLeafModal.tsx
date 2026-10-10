import React, { useState } from 'react';
import { Language, CropDisease } from '../../types';
import { CROP_DISEASES } from '../../data/agriData';

interface ScanLeafModalProps {
  language: Language;
  onSelectDisease: (disease: CropDisease) => void;
  onClose: () => void;
}

export const ScanLeafModal: React.FC<ScanLeafModalProps> = ({
  language,
  onSelectDisease,
  onClose,
}) => {
  const [selectedDisease, setSelectedDisease] = useState<CropDisease>(CROP_DISEASES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [customImage, setCustomImage] = useState<string | null>(null);

  const handleSelectSample = (disease: CropDisease) => {
    setSelectedDisease(disease);
    setCustomImage(null);
  };

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      onSelectDisease(selectedDisease);
    }, 1200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setCustomImage(uploadEvent.target.result as string);
          // randomly assign or pick one
          setSelectedDisease(CROP_DISEASES[Math.floor(Math.random() * CROP_DISEASES.length)]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-primary-container text-on-primary flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-surface-container-lowest text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">photo_camera</span>
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md font-bold text-white">
                {language === 'ta' ? 'பயிர் இலை ஸ்கேனர் & மருத்துவக் கூடம்' : 'Crop Disease AI Leaf Scanner'}
              </h3>
              <p className="text-xs text-primary-fixed">
                {language === 'ta' ? 'AI கேமரா மூலம் உடனடி நோய் கண்டறிதல்' : 'Instant Diagnostic & Treatment Prescription'}
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
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {/* Camera Frame Preview */}
          <div className="relative bg-black rounded-2xl h-56 flex flex-col items-center justify-center overflow-hidden border-2 border-primary/50 text-white">
            {customImage ? (
              <img
                src={customImage}
                alt="Uploaded leaf"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <span className="material-symbols-outlined text-5xl text-emerald-400 mb-2">
                  crop_free
                </span>
                <p className="font-bold text-sm">
                  {language === 'ta'
                    ? 'தாக்கப்பட்ட இலையை மையப்பகுதியில் வைக்கவும்'
                    : 'Align affected leaf within target frame'}
                </p>
                <p className="text-xs text-gray-300 mt-1">
                  {language === 'ta'
                    ? 'அல்லது கீழே உள்ள மாதிரி இலைகளைத் தேர்ந்தெடுக்கவும்'
                    : 'Or choose a sample diseased leaf below'}
                </p>
              </div>
            )}

            {isScanning && (
              <div className="absolute inset-0 bg-primary/40 backdrop-blur-xs flex flex-col items-center justify-center">
                <span className="material-symbols-outlined text-5xl text-white animate-spin">
                  autorenew
                </span>
                <span className="font-bold text-sm text-white mt-2">
                  {language === 'ta' ? 'AI ஆய்வு செய்கிறது...' : 'AI Analyzing Leaf Patterns...'}
                </span>
              </div>
            )}
          </div>

          {/* Sample diseased leaves picker */}
          <div>
            <label className="block font-bold text-xs text-on-surface mb-2">
              {language === 'ta' ? 'மாதிரி இலைகள் (Sample Diseased Crops):' : 'Select Sample Case:'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {CROP_DISEASES.map((disease) => (
                <button
                  key={disease.id}
                  type="button"
                  onClick={() => handleSelectSample(disease)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedDisease.id === disease.id && !customImage
                      ? 'border-primary bg-primary-container/10 ring-2 ring-primary'
                      : 'border-outline-variant bg-surface-container-low hover:bg-surface-container'
                  }`}
                >
                  <span className="font-bold text-xs text-primary block truncate">
                    {disease.cropTa}
                  </span>
                  <span className="font-semibold text-xs text-on-surface block mt-0.5 truncate">
                    {disease.nameTa}
                  </span>
                  <span className="text-[10px] text-on-surface-variant block mt-1">
                    {disease.severityTa}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom photo upload */}
          <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <span className="material-symbols-outlined text-primary text-[20px]">add_a_photo</span>
              <span className="font-medium text-on-surface">
                {language === 'ta' ? 'உங்கள் போனில் உள்ள இலை படம் பதிவேற்ற:' : 'Upload Your Crop Photo:'}
              </span>
            </div>
            <label className="px-3 py-1.5 bg-surface-container-lowest border border-outline rounded-lg text-xs font-bold text-primary hover:bg-surface-container cursor-pointer">
              <span>{language === 'ta' ? 'படம் தேர்வு' : 'Choose File'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Diagnostic Result Preview */}
          <div className="p-4 bg-surface-container-low rounded-xl border-l-4 border-l-primary border border-outline-variant space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-error flex items-center gap-1">
                <span className="material-symbols-outlined text-error text-[18px]">verified</span>
                {selectedDisease.nameTa}
              </span>
              <span className="text-xs bg-error-container text-on-error-container px-2 py-0.5 rounded-full font-bold">
                {selectedDisease.severityTa}
              </span>
            </div>

            <div className="text-xs space-y-1 pt-1">
              <span className="font-bold text-primary block">பரிந்துரைக்கப்படும் மருந்து (Prescription):</span>
              <p className="font-semibold text-on-surface">{selectedDisease.prescriptionTa}</p>
              <p className="text-on-surface-variant">{selectedDisease.applicationIntervalTa}</p>
            </div>

            <div className="text-xs space-y-1 pt-1 border-t border-outline-variant/60">
              <span className="font-bold text-secondary block">இயற்கை முறை மாற்று (Organic Remedy):</span>
              <p className="text-on-surface-variant">{selectedDisease.organicRemedyTa}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-surface-container border-t border-outline-variant flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs font-bold text-on-surface-variant hover:text-on-surface cursor-pointer"
          >
            {language === 'ta' ? 'ரத்து (Cancel)' : 'Cancel'}
          </button>
          <button
            onClick={handleSimulateScan}
            disabled={isScanning}
            className="px-6 py-2.5 bg-primary-container text-on-primary font-bold text-sm rounded-xl cursor-pointer hover:opacity-95 shadow-xs"
          >
            {isScanning
              ? (language === 'ta' ? 'ஆய்வு செய்கிறது...' : 'Analyzing...')
              : (language === 'ta' ? 'ஸ்கேன் முடிவை உறுதிசெய்' : 'Confirm Diagnosis')}
          </button>
        </div>
      </div>
    </div>
  );
};
