package com.examportal.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "incident_reports")
public class IncidentReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "incident_code", unique = true, nullable = false)
    private String incidentCode; // e.g. "INC-2026-081"

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "attempt_id", nullable = false)
    private ExamAttempt attempt;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String summary;

    @Column(columnDefinition = "TEXT", name = "system_finding")
    private String systemFinding;

    @Column(name = "action_taken", nullable = false)
    private String actionTaken; // LOG_ONLY, WARN, FLAG_FOR_REVIEW, PAUSE, AUTO_SUBMIT, CANCEL

    @Column(name = "review_status", nullable = false)
    private String reviewStatus = "NEW"; // NEW, UNDER_REVIEW, CLEARED, CONFIRMED, APPEALED

    @Column(name = "reviewer_decision")
    private String reviewerDecision; // EXONERATED, WARNING_UPHELD, SCORE_PENALIZED, EXAM_CANCELLED

    @Column(columnDefinition = "TEXT", name = "reviewer_notes")
    private String reviewerNotes;

    @Column(name = "penalty_marks")
    private Double penaltyMarks = 0.0;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "reviewed_at")
    private LocalDateTime reviewedAt;

    public IncidentReport() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getIncidentCode() { return incidentCode; }
    public void setIncidentCode(String incidentCode) { this.incidentCode = incidentCode; }

    public ExamAttempt getAttempt() { return attempt; }
    public void setAttempt(ExamAttempt attempt) { this.attempt = attempt; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }

    public String getSystemFinding() { return systemFinding; }
    public void setSystemFinding(String systemFinding) { this.systemFinding = systemFinding; }

    public String getActionTaken() { return actionTaken; }
    public void setActionTaken(String actionTaken) { this.actionTaken = actionTaken; }

    public String getReviewStatus() { return reviewStatus; }
    public void setReviewStatus(String reviewStatus) { this.reviewStatus = reviewStatus; }

    public String getReviewerDecision() { return reviewerDecision; }
    public void setReviewerDecision(String reviewerDecision) { this.reviewerDecision = reviewerDecision; }

    public String getReviewerNotes() { return reviewerNotes; }
    public void setReviewerNotes(String reviewerNotes) { this.reviewerNotes = reviewerNotes; }

    public Double getPenaltyMarks() { return penaltyMarks; }
    public void setPenaltyMarks(Double penaltyMarks) { this.penaltyMarks = penaltyMarks; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getReviewedAt() { return reviewedAt; }
    public void setReviewedAt(LocalDateTime reviewedAt) { this.reviewedAt = reviewedAt; }
}

