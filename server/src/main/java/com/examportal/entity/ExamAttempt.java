package com.examportal.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "exam_attempts")
public class ExamAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "attempt_code", unique = true, nullable = false)
    private String attemptCode; // e.g. "ATT-7721"

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "examination_id", nullable = false)
    private Examination examination;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @Column(name = "started_at", nullable = false)
    private LocalDateTime startedAt = LocalDateTime.now();

    @Column(name = "deadline_at", nullable = false)
    private LocalDateTime deadlineAt; // Authoritative server deadline

    @Column(name = "submitted_at")
    private LocalDateTime submittedAt;

    @Column(nullable = false)
    private String status = "IN_PROGRESS"; // IN_PROGRESS, SUBMITTED, AUTO_SUBMITTED, UNDER_REVIEW, CANCELLED

    @Column(name = "client_ip")
    private String clientIp;

    @Column(name = "user_agent")
    private String userAgent;

    @OneToMany(mappedBy = "attempt", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudentAnswer> answers = new ArrayList<>();

    @OneToOne(mappedBy = "attempt", cascade = CascadeType.ALL)
    private Result result;

    @Column(name = "violations_count")
    private Integer violationsCount = 0;

    public ExamAttempt() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAttemptCode() { return attemptCode; }
    public void setAttemptCode(String attemptCode) { this.attemptCode = attemptCode; }

    public Examination getExamination() { return examination; }
    public void setExamination(Examination examination) { this.examination = examination; }

    public User getStudent() { return student; }
    public void setStudent(User student) { this.student = student; }

    public LocalDateTime getStartedAt() { return startedAt; }
    public void setStartedAt(LocalDateTime startedAt) { this.startedAt = startedAt; }

    public LocalDateTime getDeadlineAt() { return deadlineAt; }
    public void setDeadlineAt(LocalDateTime deadlineAt) { this.deadlineAt = deadlineAt; }

    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getClientIp() { return clientIp; }
    public void setClientIp(String clientIp) { this.clientIp = clientIp; }

    public String getUserAgent() { return userAgent; }
    public void setUserAgent(String userAgent) { this.userAgent = userAgent; }

    public List<StudentAnswer> getAnswers() { return answers; }
    public void setAnswers(List<StudentAnswer> answers) { this.answers = answers; }

    public Result getResult() { return result; }
    public void setResult(Result result) { this.result = result; }

    public Integer getViolationsCount() { return violationsCount; }
    public void setViolationsCount(Integer violationsCount) { this.violationsCount = violationsCount; }
}

