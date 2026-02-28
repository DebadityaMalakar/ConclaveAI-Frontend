'use client';

import React from 'react';
import { cn } from '@/lib/util';
import { Search } from 'lucide-react';

export interface AuditSearchProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const AuditSearch: React.FC<AuditSearchProps> = ({
  value,
  onChange,
  placeholder = 'Search hash, user, or action...',
  className
}) => {
  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full pl-9 pr-4 py-2',
          'text-sm bg-background border border-input rounded-lg',
          'placeholder:text-muted-foreground/60',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:border-input',
          'transition-colors'
        )}
      />
    </div>
  );
};

export default AuditSearch;