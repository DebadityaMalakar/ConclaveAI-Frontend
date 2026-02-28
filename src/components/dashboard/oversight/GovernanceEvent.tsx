'use client';

import React from 'react';
import { cn } from '@/lib/util';

export type EventType = 'bias' | 'fact' | 'regulatory' | 'stress';
export type EventSeverity = 'low' | 'medium' | 'high' | 'info';

export interface GovernanceEventProps {
  type: EventType;
  title: string;
  caseId?: string;
  description: string;
  timestamp: string;
  severity: EventSeverity;
  className?: string;
}

const typeColors: Record<EventType, { dot: string; bg: string; text: string }> = {
  bias: {
    dot: 'bg-amber-500',
    bg: 'bg-amber-100 dark:bg-amber-950/30',
    text: 'text-amber-700 dark:text-amber-400'
  },
  fact: {
    dot: 'bg-blue-500',
    bg: 'bg-blue-100 dark:bg-blue-950/30',
    text: 'text-blue-700 dark:text-blue-400'
  },
  regulatory: {
    dot: 'bg-red-500',
    bg: 'bg-red-100 dark:bg-red-950/30',
    text: 'text-red-700 dark:text-red-400'
  },
  stress: {
    dot: 'bg-indigo-500',
    bg: 'bg-indigo-100 dark:bg-indigo-950/30',
    text: 'text-indigo-700 dark:text-indigo-400'
  }
};

const severityStyles: Record<EventSeverity, string> = {
  low: 'bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400',
  medium: 'bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400',
  high: 'bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400',
  info: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400'
};

const GovernanceEvent: React.FC<GovernanceEventProps> = ({
  type,
  title,
  caseId,
  description,
  timestamp,
  severity,
  className
}) => {
  const typeColor = typeColors[type];
  const severityUpper = severity.toUpperCase();

  return (
    <div className={cn(
      'flex items-start gap-3 py-3 px-4',
      'border-b border-border last:border-0',
      'hover:bg-card-hover transition-colors',
      className
    )}>
      {/* Colored dot */}
      <div className={cn('w-2 h-2 mt-2 rounded-full flex-shrink-0', typeColor.dot)} />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-medium text-foreground">{title}</span>
          {caseId && (
            <span className="text-xs text-muted-foreground">• Case #{caseId}</span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-0.5">
          {description}
        </p>
      </div>

      {/* Right metadata */}
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {timestamp}
        </span>
        <span className={cn(
          'px-2 py-0.5 rounded-full text-xs font-medium',
          severityStyles[severity]
        )}>
          {severityUpper}
        </span>
      </div>
    </div>
  );
};

export default GovernanceEvent;