'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/util';
import { Card } from '@/components/Card';
import CanvasHeader from './CanvasHeader';
import TransactionGraph, { GraphNode, GraphEdge } from './TransactionGraph';
import CanvasFooterBar from './CanvasFooterBar';

export interface InvestigationCanvasCardProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  centerNodeId?: string;
  onNodeClick?: (node: GraphNode) => void;
  className?: string;
}

const InvestigationCanvasCard: React.FC<InvestigationCanvasCardProps> = ({
  nodes,
  edges,
  centerNodeId,
  onNodeClick,
  className
}) => {
  const [viewMode, setViewMode] = useState<'individual' | 'entity'>('individual');
  const [activeTypology, setActiveTypology] = useState('ALL');

  // Mock positions for nodes (simplified layout)
  const positionedNodes = nodes.map((node, index) => ({
    ...node,
    x: 200 + Math.sin(index * 1.5) * 150,
    y: 150 + Math.cos(index * 1.2) * 100
  }));

  return (
    <Card variant="elevated" className={cn('flex flex-col h-full', className)}>
      <CanvasHeader
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        activeTypology={activeTypology}
        onTypologyChange={setActiveTypology}
      />
      
      <div className="flex-1 min-h-[400px] p-4">
        <TransactionGraph
          nodes={positionedNodes}
          edges={edges}
          centerNodeId={centerNodeId}
          onNodeClick={onNodeClick}
        />
      </div>
      
      <CanvasFooterBar />
    </Card>
  );
};

export default InvestigationCanvasCard;