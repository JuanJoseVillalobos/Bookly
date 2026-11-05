import React from 'react';

/**
 * Reusable Button component for Bookly.
 * Follows the "Premium Editorial Minimalism" design system.
 * Touch target compliant (>= 44px on md/lg sizes).
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  onClick,
  ...props
}) {
  const baseStyles = [
    'inline-flex items-center justify-center font-medium transition-all duration-150',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory',
    'disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer',
  ].join(' ');

  const variants = {
    primary: 'bg-forest text-ivory hover:bg-forest-light active:bg-forest-dark focus-visible:ring-forest shadow-xs',
    secondary: 'bg-white text-charcoal border border-stone hover:bg-stone-light/70 hover:border-stone-dark active:bg-stone focus-visible:ring-forest shadow-xs',
    accent: 'bg-sand-gold text-forest font-semibold hover:bg-sand-gold-light active:bg-sand-gold-dark focus-visible:ring-sand-gold shadow-xs',
    outline: 'bg-transparent text-forest border border-forest/40 hover:bg-forest-subtle hover:border-forest active:bg-forest/10 focus-visible:ring-forest',
    ghost: 'bg-transparent text-forest hover:bg-forest-subtle active:bg-forest/10 focus-visible:ring-forest',
  };

  const sizes = {
    sm: 'px-3.5 py-1.5 text-xs rounded-md min-h-[36px] gap-1.5',
    md: 'px-5 py-2.5 text-sm rounded-lg min-h-[44px] gap-2',
    lg: 'px-6 py-3 text-base rounded-lg min-h-[48px] gap-2.5',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" aria-hidden="true" />
      ) : (
        leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </button>
  );
}
