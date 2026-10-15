import os
import io
import json
from typing import List, Optional
from dotenv import load_dotenv
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sarvamai import SarvamAI

# Load environment variables from .env
load_dotenv()

API_KEY = os.getenv("SARVAM_API_KEY")
if not API_KEY or API_KEY == "your_actual_key_here":
    print("WARNING: SARVAM_API_KEY is not set or using placeholder in .env!")

app = FastAPI(
    title="TamilPalam Sarvam AI Voice Assistant Backend",
    description="Backend service integrating Sarvam Speech-to-Text, Chat Completion, and Text-to-Speech for Tamil learners.",
    version="1.0.0",
)

# Enable CORS so frontend can communicate with zero friction
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_sarvam_client() -> SarvamAI:
    key = os.getenv("SARVAM_API_KEY")
    if not key or key == "your_actual_key_here":
        raise HTTPException(
            status_code=500,
            detail="SARVAM_API_KEY is not configured on the server. Please set it in .env."
        )
    return SarvamAI(api_subscription_key=key)

# System prompt specially crafted for Tamil learners in Classes 6–8 (Standards 6–8, ages 11–14)
SYSTEM_PROMPT = """You are Kili (கிளி), a friendly, cheerful, and wise Tamil learning assistant on TamilPalam.
You are helping school students in Classes 6 to 8 (Standards 6–8, ages 11–14).

Guidelines for your replies:
1. Explain Tamil grammar (இலக்கணம்), vocabulary (சொற்களஞ்சியம்), Thirukkural (திருக்குறள்), proverbs (பழமொழிகள்), and everyday Tamil conversations clearly and enthusiastically.
2. Reply primarily in natural, authentic, grammatically correct Tamil.
3. For words or concepts that might be challenging for Class 6–8 students from non-Tamil speaking backgrounds, include a brief English/Tanglish meaning in parentheses.
4. Keep replies focused, student-friendly, and concise (usually 2 to 4 sentences).
5. Always be encouraging! Use warm phrases like 'அருமை!' (Excellent!), 'நல்ல கேள்வி!' (Great question!), 'தொடர்ந்து முயற்சி செய்யுங்கள்!' (Keep trying!).
"""

class Message(BaseModel):
    role: str
    content: str

class TextChatRequest(BaseModel):
    message: str
    history: Optional[List[Message]] = None

class AssistantResponse(BaseModel):
    transcript: str
    reply: str
    audio: Optional[str] = None
    success: bool = True

class TTSRequest(BaseModel):
    text: str
    pace: Optional[float] = 1.0
    speaker: Optional[str] = "kavitha"

class TTSResponse(BaseModel):
    audio: str
    text: str
    cached: bool = False
    success: bool = True

# In-memory TTS Cache to avoid redundant API calls for repeated vocabulary/phrases
TTS_CACHE: dict[str, str] = {}

@app.get("/api/sarvam/health")
def health_check():
    key_set = bool(os.getenv("SARVAM_API_KEY"))
    return {
        "status": "ok",
        "service": "TamilPalam Sarvam AI Assistant",
        "key_configured": key_set,
        "models": {
            "stt": "saaras:v4",
            "chat": "sarvam-105b-conversations",
            "tts": "bulbul:v3"
        }
    }

@app.post("/api/sarvam/chat", response_model=AssistantResponse)
def text_chat(request: TextChatRequest):
    """
    Text-based query:
    1. Generates response using sarvam-105b-conversations.
    2. Synthesizes Tamil audio response using Sarvam TTS.
    """
    user_query = request.message.strip()
    if not user_query:
        raise HTTPException(status_code=400, detail="Message cannot be empty")

    client = get_sarvam_client()

    # Build messages array with system prompt and prior conversation context
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    if request.history:
        for msg in request.history[-6:]:  # Keep recent history
            messages.append({"role": msg.role, "content": msg.content})
    messages.append({"role": "user", "content": user_query})

    try:
        chat_res = client.chat.completions(
            model="sarvam-105b-conversations",
            messages=messages,
            temperature=0.7,
            max_tokens=400,
        )
        assistant_reply = chat_res.choices[0].message.content.strip()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Sarvam Chat error: {str(e)}")

    # Convert assistant reply to Tamil speech using Bulbul TTS
    audio_base64 = None
    try:
        # Generate speech in Tamil (ta-IN)
        tts_res = client.text_to_speech.convert(
            text=assistant_reply,
            language_code="ta-IN",
            model="bulbul:v3",
            speaker="kavitha",  # Warm, clear female speaker ideal for educational edtech
        )
        if tts_res.audios and len(tts_res.audios) > 0:
            audio_base64 = tts_res.audios[0]
    except Exception as tts_err:
        # If TTS fails, we still return the text response gracefully
        print(f"TTS generation notice: {tts_err}")

    return AssistantResponse(
        transcript=user_query,
        reply=assistant_reply,
        audio=audio_base64,
        success=True
    )

@app.post("/api/sarvam/tts", response_model=TTSResponse)
def text_to_speech(request: TTSRequest):
    """
    Direct Text-to-Speech using Sarvam Bulbul v3 in Tamil (ta-IN).
    Includes in-memory caching to avoid repeated API calls.
    """
    tamil_text = request.text.strip()
    if not tamil_text:
        raise HTTPException(status_code=400, detail="Text cannot be empty")

    pace = request.pace if request.pace and 0.5 <= request.pace <= 2.0 else 1.0
    speaker = request.speaker or "kavitha"
    cache_key = f"{tamil_text}::{pace}::{speaker}"

    if cache_key in TTS_CACHE:
        return TTSResponse(
            audio=TTS_CACHE[cache_key],
            text=tamil_text,
            cached=True,
            success=True,
        )

    client = get_sarvam_client()
    try:
        tts_res = client.text_to_speech.convert(
            text=tamil_text,
            language_code="ta-IN",
            model="bulbul:v3",
            speaker=speaker,
            pace=pace,
            enable_cached_responses=True,
        )
        if not tts_res.audios or len(tts_res.audios) == 0:
            raise HTTPException(status_code=500, detail="No audio returned from Sarvam TTS")

        audio_b64 = tts_res.audios[0]
        TTS_CACHE[cache_key] = audio_b64

        return TTSResponse(
            audio=audio_b64,
            text=tamil_text,
            cached=False,
            success=True,
        )
    except Exception as e:
        print(f"Error in Sarvam TTS conversion: {type(e).__name__} - {str(e)}")
        raise HTTPException(status_code=500, detail=f"Sarvam TTS error: {str(e)}")

@app.post("/api/sarvam/voice", response_model=AssistantResponse)
async def voice_chat(
    file: UploadFile = File(...),
    history: Optional[str] = Form(None)
):
    """
    Voice-based query workflow:
    1. Transcribes student's recorded audio via Sarvam Saaras v4 STT (ta-IN).
    2. Generates educational reply using sarvam-105b-conversations.
    3. Synthesizes Tamil spoken answer using Sarvam Bulbul v3 TTS (ta-IN).
    """
    audio_bytes = await file.read()
    if not audio_bytes or len(audio_bytes) < 100:
        raise HTTPException(status_code=400, detail="Audio recording is empty or too short. Please try speaking again.")

    client = get_sarvam_client()

    # Step 1: Speech-to-Text with Saaras v4
    filename = file.filename or "recording.webm"
    content_type = file.content_type or "audio/webm"

    try:
        stt_res = client.speech_to_text.transcribe(
            file=(filename, audio_bytes, content_type),
            model="saaras:v4",
            language_code="ta-IN",
            mode="transcribe"
        )
        transcript = (stt_res.transcript or "").strip()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Sarvam STT transcription error: {str(e)}")

    if not transcript:
        # Handled gracefully if no speech was detected
        friendly_no_speech = "மன்னிக்கவும், உங்கள் குரல் தெளிவாகக் கேட்கவில்லை. மைக்ரோஃபோனை அருகில் வைத்து மீண்டும் பேசவும்! (Sorry, I couldn't hear clearly. Please try speaking into the microphone again!)"
        audio_b64 = None
        try:
            tts_res = client.text_to_speech.convert(
                text="மன்னிக்கவும், உங்கள் குரல் தெளிவாகக் கேட்கவில்லை. மீண்டும் பேசவும்!",
                language_code="ta-IN",
                model="bulbul:v3",
                speaker="kavitha"
            )
            if tts_res.audios and len(tts_res.audios) > 0:
                audio_b64 = tts_res.audios[0]
        except Exception:
            pass

        return AssistantResponse(
            transcript="",
            reply=friendly_no_speech,
            audio=audio_b64,
            success=False
        )

    # Step 2: Chat Completion with sarvam-105b-conversations
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    if history:
        try:
            parsed_history = json.loads(history)
            for msg in parsed_history[-6:]:
                messages.append({"role": msg.get("role", "user"), "content": msg.get("content", "")})
        except Exception:
            pass
    messages.append({"role": "user", "content": transcript})

    try:
        chat_res = client.chat.completions(
            model="sarvam-105b-conversations",
            messages=messages,
            temperature=0.7,
            max_tokens=400,
        )
        assistant_reply = chat_res.choices[0].message.content.strip()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Sarvam Chat error: {str(e)}")

    # Step 3: Text-to-Speech with Bulbul v3
    audio_base64 = None
    try:
        tts_res = client.text_to_speech.convert(
            text=assistant_reply,
            language_code="ta-IN",
            model="bulbul:v3",
            speaker="kavitha"
        )
        if tts_res.audios and len(tts_res.audios) > 0:
            audio_base64 = tts_res.audios[0]
    except Exception as tts_err:
        print(f"TTS generation notice: {tts_err}")

    return AssistantResponse(
        transcript=transcript,
        reply=assistant_reply,
        audio=audio_base64,
        success=True
    )

if __name__ == "__main__":
    import uvicorn
    print("Starting TamilPalam Sarvam AI Voice Backend on http://localhost:8000 ...")
    uvicorn.run("sarvam_server:app", host="0.0.0.0", port=8000, reload=True)
