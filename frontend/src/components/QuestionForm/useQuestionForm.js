import { useState } from 'react';
import axios from 'axios';

const useQuestionForm = ({ onResponse, onLoading }) => {
    const [question, setQuestion] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question.trim()) return;
        onLoading(true);

        try {
            const { data } = await axios.post('http://localhost:3001/api/ask', { question });

            console.log("API Response:", data); // Debugging log

            // Ensure data has expected properties
            const processedResponse = {
                answer: data?.answer || "No answer provided.",
                documents: Array.isArray(data?.documents) ? data.documents : []
            };

            onResponse(processedResponse);
        } catch (error) {
            console.error('Error fetching response:', error);
            alert('Failed to fetch response. Please try again.');
        } finally {
            onLoading(false);
        }
    };

    return { question, setQuestion, handleSubmit };
};

export default useQuestionForm;
