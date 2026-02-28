'use client';

import React from 'react';
import { cn } from '@/lib/util';

export interface MoneyFlowControlsProps {
  viewMode: 'individual' | 'entity';
  onViewModeChange?: (mode: 'individual' | 'entity') => void;
  filters?: string[];
  onFilterToggle?: (filter: string) => void;
  className?: string;
}

export const MoneyFlowControls: React.FC<MoneyFlowControlsProps> = ({
  viewMode,
  onViewModeChange,
  filters = [],
  onFilterToggle,
  className
}) => {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <span className="text-xs font-medium text-muted-foreground">
        ● Money Flow Narrative
      </span>
      <div className="flex items-center gap-1 p-1 bg-muted/30 rounded-lg">
        <button
          onClick={() => onViewModeChange?.('individual')}
          className={cn(
            'px-2 py-1 text-xs rounded-md transition-colors',
            viewMode === 'individual'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          Individual
        </button>
        <button
          onClick={() => onViewModeChange?.('entity')}
          className={cn(
            'px-2 py-1 text-xs rounded-md transition-colors',
            viewMode === 'entity'
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          Entity
        </button>
      </div>
    </div>
  );
};

export interface TypologyFilterTabsProps {
  options: string[];
  active: string;
  onActiveChange?: (option: string) => void;
  className?: string;
}

export const TypologyFilterTabs: React.FC<TypologyFilterTabsProps> = ({
  options,
  active,
  onActiveChange,
  className
}) => {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onActiveChange?.(option)}
          className={cn(
            'px-3 py-1 text-xs font-medium rounded-full transition-colors',
            active === option
              ? 'bg-primary/10 text-primary'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export interface CanvasHeaderProps {
  viewMode: 'individual' | 'entity';
  onViewModeChange?: (mode: 'individual' | 'entity') => void;
  activeTypology: string;
  onTypologyChange?: (typology: string) => void;
  className?: string;
}

const CanvasHeader: React.FC<CanvasHeaderProps> = ({
  viewMode,
  onViewModeChange,
  activeTypology,
  onTypologyChange,
  className
}) => {
  const typologyOptions = ['ALL', 'HIGH RISK', 'STRUCTURING', 'CRYPTO'];

  return (
    <div className={cn(
      'flex items-center justify-between px-4 py-2',
      'border-b border-border',
      className
    )}>
      <MoneyFlowControls
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
      />
      
      <TypologyFilterTabs
        options={typologyOptions}
        active={activeTypology}
        onActiveChange={onTypologyChange}
      />
    </div>
  );
};

export default CanvasHeader;