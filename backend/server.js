const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3001;  // You can set Express to any port you want

// Middleware
app.use(cors());
app.use(express.json());

// RAG Backend API URL
const RAG_API_URL = "http://127.0.0.1:5000/api/ask";  // Flask is running on port 5000

app.post('/api/ask', async (req, res) => {
    const { question } = req.body;

    try {
        const response = await axios.post(RAG_API_URL, { question });
        res.json(response.data);
    } catch (error) {
        console.error("Error communicating with RAG backend:", error);
        res.status(500).json({ error: "Failed to get response from RAG backend" });
    }
});

// Start Express server
app.listen(port, () => {
    console.log(`Express backend running at http://localhost:${port}`);
});
