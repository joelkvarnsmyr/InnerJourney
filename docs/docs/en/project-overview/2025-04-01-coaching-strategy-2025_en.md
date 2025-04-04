---
id: coaching-strategi-2025
title: Coaching-strategi
description: "Beskriver hur coaching fungerar inom InnerJourney, inklusive övergången från användare till coach, matchning, uppgifter, certifiering och den planerade betalningsmodellen."
slug: coaching-strategi
sidebar_label: Coaching-strategi
sidebar_position: 10
tags:
  - coaching
  - strategi
  - användarroller
  - certifiering
  - betalningsmodell
---
# 📄 Coaching Strategy for InnerJourney

## 🎯 Purpose

Coaching is a central part of `InnerJourney` and aims to create a meaningful development journey for both users and coaches. By transitioning from a regular user to a coach, you can deepen your own self-awareness while supporting others. 🌱

With the new onboarding and profiling (see `Onboarding Flow: Detailed Description`), we can match users with coaches based on their personality profile. This makes the coaching experience more personal and effective.

In the long run, `InnerJourney` aims to become the "Uber for coaches" 💡. We plan to offer a platform where coaches can charge for their services, while we handle payments and administration (see `Marketing Strategy (GTM) for Inner Journey`).

This document describes:

- 🤝 How coaching works within the platform.
- 🔗 How coaches and users are connected.
- 📝 What shared tasks are involved.
- 📜 How coach certification works.
- 💰 How coaches can earn money via the platform (future plan).

## ⚙️ How It Works

### 🧑‍🏫 Transition from User to Coach

The process for a user to become a coach is designed to be simple and quality-driven:

- **✅ Criteria:** To be eligible to apply to become a coach, a user must have:
    - Completed at least `10 exercises`.
    - Demonstrated commitment to their own development (e.g., through regular journaling for at least `30 days`).
- **📝 Application:** The user initiates a simple process directly in the app and fills out a brief motivation (e.g., `"Why do you want to become a coach?"`).
    - The application is reviewed and approved (or rejected) by a certified coach within `48 hours`.
- **🎓 Introduction:** New coaches are welcomed with a guided module in the app. This introduces them to their tools, responsibilities, how they are matched with users, and how to provide feedback.

### 🤝 Connecting Coaches and Users

Here's how coaches and users are connected in `InnerJourney`:

- **🔗 Finding Users:**
    - Coaches can invite new users via a personal `invitation link`.
    - Coaches can search for existing users who lack a coach in the app's `matching system`.
- **📊 Matching:** The system suggests users based on their personality profile (generated during onboarding, see `Onboarding Flow: Detailed Description`).
    - **Example 1:** A user with `awakeningLevel: "beginner"` and `spiritualExperience: "none"` is preferably matched with a coach specializing in beginners in meditation or mindfulness.
    - **Example 2:** A user with `depressionRisk: true` is matched with a coach experienced in supporting users with specific well-being issues.
- **👍 Acceptance:** Users always have the option to accept or decline a suggested coach.
- **⚖️ Capacity:** To ensure high-quality support, a coach can have up to `5 active users` simultaneously.

### ✨ Shared Tasks

Coaches and users collaborate on tasks to promote the user's development:

- **🤝 Collaboration:** Coaches and users work together on tasks linked to the user's goals and profile.
    - **Example 1:** A coach can assign the exercise `"Silent Eye Contact Live"` to a user with `awakeningLevel: "intermediate"`. Afterwards, reflections are discussed in the app's chat.
    - **Example 2:** For a user wanting to increase their energy, the coach might suggest a week-long challenge, like performing `"Morning Greeting"` (sun salutations) daily. The user is encouraged to log how this affects their energy level.
- **🗣️ Follow-up:** Coaches provide constructive feedback on the user's reflections (e.g., via questions like `"What did you feel during the exercise?"`). They can also suggest next steps, such as a new exercise or a deeper reflection question.
- **🤸 Flexibility:** The tasks are designed to be flexible and can be adapted to the user's specific needs and the coach's unique style. Certified coaches also have the option to create their own custom tasks.

### 📜 Coach Certification

To ensure a high standard and offer more development opportunities, there is a certification process for coaches:

- **🏅 Certification Process:** To become a certified coach, an existing coach must:
    - Have successfully coached at least `3 users` to achieve their defined goals (e.g., completing a personal development plan).
    - Have received positive feedback from their users (at least `4 out of 5` average rating).
    - Have their application reviewed and approved by an already certified coach.
- **👑 Certified Coaches' Role:** Certified coaches gain expanded powers and responsibilities:
    - Guide and support other (non-certified) coaches.
    - Approve new coach applications.
    - Lead `group sessions` in the app (e.g., a `live breathwork ceremony` for multiple users simultaneously).
- **🛠️ Development & Tools:** Certified coaches get access to more advanced tools:
    - Ability to create and share their own exercises and tasks.
    - Tools for leading `community events`.
    - Access to aggregated statistics on their coached users' progress.

### 💰🚀 Payment Model for Coaches (Planned)

`InnerJourney` has a vision to become the "Uber for coaches". This involves offering a platform where coaches can charge for their services, while `InnerJourney` handles payment flows and administration:

- **💸 How It Works:**
    - **Pricing:** Coaches will have the option to set their own price for their sessions (e.g., `500 SEK per hour`).
    - **Payment Flow:** Users pay for sessions directly via `InnerJourney`. The platform charges a service fee (e.g., `20%`).
    - **Payout:** Coaches receive payouts monthly for completed and paid sessions, after the platform fee has been deducted.
    - **🧾 Example:** A coach holds 10 sessions at `500 SEK` each. Total revenue is `5000 SEK`. `InnerJourney` takes `20%` (`1000 SEK`), and the coach receives `4000 SEK` as a payout.
- **👍 Benefits for Coaches:**
    - Avoid administration related to payments and invoicing – `InnerJourney` handles this.
    - Access to an established platform to find clients and offer personal coaching sessions.
- **📈 Benefits for Inner Journey:**
    - Creates a new, sustainable revenue stream via platform fees.
    - Increases user engagement and value by offering high-quality, personal coaching.

## 🚀 Next Steps

Planned development steps to realize the coaching functionality:

1.  ➡️ Implement the matching system based on the user's personality profile (e.g., `awakeningLevel`, `spiritualExperience`) in `Sprint 5`.
2.  ➡️ Develop a payment module for coaches, including pricing, payment flow, and payout model, in `Sprint 6`.
3.  ➡️ Test the entire coaching flow (from application to collaboration) with a pilot group of `10 users` during `Sprint 6` to gather valuable feedback.
4.  ➡️ Create a `certification module` in the app during `Sprint 7`, including necessary administrative tools for certified coaches (e.g., managing `group sessions`).
5.  ➡️ Implement technical support for `group sessions` and `community events` that can be led by certified coaches in `Sprint 8`.

## 📚 For More Information

See the following related documents for further details:

- `Project Description: Inner Journey`
- `Onboarding Flow: Detailed Description`
- `Onboarding-backend`
- `Onboarding-frontend`
- `Onboarding-dialogflow-cx`
- `Marketing Strategy (GTM) for Inner Journey`
- `Development Plan`
- `Technical Documentation for Backend`
- `Technical Documentation for Frontend`