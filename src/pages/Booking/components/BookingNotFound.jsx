import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Button, Card } from '../../../components/common';

/**
 * BookingNotFound
 * Rendered when the experience ID does not exist in the mock dataset.
 */
export default function BookingNotFound() {
  const { t } = useTranslation('booking');

  return (
    <div className="py-20 px-4 max-w-xl mx-auto text-center">
      <Card className="p-8 sm:p-12 space-y-6 bg-white border border-stone">
        <div className="inline-flex p-4 rounded-full bg-forest-subtle text-forest mx-auto">
          <AlertCircle className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest">
            {t('request.notFoundTitle')}
          </h1>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
            {t('request.notFoundMessage')}
          </p>
        </div>
        <div className="pt-2">
          <Link to="/explore">
            <Button variant="primary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
              {t('request.backToCatalog')}
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

