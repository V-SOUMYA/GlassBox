
import React from 'react';
import { LocalExplanationResponse } from '../types';

interface LocalExplanationProps {
  data: LocalExplanationResponse;
}

const LocalExplanation: React.FC<LocalExplanationProps> = ({ data }) => {
  const sortedContributions = (Object.entries(data.contributions) as [string, number][])
    .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));

  return (
    <div className="bg-[#F8F4E1]/30 backdrop-blur-3xl p-10 rounded-[3rem] shadow-2xl shadow-stone-900/5 border border-[#AF8F6F]/40 h-[550px] flex flex-col hover:shadow-stone-900/10 transition-all duration-700">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h3 className="text-2xl font-black text-[#543310] tracking-tight">Local Variance</h3>
          <p className="text-[10px] font-black text-[#74512D] uppercase tracking-[0.4em] mt-2">Specific Inference Vectors</p>
        </div>
        <div className="text-right p-4 bg-[#F8F4E1]/60 rounded-[1.5rem] border border-[#AF8F6F]/50 shadow-xl">
          <span className="text-[10px] text-[#74512D] uppercase font-black tracking-widest block mb-1">Likelihood</span>
          <div className="text-3xl font-black text-[#543310]">{(data.prediction * 100).toFixed(1)}%</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
        <table className="min-w-full">
          <thead className="sticky top-0 bg-[#F8F4E1]/40 backdrop-blur-xl z-10">
            <tr className="border-b-2 border-[#AF8F6F]/50">
              <th className="text-left py-4 text-[11px] font-black text-[#74512D] uppercase tracking-widest pl-3">Dimension</th>
              <th className="text-right py-4 text-[11px] font-black text-[#74512D] uppercase tracking-widest pr-3">Delta Impact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#AF8F6F]/20">
            {sortedContributions.map(([feature, value], idx) => (
              <tr key={idx} className="group">
                <td className="py-5 pl-3">
                  <span className="text-sm font-black text-[#543310] group-hover:text-[#3d2b1f] transition-colors">
                    {feature}
                  </span>
                </td>
                <td className="py-5 text-right pr-3">
                  <div className="flex items-center justify-end space-x-4">
                    <span className={`text-xs font-black font-mono px-3 py-1.5 rounded-xl border ${value >= 0 ? 'bg-amber-900/10 text-amber-950 border-amber-900/20' : 'bg-red-900/10 text-red-950 border-red-900/20'}`}>
                      {value >= 0 ? `+${value.toFixed(4)}` : value.toFixed(4)}
                    </span>
                    <div className="w-20 h-2 bg-[#AF8F6F]/20 rounded-full overflow-hidden shadow-inner">
                      {value >= 0 ? (
                        <div className="h-full bg-[#543310]" style={{ width: `${Math.min(value * 200, 100)}%` }}></div>
                      ) : (
                        <div className="h-full bg-red-900 ml-auto" style={{ width: `${Math.min(Math.abs(value) * 200, 100)}%` }}></div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(175, 143, 111, 0.1);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #74512D;
          border-radius: 20px;
          border: 3px solid rgba(248, 244, 225, 1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #543310;
        }
      `}</style>
    </div>
  );
};

export default LocalExplanation;
