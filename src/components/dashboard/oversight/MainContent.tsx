'use client';

import React from 'react';
import { cn } from '@/lib/util';
import BaseMainContent from '@/components/dashboard/case-files/MainContent';

export interface MainContentProps {
  className?: string;
  children?: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ className, children }) => {
  return (
    <BaseMainContent className={className}>
      {children}
    </BaseMainContent>
  );
};

export default MainContent;