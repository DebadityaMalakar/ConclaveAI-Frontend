'use client';

import React, { useState } from 'react';
import DashboardLayout from '../layout';
import MainContent from '@/components/dashboard/case-files/MainContent';
import PageHeader from '@/components/dashboard/case-files/PageHeader';
import InvestigationGrid from '@/components/dashboard/case-files/InvestigationGrid';
import { Alert, AlertDescription } from '@/components/Alert';

// Sample data
const sampleInvestigations = [
  {
    id: '1',
    caseId: 'C8-2048',
    title: 'Structuring – Pan-Asia Nexus',
    description: 'Suspicious transaction patterns across multiple jurisdictions involving shell companies.',
    severity: 'CRITICAL' as const,
    participants: 12,
    lastUpdated: '10m ago'
  },
  {
    id: '2',
    caseId: 'C8-2049',
    title: 'Crypto Layering – Wallet Cluster A',
    description: 'Complex layering through multiple crypto wallets and mixers.',
    severity: 'HIGH' as const,
    participants: 8,
    lastUpdated: '25m ago'
  },
  {
    id: '3',
    caseId: 'C8-2050',
    title: 'Trade-Based Money Laundering',
    description: 'Import/export discrepancies with related party transactions.',
    severity: 'MEDIUM' as const,
    participants: 5,
    lastUpdated: '1h ago'
  },
  {
    id: '4',
    caseId: 'C8-2051',
    title: 'Correspondent Banking Review',
    description: 'Unusual pattern in correspondent banking transactions.',
    severity: 'CRITICAL' as const,
    participants: 15,
    lastUpdated: '5m ago'
  },
  {
    id: '5',
    caseId: 'C8-2052',
    title: 'Real Estate Money Laundering',
    description: 'Suspicious purchases through offshore companies.',
    severity: 'HIGH' as const,
    participants: 7,
    lastUpdated: '45m ago'
  },
  {
    id: '6',
    caseId: 'C8-2053',
    title: 'Trade Finance Red Flags',
    description: 'Multiple red flags in trade finance documentation.',
    severity: 'MEDIUM' as const,
    participants: 4,
    lastUpdated: '2h ago'
  },
  {
    id: '7',
    caseId: 'C8-2054',
    title: 'PEP Transaction Monitoring',
    description: 'High-risk transactions involving politically exposed persons.',
    severity: 'CRITICAL' as const,
    participants: 9,
    lastUpdated: '15m ago'
  },
  {
    id: '8',
    caseId: 'C8-2055',
    title: 'Sanctions Evasion Attempt',
    description: 'Attempted transactions through sanctioned entities.',
    severity: 'CRITICAL' as const,
    participants: 11,
    lastUpdated: '8m ago'
  }
];

export default function CaseFilesPage() {
  const [selectedInvestigation, setSelectedInvestigation] = useState(null);

  const stats = [
    { label: 'RISK EXPOSURE', value: '₹4.2 Cr', variant: 'danger' as const },
    { label: 'CASE LOAD', value: 12 }
  ];

  const criticalCount = sampleInvestigations.filter(
    inv => inv.severity === 'CRITICAL'
  ).length;

  const handleInvestigationClick = (investigation: any) => {
    setSelectedInvestigation(investigation);
    // In a real app, you might navigate to a detail page or open a modal
    console.log('Selected:', investigation);
  };

  return (
    <DashboardLayout 
      contextLabel="Case Files"
      variant="default"
      showSearch={true}
      showNotifications={true}
    >
      <MainContent>
        {/* Critical Alert */}
        {criticalCount > 0 && (
          <Alert variant="warning" className="mb-2">
            <AlertDescription>
              {criticalCount} critical {criticalCount === 1 ? 'alert requires' : 'alerts require'} your attention.
            </AlertDescription>
          </Alert>
        )}

        {/* Page Header */}
        <PageHeader
          title="Active Investigations"
          subtitle={`Welcome back. ${criticalCount} critical ${criticalCount === 1 ? 'alert requires' : 'alerts require'} your attention.`}
          stats={stats}
        />

        {/* Investigation Grid */}
        <InvestigationGrid
          investigations={sampleInvestigations}
          onInvestigationClick={handleInvestigationClick}
        />

        {/* Optional: Selected Investigation Preview */}
        {selectedInvestigation && (
          <div className="mt-8 p-4 rounded-lg bg-card border border-border">
            <h3 className="font-semibold mb-2">Selected Investigation</h3>
            <pre className="text-xs text-muted-foreground">
              {JSON.stringify(selectedInvestigation, null, 2)}
            </pre>
          </div>
        )}
      </MainContent>
    </DashboardLayout>
  );
}