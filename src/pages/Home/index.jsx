import React from 'react';
import { Compass, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { experiences } from '../../data/experiences';
import { businessConfig } from '../../config/businessConfig';
import { formatCurrency } from '../../utils/formatters';

export default function Home() {
  const featuredExperiences = experiences.slice(0, 3);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero section */}
      <div className="text-center py-12 md:py-20">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#173F35]/10 text-[#173F35] text-xs font-semibold uppercase tracking-wider mb-6">
          <Compass className="w-4 h-4" />
          <span>{businessConfig.tagline}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-[#173F35] tracking-tight mb-4">
          Descubre. Reserva. Vive la experiencia.
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-8 font-light">
          {businessConfig.description}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/explore"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#173F35] text-[#F7F5EF] font-medium hover:bg-[#173F35]/90 transition-colors shadow-sm"
          >
            <span>Explorar Experiencias</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#featured"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg border border-[#E8E5DC] bg-white text-[#222824] font-medium hover:bg-gray-50 transition-colors"
          >
            Ver destacadas
          </a>
        </div>
      </div>

      {/* Featured Section */}
      <section id="featured" className="py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#173F35]">Experiencias Destacadas</h2>
            <p className="text-sm text-gray-500">Selección curada para tu próxima aventura</p>
          </div>
          <Link to="/explore" className="text-sm font-medium text-[#173F35] hover:underline flex items-center gap-1">
            Ver todas <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredExperiences.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-[#E8E5DC] p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1 text-[#C5A77A] font-semibold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" /> {item.category}
                  </span>
                  <span className="flex items-center gap-1 text-gray-500">
                    <MapPin className="w-3.5 h-3.5" /> {item.location}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#222824] mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {item.shortDescription}
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-[#E8E5DC]">
                <span className="text-sm font-bold text-[#173F35]">
                  {formatCurrency(item.price, item.currency)} <span className="text-xs text-gray-500 font-normal">/ persona</span>
                </span>
                <Link to={`/experience/${item.id}`} className="text-xs font-semibold text-[#173F35] hover:underline">
                  Ver detalles →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

