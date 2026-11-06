import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';

/**
 * WizardStepper Component
 *
 * Visual progress stepper structured after modern wizard designs:
 * - 5 sequential steps connected by a dynamic progress track line.
 * - Completed steps display a checkmark and are interactively clickable to jump back.
 * - Active step is highlighted with Sand Gold / Forest tokens.
 * - Upcoming steps are numbered and subtle.
 * - Fully responsive across mobile, tablet, and desktop screens.
 */
export default function WizardStepper({ currentStep = 1, onStepClick }) {
  const { t } = useTranslation('booking');

  const steps = [
    { id: 1, label: t('wizard.step1Nav', 'Fecha y Turno'), desc: t('wizard.step1NavDesc', 'Día y horario') },
    { id: 2, label: t('wizard.step2Nav', 'Huéspedes'), desc: t('wizard.step2NavDesc', 'Participantes') },
    { id: 3, label: t('wizard.step3Nav', 'Contacto'), desc: t('wizard.step3NavDesc', 'Datos del titular') },
    { id: 4, label: t('wizard.step4Nav', 'Requerimientos'), desc: t('wizard.step4NavDesc', 'Preferencias') },
    { id: 5, label: t('wizard.step5Nav', 'Revisión'), desc: t('wizard.step5NavDesc', 'Confirmar y enviar') },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto py-2 sm:py-4">
      {/* Mobile Step Badge Counter */}
      <div className="flex sm:hidden items-center justify-between mb-3 px-1 text-xs text-charcoal-muted font-medium">
        <span>
          {t('wizard.stepCounter', { current: currentStep, total: steps.length })}
        </span>
        <span className="font-semibold text-forest font-serif">
          {steps[currentStep - 1]?.label}
        </span>
      </div>

      {/* Stepper Track & Circles */}
      <nav aria-label="Progreso del formulario de reserva" className="relative">
        {/* Horizontal Connecting Progress Line */}
        <div
          className="absolute top-4 sm:top-5 left-4 sm:left-8 right-4 sm:right-8 h-0.5 bg-stone -translate-y-1/2 z-0"
          aria-hidden="true"
        >
          {/* Active progress fill */}
          <div
            className="h-full bg-forest transition-all duration-300 ease-out"
            style={{
              width: `${((Math.min(currentStep, steps.length) - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Steps List */}
        <ol className="relative z-10 flex items-start justify-between">
          {steps.map((step) => {
            const isCompleted = step.id < currentStep;
            const isActive = step.id === currentStep;
            const isUpcoming = step.id > currentStep;
            const isClickable = isCompleted && onStepClick;

            return (
              <li
                key={step.id}
                className="flex flex-col items-center flex-1 text-center group"
              >
                {/* Step Circle Button */}
                <button
                  type="button"
                  disabled={!isClickable}
                  onClick={() => isClickable && onStepClick(step.id)}
                  title={isClickable ? t('wizard.jumpToStep', { step: step.id }) : undefined}
                  aria-current={isActive ? 'step' : undefined}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-serif text-xs sm:text-sm font-bold transition-all duration-200 ${
                    isCompleted
                      ? 'bg-forest text-ivory ring-2 ring-forest/30 shadow-xs cursor-pointer hover:bg-forest-light active:scale-95'
                      : isActive
                      ? 'bg-sand-gold-dark text-white ring-4 ring-sand-gold/25 shadow-sm scale-105'
                      : 'bg-white border-2 border-stone text-charcoal-light/60 cursor-default'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.5]" />
                  ) : (
                    <span>{step.id}</span>
                  )}
                </button>

                {/* Step Text Label (Desktop & Tablet) */}
                <div className="hidden sm:block mt-2 px-1">
                  <span
                    className={`block text-xs font-serif transition-colors leading-tight ${
                      isActive
                        ? 'font-bold text-forest'
                        : isCompleted
                        ? 'font-semibold text-forest group-hover:text-forest-light'
                        : 'text-charcoal-muted'
                    }`}
                  >
                    {step.label}
                  </span>
                  <span className="block text-[10px] text-charcoal-light mt-0.5 truncate max-w-[90px]">
                    {step.desc}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}

