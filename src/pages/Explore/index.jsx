import React from 'react';
import { Compass } from 'lucide-react';

export default function Explore() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#173F35]">Catálogo de Experiencias</h1>
        <p className="text-gray-600 mt-1">Explora y filtra las experiencias disponibles.</p>
      </div>
      <div className="bg-white rounded-xl border border-[#E8E5DC] p-12 text-center">
        <Compass className="w-10 h-10 text-[#173F35] mx-auto mb-3 opacity-60" />
        <h3 className="text-lg font-semibold text-[#222824]">Módulo de Exploración</h3>
        <p className="text-sm text-gray-500 mt-1">
          La interfaz de búsqueda y filtros avanzados se implementará en el hito M1.
        </p>
      </div>
    </div>
  );
}

