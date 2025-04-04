import requests
import json
import os
from pathlib import Path
import sys
from cryptography.fernet import Fernet

# --- Sökvägar för lagring av nycklar och kryptering ---
HOME_DIR = Path.home()
CONFIG_FILE = HOME_DIR / ".github_config"
ENCRYPTION_KEY_FILE = HOME_DIR / ".github_encryption_key"


# --- Funktioner för hantering av konfiguration ---
def generate_encryption_key():
    key = Fernet.generate_key()
    with open(ENCRYPTION_KEY_FILE, 'wb') as f:
        f.write(key)
    os.chmod(ENCRYPTION_KEY_FILE, 0o600)
    return key


def save_config(config, encryption_key):
    fernet = Fernet(encryption_key)
    encrypted_config = fernet.encrypt(json.dumps(config).encode())
    with open(CONFIG_FILE, 'wb') as f:
        f.write(encrypted_config)
    os.chmod(CONFIG_FILE, 0o600)


def load_config():
    if not ENCRYPTION_KEY_FILE.exists() or not CONFIG_FILE.exists():
        return None
    try:
        with open(ENCRYPTION_KEY_FILE, 'rb') as f:
            encryption_key = f.read()
        fernet = Fernet(encryption_key)
        with open(CONFIG_FILE, 'rb') as f:
            encrypted_config = f.read()
        return json.loads(fernet.decrypt(encrypted_config).decode())
    except Exception as e:
        print(f"Fel vid laddning av konfiguration: {e}")
        return None


def get_config():
    saved_config = load_config()
    if saved_config and all(key in saved_config for key in ["GITHUB_TOKEN", "REPO_OWNER", "REPO_NAME"]):
        print("Använder sparad GitHub-konfiguration.")
        return saved_config
    else:
        print("Konfiguration saknas eller är ofullständig.")
        token = input("Ange din GitHub-token: ").strip()
        owner = input("Ange din GitHub-användare (REPO_OWNER): ").strip()
        repo = input("Ange repository-namn (REPO_NAME): ").strip()
        if not token or not owner or not repo:
            print("Alla fält (token, ägare, repo) måste anges. Avslutar.")
            sys.exit(1)
        config = {
            "GITHUB_TOKEN": token,
            "REPO_OWNER": owner,
            "REPO_NAME": repo
        }
        save_choice = input("Vill du spara konfigurationen för framtida användning? (ja/nej): ").strip().lower()
        if save_choice == "ja":
            encryption_key = generate_encryption_key()
            save_config(config, encryption_key)
            print("Konfigurationen har sparats säkert i ~/.github_config.")
        return config


# --- Hämta konfiguration ---
config = get_config()
TOKEN = config["GITHUB_TOKEN"]
REPO_OWNER = config["REPO_OWNER"]

# GraphQL API URL
API_URL = "https://api.github.com/graphql"

# Headers för autentisering
headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json"
}


# Funktion för att skicka GraphQL-query
def send_query(query):
    payload = {"query": query}
    response = requests.post(API_URL, headers=headers, json=payload)
    if response.status_code == 200:
        result = response.json()
        if "data" not in result:
            print(f"Fel: 'data' saknas i API-svaret")
            return None
        return result
    else:
        print(f"API-anrop misslyckades: {response.status_code} - {response.text}")
        return None


# Hämta och lista fält för projekt 24
def list_project_fields():
    query = f"""
    query {{
      user(login: "{REPO_OWNER}") {{
        projectV2(number: 24) {{
          id
          title
          fields(first: 50) {{
            nodes {{
              ... on ProjectV2Field {{
                id
                name
                dataType
              }}
              ... on ProjectV2SingleSelectField {{
                id
                name
                dataType
                options {{
                  id
                  name
                }}
              }}
              ... on ProjectV2IterationField {{
                id
                name
                dataType
                configuration {{
                  iterations {{
                    startDate
                    title
                  }}
                }}
              }}
            }}
          }}
        }}
      }}
    }}
    """
    result = send_query(query)
    if result is None or not result["data"]["user"]["projectV2"]:
        print("Kunde inte hämta projekt 24. Kontrollera att det finns och att du har åtkomst.")
        return

    project = result["data"]["user"]["projectV2"]
    print(f"\nProjekt: {project['title']} (ID: {project['id']})")
    fields = project["fields"]["nodes"]

    print("\nTillgängliga fält:")
    print("--------------------------------")
    for field in fields:
        if "name" not in field:
            print("Varning: Hittade ett fält utan 'name'-nyckel:", json.dumps(field))
            continue
        print(f"Namn: {field['name']}")
        print(f"Datatyp: {field['dataType']}")
        if field["dataType"] == "SINGLE_SELECT" and "options" in field:
            print("Alternativ:")
            for option in field["options"]:
                print(f"  - {option['name']} (ID: {option['id']})")
        elif field["dataType"] == "ITERATION" and "configuration" in field:
            print("Iterationer:")
            for iteration in field["configuration"]["iterations"]:
                print(f"  - {iteration['title']} (Start: {iteration['startDate']})")
        print("--------------------------------")


# Kör scriptet
if __name__ == "__main__":
    list_project_fields()