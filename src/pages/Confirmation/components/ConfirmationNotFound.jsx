import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Compass, ArrowRight, FileQuestion } from 'lucide-react';
import { Card, Button } from '../../../components/common';

/**
 * ConfirmationNotFound
 *
 * Rendered when `/confirmation` is accessed directly without an active or found booking request.
 * Prevents showing fictitious data or false confirmations to the user.
 */
export default function ConfirmationNotFound() {
  const { t } = useTranslation('booking');

  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto text-center animate-in fade-in duration-200">
      <Card className="p-8 sm:p-12 bg-white border border-stone shadow-sm">
        <div className="inline-flex p-4 rounded-full bg-stone-light/70 text-charcoal-muted mb-6">
          <FileQuestion className="w-10 h-10 stroke-[1.5]" />
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest mb-3">
          {t('confirmation.empty.title', 'No se encontró ninguna solicitud activa')}
        </h1>

        <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed mb-8 max-w-md mx-auto">
          {t(
            'confirmation.empty.description',
            'No se ha detectado ninguna solicitud de reserva reciente en este navegador. Para solicitar una reserva, por favor selecciona una experiencia de nuestro catálogo.'
          )}
        </p>

        <Link to="/explore">
          <Button
            variant="primary"
            size="lg"
            className="shadow-sm hover:shadow-md cursor-pointer inline-flex items-center gap-2"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            {t('confirmation.empty.action', 'Explorar catálogo de experiencias')}
          </Button>
        </Link>
      </Card>
    </div>
  );
}

