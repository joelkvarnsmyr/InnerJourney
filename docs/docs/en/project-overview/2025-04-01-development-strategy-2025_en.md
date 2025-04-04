---
id: utvecklingsstrategi-2025
title: "🧭 Utvecklingsstrategi"
description: "Beskriver den övergripande planen och tekniska valen för att bygga InnerJourney"
slug: utvecklingsstrategi-2025
sidebar_label: Utvecklingsstrategi
sidebar_position: 10
tags:
  - development
  - strategy
  - tech-stack
  - deployment
  - mvp
  - project
---
# 🧭 Development Strategy

📄 **Document Information**

*   **Version:** 4.0
*   **Date:** 2025-03-24
*   **Author:** Bo Joel Kvarnsmyr
*   **Last revised by:** Bo Joel Kvarnsmyr

## 🎯 Purpose

This development strategy describes the overall plan and technical choices for building and launching the InnerJourney platform. The focus is on delivering a stable, scalable, and user-friendly product by prioritizing key features, adhering to defined principles, and using iterative methods.

For a broader overview of the project, see `Project Description: Inner Journey`. The strategy is based on the project's purpose and vision, as defined in `Governing Document for InnerJourney` and `Project Description`.

## 🧬 Core Principles and Philosophy

The development of InnerJourney follows these fundamental principles:

*   🎯 **User Focus:** Prioritize features and experiences that provide direct value to the end-user, based on the defined target audience and feedback.
*   🧱 **Modularity and Scalability:** Build the system with clearly defined modules (backend services, frontend components) and use scalable cloud services (`Cloud Run`, `Firestore`) to handle growth.
*   🔒 **Security by Design:** Integrate security thinking from the start, including secure secret management (`Secret Manager`), robust authentication (`Firebase Auth`), and user data protection.
*   ⚙️ **Automation:** Automate repetitive tasks such as testing, building, and deployment (`CI/CD`) to increase efficiency and reduce errors.
*   🌱 **Iterative Development (MVP First):** Launch a Minimal Viable Product (`MVP`) with core functionality and then build upon it based on user feedback and business goals.

## ✅ Prioritized Features (Initial Focus)

These features are prioritized initially to quickly deliver core value:

*   🚀 **Onboarding:** Create a smooth onboarding process that collects data and verifies the user (see `Onboarding Process`).
*   🧘 **Exercises:** Implement basic exercises (`activations`) to demonstrate the platform's value (see `Activations: Inner Journey`).
*   🎨 **User Interface:** Build a minimalistic and adaptable `UI` (see `User Interface: Inner Journey`).
*   🤝 **Coaching:** Integrate basic coaching elements as a natural part of the journey (see `Coaching Strategy`).
*   🛡️ **Security:** Ensure basic data protection and `GDPR` compliance (see `Security Document`).

## 💻 Technology Stack

Chosen technology stack to achieve the project's goals:

### 🐍 Backend

*   **Framework:** `FastAPI` (`Python 3.10`) - For rapid `API` development and automatic documentation.
*   **Data Storage:** Firebase `Firestore` - `NoSQL` database for flexible and scalable data storage.
*   **Hosting:** Google `Cloud Run` - Serverless container platform for automatic scaling and easy deployment.
*   **Security:** Google `Cloud Secret Manager` - For secure management of `API` keys and other sensitive data.
*   **Containerization:** `Docker` - To package the application and its dependencies.

### ⚛️ Frontend

*   **Framework/Library:** `React` with `TypeScript` - For robust, type-safe, and component-based `UI` development.
*   **Styling:** `Chakra UI` - Component library for a consistent and accessible interface.
*   **Authentication:** `Firebase Authentication` - For secure user management and login (email/password, planned phone verification).
*   **Hosting:** `Firebase Hosting` - For fast and global delivery of the frontend application (`PWA`).
*   **State Management:** `React Context` or `Redux` (depending on complexity).

### 🤖 AI & Integrations

*   **AI:** Google `Gemini` - For AI-generated insights and activations.
*   **Planned Integrations:** `Dialogflow` (chatbot), `ElevenLabs` (voice generation).

## ⚙️ Development Workflow

The process from idea to functioning code in production:

### 🐙 Version Control (Git & GitHub)

*   **Repository:** `joelkvarnsmyr/InnerJourney` on `GitHub`.
*   **Branching Strategy:**
    *   `main`: Contains stable, deployable code.
    *   `feature/*`: Created for new features or bug fixes (e.g., `feature/new-activation-endpoint`).
    *   Merges to `main` are done via Pull Requests (`PRs`) after code review.
*   **Commit Conventions:** Clear and descriptive commit messages (e.g., `feat: Add user profile route`, `fix: Correct Firestore query`).
*   **Ignoring Files:** Use `.gitignore` to exclude sensitive files (`.env`, credentials), local configurations (`venv/`), and auto-generated files (`__pycache__/`).

### 🖥️ Local Development Environment

*   **Required Tools:** `Python 3.10`, `Git`, `Docker`, `gcloud` SDK, `Node.js`/`npm` (for frontend).
*   **Setup:**
    1.  Clone the repo: `git clone <repo-url>`
    2.  Create virtual environment: `python -m venv venv` and activate it (`source venv/bin/activate` on Linux/macOS, `.\venv\Scripts\activate` on Windows).
    3.  Install dependencies: `pip install -r requirements.txt`
*   **Configuration:** Use an `.env` file for local secrets (`API` keys, file paths). This file should **not** be checked into `Git` (see `.gitignore`).
*   **Testing:** Run the backend locally with `uvicorn` or via `Docker`. Use `gcloud` authentication to test integrations with Google Cloud services locally.

```bash title="Example: Start backend locally with uvicorn"
uvicorn main:app --reload
```

### ✍️ Code Quality and Standards

*   **Backend (Python):** `Flake8` for linting and `Black` for automatic formatting.
*   **Frontend (TypeScript/React):** `ESLint` for linting and `Prettier` for automatic formatting.
*   **Consistency:** Follow established patterns within the respective frameworks (`FastAPI` routers/services, `React` components/hooks).

### ✅ Testing

*   **Backend:** Unit tests with `pytest` for `API` logic and services.
*   **Frontend:** Unit tests with `Jest` and `React Testing Library` for components.
*   **Integration Tests:** Test flows end-to-end, including `API` calls and authentication.
*   **Automation:** Tests run automatically in the `CI/CD` pipeline (see `Test Plan for Inner Journey`).

### 🚀 CI/CD (Continuous Integration / Continuous Deployment)

*   **Tools:** `GitHub Actions` or Google `Cloud Build`.
*   **Triggers:** Runs automatically on push to `main` or when creating/updating Pull Requests (`PRs`).
*   **Workflow:**
    1.  📥 Check out code.
    2.  📦 Install dependencies.
    3.  🧹 Run linters and format checks.
    4.  🧪 Run automated tests.
    5.  🏗️ Build `Docker` image (for backend).
    6.  ☁️ Push image to Google `Artifact Registry`.
    7.  🚀 Deploy to Google `Cloud Run` (backend) and `Firebase Hosting` (frontend).

## 🔄 Iterative Development

*   **Sprints:** The project is divided into sprints focusing on specific deliverables. Each sprint lasts 2-3 weeks and concludes with a testing phase (see `Test Plan for Inner Journey`).
*   **Feedback:** User feedback is collected after each sprint to shape the next iteration (see `Strategy for User Feedback & Communication` in `Project Description: Inner Journey`).
*   **Backlogs:** Daily progress and priorities are documented in backlogs (see `Backlog 1: March 21, 2025`).

## ☁️ Deployment Strategy

How the application is deployed and made available:

### Backend (Google Cloud Run)

*   **Process:** The `Docker` image is built and pushed to `Artifact Registry` via the `CI/CD` workflow. The `gcloud run deploy` command is used to deploy the new version.

    ```bash title="Example: Deploy to Cloud Run"
    gcloud run deploy <SERVICE_NAME> \
      --image <REGION>-docker.pkg.dev/<PROJECT_ID>/<REPO_NAME>/<IMAGE_NAME>:<TAG> \
      --region <REGION> \
      --platform managed \
      --allow-unauthenticated # NOTE: Must be replaced with authentication!
    ```

*   **Configuration:**
    *   The service runs as a `managed` service.
    *   Region: `europe-west1`.
    *   Service account with necessary `IAM` roles (at least `Secret Manager Secret Accessor`).
    *   Environment variables are set as needed (e.g., `GOOGLE_CLOUD_PROJECT`).
    *   **Security:** Initially, `--allow-unauthenticated` is used for simplicity during development. This **must** be replaced with authentication requirements (e.g., validation of Firebase `id_token`) before a wider launch.

### Frontend (Firebase Hosting)

*   **Process:** The built `React` application is deployed via `firebase-cli`.

    ```bash title="Example: Deploy frontend"
    npm run build # Or equivalent build command
    firebase deploy --only hosting
    ```

*   **Proxy to Backend:** The `firebase.json` file is configured with a `rewrite` to direct `API` calls (e.g., `/api/**`) to the backend service on `Cloud Run`. This avoids `CORS` issues and hides the backend URL.

    ```json title="firebase.json (example rewrite)"
    {
      "hosting": {
        // ... other hosting settings
        "rewrites": [
          {
            "source": "/api/**",
            "run": {
              "serviceId": "<CLOUDRUN_SERVICE_ID>",
              "region": "europe-west1" // Match your Cloud Run region
            }
          },
          {
            "source": "**",
            "destination": "/index.html" // For Single Page Application (SPA) routing
          }
        ]
      }
    }
    ```
*   **PWA:** Configured as a Progressive Web App (`PWA`) for a better user experience, offline capability (initially), and installability on devices.

## 🌱 MVP and Phased Development

The strategy for launch and further development:

### MVP Focus

*   ✅ **Core Features:** Stable `authentication`, simple `onboarding` process, basic `daily logging`.
*   📜 **Content:** A few initial exercises (`activations`), e.g., breathing exercise for focus, reflection tasks.
*   🎨 **Interface:** A clean and functional `UI`, inspired by `Typeform` and `Superhuman`.
*   🗣️ **Feedback:** Simple mechanism for user feedback built into the app.

### Phased Development Plan (Example based on sprints)

*   **Sprint 1 (Foundation):** Project setup, `CI/CD`, basic `authentication`, database structure (`Firestore`).
*   **Sprint 2-3 (Onboarding & Core):** Implement the entire `onboarding` flow, save user data, basic journaling/logging.
*   **Sprint 4 (Exercises):** Implement system for exercises (`activations`), add the first set of exercises (incl. `Gemini` integration).
*   **Sprint 5+ (Expansion):** Develop live interactions, AI analysis, coaching features, more exercise types, improve `UI`/`UX` based on feedback.

### 🗣️ Feedback and Iteration

*   Actively collect and analyze user feedback via built-in forms and community channels.
*   Prioritize and implement improvements and new features in subsequent iterations based on insights.

## 👥 Team and Roles

*   🧑‍💼 **Project Manager:** Responsible for planning, coordination, and follow-up of sprints.
*   💻 **Developers:** Build and test backend, frontend, and integrations.
*   🎨 **Designers:** Create and iterate on the `UI`/`UX` design.
*   🧪 **Testers:** Perform manual and automated tests to ensure quality.

## ⚠️ Risks and Dependencies

*   **Risks:**
    *   Delays in third-party integrations (e.g., `Dialogflow CX`, `ElevenLabs`) can affect the timeline.
    *   Technical issues, such as server outages or unexpected scaling problems, may arise.
*   **Dependencies:**
    *   The onboarding process depends on external `API`s (e.g., `Sinch Voice API`) and `Firebase Authentication`.
    *   Core features like exercises require both the `UI` and backend to be stable and deployed.
*   **Mitigation:**
    *   Prioritize testing critical integrations early in the development cycle.
    *   Have an incident management plan in place (see `Security Document`).
    *   Use cloud services with high availability and monitoring.

## 🌟 Future Development and Integrations

Long-term goals and planned additions to expand the platform:

*   **Expanded API:** More endpoints for e.g., phone verification, advanced user profile management, logging different types of reflections.
*   **Improved Testing:** Increase test coverage, especially for integration tests and end-to-end flows.
*   **Improved Security:** Implement stricter `API` access control (e.g., `id_token` validation on all protected endpoints), regular security audits.
*   **New Integrations:** `Dialogflow` for chat-based interactions, `ElevenLabs` for voice-based exercises and feedback.
*   **Coaching Platform:** Expand features for users to act as coaches and interact with other users within the platform.
*   **Social Features:** Option for users to (optionally) share progress or participate in group exercises/challenges.

## 📚 Documentation and Knowledge Sharing

Ensuring the project is well-documented for both current and future team members:

*   **Technical Documentation:** `README.md` files in the project root and in key folders (`backend/`, `frontend/`). A dedicated `/docs` folder in the repo for more in-depth documentation (architecture diagrams, `API` specifications, database structure).
*   **API Documentation:** Auto-generated documentation via `FastAPI` (Swagger UI/ReDoc), supplemented with manual descriptions and examples as needed, especially for frontend consumers.
*   **Onboarding Guide:** A specific document guiding new developers through the process of setting up the local development environment, understanding the codebase architecture, and contributing effectively to the project.
*   **Governing Documents:** Regular review and updating of this document (`utvecklingsstrategi-2025.md`) and other central governing documents to ensure they reflect the project's current status and future direction.

## 👉 Next Steps

*   Plan the content and goals for **Sprint 1**, focusing on implementing basic onboarding and the first exercises (`activations`).
*   Develop a detailed test strategy and initial test cases to validate the deliverables from each sprint (see `Test Plan for Inner Journey`).
*   Prepare mechanisms to collect feedback from early users (e.g., beta testers) after **Sprint 2** to inform and prioritize the next development iteration.

## 🔗 References

For more detailed information, see the following related documents:

*   `Project Description: Inner Journey`
*   `Governing Document for InnerJourney`
*   `Onboarding Process`
*   `Activations: Inner Journey`
*   `User Interface: Inner Journey`
*   `Coaching Strategy`
*   `Security Document`
*   `Test Plan for Inner Journey`
*   `Backlog 1: March 21, 2025` (and subsequent backlogs)