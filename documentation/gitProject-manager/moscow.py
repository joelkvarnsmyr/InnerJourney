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
        projectsV2(first: 10) {{
          nodes {{
            id
            title
          }}
        }}
      }}
    }}
    """
    result = send_query(query)
    if result is None:
        raise ValueError("Kunde inte hämta projekt.")
    return result["data"]["repository"]["projectsV2"]["nodes"]

# Hämta fält för ett projekt
def get_project_fields(project_id):
    query = f"""
    query {{
      node(id: "{project_id}") {{
        ... on ProjectV2 {{
          fields(first: 20) {{
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
            }}
          }}
        }}
      }}
    }}
    """
    result = send_query(query)
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
            }}
          }}
        }}
      }}
    }}
    """
    result = send_query(query)
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
    result = send_query(mutation, variables)
    if result:
        print(f"Kort med ID {item_id} raderat.")

# Skapa ett kort i projektet
def create_card(project_id, title, description=""):
    mutation = """
    mutation($projectId: ID!, $title: String!, $description: String) {
      addProjectV2DraftIssue(input: {projectId: $projectId, title: $title, body: $description}) {
        projectItem {
          id
        }
      }
    }
    """
    variables = {
        "projectId": project_id,
        "title": title,
        "description": description
    }
    result = send_query(mutation, variables)
    if result is None:
        raise ValueError(f"Kunde inte skapa kort: {title}")
    return result["data"]["addProjectV2DraftIssue"]["projectItem"]["id"]

# Sätt ett textfältvärde för ett kort
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
    result = send_query(mutation, variables)
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
    result = send_query(mutation, variables)
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
    result = send_query(mutation, variables)
    if result is None:
        print(f"Varning: Kunde inte sätta datumfältvärde för fältet med ID {field_id} och värde {value}.")

# Sätt ett single-select-fältvärde (t.ex. Status, Todos)
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
    result = send_query(mutation, variables)
    if result is None:
        print(f"Varning: Kunde inte sätta single select-fältvärde för fältet med ID {field_id} och option ID {option_id}.")

# Huvudfunktion
def main():
    try:
        # Hämta repository-ID
        print("Hämtar repository-ID...")
        repo_id = get_repository_id()

        # Hämta och lista befintliga projekt
        print("Hämtar befintliga projekt...")
        projects = get_projects()
        if not projects:
            print("Inga ProjectV2-projekt hittades. Skapa ett projekt manuellt i GitHub och försök igen.")
            return
        print("Välj ett projekt att ladda upp till genom att ange dess nummer:")
        for i, project in enumerate(projects, 1):
            print(f"{i}. {project['title']} (ID: {project['id']})")
        project_choice = int(input("Ange numret på projektet: ")) - 1
        if project_choice < 0 or project_choice >= len(projects):
            raise ValueError("Ogiltigt val av projekt.")
        selected_project = projects[project_choice]
        project_id = selected_project["id"]
        print(f"Valt projekt: {selected_project['title']}")

        # Fråga om att rensa befintliga kort
        delete_existing = input("Vill du rensa alla befintliga kort i projektet innan uppladdning? (ja/nej): ").lower()
        if delete_existing == "ja":
            print("Hämtar befintliga kort...")
            items = get_project_items(project_id)
            for item in items:
                delete_card(project_id, item["id"])
            print("Alla befintliga kort raderade.")

        # Hämta projektets fält
        print("Hämtar projektets fält...")
        fields = get_project_fields(project_id)
        field_map = {field["name"].lower(): field for field in fields}

        # Ladda data från moscow.json
        json_file = "moscow.json"
        try:
            with open(json_file, "r", encoding="utf-8") as f:
                data = json.load(f)
                for item in data:
                    # Skapa ett kort
                    title = item.get("title", "Untitled")
                    description = item.get("description", "")
                    print(f"Skapar kort: {title}")
                    item_id = create_card(project_id, title, description)

                    # Sätt fältvärden baserat på JSON-data
                    for field_name, value in item.items():
                        field_name_lower = field_name.lower()
                        if field_name_lower in field_map:
                            field = field_map[field_name_lower]
                            # Ignorera vissa systemfält som inte kan sättas
                            if field_name_lower in ["title", "assignees", "labels", "linked pull requests", "milestone", "repository", "reviewers", "parent issue", "sub-issues progress"]:
                                continue
                            # Hantera single select-fält
                            if field["dataType"] == "SINGLE_SELECT":
                                option = next((opt for opt in field["options"] if opt["name"].lower() == str(value).lower()), None)
                                if option:
                                    set_single_select_field_value(project_id, item_id, field["id"], option["id"])
                                else:
                                    print(f"Varning: Kunde inte hitta alternativet '{value}' för fältet '{field_name}'.")
                            # Hantera numeriska fält
                            elif field["dataType"] == "NUMBER":
                                set_number_field_value(project_id, item_id, field["id"], value)
                            # Hantera datumfält
                            elif field["dataType"] == "DATE":
                                set_date_field_value(project_id, item_id, field["id"], value)
                            # Hantera textfält
                            elif field["dataType"] == "TEXT":
                                set_text_field_value(project_id, item_id, field["id"], value)
                            else:
                                print(f"Varning: Okänd fälttyp '{field['dataType']}' för fältet '{field_name}'.")
        except FileNotFoundError:
            print(f"Filen {json_file} hittades inte.")
        except Exception as e:
            print(f"Ett fel uppstod med {json_file}: {e}")

        print("Alla uppgifter har bearbetats.")

    except ValueError as ve:
        print(f"Fel: {ve}")
    except Exception as e:
        print(f"Ett oväntat fel uppstod: {e}")

if __name__ == "__main__":
    main()