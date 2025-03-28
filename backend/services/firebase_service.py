cat << 'EOF' > ~/projects/innerjourney/backend/services/firebase_service.py
import os
import firebase_admin
from firebase_admin import credentials, firestore

# Försök att ladda Firebase-uppgifter från en säker plats
try:
    cred_path = os.path.expanduser("~/.secrets/api-keys.json")
    if os.path.exists(cred_path):
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
        db = firestore.client()
        def save_to_firestore(collection, doc_id, data):
            db.collection(collection).document(doc_id).set(data)
    else:
        print("Firebase credentials not found at ~/.secrets/api-keys.json. Using mock instead.")
        def save_to_firestore(collection, doc_id, data):
            print(f"Mock: Saving to {collection}/{doc_id}: {data}")
except Exception as e:
    print(f"Failed to initialize Firebase: {e}. Using mock instead.")
    def save_to_firestore(collection, doc_id, data):
        print(f"Mock: Saving to {collection}/{doc_id}: {data}")
EOF