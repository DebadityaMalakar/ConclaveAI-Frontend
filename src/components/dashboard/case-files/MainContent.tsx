'use client';

import React from 'react';
import { cn } from '@/lib/util';
import PageHeader from './PageHeader';
import InvestigationGrid from './InvestigationGrid';

export interface MainContentProps {
  className?: string;
  children?: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ className, children }) => {
  return (
    <main className={cn(
      'flex-1 overflow-y-auto',
      'p-6',
      'bg-background',
      className
    )}>
      <div className="max-w-7xl mx-auto space-y-6">
        {children}
      </div>
    </main>
  );
};

// Compound component pattern
MainContent.displayName = 'MainContent';

export default MainContent;