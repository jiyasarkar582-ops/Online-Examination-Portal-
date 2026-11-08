import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_USERS } from '../utils/dummyData';
import { ROLES } from '../utils/constants';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('examportal_user');
    return saved ? JSON.parse(saved) : MOCK_USERS.student;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('examportal_token') || 'mock_jwt_token_student_session';
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('examportal_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('examportal_user');
      localStorage.removeItem('examportal_token');
    }
  }, [user]);

  const login = async (email, password, roleHint = 'ROLE_STUDENT') => {
    setLoading(true);
    try {
      // Simulate network authentication delay
      await new Promise(r => setTimeout(r, 400));
      
      let targetUser = MOCK_USERS.student;
      if (roleHint === ROLES.TEACHER || email.includes('teacher')) {
        targetUser = MOCK_USERS.teacher;
      } else if (roleHint === ROLES.ADMIN || email.includes('admin')) {
        targetUser = MOCK_USERS.admin;
      }
      
      const sessionUser = {
        ...targetUser,
        email: email || targetUser.email,
      };
      const sessionToken = `mock_jwt_${sessionUser.role}_${Date.now()}`;
      
      setUser(sessionUser);
      setToken(sessionToken);
      localStorage.setItem('examportal_token', sessionToken);
      return { success: true, user: sessionUser };
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    try {
      await new Promise(r => setTimeout(r, 500));
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        role: ROLES.STUDENT,
        rollNumber: formData.rollNumber || '2026CSE' + Math.floor(100 + Math.random() * 900),
        department: formData.department || 'Computer Science & Engineering',
        semester: formData.semester || 'Semester I',
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120",
      };
      const sessionToken = `mock_jwt_student_${Date.now()}`;
      setUser(newUser);
      setToken(sessionToken);
      localStorage.setItem('examportal_token', sessionToken);
      return { success: true, user: newUser };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('examportal_user');
    localStorage.removeItem('examportal_token');
  };

  const switchRole = (newRole) => {
    if (newRole === ROLES.STUDENT) {
      setUser(MOCK_USERS.student);
      setToken('mock_jwt_token_student_session');
    } else if (newRole === ROLES.TEACHER) {
      setUser(MOCK_USERS.teacher);
      setToken('mock_jwt_token_teacher_session');
    } else if (newRole === ROLES.ADMIN) {
      setUser(MOCK_USERS.admin);
      setToken('mock_jwt_token_admin_session');
    }
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    switchRole,
    isStudent: user?.role === ROLES.STUDENT,
    isTeacher: user?.role === ROLES.TEACHER,
    isAdmin: user?.role === ROLES.ADMIN,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

