import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("../api_keys.json")  # Relativ sökväg från backend/
firebase_admin.initialize_app(cred)
db = firestore.client()

def save_to_firestore(collection, doc_id, data):
    db.collection(collection).document(doc_id).set(data)