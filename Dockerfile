FROM python:3.11-slim

WORKDIR /portfolio

# System deps
RUN apt-get update && apt-get install -y --no-install-recommends gcc && rm -rf /var/lib/apt/lists/*

# Install core deps (skip heavy ML deps unless GROQ/Pinecone env vars are set)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Try to install AI deps (graceful fail if resource constrained)
RUN pip install --no-cache-dir groq pinecone-client || true

# Copy app
COPY . .

EXPOSE 8000

CMD ["python", "app.py"]