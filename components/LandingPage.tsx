import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Zap, LayoutTemplate, BarChart3, Globe2 } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      onEnter();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900 flex flex-col">
       {/* Simple Header */}
       <header className="px-6 py-6 md:px-12 flex justify-between items-center bg-white/50 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-100">
          <div className="flex items-center gap-3 text-slate-900">
               <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                 <LayoutTemplate className="text-white" size={20} />
               </div>
               <span className="font-bold text-xl tracking-tight">Newsletter<span className="text-indigo-600">Architect</span></span>
          </div>
          <button onClick={onEnter} className="text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors hidden md:block">
            Already have access? Log in
          </button>
       </header>

       <div className="flex-1 flex flex-col lg:flex-row max-w-7xl mx-auto w-full px-6 md:px-12 py-12 lg:py-20 gap-16 items-center">
          {/* Left Content */}
          <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wide">
                <Zap size={14} fill="currentColor" />
                <span>Automated Content Engine</span>
             </div>
             
             <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                Scale your newsletter <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">without the grind.</span>
             </h1>
             
             <p className="text-xl text-slate-500 leading-relaxed max-w-xl">
                Configure your AI-driven content pipeline in minutes. We build the architecture, you own the audience.
             </p>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                    <CheckCircle2 className="text-indigo-500 shrink-0 mt-0.5" size={20} />
                    <div>
                        <h4 className="font-bold text-slate-900">Brand Alignment</h4>
                        <p className="text-sm text-slate-500">AI that learns your specific tone of voice.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-100 shadow-sm">
                    <BarChart3 className="text-indigo-500 shrink-0 mt-0.5" size={20} />
                    <div>
                        <h4 className="font-bold text-slate-900">Consistent Growth</h4>
                        <p className="text-sm text-slate-500">Automate daily or weekly outputs effortlessly.</p>
                    </div>
                  </div>
             </div>
          </div>

          {/* Right Form Card */}
          <div className="w-full max-w-md animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
             <div className="bg-white p-8 rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -mr-16 -mt-16 opacity-50 pointer-events-none"></div>

                <h3 className="text-2xl font-bold text-slate-900 mb-2 relative z-10">Get Early Access</h3>
                <p className="text-slate-500 mb-8 text-sm relative z-10">Start building your automated configuration.</p>

                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                   <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                      <input 
                        required
                        type="text" 
                        className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400"
                        placeholder="Jane Doe"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                   </div>
                   
                   <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Work Email</label>
                      <input 
                        required
                        type="email" 
                        className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400"
                        placeholder="jane@company.com"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                   </div>

                   <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Company Name</label>
                      <input 
                        type="text" 
                        className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400"
                        placeholder="Acme Inc."
                        value={formData.company}
                        onChange={e => setFormData({...formData, company: e.target.value})}
                      />
                   </div>

                   <button 
                     type="submit"
                     className="w-full py-4 rounded-xl font-bold text-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl hover:shadow-indigo-500/30 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group mt-2"
                   >
                     Start Building <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                   </button>
                </form>
             </div>
             
             <div className="flex items-center justify-center gap-6 mt-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
               {/* Dummy Logos for social proof */}
               <div className="flex items-center gap-1 font-bold text-slate-400"><Globe2 size={16}/> GlobalScale</div>
               <div className="h-4 w-px bg-slate-300"></div>
               <div className="flex items-center gap-1 font-bold text-slate-400"><Zap size={16}/> FastCompany</div>
             </div>
          </div>
       </div>
    </div>
  );
};