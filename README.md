# RAG App

## Description

The **RAG (Retriever-Augmented Generation) App** is a web application that integrates two backends:

1. **Python Backend**: 
   - Handles PDF processing using the `PyMuPDF` library, extracting text from PDF files stored in the `pdfs` folder.
   - Uses the `Langchain` library with HuggingFace embeddings to store the text data and perform similarity search.
   - Utilizes a question-answering model from HuggingFace (`deepset/minilm-uncased-squad2`) to provide answers based on the content of the PDFs.

2. **Node.js Backend**:
   - Acts as an API gateway for the frontend, handling incoming requests and managing logic to connect with the Python backend.
   - Provides routes to interact with the Python backend for retrieving information and generating answers.

3. **Frontend**:
   - A simple React-based UI that allows users to input questions, and display the answers based on the PDF content fetched from the Python backend.

### Steps to Launch

1. **Start Python Backend**:

   - Navigate to the `rag-backend` directory.
   - Install the required dependencies using:
     ```bash
     pip install -r requirements.txt
     ```
   - Run the Python backend:
     ```bash
     python app.py
     ```

2. **Start Node.js Backend**:

   - Navigate to the `backend` directory.
   - Install the required dependencies using:
     ```bash
     npm install
     ```
   - Run the Node.js backend:
     ```bash
     node server.js
     ```

3. **Start Frontend**:
   - Navigate to the `frontend` directory.
   - Install the required dependencies using:
     ```bash
     npm install
     ```
   - Start the frontend:
     ```bash
     npm start
     ```

Once everything is running, access the app in your browser at `http://localhost:3000`.
