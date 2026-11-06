import React, { useId } from 'react';

/**
 * Reusable Accessible Input component for Bookly.
 * Follows modern web forms standards and Bookly's design tokens.
 */
export default function Input({
  label,
  id: customId,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  hint,
  required = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = '',
  autoComplete,
  inputMode,
  ...props
}) {
  const generatedId = useId();
  const inputId = customId || generatedId;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;

  const describedBy = [
    hint ? hintId : null,
    error ? errorId : null,
  ].filter(Boolean).join(' ') || undefined;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5"
        >
          {label}
          {required && <span className="text-sand-gold-dark ml-1" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3.5 flex items-center pointer-events-none text-charcoal-muted">
            {leftIcon}
          </div>
        )}

        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={[
            'w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border text-base md:text-sm bg-white text-charcoal transition-colors duration-150',
            'placeholder:text-charcoal-light/70',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:border-forest',
            'disabled:bg-stone-light/60 disabled:cursor-not-allowed disabled:text-charcoal-muted',
            leftIcon ? 'pl-10' : '',
            rightIcon ? 'pr-10' : '',
            error
              ? 'border-red-500 focus-visible:ring-red-500 focus-visible:border-red-500 bg-red-50/20'
              : 'border-stone hover:border-stone-dark',
          ].filter(Boolean).join(' ')}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3.5 flex items-center text-charcoal-muted">
            {rightIcon}
          </div>
        )}
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

