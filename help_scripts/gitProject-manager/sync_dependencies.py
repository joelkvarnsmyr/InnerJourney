import requests
import json
import os
import re
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
REPO_NAME = config["REPO_NAME"]

# API URL
GRAPHQL_API_URL = "https://api.github.com/graphql"
REST_API_URL = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}"

# Headers för autentisering
headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
    "Accept": "application/vnd.github+json"
}

# Funktion för att skicka GraphQL-query
def send_graphql_query(query, variables=None):
    payload = {"query": query}
    if variables:
        payload["variables"] = variables
    response = requests.post(GRAPHQL_API_URL, headers=headers, json=payload)
    if response.status_code == 200:
        result = response.json()
        if "data" not in result:
            print(f"Fel: 'data' saknas i GraphQL API-svaret")
            return None
        return result
    else:
        print(f"GraphQL API-anrop misslyckades: {response.status_code} - {response.text}")
        return None

# Funktion för att skicka REST API-anrop
def send_rest_request(method, endpoint, data=None):
    url = f"{REST_API_URL}{endpoint}"
    response = requests.request(method, url, headers=headers, json=data)
    if response.status_code in [200, 201]:
        return response.json()
    else:
        print(f"REST API-anrop misslyckades: {response.status_code} - {response.text}")
        return None

# Hämta alla issues från repositoryn
def get_all_issues():
    query = f"""
    query {{
      repository(owner: "{REPO_OWNER}", name: "{REPO_NAME}") {{
        issues(first: 100) {{
          nodes {{
            id
            title
            number
            body
          }}
        }}
      }}
    }}
    """
    result = send_graphql_query(query)
    if result is None:
        raise ValueError("Kunde inte hämta issues.")
    return result["data"]["repository"]["issues"]["nodes"]

# Hämta projekt 24:s kort för att få ProjectV2-item-ID:n
def get_project_items(project_id):
    query = f"""
    query {{
      node(id: "{project_id}") {{
        ... on ProjectV2 {{
          items(first: 100) {{
            nodes {{
              id
              content {{
                ... on Issue {{
                  id
                  number
                }}
              }}
            }}
          }}
        }}
      }}
    }}
    """
    result = send_graphql_query(query)
    if result is None:
        raise ValueError("Kunde inte hämta befintliga kort.")
    return result["data"]["node"]["items"]["nodes"]

# Lägg till ett befintligt issue som subissue (REST API)
def add_existing_subissue(parent_issue_number, sub_issue_number):
    data = {
        "sub_issue_id": sub_issue_number
    }
    result = send_rest_request("PATCH", f"/issues/{parent_issue_number}/sub_issues", data)
    if result is None:
        print(f"Misslyckades med att koppla issue #{sub_issue_number} som subissue till #{parent_issue_number}")
    else:
        print(f"Kopplade issue #{sub_issue_number} som subissue till #{parent_issue_number}")

# Lägg till beroende mellan två issues ("blocked by")
def add_dependency(blocked_item_id, blocking_item_id):
    mutation = """
    mutation($blockedId: ID!, $blockingId: ID!) {
      addProjectV2ItemDependency(input: {blockedItemId: $blockedId, blockingItemId: $blockingId}) {
        blockedItem {
          id
        }
        blockingItem {
          id
        }
      }
    }
    """
    variables = {
        "blockedId": blocked_item_id,
        "blockingId": blocking_item_id
    }
    result = send_graphql_query(mutation, variables)
    if result:
        print(f"Lade till beroende: Item {blocked_item_id} blockeras av {blocking_item_id}")
    else:
        print(f"Misslyckades med att lägga till beroende mellan {blocked_item_id} och {blocking_item_id}")

# Sätt ett textfältvärde för ett kort (t.ex. Parent issue)
def set_text_field_value(project_id, item_id, field_id, value):
    mutation = """
    mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!, $value: String!) {
      updateProjectV2ItemFieldValue(input: {projectId: $projectId, itemId: $itemId, fieldId: $fieldId, value: {text: $value}}) {
        projectV2Item {
          id
        }
      }
    }
    """
    variables = {
        "projectId": project_id,
        "itemId": item_id,
        "fieldId": field_id,
        "value": str(value)
    }
    result = send_graphql_query(mutation, variables)
    if result is None:
        print(f"Varning: Kunde inte sätta textfältvärde för fältet med ID {field_id} och värde {value}.")

# Hämta projekt-ID för projekt 24
def get_project_24():
    query = f"""
    query {{
      user(login: "{REPO_OWNER}") {{
        projectV2(number: 24) {{
          id
          title
        }}
      }}
    }}
    """
    result = send_graphql_query(query)
    if result is None or not result["data"]["user"]["projectV2"]:
        raise ValueError("Kunde inte hämta projekt 24. Kontrollera att det finns och att du har åtkomst.")
    project = result["data"]["user"]["projectV2"]
    print(f"Hittade projekt: {project['title']} (ID: {project['id']})")
    return project["id"]

# Hämta fält för ett projekt
def get_project_fields(project_id):
    query = f"""
    query {{
      node(id: "{project_id}") {{
        ... on ProjectV2 {{
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
    result = send_graphql_query(query)
    if result is None:
        raise ValueError("Kunde inte hämta projektets fält.")
    return result["data"]["node"]["fields"]["nodes"]

# Huvudfunktion
def main():
    try:
        # Hämta projekt 24:s ID
        print("Hämtar projekt 24...")
        project_id = get_project_24()

        # Hämta alla issues från repositoryn
        print("Hämtar alla issues från repositoryn...")
        issues = get_all_issues()

        # Hämta alla kort från projekt 24
        print("Hämtar alla kort från projekt 24...")
        project_items = get_project_items(project_id)

        # Hämta projektets fält för att få "Parent"-fältets ID
        print("Hämtar projektets fält...")
        fields = get_project_fields(project_id)
        field_map = {}
        for field in fields:
            if "name" not in field:
                print(f"Varning: Hittade ett fält utan 'name'-nyckel: {json.dumps(field)}")
                continue
            field_name_lower = field["name"].lower()
            field_map[field_name_lower] = field
            field_map[field_name_lower.replace(" ", "_")] = field

        # Skapa en mappning av issue-nummer till ProjectV2-item-ID och issue-ID
        item_map = {item["content"]["number"]: (item["id"], item["content"]["id"]) for item in project_items if "content" in item and "number" in item["content"]}
        issue_map = {issue["number"]: issue["id"] for issue in issues}

        # Parsa och koppla beroenden/subissues
        for issue in issues:
            body = issue["body"]
            issue_id = issue["id"]
            issue_number = issue["number"]

            # Hitta beroenden i body (t.ex. "Väntar på #Task3" eller "#123")
            dependencies = re.findall(r"Väntar på #Task(\d+)|#(\d+)", body)
            for dep in dependencies:
                dep_number = int(dep[0] or dep[1])  # Välj första matchande grupp som inte är tom
                if dep_number in issue_map:
                    blocking_issue_id = issue_map[dep_number]
                    if issue_number in item_map and dep_number in item_map:
                        blocked_item_id, blocked_content_id = item_map[issue_number]
                        blocking_item_id, blocking_content_id = item_map[dep_number]
                        print(f"Hittade beroende: Issue #{issue_number} väntar på #{dep_number}")
                        # Lägg till som beroende i ProjectV2
                        add_dependency(blocked_item_id, blocking_item_id)
                        # Sätt "Parent"-fältet för subissue om det finns
                        if "parent" in field_map and field_map["parent"]["dataType"] == "TEXT":
                            set_text_field_value(project_id, blocking_item_id, field_map["parent"]["id"], str(issue_number))
                    else:
                        print(f"Varning: Issue #{issue_number} eller #{dep_number} saknas i projekt 24.")
                else:
                    print(f"Varning: Issue #{dep_number} hittades inte i repositoryn för beroende till #{issue_number}")

        print("Alla beroenden och subissues har bearbetats.")

    except ValueError as ve:
        print(f"Fel: {ve}")
    except Exception as e:
        print(f"Ett oväntat fel uppstod: {e}")

if __name__ == "__main__":
    main()