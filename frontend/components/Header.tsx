
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-20 text-center">
      <div className="inline-flex items-center justify-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-[#543310] rounded-xl flex items-center justify-center shadow-2xl shadow-stone-900/40 border border-[#74512D]">
          <svg className="w-7 h-7 text-[#F8F4E1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h1 className="text-5xl font-black tracking-tighter text-[#543310] sm:text-6xl">
          GlassBox
        </h1>
      </div>
      <p className="mt-2 text-2xl text-[#74512D] max-w-2xl mx-auto font-black tracking-tight opacity-90">
        Transparent machine learning, explained.
      </p>
    </header>
  );
};

export default Header;
