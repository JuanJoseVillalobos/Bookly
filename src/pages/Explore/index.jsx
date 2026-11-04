import React from 'react';
import { Compass, Sparkles, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { experiences } from '../../data/experiences';
import { formatCurrency } from '../../utils/formatters';
import { Card, Badge, Button } from '../../components/common';

export default function Explore() {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-sand-gold-dark">
          Catálogo Completo
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest mt-1">
          Explorar Experiencias
        </h1>
        <p className="text-charcoal-muted mt-2 max-w-2xl text-sm sm:text-base">
          Encuentra la aventura ideal para tu próximo viaje. Filtra por categoría, ubicación y presupuesto.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {experiences.map((item) => (
          <Card key={item.id} hoverEffect className="flex flex-col justify-between p-6 sm:p-7">
            <div>
              <div className="flex items-center justify-between text-xs text-charcoal-muted mb-4">
                <Badge variant="gold" size="sm" icon={<Sparkles className="w-3 h-3" />}>
                  {item.category}
                </Badge>
                <span className="flex items-center gap-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-forest/70" /> {item.location}
                </span>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-bold text-charcoal mb-2.5">
                {item.title}
              </h2>
              <p className="text-sm text-charcoal-muted leading-relaxed mb-6">
                {item.shortDescription}
              </p>
            </div>

            <div className="pt-4 border-t border-stone flex items-center justify-between">
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-charcoal-light">Tarifa</span>
                <span className="font-serif text-lg font-bold text-forest">
                  {formatCurrency(item.price, item.currency)}
                  <span className="font-sans text-xs text-charcoal-muted font-normal"> / persona</span>
                </span>
              </div>
              <Link to={`/experience/${item.id}`}>
                <Button variant="outline" size="sm">
                  Ver detalles
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
