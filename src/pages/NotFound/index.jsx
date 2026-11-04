import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HelpCircle, ArrowLeft } from 'lucide-react';
import { Button, Card } from '../../components/common';

export default function NotFound() {
  const { t } = useTranslation('common');

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-lg mx-auto text-center">
      <Card className="p-8 sm:p-12">
        <div className="inline-flex p-3.5 rounded-full bg-forest-subtle text-forest mb-6">
          <HelpCircle className="w-10 h-10" />
        </div>
        <span className="font-serif text-6xl font-bold text-forest block mb-2">
          {t('notFound.title')}
        </span>
        <h1 className="font-serif text-2xl font-bold text-charcoal mb-3">
          {t('notFound.subtitle')}
        </h1>
        <p className="text-sm text-charcoal-muted leading-relaxed mb-8">
          {t('notFound.description')}
        </p>
        <Link to="/">
          <Button variant="primary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            {t('notFound.action')}
          </Button>
        </Link>
      </Card>
    </div>
  );
}
