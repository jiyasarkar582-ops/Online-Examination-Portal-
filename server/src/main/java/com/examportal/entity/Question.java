package com.examportal.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "examination_id")
    private Examination examination;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String questionText;

    @Column(name = "question_type", nullable = false)
    private String questionType; // MCQ, TRUE_FALSE, DESCRIPTIVE

    @Column(nullable = false)
    private Double marks = 4.0;

    @Column(name = "negative_marks")
    private Double negativeMarks = 0.0;

    @Column(columnDefinition = "TEXT")
    private String explanation;

    @Column(name = "correct_option_id")
    private String correctOptionId; // Sensitive; stripped for student responses

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<QuestionOption> options = new ArrayList<>();

    @Column(name = "order_index")
    private Integer orderIndex = 0;

    public Question() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Examination getExamination() { return examination; }
    public void setExamination(Examination examination) { this.examination = examination; }

    public String getQuestionText() { return questionText; }
    public void setQuestionText(String questionText) { this.questionText = questionText; }

    public String getQuestionType() { return questionType; }
    public void setQuestionType(String questionType) { this.questionType = questionType; }

    public Double getMarks() { return marks; }
    public void setMarks(Double marks) { this.marks = marks; }

    public Double getNegativeMarks() { return negativeMarks; }
    public void setNegativeMarks(Double negativeMarks) { this.negativeMarks = negativeMarks; }

    public String getExplanation() { return explanation; }
    public void setExplanation(String explanation) { this.explanation = explanation; }

    public String getCorrectOptionId() { return correctOptionId; }
    public void setCorrectOptionId(String correctOptionId) { this.correctOptionId = correctOptionId; }

    public List<QuestionOption> getOptions() { return options; }
    public void setOptions(List<QuestionOption> options) { this.options = options; }

    public Integer getOrderIndex() { return orderIndex; }
    public void setOrderIndex(Integer orderIndex) { this.orderIndex = orderIndex; }
}

