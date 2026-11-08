package com.examportal.repository;

import com.examportal.entity.ExamAttempt;
import com.examportal.entity.Result;
import com.examportal.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {
    Optional<Result> findByAttempt(ExamAttempt attempt);

    @Query("SELECT r FROM Result r WHERE r.attempt.student = :student AND r.isPublished = true")
    List<Result> findPublishedByStudent(@Param("student") User student);
}

