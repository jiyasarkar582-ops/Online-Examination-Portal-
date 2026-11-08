package com.examportal.dto;

import com.examportal.entity.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class AuthDto {

    public static class LoginRequest {
        @NotBlank @Email
        private String email;
        @NotBlank
        private String password;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class RegisterRequest {
        @NotBlank
        private String name;
        @NotBlank @Email
        private String email;
        @NotBlank
        private String password;
        private String rollNumber;
        private String department;
        private Role role = Role.ROLE_STUDENT;

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getRollNumber() { return rollNumber; }
        public void setRollNumber(String rollNumber) { this.rollNumber = rollNumber; }
        public String getDepartment() { return department; }
        public void setDepartment(String department) { this.department = department; }
        public Role getRole() { return role; }
        public void setRole(Role role) { this.role = role; }
    }

    public static class AuthResponse {
        private String token;
        private Long id;
        private String name;
        private String email;
        private String role;
        private String rollNumber;
        private String department;

        public AuthResponse(String token, Long id, String name, String email, String role, String rollNumber, String department) {
            this.token = token;
            this.id = id;
            this.name = name;
            this.email = email;
            this.role = role;
            this.rollNumber = rollNumber;
            this.department = department;
        }

        public String getToken() { return token; }
        public Long getId() { return id; }
        public String getName() { return name; }
        public String getEmail() { return email; }
        public String getRole() { return role; }
        public String getRollNumber() { return rollNumber; }
        public String getDepartment() { return department; }
    }
}

