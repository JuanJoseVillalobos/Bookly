import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { DatePicker, TimeSlotSelector, Button, Card } from '../../../../components/common';
import { formatDateByLocale } from '../../../../utils/formatters';
import { getTimeSlotsForDate } from '../../../../data/experiences';

/**
 * Step 1: Date & Time Slot Selection
 */
export default function Step1DateTime({
  experience,
  currentLang,
  date,
  setDate,
  timeSlot,
  setTimeSlot,
  errors = {},
  onClearError,
  onNext,
  onBackToExperience,
}) {
  const { t } = useTranslation('booking');

  // Compute selected time slot descriptive label
  const slots = getTimeSlotsForDate(experience, date, currentLang);
  const matchedSlot = slots.find((s) => s.value === timeSlot);
  const timeSlotLabel = matchedSlot?.label || (timeSlot ? `${timeSlot} hs` : '');

  const hasSelection = Boolean(date && timeSlot);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Date & Time Selectors Card */}
      <Card className="p-6 sm:p-8 bg-white border border-stone shadow-xs space-y-6 relative z-30 overflow-visible">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
          <DatePicker
            label={t('request.dateLabel', 'Fecha preferida')}
            id="booking-date"
            value={date}
            onChange={(newDate) => {
              setDate(newDate);
              if (!newDate) setTimeSlot('');
              onClearError?.('date');
            }}
            availableDays={experience?.availability?.availableDays || [0, 1, 2, 3, 4, 5, 6]}
            error={errors.date}
            required
          />

          <TimeSlotSelector
            label={t('request.timeLabel', 'Turno preferido')}
            id="booking-time"
            value={timeSlot}
            onChange={(newSlot) => {
              setTimeSlot(newSlot);
              onClearError?.('timeSlot');
            }}
            experience={experience}
            selectedDate={date}
            error={errors.timeSlot}
            required
          />
        </div>

        {/* Live Selection Feedback Pill */}
        {hasSelection && (
          <div className="p-3.5 sm:p-4 rounded-xl bg-forest-subtle/50 border border-forest/20 flex items-center justify-between gap-3 text-xs sm:text-sm animate-in fade-in duration-150">
            <div className="flex items-center gap-2.5 text-forest font-medium">
              <CheckCircle2 className="w-4 h-4 text-forest shrink-0" />
              <span>
                {formatDateByLocale(date, currentLang)} — {timeSlotLabel}
              </span>
            </div>
          </div>
        )}
      </Card>

      {/* Navigation Buttons */}
      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          type="button"
          onClick={onBackToExperience}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-charcoal hover:text-forest transition-colors cursor-pointer py-2 self-start sm:self-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('request.backToExperience', 'Volver a la experiencia')}</span>
        </button>

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

