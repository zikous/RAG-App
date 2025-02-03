# RAG App

## Description

This application utilizes two backends:

1. **Python Backend**: Handles PDF processing and question-answering based on the content of the PDFs.
2. **Node.js Backend**: Serves as the API gateway for the frontend and manages additional logic.

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
