import React from 'react';
import { IndianLanguage } from '../types/krishi';
import { SUPPORTED_LANGUAGES, STATES_DATA } from '../data/agriData';
import { TRANSLATIONS } from '../data/translations';
import {
  Volume2,
  VolumeX,
  Globe2,
  Share2,
  MapPin,
  Cpu,
  Layers,
  Sprout,
  Activity,
} from 'lucide-react';
import { stopAudioPlayback } from '../services/apiClient';

interface NavbarProps {
  currentLanguage: IndianLanguage;
  onLanguageChange: (lang: IndianLanguage) => void;
  currentState: string;
  onStateChange: (state: string) => void;
  currentDistrict: string;
  onDistrictChange: (district: string) => void;
  activeAudioKey: string | null;
  onStopAudio?: () => void;
  activeTab: 'advisory' | 'diagnostic' | 'interstate' | 'voice';
  onTabChange: (tab: 'advisory' | 'diagnostic' | 'interstate' | 'voice') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLanguage,
  onLanguageChange,
  currentState,
  onStateChange,
  currentDistrict,
  onDistrictChange,
  activeAudioKey,
  onStopAudio,
  activeTab,
  onTabChange,
}) => {
  const isPlayingAudio = Boolean(activeAudioKey);
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.Hindi;
  const stateDistricts = STATES_DATA[currentState]?.districts || [];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs transition-all duration-300">
      {/* Top Banner: Minimalist, Refined Official Indian DPI Bar */}
      <div className="bg-gradient-to-r from-emerald-950 via-[#143D23] to-teal-950 px-4 sm:px-6 py-1.5 text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2.5">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/25 text-emerald-200 border border-emerald-400/30">
              {t.dpi_badge}
            </span>
            <span className="text-emerald-100/90 font-medium text-[11px] hidden sm:inline tracking-wide">
              {t.dpi_tagline}
            </span>
          </div>

          <div className="flex items-center space-x-3 text-emerald-200 text-xs">
            <span className="flex items-center space-x-1.5 font-mono text-[11px]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-emerald-100 font-medium">{t.state_nodes_online}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Primary Brand & Regional Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Brand Name: Modern Botanical Emblem */}
          <div
            className="flex items-center space-x-3 cursor-pointer group shrink-0 select-none"
            onClick={() => onTabChange('advisory')}
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-600 via-[#143D23] to-teal-900 flex items-center justify-center shadow-sm group-hover:shadow-emerald-900/20 group-hover:scale-105 active:scale-95 transition-all duration-300">
              <Sprout className="w-5 h-5 text-emerald-200 group-hover:rotate-6 transition-transform duration-300" />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-stone-900 font-sans group-hover:text-emerald-950 transition-colors">
                  Krishisahay
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100/80 text-emerald-900 font-bold border border-emerald-200/80">
                  कृषि सहाय
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium hidden sm:block leading-tight">
                {t.app_subtitle}
              </p>
            </div>
          </div>

          {/* Right Controls: Location Pill & Voice Audio Mute */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Location Selector Pill */}
            <div className="flex items-center bg-white/90 backdrop-blur-sm border border-stone-200 hover:border-emerald-600/70 rounded-full px-3.5 py-1.5 text-xs text-stone-800 shadow-2xs hover:shadow-xs transition-all duration-200">
              <MapPin className="w-3.5 h-3.5 text-emerald-700 mr-1.5 shrink-0" />
              <div className="flex items-center space-x-1.5 font-medium">
                <select
                  value={currentState}
                  onChange={(e) => {
                    onStateChange(e.target.value);
                    const newDistricts = STATES_DATA[e.target.value]?.districts || [];
                    if (newDistricts.length > 0) {
                      onDistrictChange(newDistricts[0]);
                    }
                  }}
                  className="bg-transparent text-xs font-bold text-stone-900 focus:outline-none cursor-pointer hover:text-emerald-800 transition-colors"
                >
                  {Object.keys(STATES_DATA).map((st) => (
                    <option key={st} value={st} className="bg-white text-stone-900">
                      {st}
                    </option>
                  ))}
                </select>
                <span className="text-stone-300">/</span>
                <select
                  value={currentDistrict}
                  onChange={(e) => onDistrictChange(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-stone-600 focus:outline-none cursor-pointer max-w-[110px] truncate hover:text-stone-900 transition-colors"
                >
                  {stateDistricts.map((d) => (
                    <option key={d} value={d} className="bg-white text-stone-900">
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Audio Stop Button */}
            {isPlayingAudio && (
              <button
                type="button"
                onClick={() => {
                  stopAudioPlayback();
                  onStopAudio?.();
                }}
                className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs animate-pulse cursor-pointer shrink-0 hover:scale-105 active:scale-95 transition-all"
              >
                <VolumeX className="w-3.5 h-3.5" />
                <span>{t.stop_voice}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar: Spacious, Centered & Smooth Hovering Transitions */}
      <div className="border-t border-stone-200/60 bg-[#FAF9F5]/90 px-4 sm:px-6 lg:px-8 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <nav className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2.5 overflow-x-auto no-scrollbar w-full sm:w-auto py-0.5">
            <button
              type="button"
              onClick={() => onTabChange('advisory')}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all duration-200 cursor-pointer shrink-0 ${
                activeTab === 'advisory'
                  ? 'bg-gradient-to-r from-[#143D23] to-emerald-900 text-white shadow-sm shadow-emerald-950/20'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 hover:-translate-y-0.5 active:translate-y-0 bg-transparent'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{t.nav_advisory}</span>
            </button>

            <button
              type="button"
              onClick={() => onTabChange('diagnostic')}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all duration-200 cursor-pointer shrink-0 ${
                activeTab === 'diagnostic'
                  ? 'bg-gradient-to-r from-[#143D23] to-emerald-900 text-white shadow-sm shadow-emerald-950/20'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 hover:-translate-y-0.5 active:translate-y-0 bg-transparent'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>{t.nav_diagnostic}</span>
            </button>

            <button
              type="button"
              onClick={() => onTabChange('voice')}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all duration-200 cursor-pointer shrink-0 ${
                activeTab === 'voice'
                  ? 'bg-gradient-to-r from-[#143D23] to-emerald-900 text-white shadow-sm shadow-emerald-950/20'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 hover:-translate-y-0.5 active:translate-y-0 bg-transparent'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>{t.nav_voice}</span>
            </button>

            <button
              type="button"
              onClick={() => onTabChange('interstate')}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-all duration-200 cursor-pointer shrink-0 ${
                activeTab === 'interstate'
                  ? 'bg-gradient-to-r from-[#143D23] to-emerald-900 text-white shadow-sm shadow-emerald-950/20'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 hover:-translate-y-0.5 active:translate-y-0 bg-transparent'
              }`}
            >
              <Share2 className="w-4 h-4" />
              <span>{t.nav_interstate}</span>
            </button>
          </nav>
        </div>
      </div>

      {/* 1-Tap Language Translation Ribbon */}
      <div className="bg-[#F4F0E8] border-t border-b border-stone-200/70 px-4 sm:px-6 lg:px-8 py-1.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center space-x-2 text-xs font-bold text-stone-700 shrink-0">
            <Globe2 className="w-3.5 h-3.5 text-emerald-800" />
            <span className="text-[11px] uppercase tracking-wider">{t.language_label}:</span>
          </div>

          {/* 1-Tap Instant Language Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const isActive = currentLanguage === lang.name;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => onLanguageChange(lang.name as IndianLanguage)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#143D23] to-emerald-800 text-white shadow-2xs scale-105'
                      : 'bg-white/80 hover:bg-white text-stone-700 hover:text-stone-950 border border-stone-300/80 hover:border-emerald-600/50 hover:-translate-y-0.5 active:translate-y-0'
                  }`}
                >
                  {lang.nativeName}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
