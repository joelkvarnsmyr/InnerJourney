---
title: "Din AI-Framtid Börjar på GitHub"
description: "En guide för hur teamet använder fält i GitHub Projects för Inner Journey Master-projektet, med fokus på enhetlighet och effektivitet."
slug: din-ai-framtid-brjar-p-github
sidebar_label: "Din AI-Framtid Börjar på GitHub"
sidebar_position: 10
tags:
  - github
  - projects
  - styrdokument
  - agile
  - samarbete
---
# Your AI Future Starts on GitHub 🚀

## 🎯 Purpose

This guideline document is a guide for how we in the team should use the fields in GitHub Projects to manage the project **"Inner Journey Master"** (Project ID: `PVT_kwHOBeiR4c4A1yAs`). The goal is to ensure a consistent, efficient, and collaborative process where everyone can contribute and follow the project's progress. Follow the instructions below to fill in the fields correctly.

## 📋 Instructions for Using Fields

### Basic Fields

These fields are central to each card and provide basic information about the task.

#### 📝 1. Title
-   **What:** A short, clear title describing the task or issue.
-   **How:** Write a specific and concise title with a verb indicating action. Avoid vague phrasing.
-   **Example:** `"Develop login flow for new users"`
-   **Prompt:** `"Write a title that is specific and describes what needs to be done, e.g., 'Develop X for Y'."`

#### 👥 2. Assignees
-   **What:** The team members responsible for the task.
-   **How:** Assign one or more people by entering their GitHub usernames. Inform them about the assignment.
-   **Example:** `["anna_dev", "kalle_design"]`
-   **Prompt:** `"Assign people using their GitHub usernames, e.g., ['username1', 'username2']." `

#### 🏷️ 3. Labels
-   **What:** Labels to categorize the card.
-   **How:** Use labels to indicate the MoSCoW category (e.g., `"Must have"`) and other relevant tags like `"Frontend"` or `"Admin"`.
-   **Example:** `["Must have", "Frontend"]`
-   **Prompt:** `"Add labels for MoSCoW and work area, e.g., ['Must have', 'Backend']." `

### Workflow Fields

These fields track the progress and status of tasks.

#### 🚦 4. Status
-   **What:** Shows where the card is in the workflow.
-   **How:** Select an option:
    -   `Backlog`: Not started.
    -   `Ready`: Ready to be started.
    -   `In progress`: Active work is ongoing.
    -   `In review`: Under review.
    -   `Done`: Completed. ✅
    -   `Ideas`: Ideas that are not planned yet. 🤔
-   **Example:** `"In progress"`
-   **Prompt:** `"Select status: 'Backlog', 'Ready', 'In progress', 'In review', 'Done', or 'Ideas'."`

#### 📈 5. Sub-issues progress
-   **What:** Shows progress for sub-tasks.
-   **How:** Updates automatically based on the checklist in the card's description. Mark sub-tasks as complete using `- [x]`.
-   **Example:** `"3/5"` (60%)
-   **Prompt:** `"Mark sub-tasks as complete with '- [x]' in the description to update the progress."`

#### 🔗 6. Linked pull requests
-   **What:** Links the card to related pull requests.
-   **How:** Add pull requests automatically via GitHub by referencing the card in the PR (e.g., `#<card_number>`).
-   **Example:** `#45`
-   **Prompt:** `"Reference the card in a pull request with '#<number>' to link it."`

#### 🔼 7. Parent issue
-   **What:** Indicates if the card is a sub-task of a larger issue.
-   **How:** Select the parent issue from the list of existing cards.
-   **Example:** `#12`
-   **Prompt:** `"Select a parent issue with '#<number>' if this is a sub-task."`

### Prioritization Fields

These fields help determine what should be done first.

#### 🎯 8. MoSCoW
-   **What:** Indicates the priority level according to the MoSCoW method.
-   **How:** Select:
    -   `Must have`: Critical for launch. ❗️
    -   `Should have`: Important but not critical. 👍
    -   `Could have`: Desirable if time permits. ✨
    -   `Won’t have`: Not planned for now. ❌
-   **Example:** `"Must have"`
-   **Prompt:** `"Select: 'Must have' for critical, 'Should have' for important, 'Could have' for desirable, 'Won’t have' for unplanned."`

#### 🔥 9. Priority
-   **What:** Indicates priority within the MoSCoW category.
-   **How:** Select:
    -   `P0`: Highest priority (critical).
    -   `P1`: Important but not urgent.
    -   `P2`: Can wait.
-   **Example:** `"P0"`
-   **Prompt:** `"Select: 'P0' for critical, 'P1' for important, 'P2' for less urgent."`

#### ⭐ 10. User Value
-   **What:** Estimates the user value on a scale of 1-5.
-   **How:** Select a value (1 = low value, 5 = high value) based on the task's value for the user.
-   **Example:** `4`
-   **Prompt:** `"Select user value 1-5, where 1 is low and 5 is high, e.g., 4 for high value."`

### Planning Fields

These fields are used to schedule tasks.

#### 🔄 11. Iteration
-   **What:** Links the card to a specific iteration (sprint).
-   **How:** Select an iteration, e.g., `"Iteration 1 (Start: 2025-04-02)"`.
-   **Example:** `"Iteration 2"`
-   **Prompt:** `"Select iteration, e.g., 'Iteration 1' for Apr 02 – Apr 15."`

#### 📅 12. Start date
-   **What:** Indicates when the work is planned to start.
-   **How:** Enter the date in `YYYY-MM-DD` format, aligned with the plan.
-   **Example:** `"2025-04-02"`
-   **Prompt:** `"Enter start date as YYYY-MM-DD, e.g., '2025-04-02'."`

#### 📅 13. End date
-   **What:** Indicates when the work is planned to be finished.
-   **How:** Enter the date in `YYYY-MM-DD` format, realistically based on estimates.
-   **Example:** `"2025-04-10"`
-   **Prompt:** `"Enter end date as YYYY-MM-DD, e.g., '2025-04-10'."`

#### 📏 14. Size
-   **What:** Estimates the task's size/complexity.
-   **How:** Select:
    -   `XS`: Very small.
    -   `S`: Small.
    -   `M`: Medium.
    -   `L`: Large.
    -   `XL`: Very large.
-   **Example:** `"M"`
-   **Prompt:** `"Select size: 'XS', 'S', 'M', 'L', or 'XL' based on scope."`

#### ⏱️ 15. Estimate
-   **What:** Estimates time in hours or story points.
-   **How:** Enter a numerical value based on the team's estimation.
-   **Example:** `8`
-   **Prompt:** `"Enter estimated time in hours or points, e.g., 8."`

### Other Fields

These fields provide additional context and details.

#### 🤝 16. Dependencies
-   **What:** Indicates dependencies on other cards.
-   **How:** Write text, e.g., `"Waiting for #<number>"` or `"Waiting for '<title>'"` if the card doesn't exist yet. Add the link later.
-   **Example:** `"Waiting for #10"`
-   **Prompt:** `"Write 'Waiting for #<number>' or '<title>' for dependencies."`

#### 🎯 17. Objective
-   **What:** Describes the goal of the task.
-   **How:** Write a short sentence explaining why the task is important.
-   **Example:** `"Improve the user experience during login."`
-   **Prompt:** `"Write a sentence about the goal, e.g., 'Improve X for Y'."`

#### 👥 18. Team
-   **What:** Indicates the responsible team or functional area.
-   **How:** Select: `"Dev"`, `"Design"`, `"Admin"`, `"Backend"`, `"Frontend"`, or `"Finance"`.
-   **Example:** `"Backend"`
-   **Prompt:** `"Select team: 'Dev', 'Design', 'Admin', 'Backend', 'Frontend', 'Finance'."`

#### 📦 19. Repository
-   **What:** Indicates which codebase (repository) the task belongs to.
-   **How:** Select the correct repository from the list.
-   **Example:** `"inner-journey-backend"`
-   **Prompt:** `"Select repository, e.g., 'inner-journey-frontend'."`

#### 🏁 20. Milestone
-   **What:** Links the card to an overall milestone.
-   **How:** Select a milestone if applicable.
-   **Example:** `"Version 1.0"`
-   **Prompt:** `"Select milestone, e.g., 'Version 1.0', if relevant."`

#### 👀 21. Reviewers
-   **What:** Indicates who should review the work (e.g., code review).
-   **How:** Add GitHub usernames for reviewers.
-   **Example:** `["lisa_review"]`
-   **Prompt:** `"Enter reviewers using GitHub usernames, e.g., ['username']." `

#### 🚀 22. Release version
-   **What:** Indicates which planned release the task belongs to.
-   **How:** Select: `"R1"`, `"R2"`, or `"R3"`.
-   **Example:** `"R2"`
-   **Prompt:** `"Select release: 'R1', 'R2', or 'R3'."`

#### 💰 23. Financial Impact
-   **What:** Estimates the financial impact (e.g., cost, revenue).
-   **How:** Enter a numerical value (e.g., currency or points).
-   **Example:** `5000`
-   **Prompt:** `"Enter financial impact in currency or points, e.g., 5000."`

#### 🗓️ 24. Quarter
-   **What:** Indicates which quarter the task belongs to.
-   **How:** Write the quarter as `"Q1 YYYY"`, e.g., `"Q2 2025"`.
-   **Example:** `"Q2 2025"`
-   **Prompt:** `"Write quarter as 'Q1 YYYY', e.g., 'Q2 2025'."`

#### ⚠️ 25. Risk
-   **What:** Describes potential risks associated with the task.
-   **How:** Write a short text about risks.
-   **Example:** `"Risk of delay if API is not ready."`
-   **Prompt:** `"Write a short text about risks, e.g., 'Risk of X if Y'."`

#### 🙋 26. Stakeholder
-   **What:** Indicates affected stakeholders.
-   **How:** Write the name or role of stakeholders.
-   **Example:** `"Product Owner Anna"`
-   **Prompt:** `"Write name or role, e.g., 'Product Owner Kalle'."`

#### 🏦 27. Funding Source
-   **What:** Indicates the funding source.
-   **How:** Write a short text about where the resources come from.
-   **Example:** `"Budget 2025 – Project X"`
-   **Prompt:** `"Write funding source, e.g., 'Budget YYYY – Project X'."`

## ✨ Usage Guidelines

-   **Keep the fields updated:** Review cards regularly (e.g., at sprint start / daily stand-ups) and update `Status`, `Priority`, `Assignees`, and `Dependencies`.
-   **Collaborate:** Discuss ambiguities within the team and update the fields together as needed. Use card comments for discussion.
-   **Adapt as needed:** This is a living document – if the project's needs change, we can discuss and adjust which fields we use and how.

## 📌 Example of a Card

Here is an example of what a completed card might look like:

-   **Card:** `"Develop login flow for new users"`
-   `Title`: `"Develop login flow for new users"`
-   `Assignees`: `["anna_dev"]`
-   `Labels`: `["Must have", "Frontend"]`
-   `Status`: `"In progress"`
-   `Sub-issues progress`: `"1/3"` (33%)
-   `Priority`: `"P0"`
-   `MoSCoW`: `"Must have"`
-   `User Value`: `5`
-   `Size`: `"M"`
-   `Estimate`: `10`
-   `Iteration`: `"Iteration 1"`
-   `Start date`: `"2025-04-02"`
-   `End date`: `"2025-04-08"`
-   `Dependencies`: `"Waiting for #5"`
-   `Objective`: `"Improve onboarding for new users."`
-   `Team`: `"Frontend"`
-   `Repository`: `"inner-journey-frontend"`
-   `Reviewers`: `["kalle_review"]`
-   `Release version`: `"R1"`
-   `Financial Impact`: `10000`
-   `Quarter`: `"Q2 2025"`
-   `Risk`: `"Risk of delay if backend is not ready."`
-   `Stakeholder`: `"Product Owner Lisa"`
-   `Funding Source`: `"Budget 2025 – Onboarding"`

## 👋 Closing Comment

This guide is a starting point to ensure we use GitHub Projects effectively for **"Inner Journey Master"**. Adapt it to the team's needs and let it grow with the project. If you have further requests or adjustments, bring them up with the team! Good luck! 😊