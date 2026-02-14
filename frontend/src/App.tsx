
import React, { useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import UploadForm from './components/UploadForm';
import ProjectSummaryCard from './components/ProjectSummaryCard';
import RiskFlagsCard from './components/RiskFlagsCard';
import CodeAnalysisCard from './components/CodeAnalysisCard';
import DatasetProfileCard from './components/DatasetProfileCard';
import { GlassBoxState, ProjectResponse } from './types';

const API_BASE_URL = 'http://127.0.0.1:8000';

const App: React.FC = () => {
  const [state, setState] = useState<GlassBoxState>({
    projectData: null,
    loading: false,
    error: null,
  });

  const handleAnalyze = async (formData: FormData) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await axios.post<ProjectResponse>(
        `${API_BASE_URL}/analyze/project`, 
        formData
      );

      setState({
        projectData: response.data,
        loading: false,
        error: null,
      });

      setTimeout(() => {
        document.getElementById('analysis-results')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);

    } catch (err: any) {
      console.error('API Error:', err);
      setState(prev => ({ 
        ...prev, 
        loading: false, 
        error: err.response?.data?.detail || 'Analysis failed. Please verify the backend is running at http://127.0.0.1:8000' 
      }));
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden selection:bg-[#74512D] selection:text-[#F8F4E1]">
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
            <div className="bg-[#543310]/10 backdrop-blur-md border border-[#74512D]/30 p-5 mb-8 rounded-[2rem] animate-pulse">
              <div className="flex items-center">
                <svg className="h-6 w-6 text-red-900 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-sm font-black text-[#543310]">{state.error}</p>
              </div>
            </div>
          )}

          {state.projectData && (
            <div id="analysis-results" className="space-y-10 animate-in slide-in-from-bottom-10 fade-in duration-1000">
              <div className="flex items-center justify-between px-2">
                <h2 className="text-3xl font-black text-[#543310] tracking-tighter">Project Intelligence</h2>
                <div className="px-5 py-2 bg-[#F8F4E1]/40 border border-[#AF8F6F]/40 rounded-full text-[#543310] text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md">
                  Audit Snapshot
                </div>
              </div>

              <div className="grid grid-cols-1 gap-10">
                <ProjectSummaryCard 
                  summary={state.projectData.project_summary} 
                  explanation={state.projectData.simple_explanation} 
                />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <RiskFlagsCard flags={state.projectData.risk_flags} />
                  <CodeAnalysisCard analysis={state.projectData.code_analysis} />
                </div>

                <DatasetProfileCard profile={state.projectData.dataset_profile} />
              </div>
            </div>
          )}

          {!state.projectData && !state.loading && !state.error && (
            <div className="text-center py-24 border-2 border-dashed border-[#AF8F6F]/50 rounded-[4rem] bg-[#F8F4E1]/10 backdrop-blur-md transition-all hover:bg-[#F8F4E1]/20">
              <div className="mx-auto w-24 h-24 bg-[#AF8F6F]/20 rounded-[2.5rem] flex items-center justify-center mb-8 shadow-inner border border-[#AF8F6F]/30">
                <svg className="w-12 h-12 text-[#543310]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-3xl font-black text-[#543310] tracking-tight">Awaiting Project Manifest</h3>
              <p className="text-[#74512D] max-w-sm mx-auto mt-4 font-bold text-lg leading-relaxed">
                Connect your model and data to generate a complete transparency report.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
