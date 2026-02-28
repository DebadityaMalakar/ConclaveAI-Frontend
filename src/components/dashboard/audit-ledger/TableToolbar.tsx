'use client';

import React from 'react';
import { cn } from '@/lib/util';
import AuditSearch from './AuditSearch';
import FilterButton from './FilterButton';

export interface TableToolbarProps {
  onSearch?: (value: string) => void;
  searchValue?: string;
  className?: string;
}

const TableToolbar: React.FC<TableToolbarProps> = ({
  onSearch,
  searchValue,
  className
}) => {
  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      <AuditSearch 
        value={searchValue} 
        onChange={onSearch}
        className="max-w-md"
      />
      <FilterButton />
    </div>
  );
};

export default TableToolbar;