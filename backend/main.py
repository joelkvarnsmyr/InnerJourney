import os
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import gemini  # Importera routern från gemini.py

app = FastAPI()

# Lägg till CORS-middleware för att tillåta förfrågningar från frontend
# OBS: allow_origins=["*"] är okej för testning, men i produktion bör du begränsa till specifika domäner
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Tillåter alla domäner (endast för test!)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inkludera routern från gemini.py med prefix /gemini
app.include_router(gemini.router, prefix="/gemini")

# En enkel rot-endpoint för att testa
@app.get("/")
async def root():
    return {"message": "Welcome to InnerJourney Backend"}

# Dynamically get the port from the environment variable, default to 8080
port = int(os.getenv("PORT", 8080))

if __name__ == "__main__":
    # Dynamiskt bestäm modulnamnet
    module_name = __package__ or __name__
    uvicorn.run(f"{module_name}:app", host="0.0.0.0", port=port)