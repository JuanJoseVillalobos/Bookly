import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ArrowLeft } from 'lucide-react';
import { Button, Card } from '../../components/common';

export default function NotFound() {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-lg mx-auto text-center">
      <Card className="p-8 sm:p-12">
        <div className="inline-flex p-3.5 rounded-full bg-forest-subtle text-forest mb-6">
          <HelpCircle className="w-10 h-10" />
        </div>
        <span className="font-serif text-6xl font-bold text-forest block mb-2">404</span>
        <h1 className="font-serif text-2xl font-bold text-charcoal mb-3">Página no encontrada</h1>
        <p className="text-sm text-charcoal-muted leading-relaxed mb-8">
          La ruta a la que intentas acceder no existe o fue reubicada dentro del sistema.
        </p>
        <Link to="/">
          <Button variant="primary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Ir al inicio
          </Button>
        </Link>
      </Card>
    </div>
  );
}
