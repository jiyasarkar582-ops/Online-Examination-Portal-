import api from './api';
import { MOCK_INCIDENTS } from '../utils/dummyData';
import { PROCTOR_ACTIONS } from '../utils/constants';

export const proctoringService = {
  logEvent: async (attemptId, eventData) => {
    try {
      const res = await api.post('/proctoring/events', {
        attemptId,
        ...eventData,
        clientTimestamp: new Date().toISOString(),
      });
      return res.data;
    } catch (err) {
      // Local policy evaluation fallback for client-side feedback
      console.log("[Proctoring Event Intercepted]", eventData);
      
      let suggestedAction = PROCTOR_ACTIONS.LOG_ONLY;
      if (eventData.eventType === 'TAB_SWITCH') {
        suggestedAction = PROCTOR_ACTIONS.WARN;
      } else if (eventData.eventType === 'CLIPBOARD_ACTION') {
        suggestedAction = PROCTOR_ACTIONS.WARN;
      } else if (eventData.eventType === 'FULLSCREEN_EXIT') {
        suggestedAction = PROCTOR_ACTIONS.WARN;
      }
      
      return {
        success: true,
        eventId: `EVT-${Date.now()}`,
        action: suggestedAction,
        message: `Proctoring notice: ${eventData.description || 'System recorded event'}`,
      };
    }
  },

  getIncidents: async () => {
    try {
      const res = await api.get('/examiner/incidents');
      return res.data;
    } catch (err) {
      return MOCK_INCIDENTS;
    }
  },

  getIncidentById: async (incidentId) => {
    try {
      const res = await api.get(`/examiner/incidents/${incidentId}`);
      return res.data;
    } catch (err) {
      return MOCK_INCIDENTS.find(i => i.id === incidentId) || MOCK_INCIDENTS[0];
    }
  },

  submitIncidentDecision: async (incidentId, decisionData) => {
    try {
      const res = await api.post(`/examiner/incidents/${incidentId}/review`, decisionData);
      return res.data;
    } catch (err) {
      return {
        success: true,
        incidentId,
        ...decisionData,
        reviewedAt: new Date().toISOString(),
      };
    }
  },

  getViolationRules: async () => {
    try {
      const res = await api.get('/admin/proctoring-rules');
      return res.data;
    } catch (err) {
      return [
        { id: 1, eventType: 'TAB_SWITCH', label: 'Browser Tab / Window Switch', threshold: 3, action: 'FLAG_FOR_REVIEW', enabled: true },
        { id: 2, eventType: 'FULLSCREEN_EXIT', label: 'Exiting Fullscreen Mode', threshold: 2, action: 'WARN', enabled: true },
        { id: 3, eventType: 'CLIPBOARD_ACTION', label: 'Copy / Cut / Paste In Exam', threshold: 1, action: 'WARN', enabled: true },
        { id: 4, eventType: 'CONCURRENT_SESSION', label: 'Multiple Concurrent Logins', threshold: 1, action: 'PAUSE', enabled: true },
        { id: 5, eventType: 'CRITICAL_ACCUMULATION', label: 'Total Cumulative Violations', threshold: 5, action: 'AUTO_SUBMIT', enabled: true },
      ];
    }
  },

  updateViolationRule: async (ruleId, updatedRule) => {
    try {
      const res = await api.put(`/admin/proctoring-rules/${ruleId}`, updatedRule);
      return res.data;
    } catch (err) {
      return { success: true, ...updatedRule };
    }
  },
};

