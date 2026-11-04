import React from 'react';

/**
 * Reusable Button component for Bookly.
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  onClick,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-[#173F35] text-[#F7F5EF] hover:bg-[#173F35]/90 focus:ring-[#173F35]',
    secondary: 'bg-white text-[#222824] border border-[#E8E5DC] hover:bg-gray-50 focus:ring-gray-300',
    accent: 'bg-[#C5A77A] text-[#173F35] hover:bg-[#C5A77A]/90 focus:ring-[#C5A77A]',
    ghost: 'text-[#173F35] hover:bg-[#173F35]/10 focus:ring-[#173F35]',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

