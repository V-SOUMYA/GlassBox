
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { FeatureImportanceResponse } from '../types';

interface FeatureChartProps {
  data: FeatureImportanceResponse;
}

const FeatureChart: React.FC<FeatureChartProps> = ({ data }) => {
  const chartData = (Object.entries(data.feature_importances) as [string, number][])
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  return (
    <div className="bg-[#F8F4E1]/30 backdrop-blur-3xl p-10 rounded-[3rem] shadow-2xl shadow-stone-900/5 border border-[#AF8F6F]/40 h-[550px] flex flex-col hover:shadow-stone-900/10 transition-all duration-700">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black text-[#543310] tracking-tight">Global Influence</h3>
          <p className="text-[10px] font-black text-[#74512D] uppercase tracking-[0.4em] mt-2">Weight Distribution</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-[#AF8F6F]/40 flex items-center justify-center text-[#543310] border border-[#AF8F6F]/60">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
      </div>
      
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            layout="vertical"
            data={chartData}
            margin={{ top: 0, right: 30, left: 40, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="4 4" horizontal={true} vertical={false} stroke="#AF8F6F" opacity={0.3} />
            <XAxis type="number" hide />
            <YAxis 
              dataKey="name" 
              type="category" 
              tick={{ fontSize: 11, fontWeight: 900, fill: '#543310' }}
              width={100}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              cursor={{ fill: 'rgba(175, 143, 111, 0.1)' }}
              contentStyle={{ borderRadius: '20px', border: '1px solid #AF8F6F', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', padding: '16px', background: '#F8F4E1' }}
              itemStyle={{ color: '#543310', fontWeight: 900 }}
              labelStyle={{ fontWeight: 900, marginBottom: '4px', color: '#74512D' }}
            />
            <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={28}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? '#543310' : '#AF8F6F'} opacity={1 - (index * 0.08)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FeatureChart;
