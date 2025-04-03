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
REPO_NAME = config["REPO_NAME"]

# API URL:er
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

# Hämta repository-ID
def get_repository_id():
    query = f"""
    query {{
      repository(owner: "{REPO_OWNER}", name: "{REPO_NAME}") {{
        id
      }}
    }}
    """
    result = send_graphql_query(query)
    if result is None:
        raise ValueError("Kunde inte hämta repository-ID.")
    return result["data"]["repository"]["id"]

# Hämta användarprojekt nummer 24
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
                    id
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

# Hämta kort i ett projekt
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
                  title
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

# Radera ett kort
def delete_card(project_id, item_id):
    mutation = """
    mutation($projectId: ID!, $itemId: ID!) {
      deleteProjectV2Item(input: {projectId: $projectId, itemId: $itemId}) {
        deletedItemId
      }
    }
    """
    variables = {
        "projectId": project_id,
        "itemId": item_id
    }
    result = send_graphql_query(mutation, variables)
    if result:
        print(f"Kort med ID {item_id} raderat.")

# Skapa ett issue via REST API
def create_issue(title, body="", labels=None):
    data = {
        "title": title,
        "body": body,
        "labels": labels if labels else []
    }
    result = send_rest_request("POST", "/issues", data)
    if result is None:
        raise ValueError(f"Kunde inte skapa issue: {title}")
    return result["node_id"], result["number"]

# Uppdatera ett befintligt issue via REST API
def update_issue(issue_number, title, body="", labels=None):
    data = {
        "title": title,
        "body": body,
        "labels": labels if labels else []
    }
    result = send_rest_request("PATCH", f"/issues/{issue_number}", data)
    if result is None:
        raise ValueError(f"Kunde inte uppdatera issue: {title}")
    return result["node_id"]

# Lägg till ett issue i projektet
def add_issue_to_project(project_id, content_id):
    mutation = """
    mutation($projectId: ID!, $contentId: ID!) {
      addProjectV2ItemById(input: {projectId: $projectId, contentId: $contentId}) {
        item {
          id
        }
      }
    }
    """
    variables = {
        "projectId": project_id,
        "contentId": content_id
    }
    result = send_graphql_query(mutation, variables)
    if result is None:
        raise ValueError(f"Kunde inte lägga till issue i projektet.")
    return result["data"]["addProjectV2ItemById"]["item"]["id"]

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

# Sätt ett numeriskt fältvärde för ett kort
def set_number_field_value(project_id, item_id, field_id, value):
    mutation = """
    mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!, $value: Float!) {
      updateProjectV2ItemFieldValue(input: {projectId: $projectId, itemId: $itemId, fieldId: $fieldId, value: {number: $value}}) {
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
        "value": float(value)
    }
    result = send_graphql_query(mutation, variables)
    if result is None:
        print(f"Varning: Kunde inte sätta numeriskt fältvärde för fältet med ID {field_id} och värde {value}.")

# Sätt ett datumfältvärde för ett kort
def set_date_field_value(project_id, item_id, field_id, value):
    mutation = """
    mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!, $value: Date!) {
      updateProjectV2ItemFieldValue(input: {projectId: $projectId, itemId: $itemId, fieldId: $fieldId, value: {date: $value}}) {
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
        "value": value
    }
    result = send_graphql_query(mutation, variables)
    if result is None:
        print(f"Varning: Kunde inte sätta datumfältvärde för fältet med ID {field_id} och värde {value}.")

# Sätt ett single-select-fältvärde
def set_single_select_field_value(project_id, item_id, field_id, option_id):
    mutation = """
    mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!, $optionId: String!) {
      updateProjectV2ItemFieldValue(input: {projectId: $projectId, itemId: $itemId, fieldId: $fieldId, value: {singleSelectOptionId: $optionId}}) {
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
        "optionId": option_id
    }
    result = send_graphql_query(mutation, variables)
    if result is None:
        print(f"Varning: Kunde inte sätta single select-fältvärde för fältet med ID {field_id} och option ID {option_id}.")

# Lista JSON-filer i aktuell mapp
def list_json_files():
    json_files = [f for f in os.listdir() if f.endswith('.json')]
    if not json_files:
        print("Inga JSON-filer hittades i aktuell mapp.")
        sys.exit(1)
    print("\nTillgängliga JSON-filer:")
    for i, file in enumerate(json_files, 1):
        print(f"{i}. {file}")
    choice = input("Välj en fil genom att ange numret (1-{}): ".format(len(json_files)))
    try:
        index = int(choice) - 1
        if 0 <= index < len(json_files):
            return json_files[index]
        else:
            print("Ogiltigt val. Avslutar.")
            sys.exit(1)
    except ValueError:
        print("Ogiltigt val. Ange ett nummer. Avslutar.")
        sys.exit(1)

# Huvudfunktion
def main():
    try:
        # Hämta repository-ID
        print("Hämtar repository-ID...")
        repo_id = get_repository_id()

        # Hämta projektet "24"
        print("Hämtar projekt '24'...")
        project_id = get_project_24()

        # Hämta befintliga kort
        print("Hämtar befintliga kort...")
        existing_items = get_project_items(project_id)
        existing_ids = {item["content"]["id"]: (item["id"], item["content"]["number"]) for item in existing_items if "content" in item and "id" in item["content"]}

        # Fråga om att rensa befintliga kort (valfritt)
        delete_existing = input("Vill du rensa alla befintliga kort i projektet '24' innan uppladdning? (ja/nej): ").lower()
        if delete_existing == "ja":
            for item in existing_items:
                delete_card(project_id, item["id"])
            print("Alla befintliga kort raderade.")
            existing_ids.clear()

        # Hämta projektets fält
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
            if field["dataType"] == "SINGLE_SELECT":
                print(f"Debug: Fält '{field['name']}' har alternativen: {field.get('options', [])}")

        # Definiera single-select-alternativ med ID:n
        single_select_options = {
            "team": {
                "dev": "1f6a0bb6",
                "design": "69f27ffd",
                "admin": "04eb096f",
                "backend": "f460ada8",
                "frontend": "238ab404",
                "finance": "3dd94432",
                "ux": "0fc47d9e",
                "ux + dev": "170949fe"
            },
            "user_value": {
                "1": "38a4c7c2",
                "2": "424b52d3",
                "3": "d2f03172",
                "4": "72251a33",
                "5": "1fce7b22"
            },
            "release_version": {
                "r1": "cc9a18a6",
                "r2": "d0a65727",
                "r3": "dda1f518"
            },
            "idea_status": {
                "nytt förslag": "73a395e3",
                "under diskussion": "161abc62",
                "utvärderad": "da572105",
                "accepterad": "041c9d98",
                "avslagen": "b6afe7aa"
            },
            "status | Status": {
                "backlog": "f75ad846",
                "ready": "08afe404",
                "in progress": "47fc9ee4",
                "in review": "4cc61d42",
                "done": "98236657",
                "ideas": "688c8bb5"
            },
            "priority": {
                "p0": "79628723",
                "p1": "0a877460",
                "p2": "da944a9c"
            }
        }

        # Lista och välj JSON-fil
        json_file = list_json_files()
        print(f"Vald JSON-fil: {json_file}")

        try:
            with open(json_file, "r", encoding="utf-8") as f:
                data = json.load(f)
                if not isinstance(data, list):
                    data = [data]

                for item in data:
                    title = item.get("title", "Untitled")
                    body = item.get("body", "")
                    labels = item.get("labels", [])
                    subissues = item.get("subissues", [])
                    item_id = item.get("id")

                    if item_id and item_id in existing_ids:
                        # Uppdatera befintligt issue
                        print(f"Uppdaterar befintligt issue: {title} (ID: {item_id})")
                        issue_number = existing_ids[item_id][1]
                        content_id = update_issue(issue_number, title, body, labels)
                        project_item_id = existing_ids[item_id][0]
                    else:
                        # Skapa nytt issue
                        print(f"Skapar nytt issue: {title}")
                        content_id, issue_number = create_issue(title, body, labels)
                        project_item_id = add_issue_to_project(project_id, content_id)
                        if item_id:
                            existing_ids[item_id] = (project_item_id, issue_number)

                    # Skapa subissues och koppla dem till föräldern
                    for sub_title in subissues:
                        print(f"Skapar subissue: {sub_title} för issue #{issue_number}")
                        sub_body = f"Subissue till #{issue_number}: {title}"
                        sub_content_id, sub_issue_number = create_issue(sub_title, sub_body, labels)
                        sub_project_item_id = add_issue_to_project(project_id, sub_content_id)
                        # Sätt "Parent issue"-fältet om det finns i ProjectV2
                        if "parent" in field_map and field_map["parent"]["dataType"] == "TEXT":
                            set_text_field_value(project_id, sub_project_item_id, field_map["parent"]["id"], str(issue_number))

                    # Sätt fältvärden baserat på JSON-data
                    for field_name, value in item.items():
                        if value is None or field_name in ["title", "body", "labels", "id", "subissues"]:
                            continue
                        field_name_lower = field_name.lower()
                        if field_name_lower not in field_map:
                            print(f"Varning: Fältet '{field_name}' finns inte i projektet och ignoreras.")
                            continue
                        field = field_map[field_name_lower]

                        if field["dataType"] == "TEXT":
                            if field_name_lower == "dependencies":
                                set_text_field_value(project_id, project_item_id, field["id"], ", ".join(value))
                            else:
                                set_text_field_value(project_id, project_item_id, field["id"], value)
                        elif field["dataType"] == "NUMBER":
                            try:
                                set_number_field_value(project_id, project_item_id, field["id"], value)
                            except (ValueError, TypeError):
                                print(f"Varning: Ogiltigt numeriskt värde '{value}' för fältet '{field_name}'.")
                        elif field["dataType"] == "DATE":
                            set_date_field_value(project_id, project_item_id, field["id"], value)
                        elif field["dataType"] == "SINGLE_SELECT":
                            options = single_select_options.get(field_name_lower, {})
                            if not options:
                                # Testa med "status | Status" för att hantera variationer
                                options = single_select_options.get("status | Status", {})
                            option_key = str(value).lower()  # Gör matchningen case-insensitive
                            print(f"Debug: Försöker matcha '{field_name_lower}' med värde '{value}' (key: '{option_key}')")
                            print(f"Debug: Tillgängliga alternativ i single_select_options: {options}")
                            option_id = options.get(option_key)
                            if option_id:
                                print(f"Debug: Hittade option_id '{option_id}' för '{option_key}'")
                                set_single_select_field_value(project_id, project_item_id, field["id"], option_id)
                            else:
                                print(f"Varning: Kunde inte hitta alternativet '{value}' för fältet '{field_name}'.")
                        else:
                            print(f"Varning: Okänd fälttyp '{field['dataType']}' för fältet '{field_name}'.")

        except FileNotFoundError:
            print(f"Filen '{json_file}' hittades inte.")
        except Exception as e:
            print(f"Ett fel uppstod med '{json_file}': {e}")

        print("Alla uppgifter har bearbetats.")

    except ValueError as ve:
        print(f"Fel: {ve}")
    except Exception as e:
        print(f"Ett oväntat fel uppstod: {e}")

if __name__ == "__main__":
    main()