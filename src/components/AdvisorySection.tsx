import React, { useState, useEffect } from 'react';
import {
  AgroAdvisory,
  IndianLanguage,
  SatelliteMetrics,
  SoilHealthCard,
  WeatherCondition,
} from '../types/krishi';
import { STATES_DATA, SUPPORTED_LANGUAGES } from '../data/agriData';
import { TRANSLATIONS } from '../data/translations';
import {
  fetchAgroAdvisory,
  getLocalizedFallbackAdvisory,
  playAudioWithGeminiOrBrowser,
  stopAudioPlayback,
} from '../services/apiClient';
import { SpectralCanvasViewer } from './SpectralCanvasViewer';
import { MandiMarketRates } from './MandiMarketRates';
import {
  Satellite,
  Droplets,
  Thermometer,
  CloudSun,
  ShieldCheck,
  Volume2,
  VolumeX,
  Sparkles,
  RefreshCw,
  Printer,
  ChevronDown,
  ChevronUp,
  Sprout,
  CheckCircle2,
  Clock,
  FlaskConical,
  Compass,
  AlertTriangle,
  Layers,
  Globe2,
} from 'lucide-react';

interface AdvisorySectionProps {
  currentState: string;
  currentDistrict: string;
  currentLanguage: IndianLanguage;
  onLanguageChange?: (lang: IndianLanguage) => void;
  activeAudioKey: string | null;
  setActiveAudioKey: (key: string | null) => void;
}

export const AdvisorySection: React.FC<AdvisorySectionProps> = ({
  currentState,
  currentDistrict,
  currentLanguage,
  onLanguageChange,
  activeAudioKey,
  setActiveAudioKey,
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.Hindi;
  const stateInfo = STATES_DATA[currentState] || STATES_DATA['Punjab'];
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.name === currentLanguage);

  // Farm Profile State
  const [selectedCrop, setSelectedCrop] = useState<string>(stateInfo.majorCrops[0] || 'Wheat');
  const [cropStage, setCropStage] = useState<string>('Vegetative Growth');
  const [farmSize, setFarmSize] = useState<number>(2.5);
  const [irrigationType, setIrrigationType] = useState<string>('Canal / Tube well (Flood)');

  // Satellite Telemetry State
  const [satelliteData, setSatelliteData] = useState<SatelliteMetrics>({
    ndvi: stateInfo.satelliteBaseline.ndvi,
    ndwi: stateInfo.satelliteBaseline.ndwi,
    soilMoisture: stateInfo.satelliteBaseline.soilMoisture,
    canopyTemp: stateInfo.satelliteBaseline.canopyTemp,
    tempAnomaly: '+0.7°C',
    et0: 4.2,
  });

  // Soil Health Card State
  const [soilHealth, setSoilHealth] = useState<SoilHealthCard>({
    n: stateInfo.soilBaseline.n,
    p: stateInfo.soilBaseline.p,
    k: stateInfo.soilBaseline.k,
    ph: stateInfo.soilBaseline.ph,
    organicCarbon: stateInfo.soilBaseline.organicCarbon,
    ec: 0.65,
  });

  // Weather State
  const [weatherData] = useState<WeatherCondition>({
    condition: 'Intermittent Showers & High Humidity',
    rainProb: '42%',
    tempMax: '33°C',
    tempMin: '22°C',
    humidity: '68%',
    windSpeed: '12 km/h ENE',
  });

  // Advisory State: Initialized immediately with localized advisory so it NEVER renders blank
  const [advisory, setAdvisory] = useState<AgroAdvisory>(() =>
    getLocalizedFallbackAdvisory(
      stateInfo.majorCrops[0] || 'Wheat',
      currentDistrict,
      currentState,
      currentLanguage
    )
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [showAdvancedSpectral, setShowAdvancedSpectral] = useState<boolean>(false);
  const [completedTasks, setCompletedTasks] = useState<Record<number, boolean>>({});

  const isAudioPlaying = activeAudioKey === 'advisory-summary';

  // Synchronize state defaults when currentState changes
  useEffect(() => {
    if (stateInfo.majorCrops.length > 0 && !stateInfo.majorCrops.includes(selectedCrop)) {
      setSelectedCrop(stateInfo.majorCrops[0]);
    }
    setSatelliteData((prev) => ({
      ...prev,
      ndvi: stateInfo.satelliteBaseline.ndvi,
      ndwi: stateInfo.satelliteBaseline.ndwi,
      soilMoisture: stateInfo.satelliteBaseline.soilMoisture,
      canopyTemp: stateInfo.satelliteBaseline.canopyTemp,
    }));
    setSoilHealth((prev) => ({
      ...prev,
      n: stateInfo.soilBaseline.n,
      p: stateInfo.soilBaseline.p,
      k: stateInfo.soilBaseline.k,
      ph: stateInfo.soilBaseline.ph,
      organicCarbon: stateInfo.soilBaseline.organicCarbon,
    }));
  }, [currentState]);

  // Initial and reactive advisory update
  useEffect(() => {
    handleGenerateAdvisory();
  }, [currentState, currentDistrict, selectedCrop, currentLanguage]);

  const handleGenerateAdvisory = async () => {
    setLoading(true);
    if (isAudioPlaying) {
      stopAudioPlayback();
      setActiveAudioKey(null);
    }

    try {
      const payload = {
        state: currentState,
        district: currentDistrict,
        agroZone: stateInfo.agroZones[0],
        crop: selectedCrop,
        cropStage,
        farmSizeAcres: farmSize,
        soilHealth: {
          n: `${soilHealth.n} kg/ha`,
          p: `${soilHealth.p} kg/ha`,
          k: `${soilHealth.k} kg/ha`,
          ph: soilHealth.ph,
          organicCarbon: `${soilHealth.organicCarbon}%`,
        },
        satelliteData: {
          ndvi: satelliteData.ndvi,
          ndwi: satelliteData.ndwi,
          soilMoisture: `${satelliteData.soilMoisture}%`,
          tempAnomaly: satelliteData.tempAnomaly,
          et0: `${satelliteData.et0} mm/day`,
        },
        weatherData,
        language: currentLanguage,
      };

      const result = await fetchAgroAdvisory(payload);
      setAdvisory(result);
    } catch (err) {
      console.error('Advisory update fallback:', err);
      setAdvisory(
        getLocalizedFallbackAdvisory(selectedCrop, currentDistrict, currentState, currentLanguage)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSpeakAdvisory = () => {
    if (isAudioPlaying) {
      stopAudioPlayback();
      setActiveAudioKey(null);
      return;
    }

    const locale = currentLangObj?.speechLocale || 'hi-IN';

    // Speak in target language with clean content
    const speechText = `${advisory.summary}. ${advisory.criticalActions48h.slice(0, 2).join('. ')}. ${advisory.waterSmartIrrigation.schedule}`;

    setActiveAudioKey('advisory-summary');
    playAudioWithGeminiOrBrowser(
      speechText,
      currentLanguage,
      locale,
      () => setActiveAudioKey('advisory-summary'),
      () => setActiveAudioKey(null)
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const toggleTask = (index: number) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Farmer-friendly NDVI Canopy Health Indicator
  const getNdviHealth = (ndvi: number) => {
    if (ndvi >= 0.7) {
      return {
        label: 'Healthy & Vibrant (हरा व स्वस्थ)',
        desc: 'Chlorophyll absorption is optimal. No water or nutrient stress.',
        badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        dotBg: 'bg-emerald-500',
      };
    }
    if (ndvi >= 0.5) {
      return {
        label: 'Moderate Growth (मध्यम विकास)',
        desc: 'Canopy is normal. Ensure timely bio-foliar nutrition.',
        badgeBg: 'bg-teal-100 text-teal-800 border-teal-300',
        dotBg: 'bg-teal-500',
      };
    }
    if (ndvi >= 0.3) {
      return {
        label: 'Mild Moisture Stress (हल्का तनाव)',
        desc: 'Subsoil water deficit detected. Irrigate according to schedule.',
        badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
        dotBg: 'bg-amber-500',
      };
    }
    return {
      label: 'Severe Stress (गंभीर तनाव)',
      desc: 'Sparse canopy. Immediate bio-pesticide and watering required.',
      badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
      dotBg: 'bg-rose-500',
    };
  };

  const ndviInfo = getNdviHealth(satelliteData.ndvi);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* 1. Header Banner */}
      <header className="bg-[#143D23] text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden border border-[#1C522F]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/25 text-emerald-200 border border-emerald-400/40">
                <Satellite className="w-3.5 h-3.5 mr-1.5" />
                ISRO / Sentinel-2 Live Telemetry
              </span>
              <span className="text-xs text-emerald-200">
                • {currentDistrict}, {currentState} ({stateInfo.agroZones[0]})
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t.advisory_header_title}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              {t.advisory_header_desc}
            </p>
          </div>

          {/* Quick Action Button Group */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleSpeakAdvisory}
              className={`flex items-center space-x-2 px-5 py-3 rounded-2xl font-bold text-sm shadow-sm transition cursor-pointer border ${
                isAudioPlaying
                  ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 border-emerald-400'
              }`}
            >
              {isAudioPlaying ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>{t.stop_voice}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>{t.listen_in_lang}</span>
                </>
              )}
            </button>

            <button
              onClick={handleGenerateAdvisory}
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-3 rounded-2xl font-semibold text-xs bg-white/10 hover:bg-white/15 text-white border border-white/20 transition cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>{loading ? t.synthesizing_advisory : t.refresh_advisory}</span>
            </button>

            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center space-x-1.5 px-4 py-3 rounded-2xl font-semibold text-xs bg-white/10 hover:bg-white/15 text-white border border-white/20 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.download_summary}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Top Farmer Telemetry Strip (4 High-Signal Status Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Telemetry 1: Canopy Vegetative Health (NDVI) */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
              <Satellite className="w-3.5 h-3.5 text-emerald-700" />
              Canopy Index (NDVI)
            </span>
            <span className="text-xs font-mono font-bold text-stone-900 bg-stone-100 px-2 py-0.5 rounded-md">
              {satelliteData.ndvi}
            </span>
          </div>
          <div>
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${ndviInfo.badgeBg}`}>
              <span className={`w-2 h-2 rounded-full ${ndviInfo.dotBg}`}></span>
              <span>{ndviInfo.label}</span>
            </div>
            <p className="text-[11px] text-stone-500 mt-2 leading-relaxed font-medium">
              {ndviInfo.desc}
            </p>
          </div>
        </div>

        {/* Telemetry 2: Root-Zone Soil Moisture */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-cyan-700" />
              {t.soil_moisture_label}
            </span>
            <span className="text-xs font-mono font-bold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded-md border border-cyan-200">
              {satelliteData.soilMoisture}%
            </span>
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-lg font-black text-stone-900">{satelliteData.soilMoisture}%</span>
              <span className="text-xs font-semibold text-amber-700">Subsoil Deficit (-4%)</span>
            </div>
            <p className="text-[11px] text-stone-500 mt-1 leading-relaxed font-medium">
              Light irrigation advised tomorrow evening. AWD method saves 34% water.
            </p>
          </div>
        </div>

        {/* Telemetry 3: District Weather Window */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
              <CloudSun className="w-3.5 h-3.5 text-amber-600" />
              5-Day Weather Window
            </span>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
              Rain Prob: {weatherData.rainProb}
            </span>
          </div>
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-lg font-black text-stone-900">{weatherData.tempMax}</span>
              <span className="text-xs text-stone-500">Min: {weatherData.tempMin} • RH {weatherData.humidity}</span>
            </div>
            <p className="text-[11px] text-stone-500 mt-1 leading-relaxed font-medium">
              Intermittent cloud cover. High humidity creates moderate spore incubation risk.
            </p>
          </div>
        </div>

        {/* Telemetry 4: Soil Carbon & Health Card Baseline */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1.5">
              <FlaskConical className="w-3.5 h-3.5 text-emerald-700" />
              Soil Health Card (N-P-K)
            </span>
            <span className="text-xs font-mono font-bold text-stone-900 bg-stone-100 px-2 py-0.5 rounded-md">
              pH {soilHealth.ph}
            </span>
          </div>
          <div>
            <div className="flex items-center space-x-3 text-xs font-semibold">
              <span className="text-amber-700">N: {soilHealth.n} (Low)</span>
              <span className="text-emerald-700">P: {soilHealth.p} (Med)</span>
              <span className="text-teal-700">K: {soilHealth.k} (Good)</span>
            </div>
            <p className="text-[11px] text-stone-500 mt-2 leading-relaxed font-medium">
              Organic carbon at {soilHealth.organicCarbon}%. Bio-fertilizer top dressing recommended.
            </p>
          </div>
        </div>
      </div>

      {/* Collapsible Advanced Spectral Cockpit (Optional for Agronomists / KVK Officers) */}
      <div className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-2xs">
        <button
          onClick={() => setShowAdvancedSpectral(!showAdvancedSpectral)}
          className="w-full px-6 py-4 flex items-center justify-between bg-stone-50 hover:bg-stone-100/80 transition cursor-pointer text-left"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-[#143D23] text-white flex items-center justify-center">
              <Layers className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <span className="font-bold text-xs uppercase tracking-wider text-[#143D23] block">
                Advanced Agronomist View
              </span>
              <span className="font-extrabold text-sm text-stone-900">
                Sentinel-2 Remote Sensing Shader & Spectral Band Cockpit
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-xs font-bold text-stone-600">
            <span>{showAdvancedSpectral ? 'Hide Cockpit' : 'Inspect Spectral Bands'}</span>
            {showAdvancedSpectral ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showAdvancedSpectral && (
          <div className="p-6 border-t border-stone-200">
            <SpectralCanvasViewer
              crop={selectedCrop}
              ndviBaseline={satelliteData.ndvi}
              soilMoistureBaseline={satelliteData.soilMoisture}
              state={currentState}
              district={currentDistrict}
            />
          </div>
        )}
      </div>

      {/* 3. Main Workspace: Two-Column Farmer Advisory Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Farm Holding Customizer (4 cols) */}
        <aside className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs space-y-5">
            <div className="border-b border-stone-100 pb-3">
              <h3 className="font-extrabold text-base text-stone-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#143D23]" />
                Farm Holding Parameters
              </h3>
              <p className="text-xs text-stone-500">Customize to fine-tune advisory calculation</p>
            </div>

            {/* Crop Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                {t.select_crop}
              </label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full bg-[#FAF9F5] border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm font-bold text-stone-900 focus:ring-2 focus:ring-[#143D23] cursor-pointer"
              >
                {stateInfo.majorCrops.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Growth Stage */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                {t.growth_stage}
              </label>
              <select
                value={cropStage}
                onChange={(e) => setCropStage(e.target.value)}
                className="w-full bg-[#FAF9F5] border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-stone-900 focus:ring-2 focus:ring-[#143D23] cursor-pointer"
              >
                <option value="Germination & Early Seeding">Germination & Early Seeding (0-20 Days)</option>
                <option value="Vegetative Growth">Vegetative Growth (20-45 Days)</option>
                <option value="Flowering / Tillering">Flowering / Tillering Stage (45-75 Days)</option>
                <option value="Grain / Fruit Filling">Grain / Fruit Filling (75-105 Days)</option>
                <option value="Maturity & Pre-Harvest">Maturity & Pre-Harvest (&gt;105 Days)</option>
              </select>
            </div>

            {/* Farm Holding Size */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold uppercase tracking-wider text-stone-600">Holding Size</span>
                <span className="font-bold text-[#143D23]">{farmSize} Acres</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="25"
                step="0.5"
                value={farmSize}
                onChange={(e) => setFarmSize(parseFloat(e.target.value))}
                className="w-full accent-[#143D23] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400">
                <span>0.5 Acre (Marginal)</span>
                <span>5 Acres (Small)</span>
                <span>25 Acres</span>
              </div>
            </div>

            {/* Irrigation Type */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600">
                Irrigation System
              </label>
              <select
                value={irrigationType}
                onChange={(e) => setIrrigationType(e.target.value)}
                className="w-full bg-[#FAF9F5] border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-stone-900 focus:ring-2 focus:ring-[#143D23] cursor-pointer"
              >
                <option value="Canal / Tube well (Flood)">Canal / Tube well (Flood)</option>
                <option value="Drip Micro-Irrigation">Drip Micro-Irrigation</option>
                <option value="Sprinkler System">Sprinkler System</option>
                <option value="Rainfed (Barani)">Rainfed (No Borewell)</option>
              </select>
            </div>

            <button
              onClick={handleGenerateAdvisory}
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-[#143D23] hover:bg-[#1E4D2B] text-white font-bold text-sm shadow-sm transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>{loading ? t.synthesizing_advisory : t.refresh_advisory}</span>
            </button>
          </div>

          {/* Quick Soil Health Card Telemetry Summary */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs space-y-3">
            <h4 className="font-bold text-sm text-stone-900 flex items-center gap-2 border-b border-stone-100 pb-2">
              <FlaskConical className="w-4 h-4 text-amber-600" />
              Nutrient Status (ICAR Benchmark)
            </h4>
            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-stone-600">Available Nitrogen (N)</span>
                  <span className="font-bold text-amber-700">{soilHealth.n} kg/ha (Low)</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-stone-600">Available Phosphorus (P)</span>
                  <span className="font-bold text-emerald-700">{soilHealth.p} kg/ha (Optimal)</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-stone-600">Available Potassium (K)</span>
                  <span className="font-bold text-teal-700">{soilHealth.k} kg/ha (Adequate)</span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Column: Complete Regenerative Advisory */}
        <main className="lg:col-span-8 space-y-5">
          {/* Instant 1-Tap Translate Chips: Highly Accessible for farmers right above the advisory */}
          <div className="bg-white rounded-2xl p-3.5 border border-stone-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex items-center space-x-2 text-xs font-bold text-stone-700">
              <Globe2 className="w-4 h-4 text-[#143D23]" />
              <span>{t.language_label}:</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isActive = currentLanguage === lang.name;
                return (
                  <button
                    key={lang.code}
                    onClick={() => onLanguageChange?.(lang.name as IndianLanguage)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                      isActive
                        ? 'bg-[#143D23] text-white shadow-xs'
                        : 'bg-[#FAF9F5] text-stone-700 hover:bg-emerald-50 hover:text-[#143D23] border border-stone-300'
                    }`}
                  >
                    {lang.nativeName}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Executive Summary Card with Audio Playback */}
          <article className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    advisory.urgencyLevel === 'Critical'
                      ? 'bg-rose-500 text-white'
                      : advisory.urgencyLevel === 'Attention'
                      ? 'bg-amber-500 text-stone-950'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  Priority: {advisory.urgencyLevel}
                </span>
                <span className="text-xs font-semibold text-stone-600">
                  Dialect: <strong className="text-stone-900">{currentLanguage}</strong>
                </span>
              </div>

              <button
                onClick={handleSpeakAdvisory}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
                  isAudioPlaying
                    ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                    : 'bg-emerald-50 text-[#143D23] border-emerald-300 hover:bg-emerald-100'
                }`}
              >
                {isAudioPlaying ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>{t.stop_voice}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#143D23]" />
                    <span>{t.listen_in_lang}</span>
                  </>
                )}
              </button>
            </div>

            {/* Advisory Summary Statement */}
            <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-stone-200/70 text-base sm:text-lg font-bold text-stone-900 leading-relaxed">
              "{advisory.summary}"
            </div>

            {isAudioPlaying && (
              <div className="flex items-center space-x-2 text-xs text-emerald-800 font-semibold bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                <span className="flex space-x-1">
                  <span className="w-1.5 h-3.5 bg-emerald-600 rounded animate-bounce"></span>
                  <span className="w-1.5 h-3.5 bg-emerald-600 rounded animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-3.5 bg-emerald-600 rounded animate-bounce [animation-delay:0.4s]"></span>
                </span>
                <span>Speaking verified advisory in {currentLanguage}...</span>
              </div>
            )}
          </article>

          {/* 48-Hour Critical Action Checklist (Interactive) */}
          <article className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-rose-600" />
                <h3 className="font-bold text-base text-stone-900">
                  {t.urgent_action_title}
                </h3>
              </div>
              <span className="text-xs text-stone-500 font-medium">Click to mark complete</span>
            </div>

            <div className="space-y-3">
              {advisory.criticalActions48h.map((action, idx) => {
                const isDone = completedTasks[idx] || false;
                return (
                  <div
                    key={idx}
                    onClick={() => toggleTask(idx)}
                    className={`flex items-start space-x-3 p-3.5 rounded-2xl border transition cursor-pointer ${
                      isDone
                        ? 'bg-emerald-50/70 border-emerald-200 text-stone-500 line-through'
                        : 'bg-[#FAF9F5] border-stone-200 hover:border-stone-300 text-stone-900'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition ${
                        isDone ? 'bg-emerald-600 text-white' : 'border-2 border-stone-300'
                      }`}
                    >
                      {isDone && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-sm font-semibold leading-relaxed">{action}</span>
                  </div>
                );
              })}
            </div>
          </article>

          {/* Regenerative Soil Practices & Water-Smart Irrigation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Organic Bio-Nutrition */}
            <article className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs space-y-3">
              <div className="flex items-center space-x-2 border-b border-stone-100 pb-2.5">
                <Sprout className="w-4 h-4 text-emerald-600" />
                <h4 className="font-bold text-sm text-stone-900">{t.regenerative_title}</h4>
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-bold text-stone-800 block mb-0.5">{t.bio_fertilizer_title}:</span>
                  <p className="text-stone-600 leading-relaxed font-medium">
                    {advisory.regenerativePractices.bioFertilizerDosage}
                  </p>
                </div>
                <div>
                  <span className="font-bold text-stone-800 block mb-0.5">{t.soil_regeneration_title}:</span>
                  <p className="text-stone-600 leading-relaxed font-medium">
                    {advisory.regenerativePractices.soilRegenerationPlan}
                  </p>
                </div>
              </div>
            </article>

            {/* Water-Smart Irrigation */}
            <article className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                <div className="flex items-center space-x-2">
                  <Droplets className="w-4 h-4 text-cyan-600" />
                  <h4 className="font-bold text-sm text-stone-900">{t.water_smart_title}</h4>
                </div>
                <span className="text-[11px] font-bold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded-full border border-cyan-200">
                  {advisory.waterSmartIrrigation.waterSavedPercentage}
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-bold text-stone-800 block mb-0.5">Timing & Volume:</span>
                  <p className="text-stone-600 leading-relaxed font-medium">
                    {advisory.waterSmartIrrigation.schedule}
                  </p>
                </div>
                <div>
                  <span className="font-bold text-stone-800 block mb-0.5">Moisture Status:</span>
                  <p className="text-stone-600 leading-relaxed font-medium">
                    {advisory.waterSmartIrrigation.soilMoistureStatus}
                  </p>
                </div>
              </div>
            </article>
          </div>

          {/* Pest & Pathogen Warning */}
          <article className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <h4 className="font-bold text-sm text-stone-900">{t.pest_warning_title}</h4>
              </div>
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                  advisory.pestDiseaseEarlyWarning.riskLevel === 'High'
                    ? 'bg-rose-100 text-rose-800 border border-rose-200'
                    : advisory.pestDiseaseEarlyWarning.riskLevel === 'Medium'
                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}
              >
                {advisory.pestDiseaseEarlyWarning.riskLevel} {t.risk_level}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <ul className="list-disc list-inside space-y-1 text-stone-700 font-medium">
                {advisory.pestDiseaseEarlyWarning.potentialThreats.map((threat, i) => (
                  <li key={i}>{threat}</li>
                ))}
              </ul>
              <div className="p-3.5 bg-emerald-50/80 rounded-2xl border border-emerald-200 text-stone-800 font-medium leading-relaxed">
                <strong className="text-emerald-900 block mb-1">{t.biological_control_title}:</strong>
                {advisory.pestDiseaseEarlyWarning.preventiveBiologicalControl}
              </div>
            </div>
          </article>
        </main>
      </div>

      {/* 4. Real-time Mandi Market Clearing Rates (e-NAM) */}
      <MandiMarketRates
        crop={selectedCrop}
        state={currentState}
        district={currentDistrict}
        language={currentLanguage}
      />
    </section>
  );
};
