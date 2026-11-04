import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Calendar, Send } from 'lucide-react';
import { Button, Input, Select, Card } from '../../components/common';

export default function Booking() {
  const { id } = useParams();
  const { t, i18n } = useTranslation(['booking', 'common']);
  const [guests, setGuests] = useState('2');
  const [timeSlot, setTimeSlot] = useState('');

  const isEn = (i18n.resolvedLanguage || i18n.language || 'es').startsWith('en');

  const guestOptions = [
    { value: '1', label: isEn ? '1 person' : '1 persona' },
    { value: '2', label: isEn ? '2 people' : '2 personas' },
    { value: '3', label: isEn ? '3 people' : '3 personas' },
    { value: '4', label: isEn ? '4 people' : '4 personas' },
    { value: '5+', label: isEn ? '5 or more people' : '5 o más personas' },
  ];

  const timeSlotOptions = [
    { value: '09:00', label: isEn ? '09:00 AM — Morning' : '09:00 hs — Turno Mañana' },
    { value: '14:00', label: isEn ? '02:00 PM — Afternoon' : '14:00 hs — Turno Tarde' },
    { value: '18:00', label: isEn ? '06:00 PM — Sunset' : '18:00 hs — Turno Atardecer' },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <Link to={`/experience/${id}`} className="inline-flex items-center gap-2 text-sm text-forest font-medium mb-6 hover:underline">
        <ArrowLeft className="w-4 h-4" /> {t('actions.backToExperience')}
      </Link>

      <Card className="p-8 sm:p-10">
        <div className="mb-8 border-b border-stone pb-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-sand-gold-dark">
            {t('request.processTag')}
          </span>
          <h1 className="font-serif text-3xl font-bold text-forest mt-1">
            {t('request.titlePrefix')} #{id}
          </h1>
          <p className="text-sm text-charcoal-muted mt-2">
            {t('request.subtitle')}
          </p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label={t('request.dateLabel')}
              type="date"
              id="booking-date"
              required
              leftIcon={<Calendar className="w-4 h-4" />}
            />
            <Select
              label={t('request.timeLabel')}
              id="booking-time"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              placeholder={t('request.timePlaceholder')}
              options={timeSlotOptions}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Select
              label={t('request.guestsLabel')}
              id="booking-guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              options={guestOptions}
              required
            />
            <Input
              label={t('request.nameLabel')}
              id="booking-fullname"
              placeholder={t('request.namePlaceholder')}
              required
              autoComplete="name"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label={t('request.emailLabel')}
              type="email"
              id="booking-email"
              placeholder={t('request.emailPlaceholder')}
              required
              autoComplete="email"
              hint={t('request.emailHint')}
            />
            <Input
              label={t('request.phoneLabel')}
              type="tel"
              id="booking-phone"
              placeholder={t('request.phonePlaceholder')}
              required
              autoComplete="tel"
              inputMode="tel"
            />
          </div>

          <div className="pt-6 border-t border-stone flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-charcoal-muted">
              {t('request.disclaimer')}
            </p>
            <Link to="/confirmation" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
                rightIcon={<Send className="w-4 h-4" />}
              >
                {t('request.submitBtn')}
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
