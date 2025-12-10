import React from 'react';
import { GeneratedContent } from '../types';
import { Mail, RefreshCw, Copy, CheckCheck, Smartphone, Monitor } from 'lucide-react';

interface PreviewPaneProps {
  content: GeneratedContent | null;
  isLoading: boolean;
  onRegenerate: () => void;
}

export const PreviewPane: React.FC<PreviewPaneProps> = ({ content, isLoading, onRegenerate }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    if (content) {
      const textToCopy = `Subject: ${content.subject}\n\n${content.body.replace(/<[^>]*>/g, '')}`;
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl shadow-indigo-500/5 border border-white overflow-hidden h-[700px] flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 via-white to-slate-50 z-0 opacity-50" />
        <div className="z-10 flex flex-col items-center animate-pulse p-8">
           <div className="w-20 h-20 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
             <RefreshCw className="text-indigo-600 animate-spin" size={32} />
           </div>
           <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Crafting Content...</h3>
           <p className="text-slate-500 mt-3 text-center max-w-sm text-sm leading-relaxed">
             Analyzing your brand values and generating a personalized newsletter structure.
           </p>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200 h-[700px] flex flex-col items-center justify-center text-slate-400 gap-4 group hover:border-indigo-200 hover:bg-indigo-50/30 transition-all duration-300">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
           <Mail size={32} className="text-slate-300 group-hover:text-indigo-300" />
        </div>
        <p className="font-medium text-slate-400">Preview will appear here</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden h-[800px] flex flex-col relative group">
      {/* Window Controls / Header */}
      <div className="bg-slate-50/80 backdrop-blur-md border-b border-slate-200 p-4 flex items-center justify-between z-10 sticky top-0">
        <div className="flex items-center gap-2">
           <div className="flex gap-1.5 ml-2">
            <div className="w-3 h-3 rounded-full bg-slate-300" />
            <div className="w-3 h-3 rounded-full bg-slate-300" />
            <div className="w-3 h-3 rounded-full bg-slate-300" />
           </div>
        </div>
        
        <div className="flex items-center gap-2 bg-slate-200/50 px-3 py-1.5 rounded-lg">
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Preview Mode</span>
        </div>

        <div className="flex gap-1">
           <button 
             onClick={onRegenerate}
             className="p-2 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-indigo-600 hover:shadow-sm"
             title="Regenerate"
           >
             <RefreshCw size={18} />
           </button>
           <button 
             onClick={handleCopy}
             className="p-2 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-indigo-600 hover:shadow-sm"
             title="Copy Text"
           >
             {copied ? <CheckCheck size={18} /> : <Copy size={18} />}
           </button>
        </div>
      </div>

      {/* Email Meta */}
      <div className="px-8 py-6 border-b border-slate-50 bg-white relative">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-4">
             <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">
                {content.subject}
             </h2>
             <span className="shrink-0 text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded">Inbox</span>
          </div>
          <p className="text-sm text-slate-500 font-medium flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
            <span className="text-slate-400 font-normal">Preheader:</span> {content.preheader}
          </p>
        </div>
      </div>

      {/* Email Body Scrollable */}
      <div className="flex-1 overflow-y-auto p-8 md:p-10 bg-white scroll-smooth custom-scrollbar">
         <div className="max-w-2xl mx-auto">
             <div 
               className="prose prose-lg prose-indigo max-w-none text-slate-600 leading-8 prose-headings:text-slate-900 prose-headings:font-bold prose-p:mb-6 prose-a:text-indigo-600 hover:prose-a:text-indigo-500"
               dangerouslySetInnerHTML={{ __html: content.body }} 
             />
             
             {/* Footer Simulation */}
             <div className="mt-16 pt-8 border-t border-slate-100 text-center">
                <p className="text-xs text-slate-400 mb-4">&copy; {new Date().getFullYear()} Generated Newsletter Content.</p>
                <div className="flex justify-center gap-4 text-xs text-slate-400">
                   <a href="#" className="hover:text-slate-600 underline">Unsubscribe</a>
                   <a href="#" className="hover:text-slate-600 underline">Privacy Policy</a>
                </div>
             </div>
         </div>
      </div>
    </div>
  );
};