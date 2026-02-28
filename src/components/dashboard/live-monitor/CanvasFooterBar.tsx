'use client';

import React from 'react';
import { cn } from '@/lib/util';
import { Play } from 'lucide-react';

export interface CanvasFooterBarProps {
  timeline?: string;
  transactionVolume?: string;
  patternStatus?: string;
  className?: string;
}

const CanvasFooterBar: React.FC<CanvasFooterBarProps> = ({
  timeline = 'T-Minus 0h',
  transactionVolume = '₹73,00,000',
  patternStatus = 'Normal',
  className
}) => {
  const getPatternColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'normal':
        return 'text-green-600 dark:text-green-400';
      case 'suspicious':
        return 'text-amber-600 dark:text-amber-400';
      case 'critical':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className={cn(
      'flex items-center justify-between px-4 py-2',
      'border-t border-border',
      'text-xs',
      className
    )}>
      <div className="flex items-center gap-2">
        <Play className="w-3 h-3 text-muted-foreground" />
        <span className="font-medium">Timeline</span>
        <span className="text-muted-foreground">{timeline}</span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <span className="text-muted-foreground">Transaction Vol:</span>
          <span className="font-medium">{transactionVolume}</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-muted-foreground">Pattern Detected:</span>
          <span className={cn('font-medium', getPatternColor(patternStatus))}>
            {patternStatus}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CanvasFooterBar;