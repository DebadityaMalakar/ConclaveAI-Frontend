'use client';

import React from 'react';
import { cn } from '@/lib/util';
import { Card } from '@/components/Card';
import GovernanceEvent, { GovernanceEventProps } from './GovernanceEvent';

export interface GovernanceFeedCardProps {
  events: GovernanceEventProps[];
  className?: string;
}

const GovernanceFeedCard: React.FC<GovernanceFeedCardProps> = ({
  events,
  className
}) => {
  return (
    <Card variant="elevated" className={cn('overflow-hidden', className)}>
      <div className="px-4 py-3 border-b border-border bg-muted/20">
        <h3 className="font-semibold text-foreground">Recent Governance Interventions</h3>
      </div>
      
      <div className="divide-y divide-border">
        {events.map((event, index) => (
          <GovernanceEvent key={index} {...event} />
        ))}
      </div>
    </Card>
  );
};

export default GovernanceFeedCard;