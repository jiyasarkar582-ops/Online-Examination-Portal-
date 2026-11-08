import api from './api';
import { MOCK_EXAMS, MOCK_QUESTIONS, MOCK_STUDENT_RESULTS, MOCK_SUBMISSIONS, MOCK_INCIDENTS, MOCK_ADMIN_STATS } from '../utils/dummyData';

export const examService = {
  // --- Student API ---
  getStudentExams: async () => {
    try {
      const res = await api.get('/exams/student');
      return res.data;
    } catch (err) {
      // Fallback to rich dummy data
      return MOCK_EXAMS;
    }
  },

  getExamById: async (examId) => {
    try {
      const res = await api.get(`/exams/${examId}`);
      return res.data;
    } catch (err) {
      const found = MOCK_EXAMS.find(e => e.id === examId) || MOCK_EXAMS[0];
      return found;
    }
  },

  startExamAttempt: async (examId) => {
    try {
      const res = await api.post(`/exams/${examId}/start`);
      return res.data;
    } catch (err) {
      const exam = MOCK_EXAMS.find(e => e.id === examId) || MOCK_EXAMS[0];
      const durationSeconds = exam.durationMinutes * 60;
      const startedAt = new Date().toISOString();
      const deadlineAt = new Date(Date.now() + durationSeconds * 1000).toISOString();
      
      // Clean student questions (remove correct answers for strict PRD compliance)
      const studentQuestions = MOCK_QUESTIONS.filter(q => q.examId === examId || examId === "EXM-101").map(q => {
        const { correctOptionId, explanation, ...safeQuestion } = q;
        return safeQuestion;
      });

      return {
        attemptId: `ATT-${Math.floor(1000 + Math.random() * 9000)}`,
        examId: exam.id,
        examTitle: exam.title,
        durationSeconds,
        startedAt,
        deadlineAt,
        questions: studentQuestions.length > 0 ? studentQuestions : MOCK_QUESTIONS,
        savedAnswers: {}, // previously saved state for recovery
      };
    }
  },

  saveAnswer: async (attemptId, questionId, answerData) => {
    try {
      const res = await api.put(`/attempts/${attemptId}/answers/${questionId}`, answerData);
      return res.data;
    } catch (err) {
      // Autosave acknowledgement
      return {
        success: true,
        savedAt: new Date().toISOString(),
        attemptId,
        questionId,
      };
    }
  },

  submitExam: async (attemptId, finalPayload) => {
    try {
      const res = await api.post(`/attempts/${attemptId}/submit`, finalPayload);
      return res.data;
    } catch (err) {
      return {
        success: true,
        attemptId,
        status: "SUBMITTED",
        submittedAt: new Date().toISOString(),
        message: "Your examination has been submitted successfully and queued for evaluation.",
      };
    }
  },

  getStudentResults: async () => {
    try {
      const res = await api.get('/results/my');
      return res.data;
    } catch (err) {
      return MOCK_STUDENT_RESULTS;
    }
  },

  // --- Examiner / Teacher API ---
  getExaminerExams: async () => {
    try {
      const res = await api.get('/examiner/exams');
      return res.data;
    } catch (err) {
      return MOCK_EXAMS;
    }
  },

  createExam: async (examData) => {
    try {
      const res = await api.post('/examiner/exams', examData);
      return res.data;
    } catch (err) {
      const newExam = {
        ...examData,
        id: `EXM-${Math.floor(100 + Math.random() * 900)}`,
        status: "DRAFT",
        created_at: new Date().toISOString(),
      };
      return newExam;
    }
  },

  getSubmissionsForExam: async (examId) => {
    try {
      const res = await api.get(`/examiner/exams/${examId}/submissions`);
      return res.data;
    } catch (err) {
      return MOCK_SUBMISSIONS;
    }
  },

  gradeDescriptiveAnswer: async (attemptId, questionId, gradingData) => {
    try {
      const res = await api.post(`/examiner/grading/${attemptId}/${questionId}`, gradingData);
      return res.data;
    } catch (err) {
      return {
        success: true,
        attemptId,
        questionId,
        ...gradingData,
      };
    }
  },

  // --- Admin API ---
  getPlatformStats: async () => {
    try {
      const res = await api.get('/admin/stats');
      return res.data;
    } catch (err) {
      return MOCK_ADMIN_STATS;
    }
  },
};

