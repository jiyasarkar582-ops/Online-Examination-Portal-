package com.examportal.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "violation_rules")
public class ViolationRule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "event_type", nullable = false, unique = true)
    private String eventType; // TAB_SWITCH, FULLSCREEN_EXIT, CLIPBOARD_ACTION, CONCURRENT_SESSION, ACCUMULATIVE_VIOLATIONS

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false)
    private Integer threshold = 3;

    @Column(nullable = false)
    private String action = "WARN"; // LOG_ONLY, WARN, FLAG_FOR_REVIEW, PAUSE, AUTO_SUBMIT, CANCEL

    @Column(nullable = false)
    private Boolean enabled = true;

    public ViolationRule() {}

    public ViolationRule(String eventType, String name, String description, Integer threshold, String action, Boolean enabled) {
        this.eventType = eventType;
        this.name = name;
        this.description = description;
        this.threshold = threshold;
        this.action = action;
        this.enabled = enabled;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEventType() { return eventType; }
    public void setEventType(String eventType) { this.eventType = eventType; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public Integer getThreshold() { return threshold; }
    public void setThreshold(Integer threshold) { this.threshold = threshold; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public Boolean getEnabled() { return enabled; }
    public void setEnabled(Boolean enabled) { this.enabled = enabled; }
}

