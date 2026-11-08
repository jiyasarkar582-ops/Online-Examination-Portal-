import React from 'react';

const Badge = ({ children, variant = 'neutral', size = 'md', className = '' }) => {
  const variantStyles = {
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    primary: 'bg-royal-50 text-royal-700 border-royal-200',
    navy: 'bg-navy-100 text-navy-800 border-navy-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1 font-medium',
    lg: 'text-sm px-3 py-1.5 font-medium',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${variantStyles[variant] || variantStyles.neutral} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;

