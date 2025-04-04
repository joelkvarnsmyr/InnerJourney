
# ✨ Onboarding R2: Vision and Flow

## 📄 Document Information

*   **Version:** 1.0 (Vision), 2.0 (Technical Process)
*   **Date:** `2025-03-25`
*   **Author:** Bo Joel Kvarnsmyr
*   **Last revised by:** Bo Joel Kvarnsmyr

## 🌟 Vision and Purpose

### Vision 🔭

The onboarding process for InnerJourney is designed to be a **transformative and engaging introduction** that sets the tone for the user's journey towards self-discovery and personal development.

Our vision is to create an experience that feels **intuitive, safe, and personal**, where every user feels seen and understood from the very first moment. By combining advanced technology (like `AI` and `astrological insights`) with an empathetic and natural interaction, we aim to build a bridge between the user's inner world and the tools and missions that can help them grow. 🌱

### Purpose 🎯

The purpose of the onboarding is to:

1.  🤝 **Create a personal connection:** By collecting basic data (`birth details`) and using voice-based questions to understand the user's personality, preferences, and well-being markers, we can create a profile that makes the user feel seen and understood.
2.  🎨 **Personalize the experience:** Use the profile to customize missions, coaching, and recommendations, so that each user receives a journey that is tailored to their unique needs, experience level, and spiritual development.
3.  🛡️ **Build trust:** Through a safe and empathetic interaction with an AI agent, who asks questions in a natural and non-judgmental way, we want to establish trust and encourage the user to continue their journey with InnerJourney.
4.  🩺 **Identify needs:** Detect tendencies for depression, suicide, ADHD, autism, or similar, as well as assess the user's experience with spiritual practices (e.g., meditation, breathwork) and level of awakening, to provide the right support and resources.

### Core Values ❤️

*   💖 **Empathy:** The onboarding should feel warm, inviting, and non-judgmental.
*   👤 **Personalization:** Each user's journey should be unique and customized.
*   ✅ **Simplicity:** The process should be intuitive and free from unnecessary obstacles.
*   🔍 **Transparency:** The user should never feel that anything is hidden or manipulative.

## 🗺️ Overview of Phases

The onboarding process consists of the following main phases:

1.  🎂 **Collection of basic data:** The user enters their birth date, time, and location via simple forms.
2.  📞 **Phone Verification:** The user verifies their account via a phone call where an AI agent reads a code aloud.
3.  🗣️ **Voice-based Profiling:** In the same call, the AI agent asks personal questions and follow-up questions to create a verified personality profile, including experience with spiritual practices and level of awakening.
4.  🎯 **Assignment of the first mission:** Based on the profile, the user is assigned a first mission, adapted to their level and needs.

> ℹ️ For an intermediate overview of the process, see the document `Onboarding-process`. For a detailed description of the steps, see the section below.

## 🚀 Detailed Onboarding Flow

This section provides a detailed description of each step in the InnerJourney onboarding, including user experience and technical details.

### Step 1: Enter Birth Date 📅

**👤 User Experience:**

*   The user lands on the start page (`/`) at `innerjourney.kvarnsmyr.se`.
*   A form is displayed immediately to fill in the birth date (format: `DD/MM/YYYY`).
*   After filling it in, the user clicks the "Begin" button to proceed.
*   *Side note (login):* Clicking the logo displays a login view (`/login`) for existing users.

**💡 Technical:**

*   **Frontend:**
    *   The route `/` renders the `BirthDatePage.tsx` component (built with `React`, `TypeScript`, `Chakra UI`).
    *   The form uses `react-input-mask` for date formatting.
    *   The "Begin" button is activated when a valid date has been entered (local validation).
    *   No API calls are made in this step.
    *   Upon clicking "Begin", the user is navigated to the route `/birth-time` (Step 2).
    *   *Side note (login):* Clicking the logo navigates to `/login` (the `LoginPage.tsx` component) which uses `Firebase Authentication`.
*   **Backend:** No calls.
*   **Firebase:** `Firebase Authentication` is configured in `firebase.ts`, but is only used for login via the logo click at this stage.

### Step 2: Enter Birth Time ⏰

**👤 User Experience:**

*   The user is navigated to the `/birth-time` page.
*   A form is displayed with two dropdown menus: one for the hour (00–23) and one for the minute (00–59).
*   The user selects the time and clicks the "Next" button.

**💡 Technical:**

*   **Frontend:**
    *   The route `/birth-time` renders the `BirthTimePage.tsx` component (`React`, `TypeScript`, `Chakra UI`).
    *   The dropdown menus are implemented with the `<Select>` component from `Chakra UI`.
    *   Birth date from Step 1 is temporarily saved in `SessionContext.tsx`.
    *   The "Next" button is always active after a selection has been made.
    *   Upon clicking "Next", the user is navigated to the route `/birth-location` (Step 3).
    *   No API calls are made in this step.
*   **Backend:** No calls.
*   **Firebase:** No authentication is required in this step.

### Step 3: Enter Birth Location 📍

**👤 User Experience:**

*   The user is navigated to the `/birth-location` page.
*   A form is displayed with a text field to enter the birth location (e.g., "Stockholm, Sweden").
*   An autocomplete function suggests valid cities as the user types.
*   The user selects a location from the suggestions and clicks "Confirm".

**💡 Technical:**

*   **Frontend:**
    *   The route `/birth-location` renders the `BirthLocationPage.tsx` component (`React`, `TypeScript`, `Chakra UI`).
    *   The text field (`<Input>`) is integrated with `react-places-autocomplete` (or an equivalent `Google Places API` integration).
    *   Upon selecting a location, the location name and coordinates are temporarily saved in `SessionContext.tsx`, along with data from previous steps (date and time).
    *   The "Confirm" button is activated when a valid location has been selected.
    *   Upon clicking "Confirm", the user is navigated to the route `/verify` (Step 4).
    *   No API calls are made in this step.
*   **Backend:** No calls.
*   **Firebase:** No authentication is required in this step.

### Step 4: Phone Verification 📞

**👤 User Experience:**

*   The user is navigated to the `/verify` page.
*   A clickable phone number (e.g., `+46701234567`) is displayed, formatted as an `href="tel:..."` link.
*   A text field is displayed where the user should enter a verification code.
*   The user calls the provided number. An AI agent answers: "Your call is expected." and then asks "I will give you a code to enter into your browser, are you ready to do that?".
*   Upon confirmation (e.g., by saying "Yes"), the agent reads the code aloud (e.g., "123456").
*   The user enters the spoken code into the text field on the web page and clicks "Verify".

**💡 Technical:**

*   **Frontend:**
    *   The route `/verify` renders the `VerificationPage.tsx` component (`React`, `TypeScript`, `Chakra UI`).
    *   On page load, 3 API calls are made to the backend:
        1.  **`/init-birthdata`**:
            ```text
            - Request Body: { birth_date, birth_time, birth_location }
            - Response Body: { session_id: "abc123" }
            - Purpose: Save birth data in Firestore (the `sessions` collection).
            ```
        2.  **`/astro-data`**:
            ```text
            - Request Body: { birth_date, birth_time, birth_location }
            - Response Body: { /* Astrological data (planets, houses etc.) */ }
            - Purpose: Fetch and save astro data in Firestore (e.g., `users/abc123/astroData`).
            ```
        3.  **`/get-verification-number`**:
            ```text
            - Request Body: { session_id: "abc123", country: "SE" }
            - Response Body: { phone_number: "+46701234567" }
            - Purpose: Get verification number and initiate code generation on the backend.
            ```
    *   The phone number from `/get-verification-number` is displayed as a clickable `<a>` link. An `<Input>` field is displayed for the code.
    *   The returned `session_id` is saved in `SessionContext.tsx`.
    *   Upon clicking "Verify", an API call is made to `/phone/verify`:
        ```text
        - Request Body: { session_id: "abc123", verification_code: "123456" }
        - Response Body: { status: "SUCCESS" }
        - Purpose: Verify the code and link the phone number to the user.
        ```
    *   If the verification succeeds (`status === "SUCCESS"`), the user is navigated to `/profile-questions` (Step 5).

*   **Backend:**
    *   Endpoint `/init-birthdata`: Saves received data in `Firestore` under `sessions/{session_id}`.
    *   Endpoint `/astro-data`: Calls the external `VedAstro API`, processes the response, and saves the result in `Firestore` under `users/{session_id}/astroData`.
    *   Endpoint `/get-verification-number`: Returns a phone number (e.g., via `Sinch`), generates a verification code, and saves it (hashed) in `Firestore` under `sessions/{session_id}/verificationCode`. Initiates expectation of an incoming call.
    *   Call Handling: Incoming calls are assigned via `Sinch Voice API` to a `Dialogflow CX` flow.
    *   Endpoint `/phone/verify`: Verifies the submitted code against the stored code for `session_id`. If correct, the calling number (from the call information) is linked to the user in `Firestore` (e.g., `users/{session_id}/phoneNumber`).

*   **Firebase:**
    *   `sessions` collection: Stores temporary session data (birth data, verification code). Can be cleared after a certain time.
    *   `users` collection: Stores permanent user data (astro data, phone number after verification). `session_id` becomes the user's initial ID.

### Step 5: Voice-based Profiling 🗣️

**👤 User Experience:**

*   The user is navigated to the `/profile-questions` page.
*   Text on the screen updates to show status: "Verification under progress..." -> "Call under progress...".
*   The phone call continues immediately after verification. The AI agent says: "Thank you for verifying. Now, let's get to know you. Answer naturally, and I'll guide you through some questions to understand you better."
*   The agent asks approximately 10 personal questions. These are based on the user's astrological data but presented as neutral statements or questions (e.g., "Is it true that you feel safe in familiar environments, or do you prefer exploring new places?").
*   Dynamic follow-up questions can be asked based on the user's answers.
*   Specific questions are also asked to assess:
    *   **Spiritual experience:** (e.g., "Do you practice meditation or breathwork regularly?")
    *   **Level of awakening:** (e.g., "Do you feel you have a deep understanding of yourself and your place in the world?")
*   After each answer, the agent gives a brief confirmation (e.g., "Interesting, thank you.").
*   The web page does not update with questions/answers during the call (only the status indicator is visible). The answers are transcribed in the background.
*   When the AI agent has collected enough data, it ends the call: "Thank you for sharing, it's exactly like I thought. Are you ready for your first activation? I'll send it to your screen now. I wish you the best journey, good luck and goodbye."
*   While the agent is saying this, the first mission is loaded in the background, and the web page automatically navigates to Step 6 (`/activations`).

**🎯 Profiling Purpose & Goals:**

*   **Main Purpose:** Create a verified personality profile via a natural, voice-based Q&A session to personalize missions, coaching, and recommendations in InnerJourney. Also, identify tendencies related to well-being and spiritual development level.
*   **Primary Goal:** Understand the user's basic personality type, preferences, and emotional tendencies.
*   **Secondary Goal:** Identify potential tendencies for depression, suicidal thoughts, ADHD, autism, or similar to offer appropriate support (or flag for human follow-up if needed).
*   **Data to collect:**
    *   Personality traits (e.g., introvert/extrovert, intuitive/analytical).
    *   Stated preferences (e.g., `I prefer familiar settings`).
    *   Well-being markers (e.g., statements like `I often feel hopeless`).
    *   Information about spiritual experience and awakening level.
*   **Evaluation:** A language model (e.g., `BERT` or `GPT`, fine-tuned for the task) analyzes the transcribed text from the call to generate a structured profile. This profile is saved in `Firestore` with fields like `personalityType`, `neuroTendencies`, `wellbeingFlags`, `spiritualExperience`, `awakeningLevel`.
*   **Personalization:** The generated profile is then used to:
    *   Select relevant **missions** (e.g., if the user is introverted -> recommend "The Sound of You"; if extroverted -> recommend "Silent Eye Contact Live").
    *   Customize **coaching** (e.g., if `depressionRisk: true` -> match with a coach specialized in mental health).
    *   Provide tailored **recommendations** (e.g., if `adhdScore: 8` -> suggest short, focused mindfulness exercises).

**💡 Technical:**

*   **Frontend:**
    *   The route `/profile-questions` renders the `ProfileQuestionsPage.tsx` component (`React`, `TypeScript`, `Chakra UI`).
    *   Displays status indicator ("Verification under progress..." -> "Call under progress...").
    *   *Alternative 1 (Transcription in Frontend):* Uses `Web Speech API` (or similar library) to potentially capture and transcribe the user's answers locally.
    *   *Alternative 2 (Transcription in Backend/Dialogflow):* Frontend does nothing actively with the audio, relying on the backend/Dialogflow to handle transcription via the phone call. (This is more likely given the flow).
    *   If answers are sent continuously from Dialogflow to the backend via webhook:
        ```http
        # Webhook from Dialogflow to Backend (example)
        POST /webhook/save-answer
        - Request Body: { session_id, question_id, transcript_segment, timestamp }
        ```
    *   When the backend signals that the call is finished and profiling is complete (e.g., via `WebSocket` or polling), the frontend makes an API call to fetch the first mission:
        ```http
        GET /get-first-activation?session_id={session_id}
        ```
        (See Step 6 for details on this call).
    *   After receiving a response from `/get-first-activation`, automatic navigation to `/activations` (Step 6) occurs.

*   **Backend:**
    *   Generates a dynamic prompt for `Dialogflow CX` based on the user's `VedAstro` data (fetched in Step 4). The prompt contains the initial questions and logic for follow-up questions.
    *   Webhook Endpoint (e.g., `/webhook/save-answer`): Receives transcribed answers from `Dialogflow CX`, accumulates them, and (optionally) saves them in `Firestore` under `users/{session_id}/answers`.
    *   After `Dialogflow CX` signals that all questions have been answered:
        1.  Initiates analysis of the collected transcription with a language model (`BERT`/`GPT`).
        2.  Generates the structured user profile.
        3.  Saves the profile in `Firestore` under `users/{session_id}` (updating the existing document with fields like `personalityType`, `neuroTendencies`, etc.).
    *   Endpoint `/get-first-activation`: Used by the frontend to fetch the first mission. The logic selects a mission based on the newly generated profile in `Firestore`.

*   **Firebase:** The user's transcribed answers and the generated profile are stored in `Firestore` under `users/{session_id}`.
*   **Dialogflow CX:** Manages the call flow. Asks questions based on the dynamic prompt from the backend. Captures the user's answers, handles transcription, and sends data (transcription, call status) to the backend via webhooks.

### Step 6: First Mission and Start of the Journey 🌱

**👤 User Experience:**

*   Immediately after the AI agent ends the call in Step 5, the user's browser is automatically navigated to the `/activations` page.
*   The first customized mission is displayed on the screen. (Initially, during development/testing, this might be a fixed mission like "The Sound of You" for everyone).
*   Example display:
    *   **Title:** "Your First Task: The Sound of You"
    *   **Description:** "A reflective exercise to connect with your inner self through sound and mindfulness."
    *   **Button:** "Start Now" (with accent color `#00A676`).
*   Clicking the "Start Now" button initiates the mission itself (displays mission instructions, starts any timer or media player, etc.).

**💡 Technical:**

*   **Frontend:**
    *   The API call to `/get-first-activation` (triggered at the end of Step 5) returns mission details:
        ```json
        // GET /get-first-activation?session_id={session_id} Response Body
        {
          "id": "sound-of-you",
          "title": "The Sound of You",
          "description": "A reflective exercise to connect with your inner self through sound and mindfulness.",
          // ... other mission details
        }
        ```
    *   The route `/activations` renders the `ActivationsPage.tsx` component (`React`, `TypeScript`, `Chakra UI`).
    *   Displays the title, description, and "Start Now" button based on data from the API call.
    *   Upon clicking "Start Now":
        *   Navigates to a specific mission view (e.g., `/activations/sound-of-you`).
        *   The component for the specific mission is rendered.
        *   An API call can be made to mark the mission as started, e.g., `POST /mark-activation-started`.

*   **Backend:**
    *   Endpoint `/get-first-activation`: Fetches the user's profile from `Firestore`, selects a suitable first mission based on the profile's data (or returns the default mission), and returns the mission information.
    *   (Optional) Endpoint `/mark-activation-started`: Logs that the user has started a specific mission in `Firestore` (e.g., in a `userActivations` subcollection or by updating the status in `users/{session_id}`).

*   **Firebase:** The user's progress and status for missions are saved in `Firestore`, likely under `users/{session_id}` or a related subcollection.

## 📚 Next Steps and References

For planned improvements and further development of the onboarding process, see the following documents:

*   🔗 `Backlog 4: March 23, 2025`
*   🔗 `Development Plan: Inner Journey`

For more context and related information about the project and its components:

*   🔗 `Onboarding Vision` (The overall vision, less technical)
*   🔗 `Onboarding Process` (An intermediate, more process-oriented overview)
*   🔗 `Project Description: Inner Journey` (Overall project information)
*   🔗 `Technical Documentation for Backend` (Details about backend architecture and APIs)
*   🔗 `Technical Documentation for Frontend` (Details about frontend architecture and components)
*   🔗 `Database Structure` (Description of the Firestore data model, see `databasstruktur.md`)