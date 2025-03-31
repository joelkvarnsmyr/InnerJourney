import requests
import json
import os
from dotenv import load_dotenv

# Ladda miljövariabler från .env-filen
load_dotenv()

# Hämta konfigurationsvärden från .env
TOKEN = os.getenv("GITHUB_TOKEN")
REPO_OWNER = os.getenv("REPO_OWNER")
REPO_NAME = os.getenv("REPO_NAME")

# Kontrollera att alla nödvändiga variabler finns
if not TOKEN or not REPO_OWNER or not REPO_NAME:
    raise ValueError("Saknar nödvändiga miljövariabler i .env-filen: GITHUB_TOKEN, REPO_OWNER och REPO_NAME måste anges.")

# GraphQL API URL
API_URL = "https://api.github.com/graphql"

# Headers för autentisering
headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}

# Funktion för att skicka GraphQL-query
def send_query(query, variables=None):
    payload = {"query": query}
    if variables:
        payload["variables"] = variables
    response = requests.post(API_URL, headers=headers, json=payload)
    if response.status_code == 200:
        result = response.json()
        print(f"API-svar: {json.dumps(result, indent=2)}")
        if "data" not in result:
            print(f"Fel: 'data' saknas i API-svaret")
            return None
        return result
    else:
        print(f"API-anrop misslyckades: {response.status_code} - {response.text}")
        return None

# Hämta repository-ID
def get_repository_id():
    query = f"""
    query {{
      repository(owner: "{REPO_OWNER}", name: "{REPO_NAME}") {{
        id
      }}
    }}
    """
    result = send_query(query)
    if result is None:
        raise ValueError("Kunde inte hämta repository-ID.")
    repo_id = result["data"]["repository"]["id"]
    print(f"Hämtat repository-ID: {repo_id}")
    return repo_id

# Hämta befintliga ProjectV2-projekt
def get_projects():
    query = f"""
    query {{
      repository(owner: "{REPO_OWNER}", name: "{REPO_NAME}") {{
        projectsV