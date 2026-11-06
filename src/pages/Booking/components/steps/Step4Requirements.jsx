import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { Button, Card } from '../../../../components/common';

/**
 * Step 4: Additional Requirements (Optional)
 */
export default function Step4Requirements({
  notes,
  setNotes,
  errors = {},
  onClearError,
  onPrev,
  onNext,
}) {
  const { t } = useTranslation('booking');
  const MAX_CHARS = 500;
  const currentLength = (notes || '').length;
  const isNearLimit = currentLength >= MAX_CHARS * 0.9;
  const isAtLimit = currentLength >= MAX_CHARS;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <Card className="p-6 sm:p-8 bg-white border border-stone shadow-xs space-y-5 relative z-0">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor="wizard-notes"
              className="block text-xs font-semibold uppercase tracking-wider text-charcoal flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-sand-gold-dark" />
              <span>{t('request.notesLabel', 'Comentarios o requerimientos especiales')}</span>
            </label>

            {/* Live Character Counter */}
            <span
              aria-live="polite"
              className={`text-xs font-mono font-medium ${
                isAtLimit
                  ? 'text-red-600 font-bold'
                  : isNearLimit
                  ? 'text-amber-700 font-semibold'
                  : 'text-charcoal-muted'
              }`}
            >
              {t('wizard.charactersCount', '{{count}} / {{max}} caracteres', {
                count: currentLength,
                max: MAX_CHARS,
              })}
            </span>
          </div>

          <textarea
            id="wizard-notes"
            rows={5}
            maxLength={MAX_CHARS}
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
              onClearError?.('notes');
            }}
            placeholder={t(
              'request.notesPlaceholder',
              'Ej. Una persona del grupo es celíaca, requerimos bastones adicionales de trekking, celebramos un aniversario...'
            )}
            className={`w-full px-3.5 py-3 rounded-xl border text-base md:text-sm bg-white text-charcoal transition-colors duration-150 placeholder:text-charcoal-light/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:border-forest ${
              errors.notes ? 'border-red-500 bg-red-50/20' : 'border-stone hover:border-stone-dark'
            }`}
          />

          {/* Helper hint */}
          <div className="flex items-start gap-2 pt-1 text-xs text-charcoal-muted">
            <Sparkles className="w-3.5 h-3.5 text-sand-gold-dark shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {t('wizard.notesHint', 'Campo opcional. Si no tienes requerimientos especiales, puedes continuar directamente.')}
            </p>
          </div>
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

