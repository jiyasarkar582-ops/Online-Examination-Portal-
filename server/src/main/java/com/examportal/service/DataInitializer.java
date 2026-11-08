package com.examportal.service;

import com.examportal.entity.*;
import com.examportal.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final ExaminationRepository examinationRepository;
    private final QuestionRepository questionRepository;
    private final ViolationRuleRepository violationRuleRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository,
                           DepartmentRepository departmentRepository,
                           ExaminationRepository examinationRepository,
                           QuestionRepository questionRepository,
                           ViolationRuleRepository violationRuleRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.departmentRepository = departmentRepository;
        this.examinationRepository = examinationRepository;
        this.questionRepository = questionRepository;
        this.violationRuleRepository = violationRuleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0) {
            return; // Seed already initialized
        }

        // 1. Departments
        Department cse = new Department("CSE", "Computer Science & Engineering", "Dr. S. K. Roy");
        Department ece = new Department("ECE", "Electronics & Communication Engineering", "Dr. P. Sen");
        departmentRepository.saveAll(Arrays.asList(cse, ece));

        // 2. Users
        User student = new User("Rahul Sharma", "student@examportal.edu", passwordEncoder.encode("password123"), Role.ROLE_STUDENT, "Computer Science & Engineering");
        student.setRollNumber("2026CSE104");

        User teacher = new User("Prof. Vikram Sen", "teacher@examportal.edu", passwordEncoder.encode("password123"), Role.ROLE_TEACHER, "Computer Science & Engineering");
        teacher.setEmployeeCode("FAC-CSE-042");

        User admin = new User("Dr. Ananya Mukherjee", "admin@examportal.edu", passwordEncoder.encode("password123"), Role.ROLE_ADMIN, "Examination Cell");
        admin.setEmployeeCode("ADM-EXM-001");

        userRepository.saveAll(Arrays.asList(student, teacher, admin));

        // 3. Proctoring Violation Rules
        violationRuleRepository.saveAll(Arrays.asList(
                new ViolationRule("TAB_SWITCH", "Browser Tab / Focus Lost", "Triggered when the student switches tabs or minimizes the window.", 3, "FLAG_FOR_REVIEW", true),
                new ViolationRule("FULLSCREEN_EXIT", "Exiting Full-Screen Mode", "Triggered when the browser leaves operating system full-screen lockdown.", 2, "WARN", true),
                new ViolationRule("CLIPBOARD_ACTION", "Copy / Paste Inside Exam Window", "Triggered on attempts to paste external text into answer fields.", 1, "WARN", true),
                new ViolationRule("CONCURRENT_SESSION", "Multiple Active Browser Sessions", "Triggered when identical tokens ping from distinct IP/devices.", 1, "PAUSE", true),
                new ViolationRule("ACCUMULATIVE_VIOLATIONS", "Total Cumulative Violations Limit", "Triggered when student exceeds cumulative policy infractions.", 5, "AUTO_SUBMIT", true)
        ));

        // 4. Initial Examination
        Examination exam = new Examination();
        exam.setTitle("Data Structures & Algorithms Midterm");
        exam.setSubjectCode("CS-301");
        exam.setSubject("Computer Science");
        exam.setDepartment("Computer Science & Engineering");
        exam.setExaminer(teacher);
        exam.setDescription("Evaluates comprehensive understanding of Linear/Non-Linear Data Structures, Tree traversals, Graph algorithms, and Asymptotic Complexity.");
        exam.setDurationMinutes(45);
        exam.setTotalMarks(50.0);
        exam.setPassingMarks(20.0);
        exam.setNegativeMarking(true);
        exam.setNegativeRate(0.25);
        exam.setStatus("ACTIVE");
        exam.setWindowStart(LocalDateTime.now().minusHours(1));
        exam.setWindowEnd(LocalDateTime.now().plusHours(24));
        exam.setProctoringEnabled(true);
        exam.setMaxTabSwitches(3);

        examinationRepository.save(exam);

        // 5. Questions with choices
        Question q1 = new Question();
        q1.setExamination(exam);
        q1.setQuestionText("What is the worst-case time complexity of searching for an element in an unaugmented Binary Search Tree (BST) with N nodes?");
        q1.setQuestionType("MCQ");
        q1.setMarks(4.0);
        q1.setNegativeMarks(1.0);
        q1.setExplanation("In a skewed BST, the tree degenerates into a singly linked list with O(N) lookup time.");
        q1.setCorrectOptionId("opt_1_c");
        q1.setOrderIndex(1);

        q1.getOptions().add(new QuestionOption("opt_1_a", "O(1)", false));
        q1.getOptions().add(new QuestionOption("opt_1_b", "O(log N)", false));
        q1.getOptions().add(new QuestionOption("opt_1_c", "O(N)", true));
        q1.getOptions().add(new QuestionOption("opt_1_d", "O(N log N)", false));
        for (QuestionOption o : q1.getOptions()) o.setQuestion(q1);

        Question q2 = new Question();
        q2.setExamination(exam);
        q2.setQuestionText("Which of the following data structures provides guaranteed O(1) amortized insertion, lookup, and deletion when equipped with an optimal hash function?");
        q2.setQuestionType("MCQ");
        q2.setMarks(4.0);
        q2.setNegativeMarks(1.0);
        q2.setExplanation("A Hash Table operates with expected O(1) average time complexity.");
        q2.setCorrectOptionId("opt_2_b");
        q2.setOrderIndex(2);

        q2.getOptions().add(new QuestionOption("opt_2_a", "Red-Black Tree", false));
        q2.getOptions().add(new QuestionOption("opt_2_b", "Hash Table", true));
        q2.getOptions().add(new QuestionOption("opt_2_c", "Min-Heap", false));
        q2.getOptions().add(new QuestionOption("opt_2_d", "B-Tree", false));
        for (QuestionOption o : q2.getOptions()) o.setQuestion(q2);

        Question q3 = new Question();
        q3.setExamination(exam);
        q3.setQuestionText("Dijkstra's shortest path algorithm operates correctly and terminates with exact distances on graphs containing negative edge weights as long as there are no negative cycles.");
        q3.setQuestionType("TRUE_FALSE");
        q3.setMarks(3.0);
        q3.setNegativeMarks(0.75);
        q3.setExplanation("Dijkstra's algorithm assumes edge weights are non-negative. Bellman-Ford must be used instead.");
        q3.setCorrectOptionId("opt_3_false");
        q3.setOrderIndex(3);

        q3.getOptions().add(new QuestionOption("opt_3_true", "True", false));
        q3.getOptions().add(new QuestionOption("opt_3_false", "False", true));
        for (QuestionOption o : q3.getOptions()) o.setQuestion(q3);

        Question q4 = new Question();
        q4.setExamination(exam);
        q4.setQuestionText("Explain the concept of an AVL Tree self-balancing rotation mechanism. Describe the 4 types of rotations (LL, RR, LR, RL) with clear conditions.");
        q4.setQuestionType("DESCRIPTIVE");
        q4.setMarks(14.0);
        q4.setNegativeMarks(0.0);
        q4.setExplanation("Key criteria: balance factor definition, step-by-step subtree rotation mechanics for LL, RR, LR, RL, and logarithmic height proof.");
        q4.setOrderIndex(4);

        questionRepository.saveAll(Arrays.asList(q1, q2, q3, q4));
    }
}

