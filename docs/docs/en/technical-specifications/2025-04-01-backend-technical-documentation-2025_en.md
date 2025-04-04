# ⚙️ Backend: Technical Documentation

The InnerJourney backend system is an API service developed with `FastAPI` in `Python` 🐍. Its primary purpose is to support the personal development platform by:

*   📥 Handling API calls from the frontend application.
*   🔥 Interacting with `Firebase Firestore` for data storage.
*   🤖 Utilizing `Google Gemini` to generate AI-driven insights and development steps.

The system is containerized with `Docker` 🐳 and deployed on `Google Cloud Run` ☁️, enabling good scalability and simplified management.

Below is a detailed walkthrough of the codebase, file by file, with descriptions of their purpose and how they interact.

## 🗂️ Codebase Overview

The codebase is structured around the following central files:

*   📄 `main.py`: Initializes and starts the FastAPI application and includes necessary routers (e.g., for Gemini).
*   📄 `gemini_service.py`: Responsible for communication with the Google Gemini API to generate content.
*   📄 `firebase_service.py`: Handles all interaction with the `Firebase Firestore` 🔥 database (Detailed code was missing in the original description, but the file's existence and purpose are assumed).
*   📄 `gemini.py`: Defines the API endpoints specific to Gemini functionality, for example, `/gemini/getActivation`.
*   📄 `activation.py`: Contains Pydantic models used for data validation and serialization of API requests and responses.
*   🐳 `Dockerfile`: Contains the instructions for building the Docker image for the backend service.
*   📜 `requirements.txt`: Lists all Python dependencies required for the project.

## 📄 File-by-File Description

Each key file in the backend project is described in more detail here.

### `main.py`

**🎯 Purpose:** This is the main file responsible for initializing the FastAPI application, configuring basic routing, and starting the web server.

**Contents:**

*   Imports necessary libraries: `FastAPI`, `uvicorn`, and specific routers, e.g., the Gemini router from `backend.routes.gemini`.
*   Creates an instance of `FastAPI`, usually named `app`.
*   Includes defined API routers (like the Gemini router) using `app.include_router(gemini.router)`.
*   Defines a simple root endpoint (`GET /`) that returns a welcome message, e.g., `{"message": "Welcome to InnerJourney Backend"}`.
*   Retrieves the port number from the `PORT` environment variable, with a default value (often `8080`).
*   Starts the server using `uvicorn` and configures it to listen on `host="0.0.0.0"`.

**💡 Important:** Setting `host="0.0.0.0"` is crucial for making the server accessible outside its own container, which is necessary in environments like `Docker` and `Google Cloud Run`.

### `gemini_service.py`

**🎯 Purpose:** This service handles all logic for interacting with the `Google Gemini API` 🤖. It receives input (e.g., user's mood and goal) and uses Gemini to generate relevant, personalized development steps.

**Contents:**

*   Imports necessary libraries, including `google.cloud.secretmanager` for securely fetching API keys and `google.generativeai` for Gemini interaction.
*   Implements logging using the `logging` library to track operations and debug.
*   Contains a function, `get_secret`, to securely retrieve secrets (like the Gemini API key) from `Google Cloud Secret Manager` 🔑.
*   Configures the `genai` library (`google.generativeai`) with the retrieved API key.
*   Initializes a specific Gemini model, e.g., `GenerativeModel("gemini-1.5-pro-latest")`.
*   The main function, `generate_activation`, receives parameters like `mood` (`int`) and `goal` (`str`). It creates a prompt based on these and then calls the Gemini model.
*   Returns the response from Gemini, usually in JSON format.
*   **🐞 Error Handling:** Includes a fallback mechanism. If the call to Gemini fails, a predefined mock response (e.g., `{"title": "Mock Step", "description": "This is a mock step..."}`) is returned to ensure the application does not crash.

### `firebase_service.py`

**🎯 Purpose:** This service centralizes all interaction with `Firebase Firestore` 🔥. It is responsible for saving, retrieving, and potentially updating data in the database.

**Contents:** *(Based on assumptions, as specific code was missing in the original description)*

*   Expected to contain functions like `save_to_firestore` that receive data (e.g., a generated "activation") and store it in an appropriate `Firestore` collection.
*   Likely initializes the Firebase Admin SDK on startup, with credentials securely retrieved from `Google Cloud Secret Manager` 🔑.
*   **🔒 Security:** Uses `Google Cloud Secret Manager` to handle sensitive Firebase credentials and avoid hardcoding them.

### `gemini.py`

**🎯 Purpose:** This file defines the specific API endpoints (routes) related to the Gemini functionality, connecting incoming calls with the logic in `gemini_service.py` and `firebase_service.py`.

**Contents:**

*   Creates an `APIRouter` instance from FastAPI, often with a prefix like `/gemini` to group related endpoints.
*   Defines a `POST` endpoint, e.g., `/gemini/getActivation`:
    *   Receives data in the request body, validated against the `ActivationRequest` Pydantic model.
    *   Calls the `generate_activation` function in `gemini_service.py` with input from the request.
    *   Parses the JSON response returned from `gemini_service.py`.
    *   Calls the `save_to_firestore` function in `firebase_service.py` to save the generated result.
    *   Returns a response to the client, formatted according to the `ActivationResponse` Pydantic model, containing fields like `title`, `description`, and `activation_id`.
*   **🐞 Error Handling:** Implements `try-except` blocks to handle potential errors, such as JSON parsing errors or issues when interacting with external services. Logs errors and returns meaningful HTTP error codes and messages to the client.

### `activation.py`

**🎯 Purpose:** Contains data models defined with `Pydantic`. These models are used by FastAPI for automatic data validation of incoming requests and for serialization (formatting) of outgoing responses.

**Contents:**

*   `ActivationRequest`: Defines the expected structure and data types for the JSON data sent to the `/gemini/getActivation` endpoint. Typical fields are `mood` (of type `int`) and `goal` (of type `str`).
*   `ActivationResponse`: Defines the structure and data types for the JSON response sent back from `/gemini/getActivation`. Typical fields are `title` (of type `str`), `description` (of type `str`), and `activation_id` (of type `str`).

### `Dockerfile` 🐳

**🎯 Purpose:** This file contains instructions for `Docker` to build a container image 🐳 that includes the backend application and all its dependencies.

**Contents:**

```dockerfile title="Dockerfile"
# Specifies a base image
FROM python:3.10-slim

# Sets a working directory inside the container
WORKDIR /app

# Copies requirements.txt to the working directory
COPY requirements.txt /app/

# Installs Python dependencies specified in requirements.txt using pip
RUN pip install --no-cache-dir -r requirements.txt

# Copies the rest of the application code to the working directory
COPY . /app

# Exposes the port the application will listen on inside the container
EXPOSE 8080

# Defines the startup command for the application
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8080"]
```

### `requirements.txt` 📜

**🎯 Purpose:** Lists all external Python packages 🐍 that the project needs to function. `pip` uses this file to install the dependencies.

**Key packages typically include:**

*   `fastapi`: The core framework for building the API.
*   `uvicorn[standard]`: ASGI server for running the FastAPI application.
*   `google-generativeai`: Client library for interacting with the Google Gemini API 🤖.
*   `google-cloud-secret-manager`: For securely retrieving secrets from Google Cloud 🔑.
*   `firebase-admin`: For interacting with Firebase services like `Firestore` 🔥.
*   `pydantic`: For data validation and modeling.

## 💻 Testing Locally

Follow these steps to run and test the backend service on your local development machine:

### 1. Clone the Project 📥

Clone the repository and navigate to the backend directory:

```bash
git clone git@github.com:joelkvarnsmyr/InnerJourney.git
cd InnerJourney/backend
```

### 2. Create and Activate a Virtual Environment 🐍📦

It is highly recommended to use a virtual environment to isolate the project's dependencies.

```bash
# Create the environment (use your Python 3.10+ installation)
python3.10 -m venv venv

# Activate the environment
# On macOS/Linux:
source venv/bin/activate
# On Windows (cmd/powershell):
.\venv\Scripts\activate
```

### 3. Install Dependencies 📜

With the virtual environment activated, install the packages from `requirements.txt`:

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables 🔑

Some parts of the code (e.g., connecting to Google Cloud services) may require environment variables.

1.  Create a file named `.env` in the `backend` directory.
2.  Add necessary variables, e.g., the path to your Google Cloud credentials:

    ```dotenv title=".env"
    GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/keyfile.json"
    # Potentially other variables like GEMINI_API_KEY if not retrieved via Secret Manager locally
    ```
3.  *Note:* `FastAPI` or `uvicorn` do not automatically read `.env` files. You might need to load them in your code (e.g., using `python-dotenv`) or set them in your terminal session before starting.

### 5. Start the Server ▶️

Run `uvicorn` to start the development server:

```bash
uvicorn backend.main:app --host 0.0.0.0 --port 8080 --reload
```

*   🔄 The `--reload` flag makes the server automatically restart when you save changes to the code, which is very useful during development.

### 6. Test the API ✅

Use a tool like `curl`, Postman, or Insomnia to send a `POST` request to your locally running service:

```bash
curl -X POST "http://localhost:8080/gemini/getActivation" \
-H "Content-Type: application/json" \
-d '{"mood": 2, "goal": "komma igång"}'
```

You should receive a JSON response back from the API.

## 🐳 Building and Running with Docker

Here's how to build a Docker image and run the backend service in an isolated container environment:

### 1. Build the Docker Image 🛠️

Make sure you have Docker installed and running. Navigate to the `backend` directory in your terminal and run the build command:

```bash
docker build -t innerjourney-backend .
```

*   🏷️ The command uses the instructions in the `Dockerfile` to build an image and gives it the name (tag) `innerjourney-backend`. The dot `.` indicates that the build context is the current directory.

### 2. Run the Container ▶️

Start a container based on the newly built image:

```bash
docker run -p 8080:8080 -e PORT=8080 --env-file .env innerjourney-backend
```

*   🔗 `-p 8080:8080`: Maps port `8080` on your local machine (host) to port `8080` inside the container, where `uvicorn` is listening.
*   🔧 `-e PORT=8080`: Sets the `PORT` environment variable inside the container to `8080`, matching the value expected by `main.py` and exposed by the `Dockerfile`.
*   🔑 `--env-file .env`: (Optional but often necessary) Loads environment variables from your local `.env` file into the container. Ensure that paths like `GOOGLE_APPLICATION_CREDENTIALS` are valid *inside* the container or mount the file as a volume if needed.

### 3. Test the API ✅

The API should now be accessible at `http://localhost:8080` via the Docker container. You can test it in the exact same way as in the local test (step 6 above) using `curl` or another tool.

## ☁️🚀 Deployment to Google Cloud Run

Follow these steps to deploy your containerized backend service to `Google Cloud Run`, a fully managed serverless platform.

### 1. Authenticate with Google Cloud 🔑

Make sure you have the `gcloud` CLI (the command-line tool for Google Cloud) installed and configured.

```bash
# Log in to your Google Cloud account
gcloud auth login

# Set your default project (replace with your project ID)
gcloud config set project innerjourney-c007e
```

### 2. Build and Push to Artifact Registry (or GCR) 🏗️➡️☁️

`Cloud Run` needs to fetch your container image from a container registry. Google recommends `Artifact Registry`.

1.  **Configure Docker authentication:**
    ```bash
    # Adjust [REGION] to your Artifact Registry region, e.g., europe-west1
    gcloud auth configure-docker europe-west1-docker.pkg.dev
    ```

2.  **Build and tag the image:**
    ```bash
    # Adjust REGION, PROJECT_ID, REPO_NAME
    # Example with Artifact Registry:
    docker build -t europe-west1-docker.pkg.dev/innerjourney-c007e/innerjourney-repo/innerjourney-backend:latest .

    # Alternative GCR tag:
    # docker build -t gcr.io/innerjourney-c007e/innerjourney-backend:latest .
    ```

3.  **Push the image to the registry:**
    ```bash
    # Adjust REGION, PROJECT_ID, REPO_NAME
    # Example with Artifact Registry:
    docker push europe-west1-docker.pkg.dev/innerjourney-c007e/innerjourney-repo/innerjourney-backend:latest

    # Alternative GCR push:
    # docker push gcr.io/innerjourney-c007e/innerjourney-backend:latest
    ```

### 3. Deploy to Cloud Run 🚀

Use `gcloud` to deploy your image to `Cloud Run`.

```bash
# Replace [IMAGE_PATH], [REGION], [SERVICE_ACCOUNT_EMAIL], [PROJECT_ID], [SECRET_NAME] with your values
gcloud run deploy innerjourney-backend \
  --image [IMAGE_PATH] \
  --platform managed \
  --region [REGION] \
  --allow-unauthenticated \
  --service-account=[SERVICE_ACCOUNT_EMAIL] \
  --set-secrets=GEMINI_API_KEY=projects/[PROJECT_ID]/secrets/[SECRET_NAME]:latest
```

*   🖼️ `--image`: Specify the full path to your container image in the registry (e.g., `europe-west1-docker.pkg.dev/innerjourney-c007e/innerjourney-repo/innerjourney-backend:latest`).
*   ⚙️ `--platform managed`: Specifies that you are using the fully managed `Cloud Run` environment.
*   📍 `--region`: Specify the Google Cloud region where the service should run (e.g., `europe-west1`).
*   🌐 `--allow-unauthenticated`: Allows the service to be invoked publicly without IAM authentication. **⚠️ Review your security needs!** For internal APIs, you should use `--no-allow-unauthenticated` and configure IAM or Identity Platform/Firebase Auth.
*   👤 `--service-account`: **Highly recommended!** Specify the specific service account that your `Cloud Run` service should run as. This account needs permissions for other Google Cloud services, like `Secret Manager` and `Firestore`.
*   🔑 `--set-secrets`: (Optional but recommended) Mounts secrets from `Secret Manager` as environment variables. This is more secure than using `--set-env-vars` for sensitive data. Adjust the key (`GEMINI_API_KEY`), project ID (`[PROJECT_ID]`), and secret name (`[SECRET_NAME]`).

### 4. Test the Deployed Service ✅

After the deployment is complete (it might take a minute), the `gcloud` command will print the URL of your newly deployed `Cloud Run` service. Use this URL to test the API:

```bash
# Replace [YOUR-CLOUD-RUN-URL] with the actual URL
curl -X POST "https://[YOUR-CLOUD-RUN-URL]/gemini/getActivation" \
-H "Content-Type: application/json" \
-d '{"mood": 2, "goal": "komma igång"}'
```

## 📝 Additional Comments

*   🔒 **Security:** Handling sensitive information like API keys and database credentials should *always* be done via a secure mechanism like `Google Cloud Secret Manager` 🔑. Avoid storing these directly in the code, configuration files, or the Docker image.
*   🐞 **Error Handling and Logging:** Basic error handling (like the fallback for Gemini) and logging are implemented. `Cloud Run` automatically integrates with `Google Cloud Logging`, which facilitates troubleshooting in the production environment.
*   ❓ **Assumptions about `firebase_service.py`:** This documentation assumes that `firebase_service.py` contains the necessary logic to connect to and interact with `Firebase Firestore` 🔥, even though the specific code was not available in the original source.
--- END TEXT ---