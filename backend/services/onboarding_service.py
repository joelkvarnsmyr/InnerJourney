import logging
from datetime import datetime
from typing import Dict, List
from models.onboarding import OnboardingChatRequest  # Assuming this is defined in models/onboarding.py
from services.firebase_service import save_to_firestore  # Assuming this is defined in services/firebase_service.py

logger = logging.getLogger(__name__)

# Lista med frågor som assistenten ställer under onboardingen
QUESTIONS = [
    "Hej! När är du född? (ÅÅÅÅ-MM-DD)",
    "Vad är ditt primära mål? Stresslindring, Fokus eller Självmedvetenhet?",
    "Är du introvert eller extrovert?",
    "Hur föredrar du att arbeta? En uppgift i taget eller flera samtidigt?",
    "Hur känner du dig inför framtiden? Hoppfull eller hopplös?"
]


def handle_onboarding_chat(request: OnboardingChatRequest) -> Dict:
    """
    Hanterar onboardingsamtalet och returnerar nästa steg i konversationen.

    :param request: Ett OnboardingChatRequest-objekt med userId, userResponse och conversation.
    :return: Ett dictionary med userId, message, conversation och isComplete.
    """
    # Sätt conversation till tom lista om den är None
    conversation = request.conversation if request.conversation is not None else []

    # Generera user_id om det inte finns
    user_id = request.userId or f"user_{int(datetime.now().timestamp())}"

    # Hämta användarens svar om det finns
    user_response = request.userResponse

    # Lägg till användarens svar i konversationen om det finns
    if user_response:
        conversation.append({"role": "user", "message": user_response})

    # Kontrollera om alla frågor är besvarade (antal meddelanden >= antal frågor * 2)
    if len(conversation) >= len(QUESTIONS) * 2:
        # Analysera konversationen och spara användardata
        user_data = analyze_conversation(conversation, user_id)
        save_to_firestore("users", user_id, user_data)
        return {
            "userId": user_id,
            "message": "Tack! Nu kan du börja din resa.",
            "conversation": conversation,
            "isComplete": True
        }

    # Beräkna index för nästa fråga
    next_question_index = len(conversation) // 2
    next_question = QUESTIONS[next_question_index]

    # Lägg till nästa fråga i konversationen
    conversation.append({"role": "assistant", "message": next_question})

    # Returnera svaret
    return {
        "userId": user_id,
        "message": next_question,
        "conversation": conversation,
        "isComplete": False
    }


def analyze_conversation(conversation: List[Dict[str, str]], user_id: str) -> Dict:
    """
    Analyserar användarens svar och skapar en profil.

    :param conversation: Lista med konversationsmeddelanden.
    :param user_id: Användarens ID.
    :return: Ett dictionary med användarprofilen.
    """
    # Extrahera användarens svar (varannan meddelande är ett användarsvar)
    answers = [msg["message"] for msg in conversation if msg["role"] == "user"]

    # Skapa profil baserat på svaren
    return {
        "userId": user_id,
        "birthDate": answers[0],
        "focusArea": answers[1].lower(),
        "personality": "introvert" if "introvert" in answers[2].lower() else "extrovert",
        "workStyle": answers[3],
        "outlook": answers[4]
    }