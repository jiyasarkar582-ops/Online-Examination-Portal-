package com.examportal.dto;

import java.time.LocalDateTime;
import java.util.List;

public class ExamDto {

    public static class ExamSummary {
        private Long id;
        private String title;
        private String subjectCode;
        private String subject;
        private String department;
        private String examinerName;
        private Integer durationMinutes;
        private Double totalMarks;
        private Double passingMarks;
        private Boolean negativeMarking;
        private Double negativeRate;
        private Integer totalQuestions;
        private String status;
        private Boolean proctoringEnabled;
        private LocalDateTime windowStart;
        private LocalDateTime windowEnd;

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
        public String getExaminerName() { return examinerName; }
        public void setExaminerName(String examinerName) { this.examinerName = examinerName; }
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
        public Integer getTotalQuestions() { return totalQuestions; }
        public void setTotalQuestions(Integer totalQuestions) { this.totalQuestions = totalQuestions; }
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public Boolean getProctoringEnabled() { return proctoringEnabled; }
        public void setProctoringEnabled(Boolean proctoringEnabled) { this.proctoringEnabled = proctoringEnabled; }
        public LocalDateTime getWindowStart() { return windowStart; }
        public void setWindowStart(LocalDateTime windowStart) { this.windowStart = windowStart; }
        public LocalDateTime getWindowEnd() { return windowEnd; }
        public void setWindowEnd(LocalDateTime windowEnd) { this.windowEnd = windowEnd; }
    }

    public static class StudentSafeQuestion {
        private Long id;
        private String type;
        private Double marks;
        private Double negativeMarks;
        private String questionText;
        private List<OptionItem> options;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
        public Double getMarks() { return marks; }
        public void setMarks(Double marks) { this.marks = marks; }
        public Double getNegativeMarks() { return negativeMarks; }
        public void setNegativeMarks(Double negativeMarks) { this.negativeMarks = negativeMarks; }
        public String getQuestionText() { return questionText; }
        public void setQuestionText(String questionText) { this.questionText = questionText; }
        public List<OptionItem> getOptions() { return options; }
        public void setOptions(List<OptionItem> options) { this.options = options; }
    }

    public static class OptionItem {
        private String id;
        private String text;

        public OptionItem(String id, String text) {
            this.id = id;
            this.text = text;
        }

        public String getId() { return id; }
        public String getText() { return text; }
    }
}

