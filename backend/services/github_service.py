import logging
import aiohttp
from functools import lru_cache
from google.cloud import secretmanager

# Sätt upp loggning
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_secret(secret_name):
    """Hämtar en hemlighet från Google Cloud Secret Manager."""
    try:
        client = secretmanager.SecretManagerServiceClient()
        secret_version = f"projects/innerjourney-c007e/secrets/{secret_name}/versions/latest"
        logger.info(f"Fetching secret: {secret_name}")
        response = client.access_secret_version(name=secret_version)
        return response.payload.data.decode("UTF-8")
    except Exception as e:
        logger.error(f"Failed to fetch secret {secret_name}: {e}")
        raise

# Hämta GitHub-token
try:
    github_token = get_secret("github-pat")
except Exception as e:
    logger.error(f"Failed to fetch GitHub token: {e}")
    raise

@lru_cache(maxsize=1)
async def fetch_moscow_data():
    """Hämtar MoSCoW-data från GitHub för ett specifikt projekt."""
    try:
        # GraphQL-query för att hämta projekt 24 från användaren joelkvarnsmyr
        query = """
        query {
          user(login: "joelkvarnsmyr") {
            projectV2(number: 24) {
              items(first: 100) {
                nodes {
                  id
                  content {
                    ... on Issue {
                      title
                      body
                      url
                      assignees(first: 10) {
                        nodes {
                          login
                        }
                      }
                      labels(first: 10) {
                        nodes {
                          name
                        }
                      }
                      milestone {
                        title
                      }
                      parent {
                        title
                        url
                      }
                    }
                    ... on DraftIssue {
                      title
                      body
                      assignees(first: 10) {
                        nodes {
                          login
                        }
                      }
                    }
                  }
                  fieldValues(first: 15) {
                    nodes {
                      ... on ProjectV2ItemFieldSingleSelectValue {
                        name
                        field {
                          ... on ProjectV2FieldCommon { name }
                          ... on ProjectV2SingleSelectField { name }
                          ... on ProjectV2IterationField { name }
                        }
                      }
                      ... on ProjectV2ItemFieldTextValue {
                        text
                        field {
                          ... on ProjectV2FieldCommon { name }
                        }
                      }
                      ... on ProjectV2ItemFieldNumberValue {
                        number
                        field {
                          ... on ProjectV2FieldCommon { name }
                        }
                      }
                      ... on ProjectV2ItemFieldDateValue {
                        date
                        field {
                          ... on ProjectV2FieldCommon { name }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        """

        headers = {
            "Authorization": f"Bearer {github_token}",
            "Content-Type": "application/json",
        }

        logger.info("Fetching GitHub project data...")
        async with aiohttp.ClientSession() as session:
            async with session.post("https://api.github.com/graphql", json={"query": query}, headers=headers) as response:
                response.raise_for_status()
                data = await response.json()

        if "errors" in data:
            logger.error(f"GraphQL error: {data['errors']}")
            raise Exception(f"GraphQL error: {data['errors']}")

        # Organisera datan i MoSCoW-kategorier
        items = data["data"]["user"]["projectV2"]["items"]["nodes"]
        project_data = {
            "Must have": [],
            "Should have": [],
            "Could have": [],
            "Won't have": []
        }

        for item in items:
            # Hämta MoSCoW-kategori
            moscow_category = next(
                (fv["name"] for fv in item["fieldValues"]["nodes"] if fv.get("field", {}).get("name") == "MoSCoW"),
                None
            )
            if not moscow_category:
                continue

            # Hämta fältvärden och mappa dem till en dictionary för snabbare åtkomst
            field_values = item["fieldValues"]["nodes"]
            field_map = {}
            for fv in field_values:
                field_name = fv.get("field", {}).get("name")
                if field_name:
                    field_map[field_name] = fv

            # Hämta fält från mappade värden
            status = field_map.get("Status", {}).get("name")
            sub_issues_progress = field_map.get("Sub-issues progress", {}).get("text")
            priority = field_map.get("Priority", {}).get("name")
            size = field_map.get("Size", {}).get("name")
            estimate = field_map.get("Estimate", {}).get("number")
            iteration = field_map.get("Iteration", {}).get("name")
            start_date = field_map.get("Start date", {}).get("date")
            deadline = field_map.get("End date", {}).get("date")  # Byt namn till deadline
            user_value = field_map.get("User Value", {}).get("name")
            dependencies = field_map.get("Dependencies", {}).get("text", "").split(",")
            objective = field_map.get("Objective", {}).get("text")
            team = field_map.get("Team", {}).get("name")
            release_version = field_map.get("Release version", {}).get("name")
            financial_impact = field_map.get("Financial Impact", {}).get("number")
            quarter = field_map.get("Quarter", {}).get("text")
            risk = field_map.get("Risk", {}).get("text")
            stakeholder = field_map.get("Stakeholder", {}).get("text")
            funding_source = field_map.get("Funding Source", {}).get("text")
            idea_status = field_map.get("Idea Status", {}).get("name")  # Nytt fält

            # Hämta fält från Issue eller DraftIssue
            content = item["content"]
            assignees = [assignee["login"] for assignee in content.get("assignees", {}).get("nodes", [])] if "assignees" in content else []
            labels = [label["name"] for label in content.get("labels", {}).get("nodes", [])] if "labels" in content else []
            milestone = content.get("milestone", {}).get("title") if content.get("milestone") else None
            parent_issue = content.get("parent", {}).get("title") if content.get("parent") else None
            parent_issue_url = content.get("parent", {}).get("url") if content.get("parent") else None

            # Skapa projektitem
            project_item = {
                "id": item["id"],
                "title": content.get("title", "Utan titel"),
                "description": content.get("body", "Ingen beskrivning"),
                "url": content.get("url", "https://github.com/users/joelkvarnsmyr/projects/24"),
                "status": status,
                "subIssuesProgress": sub_issues_progress,
                "priority": priority,
                "size": size,
                "estimate": estimate,
                "iteration": iteration,
                "start_date": start_date,
                "deadline": deadline,  # Byt namn från end_date till deadline
                "moscow": moscow_category,
                "user_value": user_value,
                "dependencies": dependencies,
                "objective": objective,
                "team": team,
                "assignees": assignees,
                "labels": labels,
                "milestone": milestone,
                "parentIssue": parent_issue,
                "parentIssueUrl": parent_issue_url,
                "release_version": release_version,
                "financial_impact": financial_impact,
                "quarter": quarter,
                "risk": risk,
                "stakeholder": stakeholder,
                "funding_source": funding_source,
                "idea_status": idea_status,  # Nytt fält
            }

            project_data[moscow_category].append(project_item)

        logger.info("GitHub project data fetched and organized successfully")
        return project_data

    except Exception as e:
        logger.error(f"Failed to fetch GitHub project data: {e}", exc_info=True)
        raise Exception(f"Fel vid hämtning av GitHub-data: {str(e)}")