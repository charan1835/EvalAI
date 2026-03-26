from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import re

model = SentenceTransformer("all-MiniLM-L6-v2")

STOPWORDS = {
    "a","an","the","is","are","was","were","be","been","being","have","has","had",
    "do","does","did","will","would","could","should","may","might","must","shall",
    "can","to","of","in","on","at","by","for","with","about","as","into","through",
    "during","before","after","above","below","up","down","out","off","over","under",
    "again","then","once","here","there","when","where","why","how","all","both",
    "each","few","more","most","other","some","such","no","nor","not","only","own",
    "same","so","than","too","very","just","but","and","or","if","it","its","this",
    "that","these","those","i","you","he","she","we","they","what","which","who",
    "also","from","between","among","their","your","our","my","his","her","any",
}

def extract_keywords(text: str) -> list:
    text = re.sub(r"[^\w\s]", " ", text.lower())
    words = text.split()
    seen, unique = set(), []
    for w in words:
        if w not in STOPWORDS and len(w) > 2 and w not in seen:
            seen.add(w)
            unique.append(w)
    return unique


def keyword_coverage(ref_keywords: list, user_text: str):
    user_lower = user_text.lower()
    matched, missed = [], []
    for kw in ref_keywords:
        if re.search(r'\b' + re.escape(kw) + r'\b', user_lower):
            matched.append(kw)
        else:
            missed.append(kw)
    coverage = round(len(matched) / len(ref_keywords) * 100, 1) if ref_keywords else 0.0
    return matched, missed, coverage


def evaluate_answer(reference: str, user_answer: str) -> dict:
    # 1. Semantic similarity via sentence embeddings
    emb1 = model.encode(reference)
    emb2 = model.encode(user_answer)
    raw_sim = float(cosine_similarity([emb1], [emb2])[0][0])

    # Normalize: typical unrelated sentences have similarity ~0.1–0.2
    # Perfect match = 1.0 → score 10, completely unrelated ~0.1 → score ~0
    BASELINE = 0.10   # floor similarity for truly random text
    normalized = max(0.0, (raw_sim - BASELINE) / (1.0 - BASELINE))
    semantic_score = round(min(normalized * 10, 10.0), 2)

    # 2. Keyword extraction & coverage
    ref_keywords = extract_keywords(reference)
    matched_kws, missed_kws, coverage_pct = keyword_coverage(ref_keywords, user_answer)
    keyword_score = round(coverage_pct / 10, 2)

    # 3. Composite (60% semantic + 40% keyword)
    composite = round(min(0.6 * semantic_score + 0.4 * keyword_score, 10.0), 2)

    # 4. Label
    if composite >= 8:
        feedback = "Excellent"
    elif composite >= 6:
        feedback = "Good"
    elif composite >= 4:
        feedback = "Needs Improvement"
    else:
        feedback = "Poor"

    return {
        "composite_score":      composite,
        "semantic_score":       semantic_score,
        "keyword_score":        keyword_score,
        "keyword_coverage_pct": coverage_pct,
        "matched_keywords":     matched_kws[:15],
        "missed_keywords":      missed_kws[:10],
        "feedback":             feedback,
        "score":                composite,   # legacy field
    }