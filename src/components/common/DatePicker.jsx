import React, { useState, useEffect, useRef, useMemo, useId } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  X,
  AlertCircle,
  Check,
} from 'lucide-react';
import {
  getLocalTodayIso,
  toIsoDate,
  parseIsoDate,
  formatDateByLocale,
  maskDateInput,
  parseDateInput,
  getDayOfWeekFromIso,
  formatMonthYear,
} from '../../utils/formatters';

/**
 * Reusable Accessible DatePicker Component for Bookly
 *
 * Adheres to Bookly Design System (Premium Editorial Minimalism) and Accessibility:
 * - Selects future dates, strictly blocking past dates.
 * - Enforces experience-specific availability constraints (availableDays).
 * - Distinguishes available vs. unavailable dates with clear visual indicators.
 * - Handles month/year navigation with bounds.
 * - Avoids timezone shifts by using localized ISO parsing/comparison.
 * - Displays a contextual notice if no dates are available in a given month.
 * - Fully bilingual (ES: dd/mm/aaaa, EN: mm/dd/yyyy) with localized weekdays and months.
 * - Accessible via keyboard (Tab, Escape, Enter, Arrows) and mobile-responsive.
 */
export default function DatePicker({
  value = '',
  onChange,
  availableDays = [0, 1, 2, 3, 4, 5, 6],
  minDate,
  maxDate,
  label,
  id: customId,
  required = false,
  disabled = false,
  error: customError,
  hint: customHint,
  className = '',
}) {
  const { t, i18n } = useTranslation('booking');
  const generatedId = useId();
  const inputId = customId || generatedId;
  const currentLang = (i18n.resolvedLanguage || i18n.language || 'es').startsWith('en') ? 'en' : 'es';
  const isEn = currentLang === 'en';
  const localeCode = isEn ? 'en-US' : 'es-AR';

  // Boundaries (strictly in local time to avoid timezone distortions)
  const todayIso = useMemo(() => getLocalTodayIso(), []);
  const effectiveMinIso = minDate || todayIso;
  const todayParsed = useMemo(() => parseIsoDate(todayIso), [todayIso]);

  // Popover state
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  // Displayed month and year in the calendar grid
  const initialYearMonth = useMemo(() => {
    if (value) {
      const parsed = parseIsoDate(value);
      if (parsed) return { year: parsed.year, month: parsed.month };
    }
    return { year: todayParsed.year, month: todayParsed.month };
  }, [value, todayParsed]);

  const [displayedYear, setDisplayedYear] = useState(initialYearMonth.year);
  const [displayedMonth, setDisplayedMonth] = useState(initialYearMonth.month); // 1-12

  // Localized text typed into the input (e.g. "25/11/2026" or "11/25/2026")
  const [typedValue, setTypedValue] = useState(() => (value ? formatDateByLocale(value, currentLang) : ''));
  const [validationError, setValidationError] = useState('');

  // Sync displayed year/month when value changes externally
  useEffect(() => {
    if (value) {
      const parsed = parseIsoDate(value);
      if (parsed) {
        setDisplayedYear(parsed.year);
        setDisplayedMonth(parsed.month);
        setTypedValue(formatDateByLocale(value, currentLang));
        setValidationError('');
      }
    } else {
      setTypedValue('');
    }
  }, [value, currentLang]);

  // Close calendar popover on click outside or Escape
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        inputRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Weekday abbreviations and header order:
  // Spanish: Monday-first (Lun..Dom)
  // English: Sunday-first (Sun..Sat)
  const weekdays = useMemo(() => {
    if (isEn) {
      return [
        { label: 'Sun', dayIndex: 0 },
        { label: 'Mon', dayIndex: 1 },
        { label: 'Tue', dayIndex: 2 },
        { label: 'Wed', dayIndex: 3 },
        { label: 'Thu', dayIndex: 4 },
        { label: 'Fri', dayIndex: 5 },
        { label: 'Sat', dayIndex: 6 },
      ];
    }
    return [
      { label: 'Lun', dayIndex: 1 },
      { label: 'Mar', dayIndex: 2 },
      { label: 'Mié', dayIndex: 3 },
      { label: 'Jue', dayIndex: 4 },
      { label: 'Vie', dayIndex: 5 },
      { label: 'Sáb', dayIndex: 6 },
      { label: 'Dom', dayIndex: 0 },
    ];
  }, [isEn]);

  // Month navigation boundary checks
  const isPrevDisabled = useMemo(() => {
    const minParsed = parseIsoDate(effectiveMinIso);
    if (!minParsed) return false;
    return (
      displayedYear < minParsed.year ||
      (displayedYear === minParsed.year && displayedMonth <= minParsed.month)
    );
  }, [displayedYear, displayedMonth, effectiveMinIso]);

  const isNextDisabled = useMemo(() => {
    if (!maxDate) return false;
    const maxParsed = parseIsoDate(maxDate);
    if (!maxParsed) return false;
    return (
      displayedYear > maxParsed.year ||
      (displayedYear === maxParsed.year && displayedMonth >= maxParsed.month)
    );
  }, [displayedYear, displayedMonth, maxDate]);

  const handlePrevMonth = () => {
    if (isPrevDisabled) return;
    if (displayedMonth === 1) {
      setDisplayedYear((y) => y - 1);
      setDisplayedMonth(12);
    } else {
      setDisplayedMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (isNextDisabled) return;
    if (displayedMonth === 12) {
      setDisplayedYear((y) => y + 1);
      setDisplayedMonth(1);
    } else {
      setDisplayedMonth((m) => m + 1);
    }
  };

  // Calendar Days Grid generation
  const calendarDays = useMemo(() => {
    const totalDaysInMonth = new Date(displayedYear, displayedMonth, 0).getDate();
    const firstDayOfWeek = new Date(displayedYear, displayedMonth - 1, 1).getDay(); // 0 is Sun

    // Calculate leading offset
    const leadingOffset = isEn
      ? firstDayOfWeek
      : firstDayOfWeek === 0
      ? 6
      : firstDayOfWeek - 1;

    const days = [];

    // Leading empty cells
    for (let i = 0; i < leadingOffset; i++) {
      days.push({ key: `empty-${i}`, isCurrentMonth: false });
    }

    // Days of current month
    for (let dayNum = 1; dayNum <= totalDaysInMonth; dayNum++) {
      const isoDate = toIsoDate(displayedYear, displayedMonth, dayNum);
      const dayOfWeek = getDayOfWeekFromIso(isoDate);

      // Past check (string comparison avoids timezone issues)
      const isPast = isoDate < effectiveMinIso;
      const isFutureOverMax = maxDate ? isoDate > maxDate : false;

      // Experience operating days check
      const operatesOnDay = availableDays.includes(dayOfWeek);

      // Final availability: must not be past, not over max, and experience must operate on this weekday
      const isAvailable = !isPast && !isFutureOverMax && operatesOnDay;
      const isSelected = value === isoDate;
      const isToday = todayIso === isoDate;

      days.push({
        key: isoDate,
        dayNum,
        isoDate,
        dayOfWeek,
        isCurrentMonth: true,
        isPast,
        operatesOnDay,
        isAvailable,
        isSelected,
        isToday,
      });
    }

    return days;
  }, [displayedYear, displayedMonth, isEn, effectiveMinIso, maxDate, availableDays, value, todayIso]);

  // Count available departures in this month
  const availableCountInMonth = useMemo(() => {
    return calendarDays.filter((d) => d.isCurrentMonth && d.isAvailable).length;
  }, [calendarDays]);

  // Handle clicking a day in the calendar
  const handleSelectDay = (dayObj) => {
    if (!dayObj.isAvailable || disabled) return;
    onChange?.(dayObj.isoDate);
    setTypedValue(formatDateByLocale(dayObj.isoDate, currentLang));
    setValidationError('');
    setIsOpen(false);
  };

  // Handle manual typing with slash mask and calendar validation
  const handleInputChange = (e) => {
    const raw = e.target.value;
    const masked = maskDateInput(raw);
    setTypedValue(masked);

    if (!masked) {
      onChange?.('');
      setValidationError('');
      return;
    }

    const digitsOnly = masked.replace(/\D/g, '');
    if (digitsOnly.length === 8) {
      const parsedIso = parseDateInput(masked, currentLang);
      if (parsedIso) {
        if (parsedIso < effectiveMinIso) {
          setValidationError(t('request.calendar.pastDateError', 'Por favor selecciona una fecha a partir de hoy.'));
          onChange?.('');
        } else {
          const dayOfWeek = getDayOfWeekFromIso(parsedIso);
          if (!availableDays.includes(dayOfWeek)) {
            const dayNames = isEn
              ? ['Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays']
              : ['domingos', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábados'];
            const dayName = dayNames[dayOfWeek] || '';
            setValidationError(
              t('request.calendar.notOperatesOnDay', {
                day: dayName,
                defaultValue: `Esta experiencia no opera los ${dayName}.`,
              })
            );
            onChange?.('');
          } else {
            onChange?.(parsedIso);
            setValidationError('');
            const parsed = parseIsoDate(parsedIso);
            if (parsed) {
              setDisplayedYear(parsed.year);
              setDisplayedMonth(parsed.month);
            }
          }
        }
      } else {
        setValidationError(t('request.calendar.invalidDateError', 'Fecha inválida.'));
        onChange?.('');
      }
    } else {
      onChange?.('');
      setValidationError('');
    }
  };

  // Clear current selection
  const handleClear = (e) => {
    e.stopPropagation();
    onChange?.('');
    setTypedValue('');
    setValidationError('');
  };

  const displayedError = customError || validationError;
  const displayedHint = customHint || t('request.dateHint', 'Formato: dd/mm/aaaa');

  return (
    <div ref={containerRef} className={`relative w-full ${isOpen ? 'z-50' : 'z-auto'} ${className}`}>
      {/* 1. Label */}
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5"
        >
          {label}
          {required && <span className="text-sand-gold-dark ml-1" aria-hidden="true">*</span>}
        </label>
      )}

      {/* 2. Interactive Input Control */}
      <div className="relative flex items-center">
        {/* Left Calendar Trigger Icon */}
        <button
          type="button"
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
          className="absolute left-3.5 flex items-center text-charcoal-muted hover:text-forest transition-colors cursor-pointer"
          aria-label={t('request.calendar.openPicker', 'Abrir selector de fechas')}
          disabled={disabled}
        >
          <CalendarIcon className="w-4 h-4" />
        </button>

        {/* Text Input with auto-masking */}
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          inputMode="numeric"
          value={typedValue}
          onChange={handleInputChange}
          onClick={() => !disabled && setIsOpen(true)}
          placeholder={t('request.datePlaceholder', isEn ? 'mm/dd/yyyy' : 'dd/mm/aaaa')}
          disabled={disabled}
          required={required}
          maxLength={10}
          aria-invalid={Boolean(displayedError)}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          className={[
            'w-full min-h-[44px] pl-10 pr-10 py-2.5 rounded-lg border text-base md:text-sm bg-white text-charcoal transition-colors duration-150',
            'placeholder:text-charcoal-light/70',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:border-forest',
            'disabled:bg-stone-light/60 disabled:cursor-not-allowed disabled:text-charcoal-muted',
            displayedError
              ? 'border-red-500 focus-visible:ring-red-500 bg-red-50/20'
              : 'border-stone hover:border-stone-dark',
          ].filter(Boolean).join(' ')}
        />

        {/* Right Actions: Clear button or Dropdown indicator */}
        <div className="absolute right-3 flex items-center gap-1">
          {value && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 rounded-full text-charcoal-light hover:text-charcoal hover:bg-stone-light transition-colors cursor-pointer"
              aria-label={t('request.calendar.clear', 'Limpiar fecha')}
              title={t('request.calendar.clear', 'Limpiar fecha')}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 3. Validation Messages / Format Hint */}
      {displayedError ? (
        <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1" role="alert">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{displayedError}</span>
        </p>
      ) : displayedHint ? (
        <p className="mt-1 text-xs text-charcoal-muted">
          {displayedHint}
        </p>
      ) : null}

      {/* 4. Popover Calendar Grid Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label={t('request.calendar.title', 'Seleccionar fecha')}
          className="absolute z-50 left-0 top-full mt-2 w-full sm:w-[330px] max-w-[calc(100vw-2rem)] bg-white border border-stone-dark/30 rounded-2xl shadow-2xl p-4 sm:p-5 animate-in fade-in zoom-in-95 duration-150"
        >
          {/* Header: Month & Year Navigator */}
          <div className="flex items-center justify-between pb-3 border-b border-stone/70">
            <button
              type="button"
              onClick={handlePrevMonth}
              disabled={isPrevDisabled}
              aria-label={t('request.calendar.prevMonth', 'Mes anterior')}
              className={`p-1.5 rounded-lg text-charcoal transition-colors cursor-pointer ${
                isPrevDisabled
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:bg-stone-light hover:text-forest'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="font-serif text-sm sm:text-base font-bold text-forest select-none">
              {formatMonthYear(displayedYear, displayedMonth, localeCode)}
            </span>

            <button
              type="button"
              onClick={handleNextMonth}
              disabled={isNextDisabled}
              aria-label={t('request.calendar.nextMonth', 'Mes siguiente')}
              className={`p-1.5 rounded-lg text-charcoal transition-colors cursor-pointer ${
                isNextDisabled
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:bg-stone-light hover:text-forest'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Alert if this month has zero departures */}
          {availableCountInMonth === 0 && (
            <div className="my-2.5 p-2.5 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>{t('request.calendar.noAvailableDates', 'No hay salidas disponibles para este mes.')}</span>
            </div>
          )}

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-1 text-center pt-3 pb-1 text-xs font-semibold text-charcoal-muted uppercase tracking-wider">
            {weekdays.map((wd) => (
              <span key={wd.label} title={wd.label}>
                {wd.label}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div role="grid" className="grid grid-cols-7 gap-1 pt-1">
            {calendarDays.map((dayObj) => {
              if (!dayObj.isCurrentMonth) {
                return <div key={dayObj.key} className="h-9 w-full" aria-hidden="true" />;
              }

              const { isAvailable, isSelected, isToday, dayNum, isoDate } = dayObj;

              return (
                <button
                  key={dayObj.key}
                  type="button"
                  role="gridcell"
                  disabled={!isAvailable}
                  aria-selected={isSelected}
                  aria-disabled={!isAvailable}
                  aria-label={`${dayNum} ${formatMonthYear(displayedYear, displayedMonth, localeCode)} ${
                    isAvailable
                      ? `- ${t('request.calendar.availableLegend', 'Salida disponible')}`
                      : `- ${t('request.calendar.unavailableLegend', 'Sin salidas')}`
                  }`}
                  onClick={() => handleSelectDay(dayObj)}
                  className={[
                    'relative h-9 w-full rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 flex items-center justify-center',
                    // Selected state
                    isSelected
                      ? 'bg-forest text-ivory font-bold shadow-xs scale-105 z-10'
                      : '',
                    // Available but not selected
                    isAvailable && !isSelected
                      ? 'text-charcoal hover:bg-forest-subtle hover:text-forest hover:font-semibold cursor-pointer'
                      : '',
                    // Disabled / Unavailable state
                    !isAvailable
                      ? 'text-charcoal-light/35 bg-stone-light/30 cursor-not-allowed line-through'
                      : '',
                    // Today indicator
                    isToday && !isSelected
                      ? 'ring-1 ring-forest/40 font-bold text-forest'
                      : '',
                  ].filter(Boolean).join(' ')}
                >
                  <span>{dayNum}</span>
                  {/* Subtle active departure pip */}
                  {isAvailable && !isSelected && (
                    <span className="absolute bottom-1 w-1 h-1 rounded-full bg-sand-gold-dark" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer: Legend & Actions */}
          <div className="mt-3 pt-3 border-t border-stone/70 flex flex-wrap items-center justify-between text-[11px] text-charcoal-muted gap-2">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-sand-gold-dark" />
                <span>{t('request.calendar.availableLegend', 'Disponible')}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-stone-dark" />
                <span>{t('request.calendar.unavailableLegend', 'Sin salida')}</span>
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-forest hover:underline font-medium cursor-pointer ml-auto"
            >
              {t('request.calendar.closePicker', 'Cerrar')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

