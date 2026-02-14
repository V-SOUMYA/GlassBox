
import React from 'react';

interface ProjectSummaryCardProps {
  summary: string;
  explanation: string;
}

const ProjectSummaryCard: React.FC<ProjectSummaryCardProps> = ({ summary, explanation }) => {
  return (
    <div className="bg-[#F8F4E1]/30 backdrop-blur-3xl p-12 rounded-[3.5rem] shadow-2xl shadow-stone-900/5 border border-[#AF8F6F]/40 hover:shadow-stone-900/10 transition-all duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h3 className="text-[11px] font-black text-[#74512D] uppercase tracking-[0.4em] mb-4">Executive Summary</h3>
            <p className="text-2xl font-black text-[#543310] leading-tight tracking-tight">
              {summary || "No project summary available."}
            </p>
          </div>
          <div className="h-px bg-[#AF8F6F]/30 w-1/3"></div>
          <div>
            <h3 className="text-[11px] font-black text-[#74512D] uppercase tracking-[0.4em] mb-4">Plain Language Explanation</h3>
            <p className="text-lg text-[#543310] font-bold opacity-90 leading-relaxed italic">
              "{explanation || "A simple explanation will appear here after analysis."}"
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center lg:border-l border-[#AF8F6F]/20 lg:pl-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-[#543310] rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl">
              <svg className="w-10 h-10 text-[#F8F4E1]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-[10px] font-black text-[#74512D] uppercase tracking-widest">System Status</p>
            <p className="text-sm font-black text-[#543310] mt-1">Audit Complete</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSummaryCard;
