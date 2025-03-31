from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import gemini, onboarding  # Importera onboarding

app = FastAPI()

# Lägg till CORS-middleware för att tillåta frontend-anrop
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registrera routrarna
app.include_router(gemini.router, prefix="/gemini")
app.include_router(onboarding.router, prefix="/onboarding")  # Registrera onboarding

@app.get("/")
async def root():
    return {"message": "Welcome to InnerJourney Backend"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8080)