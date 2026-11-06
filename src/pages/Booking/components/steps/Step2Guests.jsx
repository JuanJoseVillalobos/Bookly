import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, Users, Info } from 'lucide-react';
import { GuestSelector, Button, Card } from '../../../../components/common';

/**
 * Step 2: Guest Details Selection
 */
export default function Step2Guests({
  experience,
  guests,
  setGuests,
  errors = {},
  onClearError,
  onPrev,
  onNext,
}) {
  const { t } = useTranslation('booking');

  const minGuests = experience?.groupSize?.min || 1;
  const maxGuests = experience?.groupSize?.max || 8;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <Card className="p-6 sm:p-8 bg-white border border-stone shadow-xs space-y-6 relative z-20">
        <div className="space-y-2">
          <GuestSelector
            label={t('request.guestsLabel', 'Cantidad de huéspedes')}
            id="booking-guests"
            value={guests}
            onChange={(newGuests) => {
              setGuests(newGuests);
              onClearError?.('guests');
            }}
            min={minGuests}
            max={maxGuests}
            unitPrice={experience?.price || 0}
            currency={experience?.currency || 'USD'}
            error={errors.guests}
          />
        </div>

        {/* Group size notice */}
        <div className="p-3.5 rounded-xl bg-ivory border border-stone/80 flex items-start gap-2.5 text-xs text-charcoal-muted">
          <Info className="w-4 h-4 text-forest shrink-0 mt-0.5" />
          <span className="leading-relaxed">
            {t('request.stepGuestsSubtitle', {
              max: maxGuests,
              defaultValue: `Capacidad máxima para este grupo: ${maxGuests} personas.`,
            })}
          </span>
        </div>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-2">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onPrev}
          className="w-full sm:w-auto justify-center cursor-pointer"
          leftIcon={<ArrowLeft className="w-4 h-4" />}
        >
          {t('wizard.btnPrevious', 'Anterior')}
        </Button>

        <Button
          type="button"
          variant="primary"
          size="lg"
          onClick={onNext}
          className="w-full sm:w-auto shadow-md hover:shadow-lg justify-center shrink-0 cursor-pointer"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          {t('wizard.btnNext', 'Continuar')}
        </Button>
      </div>
    </div>
  );
}

