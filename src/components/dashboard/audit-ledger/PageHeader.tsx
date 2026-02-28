'use client';

import React from 'react';
import { cn } from '@/lib/util';
import { HeaderTitleBlock } from '@/components/dashboard/case-files/PageHeader';
import ExportButton from './ExportButton';

export interface AuditPageHeaderProps {
  className?: string;
  onExport?: () => void;
}

const AuditPageHeader: React.FC<AuditPageHeaderProps> = ({ 
  className,
  onExport 
}) => {
  return (
    <div className={cn(
      'flex flex-col sm:flex-row sm:items-start justify-between gap-4',
      className
    )}>
      <HeaderTitleBlock
        title="Audit Explorer"
        subtitle="Immutable ledger of all system and analyst actions. Cryptographically verified."
      />
      <ExportButton onClick={onExport} />
    </div>
  );
};

export default AuditPageHeader;