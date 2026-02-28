'use client';

import React from 'react';
import { cn } from '@/lib/util';
import InvestigationCard, { InvestigationCardProps } from './InvestigationCard';

export interface InvestigationGridProps {
  investigations: InvestigationCardProps['investigation'][];
  onInvestigationClick?: (investigation: InvestigationCardProps['investigation']) => void;
  className?: string;
}

const InvestigationGrid: React.FC<InvestigationGridProps> = ({
  investigations,
  onInvestigationClick,
  className
}) => {
  return (
    <div className={cn(
      'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5',
      className
    )}>
      {investigations.map((investigation) => (
        <InvestigationCard
          key={investigation.id}
          investigation={investigation}
          onClick={() => onInvestigationClick?.(investigation)}
        />
      ))}
    </div>
  );
};

export default InvestigationGrid;