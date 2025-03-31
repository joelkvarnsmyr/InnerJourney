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
model = GenerativeModel("gemini-1.5-pro-latest")  # Ändrat till gemini-1.5-pro-latest

def generate_activation(mood: int, goal: str):
    try:
        prompt = f"Given mood {mood}/5 and goal '{goal}', suggest a small step for personal development in JSON format."
        logger.info(f"Generating activation with prompt: {prompt}")
        response = model.generate_content(prompt)
        logger.info(f"Received response: {response.text}")
        return response.text
    except Exception as e:
        logger.error(f"Failed to generate activation: {e}")
        # Returnera ett mockat svar som fallback
        return '{"title": "Mock Step", "description": "This is a mock step due to an error: ' + str(e) + '"}'