package com.examportal.repository;

import com.examportal.entity.ExamAttempt;
import com.examportal.entity.ProctoringEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProctoringEventRepository extends JpaRepository<ProctoringEvent, Long> {
    List<ProctoringEvent> findByAttemptOrderByEventTimeAsc(ExamAttempt attempt);
    long countByAttempt(ExamAttempt attempt);
}

