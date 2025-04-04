# Building an AI Prototype: How We Did It ✨

**📅 Date: March 31, 2025**

Hello Inner Journey friends! 👋

Imagine writing a letter to your future self – filling it with dreams, plans, and a pinch of courage – and then, one day, you get a reply. That's how it feels right now. A month ago, we kicked off *Inner Journey* with grand visions of a platform for self-development. 💡

Today, on `March 30, 2025`, we have a first prototype that doesn't just exist – it works! 🚀

Here's the story of how we took our ideas from the whiteboard to the web, with a little hook that made us realize: this is real.

## “Hello, Welcome To Your Journey!” 💬

After weeks of coding, deploying, and coffee drinking ☕, we ran a test the day before yesterday. We logged into our frontend, entered birth data (just for fun: `"1990-05-15, 14:30, Stockholm"`), and clicked “Send”.

A second later, a message appeared from our backend via the API endpoint `/gemini/getActivation`: *"Hello, welcome to your journey! Your next step is to take three deep breaths and set an intention for the day."*

It was as if the app reached out a hand and said, “I see you.” We sat silent for a moment – then we burst into laughter and applause. The prototype is alive! 🎉

## The Journey So Far: From Choice to Reality 🛤️

### 💻 The Tech Takes Shape

Right from the start, we knew we wanted a fast and scalable foundation. We chose:

-   🐍 **Backend:** `FastAPI` – it's like Python on steroids for APIs.
-   ⚛️ **Frontend:** `React` with `TypeScript` – to keep the code safe and future-proof.
-   🔥 **Services:** `Firebase` became our best friend for both authentication (`Firebase Authentication`) and data storage with `Firestore`.
-   ☁️ **Hosting:** We parked everything in the Google Cloud: `Cloud Run` for the backend and `Firebase Hosting` for the frontend.

Why? Because it's smooth, scalable, and plays well together.

### 🌱 Simplicity Over Ambition

Our initial plan for `onboarding` was grand – birth data, phone verification with voice, multi-step GDPR consents. But we realized we needed to get out of the starting blocks faster.

So we scaled down: now it's just login/registration via `Firebase Authentication` and a simple form for birth data. This gives us a prototype we can test with you, and then build upon based on your feedback. 🙏

### ❤️ Backend: The Heart Starts Beating

On the backend side, we've built an engine that's ticking. The `/gemini/getActivation` endpoint is the star – it takes your mood and goals, talks to `Google Gemini` 🤖, and spits out a personalized step, which is then (planned) saved in `Firestore`.

We've secured everything with `Google Cloud Secret Manager` 🔑 for keys and deployed the whole thing to `Cloud Run` using `Docker` 🐳. The result? A public URL – `https://innerjourney-backend-975065734812.europe-west1.run.app` – that's ready for you!

### 🖥️ Frontend: The Face to the World

The frontend is still young, but it stands on its own feet. We have pages like:

-   `HomePage.tsx`: Where you can enter birth data.
-   `LoginPage.tsx` & `RegisterPage.tsx`: For logging in or registering.

With `react-router-dom` you jump between them, and `Chakra UI` makes it look good and responsive. `AuthContext.tsx` keeps track of who you are, and soon we'll connect more API calls via `api.ts`. It's ready to be deployed to `Firebase Hosting` – just an `npm run build` and `firebase deploy` away!

### 🐙 Git: Our Time Machine

All the code lives in our Git repo at `https://github.com/joelkvarnsmyr/InnerJourney`, divided into `backend/` and `frontend/`. We've cleaned up with a `.gitignore` (goodbye, `node_modules`!) and renamed the main branch to `main` to keep up with the times. Every step is saved, so we can always roll back if something goes wrong. 💾

## 🤔 What We've Learned

-   ⚡ **Speed Beats Perfection:** Simplifying onboarding was a winning move – we get something out *now* and can grow later.
-   ☁️ **The Cloud Is Magic:** `Cloud Run` and `Firebase Hosting` make deployment a dance, not a struggle.
-   🤝 **Teamwork Makes the Dream Work:** From chaotic backlogs to a runnable prototype – we've found our rhythm together.

## 🚀 Next Steps: To the Skies!

We're not done – far from it. The frontend needs to be deployed to `Firebase Hosting` (just a command away!), and we need to connect more `API calls` so that birth data and insights flow smoothly. Then we want to add `phone verification` and pages to show what you've saved.

But right now? We have a prototype that says “Hello” – and that's a start we're proud of. 😊

What do you want to see in the next version? Get in touch at [kontakt@innerjourney.se](mailto:kontakt@innerjourney.se) – your voice shapes the journey!

With joy and code,
Team Inner Journey 🌟