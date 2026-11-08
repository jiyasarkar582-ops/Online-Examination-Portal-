 Online Examination Portal with Smart Proctoring

An enterprise-grade, modern, and production-oriented academic examination platform built in strict compliance with the institutional Product Requirements Document (PRD).

**GitHub Repository:** [https://github.com/jiyasarkar582-ops/Online-Examination-Portal-](https://github.com/jiyasarkar582-ops/Online-Examination-Portal-)

---

1. Project Overview

The **Online Examination Portal with Smart Proctoring** is a full-stack, enterprise-grade academic assessment and examination management system. It digitizes the complete academic examination lifecycle—from question bank authoring, exam scheduling, and timed assessments to real-time telemetry monitoring, automated objective grading, descriptive answer evaluation, and result publication.

1.1 Product Vision
Deliver a secure, fair, reliable, and user-friendly examination platform that supports objective and descriptive assessments, provides distraction-free test environments for students, empowers examiners with comprehensive authoring and grading suites, and provides transparent, evidence-based telemetry when suspicious activity occurs.

1.2 Core Objectives & Goals
1. **End-to-End Digital Examination Lifecycle**: Manage the entire flow including curriculum-based question bank curation, test scheduling, student eligibility checks, timed test delivery, automated objective scoring, manual descriptive answer evaluation, and tamper-proof scorecard issuance.
2. **Three-Tier Role-Based Workspaces**: Complete separation of concerns and access control for:
   - **Students**: Timed tests, answer autosave, real-time question palette, and performance analytics.
   - **Teachers / Faculty Examiners**: Exam authoring wizard, question banks, objective & subjective grading studios, and proctoring incident review.
   - **System Administrators**: Institutional user management, department setup, proctoring policy rule engines, and audit logging.
3. **Server-Authoritative Examination State**: Timers, deadlines, and answer persistence are strictly governed by the backend server to eliminate client clock manipulation or unauthorized access to answer keys.
4. **Fair & Evidence-Based Smart Proctoring**: Records observable browser activity signals (tab switches, fullscreen exits, clipboard paste events, concurrent logins) without making unprovable claims of external AI detection. Employs a graduated escalation matrix (`LOG_ONLY` → `WARN` → `FLAG_FOR_REVIEW` → `PAUSE` → `AUTO_SUBMIT` → `CANCEL`) backed by human-in-the-loop examiner review and student appeal pathways.
5. **Autosave & Disconnect Resilience**: Continuous debounced synchronization safeguards student answers against accidental reloads, network dropouts, or power failures.

---

2. Key Modules & Functional Workspaces

 Student Workspace
- **Dashboard & Eligibility**: Real-time view of enrolled courses, currently active tests within permitted windows, upcoming examinations, and released results.
- **Pre-Exam Instructions & Consent Modal**: Displays duration, total marks, negative marking rules, attempt limits, and obtains explicit student consent for browser monitoring per PRD **FR-012** & **FR-075**.
- **Distraction-Free Exam Screen**:
  - **Authoritative Countdown Timer**: Synchronized with server deadline; triggers visual alerts when time is low.
  - **Question Palette (4 Distinct States)**:
    - 🟢 **Green**: Answered
    - 🔴 **Red**: Unanswered (visited)
    - 🟣 **Purple**: Marked for Review
    - ⚪ **Grey**: Not Visited
  - **Multiple Question Types**: Multiple Choice (MCQ), True/False cards, and Subjective/Descriptive questions with live character & word counters.
  - **Controls**: Previous, Next, Clear Response, Mark for Review, and Final Submission Summary Modal.
  - **Real-Time Autosave**: Background synchronization with live indicator (`Syncing...` / `All answers saved`).
- **Scorecards & Analytics**: Verified statement of marks, grade badges (A+, A, B, etc.), printable PDF scorecard export, and Recharts performance trajectory charts.

### Teacher / Examiner Studio
- **Examination Portfolio Manager**: Author, edit, duplicate, publish, and close examinations.
- **Multi-Step Exam Creation Wizard**: Configure duration, total marks, passing criteria, negative marking penalties (0.25 / 0.33 / 0.50), attempt limits, and proctoring threshold rules.
- **Institutional Question Bank**: Manage reusable questions across MCQ, True/False, and Descriptive types with point weights, explanations, and secure answer keys.
- **Submissions & Descriptive Grading Studio**: Review auto-scored objective points alongside student descriptive answers, reference rubrics, score inputs, and evaluator feedback comments.
- **Proctoring Incident Investigation Center**: Inspect chronological event timelines (e.g. *10:15 Focus lost*, *10:17 Repeated tab switch*, *10:19 Clipboard paste*), read algorithmic findings, and record formal examiner decisions (`CLEARED`, `WARNING_UPHELD`, `SCORE_PENALIZED`, `EXAM_CANCELLED`) with written rationale.

### Admin Governance Console
- **Platform Analytics**: Global KPIs (enrolled students, faculty, completion rate), Recharts monthly attempt volume trends, and violation telemetry distribution.
- **User Directory**: Provision student and faculty accounts, filter by role, and toggle account activation or suspension.
- **Academic Departments**: Department directory, course allocations, and faculty assignments.
- **Proctoring Policy Rule Engine**: Fine-tune system-wide anti-cheating thresholds and action escalation mappings (`LOG_ONLY`, `WARN`, `FLAG_FOR_REVIEW`, `PAUSE`, `AUTO_SUBMIT`, `CANCEL`).
- **Immutable Audit Ledger**: Tamper-proof audit logs recording privileged administrative, proctoring, and grading actions.

---

3. Smart Proctoring Policy & Limitations

| Observable Signal | Observed Behavior | System Action & Limitation Note |
|---|---|---|
| **Tab / Window Focus** | Page Visibility API (`visibilitychange`) and window `blur` / `focus` | Graduated warning. *Accidental clicks or OS notifications are accounted for via configurable thresholds.* |
| **Full-Screen Lockdown** | Browser exits full-screen (`fullscreenchange`) | Prompts student to restore full-screen; logs event. |
| **Clipboard Actions** | `copy`, `cut`, and `paste` events within exam inputs | Intercepts clipboard operations in subjective/code fields to prevent external text dumping. |
| **Concurrent Sessions** | Duplicate active tokens from distinct IPs | Flags suspicious session concurrency and pauses newer session. |
| **External AI Limitation** | Phone or separate device usage | **Explicit PRD Limitation**: Standard browsers cannot inspect other physical devices or separate browsers. The system logs observable events neutrally and does not make false claims of external AI detection. |

---

Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 18 + Vite |
| **Styling & Design System** | Tailwind CSS (Navy Blue `#173B65`, Royal Blue `#2563EB`, Surface Grey `#F5F7FB`) |
| **Icons & Visuals** | Lucide React |
| **Data Visualization** | Recharts (Monthly attempt trends, mastery radar, incident distribution) |
| **Client HTTP** | Axios with JWT request & response interceptors and transparent fallback adapter |
| **Backend Framework** | Java 17/21/24 + Spring Boot 3.3.5 |
| **Security & Auth** | Spring Security 6.x + JJWT (HMAC-SHA256) + BCrypt |
| **Persistence Layer** | Spring Data JPA / Hibernate |
| **Database** | MySQL 8.0 (Production profile) + In-Memory H2 (Instant local testing profile) |
| **DevOps & Containerization**| Docker, Docker Compose, Nginx, GitHub Actions CI/CD |

---

5. Default Institutional Seed Accounts

The platform automatically provisions these pre-configured institutional accounts upon backend startup:

| Role | Email | Password | Identifier / Department |
|---|---|---|---|
| **Student** | `student@examportal.edu` | `password123` | Roll: `2026CSE104` (Rahul Sharma) |
| **Teacher / Examiner** | `teacher@examportal.edu` | `password123` | Employee Code: `FAC-CSE-042` (Prof. Vikram Sen) |
| **Administrator** | `admin@examportal.edu` | `password123` | Employee Code: `ADM-EXM-001` (Dr. Ananya Mukherjee) |

> *Tip: The web interface includes a 1-click **Role Perspective Switcher** in the top navigation bar to test all 3 workspaces instantaneously.*

---

6. Quick Start & Execution

### Prerequisites
- Node.js (v18+) & npm
- Java JDK 17, 21, or 24
- Maven 3.8+ (or wrapper)
- Docker & Docker Compose (Optional)

---

### Option A: Local Development

#### 1. Start Frontend (React + Vite)
```bash
cd client
npm install
npm run dev
```
Open **`http://localhost:5173`** in your browser.

To compile production assets:
```bash
npm run build
```

#### 2. Start Backend (Spring Boot)
```bash
cd server
mvn spring-boot:run
```
* Server runs on **`http://localhost:8080`**.
* H2 Database Console: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:examportal`).
* To run with MySQL, use `mvn spring-boot:run -Dspring-boot.run.profiles=mysql`.

---

### Option B: Docker Compose (Full Stack Deployment)
Run MySQL 8.0, Spring Boot backend, and Nginx-powered React frontend with one command:
```bash
docker compose up --build
```
* **Frontend**: `http://localhost` (Port 80)
* **Backend API**: `http://localhost:8080`
* **MySQL DB**: `localhost:3306`

---

7. Automated Testing Suite

```bash
cd server
mvn test
```
*Runs unit and integration tests verifying:*
- Spring context loading and JPA repository wiring.
- Seed data initialization and BCrypt password authentication.
- **100% Precision Objective Marking**: Verification of correct scores, unattempted items, and negative marking penalty deductions.

---

8. Project Structure

```
Online Examination Portal/
├── client/                                # React 18 + Vite Frontend
│   ├── src/
│   │   ├── components/                    # Reusable UI Atoms & Layouts
│   │   │   ├── common/                    # Badge, Button, Modal, Alert, MetricCard
│   │   │   ├── layout/                    # Navbar (with Role Switcher), Sidebar, Footer, DashboardLayout
│   │   │   └── student/                   # ExamTimer, QuestionPalette (4 distinct states)
│   │   ├── context/                       # AuthContext (Role management, JWT storage)
│   │   ├── hooks/                         # useProctoring (real-time telemetry event listeners)
│   │   ├── pages/                         # 18 Role-specific pages
│   │   │   ├── public/                    # Home, Login, Student Registration, Forgot Password
│   │   │   ├── student/                   # StudentDashboard, MyExams, ExamScreen, ResultView, StudentAnalytics
│   │   │   ├── teacher/                   # TeacherDashboard, ManageExams, CreateExam, QuestionBank, SubmissionsList, GradingStudio, IncidentReview
│   │   │   └── admin/                     # AdminDashboard, UserManagement, Departments, ProctoringRules, AuditLogs
│   │   ├── routes/                        # AppRoutes & ProtectedRoute RBAC guards
│   │   ├── services/                      # Axios API service layer with transparent fallback adapter
│   │   └── utils/                         # Constants and dummy seed data
│   ├── Dockerfile                         # Production Nginx container
│   ├── nginx.conf
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                                # Spring Boot 3 Java Backend
│   ├── src/main/java/com/examportal/
│   │   ├── config/                        # SecurityConfig, CORS, PasswordEncoder
│   │   ├── controller/                    # Auth, StudentExam, Examiner, Proctoring, Admin REST APIs
│   │   ├── dto/                           # Request/Response DTOs
│   │   ├── entity/                        # 16 JPA Entities
│   │   ├── exception/                     # GlobalExceptionHandler (RFC 7807)
│   │   ├── repository/                    # 11 Spring Data JPA Repositories
│   │   ├── security/                      # JwtTokenProvider, JwtAuthenticationFilter, CustomUserDetails
│   │   └── service/                       # AuthService, ExamService, ProctoringService, DataInitializer
│   ├── src/main/resources/
│   │   ├── application.properties         # Default profile (H2, port 8080, JWT secrets)
│   │   ├── application-mysql.properties   # Production MySQL profile
│   │   └── schema.sql                     # Baseline MySQL 8 DDL
│   ├── Dockerfile
│   └── pom.xml
├── .github/workflows/ci.yml               # Automated CI Build & Test Workflow
├── docker-compose.yml                     # Multi-container orchestration
├── start.sh                               # One-click startup script
├── .gitignore
└── README.md
```

---

9. Compliance & Academic Integrity
Built in accordance with academic fair evaluation standards, student data minimization, auditable proctoring logs, and human-in-the-loop disciplinary oversight.
