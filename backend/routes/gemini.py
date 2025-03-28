from fastapi import APIRouter
from backend.services.gemini_service import generate_activation
from backend.services.firebase_service import save_to_firestore
from backend.models.activation import ActivationRequest, ActivationResponse
import json

router = APIRouter(prefix="/gemini", tags=["gemini"])

@router.post("/getActivation", response_model=ActivationResponse)
async def get_activation(request: ActivationRequest):
    activation_json = generate_activation(request.mood, request.goal)
    activation = json.loads(activation_json)
    activation_id = f"custom_{int(__import__('time').time())}"
    save_to_firestore("activations", activation_id, {
        "title": activation["title"],
        "description": activation["description"],
        "category_id": "custom",
        "usageCount": 0,
        "createdBy": "AI"
    })
    return ActivationResponse(
        title=activation["title"],
        description=activation["description"],
        activation_id=activation_id
    )