package com.examportal.controller;

import com.examportal.dto.ProctoringDto;
import com.examportal.service.ProctoringService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/proctoring")
public class ProctoringController {

    private final ProctoringService proctoringService;

    public ProctoringController(ProctoringService proctoringService) {
        this.proctoringService = proctoringService;
    }

    @PostMapping("/events")
    public ResponseEntity<ProctoringDto.EventLogResponse> logEvent(@RequestBody ProctoringDto.EventLogRequest request) {
        return ResponseEntity.ok(proctoringService.logEvent(request));
    }
}

