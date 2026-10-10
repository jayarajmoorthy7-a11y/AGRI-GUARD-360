import React, { useState } from 'react';
import { Language, BookingSlot } from '../types';

interface SlotBookingCardProps {
  language: Language;
  onBookSuccess: (slot: BookingSlot) => void;
}

export const SlotBookingCard: React.FC<SlotBookingCardProps> = ({
  language,
  onBookSuccess,
}) => {
  const [selectedService, setSelectedService] = useState('paddy');
  const [selectedTime, setSelectedTime] = useState('08:00 AM');
  const [vehicleNo, setVehicleNo] = useState('TN 48 B 9812');
  const [availableSlots, setAvailableSlots] = useState(42);

  const services = [
    { id: 'paddy', labelTa: 'நெல் எடை போடுதல் (Paddy Weighment Slot)', labelEn: 'Paddy Weighment Slot (RMC)' },
    { id: 'soil', labelTa: 'மண் ஆரோக்கிய அட்டை (Soil Testing)', labelEn: 'Soil Health Card Testing Lab' },
    { id: 'seed', labelTa: 'மானியம் & விதை கொள்முதல் (Seed Counter)', labelEn: 'Seed Counter & Fertilizer Subsidy' },
    { id: 'cold_storage', labelTa: 'குளிர்சாதன கிடங்கு முன்பதிவு (Cold Storage)', labelEn: 'Cold Storage Commodity Staging' },
  ];

  const timeSlots = ['08:00 AM', '11:30 AM', '02:30 PM'];

  const handleBookSlot = () => {
    const serviceObj = services.find((s) => s.id === selectedService) || services[0];
    const newSlot: BookingSlot = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      serviceTa: serviceObj.labelTa,
      serviceEn: serviceObj.labelEn,
      time: selectedTime,
      date: '15 மே 2025 (இன்று)',
      farmerName: 'ராமையா க.',
      farmerId: 'TN-UZH-2025-48102',
      vehicleNo: vehicleNo || 'TN 48 B 9812',
      gateNo: selectedService === 'paddy' ? 'மேடை 03 (Gate 3)' : 'கவுண்டர் 01 (Counter 1)',
      cropTa: selectedService === 'paddy' ? 'நெல் (CR 1009 Sub 1)' : 'பயிர் மாதிரி',
      cropEn: selectedService === 'paddy' ? 'Paddy (CR 1009 Sub 1)' : 'Sample',
      estimatedWeight: '4.5 டன் (45 மூட்டைகள்)',
      qrToken: `TN-PASS-${Math.floor(10000 + Math.random() * 90000)}`,
    };

    setAvailableSlots((prev) => Math.max(1, prev - 1));
    onBookSuccess(newSlot);
  };

  return (
    <article
      className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
      id="slots"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-14 h-14 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[32px] fill-icon">
              confirmation_number
            </span>
          </div>
          <span className="bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm px-2.5 py-1 rounded-full font-bold">
            {availableSlots} {language === 'ta' ? 'இடங்கள் மீதம்' : 'Slots Left'}
          </span>
        </div>

        <h3 className="font-headline-lg text-headline-lg font-bold text-on-surface leading-snug">
          {language === 'ta' ? 'முன்பதிவு & QR பாஸ்' : 'Slot Booking & QR Pass'}
        </h3>
        <p className="font-label-md text-label-md text-secondary font-bold">
          Slot Booking &amp; QR Gate Pass
        </p>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
          {language === 'ta'
            ? 'மண் பரிசோதனை மையம், ஒழுங்குமுறை விற்பனைக்கூட வரத்து மற்றும் உழவர் மானிய கவுண்டர் நேர ஒதுக்கீடு.'
            : 'Soil testing lab, regulated mandi commodity weighment queue & seed counter reservation.'}
        </p>

        {/* Interactive Slot Booking Simulation Widget */}
        <div className="mt-4 p-3.5 bg-surface-container-low rounded-lg border border-outline-variant space-y-3">
          <div>
            <label className="block font-label-sm text-label-sm font-bold text-on-surface mb-1">
              {language === 'ta' ? 'சேவை தேர்வு (Select Service):' : 'Select Service:'}
            </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-primary focus:outline-hidden"
            >
              {services.map((svc) => (
                <option key={svc.id} value={svc.id}>
                  {language === 'ta' ? svc.labelTa : svc.labelEn}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-label-sm text-label-sm font-bold text-on-surface mb-1">
              {language === 'ta' ? 'நேரம் தேர்வு (Select Time Slot):' : 'Select Time Slot:'}
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`px-2 py-1.5 text-xs font-bold rounded text-center transition-colors ${
                    selectedTime === time
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-container-lowest border border-outline-variant text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle Input */}
          <div>
            <label className="block font-label-sm text-label-sm font-bold text-on-surface mb-1">
              {language === 'ta' ? 'வாகன எண் (Vehicle Number):' : 'Vehicle Number:'}
            </label>
            <input
              type="text"
              value={vehicleNo}
              onChange={(e) => setVehicleNo(e.target.value)}
              placeholder="எ.கா. TN 48 B 9812"
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-lg px-3 py-1.5 text-xs font-semibold focus:ring-2 focus:ring-primary focus:outline-hidden"
            />
          </div>

          {/* Instant QR Preview Badge */}
          <div className="flex items-center gap-3 bg-surface-container-lowest p-2 rounded border border-outline-variant">
            <div className="w-12 h-12 bg-on-surface text-surface flex items-center justify-center rounded font-mono font-bold text-xs p-1 text-center shrink-0">
              <span className="material-symbols-outlined text-[28px] text-white">qr_code_2</span>
            </div>
            <div className="text-xs">
              <span className="font-bold text-primary block">
                {language === 'ta' ? 'QR பாஸ் தயார் (Instant Ready)' : 'Instant QR Gate Pass Ready'}
              </span>
              <span className="text-on-surface-variant">
                {language === 'ta' ? 'நுழைவு வாயிலில் காட்டவும்' : 'Scan at entry gate scanner'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3">
        <button
          type="button"
          onClick={handleBookSlot}
          className="w-full min-h-[52px] bg-primary-container text-on-primary rounded-xl font-label-lg text-label-lg flex items-center justify-center gap-2 shadow-xs hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer font-bold"
        >
          <span className="material-symbols-outlined text-[22px]">how_to_reg</span>
          <span>
            {language === 'ta'
              ? 'இடத்தை முன்பதிவு செய் (Book Slot)'
              : 'Book Slot & Generate Pass'}
          </span>
        </button>
      </div>
    </article>
  );
};
