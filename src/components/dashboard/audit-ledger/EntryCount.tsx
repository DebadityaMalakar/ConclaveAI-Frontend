'use client';

import React from 'react';
import { cn } from '@/lib/util';

export interface EntryCountProps {
  current: number;
  total: number;
  className?: string;
}

const EntryCount: React.FC<EntryCountProps> = ({ 
  current, 
  total, 
  className 
}) => {
  return (
    <p className={cn('text-sm text-muted-foreground', className)}>
      Showing <span className="font-medium text-foreground">{current}</span> of{' '}
      <span className="font-medium text-foreground">{total}</span> entries
    </p>
  );
};

export default EntryCount;