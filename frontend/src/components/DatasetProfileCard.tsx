
import React from 'react';

interface DatasetProfileCardProps {
  profile: Record<string, string | number>;
}

const DatasetProfileCard: React.FC<DatasetProfileCardProps> = ({ profile }) => {
  const entries = Object.entries(profile);

  return (
    <div className="bg-[#F8F4E1]/30 backdrop-blur-3xl p-12 rounded-[3.5rem] shadow-2xl shadow-stone-900/5 border border-[#AF8F6F]/40 hover:shadow-stone-900/10 transition-all duration-700">
      <div className="flex items-center space-x-6 mb-12">
        <div className="w-16 h-16 bg-[#AF8F6F]/40 rounded-[1.5rem] flex items-center justify-center text-[#543310] border border-[#AF8F6F]/60">
          <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
        </div>
        <div>
          <h3 className="text-3xl font-black text-[#543310] tracking-tight">Dataset Profile</h3>
          <p className="text-[11px] font-black text-[#74512D] uppercase tracking-[0.4em] mt-1">Foundational Stat-Matrix</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {entries.length > 0 ? entries.map(([key, value], idx) => (
          <div key={idx} className="relative group">
            <div className="absolute inset-0 bg-[#543310] rounded-[2rem] translate-y-2 opacity-0 group-hover:opacity-10 transition-all"></div>
            <div className="relative bg-[#F8F4E1]/60 p-8 rounded-[2rem] border border-[#AF8F6F]/50 flex flex-col items-center justify-center text-center transition-transform group-hover:-translate-y-1">
              <span className="text-[10px] font-black text-[#74512D] uppercase tracking-widest mb-3">{key.replace(/_/g, ' ')}</span>
              <span className="text-2xl font-black text-[#543310] tracking-tighter truncate max-w-full">
                {typeof value === 'number' && value > 1000 ? value.toLocaleString() : value}
              </span>
            </div>
          </div>
        )) : (
          <p className="col-span-full text-center text-[#74512D] font-bold py-12">No profile metrics detected.</p>
        )}
      </div>
    </div>
  );
};

export default DatasetProfileCard;
