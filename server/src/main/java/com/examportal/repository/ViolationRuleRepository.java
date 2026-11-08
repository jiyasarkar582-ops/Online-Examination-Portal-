package com.examportal.repository;

import com.examportal.entity.ViolationRule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ViolationRuleRepository extends JpaRepository<ViolationRule, Long> {
    Optional<ViolationRule> findByEventType(String eventType);
}

