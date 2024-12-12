import React, { createContext, useState } from 'react';

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false); // Default theme state

  return (
    <ThemeContext.Provider value={[darkMode, setDarkMode]}>
      {children}
    </ThemeContext.Provider>
  );
}
