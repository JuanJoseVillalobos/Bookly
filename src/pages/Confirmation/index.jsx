import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button, Card, Badge } from '../../components/common';

export default function Confirmation() {
  const reference = 'BKL-DEMO-' + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto text-center">
      <Card className="p-8 sm:p-12">
        <div className="inline-flex p-4 rounded-full bg-sand-gold-subtle text-sand-gold-dark mb-6">
          <Clock className="w-10 h-10" />
        </div>

        <div className="mb-4">
          <Badge variant="pending" size="md">
            Pendiente de Aprobación
          </Badge>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest mb-3">
          Solicitud de Reserva Recibida
        </h1>

        <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed mb-6">
          Tu solicitud ha sido enviada al operador turístico. Nos comunicaremos a la brevedad para confirmar la disponibilidad y coordinar tu reserva.
        </p>

        <div className="bg-ivory border border-stone rounded-xl p-4 sm:p-6 mb-8 text-left space-y-3">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="text-charcoal-muted font-medium">Referencia de demo:</span>
            <span className="font-mono font-bold text-forest">{reference}</span>
          </div>
          <div className="flex justify-between items-center text-xs sm:text-sm border-t border-stone pt-3">
            <span className="text-charcoal-muted font-medium">Estado:</span>
            <span className="font-medium text-amber-800">Pendiente de confirmación</span>
          </div>
          <div className="flex justify-between items-center text-xs sm:text-sm border-t border-stone pt-3">
            <span className="text-charcoal-muted font-medium">Nota importante:</span>
            <span className="text-charcoal text-xs">Esta simulación no constituye un cargo ni reserva definitiva.</span>
          </div>
        </div>

        <Link to="/">
          <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Volver a la página principal
          </Button>
        </Link>
      </Card>
    </div>
  );
}
