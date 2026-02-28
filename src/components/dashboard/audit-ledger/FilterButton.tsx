'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/util';
import { Filter } from 'lucide-react';

export interface FilterButtonProps {
  onClick?: () => void;
  className?: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({ onClick, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    onClick?.();
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        className={cn(
          'flex items-center gap-2 px-3 py-2',
          'text-sm font-medium rounded-lg',
          'bg-background border border-input',
          'hover:bg-card-hover',
          'transition-colors',
          className
        )}
      >
        <Filter className="w-4 h-4" />
        <span>Filter</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 p-4 bg-card border border-border rounded-lg shadow-lg z-10">
          <p className="text-sm text-muted-foreground">Filter options coming soon...</p>
        </div>
      )}
    </div>
  );
};

export default FilterButton;