---
description: Beskriver implementerade och planerade säkerhetsåtgärder för InnerJourney,
  inklusive brandvägg, API
id: skerhetsdokument-2025
sidebar_label: "\U0001F6E1️ Säkerhetsdokument"
sidebar_position: 10
slug: skerhetsdokument-2025
tags:
- security-test
- firewall
- authentication
- secrets
- monitoring
title: "\U0001F6E1️ Säkerhetsdokument"
---

# 🛡️ Säkerhetsdokument: InnerJourney

## 📝 Metadata

*   **Version:** `3`
*   **Datum:** `2025-03-21`
*   **Författare:** Bo Joel Kvarnsmyr
*   **Senast reviderad av:** Bo Joel Kvarnsmyr

## 🎯 Syfte

Detta dokument beskriver de säkerhetsåtgärder som implementerats och planeras för projektet `InnerJourney`.

Fokus ligger på brandväggskonfiguration, autentisering av API-endpoints, hantering av känslig data (hemligheter) och systemövervakning. Syftet är att skydda systemet mot obehörig åtkomst och säkerställa efterlevnad av relevanta regelverk som `GDPR`.

## 🔥 Brandvägg

### Nuvarande Status

Brandväggen `UFW` (Uncomplicated Firewall) är aktiv och konfigurerad för att tillåta trafik på följande portar:

*   `80` (HTTP) - För initial anslutning och omdirigering till HTTPS.
*   `443` (HTTPS) - För krypterad webbtrafik.
*   `8000` (Applikationsserver) - Direktåtkomst till backend-applikationen (planeras att begränsas).
*   `22` (SSH) - För säker fjärradministration.

### Planerade Åtgärder 🛠️

För att stärka säkerheten kring nätverksåtkomst planeras följande åtgärder:

1.  **➡️ Begränsa SSH-åtkomst (Port `22`):**
    Endast tillåt SSH-anslutningar från betrodda IP-adresser (t.ex. utvecklingsteamets fasta IP eller VPN-intervall) för att minimera attackytan.

    ```bash
    # Ersätt <team-ip> med den faktiska IP-adressen eller nätverket (t.ex. 192.168.1.100 eller 10.0.0.0/24)
    sudo ufw allow from <team-ip> to any port 22 proto tcp

    # Nekar sedan all annan extern trafik till port 22
    sudo ufw deny 22/tcp
    ```

2.  **🔒 Begränsa Applikationsserveråtkomst (Port `8000`):**
    Applikationsservern (t.ex. `FastAPI`-appen) bör endast vara direkt nåbar från `localhost` (`127.0.0.1`). All extern trafik ska gå via en reverse proxy (som `Nginx` eller `Apache`) på port `443`.

    ```bash
    # Tillåt endast trafik från localhost (127.0.0.1) till port 8000
    sudo ufw allow from 127.0.0.1 to any port 8000 proto tcp

    # Neka all annan extern trafik till port 8000
    sudo ufw deny 8000/tcp
    ```

3.  **🔍 Regelbunden Granskning:**
    Genomför periodiska granskningar av aktiva `UFW`-regler för att säkerställa att inga onödiga portar är öppna.

    ```bash
    # Visa aktuell UFW-status och alla aktiva regler
    sudo ufw status verbose

    # Exempel: Stäng en identifierad onödig port <port>
    sudo ufw deny <port>/tcp
    ```

## 🔑 Autentisering

### Nuvarande Status ⚠️

Webhook-endpointen `/dialogflow-webhook` saknar för närvarande specifik autentisering. Detta innebär att vem som helst med kännedom om URL:en potentiellt kan skicka data till den.

### Planerade Åtgärder 🔐

För att säkra webhooken planeras följande:

1.  **Implementera API-nyckel-autentisering:**
    En enkel men effektiv metod är att kräva en hemlig API-nyckel som skickas med i `HTTP Header` (t.ex. `X-API-Key`). `FastAPI`s dependency injection (`Depends`) är väl lämpad för detta.

    ```python
    from fastapi import Depends, HTTPException, Header, status
    from starlette.requests import Request # Behövs för endpoint-definitionen nedan

    # TODO: Hämta den faktiska nyckeln från en säker källa (miljövariabel, secret manager)
    SECRET_API_KEY = "your-secret-key"

    async def verify_api_key(x_api_key: str = Header(None)): # Gör den valfri initialt för bättre felhantering
        """Verifierar att en giltig API-nyckel finns i X-API-Key headern."""
        if x_api_key is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="API Key missing in X-API-Key header"
            )
        if x_api_key != SECRET_API_KEY:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid API Key provided"
            )
        # Ingen retur behövs om nyckeln är giltig; FastAPI fortsätter till endpoint-funktionen.
    ```

2.  **✨ Skydda Webhook Endpoint:**
    Applicera `verify_api_key`-funktionen som en dependency på `/dialogflow-webhook`-routen.

    ```python
    # Importera 'app' från din FastAPI-instans och Request om den inte redan är importerad
    # from main import app # Exempel
    # from fastapi import Request

    @app.post("/dialogflow-webhook", dependencies=[Depends(verify_api_key)])
    async def dialogflow_webhook(request: Request):
        """Tar emot och processar anrop från Dialogflow efter API-nyckelverifiering."""
        # Din befintliga webhook-logik här...
        # Koden här körs endast om Depends(verify_api_key) lyckades utan att kasta HTTPException.
        webhook_data = await request.json()
        # Processera webhook_data...
        print("Webhook data received successfully.") # Exempel på loggning
        return {"fulfillmentText": "Webhook received and authenticated successfully!"} # Exempelsvar
    ```

## 🔒 SSL/TLS-Certifikat

### Nuvarande Status ✅

Ett giltigt `Let’s Encrypt`-certifikat är installerat och korrekt konfigurerat för domänen `api.backend.kvarnsmyr.se`. Detta säkerställer att all kommunikation mellan klienter och servern sker krypterat via `HTTPS`.

### Rutiner 🔄

För att säkerställa kontinuerlig `HTTPS`-skydd:

*   **✅ Verifiera Automatisk Förnyelse:**
    `certbot`-verktyget, som hanterar `Let’s Encrypt`-certifikat, är normalt konfigurerat via `cron` eller `systemd timers` för att automatiskt förnya certifikaten innan de löper ut. Testa konfigurationen utan att faktiskt genomföra en förnyelse:

    ```bash
    # Kör en simulerad förnyelse ('dry run') för att testa hela processen
    sudo certbot renew --dry-run
    ```
    *Kontrollera outputen för eventuella fel.*

*   **🧪 Testa Certifikatets Giltighet:**
    Verifiera manuellt att servern presenterar ett giltigt certifikat och att certifikatkedjan är korrekt.

    ```bash
    # Använd openssl för att ansluta till servern och inspektera det presenterade certifikatet
    openssl s_client -connect api.backend.kvarnsmyr.se:443 -servername api.backend.kvarnsmyr.se
    ```
    *Granska informationen om utfärdare, giltighetstid och kedja.*

## 🤫 Hantering av Känslig Data

### Nuvarande Status ⚠️

Känsliga uppgifter, såsom API-nycklar för externa tjänster (t.ex. `Sinch`, `Dialogflow`) och den interna `SECRET_API_KEY` för webhooken, lagras för närvarande i klartext i en lokal `.env`-fil i utvecklingsmiljön.

### Planerade Åtgärder 🔐

För att hantera hemligheter på ett säkrare sätt, särskilt i produktion:

1.  **🏦 Använd en Dedikerad Hemlighetshanterare:**
    I produktions- och stagingmiljöer bör en robust lösning för hemlighetshantering användas istället för `.env`-filer. Exempel inkluderar:
    *   `HashiCorp Vault`
    *   `AWS Secrets Manager`
    *   `Google Secret Manager`
    *   Molnleverantörsspecifika tjänster (t.ex. Azure Key Vault)
    *   Miljövariabler injicerade via CI/CD eller containerorkestreringssystem.

    Detta minimerar risken för att hemligheter exponeras i kod, loggar eller via oavsiktlig versionshantering.

2.  **🚫 Säkerställ att `.env`-filen *Inte* Versionshanteras:**
    Filen `.env` får **aldrig** checkas in i `Git`-repositoryt. Lägg till den i projektets `.gitignore`-fil.

    ```bash
    # Lägg till .env på en ny rad i .gitignore-filen (om den inte redan finns där)
    # Detta kommando lägger till raden i slutet av filen.
    echo "" >> .gitignore # Lägg till en tom rad för säkerhets skull
    echo "# Miljöspecifika variabler och hemligheter" >> .gitignore
    echo ".env" >> .gitignore
    ```
    ***Viktigt:*** *Verifiera innehållet i `.gitignore`-filen efteråt och säkerställ att `.env` faktiskt finns med där innan du committar ändringar.*

## 📊 Övervakning och Loggning

### Planerade Åtgärder 🛠️

Proaktiva åtgärder för att övervaka systemets hälsa och upptäcka potentiella säkerhetsincidenter:

1.  **📈 Implementera Systemövervakning:**
    Installera och konfigurera verktyg för att samla in och visualisera systemmetriker:
    *   `Prometheus`: För insamling av tidsseriedata (metrics) från servern och applikationen (via exporters som `node_exporter`).
    *   `Grafana`: För att skapa dashboards och visualisera metriker från Prometheus (t.ex. CPU-användning, minnesförbrukning, diskutrymme, nätverkstrafik).

    *Exempel på installation för Debian/Ubuntu (steg kan variera):*
    ```bash
    sudo apt update
    sudo apt install prometheus prometheus-node-exporter grafana -y

    # Starta och aktivera tjänsterna så de körs automatiskt vid omstart
    sudo systemctl start prometheus node_exporter grafana-server
    sudo systemctl enable prometheus node_exporter grafana-server
    ```
    *Konfigurera sedan Prometheus att skrapa data från `node_exporter` och Grafana att använda Prometheus som datakälla.*

2.  **🛡️ Konfigurera Skydd mot Intrångsförsök:**
    Installera `fail2ban`, ett verktyg som analyserar loggfiler (t.ex. SSH-loggar, webbserverloggar) och automatiskt blockerar IP-adresser som uppvisar skadligt beteende (t.ex. upprepade misslyckade inloggningsförsök).

    *Exempel på installation för Debian/Ubuntu:*
    ```bash
    sudo apt update
    sudo apt install fail2ban -y

    # fail2ban startar och aktiveras oftast automatiskt efter installation
    sudo systemctl enable fail2ban
    sudo systemctl start fail2ban
    sudo systemctl status fail2ban # Verifiera att tjänsten körs
    ```
    *Skapa en lokal konfigurationsfil för att anpassa inställningar:*
    ```bash
    # Ändringar görs i .local-filen för att undvika att de skrivs över vid uppdateringar
    sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
    ```
    *Redigera den lokala konfigurationsfilen (`sudo nano /etc/fail2ban/jail.local`) för att aktivera och anpassa skydd (t.ex. för SSH, Nginx-autentisering etc.). Starta om `fail2ban` efter konfigurationsändringar: `sudo systemctl restart fail2ban`.*