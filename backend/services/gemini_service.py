import os
from google.generativeai import GenerativeModel
import google.generativeai as genai

# Load API key from environment variable
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    # Mock if no API key is provided
    def generate_activation(mood: int, goal: str):
        return '{"title": "Mock Step", "description": "This is a mock step for testing."}'
else:
    genai.configure(api_key=api_key)
    model = GenerativeModel("gemini-pro")

    def generate_activation(mood: int, goal: str):
        prompt = f"Given mood {mood}/5 and goal '{goal}', suggest a small step for personal development in JSON format."
        response = model.generate_content(prompt)
        return response.text