import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';

export default function Confirmation() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto text-center">
      <div className="bg-white rounded-2xl border border-[#E8E5DC] p-8 shadow-sm">
        <div className="inline-flex p-3 rounded-full bg-amber-50 text-amber-600 mb-4">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-amber-100 text-amber-800 mb-4">
          Pendiente de Aprobación
        </span>
        <h1 className="text-2xl font-bold text-[#173F35] mb-2">Solicitud Enviada con Éxito</h1>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          Tu solicitud de reserva ha sido recibida y se encuentra pendiente de revisión por el operador.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#173F35] text-white font-medium text-sm hover:bg-[#173F35]/90 transition-colors"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}

