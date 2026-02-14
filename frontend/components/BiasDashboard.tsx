
import React from 'react';
import MetricsCard from './MetricsCard';
import { BiasResponse } from '../types';

interface BiasDashboardProps {
  data: BiasResponse;
}

const BiasDashboard: React.FC<BiasDashboardProps> = ({ data }) => {
  return (
    <div className="space-y-12">
      {/* Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <MetricsCard 
          label="Disparate Impact" 
          value={data.fairness_metrics.disparate_impact} 
          type="impact"
          description="Comparison of positive outcomes between groups. Target: 1.0."
        />
        <MetricsCard 
          label="Parity Diff." 
          value={data.fairness_metrics.statistical_parity_difference} 
          type="difference"
          description="Gap in selection rates. Lower reflects neural outcomes."
        />
        <MetricsCard 
          label="Equality Gap" 
          value={data.fairness_metrics.equal_opportunity_difference} 
          type="difference"
          description="Measures consistency of true positive results."
        />
        <MetricsCard 
          label="Avg Odds" 
          value={data.fairness_metrics.average_odds_difference} 
          type="difference"
          description="Balanced accuracy across sensitive groups."
        />
      </div>

      {/* Table Section */}
      <div className="bg-[#F8F4E1]/30 backdrop-blur-3xl rounded-[3rem] shadow-2xl shadow-stone-900/5 border border-[#AF8F6F]/40 overflow-hidden transition-all duration-700">
        <div className="px-12 py-8 border-b border-[#AF8F6F]/30 bg-[#AF8F6F]/10 flex items-center justify-between">
          <h3 className="font-black text-[#543310] text-xl tracking-tight">Segmental Performance Analysis</h3>
          <span className="text-[10px] font-black text-[#543310] uppercase tracking-widest bg-[#F8F4E1]/80 px-4 py-1.5 rounded-full shadow-md border border-[#AF8F6F]/40">
            {data.group_analysis.length} Cohorts
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#AF8F6F]/30">
            <thead>
              <tr className="bg-[#AF8F6F]/5">
                <th className="px-12 py-6 text-left text-[11px] font-black text-[#74512D] uppercase tracking-widest">Cohort Name</th>
                <th className="px-8 py-6 text-center text-[11px] font-black text-[#74512D] uppercase tracking-widest">Sample Size</th>
                <th className="px-8 py-6 text-center text-[11px] font-black text-[#74512D] uppercase tracking-widest">Model Pred.</th>
                <th className="px-8 py-6 text-center text-[11px] font-black text-[#74512D] uppercase tracking-widest">Ground Truth</th>
                <th className="px-12 py-6 text-right text-[11px] font-black text-[#74512D] uppercase tracking-widest">Residual Error</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#AF8F6F]/20">
              {data.group_analysis.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#AF8F6F]/20 transition-all duration-300 group">
                  <td className="px-12 py-6 whitespace-nowrap">
                    <span className="text-base font-black text-[#543310] group-hover:translate-x-1 inline-block transition-transform">{item.group}</span>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-center">
                    <span className="text-sm font-black text-[#74512D]">{item.count.toLocaleString()}</span>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-center">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-xl bg-[#F8F4E1]/60 text-xs font-black text-[#543310] border border-[#AF8F6F]/20">
                      {(item.avg_prediction * 100).toFixed(1)}%
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap text-center">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-xl bg-[#AF8F6F]/20 text-xs font-black text-[#74512D]">
                      {(item.avg_actual * 100).toFixed(1)}%
                    </div>
                  </td>
                  <td className="px-12 py-6 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end space-x-4">
                      <div className="w-28 bg-[#AF8F6F]/20 rounded-full h-2 shadow-inner">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${item.rmse > 0.3 ? 'bg-orange-900/60' : 'bg-[#543310]'}`} 
                          style={{ width: `${Math.min(item.rmse * 150, 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-black text-[#543310] min-w-[3rem]">{item.rmse.toFixed(3)}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BiasDashboard;
