package com.examportal.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public class AttemptDto {

    public static class StartAttemptResponse {
        private String attemptId;
        private Long examId;
        private String examTitle;
        private Integer durationSeconds;
        private LocalDateTime startedAt;
        private LocalDateTime deadlineAt;
        private List<ExamDto.StudentSafeQuestion> questions;
        private Map<String, Object> savedAnswers;

        // Getters and Setters
        public String getAttemptId() { return attemptId; }
        public void setAttemptId(String attemptId) { this.attemptId = attemptId; }
        public Long getExamId() { return examId; }
        public void setExamId(Long examId) { this.examId = examId; }
        public String getExamTitle() { return examTitle; }
        public void setExamTitle(String examTitle) { this.examTitle = examTitle; }
        public Integer getDurationSeconds() { return durationSeconds; }
        public void setDurationSeconds(Integer durationSeconds) { this.durationSeconds = durationSeconds; }
        public LocalDateTime getStartedAt() { return startedAt; }
        public void setStartedAt(LocalDateTime startedAt) { this.startedAt = startedAt; }
        public LocalDateTime getDeadlineAt() { return deadlineAt; }
        public void setDeadlineAt(LocalDateTime deadlineAt) { this.deadlineAt = deadlineAt; }
        public List<ExamDto.StudentSafeQuestion> getQuestions() { return questions; }
        public void setQuestions(List<ExamDto.StudentSafeQuestion> questions) { this.questions = questions; }
        public Map<String, Object> getSavedAnswers() { return savedAnswers; }
        public void setSavedAnswers(Map<String, Object> savedAnswers) { this.savedAnswers = savedAnswers; }
    }

    public static class SaveAnswerRequest {
        private String selectedOptionId;
        private String answerText;
        private Boolean isMarkedForReview = false;

        public String getSelectedOptionId() { return selectedOptionId; }
        public void setSelectedOptionId(String selectedOptionId) { this.selectedOptionId = selectedOptionId; }
        public String getAnswerText() { return answerText; }
        public void setAnswerText(String answerText) { this.answerText = answerText; }
        public Boolean getIsMarkedForReview() { return isMarkedForReview; }
        public void setIsMarkedForReview(Boolean isMarkedForReview) { this.isMarkedForReview = isMarkedForReview; }
    }

    public static class SubmitRequest {
        private Map<String, Object> answers;
        private Boolean isAutoSubmitted = false;
        private Integer violationsCount = 0;

        public Map<String, Object> getAnswers() { return answers; }
        public void setAnswers(Map<String, Object> answers) { this.answers = answers; }
        public Boolean getIsAutoSubmitted() { return isAutoSubmitted; }
        public void setIsAutoSubmitted(Boolean isAutoSubmitted) { this.isAutoSubmitted = isAutoSubmitted; }
        public Integer getViolationsCount() { return violationsCount; }
        public void setViolationsCount(Integer violationsCount) { this.violationsCount = violationsCount; }
    }
}

