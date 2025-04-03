---
description: Detaljerar de ekonomiska kostnaderna för att utveckla MVP och driva Inner
  Journey under det första året.
id: budget-mvp-frsta-rets-drift-2025
sidebar_label: 'Budget: MVP & Drift'
sidebar_position: 10
slug: budget-mvp-frsta-rets-drift-2025
tags:
- budget
- finans
- mvp
- driftkostnader
- kostnadsestimat
title: '"Budget: MVP & Första Årets Drift"'
---

# 💰 Budget: MVP & Första Årets Drift

Dokumentinformation:

*   **Dokument:** Budget - Inner Journey
*   **Version:** 1.1
*   **Datum:** 2025-03-26
*   **Författare:** Bo Joel Kvarnsmyr
*   **Senast reviderad av:** Bo Joel Kvarnsmyr

## 🎯 Syfte

Detta dokument detaljerar de ekonomiska kostnaderna för att utveckla och driva projektet "Inner Journey". Budgeten inkluderar nödvändiga resurser för att bygga en Minimum Viable Product (`MVP`) samt kostnaderna för att upprätthålla plattformen efter lansering.

Syftet är att ge projektledare, investerare och andra intressenter en tydlig och transparent bild av projektets kostnadsstruktur. Dokumentet fungerar som ett viktigt underlag för finansieringsbeslut.

ℹ️ För en mer övergripande ekonomisk kontext, vänligen se dokumentet *Ekonomisk översikt och syfte*.

## 🏗️ Utvecklingskostnader (MVP)

Dessa kostnader avser de resurser som krävs för att bygga och lansera Inner Journeys `MVP`. Den uppskattade utvecklingstiden är 3 månader (motsvarande Sprint 1-5).

### 📊 Uppskattade kostnader

*   **👥 Personal (3 månader):**
    *   2 Utvecklare (frontend och backend): 2 x 80 000 SEK/månad x 3 = `480 000 SEK`
    *   1 Designer: 70 000 SEK/månad x 3 = `210 000 SEK`
    *   1 Projektledare (50% tid): 40 000 SEK/månad x 3 = `120 000 SEK`
    *   **Total personal:** `810 000 SEK`

*   **🛠️ Tjänster och verktyg:**
    *   `Firebase Hosting` och `Firestore`: 5 000 SEK/månad x 3 = `15 000 SEK`
    *   `Sinch Voice API` (telefonverifiering, uppskattat 1000 samtal initialt): `10 000 SEK`
    *   `Dialogflow CX` (initial användning under utveckling): `5 000 SEK`
    *   `VedAstro API` (engångskostnad för åtkomst till kod): `10 SEK`
    *   **Total tjänster:** `30 010 SEK`

*   **☁️ Infrastruktur:**
    *   Serverkostnader (backend API på `api.backend.kvarnsmyr.se`): 2 000 SEK/månad x 3 = `6 000 SEK`
    *   VedAstro-server (hostad på `Google Cloud Compute Engine`, instans `e2-medium`): 240 SEK/månad x 3 = `720 SEK`
    *   Domänkostnader (uppskattad köpkostnad för `innerjourney.com`): `25 000 SEK` (engångskostnad, se notering nedan)
    *   **Total infrastruktur:** `31 720 SEK`

*   **📦 Övrigt:**
    *   Utrustning (datorer, mjukvarulicenser): `50 000 SEK`
    *   Testning (användartester med ca 10 deltagare): `10 000 SEK`
    *   **Total övrigt:** `60 000 SEK`

📝 **Notering om domänkostnad:**
Kostnaden för domänen `innerjourney.com` är en uppskattning på `25 000 SEK`. Detta baseras på typiska marknadsvärden för attraktiva `.com`-domäner som ägs av privatpersoner eller företag. Den faktiska kostnaden kan variera (`5 000 SEK` – `50 000 SEK`) beroende på förhandlingsresultat.

➡️ **Totala uppskattade utvecklingskostnader (MVP):** `931 730 SEK`

## ⚙️ Driftkostnader

Driftkostnaderna representerar de löpande utgifterna för att hålla Inner Journey-plattformen igång efter lanseringen av `MVP`. Beräkningarna är baserade på en uppskattning av 1000 aktiva användare per månad.

### 🗓️ Uppskattade månatliga kostnader

*   **👥 Personal:**
    *   1 Utvecklare (underhåll, vidareutveckling, 50% tid): `40 000 SEK/månad`
    *   1 Supportmedarbetare (användarsupport, 20% tid): `10 000 SEK/månad`
    *   **Total personal:** `50 000 SEK/månad`

*   **🛠️ Tjänster och verktyg:**
    *   `Firebase Hosting` och `Firestore` (skalad för 1000 användare): `10 000 SEK/månad`
    *   `Sinch Voice API` (ca 1000 verifieringssamtal/månad): `10 000 SEK/månad`
    *   `Dialogflow CX` (baserat på 1000 användares interaktioner): `5 000 SEK/månad`
    *   `VedAstro API` (hostas på egen server efter initial åtkomst): `0 SEK/månad`
    *   **Total tjänster:** `25 000 SEK/månad`

*   **☁️ Infrastruktur:**
    *   Serverkostnader (backend API): `2 000 SEK/månad`
    *   VedAstro-server (`Google Cloud Compute Engine`, instans `e2-medium`): `240 SEK/månad`
    *   **Total infrastruktur:** `2 240 SEK/månad`

➡️ **Totala uppskattade månatliga driftkostnader:** `77 240 SEK/månad`

➡️ **Totala uppskattade driftkostnader för första året (12 månader):** 77 240 SEK/månad x 12 = `926 880 SEK`

## 📝 Sammanfattning

Den totala budgeten för Inner Journey under det första året (inklusive MVP-utveckling och 12 månaders drift) uppskattas enligt följande:

*   **Utvecklingskostnader (MVP):** `931 730 SEK`
*   **Driftkostnader (första året):** `926 880 SEK`
*   **💰 Total budget första året:** `1 858 610 SEK`

ℹ️ För mer detaljerad information om hur de olika tjänsterna används, se dokumentet *Tjänster och teknisk infrastruktur*. För information om hur dessa kostnader planeras att finansieras, se dokumenten *Kapitalbehov* och *Finansieringsstrategi*.