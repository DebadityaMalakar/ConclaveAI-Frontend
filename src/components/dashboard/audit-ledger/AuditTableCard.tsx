'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/util';
import { Card } from '@/components/Card';
import TableToolbar from './TableToolbar';
import AuditTable, { AuditLog } from './AuditTable';
import TableFooter from './TableFooter';

export interface AuditTableCardProps {
  logs: AuditLog[];
  className?: string;
}

const AuditTableCard: React.FC<AuditTableCardProps> = ({ 
  logs,
  className 
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Mock pagination - in real app this would be handled by backend
  const itemsPerPage = 6;
  const totalEntries = logs.length;
  const totalPages = Math.ceil(totalEntries / itemsPerPage);
  
  // Filter logs based on search
  const filteredLogs = logs.filter(log => 
    log.actor.toLowerCase().includes(searchValue.toLowerCase()) ||
    log.action.toLowerCase().includes(searchValue.toLowerCase()) ||
    log.target.toLowerCase().includes(searchValue.toLowerCase()) ||
    log.merkleHash.includes(searchValue)
  );
  
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Card variant="elevated" className={cn('overflow-hidden', className)}>
      <div className="p-5">
        <TableToolbar 
          searchValue={searchValue}
          onSearch={setSearchValue}
          className="mb-4"
        />
        <AuditTable logs={paginatedLogs} />
      </div>
      <TableFooter
        currentEntries={paginatedLogs.length}
        totalEntries={filteredLogs.length}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </Card>
  );
};

export default AuditTableCard;