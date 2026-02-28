'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTheme, type Theme } from '../ThemeProvider';
import { cn } from '@/lib/util';
import { Sun, Moon, ChevronDown } from 'lucide-react';

export interface ContextLabelProps {
  text: string;
  className?: string;
}

const ContextLabel: React.FC<ContextLabelProps> = ({ text, className }) => {
  return (
    <span className={cn(
      'text-sm font-medium',
      'text-gray-700 dark:text-gray-300',
      className
    )}>
      {text}
    </span>
  );
};

export interface ThemeSwitcherDropdownProps {
  className?: string;
}

const ThemeSwitcherDropdown: React.FC<ThemeSwitcherDropdownProps> = ({ className }) => {
  const { theme, setTheme, themeType } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const themes: { id: Theme; name: string; emoji: string; type: 'light' | 'dark' }[] = [
    { id: 'matcha', name: 'Matcha Green', emoji: '🍵', type: 'light' },
    { id: 'cherry', name: 'Cherry Red', emoji: '🍒', type: 'dark' },
    { id: 'blossom', name: 'Blossom Pink', emoji: '🌸', type: 'light' },
    { id: 'sky', name: 'Sky Blue', emoji: '☁️', type: 'light' },
    { id: 'teal', name: 'Teal Green', emoji: '🌊', type: 'dark' },
  ];

  const currentTheme = themes.find(t => t.id === theme) || themes[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn('relative', className)} ref={dropdownRef}>
      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'h-8 px-2 rounded-lg',
          'flex items-center gap-1.5',
          'text-sm text-gray-700 dark:text-gray-300',
          'hover:bg-gray-100 dark:hover:bg-gray-800/50',
          'transition-colors duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
          isOpen && 'bg-gray-100 dark:bg-gray-800/50'
        )}
        aria-label="Select theme"
        aria-expanded={isOpen}
      >
        <span className="text-base">{currentTheme.emoji}</span>
        <span className="hidden sm:inline">{currentTheme.name}</span>
        <ChevronDown className={cn(
          'w-4 h-4 transition-transform',
          isOpen && 'rotate-180'
        )} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={cn(
          'absolute right-0 mt-1 w-48',
          'bg-card border border-border rounded-lg shadow-lg',
          'py-1 z-50'
        )}>
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTheme(t.id);
                setIsOpen(false);
              }}
              className={cn(
                'w-full px-3 py-2',
                'flex items-center gap-2',
                'text-sm',
                'hover:bg-card-hover',
                'transition-colors',
                theme === t.id && 'bg-primary/5 text-primary font-medium'
              )}
            >
              <span className="text-base">{t.emoji}</span>
              <span className="flex-1 text-left">{t.name}</span>
              <span className="text-xs opacity-70">
                {t.type === 'light' ? '☀️' : '🌙'}
              </span>
              {theme === t.id && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export interface TopContextBarProps {
  contextLabel?: string;
  className?: string;
  children?: React.ReactNode;
  rightContent?: React.ReactNode;
  variant?: 'default' | 'minimal';
  showThemeSwitcher?: boolean;
}

const TopContextBar: React.FC<TopContextBarProps> = ({
  contextLabel = "Case Dashboard",
  className,
  children,
  rightContent,
  variant = 'default',
  showThemeSwitcher = true,
}) => {
  const { themeType } = useTheme();

  if (variant === 'minimal') {
    return (
      <MinimalTopContextBar
        contextLabel={contextLabel}
        className={className}
        showThemeSwitcher={showThemeSwitcher}
      />
    );
  }

  return (
    <div className={cn(
      'h-12 px-5',
      'w-full',
      'flex items-center justify-between',
      'border-b border-border/40',
      'bg-background/95 backdrop-blur-sm',
      className
    )}>
      {/* Left Section - Context Label */}
      <div className="flex items-center gap-3">
        <ContextLabel text={contextLabel} />
        {children}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {rightContent}
        {showThemeSwitcher && <ThemeSwitcherDropdown />}
      </div>
    </div>
  );
};

// Minimal version with compact theme switcher
export const MinimalTopContextBar: React.FC<{
  contextLabel?: string;
  className?: string;
  showThemeSwitcher?: boolean;
}> = ({
  contextLabel = "Case Dashboard",
  className,
  showThemeSwitcher = true,
}) => {
  const { theme, setTheme, themeType } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const themes: { id: Theme; emoji: string }[] = [
    { id: 'matcha', emoji: '🍵' },
    { id: 'cherry', emoji: '🍒' },
    { id: 'blossom', emoji: '🌸' },
    { id: 'sky', emoji: '☁️' },
    { id: 'teal', emoji: '🌊' },
  ];

  const currentTheme = themes.find(t => t.id === theme) || themes[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={cn(
      'h-10 px-4',
      'w-full',
      'flex items-center justify-between',
      'border-b border-border/30',
      'bg-background/90',
      className
    )}>
      <span className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
        {contextLabel}
      </span>

      {showThemeSwitcher && (
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-7 h-7 rounded-md flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
            aria-label="Select theme"
          >
            <span className="text-sm">{currentTheme.emoji}</span>
          </button>

          {isOpen && (
            <div className={cn(
              'absolute right-0 mt-1',
              'bg-card border border-border rounded-lg shadow-lg',
              'py-1 z-50 min-w-[120px]'
            )}>
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'w-full px-3 py-1.5',
                    'flex items-center gap-2',
                    'text-sm',
                    'hover:bg-card-hover',
                    'transition-colors',
                    theme === t.id && 'bg-primary/5 text-primary'
                  )}
                >
                  <span>{t.emoji}</span>
                  <span className="flex-1 text-left capitalize">{t.id}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Export sub-components
export { ContextLabel, ThemeSwitcherDropdown };
export default TopContextBar;