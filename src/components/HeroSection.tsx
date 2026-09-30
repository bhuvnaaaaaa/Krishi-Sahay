import React from 'react';
import { IndianLanguage } from '../types/krishi';
import { TRANSLATIONS } from '../data/translations';
import {
  Satellite,
  ShieldCheck,
  ArrowRight,
  Play,
  Star,
  Cpu,
  Share2,
} from 'lucide-react';

interface HeroSectionProps {
  onExploreAdvisory: () => void;
  onOpenVoice: () => void;
  currentState: string;
  currentDistrict: string;
  currentLanguage?: IndianLanguage;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreAdvisory,
  onOpenVoice,
  currentState,
  currentDistrict,
  currentLanguage = 'Hindi',
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.Hindi;

  return (
    <section className="relative pt-10 pb-14 sm:pt-16 sm:pb-20 bg-[#FAF9F5] border-b border-stone-200/70 overflow-hidden">
      {/* Radiant ambient glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(16,185,129,0.12),transparent_70%)]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Hero Header Stack */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          {/* Announcement Pill Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-xs font-semibold text-emerald-950 shadow-2xs hover:bg-emerald-100/60 transition-colors">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span>Krishisahay • {t.dpi_badge}</span>
          </div>

          {/* Primary Editorial Headline with Subtle Gradient */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-stone-900 leading-[1.12]">
            {t.hero_title_prefix}{' '}
            <span className="bg-gradient-to-r from-emerald-800 via-teal-700 to-[#143D23] bg-clip-text text-transparent underline decoration-emerald-500/30 decoration-wavy">
              {t.hero_title_highlight}
            </span>{' '}
            {t.hero_title_suffix}
          </h1>

          {/* Clean Sub-headline */}
          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed font-normal">
            {t.hero_description}
          </p>

          {/* Call-to-action Button Pair */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              type="button"
              onClick={onExploreAdvisory}
              className="px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-[#143D23] via-emerald-800 to-teal-900 hover:from-emerald-900 hover:to-teal-950 text-white font-semibold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer flex items-center space-x-2.5"
            >
              <span>{t.btn_get_advisory}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onOpenVoice}
              className="px-6 py-3.5 rounded-full bg-white/90 hover:bg-white text-stone-800 font-semibold text-sm border border-stone-300 hover:border-stone-400 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer flex items-center space-x-2.5"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                <Play className="w-2.5 h-2.5 text-[#143D23] fill-current ml-0.5" />
              </div>
              <span>{t.btn_voice_assistant}</span>
            </button>
          </div>

          {/* Active Context Anchor & Community Metric */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="flex items-center space-x-2 text-xs font-medium text-stone-700 bg-white/80 px-4 py-1.5 rounded-full border border-stone-200/80 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>
                Active Farm: <strong className="text-stone-900 font-bold">{currentDistrict}, {currentState}</strong>
              </span>
            </div>

            <div className="flex items-center space-x-2 text-xs font-medium text-stone-700">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span>
                <strong className="text-stone-900 font-bold">4.9/5</strong> rating from 42,000+ KVK farm holdings
              </span>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid with Smooth Hover Lift & Gradients */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-emerald-500/40 hover:-translate-y-1 transition-all duration-300 space-y-3 group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center group-hover:scale-105 group-hover:bg-emerald-100/80 transition-all duration-300">
              <Satellite className="w-6 h-6 stroke-[1.8]" />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-stone-900 group-hover:text-emerald-950 transition-colors">
              {t.hero_telemetry_satellite}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              Canopy vegetation indices (NDVI) and root-zone water balance tracked with precision Sentinel-2 satellite data.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-teal-500/40 hover:-translate-y-1 transition-all duration-300 space-y-3 group">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center group-hover:scale-105 group-hover:bg-teal-100/80 transition-all duration-300">
              <ShieldCheck className="w-6 h-6 stroke-[1.8]" />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-stone-900 group-hover:text-teal-950 transition-colors">
              {t.hero_telemetry_soil}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              District NPK telemetry, soil pH, and bio-fertilizer dosage (Jeevamrutha, PSB, Azotobacter) for living soil carbon.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-emerald-600/40 hover:-translate-y-1 transition-all duration-300 space-y-3 group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50/80 text-emerald-900 flex items-center justify-center group-hover:scale-105 group-hover:bg-emerald-100 transition-all duration-300">
              <Cpu className="w-6 h-6 stroke-[1.8]" />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-stone-900 group-hover:text-emerald-950 transition-colors">
              {t.nav_diagnostic}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              Upload any crop photo or speak via mic. Multimodal AI detects plant diseases, pests, and remedies in seconds.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-amber-500/40 hover:-translate-y-1 transition-all duration-300 space-y-3 group">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center group-hover:scale-105 group-hover:bg-amber-100/80 transition-all duration-300">
              <Share2 className="w-6 h-6 stroke-[1.8]" />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-stone-900 group-hover:text-amber-950 transition-colors">
              {t.nav_interstate}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed font-normal">
              Inter-state pest spore drift tracking, stubble biomass exchange, and shared watershed micro-irrigation alerts.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
