package com.examportal.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "log_code", unique = true, nullable = false)
    private String logCode;

    @Column(nullable = false)
    private String actor;

    @Column(nullable = false)
    private String action;

    @Column(name = "target_entity")
    private String targetEntity;

    @Column(name = "ip_address")
    private String ipAddress;

    @Column(columnDefinition = "TEXT")
    private String details;

    @Column(nullable = false)
    private LocalDateTime timestamp = LocalDateTime.now();

    public AuditLog() {}

    public AuditLog(String logCode, String actor, String action, String targetEntity, String ipAddress, String details) {
        this.logCode = logCode;
        this.actor = actor;
        this.action = action;
        this.targetEntity = targetEntity;
        this.ipAddress = ipAddress;
        this.details = details;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getLogCode() { return logCode; }
    public void setLogCode(String logCode) { this.logCode = logCode; }

    public String getActor() { return actor; }
    public void setActor(String actor) { this.actor = actor; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public String getTargetEntity() { return targetEntity; }
    public void setTargetEntity(String targetEntity) { this.targetEntity = targetEntity; }

    public String getIpAddress() { return ipAddress; }
    public void setIpAddress(String ipAddress) { this.ipAddress = ipAddress; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}

