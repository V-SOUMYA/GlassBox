
import React from 'react';

interface MetricsCardProps {
  label: string;
  value: number;
  description: string;
  type: 'impact' | 'difference';
}

const MetricsCard: React.FC<MetricsCardProps> = ({ label, value, description, type }) => {
  const isFair = type === 'impact' 
    ? (value >= 0.8 && value <= 1.25) 
    : (Math.abs(value) <= 0.1);

  return (
    <div className="group bg-[#F8F4E1]/40 backdrop-blur-3xl p-8 rounded-[2.5rem] shadow-2xl shadow-stone-900/5 border border-[#AF8F6F]/40 flex flex-col h-full transition-all duration-500 hover:translate-y-[-8px] hover:shadow-stone-900/10">
      <div className="flex justify-between items-start mb-6">
        <h4 className="text-[10px] font-black text-[#74512D] uppercase tracking-[0.3em]">{label}</h4>
        <div className={`w-3 h-3 rounded-full ${isFair ? 'bg-[#543310] animate-pulse' : 'bg-red-900/60'}`}></div>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className={`text-5xl font-black tracking-tighter leading-none ${isFair ? 'text-[#543310]' : 'text-red-950'}`}>
          {value.toFixed(3)}
        </span>
        <div className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${isFair ? 'bg-[#AF8F6F]/20 text-[#543310] border-[#543310]/20' : 'bg-red-900/10 text-red-900 border-red-900/20'}`}>
          {isFair ? 'Balanced' : 'Biased'}
        </div>
      </div>
      
      <p className="mt-6 text-sm text-[#543310] leading-relaxed font-black opacity-80">
        {description}
      </p>
      
      <div className="mt-auto pt-6 flex items-center space-x-2">
        <div className={`h-1.5 flex-1 rounded-full ${isFair ? 'bg-[#AF8F6F]/20' : 'bg-red-900/10'}`}>
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${isFair ? 'bg-[#543310]' : 'bg-red-900'}`} 
            style={{ width: `${Math.min(Math.abs(type === 'impact' ? value * 50 : (1 - value) * 100), 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;
