from pydantic import BaseModel

class ActivationRequest(BaseModel):
    mood: int
    goal: str

class ActivationResponse(BaseModel):
    title: str
    description: str
    activation_id: str