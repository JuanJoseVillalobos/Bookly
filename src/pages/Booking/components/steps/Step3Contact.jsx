import React from 'react';
import { useTranslation } from 'react-i18next';
import { User, Mail, Phone, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { Input, Button, Card } from '../../../../components/common';

/**
 * Step 3: Contact Information
 */
export default function Step3Contact({
  fullName,
  setFullName,
  email,
  setEmail,
  phone,
  setPhone,
  errors = {},
  onClearError,
  onPrev,
  onNext,
}) {
  const { t } = useTranslation('booking');

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <Card className="p-6 sm:p-8 bg-white border border-stone shadow-xs space-y-5 relative z-10">
        <div className="space-y-4">
          <Input
            label={t('request.nameLabel', 'Nombre completo')}
            id="wizard-fullname"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              onClearError?.('fullName');
            }}
            placeholder={t('request.namePlaceholder', 'Ej. Sofía Martínez')}
            required
            autoComplete="name"
            error={errors.fullName}
            leftIcon={<User className="w-4 h-4" />}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label={t('request.emailLabel', 'Correo electrónico')}
              type="email"
              id="wizard-email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                onClearError?.('email');
              }}
              placeholder={t('request.emailPlaceholder', 'nombre@correo.com')}
              required
              autoComplete="email"
              hint={t('request.emailHint', 'Recibirás aquí el estado de tu solicitud.')}
              error={errors.email}
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <Input
              label={t('request.phoneLabel', 'Teléfono de contacto')}
              type="tel"
              id="wizard-phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                onClearError?.('phone');
              }}
              placeholder={t('request.phonePlaceholder', '+54 9 11 0000-0000')}
              required
              autoComplete="tel"
              inputMode="tel"
              error={errors.phone}
              leftIcon={<Phone className="w-4 h-4" />}
            />
          </div>
        </div>

        {/* Privacy Note */}
        <div className="pt-2 border-t border-stone/60 flex items-center gap-2 text-xs text-charcoal-muted">
          <ShieldCheck className="w-4 h-4 text-forest shrink-0" />
          <span>
            {t('request.stepContactSubtitle', 'Datos del titular para que el operador confirme la disponibilidad.')}
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

