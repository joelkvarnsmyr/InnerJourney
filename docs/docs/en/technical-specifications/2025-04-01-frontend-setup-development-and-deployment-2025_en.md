# 🚀 Frontend: Setup, Development, and Deployment

## 📜 Overview

This document describes the process for setting up, developing, and deploying the frontend part of **InnerJourney**, a platform for personal development. ✨

The frontend is built with `React` and `TypeScript`, and uses `Chakra UI` for components and styling. It communicates with the backend via API calls and handles user authentication with `Firebase Authentication`. The application is deployed on `Firebase Hosting` for easy and global availability. ☁️

This guide will walk you through the steps to run the frontend locally and how to deploy it to `Firebase Hosting`.

## ✅ Prerequisites

Before you begin, ensure you have the following tools installed on your machine:

-   💻 **Node.js:** Version 14 or later is recommended.
-   📦 **npm** or **yarn:** Package manager for `Node.js` (`npm` comes with `Node.js`).
-   🐙 **Git:** For version control and cloning the project.
-   🔥 **Firebase CLI:** For interacting with Firebase services and deploying to `Firebase Hosting`. Installed via `npm install -g firebase-tools`.
-   ☁️ **Google Cloud SDK (`gcloud`):** Optional, but useful if you want to manage the Firebase project via the command line.

## 🗂️ Project Structure

The frontend code is located in the `frontend/` folder within the project's root directory (`InnerJourney/`). Below is an overview of important files and folders:

```text title="frontend/ Folder Structure"
frontend/
├── public/              # Static files (e.g., index.html, favicon)
├── src/                 # The source code for the React application
│   ├── components/      # Reusable UI components (e.g., Button.tsx, ActivationCard.tsx)
│   ├── pages/           # Components representing entire pages/views (e.g., HomePage.tsx, LoginPage.tsx)
│   ├── services/        # Logic for API calls and other services (e.g., api.ts, firebase.ts)
│   ├── context/         # React Context for global state management (e.g., AuthContext.tsx)
│   ├── App.tsx          # The application's main component, handles routing
│   └── index.ts        # Entry point that renders the App component in the DOM
├── .env                 # Local environment variables (ignored by Git)
├── package.json         # Project dependencies and npm scripts
├── tsconfig.json        # Configuration for the TypeScript compiler
└── firebase.json        # Configuration for Firebase Hosting (incl. rewrites)
```

## 🖥️ Setting up the project locally

Follow these steps to get the frontend running in your local development environment:

### 1. Clone the repository 📥

Open your terminal and clone the project from GitHub. Then navigate into the `frontend` folder:

```bash
git clone git@github.com:joelkvarnsmyr/InnerJourney.git
cd InnerJourney/frontend
```

### 2. Install dependencies 📦

Install all necessary Node.js packages specified in `package.json`:

```bash
# With npm
npm install

# Or with yarn
# yarn install
```

### 3. Configure environment variables ⚙️

For the frontend to communicate with Firebase services, you need to configure your Firebase project credentials.

1.  Create a file named `.env` in the root of the `frontend/` folder.
2.  Copy the content below and replace the placeholders with your actual Firebase values. You can find these in your Firebase project settings: *Project Settings > General > Your apps > Web app*.

```env title=".env"
# Firebase Configuration - Get from Firebase Console
REACT_APP_FIREBASE_API_KEY="your-firebase-api-key"
REACT_APP_FIREBASE_AUTH_DOMAIN="your-app.firebaseapp.com"
REACT_APP_FIREBASE_PROJECT_ID="your-project-id"
REACT_APP_FIREBASE_STORAGE_BUCKET="your-app.appspot.com"
REACT_APP_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
REACT_APP_FIREBASE_APP_ID="your-app-id"

# Optional: URL to the backend (used if proxy doesn't cover all needs or in production)
# REACT_APP_API_BASE_URL="http://localhost:8080" or "https://your-backend-url.run.app"
```

**⚠️ Important:** The `.env` file should **not** be checked into Git. Make sure it is listed in your `.gitignore` file. You may need to restart the development server for new environment variables to be loaded.

### 4. Run the frontend locally ▶️

Start the local development server:

```bash
# With npm
npm start

# Or with yarn
# yarn start
```

The application should now be available in your web browser at `http://localhost:3000`. The server automatically updates the page when you make changes to the code (Hot Module Replacement).

**📝 Note:** For features requiring backend communication (e.g., login, fetching data) to work, you need to either:

*   Have the backend service running locally (usually at `http://localhost:8080`).
*   Configure the frontend to call a deployed backend URL (via the `REACT_APP_API_BASE_URL` environment variable in `.env`).

## ☁️ Building and deploying to Firebase Hosting

When you are ready to publish your frontend, do the following:

### 1. Build the project 🏗️

Compile and optimize your React application for production:

```bash
# With npm
npm run build

# Or with yarn
# yarn build
```

This command creates a `build/` folder containing all the static files (HTML, CSS, JavaScript) ready for deployment.

### 2. Configure Firebase Hosting 🔥

If this is the first time you are deploying this project to Firebase Hosting, you need to initialize it. Run the following commands in the `frontend/` folder:

```bash
# Log in to your Firebase account (if you haven't already)
firebase login

# Initialize hosting for the project
firebase init hosting
```

Follow the instructions in the terminal:

1.  Select your existing Firebase project.
2.  Specify `build` as your public directory (the folder with the built files).
3.  Answer **Yes** (`y`) to the question about configuring as a "single-page app". This is important for `React Router` to work correctly by routing all paths to `index.html`.

This creates or updates the `firebase.json` and `.firebaserc` files. Your `firebase.json` should look similar to this:

```json title="firebase.json"
{
  "hosting": {
    "public": "build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### 3. Deploy to Firebase Hosting 🚀

Once the configuration is complete and the project is built, deploy to Firebase Hosting:

```bash
firebase deploy --only hosting
```

After a successful deployment, the public URL where your application is now live will be displayed (e.g., `https://your-project-id.web.app` or a custom domain if you have configured one). Congratulations! 🎉

## ↔️ Proxy and API calls

During local development, `CORS` (Cross-Origin Resource Sharing) issues often arise when the frontend (running at `http://localhost:3000`) tries to call the backend (running at `http://localhost:8080`).

To handle this, `create-react-app` uses a built-in proxy feature. It is configured in the `package.json` file:

```json title="package.json (proxy setting)"
{
  // ... other settings
  "proxy": "http://localhost:8080"
}
```

This means that any unknown requests from the frontend (those not matching static files) are automatically forwarded to `http://localhost:8080`. You can then make API calls in your code using *relative paths*, e.g., `fetch('/api/users')` instead of `fetch('http://localhost:8080/api/users')`.

**⚠️ Important for production:** This `proxy` setting in `package.json` works **only** in the local development environment (`npm start` / `yarn start`). When the application is deployed to `Firebase Hosting`, the frontend must call the *actual*, deployed backend URL. This is typically handled by using an environment variable (e.g., `REACT_APP_API_BASE_URL`) set to the public backend URL in the production environment.

## 🔐 Authentication

The frontend uses `Firebase Authentication` to handle user registration and login.

*   **Registration & Login:** Support for creating accounts and logging in with email and password (or other methods configured in Firebase).
*   **Token Handling:**
    *   After successful login, Firebase sends back an `id_token` (JWT).
    *   This token is securely stored by the Firebase SDK (with configurable persistence, e.g., `local` or `session`).
    *   To access protected backend endpoints, this `id_token` must be retrieved from the SDK and included in the `Authorization` header for each API call: `Authorization: Bearer <id_token>`. The backend then verifies this token.
*   **Global State:** Information about the logged-in user (or if no one is logged in) is managed globally in the application, typically using `React Context` (e.g., an `AuthContext` wrapping the entire app in `src/App.tsx` or `src/index.ts`).

## 🐞 Troubleshooting

Here are some common problems and their solutions:

### 1. CORS Errors 🚧

*   **Cause (Local):**
    *   The `proxy` setting in `package.json` is incorrect, missing, or the development server hasn't been restarted after the change.
    *   Requests are made using an absolute URL to `http://localhost:8080` instead of a relative path.
*   **Cause (Production):**
    *   The backend service (e.g., Google Cloud Run) is not configured to send the correct CORS headers allowing requests from your frontend domain (e.g., `https://your-project-id.web.app`).
*   **Solution (Local):**
    *   Check the `proxy` setting in `package.json`.
    *   Restart the server (`npm start` or `yarn start`).
    *   Use relative paths (e.g., `/gemini/getActivation`) in the API calls in your frontend code.
*   **Solution (Production):**
    *   Configure CORS on your backend. For `FastAPI`, this can be done using `CORSMiddleware`. Ensure your frontend URL is included in the list of allowed origins.

### 2. Authentication Errors 🔑

*   **Cause:**
    *   Incorrect Firebase configuration values (`REACT_APP_FIREBASE_*`) in the `.env` file.
    *   The Firebase app in the console is not configured correctly (e.g., incorrect authorized domains).
    *   The development server hasn't been restarted after changes in `.env`.
*   **Solution:**
    *   Double-check all Firebase keys and IDs in `.env` against the Firebase Console.
    *   Verify that `localhost` is an authorized domain under `Authentication > Settings > Authorized domains` in the Firebase Console for local development.
    *   Restart the development server (`npm start` or `yarn start`).

### 3. Build Errors 🧱

*   **Cause:**
    *   Syntax errors in `TypeScript` or `JSX` code.
    *   Missing packages (run `npm install` or `yarn install`).
    *   Incorrect `TypeScript` configuration (`tsconfig.json`).
    *   Problems with a specific loader or plugin in the build process.
*   **Solution:**
    *   Read the error message carefully in the terminal after running `npm run build` (or `yarn build`). It usually points out the file and line number.
    *   Fix syntax errors.
    *   Install any missing packages.
    *   Review `tsconfig.json` if the error is related to TypeScript types or configuration.

## 🌟 Next Steps

*   Implement the remaining pages and components according to the design specifications (e.g., profile page, exercise views, journal).
*   Develop unit tests for components and services using `Jest` and `React Testing Library`.
*   Enhance UI/UX with animations, loading indicators, and robust error handling.
*   Optimize performance through code splitting, lazy loading of components, and image optimization.

## 📬 Contact

If you have questions, find bugs, have suggestions for improvements, or want to contribute to the project, please create an issue in the project's GitHub repository: `joelkvarnsmyr/InnerJourney`.