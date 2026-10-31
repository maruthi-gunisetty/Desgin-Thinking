# FairHire AI — Ethical & Bias-Audited Talent Acquisition Platform
*Design Thinking in Recruitment Engineering & Algorithmic Parity*

FairHire AI is an enterprise recruitment platform designed to eliminate algorithmic bias, enforce Title VII / EEOC statistical compliance, and provide explainable candidate evaluations. Built with a human-in-the-loop oversight framework, it isolates demographic variables and scores candidates strictly on verified technical skills, career progression, and demonstrated achievements.

---

## 🎨 Theme & Visual Identity
* **Primary Brand Theme**: `#FFA586` (Warm Coral)
* **Secondary / Structural Theme**: `#384358` (Deep Slate Navy)
* **Design Philosophy**: High-clarity enterprise compliance styling with micro-interactions, responsive charts, and accessible typography.

---

## 🚀 Key Features

### 1. 🛡️ Two-Stage Blind Screening Architecture
* **Stage 1 (Anonymized Ingestion)**: Automatically strips candidate identifiers (names, photos, universities, contact details, postal codes, and gender indicators) before scoring models inspect CV data.
* **Stage 2 (Merit Extraction)**: Evaluates resumes based solely on technical competency, project impact, and experience breadth.

### 2. 📄 CV & Resume Multi-Format Upload
* Drag-and-drop document upload interface supporting **PDF**, **DOCX**, **DOC**, and **TXT**.
* Real-time document parsing, metadata extraction, and multi-stage evaluation pipeline status.

### 3. ⚖️ EEOC Uniform Guidelines 4/5ths (80%) Rule Compliance Sandbox
* Mathematical adverse impact inspection across gender, ethnicity, and age cohorts.
* Instant adverse impact alerts if any protected group selection rate falls below 80% of the benchmark rate.
* Simulated legacy bias sandbox demonstrating disparities produced by traditional keyword matchers versus FairHire AI merit scoring.

### 4. 🧠 Explainable AI (XAI) & Human Oversight
* Mathematical feature attributions (SHAP impact values) detailing points credited or deducted per criteria.
* Natural language decision summaries explaining the exact reasoning behind scores.
* Human-in-the-loop override channel with mandatory justification logging cryptographically recorded in the compliance audit trail.

### 5. 🔐 Enterprise Authentication Portal
* Role-based access control for Recruiters, Diversity & Compliance Officers, and Hiring Managers.
* Instant 1-click enterprise demo logins (*Dr. Elena Vance*, *Marcus Chen*, *Sarah Jenkins, Esq.*).

### 6. 📊 Real-Time Analytics & Dynamic Weights Simulator
* Score distribution histograms, hiring funnel conversion stages, and skill prevalence matrices powered by Recharts.
* Interactive weight tuner for adjusting skills, experience, qualifications, and project criteria on the fly.
* Printable and PDF-exportable official Compliance Certificates.

---

## 🛠️ Technology Stack
* **Frontend**: React 18, TypeScript, Vite
* **Styling**: Tailwind CSS, Vanilla CSS design tokens (`#FFA586` & `#384358`)
* **Visualizations**: Recharts, Lucide Icons
* **Compliance Standards**: EEOC UGESP (29 C.F.R. § 1607), EU AI Act (High-Risk Annex III), NYC Local Law 144

---

## 💻 Getting Started Locally

### Prerequisites
* [Node.js](https://nodejs.org/) (version 18 or newer recommended)
* npm

### Installation
```bash
# Clone the repository
git clone https://github.com/maruthi-gunisetty/Desgin-Thinking.git

# Enter project directory
cd Desgin-Thinking

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:3000/` in your browser.

### Production Build
```bash
npm run build
```

---

## 📜 Regulatory Standards Addressed
* **Title VII of the Civil Rights Act of 1964** — Disparate Impact mitigation.
* **EEOC Uniform Guidelines on Employee Selection Procedures (UGESP)** — Four-Fifths (80%) selection rate ratio validation.
* **EU AI Act (2024)** — Transparency, explainability, risk management, and human-in-the-loop controls for employment algorithms.
* **NYC Local Law 144** — Annual independent bias auditing and publication of demographic selection metrics.
