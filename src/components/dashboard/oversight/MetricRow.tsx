'use client';

import React from 'react';
import { cn } from '@/lib/util';
import GovernanceMetricCard, { GovernanceMetricCardProps } from './GovernanceMetricCard';

export interface MetricsRowProps {
  metrics: GovernanceMetricCardProps[];
  className?: string;
}

const MetricsRow: React.FC<MetricsRowProps> = ({ metrics, className }) => {
  return (
    <div className={cn(
      'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
      className
    )}>
      {metrics.map((metric, index) => (
        <GovernanceMetricCard key={index} {...metric} />
      ))}
    </div>
  );
};

export default MetricsRow;