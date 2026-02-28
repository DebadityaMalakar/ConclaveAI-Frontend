'use client';

import React from 'react';
import { useTheme, type Theme } from './ThemeProvider';
import { Button } from './Button';

export function ThemeSwitcher() {
  const { theme, setTheme, themeType } = useTheme();

  const themes: { id: Theme; name: string; emoji: string; type: 'light' | 'dark' }[] = [
    { id: 'matcha', name: 'Matcha Green', emoji: '🍵', type: 'light' },
    { id: 'cherry', name: 'Cherry Red', emoji: '🍒', type: 'dark' },
    { id: 'blossom', name: 'Blossom Pink', emoji: '🌸', type: 'light' },
    { id: 'sky', name: 'Sky Blue', emoji: '☁️', type: 'light' },
    { id: 'teal', name: 'Teal Green', emoji: '🌊', type: 'dark' },
  ];

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Current theme type:</span>
        <span className={`px-2 py-1 rounded-full text-xs ${
          themeType === 'light' 
            ? 'bg-yellow-100 text-yellow-800' 
            : 'bg-gray-800 text-gray-200'
        }`}>
          {themeType === 'light' ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </span>
      </div>
      
      <div className="flex gap-2 flex-wrap">
        {themes.map((t) => (
          <Button
            key={t.id}
            variant={theme === t.id ? 'default' : 'outline'}
            onClick={() => setTheme(t.id)}
            // Tailwind doesn't support dynamic ring color in inline style, so use a class instead
            style={{}}
            // Add dynamic ring color class if selected
            className={`flex items-center gap-2 ${
              theme === t.id ? 'ring-2 ring-offset-2 ring-[hsl(var(--primary))]' : ''
            }`}
          >
            <span>{t.emoji}</span>
            <span>{t.name}</span>
            <span className="text-xs opacity-70 ml-1">
              {t.type === 'light' ? '☀️' : '🌙'}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}