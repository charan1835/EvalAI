from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import random
from evaluator import evaluate_answer

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

data = pd.read_csv("Software Questions.csv", encoding="cp1252")

# Endpoint 1 → Get a random question
@app.get("/question")
def get_question(category: str = None):
    filtered = data[data["Category"] == category] if category else data

    if filtered.empty:
        raise HTTPException(status_code=404, detail=f"No questions found for category: {category}")

    # Use Python's random for true randomness each call
    idx = random.randint(0, len(filtered) - 1)
    row = filtered.iloc[idx]

    return {
        "question":   row["Question"],
        "answer":     row["Answer"],
        "category":   row["Category"],
        "difficulty": row["Difficulty"],
    }


# Endpoint 2 → Evaluate answer (full NLP response)
@app.post("/evaluate")
def evaluate(payload: dict):
    reference   = payload.get("reference", "")
    user_answer = payload.get("user_answer", "")

    if not reference or not user_answer:
        raise HTTPException(status_code=400, detail="Both 'reference' and 'user_answer' are required.")

    result = evaluate_answer(reference, user_answer)
    return result


# Endpoint 3 → List categories
@app.get("/categories")
def get_categories():
    cats = sorted(data["Category"].dropna().unique().tolist())
    return {"categories": cats}