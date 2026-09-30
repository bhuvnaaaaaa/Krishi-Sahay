export type IndianLanguage =
  | 'English'
  | 'Hindi'
  | 'Marathi'
  | 'Telugu'
  | 'Tamil'
  | 'Punjabi'
  | 'Kannada'
  | 'Bengali'
  | 'Gujarati';

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  speechLocale: string;
}

export interface StateData {
  name: string;
  districts: string[];
  agroZones: string[];
  majorCrops: string[];
  soilBaseline: {
    n: number;
    p: number;
    k: number;
    ph: number;
    organicCarbon: number;
  };
  satelliteBaseline: {
    ndvi: number;
    ndwi: number;
    soilMoisture: number;
    canopyTemp: number;
  };
}

export interface SatelliteMetrics {
  ndvi: number; // 0.1 to 0.95
  ndwi: number; // -0.2 to 0.8
  soilMoisture: number; // %
  canopyTemp: number; // °C
  tempAnomaly: string; // e.g. +1.2°C
  et0: number; // mm/day
}

export interface SoilHealthCard {
  n: number; // kg/ha
  p: number; // kg/ha
  k: number; // kg/ha
  ph: number; // 4.5 - 9.0
  organicCarbon: number; // %
  ec: number; // dS/m
}

export interface WeatherCondition {
  condition: string;
  rainProb: string;
  tempMax: string;
  tempMin: string;
  humidity: string;
  windSpeed: string;
}

export interface AgroAdvisory {
  summary: string;
  urgencyLevel: 'Normal' | 'Attention' | 'Critical';
  criticalActions48h: string[];
  regenerativePractices: {
    bioFertilizerDosage: string;
    soilRegenerationPlan: string;
    cropRotationRecommendation: string;
  };
  waterSmartIrrigation: {
    schedule: string;
    waterSavedPercentage: string;
    soilMoistureStatus: string;
  };
  pestDiseaseEarlyWarning: {
    riskLevel: 'Low' | 'Medium' | 'High';
    potentialThreats: string[];
    preventiveBiologicalControl: string;
  };
  crossStateCooperationNote: string;
}

export interface CropDiseaseDiagnosis {
  cropIdentified: string;
  diseaseName: string;
  scientificName: string;
  vernacularName: string;
  confidenceScore: number;
  severity: 'Normal' | 'Mild' | 'Moderate' | 'Critical';
  symptomsConfirmed: string[];
  pathogenType: 'Healthy / Vigorous' | 'Fungal' | 'Bacterial' | 'Viral' | 'Pest Infestation' | 'Nutrient Deficiency';
  immediateContainment: string;
  biologicalRegenerativeTreatment: {
    organicRemedy: string;
    applicationMethod: string;
    soilHealthRemedy: string;
  };
  lowToxicityChemicalBackup: string;
  preventionForNextSeason: string;
  crossStateSpreadAlert?: {
    triggerWarning: boolean;
    corridorAffected: string;
    alertMessage: string;
  };
  voiceSummary: string;
  source?: string;
  modelUsed?: string;
  isLiveAi?: boolean;
  inferenceTimestamp?: string;
}

export interface TransboundaryAlert {
  id: string;
  severity: 'Normal' | 'Attention' | 'Critical';
  type: string;
  sourceState: string;
  targetStates: string[];
  timestamp: string;
  advisory: string;
}

export interface SharedAgriModel {
  name: string;
  version: string;
  accuracy: string;
  downloads: number;
}

export interface RegionalCorridor {
  id: string;
  name: string;
  states: string[];
  primaryCrops: string[];
  focusAreas: string[];
  activeAlerts: TransboundaryAlert[];
  sharedModels: SharedAgriModel[];
}
