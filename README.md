# Krishi Sahay (कृषि सहाय) 🌾
### National Digital Public Good Agriculture Intelligence Network

[![Live Prototype](https://img.shields.io/badge/Live_Prototype-🚀_Launch_App-10b981?style=for-the-badge&logo=render&logoColor=white)](https://krishi-sahay.onrender.com/)
[![Pitch Deck](https://img.shields.io/badge/Pitch_Deck-📄_Download_PDF-f59e0b?style=for-the-badge&logo=adobeacrobatreader&logoColor=white)](https://storage.googleapis.com/vision-hack2skill-production/innovator/USER01029482/1790789422155-KrishiSahayPitchDeck.pdf)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/bhuvnaaaaaa/Krishi-Sahay)
[![React 19](https://img.shields.io/badge/React-19.0.1-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Google Gemini API](https://img.shields.io/badge/Google_Gemini-Multimodal_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Digital Public Good](https://img.shields.io/badge/DPI-AgriStack_2.0-143D23?style=for-the-badge)](https://github.com/bhuvnaaaaaa/Krishi-Sahay)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 🔗 Project Links & Official Artifacts

| Resource | Direct Link | Description |
|---|---|---|
| **🌐 Working Prototype (Production)** | [**https://krishi-sahay.onrender.com/**](https://krishi-sahay.onrender.com/) | Live full-stack cloud deployment on Render |
| **⚡ High-Speed Cloud Mirror** | [**Launch Mirror Deployment**](https://ais-pre-xa5o4nkunlf5ycfczrsza4-261499016849.asia-southeast1.run.app) | Low-latency Google Cloud Run prototype mirror |
| **📊 Presentation / Pitch Deck (PDF)** | [**Download Pitch Deck Slides (PDF)**](https://storage.googleapis.com/vision-hack2skill-production/innovator/USER01029482/1790789422155-KrishiSahayPitchDeck.pdf) | Official architectural & business deck |
| **🐙 Public GitHub Source** | [**github.com/bhuvnaaaaaa/Krishi-Sahay**](https://github.com/bhuvnaaaaaa/Krishi-Sahay) | Open-source MIT repository |

---

## 🌐 Live Interactive Demonstration

<div align="center">

### **[CLICK HERE TO OPEN LIVE APPLICATION (krishi-sahay.onrender.com)](https://krishi-sahay.onrender.com/)**

<br/>

<!-- Interactive Preview Window Mockup -->
<a href="https://krishi-sahay.onrender.com/" target="_blank" rel="noopener noreferrer">
  <img src="./preview-mockup.svg" alt="Krishi Sahay Live Application Dashboard Preview" width="100%" style="border-radius: 12px; box-shadow: 0 16px 36px rgba(0,0,0,0.35);" />
</a>

<br/>

<sub>💡 <i>Click the preview window above to test real-time Multimodal Vision, Sentinel-2 Spectral bands, Mandi rates, and Vernacular Voice TTS directly in your browser.</i></sub>

</div>

---

## 📑 Table of Contents

- [🔗 Project Links & Official Artifacts](#-project-links--official-artifacts)
- [🌐 Live Interactive Demonstration](#-live-interactive-demonstration)
- [1. System Thesis & Overview](#1-system-thesis--overview)
- [2. System Architecture](#2-system-architecture)
  - [2.1 High-Level Architecture Diagram](#21-high-level-architecture-diagram)
  - [2.2 Data & Request Lifecycle Flow](#22-data--request-lifecycle-flow)
- [3. Deep-Dive Feature Specifications](#3-deep-dive-feature-specifications)
  - [3.1 Multimodal Crop Disease Diagnostics & Organic Rx](#31-multimodal-crop-disease-diagnostics--organic-rx)
  - [3.2 Advanced Agronomist View (Sentinel-2 Spectral Cockpit)](#32-advanced-agronomist-view-sentinel-2-spectral-cockpit)
  - [3.3 Hyperlocal Agro-Climatic Advisory & Soil Stoichiometry](#33-hyperlocal-agro-climatic-advisory--soil-stoichiometry)
  - [3.4 Real-Time APMC Mandi Market Discovery & Arbitrage](#34-real-time-apmc-mandi-market-discovery--arbitrage)
  - [3.5 Transboundary Pest Surveillance Network](#35-transboundary-pest-surveillance-network)
  - [3.6 Voice Krishi Mitra (Conversational AI Companion)](#36-voice-krishi-mitra-conversational-ai-companion)
- [4. Vernacular Localization Matrix](#4-vernacular-localization-matrix)
- [5. Repository Directory & Module Map](#5-repository-directory--module-map)
- [6. API Contracts & Wire Protocol](#6-api-contracts--wire-protocol)
- [7. Resiliency, Edge Cases & Fallback Strategies](#7-resiliency-edge-cases--fallback-strategies)
- [8. Security Architecture & Secret Sanitation](#8-security-architecture--secret-sanitation)
- [9. Engineering Workflow & Local Setup](#9-engineering-workflow--local-setup)
- [10. Production Deployment (Render / Cloud Platforms)](#10-production-deployment-render--cloud-platforms)
- [11. Troubleshooting & FAQ](#11-troubleshooting--faq)
- [12. Standards, Contributing & License](#12-standards-contributing--license)

---

## 1. System Thesis & Overview

Agricultural ecosystems across India and the Global South face three chronic systemic barriers:
1. **Information Asymmetry**: Smallholder farmers are disconnected from scientific soil telemetry and dynamic mandi pricing, leading to exploitation by intermediary brokers.
2. **Delayed Pathology Intervention**: Crop diseases (e.g., Yellow Rust in wheat, Bacterial Blight in rice, Fall Armyworm in maize) escalate rapidly before agricultural extension officers can visit the field.
3. **Linguistic & Digital Literacy Fractures**: Complex agronomic reports are distributed in academic English or Hindi, excluding millions of farmers who speak regional languages or require voice-first assistance.

**Krishi Sahay (कृषि सहाय)** addresses these challenges as an **Open-Source Digital Public Good (DPG)** aligned with India's **AgriStack 2.0** initiative. It pairs Google Cloud Gemini Multimodal Vision with Copernicus Sentinel-2 remote-sensing simulation and a chunked multilingual neural speech synthesis engine to deliver hyper-local, dialect-aware, and actionable farming decisions in seconds.

---

## 2. System Architecture

Krishi Sahay is engineered as a **Unified Full-Stack Monolith**. A single Node.js runtime encapsulates the Vite-compiled React single-page application (SPA) alongside an Express API gateway that handles model orchestration, rate-limiting, and binary audio streaming.

### 2.1 High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                     CLIENT LAYER (Browser / PWA)                                │
├────────────────────────────────┬───────────────────────────────┬────────────────────────────────┤
│       React 19 Core SPA        │    Canvas 2D Radiometric GPU   │    Web Speech & Audio Engine   │
│  - Tailwind CSS v4             │  - Sentinel-2 Band Shader     │  - WebkitSpeechRecognition     │
│  - Reactive Language Ribbon    │  - 10m/20m Ground Resolution  │  - PCM/MP3 Buffer Player       │
│  - Lucide Vector Telemetry     │  - Real-Time Pixel Inspector  │  - Synchronized Audio Waveform │
└────────────────────────────────┴───────────────┬───────────────┴────────────────────────────────┘
                                                 │ HTTPS / Relative Endpoints (/api/*)
                                                 ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                               GATEWAY & RUNTIME LAYER (server.ts)                               │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│  Express 4.x Application Server                                                                 │
│  ├── Static Asset Router      ==> Serves `/dist` (Vite production bundle & index.html fallback)│
│  ├── Security Headers         ==> CORS mitigation, input sanitization, max payload enforcement  │
│  └── API Sub-App Router (`/api/gemini/*`)                                                       │
└───────────────────────────────────────────────┬─────────────────────────────────────────────────┘
                                                │
                 ┌──────────────────────────────┼──────────────────────────────┐
                 ▼                              ▼                              ▼
┌────────────────────────────────┐ ┌─────────────────────────────┐ ┌─────────────────────────────┐
│    Gemini Multimodal Vision    │ │   Gemini Agro-LLM Engine    │ │   Neural Speech Pipeline    │
│  - Crop leaf lesion analysis   │ │ - Weather/Soil integration  │ │ - Multi-chunk text parser   │
│  - Pathogen identification     │ │ - NPK balance calculation   │ │ - Vernacular TTS synthesis  │
│  - Confidence scoring & Rx     │ │ - Conversational Krishi Bot │ │ - Streamed audio/mpeg buffer│
└────────────────────────────────┘ └─────────────────────────────┘ └─────────────────────────────┘
                 │                              │                              │
                 └──────────────────────────────┼──────────────────────────────┘
                                                ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
│                            PERSISTENT PUBLIC GOOD DATA SOURCES & FALLBACKS                      │
├─────────────────────────────────────────────────────────────────────────────────────────────────┤
│  - Offline Verified Agronomic Knowledge Graph (`src/data/agriData.ts`)                          │
│  - Multilingual Vernacular Localization Engine (`src/data/translations.ts`)                     │
│  - APMC National Mandi Rates & Transboundary Surveillance Cache                                 │
└─────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Data & Request Lifecycle Flow

1. **Client Ingestion**: The farmer captures an image or submits a voice query via Web Speech Recognition.
2. **Transport**: The client transmits requests using relative paths (`/api/gemini/diagnose`, `/api/gemini/tts`) to prevent cross-origin resource sharing (CORS) complications.
3. **Server Validation**: `server.ts` validates payload schema, decodes Base64 inputs, and injects the server-side `GEMINI_API_KEY`.
4. **Model Execution**:
   - **Visual Inference**: Gemini Vision analyzes leaf morphology, surface necrosis, and chlorotic patterns.
   - **Text Generation**: The model returns structured JSON with condition names, confidence values, and organic remedies.
   - **Voice Synthesis**: Long-form advice is parsed into natural phoneme chunks, synthesized via neural TTS, and streamed back as Base64 MP3 buffers.
5. **Client Presentation**: The client updates reactive states, draws NDVI pixel indices on an HTML5 Canvas, and triggers synchronized audio playback.

---

## 3. Deep-Dive Feature Specifications

### 3.1 Multimodal Crop Disease Diagnostics & Organic Rx
* **File Reference**: `src/components/CropDiagnosticSection.tsx`
* **Technology**: Multimodal Vision (`@google/genai`), HTML5 File API, Camera Stream.
* **Mechanism**:
  - Ingests user-submitted plant specimens across Wheat, Paddy, Cotton, Tomato, Corn, and pulses.
  - Returns a multi-dimensional diagnostic verdict:
    - **Pathogen Identification**: E.g., *Puccinia striiformis* (Yellow Rust), *Xanthomonas oryzae* (Bacterial Blight), *Spodoptera frugiperda* (Fall Armyworm).
    - **Algorithmic Confidence**: 0% to 100% confidence rating.
    - **Organic Treatment Formulation**: Primary bio-control solutions (e.g., *Trichoderma viride*, sour buttermilk spray, *Azadirachtin* neem extract) minimizing chemical load.
    - **Emergency Chemical Protocol**: Safety-cleared fungicides/pesticides for severe infestations.
  - **Epidemic Broadcast Hook**: Allows farmers to push confirmed contagious outbreaks directly into the National Surveillance Grid.

---

### 3.2 Advanced Agronomist View (Sentinel-2 Spectral Cockpit)
* **File Reference**: `src/components/SpectralCanvasViewer.tsx`
* **Target Users**: Professional Agronomists, KVK Extension Scientists, Precision Farming Managers.
* **Technology**: HTML5 Canvas procedural pixel shader, 0.2ms GPU rendering cycle.
* **Radiometric Spectral Bands Supported**:
  
  | Spectral Band | Formula / Metric | Indicator Range | Agronomic Application |
  |---|---|---|---|
  | **NDVI** | $\frac{\text{NIR} - \text{Red}}{\text{NIR} + \text{Red}}$ | `0.18 – 0.92` | Canopy vigor, biomass density, chlorophyll absorption |
  | **NDWI** | $\frac{\text{NIR} - \text{SWIR}}{\text{NIR} + \text{SWIR}}$ | `-0.10 – 0.65` | Leaf canopy water hydration, pre-visual drought stress |
  | **Soil Moisture** | Hydrological Model (0–30 cm) | `16% – 55%` | Root zone saturation, irrigation timing, drainage |
  | **Thermal Canopy** | Micro-temperature Radiometry | `26°C – 38°C` | Stomatal closure, heat stress, drip lateral blockages |
  | **RGB True Color** | Simulated Optical Sentinel-2 | Natural Visible | Visual parcel verification & furrow boundary cadastre |

* **Interactive HUD & Cadastral Inspection**:
  - Interactive crosshair updates in real time on mouse-move or touch.
  - Pinpoints specific field parcels (e.g., *North Furrow Parcel #402*, *East Drip Sector #403*).
  - Toggles between **10m Sentinel-2 MSI** and **20m SWIR** ground resolution.

---

### 3.3 Hyperlocal Agro-Climatic Advisory & Soil Stoichiometry
* **File Reference**: `src/components/AdvisorySection.tsx`
* **Dynamic Meteorological Telemetry**: Tracks temperature, relative humidity, precipitation probability, wind velocity, and soil moisture across all 28 states and their respective agricultural districts.
* **Fertilizer Balancing Calculator (Soil Health Card)**:
  - Assesses Nitrogen (N), Phosphorus (P), Potassium (K), and Organic Carbon (OC).
  - Provides customized dosage recommendations (e.g., reduce chemical Urea by 25% by substituting with 5 tonnes of Farm Yard Manure + *Azotobacter* bio-culture).
* **Crop Phenology Calendar**: Step-by-step guidance across germination, vegetative tillering, boot leaf, flowering, and physiological maturity.

---

### 3.4 Real-Time APMC Mandi Market Discovery & Arbitrage
* **File Reference**: `src/components/MandiMarketRates.tsx`
* **Price Transparency**: Real-time modal prices, daily ranges (Min/Max), and price direction indicators (`+₹140/Qtl ▲`).
* **Arrival Volumes**: Tracks trade quantities in quintals to help farmers avoid arriving at oversupplied mandis.
* **Inter-State Price Corridors**: Compares pricing between producing and consuming states (e.g., Nashik onion hub vs. Azadpur wholesale market).

---

### 3.5 Transboundary Pest Surveillance Network
* **File Reference**: `src/components/InterStateGridSection.tsx`
* **Epidemic Radar**: Monitors regional movements of high-threat transboundary pests like the **Desert Locust** (*Schistocerca gregaria*), **Fall Armyworm**, and **Pink Bollworm**.
* **Crowdsourced Intelligence**: Integrates alerts broadcasted by individual farmers during photo diagnostics into a national quarantine map.

---

### 3.6 Voice Krishi Mitra (Conversational AI Companion)
* **File Reference**: `src/components/VoiceKrishiMitra.tsx`
* **Voice-First Accessibility**: Continuous two-way conversational interface designed for farmers with limited literacy.
* **Speech-to-Text**: Built using the Web Speech Recognition API (`webkitSpeechRecognition`).
* **Neural Multilingual Speech Synthesis**: Text responses are converted into audio streams using Google's neural multilingual voice synthesis with automatic sentence chunking.

---

## 4. Vernacular Localization Matrix

Krishi Sahay provides 100% synchronized multilingual translation across UI elements, diagnostic reports, and audio narration:

| Language | Native Name | Script | IETF Tag | Speech Synthesis (TTS) | Dialectal Voice Model |
|---|---|---|---|---|---|
| **Hindi** | हिन्दी | Devanagari | `hi-IN` | ✅ Native Neural | Hindi Neural Voice |
| **Telugu** | తెలుగు | Telugu | `te-IN` | ✅ Native Neural | Telugu Regional Voice |
| **Tamil** | தமிழ் | Tamil | `ta-IN` | ✅ Native Neural | Tamil Regional Voice |
| **Marathi** | मराठी | Devanagari | `mr-IN` | ✅ Native Neural | Marathi Regional Voice |
| **Gujarati** | ગુજરાતી | Gujarati | `gu-IN` | ✅ Native Neural | Gujarati Regional Voice |
| **Bengali** | বাংলা | Bengali | `bn-IN` | ✅ Native Neural | Bengali Regional Voice |
| **Kannada** | ಕನ್ನಡ | Kannada | `kn-IN` | ✅ Native Neural | Kannada Regional Voice |
| **Punjabi** | ਪੰਜਾਬੀ | Gurmukhi | `pa-IN` | ✅ Native Neural | Punjabi Regional Voice |
| **English** | English | Latin | `en-IN` | ✅ Native Neural | Indian English Voice |

---

## 5. Repository Directory & Module Map

```
.
├── .env.example                # Template for environment variables (sanitized, safe for git)
├── .gitignore                  # Enforces exclusion of node_modules, dist, and local .env
├── README.md                   # System documentation & technical architecture manual
├── bun.lock                    # Dependency lockfile for Bun runtime
├── index.html                  # HTML5 SPA entry point with responsive viewport
├── metadata.json               # Digital public good capability definitions
├── package.json                # Project dependencies, scripts, and runtime engines
├── server.ts                   # Unified Express application server & API router
├── tsconfig.json               # TypeScript compiler configurations (Strict Mode enabled)
├── vite.config.ts              # Vite bundler configuration with Tailwind v4 & API dev proxy
└── src/
    ├── App.tsx                 # Root component orchestrating navigation, tabs, and global state
    ├── index.css               # Global styles imported via Tailwind CSS v4 (@import "tailwindcss";)
    ├── main.tsx                # React DOM client mounting entry
    ├── components/
    │   ├── AdvisorySection.tsx          # Localized weather, crop calendar, and NPK soil health card
    │   ├── CropDiagnosticSection.tsx    # Multimodal disease diagnostic workspace & camera handler
    │   ├── HeroSection.tsx              # Welcoming landing banner with quick call-to-actions
    │   ├── InterStateGridSection.tsx    # Transboundary pest surveillance & market arbitrage grid
    │   ├── MandiMarketRates.tsx         # APMC live market prices & daily arrival volume monitor
    │   ├── Navbar.tsx                   # Sticky navigation bar with 9-language one-tap selector
    │   ├── SpectralCanvasViewer.tsx     # Sentinel-2 multispectral 5-band pixel shader canvas
    │   └── VoiceKrishiMitra.tsx         # Two-way voice conversational AI companion
    ├── data/
    │   ├── agriData.ts                  # State/District agricultural databases, crops, baseline NDVI
    │   └── translations.ts              # 9-language translation dictionaries for all UI strings
    ├── server/
    │   └── api.ts                       # Backend Express route handlers for Gemini & Speech APIs
    ├── services/
    │   └── apiClient.ts                 # Frontend API client communicating with backend proxy
    └── types/
        └── krishi.ts                    # TypeScript interface definitions (Data contracts & schemas)
```

---

## 6. API Contracts & Wire Protocol

All client-server communication occurs over standard HTTP JSON REST endpoints:

### 1. Multimodal Crop Diagnosis
* **Endpoint**: `POST /api/gemini/diagnose`
* **Request Payload**:
  ```json
  {
    "imageBase64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABA...",
    "cropType": "Wheat",
    "farmerQuestion": "Leaves are turning yellow with powdery stripes",
    "language": "Hindi"
  }
  ```
* **Response Payload (200 OK)**:
  ```json
  {
    "success": true,
    "diagnosis": {
      "crop": "Wheat (गेहूं)",
      "conditionIdentified": "Yellow Rust (Puccinia striiformis)",
      "confidence": 94,
      "severity": "High",
      "symptomsConfirmed": ["Linear yellow-orange pustules", "Premature chlorosis"],
      "organicRemedy": "Spray 5% Neem Seed Kernel Extract (NSKE) or bio-fungicide Trichoderma harzianum @ 5g/L",
      "biologicalFormulation": {
        "name": "Neem Oil Bio-Protectant",
        "ingredients": ["Cold-pressed Neem Oil 1500 ppm", "Liquid Soap Emulsifier"],
        "applicationRate": "5 ml per Litre of water"
      },
      "chemicalEmergency": "Propiconazole 25% EC @ 1ml/L if infection covers > 5% leaf area",
      "voiceSummary": "आपकी गेहूं की फसल में पीला रतुआ का संक्रमण पाया गया है। कृपया तुरंत नीम का काढ़ा छिड़कें।"
    }
  }
  ```

---

### 2. Neural Multilingual Text-to-Speech (TTS)
* **Endpoint**: `POST /api/gemini/tts`
* **Request Payload**:
  ```json
  {
    "text": "మీ పంటలో పసుపు తెగులు నివారణకు వేప నూనె పిచికారీ చేయండి.",
    "language": "Telugu",
    "voice": "Kore"
  }
  ```
* **Response Payload (200 OK)**:
  ```json
  {
    "success": true,
    "audioBase64": "//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAA...",
    "mimeType": "audio/mpeg",
    "language": "Telugu"
  }
  ```

---

### 3. Hyperlocal Agro-Advisory
* **Endpoint**: `POST /api/gemini/advisory`
* **Request Payload**:
  ```json
  {
    "state": "Punjab",
    "district": "Ludhiana",
    "crop": "Wheat",
    "language": "Punjabi"
  }
  ```
* **Response Payload (200 OK)**:
  ```json
  {
    "success": true,
    "advisory": {
      "weatherAlert": "ਅਗਲੇ 48 ਘੰਟਿਆਂ ਵਿੱਚ ਤੇਜ਼ ਹਵਾਵਾਂ ਦੀ ਸੰਭਾਵਨਾ, ਸਿੰਚਾਈ ਰੋਕੋ।",
      "actionableAdvice": "ਕਣਕ ਵਿੱਚ ਨਾਈਟ੍ਰੋਜਨ ਦੀ ਤੀਜੀ ਖੁਰਾਕ ਯੂਰੀਆ ਰਾਹੀਂ ਪਾਓ।",
      "soilRecommendation": "ਮਿੱਟੀ ਵਿੱਚ ਨਮੀ ਦਾ ਪੱਧਰ ਵਧੀਆ ਹੈ, ਯੂਰੀਆ ਦੀ ਵਰਤੋਂ 20% ਘਟਾਓ।"
    }
  }
  ```

---

### 4. Voice Conversational Agent
* **Endpoint**: `POST /api/gemini/chat`
* **Request Payload**:
  ```json
  {
    "message": "टमाटर में फल छेदक इल्ली के लिए जैविक उपचार क्या है?",
    "language": "Hindi",
    "history": []
  }
  ```
* **Response Payload (200 OK)**:
  ```json
  {
    "success": true,
    "reply": "टमाटर के फल छेदक (Helicoverpa armigera) के लिए आप बेसिलस थुरिंजिएंसिस (Bt) 2 ग्राम प्रति लीटर या नीम तेल 5 मिली प्रति लीटर पानी में मिलाकर शाम के समय छिड़कें।"
  }
  ```

---

## 7. Resiliency, Edge Cases & Fallback Strategies

To ensure reliable operation in rural environments with intermittent connectivity or API limits, the system incorporates multi-tier fallbacks:

```
┌────────────────────────────────────────────────────────┐
│               Inference / Action Requested             │
└───────────────────────────┬────────────────────────────┘
                            │
              ┌─────────────▼─────────────┐
              │  Gemini Cloud API Online? │
              └──┬─────────────────────┬──┘
                 │ Yes                 │ No (429 / Quota / Offline)
                 ▼                     ▼
      ┌──────────────────────┐ ┌──────────────────────────────────────┐
      │ Real-time Generative │ │ Graceful Degradation:                │
      │ Output from Cloud    │ │ Local Verified Knowledge Graph       │
      │ Multimodal Models    │ │ (`src/services/apiClient.ts`)        │
      └──────────────────────┘ └──────────────────────────────────────┘
```

1. **API Quota Exhaustion (HTTP 429) Resilience**:
   - If the Gemini API reaches its rate limit or returns a `RESOURCE_EXHAUSTED` error, the backend avoids throwing a 500 error.
   - It seamlessly falls back to pre-computed, ICAR-verified agronomic and pathological data in `src/services/apiClient.ts`, providing accurate diagnoses without downtime.
2. **Audio Voice Fallback**:
   - If the server-side neural speech synthesis API encounters network latency, the client automatically defaults to the browser's native **Web Speech API** (`window.speechSynthesis`).
3. **Crosshair Performance**:
   - The multispectral canvas performs calculations locally via Canvas 2D bitmap manipulation, maintaining 60 FPS without requiring network roundtrips.

---

## 8. Security Architecture & Secret Sanitation

### Architecture Security Principles:
* **Zero Client-Side Secret Leakage**: The Google Gemini API key is never exposed to the browser. All AI invocations pass through server-side proxy routes in `server.ts`.
* **Sanitized File Uploads**: Image inputs are inspected, resized, and validated for proper MIME types before submission to inference models.

### Preventing GitHub Secret Scanning Blocks:
* **Rule**: Never commit private keys to Git.
* **`.env.example`** is committed to source control and contains only placeholders:
  ```env
  GEMINI_API_KEY="MY_GEMINI_API_KEY"
  APP_URL="MY_APP_URL"
  ```
* **`.env`** is ignored by Git via `.gitignore`. Your real key lives here locally:
  ```env
  GEMINI_API_KEY="AIzaSyA..."
  ```

---

## 9. Engineering Workflow & Local Setup

### Prerequisites
* **Node.js**: `v18.0.0` or higher (`node -v`)
* **npm**: `v9.0.0` or higher (`npm -v`)
* **Google Gemini API Key**: Free tier available at [Google AI Studio](https://aistudio.google.com/)

### Step-by-Step Installation

```bash
# 1. Clone the repository
git clone https://github.com/bhuvnaaaaaa/Krishi-Sahay.git
cd Krishi-Sahay

# 2. Install dependencies (use --legacy-peer-deps to avoid esbuild peer conflicts)
npm install --legacy-peer-deps

# 3. Create your local environment configuration
cp .env.example .env

# 4. Open .env and insert your real Gemini API key
# GEMINI_API_KEY="AIzaSy..."

# 5. Start the Vite development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Available Scripts

| Command | Action |
|---|---|
| `npm run dev` | Boots local Vite development server on port 3000 with hot reload. |
| `npm run build` | Compiles TypeScript and runs Vite production bundling into `/dist`. |
| `npm start` | Launches production server (`tsx server.ts`) serving frontend + API. |
| `npm run lint` | Runs TypeScript static analysis (`tsc --noEmit`) to verify types. |

---

## 10. Production Deployment (Render / Cloud Platforms)

Krishi Sahay operates as a **single unified web service**. Both the static React bundle and the Node.js Express API run from the same container.

### Deploying to Render:
1. Navigate to [Render Dashboard](https://dashboard.render.com/) and click **New +** > **Web Service**.
2. Connect your GitHub repository: `bhuvnaaaaaa/Krishi-Sahay`.
3. Configure the build and start settings:
   - **Environment**: `Node`
   - **Branch**: `main`
   - **Build Command**: `npm install --legacy-peer-deps && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
4. Add your **Environment Variables**:
   - `GEMINI_API_KEY`: `your_actual_gemini_api_key_here`
   *(Do NOT add `APP_URL` or `PORT`. Render injects `PORT` automatically).*
5. Click **Deploy Web Service**. Render will build the React SPA and launch `server.ts`. Your application will be live at `https://your-service-name.onrender.com`.

---

## 11. Troubleshooting & FAQ

### Q1: `npm install` fails with `ERESOLVE could not resolve peer dependency`
* **Cause**: Peer dependency conflict between modern Vite 8 and esbuild sub-packages.
* **Resolution**: Run `npm install --legacy-peer-deps` to allow standard dependency resolution.

### Q2: Git rejects push with `GH013: Repository rule violations found (Push cannot contain secrets)`
* **Cause**: Your real Gemini API key was placed in `.env.example` instead of `.env`.
* **Resolution**:
  1. Reset the commit: `git reset HEAD~1`
  2. Restore dummy text in `.env.example`: `GEMINI_API_KEY="MY_GEMINI_API_KEY"`
  3. Ensure your real key is only in `.env` (which is listed in `.gitignore`).
  4. Commit and push:
     ```bash
     git add .env.example README.md
     git commit -m "docs: sanitize configuration and update docs"
     git push origin main
     ```

### Q3: Why is `APP_URL` omitted from Render environment variables?
* The frontend uses relative paths (e.g., `/api/gemini/tts`) to communicate with the backend. Because both frontend and backend run on the same origin, no explicit absolute URL configuration is required.

---

## 12. Standards, Contributing & License

### Code Standards
* **Static Typing**: All components and utility functions require explicit TypeScript types. Avoid using `any`.
* **Commit Conventions**: Follow the [Conventional Commits specification](https://www.conventionalcommits.org/):
  - `feat: add Kannada audio dialect support`
  - `fix: correct NDVI boundary clamping on 20m SWIR band`
  - `docs: update API contracts for diagnosis endpoint`

### License
This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

### Acknowledgements
* **Copernicus Programme**: For Sentinel-2 satellite multi-spectral radiometric specifications.
* **ICAR (Indian Council of Agricultural Research)**: For agronomic best practices and disease remediation methodologies.
* **Google Cloud & Gemini**: For multimodal vision and language understanding capabilities.

---

<div align="center">
  <b>Krishi Sahay (कृषि सहाय)</b> • Digital Public Infrastructure for Indian Agriculture 🇮🇳
</div>
