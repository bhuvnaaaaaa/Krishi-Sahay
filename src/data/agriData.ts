import { IndianLanguage, LanguageOption, RegionalCorridor, StateData } from '../types/krishi';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', speechLocale: 'en-IN' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', speechLocale: 'hi-IN' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', speechLocale: 'mr-IN' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', speechLocale: 'te-IN' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', speechLocale: 'ta-IN' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', speechLocale: 'pa-IN' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', speechLocale: 'kn-IN' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', speechLocale: 'bn-IN' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', speechLocale: 'gu-IN' },
];

export const STATES_DATA: Record<string, StateData> = {
  Punjab: {
    name: 'Punjab',
    districts: ['Ludhiana', 'Amritsar', 'Bathinda', 'Gurdaspur', 'Patiala', 'Jalandhar', 'Sangrur', 'Firozpur'],
    agroZones: ['Trans-Gangetic Plains', 'Sub-Mountain Undulating Zone', 'Central Plain Zone', 'South-Western Zone'],
    majorCrops: ['Wheat', 'Basmati Rice', 'Cotton', 'Mustard', 'Maize', 'Potato'],
    soilBaseline: { n: 160, p: 24, k: 280, ph: 7.6, organicCarbon: 0.45 },
    satelliteBaseline: { ndvi: 0.72, ndwi: 0.45, soilMoisture: 38, canopyTemp: 26 },
  },
  Haryana: {
    name: 'Haryana',
    districts: ['Karnal', 'Hisar', 'Ambala', 'Sirsa', 'Rohtak', 'Kurukshetra', 'Fatehabad', 'Jind'],
    agroZones: ['Eastern Semi-Arid Zone', 'Western Dry Zone', 'Northern Plain Zone'],
    majorCrops: ['Wheat', 'Paddy', 'Mustard', 'Cotton', 'Pearl Millet (Bajra)', 'Sugarcane'],
    soilBaseline: { n: 175, p: 20, k: 260, ph: 7.8, organicCarbon: 0.42 },
    satelliteBaseline: { ndvi: 0.68, ndwi: 0.41, soilMoisture: 35, canopyTemp: 27 },
  },
  Maharashtra: {
    name: 'Maharashtra',
    districts: ['Nashik', 'Pune', 'Nanded', 'Yavatmal', 'Ahmednagar', 'Solapur', 'Aurangabad', 'Kolhapur', 'Amravati'],
    agroZones: ['Deccan Semi-Arid Plateau', 'Western Ghat Highland', 'Vidarbha Black Soil Zone', 'Marathwada Rainfed Basin'],
    majorCrops: ['Soybean', 'Cotton', 'Sugarcane', 'Pigeonpea (Tur)', 'Gram (Chana)', 'Onion', 'Pomegranate', 'Jowar'],
    soilBaseline: { n: 150, p: 18, k: 320, ph: 7.9, organicCarbon: 0.48 },
    satelliteBaseline: { ndvi: 0.61, ndwi: 0.32, soilMoisture: 28, canopyTemp: 31 },
  },
  Karnataka: {
    name: 'Karnataka',
    districts: ['Belagavi', 'Bijapur (Vijayapura)', 'Dharwad', 'Shimoga', 'Raichur', 'Tumakuru', 'Mandya', 'Gulbarga (Kalaburagi)'],
    agroZones: ['Northern Dry Zone', 'Southern Dry Zone', 'Central Dry Zone', 'Hilly High Rainfall Zone'],
    majorCrops: ['Ragi (Finger Millet)', 'Maize', 'Cotton', 'Pigeonpea (Tur)', 'Sugarcane', 'Groundnut', 'Sunflower', 'Coffee'],
    soilBaseline: { n: 145, p: 21, k: 290, ph: 6.8, organicCarbon: 0.52 },
    satelliteBaseline: { ndvi: 0.65, ndwi: 0.36, soilMoisture: 31, canopyTemp: 29 },
  },
  'Uttar Pradesh': {
    name: 'Uttar Pradesh',
    districts: ['Varanasi', 'Kanpur', 'Meerut', 'Gorakhpur', 'Bareilly', 'Aligarh', 'Prayagraj', 'Ayodhya', 'Jhansi'],
    agroZones: ['Western Alluvial Plain', 'Central Plain Zone', 'Bundelkhand Rainfed Plateau', 'Eastern Alluvial Sub-Zone'],
    majorCrops: ['Wheat', 'Paddy', 'Sugarcane', 'Potato', 'Mustard', 'Pigeonpea (Arhar)', 'Lentil'],
    soilBaseline: { n: 180, p: 22, k: 250, ph: 7.5, organicCarbon: 0.40 },
    satelliteBaseline: { ndvi: 0.69, ndwi: 0.44, soilMoisture: 36, canopyTemp: 28 },
  },
  'Madhya Pradesh': {
    name: 'Madhya Pradesh',
    districts: ['Indore', 'Ujjain', 'Bhopal', 'Hoshangabad (Narmadapuram)', 'Jabalpur', 'Sehore', 'Dewas', 'Vidisha'],
    agroZones: ['Malwa Plateau', 'Narmada Valley', 'Vindhyan Scarpland', 'Satpura Plateau'],
    majorCrops: ['Soybean', 'Wheat (Sharbati)', 'Gram (Chana)', 'Mustard', 'Maize', 'Garlic', 'Coriander'],
    soilBaseline: { n: 155, p: 19, k: 310, ph: 7.7, organicCarbon: 0.46 },
    satelliteBaseline: { ndvi: 0.63, ndwi: 0.35, soilMoisture: 30, canopyTemp: 30 },
  },
  'Andhra Pradesh': {
    name: 'Andhra Pradesh',
    districts: ['Guntur', 'Krishna', 'Kurnool', 'Anantapur', 'East Godavari', 'West Godavari', 'Chittoor'],
    agroZones: ['Krishna-Godavari Coastal Delta', 'Rayalaseema Arid Scarpland', 'North Coastal Alluvial Zone'],
    majorCrops: ['Paddy', 'Chilli', 'Cotton', 'Groundnut', 'Tobacco', 'Black Gram', 'Mango'],
    soilBaseline: { n: 165, p: 26, k: 275, ph: 7.3, organicCarbon: 0.50 },
    satelliteBaseline: { ndvi: 0.66, ndwi: 0.42, soilMoisture: 34, canopyTemp: 31 },
  },
  'Tamil Nadu': {
    name: 'Tamil Nadu',
    districts: ['Thanjavur', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Erode', 'Tirunelveli', 'Salem'],
    agroZones: ['Cauvery Delta Basin', 'Western Rainfed Zone', 'Southern Dry Coastal Zone', 'High Altitude Nilgiri Zone'],
    majorCrops: ['Paddy', 'Sugarcane', 'Cotton', 'Banana', 'Tapioca', 'Groundnut', 'Millets (Kambu/Ragi)'],
    soilBaseline: { n: 170, p: 25, k: 285, ph: 7.1, organicCarbon: 0.54 },
    satelliteBaseline: { ndvi: 0.67, ndwi: 0.39, soilMoisture: 33, canopyTemp: 32 },
  },
  Rajasthan: {
    name: 'Rajasthan',
    districts: ['Sri Ganganagar', 'Kota', 'Jaipur', 'Alwar', 'Bikaner', 'Barmer', 'Jodhpur', 'Nagaur'],
    agroZones: ['Hyper Arid Western Zone', 'Transitional Plain of Inland Drainage', 'Semi-Arid Eastern Plain', 'Humid South Eastern Plain'],
    majorCrops: ['Mustard', 'Pearl Millet (Bajra)', 'Wheat', 'Guar', 'Gram', 'Cumin (Jeera)', 'Isabgol'],
    soilBaseline: { n: 130, p: 15, k: 240, ph: 8.2, organicCarbon: 0.28 },
    satelliteBaseline: { ndvi: 0.48, ndwi: 0.18, soilMoisture: 18, canopyTemp: 34 },
  },
  Gujarat: {
    name: 'Gujarat',
    districts: ['Rajkot', 'Junagadh', 'Surat', 'Mehsana', 'Banaskantha', 'Vadodara', 'Amreli', 'Bhavnagar'],
    agroZones: ['Saurashtra Coastal Plateau', 'North Gujarat Semi-Arid', 'Middle Gujarat Fertile Alluvial', 'South Gujarat Heavy Rainfall'],
    majorCrops: ['Cotton', 'Groundnut', 'Castor', 'Cumin', 'Wheat', 'Sesame', 'Tobacco'],
    soilBaseline: { n: 148, p: 20, k: 300, ph: 7.8, organicCarbon: 0.41 },
    satelliteBaseline: { ndvi: 0.58, ndwi: 0.29, soilMoisture: 26, canopyTemp: 32 },
  },
  'West Bengal': {
    name: 'West Bengal',
    districts: ['Bardhaman', 'Nadia', 'Hooghly', 'Murshidabad', 'South 24 Parganas', 'Bankura', 'Malda'],
    agroZones: ['Lower Gangetic Plain', 'Coastal Saline Zone', 'Terai Flood Basin', 'Red and Laterite Undulating Zone'],
    majorCrops: ['Aman Paddy', 'Boro Paddy', 'Jute', 'Potato', 'Mustard', 'Vegetables', 'Mango'],
    soilBaseline: { n: 190, p: 28, k: 260, ph: 6.4, organicCarbon: 0.65 },
    satelliteBaseline: { ndvi: 0.74, ndwi: 0.52, soilMoisture: 42, canopyTemp: 28 },
  },
  Bihar: {
    name: 'Bihar',
    districts: ['Patna', 'Muzaffarpur', 'Gaya', 'Bhagalpur', 'Samastipur', 'Nalanda', 'Rohtas', 'Purnia'],
    agroZones: ['North-West Alluvial Plains', 'North-East Flood Plains', 'South Bihar Alluvial Plains'],
    majorCrops: ['Paddy', 'Wheat', 'Maize (Kharif/Rabi)', 'Lentil (Masoor)', 'Sugarcane', 'Jute', 'Makhana'],
    soilBaseline: { n: 172, p: 23, k: 245, ph: 7.2, organicCarbon: 0.44 },
    satelliteBaseline: { ndvi: 0.71, ndwi: 0.48, soilMoisture: 40, canopyTemp: 29 },
  },
};

// SVG-based realistic diagnostic field images for 1-click testing
const createSvgDataUrl = (title: string, color: string, spotColor: string, patternType: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#1c1917" />
        <stop offset="100%" stop-color="#292524" />
      </linearGradient>
      <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${color}" />
        <stop offset="70%" stop-color="#2e7d32" />
        <stop offset="100%" stop-color="#1b5e20" />
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="8" stdDeviation="6" flood-opacity="0.5"/>
      </filter>
    </defs>
    <rect width="400" height="400" fill="url(#bg)"/>
    <!-- Leaf Silhouette -->
    <path d="M 200 40 C 290 80, 340 210, 230 330 C 200 370, 190 380, 190 380 C 190 380, 180 370, 150 330 C 40 210, 90 80, 200 40 Z" fill="url(#leafGrad)" filter="url(#shadow)"/>
    <!-- Leaf Central Vein -->
    <path d="M 200 40 Q 195 200 190 380" stroke="#a5d6a7" stroke-width="4" fill="none" opacity="0.7"/>
    <!-- Lateral Veins -->
    <path d="M 197 100 Q 250 120 290 140" stroke="#a5d6a7" stroke-width="2" fill="none" opacity="0.5"/>
    <path d="M 197 150 Q 260 170 310 200" stroke="#a5d6a7" stroke-width="2" fill="none" opacity="0.5"/>
    <path d="M 197 210 Q 250 240 280 270" stroke="#a5d6a7" stroke-width="2" fill="none" opacity="0.5"/>
    <path d="M 197 100 Q 140 120 100 140" stroke="#a5d6a7" stroke-width="2" fill="none" opacity="0.5"/>
    <path d="M 197 150 Q 130 170 80 200" stroke="#a5d6a7" stroke-width="2" fill="none" opacity="0.5"/>
    <path d="M 197 210 Q 140 240 110 270" stroke="#a5d6a7" stroke-width="2" fill="none" opacity="0.5"/>

    <!-- Disease Lesions & Spots according to pattern -->
    ${
      patternType === 'rust'
        ? `
      <!-- Linear yellow rust pustules -->
      <g fill="${spotColor}" stroke="#b45309" stroke-width="0.5">
        <rect x="180" y="110" width="8" height="42" rx="4" />
        <rect x="220" y="130" width="7" height="50" rx="3.5" />
        <rect x="240" y="170" width="9" height="60" rx="4.5" />
        <rect x="150" y="140" width="8" height="45" rx="4" />
        <rect x="135" y="195" width="8" height="55" rx="4" />
        <rect x="205" y="210" width="8" height="60" rx="4" />
        <rect x="175" y="240" width="7" height="48" rx="3.5" />
      </g>
    `
        : patternType === 'blight'
        ? `
      <!-- Concentric target-board necrotic lesions -->
      <g fill="${spotColor}" opacity="0.85">
        <circle cx="160" cy="180" r="32" />
        <circle cx="160" cy="180" r="22" fill="#451a03" />
        <circle cx="160" cy="180" r="10" fill="#1c1917" />
        <circle cx="240" cy="220" r="26" />
        <circle cx="240" cy="220" r="16" fill="#451a03" />
        <circle cx="190" cy="270" r="20" />
        <circle cx="220" cy="130" r="18" />
        <path d="M 280 180 Q 320 220 290 260 Z" fill="#78350f" opacity="0.9"/>
      </g>
    `
        : patternType === 'pest'
        ? `
      <!-- Chewed holes & caterpillar frass -->
      <g>
        <circle cx="170" cy="160" r="22" fill="#1c1917"/>
        <circle cx="230" cy="210" r="28" fill="#1c1917"/>
        <circle cx="190" cy="260" r="18" fill="#1c1917"/>
        <!-- Larva silhouette -->
        <path d="M 220 180 C 230 160, 260 170, 270 190 C 275 200, 265 210, 250 200 Z" fill="#eab308" stroke="#713f12" stroke-width="2"/>
        <circle cx="265" cy="190" r="2" fill="#000"/>
        <!-- Frass specks -->
        <circle cx="215" cy="195" r="3" fill="#451a03"/>
        <circle cx="240" cy="245" r="4" fill="#451a03"/>
        <circle cx="165" cy="190" r="3" fill="#451a03"/>
      </g>
    `
        : `
      <!-- Tikka leaf spot circular halo -->
      <g fill="${spotColor}">
        <circle cx="160" cy="150" r="16" stroke="#facc15" stroke-width="4"/>
        <circle cx="230" cy="170" r="20" stroke="#facc15" stroke-width="5"/>
        <circle cx="180" cy="220" r="14" stroke="#facc15" stroke-width="3"/>
        <circle cx="225" cy="260" r="18" stroke="#facc15" stroke-width="4"/>
        <circle cx="140" cy="240" r="12" stroke="#facc15" stroke-width="3"/>
      </g>
    `
    }

    <!-- Label badge -->
    <rect x="20" y="340" width="360" height="42" rx="8" fill="rgba(0,0,0,0.75)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
    <text x="200" y="366" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">
      ${title}
    </text>
  </svg>`;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
};

export interface DiagnosticSample {
  id: string;
  crop: string;
  disease: string;
  symptoms: string;
  severity: 'Critical' | 'Moderate' | 'Mild';
  dataUrl: string;
}

export const FIELD_DIAGNOSTIC_SAMPLES: DiagnosticSample[] = [
  {
    id: 'sample-wheat-rust',
    crop: 'Wheat',
    disease: 'Yellow Stripe Rust (Puccinia striiformis)',
    symptoms: 'Linear yellow-orange powdery pustules along leaf veins, chlorosis of flag leaf',
    severity: 'Critical',
    dataUrl: createSvgDataUrl('Wheat - Yellow Stripe Rust (Puccinia)', '#4ade80', '#fbbf24', 'rust'),
  },
  {
    id: 'sample-paddy-blight',
    crop: 'Paddy / Basmati Rice',
    disease: 'Bacterial Leaf Blight (Xanthomonas oryzae)',
    symptoms: 'Water-soaked wavy lesions from leaf tip downward, turning yellow-white then grayish brown',
    severity: 'Critical',
    dataUrl: createSvgDataUrl('Paddy - Bacterial Leaf Blight', '#22c55e', '#b45309', 'blight'),
  },
  {
    id: 'sample-cotton-bollworm',
    crop: 'Cotton',
    disease: 'Pink Bollworm (Pectinophora gossypiella)',
    symptoms: 'Rosetted flowers, bore holes in bolls with larval entry frass, staining of lint',
    severity: 'Critical',
    dataUrl: createSvgDataUrl('Cotton - Pink Bollworm Larval Attack', '#16a34a', '#78350f', 'pest'),
  },
  {
    id: 'sample-tomato-blight',
    crop: 'Tomato',
    disease: 'Early Blight (Alternaria solani)',
    symptoms: 'Concentric dark brown rings resembling target-boards on lower leaves with yellow halo',
    severity: 'Moderate',
    dataUrl: createSvgDataUrl('Tomato - Early Blight (Alternaria)', '#22c55e', '#78350f', 'blight'),
  },
  {
    id: 'sample-maize-armyworm',
    crop: 'Maize / Corn',
    disease: 'Fall Armyworm (Spodoptera frugiperda)',
    symptoms: 'Ragged leaves with shot-holes and moist sawdust-like frass inside the plant whorl',
    severity: 'Critical',
    dataUrl: createSvgDataUrl('Maize - Fall Armyworm (FAW) Infestation', '#15803d', '#92400e', 'pest'),
  },
  {
    id: 'sample-groundnut-tikka',
    crop: 'Groundnut',
    disease: 'Tikka Leaf Spot (Cercospora arachidicola)',
    symptoms: 'Circular dark spots surrounded by prominent yellow chlorotic halos on leaflets',
    severity: 'Moderate',
    dataUrl: createSvgDataUrl('Groundnut - Tikka Leaf Spot', '#16a34a', '#451a03', 'spot'),
  },
];

export const INITIAL_CORRIDORS: RegionalCorridor[] = [
  {
    id: 'corridor-north',
    name: 'Indo-Gangetic Agro-Ecological Corridor',
    states: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Rajasthan'],
    primaryCrops: ['Wheat', 'Basmati Paddy', 'Mustard', 'Cotton'],
    focusAreas: ['Stubble Bio-Decomposer Logistics', 'Groundwater Depletion Balancing', 'Transboundary Locust & Yellow Rust Surveillance'],
    activeAlerts: [
      {
        id: 'alert-1',
        severity: 'Critical',
        type: 'Yellow Rust Spore Drift',
        sourceState: 'Punjab (Gurdaspur)',
        targetStates: ['Haryana (Ambala)', 'Western UP'],
        timestamp: '2 hours ago',
        advisory: 'Favorable morning fog conditions detected. Deploy prophylactic Trichoderma viride or propiconazole barrier.',
      },
      {
        id: 'alert-2',
        severity: 'Attention',
        type: 'Straw Biomass Exchange Node',
        sourceState: 'Punjab (Ludhiana)',
        targetStates: ['Rajasthan (Bikaner)'],
        timestamp: '6 hours ago',
        advisory: '4,200 metric tonnes of baled paddy straw matched with cattle fodder requirement in western Rajasthan.',
      },
    ],
    sharedModels: [
      { name: 'ICAR-Bhuvan Soil Moisture Fusion v2.4', version: '2.4', accuracy: '93.2%', downloads: 1420 },
      { name: 'PAU-HAU Stubble Dispersion AI', version: '1.8', accuracy: '91.5%', downloads: 980 },
    ],
  },
  {
    id: 'corridor-deccan',
    name: 'Deccan Semi-Arid Climate Resilience Corridor',
    states: ['Maharashtra', 'Karnataka', 'Telangana', 'Andhra Pradesh'],
    primaryCrops: ['Soybean', 'Cotton', 'Pigeonpea (Tur)', 'Pearl Millet (Bajra)', 'Sugarcane'],
    focusAreas: ['Godavari-Krishna Basin Aquifer Recharge', 'Pink Bollworm Pheromone Trapping Grid', 'Millet Intercropping Carbon Credits'],
    activeAlerts: [
      {
        id: 'alert-3',
        severity: 'Critical',
        type: 'Pink Bollworm Border Emergence',
        sourceState: 'Maharashtra (Nanded / Yavatmal)',
        targetStates: ['Telangana (Adilabad)', 'Karnataka (Bidar)'],
        timestamp: '3 hours ago',
        advisory: 'Pheromone trap counts exceeded economic threshold level (>8 moths/trap/night). Install light traps and release Trichogramma chilonis bio-parasitoids.',
      },
      {
        id: 'alert-4',
        severity: 'Normal',
        type: 'Shared Basin Micro-Irrigation Quota',
        sourceState: 'Karnataka (Bijapur)',
        targetStates: ['Maharashtra (Solapur)'],
        timestamp: '12 hours ago',
        advisory: 'Canal release scheduled for 36 hours. Recommended drip fertigation slot for pomegranate and pulses.',
      },
    ],
    sharedModels: [
      { name: 'CRIDA Semi-Arid Drought Forecaster', version: '3.1', accuracy: '94.8%', downloads: 2150 },
      { name: 'MPKV Cotton Pest Trap AI', version: '2.0', accuracy: '89.6%', downloads: 1670 },
    ],
  },
  {
    id: 'corridor-coastal',
    name: 'Eastern Delta & Coastal Salinity Corridor',
    states: ['West Bengal', 'Odisha', 'Andhra Pradesh', 'Tamil Nadu'],
    primaryCrops: ['Paddy', 'Jute', 'Pulses', 'Oilseeds', 'Fisheries'],
    focusAreas: ['Cyclone Early Evacuation & Seed Banks', 'Salinity-Resistant Rice Propagation', 'Methane Abatement in Wetland Paddy'],
    activeAlerts: [
      {
        id: 'alert-5',
        severity: 'Attention',
        type: 'Saline Ingress Alert',
        sourceState: 'Odisha (Jagatsinghpur)',
        targetStates: ['West Bengal (Sundarbans)'],
        timestamp: '5 hours ago',
        advisory: 'High tidal spring cycle detected. Reinforce bunds and apply gypsum to saline-affected field borders.',
      },
    ],
    sharedModels: [
      { name: 'NRRI Saline Rice Phenology Model', version: '1.5', accuracy: '92.1%', downloads: 820 },
    ],
  },
];
