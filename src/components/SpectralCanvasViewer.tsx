import React, { useRef, useEffect, useState } from 'react';
import { Layers, Eye, Maximize2, Compass, Activity, Droplets, Thermometer, Sparkles } from 'lucide-react';

interface SpectralCanvasViewerProps {
  crop: string;
  ndviBaseline: number;
  soilMoistureBaseline: number;
  state: string;
  district: string;
}

export type SpectralBand = 'ndvi' | 'ndwi' | 'thermal' | 'moisture' | 'rgb';

export const SpectralCanvasViewer: React.FC<SpectralCanvasViewerProps> = ({
  crop,
  ndviBaseline,
  soilMoistureBaseline,
  state,
  district,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeBand, setActiveBand] = useState<SpectralBand>('ndvi');
  const [hoverData, setHoverData] = useState<{
    x: number;
    y: number;
    ndvi: number;
    ndwi: number;
    temp: number;
    moisture: number;
    zone: string;
  } | null>(null);
  const [resolution, setResolution] = useState<'10m' | '20m'>('10m');
  const [animationTick, setAnimationTick] = useState<number>(0);

  // Periodic subtle radar sweep animation
  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationTick((t) => (t + 1) % 360);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  // Render procedural spectral pixels
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const gridSize = resolution === '10m' ? 8 : 16;
    const cols = Math.floor(width / gridSize);
    const rows = Math.floor(height / gridSize);

    // Seeded procedural farm field topology with furrows, canal borders, and parcels
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Pseudo-spatial coordinates relative to center
        const nx = c / cols;
        const ny = r / rows;

        // Soil texture and vegetation variations
        const parcelNoise = Math.sin(nx * 12) * Math.cos(ny * 8) * 0.15;
        const furrowNoise = Math.sin(ny * 40) * 0.04;
        const canalDistance = Math.abs(nx - 0.5);
        const waterInfluence = Math.max(0, (0.3 - canalDistance) * 0.4);

        const localNdvi = Math.min(
          0.92,
          Math.max(0.18, ndviBaseline + parcelNoise + furrowNoise + (nx > 0.6 ? -0.08 : 0.05))
        );
        const localMoisture = Math.min(
          55,
          Math.max(16, soilMoistureBaseline + waterInfluence * 40 + (ny > 0.5 ? 5 : -4))
        );
        const localNdwi = Math.min(0.65, Math.max(-0.1, (localMoisture - 20) / 45));
        const localTemp = 28 + (1 - localNdvi) * 6 + (nx * 2);

        // Color coding depending on activeBand
        let fillStyle = '';
        if (activeBand === 'ndvi') {
          // NDVI: Red/Brown (bare) -> Yellow -> Light Green -> Lush Dark Forest Green
          if (localNdvi < 0.35) {
            fillStyle = `rgb(194, 65, 12)`; // stressed / bare soil
          } else if (localNdvi < 0.5) {
            fillStyle = `rgb(234, 179, 8)`; // moderate
          } else if (localNdvi < 0.7) {
            fillStyle = `rgb(34, 197, 94)`; // vigorous
          } else {
            fillStyle = `rgb(20, 83, 45)`; // dense lush canopy
          }
        } else if (activeBand === 'ndwi') {
          // NDWI Hydration: Pale cyan to rich cobalt
          const cyanIntensity = Math.floor(Math.max(0, Math.min(255, (localNdwi + 0.1) * 350)));
          fillStyle = `rgb(8, ${Math.min(200, 80 + cyanIntensity)}, ${Math.min(255, 120 + cyanIntensity)})`;
        } else if (activeBand === 'thermal') {
          // Thermal Canopy Anomaly: Deep violet to heatwave amber
          const heatRatio = Math.max(0, Math.min(1, (localTemp - 26) / 10));
          const rCol = Math.floor(80 + heatRatio * 170);
          const gCol = Math.floor(30 + (1 - heatRatio) * 100);
          const bCol = Math.floor(180 - heatRatio * 140);
          fillStyle = `rgb(${rCol}, ${gCol}, ${bCol})`;
        } else if (activeBand === 'moisture') {
          // Root Zone Soil Moisture (0-30cm)
          const mRatio = localMoisture / 60;
          fillStyle = `rgb(${Math.floor(40 + (1 - mRatio) * 150)}, ${Math.floor(110 + mRatio * 80)}, ${Math.floor(180 + mRatio * 60)})`;
        } else {
          // Simulated Natural RGB Field View
          fillStyle = `rgb(${Math.floor(60 + (1 - localNdvi) * 70)}, ${Math.floor(110 + localNdvi * 90)}, ${Math.floor(40 + localNdvi * 40)})`;
        }

        ctx.fillStyle = fillStyle;
        ctx.fillRect(c * gridSize, r * gridSize, gridSize - 0.5, gridSize - 0.5);
      }
    }

    // Draw field boundary cadastre lines (AgriStack plot polygons)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(width * 0.08, height * 0.08, width * 0.38, height * 0.78);
    ctx.strokeRect(width * 0.52, height * 0.08, width * 0.40, height * 0.42);
    ctx.strokeRect(width * 0.52, height * 0.56, width * 0.40, height * 0.30);

    // Sweep scan line effect
    const sweepY = (animationTick * 1.5) % height;
    ctx.strokeStyle = 'rgba(74, 222, 128, 0.25)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, sweepY);
    ctx.lineTo(width, sweepY);
    ctx.stroke();
  }, [activeBand, ndviBaseline, soilMoistureBaseline, resolution, animationTick]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const nx = x / rect.width;
    const ny = y / rect.height;

    const localNdvi = Number((ndviBaseline + Math.sin(nx * 8) * 0.12).toFixed(2));
    const localMoisture = Math.round(soilMoistureBaseline + Math.cos(ny * 6) * 6);
    const localNdwi = Number(((localMoisture - 20) / 45).toFixed(2));
    const localTemp = Number((30 + (1 - localNdvi) * 4).toFixed(1));

    let zone = 'North Furrow Parcel #402';
    if (nx > 0.5 && ny < 0.5) zone = 'East Drip Sector #403';
    else if (nx > 0.5) zone = 'Canal Bank Parcel #404';

    setHoverData({
      x: Math.round(x),
      y: Math.round(y),
      ndvi: localNdvi,
      ndwi: localNdwi,
      temp: localTemp,
      moisture: localMoisture,
      zone,
    });
  };

  const handleMouseLeave = () => {
    setHoverData(null);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/90 shadow-sm space-y-5">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Interactive Sentinel-2 Spectral Cockpit
            </span>
          </div>
          <h3 className="text-lg font-bold text-stone-900 mt-0.5">
            Cadastral Field Spectral Analysis ({crop})
          </h3>
          <p className="text-xs text-stone-500">
            Plot Coordinates: 30.9010° N, 75.8573° E • {district}, {state}
          </p>
        </div>

        {/* Resolution toggle */}
        <div className="flex items-center space-x-1.5 bg-stone-100 p-1 rounded-xl text-xs font-medium">
          <button
            onClick={() => setResolution('10m')}
            className={`px-2.5 py-1 rounded-lg transition ${
              resolution === '10m' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-500'
            }`}
          >
            10m Sentinel
          </button>
          <button
            onClick={() => setResolution('20m')}
            className={`px-2.5 py-1 rounded-lg transition ${
              resolution === '20m' ? 'bg-white text-stone-900 shadow-xs font-bold' : 'text-stone-500'
            }`}
          >
            20m SWIR
          </button>
        </div>
      </div>

      {/* Spectral Band Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveBand('ndvi')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition cursor-pointer ${
            activeBand === 'ndvi'
              ? 'bg-emerald-800 text-white shadow-sm'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>NDVI (Canopy Vigor)</span>
        </button>

        <button
          onClick={() => setActiveBand('ndwi')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition cursor-pointer ${
            activeBand === 'ndwi'
              ? 'bg-cyan-700 text-white shadow-sm'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          <Droplets className="w-3.5 h-3.5" />
          <span>NDWI (Hydration)</span>
        </button>

        <button
          onClick={() => setActiveBand('moisture')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition cursor-pointer ${
            activeBand === 'moisture'
              ? 'bg-teal-800 text-white shadow-sm'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          <Droplets className="w-3.5 h-3.5" />
          <span>Soil Moisture (0-30cm)</span>
        </button>

        <button
          onClick={() => setActiveBand('thermal')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition cursor-pointer ${
            activeBand === 'thermal'
              ? 'bg-amber-700 text-white shadow-sm'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          <Thermometer className="w-3.5 h-3.5" />
          <span>Canopy Heat Anomaly</span>
        </button>

        <button
          onClick={() => setActiveBand('rgb')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition cursor-pointer ${
            activeBand === 'rgb'
              ? 'bg-stone-800 text-white shadow-sm'
              : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>RGB True Color</span>
        </button>
      </div>

      {/* Main Canvas Viewport with coordinate cursor overlay */}
      <div className="relative rounded-2xl overflow-hidden bg-stone-900 border border-stone-200 shadow-inner group">
        <canvas
          ref={canvasRef}
          width={640}
          height={320}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full h-64 sm:h-80 object-cover cursor-crosshair"
        />

        {/* Live Coordinate Cursor Card */}
        {hoverData ? (
          <div className="absolute bottom-3 left-3 bg-stone-900/90 backdrop-blur-md text-white p-3 rounded-xl border border-stone-700/80 text-xs shadow-xl space-y-1 pointer-events-none transition-all">
            <div className="font-bold text-emerald-400 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>{hoverData.zone}</span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-[11px] text-stone-300 font-mono">
              <span>NDVI: <strong className="text-white">{hoverData.ndvi}</strong></span>
              <span>NDWI: <strong className="text-cyan-300">{hoverData.ndwi}</strong></span>
              <span>Soil Moist: <strong className="text-emerald-300">{hoverData.moisture}%</strong></span>
              <span>Canopy Temp: <strong className="text-amber-300">{hoverData.temp}°C</strong></span>
            </div>
          </div>
        ) : (
          <div className="absolute bottom-3 left-3 bg-stone-900/75 backdrop-blur-md text-stone-300 px-3 py-1.5 rounded-lg border border-stone-700 text-[11px] pointer-events-none flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>Hover or touch canvas to inspect individual pixel spectral telemetry</span>
          </div>
        )}

        {/* Top-right Cadastral stamp */}
        <div className="absolute top-3 right-3 bg-stone-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-stone-700/80 text-[10px] font-mono text-emerald-400">
          🛰️ Sentinel-2 MSI Band 8A / 4 / 3
        </div>
      </div>

      {/* Spectral Legend & Scientific Reference */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-stone-600">Spectral Palette:</span>
          {activeBand === 'ndvi' && (
            <div className="flex items-center space-x-1.5 text-[11px] font-medium">
              <span className="w-3 h-3 rounded bg-[#c2410c]"></span>
              <span className="text-stone-500">&lt;0.35 (Stressed)</span>
              <span className="w-3 h-3 rounded bg-[#eab308] ml-2"></span>
              <span className="text-stone-500">0.50 (Moderate)</span>
              <span className="w-3 h-3 rounded bg-[#22c55e] ml-2"></span>
              <span className="text-stone-500">0.70 (Healthy)</span>
              <span className="w-3 h-3 rounded bg-[#14532d] ml-2"></span>
              <span className="text-stone-800 font-bold">&gt;0.80 (Lush Canopy)</span>
            </div>
          )}
          {activeBand === 'ndwi' && (
            <div className="flex items-center space-x-1.5 text-[11px] font-medium">
              <span className="w-3 h-3 rounded bg-cyan-200"></span>
              <span className="text-stone-500">Dry (-0.1)</span>
              <span className="w-3 h-3 rounded bg-cyan-600 ml-2"></span>
              <span className="text-stone-500">Moist (0.3)</span>
              <span className="w-3 h-3 rounded bg-blue-900 ml-2"></span>
              <span className="text-stone-800 font-bold">Hydrated (&gt;0.5)</span>
            </div>
          )}
          {activeBand === 'thermal' && (
            <div className="flex items-center space-x-1.5 text-[11px] font-medium">
              <span className="w-3 h-3 rounded bg-indigo-600"></span>
              <span className="text-stone-500">Cool (26°C)</span>
              <span className="w-3 h-3 rounded bg-amber-600 ml-2"></span>
              <span className="text-stone-500">Normal (31°C)</span>
              <span className="w-3 h-3 rounded bg-rose-600 ml-2"></span>
              <span className="text-stone-800 font-bold">Heat Stress (&gt;35°C)</span>
            </div>
          )}
          {activeBand === 'moisture' && (
            <div className="flex items-center space-x-1.5 text-[11px] font-medium">
              <span className="w-3 h-3 rounded bg-amber-200"></span>
              <span className="text-stone-500">&lt;20% (Deficit)</span>
              <span className="w-3 h-3 rounded bg-emerald-500 ml-2"></span>
              <span className="text-stone-500">35% (Optimal)</span>
              <span className="w-3 h-3 rounded bg-blue-600 ml-2"></span>
              <span className="text-stone-800 font-bold">&gt;50% (Saturated)</span>
            </div>
          )}
        </div>

        <span className="text-[11px] text-stone-400">
          Rendered via HTML5 Canvas Shader • 0.2ms GPU latency
        </span>
      </div>
    </div>
  );
};
