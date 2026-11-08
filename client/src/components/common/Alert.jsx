import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react';

const Alert = ({
  type = 'info',
  title,
  children,
  onClose,
  className = '',
}) => {
  const configs = {
    info: {
      container: 'bg-blue-50 border-blue-200 text-blue-900',
      icon: <Info className="w-5 h-5 text-blue-600 shrink-0" />,
    },
    warning: {
      container: 'bg-amber-50 border-amber-200 text-amber-900',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
    },
    danger: {
      container: 'bg-rose-50 border-rose-200 text-rose-900',
      icon: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
    },
    success: {
      container: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
    },
  };

  const current = configs[type] || configs.info;

  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border ${current.container} ${className}`}>
      {current.icon}
      <div className="flex-1 text-sm">
        {title && <h4 className="font-semibold mb-0.5">{title}</h4>}
        <div className="opacity-90">{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 -mr-1 -mt-1 rounded-lg opacity-70 hover:opacity-100 hover:bg-black/5 transition-opacity"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Alert;

