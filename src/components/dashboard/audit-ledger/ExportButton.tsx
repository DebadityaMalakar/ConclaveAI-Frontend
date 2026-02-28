'use client';

import React from 'react';
import { cn } from '@/lib/util';
import { Download } from 'lucide-react';

export interface ExportButtonProps {
  onClick?: () => void;
  className?: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({ onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-4 py-2',
        'text-sm font-medium rounded-lg',
        'bg-background border border-input',
        'hover:bg-card-hover hover:border-primary/30',
        'transition-colors',
        className
      )}
    >
      <Download className="w-4 h-4" />
      <span>Export Log</span>
    </button>
  );
};

export default ExportButton;