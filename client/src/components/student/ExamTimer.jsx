import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

const ExamTimer = ({ initialSeconds, onTimeExpire }) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) {
      if (onTimeExpire) onTimeExpire();
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          if (onTimeExpire) onTimeExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, onTimeExpire]);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  const formattedTime = [
    hours > 0 ? String(hours).padStart(2, '0') : null,
    String(minutes).padStart(2, '0'),
    String(seconds).padStart(2, '0'),
  ]
    .filter(Boolean)
    .join(':');

  const isLowTime = secondsLeft < 300; // Under 5 minutes
  const isCritical = secondsLeft < 60;  // Under 1 minute

  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold transition-colors ${
        isCritical
          ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
          : isLowTime
          ? 'bg-amber-50 border-amber-300 text-amber-700'
          : 'bg-slate-100 border-slate-200 text-navy-900'
      }`}
    >
      {isLowTime ? (
        <AlertTriangle className="w-4 h-4 text-amber-600 animate-bounce" />
      ) : (
        <Clock className="w-4 h-4 text-royal-600" />
      )}
      <span>{formattedTime}</span>
      <span className="text-[10px] text-slate-500 font-sans font-medium uppercase hidden sm:inline">
        Remaining
      </span>
    </div>
  );
};

export default ExamTimer;

