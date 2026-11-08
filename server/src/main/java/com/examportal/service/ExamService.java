package com.examportal.service;

import com.examportal.dto.AttemptDto;
import com.examportal.dto.ExamDto;
import com.examportal.entity.*;
import com.examportal.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ExamService {

    private final ExaminationRepository examinationRepository;
    private final QuestionRepository questionRepository;
    private final ExamAttemptRepository attemptRepository;
    private final StudentAnswerRepository studentAnswerRepository;
    private final ResultRepository resultRepository;
    private final UserRepository userRepository;

    public ExamService(ExaminationRepository examinationRepository,
                       QuestionRepository questionRepository,
                       ExamAttemptRepository attemptRepository,
                       StudentAnswerRepository studentAnswerRepository,
                       ResultRepository resultRepository,
                       UserRepository userRepository) {
        this.examinationRepository = examinationRepository;
        this.questionRepository = questionRepository;
        this.attemptRepository = attemptRepository;
        this.studentAnswerRepository = studentAnswerRepository;
        this.resultRepository = resultRepository;
        this.userRepository = userRepository;
    }

    public List<ExamDto.ExamSummary> getStudentAvailableExams() {
        return examinationRepository.findAll().stream()
                .map(this::mapToSummary)
                .collect(Collectors.toList());
    }

    public List<ExamDto.ExamSummary> getExaminerExams(String examinerEmail) {
        return examinationRepository.findAll().stream()
                .map(this::mapToSummary)
                .collect(Collectors.toList());
    }

    @Transactional
    public AttemptDto.StartAttemptResponse startAttempt(Long examId, String studentEmail) {
        Examination exam = examinationRepository.findById(examId)
                .orElseThrow(() -> new RuntimeException("Exam not found: " + examId));

        User student = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new RuntimeException("Student not found: " + studentEmail));

        // Enforce attempt limits / find existing in progress
        Optional<ExamAttempt> existingOpt = attemptRepository.findByStudentAndExamination(student, exam);
        ExamAttempt attempt;

        if (existingOpt.isPresent() && "IN_PROGRESS".equals(existingOpt.get().getStatus())) {
            attempt = existingOpt.get();
        } else {
            attempt = new ExamAttempt();
            attempt.setAttemptCode("ATT-" + (1000 + new Random().nextInt(9000)));
            attempt.setExamination(exam);
            attempt.setStudent(student);
            attempt.setStartedAt(LocalDateTime.now());
            // Server Authoritative Deadline
            attempt.setDeadlineAt(LocalDateTime.now().plusMinutes(exam.getDurationMinutes()));
            attempt.setStatus("IN_PROGRESS");
            attempt = attemptRepository.save(attempt);
        }

        // Fetch questions and strip answers
        List<Question> questions = questionRepository.findByExaminationOrderByOrderIndexAsc(exam);
        List<ExamDto.StudentSafeQuestion> safeQuestions = questions.stream().map(q -> {
            ExamDto.StudentSafeQuestion sq = new ExamDto.StudentSafeQuestion();
            sq.setId(q.getId());
            sq.setType(q.getQuestionType());
            sq.setMarks(q.getMarks());
            sq.setNegativeMarks(q.getNegativeMarks());
            sq.setQuestionText(q.getQuestionText());
            sq.setOptions(q.getOptions().stream()
                    .map(o -> new ExamDto.OptionItem(o.getOptionKey(), o.getOptionText()))
                    .collect(Collectors.toList()));
            return sq;
        }).collect(Collectors.toList());

        AttemptDto.StartAttemptResponse res = new AttemptDto.StartAttemptResponse();
        res.setAttemptId(attempt.getAttemptCode());
        res.setExamId(exam.getId());
        res.setExamTitle(exam.getTitle());
        res.setDurationSeconds(exam.getDurationMinutes() * 60);
        res.setStartedAt(attempt.getStartedAt());
        res.setDeadlineAt(attempt.getDeadlineAt());
        res.setQuestions(safeQuestions);
        res.setSavedAnswers(new HashMap<>());

        return res;
    }

    @Transactional
    public void saveAnswer(String attemptCode, Long questionId, AttemptDto.SaveAnswerRequest req) {
        ExamAttempt attempt = attemptRepository.findByAttemptCode(attemptCode)
                .orElseThrow(() -> new RuntimeException("Attempt not found: " + attemptCode));

        if (!"IN_PROGRESS".equals(attempt.getStatus())) {
            throw new RuntimeException("Cannot save answer: attempt is already " + attempt.getStatus());
        }

        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found: " + questionId));

        StudentAnswer answer = studentAnswerRepository.findByAttemptAndQuestion(attempt, question)
                .orElse(new StudentAnswer());

        answer.setAttempt(attempt);
        answer.setQuestion(question);
        answer.setSelectedOptionKey(req.getSelectedOptionId());
        answer.setAnswerText(req.getAnswerText());
        answer.setIsMarkedForReview(req.getIsMarkedForReview());
        answer.setSavedAt(LocalDateTime.now());

        studentAnswerRepository.save(answer);
    }

    @Transactional
    public void submitAttempt(String attemptCode, AttemptDto.SubmitRequest req) {
        ExamAttempt attempt = attemptRepository.findByAttemptCode(attemptCode)
                .orElseThrow(() -> new RuntimeException("Attempt not found: " + attemptCode));

        // Idempotency: if already submitted, return safely
        if ("SUBMITTED".equals(attempt.getStatus()) || "AUTO_SUBMITTED".equals(attempt.getStatus())) {
            return;
        }

        attempt.setStatus(Boolean.TRUE.equals(req.getIsAutoSubmitted()) ? "AUTO_SUBMITTED" : "SUBMITTED");
        attempt.setSubmittedAt(LocalDateTime.now());
        attempt.setViolationsCount(req.getViolationsCount());
        attemptRepository.save(attempt);

        // Auto-grade objective questions
        List<Question> questions = questionRepository.findByExaminationOrderByOrderIndexAsc(attempt.getExamination());
        List<StudentAnswer> answers = studentAnswerRepository.findByAttempt(attempt);
        Map<Long, StudentAnswer> answerMap = answers.stream()
                .collect(Collectors.toMap(a -> a.getQuestion().getId(), a -> a, (k1, k2) -> k1));

        double objectiveMarks = 0.0;
        int correctCount = 0;
        int wrongCount = 0;
        int unattemptedCount = 0;

        for (Question q : questions) {
            StudentAnswer ans = answerMap.get(q.getId());
            if ("MCQ".equalsIgnoreCase(q.getQuestionType()) || "TRUE_FALSE".equalsIgnoreCase(q.getQuestionType())) {
                if (ans == null || ans.getSelectedOptionKey() == null || ans.getSelectedOptionKey().isBlank()) {
                    unattemptedCount++;
                } else if (ans.getSelectedOptionKey().equalsIgnoreCase(q.getCorrectOptionId())) {
                    objectiveMarks += q.getMarks();
                    correctCount++;
                    ans.setAwardedMarks(q.getMarks());
                    ans.setEvaluationStatus("EVALUATED");
                    studentAnswerRepository.save(ans);
                } else {
                    wrongCount++;
                    double penalty = q.getNegativeMarks() != null ? q.getNegativeMarks() : 0.0;
                    objectiveMarks -= penalty;
                    ans.setAwardedMarks(-penalty);
                    ans.setEvaluationStatus("EVALUATED");
                    studentAnswerRepository.save(ans);
                }
            } else {
                // Descriptive question awaiting manual evaluation
                if (ans == null || ans.getAnswerText() == null || ans.getAnswerText().isBlank()) {
                    unattemptedCount++;
                }
            }
        }

        // Create or update Result entity
        Result result = resultRepository.findByAttempt(attempt).orElse(new Result());
        result.setAttempt(attempt);
        result.setTotalMarks(attempt.getExamination().getTotalMarks());
        result.setObtainedMarks(Math.max(0.0, objectiveMarks));
        result.setPercentage((result.getObtainedMarks() / result.getTotalMarks()) * 100);
        result.setCorrectAnswers(correctCount);
        result.setWrongAnswers(wrongCount);
        result.setUnattempted(unattemptedCount);
        result.setGrade(calculateGrade(result.getPercentage()));
        result.setIsPublished(true);
        result.setPublishedAt(LocalDateTime.now());

        resultRepository.save(result);
    }

    private String calculateGrade(double percentage) {
        if (percentage >= 90) return "A+";
        if (percentage >= 80) return "A";
        if (percentage >= 70) return "B";
        if (percentage >= 60) return "C";
        if (percentage >= 50) return "D";
        return "F";
    }

    private ExamDto.ExamSummary mapToSummary(Examination e) {
        ExamDto.ExamSummary s = new ExamDto.ExamSummary();
        s.setId(e.getId());
        s.setTitle(e.getTitle());
        s.setSubjectCode(e.getSubjectCode());
        s.setSubject(e.getSubject());
        s.setDepartment(e.getDepartment());
        s.setExaminerName(e.getExaminer() != null ? e.getExaminer().getName() : "Prof. Vikram Sen");
        s.setDurationMinutes(e.getDurationMinutes());
        s.setTotalMarks(e.getTotalMarks());
        s.setPassingMarks(e.getPassingMarks());
        s.setNegativeMarking(e.getNegativeMarking());
        s.setNegativeRate(e.getNegativeRate());
        s.setTotalQuestions(e.getQuestions() != null ? e.getQuestions().size() : 8);
        s.setStatus(e.getStatus());
        s.setProctoringEnabled(e.getProctoringEnabled());
        s.setWindowStart(e.getWindowStart());
        s.setWindowEnd(e.getWindowEnd());
        return s;
    }
}

