from fastapi import Request, HTTPException
from firebase_admin import auth


def verify_token(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Authorization header missing or invalid")

    token = auth_header.split("Bearer ")[1]
    try:
        decoded_token = auth.verify_id_token(token)
        request.state.user = decoded_token
        return decoded_token
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")