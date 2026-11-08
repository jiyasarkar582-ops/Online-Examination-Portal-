import React from 'react';
import { QUESTION_STATUS } from '../../utils/constants';

const QuestionPalette = ({
  questions = [],
  currentIndex = 0,
  questionStates = {},
  onSelectQuestion,
}) => {
  // Compute summary metrics
  const counts = {
    answered: 0,
    unanswered: 0,
    review: 0,
    unvisited: 0,
  };

  questions.forEach((_, idx) => {
    const status = questionStates[idx] || QUESTION_STATUS.UNVISITED;
    if (status === QUESTION_STATUS.ANSWERED) counts.answered++;
    else if (status === QUESTION_STATUS.UNANSWERED) counts.unanswered++;
    else if (status === QUESTION_STATUS.REVIEW) counts.review++;
    else counts.unvisited++;
  });

  const getStatusColor = (status, isActive) => {
    let base = '';
    switch (status) {
      case QUESTION_STATUS.ANSWERED:
        base = 'bg-emerald-600 text-white hover:bg-emerald-700'; // Green
        break;
      case QUESTION_STATUS.UNANSWERED:
        base = 'bg-rose-500 text-white hover:bg-rose-600'; // Red
        break;
      case QUESTION_STATUS.REVIEW:
        base = 'bg-purple-600 text-white hover:bg-purple-700'; // Purple
        break;
      case QUESTION_STATUS.UNVISITED:
      default:
        base = 'bg-slate-200 text-slate-700 hover:bg-slate-300'; // Grey
        break;
    }
    return `${base} ${isActive ? 'ring-3 ring-navy-900 ring-offset-2 scale-105 font-bold z-10' : ''}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
        <h4 className="text-xs font-bold text-navy-900 uppercase tracking-wider">
          Question Palette
        </h4>
        <span className="text-xs text-slate-500 font-semibold">
          {currentIndex + 1} of {questions.length}
        </span>
      </div>

      {/* Palette Legend */}
      <div className="grid grid-cols-2 gap-2 text-[11px] mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-1.5 text-slate-600">
          <span className="w-3.5 h-3.5 rounded-md bg-emerald-600 text-white flex items-center justify-center text-[9px] font-bold">
            {counts.answered}
          </span>
          <span>Answered</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-600">
          <span className="w-3.5 h-3.5 rounded-md bg-rose-500 text-white flex items-center justify-center text-[9px] font-bold">
            {counts.unanswered}
          </span>
          <span>Unanswered</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-600">
          <span className="w-3.5 h-3.5 rounded-md bg-purple-600 text-white flex items-center justify-center text-[9px] font-bold">
            {counts.review}
          </span>
          <span>For Review</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-600">
          <span className="w-3.5 h-3.5 rounded-md bg-slate-200 text-slate-700 flex items-center justify-center text-[9px] font-bold">
            {counts.unvisited}
          </span>
          <span>Not Visited</span>
        </div>
      </div>

      {/* Palette Buttons Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 max-h-64 overflow-y-auto p-1">
        {questions.map((q, idx) => {
          const status = questionStates[idx] || QUESTION_STATUS.UNVISITED;
          const isActive = currentIndex === idx;

          return (
            <button
              key={q.id || idx}
              type="button"
              onClick={() => onSelectQuestion(idx)}
              className={`h-9 w-full rounded-xl text-xs font-semibold transition-all duration-150 flex items-center justify-center shadow-xs ${getStatusColor(
                status,
                isActive
              )}`}
              title={`Question ${idx + 1} (${status})`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionPalette;

