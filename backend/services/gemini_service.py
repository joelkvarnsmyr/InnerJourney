from google.generative_ai import GenerativeModel
import google.generative_ai as genai

genai.configure(api_key="din-gemini-api-nyckel")  # Ersätt med din API-nyckel
model = GenerativeModel("gemini-pro")

def generate_activation(mood: int, goal: str):
    prompt = f"Given mood {mood}/5 and goal '{goal}', suggest a small step for personal development in JSON format."
    response = model.generate_content(prompt)
    return response.text  # Förväntar JSON-sträng, t.ex. {"title": "Andas", "description": "..."}