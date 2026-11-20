
#python -m uvicorn app:app --reload --port 8003


# from fastapi import FastAPI
# from pydantic import BaseModel

# from grok_service import ask_grok

# app = FastAPI()


# class ChatRequest(BaseModel):
#     message: str


# @app.get("/")
# def home():
#     return {
#         "message": "Agent Service Running"
#     }


# @app.post("/chat")
# def chat(request: ChatRequest):

#     try:

#         answer = ask_grok(request.message)

#         return {
#             "success": True,
#             "response": answer
#         }

#     except Exception as e:

#         return {
#             "success": False,
#             "message": str(e)
#         }

from fastapi import FastAPI
from pydantic import BaseModel
from grok_service import ask_grok

app = FastAPI()

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(request: ChatRequest):
    try:
        answer = ask_grok(request.message)

        return {
            "success": True,
            "response": answer
        }

    except Exception as e:
        import traceback
        traceback.print_exc()   # <-- ye add karo

        return {
            "success": False,
            "message": str(e)
        }
