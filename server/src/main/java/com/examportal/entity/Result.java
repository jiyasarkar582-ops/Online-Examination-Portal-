package com.examportal.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "results")
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "attempt_id", unique = true, nullable = false)
    private ExamAttempt attempt;

    @Column(name = "total_marks", nullable = false)
    private Double totalMarks;

    @Column(name = "obtained_marks", nullable = false)
    private Double obtainedMarks;

    @Column(nullable = false)
    private Double percentage;

    @Column(nullable = false)
    private String grade; // A+, A, B, C, F

    @Column(name = "correct_answers")
    private Integer correctAnswers = 0;

    @Column(name = "wrong_answers")
    private Integer wrongAnswers = 0;

    @Column(name = "unattempted")
    private Integer unattempted = 0;

    @Column(name = "is_published", nullable = false)
    private Boolean isPublished = false;

    @Column(name = "published_at")
    private LocalDateTime publishedAt;

    public Result() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public ExamAttempt getAttempt() { return attempt; }
    public void setAttempt(ExamAttempt attempt) { this.attempt = attempt; }

    public Double getTotalMarks() { return totalMarks; }
    public void setTotalMarks(Double totalMarks) { this.totalMarks = totalMarks; }

    public Double getObtainedMarks() { return obtainedMarks; }
    public void setObtainedMarks(Double obtainedMarks) { this.obtainedMarks = obtainedMarks; }

    public Double getPercentage() { return percentage; }
    public void setPercentage(Double percentage) { this.percentage = percentage; }

    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }

    public Integer getCorrectAnswers() { return correctAnswers; }
    public void setCorrectAnswers(Integer correctAnswers) { this.correctAnswers = correctAnswers; }

    public Integer getWrongAnswers() { return wrongAnswers; }
    public void setWrongAnswers(Integer wrongAnswers) { this.wrongAnswers = wrongAnswers; }

    public Integer getUnattempted() { return unattempted; }
    public void setUnattempted(Integer unattempted) { this.unattempted = unattempted; }

    public Boolean getIsPublished() { return isPublished; }
    public void setIsPublished(Boolean isPublished) { this.isPublished = isPublished; }

    public LocalDateTime getPublishedAt() { return publishedAt; }
    public void setPublishedAt(LocalDateTime publishedAt) { this.publishedAt = publishedAt; }
}

