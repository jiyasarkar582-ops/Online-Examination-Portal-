package com.examportal.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "question_options")
public class QuestionOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    private Question question;

    @Column(name = "option_key", nullable = false)
    private String optionKey; // e.g. "opt_1_a"

    @Column(columnDefinition = "TEXT", nullable = false)
    private String optionText;

    @Column(name = "is_correct", nullable = false)
    private Boolean isCorrect = false;

    public QuestionOption() {}

    public QuestionOption(String optionKey, String optionText, Boolean isCorrect) {
        this.optionKey = optionKey;
        this.optionText = optionText;
        this.isCorrect = isCorrect;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Question getQuestion() { return question; }
    public void setQuestion(Question question) { this.question = question; }

    public String getOptionKey() { return optionKey; }
    public void setOptionKey(String optionKey) { this.optionKey = optionKey; }

    public String getOptionText() { return optionText; }
    public void setOptionText(String optionText) { this.optionText = optionText; }

    public Boolean getIsCorrect() { return isCorrect; }
    public void setIsCorrect(Boolean correct) { isCorrect = correct; }
}

