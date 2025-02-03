import React, { useState } from 'react';
import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import { Header, QuestionForm, ResponseDisplay, Footer } from './components';
import useDarkMode from './hooks/useDarkMode';

const App = () => {
    const [response, setResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { darkMode, toggleDarkMode } = useDarkMode();

    const handleResponse = (data) => {
        setResponse(data);
    };

    const handleLoading = (loading) => {
        setIsLoading(loading);
    };

    // Create a theme based on dark mode
    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: darkMode ? '#1d4ed8' : '#1e3a8a',
            },
            background: {
                default: darkMode ? '#121212' : '#f5f5f5',
                paper: darkMode ? '#1e1e1e' : '#ffffff',
            },
        },
        typography: {
            fontFamily: 'Roboto, sans-serif',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {/* Flexbox container to push footer to the bottom */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh', // Ensure the container takes at least the full viewport height
                }}
            >
                {/* Header */}
                <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

                {/* Main Content */}
                <Box
                    sx={{
                        flex: 1, // Allow the content to grow and fill the remaining space
                        marginTop: 4,
                        marginBottom: 4,
                        width: '80%', // Set to 80% width
                        margin: '0 auto', // Center the content
                    }}
                >
                    {/* Question Form */}
                    <QuestionForm
                        onResponse={handleResponse}
                        onLoading={handleLoading}
                        darkMode={darkMode}
                    />

                    {/* Response Display */}
                    <ResponseDisplay
                        response={response}
                        isLoading={isLoading}
                        darkMode={darkMode}
                    />
                </Box>

                {/* Footer */}
                <Footer darkMode={darkMode} />
            </Box>
        </ThemeProvider>
    );
};

export default App;
