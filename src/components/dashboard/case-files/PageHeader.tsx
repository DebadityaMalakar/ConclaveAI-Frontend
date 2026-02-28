'use client';

import React from 'react';
import { cn } from '@/lib/util';

// Header Title Block
export interface HeaderTitleBlockProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const HeaderTitleBlock: React.FC<HeaderTitleBlockProps> = ({
  title,
  subtitle,
  className
}) => {
  return (
    <div className={cn('space-y-1', className)}>
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        {title}
      </h1>
      {subtitle && (
        <p className="text-sm text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
};

// Stat Card
export interface HeaderStatCardProps {
  label: string;
  value: string | number;
  variant?: 'default' | 'danger';
  className?: string;
}

export const HeaderStatCard: React.FC<HeaderStatCardProps> = ({
  label,
  value,
  variant = 'default',
  className
}) => {
  return (
    <div className={cn(
      'min-w-[120px] rounded-lg p-3',
      'bg-card border border-border',
      'shadow-sm',
      variant === 'danger' && 'border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20',
      className
    )}>
      <p className={cn(
        'text-xs font-medium uppercase tracking-wider',
        variant === 'danger' 
          ? 'text-red-600 dark:text-red-400' 
          : 'text-muted-foreground'
      )}>
        {label}
      </p>
      <p className={cn(
        'text-2xl font-semibold mt-1',
        variant === 'danger' 
          ? 'text-red-700 dark:text-red-300' 
          : 'text-foreground'
      )}>
        {value}
      </p>
    </div>
  );
};

// Header Stats Container
export interface HeaderStatsProps {
  stats: HeaderStatCardProps[];
  className?: string;
}

export const HeaderStats: React.FC<HeaderStatsProps> = ({
  stats,
  className
}) => {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {stats.map((stat, index) => (
        <HeaderStatCard key={index} {...stat} />
      ))}
    </div>
  );
};

// Main PageHeader Component
export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  stats?: HeaderStatCardProps[];
  className?: string;
  children?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  stats,
  className,
  children
}) => {
  return (
    <div className={cn(
      'flex flex-col sm:flex-row sm:items-start justify-between gap-4',
      className
    )}>
      <HeaderTitleBlock title={title} subtitle={subtitle} />
      
      {stats && <HeaderStats stats={stats} />}
      
      {children}
    </div>
  );
};

export default PageHeader;