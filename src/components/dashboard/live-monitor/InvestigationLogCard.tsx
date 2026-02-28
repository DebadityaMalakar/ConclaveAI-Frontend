'use client';

import React from 'react';
import { cn } from '@/lib/util';
import { Card } from '@/components/Card';

export type LogEntry = {
  id: string;
  role: 'Prosecutor' | 'Auditor' | 'System';
  timestamp: string;
  message: string;
  confidence?: number;
};

export interface InvestigationLogCardProps {
  entries: LogEntry[];
  confidence?: number;
  className?: string;
}

export const ConfidenceBadge: React.FC<{ value: number; className?: string }> = ({
  value,
  className
}) => {
  const getColor = (val: number) => {
    if (val >= 70) return 'text-green-600 dark:text-green-400';
    if (val >= 40) return 'text-amber-600 dark:text-amber-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <span className={cn(
      'px-2 py-1 rounded-full text-xs font-medium',
      'bg-muted',
      getColor(value),
      className
    )}>
      {value}% Confidence
    </span>
  );
};

export const LogEntryItem: React.FC<{ entry: LogEntry }> = ({ entry }) => {
  const roleColors = {
    Prosecutor: 'text-purple-600 dark:text-purple-400',
    Auditor: 'text-blue-600 dark:text-blue-400',
    System: 'text-amber-600 dark:text-amber-400'
  };

  return (
    <div className="flex gap-3 py-3 border-b border-border last:border-0">
      <div className="relative">
        <div className="w-2 h-2 mt-1.5 rounded-full bg-muted-foreground/30" />
        <div className="absolute top-3 left-1 w-px h-full bg-border" />
      </div>
      
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2 text-xs">
          <span className={cn('font-medium', roleColors[entry.role])}>
            {entry.role}
          </span>
          <span className="text-muted-foreground">{entry.timestamp}</span>
          {entry.confidence && (
            <ConfidenceBadge value={entry.confidence} />
          )}
        </div>
        <p className="text-sm text-foreground">{entry.message}</p>
      </div>
    </div>
  );
};

const InvestigationLogCard: React.FC<InvestigationLogCardProps> = ({
  entries,
  confidence = 40,
  className
}) => {
  return (
    <Card variant="elevated" className={cn('flex flex-col h-full', className)}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h3 className="font-semibold text-foreground">Investigation Log</h3>
        <ConfidenceBadge value={confidence} />
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-1 max-h-[400px]">
        {entries.map((entry) => (
          <LogEntryItem key={entry.id} entry={entry} />
        ))}
      </div>
    </Card>
  );
};

export default InvestigationLogCard;