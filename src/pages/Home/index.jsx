import React from 'react';
import { Compass, Sparkles, MapPin, ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { experiences } from '../../data/experiences';
import { businessConfig } from '../../config/businessConfig';
import { formatCurrency } from '../../utils/formatters';
import { Button, Card, Badge } from '../../components/common';

export default function Home() {
  const featuredExperiences = experiences.slice(0, 3);

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 sm:space-y-24">
      {/* Hero section */}
      <section className="text-center pt-8 pb-12 sm:pt-16 sm:pb-20 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-6">
          <Badge variant="forest" size="md" icon={<Compass className="w-3.5 h-3.5" />}>
            {businessConfig.tagline}
          </Badge>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-forest tracking-tight leading-[1.1] mb-6">
          Descubre. Reserva. <br className="hidden sm:inline" />
          <span className="italic font-normal">Vive la experiencia.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-charcoal-muted mb-10 font-normal leading-relaxed">
          {businessConfig.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/explore" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Explorar Experiencias
            </Button>
          </Link>
          <a href="#featured" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              Ver destacadas
            </Button>
          </a>
        </div>
      </section>

      {/* Featured Section */}
      <section id="featured" className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone pb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-sand-gold-dark">
              Selección Curada
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest mt-1">
              Experiencias Destacadas
            </h2>
          </div>
          <Link to="/explore">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Ver todo el catálogo
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredExperiences.map((item) => (
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

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal mb-2.5">
                  {item.title}
                </h3>
                <p className="text-sm text-charcoal-muted leading-relaxed mb-6 line-clamp-3">
                  {item.shortDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-stone flex items-center justify-between">
                <div>
                  <span className="block text-[11px] uppercase tracking-wider text-charcoal-light">Desde</span>
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
      </section>

      {/* Brand Values / Value Proposition */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-y border-stone">
        <div className="p-6 rounded-xl bg-white/60 border border-stone">
          <div className="p-2.5 w-fit rounded-lg bg-forest-subtle text-forest mb-4">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-forest mb-2">Curaduría Exclusiva</h3>
          <p className="text-sm text-charcoal-muted leading-relaxed">
            Cada experiencia es seleccionada con rigurosos estándares de calidad y autenticidad.
          </p>
        </div>
        <div className="p-6 rounded-xl bg-white/60 border border-stone">
          <div className="p-2.5 w-fit rounded-lg bg-forest-subtle text-forest mb-4">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-forest mb-2">Reserva Simple</h3>
          <p className="text-sm text-charcoal-muted leading-relaxed">
            Solicita tu fecha y horario preferido en sencillos pasos sin fricción.
          </p>
        </div>
        <div className="p-6 rounded-xl bg-white/60 border border-stone">
          <div className="p-2.5 w-fit rounded-lg bg-forest-subtle text-forest mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-forest mb-2">Trato Personalizado</h3>
          <p className="text-sm text-charcoal-muted leading-relaxed">
            Comunicación directa con los operadores para confirmar cada detalle.
          </p>
        </div>
      </section>
    </div>
  );
}
