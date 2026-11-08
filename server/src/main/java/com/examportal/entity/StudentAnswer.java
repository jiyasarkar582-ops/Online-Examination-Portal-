package com.examportal.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "student_answers", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"attempt_id", "question_id"})
})
public class StudentAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "attempt_id", nullable = false)
    private ExamAttempt attempt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    private Question question;

    @Column(name = "selected_option_key")
    private String selectedOptionKey;

    @Column(columnDefinition = "TEXT", name = "answer_text")
    private String answerText;

    @Column(name = "awarded_marks")
    private Double awardedMarks;

    @Column(name = "is_marked_for_review")
    private Boolean isMarkedForReview = false;

    @Column(name = "evaluation_status")
    private String evaluationStatus = "PENDING"; // PENDING, EVALUATED

    @Column(columnDefinition = "TEXT", name = "evaluator_comment")
    private String evaluatorComment;

    @Column(name = "saved_at")
    private LocalDateTime savedAt = LocalDateTime.now();

    public StudentAnswer() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public ExamAttempt getAttempt() { return attempt; }
    public void setAttempt(ExamAttempt attempt) { this.attempt = attempt; }

    public Question getQuestion() { return question; }
    public void setQuestion(Question question) { this.question = question; }

    public String getSelectedOptionKey() { return selectedOptionKey; }
    public void setSelectedOptionKey(String selectedOptionKey) { this.selectedOptionKey = selectedOptionKey; }

    public String getAnswerText() { return answerText; }
    public void setAnswerText(String answerText) { this.answerText = answerText; }

    public Double getAwardedMarks() { return awardedMarks; }
    public void setAwardedMarks(Double awardedMarks) { this.awardedMarks = awardedMarks; }

    public Boolean getIsMarkedForReview() { return isMarkedForReview; }
    public void setIsMarkedForReview(Boolean isMarkedForReview) { this.isMarkedForReview = isMarkedForReview; }

    public String getEvaluationStatus() { return evaluationStatus; }
    public void setEvaluationStatus(String evaluationStatus) { this.evaluationStatus = evaluationStatus; }

    public String getEvaluatorComment() { return evaluatorComment; }
    public void setEvaluatorComment(String evaluatorComment) { this.evaluatorComment = evaluatorComment; }

    public LocalDateTime getSavedAt() { return savedAt; }
    public void setSavedAt(LocalDateTime savedAt) { this.savedAt = savedAt; }
}

