import { useState } from 'react';

const useDarkMode = () => {
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => setDarkMode(!darkMode);
    return { darkMode, toggleDarkMode };
};

export default useDarkMode;