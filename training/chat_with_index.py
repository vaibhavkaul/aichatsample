import openai
import os
from llama_index.core.memory import ChatMemoryBuffer
from llama_index.llms.openai import OpenAI
from llama_index.core import load_index_from_storage
from llama_index.core import StorageContext

openai.api_key = os.environ["OPENAI_API_KEY"]
system_prompt = "You are an AI chatbot being used for a demo. The app is built using react, python fast api and openAI"


storage_context = StorageContext.from_defaults(persist_dir="app/index/")
doc_summary_index = load_index_from_storage(storage_context)
memory = ChatMemoryBuffer.from_defaults(token_limit=4096)

llm = OpenAI(model="gpt-4o-mini")
chat_engine = doc_summary_index.as_chat_engine(
    chat_mode="context", memory=memory, system_prompt=(system_prompt), llm=llm
)

response = chat_engine.stream_chat("what do you think about life?")
for token in response.response_gen:
    print(token, end="")

print("\n")
