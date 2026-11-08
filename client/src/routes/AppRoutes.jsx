import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { ROLES } from '../utils/constants';

// Public Pages
import Home from '../pages/public/Home';
import Login from '../pages/public/Login';
import Register from '../pages/public/Register';
import ForgotPassword from '../pages/public/ForgotPassword';

// Student Pages
import StudentDashboard from '../pages/student/StudentDashboard';
import MyExams from '../pages/student/MyExams';
import ExamScreen from '../pages/student/ExamScreen';
import ResultView from '../pages/student/ResultView';
import StudentAnalytics from '../pages/student/StudentAnalytics';

// Teacher Pages
import TeacherDashboard from '../pages/teacher/TeacherDashboard';
import ManageExams from '../pages/teacher/ManageExams';
import CreateExam from '../pages/teacher/CreateExam';
import QuestionBank from '../pages/teacher/QuestionBank';
import SubmissionsList from '../pages/teacher/SubmissionsList';
import GradingStudio from '../pages/teacher/GradingStudio';
import IncidentReview from '../pages/teacher/IncidentReview';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserManagement from '../pages/admin/UserManagement';
import Departments from '../pages/admin/Departments';
import ProctoringRules from '../pages/admin/ProctoringRules';
import AuditLogs from '../pages/admin/AuditLogs';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Student Protected Routes */}
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/exams"
        element={
          <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
            <MyExams />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/exam/:examId"
        element={
          <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
            <ExamScreen />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/results"
        element={
          <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
            <ResultView />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/result/:resultId"
        element={
          <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
            <ResultView />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/analytics"
        element={
          <ProtectedRoute allowedRoles={[ROLES.STUDENT]}>
            <StudentAnalytics />
          </ProtectedRoute>
        }
      />

      {/* Teacher / Examiner Protected Routes */}
      <Route
        path="/teacher/dashboard"
        element={
          <ProtectedRoute allowedRoles={[ROLES.TEACHER]}>
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/exams"
        element={
          <ProtectedRoute allowedRoles={[ROLES.TEACHER]}>
            <ManageExams />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/create-exam"
        element={
          <ProtectedRoute allowedRoles={[ROLES.TEACHER]}>
            <CreateExam />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/question-bank"
        element={
          <ProtectedRoute allowedRoles={[ROLES.TEACHER]}>
            <QuestionBank />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/submissions"
        element={
          <ProtectedRoute allowedRoles={[ROLES.TEACHER]}>
            <SubmissionsList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/grading/:attemptId"
        element={
          <ProtectedRoute allowedRoles={[ROLES.TEACHER]}>
            <GradingStudio />
          </ProtectedRoute>
        }
      />
      <Route
        path="/teacher/incidents"
        element={
          <ProtectedRoute allowedRoles={[ROLES.TEACHER]}>
            <IncidentReview />
          </ProtectedRoute>
        }
      />

      {/* Admin Protected Routes */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <UserManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/departments"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <Departments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/proctoring-rules"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <ProctoringRules />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/audit-logs"
        element={
          <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AuditLogs />
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;

