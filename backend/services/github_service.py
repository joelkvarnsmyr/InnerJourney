# services/github_service.py
import logging
import aiohttp
from google.cloud import secretmanager
from typing import Dict, Any

# Sätt upp loggning
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# --- Hämta hemligheter från Google Cloud Secret Manager ---
def get_secret(secret_name):
    """Hämtar en hemlighet från Google Cloud Secret Manager."""
    try:
        client = secretmanager.SecretManagerServiceClient()
        project_id = "innerjourney-c007e"
        secret_version_name = f"projects/{project_id}/secrets/{secret_name}/versions/latest"
        logger.info(f"Fetching secret version: {secret_version_name}")
        response = client.access_secret_version(name=secret_version_name)
        secret_value = response.payload.data.decode("UTF-8")
        logger.info(f"Successfully fetched secret: {secret_name}")
        return secret_value
    except Exception as e:
        logger.error(f"Failed to fetch secret {secret_name}: {e}", exc_info=True)
        raise RuntimeError(f"Could not fetch secret: {secret_name}") from e

try:
    github_token = get_secret("github-pat")
    if not github_token:
        raise ValueError("GitHub token fetched from Secret Manager is empty.")
except Exception as e:
    logger.critical(f"CRITICAL: Failed to fetch GitHub token on startup: {e}")
    raise

# --- Hämta all data från GitHub-projektet ---
async def fetch_all_project_data_from_github() -> Dict[str, Any]:
    """Hämtar ALL data från GitHub för projekt 24 under användaren joelkvarnsmyr och returnerar den råa strukturen."""
    if not github_token:
        logger.error("GitHub token is not available.")
        raise Exception("GitHub token är inte konfigurerad.")

    try:
        query = """
        # Din GraphQL-query här (oförändrad)
        """
        headers = {"Authorization": f"Bearer {github_token}", "Content-Type": "application/json"}
        logger.info("Fetching ALL data from GitHub for project 24 under user joelkvarnsmyr...")
        async with aiohttp.ClientSession() as session:
            async with session.post("https://api.github.com/graphql", json={"query": query}, headers=headers) as response:
                if response.status != 200:
                    logger.error(f"GitHub API returned status {response.status}: {await response.text()}")
                    raise Exception(f"GitHub API error: {response.status}")
                data = await response.json()
        if "errors" in data:
            logger.error(f"GraphQL errors: {data['errors']}")
            raise Exception(f"GraphQL error: {data['errors']}")
        if not data.get("data") or not data["data"]["user"] or not data["data"]["user"]["projectV2"]:
            logger.error(f"Unexpected data structure: {data}")
            raise Exception("Kunde inte hitta projektdata.")
        return data["data"]["user"]["projectV2"]
    except Exception as e:
        logger.error(f"Failed to fetch GitHub data: {e}", exc_info=True)
        raise Exception(f"Fel vid hämtning av GitHub-data: {str(e)}")