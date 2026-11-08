-- Baseline Schema DDL for Online Examination Portal (MySQL 8.0)

CREATE TABLE IF NOT EXISTS departments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    head_of_department VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    roll_number VARCHAR(100),
    employee_code VARCHAR(100),
    department VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_email (email),
    INDEX idx_user_role (role)
);

CREATE TABLE IF NOT EXISTS examinations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subject_code VARCHAR(50) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    department VARCHAR(255),
    created_by BIGINT,
    description TEXT,
    duration_minutes INT NOT NULL DEFAULT 60,
    total_marks DOUBLE NOT NULL DEFAULT 50.0,
    passing_marks DOUBLE NOT NULL DEFAULT 20.0,
    negative_marking BOOLEAN DEFAULT FALSE,
    negative_rate DOUBLE DEFAULT 0.0,
    attempt_limit INT DEFAULT 1,
    window_start TIMESTAMP NULL,
    window_end TIMESTAMP NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'DRAFT',
    proctoring_enabled BOOLEAN DEFAULT TRUE,
    max_tab_switches INT DEFAULT 3,
    fullscreen_required BOOLEAN DEFAULT TRUE,
    block_clipboard BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_exam_status (status)
);

CREATE TABLE IF NOT EXISTS questions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    examination_id BIGINT,
    question_text TEXT NOT NULL,
    question_type VARCHAR(50) NOT NULL,
    marks DOUBLE NOT NULL DEFAULT 4.0,
    negative_marks DOUBLE DEFAULT 0.0,
    explanation TEXT,
    correct_option_id VARCHAR(50),
    order_index INT DEFAULT 0,
    FOREIGN KEY (examination_id) REFERENCES examinations(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS question_options (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    question_id BIGINT NOT NULL,
    option_key VARCHAR(50) NOT NULL,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS exam_attempts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    attempt_code VARCHAR(100) NOT NULL UNIQUE,
    examination_id BIGINT NOT NULL,
    student_id BIGINT NOT NULL,
    started_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deadline_at TIMESTAMP NOT NULL,
    submitted_at TIMESTAMP NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'IN_PROGRESS',
    client_ip VARCHAR(100),
    user_agent TEXT,
    violations_count INT DEFAULT 0,
    FOREIGN KEY (examination_id) REFERENCES examinations(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_attempt_student (student_id),
    INDEX idx_attempt_exam (examination_id)
);

CREATE TABLE IF NOT EXISTS student_answers (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    attempt_id BIGINT NOT NULL,
    question_id BIGINT NOT NULL,
    selected_option_key VARCHAR(50),
    answer_text TEXT,
    awarded_marks DOUBLE,
    is_marked_for_review BOOLEAN DEFAULT FALSE,
    evaluation_status VARCHAR(50) DEFAULT 'PENDING',
    evaluator_comment TEXT,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uq_attempt_question (attempt_id, question_id),
    FOREIGN KEY (attempt_id) REFERENCES exam_attempts(id) ON DELETE CASCADE,
    FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS results (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    attempt_id BIGINT NOT NULL UNIQUE,
    total_marks DOUBLE NOT NULL,
    obtained_marks DOUBLE NOT NULL,
    percentage DOUBLE NOT NULL,
    grade VARCHAR(10) NOT NULL,
    correct_answers INT DEFAULT 0,
    wrong_answers INT DEFAULT 0,
    unattempted INT DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    published_at TIMESTAMP NULL,
    FOREIGN KEY (attempt_id) REFERENCES exam_attempts(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS proctoring_events (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    attempt_id BIGINT NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    severity VARCHAR(50) NOT NULL,
    description TEXT,
    event_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    metadata_json TEXT,
    FOREIGN KEY (attempt_id) REFERENCES exam_attempts(id) ON DELETE CASCADE,
    INDEX idx_proctor_attempt (attempt_id)
);

CREATE TABLE IF NOT EXISTS incident_reports (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    incident_code VARCHAR(100) NOT NULL UNIQUE,
    attempt_id BIGINT NOT NULL,
    summary TEXT NOT NULL,
    system_finding TEXT,
    action_taken VARCHAR(50) NOT NULL,
    review_status VARCHAR(50) NOT NULL DEFAULT 'NEW',
    reviewer_decision VARCHAR(50),
    reviewer_notes TEXT,
    penalty_marks DOUBLE DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP NULL,
    FOREIGN KEY (attempt_id) REFERENCES exam_attempts(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS violation_rules (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    event_type VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    threshold INT NOT NULL DEFAULT 3,
    action VARCHAR(50) NOT NULL DEFAULT 'WARN',
    enabled BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    log_code VARCHAR(100) NOT NULL UNIQUE,
    actor VARCHAR(255) NOT NULL,
    action VARCHAR(100) NOT NULL,
    target_entity VARCHAR(255),
    ip_address VARCHAR(100),
    details TEXT,
    timestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_audit_timestamp (timestamp)
);
