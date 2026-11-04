import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Booking() {
  const { id } = useParams();

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <Link to={`/experience/${id}`} className="inline-flex items-center gap-2 text-sm text-[#173F35] font-medium mb-6 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Volver a la experiencia
      </Link>
      <div className="bg-white rounded-xl border border-[#E8E5DC] p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-[#173F35] mb-2">Solicitud de Reserva</h1>
        <p className="text-sm text-gray-600 mb-6">
          Formulario de solicitud para la experiencia #{id}. El flujo completo se desarrollará en el hito M2.
        </p>
        <Link
          to="/confirmation"
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#173F35] text-white font-medium text-sm hover:bg-[#173F35]/90 transition-colors"
        >
          Simular Confirmación
        </Link>
      </div>
    </div>
  );
}

