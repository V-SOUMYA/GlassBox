
import React from 'react';
import { RiskFlag } from '../types';

interface RiskFlagsCardProps {
  flags: (string | RiskFlag)[];
}

const RiskFlagsCard: React.FC<RiskFlagsCardProps> = ({ flags }) => {
  return (
    <div className="bg-[#F8F4E1]/30 backdrop-blur-3xl p-10 rounded-[3rem] shadow-2xl shadow-stone-900/5 border border-[#AF8F6F]/40 flex flex-col h-full hover:shadow-stone-900/10 transition-all duration-700">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-black text-[#543310] tracking-tight">Risk Assessment</h3>
          <p className="text-[10px] font-black text-[#74512D] uppercase tracking-[0.4em] mt-2">Critical Flagging</p>
        </div>
        <div className="px-4 py-2 bg-red-900/10 rounded-2xl border border-red-900/20">
          <span className="text-xs font-black text-red-950 uppercase tracking-widest">{flags.length} Concerns</span>
        </div>
      </div>

      <div className="flex-1 space-y-4">
        {flags.length > 0 ? (
          flags.map((flag, idx) => {
            const isObject = typeof flag !== 'string';
            const message = isObject ? (flag as RiskFlag).message : (flag as string);
            const severity = isObject ? (flag as RiskFlag).severity : 'medium';

            return (
              <div key={idx} className="group flex items-start p-5 bg-[#F8F4E1]/40 border border-[#AF8F6F]/30 rounded-2xl transition-all hover:bg-[#AF8F6F]/20">
                <div className={`mt-1.5 w-3 h-3 rounded-full shrink-0 mr-4 ${
                  severity === 'high' ? 'bg-red-900 animate-pulse' : 
                  severity === 'medium' ? 'bg-[#74512D]' : 'bg-[#AF8F6F]'
                }`}></div>
                <p className="text-sm font-black text-[#543310] leading-snug">{message}</p>
              </div>
            );
          })
        ) : (
          <div className="h-full flex items-center justify-center border-2 border-dashed border-[#AF8F6F]/30 rounded-3xl p-8">
            <p className="text-[#74512D] font-black text-sm uppercase tracking-widest text-center">No immediate risks detected</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiskFlagsCard;
