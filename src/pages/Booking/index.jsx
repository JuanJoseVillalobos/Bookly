import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Users, Send } from 'lucide-react';
import { Button, Input, Select, Card } from '../../components/common';

export default function Booking() {
  const { id } = useParams();
  const [guests, setGuests] = useState('2');
  const [timeSlot, setTimeSlot] = useState('');

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <Link to={`/experience/${id}`} className="inline-flex items-center gap-2 text-sm text-forest font-medium mb-6 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Volver a la experiencia
      </Link>

      <Card className="p-8 sm:p-10">
        <div className="mb-8 border-b border-stone pb-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-sand-gold-dark">
            Proceso de Reserva
          </span>
          <h1 className="font-serif text-3xl font-bold text-forest mt-1">
            Solicitar Reserva — Experiencia #{id}
          </h1>
          <p className="text-sm text-charcoal-muted mt-2">
            Completa tus preferencias para que el operador confirme la disponibilidad.
          </p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="Fecha preferida"
              type="date"
              id="booking-date"
              required
              leftIcon={<Calendar className="w-4 h-4" />}
            />
            <Select
              label="Turno preferido"
              id="booking-time"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              placeholder="Selecciona un horario"
              options={[
                { value: '09:00', label: '09:00 hs — Turno Mañana' },
                { value: '14:00', label: '14:00 hs — Turno Tarde' },
                { value: '18:00', label: '18:00 hs — Turno Atardecer' },
              ]}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Select
              label="Cantidad de huéspedes"
              id="booking-guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              options={[
                { value: '1', label: '1 persona' },
                { value: '2', label: '2 personas' },
                { value: '3', label: '3 personas' },
                { value: '4', label: '4 personas' },
                { value: '5+', label: '5 o más personas' },
              ]}
              required
            />
            <Input
              label="Nombre completo"
              id="booking-fullname"
              placeholder="Ej. Sofía Martínez"
              required
              autoComplete="name"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="Correo electrónico"
              type="email"
              id="booking-email"
              placeholder="nombre@correo.com"
              required
              autoComplete="email"
              hint="Recibirás aquí el estado de tu solicitud."
            />
            <Input
              label="Teléfono de contacto"
              type="tel"
              id="booking-phone"
              placeholder="+54 9 11 0000-0000"
              required
              autoComplete="tel"
              inputMode="tel"
            />
          </div>

          <div className="pt-6 border-t border-stone flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-charcoal-muted">
              * Esta solicitud está sujeta a confirmación por el operador.
            </p>
            <Link to="/confirmation" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
                rightIcon={<Send className="w-4 h-4" />}
              >
                Enviar Solicitud
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
