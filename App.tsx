import React, { useState, useCallback } from 'react';
import { LandingPage } from './components/LandingPage';
import { StepWizard } from './components/StepWizard';
import { PreviewPane } from './components/PreviewPane';
import { DEFAULT_CONFIG, STEPS } from './constants';
import { NewsletterConfig, ToneOfVoice, ContentLength, Frequency, GeneratedContent } from './types';
import { generateSampleNewsletter } from './services/geminiService';
import { 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Zap, 
  Settings2, 
  Target, 
  PenTool,
  CheckCircle2,
  AlertCircle,
  LayoutTemplate
} from 'lucide-react';

export default function App() {
  const [hasAccess, setHasAccess] = useState(false);
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<NewsletterConfig>(DEFAULT_CONFIG);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNext = () => setStep((prev) => Math.min(prev + 1, STEPS.length));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleChange = (field: keyof NewsletterConfig, value: string) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      const content = await generateSampleNewsletter(config);
      setGeneratedContent(content);
    } catch (err) {
      setError("Failed to generate content. Please check your API key and try again.");
    } finally {
      setIsLoading(false);
    }
  }, [config, isLoading]);

  const canProceed = () => {
    switch (step) {
      case 1: return config.companyName.length > 0;
      case 2: return config.targetAudience.length > 0 && config.primaryTopic.length > 0;
      case 3: return true;
      default: return true;
    }
  };

  if (!hasAccess) {
    return <LandingPage onEnter={() => setHasAccess(true)} />;
  }

  const renderFormStep = () => {
    const inputClass = "w-full px-5 py-4 rounded-xl bg-slate-50 border border-transparent focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all duration-300 font-medium text-slate-700 placeholder:text-slate-400";
    const labelClass = "text-sm font-bold text-slate-700 ml-1 mb-2 block uppercase tracking-wide text-xs";

    switch (step) {
      case 1:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <div>
              <label className={labelClass}>Company / Publication Name</label>
              <input
                type="text"
                className={inputClass}
                placeholder="e.g. TechWeekly, GreenLiving"
                value={config.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
              />
            </div>
            
            <div>
              <label className={labelClass}>Brand Values & Keywords</label>
              <textarea
                className={`${inputClass} min-h-[120px] resize-none`}
                placeholder="e.g. Innovation, Trust, Sustainability, Speed"
                value={config.keyValues}
                onChange={(e) => handleChange('keyValues', e.target.value)}
              />
              <p className="text-xs text-slate-400 mt-2 ml-1">Separated by commas.</p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <div>
              <label className={labelClass}>Target Audience</label>
              <input
                type="text"
                className={inputClass}
                placeholder="e.g. C-Suite Executives, Freelance Developers"
                value={config.targetAudience}
                onChange={(e) => handleChange('targetAudience', e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass}>Primary Niche / Topic</label>
              <input
                type="text"
                className={inputClass}
                placeholder="e.g. SaaS Marketing, Urban Gardening"
                value={config.primaryTopic}
                onChange={(e) => handleChange('primaryTopic', e.target.value)}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className={labelClass}>Tone of Voice</label>
                  <div className="grid grid-cols-1 gap-3">
                    {Object.values(ToneOfVoice).map((tone) => (
                      <button
                        key={tone}
                        onClick={() => handleChange('tone', tone)}
                        className={`px-5 py-4 rounded-xl border text-left transition-all duration-200 flex items-center justify-between group ${
                          config.tone === tone 
                            ? 'border-indigo-600 bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' 
                            : 'border-slate-200 bg-white hover:border-indigo-300 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span className="font-medium">{tone}</span>
                        {config.tone === tone && <CheckCircle2 size={18} className="text-indigo-200" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <label className={labelClass}>Desired Length</label>
                    <div className="relative">
                      <select
                        className={`${inputClass} appearance-none cursor-pointer`}
                        value={config.length}
                        onChange={(e) => handleChange('length', e.target.value)}
                      >
                        {Object.values(ContentLength).map((len) => (
                          <option key={len} value={len}>{len}</option>
                        ))}
                      </select>
                      <div className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className={labelClass}>Sending Frequency</label>
                    <div className="relative">
                      <select
                        className={`${inputClass} appearance-none cursor-pointer`}
                        value={config.frequency}
                        onChange={(e) => handleChange('frequency', e.target.value)}
                      >
                        {Object.values(Frequency).map((freq) => (
                          <option key={freq} value={freq}>{freq}</option>
                        ))}
                      </select>
                      <div className="absolute right-5 top-1/2 transform -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
             <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-8 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-indigo-900 opacity-20 rounded-full blur-2xl"></div>
                
                <div className="flex items-start gap-5 relative z-10">
                  <div className="bg-white/20 p-3.5 rounded-xl backdrop-blur-md shadow-inner">
                    <Sparkles className="text-white" size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight">Ready to Generate</h3>
                    <p className="text-indigo-100 text-sm mt-2 leading-relaxed max-w-md">
                      Our AI content engine is ready to synthesize your requirements into a production-ready newsletter format.
                    </p>
                  </div>
                </div>
             </div>

             <div>
              <label className={labelClass}>Test Topic (Optional)</label>
              <input
                type="text"
                className={inputClass}
                placeholder="Enter a specific topic to test the generation (e.g. AI in Healthcare)"
                value={config.exampleTopic}
                onChange={(e) => handleChange('exampleTopic', e.target.value)}
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className={`
                w-full py-5 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center gap-3 transition-all duration-300
                ${isLoading 
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed transform-none' 
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white hover:shadow-indigo-500/40 active:scale-[0.98]'}
              `}
            >
              {isLoading ? (
                <>
                   <div className="w-5 h-5 border-2 border-slate-300 border-t-indigo-600 rounded-full animate-spin"></div>
                   Generating Preview...
                </>
              ) : (
                <><Zap size={22} fill="currentColor" /> Generate Newsletter</>
              )}
            </button>
            
            {error && (
               <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 text-sm border border-red-100">
                 <AlertCircle size={18} />
                 {error}
               </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Left Sidebar / Navigation */}
      <div className="w-full md:w-72 bg-slate-900 text-slate-300 md:h-screen sticky top-0 z-20 flex flex-col justify-between shrink-0 shadow-2xl shadow-slate-900/20">
         <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-10 text-white">
               <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                 <LayoutTemplate className="text-white" size={20} />
               </div>
               <span className="font-bold text-xl tracking-tight">Newsletter<span className="text-indigo-400">Architect</span></span>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 px-3">Pipeline Config</h2>
              
              <div className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 ${step === 1 ? 'bg-indigo-600/10 text-white translate-x-1' : 'hover:text-white hover:bg-slate-800'}`}>
                <Settings2 size={20} className={step === 1 ? 'text-indigo-400' : 'text-slate-500'} />
                <span className="text-sm font-medium">Brand Identity</span>
              </div>
              
              <div className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 ${step === 2 ? 'bg-indigo-600/10 text-white translate-x-1' : 'hover:text-white hover:bg-slate-800'}`}>
                <Target size={20} className={step === 2 ? 'text-indigo-400' : 'text-slate-500'} />
                <span className="text-sm font-medium">Target Audience</span>
              </div>
              
              <div className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 ${step === 3 ? 'bg-indigo-600/10 text-white translate-x-1' : 'hover:text-white hover:bg-slate-800'}`}>
                <PenTool size={20} className={step === 3 ? 'text-indigo-400' : 'text-slate-500'} />
                <span className="text-sm font-medium">Style & Tone</span>
              </div>

              <div className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-300 ${step === 4 ? 'bg-indigo-600/10 text-white translate-x-1' : 'hover:text-white hover:bg-slate-800'}`}>
                <Zap size={20} className={step === 4 ? 'text-indigo-400' : 'text-slate-500'} />
                <span className="text-sm font-medium">Generate</span>
              </div>
            </div>
         </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 md:px-12 py-12">
          
          <header className="mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-3 tracking-tight">
              Design Your <span className="text-indigo-600">Newsletter</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl font-light leading-relaxed">
              Configure the parameters for your automated content engine. We'll generate a live preview based on your brand's unique profile.
            </p>
          </header>

          <StepWizard currentStep={step} />

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12 mt-10">
             {/* Form Section */}
             <div className="xl:col-span-5 flex flex-col">
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 p-6 md:p-10 flex-1 border border-slate-100">
                   {renderFormStep()}

                   {/* Navigation Buttons */}
                   {step < 4 && (
                     <div className="flex items-center justify-between mt-10 pt-8 border-t border-slate-100">
                        {step > 1 ? (
                          <button 
                            onClick={handleBack}
                            className="text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                          >
                            <ArrowLeft size={18} /> Back
                          </button>
                        ) : <div />}
                        
                        <button
                          onClick={handleNext}
                          disabled={!canProceed()}
                          className={`
                            flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white shadow-lg transition-all duration-300
                            ${canProceed() 
                              ? 'bg-slate-900 hover:bg-indigo-600 hover:shadow-indigo-500/30 active:translate-y-0.5' 
                              : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'}
                          `}
                        >
                          Continue <ArrowRight size={18} />
                        </button>
                     </div>
                   )}
                </div>
             </div>

             {/* Preview Section */}
             <div className="xl:col-span-7">
                <PreviewPane 
                  content={generatedContent} 
                  isLoading={isLoading} 
                  onRegenerate={handleGenerate} 
                />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}