import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { getLocalizedBusinessConfig } from '../config/businessConfig';

/**
 * Custom hook that returns the centralized business configuration
 * localized to the currently active i18n language.
 */
export function useBusinessConfig() {
  const { i18n } = useTranslation();
  const currentLang = i18n.resolvedLanguage || i18n.language || 'es';

  return useMemo(() => getLocalizedBusinessConfig(currentLang), [currentLang]);
}

export default useBusinessConfig;

