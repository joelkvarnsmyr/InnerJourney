# services/github_service.py
import logging
import aiohttp
from google.cloud import secretmanager
from typing import Dict, Any

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def get_secret(secret_name):
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

async def fetch_all_project_data_from_github() -> Dict[str, Any]:
    if not github_token:
        logger.error("GitHub token is not available.")
        raise Exception("GitHub token är inte konfigurerad.")

    try:
        query = """
        query {
          user(login: "joelkvarnsmyr") {
            projectV2(number: 24) {
              id
              title
              url
              shortDescription
              public
              closed
              readme
              owner {
                ... on User { login }
                ... on Organization { login }
              }
              createdAt
              updatedAt
              fields(first: 100) {
                totalCount
                nodes {
                  ... on ProjectV2Field {
                    id
                    name
                    dataType
                  }
                  ... on ProjectV2SingleSelectField {
                    id
                    name
                    dataType
                    options { id name color description }
                  }
                  ... on ProjectV2IterationField {
                    id
                    name
                    dataType
                    configuration {
                      startDay
                      duration
                      iterations { id title startDate duration }
                      completedIterations { id title startDate duration }
                    }
                  }
                }
                pageInfo { hasNextPage endCursor }
              }
              items(first: 100) {
                totalCount
                nodes {
                  id
                  type
                  isArchived
                  createdAt
                  updatedAt
                  fieldValues(first: 100) {
                    totalCount
                    nodes {
                      ... on ProjectV2ItemFieldTextValue {
                        text
                        field {
                          ... on ProjectV2Field {
                            id
                            name
                            dataType
                          }
                        }
                      }
                      ... on ProjectV2ItemFieldNumberValue {
                        number
                        field {
                          ... on ProjectV2Field {
                            id
                            name
                            dataType
                          }
                        }
                      }
                      ... on ProjectV2ItemFieldDateValue {
                        date
                        field {
                          ... on ProjectV2Field {
                            id
                            name
                            dataType
                          }
                        }
                      }
                      ... on ProjectV2ItemFieldSingleSelectValue {
                        name
                        optionId
                        field {
                          ... on ProjectV2SingleSelectField {
                            id
                            name
                            dataType
                            options { id name }
                          }
                        }
                      }
                      ... on ProjectV2ItemFieldIterationValue {
                        title
                        iterationId
                        startDate
                        duration
                        field {
                          ... on ProjectV2IterationField {
                            id
                            name
                            dataType
                          }
                        }
                      }
                    }
                    pageInfo { hasNextPage endCursor }
                  }
                  content {
                    ... on Issue {
                      id
                      title
                      url
                      body
                      state
                      number
                      createdAt
                      updatedAt
                      closedAt
                      author { login }
                      assignees(first: 100) { totalCount nodes { login } }
                      labels(first: 100) { totalCount nodes { id name color } }
                      milestone { id title dueOn state }
                      repository { id name owner { login } }
                    }
                    ... on PullRequest {
                      id
                      title
                      url
                      body
                      state
                      number
                      createdAt
                      updatedAt
                      closedAt
                      merged
                      mergedAt
                      author { login }
                      assignees(first: 100) { totalCount nodes { login } }
                      labels(first: 100) { totalCount nodes { id name color } }
                      milestone { id title dueOn state }
                      repository { id name owner { login } }
                    }
                    ... on DraftIssue {
                      id
                      title
                      body
                      createdAt
                      updatedAt
                      creator { login }
                    }
                  }
                }
                pageInfo { hasNextPage endCursor }
              }
            }
          }
        }
        """
        headers = {"Authorization": f"Bearer {github_token}", "Content-Type": "application/json"}
        logger.info("Fetching data from GitHub for project 24...")
        logger.debug(f"GraphQL query being sent: {query}")
        async with aiohttp.ClientSession() as session:
            payload = {"query": query.strip()}
            logger.debug(f"Sending payload: {payload}")
            async with session.post("https://api.github.com/graphql", json=payload, headers=headers) as response:
                response_text = await response.text()
                logger.debug(f"GitHub API response: {response_text}")
                if response.status != 200:
                    logger.error(f"GitHub API returned status {response.status}: {response_text}")
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