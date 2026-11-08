package com.examportal.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "examinations")
public class Examination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(name = "subject_code", nullable = false)
    private String subjectCode;

    @Column(nullable = false)
    private String subject;

    private String department;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User examiner;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "duration_minutes", nullable = false)
    private Integer durationMinutes = 60;

    @Column(name = "total_marks", nullable = false)
    private Double totalMarks = 50.0;

    @Column(name = "passing_marks", nullable = false)
    private Double passingMarks = 20.0;

    @Column(name = "negative_marking")
    private Boolean negativeMarking = false;

    @Column(name = "negative_rate")
    private Double negativeRate = 0.0;

    @Column(name = "attempt_limit")
    private Integer attemptLimit = 1;

    @Column(name = "window_start")
    private LocalDateTime windowStart;

    @Column(name = "window_end")
    private LocalDateTime windowEnd;

    @Column(nullable = false)
    private String status = "DRAFT"; // DRAFT, PUBLISHED, ACTIVE, COMPLETED, ARCHIVED

    @Column(name = "proctoring_enabled")
    private Boolean proctoringEnabled = true;

    @Column(name = "max_tab_switches")
    private Integer maxTabSwitches = 3;

    @Column(name = "fullscreen_required")
    private Boolean fullscreenRequired = true;

    @Column(name = "block_clipboard")
    private Boolean blockClipboard = true;

    @OneToMany(mappedBy = "examination", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Question> questions = new ArrayList<>();

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    public Examination() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSubjectCode() { return subjectCode; }
    public void setSubjectCode(String subjectCode) { this.subjectCode = subjectCode; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public User getExaminer() { return examiner; }
    public void setExaminer(User examiner) { this.examiner = examiner; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }

    public Double getTotalMarks() { return totalMarks; }
    public void setTotalMarks(Double totalMarks) { this.totalMarks = totalMarks; }

    public Double getPassingMarks() { return passingMarks; }
    public void setPassingMarks(Double passingMarks) { this.passingMarks = passingMarks; }

    public Boolean getNegativeMarking() { return negativeMarking; }
    public void setNegativeMarking(Boolean negativeMarking) { this.negativeMarking = negativeMarking; }

    public Double getNegativeRate() { return negativeRate; }
    public void setNegativeRate(Double negativeRate) { this.negativeRate = negativeRate; }

    public Integer getAttemptLimit() { return attemptLimit; }
    public void setAttemptLimit(Integer attemptLimit) { this.attemptLimit = attemptLimit; }

    public LocalDateTime getWindowStart() { return windowStart; }
    public void setWindowStart(LocalDateTime windowStart) { this.windowStart = windowStart; }

    public LocalDateTime getWindowEnd() { return windowEnd; }
    public void setWindowEnd(LocalDateTime windowEnd) { this.windowEnd = windowEnd; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Boolean getProctoringEnabled() { return proctoringEnabled; }
    public void setProctoringEnabled(Boolean proctoringEnabled) { this.proctoringEnabled = proctoringEnabled; }

    public Integer getMaxTabSwitches() { return maxTabSwitches; }
    public void setMaxTabSwitches(Integer maxTabSwitches) { this.maxTabSwitches = maxTabSwitches; }

    public Boolean getFullscreenRequired() { return fullscreenRequired; }
    public void setFullscreenRequired(Boolean fullscreenRequired) { this.fullscreenRequired = fullscreenRequired; }

    public Boolean getBlockClipboard() { return blockClipboard; }
    public void setBlockClipboard(Boolean blockClipboard) { this.blockClipboard = blockClipboard; }

    public List<Question> getQuestions() { return questions; }
    public void setQuestions(List<Question> questions) { this.questions = questions; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

