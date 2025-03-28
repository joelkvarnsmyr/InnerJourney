import os
import uvicorn
from fastapi import FastAPI
from backend.routes import gemini  # Importera routern från gemini.py

app = FastAPI()

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