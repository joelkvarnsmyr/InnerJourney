from fastapi import APIRouter
from backend.services.gemini_service import generate_activation
from backend.services.firebase_service import save_to_firestore
from backend.models.activation import ActivationRequest, ActivationResponse
import json
import logging

# Sätt upp loggning
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/gemini", tags=["gemini"])


@router.post("/getActivation", response_model=ActivationResponse)
async def get_activation(request: ActivationRequest):
    try:
        logger.info(f"Received request: {request}")
        activation_json = generate_activation(request.mood, request.goal)
        logger.info(f"Generated activation JSON: {activation_json}")

        # Rengör svaret från markdown-formatering
        activation_json = activation_json.strip()
        if activation_json.startswith("```json"):
            activation_json = activation_json[7:]  # Ta bort ```json
        if activation_json.endswith("```"):
            activation_json = activation_json[:-3]  # Ta bort avslutande ```
        activation_json = activation_json.strip()

        # Försök att parsa JSON
        activation = json.loads(activation_json)
        logger.info(f"Parsed activation: {activation}")

        # Hämta title och description från suggestion
        suggestion = activation.get("suggestion", {})
        title = suggestion.get("title")
        description = suggestion.get("description")

        # Kontrollera att fälten finns
        if not title or not description:
            logger.error("Missing required fields in activation JSON")
            raise ValueError("Activation JSON must contain 'title' and 'description' in 'suggestion'")

        activation_id = f"custom_{int(__import__('time').time())}"
        save_to_firestore("activations", activation_id, {
            "title": title,
            "description": description,
            "category_id": "custom",
            "usageCount": 0,
            "createdBy": "AI"
        })

        return ActivationResponse(
            title=title,
            description=description,
            activation_id=activation_id
        )
    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse activation JSON: {e}")
        raise ValueError("Invalid JSON response from Gemini")
    except Exception as e:
        logger.error(f"Error in get_activation: {e}")
        raise