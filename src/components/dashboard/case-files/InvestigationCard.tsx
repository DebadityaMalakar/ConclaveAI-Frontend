'use client';

import React from 'react';
import { cn } from '@/lib/util';
import { Users, Clock } from 'lucide-react';

// Case ID Badge
export interface CaseIdBadgeProps {
  id: string;
  className?: string;
}

export const CaseIdBadge: React.FC<CaseIdBadgeProps> = ({ id, className }) => {
  return (
    <span className={cn(
      'px-2 py-1 rounded-md text-xs font-mono',
      'bg-gray-100 dark:bg-gray-800',
      'text-gray-700 dark:text-gray-300',
      className
    )}>
      {id}
    </span>
  );
};

// Severity Badge
export type SeverityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM';

export interface SeverityBadgeProps {
  level: SeverityLevel;
  className?: string;
}

const severityStyles: Record<SeverityLevel, { bg: string; text: string; dot: string }> = {
  CRITICAL: {
    bg: 'bg-red-100 dark:bg-red-950/30',
    text: 'text-red-700 dark:text-red-400',
    dot: 'bg-red-500'
  },
  HIGH: {
    bg: 'bg-amber-100 dark:bg-amber-950/30',
    text: 'text-amber-700 dark:text-amber-400',
    dot: 'bg-amber-500'
  },
  MEDIUM: {
    bg: 'bg-blue-100 dark:bg-blue-950/30',
    text: 'text-blue-700 dark:text-blue-400',
    dot: 'bg-blue-500'
  }
};

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({ level, className }) => {
  const styles = severityStyles[level];
  
  return (
    <span className={cn(
      'px-2 py-1 rounded-md text-xs font-medium',
      'flex items-center gap-1.5',
      styles.bg,
      styles.text,
      className
    )}>
      <span className={cn('w-1.5 h-1.5 rounded-full', styles.dot)} />
      {level}
    </span>
  );
};

// Investigation Title
export interface InvestigationTitleProps {
  text: string;
  className?: string;
}

export const InvestigationTitle: React.FC<InvestigationTitleProps> = ({ text, className }) => {
  return (
    <h3 className={cn(
      'text-base font-semibold text-foreground',
      'line-clamp-2',
      className
    )}>
      {text}
    </h3>
  );
};

// Investigation Description
export interface InvestigationDescriptionProps {
  text: string;
  className?: string;
}

export const InvestigationDescription: React.FC<InvestigationDescriptionProps> = ({ text, className }) => {
  return (
    <p className={cn(
      'text-sm text-muted-foreground',
      'line-clamp-2',
      className
    )}>
      {text}
    </p>
  );
};

// Investigation Meta
export interface InvestigationMetaProps {
  participants: number;
  lastUpdated: string;
  className?: string;
}

export const InvestigationMeta: React.FC<InvestigationMetaProps> = ({
  participants,
  lastUpdated,
  className
}) => {
  return (
    <div className={cn(
      'flex items-center gap-4 text-xs text-muted-foreground',
      className
    )}>
      <div className="flex items-center gap-1.5">
        <Users className="w-3.5 h-3.5" />
        <span>{participants}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5" />
        <span>{lastUpdated}</span>
      </div>
    </div>
  );
};

// Card Header
export interface CardHeaderProps {
  caseId: string;
  severity: SeverityLevel;
  className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  caseId,
  severity,
  className
}) => {
  return (
    <div className={cn('flex items-center justify-between', className)}>
      <CaseIdBadge id={caseId} />
      <SeverityBadge level={severity} />
    </div>
  );
};

// Full Investigation Card
export interface InvestigationCardProps {
  investigation: {
    id: string;
    caseId: string;
    title: string;
    description: string;
    severity: SeverityLevel;
    participants: number;
    lastUpdated: string;
  };
  onClick?: () => void;
  className?: string;
}

const InvestigationCard: React.FC<InvestigationCardProps> = ({
  investigation,
  onClick,
  className
}) => {
  const {
    caseId,
    title,
    description,
    severity,
    participants,
    lastUpdated
  } = investigation;

  return (
    <div
      onClick={onClick}
      className={cn(
        'group relative',
        'bg-card border border-border',
        'rounded-xl p-5',
        'shadow-sm',
        'hover:shadow-lg hover:border-primary/20',
        'transition-all duration-200',
        'cursor-pointer',
        'flex flex-col gap-3',
        className
      )}
    >
      {/* Hover glow effect for dark mode */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none dark:bg-primary/5" />
      
      <CardHeader caseId={caseId} severity={severity} />
      
      <InvestigationTitle text={title} />
      
      <InvestigationDescription text={description} />
      
      <div className="h-px bg-border/50 my-1" />
      
      <InvestigationMeta
        participants={participants}
        lastUpdated={lastUpdated}
      />
    </div>
  );
};

export default InvestigationCard;