from fastapi import APIRouter, HTTPException, Depends  # Lägg till Depends
import logging
from datetime import datetime
from typing import List, Dict
from models.onboarding import OnboardingChatRequest, OnboardingChatResponse
from services.firebase_service import save_to_firestore
from services.auth_service import verify_token

router = APIRouter()
logger = logging.getLogger(__name__)

# Frågor som Gemini ska ställa
QUESTIONS = [
    "Hej! Jag är din onboarding-assistent. För att skräddarsy din upplevelse, kan du berätta när du är född? (Ange i formatet ÅÅÅÅ-MM-DD, t.ex. 1990-05-15)",
    "Vad är ditt primära mål med InnerJourney? Välj ett av följande: Stresslindring, Fokus, Självmedvetenhet.",
    "Hur skulle du beskriva dig själv? Är du mer introvert (gillar att vara ensam) eller extrovert (gillar sociala situationer)?",
    "Hur föredrar du att arbeta? En uppgift i taget eller flera uppgifter samtidigt?",
    "Hur känner du dig inför framtiden just nu? Hoppfull eller hopplös?"
]

@router.post("/chat", response_model=OnboardingChatResponse)
async def onboarding_chat(request: OnboardingChatRequest, user: dict = Depends(verify_token)):
    try:
        # Hämta användarens UID från token
        user_id = user.get("uid", request.userId or f"user_{int(datetime.now().timestamp())}")

        # Hämta eller initiera konversationstillstånd
        conversation = request.conversation or []

        # Lägg till användarens svar i konversationen (om det finns)
        if request.userResponse:
            conversation.append({"role": "user", "message": request.userResponse})

        # Kontrollera om vi har ställt alla frågor
        if len(conversation) >= len(QUESTIONS) * 2:  # Varje fråga + svar = 2 meddelanden
            # Alla frågor är besvarade, analysera och spara
            user_data = analyze_conversation(conversation, user_id)
            save_to_firestore("users", user_id, user_data)

            # Spara samtycke (GDPR)
            consent_data = {
                "userId": user_id,
                "agreedAt": datetime.now().isoformat(),
                "version": "v1.0",
            }
            save_to_firestore("consents", user_id, consent_data)

            return OnboardingChatResponse(
                userId=user_id,
                message="Tack för att du slutförde onboardingen! Du kan nu börja din resa med InnerJourney.",
                conversation=conversation,
                isComplete=True
            )

        # Beräkna nästa fråga baserat på konversationens längd
        next_question_index = len(conversation) // 2
        next_question = QUESTIONS[next_question_index]

        # Lägg till nästa fråga i konversationen
        conversation.append({"role": "assistant", "message": next_question})

        return OnboardingChatResponse(
            userId=user_id,
            message=next_question,
            conversation=conversation,
            isComplete=False
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Analysera konversationen och skapa användarprofil
def analyze_conversation(conversation: List[Dict[str, str]], user_id: str) -> Dict[str, any]:
    # Extrahera svaren (varannan rad är ett användarsvar)
    answers = [msg["message"] for msg in conversation if msg["role"] == "user"]

    # Skapa en enkel personlighetsprofil
    personality_type = {
        "traits": [],
        "astroSign": "Taurus",  # Placeholder, kan beräknas från birthDate
        "lifePathNumber": 7,    # Placeholder, kan beräknas från birthDate
    }
    if "introvert" in answers[2].lower():
        personality_type["traits"].append("introvert")
    elif "extrovert" in answers[2].lower():
        personality_type["traits"].append("extrovert")

    # Skapa neurologiska indikatorer
    neuro_tendencies = {
        "adhdScore": 3 if "många" in answers[3].lower() else 0,
        "autismScore": 0,  # Kan utökas i framtiden
    }

    # Skapa välmåendemarkörer
    wellbeing_flags = {
        "depressionRisk": False,  # Kan utökas i framtiden
        "suicideRisk": "hopplös" in answers[4].lower(),
    }

    return {
        "userId": user_id,
        "birthDate": answers[0],
        "createdAt": datetime.now().isoformat(),
        "focusArea": "stress_relief" if "stresslindring" in answers[1].lower() else
                     "focus" if "fokus" in answers[1].lower() else
                     "self_awareness",
        "personalityType": personality_type,
        "neuroTendencies": neuro_tendencies,
        "wellbeingFlags": wellbeing_flags,
        "answers": [
            {"q1": answers[2]},  # Introvert/extrovert
            {"q2": answers[3]},  # Arbetsstil
            {"q3": answers[4]},  # Framtidsutsikter
        ],
    }