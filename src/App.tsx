import React, { useState } from 'react';
import { IndianLanguage, TransboundaryAlert } from './types/krishi';
import { STATES_DATA } from './data/agriData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AdvisorySection } from './components/AdvisorySection';
import { CropDiagnosticSection } from './components/CropDiagnosticSection';
import { InterStateGridSection } from './components/InterStateGridSection';
import { VoiceKrishiMitra } from './components/VoiceKrishiMitra';
import {
  Sprout,
  Share2,
  Shield,
  Heart,
  Sparkles,
  ArrowRight,
  Database,
  Radio,
  ExternalLink,
} from 'lucide-react';

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState<IndianLanguage>('Hindi');
  const [currentState, setCurrentState] = useState<string>('Punjab');
  const [currentDistrict, setCurrentDistrict] = useState<string>(
    STATES_DATA['Punjab'].districts[0]
  );
  const [activeTab, setActiveTab] = useState<'advisory' | 'diagnostic' | 'interstate' | 'voice'>('advisory');
  const [activeAudioKey, setActiveAudioKey] = useState<string | null>(null);
  const [customAlerts, setCustomAlerts] = useState<TransboundaryAlert[]>([]);

  const handleBroadcastAlert = (alert: TransboundaryAlert) => {
    setCustomAlerts((prev) => [alert, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col text-stone-900 font-sans selection:bg-[#143D23] selection:text-white">
      {/* DPI Navigation Bar: Spacious, Krishisahay Branding with 1-Tap Translation Ribbon */}
      <Navbar
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        currentState={currentState}
        onStateChange={setCurrentState}
        currentDistrict={currentDistrict}
        onDistrictChange={setCurrentDistrict}
        activeAudioKey={activeAudioKey}
        onStopAudio={() => setActiveAudioKey(null)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Hero Section: Rendered on Advisory tab for welcoming context and overview */}
      {activeTab === 'advisory' && (
        <HeroSection
          onExploreAdvisory={() => {
            const el = document.getElementById('advisory-workspace');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenVoice={() => setActiveTab('voice')}
          currentState={currentState}
          currentDistrict={currentDistrict}
          currentLanguage={currentLanguage}
        />
      )}

      {/* Main Feature Workspace Area */}
      <main id="advisory-workspace" className="flex-1 pb-16">
        {activeTab === 'advisory' && (
          <AdvisorySection
            currentState={currentState}
            currentDistrict={currentDistrict}
            currentLanguage={currentLanguage}
            onLanguageChange={setCurrentLanguage}
            activeAudioKey={activeAudioKey}
            setActiveAudioKey={setActiveAudioKey}
          />
        )}

        {activeTab === 'diagnostic' && (
          <CropDiagnosticSection
            currentState={currentState}
            currentDistrict={currentDistrict}
            currentLanguage={currentLanguage}
            onLanguageChange={setCurrentLanguage}
            activeAudioKey={activeAudioKey}
            setActiveAudioKey={setActiveAudioKey}
            onBroadcastAlert={handleBroadcastAlert}
          />
        )}

        {activeTab === 'interstate' && (
          <InterStateGridSection customAlerts={customAlerts} />
        )}

        {activeTab === 'voice' && (
          <VoiceKrishiMitra
            currentLanguage={currentLanguage}
            currentState={currentState}
            currentDistrict={currentDistrict}
            onLanguageChange={setCurrentLanguage}
            activeAudioKey={activeAudioKey}
            setActiveAudioKey={setActiveAudioKey}
          />
        )}
      </main>

      {/* High-Impact Forest Green CTA Banner */}
      <section className="bg-[#143D23] text-white py-16 px-4 sm:px-6 lg:px-8 border-t border-[#1C522F]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Join 42,000+ Indian farmers cultivating with proactive intelligence
          </h2>
          <p className="text-emerald-100 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Eliminate crop failure, reduce chemical fertilizer spending by 35%, and connect your farm holding to India's unified agricultural public data grid.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={() => {
                setActiveTab('advisory');
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              className="px-8 py-3.5 rounded-full bg-white hover:bg-stone-100 text-[#143D23] font-bold text-sm shadow-md transition cursor-pointer flex items-center space-x-2"
            >
              <span>Explore Farm Soil Plan</span>
              <ArrowRight className="w-4 h-4 text-[#143D23]" />
            </button>

            <button
              onClick={() => {
                setActiveTab('voice');
                window.scrollTo({ top: 200, behavior: 'smooth' });
              }}
              className="px-7 py-3.5 rounded-full bg-emerald-900/60 hover:bg-emerald-900/90 text-white font-semibold text-sm border border-emerald-400/40 transition cursor-pointer flex items-center space-x-2"
            >
              <span>Voice Consultation (माइक बोलें)</span>
            </button>
          </div>

          <p className="text-emerald-200/80 text-xs pt-1">
            Free & Open Digital Public Good • AgriStack 2.0 Unified Interface • Zero vendor lock-in
          </p>
        </div>
      </section>

      {/* Structured Dark Forest Footer */}
      <footer className="bg-[#0D2516] text-stone-300 py-12 px-4 sm:px-6 lg:px-8 text-xs border-t border-[#173F26]">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Column 1: Brand & Tagline */}
            <div className="col-span-2 space-y-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-[#0D2516]">
                  <Sprout className="w-5 h-5 text-white" />
                </div>
                <span className="font-extrabold text-white text-xl tracking-tight">
                  Krishisahay
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-900 text-emerald-300 font-bold border border-emerald-700">
                  कृषि सहाय
                </span>
              </div>
              <p className="text-stone-400 leading-relaxed text-xs max-w-sm">
                Interoperable National Agricultural Intelligence Network. Delivering real-time satellite agro-advisories, multimodal plant pathology diagnostics, and cross-state climate resilience data exchange.
              </p>
              <div className="flex items-center space-x-3 text-stone-400 pt-1">
                <span className="text-[11px] text-emerald-400 font-mono">DPI Protocol 2.0</span>
                <span>•</span>
                <span className="text-[11px] text-stone-400 font-mono">AgriStack Aligned</span>
              </div>
            </div>

            {/* Column 2: DPI Services */}
            <div className="space-y-2.5">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
                DPI Services
              </h4>
              <ul className="space-y-2 text-stone-400">
                <li><button onClick={() => setActiveTab('advisory')} className="hover:text-emerald-300 transition cursor-pointer">Sentinel-2 Telemetry</button></li>
                <li><button onClick={() => setActiveTab('diagnostic')} className="hover:text-emerald-300 transition cursor-pointer">Plant Pathology Vision</button></li>
                <li><button onClick={() => setActiveTab('advisory')} className="hover:text-emerald-300 transition cursor-pointer">e-NAM APMC Grounding</button></li>
                <li><button onClick={() => setActiveTab('voice')} className="hover:text-emerald-300 transition cursor-pointer">Krishi Mitra Voice</button></li>
              </ul>
            </div>

            {/* Column 3: Agricultural Corridors */}
            <div className="space-y-2.5">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
                Corridors
              </h4>
              <ul className="space-y-2 text-stone-400">
                <li><button onClick={() => setActiveTab('interstate')} className="hover:text-emerald-300 transition cursor-pointer">Indo-Gangetic Basin</button></li>
                <li><button onClick={() => setActiveTab('interstate')} className="hover:text-emerald-300 transition cursor-pointer">Deccan Semi-Arid Plateau</button></li>
                <li><button onClick={() => setActiveTab('interstate')} className="hover:text-emerald-300 transition cursor-pointer">Eastern Delta & Coastal</button></li>
                <li><button onClick={() => setActiveTab('interstate')} className="hover:text-emerald-300 transition cursor-pointer">Transboundary Pest Radar</button></li>
              </ul>
            </div>

            {/* Column 4: Research & Public Goods */}
            <div className="space-y-2.5">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">
                Institutions & SAUs
              </h4>
              <ul className="space-y-2 text-stone-400">
                <li><span className="hover:text-white transition">ICAR Institutes</span></li>
                <li><span className="hover:text-white transition">PAU Ludhiana Node</span></li>
                <li><span className="hover:text-white transition">MPKV Rahuri AI</span></li>
                <li><span className="hover:text-white transition">TNAU Coimbatore Node</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
            <p>© 2026 Krishisahay. Built as an open Digital Public Good for Indian Agriculture.</p>
            <div className="flex items-center space-x-4">
              <span>Empowered by Gemini 3.8 Flash & Sentinel-2</span>
              <span>•</span>
              <span className="text-stone-400">Theme: Cooperation for Food Security</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
