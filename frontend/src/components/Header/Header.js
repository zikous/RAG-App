import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const Header = ({ darkMode, toggleDarkMode }) => {
    return (
        <AppBar
            position="static"
            sx={{
                boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.1)',
                background: darkMode
                    ? 'linear-gradient(45deg, #121212 30%, #1e1e1e 90%)'
                    : 'linear-gradient(45deg, #1e3a8a 30%, #1d4ed8 90%)',
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 16px',
                }}
            >
                <Typography
                    variant="h6"
                    component="div"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '1.5rem',
                        color: 'white',
                    }}
                >
                    <span role="img" aria-label="RAG Icon">🤖</span> RAG Model
                </Typography>
                <IconButton
                    color="inherit"
                    onClick={toggleDarkMode}
                    sx={{
                        transition: 'background-color 0.3s',
                        padding: '8px',
                        '&:hover': {
                            backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                        },
                    }}
                >
                    {darkMode ? <Brightness7 /> : <Brightness4 />}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
