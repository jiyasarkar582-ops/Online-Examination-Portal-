import React from 'react';

const MetricCard = ({ title, value, subtitle, icon: Icon, trend, variant = 'default' }) => {
  const variantGradients = {
    default: 'border-slate-200/80',
    primary: 'border-royal-200 bg-gradient-to-br from-white to-royal-50/30',
    success: 'border-emerald-200 bg-gradient-to-br from-white to-emerald-50/30',
    warning: 'border-amber-200 bg-gradient-to-br from-white to-amber-50/30',
    purple: 'border-purple-200 bg-gradient-to-br from-white to-purple-50/30',
  };

  return (
    <div className={`p-5 rounded-2xl bg-white border ${variantGradients[variant] || variantGradients.default} shadow-xs hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-navy-800">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold tracking-tight text-navy-900">{value}</span>
        {trend && (
          <span className={`text-xs font-semibold ${trend.positive ? 'text-emerald-600' : 'text-slate-500'}`}>
            {trend.text}
          </span>
        )}
      </div>
      {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
    </div>
  );
};

export default MetricCard;

