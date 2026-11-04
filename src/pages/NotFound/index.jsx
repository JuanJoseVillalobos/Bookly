import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="py-20 px-4 text-center max-w-lg mx-auto">
      <div className="inline-flex p-3 rounded-full bg-[#173F35]/10 text-[#173F35] mb-4">
        <HelpCircle className="w-10 h-10" />
      </div>
      <h1 className="text-4xl font-bold text-[#173F35] mb-2">404</h1>
      <p className="text-lg font-medium text-[#222824] mb-2">Página no encontrada</p>
      <p className="text-sm text-gray-500 mb-6">
        La ruta a la que intentas acceder no existe o ha sido movida.
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#173F35] text-white font-medium text-sm hover:bg-[#173F35]/90 transition-colors"
      >
        Ir a la página principal
      </Link>
    </div>
  );
}

