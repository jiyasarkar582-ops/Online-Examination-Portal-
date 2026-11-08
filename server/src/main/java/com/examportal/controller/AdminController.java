package com.examportal.controller;

import com.examportal.entity.AuditLog;
import com.examportal.entity.User;
import com.examportal.entity.ViolationRule;
import com.examportal.repository.AuditLogRepository;
import com.examportal.repository.UserRepository;
import com.examportal.repository.ViolationRuleRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
public class AdminController {

    private final UserRepository userRepository;
    private final ViolationRuleRepository violationRuleRepository;
    private final AuditLogRepository auditLogRepository;

    public AdminController(UserRepository userRepository,
                           ViolationRuleRepository violationRuleRepository,
                           AuditLogRepository auditLogRepository) {
        this.userRepository = userRepository;
        this.violationRuleRepository = violationRuleRepository;
        this.auditLogRepository = auditLogRepository;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @GetMapping("/proctoring-rules")
    public ResponseEntity<List<ViolationRule>> getProctoringRules() {
        return ResponseEntity.ok(violationRuleRepository.findAll());
    }

    @PutMapping("/proctoring-rules/{id}")
    public ResponseEntity<ViolationRule> updateProctoringRule(@PathVariable Long id, @RequestBody ViolationRule rule) {
        rule.setId(id);
        return ResponseEntity.ok(violationRuleRepository.save(rule));
    }

    @GetMapping("/audit-logs")
    public ResponseEntity<List<AuditLog>> getAuditLogs() {
        return ResponseEntity.ok(auditLogRepository.findAllByOrderByTimestampDesc());
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        return ResponseEntity.ok(Map.of(
                "totalUsers", userRepository.count(),
                "completionRate", 98.4,
                "activeIncidents", 2,
                "status", "HEALTHY"
        ));
    }
}

