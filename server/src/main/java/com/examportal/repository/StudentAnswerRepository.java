package com.examportal.repository;

import com.examportal.entity.ExamAttempt;
import com.examportal.entity.Question;
import com.examportal.entity.StudentAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentAnswerRepository extends JpaRepository<StudentAnswer, Long> {
    Optional<StudentAnswer> findByAttemptAndQuestion(ExamAttempt attempt, Question question);
    List<StudentAnswer> findByAttempt(ExamAttempt attempt);
}

