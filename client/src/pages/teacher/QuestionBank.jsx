import React, { useState } from 'react';
import { MOCK_QUESTIONS } from '../../utils/dummyData';
import { QUESTION_TYPES } from '../../utils/constants';
import {
  BookOpen,
  PlusCircle,
  CheckCircle2,
  HelpCircle,
  Trash2,
  Edit,
  Search,
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';

const QuestionBank = () => {
  const [questions, setQuestions] = useState(MOCK_QUESTIONS);
  const [filterType, setFilterType] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Question Form State
  const [newQ, setNewQ] = useState({
    type: QUESTION_TYPES.MCQ,
    marks: 4,
    negativeMarks: 1,
    questionText: '',
    explanation: '',
    options: [
      { id: 'opt_1', text: '' },
      { id: 'opt_2', text: '' },
      { id: 'opt_3', text: '' },
      { id: 'opt_4', text: '' },
    ],
    correctOptionId: 'opt_1',
  });

  const handleAddQuestion = () => {
    if (!newQ.questionText) return;
    const created = {
      ...newQ,
      id: Date.now(),
      examId: 'EXM-101',
    };
    setQuestions([created, ...questions]);
    setShowAddModal(false);
    setNewQ({
      type: QUESTION_TYPES.MCQ,
      marks: 4,
      negativeMarks: 1,
      questionText: '',
      explanation: '',
      options: [
        { id: 'opt_1', text: '' },
        { id: 'opt_2', text: '' },
        { id: 'opt_3', text: '' },
        { id: 'opt_4', text: '' },
      ],
      correctOptionId: 'opt_1',
    });
  };

  const filtered = questions.filter(
    (q) => filterType === 'ALL' || q.type === filterType
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-navy-900 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-royal-600" />
              Institutional Question Bank
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Author and curate MCQ, True/False, and Descriptive question items with answer keys.
            </p>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowAddModal(true)}
            leftIcon={<PlusCircle className="w-4 h-4" />}
          >
            Add New Question
          </Button>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
          {['ALL', 'MCQ', 'TRUE_FALSE', 'DESCRIPTIVE'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filterType === t
                  ? 'bg-navy-800 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {t.replace('_', ' ')}
            </button>
          ))}
          <span className="text-xs text-slate-400 ml-auto font-medium">
            Showing {filtered.length} questions
          </span>
        </div>

        {/* Question Cards Grid */}
        <div className="space-y-4">
          {filtered.map((q, idx) => (
            <div
              key={q.id}
              className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-navy-900">Item #{idx + 1}</span>
                  <Badge variant={q.type === 'DESCRIPTIVE' ? 'purple' : 'primary'}>
                    {q.type}
                  </Badge>
                  <span className="text-xs font-semibold text-slate-500">
                    +{q.marks} Marks {q.negativeMarks > 0 && `(-${q.negativeMarks})`}
                  </span>
                </div>
                <button
                  onClick={() => setQuestions(questions.filter((item) => item.id !== q.id))}
                  className="text-slate-400 hover:text-rose-600 p-1 rounded-lg"
                  title="Delete question"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-sm font-medium text-slate-800 leading-relaxed">
                {q.questionText}
              </p>

              {/* Options Preview */}
              {q.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.options.map((opt) => (
                    <div
                      key={opt.id}
                      className={`p-2.5 rounded-xl border flex items-center justify-between ${
                        q.correctOptionId === opt.id
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span>{opt.text}</span>
                      {q.correctOptionId === opt.id && (
                        <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                          Correct Key
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {q.explanation && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  <span className="font-semibold text-navy-900 block mb-0.5">Rubric & Key Explanation:</span>
                  {q.explanation}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add Question Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Question to Bank"
        maxWidth="max-w-2xl"
        footer={
          <>
            <Button variant="ghost" size="md" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="md" onClick={handleAddQuestion}>
              Save to Question Bank
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-left">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Question Type</label>
              <select
                value={newQ.type}
                onChange={(e) => setNewQ({ ...newQ, type: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              >
                <option value={QUESTION_TYPES.MCQ}>Multiple Choice (MCQ)</option>
                <option value={QUESTION_TYPES.TRUE_FALSE}>True / False</option>
                <option value={QUESTION_TYPES.DESCRIPTIVE}>Descriptive</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Marks</label>
              <input
                type="number"
                value={newQ.marks}
                onChange={(e) => setNewQ({ ...newQ, marks: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Negative Penalty</label>
              <input
                type="number"
                step="0.25"
                value={newQ.negativeMarks}
                onChange={(e) => setNewQ({ ...newQ, negativeMarks: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Question Prompt</label>
            <textarea
              rows={3}
              value={newQ.questionText}
              onChange={(e) => setNewQ({ ...newQ, questionText: e.target.value })}
              placeholder="Enter question statement..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>

          {newQ.type === QUESTION_TYPES.MCQ && (
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">Answer Options & Correct Key</label>
              {newQ.options.map((opt, i) => (
                <div key={opt.id} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="correctOption"
                    checked={newQ.correctOptionId === opt.id}
                    onChange={() => setNewQ({ ...newQ, correctOptionId: opt.id })}
                    title="Select as correct option"
                  />
                  <input
                    type="text"
                    value={opt.text}
                    onChange={(e) => {
                      const updated = [...newQ.options];
                      updated[i].text = e.target.value;
                      setNewQ({ ...newQ, options: updated });
                    }}
                    placeholder={`Option ${String.fromCharCode(65 + i)}`}
                    className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              ))}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Grading Rubric / Explanation</label>
            <textarea
              rows={2}
              value={newQ.explanation}
              onChange={(e) => setNewQ({ ...newQ, explanation: e.target.value })}
              placeholder="Internal solution explanation or descriptive marking criteria..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default QuestionBank;

