/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Language, BookingSlot, QueueItem, CropDisease } from './types';
import {
  INITIAL_WEATHER,
  TOP_MANDIS,
  INITIAL_QUEUE,
  CROP_DISEASES,
} from './data/agriData';
import { TopNavBar } from './components/TopNavBar';
import { AudioBanner } from './components/AudioBanner';
import { HeroWeatherMandi } from './components/HeroWeatherMandi';
import { SlotBookingCard } from './components/SlotBookingCard';
import { MandiQueueCard } from './components/MandiQueueCard';
import { VoiceAssistantCard } from './components/VoiceAssistantCard';
import { PricePredictorCard } from './components/PricePredictorCard';
import { CropDoctorCard } from './components/CropDoctorCard';
import { WhatsAppBotCard } from './components/WhatsAppBotCard';
import { AdminDock } from './components/AdminDock';
import { VoiceDock } from './components/VoiceDock';
import { BottomNavBar } from './components/BottomNavBar';
import { Footer } from './components/Footer';

// Modals
import { AllMandisModal } from './components/modals/AllMandisModal';
import { WeatherModal } from './components/modals/WeatherModal';
import { FarmerProfileModal } from './components/modals/FarmerProfileModal';
import { BookingPassModal } from './components/modals/BookingPassModal';
import { TvModeModal } from './components/modals/TvModeModal';
import { ScanLeafModal } from './components/modals/ScanLeafModal';
import { WhatsAppSimulatorModal } from './components/modals/WhatsAppSimulatorModal';
import { AdminScannerModal } from './components/modals/AdminScannerModal';
import { AdminDashboardModal } from './components/modals/AdminDashboardModal';
import { ChartModal } from './components/modals/ChartModal';
import { NotificationsModal } from './components/modals/NotificationsModal';

export default function App() {
  const [language, setLanguage] = useState<Language>('ta');
  const [isAudioBannerOpen, setIsAudioBannerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // App data state
  const [weather] = useState(INITIAL_WEATHER);
  const [mandis, setMandis] = useState(TOP_MANDIS);
  const [queue, setQueue] = useState<QueueItem[]>(INITIAL_QUEUE);
  const [currentDisease, setCurrentDisease] = useState<CropDisease>(CROP_DISEASES[0]);

  // Modal open states
  const [isAllMandisModalOpen, setIsAllMandisModalOpen] = useState(false);
  const [isWeatherModalOpen, setIsWeatherModalOpen] = useState(false);
  const [isFarmerModalOpen, setIsFarmerModalOpen] = useState(false);
  const [confirmedPass, setConfirmedPass] = useState<BookingSlot | null>(null);
  const [isTvModeOpen, setIsTvModeOpen] = useState(false);
  const [isScanLeafModalOpen, setIsScanLeafModalOpen] = useState(false);
  const [isWhatsAppSimulatorOpen, setIsWhatsAppSimulatorOpen] = useState(false);
  const [isAdminScannerOpen, setIsAdminScannerOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [selectedChartCrop, setSelectedChartCrop] = useState<string | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookSuccess = (slot: BookingSlot) => {
    setConfirmedPass(slot);
    showToast(
      language === 'ta'
        ? `முன்பதிவு வெற்றி! டோக்கன்: ${slot.qrToken}`
        : `Booking Confirmed! Token: ${slot.qrToken}`
    );
  };

  const handleSetTokenAlert = () => {
    showToast(
      language === 'ta'
        ? 'டோக்கன் #52 எச்சரிக்கை அமைக்கப்பட்டது. உங்கள் முறை வரும் போது ஒலி எச்சரிக்கை ஒலிக்கும்!'
        : 'Alert set for Token #52. You will be alerted when your turn arrives!'
    );
  };

  const handleCallNextToken = () => {
    setQueue((prevQueue) => {
      const currentIdx = prevQueue.findIndex((q) => q.status === 'called');
      if (currentIdx !== -1 && currentIdx < prevQueue.length - 1) {
        const nextQueue = [...prevQueue];
        nextQueue[currentIdx] = { ...nextQueue[currentIdx], status: 'completed' };
        nextQueue[currentIdx + 1] = {
          ...nextQueue[currentIdx + 1],
          status: 'called',
          gate: 'மேடை எண்: 03 (Weighbridge Gate 3)',
        };
        showToast(
          language === 'ta'
            ? `டோக்கன் #${nextQueue[currentIdx + 1].tokenNumber} அழைக்கப்பட்டது!`
            : `Token #${nextQueue[currentIdx + 1].tokenNumber} called to Gate 3!`
        );
        return nextQueue;
      }
      return prevQueue;
    });
  };

  const handleUpdateMandiPrice = (mandiId: string, newPrice: number) => {
    setMandis((prev) =>
      prev.map((m) =>
        m.id === mandiId
          ? {
              ...m,
              pricePerKg: newPrice,
              lastUpdated: 'இப்போது (Just now)',
            }
          : m
      )
    );
  };

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen selection:bg-primary selection:text-on-primary pb-28 lg:pb-12">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-16 right-4 z-50 bg-secondary text-on-secondary px-4 py-2.5 rounded-xl shadow-lg border border-secondary-container flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[20px]">notifications_active</span>
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* TOP APP BAR */}
      <TopNavBar
        language={language}
        onLanguageChange={setLanguage}
        onToggleAudioBanner={() => setIsAudioBannerOpen(!isAudioBannerOpen)}
        isAudioBannerOpen={isAudioBannerOpen}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Audio Readout Notification Banner (Toggleable) */}
      {isAudioBannerOpen && (
        <AudioBanner
          language={language}
          onClose={() => setIsAudioBannerOpen(false)}
        />
      )}

      {/* MAIN CANVAS */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-5">
        {/* HERO SECTION WITH WEATHER & MANDI GLANCE BENTO */}
        <HeroWeatherMandi
          language={language}
          weather={weather}
          mandis={mandis}
          onOpenWeatherModal={() => setIsWeatherModalOpen(true)}
          onOpenAllMandisModal={() => setIsAllMandisModalOpen(true)}
          onOpenFarmerModal={() => setIsFarmerModalOpen(true)}
        />

        {/* MAIN 6 BIG MODULE CARDS SECTION */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-headline-xl text-headline-xl font-bold text-on-surface">
                {language === 'ta'
                  ? 'முக்கிய சேவைகள் (Core Hub Services)'
                  : 'Core Hub Services'}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {language === 'ta'
                  ? 'ஒரே தொடுதலில் பயிர், முன்பதிவு, டோக்கன் மற்றும் சந்தை வழிகாட்டல்'
                  : 'One-touch access to crop doctor, slot bookings, mandi queue & price forecasting'}
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 bg-surface-container rounded-full border border-outline-variant hidden sm:inline-block">
              டிஜிட்டல் தமிழ்நாடு 2025
            </span>
          </div>

          {/* Bento Grid with 6 High-Contrast Modular Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* CARD 1: முன்பதிவு & QR பாஸ் */}
            <SlotBookingCard
              language={language}
              onBookSuccess={handleBookSuccess}
            />

            {/* CARD 2: நேரடி மண்டி வரிசை */}
            <MandiQueueCard
              language={language}
              queue={queue}
              onOpenTvMode={() => setIsTvModeOpen(true)}
              onSetTokenAlert={handleSetTokenAlert}
            />

            {/* CARD 3: தமிழ் குரல் உதவியாளர் */}
            <VoiceAssistantCard language={language} />

            {/* CARD 4: AI விலை கணிப்பு */}
            <PricePredictorCard
              language={language}
              onOpenFullChart={(cropId) => setSelectedChartCrop(cropId)}
            />

            {/* CARD 5: பயிர் நோய் & மருத்துவக் கூடம் */}
            <CropDoctorCard
              language={language}
              currentDisease={currentDisease}
              onOpenScanModal={() => setIsScanLeafModalOpen(true)}
            />

            {/* CARD 6: வாட்ஸ்அப் சேவை மையம் */}
            <WhatsAppBotCard
              language={language}
              onOpenWhatsAppSimulator={() => setIsWhatsAppSimulatorOpen(true)}
            />
          </div>
        </section>

        {/* ADMIN & EXTENSION WORKER QUICK DOCK */}
        <AdminDock
          language={language}
          onOpenGateScanner={() => setIsAdminScannerOpen(true)}
          onOpenAdminLogin={() => setIsAdminDashboardOpen(true)}
        />
      </main>

      {/* VOICE ASSISTIVE DOCK BAR */}
      <VoiceDock
        language={language}
        onOpenVoiceModal={() => handleNavigate('voice-ai')}
      />

      {/* BOTTOM NAVIGATION BAR */}
      <BottomNavBar
        language={language}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenVoice={() => handleNavigate('voice-ai')}
      />

      {/* FOOTER */}
      <Footer
        language={language}
        onOpenTerms={() =>
          alert(
            'தமிழ்நாடு அரசு உழவர் இணையதள சேவை விதிமுறைகள்: விவசாயிகளுக்கு இலவச சேவை, இடைத்தரகர்கள் இன்றி நேரடி விற்பனை உறுதி செய்யப்படுகிறது.'
          )
        }
        onOpenPrivacy={() =>
          alert(
            'தனியுரிமை கொள்கை: உழவர் ஆதார் மற்றும் நில விவரங்கள் தமிழ்நாடு அரசு இ-சேவை பாதுகாப்பு விதிமுறைகளின்படி பாதுகாக்கப்படுகின்றன.'
          )
        }
        onOpenMandiContacts={() => setIsAllMandisModalOpen(true)}
      />

      {/* MODALS */}
      {isAllMandisModalOpen && (
        <AllMandisModal
          language={language}
          onClose={() => setIsAllMandisModalOpen(false)}
        />
      )}

      {isWeatherModalOpen && (
        <WeatherModal
          language={language}
          weather={weather}
          onClose={() => setIsWeatherModalOpen(false)}
        />
      )}

      {isFarmerModalOpen && (
        <FarmerProfileModal
          language={language}
          onClose={() => setIsFarmerModalOpen(false)}
        />
      )}

      {confirmedPass && (
        <BookingPassModal
          language={language}
          slot={confirmedPass}
          onClose={() => setConfirmedPass(null)}
        />
      )}

      {isTvModeOpen && (
        <TvModeModal
          language={language}
          queue={queue}
          onClose={() => setIsTvModeOpen(false)}
          onCallNext={handleCallNextToken}
        />
      )}

      {isScanLeafModalOpen && (
        <ScanLeafModal
          language={language}
          onSelectDisease={(disease) => {
            setCurrentDisease(disease);
            setIsScanLeafModalOpen(false);
            showToast(
              language === 'ta'
                ? `நோய் கண்டறியப்பட்டது: ${disease.nameTa}`
                : `Disease identified: ${disease.nameEn}`
            );
          }}
          onClose={() => setIsScanLeafModalOpen(false)}
        />
      )}

      {isWhatsAppSimulatorOpen && (
        <WhatsAppSimulatorModal
          language={language}
          onClose={() => setIsWhatsAppSimulatorOpen(false)}
        />
      )}

      {isAdminScannerOpen && (
        <AdminScannerModal
          language={language}
          onClose={() => setIsAdminScannerOpen(false)}
        />
      )}

      {isAdminDashboardOpen && (
        <AdminDashboardModal
          language={language}
          queue={queue}
          mandis={mandis}
          onCallNextToken={handleCallNextToken}
          onUpdateMandiPrice={handleUpdateMandiPrice}
          onClose={() => setIsAdminDashboardOpen(false)}
        />
      )}

      {selectedChartCrop && (
        <ChartModal
          language={language}
          cropId={selectedChartCrop}
          onClose={() => setSelectedChartCrop(null)}
        />
      )}

      {isNotificationsOpen && (
        <NotificationsModal
          language={language}
          onClose={() => setIsNotificationsOpen(false)}
        />
      )}
    </div>
  );
}
