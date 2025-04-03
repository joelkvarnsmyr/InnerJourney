---
title: "Kan AI Känna?"
description: "En inblick i utvecklingen av Inner Journeys MVP, tekniska val som FastAPI och React, och ögonblicket då AI-integrationen med Gemini kändes levande."
slug: kan-ai-knna
authors: joelkvarnsmyr
date: 2025-01-01
tags:
  - inner-journey
  - teknik
  - AI
  - MVP
  - Gemini
---

# Kan AI Känna? 🤖❤️

Hej Inner Journey-vänner! 👋

Tänk dig att en rad kod plötsligt säger “Hej” och börjar guida dig – det var ungefär vad som hände när vi testade Inner Journeys första MVP (Minimum Viable Product). Det var en sen kväll i mars, kaffet hade kallnat ☕, och vi hade precis kopplat in Google `Gemini` till vår backend.

När vi körde endpointen `/gemini/getActivation` och fick tillbaka ett svar som löd: *“Ta tre djupa andetag och sätt en intention för dagen”*, satt vi bara tysta en stund. Det var inte bara teknik längre – det var något som kändes levande och meningsfullt ✨.

Här är berättelsen om hur vi gick från ren kod till en känsla och började bygga hjärtat i Inner Journey.

## 🚀 En Teknisk Resa Blir Personlig

Allt började med några grundläggande tekniska beslut för att bygga en stabil och skalbar plattform:

-   🐍 **Backend:** Vi valde `FastAPI` (Python) för dess snabbhet och enkelhet när det gäller att utveckla API:er.
-   ⚛️ **Frontend:** `React` med `TypeScript` valdes för att skapa en robust och typad kodbas, vilket underlättar underhåll och framtida utveckling.
-   🔥 **Infrastruktur:** `Firebase` blev navet som smidigt knyter ihop `Authentication` (för säker användarhantering) och `Firestore` (för flexibel datalagring).

Det låter kanske som en teknisk soppa, men för oss var det byggstenarna till något större. Vi ville skapa en plattform som inte bara fungerar – utan som *förstår* dig på ett djupare plan.

När vi deployade den första versionen till Google `Cloud Run` ☁️ (för backend) och `Firebase Hosting` 🌐 (för frontend) var det som att ge liv åt en idé. Men det var inte förrän vi testade `Gemini`-integrationen som vi verkligen insåg potentialen.

Att mata in ett humör och ett mål via endpointen `/gemini/getActivation` och få tillbaka en personlig insikt – det var som att höra Inner Journey tala för första gången. Plötsligt var det inte bara kod och algoritmer; det var en digital kompass för personlig utveckling 🧭.

## 💪 Utmaningar och Triumfer

Resan var inte alltid spikrak. Vi brottades med kluriga `CORS`-problem (Cross-Origin Resource Sharing) mellan frontend och backend, glömde en viktig API-nyckel i `Secret Manager` vid ett tillfälle (oops! 🔑), och hade några långa nätter med att försöka få en extern astrologitjänst (`VedAstro`) att fungera stabilt på `Google Cloud Engine` (även om den inte är en kärndel av plattformen just nu).

Men varje bugg vi fixade och varje API-endpoint vi polerade – som den centrala `/gemini/getActivation` – tog oss närmare målet: en plattform som känns som en stöttande vän, inte bara en app 🎯.

Och sedan kom triumfen. När vi kunde logga in med `Firebase Authentication`, mata in våra egna data (humör och mål) och se hur plattformen svarade med något som faktiskt kändes relevant och hjälpsamt – då förstod vi att vi var på rätt väg. Det var inte bara teknik längre – det var en känsla av att vi kunde göra verklig skillnad. ❤️

## 🤔 Vad Kommer Nästa?

Vi är långt ifrån klara, resan har bara börjat! Just nu funderar vi på nästa spännande steg för att göra Inner Journey ännu mer värdefull för dig:

-   🤖 Kanske en smartare AI som kan matcha dig med rätt coach baserat på dina unika behov och mål?
-   📝 Eller en mer dynamisk journalfunktion som föreslår relevanta reflektionsfrågor utifrån ditt humör eller de övningar du nyligen genomfört?

Hjärtat i Inner Journey bultar, och vi vill att det ska slå ännu starkare för er, våra användare.

Vad tror ni – vad vill ni att tekniken ska göra för *er* resa? Skicka era idéer och tankar till [kontakt@innerjourney.se](mailto:kontakt@innerjourney.se) – vi bygger det här tillsammans! 🤝

Med kod och känsla,
Team Inner Journey 💻❤️