'use client';

import React from 'react';
import { cn } from '@/lib/util';
import { Card } from '@/components/Card';

export interface DraftSarCardProps {
  draftId: string;
  status: 'draft' | 'final';
  title?: string;
  subtitle?: string;
  sections?: {
    title: string;
    content: string;
  }[];
  className?: string;
}

const DraftSarCard: React.FC<DraftSarCardProps> = ({
  draftId,
  status,
  title = 'Suspicious Activity Report',
  subtitle = 'FinCEN Form 112',
  sections = [
    {
      title: '1. Activity Description',
      content: 'Multiple structured transactions detected across three accounts, just below reporting thresholds. Pattern suggests layering through shell companies.'
    },
    {
      title: '2. Suspicious Entity Details',
      content: 'Primary subject: ShellCorp International. Linked to 12 transactions totaling ₹2.3Cr over 48 hours.'
    }
  ],
  className
}) => {
  return (
    <Card variant="elevated" className={cn('flex flex-col h-full', className)}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h3 className="font-semibold text-foreground">Draft {draftId}</h3>
        <span className={cn(
          'px-2 py-1 rounded-full text-xs font-medium',
          status === 'draft'
            ? 'bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400'
            : 'bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400'
        )}>
          {status === 'draft' ? 'DRAFT MODE' : 'FINAL'}
        </span>
      </div>
      
      <div className="flex-1 p-4 space-y-4 bg-muted/20">
        <div className="text-center">
          <h4 className="text-lg font-bold text-foreground">{title}</h4>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
          <p className="text-xs font-mono text-muted-foreground mt-1">CONFIDENTIAL</p>
        </div>
        
        <div className="space-y-3">
          {sections.map((section, index) => (
            <div key={index} className="space-y-1">
              <h5 className="text-sm font-semibold text-foreground">{section.title}</h5>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default DraftSarCard;