import { useState, useEffect, useCallback, useRef } from 'react';
import { proctoringService } from '../services/proctoringService';
import { PROCTOR_EVENT_TYPES, PROCTOR_ACTIONS } from '../utils/constants';

export const useProctoring = ({ attemptId, maxViolations = 4, onAutoSubmit }) => {
  const [violations, setViolations] = useState([]);
  const [warningMessage, setWarningMessage] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(true);
  const violationCountRef = useRef(0);

  const reportViolation = useCallback(async (eventType, description, severity = 'LOW') => {
    violationCountRef.current += 1;
    const currentCount = violationCountRef.current;

    const eventRecord = {
      eventType,
      description,
      severity: currentCount >= 3 ? 'HIGH' : currentCount === 2 ? 'MEDIUM' : severity,
      timestamp: new Date().toLocaleTimeString(),
    };

    setViolations((prev) => [...prev, eventRecord]);

    // Send telemetry to backend
    try {
      await proctoringService.logEvent(attemptId, eventRecord);
    } catch (e) {
      console.error("Proctoring log error:", e);
    }

    // Trigger graduated warning feedback
    if (currentCount >= maxViolations) {
      setWarningMessage(`CRITICAL: You have exceeded the permitted violation threshold (${currentCount}/${maxViolations}). Your examination is being auto-submitted for review.`);
      if (onAutoSubmit) {
        setTimeout(() => {
          onAutoSubmit();
        }, 2000);
      }
    } else if (currentCount === maxViolations - 1) {
      setWarningMessage(`FINAL WARNING: ${description}. (Violation ${currentCount}/${maxViolations}). Another occurrence will trigger auto-submission.`);
    } else {
      setWarningMessage(`PROCTORING NOTICE: ${description}. Please maintain focus on the examination window.`);
    }
  }, [attemptId, maxViolations, onAutoSubmit]);

  useEffect(() => {
    // 1. Tab & Window Focus Interception
    const handleVisibilityChange = () => {
      if (document.hidden) {
        reportViolation(
          PROCTOR_EVENT_TYPES.TAB_SWITCH,
          'Examination tab lost focus or browser window minimized.',
          'MEDIUM'
        );
      }
    };

    const handleWindowBlur = () => {
      // Debounce window blur to prevent false alerts on system dialogs
      reportViolation(
        PROCTOR_EVENT_TYPES.TAB_SWITCH,
        'Window lost active focus.',
        'LOW'
      );
    };

    // 2. Fullscreen Change Interception
    const handleFullscreenChange = () => {
      const isFs = !!document.fullscreenElement;
      setIsFullscreen(isFs);
      if (!isFs) {
        reportViolation(
          PROCTOR_EVENT_TYPES.FULLSCREEN_EXIT,
          'Exited full-screen examination mode.',
          'MEDIUM'
        );
      }
    };

    // 3. Clipboard Interception
    const handlePaste = (e) => {
      reportViolation(
        PROCTOR_EVENT_TYPES.CLIPBOARD_ACTION,
        'Paste action detected in examination answer area.',
        'HIGH'
      );
    };

    const handleCopy = (e) => {
      reportViolation(
        PROCTOR_EVENT_TYPES.CLIPBOARD_ACTION,
        'Copy attempt intercepted on examination content.',
        'LOW'
      );
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    window.addEventListener('paste', handlePaste);
    window.addEventListener('copy', handleCopy);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('paste', handlePaste);
      window.removeEventListener('copy', handleCopy);
    };
  }, [reportViolation]);

  const requestFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      }
    } catch (err) {
      console.warn("Fullscreen request error", err);
    }
  };

  const clearWarning = () => {
    setWarningMessage(null);
  };

  return {
    violations,
    violationCount: violationCountRef.current,
    warningMessage,
    clearWarning,
    isFullscreen,
    requestFullscreen,
  };
};

