package com.examportal.service;

import com.examportal.dto.ProctoringDto;
import com.examportal.entity.*;
import com.examportal.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ProctoringService {

    private final ProctoringEventRepository eventRepository;
    private final IncidentReportRepository incidentRepository;
    private final ViolationRuleRepository ruleRepository;
    private final ExamAttemptRepository attemptRepository;
    private final AuditLogRepository auditLogRepository;

    public ProctoringService(ProctoringEventRepository eventRepository,
                             IncidentReportRepository incidentRepository,
                             ViolationRuleRepository ruleRepository,
                             ExamAttemptRepository attemptRepository,
                             AuditLogRepository auditLogRepository) {
        this.eventRepository = eventRepository;
        this.incidentRepository = incidentRepository;
        this.ruleRepository = ruleRepository;
        this.attemptRepository = attemptRepository;
        this.auditLogRepository = auditLogRepository;
    }

    @Transactional
    public ProctoringDto.EventLogResponse logEvent(ProctoringDto.EventLogRequest req) {
        ExamAttempt attempt = attemptRepository.findByAttemptCode(req.getAttemptId())
                .orElse(null);

        if (attempt == null) {
            return new ProctoringDto.EventLogResponse(true, "EVT-" + System.currentTimeMillis(), "LOG_ONLY", "Logged");
        }

        ProctoringEvent event = new ProctoringEvent();
        event.setAttempt(attempt);
        event.setEventType(req.getEventType());
        event.setSeverity(req.getSeverity() != null ? req.getSeverity() : "LOW");
        event.setDescription(req.getDescription());
        event.setEventTime(LocalDateTime.now());
        eventRepository.save(event);

        long eventCount = eventRepository.countByAttempt(attempt);

        // Fetch configured rule for this event type
        Optional<ViolationRule> ruleOpt = ruleRepository.findByEventType(req.getEventType());
        String actionToTake = "LOG_ONLY";

        if (ruleOpt.isPresent() && Boolean.TRUE.equals(ruleOpt.get().getEnabled())) {
            ViolationRule rule = ruleOpt.get();
            if (eventCount >= rule.getThreshold()) {
                actionToTake = rule.getAction();
            } else if (eventCount >= 2) {
                actionToTake = "WARN";
            }
        }

        // If action is FLAG_FOR_REVIEW, create or update IncidentReport
        if ("FLAG_FOR_REVIEW".equalsIgnoreCase(actionToTake) || "AUTO_SUBMIT".equalsIgnoreCase(actionToTake)) {
            IncidentReport incident = incidentRepository.findByAttempt(attempt)
                    .orElse(new IncidentReport());
            if (incident.getIncidentCode() == null) {
                incident.setIncidentCode("INC-" + (System.currentTimeMillis() % 100000));
            }
            incident.setAttempt(attempt);
            incident.setSummary("Recorded " + eventCount + " proctoring telemetry signals including " + req.getEventType());
            incident.setSystemFinding("Observable browser events exceeded configured threshold. Human examiner review required.");
            incident.setActionTaken(actionToTake);
            incident.setReviewStatus("NEW");
            incidentRepository.save(incident);
        }

        return new ProctoringDto.EventLogResponse(
                true,
                "EVT-" + event.getId(),
                actionToTake,
                "Proctoring telemetry recorded. Status: " + actionToTake
        );
    }

    public List<IncidentReport> getAllIncidents() {
        return incidentRepository.findAllByOrderByCreatedAtDesc();
    }

    @Transactional
    public void recordDecision(String incidentCode, ProctoringDto.DecisionRequest req, String reviewerEmail) {
        IncidentReport incident = incidentRepository.findByIncidentCode(incidentCode)
                .orElseThrow(() -> new RuntimeException("Incident not found: " + incidentCode));

        incident.setReviewStatus(req.getReviewStatus());
        incident.setReviewerDecision(req.getReviewerDecision());
        incident.setReviewerNotes(req.getReviewerNotes());
        incident.setPenaltyMarks(req.getPenaltyMarks());
        incident.setReviewedAt(LocalDateTime.now());

        incidentRepository.save(incident);

        // Append to audit ledger
        AuditLog log = new AuditLog(
                "AUD-" + System.currentTimeMillis() % 10000,
                reviewerEmail,
                "INCIDENT_DECISION_RECORDED",
                incidentCode,
                "127.0.0.1",
                "Decision: " + req.getReviewerDecision() + " | Status: " + req.getReviewStatus()
        );
        auditLogRepository.save(log);
    }
}

