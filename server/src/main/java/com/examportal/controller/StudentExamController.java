package com.examportal.controller;

import com.examportal.dto.AttemptDto;
import com.examportal.dto.ExamDto;
import com.examportal.security.CustomUserDetails;
import com.examportal.service.ExamService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class StudentExamController {

    private final ExamService examService;

    public StudentExamController(ExamService examService) {
        this.examService = examService;
    }

    @GetMapping("/exams/student")
    public ResponseEntity<List<ExamDto.ExamSummary>> getStudentExams() {
        return ResponseEntity.ok(examService.getStudentAvailableExams());
    }

    @PostMapping("/exams/{examId}/start")
    public ResponseEntity<AttemptDto.StartAttemptResponse> startAttempt(
            @PathVariable Long examId,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        String email = userDetails != null ? userDetails.getUsername() : "student@examportal.edu";
        return ResponseEntity.ok(examService.startAttempt(examId, email));
    }

    @PutMapping("/attempts/{attemptId}/answers/{questionId}")
    public ResponseEntity<Map<String, Object>> saveAnswer(
            @PathVariable String attemptId,
            @PathVariable Long questionId,
            @RequestBody AttemptDto.SaveAnswerRequest request) {
        examService.saveAnswer(attemptId, questionId, request);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "attemptId", attemptId,
                "questionId", questionId,
                "savedAt", System.currentTimeMillis()
        ));
    }

    @PostMapping("/attempts/{attemptId}/submit")
    public ResponseEntity<Map<String, Object>> submitAttempt(
            @PathVariable String attemptId,
            @RequestBody AttemptDto.SubmitRequest request) {
        examService.submitAttempt(attemptId, request);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "attemptId", attemptId,
                "status", "SUBMITTED",
                "message", "Your examination has been submitted successfully."
        ));
    }
}

