from fastapi import APIRouter, HTTPException, Depends
import json
import logging
from datetime import datetime
from models.activation import ActivationRequest, ActivationResponse
from services.gemini_service import generate_activation
from services.firebase_service import save_to_firestore
from services.auth_service import verify_token  # Uppdaterad import

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/getActivation", response_model=ActivationResponse)
async def get_activation(request: ActivationRequest, user: dict = Depends(verify_token)):
    try:
        logger.info(f"Received request: {request}")
        mood = request.mood
        goal = request.goal
        profile = request.profile if request.profile else {}

        if not mood or not goal:
            logger.error("Mood and goal are required")
            raise HTTPException(status_code=400, detail="Mood and goal are required")

        # Generera aktivering med profildata
        activation_json = generate_activation(mood, goal, profile)
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
                raise HTTPException(status_code=400, detail=f"Activation JSON must contain '{field}'")

        # Lägg till ett unikt ID, tagg som AI-genererat och metadata
        user_id = user.get("uid")
        activation_id = f"gemini_{int(__import__('time').time())}"
        activation["activation_id"] = activation_id
        activation["source"] = "AI"
        activation["created_at"] = datetime.now().isoformat()
        activation["user_id"] = user_id

        # Spara till Firestore
        save_to_firestore("activations", user_id, activation)

        # Returnera svar till frontend
        return ActivationResponse(**activation)

    except json.JSONDecodeError as e:
        logger.error(f"Failed to parse activation JSON: {e}")
        raise HTTPException(status_code=500, detail=f"Invalid JSON response from Gemini: {str(e)}")
    except ValueError as e:
        logger.error(f"Validation error: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Error in get_activation: {e}")
        raise HTTPException(status_code=500, detail=f"Error generating activation: {str(e)}")