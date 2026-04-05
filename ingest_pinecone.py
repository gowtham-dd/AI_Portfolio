"""
Pinecone Ingestion Script
Run ONCE to populate Pinecone with portfolio data for the RAG chatbot.

Usage:
  pip install pinecone-client sentence-transformers python-dotenv
  python ingest_pinecone.py
"""
import json
import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
INDEX_NAME = os.getenv("PINECONE_INDEX", "gowtham-portfolio")
DATA_FILE = Path("data/portfolio.json")

def load_data():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def build_chunks(data):
    """Convert portfolio JSON into text chunks for embedding."""
    chunks = []
    p = data["personal"]
    
    # Personal intro chunk
    chunks.append({
        "id": "personal-intro",
        "text": f"Gowtham D is an AI Engineer from India. {p['description']} Email: {p['email']}. Available for work: {p['available']}. Stats: {p['stats']}."
    })
    
    # Each project as a chunk
    for proj in data["projects"]:
        chunks.append({
            "id": f"project-{proj['id']}",
            "text": f"Project: {proj['title']}. Category: {proj['category']}. Year: {proj['year']}. {proj['description']} Tech stack: {', '.join(proj['tech_stack'])}. Impact: {proj['impact']}. GitHub: {proj['github']}."
        })
    
    # Skills chunk
    s = data["skills"]
    chunks.append({
        "id": "skills",
        "text": f"Gowtham's skills: AI/ML: {', '.join(s['ai_ml'])}. MLOps: {', '.join(s['mlops'])}. Languages: {', '.join(s['languages'])}. Databases: {', '.join(s['databases'])}."
    })
    
    # Hackathons chunk
    for h in data["hackathons"]:
        chunks.append({
            "id": f"hackathon-{h['id']}",
            "text": f"Hackathon: {h['title']} ({h['year']}). Result: {h['result']}. Project: {h['project']}. {h['description']}"
        })
    
    # Experience chunk
    for e in data["experience"]:
        chunks.append({
            "id": f"exp-{e['id']}",
            "text": f"Experience: {e['role']} at {e['org']} ({e['period']}). {e['description']}"
        })
    
    return chunks

def ingest():
    if not PINECONE_API_KEY:
        print("❌ PINECONE_API_KEY not set in .env")
        return
    
    print("Loading portfolio data...")
    
    data = load_data()
    chunks = build_chunks(data)
    print(f"Built {len(chunks)} chunks.")

    print("Loading sentence transformer...")
    from sentence_transformers import SentenceTransformer
    encoder = SentenceTransformer("all-MiniLM-L6-v2")
    
    print("Connecting to Pinecone...")
    from pinecone import Pinecone, ServerlessSpec
    pc = Pinecone(api_key=PINECONE_API_KEY)
    
    # Create index if not exists
    existing = [idx.name for idx in pc.list_indexes()]
    if INDEX_NAME not in existing:
        print(f"Creating index '{INDEX_NAME}'...")
        pc.create_index(
            name=INDEX_NAME,
            dimension=384,
            metric="cosine",
            spec=ServerlessSpec(cloud="aws", region="us-east-1")
        )
    
    index = pc.Index(INDEX_NAME)
    
    print("Embedding and upserting...")
    texts = [c["text"] for c in chunks]
    embeddings = encoder.encode(texts).tolist()
    
    vectors = [
        {"id": chunks[i]["id"], "values": embeddings[i], "metadata": {"text": chunks[i]["text"]}}
        for i in range(len(chunks))
    ]
    
    index.upsert(vectors=vectors)
    print(f"✅ Ingested {len(vectors)} vectors into Pinecone index '{INDEX_NAME}'")
    print("\nThe chatbot now has memory of all your projects, skills, and experience!")

if __name__ == "__main__":
    ingest()