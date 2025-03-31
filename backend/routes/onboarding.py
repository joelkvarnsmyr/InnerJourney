from fastapi import APIRouter, HTTPException
import logging
from models.onboarding import OnboardingChatRequest, OnboardingChatResponse
from services.onboarding_service import handle_onboarding_chat

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/chat", response_model=OnboardingChatResponse)
async def onboarding_chat(request: OnboardingChatRequest):
    try:
        logger.info(f"Received request: {request}")
        response_dict = handle_onboarding_chat(request)
        logger.info(f"Generated response: {response_dict}")
        return OnboardingChatResponse(**response_dict)
    except Exception as e:
        logger.error(f"Error in onboarding chat: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/test")
async def test_route():
    return {"message": "Onboarding test route works!"}