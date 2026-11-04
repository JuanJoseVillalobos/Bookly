import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function ExperienceDetails() {
  const { id } = useParams();

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <Link to="/explore" className="inline-flex items-center gap-2 text-sm text-[#173F35] font-medium mb-6 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Volver al catálogo
      </Link>
      <div className="bg-white rounded-xl border border-[#E8E5DC] p-8 shadow-sm">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A77A]">Detalle de Experiencia</span>
        <h1 className="text-3xl font-bold text-[#173F35] mt-2 mb-4">Experiencia #{id}</h1>
        <p className="text-gray-600 mb-6">
          Información detallada, galería de imágenes y disponibilidad simulada (Hito M1).
        </p>
        <Link
          to={`/booking/${id}`}
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#173F35] text-white font-medium text-sm hover:bg-[#173F35]/90 transition-colors"
        >
          Solicitar Reserva
        </Link>
      </div>
    </div>
  );
}

