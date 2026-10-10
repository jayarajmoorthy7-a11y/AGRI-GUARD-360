export type Language = 'ta' | 'en';

export interface MandiRate {
  id: string;
  nameTa: string;
  nameEn: string;
  districtTa: string;
  districtEn: string;
  commodityTa: string;
  commodityEn: string;
  pricePerKg: number;
  trend: 'up' | 'down' | 'steady';
  tagTa: string;
  tagEn: string;
  arrivalsTons: number;
  lastUpdated: string;
}

export interface WeatherData {
  regionTa: string;
  regionEn: string;
  titleTa: string;
  titleEn: string;
  descriptionTa: string;
  descriptionEn: string;
  windSpeed: string;
  humidity: string;
  temperature: string;
  rainfallChance: string;
  damLevel: string;
  alertLevel: 'warning' | 'info' | 'critical';
}

export interface CropDisease {
  id: string;
  cropTa: string;
  cropEn: string;
  nameTa: string;
  nameEn: string;
  severityTa: string;
  severityEn: string;
  severityLevel: 'moderate' | 'high' | 'low';
  prescriptionTa: string;
  prescriptionEn: string;
  applicationIntervalTa: string;
  applicationIntervalEn: string;
  organicRemedyTa: string;
  organicRemedyEn: string;
  imageLeaf: string;
}

export interface BookingSlot {
  id: string;
  serviceTa: string;
  serviceEn: string;
  time: string;
  date: string;
  farmerName: string;
  farmerId: string;
  vehicleNo: string;
  gateNo: string;
  cropTa: string;
  cropEn: string;
  estimatedWeight: string;
  qrToken: string;
}

export interface QueueItem {
  tokenNumber: number;
  gate: string;
  farmerName: string;
  commodity: string;
  vehicleNo: string;
  status: 'called' | 'waiting' | 'completed';
  time: string;
}
