import os
from pathlib import Path
from dotenv import load_dotenv
from openai import OpenAI

from system_prompt import SYSTEM_PROMPT

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

print("ENV FILE:", BASE_DIR / ".env")
print("API KEY:", os.getenv("XAI_API_KEY"))

client = OpenAI(
    api_key=os.getenv("XAI_API_KEY"),
    base_url="https://api.groq.com/openai/v1",
)







# def ask_grok(user_message: str):

#     response = client.chat.completions.create(
#         model="grok-4",
#         messages=[
#             {
#                 "role": "system",
#                 "content": SYSTEM_PROMPT,
#             },
#             {
#                 "role": "user",
#                 "content": user_message,
#             },
#         ],
#         temperature=0.7,
#     )

#     return response.choices[0].message.content
def ask_grok(user_message: str):
    try:
        response = client.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_message},
            ],
            temperature=0.7,
        )

        return response.choices[0].message.content

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise e


