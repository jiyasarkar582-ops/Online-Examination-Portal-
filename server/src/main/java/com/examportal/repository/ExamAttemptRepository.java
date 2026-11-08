package com.examportal.repository;

import com.examportal.entity.ExamAttempt;
import com.examportal.entity.Examination;
import com.examportal.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExamAttemptRepository extends JpaRepository<ExamAttempt, Long> {
    Optional<ExamAttempt> findByAttemptCode(String attemptCode);
    List<ExamAttempt> findByStudent(User student);
    List<ExamAttempt> findByExamination(Examination examination);
    Optional<ExamAttempt> findByStudentAndExamination(User student, Examination examination);
}

