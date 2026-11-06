import React from 'react';

/**
 * Reusable Card component for Bookly.
 * Follows the "Premium Editorial Minimalism" aesthetic with subtle borders and balanced whitespace.
 */
export default function Card({
  children,
  className = '',
  hoverEffect = false,
  as: Component = 'div',
  ...props
}) {
  const hasOverflowClass = className.includes('overflow-');

  return (
    <Component
      className={[
        'bg-white border border-stone rounded-xl',
        hasOverflowClass ? '' : 'overflow-hidden',
        hoverEffect ? 'transition-all duration-200 hover:border-forest/30 hover:shadow-md' : 'shadow-xs',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </Component>
  );
}

