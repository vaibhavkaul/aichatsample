import openai
import os
from llama_index.core.memory import ChatMemoryBuffer
from llama_index.llms.openai import OpenAI
from llama_index.core import load_index_from_storage
from llama_index.core import StorageContext

openai.api_key = os.environ["OPENAI_API_KEY"]

# update system prompt here.
system_prompt = "You are an AI chatbot being used for a demo. The app is built using react, python fast api and openAI"

# index directory must have the vector index created using training data
storage_context = StorageContext.from_defaults(persist_dir="index/")
doc_summary_index = load_index_from_storage(storage_context)
memory = ChatMemoryBuffer.from_defaults(token_limit=8192)

llm = OpenAI(model="gpt-4o-mini")


def get_chat_response(query: str, _: str):
    chat_engine = doc_summary_index.as_chat_engine(
        chat_mode="context", memory=memory, system_prompt=(system_prompt), llm=llm
    )
    return chat_engine.chat(query).response
