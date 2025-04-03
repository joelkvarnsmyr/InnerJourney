from fastapi import APIRouter, HTTPException
import logging
from services.github_service import fetch_moscow_data

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get("/moscow", response_model=dict)
async def get_moscow_data():  # Ta bort user: dict = Depends(verify_token)
    """Hämtar MoSCoW-data från GitHub för ett specifikt projekt."""
    try:
        logger.info("Anrop till /github/moscow mottaget")
        moscow_data = fetch_moscow_data()
        return moscow_data
    except Exception as e:
        logger.error(f"Fel vid hämtning av GitHub-data: {e}")
        raise HTTPException(status_code=500, detail=f"Fel vid hämtning av GitHub-data: {str(e)}")