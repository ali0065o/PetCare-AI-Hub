import React, { useState, useRef, useEffect } from 'react';
import { useSubscription } from '../context/SubscriptionContext';
import { VetTriageReport, ConsultationHistoryItem } from '../types';
import { SAMPLE_CASES, SampleCase } from '../data/sampleCases';
import { AdBanner } from './AdBanner';
import {
  Stethoscope,
  Upload,
  Video,
  Image as ImageIcon,
  AlertTriangle,
  HeartPulse,
  Utensils,
  ShieldAlert,
  HelpCircle,
  Printer,
  Sparkles,
  Camera,
  RotateCcw,
  Send,
  CheckCircle,
  FileText,
  Clock,
  History,
  Info,
  ChevronDown,
  Loader2,
  Trash2,
  BookmarkPlus,
  Crown,
  Lock,
  Zap
} from 'lucide-react';

interface AIVetDoctorProps {
  initialSpecies?: string;
}

export const AIVetDoctor: React.FC<AIVetDoctorProps> = ({ initialSpecies }) => {
  const {
    currentPlan,
    isSubscribed,
    trialScansLeft,
    useTrialScan,
    openCheckout,
    upgradePlan,
    downgradePlan
  } = useSubscription();

  // Form State
  const [species, setSpecies] = useState(initialSpecies || 'Dog');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [duration, setDuration] = useState('1-2 days');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Media upload state
  const [mediaFile, setMediaFile] = useState<{
    data: string; // base64
    mimeType: string;
    name: string;
    isVideo: boolean;
    previewUrl?: string;
  } | null>(null);

  // Status state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [report, setReport] = useState<VetTriageReport | null>(null);

  // Follow-up chat state
  const [chatQuestion, setChatQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'ai'; content: string }[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // History state
  const [history, setHistory] = useState<ConsultationHistoryItem[]>([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Webcam capture state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Update species if passed in prop
  useEffect(() => {
    if (initialSpecies) {
      setSpecies(initialSpecies);
    }
  }, [initialSpecies]);

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('petcare_consultation_history');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  const COMMON_SYMPTOM_TAGS = [
    'Limping / Favoring leg',
    'Lethargy / Weakness',
    'Loss of appetite',
    'Vomiting',
    'Diarrhea / Loose stool',
    'Skin rash / Scratching',
    'Coughing / Wheezing',
    'Eye / Nasal discharge',
    'Excessive thirst',
    'Head shaking / Ear pain',
    'Hunched posture / Abdominal pain',
    'Shaking / Trembling'
  ];

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 25 * 1024 * 1024) {
      setErrorMessage('File size exceeds 25MB limit. Please upload a smaller photo or short video clip.');
      return;
    }

    const isVideo = file.type.startsWith('video/');
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result as string;
      setMediaFile({
        data: result,
        mimeType: file.type,
        name: file.name,
        isVideo,
        previewUrl: URL.createObjectURL(file)
      });
      setErrorMessage(null);
    };

    reader.readAsDataURL(file);
  };

  const startCamera = async () => {
    try {
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setErrorMessage('Camera access was denied or is unavailable on this device.');
      setIsCameraActive(false);
    }
  };

  const takeSnapshot = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      setMediaFile({
        data: dataUrl,
        mimeType: 'image/jpeg',
        name: `camera-capture-${Date.now()}.jpg`,
        isVideo: false,
        previewUrl: dataUrl
      });
    }
    stopCamera();
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const loadSampleCase = (sample: SampleCase) => {
    setSpecies(sample.species);
    setBreed(sample.breed);
    setAge(sample.age);
    setWeight(sample.weight);
    setDuration(sample.duration);
    setSymptoms(sample.symptoms);
    setSelectedTags(sample.symptomTags);
    setMedicalHistory(sample.medicalHistory);
    if (sample.imagePreview) {
      setMediaFile({
        data: sample.imagePreview,
        mimeType: 'image/jpeg',
        name: 'sample-symptom-reference.jpg',
        isVideo: false,
        previewUrl: sample.imagePreview
      });
    }
    setReport(null);
    setChatHistory([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim() && selectedTags.length === 0 && !mediaFile) {
      setErrorMessage('Please describe the symptoms, choose quick tags, or upload a photo/video.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setReport(null);
    setChatHistory([]);

    try {
      const payload: any = {
        species,
        breed: breed || 'Not specified',
        age: age || 'Not specified',
        weight: weight || 'Not specified',
        symptoms,
        symptomTags: selectedTags,
        duration,
        medicalHistory
      };

      if (mediaFile) {
        payload.media = {
          data: mediaFile.data,
          mimeType: mediaFile.mimeType
        };
        if (!isSubscribed) {
          useTrialScan();
        }
      }

      const res = await fetch('/api/vet-consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to analyze symptoms');
      }

      setReport(data.report);

      // Save consultation to history
      const historyItem: ConsultationHistoryItem = {
        id: `consult-${Date.now()}`,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        petName: breed ? `${breed} (${species})` : species,
        species,
        symptoms: symptoms || selectedTags.join(', '),
        report: data.report,
        mediaThumbnail: mediaFile?.previewUrl
      };

      const newHistory = [historyItem, ...history.slice(0, 9)];
      setHistory(newHistory);
      try {
        localStorage.setItem('petcare_consultation_history', JSON.stringify(newHistory));
      } catch (e) {}

      // Smooth scroll down to consultation report
      setTimeout(() => {
        const reportElem = document.getElementById('consultation-report-view');
        if (reportElem) {
          reportElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 200);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'An unexpected error occurred during consultation analysis.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFollowUpChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatQuestion.trim() || isChatLoading) return;

    const q = chatQuestion;
    setChatQuestion('');
    setChatHistory((prev) => [...prev, { role: 'user', content: q }]);
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/vet-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          petContext: {
            species,
            breed,
            age,
            symptoms,
            triageLevel: report?.triageLevel,
            conditionSummary: report?.conditionSummary
          },
          conversationHistory: chatHistory
        })
      });

      const data = await res.json();
      if (data.reply) {
        setChatHistory((prev) => [...prev, { role: 'ai', content: data.reply }]);
      }
    } catch (err) {
      setChatHistory((prev) => [
        ...prev,
        {
          role: 'ai',
          content: 'I could not process that request. If your pet shows severe symptoms, please contact an emergency veterinarian.'
        }
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="ai-vet-doctor" className="scroll-mt-24 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold tracking-wide uppercase mb-3">
          <Stethoscope className="w-3.5 h-3.5" /> Clinical Triage & Symptom Checker
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-display">
          AI Vet Doctor & Media Symptom Checker
        </h2>
        <p className="mt-3 text-stone-600 text-sm sm:text-base leading-relaxed">
          Upload a photo or video of your sick pet (showing limping, lethargy, rashes, or posture) and describe their symptoms. Our AI veterinarian analyzes visual indicators to provide probable health conditions, immediate precautions, and specialized recovery diets.
        </p>

        {/* Freemium vs Pro Tier Status Banner */}
        <div className={`mt-6 p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
          isSubscribed
            ? 'bg-gradient-to-r from-amber-50 to-emerald-50 border-amber-300 text-amber-950 shadow-2xs'
            : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
              isSubscribed ? 'bg-amber-400 text-stone-950' : 'bg-emerald-600 text-white'
            }`}>
              {isSubscribed ? <Crown className="w-5 h-5" /> : <Zap className="w-5 h-5" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold uppercase tracking-wider text-[11px]">
                  {isSubscribed ? `${currentPlan === 'vip' ? 'Multi-Pet VIP' : 'Pro Pet Care Pass'} Active` : 'Free Companion Tier'}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                  isSubscribed ? 'bg-amber-200 text-amber-900' : 'bg-emerald-200 text-emerald-900'
                }`}>
                  {isSubscribed ? 'Unlimited Video/Photo Scans' : `${trialScansLeft > 0 ? `${trialScansLeft} Trial Scan Available` : 'Basic Text Only'}`}
                </span>
              </div>
              <p className="text-[11px] text-stone-600 mt-0.5">
                {isSubscribed
                  ? 'Unlimited multimodal video/photo analysis, full differential diagnoses & custom diet recipes.'
                  : 'Free tier includes basic symptom guidance. Advanced video/photo analysis requires Pro Pass or a trial token.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isSubscribed ? (
              <button
                type="button"
                onClick={downgradePlan}
                className="bg-stone-100 hover:bg-stone-200 text-stone-700 text-[11px] font-semibold px-3 py-1.5 rounded-xl transition-colors"
                title="Switch back to Free tier for testing"
              >
                Test Free Mode
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => upgradePlan('pro')}
                  className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-[11px] font-bold px-3 py-1.5 rounded-xl transition-colors"
                  title="Simulate instant 1-click Pro upgrade for testing"
                >
                  ⚡ Quick Pro Test
                </button>
                <button
                  type="button"
                  onClick={() => openCheckout('pro')}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
                >
                  <Crown className="w-3.5 h-3.5" />
                  <span>Upgrade Pro ($9.99)</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Rapid Test Scenarios */}
        <div className="mt-4 p-4 bg-amber-50/80 border border-amber-200/80 rounded-2xl text-left">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              1-Click Sample Testing Cases:
            </span>
            {history.length > 0 && (
              <button
                onClick={() => setShowHistoryModal(true)}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <History className="w-3.5 h-3.5" /> Past Consultations ({history.length})
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_CASES.map((sample) => (
              <button
                key={sample.id}
                onClick={() => loadSampleCase(sample)}
                className="bg-white hover:bg-amber-100 border border-amber-200 text-stone-800 text-xs font-medium px-3 py-1.5 rounded-xl transition-all shadow-2xs text-left"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Intake Form Container */}
      <div className="bg-white rounded-3xl shadow-sm border border-stone-200 overflow-hidden mb-12">
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
          {/* Pet Basic Information Row */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">
                1
              </span>
              Pet Profile & Vital Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Pet Species *
                </label>
                <select
                  value={species}
                  onChange={(e) => setSpecies(e.target.value)}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                >
                  <option value="Dog">Dog (Canine)</option>
                  <option value="Cat">Cat (Feline)</option>
                  <option value="Bird">Bird / Parrot</option>
                  <option value="Rabbit">Rabbit / Bunny</option>
                  <option value="Guinea Pig">Guinea Pig</option>
                  <option value="Hamster">Hamster</option>
                  <option value="Reptile">Reptile / Lizard</option>
                  <option value="Fish">Aquarium Fish</option>
                  <option value="Other">Other Companion Animal</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Breed (or Mix)
                </label>
                <input
                  type="text"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  placeholder="e.g. Golden Retriever, Siamese"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Age
                </label>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 3 years, 6 months"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                  Weight (approximate)
                </label>
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="e.g. 25 lbs / 11 kg"
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                />
              </div>
            </div>
          </div>

          {/* Quick Symptoms Tag Checklist */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">
                2
              </span>
              Observed Symptoms Checklist
            </h3>
            <p className="text-xs text-stone-500 mb-3">
              Click all symptoms your pet is currently exhibiting:
            </p>
            <div className="flex flex-wrap gap-2">
              {COMMON_SYMPTOM_TAGS.map((tag) => {
                const active = selectedTags.includes(tag);
                return (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                      active
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    <span>{active ? '✓' : '+'}</span>
                    <span>{tag}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Behavior & Medical History Inputs */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">
                3
              </span>
              Detailed Clinical Description & Duration
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-1.5">
                <label className="block text-xs font-semibold text-stone-700">
                  Describe what your pet is doing, behavior changes, and what triggered it:
                </label>
                <textarea
                  rows={4}
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="e.g. Started limping heavily after running outside. Doesn't want to put weight on hind right paw. Kept whining when touched around knee. Still drank water but refused dinner..."
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none resize-y"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    How long has this been happening?
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                  >
                    <option value="Less than 2 hours (Sudden acute)">Less than 2 hours (Sudden acute)</option>
                    <option value="2 to 12 hours">2 to 12 hours</option>
                    <option value="1-2 days">1-2 days</option>
                    <option value="3-5 days">3-5 days</option>
                    <option value="More than a week (Chronic)">More than a week (Chronic)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Prior Medical History or Medications
                  </label>
                  <input
                    type="text"
                    value={medicalHistory}
                    onChange={(e) => setMedicalHistory(e.target.value)}
                    placeholder="e.g. Vaccinated, no meds / Has allergies"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Upload Photo or Video of Sick Pet */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs">
                  4
                </span>
                <span>Upload Pet Photo or Video (Visual Symptom Analysis)</span>
              </h3>
              <div className="flex items-center gap-1.5 text-xs">
                {isSubscribed ? (
                  <span className="bg-amber-100 text-amber-900 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 text-[11px]">
                    <Crown className="w-3 h-3 text-amber-600" /> Pro Unlocked (Unlimited Scans)
                  </span>
                ) : trialScansLeft > 0 ? (
                  <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 text-[11px]">
                    <Sparkles className="w-3 h-3 text-emerald-600" /> Free Trial Scan Active (1 remaining)
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => openCheckout('pro')}
                    className="bg-amber-500 hover:bg-amber-600 text-stone-950 font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1 text-[11px] shadow-2xs"
                  >
                    <Lock className="w-3 h-3" /> Pro Pass Required
                  </button>
                )}
              </div>
            </div>

            <p className="text-xs text-stone-500 mb-3">
              Upload a clear photo or short video showing your pet limping, scratching, breathing rapidly, rashes, or unusual posture.
            </p>

            {/* If Free Tier with 0 trial scans and no media, show friendly lock overlay */}
            {!isSubscribed && trialScansLeft <= 0 && !mediaFile ? (
              <div className="border-2 border-dashed border-amber-300 bg-amber-50/50 rounded-2xl p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-200 text-amber-800 flex items-center justify-center mx-auto shadow-2xs">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm font-display">
                    Advanced Video & Photo Triage is a Pro Feature
                  </h4>
                  <p className="text-xs text-stone-600 max-w-md mx-auto mt-1 leading-relaxed">
                    You have used your free trial scan. You can still submit your <strong>text description</strong> below for free preliminary guidance, or subscribe to the <strong>Pro Pet Care Pass</strong> for unlimited multimodal video analysis.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => openCheckout('pro')}
                    className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
                  >
                    <Crown className="w-3.5 h-3.5" />
                    <span>Unlock Pro Pass ($9.99/mo)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => upgradePlan('pro')}
                    className="bg-amber-200 hover:bg-amber-300 text-amber-950 font-bold text-xs px-3.5 py-2 rounded-xl transition-colors"
                  >
                    ⚡ Test Pro Pass
                  </button>
                </div>
              </div>
            ) : (
              /* Media Upload Area */
              !mediaFile && !isCameraActive && (
                <div className="border-2 border-dashed border-stone-300 hover:border-emerald-500 rounded-2xl p-6 bg-stone-50 hover:bg-emerald-50/20 transition-all text-center">
                  <div className="max-w-md mx-auto space-y-3">
                    <div className="flex items-center justify-center gap-3 text-stone-400">
                      <div className="p-3 bg-white rounded-xl shadow-2xs border border-stone-200 text-emerald-600">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                      <div className="p-3 bg-white rounded-xl shadow-2xs border border-stone-200 text-blue-600">
                        <Video className="w-6 h-6" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-800">
                        Drop photo or video here, or browse files
                      </p>
                      <p className="text-xs text-stone-500 mt-1">
                        Supports JPG, PNG, WEBP, MP4, MOV (max 25MB)
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-2xs flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" /> Select File
                      </button>
                      <button
                        type="button"
                        onClick={startCamera}
                        className="bg-stone-800 hover:bg-stone-900 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-2xs flex items-center gap-1.5"
                      >
                        <Camera className="w-3.5 h-3.5" /> Use Webcam / Camera
                      </button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              )
            )}

            {/* Active Camera View */}
            {isCameraActive && (
              <div className="bg-stone-900 rounded-2xl p-4 text-center max-w-lg mx-auto">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-64 object-cover rounded-xl bg-black mb-3"
                ></video>
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={takeSnapshot}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm"
                  >
                    <Camera className="w-4 h-4" /> Snap Photo
                  </button>
                  <button
                    type="button"
                    onClick={stopCamera}
                    className="bg-stone-700 hover:bg-stone-600 text-stone-200 text-xs font-medium px-4 py-2 rounded-xl"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Uploaded Media Preview */}
            {mediaFile && (
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {mediaFile.isVideo ? (
                    <video
                      src={mediaFile.previewUrl}
                      controls
                      className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl bg-black"
                    />
                  ) : (
                    <img
                      src={mediaFile.previewUrl}
                      alt="Uploaded pet symptom"
                      className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl border border-stone-200"
                    />
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-stone-900 truncate max-w-[200px] sm:max-w-[300px]">
                        {mediaFile.name}
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase">
                        {mediaFile.isVideo ? 'Video' : 'Photo'} Attached
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-1">
                      Ready for AI visual inspection (gait, skin, eyes, posture).
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setMediaFile(null)}
                  className="text-stone-400 hover:text-red-600 p-2 rounded-xl hover:bg-red-50 transition-colors flex items-center gap-1 text-xs self-end sm:self-center"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Remove File</span>
                </button>
              </div>
            )}
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3 text-red-900 text-xs">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Notice</p>
                <p className="mt-0.5">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Submit Action Bar */}
          <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-stone-500 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Veterinary AI analysis powered by Gemini 3.8 Flash multimodal vision.</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-sm px-8 py-3.5 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Analyzing Symptoms & Media...</span>
                </>
              ) : (
                <>
                  <Stethoscope className="w-4 h-4" />
                  <span>Analyze Symptoms & Consult AI Vet</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* AI VET CONSULTATION REPORT VIEW */}
      {report && (
        <div
          id="consultation-report-view"
          className="scroll-mt-20 bg-white rounded-3xl shadow-lg border border-stone-200 overflow-hidden print:shadow-none print:border-none space-y-0"
        >
          {/* Urgency Level Triage Banner */}
          <div
            className={`p-6 sm:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
              report.triageLevel === 'emergency'
                ? 'bg-gradient-to-r from-red-700 via-rose-700 to-red-900'
                : report.triageLevel === 'moderate'
                ? 'bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700'
                : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700'
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs">
                  Triage Severity Assessment
                </span>
                <span className="text-xs font-semibold opacity-90">
                  {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display">
                {report.triageLevel === 'emergency' && '🚨 Emergency: Immediate Veterinary Visit Urged'}
                {report.triageLevel === 'moderate' && '⚠️ Moderate: Schedule Physical Vet Within 24-48 Hours'}
                {report.triageLevel === 'mild' && '✅ Mild Concern: Home Observation & Support'}
              </h3>
              <p className="text-sm opacity-90 font-medium">
                {report.summaryTitle}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto shrink-0 no-print">
              <button
                onClick={handlePrint}
                className="bg-white/20 hover:bg-white/30 text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
                title="Print Consultation Summary"
              >
                <Printer className="w-3.5 h-3.5" /> Print / Save PDF
              </button>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-8">
            {/* Clinical Overview & Visual Findings */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1">
                    Clinical Assessment Overview
                  </h4>
                  <p className="text-sm text-stone-800 leading-relaxed font-medium">
                    {report.conditionSummary}
                  </p>
                </div>

                {report.visualFindings && report.visualFindings !== 'None provided' ? (
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-1 flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-emerald-700" />
                      Visual Media Observations ({isSubscribed ? 'Pro Multimodal Analysis' : 'Trial Scan'})
                    </h5>
                    <p className="text-xs text-emerald-950 leading-relaxed">
                      {report.visualFindings}
                    </p>
                  </div>
                ) : !isSubscribed && (
                  <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 no-print">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center shrink-0">
                        <Crown className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="font-bold text-stone-900 text-xs">Want Visual Video & Photo Inspection?</h5>
                        <p className="text-[11px] text-stone-600 mt-0.5">
                          Upgrade to <strong>Pro Pet Care Pass</strong> to upload videos and photos for deep musculoskeletal and dermatological vision triage.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => openCheckout('pro')}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-xl shrink-0 shadow-xs transition-colors"
                    >
                      Upgrade Pro ($9.99/mo)
                    </button>
                  </div>
                )}
              </div>

              {/* Case Attributes Panel */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-xs space-y-2.5">
                <h5 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] pb-1 border-b border-stone-200">
                  Case Record Details
                </h5>
                <div className="flex justify-between">
                  <span className="text-stone-500">Patient:</span>
                  <span className="font-semibold text-stone-800">{species} {breed && `(${breed})`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Age & Weight:</span>
                  <span className="font-semibold text-stone-800">{age || 'N/A'} • {weight || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Duration:</span>
                  <span className="font-semibold text-stone-800">{duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">History:</span>
                  <span className="font-semibold text-stone-800 truncate max-w-[120px]">{medicalHistory || 'None noted'}</span>
                </div>
              </div>
            </div>

            {/* Possible Health Conditions */}
            <div>
              <h4 className="text-base font-bold text-stone-900 mb-4 flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-emerald-600" />
                Possible Health Conditions (Differential Analysis)
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {report.possibleConditions.map((cond, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-stone-200 rounded-2xl p-4.5 shadow-2xs hover:border-emerald-200 transition-colors space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-900 text-sm">
                        {cond.name}
                      </span>
                      <span
                        className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                          cond.likelihood === 'High'
                            ? 'bg-rose-100 text-rose-800'
                            : cond.likelihood === 'Medium'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        {cond.likelihood} Likelihood
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {cond.description}
                    </p>

                    {cond.symptomsMatch && cond.symptomsMatch.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {cond.symptomsMatch.map((m, mi) => (
                          <span
                            key={mi}
                            className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md"
                          >
                            ✓ {m}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Immediate Precautions / Atiyat (احتیاط) */}
            <div className="bg-amber-50/60 border border-amber-200/80 rounded-3xl p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-bold text-amber-950 flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-amber-600" />
                  Immediate Precautions / Atiyat (What to Do Right Now)
                </h4>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-md">
                  Action Steps
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {report.immediatePrecautions.map((prec, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-amber-200/60 rounded-2xl p-4 shadow-2xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-900 text-xs">
                        {idx + 1}. {prec.title}
                      </span>
                      <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                        {prec.urgency}
                      </span>
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      {prec.instruction}
                    </p>
                    {prec.warning && (
                      <p className="text-[11px] font-bold text-red-600 pt-1 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 shrink-0" />
                        <span>DO NOT: {prec.warning}</span>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Diet & Hydration Recommendations */}
            <div className="bg-stone-50 border border-stone-200 rounded-3xl p-6 sm:p-7 space-y-5">
              <h4 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-emerald-600" />
                Diet & Hydration Recommendations for this Condition
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recommended Diet & Recovery Recipe */}
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-2">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                      🥣 Recommended Diet & Home Recovery Recipe
                    </span>
                    <p className="text-xs text-stone-800 font-medium leading-relaxed">
                      {report.dietRecommendations.specialRecipe}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                      Safe Foods to Feed:
                    </span>
                    <ul className="space-y-1.5">
                      {report.dietRecommendations.recommendedFoods.map((f, fi) => (
                        <li key={fi} className="text-xs text-stone-700 flex items-center gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Foods to Avoid & Hydration Guide */}
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-2">
                    <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block">
                      💧 Hydration & Fluid Balance
                    </span>
                    <p className="text-xs text-stone-800 leading-relaxed">
                      {report.dietRecommendations.hydrationGuide}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold text-red-800 uppercase tracking-wider">
                      Foods to Strictly Withhold / Avoid:
                    </span>
                    <ul className="space-y-1.5">
                      {report.dietRecommendations.foodsToAvoid.map((f, fi) => (
                        <li key={fi} className="text-xs text-red-900 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Red Flags & Questions for Physical Vet */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Red Flags */}
              <div className="bg-red-50/70 border border-red-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-red-900 font-bold text-xs uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>Immediate Red Flags (Go to ER Vet Now if seen)</span>
                </div>
                <ul className="space-y-2">
                  {report.redFlags.map((flag, idx) => (
                    <li key={idx} className="text-xs text-red-950 flex items-start gap-2">
                      <span className="text-red-600 font-bold">!</span>
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Questions for Vet */}
              <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-wider">
                  <HelpCircle className="w-4 h-4 text-blue-600" />
                  <span>Questions to Ask Your Physical Vet</span>
                </div>
                <ul className="space-y-2">
                  {report.questionsForVet.map((q, idx) => (
                    <li key={idx} className="text-xs text-blue-950 flex items-start gap-2">
                      <span className="text-blue-600 font-bold">?</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Consultation Results Sponsor Ad */}
            <AdBanner slot="consultation-sponsor" />

            {/* Interactive Follow-Up Chat with AI Vet */}
            <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 space-y-4 no-print">
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Follow-Up Chat with AI Vet Doctor
                </h5>
                <span className="text-[10px] text-stone-500">Ask clarifying questions about this report</span>
              </div>

              {chatHistory.length > 0 && (
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {chatHistory.map((msg, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-xl text-xs ${
                        msg.role === 'user'
                          ? 'bg-emerald-600 text-white ml-8 rounded-br-none'
                          : 'bg-white border border-stone-200 text-stone-800 mr-8 rounded-bl-none shadow-2xs'
                      }`}
                    >
                      <p className="font-bold text-[10px] opacity-75 mb-0.5">
                        {msg.role === 'user' ? 'You' : 'AI Vet Doctor'}
                      </p>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  ))}
                </div>
              )}

              <form onSubmit={handleFollowUpChat} className="flex gap-2">
                <input
                  type="text"
                  value={chatQuestion}
                  onChange={(e) => setChatQuestion(e.target.value)}
                  placeholder="e.g. Can I give him chicken broth? How many days should I monitor?"
                  className="flex-1 bg-white border border-stone-200 rounded-xl px-3.5 py-2 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <button
                  type="submit"
                  disabled={isChatLoading || !chatQuestion.trim()}
                  className="bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  {isChatLoading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                  <span>Ask</span>
                </button>
              </form>
            </div>

            {/* PROMINENT MANDATORY VETERINARY DISCLAIMER NOTICE */}
            <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-5 text-center space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-red-900">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>Mandatory Veterinary Medical Disclaimer</span>
              </div>
              <p className="text-xs sm:text-sm text-red-950 font-semibold max-w-3xl mx-auto leading-relaxed">
                "{report.disclaimer}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden max-h-[85vh] flex flex-col">
            <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                <History className="w-4 h-4 text-emerald-600" />
                Past AI Consultations ({history.length})
              </h3>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="text-stone-400 hover:text-stone-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-3 flex-1">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5 flex items-center justify-between gap-3 hover:bg-stone-100 transition-colors"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-stone-900">{item.petName}</span>
                      <span
                        className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          item.report.triageLevel === 'emergency'
                            ? 'bg-red-100 text-red-800'
                            : item.report.triageLevel === 'moderate'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {item.report.triageLevel}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 line-clamp-1">{item.symptoms}</p>
                    <span className="text-[10px] text-stone-400">{item.date}</span>
                  </div>

                  <button
                    onClick={() => {
                      setReport(item.report);
                      setShowHistoryModal(false);
                      setTimeout(() => {
                        document.getElementById('consultation-report-view')?.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shrink-0"
                  >
                    View Report
                  </button>
                </div>
              ))}
            </div>

            <div className="p-3 border-t border-stone-200 bg-stone-50 flex justify-between items-center text-xs">
              <button
                onClick={() => {
                  setHistory([]);
                  localStorage.removeItem('petcare_consultation_history');
                }}
                className="text-red-600 hover:underline"
              >
                Clear History
              </button>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="bg-stone-200 hover:bg-stone-300 px-3 py-1.5 rounded-xl font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
