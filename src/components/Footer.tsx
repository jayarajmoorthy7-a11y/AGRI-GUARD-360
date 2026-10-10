import React from 'react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
  onOpenMandiContacts: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onOpenTerms,
  onOpenPrivacy,
  onOpenMandiContacts,
}) => {
  return (
    <footer className="w-full py-8 px-4 lg:px-8 border-t border-outline-variant text-center bg-surface-container mt-10">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Brand & Seal Recap in Footer */}
        <div className="flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-primary text-[24px] fill-icon">
            agriculture
          </span>
          <span className="font-headline-md text-headline-md font-bold text-primary">
            AgriGuard TN | அக்ரிகார்ட் தமிழ்நாடு
          </span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm">
          <button
            type="button"
            onClick={onOpenTerms}
            className="text-on-surface-variant hover:text-primary font-label-sm text-label-sm cursor-pointer"
          >
            {language === 'ta' ? 'விதிமுறைகள் (Terms)' : 'Terms of Use'}
          </button>
          <button
            type="button"
            onClick={onOpenPrivacy}
            className="text-on-surface-variant hover:text-primary font-label-sm text-label-sm cursor-pointer"
          >
            {language === 'ta' ? 'தனியுரிமை கொள்கை (Privacy Policy)' : 'Privacy Policy'}
          </button>
          <a
            href="tel:1551"
            className="text-primary hover:underline font-label-sm text-label-sm font-bold flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">phone_in_talk</span>
            <span>
              {language === 'ta'
                ? 'உழவர் உதவி மையம் (Kisan Call Centre 1551)'
                : 'Kisan Call Centre 1551'}
            </span>
          </a>
          <button
            type="button"
            onClick={onOpenMandiContacts}
            className="text-on-surface-variant hover:text-primary font-label-sm text-label-sm cursor-pointer"
          >
            {language === 'ta' ? 'மண்டி தொடர்பு (Mandi Contacts)' : 'Mandi Officials Directory'}
          </button>
        </div>

        {/* Copyright Notice */}
        <p className="font-body-sm text-body-sm text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
          {language === 'ta'
            ? '© 2025 தமிழ்நாடு அரசு வேளாண்மை மற்றும் உழவர் நலத்துறை. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.'
            : '© 2025 Department of Agriculture and Farmers Welfare, Government of Tamil Nadu. All rights reserved.'}
        </p>
      </div>
    </footer>
  );
};
