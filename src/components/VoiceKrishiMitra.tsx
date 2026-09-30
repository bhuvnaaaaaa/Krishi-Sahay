import React, { useState, useEffect, useRef } from 'react';
import { IndianLanguage } from '../types/krishi';
import { SUPPORTED_LANGUAGES } from '../data/agriData';
import { TRANSLATIONS } from '../data/translations';
import {
  playAudioWithGeminiOrBrowser,
  stopAudioPlayback,
} from '../services/apiClient';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Bot,
  HelpCircle,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Globe2,
} from 'lucide-react';

interface VoiceKrishiMitraProps {
  currentLanguage: IndianLanguage;
  currentState: string;
  currentDistrict: string;
  onLanguageChange?: (lang: IndianLanguage) => void;
  activeAudioKey: string | null;
  setActiveAudioKey: (key: string | null) => void;
}

interface QnAPair {
  id: string;
  question: string;
  language: string;
  answer: string;
  audioText: string;
}

// Hyperlocal seed questions in all 9 Indian vernacular languages
const LANGUAGE_SEEDS: Record<string, QnAPair[]> = {
  Hindi: [
    {
      id: 'hi-1',
      question: 'गेहूं में पीलापन आ रहा है, क्या यह रतुआ है या नाइट्रोजन की कमी?',
      language: 'Hindi',
      answer:
        'यदि पत्ती पर हाथ फेरने पर पीला पाउडर उंगलियों पर लगता है, तो यह पीला रतुआ (Yellow Rust) कवक है। तुरंत 5 लीटर खट्टी छाछ और ट्राइकोडर्मा का पर्णीय छिड़काव करें। यदि पाउडर नहीं है और पूरी पत्ती समान रूप से हल्की पीली है, तो यह नाइट्रोजन की कमी है—इसके लिए 2% नैनो-यूरिया या जीवामृत का छिड़काव करें।',
      audioText:
        'गेहूं में पीलापन जांचने के लिए पत्ती पर उंगली फेरें। पीला पाउडर आए तो रतुआ है, तुरंत खट्टी छाछ छिड़कें। यदि पाउडर नहीं है, तो नैनो यूरिया या जीवामृत का छिड़काव करें।',
    },
    {
      id: 'hi-2',
      question: 'कपास में गुलाबी सुंडी (Pink Bollworm) की रोकथाम कैसे करें?',
      language: 'Hindi',
      answer:
        'कपास में गुलाबी सुंडी के लिए प्रति एकड़ 5 फेरोमोन ट्रैप लगाएं। यदि 8 से अधिक पतंगे प्रति ट्रैप मिलें, तो ट्राइकोग्रामा चिलोनीस परजीवी ट्राइको-कार्ड लगाएं और 5% नीम अर्क का छिड़काव करें।',
      audioText:
        'कपास में गुलाबी सुंडी रोकने के लिए प्रति एकड़ 5 फेरोमोन ट्रैप लगाएं और नीम अर्क का छिड़काव करें।',
    },
  ],
  Marathi: [
    {
      id: 'mr-1',
      question: 'सोयाबीन पिकावर खोडकिडीचा प्रादुर्भाव रोखण्यासाठी काय करावे?',
      language: 'Marathi',
      answer:
        'सोयाबीनवरील खोडकिडीच्या नियंत्रणासाठी सुरुवातीला 5% निंबोळी अर्काची फवारणी करावी. प्रादुर्भाव वाढल्यास ट्रायकोडर्मा किंवा बायो-पेस्टिसाइडचा वापर करावा व कीडग्रस्त झाडांचे अवशेष नष्ट करावेत.',
      audioText:
        'सोयाबीनवरील खोडकिडीच्या नियंत्रणासाठी सुरुवातीला 5 टक्के निंबोळी अर्काची फवारणी करावी आणि ट्रायकोडर्मा वापरावा.',
    },
    {
      id: 'mr-2',
      question: 'जिवामृत बनवण्याची सोपी व अचूक पद्धत कोणती?',
      language: 'Marathi',
      answer:
        '200 लिटर पाण्यासाठी: 10 किलो देशी गाईचे शेण, 10 लिटर गोमूत्र, 2 किलो गूळ, 2 किलो बेसन व मूठभर बांधाची माती एकत्र मिसळा. 48 तास सावलीत दररोज सकाळी-संध्याकाळी काठीने ढवळा. जीवामृत तयार होईल.',
      audioText:
        'जिवामृत बनवण्यासाठी 10 किलो शेण, 10 लिटर गोमूत्र, 2 किलो गूळ आणि बेसन 200 लिटर पाण्यात मिसळून दोन दिवस सावलीत ठेवा.',
    },
  ],
  Punjabi: [
    {
      id: 'pa-1',
      question: 'ਕਣਕ ਵਿੱਚ ਪੀਲੀ ਕੁੰਗੀ ਦੀ ਰੋਕਥਾਮ ਲਈ ਦੇਸੀ ਨੁਸਖਾ ਦੱਸੋ।',
      language: 'Punjabi',
      answer:
        'ਪੀਲੀ ਕੁੰਗੀ ਦੀ ਜਾਂਚ ਲਈ ਪੱਤੇ ਤੇ ਉਂਗਲ ਫੇਰੋ। ਜੇਕਰ ਪੀਲਾ ਪਾਊਡਰ ਲੱਗੇ ਤਾਂ 5 ਲੀਟਰ ਖੱਟੀ ਲੱਸੀ ਨੂੰ ਤਾਂਬੇ ਦੇ ਭਾਂਡੇ ਵਿੱਚ ਰੱਖ ਕੇ 100 ਲੀਟਰ ਪਾਣੀ ਵਿੱਚ ਮਿਲਾ ਕੇ ਛਿੜਕਾਅ ਕਰੋ ਜਾਂ ਟ੍ਰਾਈਕੋਡਰਮਾ ਦੀ ਵਰਤੋਂ ਕਰੋ।',
      audioText:
        'ਪੀਲੀ ਕੁੰਗੀ ਰੋਕਣ ਲਈ 5 ਲੀਟਰ ਖੱਟੀ ਲੱਸੀ ਤਾਂਬੇ ਦੇ ਬਰਤਨ ਵਿੱਚ ਰੱਖ ਕੇ ਛਿੜਕਾਅ ਕਰੋ ਜਾਂ ਟ੍ਰਾਈਕੋਡਰਮਾ ਵਰਤੋ।',
    },
  ],
  Telugu: [
    {
      id: 'te-1',
      question: 'వరి పంటలో అగ్గి తెగులు నివారణకు జీవ రసాయన పద్ధతులు తెలపండి.',
      language: 'Telugu',
      answer:
        'వరిలో అగ్గి తెగులు (Blast) నివారణకు ఎకరాకు 2.5 కిలోల సూడోమోనాస్ ఫ్లోరోసెన్స్ 100 లీటర్ల నీటిలో కలిపి పిచికారీ చేయండి. రసాయన యూరియా వినియోగాన్ని తగ్గించండి.',
      audioText:
        'వరిలో అగ్గి తెగులు నివారణకు సూడోమోనాస్ ఫ్లోరోసెన్స్ పిచికారీ చేయండి మరియు యూరియా తగ్గించండి.',
    },
  ],
  Tamil: [
    {
      id: 'ta-1',
      question: 'நெல் பயிரில் பூச்சி தாக்குதலை கட்டுப்படுத்த இயற்கை வழிமுறைகள் என்ன?',
      language: 'Tamil',
      answer:
        'நெல் பயிரில் இலை சுருட்டுப் புழுவை கட்டுப்படுத்த 5% வேப்பங்கொட்டை சாறு அல்லது ட்ரைக்கோடெர்மா தெளிக்கவும். வரப்புகளில் மஞ்சள் ஒட்டும் பொறிகளை அமைக்கவும்.',
      audioText:
        'நெல் பயிரில் இலை சுருட்டுப் புழுவை கட்டுப்படுத்த வேப்பங்கொட்டை சாறு தெளிக்கவும்.',
    },
  ],
  Gujarati: [
    {
      id: 'gu-1',
      question: 'કપાસમાં ગુલાબી ઈયળના નિયંત્રણ માટે જૈવિક ઉપાય જણાવો.',
      language: 'Gujarati',
      answer:
        'કપાસમાં ગુલાબી ઈયળ અટકાવવા એકરે 5 ફેરોમોન ટ્રેપ લગાવો અને 5% લીંબોળીનું અર્ક અથવા ટ્રાઈકોડર્માનો છંટકાવ કરો.',
      audioText:
        'ગુલાબી ઈયળ માટે ફેરોમોન ટ્રેપ લગાવો અને લીંબોળીના અર્કનો છંટકાવ કરો.',
    },
  ],
  Kannada: [
    {
      id: 'kn-1',
      question: 'ರಾಗಿ ಬೆಳೆಯಲ್ಲಿ ಬೆಂಕಿ ರೋಗ (Blast) ನಿಯಂತ್ರಣಕ್ಕೆ ಸಾವಯವ ಕ್ರಮಗಳೇನು?',
      language: 'Kannada',
      answer:
        'ರಾಗಿ ಬೆಳೆಯಲ್ಲಿ ಬೆಂಕಿ ರೋಗ ನಿಯಂತ್ರಣಕ್ಕೆ ಎಕರೆಗೆ 2.5 ಕೆಜಿ ಸ್ಯೂಡೋಮೊನಾಸ್ ಫ್ಲೋರೊಸೆನ್ಸ್ 100 ಲೀಟರ್ ನೀರಿಗೆ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ. ಯೂರಿಯಾ ಅತಿಯಾದ ಬಳಕೆಯನ್ನು ಕಡಿಮೆ ಮಾಡಿ.',
      audioText:
        'ಬೆಂಕಿ ರೋಗ ನಿಯಂತ್ರಣಕ್ಕೆ ಸ್ಯೂಡೋಮೊನಾಸ್ ಫ್ಲೋರೊಸೆನ್ಸ್ ಸಿಂಪಡಿಸಿ ಮತ್ತು ಯೂರಿಯಾ ಕಡಿಮೆ ಮಾಡಿ.',
    },
  ],
  Bengali: [
    {
      id: 'bn-1',
      question: 'ধান ফসলে মাজরা পোকা দমনে কোন জৈব পদ্ধতি ব্যবহার করব?',
      language: 'Bengali',
      answer:
        'ধানের মাজরা পোকা দমনের জন্য প্রতি একরে ৫টি ট্রাইকো-কার্ড লাগান এবং ৫% নিম বীজের নির্যাস (NSKE) স্প্রে করুন। আলোর ফাঁদ ব্যবহার করে পোকা দমন করুন।',
      audioText:
        'মাজরা পোকা দমনে ট্রাইকো-কার্ড লাগান এবং ৫ শতাংশ নিম তেল স্প্রে করুন।',
    },
  ],
  English: [
    {
      id: 'en-1',
      question: 'My wheat leaves are yellowing; is it Yellow Rust or Nitrogen deficiency?',
      language: 'English',
      answer:
        'Run your finger over the yellow leaf: if yellow powder rubs off on your fingers, it is Yellow Rust (Puccinia striiformis). Spray sour buttermilk with Trichoderma immediately. If no powder rubs off and the leaf is uniformly pale, it is Nitrogen deficiency—apply 2% nano-urea foliar spray.',
      audioText:
        'If yellow powder rubs off on fingers, it is Yellow Rust; spray sour buttermilk or Trichoderma. If no powder, apply nano urea.',
    },
    {
      id: 'en-2',
      question: 'How to manage Pink Bollworm in cotton organically?',
      language: 'English',
      answer:
        'Install 5 pheromone traps per acre. Release Trichogramma chilonis egg parasitoid cards (60,000 eggs/acre) and apply 5% cold-pressed Neem seed kernel extract (NSKE).',
      audioText:
        'Install 5 pheromone traps per acre and spray Neem seed kernel extract to prevent Pink Bollworm.',
    },
  ],
};

export const VoiceKrishiMitra: React.FC<VoiceKrishiMitraProps> = ({
  currentLanguage,
  currentState,
  currentDistrict,
  onLanguageChange,
  activeAudioKey,
  setActiveAudioKey,
}) => {
  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.Hindi;
  const [isListening, setIsListening] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [speechWarning, setSpeechWarning] = useState<string | null>(null);

  // History initialized and updated to match the active language!
  const [history, setHistory] = useState<QnAPair[]>(() => {
    return LANGUAGE_SEEDS[currentLanguage] || LANGUAGE_SEEDS['Hindi'];
  });

  const recognitionRef = useRef<any>(null);

  // When language changes, update history to matching seed
  useEffect(() => {
    const seed = LANGUAGE_SEEDS[currentLanguage] || LANGUAGE_SEEDS['Hindi'];
    setHistory((prev) => {
      const userQuestions = prev.filter((item) => item.id.startsWith('qna-'));
      return [...userQuestions, ...seed];
    });
  }, [currentLanguage]);

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.name === currentLanguage);

  // Quick prompt suggestions adapted to language
  const getLanguagePrompts = () => {
    switch (currentLanguage) {
      case 'Marathi':
        return [
          { text: 'सोयाबीन पिकावर खोडकिडीचा प्रादुर्भाव रोखण्यासाठी काय करावे?', desc: 'खोडकिड नियंत्रण' },
          { text: 'जिवामृत बनवण्याची सोपी पद्धत कोणती?', desc: 'सेंद्रिय पोषण' },
          { text: 'कापूस बोंडअळीसाठी कोणते जैविक औषध वापरावे?', desc: 'बोंडअळी नियंत्रण' },
        ];
      case 'Telugu':
        return [
          { text: 'వరి పంటలో అగ్గి తెగులు నివారణకు జీవ రసాయన పద్ధతులు తెలపండి.', desc: 'వరి తెగుళ్లు' },
          { text: 'జీవామృతం తయారీ విధానం ఏమిటి?', desc: 'సేంద్రియ ఎరువులు' },
          { text: 'పత్తిలో గులాబీ రంగు పురుగు నివారణ ఎలా?', desc: 'పురుగు నివారణ' },
        ];
      case 'Tamil':
        return [
          { text: 'நெல் பயிரில் பூச்சி தாக்குதலை கட்டுப்படுத்த இயற்கை வழிமுறைகள் என்ன?', desc: 'இயற்கை பூச்சி மேலாண்மை' },
          { text: 'ஜீவாமிர்தம் தயாரிக்கும் எளிய முறை என்ன?', desc: 'இயற்கை உரம்' },
        ];
      case 'Punjabi':
        return [
          { text: 'ਕਣਕ ਵਿੱਚ ਪੀਲੀ ਕੁੰਗੀ ਦੀ ਰੋਕਥਾਮ ਲਈ ਦੇਸੀ ਨੁਸਖਾ ਦੱਸੋ।', desc: 'ਪੀਲੀ ਕੁੰਗੀ ਬਚਾਅ' },
          { text: 'ਜੀਵਾਮ੍ਰਿਤ ਬਣਾਉਣ ਦੀ ਵਿਧੀ ਕੀ ਹੈ?', desc: 'ਜੈਵਿਕ ਖਾਦ' },
        ];
      case 'Gujarati':
        return [
          { text: 'કપાસમાં ગુલાબી ઈયળના નિયંત્રણ માટે જૈવિક ઉપાય જણાવો.', desc: 'ઈયળ નિયંત્રણ' },
          { text: 'જીવામૃત બનાવવાની સાચી રીત કઈ છે?', desc: 'સેન્દ્રીય ખાતર' },
        ];
      default:
        return [
          { text: 'जीवामृत और पंचगव्य बनाने की विधि क्या है?', desc: 'जैविक पोषण विधि' },
          { text: 'आगामी 3 दिनों में बारिश होगी या मुझे सिंचाई करनी चाहिए?', desc: 'मौसम व सिंचाई सलाह' },
          { text: 'धान की फसल में तना छेदक से बचाव का जैविक उपाय बताएं।', desc: 'तना छेदक रोकथाम' },
          { text: 'गेहूं में नैनो यूरिया का उपयोग कब और कैसे करें?', desc: 'पोषक तत्व प्रबंधन' },
        ];
    }
  };

  const quickPrompts = getLanguagePrompts();

  // Speech Recognition (Web Speech API)
  const toggleListening = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechWarning(
        'Speech recognition is not supported in this browser. Please type your question or click the quick prompts below.'
      );
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    setSpeechWarning(null);
    stopAudioPlayback();
    setActiveAudioKey(null);

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = currentLangObj?.speechLocale || 'hi-IN';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }

        const currentText = finalTranscript || interim;
        setInputText(currentText);

        if (finalTranscript) {
          setIsListening(false);
          handleAskQuestion(finalTranscript);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition status:', event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setSpeechWarning('Microphone access was denied. Please allow microphone permission in your browser or type below.');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.warn('Microphone start error:', err);
      setIsListening(false);
    }
  };

  const handleAskQuestion = async (queryText?: string) => {
    const query = queryText || inputText;
    if (!query.trim()) return;

    setIsProcessing(true);
    stopAudioPlayback();
    setActiveAudioKey(null);

    try {
      const res = await fetch('/api/gemini/advisory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          state: currentState,
          district: currentDistrict,
          crop: 'General Crop Advisory',
          cropStage: 'Current Season',
          farmSizeAcres: 2.5,
          language: currentLanguage,
          soilHealth: { n: '160', p: '20', k: '280', ph: 7.4, organicCarbon: '0.45%' },
          weatherData: { condition: 'Field Microclimate Analysis' },
          specialQuery: query,
        }),
      });

      let answer = '';
      let audioSummary = '';

      if (res.ok) {
        const data = await res.json();
        const adv = data.data;
        answer = `${adv.summary} \n\n${adv.criticalActions48h?.slice(0, 2).join('. ') || ''} \n\n${adv.regenerativePractices?.bioFertilizerDosage || ''}`;
        audioSummary = adv.summary;
      } else {
        answer = `Krishisahay AI (${currentDistrict}, ${currentState}): ${query} - Recommend applying 5% Neem extract and Trichoderma to preserve natural crop health.`;
        audioSummary = answer;
      }

      const newId = `qna-${Date.now()}`;
      const newQnA: QnAPair = {
        id: newId,
        question: query,
        language: currentLanguage,
        answer,
        audioText: audioSummary,
      };

      setHistory((prev) => [newQnA, ...prev]);
      setInputText('');

      // Auto-play audio response for hands-free farmer experience
      const locale = currentLangObj?.speechLocale || 'hi-IN';
      setActiveAudioKey(newId);
      playAudioWithGeminiOrBrowser(
        audioSummary,
        currentLanguage,
        locale,
        () => setActiveAudioKey(newId),
        () => setActiveAudioKey(null)
      );
    } catch (err) {
      console.error('Error in voice query:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePlayVoice = (text: string, id: string) => {
    if (activeAudioKey === id) {
      stopAudioPlayback();
      setActiveAudioKey(null);
      return;
    }

    stopAudioPlayback();
    setActiveAudioKey(id);
    const locale = currentLangObj?.speechLocale || 'hi-IN';

    playAudioWithGeminiOrBrowser(
      text,
      currentLanguage,
      locale,
      () => setActiveAudioKey(id),
      () => setActiveAudioKey(null)
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Banner */}
      <div className="bg-[#143D23] rounded-3xl p-6 sm:p-8 text-white shadow-sm space-y-3 border border-[#1C522F]">
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 flex items-center gap-1.5">
            <Volume2 className="w-3.5 h-3.5 text-emerald-300" />
            Rural Voice Accessibility
          </span>
          <span className="text-xs text-emerald-200/80 font-mono">Google Cloud Gemini TTS Engine</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          {t.voice_mitra_title}
        </h2>
        <p className="text-sm text-emerald-100 leading-relaxed max-w-2xl">
          {t.voice_mitra_subtitle}
        </p>
      </div>

      {/* Instant 1-Tap Translate Chips */}
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

      {/* Main Microphone Interaction Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs text-center space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#143D23]">
            {t.language_label}: {currentLangObj?.nativeName} ({currentLanguage}) • {currentDistrict}, {currentState}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
            {t.voice_start_speaking}
          </h3>
        </div>

        {speechWarning && (
          <div className="max-w-lg mx-auto p-3 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{speechWarning}</span>
            </div>
            <button
              onClick={() => setSpeechWarning(null)}
              className="text-amber-900 font-bold hover:underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Large Tactile Mic Button */}
        <div className="flex flex-col items-center justify-center space-y-3">
          <button
            onClick={toggleListening}
            className={`w-24 h-24 rounded-full flex items-center justify-center shadow-md transition transform hover:scale-105 cursor-pointer ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse ring-8 ring-rose-100'
                : 'bg-[#143D23] text-white ring-8 ring-emerald-50 hover:bg-[#1E4D2B]'
            }`}
          >
            {isListening ? (
              <MicOff className="w-10 h-10 animate-bounce" />
            ) : (
              <Mic className="w-10 h-10" />
            )}
          </button>
          <span className="text-xs font-bold text-stone-700">
            {isListening ? `${t.voice_listening_indicator} (${currentLangObj?.nativeName})` : t.voice_start_speaking}
          </span>
        </div>

        {/* Text Input Fallback Bar */}
        <div className="max-w-2xl mx-auto flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
            placeholder={t.voice_type_placeholder}
            className="flex-1 bg-[#FAF9F5] border border-stone-200 rounded-xl px-4 py-3 text-sm font-medium text-stone-900 focus:ring-2 focus:ring-[#143D23]"
          />
          <button
            onClick={() => handleAskQuestion()}
            disabled={isProcessing || !inputText.trim()}
            className="px-6 py-3 rounded-xl bg-[#143D23] text-white font-bold text-sm hover:bg-[#1E4D2B] transition cursor-pointer disabled:opacity-50 flex items-center gap-1.5 shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>{isProcessing ? '...' : t.voice_send_btn}</span>
          </button>
        </div>

        {/* Quick Prompts */}
        <div className="pt-2">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block mb-3">
            {t.voice_common_questions} ({currentLangObj?.nativeName})
          </span>
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
            {quickPrompts.map((qp, i) => (
              <button
                key={i}
                onClick={() => {
                  setInputText(qp.text);
                  handleAskQuestion(qp.text);
                }}
                className="px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-emerald-50 text-stone-800 hover:text-[#143D23] text-xs font-medium border border-stone-200 transition cursor-pointer"
              >
                {qp.text}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Consultation History */}
      <div className="space-y-4">
        <h4 className="font-bold text-base text-stone-900 flex items-center gap-2">
          <Bot className="w-5 h-5 text-[#143D23]" />
          <span>Consultation History ({history.length})</span>
        </h4>

        <div className="space-y-4">
          {history.map((qna) => {
            const isPlayingThis = activeAudioKey === qna.id;
            return (
              <div
                key={qna.id}
                className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                      Farmer Inquiry ({qna.language})
                    </span>
                    <h5 className="font-extrabold text-base text-stone-900">
                      "{qna.question}"
                    </h5>
                  </div>

                  <button
                    onClick={() => handlePlayVoice(qna.audioText, qna.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shrink-0 border ${
                      isPlayingThis
                        ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
                        : 'bg-emerald-50 text-[#143D23] border-emerald-300 hover:bg-emerald-100'
                    }`}
                  >
                    {isPlayingThis ? (
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

                <div className="bg-[#FAF9F5] p-4 rounded-2xl border border-stone-200/60 text-xs sm:text-sm text-stone-800 leading-relaxed font-medium whitespace-pre-line">
                  {qna.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
