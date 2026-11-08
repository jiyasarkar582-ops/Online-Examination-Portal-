package com.examportal.repository;

import com.examportal.entity.ExamAttempt;
import com.examportal.entity.IncidentReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IncidentReportRepository extends JpaRepository<IncidentReport, Long> {
    Optional<IncidentReport> findByIncidentCode(String incidentCode);
    Optional<IncidentReport> findByAttempt(ExamAttempt attempt);
    List<IncidentReport> findAllByOrderByCreatedAtDesc();
}

