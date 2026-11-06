import React from 'react';

/**
 * Reusable Badge / Tag component for Bookly.
 * Follows the visual palette: forest, sand-gold, stone, and pending status.
 */
export default function Badge({
  children,
  variant = 'stone',
  size = 'md',
  className = '',
  icon,
  ...props
}) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full tracking-wider uppercase';

  const variants = {
    forest: 'bg-forest-subtle text-forest border border-forest/15',
    gold: 'bg-sand-gold-subtle text-sand-gold-dark border border-sand-gold/25',
    stone: 'bg-stone-light text-charcoal-muted border border-stone',
    dark: 'bg-black/50 text-ivory border border-sand-gold/40 backdrop-blur-md',
    pending: 'bg-amber-50 text-amber-800 border border-amber-200',
    confirmed: 'bg-emerald-50 text-emerald-800 border border-emerald-200',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[10px] gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3.5 py-1.5 text-xs gap-2',
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant] || variants.stone} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}

