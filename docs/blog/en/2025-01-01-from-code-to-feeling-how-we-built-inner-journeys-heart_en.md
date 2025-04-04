# Can AI Feel? 🤖❤️

Hi Inner Journey friends! 👋

Imagine a line of code suddenly saying “Hi” and starting to guide you – that’s roughly what happened when we tested Inner Journey’s first MVP (Minimum Viable Product). It was late one evening in March, the coffee had gone cold ☕, and we had just connected Google `Gemini` to our backend.

When we ran the `/gemini/getActivation` endpoint and got back a response that read: *"Take three deep breaths and set an intention for the day"*, we just sat there silently for a moment. It wasn't just technology anymore – it was something that felt alive and meaningful ✨.

Here’s the story of how we went from pure code to a feeling and started building the heart of Inner Journey.

## 🚀 A Technical Journey Becomes Personal

It all started with some fundamental technical decisions to build a stable and scalable platform:

-   🐍 **Backend:** We chose `FastAPI` (Python) for its speed and simplicity in developing APIs.
-   ⚛️ **Frontend:** `React` with `TypeScript` was chosen to create a robust and typed codebase, facilitating maintenance and future development.
-   🔥 **Infrastructure:** `Firebase` became the hub that smoothly connects `Authentication` (for secure user management) and `Firestore` (for flexible data storage).

It might sound like a technical soup, but for us, these were the building blocks for something bigger. We wanted to create a platform that doesn't just work – but one that *understands* you on a deeper level.

When we deployed the first version to Google `Cloud Run` ☁️ (for the backend) and `Firebase Hosting` 🌐 (for the frontend), it was like bringing an idea to life. But it wasn't until we tested the `Gemini` integration that we truly realized the potential.

Feeding a mood and a goal via the `/gemini/getActivation` endpoint and getting back a personal insight – it was like hearing Inner Journey speak for the first time. Suddenly, it wasn't just code and algorithms; it was a digital compass for personal development 🧭.

## 💪 Challenges and Triumphs

The journey wasn't always straightforward. We wrestled with tricky `CORS` (Cross-Origin Resource Sharing) issues between the frontend and backend, forgot an important API key in `Secret Manager` on one occasion (oops! 🔑), and spent some long nights trying to get an external astrology service (`VedAstro`) to run stably on `Google Cloud Engine` (even though it's not a core part of the platform right now).

But every bug we fixed and every API endpoint we polished – like the central `/gemini/getActivation` – brought us closer to the goal: a platform that feels like a supportive friend, not just an app 🎯.

And then came the triumph. When we could log in with `Firebase Authentication`, input our own data (mood and goals), and see the platform respond with something that actually felt relevant and helpful – that's when we knew we were on the right track. It wasn't just technology anymore – it was a feeling that we could make a real difference. ❤️

## 🤔 What Comes Next?

We are far from finished, the journey has just begun! Right now, we are considering the next exciting steps to make Inner Journey even more valuable for you:

-   🤖 Perhaps a smarter AI that can match you with the right coach based on your unique needs and goals?
-   📝 Or a more dynamic journaling feature that suggests relevant reflection questions based on your mood or the exercises you recently completed?

The heart of Inner Journey is beating, and we want it to beat even stronger for you, our users.

What do you think – what do you want technology to do for *your* journey? Send your ideas and thoughts to [kontakt@innerjourney.se](mailto:kontakt@innerjourney.se) – we're building this together! 🤝

With code and feeling,
Team Inner Journey 💻❤️