'use client';

import React, { useState } from 'react';
import DashboardLayout from '../layout';
import MainContent from '@/components/dashboard/audit-ledger/MainContent';
import AuditPageHeader from '@/components/dashboard/audit-ledger/PageHeader';
import AuditTableCard from '@/components/dashboard/audit-ledger/AuditTableCard';
import { AuditLog } from '@/components/dashboard/audit-ledger/AuditTable';

// Sample audit log data
const sampleAuditLogs: AuditLog[] = [
  {
    id: '1',
    timestamp: '2024-02-28 14:23:45',
    actor: 'System AI',
    actorType: 'system',
    action: 'Case Assignment',
    target: 'C8-2048 → Analyst Team',
    merkleHash: '0x7d8f3a2b1c5e9d4f6a8b2c4d5e6f7a8b9c0d1e2f',
    verification: 'verified'
  },
  {
    id: '2',
    timestamp: '2024-02-28 13:15:22',
    actor: 'J. Doe',
    actorType: 'analyst',
    action: 'Transaction Review',
    target: 'TX-8932-CRYPTO',
    merkleHash: '0x3a5b7c9d1e2f4a6b8c0d2e4f6a8b0c2d4e6f8a0b',
    verification: 'verified'
  },
  {
    id: '3',
    timestamp: '2024-02-28 12:08:37',
    actor: 'System AI',
    actorType: 'system',
    action: 'Risk Score Update',
    target: 'Profile: ShellCorp Ltd',
    merkleHash: '0x9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c',
    verification: 'verified'
  },
  {
    id: '4',
    timestamp: '2024-02-28 11:42:19',
    actor: 'M. Chen',
    actorType: 'analyst',
    action: 'Document Upload',
    target: 'Case C8-2050 - Evidence.pdf',
    merkleHash: '0x2c4d6e8f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d',
    verification: 'verified'
  },
  {
    id: '5',
    timestamp: '2024-02-28 10:55:03',
    actor: 'Admin',
    actorType: 'admin',
    action: 'User Permission',
    target: 'Added analyst: S. Rodriguez',
    merkleHash: '0x6f7e8d9c0b1a2f3e4d5c6b7a8f9e0d1c2b3a4f5e',
    verification: 'verified'
  },
  {
    id: '6',
    timestamp: '2024-02-28 09:30:47',
    actor: 'System AI',
    actorType: 'system',
    action: 'Alert Triggered',
    target: 'Pattern: Structuring (HIGH)',
    merkleHash: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
    verification: 'pending'
  },
  {
    id: '7',
    timestamp: '2024-02-28 08:14:22',
    actor: 'K. Williams',
    actorType: 'analyst',
    action: 'Case Note',
    target: 'C8-2051 - Added findings',
    merkleHash: '0x4f5e6d7c8b9a0f1e2d3c4b5a6f7e8d9c0b1a2f3e',
    verification: 'verified'
  },
  {
    id: '8',
    timestamp: '2024-02-28 07:05:38',
    actor: 'System AI',
    actorType: 'system',
    action: 'Blockchain Verification',
    target: 'Block #845,329',
    merkleHash: '0x8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b',
    verification: 'verified'
  }
];

export default function AuditLedgerPage() {
  const [logs, setLogs] = useState(sampleAuditLogs);

  const handleExport = () => {
    // In a real app, this would trigger a CSV/JSON export
    console.log('Exporting audit logs...');
    alert('Export functionality would download the audit log in production.');
  };

  return (
    <DashboardLayout 
      contextLabel="Audit Explorer"
      variant="default"
      showSearch={true}
      showNotifications={true}
    >
      <MainContent>
        <AuditPageHeader onExport={handleExport} />
        <AuditTableCard logs={logs} />
      </MainContent>
    </DashboardLayout>
  );
}