import React, { useState, useRef, useEffect } from 'react';
import { CropDiseaseDiagnosis, IndianLanguage } from '../types/krishi';
import { FIELD_DIAGNOSTIC_SAMPLES, SUPPORTED_LANGUAGES, DiagnosticSample } from '../data/agriData';
import { TRANSLATIONS } from '../data/translations';
import {
  fetchCropDiagnosis,
  getLocalizedFallbackDiagnosis,
  playAudioWithGeminiOrBrowser,
  stopAudioPlayback,
} from '../services/apiClient';
import {
  Camera,
  Upload,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Share2,
  Leaf,
  ShieldAlert,
  AlertTriangle,
  Globe2,
  CheckCircle2,
  HelpCircle,
  X,
  FileImage,
  RefreshCw,
} from 'lucide-react';

const SAMPLE_TRANSLATIONS: Record<string, Record<string, { crop: string; disease: string }>> = {
  'sample-wheat-rust': {
    Hindi: { crop: 'गेहूं (Wheat)', disease: 'पीला रतुआ (Yellow Rust)' },
    Telugu: { crop: 'గోధుమ (Wheat)', disease: 'పసుపు రస్ట్ (Yellow Rust)' },
    Tamil: { crop: 'கோதுமை (Wheat)', disease: 'மஞ்சள் துரு நோய் (Yellow Rust)' },
    Marathi: { crop: 'गहू (Wheat)', disease: 'पिवळा तांबेरा (Yellow Rust)' },
    Punjabi: { crop: 'ਕਣਕ (Wheat)', disease: 'ਪੀਲੀ ਕੁੰਗੀ (Yellow Rust)' },
    Gujarati: { crop: 'ઘઉં (Wheat)', disease: 'પીળો ગેરુ (Yellow Rust)' },
    Kannada: { crop: 'ಗೋಧಿ (Wheat)', disease: 'ಹಳದಿ ತುಕ್ಕು (Yellow Rust)' },
    Bengali: { crop: 'গম (Wheat)', disease: 'হলুদ মরিচা (Yellow Rust)' },
    English: { crop: 'Wheat', disease: 'Yellow Stripe Rust' },
  },
  'sample-paddy-blight': {
    Hindi: { crop: 'धान (Paddy)', disease: 'जीवाणु पत्ती झुलसा' },
    Telugu: { crop: 'వరి (Paddy)', disease: 'బాక్టీరియల్ బ్లైట్' },
    Tamil: { crop: 'நெல் (Paddy)', disease: 'பாக்டீரியா இலைக்கருகல்' },
    Marathi: { crop: 'भात (Paddy)', disease: 'जिवाणू करपा' },
    Punjabi: { crop: 'ਝੋਨਾ (Paddy)', disease: 'ਬੈਕਟੀਰੀਅਲ ਬਲਾਈਟ' },
    Gujarati: { crop: 'ડાંગર (Paddy)', disease: 'બેક્ટેરિયલ બ્લાઈટ' },
    Kannada: { crop: 'ಭತ್ತ (Paddy)', disease: 'ಬ್ಯಾಕ್ಟೀರಿಯಲ್ ಕರಕಲು' },
    Bengali: { crop: 'ধান (Paddy)', disease: 'ব্যাকটেরিয়াল ব্লাইট' },
    English: { crop: 'Paddy / Rice', disease: 'Bacterial Leaf Blight' },
  },
  'sample-cotton-bollworm': {
    Hindi: { crop: 'कपास (Cotton)', disease: 'गुलाबी सुंडी (Pink Bollworm)' },
    Telugu: { crop: 'పత్తి (Cotton)', disease: 'గులాబీ రంగు పురుగు (Pink Bollworm)' },
    Tamil: { crop: 'பருத்தி (Cotton)', disease: 'இளஞ்சிவப்பு காய்ப்புழு' },
    Marathi: { crop: 'कापूस (Cotton)', disease: 'गुलाबी बोंडअळी' },
    Punjabi: { crop: 'ਕਪਾਹ (Cotton)', disease: 'ਗੁਲਾਬੀ ਸੁੰਡੀ' },
    Gujarati: { crop: 'કપાસ (Cotton)', disease: 'ગુલાબી ઈયળ' },
    Kannada: { crop: 'ಹತ್ತಿ (Cotton)', disease: 'ಗುಲಾಬಿ ಕಾಯಿ ಹುಳು' },
    Bengali: { crop: 'তুলা (Cotton)', disease: 'গোলাপি গুটি পোকা' },
    English: { crop: 'Cotton', disease: 'Pink Bollworm' },
  },
  'sample-tomato-blight': {
    Hindi: { crop: 'टमाटर (Tomato)', disease: 'अगेती झुलसा (Early Blight)' },
    Telugu: { crop: 'టొమాటో (Tomato)', disease: 'ఆకుమచ్చ తెగులు (Early Blight)' },
    Tamil: { crop: 'தக்காளி (Tomato)', disease: 'இலைக்கருகல் நோய்' },
    Marathi: { crop: 'टोमॅटो (Tomato)', disease: 'करपा रोग' },
    Punjabi: { crop: 'ਟਮਾਟਰ (Tomato)', disease: 'ਅਗੇਤਾ ਝੁਲਸਾ' },
    Gujarati: { crop: 'ટામેટા (Tomato)', disease: 'અગેતો સુકારો' },
    Kannada: { crop: 'ಟೊಮೆಟೊ (Tomato)', disease: 'ಎಲೆ ಚುಕ್ಕೆ ರೋಗ' },
    Bengali: { crop: 'টমেটো (Tomato)', disease: 'ঝলসানো রোগ' },
    English: { crop: 'Tomato', disease: 'Early Blight' },
  },
  'sample-maize-armyworm': {
    Hindi: { crop: 'मक्का (Maize)', disease: 'फॉल आर्मीवर्म (Armyworm)' },
    Telugu: { crop: 'మొక్కజొన్న (Maize)', disease: 'కత్తెర పురుగు (Armyworm)' },
    Tamil: { crop: 'சோளம் (Maize)', disease: 'படைப்புழு' },
    Marathi: { crop: 'मका (Maize)', disease: 'लष्करी अळी' },
    Punjabi: { crop: 'ਮੱਕੀ (Maize)', disease: 'ਫਾਲ ਆਰਮੀਵਰਮ' },
    Gujarati: { crop: 'મકાઈ (Maize)', disease: 'લશ્કરી ઈયળ' },
    Kannada: { crop: 'ಜೋಳ (Maize)', disease: 'ಲದ್ದಿ ಹುಳು' },
    Bengali: { crop: 'ভুট্টা (Maize)', disease: 'ফল আর্মিওয়ার্ম' },
    English: { crop: 'Maize / Corn', disease: 'Fall Armyworm' },
  },
};

interface CropDiagnosticSectionProps {
  currentState: string;
  currentDistrict: string;
  currentLanguage: IndianLanguage;
  onLanguageChange?: (lang: IndianLanguage) => void;
  activeAudioKey: string | null;
  setActiveAudioKey: (key: string | null) => void;
  onBroadcastAlert?: (alert: any) => void;
}

export const CropDiagnosticSection: React.FC<CropDiagnosticSectionProps> = ({
  currentState,
  currentDistrict,
  currentLanguage,
  onLanguageChange,
  activeAudioKey,
  setActiveAudioKey,
  onBroadcastAlert,
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.Hindi;
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.name === currentLanguage);

  const [selectedImage, setSelectedImage] = useState<string>(FIELD_DIAGNOSTIC_SAMPLES[0].dataUrl);
  const [cropType, setCropType] = useState<string>('Wheat');
  const [farmerQuestion, setFarmerQuestion] = useState<string>('');
  const [activeSampleId, setActiveSampleId] = useState<string>(FIELD_DIAGNOSTIC_SAMPLES[0].id);

  const [loading, setLoading] = useState<boolean>(false);
  const [diagnosis, setDiagnosis] = useState<CropDiseaseDiagnosis | null>(() =>
    getLocalizedFallbackDiagnosis('Wheat', currentLanguage)
  );
  const [alertBroadcasted, setAlertBroadcasted] = useState<boolean>(false);

  // Speech Recognition state
  const [isListening, setIsListening] = useState<boolean>(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Re-run diagnosis or auto-translate when language changes
  const prevLangRef = useRef<IndianLanguage>(currentLanguage);
  useEffect(() => {
    if (prevLangRef.current !== currentLanguage) {
      prevLangRef.current = currentLanguage;
      // Auto-update diagnosis in newly selected language
      handleRunDiagnosis(currentLanguage);
    }
  }, [currentLanguage]);

  // Stop listening when language changes or unmounts
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  // Handle Speech Recognition toggle
  const toggleListening = () => {
    setSpeechError(null);

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechError(
        currentLanguage === 'Hindi'
          ? 'आपके ब्राउज़र में आवाज़ इनपुट समर्थित नहीं है। कृपया टाइप करें।'
          : 'Voice input not supported on this browser. Please type your query.'
      );
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = currentLangObj?.speechLocale || 'hi-IN';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        setSpeechError(null);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setFarmerQuestion(transcript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setSpeechError('Microphone permission denied. Please allow microphone access in browser.');
        } else {
          setSpeechError('Voice capture ended. You can also type your question.');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setIsListening(false);
      setSpeechError('Could not start microphone. Please type your question.');
    }
  };

  // File upload handler (from gallery / file system)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setSelectedImage(base64String);
      setActiveSampleId('');
      setDiagnosis(null);
      setAlertBroadcasted(false);
    };
    reader.readAsDataURL(file);
  };

  // Sample picker handler
  const handleSelectSample = (sample: DiagnosticSample) => {
    setSelectedImage(sample.dataUrl);
    setCropType(sample.crop);
    setFarmerQuestion(sample.symptoms);
    setActiveSampleId(sample.id);
    setAlertBroadcasted(false);

    // Instantly diagnose selected sample in currentLanguage
    setLoading(true);
    fetchCropDiagnosis({
      imageBase64: sample.dataUrl,
      cropType: sample.crop,
      symptoms: sample.symptoms,
      farmerQuestion: sample.symptoms,
      state: currentState,
      district: currentDistrict,
      language: currentLanguage,
    })
      .then((res) => setDiagnosis(res))
      .catch((err) => console.error('Diagnosis failed:', err))
      .finally(() => setLoading(false));
  };

  // Run Diagnosis with Gemini Multimodal Vision / Real-Time AI Search
  const handleRunDiagnosis = async (targetLang: IndianLanguage = currentLanguage) => {
    if (!selectedImage && !farmerQuestion.trim() && !cropType.trim()) return;

    setLoading(true);
    setAlertBroadcasted(false);
    stopAudioPlayback();
    setActiveAudioKey(null);

    try {
      const result = await fetchCropDiagnosis({
        imageBase64: selectedImage || undefined,
        cropType,
        symptoms: farmerQuestion,
        farmerQuestion,
        state: currentState,
        district: currentDistrict,
        language: targetLang,
      });

      setDiagnosis(result);
    } catch (err) {
      console.error('Diagnosis failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const isThisAudioPlaying = activeAudioKey === 'crop-diagnosis';

  // Speak Diagnosis in chosen language
  const handleSpeakDiagnosis = () => {
    if (!diagnosis) return;

    if (isThisAudioPlaying) {
      stopAudioPlayback();
      setActiveAudioKey(null);
      return;
    }

    const locale = currentLangObj?.speechLocale || 'hi-IN';

    const textToSpeak =
      diagnosis.voiceSummary ||
      `${diagnosis.cropIdentified}: ${diagnosis.diseaseName}. ${diagnosis.immediateContainment}`;

    setActiveAudioKey('crop-diagnosis');
    playAudioWithGeminiOrBrowser(
      textToSpeak,
      currentLanguage,
      locale,
      () => setActiveAudioKey('crop-diagnosis'),
      () => setActiveAudioKey(null)
    );
  };

  const handleBroadcastAlert = () => {
    if (!diagnosis) return;
    setAlertBroadcasted(true);
    if (onBroadcastAlert) {
      onBroadcastAlert({
        id: `alert-${Date.now()}`,
        severity: diagnosis.severity === 'Critical' ? 'Critical' : 'Attention',
        type: `${diagnosis.diseaseName} Outbreak Detection`,
        sourceState: `${currentState} (${currentDistrict})`,
        targetStates: ['Neighboring Districts & Bordering States'],
        timestamp: 'Just now',
        advisory: `Spore drift / pest vector detected for ${diagnosis.cropIdentified}. Biological defense: ${diagnosis.biologicalRegenerativeTreatment?.organicRemedy}`,
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-stone-900 to-teal-950 rounded-3xl p-6 sm:p-8 text-white border border-emerald-800/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.diagnostic_tag}</span>
            </span>
            <span className="text-xs text-stone-300 font-medium">
              • {currentState} ({currentDistrict})
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.diagnostic_title}
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            {t.diagnostic_subtitle}
          </p>
        </div>

        {diagnosis && (
          <button
            onClick={handleSpeakDiagnosis}
            className={`flex items-center space-x-2 px-5 py-3 rounded-2xl font-bold text-sm shadow-md transition cursor-pointer border shrink-0 ${
              isThisAudioPlaying
                ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                : 'bg-emerald-500 text-stone-950 border-emerald-400 hover:bg-emerald-400'
            }`}
          >
            {isThisAudioPlaying ? (
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
        )}
      </div>

      {/* Primary Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Upload, Mic & Question Input (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="font-bold text-sm text-stone-900 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-emerald-700" />
                  <span>{t.upload_box_title}</span>
                </h3>
                <p className="text-[11px] text-stone-500">{t.upload_box_desc}</p>
              </div>

              {/* Hidden file inputs */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="px-2.5 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center gap-1 cursor-pointer transition"
                  title="Snap with Camera"
                >
                  <Camera className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="hidden sm:inline">{t.btn_take_photo}</span>
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-semibold flex items-center gap-1 cursor-pointer transition border border-emerald-200"
                >
                  <Upload className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{t.btn_upload_photo}</span>
                </button>
              </div>
            </div>

            {/* Specimen Viewfinder / Image Preview */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative aspect-4/3 rounded-2xl overflow-hidden bg-stone-900 border-2 border-dashed border-stone-300 hover:border-emerald-500 transition cursor-pointer flex items-center justify-center group"
            >
              {selectedImage ? (
                <>
                  <img
                    src={selectedImage}
                    alt="Crop specimen"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex flex-col justify-end p-4 pointer-events-none">
                    <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                      <FileImage className="w-3.5 h-3.5" />
                      {cropType || 'Crop Specimen Ready'}
                    </span>
                    <span className="text-xs text-stone-200 truncate">
                      {farmerQuestion || 'Click "Analyze" or speak question via mic'}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-stone-900/80 text-white text-[10px] px-2.5 py-1 rounded-full backdrop-blur-xs font-medium">
                    Click to change photo
                  </div>
                </>
              ) : (
                <div className="text-center p-6 space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-stone-800 text-stone-400 flex items-center justify-center mx-auto group-hover:bg-emerald-900 group-hover:text-emerald-300 transition">
                    <Camera className="w-6 h-6" />
                  </div>
                  <p className="text-xs text-stone-300 font-bold">
                    {t.upload_box_desc}
                  </p>
                  <p className="text-[11px] text-stone-400">
                    Works with any crop photo (leaves, stem, pests, weeds, or healthy crop)
                  </p>
                </div>
              )}
            </div>

            {/* Voice & Question Input: Small Farmer Accessibility */}
            <div className="space-y-3 pt-1">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                    <span>{t.mic_label_speak}</span>
                    <span className="text-[10px] text-stone-500 font-normal">
                      ({currentLangObj?.nativeName})
                    </span>
                  </label>

                  {/* Mic Toggle Button */}
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center space-x-1.5 transition cursor-pointer shadow-xs ${
                      isListening
                        ? 'bg-rose-600 text-white animate-pulse ring-2 ring-rose-300'
                        : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                    }`}
                  >
                    {isListening ? (
                      <>
                        <MicOff className="w-3.5 h-3.5" />
                        <span>{t.mic_label_listening}</span>
                      </>
                    ) : (
                      <>
                        <Mic className="w-3.5 h-3.5" />
                        <span>{t.mic_label_speak}</span>
                      </>
                    )}
                  </button>
                </div>

                {isListening && (
                  <div className="p-3 mb-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-center justify-between animate-pulse">
                    <span className="font-semibold flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping"></span>
                      <span>Listening in {currentLangObj?.nativeName}... Speak now</span>
                    </span>
                    <button
                      type="button"
                      onClick={toggleListening}
                      className="text-xs text-rose-700 font-bold hover:underline"
                    >
                      Done
                    </button>
                  </div>
                )}

                {speechError && (
                  <p className="text-[11px] text-rose-600 font-medium mb-1.5">
                    {speechError}
                  </p>
                )}

                <div className="relative">
                  <textarea
                    value={farmerQuestion}
                    onChange={(e) => setFarmerQuestion(e.target.value)}
                    rows={3}
                    placeholder={t.question_input_placeholder}
                    className="w-full bg-[#FAF9F5] border border-stone-300 rounded-xl p-3 text-xs sm:text-sm font-medium text-stone-900 focus:ring-2 focus:ring-[#143D23] focus:border-[#143D23] transition resize-none"
                  ></textarea>
                  {farmerQuestion && (
                    <button
                      type="button"
                      onClick={() => setFarmerQuestion('')}
                      className="absolute top-2 right-2 p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
                      title="Clear text"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Optional Crop Name */}
              <div>
                <label className="block text-stone-700 text-xs font-semibold mb-1">
                  {t.crop_name_optional}
                </label>
                <input
                  type="text"
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                  placeholder={t.crop_name_placeholder}
                  className="w-full bg-[#FAF9F5] border border-stone-300 rounded-xl p-2.5 text-xs sm:text-sm font-medium text-stone-900 focus:ring-2 focus:ring-[#143D23] transition"
                />
              </div>

              {/* Analyze Button */}
              {(() => {
                const canAnalyze = Boolean(selectedImage || farmerQuestion.trim() || cropType.trim());
                return (
                  <button
                    type="button"
                    onClick={() => handleRunDiagnosis()}
                    disabled={loading || !canAnalyze}
                    className="w-full py-3.5 px-5 rounded-2xl bg-[#143D23] hover:bg-[#1E4D2B] text-white font-bold text-sm shadow-md transition cursor-pointer flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Sparkles className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    <span>
                      {loading
                        ? t.btn_analyzing
                        : selectedImage
                        ? `${t.btn_analyze_now} (Google Gemini Vision)`
                        : farmerQuestion.trim()
                        ? 'Diagnose Symptoms via AI / लक्षण विश्लेषण'
                        : t.btn_analyze_now}
                    </span>
                  </button>
                );
              })()}
            </div>
          </div>

          {/* Quick Pre-Loaded Field Samples (Optional Test Bench) */}
          <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-stone-800 flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{t.field_samples_title}</span>
                </h4>
                <p className="text-[11px] text-stone-500">{t.field_samples_subtitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {FIELD_DIAGNOSTIC_SAMPLES.map((sample) => {
                const sampleLoc =
                  SAMPLE_TRANSLATIONS[sample.id]?.[currentLanguage] || {
                    crop: sample.crop,
                    disease: sample.disease,
                  };
                return (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleSelectSample(sample)}
                    className={`text-left p-2 rounded-xl border text-xs transition cursor-pointer flex items-center space-x-2 ${
                      activeSampleId === sample.id
                        ? 'border-[#143D23] bg-emerald-50 shadow-xs ring-1 ring-[#143D23]'
                        : 'border-stone-200 hover:border-emerald-300 bg-stone-50'
                    }`}
                  >
                    <img
                      src={sample.dataUrl}
                      alt={sampleLoc.crop}
                      className="w-9 h-9 rounded-lg object-cover border border-stone-300 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-stone-900 text-xs truncate">{sampleLoc.crop}</p>
                      <p className="text-[10px] text-stone-500 truncate">{sampleLoc.disease}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Diagnosis Results, Immediate Steps, Bio-Recipes (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {diagnosis ? (
            <div className="space-y-5">
              {/* Subtle Real-Time Diagnostic Status */}
              <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl text-xs">
                <div className="flex items-center space-x-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                  </span>
                  <span className="font-bold text-emerald-950">
                    Real-Time Agricultural Diagnostics
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-stone-500 text-[11px] font-medium">
                  <span className="text-emerald-800 font-semibold">ICAR / PAU Grounded</span>
                  <span>•</span>
                  <span>Live Analysis</span>
                </div>
              </div>

              {/* Primary Diagnostic Verdict Card */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                        {t.result_crop_identified}:
                      </span>
                      <span className="text-base font-black text-stone-900">
                        {diagnosis.cropIdentified}
                      </span>
                      {diagnosis.vernacularName && (
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold">
                          {diagnosis.vernacularName}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#143D23]">
                      {diagnosis.diseaseName}
                    </h3>
                    {diagnosis.scientificName && (
                      <p className="text-xs text-stone-500 italic font-mono">
                        Pathogen: {diagnosis.scientificName} ({diagnosis.pathogenType})
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider ${
                        diagnosis.severity === 'Critical'
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : diagnosis.severity === 'Normal'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-100 text-amber-900 border border-amber-200'
                      }`}
                    >
                      {diagnosis.severity}
                    </span>
                    <span className="text-xs font-bold text-stone-600 bg-stone-100 px-2.5 py-1 rounded-full">
                      {diagnosis.confidenceScore}% AI Confidence
                    </span>
                  </div>
                </div>

                {/* Voice Summary Audio Card */}
                {diagnosis.voiceSummary && (
                  <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                        <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Voice Advisory Summary ({currentLangObj?.nativeName}):</span>
                      </span>
                      <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-medium">
                        "{diagnosis.voiceSummary}"
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleSpeakDiagnosis}
                      className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition cursor-pointer flex items-center gap-1.5 ${
                        isThisAudioPlaying
                          ? 'bg-rose-600 text-white animate-pulse'
                          : 'bg-[#143D23] hover:bg-[#1E4D2B] text-white shadow-xs'
                      }`}
                    >
                      {isThisAudioPlaying ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5" />
                          <span>{t.stop_voice}</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>{t.listen_in_lang}</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Confirmed Symptoms */}
                {diagnosis.symptomsConfirmed && diagnosis.symptomsConfirmed.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                      {t.result_condition_identified}:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {diagnosis.symptomsConfirmed.map((sym, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-xl bg-stone-100 text-stone-800 text-xs font-medium border border-stone-200 flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{sym}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Immediate 24-48h Action Plan */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-3">
                <div className="flex items-center space-x-2 border-b border-stone-100 pb-3">
                  <ShieldAlert className="w-5 h-5 text-amber-600" />
                  <h3 className="font-bold text-sm sm:text-base text-stone-900">
                    {t.result_immediate_action}
                  </h3>
                </div>
                <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200/80">
                  <p className="text-xs sm:text-sm text-stone-900 font-medium leading-relaxed">
                    {diagnosis.immediateContainment}
                  </p>
                </div>
              </div>

              {/* Biological Formulation & Organic Remedies */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
                <div className="flex items-center space-x-2 border-b border-stone-100 pb-3">
                  <Leaf className="w-5 h-5 text-emerald-600" />
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-stone-900">
                      {t.result_organic_remedy}
                    </h3>
                    <p className="text-xs text-stone-500">
                      {t.biological_control_title}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                    <span className="font-bold text-emerald-950 text-xs uppercase tracking-wider block mb-1">
                      {t.result_organic_remedy}:
                    </span>
                    <p className="text-xs sm:text-sm text-stone-800 font-medium leading-relaxed">
                      {diagnosis.biologicalRegenerativeTreatment?.organicRemedy}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                      <span className="font-bold text-stone-700 uppercase tracking-wider block">
                        {t.result_application_method}
                      </span>
                      <p className="text-stone-700 leading-relaxed font-medium">
                        {diagnosis.biologicalRegenerativeTreatment?.applicationMethod}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-1">
                      <span className="font-bold text-stone-700 uppercase tracking-wider block">
                        {t.result_soil_remedy}
                      </span>
                      <p className="text-stone-700 leading-relaxed font-medium">
                        {diagnosis.biologicalRegenerativeTreatment?.soilHealthRemedy}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chemical Backup & Next Season Prevention */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>{t.result_chemical_backup}</span>
                  </span>
                  <p className="text-xs text-stone-700 leading-relaxed font-medium">
                    {diagnosis.lowToxicityChemicalBackup}
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-800 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-teal-600" />
                    <span>{t.result_prevention_next_season}</span>
                  </span>
                  <p className="text-xs text-stone-700 leading-relaxed font-medium">
                    {diagnosis.preventionForNextSeason}
                  </p>
                </div>
              </div>

              {/* Transboundary Corridor Outbreak Alert */}
              {diagnosis.crossStateSpreadAlert?.triggerWarning && (
                <div className="bg-gradient-to-r from-stone-900 to-emerald-950 text-stone-100 rounded-3xl p-6 border border-emerald-700/50 shadow-lg space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center space-x-2">
                      <Share2 className="w-4 h-4 text-amber-400" />
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                        {t.result_transboundary_alert}
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-400 font-mono">
                      Corridor: {diagnosis.crossStateSpreadAlert.corridorAffected}
                    </span>
                  </div>

                  <p className="text-xs text-stone-300 leading-relaxed">
                    {diagnosis.crossStateSpreadAlert.alertMessage}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={handleBroadcastAlert}
                      disabled={alertBroadcasted}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center space-x-2 ${
                        alertBroadcasted
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
                          : 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md'
                      }`}
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>
                        {alertBroadcasted
                          ? t.result_broadcasted_success
                          : t.result_broadcast_btn}
                      </span>
                    </button>
                    <span className="text-[11px] text-stone-400 font-medium">
                      Krishisahay Cooperative DPI
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 border border-stone-200 shadow-sm text-center space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto">
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-stone-900 text-base sm:text-lg">
                {t.empty_specimen_prompt}
              </h3>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                {t.upload_box_desc}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
