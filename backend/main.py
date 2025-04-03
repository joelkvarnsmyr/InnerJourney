from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.gemini import router as gemini_router
from routes.onboarding import router as onboarding_router
from routes.github import router as github_router
import firebase_admin
from firebase_admin import credentials

# Initiera Firebase Admin SDK med ADC
if not firebase_admin._apps:
    firebase_admin.initialize_app()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inkludera routrarna med explicit namn
app.include_router(gemini_router, prefix="/gemini")
app.include_router(onboarding_router, prefix="/onboarding")
app.include_router(github_router, prefix="/api/github")  # Ändra prefix till /api/github

@app.get("/")
async def root():
    return {"message": "Welcome to InnerJourney Backend"}