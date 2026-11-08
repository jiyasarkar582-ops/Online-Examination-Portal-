package com.examportal.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "departments")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String code;

    @Column(nullable = false)
    private String name;

    private String headOfDepartment;

    private LocalDateTime createdAt = LocalDateTime.now();

    public Department() {}

    public Department(String code, String name, String headOfDepartment) {
        this.code = code;
        this.name = name;
        this.headOfDepartment = headOfDepartment;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getHeadOfDepartment() { return headOfDepartment; }
    public void setHeadOfDepartment(String headOfDepartment) { this.headOfDepartment = headOfDepartment; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

