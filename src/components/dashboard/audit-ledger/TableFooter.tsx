'use client';

import React from 'react';
import { cn } from '@/lib/util';
import EntryCount from './EntryCount';
import PaginationControls from './PaginationControls';

export interface TableFooterProps {
  currentEntries: number;
  totalEntries: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const TableFooter: React.FC<TableFooterProps> = ({
  currentEntries,
  totalEntries,
  currentPage,
  totalPages,
  onPageChange,
  className
}) => {
  return (
    <div className={cn(
      'flex items-center justify-between',
      'px-4 py-3 border-t border-border',
      className
    )}>
      <EntryCount current={currentEntries} total={totalEntries} />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default TableFooter;