'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../layout';
import CaseContextBar from '@/components/dashboard/live-monitor/CaseContextBar';
import LiveMonitorWorkspace from '@/components/dashboard/live-monitor/LiveMonitorWorkspace';
import { GraphNode, GraphEdge } from '@/components/dashboard/live-monitor/TransactionGraph';
import { LogEntry } from '@/components/dashboard/live-monitor/InvestigationLogCard';

// Sample graph data for case #2048
const sampleNodes: GraphNode[] = [
  { id: '1', label: 'Subject Account', risk: 'high', type: 'account' },
  { id: '2', label: 'ShellCorp Ltd', risk: 'high', type: 'entity' },
  { id: '3', label: 'Crypto Wallet X', risk: 'high', type: 'account' },
  { id: '4', label: 'Offshore LLC', risk: 'normal', type: 'entity' },
  { id: '5', label: 'Intermediary A', risk: 'normal', type: 'account' },
  { id: '6', label: 'Intermediary B', risk: 'normal', type: 'account' },
  { id: '7', label: 'Final Recipient', risk: 'high', type: 'account' },
];

const sampleEdges: GraphEdge[] = [
  { from: '1', to: '2', weight: 0.9 },
  { from: '2', to: '3', weight: 0.8 },
  { from: '3', to: '4', weight: 0.5 },
  { from: '4', to: '5', weight: 0.4 },
  { from: '5', to: '6', weight: 0.3 },
  { from: '6', to: '7', weight: 0.7 },
  { from: '2', to: '5', weight: 0.6 },
];

const sampleLogEntries: LogEntry[] = [
  {
    id: '1',
    role: 'System',
    timestamp: '14:23:45',
    message: 'Pattern detected: Structuring across 3 accounts',
    confidence: 85
  },
  {
    id: '2',
    role: 'Auditor',
    timestamp: '14:25:12',
    message: 'Reviewing transaction history for ShellCorp Ltd',
    confidence: 40
  },
  {
    id: '3',
    role: 'Prosecutor',
    timestamp: '14:28:33',
    message: 'Flag: Transactions just below reporting threshold',
    confidence: 75
  },
  {
    id: '4',
    role: 'System',
    timestamp: '14:32:17',
    message: 'Linked to 2 prior cases (C8-2032, C8-2041)',
    confidence: 95
  },
  {
    id: '5',
    role: 'Auditor',
    timestamp: '14:35:44',
    message: 'Beneficial ownership trace incomplete',
    confidence: 30
  }
];

export default function LiveMonitorPage() {
  const router = useRouter();
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

  const handleRunScenario = () => {
    console.log('Running scenario analysis...');
    alert('Scenario analysis started - this would trigger ML models in production.');
  };

  const handleNodeClick = (node: GraphNode) => {
    setSelectedNode(node);
    console.log('Selected node:', node);
  };

  const handleBack = () => {
    router.push('/dashboard/case-files');
  };

  return (
    <DashboardLayout 
      contextLabel="Live Monitor"
      variant="default"
      showSearch={false}
      showNotifications={true}
    >
      <CaseContextBar
        caseId="2048"
        caseLabel="Live Investigation"
        onBack={handleBack}
        onRunScenario={handleRunScenario}
        showThemeSwitcher={true}
      />
      
      <div className="mt-4">
        <LiveMonitorWorkspace
          nodes={sampleNodes}
          edges={sampleEdges}
          centerNodeId="1"
          logEntries={sampleLogEntries}
          draftProps={{
            draftId: 'SAR-112',
            status: 'draft',
            sections: [
              {
                title: '1. Activity Description',
                content: 'Multiple structured transactions detected across three accounts, just below reporting thresholds. Pattern suggests layering through shell companies.'
              },
              {
                title: '2. Suspicious Entity Details',
                content: 'Primary subject: ShellCorp International. Linked to 12 transactions totaling ₹2.3Cr over 48 hours.'
              },
              {
                title: '3. Risk Assessment',
                content: 'High risk - multiple red flags including structuring, offshore entities, and unusual transaction patterns.'
              }
            ]
          }}
          onNodeClick={handleNodeClick}
        />
      </div>

      {selectedNode && (
        <div className="mt-4 p-3 bg-card border border-border rounded-lg text-sm">
          <span className="font-medium">Selected: </span>
          <span>{selectedNode.label}</span>
          <span className="ml-2 text-xs text-muted-foreground">
            ({selectedNode.type}, {selectedNode.risk} risk)
          </span>
        </div>
      )}
    </DashboardLayout>
  );
}