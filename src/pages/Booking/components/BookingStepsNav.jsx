import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check, ClipboardList, ShieldCheck } from 'lucide-react';

/**
 * BookingStepsNav
 * Visual step tracker indicating progress between Form filling and Request Review.
 */
export default function BookingStepsNav({ currentStep = 'form', onStepClick }) {
  const { t } = useTranslation('booking');

  const steps = [
    {
      id: 'form',
      number: 1,
      title: t('request.steps.step1Title', '1. Datos de la Reserva'),
      description: t('request.steps.step1Desc', 'Fecha, turno y contacto'),
      icon: <ClipboardList className="w-4 h-4" />,
    },
    {
      id: 'review',
      number: 2,
      title: t('request.steps.step2Title', '2. Revisión y Confirmación'),
      description: t('request.steps.step2Desc', 'Verificar y confirmar'),
      icon: <ShieldCheck className="w-4 h-4" />,
    },
  ];

  return (
    <nav
      aria-label="Progreso de reserva"
      className="p-3 sm:p-4 rounded-2xl bg-white border border-stone shadow-2xs"
    >
      <ol className="grid grid-cols-2 gap-3 sm:gap-6">
        {steps.map((step, idx) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep === 'review' && step.id === 'form';
          const isClickable = isCompleted && onStepClick;

          return (
            <li key={step.id}>
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick(step.id)}
                className={`w-full flex items-center gap-3 text-left p-2 rounded-xl transition-colors ${
                  isClickable
                    ? 'cursor-pointer hover:bg-forest-subtle/40 group'
                    : 'cursor-default'
                }`}
              >
                {/* Step Circle / Icon */}
                <div
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shrink-0 font-serif text-sm font-bold transition-all ${
                    isCompleted
                      ? 'bg-forest text-ivory shadow-2xs group-hover:bg-forest-light'
                      : isActive
                      ? 'bg-sand-gold-dark text-white ring-2 ring-sand-gold/30 shadow-xs'
                      : 'bg-stone-light text-charcoal-light/70'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4 stroke-[2.5]" /> : step.number}
                </div>

                {/* Step Titles */}
                <div className="min-w-0">
                  <span
                    className={`block font-serif text-xs sm:text-sm font-bold truncate ${
                      isActive
                        ? 'text-forest'
                        : isCompleted
                        ? 'text-forest group-hover:underline'
                        : 'text-charcoal-muted'
                    }`}
                  >
                    {step.title}
                  </span>
                  <span className="hidden sm:block text-[11px] text-charcoal-muted truncate">
                    {step.description}
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

