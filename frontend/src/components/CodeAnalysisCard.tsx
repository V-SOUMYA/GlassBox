
import React from 'react';

interface CodeAnalysisCardProps {
  analysis: Record<string, string | number>;
}

const CodeAnalysisCard: React.FC<CodeAnalysisCardProps> = ({ analysis }) => {
  const entries = Object.entries(analysis);

  return (
    <div className="bg-[#F8F4E1]/30 backdrop-blur-3xl p-10 rounded-[3rem] shadow-2xl shadow-stone-900/5 border border-[#AF8F6F]/40 flex flex-col h-full hover:shadow-stone-900/10 transition-all duration-700">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-black text-[#543310] tracking-tight">Code Analytics</h3>
          <p className="text-[10px] font-black text-[#74512D] uppercase tracking-[0.4em] mt-2">Complexity & Health</p>
        </div>
        <div className="w-12 h-12 bg-[#543310] rounded-2xl flex items-center justify-center border border-[#74512D]">
          <svg className="w-7 h-7 text-[#F8F4E1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {entries.length > 0 ? entries.map(([key, value], idx) => (
          <div key={idx} className="bg-[#AF8F6F]/10 p-5 rounded-2xl border border-[#AF8F6F]/20 flex justify-between items-center group transition-all hover:border-[#543310]/30">
            <span className="text-[11px] font-black text-[#74512D] uppercase tracking-widest group-hover:text-[#543310]">
              {key.replace(/_/g, ' ')}
            </span>
            <span className="text-lg font-black text-[#543310] font-mono">
              {value}
            </span>
          </div>
        )) : (
          <p className="text-[#74512D] italic text-center py-10">Analysis metrics unavailable.</p>
        )}
      </div>
    </div>
  );
};

export default CodeAnalysisCard;
