'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'matcha' | 'cherry' | 'blossom' | 'sky' | 'teal';
export type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themeType: ThemeType;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('matcha');

  // Get theme type based on selected theme
  const getThemeType = (currentTheme: Theme): ThemeType => {
    switch (currentTheme) {
      case 'cherry':
      case 'teal':
        return 'dark';
      default:
        return 'light';
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const themeType = getThemeType(theme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeType }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};