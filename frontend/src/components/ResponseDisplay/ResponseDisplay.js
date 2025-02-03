import React from 'react';
import { Box, Typography, Skeleton, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';

const ResponseDisplay = ({ response, isLoading, darkMode }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Box
                sx={{
                    width: '80%',
                    margin: '0 auto',
                    marginTop: 4,
                    marginBottom: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    backgroundColor: darkMode ? '#121212' : '#f5f5f5',
                    color: darkMode ? '#ffffff' : '#000000',
                    padding: 3,
                    borderRadius: 2
                }}
            >
                {isLoading ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Skeleton variant="text" width="70%" height={50} />
                        <Skeleton variant="text" width="85%" height={30} />
                        <Skeleton variant="text" width="90%" height={30} />
                    </Box>
                ) : response ? (
                    <Grid container spacing={4}>
                        {/* Answer Section */}
                        <Grid item xs={12} md={7}>
                            <Paper
                                sx={{
                                    padding: 3,
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    minHeight: 180,
                                    backgroundColor: darkMode ? '#222' : '#ffffff',
                                    color: darkMode ? '#fff' : '#000',
                                }}
                            >
                                <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', fontSize: '22px' }}>
                                    ✅ Answer:
                                </Typography>
                                <Box
                                    sx={{ fontSize: '18px', lineHeight: 1.8 }}
                                    component="div"
                                    dangerouslySetInnerHTML={{ __html: response.answer || "No answer available." }}
                                />
                            </Paper>
                        </Grid>

                        {/* Sources Section */}
                        <Grid item xs={12} md={5}>
                            <Paper
                                sx={{
                                    padding: 3,
                                    borderRadius: 2,
                                    minHeight: 180,
                                    backgroundColor: darkMode ? '#2a2a2a' : '#f8f8f8',
                                }}
                            >
                                <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold', fontSize: '20px' }}>
                                    📜 Sources Used:
                                </Typography>
                                {Array.isArray(response.documents) && response.documents.length > 0 ? (
                                    response.documents.slice(0, 3).map((doc, index) => {
                                        // Assuming each document is now a file path
                                        const docName = doc.split('/').pop();  // Extract the file name from path
                                        return (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontSize: '16px',
                                                        lineHeight: 1.7,
                                                        marginBottom: 2,
                                                    }}
                                                >
                                                    <a
                                                        href={doc}  // Assuming doc is the file path or URL
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        style={{
                                                            textDecoration: 'none',
                                                            color: darkMode ? '#bb86fc' : '#1a73e8',
                                                        }}
                                                    >
                                                        📌 Document {index + 1}: {docName}
                                                    </a>
                                                </Typography>
                                            </motion.div>
                                        );
                                    })
                                ) : (
                                    <Typography variant="body2" sx={{ fontSize: '16px', color: '#666' }}>
                                        No sources available.
                                    </Typography>
                                )}
                            </Paper>
                        </Grid>
                    </Grid>
                ) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, textAlign: 'center' }}>
                        <Typography variant="body1" sx={{ fontSize: '18px', color: darkMode ? '#aaa' : '#666' }}>
                            No response yet. Ask a question!
                        </Typography>
                        <span role="img" aria-label="Thinking Face" style={{ fontSize: '48px' }}>🤔</span>
                    </Box>
                )}
            </Box>
        </motion.div>
    );
};

export default ResponseDisplay;
