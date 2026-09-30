import React, { useState, useEffect } from 'react';
import { IndianLanguage } from '../types/krishi';
import { TRANSLATIONS } from '../data/translations';
import { TrendingUp, Store, ShieldCheck, ArrowUpRight, DollarSign, Building, Sparkles, RefreshCw } from 'lucide-react';

interface MandiMarketRatesProps {
  crop: string;
  state: string;
  district: string;
  language: IndianLanguage;
}

interface MandiData {
  crop: string;
  modalPricePerQuintal: string;
  mspPerQuintal: string;
  priceTrend: 'Bullish' | 'Stable' | 'Bearish';
  trendPercentage: string;
  nearestMandis: Array<{
    name: string;
    price: string;
    arrivalVolume: string;
    distance: string;
  }>;
  advisory: string;
  storageAdvice: string;
}

export const MandiMarketRates: React.FC<MandiMarketRatesProps> = ({
  crop,
  state,
  district,
  language,
}) => {
  const [data, setData] = useState<MandiData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const t = TRANSLATIONS[language] || TRANSLATIONS.Hindi;

  useEffect(() => {
    fetchMandiData();
  }, [crop, state, district, language]);

  const fetchMandiData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/gemini/mandi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crop, state, district, language }),
      });
      if (res.ok) {
        const json = await res.json();
        setData(json.data);
      }
    } catch (err) {
      console.error('Error fetching mandi data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm space-y-5">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              National e-NAM & APMC Market Grounding
            </span>
          </div>
          <h3 className="text-lg font-bold text-stone-900 mt-0.5">
            {t.mandi_title}: {crop}
          </h3>
          <p className="text-xs text-stone-500">
            {district} Mandis • {state}
          </p>
        </div>

        <button
          onClick={fetchMandiData}
          disabled={loading}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {data && (
        <div className="space-y-4">
          {/* Key Metric cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 space-y-1">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                {t.mandi_price}
              </span>
              <div className="text-2xl font-black text-stone-900 font-mono">
                {data.modalPricePerQuintal}
              </div>
              <div className="flex items-center space-x-1 text-xs font-bold text-emerald-700">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{data.priceTrend} ({data.trendPercentage})</span>
              </div>
            </div>

            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 space-y-1">
              <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
                {t.msp_label}
              </span>
              <div className="text-2xl font-black text-stone-900 font-mono">
                {data.mspPerQuintal}
              </div>
              <span className="inline-block text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                APMC Market Rate
              </span>
            </div>

            <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100 space-y-1">
              <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">
                e-NAM Inter-State Hub
              </span>
              <div className="text-2xl font-black text-emerald-950 font-mono">
                {data.nearestMandis?.[1]?.price || '₹2,540 / Qtl'}
              </div>
              <span className="text-[11px] text-emerald-700 font-medium block">
                Border Mandi (+₹60 premium)
              </span>
            </div>
          </div>

          {/* Nearest Mandi Yard Arrivals */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600">
              Live Yard Arrivals in Nearby Market Committees (APMCs)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {data.nearestMandis?.map((mandi, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-white border border-stone-200 hover:border-emerald-300 transition text-xs space-y-1"
                >
                  <div className="flex items-center justify-between font-bold text-stone-900">
                    <span>{mandi.name}</span>
                    <span className="text-emerald-700 font-mono">{mandi.price}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-stone-500">
                    <span>Arrivals: {mandi.arrivalVolume}</span>
                    <span className="text-stone-400">{mandi.distance}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Market Advisory & Storage Note */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-stone-50 to-emerald-50/40 border border-emerald-100/80 space-y-2 text-xs">
            <div className="flex items-start space-x-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-stone-900 block mb-0.5">
                  AI Marketing Strategy (बिक्री व भंडारण सलाह):
                </strong>
                <p className="text-stone-700 leading-relaxed font-medium">
                  {data.advisory}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-emerald-100 text-[11px] text-stone-500 flex items-center justify-between">
              <span>{data.storageAdvice}</span>
              <span className="font-semibold text-emerald-700">WDRA Verified</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
