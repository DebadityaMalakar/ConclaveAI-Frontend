'use client';

import React from 'react';
import DashboardLayout from '../layout';
import MainContent from '@/components/dashboard/oversight/MainContent';
import OversightHeader from '@/components/dashboard/oversight/OversightHeader';
import MetricsRow from '@/components/dashboard/oversight/MetricRow';
import GovernanceFeedCard from '@/components/dashboard/oversight/GovernanceFeedCard';
import { GovernanceEventProps } from '@/components/dashboard/oversight/GovernanceEvent';

// Sample metrics data
const sampleMetrics = [
  {
    iconType: 'bias' as const,
    score: 98,
    label: 'Bias Audit',
    description: 'No systemic demographic bias detected in last 100 cases.',
    status: 'pass' as const
  },
  {
    iconType: 'fact' as const,
    score: '0.02%',
    label: 'Factual Consistency',
    description: 'Hallucination/Inconsistency rate below critical threshold.',
    status: 'low' as const
  },
  {
    iconType: 'regulatory' as const,
    score: 95,
    label: 'Regulatory Adherence',
    description: 'Alignment with latest FATF guidelines verified.',
    status: 'high' as const
  }
];

// Sample governance events
const sampleEvents: GovernanceEventProps[] = [
  {
    type: 'bias',
    title: 'Bias Correction',
    caseId: '2048',
    description: 'Suggest localized context adjustment for regional compliance.',
    timestamp: '10:42 AM',
    severity: 'medium'
  },
  {
    type: 'fact',
    title: 'Fact Verification',
    caseId: '2042',
    description: 'Auto-corrected mismatch in transaction amount.',
    timestamp: '09:15 AM',
    severity: 'low'
  },
  {
    type: 'regulatory',
    title: 'Regulatory Block',
    caseId: '2039',
    description: 'Missing beneficial ownership data - SAR filing required.',
    timestamp: '08:30 AM',
    severity: 'high'
  },
  {
    type: 'stress',
    title: 'Logic Stress Test',
    description: 'Red team simulation results: 98% resilience against adversarial patterns.',
    timestamp: 'Yesterday',
    severity: 'info'
  },
  {
    type: 'bias',
    title: 'Demographic Parity Check',
    caseId: '2035',
    description: 'Automated review passed with 99.5% confidence.',
    timestamp: 'Yesterday',
    severity: 'low'
  },
  {
    type: 'regulatory',
    title: 'SAR Quality Review',
    caseId: '2028',
    description: 'Narrative meets FinCEN requirements.',
    timestamp: 'Yesterday',
    severity: 'info'
  }
];

export default function OversightPage() {
  return (
    <DashboardLayout 
      contextLabel="Adversarial Red Team"
      variant="default"
      showSearch={false}
      showNotifications={true}
    >
      <MainContent>
        <OversightHeader />
        
        <MetricsRow metrics={sampleMetrics} />
        
        <GovernanceFeedCard events={sampleEvents} />
      </MainContent>
    </DashboardLayout>
  );
}