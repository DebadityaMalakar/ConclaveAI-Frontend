'use client';

import React from 'react';
import { cn } from '@/lib/util';
import InvestigationLogCard, { LogEntry } from './InvestigationLogCard';
import DraftSarCard, { DraftSarCardProps } from './DraftSarCard';

export interface InvestigationSidePanelProps {
  logEntries: LogEntry[];
  draftProps: DraftSarCardProps;
  className?: string;
}

const InvestigationSidePanel: React.FC<InvestigationSidePanelProps> = ({
  logEntries,
  draftProps,
  className
}) => {
  return (
    <div className={cn('flex flex-col gap-4 h-full', className)}>
      <div className="flex-1 min-h-[300px]">
        <InvestigationLogCard entries={logEntries} confidence={40} />
      </div>
      <div className="flex-1 min-h-[300px]">
        <DraftSarCard {...draftProps} />
      </div>
    </div>
  );
};

export default InvestigationSidePanel;