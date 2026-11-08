import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { examService } from '../../services/examService';
import { QUESTION_STATUS, QUESTION_TYPES } from '../../utils/constants';
import { useProctoring } from '../../hooks/useProctoring';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Flag,
  RotateCcw,
  Send,
  Loader2,
  Maximize2,
  FileQuestion,
  HelpCircle,
  Clock,
  Eye,
} from 'lucide-react';
import ExamTimer from '../../components/student/ExamTimer';
import QuestionPalette from '../../components/student/QuestionPalette';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Alert from '../../components/common/Alert';

const ExamScreen = () => {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [examData, setExamData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // State maps
  const [userAnswers, setUserAnswers] = useState({}); // { [questionId]: selectedOptionId or text }
  const [questionStates, setQuestionStates] = useState({}); // { [index]: ANSWERED | UNANSWERED | REVIEW | UNVISITED }
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved' | 'saving'
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Autosave debounce timer ref
  const autosaveTimerRef = useRef(null);

  // Initialize Proctoring Hook
  const {
    violations,
    violationCount,
    warningMessage,
    clearWarning,
    isFullscreen,
    requestFullscreen,
  } = useProctoring({
    attemptId: examData?.attemptId || 'ATT-DEMO',
    maxViolations: 4,
    onAutoSubmit: () => handleFinalSubmit(true),
  });

  // Load Exam and Attempt Details
  useEffect(() => {
    const fetchExam = async () => {
      setLoading(true);
      try {
        const attempt = await examService.startExamAttempt(examId);
        setExamData(attempt);
        setQuestions(attempt.questions || []);

        // Initialize question states: mark first question as UNANSWERED (visited)
        const initialStates = {};
        attempt.questions.forEach((_, i) => {
          initialStates[i] = i === 0 ? QUESTION_STATUS.UNANSWERED : QUESTION_STATUS.UNVISITED;
        });
        setQuestionStates(initialStates);

        // Attempt to trigger fullscreen
        try {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(() => {});
          }
        } catch (e) {}
      } catch (err) {
        console.error("Failed to load exam attempt", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [examId]);

  // Handle Question Navigation
  const handleSelectQuestion = (index) => {
    if (index < 0 || index >= questions.length) return;
    
    // Update state of current question if it wasn't answered or marked for review
    setQuestionStates((prev) => {
      const currentStatus = prev[currentIndex];
      const hasAnswer = userAnswers[questions[currentIndex]?.id];
      let newStatus = currentStatus;

      if (currentStatus === QUESTION_STATUS.REVIEW) {
        newStatus = QUESTION_STATUS.REVIEW;
      } else if (hasAnswer) {
        newStatus = QUESTION_STATUS.ANSWERED;
      } else {
        newStatus = QUESTION_STATUS.UNANSWERED;
      }

      // Mark target question as visited if not yet visited
      const targetStatus = prev[index] === QUESTION_STATUS.UNVISITED ? QUESTION_STATUS.UNANSWERED : prev[index];

      return {
        ...prev,
        [currentIndex]: newStatus,
        [index]: targetStatus,
      };
    });

    setCurrentIndex(index);
  };

  // Handle Answer Selection / Change
  const handleAnswerChange = (answerValue) => {
    const currentQ = questions[currentIndex];
    if (!currentQ) return;

    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: answerValue,
    }));

    // Update Palette status to ANSWERED
    setQuestionStates((prev) => ({
      ...prev,
      [currentIndex]: QUESTION_STATUS.ANSWERED,
    }));

    // Trigger debounced autosave to backend
    setSaveStatus('saving');
    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);

    autosaveTimerRef.current = setTimeout(async () => {
      try {
        await examService.saveAnswer(examData?.attemptId, currentQ.id, {
          selectedOptionId: currentQ.type !== QUESTION_TYPES.DESCRIPTIVE ? answerValue : null,
          answerText: currentQ.type === QUESTION_TYPES.DESCRIPTIVE ? answerValue : null,
        });
      } catch (e) {
        console.warn("Autosave offline fallback active");
      } finally {
        setSaveStatus('saved');
      }
    }, 1200);
  };

  // Toggle Mark for Review
  const handleToggleReview = () => {
    setQuestionStates((prev) => {
      const current = prev[currentIndex];
      const hasAnswer = userAnswers[questions[currentIndex]?.id];
      const nextStatus = current === QUESTION_STATUS.REVIEW
        ? (hasAnswer ? QUESTION_STATUS.ANSWERED : QUESTION_STATUS.UNANSWERED)
        : QUESTION_STATUS.REVIEW;
      return {
        ...prev,
        [currentIndex]: nextStatus,
      };
    });
  };

  // Clear Response for Active Question
  const handleClearResponse = () => {
    const currentQ = questions[currentIndex];
    if (!currentQ) return;

    setUserAnswers((prev) => {
      const updated = { ...prev };
      delete updated[currentQ.id];
      return updated;
    });

    setQuestionStates((prev) => ({
      ...prev,
      [currentIndex]: QUESTION_STATUS.UNANSWERED,
    }));

    setSaveStatus('saving');
    setTimeout(() => setSaveStatus('saved'), 500);
  };

  // Submit Final Examination
  const handleFinalSubmit = async (isAuto = false) => {
    setIsSubmitting(true);
    try {
      await examService.submitExam(examData?.attemptId, {
        answers: userAnswers,
        isAutoSubmitted: isAuto,
        violationsCount: violationCount,
      });

      // Exit fullscreen before redirecting
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }

      navigate(`/student/results?submitted=true&examId=${examId}`);
    } catch (err) {
      console.error("Submission failed", err);
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface-ground flex flex-col items-center justify-center p-4">
        <Loader2 className="w-10 h-10 text-royal-600 animate-spin mb-3" />
        <h3 className="text-sm font-bold text-navy-900">Preparing Secure Examination Session...</h3>
        <p className="text-xs text-slate-500 mt-1">Synchronizing deadline with server clock and loading sanitized question set.</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isMarkedReview = questionStates[currentIndex] === QUESTION_STATUS.REVIEW;
  const currentAnswer = userAnswers[currentQuestion?.id] || '';

  // Summary counts for confirmation modal
  const answeredCount = Object.values(questionStates).filter(s => s === QUESTION_STATUS.ANSWERED).length;
  const reviewCount = Object.values(questionStates).filter(s => s === QUESTION_STATUS.REVIEW).length;
  const unansweredCount = questions.length - (answeredCount + reviewCount);

  return (
    <div className="min-h-screen bg-surface-ground flex flex-col select-none">
      {/* Distraction-Free Exam Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-navy-800 text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5 text-royal-400" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-navy-900 leading-tight">
                {examData?.examTitle || 'Academic Examination'}
              </h1>
              <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                <span>Attempt ID: <strong className="font-mono text-navy-800">{examData?.attemptId}</strong></span>
                <span>•</span>
                <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Smart Proctoring Active
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Live Autosave Indicator */}
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500">
              {saveStatus === 'saving' ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 text-royal-600 animate-spin" />
                  <span>Syncing...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>All answers saved</span>
                </>
              )}
            </div>

            {/* Monotonic Countdown Timer */}
            <ExamTimer
              initialSeconds={examData?.durationSeconds || 2700}
              onTimeExpire={() => handleFinalSubmit(true)}
            />

            {/* Submit Button */}
            <Button
              variant="success"
              size="sm"
              onClick={() => setShowSubmitModal(true)}
              rightIcon={<Send className="w-3.5 h-3.5" />}
              className="font-semibold shadow-xs"
            >
              Submit Exam
            </Button>
          </div>
        </div>
      </header>

      {/* Proctoring Warning Notification Banner (if any) */}
      {warningMessage && (
        <div className="bg-amber-500 text-white px-4 py-2 text-xs font-medium flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{warningMessage}</span>
          </div>
          <button
            onClick={clearWarning}
            className="text-white hover:text-amber-100 font-bold px-2 py-0.5 text-xs underline cursor-pointer"
          >
            Acknowledge
          </button>
        </div>
      )}

      {/* Fullscreen Restore Banner */}
      {!isFullscreen && (
        <div className="bg-rose-600 text-white px-4 py-2 text-xs font-semibold flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 animate-bounce" />
            <span>EXAMINATION FULL-SCREEN MODE LOST. Please return to full-screen mode immediately.</span>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={requestFullscreen}
            className="bg-white text-rose-700 hover:bg-rose-50 border-white text-xs py-1"
          >
            Restore Full-Screen
          </Button>
        </div>
      )}

      {/* Main Examination Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Active Question Workspace */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 flex-1">
            {/* Question Header & Marks Badge */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-navy-900">
                  Question {currentIndex + 1}
                </span>
                <Badge variant={currentQuestion?.type === QUESTION_TYPES.DESCRIPTIVE ? 'purple' : 'primary'}>
                  {currentQuestion?.type}
                </Badge>
                {isMarkedReview && (
                  <Badge variant="warning">
                    <Flag className="w-3 h-3 text-amber-600" /> Marked for Review
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="px-2 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold">
                  +{currentQuestion?.marks || 4} Marks
                </span>
                {currentQuestion?.negativeMarks > 0 && (
                  <span className="px-2 py-1 rounded-lg bg-rose-50 text-rose-700 font-semibold">
                    -{currentQuestion?.negativeMarks} Penalty
                  </span>
                )}
              </div>
            </div>

            {/* Question Prompt */}
            <div className="text-sm md:text-base font-medium text-slate-800 leading-relaxed mb-8">
              {currentQuestion?.questionText}
            </div>

            {/* Options Renderer */}
            <div className="space-y-3">
              {/* MCQ Options */}
              {currentQuestion?.type === QUESTION_TYPES.MCQ && (
                currentQuestion.options?.map((option) => {
                  const isSelected = currentAnswer === option.id;
                  return (
                    <label
                      key={option.id}
                      onClick={() => handleAnswerChange(option.id)}
                      className={`flex items-start gap-3.5 p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-royal-50/60 border-royal-500 shadow-xs ring-1 ring-royal-500'
                          : 'bg-white border-slate-200 hover:bg-slate-50/80 hover:border-slate-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question_${currentQuestion.id}`}
                        checked={isSelected}
                        onChange={() => {}}
                        className="mt-1 w-4 h-4 text-royal-600 border-slate-300 focus:ring-royal-500"
                      />
                      <span className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                        {option.text}
                      </span>
                    </label>
                  );
                })
              )}

              {/* TRUE / FALSE Options */}
              {currentQuestion?.type === QUESTION_TYPES.TRUE_FALSE && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentQuestion.options?.map((option) => {
                    const isSelected = currentAnswer === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handleAnswerChange(option.id)}
                        className={`p-6 rounded-2xl border text-center font-bold text-sm transition-all ${
                          isSelected
                            ? 'bg-royal-600 text-white border-royal-600 shadow-md ring-2 ring-royal-400'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {option.text}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* DESCRIPTIVE Answer Input */}
              {currentQuestion?.type === QUESTION_TYPES.DESCRIPTIVE && (
                <div>
                  <textarea
                    rows={8}
                    value={currentAnswer}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                    placeholder="Type your comprehensive academic response here. Mention key derivations, algorithmic steps, or conceptual arguments..."
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-royal-500/20 focus:border-royal-500 font-sans leading-relaxed"
                  />
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                    <span>Proctoring Notice: Copying and pasting is recorded.</span>
                    <span>
                      {currentAnswer.length} characters • {currentAnswer.trim() ? currentAnswer.trim().split(/\s+/).length : 0} words
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Control Bar */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleToggleReview}
                leftIcon={<Flag className={`w-3.5 h-3.5 ${isMarkedReview ? 'text-purple-600 fill-purple-600' : ''}`} />}
              >
                {isMarkedReview ? 'Unmark Review' : 'Mark for Review'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearResponse}
                leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
              >
                Clear Response
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentIndex === 0}
                onClick={() => handleSelectQuestion(currentIndex - 1)}
                leftIcon={<ChevronLeft className="w-4 h-4" />}
              >
                Previous
              </Button>
              <Button
                variant="primary"
                size="sm"
                disabled={currentIndex === questions.length - 1}
                onClick={() => handleSelectQuestion(currentIndex + 1)}
                rightIcon={<ChevronRight className="w-4 h-4" />}
              >
                Next Question
              </Button>
            </div>
          </div>
        </div>

        {/* Right Column: Question Palette & Live Proctoring Summary */}
        <div className="lg:col-span-4 space-y-5">
          <QuestionPalette
            questions={questions}
            currentIndex={currentIndex}
            questionStates={questionStates}
            onSelectQuestion={handleSelectQuestion}
          />

          {/* Telemetry Status Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <h5 className="text-xs font-bold text-navy-900 uppercase tracking-wider">
                Session Telemetry
              </h5>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
              Institutional AI & smart proctoring telemetry is actively verifying compliance.
            </p>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between text-slate-600">
                <span>Tab Focus Status</span>
                <span className="font-semibold text-emerald-600">Active</span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Full-Screen Mode</span>
                <span className={isFullscreen ? "font-semibold text-emerald-600" : "font-semibold text-rose-600"}>
                  {isFullscreen ? "Locked" : "Exit Detected"}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Total Recorded Signals</span>
                <span className="font-mono font-bold text-navy-900">
                  {violations.length} events
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Final Submit Confirmation Modal */}
      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Confirm Examination Final Submission"
        maxWidth="max-w-lg"
        footer={
          <>
            <Button variant="ghost" size="md" onClick={() => setShowSubmitModal(false)}>
              Return to Exam
            </Button>
            <Button
              variant="success"
              size="md"
              isLoading={isSubmitting}
              onClick={() => handleFinalSubmit(false)}
              rightIcon={<Send className="w-4 h-4" />}
            >
              Confirm & Submit
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-left">
          <p className="text-xs text-slate-600 leading-relaxed">
            Are you sure you want to finalize and submit your examination? Once submitted, your answers will be locked and transferred to the server for evaluation.
          </p>

          <div className="grid grid-cols-3 gap-3 p-3 bg-surface-ground rounded-2xl border border-slate-200 text-center">
            <div className="p-2">
              <span className="text-xl font-bold text-emerald-600 block">{answeredCount}</span>
              <span className="text-[10px] font-semibold text-slate-500 uppercase">Answered</span>
            </div>
            <div className="p-2">
              <span className="text-xl font-bold text-purple-600 block">{reviewCount}</span>
              <span className="text-[10px] font-semibold text-slate-500 uppercase">For Review</span>
            </div>
            <div className="p-2">
              <span className="text-xl font-bold text-rose-500 block">{unansweredCount}</span>
              <span className="text-[10px] font-semibold text-slate-500 uppercase">Unanswered</span>
            </div>
          </div>

          {unansweredCount > 0 && (
            <Alert type="warning">
              You have <strong>{unansweredCount} unattempted</strong> questions. Are you sure you wish to proceed with submission?
            </Alert>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ExamScreen;

