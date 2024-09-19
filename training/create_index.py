from llama_index.core import SimpleDirectoryReader, get_response_synthesizer
from llama_index.core import DocumentSummaryIndex
from llama_index.llms.openai import OpenAI
from llama_index.core.node_parser import SentenceSplitter


def ingest_using_llama():
    docs = SimpleDirectoryReader(input_dir="./training/input/").load_data()
    chatgpt = OpenAI(temperature=0, model="gpt-4o")
    splitter = SentenceSplitter(chunk_size=1024)
    response_synthesizer = get_response_synthesizer(
        response_mode="tree_summarize", use_async=True
    )
    doc_summary_index = DocumentSummaryIndex.from_documents(
        docs,
        llm=chatgpt,
        transformations=[splitter],
        response_synthesizer=response_synthesizer,
        show_progress=True,
    )
    doc_summary_index.storage_context.persist("backend/index")


ingest_using_llama()
