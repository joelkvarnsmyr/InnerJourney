from fastapi import FastAPI
from backend.routes import gemini

app = FastAPI(title="Inner Journey Backend")
app.include_router(gemini.router)