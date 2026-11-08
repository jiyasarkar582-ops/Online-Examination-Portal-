package com.examportal.controller;

import com.examportal.dto.AuthDto;
import com.examportal.security.CustomUserDetails;
import com.examportal.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthDto.AuthResponse> register(@Valid @RequestBody AuthDto.RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthDto.AuthResponse> login(@Valid @RequestBody AuthDto.LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@AuthenticationPrincipal CustomUserDetails userDetails) {
        if (userDetails == null) {
            return ResponseEntity.status(401).body(Map.of("error", "Unauthorized"));
        }
        return ResponseEntity.ok(Map.of(
                "id", userDetails.getId(),
                "name", userDetails.getUser().getName(),
                "email", userDetails.getUsername(),
                "role", userDetails.getUser().getRole().name(),
                "rollNumber", userDetails.getUser().getRollNumber() != null ? userDetails.getUser().getRollNumber() : "",
                "department", userDetails.getUser().getDepartment() != null ? userDetails.getUser().getDepartment() : ""
        ));
    }
}

