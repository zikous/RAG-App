import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = ({ darkMode }) => {
    // Conditionally set the class based on darkMode
    const footerStyle = {
        padding: '16px', // Padding for the footer
        textAlign: 'center', // Center-align the text
        marginTop: 'auto', // Push footer to the bottom
        backgroundColor: darkMode ? '#121212' : '#1e3a8a', // Dark or light background color
        color: '#fff', // Default text color
    };

    const textStyle = {
        color: darkMode ? '#ccc' : '#fff', // Light text color for dark mode
    };

    return (
        <Box sx={footerStyle}>
            <Typography variant="body2" sx={textStyle}>
                © 2025 RAG Model. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;
