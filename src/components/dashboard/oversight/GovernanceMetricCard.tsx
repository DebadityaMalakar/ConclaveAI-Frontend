'use client';

import React from 'react';
import { cn } from '@/lib/util';
import { Card } from '@/components/Card';
import { 
  Shield, 
  AlertTriangle, 
  Scale, 
  Gauge,
  type LucideIcon 
} from 'lucide-react';

export type MetricStatus = 'pass' | 'low' | 'high' | 'warning';

export interface GovernanceMetricCardProps {
  icon?: React.ReactNode;
  iconType?: 'bias' | 'fact' | 'regulatory' | 'stress';
  score: string | number;
  label: string;
  description: string;
  status: MetricStatus;
  className?: string;
}

const statusColors: Record<MetricStatus, { bg: string; text: string; border: string }> = {
  pass: {
    bg: 'bg-green-50 dark:bg-green-950/20',
    text: 'text-green-700 dark:text-green-400',
    border: 'border-green-200 dark:border-green-800'
  },
  low: {
    bg: 'bg-blue-50 dark:bg-blue-950/20',
    text: 'text-blue-700 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800'
  },
  high: {
    bg: 'bg-amber-50 dark:bg-amber-950/20',
    text: 'text-amber-700 dark:text-amber-400',
    border: 'border-amber-200 dark:border-amber-800'
  },
  warning: {
    bg: 'bg-red-50 dark:bg-red-950/20',
    text: 'text-red-700 dark:text-red-400',
    border: 'border-red-200 dark:border-red-800'
  }
};

const iconMap: Record<string, LucideIcon> = {
  bias: Scale,
  fact: Gauge,
  regulatory: Shield,
  stress: AlertTriangle
};

const GovernanceMetricCard: React.FC<GovernanceMetricCardProps> = ({
  icon,
  iconType,
  score,
  label,
  description,
  status,
  className
}) => {
  const colors = statusColors[status];
  const IconComponent = iconType ? iconMap[iconType] : null;

  const statusLabel = {
    pass: 'PASS',
    low: 'LOW',
    high: 'HIGH',
    warning: 'WARNING'
  }[status];

  return (
    <Card className={cn('p-5 hover:shadow-md transition-shadow', className)}>
      <div className="flex items-start justify-between mb-3">
        <div className={cn(
          'w-10 h-10 rounded-lg flex items-center justify-center',
          colors.bg,
          colors.border,
          'border'
        )}>
          {icon || (IconComponent && <IconComponent className={cn('w-5 h-5', colors.text)} />)}
        </div>
        <span className={cn(
          'px-2 py-1 rounded-full text-xs font-medium',
          colors.bg,
          colors.text,
          colors.border,
          'border'
        )}>
          {statusLabel}
        </span>
      </div>

      <div className="space-y-1">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold text-foreground">{score}</span>
          {typeof score === 'number' && <span className="text-sm text-muted-foreground">/100</span>}
        </div>
        <h3 className="font-semibold text-foreground">{label}</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </Card>
  );
};

export default GovernanceMetricCard;