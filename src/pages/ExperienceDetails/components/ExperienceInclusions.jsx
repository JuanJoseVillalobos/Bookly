import React from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle, XCircle } from 'lucide-react';

/**
 * ExperienceInclusions
 * Displays two lists: What's included (green checkmark) and what's not included (muted x icon).
 */
export default function ExperienceInclusions({ includedItems = [], notIncludedItems = [] }) {
  const { t } = useTranslation('booking');

  return (
    <section className="space-y-4">
      <h2 className="font-serif text-2xl font-bold text-forest border-b border-stone/80 pb-3">
        {t('details.includesTitle')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-5 sm:p-6 rounded-2xl border border-stone shadow-2xs">
        {/* Included items */}
        <div className="space-y-3">
          <span className="text-xs uppercase tracking-wider text-forest font-bold block">
            {t('details.includesTitle')}
          </span>
          <ul className="space-y-2.5 text-sm text-charcoal-muted">
            {includedItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Not included items */}
        {notIncludedItems.length > 0 && (
          <div className="space-y-3 md:border-l md:border-stone/80 md:pl-6">
            <span className="text-xs uppercase tracking-wider text-charcoal-light font-bold block">
              {t('details.notIncludesTitle')}
            </span>
            <ul className="space-y-2.5 text-sm text-charcoal-muted">
              {notIncludedItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-charcoal-light shrink-0 mt-0.5" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

