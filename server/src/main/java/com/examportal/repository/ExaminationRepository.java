package com.examportal.repository;

import com.examportal.entity.Examination;
import com.examportal.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExaminationRepository extends JpaRepository<Examination, Long> {
    List<Examination> findByStatus(String status);
    List<Examination> findByExaminer(User examiner);
    List<Examination> findByDepartment(String department);
}

