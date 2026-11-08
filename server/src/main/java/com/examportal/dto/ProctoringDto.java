package com.examportal.dto;

import java.util.List;

public class ProctoringDto {

    public static class EventLogRequest {
        private String attemptId;
        private String eventType;
        private String description;
        private String severity;
        private String clientTimestamp;

        public String getAttemptId() { return attemptId; }
        public void setAttemptId(String attemptId) { this.attemptId = attemptId; }
        public String getEventType() { return eventType; }
        public void setEventType(String eventType) { this.eventType = eventType; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
        public String getSeverity() { return severity; }
        public void setSeverity(String severity) { this.severity = severity; }
        public String getClientTimestamp() { return clientTimestamp; }
        public void setClientTimestamp(String clientTimestamp) { this.clientTimestamp = clientTimestamp; }
    }

    public static class EventLogResponse {
        private Boolean success;
        private String eventId;
        private String action;
        private String message;

        public EventLogResponse(Boolean success, String eventId, String action, String message) {
            this.success = success;
            this.eventId = eventId;
            this.action = action;
            this.message = message;
        }

        public Boolean getSuccess() { return success; }
        public String getEventId() { return eventId; }
        public String getAction() { return action; }
        public String getMessage() { return message; }
    }

    public static class DecisionRequest {
        private String reviewStatus; // NEW, UNDER_REVIEW, CLEARED, CONFIRMED, APPEALED
        private String reviewerDecision; // EXONERATED, WARNING_UPHELD, SCORE_PENALIZED, EXAM_CANCELLED
        private String reviewerNotes;
        private Double penaltyMarks = 0.0;

        public String getReviewStatus() { return reviewStatus; }
        public void setReviewStatus(String reviewStatus) { this.reviewStatus = reviewStatus; }
        public String getReviewerDecision() { return reviewerDecision; }
        public void setReviewerDecision(String reviewerDecision) { this.reviewerDecision = reviewerDecision; }
        public String getReviewerNotes() { return reviewerNotes; }
        public void setReviewerNotes(String reviewerNotes) { this.reviewerNotes = reviewerNotes; }
        public Double getPenaltyMarks() { return penaltyMarks; }
        public void setPenaltyMarks(Double penaltyMarks) { this.penaltyMarks = penaltyMarks; }
    }
}

