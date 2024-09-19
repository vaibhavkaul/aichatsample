from chat import service as chat_service
from fastapi import FastAPI

from pydantic import BaseModel

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


class ChatMessage(BaseModel):
    query: str
    conversation: list


@app.post("/api/chat")
def chat(chatMessage: ChatMessage):
    answer = chat_service.get_chat_response(chatMessage.query, chatMessage.conversation)
    return {"answer": answer}
