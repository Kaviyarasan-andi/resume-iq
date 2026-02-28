from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import requests
import json
import pdfplumber
import os
import re

app = FastAPI()

# 🔥 VERY IMPORTANT (Fix CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "ResumeIQ is running with Ollama 🚀"}


def extract_text_from_pdf(file_path):
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            text += page.extract_text() or ""
    return text.strip()


@app.post("/analyze-pdf")
async def analyze_pdf(file: UploadFile = File(...)):
    file_path = "temp.pdf"

    try:
        contents = await file.read()
        with open(file_path, "wb") as f:
            f.write(contents)

        resume_text = extract_text_from_pdf(file_path)

        if not resume_text:
            return {"error": "Could not extract text from PDF"}

        resume_text = resume_text[:1000]

        prompt = f"""
You are an expert ATS resume evaluator.
Return ONLY valid JSON.

FORMAT:
{{
  "score": number (0-100),
  "strengths": ["clear strength"],
  "weaknesses": ["clear weakness"],
  "suggestions": ["actionable improvement"]
}}

Resume:
{resume_text}
"""

        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "phi3",
                "prompt": prompt,
                "stream": False,
                "options": {
                    "temperature": 0.2,
                    "num_predict": 250
                }
            },
            timeout=120
        )

        result = response.json()
        raw_output = result.get("response", "").strip()

        raw_output = raw_output.replace("\n", " ").replace("\r", "")

        start = raw_output.find("{")
        end = raw_output.rfind("}") + 1

        if start != -1 and end != -1:
            json_str = raw_output[start:end]

            try:
                parsed = json.loads(json_str)
                return parsed
            except:
                return {"error": "JSON parsing failed"}

        return {"error": "No valid JSON found"}

    except Exception as e:
        return {"error": str(e)}

    finally:
        if os.path.exists(file_path):
            os.remove(file_path)