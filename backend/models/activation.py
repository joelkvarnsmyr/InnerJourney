from pydantic import BaseModel
from typing import List

class ActivationRequest(BaseModel):
    mood: int
    goal: str

class ActivationResponse(BaseModel):
    title: str
    description: str
    duration: int
    activation_type: str
    category_id: str
    prompt: str
    log_type: str
    prerequisite: str
    repetitions: int
    questions: List[str]
    ai_assessment: bool
    coach_approval_required: bool
    net_enabled: bool
    introduction_message: str
    preparation_message: str
    activation_id: str
    source: str