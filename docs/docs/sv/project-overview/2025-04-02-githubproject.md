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

# Din AI-Framtid Börjar på GitHub 🚀

## 🎯 Syfte

Detta styrdokument är en guide för hur vi i teamet ska använda fälten i GitHub Projects för att hantera projektet **"Inner Journey Master"** (Projekt-ID: `PVT_kwHOBeiR4c4A1yAs`). Målet är att säkerställa en enhetlig, effektiv och samarbetsinriktad process där alla kan bidra och följa projektets framsteg. Följ instruktionerna nedan för att fylla i fälten korrekt.

## 📋 Instruktioner för Användning av Fält

### Grundläggande fält

Dessa fält är centrala för varje kort och ger grundläggande information om uppgiften.

#### 📝 1. Title
-   **Vad:** En kort, tydlig titel som beskriver uppgiften eller ärendet.
-   **Hur:** Skriv en specifik och koncis titel med ett verb som anger handling. Undvik vaga formuleringar.
-   **Exempel:** `"Utveckla inloggningsflöde för nya användare"`
-   **Prompt:** `"Skriv en titel som är specifik och beskriver vad som ska göras, t.ex. 'Utveckla X för Y'."`

#### 👥 2. Assignees
-   **Vad:** De teammedlemmar som är ansvariga för uppgiften.
-   **Hur:** Tilldela en eller flera personer genom att ange deras GitHub-användarnamn. Informera dem om tilldelningen.
-   **Exempel:** `["anna_dev", "kalle_design"]`
-   **Prompt:** `"Tilldela personer med deras GitHub-användarnamn, t.ex. ['användarnamn1', 'användarnamn2']." `

#### 🏷️ 3. Labels
-   **Vad:** Etiketter för att kategorisera kortet.
-   **Hur:** Använd etiketter för att ange MoSCoW-kategori (t.ex. `"Must have"`) och andra relevanta taggar som `"Frontend"` eller `"Admin"`.
-   **Exempel:** `["Must have", "Frontend"]`
-   **Prompt:** `"Lägg till etiketter för MoSCoW och arbetsområde, t.ex. ['Must have', 'Backend']." `

### Arbetsflödesfält

Dessa fält spårar framsteg och status för uppgifter.

#### 🚦 4. Status
-   **Vad:** Visar var i arbetsflödet kortet befinner sig.
-   **Hur:** Välj ett alternativ:
    -   `Backlog`: Inte påbörjat.
    -   `Ready`: Redo att påbörjas.
    -   `In progress`: Aktivt arbete pågår.
    -   `In review`: Under granskning.
    -   `Done`: Slutfört. ✅
    -   `Ideas`: Idéer som inte är planerade än. 🤔
-   **Exempel:** `"In progress"`
-   **Prompt:** `"Välj status: 'Backlog', 'Ready', 'In progress', 'In review', 'Done' eller 'Ideas'."`

#### 📈 5. Sub-issues progress
-   **Vad:** Visar framsteg för deluppgifter i procent.
-   **Hur:** Uppdateras automatiskt baserat på checklistan i kortets beskrivning. Markera deluppgifter som klara med `- [x]`.
-   **Exempel:** `"3/5"` (60%)
-   **Prompt:** `"Markera deluppgifter som klara med '- [x]' i beskrivningen för att uppdatera framstegen."`

#### 🔗 6. Linked pull requests
-   **Vad:** Kopplar kortet till relaterade pull requests.
-   **Hur:** Lägg till pull requests automatiskt via GitHub genom att referera kortet i PR:en (t.ex. `#<kortnummer>`).
-   **Exempel:** `#45`
-   **Prompt:** `"Referera kortet i en pull request med '#<nummer>' för att koppla den."`

#### 🔼 7. Parent issue
-   **Vad:** Anger om kortet är en deluppgift till ett större ärende.
-   **Hur:** Välj det överordnade ärendet från listan över befintliga kort.
-   **Exempel:** `#12`
-   **Prompt:** `"Välj ett överordnat ärende med '#<nummer>' om detta är en deluppgift."`

### Prioriteringsfält

Dessa fält hjälper till att avgöra vad som ska göras först.

#### 🎯 8. MoSCoW
-   **Vad:** Anger prioriteringsnivå enligt MoSCoW-metoden.
-   **Hur:** Välj:
    -   `Must have`: Kritiskt för lansering. ❗️
    -   `Should have`: Viktigt men inte avgörande. 👍
    -   `Could have`: Önskvärt om tid finns. ✨
    -   `Won’t have`: Inte planerat nu. ❌
-   **Exempel:** `"Must have"`
-   **Prompt:** `"Välj: 'Must have' för kritiska, 'Should have' för viktiga, 'Could have' för önskvärda, 'Won’t have' för icke-planerade."`

#### 🔥 9. Priority
-   **Vad:** Anger prioritet inom MoSCoW-kategorin.
-   **Hur:** Välj:
    -   `P0`: Högsta prioritet (kritiskt).
    -   `P1`: Viktigt men inte akut.
    -   `P2`: Kan vänta.
-   **Exempel:** `"P0"`
-   **Prompt:** `"Välj: 'P0' för kritiska, 'P1' för viktiga, 'P2' för mindre brådskande."`

#### ⭐ 10. User Value
-   **Vad:** Uppskattar användarnyttan på en skala 1-5.
-   **Hur:** Välj ett värde (1 = låg nytta, 5 = hög nytta) baserat på uppgiftens värde för användaren.
-   **Exempel:** `4`
-   **Prompt:** `"Välj användarnytta 1-5, där 1 är låg och 5 är hög, t.ex. 4 för stor nytta."`

### Planeringsfält

Dessa fält används för att schemalägga uppgifter.

#### 🔄 11. Iteration
-   **Vad:** Kopplar kortet till en specifik iteration (sprint).
-   **Hur:** Välj en iteration, t.ex. `"Iteration 1 (Start: 2025-04-02)"`.
-   **Exempel:** `"Iteration 2"`
-   **Prompt:** `"Välj iteration, t.ex. 'Iteration 1' för Apr 02 – Apr 15."`

#### 📅 12. Start date
-   **Vad:** Anger när arbetet planeras börja.
-   **Hur:** Ange datum i formatet `YYYY-MM-DD`, i linje med planeringen.
-   **Exempel:** `"2025-04-02"`
-   **Prompt:** `"Ange startdatum som YYYY-MM-DD, t.ex. '2025-04-02'."`

#### 📅 13. End date
-   **Vad:** Anger när arbetet planeras vara klart.
-   **Hur:** Ange datum i formatet `YYYY-MM-DD`, realistiskt baserat på estimat.
-   **Exempel:** `"2025-04-10"`
-   **Prompt:** `"Ange slutdatum som YYYY-MM-DD, t.ex. '2025-04-10'."`

#### 📏 14. Size
-   **Vad:** Uppskattar uppgiftens storlek/komplexitet.
-   **Hur:** Välj:
    -   `XS`: Mycket liten.
    -   `S`: Liten.
    -   `M`: Medel.
    -   `L`: Stor.
    -   `XL`: Mycket stor.
-   **Exempel:** `"M"`
-   **Prompt:** `"Välj storlek: 'XS', 'S', 'M', 'L' eller 'XL' baserat på omfattning."`

#### ⏱️ 15. Estimate
-   **Vad:** Uppskattar tid i timmar eller story points.
-   **Hur:** Ange ett numeriskt värde baserat på teamets uppskattning.
-   **Exempel:** `8`
-   **Prompt:** `"Ange uppskattad tid i timmar eller poäng, t.ex. 8."`

### Övriga fält

Dessa fält ger ytterligare kontext och detaljer.

#### 🤝 16. Dependencies
-   **Vad:** Anger beroenden till andra kort.
-   **Hur:** Skriv en text, t.ex. `"Väntar på #<nummer>"` eller `"Väntar på '<titel>'" ` om kortet inte finns än. Lägg till länk senare.
-   **Exempel:** `"Väntar på #10"`
-   **Prompt:** `"Skriv 'Väntar på #<nummer>' eller '<titel>' för beroenden."`

#### 🎯 17. Objective
-   **Vad:** Beskriver målet med uppgiften.
-   **Hur:** Skriv en kort mening som förklarar varför uppgiften är viktig.
-   **Exempel:** `"Förbättra användarupplevelsen vid inloggning."`
-   **Prompt:** `"Skriv en mening om målet, t.ex. 'Förbättra X för Y'."`

#### 👥 18. Team
-   **Vad:** Anger ansvarigt team eller funktionsområde.
-   **Hur:** Välj: `"Dev"`, `"Design"`, `"Admin"`, `"Backend"`, `"Frontend"` eller `"Finance"`.
-   **Exempel:** `"Backend"`
-   **Prompt:** `"Välj team: 'Dev', 'Design', 'Admin', 'Backend', 'Frontend', 'Finance'."`

#### 📦 19. Repository
-   **Vad:** Anger vilken kodbas (repository) uppgiften hör till.
-   **Hur:** Välj rätt repository från listan.
-   **Exempel:** `"inner-journey-backend"`
-   **Prompt:** `"Välj repository, t.ex. 'inner-journey-frontend'."`

#### 🏁 20. Milestone
-   **Vad:** Kopplar kortet till en övergripande milstolpe.
-   **Hur:** Välj en milstolpe om tillämpligt.
-   **Exempel:** `"Version 1.0"`
-   **Prompt:** `"Välj milstolpe, t.ex. 'Version 1.0', om relevant."`

#### 👀 21. Reviewers
-   **Vad:** Anger vem som ska granska arbetet (t.ex. kodgranskning).
-   **Hur:** Lägg till GitHub-användarnamn för granskare.
-   **Exempel:** `["lisa_review"]`
-   **Prompt:** `"Ange granskare med GitHub-användarnamn, t.ex. ['användarnamn']." `

#### 🚀 22. Release version
-   **Vad:** Anger vilken planerad release uppgiften hör till.
-   **Hur:** Välj: `"R1"`, `"R2"` eller `"R3"`.
-   **Exempel:** `"R2"`
-   **Prompt:** `"Välj release: 'R1', 'R2' eller 'R3'."`

#### 💰 23. Financial Impact
-   **Vad:** Uppskattar ekonomisk påverkan (t.ex. kostnad, intäkt).
-   **Hur:** Ange ett numeriskt värde (t.ex. kronor eller poäng).
-   **Exempel:** `5000`
-   **Prompt:** `"Ange ekonomisk påverkan i kronor eller poäng, t.ex. 5000."`

#### 🗓️ 24. Quarter
-   **Vad:** Anger vilket kvartal uppgiften hör till.
-   **Hur:** Skriv kvartal som `"Q1 YYYY"`, t.ex. `"Q2 2025"`.
-   **Exempel:** `"Q2 2025"`
-   **Prompt:** `"Skriv kvartal som 'Q1 YYYY', t.ex. 'Q2 2025'."`

#### ⚠️ 25. Risk
-   **Vad:** Beskriver potentiella risker kopplade till uppgiften.
-   **Hur:** Skriv en kort text om risker.
-   **Exempel:** `"Risk för försening om API inte är klart."`
-   **Prompt:** `"Skriv en kort text om risker, t.ex. 'Risk för X om Y'."`

#### 🙋 26. Stakeholder
-   **Vad:** Anger berörda intressenter.
-   **Hur:** Skriv namn eller roll för intressenter.
-   **Exempel:** `"Produktägare Anna"`
-   **Prompt:** `"Skriv namn eller roll, t.ex. 'Produktägare Kalle'."`

#### 🏦 27. Funding Source
-   **Vad:** Anger finansieringskälla.
-   **Hur:** Skriv en kort text om var resurserna kommer ifrån.
-   **Exempel:** `"Budget 2025 – Projekt X"`
-   **Prompt:** `"Skriv finansieringskälla, t.ex. 'Budget YYYY – Projekt X'."`

## ✨ Riktlinjer för Användning

-   **Håll fälten uppdaterade:** Gå igenom korten regelbundet (t.ex. vid sprintstart/dagliga stand-ups) och uppdatera `Status`, `Priority`, `Assignees` och `Dependencies`.
-   **Samarbeta:** Diskutera oklarheter i teamet och uppdatera fälten tillsammans vid behov. Använd kortkommentarer för diskussion.
-   **Anpassa vid behov:** Detta är ett levande dokument – om projektets behov förändras kan vi diskutera och justera vilka fält vi använder och hur.

## 📌 Exempel på ett Kort

Här är ett exempel på hur ett ifyllt kort kan se ut:

-   **Kort:** `"Utveckla inloggningsflöde för nya användare"`
-   `Title`: `"Utveckla inloggningsflöde för nya användare"`
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
-   `Dependencies`: `"Väntar på #5"`
-   `Objective`: `"Förbättra onboarding för nya användare."`
-   `Team`: `"Frontend"`
-   `Repository`: `"inner-journey-frontend"`
-   `Reviewers`: `["kalle_review"]`
-   `Release version`: `"R1"`
-   `Financial Impact`: `10000`
-   `Quarter`: `"Q2 2025"`
-   `Risk`: `"Risk för försening om backend inte är klart."`
-   `Stakeholder`: `"Produktägare Lisa"`
-   `Funding Source`: `"Budget 2025 – Onboarding"`

## 👋 Avslutande Kommentar

Detta styrdokument är en startpunkt för att säkerställa att vi använder GitHub Projects effektivt för **"Inner Journey Master"**. Anpassa det efter teamets behov och låt det växa med projektet. Om du har fler önskemål eller justeringar, ta upp det i teamet! Lycka till! 😊