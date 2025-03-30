# Använd en officiell Python-image som bas
FROM python:3.10-slim

# Sätt arbetsmappen i containern
WORKDIR /app

# Kopiera requirements.txt och installera beroenden
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Kopiera resten av backend-applikationen
COPY . .

# Exponera porten som applikationen lyssnar på
EXPOSE 8080

# Kommando för att starta applikationen
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]