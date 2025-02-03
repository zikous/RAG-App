import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const ResponseList = ({ documents, darkMode }) => {
    return (
        <>
            <Typography variant="h6" sx={{ marginBottom: 2, color: darkMode ? '#1d4ed8' : '#1e3a8a' }}>
                Documents Used:
            </Typography>
            <List>
                {documents.map((doc, index) => (
                    <ListItem key={index} sx={{ paddingLeft: 0 }}>
                        <ListItemText primary={doc} />
                    </ListItem>
                ))}
            </List>
        </>
    );
};

export default ResponseList;