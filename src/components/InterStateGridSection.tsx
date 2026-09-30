import React, { useState } from 'react';
import { RegionalCorridor, TransboundaryAlert } from '../types/krishi';
import { INITIAL_CORRIDORS } from '../data/agriData';
import {
  Share2,
  ShieldAlert,
  ArrowRight,
  Database,
  Download,
  AlertCircle,
  Building2,
  PlusCircle,
  CheckCircle,
  Globe,
  Radio,
  Zap,
} from 'lucide-react';

interface InterStateGridProps {
  customAlerts?: TransboundaryAlert[];
}

export const InterStateGridSection: React.FC<InterStateGridProps> = ({ customAlerts = [] }) => {
  const [corridors, setCorridors] = useState<RegionalCorridor[]>(INITIAL_CORRIDORS);
  const [selectedCorridorId, setSelectedCorridorId] = useState<string>('corridor-north');
  const [showBroadcastModal, setShowBroadcastModal] = useState<boolean>(false);

  // New Alert Form state
  const [sourceState, setSourceState] = useState<string>('Punjab');
  const [targetStates, setTargetStates] = useState<string>('Haryana, Western UP');
  const [threatType, setThreatType] = useState<string>('Fall Armyworm Migratory Swarm');
  const [alertSeverity, setAlertSeverity] = useState<'Critical' | 'Attention' | 'Normal'>('Critical');
  const [advisoryContent, setAdvisoryContent] = useState<string>(
    'Radar trajectory indicates cross-border migration within 48 hours. Deploy light traps along border zones.'
  );

  const selectedCorridor =
    corridors.find((c) => c.id === selectedCorridorId) || corridors[0];

  const handleBroadcastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAlert: TransboundaryAlert = {
      id: `alert-${Date.now()}`,
      severity: alertSeverity,
      type: threatType,
      sourceState: `${sourceState} (Field Sensor Array)`,
      targetStates: targetStates.split(',').map((s) => s.trim()),
      timestamp: 'Just now',
      advisory: advisoryContent,
    };

    setCorridors((prev) =>
      prev.map((c) =>
        c.id === selectedCorridorId
          ? { ...c, activeAlerts: [newAlert, ...c.activeAlerts] }
          : c
      )
    );
    setShowBroadcastModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-emerald-950 to-stone-900 rounded-2xl p-6 sm:p-8 text-white border border-emerald-700/40 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                Inter-State Agricultural Data Exchange (ISADE)
              </span>
              <span className="text-xs text-stone-400 font-mono">DPI Protocol</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Federal Cooperative Agri-Intelligence Grid
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed">
              Breaking state silos. India's first open digital public good enabling federated crop data models, transboundary pest alerts, and shared watershed resilience.
            </p>
          </div>

          <button
            onClick={() => setShowBroadcastModal(true)}
            className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm shadow-lg transition cursor-pointer shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Broadcast Transboundary Alert</span>
          </button>
        </div>
      </div>

      {/* Corridor Selector Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {corridors.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedCorridorId(c.id)}
            className={`p-5 rounded-2xl border text-left transition cursor-pointer space-y-3 ${
              selectedCorridorId === c.id
                ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                : 'bg-stone-50 border-stone-200 hover:bg-white hover:border-stone-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                {c.states.length} Member States
              </span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>

            <h3 className="font-bold text-base text-stone-900 leading-snug">{c.name}</h3>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {c.states.map((st) => (
                <span
                  key={st}
                  className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-stone-100 text-stone-700 border border-stone-200"
                >
                  {st}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
              <span>{c.activeAlerts.length} Active Alerts</span>
              <span className="font-semibold text-emerald-600">{c.sharedModels.length} Open Models</span>
            </div>
          </button>
        ))}
      </div>

      {/* Main Selected Corridor Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Real-Time Transboundary Alerts (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center space-x-2">
                <ShieldAlert className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-base text-stone-900">
                  Live Transboundary Alerts ({selectedCorridor.activeAlerts.length})
                </h3>
              </div>
              <span className="text-xs text-stone-500 font-mono">Pest & Climate Radar</span>
            </div>

            <div className="space-y-3.5">
              {selectedCorridor.activeAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl border space-y-2 transition ${
                    alert.severity === 'Critical'
                      ? 'bg-rose-50/50 border-rose-200'
                      : alert.severity === 'Attention'
                      ? 'bg-amber-50/50 border-amber-200'
                      : 'bg-emerald-50/50 border-emerald-200'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          alert.severity === 'Critical'
                            ? 'bg-rose-500 text-white'
                            : alert.severity === 'Attention'
                            ? 'bg-amber-500 text-stone-950'
                            : 'bg-emerald-600 text-white'
                        }`}
                      >
                        {alert.severity}
                      </span>
                      <h4 className="font-bold text-sm text-stone-900">{alert.type}</h4>
                    </div>
                    <span className="text-[11px] text-stone-500">{alert.timestamp}</span>
                  </div>

                  <div className="text-xs text-stone-600 flex items-center gap-1.5 font-medium">
                    <span className="text-stone-900 font-bold">{alert.sourceState}</span>
                    <ArrowRight className="w-3 h-3 text-stone-400" />
                    <span>{alert.targetStates.join(', ')}</span>
                  </div>

                  <p className="text-xs text-stone-800 leading-relaxed font-medium bg-white/70 p-2.5 rounded-lg border border-stone-200/50">
                    {alert.advisory}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Stubble & Water Cooperation Highlights */}
          <div className="bg-stone-900 text-stone-100 rounded-2xl p-6 border border-stone-800 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              Strategic Focus Areas in {selectedCorridor.name}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {selectedCorridor.focusAreas.map((area, idx) => (
                <div
                  key={idx}
                  className="bg-stone-800/80 p-3 rounded-xl border border-stone-700/70 text-xs space-y-1"
                >
                  <span className="text-[10px] font-mono text-emerald-400">0{idx + 1}</span>
                  <p className="text-stone-200 font-medium leading-snug">{area}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Federated Open AI Models & Cooperation Calculator (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Federated Model Exchange */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center space-x-2">
                <Database className="w-5 h-5 text-teal-600" />
                <h3 className="font-bold text-sm text-stone-900">
                  Federated Open AI Model Exchange
                </h3>
              </div>
              <span className="text-xs text-stone-400">Digital Public Good</span>
            </div>

            <p className="text-xs text-stone-500 leading-relaxed">
              Open weights and algorithmic inference nodes published by State Agricultural Universities (SAUs) and ICAR for free cross-state deployment.
            </p>

            <div className="space-y-3">
              {selectedCorridor.sharedModels.map((model, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between hover:border-emerald-300 transition"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-xs text-stone-900 block">{model.name}</span>
                    <div className="flex items-center space-x-2 text-[10px] text-stone-500">
                      <span>Ver {model.version}</span>
                      <span>•</span>
                      <span className="text-emerald-700 font-semibold">{model.accuracy} Accuracy</span>
                      <span>•</span>
                      <span>{model.downloads} downloads</span>
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`Downloading model weights and API manifest for ${model.name}`)}
                    className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition cursor-pointer"
                    title="Download Model Schema"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Cooperation Impact Metric Dashboard */}
          <div className="bg-gradient-to-br from-emerald-500 to-teal-700 rounded-2xl p-6 text-white shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-100">
                Federated Cooperation Dividend
              </span>
              <CheckCircle className="w-4 h-4 text-emerald-200" />
            </div>

            <div className="space-y-1">
              <h4 className="text-3xl font-extrabold font-mono">1.84M Tonnes</h4>
              <p className="text-xs text-emerald-100">
                Estimated food grain harvest saved via transboundary pest warnings & bio-decomposer stubble logistics across {selectedCorridor.states.length} states.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-emerald-400/40 text-xs">
              <div>
                <span className="text-emerald-200 block text-[10px]">Aquifer Water Preserved</span>
                <span className="font-bold text-sm">410 Billion Liters</span>
              </div>
              <div>
                <span className="text-emerald-200 block text-[10px]">Stubble Burning Reduced</span>
                <span className="font-bold text-sm">-38.4% YoY</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Broadcast Transboundary Alert Modal */}
      {showBroadcastModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-bold text-base text-stone-900 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-emerald-600" />
                Dispatch Transboundary Sensor Warning
              </h3>
              <button
                onClick={() => setShowBroadcastModal(false)}
                className="text-stone-400 hover:text-stone-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleBroadcastSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Originating State & Agro-Station
                </label>
                <input
                  type="text"
                  value={sourceState}
                  onChange={(e) => setSourceState(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 font-medium text-stone-800 focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Target Bordering States in Corridor
                </label>
                <input
                  type="text"
                  value={targetStates}
                  onChange={(e) => setTargetStates(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 font-medium text-stone-800 focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Threat Type</label>
                  <input
                    type="text"
                    value={threatType}
                    onChange={(e) => setThreatType(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 font-medium text-stone-800 focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Severity Level</label>
                  <select
                    value={alertSeverity}
                    onChange={(e) => setAlertSeverity(e.target.value as any)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 font-medium text-stone-800 focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Critical">Critical (Immediate Containment)</option>
                    <option value="Attention">Attention (Surveillance Required)</option>
                    <option value="Normal">Normal (Routine Sync)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  Preventive Bio-Shield Advisory
                </label>
                <textarea
                  value={advisoryContent}
                  onChange={(e) => setAdvisoryContent(e.target.value)}
                  rows={3}
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2.5 font-medium text-stone-800 focus:ring-2 focus:ring-emerald-500"
                  required
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowBroadcastModal(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition shadow-md"
                >
                  Transmit to Member States
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
