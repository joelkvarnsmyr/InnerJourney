# Fast AI Prototype: Here's How 🚀

**📅 Date: March 20, 2025**

Hello again, Inner Journey gang! 👋

Remember when we said we were standing at the edge of a blank page? Well, now we've drawn the first lines – and suddenly our sketch has started to breathe! After two intense weeks since the start, we've gone from dreams to a first prototype of *Inner Journey*. But it's not without its growing pains.

Here's the journey so far – and a little surprise that made us cheer. 🎉

## From Chaos to Structure 🌪️➡️🏗️

Ten days ago, we wrote about our step into the unknown – a backend with `FastAPI`, tests with `Sinch` and `VedAstro`, and a vision of AI-driven insights. But we quickly realized we were trying to run before we could walk.

Backlog 1 (March 21) shows the chaos: `SSL certificates` fixed, `Google Cloud` up and running, but code sprawling in all directions. We had a `main.py` trying to do everything – from making calls to fetching astrology data. 😵‍💫

So we took a step back and restructured. We split the code into clear modules:

-   Routes ended up in `api/`
-   Services for business logic in `services/`
-   Data models in `models/`

We tested sending birth data (e.g., `"1990-05-15, 14:30, Stockholm"`) to `VedAstro` and got back responses like “Moon in the fourth house”. But instead of getting completely stuck in the details of astrology, we shifted focus: we wanted to use the data to provide *practical* insights.

That's why we connected Google `Gemini` 🤖 to transform the data into something useful. And this is where the exciting part happens.

## “Your Energy Is Peaking!” ✨

After wrestling with `API keys` and `CORS` issues (yes, we forgot to configure it correctly from the start 🤦), we finally ran a live test. We sent a mood (`"3 out of 5"`) and a goal (`"get more focus"`) to our new endpoint `/gemini/getActivation`.

The response we got back?

> “Your energy is peaking when you organize your day – try a short list now.”

For the first time, it felt like *Inner Journey* wasn't just code, but a voice that could actually guide the user. We cheered loudly in the office – and managed to spill coffee on a laptop in the process! 😅☕

## Growing Pains and Insights 🌱

The development journey so far has given us valuable lessons:

-   💡 **Modularity Is Our Savior**: Breaking out logic into separate files like `gemini_service.py` and `firebase_service.py` (which now saves results in `Firestore` 🔥) made the code much easier to manage and understand.
-   👤 **User Experience First**: We realized the original `DTMF` idea (touch-tones) was too complicated for the user. We switched to a simple form in the frontend instead – much smoother!
-   🧪 **Test Early and Often**: Backlog 3's warning about untested code turned out to be true. Problems piled up until we started testing each endpoint systematically with tools like `curl`, for example:

    ```bash
    curl -X POST "http://localhost:8080/gemini/getActivation" \
    -H "Content-Type: application/json" \
    -d '{"mood": 3, "goal": "get more focus"}'
    ```

## What Now? ➡️

The prototype is alive and breathing, but it's still in an early stage and quite fragile. The frontend is still a construction site – `React` ⚛️ and `Chakra UI` are implemented, but we only have a basic page so far.

The next important step is to get the frontend and backend communicating smoothly and then deploy the entire application to `Firebase Hosting` and `Cloud Run` ☁️.

We're on our way – and despite the challenges, it feels magical to see the vision take shape. ✨

What do you want to see next in *Inner Journey*? Do you have ideas or feedback? Write to us at [kontakt@innerjourney.se](mailto:kontakt@innerjourney.se)!

With coffee stains and continued enthusiasm, ☕
Team Inner Journey