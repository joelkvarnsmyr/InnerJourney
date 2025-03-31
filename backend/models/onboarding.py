from pydantic import BaseModel
from typing import List, Dict, Optional

class OnboardingChatRequest(BaseModel):
    userId: Optional[str] = None
    userResponse: Optional[str] = None
    conversation: Optional[List[Dict[str, str]]] = None

class OnboardingChatResponse(BaseModel):
    userId: str
    message: str
    conversation: List[Dict[str, str]]
    isComplete: bool