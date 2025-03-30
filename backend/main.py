import os
import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import gemini  # Importera routern från gemini.py

app = FastAPI()

# Lägg till CORS-middleware för att tillåta förfrågningar från frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Tillåt förfrågningar från localhost (för utveckling)
        "https://innerjourney-c007e.web.app",  # Lägg till din deployade frontend-URL
    ],
    allow_credentials=True,
    allow_methods=["*"],  # Tillåter alla HTTP-metoder (GET, POST, etc.)
    allow_headers=["*"],  # Tillåter alla headers
)

# Inkludera routern från gemini.py
app.include_router(gemini.router)

# En enkel rot-endpoint för att testa
@app.get("/")
async def root():
    return {"message": "Welcome to InnerJourney Backend"}

# Dynamically get the port from the environment variable, default to 8080
port = int(os.getenv("PORT", 8080))

if __name__ == "__main__":
    uvicorn.run("backend.main:app", host="0.0.0.0", port=port)