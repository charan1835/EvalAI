# EvalAI — Backend

FastAPI backend for the EvalAI Software Interview Evaluator.

## Stack
- **FastAPI** — REST API framework
- **Sentence Transformers** (`all-MiniLM-L6-v2`) — Semantic similarity scoring
- **scikit-learn** — Cosine similarity computation
- **pandas** — CSV question bank loading

## Setup

```bash
# Install dependencies
python -m pip install -r requirements.txt

# Run the development server
python -m uvicorn main:app --reload
```

Server runs at **http://localhost:8000**

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/question` | Get a random question. Optional `?category=` param |
| `POST` | `/evaluate` | Evaluate an answer against the reference |
| `GET` | `/categories` | List all available categories |

## Evaluate Payload

```json
POST /evaluate
{
  "reference": "The expected answer...",
  "user_answer": "The user's answer..."
}
```

## Response

```json
{
  "composite_score": 7.42,
  "semantic_score": 8.1,
  "keyword_score": 6.3,
  "keyword_coverage_pct": 63.0,
  "matched_keywords": ["constructor", "object", "initializes"],
  "missed_keywords": ["instantiation", "properties"],
  "feedback": "Good"
}
```
