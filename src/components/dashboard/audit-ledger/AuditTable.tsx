'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/util';
import { CheckCircle, Clock, Copy } from 'lucide-react';

export type AuditLog = {
  id: string;
  timestamp: string;
  actor: string;
  actorType: 'system' | 'analyst' | 'admin';
  action: string;
  target: string;
  merkleHash: string;
  verification: 'verified' | 'pending';
};

export interface VerificationBadgeProps {
  status: 'verified' | 'pending';
  className?: string;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({ 
  status, 
  className 
}) => {
  const styles = {
    verified: {
      bg: 'bg-green-100 dark:bg-green-950/30',
      text: 'text-green-700 dark:text-green-400',
      icon: <CheckCircle className="w-3.5 h-3.5" />,
      label: 'VERIFIED'
    },
    pending: {
      bg: 'bg-amber-100 dark:bg-amber-950/30',
      text: 'text-amber-700 dark:text-amber-400',
      icon: <Clock className="w-3.5 h-3.5" />,
      label: 'PENDING'
    }
  };

  const style = styles[status];

  return (
    <span className={cn(
      'px-2 py-1 rounded-full text-xs font-medium',
      'inline-flex items-center gap-1.5',
      style.bg,
      style.text,
      className
    )}>
      {style.icon}
      {style.label}
    </span>
  );
};

export interface MerkleHashProps {
  hash: string;
  className?: string;
  onCopy?: () => void;
}

export const MerkleHash: React.FC<MerkleHashProps> = ({ 
  hash, 
  className,
  onCopy 
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    onCopy?.();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <code className="font-mono text-xs bg-muted/50 px-1.5 py-0.5 rounded">
        {hash.slice(0, 8)}...{hash.slice(-4)}
      </code>
      <button
        onClick={handleCopy}
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Copy full hash"
      >
        <Copy className="w-3.5 h-3.5" />
      </button>
      {copied && (
        <span className="text-xs text-green-600 dark:text-green-400">Copied!</span>
      )}
    </div>
  );
};

export interface ActorCellProps {
  name: string;
  type: 'system' | 'analyst' | 'admin';
  className?: string;
}

export const ActorCell: React.FC<ActorCellProps> = ({ name, type, className }) => {
  const typeStyles = {
    system: 'text-purple-600 dark:text-purple-400',
    analyst: 'text-blue-600 dark:text-blue-400',
    admin: 'text-amber-600 dark:text-amber-400'
  };

  return (
    <div className={cn('font-medium', typeStyles[type], className)}>
      {name}
    </div>
  );
};

export interface AuditRowProps {
  log: AuditLog;
  className?: string;
}

export const AuditRow: React.FC<AuditRowProps> = ({ log, className }) => {
  return (
    <tr className={cn(
      'border-b border-border hover:bg-card-hover transition-colors',
      className
    )}>
      <td className="py-3 px-4 text-sm text-muted-foreground whitespace-nowrap">
        {log.timestamp}
      </td>
      <td className="py-3 px-4">
        <ActorCell name={log.actor} type={log.actorType} />
      </td>
      <td className="py-3 px-4 text-sm text-foreground">
        {log.action}
      </td>
      <td className="py-3 px-4 text-sm text-muted-foreground">
        {log.target}
      </td>
      <td className="py-3 px-4">
        <MerkleHash hash={log.merkleHash} />
      </td>
      <td className="py-3 px-4">
        <VerificationBadge status={log.verification} />
      </td>
    </tr>
  );
};

export interface AuditTableProps {
  logs: AuditLog[];
  className?: string;
}

const AuditTable: React.FC<AuditTableProps> = ({ logs, className }) => {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full text-left">
        <thead className="bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          <tr>
            <th className="py-3 px-4">Timestamp</th>
            <th className="py-3 px-4">Actor</th>
            <th className="py-3 px-4">Action</th>
            <th className="py-3 px-4">Target</th>
            <th className="py-3 px-4">Merkle Hash</th>
            <th className="py-3 px-4">Verification</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <AuditRow key={log.id} log={log} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditTable;