import os
import logging
from google.cloud import secretmanager
from google.generativeai import GenerativeModel
import google.generativeai as genai

# Sätt upp loggning
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Hämta hemligheter från Secret Manager
def get_secret(secret_name):
    try:
        client = secretmanager.SecretManagerServiceClient()
        secret_version = f"projects/innerjourney-c007e/secrets/{secret_name}/versions/latest"
        logger.info(f"Fetching secret: {secret_name}")
        response = client.access_secret_version(name=secret_version)
        return response.payload.data.decode("UTF-8")
    except Exception as e:
        logger.error(f"Failed to fetch secret {secret_name}: {e}")
        raise

# Hämta Gemini API-nyckel
try:
    api_key = get_secret("gemini-api-key")
    genai.configure(api_key=api_key)
except Exception as e:
    logger.error(f"Failed to configure Gemini API: {e}")
    raise

# Definiera modellen och generera aktivering
model = GenerativeModel("gemini-1.5-pro-latest")  # Använder den senaste modellen

def generate_activation(mood: int, goal: str):
    try:
        prompt = f"""
Givet användarens humör {mood}/5 och mål '{goal}', generera en personlig aktivering för personlig utveckling. Aktiveringen ska följa InnerJourney-arkitekturen och inkludera följande fält i JSON-format:

- "title": En kort, engagerande titel för aktiveringen.
- "description": En kort beskrivning av vad användaren ska göra.
- "duration": Uppskattad tid i minuter för aktiveringen.
- "activation_type": Typ av aktivering (t.ex. "meditation", "physical", "social", "ai_assessment", "live_event").
- "category_id": Kategori för aktiveringen (t.ex. "inner_child", "manifest", "shadows", "brainsync", "sleep").
- "prompt": En kort instruktion eller uppmaning till användaren.
- "log_type": Hur användaren ska logga sin upplevelse (t.ex. "text", "video", "audio").
- "prerequisite": Eventuella förkrav för aktiveringen (lämna tomt om inga finns).
- "repetitions": Hur många gånger användaren ska upprepa aktiveringen.
- "questions": En lista med reflektionsfrågor för användaren efter aktiveringen.
- "ai_assessment": Om aktiveringen involverar AI-bedömning (true eller false).
- "coach_approval_required": Om coachgodkännande krävs (true eller false).
- "net_enabled": Om aktiveringen kräver internet (true eller false).
- "introduction_message": Ett meddelande för att introducera aktiveringen.
- "preparation_message": Ett meddelande för att förbereda användaren.

Se till att svaret är ett giltigt JSON-objekt med alla dessa fält.
"""
        logger.info(f"Generating activation with prompt: {prompt}")
        response = model.generate_content(prompt)
        logger.info(f"Received response: {response.text}")
        return response.text
    except Exception as e:
        logger.error(f"Failed to generate activation: {e}")
        # Returnera ett mockat svar som fallback
        return '{"title": "Mock Step", "description": "This is a mock step due to an error: ' + str(e) + '"}'