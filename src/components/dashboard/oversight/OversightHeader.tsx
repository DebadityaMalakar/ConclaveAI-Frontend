'use client';

import React from 'react';
import { cn } from '@/lib/util';
import { HeaderTitleBlock } from '@/components/dashboard/case-files/PageHeader';

export interface ComplianceStatusBadgeProps {
  status?: 'active' | 'warning' | 'error';
  className?: string;
}

export const ComplianceStatusBadge: React.FC<ComplianceStatusBadgeProps> = ({
  status = 'active',
  className
}) => {
  const statusStyles = {
    active: 'bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
    warning: 'bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
    error: 'bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800'
  };

  const dotStyles = {
    active: 'bg-green-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500'
  };

  return (
    <span className={cn(
      'px-3 py-1.5 rounded-full text-sm font-medium',
      'inline-flex items-center gap-2',
      'border',
      statusStyles[status],
      className
    )}>
      <span className={cn('w-2 h-2 rounded-full', dotStyles[status])} />
      Compliance {status === 'active' ? 'Active' : status === 'warning' ? 'Warning' : 'Error'}
    </span>
  );
};

export interface OversightHeaderProps {
  className?: string;
}

const OversightHeader: React.FC<OversightHeaderProps> = ({ className }) => {
  return (
    <div className={cn(
      'flex flex-col sm:flex-row sm:items-start justify-between gap-4',
      className
    )}>
      <HeaderTitleBlock
        title="Oversight & Governance"
        subtitle="Adversarial review, bias monitoring, and regulatory alignment controls."
      />
      <ComplianceStatusBadge status="active" />
    </div>
  );
};

export default OversightHeader;