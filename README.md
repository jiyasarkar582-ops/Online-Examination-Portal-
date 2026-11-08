# 🎓 Online Examination Portal with Smart Proctoring

An enterprise-grade, modern, and production-oriented academic examination platform built in strict compliance with the institutional Product Requirements Document (PRD).

🔗 **GitHub Repository:** [https://github.com/jiyasarkar582-ops/Online-Examination-Portal-](https://github.com/jiyasarkar582-ops/Online-Examination-Portal-)

---

## 🌟 Key Features & Architectural Highlights

### 1. Multi-Tier Role-Based Workspaces (RBAC)
- **Student Workspace**:
  - Eligible and upcoming examinations schedule.
  - Pre-examination checklist and proctoring telemetry consent modal.
  - Distraction-free exam room with monotonic countdown timer.
  - Real-time debounced autosave and network disconnect recovery.
  - 4-state question palette: 🟢 Answered, 🔴 Unanswered, 🟣 Marked for Review, ⚪ Not Visited.
  - Supports MCQ, True/False, and Subjective/Descriptive questions with character & word counts.
  - Verified scorecards, grade bands, and printable PDF performance reports.
  - Performance analytics with Recharts tracking domain mastery and cohort comparisons.

- **Teacher / Examiner Studio**:
  - Multi-step exam creation wizard (timing, negative marking, attempt limits, proctoring policies).
  - Question bank management with points, explanations, and confidential answer keys.
  - Live active session monitoring and submissions roster.
  - Descriptive answer grading studio with side-by-side rubrics and evaluator feedback notes.
  - Smart proctoring incident investigation center with chronological event timelines and evidence-based rulings.

- **Admin Governance Console**:
  - Platform-wide statistics (active exams, completion rate, incident distribution).
  - User directory with student and faculty provisioning and account status toggles.
  - Academic departments and course allocations.
  - Configurable anti-cheating violation engine with custom thresholds and automated actions: `LOG_ONLY`, `WARN`, `FLAG_FOR_REVIEW`, `PAUSE`, `AUTO_SUBMIT`, `CANCEL`.
  - Immutable audit trail tracking privileged administrative and grading actions.

### 2. Fair & Evidence-Based Smart Proctoring
- Continuously monitors observable browser events:
  - Tab/Window focus changes (`visibilitychange` and window `blur`).
  - Full-screen mode status (`fullscreenchange`).
  - Clipboard copy and paste interceptions within answer areas.
  - Concurrent session detection.
- **Fairness Principle**: In strict compliance with PRD Section 5 & 6, the system does not make unprovable claims of detecting external AI models on separate devices. Actions follow a graduated escalation matrix with human-in-the-loop examiner review and an appeal route.

### 3. Server-Authoritative State & Security
- Zero answer-key leakage (sanitized student DTOs).
- Authoritative backend countdown deadlines.
- Idempotent final submission preventing duplicate evaluation runs.
- JWT-based authentication (HMAC-SHA256) and BCrypt password encryption.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 18 + Vite |
| **Styling & Theme** | Tailwind CSS (Navy `#173B65`, Royal Blue `#2563EB`, Surface Grey `#F5F7FB`) |
| **Icons & Visuals** | Lucide React |
| **Charts & Analytics** | Recharts |
| **Client HTTP** | Axios with JWT request & response interceptors |
| **Backend Framework** | Java 17/21/24 + Spring Boot 3.3.5 |
| **Security** | Spring Security 6.x + JJWT (HMAC-SHA256) + BCrypt |
| **Data Persistence** | Spring Data JPA / Hibernate |
| **Database** | MySQL 8.0 (Production profile) + In-Memory H2 (Local testing profile) |

---

## 👥 Default Institutional Seed Accounts

The platform automatically seeds these accounts on backend startup:

| Role | Email | Password | Identifier / Department |
|---|---|---|---|
| **Student** | `student@examportal.edu` | `password123` | Roll: `2026CSE104` (Rahul Sharma) |
| **Teacher / Examiner** | `teacher@examportal.edu` | `password123` | Employee Code: `FAC-CSE-042` (Prof. Vikram Sen) |
| **Administrator** | `admin@examportal.edu` | `password123` | Employee Code: `ADM-EXM-001` (Dr. Ananya Mukherjee) |

> *Tip: The web interface includes a 1-click **Role Perspective Switcher** in the top navigation bar to test all 3 workspaces instantaneously.*

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+) & npm
- Java JDK (17, 21, or 24)
- Maven 3.8+ (or wrapper)
- MySQL 8.0 (Optional; runs on H2 by default)

---

### 1. Run the Frontend (React + Vite)
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

---

### 2. Run the Backend (Spring Boot)

#### Running with Default In-Memory H2 Database (Instant Testing)
```bash
cd server
mvn spring-boot:run
```
* Server runs on **`http://localhost:8080`**.
* H2 Database Console: `http://localhost:8080/h2-console` (JDBC URL: `jdbc:h2:mem:examportal`).

#### Running with Production MySQL
1. Create the database:
   ```sql
   CREATE DATABASE examportal_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
2. Start Spring Boot with the `mysql` profile:
   ```bash
   mvn spring-boot:run -Dspring-boot.run.profiles=mysql
   ```

---

## 🧪 Running Automated Tests

```bash
cd server
mvn test
```
*Executes unit and integration test suites validating:*
- Spring context and repository beans.
- Initial seed data and BCrypt authentication.
- 100% precision objective scoring calculation with negative marking penalties.

---

## 📂 Project Directory Structure

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
│   │   └── application-mysql.properties   # Production MySQL profile
│   └── pom.xml
├── .gitignore
└── README.md
```

---

## 📜 License & Compliance
This software is built for academic and institutional assessment governance, compliant with data minimization, student privacy, and auditable proctoring standards.
