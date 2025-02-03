import React, { useState } from 'react';
import { TextField, Button, Box, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import useQuestionForm from './useQuestionForm';

const QuestionForm = ({ onResponse, darkMode }) => {
    const [isLoading, setLoading] = useState(false);
    const { question, setQuestion, handleSubmit } = useQuestionForm({ onResponse, onLoading: setLoading });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                    marginTop: 4,
                }}
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Enter your question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    sx={{
                        width: '80%',
                        maxWidth: 600,
                        borderRadius: 2,
                        transition: 'background-color 0.3s ease',
                        backgroundColor: darkMode ? '#333' : '#fff',
                        '& .MuiInputBase-root': {
                            color: darkMode ? '#fff' : '#000',
                        },
                        '& .MuiInputLabel-root': {
                            color: darkMode ? '#ccc' : '#666',
                        },
                    }}
                    multiline
                    minRows={1}
                    maxRows={6}
                />
                <Button
                    type="submit"
                    variant="contained"
                    disabled={!question.trim() || isLoading}
                    sx={{
                        transition: 'background-color 0.3s ease',
                        backgroundColor: darkMode ? '#1d4ed8' : '#1e3a8a',
                        '&:hover': {
                            backgroundColor: darkMode ? '#1e40af' : '#1d4ed8',
                        },
                        '&:disabled': {
                            backgroundColor: darkMode ? '#555' : '#ccc',
                        },
                    }}
                >
                    {isLoading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Ask'}
                </Button>
            </Box>
        </motion.div>
    );
};

export default QuestionForm;
