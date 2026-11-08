package com.examportal.controller;

import com.examportal.dto.ExamDto;
import com.examportal.dto.ProctoringDto;
import com.examportal.entity.IncidentReport;
import com.examportal.security.CustomUserDetails;
import com.examportal.service.ExamService;
import com.examportal.service.ProctoringService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/examiner")
@PreAuthorize("hasAnyAuthority('ROLE_TEACHER', 'ROLE_ADMIN')")
public class ExaminerController {

    private final ExamService examService;
    private final ProctoringService proctoringService;

    public ExaminerController(ExamService examService, ProctoringService proctoringService) {
        this.examService = examService;
        this.proctoringService = proctoringService;
    }

    @GetMapping("/exams")
    public ResponseEntity<List<ExamDto.ExamSummary>> getExaminerExams(@AuthenticationPrincipal CustomUserDetails userDetails) {
        String email = userDetails != null ? userDetails.getUsername() : "teacher@examportal.edu";
        return ResponseEntity.ok(examService.getExaminerExams(email));
    }

    @GetMapping("/incidents")
    public ResponseEntity<List<IncidentReport>> getIncidents() {
        return ResponseEntity.ok(proctoringService.getAllIncidents());
    }

    @PostMapping("/incidents/{incidentCode}/review")
    public ResponseEntity<Map<String, Object>> recordDecision(
            @PathVariable String incidentCode,
            @RequestBody ProctoringDto.DecisionRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        String email = userDetails != null ? userDetails.getUsername() : "teacher@examportal.edu";
        proctoringService.recordDecision(incidentCode, request, email);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "incidentCode", incidentCode,
                "reviewStatus", request.getReviewStatus(),
                "reviewerDecision", request.getReviewerDecision()
        ));
    }
}

