
import React, { useState, FormEvent } from 'react';

interface UploadFormProps {
  onAnalyze: (formData: FormData) => void;
  isLoading: boolean;
}

const UploadForm: React.FC<UploadFormProps> = ({ onAnalyze, isLoading }) => {
  const [modelFile, setModelFile] = useState<File | null>(null);
  const [datasetFile, setDatasetFile] = useState<File | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!modelFile || !datasetFile) {
      alert('Please select both a model and a dataset to proceed.');
      return;
    }

    const formData = new FormData();
    formData.append('model', modelFile);
    formData.append('dataset', datasetFile);
    // Note: target_column and protected_attribute removed per request

    onAnalyze(formData);
  };

  return (
    <div className="bg-[#F8F4E1]/30 backdrop-blur-3xl rounded-[3rem] shadow-2xl shadow-stone-900/10 border border-[#AF8F6F]/40 p-12 max-w-5xl mx-auto transition-all hover:scale-[1.01] duration-500">
      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* File Upload Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="group relative">
              <label className="block text-xs font-black text-[#543310] uppercase tracking-widest mb-4 ml-1">Model Engine</label>
              <div className={`h-52 flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-[2rem] transition-all duration-300 ${modelFile ? 'border-[#543310] bg-[#AF8F6F]/30 shadow-inner' : 'border-[#AF8F6F] hover:border-[#543310] hover:bg-[#F8F4E1]/40'}`}>
                <input 
                  type="file" 
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                  accept=".joblib,.pkl,.sav"
                  onChange={(e) => setModelFile(e.target.files?.[0] || null)}
                />
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 ${modelFile ? 'bg-[#543310] text-[#F8F4E1] rotate-12 scale-110' : 'bg-[#AF8F6F]/40 text-[#543310] group-hover:scale-110'}`}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <p className="text-sm font-black text-[#543310] truncate max-w-full px-2 text-center">
                  {modelFile ? modelFile.name : 'Choose model'}
                </p>
                <p className="text-[10px] text-[#74512D] font-bold mt-2 uppercase tracking-tighter">.joblib, .pkl, .sav</p>
              </div>
            </div>

            <div className="group relative">
              <label className="block text-xs font-black text-[#543310] uppercase tracking-widest mb-4 ml-1">Dataset Source</label>
              <div className={`h-52 flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-[2rem] transition-all duration-300 ${datasetFile ? 'border-[#543310] bg-[#AF8F6F]/30 shadow-inner' : 'border-[#AF8F6F] hover:border-[#543310] hover:bg-[#F8F4E1]/40'}`}>
                <input 
                  type="file" 
                  className="absolute inset-0 opacity-0 cursor-pointer" 
                  accept=".csv"
                  onChange={(e) => setDatasetFile(e.target.files?.[0] || null)}
                />
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 ${datasetFile ? 'bg-[#543310] text-[#F8F4E1] -rotate-12 scale-110' : 'bg-[#AF8F6F]/40 text-[#543310] group-hover:scale-110'}`}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-sm font-black text-[#543310] truncate max-w-full px-2 text-center">
                  {datasetFile ? datasetFile.name : 'Choose dataset'}
                </p>
                <p className="text-[10px] text-[#74512D] font-bold mt-2 uppercase tracking-tighter">.csv format</p>
              </div>
            </div>
          </div>

          {/* Action Area */}
          <div className="flex flex-col justify-center">
            <div className="mt-10">
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full overflow-hidden rounded-3xl py-6 px-10 font-black text-xl text-[#F8F4E1] transition-all duration-500 shadow-2xl ${
                  isLoading 
                    ? 'bg-[#74512D] cursor-not-allowed opacity-70' 
                    : 'bg-[#543310] hover:bg-[#3d2b1f] hover:shadow-[#543310]/40 active:scale-95 border border-[#74512D]'
                }`}
              >
                <div className="relative z-10 flex items-center justify-center space-x-3">
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-6 w-6 text-[#F8F4E1]" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="tracking-widest uppercase text-sm">Deciphering...</span>
                    </>
                  ) : (
                    <>
                      <span className="tracking-widest uppercase text-sm">Unleash Transparency</span>
                      <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </div>
                {/* Gloss effect */}
                <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-[#F8F4E1]/10 to-transparent group-hover:left-full transition-all duration-1000 pointer-events-none"></div>
              </button>
            </div>
            <p className="text-center mt-6 text-[#74512D] text-xs font-bold uppercase tracking-widest opacity-60">
              Upload artifacts to begin deep analysis
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadForm;
