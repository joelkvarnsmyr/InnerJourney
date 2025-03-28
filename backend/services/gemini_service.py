import os
from google.cloud import secretmanager
from google.generativeai import GenerativeModel
import google.generativeai as genai

# Hämta hemligheter från Secret Manager
def get_secret(secret_name):
    client = secretmanager.SecretManagerServiceClient()
    secret_version = f"projects/innerjourney-c007e/secrets/{secret_name}/versions/latest"
    response = client.access_secret_version(name=secret_version)
    return response.payload.data.decode("UTF-8")

# Hämta Gemini API-nyckel
api_key = get_secret("gemini-api-key")
genai.configure(api_key=api_key)

# Definiera modellen och generera aktivering
model = GenerativeModel("gemini-1.5-pro")

def generate_activation(mood: int, goal: str):
    prompt = f"Given mood {mood}/5 and goal '{goal}', suggest a small step for personal development in JSON format."
    response = model.generate_content(prompt)
    return response.text