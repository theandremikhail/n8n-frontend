import React from 'react';
import { Check } from 'lucide-react';
import { STEPS } from '../constants';

interface StepWizardProps {
  currentStep: number;
}

export const StepWizard: React.FC<StepWizardProps> = ({ currentStep }) => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between w-full relative max-w-4xl mx-auto">
        {/* Background Line */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-[2px] bg-slate-200 -z-10" />
        
        {/* Active Progress Line */}
        <div 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 h-[2px] bg-indigo-600 -z-10 transition-all duration-700 ease-in-out" 
            style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
        />
        
        {STEPS.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center group relative">
              <div 
                className={`
                  w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-[3px] 
                  transition-all duration-500 z-10 bg-white
                  ${isActive 
                    ? 'border-indigo-600 text-indigo-600 scale-110 shadow-lg shadow-indigo-500/20' 
                    : isCompleted 
                      ? 'bg-indigo-600 border-indigo-600 text-white' 
                      : 'border-slate-200 text-slate-300'}
                `}
              >
                {isCompleted ? <Check size={16} strokeWidth={3} /> : <span className="font-bold text-xs md:text-sm">{step.id}</span>}
              </div>
              
              <div className="absolute mt-12 md:mt-14 hidden md:flex flex-col items-center w-32 text-center">
                 <span className={`text-sm font-semibold transition-colors duration-300 ${isActive ? 'text-indigo-600' : isCompleted ? 'text-slate-700' : 'text-slate-400'}`}>
                    {step.title}
                 </span>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Mobile only label */}
      <div className="mt-8 md:hidden text-center bg-white p-4 rounded-xl shadow-sm border border-slate-100">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-1">Step {currentStep}</span>
          <h3 className="text-lg font-bold text-slate-900">{STEPS[currentStep - 1].title}</h3>
          <p className="text-sm text-slate-500">{STEPS[currentStep - 1].description}</p>
      </div>
    </div>
  );
};