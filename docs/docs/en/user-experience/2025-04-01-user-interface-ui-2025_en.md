# User Interface (UI) 🎨

This document describes the User Interface (UI) for Inner Journey. The design aims for a modern, fresh look inspired by apps like `Activations` and `Headspace`, integrating sleek animations via `GSAP` to create a dynamic and engaging user experience, while maintaining the original design principles.

*   **Version:** 4.1
*   **Date:** 2025-03-31
*   **Author:** Bo Joel Kvarnsmyr
*   **Last revised by:** Bo Joel Kvarnsmyr

## Purpose ✨

The Graphical User Interface (GUI/UI) for `Inner Journey` is designed to be an extension of the platform's core value: a practical, engaging, and personal self-development experience.

The goal is to create a minimalist, intuitive, and flexible design that makes it easy for users to navigate and focus on their journey, while feeling modern and fresh.

For a broader overview of Inner Journey's vision, see [Project Description: Inner Journey](/docs/project/projektbeskrivning-2025).

## Design Principles 📐

*   🧹 **Minimalism:** Clean layout focused on functionality. No unnecessary decorations, but subtle gradients and soft shadows can be used to add depth, inspired by `Activations` and `Headspace`.
*   ⚙️ **Adaptability:** The UI can shift style – from a light, airy design to a dark, technical look – depending on the user's needs or profile.
*   🎯 **Clarity:** The user should quickly understand the next step, whether it's starting an exercise, logging a reflection, or navigating the app.
*   🔮 **Subtle Mystique:** A hint of intrigue (e.g., through dynamic text like `"Processing your input..."` or progressive feature unlocking) enhanced with smooth animations to create a sense of movement and life.
*   ⚖️ **Balance:** Combination of structure and airiness, with a modern touch through rounded corners, gradients, and subtle animations to avoid both dullness and overwhelming complexity.

## Visual Elements 🖌️

### Colors 🎨

*   **Base Colors:** Inspired by `Activations` and `Headspace`:
    *   Light blue background (`#E6F0FA`) as the default for "Light Mode".
    *   Deep, dark blue (`#1A2A44`) for "Dark Mode".
*   **Accent Colors:** 🔥
    *   A warm gradient (e.g., from `#FF6F61` to `#FF9F43`, similar to `Activations`) for buttons, icons, and progress.
    *   Alternatively, a muted green (`#00A676`) for a more subtle feel. 🌿
*   **Themes:**
    *   ☀️ **Light Mode:** Light blue background, white cards (`#FFFFFF`) with soft shadows, and gradient accents.
    *   🌙 **Dark Mode:** Dark blue background, dark grey cards (`#2A3B5A`), and the same gradient accents for contrast.

### Fonts 📰

*   **Headings:** Use a modern sans-serif like `Inter Bold` (700) (often used by `Headspace`) for a clean and contemporary feel.
*   **Body Text:** `Inter Regular` (400) – easy to read and modern, with an airy feel suitable for self-development apps.
*   **Sizes:** `18pt` for headings, `14pt` for body text, `10pt` for secondary text (e.g., footnotes or status messages).

### Icons & Graphics ✨

*   **Icons:** Continue with simple, line-based icons in a monochrome style (e.g., from Google's `Material Icons`), but add a subtle gradient fill (e.g., `#FF6F61` to `#FF9F43`) for icons that are in focus, to match the `Activations` aesthetic.
*   **Graphics:** Small, abstract shapes (circles, soft lines) can be used as background elements, similar to `Headspace`, to provide a playful yet minimalist feel.

## Structure & Layouts 🧱

### Home Page 🏠

*   Simple view with a clear call to action, e.g., `"Start Your Journey"` or `"Continue"`, on a card with a soft gradient (`#FF6F61` to `#FF9F43`).
*   Subtle animation (e.g., text typing out step-by-step: `"> Loading your profile..."`) using `GSAP` to give a sense of progression. ⏳
*   Minimal navigation: five icons in a fixed bottom menu (Home, Exercises, Log, Social, Profile) with a subtle scaling animation on hover/tap. 👆

### Onboarding 🚀

*   Step-by-step process inspired by `Typeform`: one step per screen (e.g., `"Enter birth date"`, `"Verify phone"`).
*   Use `GSAP` to animate transitions between steps (e.g., a soft fade-in and slide-up for each new step).
*   Background with a subtle gradient and small, floating circles (like in `Activations`) animated slowly with `GSAP` to create a dynamic feel. 💧
*   Thin progress bar in the accent color that fills up with a smooth animation. 📈

### Exercises 🧘

*   Card-like layout for each exercise (e.g., `"Breathing for Focus"`) with rounded corners and a soft shadow. 🃏
*   Clear instructions, a start button with a gradient (`#FF6F61` to `#FF9F43`), and a timer – all on one screen for simplicity. ▶️
*   Progress is shown with a circular meter animated with `GSAP` (e.g., fills up gradually as the user progresses). 🔄

### Journaling ✍️

*   A clean text editor with rounded edges and options for audio or video recording (icons in a thin toolbar). 🎙️📹
*   Subtle prompts from AI, e.g., `"What did you notice today?"` in grey text, fading in with `GSAP`. 🤔
*   The save button animates with a soft scaling and color shift (from grey to gradient) as text is typed. ✅

### Social Network ("The Net") 💬

*   Chat view with a list of contacts or groups, inspired by `Superhumans`' fast interface.
*   Simple thread structure for conversations, with cards sliding in from the right using `GSAP` for new messages. ➡️
*   Subtle gradient accents on active chats to draw attention. ✨

## Customizable Themes 🎭

The UI is built with dynamic themes to match different user profiles:

*   🫧 **Clean (Default):** Light blue background, white cards, gradient accents, focus on simplicity. Suitable for pragmatic users or beginners.
*   💻 **Technical:** Dark blue background, monospace text (e.g., `"Roboto Mono"`), green accents. Inspired by terminals, for tech-savvy or "gamer" profiles.
*   👔 **Professional:** Greyscales, structured sections, matter-of-fact tone. `Nordea`-like for users who want a serious feel.

## Animation Strategy (with GSAP) ✨

To give `Inner Journey` a modern and engaging feel, `GSAP` (GreenSock Animation Platform) is used to implement functional and subtle animations:

*   💨 **Transitions:** Smooth fade-ins and slide-ups for new screens or elements.
    ```javascript
    gsap.from(element, { opacity: 0, y: 20, duration: 0.5 });
    ```
*   🖱️ **Interactive Elements:** Buttons scale and highlight on hover/tap.
    ```javascript
    gsap.to(button, { scale: 1.05, duration: 0.3 });
    ```
*   🔄 **Progression:** Circular progress meters fill up gradually (e.g., using `GSAP's` `drawSVG` plugin for SVG elements).
*   ✨ **Background Elements:** Small circles or shapes in the background move slowly.
    ```javascript
    gsap.to(circle, { x: 20, y: -10, repeat: -1, yoyo: true, duration: 3 });
    ```
*   ✍️ **Dynamic Text:** Text like `"Processing your input..."` types out step-by-step using `GSAP's` text plugin for a typewriter effect.

## Next Steps 🚀

*   🎨 Build an updated `"Clean"` version with the new color palette, gradients, and animations to test the user flow.
*   🎬 Implement `GSAP` animations for onboarding, exercises, and journaling in `Sprint 6`.
*   🗣️ Gather feedback from early users on the new aesthetics, animations, and themes, adjust accordingly.
*   🛠️ Add `"Technical"` and `"Professional"` as selectable themes in `Sprint 7` or `Sprint 8`.

---

For more information, see relevant documents:

*   [Project Description: Inner Journey](/docs/project/projektbeskrivning-2025)
*   [Activations: Inner Journey](/docs/ux/aktiveringar-activations-2025)
*   [Technical Documentation for Frontend](/docs/tech-spec/frontend-setup-utveckling-och-deployment-2025)