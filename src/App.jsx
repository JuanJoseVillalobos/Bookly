import React from 'react';
import { Compass, Calendar, Sparkles } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-[#F7F5EF] text-[#222824] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-sm border border-[#E8E5DC] p-8">
        <div className="inline-flex p-3 rounded-full bg-[#173F35]/10 text-[#173F35] mb-4">
          <Compass className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-[#173F35] tracking-tight mb-2">
          Bookly
        </h1>
        <p className="text-[#C5A77A] font-medium text-sm tracking-wide uppercase mb-4">
          Discover. Book. Experience.
        </p>
        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          Base application initialized successfully with React, Vite, Tailwind CSS, Lucide icons, React Router, and i18next.
        </p>
        <div className="flex items-center justify-center gap-3 text-xs text-gray-500 border-t border-[#E8E5DC] pt-4">
          <span className="flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-[#C5A77A]" /> Ready for Features
          </span>
          <span>|</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-[#173F35]" /> Milestone 0
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;

