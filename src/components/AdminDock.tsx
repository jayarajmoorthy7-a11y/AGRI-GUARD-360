import React from 'react';
import { Language } from '../types';

interface AdminDockProps {
  language: Language;
  onOpenGateScanner: () => void;
  onOpenAdminLogin: () => void;
}

export const AdminDock: React.FC<AdminDockProps> = ({
  language,
  onOpenGateScanner,
  onOpenAdminLogin,
}) => {
  return (
    <section className="mb-10 bg-surface-container-high rounded-xl p-5 border border-outline-variant flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-tertiary text-on-tertiary flex items-center justify-center shrink-0 shadow-xs">
          <span className="material-symbols-outlined text-[28px]">admin_panel_settings</span>
        </div>
        <div>
          <h4 className="font-headline-md text-headline-md font-bold text-on-surface">
            {language === 'ta'
              ? 'ஒழுங்குமுறை விற்பனைக்கூட நிர்வாகி பிரிவு (Admin QR Portal)'
              : 'Regulated Market Committee Admin Portal'}
          </h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            {language === 'ta'
              ? 'மண்டி கேட் நுழைவு ஸ்கேனர், எடை மேடை டோக்கன் அழைப்பாளர் மற்றும் விலை பட்டியல் புதுப்பிப்பு'
              : 'Gate entry verification scanner, weighbridge token controller & daily price updater'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <button
          type="button"
          onClick={onOpenGateScanner}
          className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-surface-container-lowest border border-outline font-label-md text-label-md font-bold text-on-surface hover:bg-surface-container active:scale-[0.98] flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
          <span>{language === 'ta' ? 'கேட் ஸ்கேனர் (Gate Scanner)' : 'Gate QR Scanner'}</span>
        </button>

        <button
          type="button"
          onClick={onOpenAdminLogin}
          className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-tertiary text-on-tertiary font-label-md text-label-md font-bold hover:bg-tertiary-container active:scale-[0.98] flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">login</span>
          <span>{language === 'ta' ? 'நிர்வாகி உள்நுழைவு' : 'Admin Login'}</span>
        </button>
      </div>
    </section>
  );
};
