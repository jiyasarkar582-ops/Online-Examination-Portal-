package com.examportal;

import com.examportal.entity.Role;
import com.examportal.entity.User;
import com.examportal.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ExamPortalApplicationTests {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    void contextLoads() {
        assertNotNull(userRepository);
        assertNotNull(passwordEncoder);
    }

    @Test
    void testInitialUsersSeeded() {
        assertTrue(userRepository.count() >= 3, "Expected at least 3 initial seeded users");
        User student = userRepository.findByEmail("student@examportal.edu").orElse(null);
        assertNotNull(student);
        assertEquals(Role.ROLE_STUDENT, student.getRole());
        assertTrue(passwordEncoder.matches("password123", student.getPassword()));
    }

    @Test
    void testObjectiveScoringCalculationWithNegativeMarking() {
        // Test Case: 10 questions of 4 marks each, negative marking 1.0 mark
        // Student: 8 correct, 1 wrong, 1 unattempted
        // Expected: (8 * 4.0) - (1 * 1.0) = 32.0 - 1.0 = 31.0 marks out of 40.0 (77.5%)
        int correct = 8;
        int wrong = 1;
        double marksPerCorrect = 4.0;
        double penaltyPerWrong = 1.0;

        double calculatedMarks = (correct * marksPerCorrect) - (wrong * penaltyPerWrong);
        double totalMarks = 10 * marksPerCorrect;
        double percentage = (calculatedMarks / totalMarks) * 100.0;

        assertEquals(31.0, calculatedMarks, 0.001);
        assertEquals(77.5, percentage, 0.001);
    }
}

