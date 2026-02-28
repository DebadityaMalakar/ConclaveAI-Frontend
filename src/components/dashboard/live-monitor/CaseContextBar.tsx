'use client';

import React from 'react';
import { cn } from '@/lib/util';
import { ArrowLeft, Play } from 'lucide-react';
import { ThemeSwitcherDropdown } from '@/components/dashboard/TopContextBar';

export interface CaseBreadcrumbProps {
  caseId: string;
  label: string;
  onBack: () => void;
  className?: string;
}

export const CaseBreadcrumb: React.FC<CaseBreadcrumbProps> = ({
  caseId,
  label,
  onBack,
  className
}) => {
  return (
    <div className={cn('flex items-center gap-2 text-sm', className)}>
      <button
        onClick={onBack}
        className="p-1 rounded-md hover:bg-card-hover text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Back to case files"
      >
        <ArrowLeft className="w-4 h-4" />
      </button>
      <span className="text-muted-foreground">←</span>
      <span className="font-medium text-foreground">Case #{caseId}</span>
      <span className="text-muted-foreground">/</span>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
};

export interface ModeBadgeProps {
  label: string;
  variant?: 'warning' | 'info' | 'success';
  className?: string;
}

export const ModeBadge: React.FC<ModeBadgeProps> = ({
  label,
  variant = 'warning',
  className
}) => {
  const variants = {
    warning: 'bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
    info: 'bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    success: 'bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800'
  };

  return (
    <span className={cn(
      'px-2 py-1 rounded-md text-xs font-medium border',
      variants[variant],
      className
    )}>
      {label}
    </span>
  );
};

export interface RunScenarioButtonProps {
  onClick?: () => void;
  className?: string;
}

export const RunScenarioButton: React.FC<RunScenarioButtonProps> = ({
  onClick,
  className
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-3 py-1.5',
        'text-sm font-medium rounded-md',
        'bg-primary text-primary-foreground',
        'hover:bg-primary/90',
        'transition-colors',
        className
      )}
    >
      <Play className="w-4 h-4" />
      <span>Run Scenario</span>
    </button>
  );
};

export interface CaseActionsProps {
  children?: React.ReactNode;
  className?: string;
}

export const CaseActions: React.FC<CaseActionsProps> = ({
  children,
  className
}) => {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {children}
    </div>
  );
};

export interface CaseContextBarProps {
  caseId: string;
  caseLabel?: string;
  onBack?: () => void;
  onRunScenario?: () => void;
  showThemeSwitcher?: boolean;
  className?: string;
}

const CaseContextBar: React.FC<CaseContextBarProps> = ({
  caseId,
  caseLabel = 'Live Investigation',
  onBack,
  onRunScenario,
  showThemeSwitcher = true,
  className
}) => {
  return (
    <div className={cn(
      'h-12 px-5',
      'w-full',
      'flex items-center justify-between',
      'border-b border-border/40',
      'bg-background/95 backdrop-blur-sm',
      'sticky top-0 z-10',
      className
    )}>
      <CaseBreadcrumb
        caseId={caseId}
        label={caseLabel}
        onBack={onBack || (() => window.history.back())}
      />
      
      <CaseActions>
        <RunScenarioButton onClick={onRunScenario} />
        <ModeBadge label="Red Team" variant="warning" />
        {showThemeSwitcher && <ThemeSwitcherDropdown />}
      </CaseActions>
    </div>
  );
};

export default CaseContextBar;