import os
import fitz  # PyMuPDF for PDF processing
from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter
from transformers import pipeline

app = Flask(__name__)
CORS(app)

# 1. Load Hugging Face Embeddings
# Replace the current embedding model to improve performance or switch between models
embeddings = HuggingFaceEmbeddings(model_name="BAAI/bge-small-en-v1.5")

# Store extracted text from PDFs and their filenames
documents = []
vector_store = None

# 2. Initialize a robust question-answering model
# Replace the current QA pipeline to use a different model for better accuracy
qa_pipeline = pipeline(
    "question-answering",
    model="deepset/minilm-uncased-squad2",  # Light model for QA (can replace with another model for performance tradeoffs)
    tokenizer="deepset/minilm-uncased-squad2",
)


def load_pdfs(pdf_folder):
    global documents, vector_store
    text_data = []
    file_names = []

    if not os.path.exists(pdf_folder):
        print(f"Warning: PDF folder '{pdf_folder}' does not exist")
        return []

    # Read and process each PDF in the folder
    for file in os.listdir(pdf_folder):
        if file.endswith(".pdf"):
            pdf_path = os.path.join(pdf_folder, file)
            try:
                doc = fitz.open(pdf_path)
                text = "\n".join([page.get_text("text") for page in doc])
                doc.close()

                text_data.append({"text": text, "source": file})
                file_names.append(file)
            except Exception as e:
                print(f"Error processing {file}: {str(e)}")

    if not text_data:
        print("Warning: No valid PDF documents found")
        return []

    # Split text into smaller chunks for better handling by the model
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    documents = []

    for item in text_data:
        chunks = text_splitter.create_documents(
            [item["text"]],
            metadatas=[
                {"source": item["source"]}
            ],  # Metadata for each chunk (e.g., document source)
        )
        documents.extend(chunks)

    # Initialize FAISS vector store with embeddings and chunks of text
    if documents:
        vector_store = FAISS.from_documents(documents, embeddings)

    return file_names


def get_best_answer(question, contexts):
    """
    Get the best answer from multiple contexts using the QA pipeline.
    We use the most relevant context to generate an answer.
    """
    answers = []
    for context in contexts:
        try:
            result = qa_pipeline(question=question, context=context)
            answers.append(result)
        except Exception as e:
            print(f"Error in QA pipeline: {str(e)}")
            continue

    # Sort answers by score and return the best one
    answers.sort(key=lambda x: x["score"], reverse=True)
    return answers[0]["answer"] if answers else None


@app.route("/api/ask", methods=["POST"])
def ask():
    try:
        data = request.json
        question = data.get("question", "").strip()

        if not question:
            return jsonify({"error": "No question provided.", "documents": []})

        if not vector_store:
            return jsonify({"error": "No documents have been loaded.", "documents": []})

        # Perform similarity search to find relevant documents
        relevant_docs = vector_store.similarity_search(question, k=5)
        if not relevant_docs:
            return jsonify({"error": "No relevant information found.", "documents": []})

        # Extract text from the most relevant documents
        contexts = [doc.page_content for doc in relevant_docs]
        sources = [doc.metadata.get("source", "Unknown") for doc in relevant_docs]

        # Get the best possible answer using the contexts
        answer = get_best_answer(question, contexts)
        response = {
            "answer": (
                answer
                if answer
                else "I couldn't find a confident answer to your question in the provided documents."
            ),
            "documents": list(
                set(sources[:3])
            ),  # Return sources of the top 3 documents
        }
        return jsonify(response)

    except Exception as e:
        print(f"API error: {str(e)}")
        return jsonify({"error": f"API error: {str(e)}", "documents": []})


# Initialize on startup
pdf_folder = "pdfs"
file_names = load_pdfs(pdf_folder)
print(f"Loaded {len(file_names)} PDF files")

if __name__ == "__main__":
    app.run(port=5000, debug=True)
