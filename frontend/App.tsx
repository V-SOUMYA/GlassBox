
import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import UploadForm from './components/UploadForm';
import BiasDashboard from './components/BiasDashboard';
import FeatureChart from './components/FeatureChart';
import LocalExplanation from './components/LocalExplanation';
import { GlassBoxState, BiasResponse, FeatureImportanceResponse, LocalExplanationResponse } from './types';

const API_BASE_URL = 'http://127.0.0.1:8000';

const App: React.FC = () => {
  const [state, setState] = useState<GlassBoxState>({
    bias: null,
    importance: null,
    local: null,
    loading: false,
    error: null,
  });

  const handleAnalyze = async (formData: FormData) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const [biasRes, importanceRes, localRes] = await Promise.all([
        axios.post<BiasResponse>(`${API_BASE_URL}/analyze/bias`, formData),
        axios.post<FeatureImportanceResponse>(`${API_BASE_URL}/explain/feature-importance`, formData),
        axios.post<LocalExplanationResponse>(`${API_BASE_URL}/explain/local`, formData),
      ]);

      setState({
        bias: biasRes.data,
        importance: importanceRes.data,
        local: localRes.data,
        loading: false,
        error: null,
      });

      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);

    } catch (err: any) {
      console.error('API Error:', err);
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: err.response?.data?.detail || 'An unexpected error occurred. Please ensure your backend is running at http://127.0.0.1:8000' 
      }));
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative Warm Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] bg-[#74512D]/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] bg-[#543310]/15 rounded-full blur-[140px] pointer-events-none"></div>
      
      <div className="relative z-10 pb-20">
        <Header />
        
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <section className="mb-16">
            <UploadForm onAnalyze={handleAnalyze} isLoading={state.loading} />
          </section>

          {state.error && (
            <div className="bg-[#543310]/10 backdrop-blur-md border border-[#74512D]/30 p-4 mb-8 rounded-2xl animate-pulse">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-[#543310] mr-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-sm font-bold text-[#543310]">{state.error}</p>
              </div>
            </div>
          )}

          {state.bias && state.importance && state.local && (
            <div id="results-section" className="space-y-12 animate-in slide-in-from-bottom-10 fade-in duration-1000">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black text-[#543310] tracking-tight">Analytical Insights</h2>
                <div className="px-4 py-2 bg-[#F8F4E1]/30 border border-[#AF8F6F]/40 rounded-full text-[#543310] text-xs font-black uppercase tracking-widest backdrop-blur-md">
                  Live Report
                </div>
              </div>
              
              <BiasDashboard data={state.bias} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <FeatureChart data={state.importance} />
                <LocalExplanation data={state.local} />
              </div>
            </div>
          )}

          {!state.bias && !state.loading && !state.error && (
            <div className="text-center py-24 border-2 border-dashed border-[#AF8F6F]/50 rounded-[3rem] bg-[#F8F4E1]/20 backdrop-blur-md transition-all hover:bg-[#F8F4E1]/30">
              <div className="mx-auto w-24 h-24 bg-[#AF8F6F]/20 rounded-[2rem] flex items-center justify-center mb-8 shadow-inner border border-[#AF8F6F]/30">
                <svg className="w-12 h-12 text-[#543310]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-3xl font-black text-[#543310]">Ready for analysis?</h3>
              <p className="text-[#74512D] max-w-sm mx-auto mt-4 font-bold text-lg leading-relaxed">Upload model engine to uncover hidden patterns and bias metrics.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
