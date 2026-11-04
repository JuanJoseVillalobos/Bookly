import React, { useId } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * Reusable Accessible Select component for Bookly.
 */
export default function Select({
  label,
  id: customId,
  name,
  value,
  onChange,
  options = [],
  placeholder = 'Selecciona una opción',
  error,
  hint,
  required = false,
  disabled = false,
  className = '',
  ...props
}) {
  const generatedId = useId();
  const selectId = customId || generatedId;
  const hintId = `${selectId}-hint`;
  const errorId = `${selectId}-error`;

  const describedBy = [
    hint ? hintId : null,
    error ? errorId : null,
  ].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5"
        >
          {label}
          {required && <span className="text-sand-gold-dark ml-1" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        <select
          id={selectId}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={[
            'w-full min-h-[44px] appearance-none px-3.5 py-2.5 pr-10 rounded-lg border text-base md:text-sm bg-white text-charcoal transition-colors duration-150 cursor-pointer',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:border-forest',
            'disabled:bg-stone-light/60 disabled:cursor-not-allowed disabled:text-charcoal-muted',
            error
              ? 'border-red-500 focus-visible:ring-red-500 bg-red-50/20'
              : 'border-stone hover:border-stone-dark',
          ].filter(Boolean).join(' ')}
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((opt) => {
            const val = typeof opt === 'object' ? opt.value : opt;
            const text = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={val} value={val}>
                {text}
              </option>
            );
          })}
        </select>

        <div className="absolute right-3.5 flex items-center pointer-events-none text-charcoal-muted">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {error ? (
        <p id={errorId} className="mt-1 text-xs text-red-600 font-medium" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="mt-1 text-xs text-charcoal-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

