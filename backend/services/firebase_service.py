import json
from google.cloud import secretmanager
import firebase_admin
from firebase_admin import credentials, firestore

# Hämta hemligheter från Secret Manager
def get_secret(secret_name):
    client = secretmanager.SecretManagerServiceClient()
    secret_version = f"projects/innerjourney-c007e/secrets/{secret_name}/versions/latest"
    response = client.access_secret_version(name=secret_version)
    return response.payload.data.decode("UTF-8")

# Hämta Firebase-uppgifter
firebase_credentials_json = get_secret("firebase-credentials")
cred = credentials.Certificate(json.loads(firebase_credentials_json))
firebase_admin.initialize_app(cred)
db = firestore.client()

# Spara data till Firestore
def save_to_firestore(collection, doc_id, data):
    db.collection(collection).document(doc_id).set(data)