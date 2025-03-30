Användarmanual för AiAss.py

Version: (Baserad på kod från 2025-03-24)
Modell: Använder gemini-2.5-pro-exp-03-25 (Experimentell)

1. Översikt

AiAss.py är ett kommandoradsverktyg designat för att hjälpa dig i ditt InnerJourney-projekt. Det använder Google Gemini för att:

Skapa ny dokumentation: Generera Markdown-filer baserat på ett ämne du anger.

Formatera befintlig text: Ta råtext och formatera om den till en professionell Markdown-fil.

Svara på frågor: Analysera och svara på frågor baserat på innehållet i specifika kod- och/eller dokumentationsfiler du anger.

Scriptet använder alltid dina styrdokument i mappen documentation/X_styrdokument som övergripande kontext när det skapar ny dokumentation för att säkerställa konsekvens. För Q&A-läget används endast de filer du explicit anger som kontext.

2. Förutsättningar

Innan du kan använda scriptet, se till att följande är uppfyllt:

Python 3.x: Installerat på din dator.

Bibliotek: Nödvändiga Python-paket installerade i din virtuella miljö (venv). Kör från projektets rotmapp (innerjourney):

source venv/bin/activate  # Eller venv\Scripts\activate på Windows
pip install google-generativeai google-cloud-secret-manager google-api-core
Use code with caution.
Bash
Google Cloud SDK (gcloud): Installerat och konfigurerat.

Google Cloud Autentisering: Du måste vara inloggad med ett konto som har åtkomst till Google Cloud Secret Manager för ditt projekt (innerjourney-c007e). Kör en gång i terminalen:

gcloud auth application-default login
Use code with caution.
Bash
Google Cloud Secrets:

En secret med namnet gemini-api-key måste finnas i projektet innerjourney-c007e och innehålla din giltiga Gemini API-nyckel.

Kontot du använde i gcloud auth ... måste ha rollen Secret Manager Secret Accessor för denna secret.

Scriptets Plats: Filen AiAss.py ska ligga direkt i mappen documentation i ditt projekt.

Styrdokument: Mappen documentation/X_styrdokument/ ska finnas och innehålla dina .md-styrdokument (t.ex. projektbeskrivning_master.md, utveckling_master.md). Scriptet läser alla .md-filer i denna mapp när du skapar ny dokumentation.

3. Köra Scriptet

Rekommenderad Plats: Öppna din terminal och navigera till projektets rotmapp (innerjourney). Detta gör det enklast att ange sökvägar till kodfiler.

cd /sökväg/till/innerjourney
Use code with caution.
Bash
Aktivera Miljö: Se till att din virtuella miljö är aktiv:

source venv/bin/activate # Eller motsvarande för Windows
Use code with caution.
Bash
Grundläggande Kommando:

python documentation/AiAss.py <LÄGESFLAGGA> [ARGUMENT FÖR LÄGET]
Use code with caution.
Bash
Du måste alltid ange en av de tre lägesflaggorna: --create-doc, --create-doc-from-text, eller --ask.

4. Lägen och Användning

4.1. Skapa Nytt Dokument från Ämne (--create-doc)

Använd detta för att låta AI:n skriva ett nytt dokument från grunden.

Syfte: Generera en ny .md-fil om ett specifikt ämne.

Kommando:

python documentation/AiAss.py --create-doc --category "<KATEGORI>" --topic "<ÄMNE>"
Use code with caution.
Bash
Argument:

--category "<KATEGORI>": (Obligatorisk) Anger målmappen. Använd nummer ("3") eller namn/alias ("Teknisk", "Teknisk Dokumentation"). Scriptet mappar detta till rätt undermapp (t.ex. documentation/3_teknisk_dokumentation/).

--topic "<ÄMNE>": (Obligatorisk) Beskriv vad dokumentet ska handla om. Detta används som instruktion till AI:n och för att automatiskt skapa ett filnamn (t.ex. beskrivning_av_databas.md).

Kontext: Innehållet från alla .md-filer i documentation/X_styrdokument/ skickas automatiskt med till AI:n.

Flöde:

Scriptet bestämmer målmapp och filnamn.

Läser styrdokumenten.

Anropar Gemini för att generera innehållet.

Visar en förhandsgranskning av de första raderna.

Frågar om du vill skapa filen (eller skriva över om den finns).

Sparar filen vid bekräftelse (j).

Exempel:

# Skapa dokument om säkerhetsstrategi i mappen 4_sakerhet_och_test
python documentation/AiAss.py --create-doc --category "Säkerhet" --topic "Övergripande säkerhetsstrategi för API:et"

# Skapa dokument om aktiveringar i mappen 2_anvandarupplevelse
python documentation/AiAss.py --create-doc --category "2" --topic "Hur aktiveringar föreslås till användaren"
Use code with caution.
Bash
4.2. Skapa Dokument från Befintlig Text (--create-doc-from-text)

Använd detta för att omvandla din egen råtext till en formaterad Markdown-fil.

Syfte: Formatera om text du tillhandahåller via terminalen till en professionell .md-fil.

Kommando (via fil):

cat sökväg/till/min_text.txt | python documentation/AiAss.py --create-doc-from-text --category "<KATEGORI>"
Use code with caution.
Bash
Kommando (via inklistring):

python documentation/AiAss.py --create-doc-from-text --category "<KATEGORI>"
# (Klistra in text här...)
# (Avsluta med Ctrl+D på ny rad på Linux/Mac, eller Ctrl+Z + Enter på Windows)
Use code with caution.
Bash
Argument:

--category "<KATEGORI>": (Obligatorisk) Anger målmappen, precis som för --create-doc.

Input: Texten måste skickas via "standard input" (stdin).

Kontext: Innehållet från alla .md-filer i documentation/X_styrdokument/ skickas automatiskt med till AI:n för att säkerställa konsekvent formatering och terminologi.

Flöde:

Scriptet väntar på och läser text från stdin.

Försöker extrahera en titel från texten för att skapa ett filnamn.

Bestämmer målmapp.

Läser styrdokumenten.

Anropar Gemini och instruerar den att formatera om den givna texten (inte skriva nytt).

Visar förhandsgranskning och frågar om bekräftelse.

Sparar den formaterade filen vid bekräftelse (j).

Exempel:

# Läs text från filen 'raw_deployment_notes.txt' och skapa formaterad fil i Teknisk Dokumentation
cat docs/raw_deployment_notes.txt | python documentation/AiAss.py --create-doc-from-text --category "3"

# Klistra in text direkt för att skapa fil om ekonomiprocesser
python documentation/AiAss.py --create-doc-from-text --category "Ekonomi"
# (Klistra in...)
# Titel: Faktureringsrutiner
# ## Skapa faktura
# 1. Logga in...
# (Ctrl+D)
Use code with caution.
Bash
4.3. Ställ Fråga om Kod/Dokument (--ask)

Använd detta för att ställa frågor och få svar baserat på specifika filer. Detta läge har inget minne (stateless).

Syfte: Få svar på frågor om kod eller dokumentation baserat på innehållet i angivna filer.

Kommando:

python documentation/AiAss.py --ask --question "<FRÅGA>" [--code-file <FIL>...] [--doc-file <FIL>...]
Use code with caution.
Bash
Argument:

--question "<FRÅGA>": (Obligatorisk) Din fråga.

--code-file <FIL>: (Valfri, kan upprepas) Ange en kodfil som kontext.

Ange sökväg relativt projektets rotmapp (innerjourney), t.ex. backend/main.py.

Du kan också ange bara filnamnet (t.ex. main.py). Scriptet söker då i projektet (ignorerar mappar som venv, node_modules, .git etc.). Om exakt en match hittas används den. Om flera hittas får du en numrerad lista och måste välja.

--doc-file <FIL>: (Valfri, kan upprepas) Ange en dokumentationsfil som kontext.

Ange sökväg relativt dokumentationsmappen (documentation), t.ex. 3_teknisk_dokumentation/api.md eller X_styrdokument/utveckling_master.md.

Du kan också ange bara filnamnet (t.ex. api.md). Scriptet söker då inom documentation-mappen. Om flera matchar får du välja.

Kontext: Endast innehållet från de filer du explicit anger (och som hittas/väljs) skickas med frågan. Styrdokumenten inkluderas inte automatiskt här (men du kan ange dem med --doc-file X_styrdokument/... om de är relevanta för frågan).

Flöde:

Scriptet letar upp de angivna filerna (ber om val vid behov).

Läser innehållet i de valda filerna.

Anropar Gemini med frågan och filinnehållet.

Skriver ut svaret direkt i terminalen.

Exempel:

# Förklara en funktion, sök efter filnamn
python documentation/AiAss.py --ask --question "Förklara 'save_to_firestore'" --code-file firebase_service.py

# Fråga om koppling mellan backend och frontend, ange båda (sökning + val om tvetydigt)
python documentation/AiAss.py --ask --question "Hur anropas /gemini/getActivation från frontend?" --code-file main.py --code-file ActivationService.ts

# Fråga om innehåll i ett specifikt styrdokument
python documentation/AiAss.py --ask --question "Vilken branch-strategi används enligt styrdokumentet?" --doc-file X_styrdokument/utveckling_master.md
Use code with caution.
Bash
5. Generella Tips

Kör från projektets rot (innerjourney) för enklast hantering av sökvägar i --ask-läget.

Använd citattecken (") runt argument som innehåller mellanslag.

Var specifik i dina --topic och --question för bästa resultat.

För --ask, välj relevanta filer. Att skicka med för mycket irrelevant kontext kan förvirra AI:n och ökar risken att nå token-gränser.

Läs igenom genererad text och svar. AI:n är ett verktyg, inte ofelbar. Komplettera och korrigera vid behov.

6. Felsökning

Fel om API-nyckel / Permission Denied: Kör gcloud auth application-default login igen. Kontrollera att din API-nyckel finns i Secret Manager under rätt namn (gemini-api-key) och att ditt Google-konto har rollen Secret Manager Secret Accessor.

Fel om "Model not found": Den experimentella modellen (gemini-2.5-pro-exp-03-25) kanske inte är tillgänglig för din API-nyckel. Öppna AiAss.py och ändra MODEL_NAME tillbaka till "gemini-1.5-pro-latest".

Fil hittades inte (i --ask): Kontrollera stavning och sökväg. Om du angav ett filnamn, se till att filen finns inom sökområdet (projektet för --code-file, documentation för --doc-file) och inte i en ignorerad mapp (som venv).

Fel om Token Limits: Prompten (inklusive master-kontext eller Q&A-kontext) blev för lång. Försök med en kortare --topic/--question eller färre/mindre filer i --ask. För --create-doc*, kan du behöva korta ner styrdokumenten i X_styrdokument.

7. Modellval

Scriptet är just nu inställt på att använda den experimentella modellen "gemini-2.5-pro-exp-03-25". Om detta ger problem, kan du enkelt byta till den stabila gemini-1.5-pro-latest genom att redigera variabeln MODEL_NAME överst i AiAss.py-filen.