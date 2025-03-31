from fastapi import APIRouter
import json
import logging
from models.activation import ActivationRequest, ActivationResponse
from services.gemini_service import generate_activation
from services.firebase_service import save_to_firestore

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/getActivation", response_model=ActivationResponse)
async def get_activation(request: ActivationRequest):
    try:
        logger.info(f"Received request: {request}")
        activation_json = generate_activation(request.mood, request.goal)
        logger.info(f"Generated activation JSON: {activation_json}")

        # Rensa svaret från markdown-formatering
        activation_json = activation_json.strip()
        if activation_json.startswith("```json"):
            activation_json = activation_json[7:]
        if activation_json.endswith("```"):
            activation_json = activation_json[:-3]
        activation_json = activation_json.strip()

        # Parsa JSON
        activation = json.loads(activation_json)
        logger.info(f"Parsed activation: {activation}")

        # Validera obligatoriska fält
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

        # Lägg till ett unikt ID och tagg som AI-genererat
        activation_id = f"gemini_{int(__import__('time').time())}"
        activation["activation_id"] = activation_id  # Uppdaterat till "activation_id"
        activation["source"] = "AI"

        # Spara till Firestore
        save_to_firestore("exercises", activation_id, activation)

        # Returnera svar till frontend
        return ActivationResponse(**activation)

    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse activation JSON: {e}")
        raise ValueError("Invalid JSON response from Gemini")
    except Exception as e:
        logger.error(f"Error in get_activation: {e}")
        raise