# routes/github.py
from fastapi import APIRouter, HTTPException
from typing import Dict, Any
import logging
from services.github_service import fetch_all_project_data_from_github

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get("/project",
            response_model=Dict[str, Any],
            summary="Hämta all projekt-data",
            description="Hämtar all rådata för projekt 24 från GitHub.")
async def get_project_data():
    try:
        logger.info("Anrop till /api/github/project mottaget")
        project_data = await fetch_all_project_data_from_github()
        logger.info("Returnerar projekt-data")
        return project_data
    except Exception as e:
        logger.error(f"Fel i /api/github/project: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Fel vid hämtning av projektdata: {str(e)}")