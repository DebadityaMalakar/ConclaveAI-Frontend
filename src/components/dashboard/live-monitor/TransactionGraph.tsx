'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/util';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export type GraphNode = {
  id: string;
  label: string;
  risk: 'high' | 'normal';
  type: 'account' | 'entity';
  x?: number;
  y?: number;
};

export type GraphEdge = {
  from: string;
  to: string;
  weight?: number;
};

export interface TransactionGraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  centerNodeId?: string;
  onNodeClick?: (node: GraphNode) => void;
  className?: string;
}

export interface GraphToolsProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onReset?: () => void;
  className?: string;
}

export const GraphTools: React.FC<GraphToolsProps> = ({
  onZoomIn,
  onZoomOut,
  onReset,
  className
}) => {
  return (
    <div className={cn(
      'flex flex-col gap-1 p-1',
      'bg-card/80 backdrop-blur-sm border border-border rounded-lg',
      className
    )}>
      <button
        onClick={onZoomIn}
        className="p-2 rounded-md hover:bg-card-hover text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Zoom in"
      >
        <ZoomIn className="w-4 h-4" />
      </button>
      <button
        onClick={onZoomOut}
        className="p-2 rounded-md hover:bg-card-hover text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Zoom out"
      >
        <ZoomOut className="w-4 h-4" />
      </button>
      <button
        onClick={onReset}
        className="p-2 rounded-md hover:bg-card-hover text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Reset view"
      >
        <RotateCcw className="w-4 h-4" />
      </button>
    </div>
  );
};

// Simplified canvas-based graph visualization
const TransactionGraph: React.FC<TransactionGraphProps> = ({
  nodes,
  edges,
  centerNodeId,
  onNodeClick,
  className
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Find center node (subject account)
  const centerNode = nodes.find(n => n.id === centerNodeId) || nodes[0];

  // Simple force-directed layout simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Draw edges
    ctx.strokeStyle = 'hsl(var(--border))';
    ctx.lineWidth = 1.5;
    edges.forEach(edge => {
      const fromNode = nodes.find(n => n.id === edge.from);
      const toNode = nodes.find(n => n.id === edge.to);
      if (!fromNode || !toNode) return;

      // Provide fallback positions if x/y are undefined
      const fromX = fromNode.x !== undefined ? fromNode.x : rect.width / 2;
      const fromY = fromNode.y !== undefined ? fromNode.y : rect.height / 2;
      const toX = toNode.x !== undefined ? toNode.x : rect.width / 2;
      const toY = toNode.y !== undefined ? toNode.y : rect.height / 2;

      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.strokeStyle = edge.weight && edge.weight > 0.7 
        ? 'hsl(var(--destructive))' 
        : 'hsl(var(--border))';
      ctx.stroke();
    });

    // Draw nodes
    nodes.forEach(node => {
      const isHighRisk = node.risk === 'high';
      const isHovered = hoveredNode === node.id;
      const isCenter = node.id === centerNodeId;

      // Node position (simplified - in real app would use proper layout)
      const x = node.x || rect.width / 2;
      const y = node.y || rect.height / 2;

      // Node shadow
      ctx.shadowColor = isHighRisk ? 'rgba(239, 68, 68, 0.5)' : 'rgba(0, 0, 0, 0.1)';
      ctx.shadowBlur = isHighRisk ? 15 : 5;

      // Node circle
      ctx.beginPath();
      ctx.arc(x, y, isCenter ? 10 : 8, 0, 2 * Math.PI);
      
      // Fill based on type and risk
      if (node.type === 'account') {
        ctx.fillStyle = isHighRisk 
          ? 'hsl(var(--destructive))' 
          : 'hsl(var(--primary))';
      } else {
        ctx.fillStyle = isHighRisk 
          ? 'hsl(var(--destructive))' 
          : 'hsl(var(--secondary))';
      }
      ctx.fill();

      // Node border
      ctx.strokeStyle = isHovered 
        ? 'hsl(var(--ring))' 
        : isHighRisk 
          ? 'hsl(var(--destructive))' 
          : 'hsl(var(--border))';
      ctx.lineWidth = isHovered ? 3 : 2;
      ctx.stroke();

      // Reset shadow
      ctx.shadowBlur = 0;

      // Label for hovered or important nodes
      if (isHovered || isCenter) {
        ctx.font = '12px system-ui';
        ctx.fillStyle = 'hsl(var(--foreground))';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, x, y - 15);
      }
    });
  }, [nodes, edges, hoveredNode, centerNodeId, scale, offset]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Find clicked node (simplified hit detection)
    const clickedNode = nodes.find(node => {
      const nodeX = node.x || rect.width / 2;
      const nodeY = node.y || rect.height / 2;
      const distance = Math.sqrt((x - nodeX) ** 2 + (y - nodeY) ** 2);
      return distance < 10;
    });

    if (clickedNode) {
      onNodeClick?.(clickedNode);
      setHoveredNode(clickedNode.id);
    }
  };

  const handleZoomIn = () => setScale(s => Math.min(s + 0.1, 2));
  const handleZoomOut = () => setScale(s => Math.max(s - 0.1, 0.5));
  const handleReset = () => {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <div className={cn('relative w-full h-full min-h-[500px]', className)}>
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-pointer"
        onClick={handleCanvasClick}
        onMouseMove={(e) => {
          // Simplified hover detection
          const rect = canvasRef.current?.getBoundingClientRect();
          if (!rect) return;

          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const node = nodes.find(node => {
            const nodeX = node.x || rect.width / 2;
            const nodeY = node.y || rect.height / 2;
            const distance = Math.sqrt((x - nodeX) ** 2 + (y - nodeY) ** 2);
            return distance < 10;
          });

          setHoveredNode(node?.id || null);
        }}
        onMouseLeave={() => setHoveredNode(null)}
      />
      
      <GraphTools
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleReset}
        className="absolute top-4 right-4"
      />
    </div>
  );
};

export default TransactionGraph;