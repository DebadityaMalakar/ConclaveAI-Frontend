'use client';

import React from 'react';
import { cn } from '@/lib/util';
import InvestigationCanvasCard from './InvestigationCanvasCard';
import InvestigationSidePanel from './InvestigationSidePanel';
import { GraphNode, GraphEdge } from './TransactionGraph';
import { LogEntry } from './InvestigationLogCard';
import { DraftSarCardProps } from './DraftSarCard';

export interface LiveMonitorWorkspaceProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  centerNodeId?: string;
  logEntries: LogEntry[];
  draftProps: DraftSarCardProps;
  onNodeClick?: (node: GraphNode) => void;
  className?: string;
}

const LiveMonitorWorkspace: React.FC<LiveMonitorWorkspaceProps> = ({
  nodes,
  edges,
  centerNodeId,
  logEntries,
  draftProps,
  onNodeClick,
  className
}) => {
  return (
    <div className={cn(
      'grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-4',
      'h-[calc(100vh-12rem)]',
      className
    )}>
      <InvestigationCanvasCard
        nodes={nodes}
        edges={edges}
        centerNodeId={centerNodeId}
        onNodeClick={onNodeClick}
      />
      
      <InvestigationSidePanel
        logEntries={logEntries}
        draftProps={draftProps}
      />
    </div>
  );
};

export default LiveMonitorWorkspace;