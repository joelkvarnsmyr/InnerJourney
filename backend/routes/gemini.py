from fastapi import APIRouter
import json
import logging
from .activation import ActivationRequest, ActivationResponse
from .gemini_service import generate_activation
from .firebase_service import save_to_firestore

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/getActivation", response_model=ActivationResponse)
async def get_activation(request: ActivationRequest):
    try:
        # Logga inkommande förfrågan
        logger.info(f"Received request: {request}")

        # Generera aktiveringen från Gemini
        activation_json = generate_activation(request.mood, request.goal)
        logger.info(f"Generated activation JSON: {activation_json}")

        # Rensa svaret från eventuell markdown-formatering
        activation_json = activation_json.strip()
        if activation_json.startswith("```json"):
            activation_json = activation_json[7:]  # Ta bort ```json
        if activation_json.endswith("```"):
            activation_json = activation_json[:-3]  # Ta bort avslutande ```
        activation_json = activation_json.strip()

        # Parsa JSON-svaret
        activation = json.loads(activation_json)
        logger.info(f"Parsed activation: {activation}")

        # Kontrollera att alla obligatoriska fält finns
        required_fields = [
            "title", "description", "duration", "activation_type", "category_id",
            "prompt", "log_type", "prerequisite", "repetitions", "questions",
            "ai_assessment", "coach_approval_required", "net_enabled",
            "introduction_message", "preparation_message"
        ]
        for field in required_fields:
            if field not in activation:
                logger.error(f"Missing required field: {field}")
                raise ValueError(f"Activation JSON must contain '{field}'")

        # Generera ett unikt activationId
        activation_id = f"gemini_{int(__import__('time').time())}"

        # Lägg till fält för att tagga som AI-genererat
        activation["activationId"] = activation_id
        activation["source"] = "AI"  # Tagg för att skilja från manuellt skapade

        # Spara aktiveringen i Firestore
        save_to_firestore("exercises", activation_id, activation)

        # Returnera relevanta fält till frontend
        return ActivationResponse(
            title=activation["title"],
            description=activation["description"],
            activation_id=activation_id
        )
    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse activation JSON: {e}")
        raise ValueError("Invalid JSON response from Gemini")
    except Exception as e:
        logger.error(f"Error in get_activation: {e}")
        raise