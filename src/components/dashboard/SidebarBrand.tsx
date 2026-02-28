'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/util';

export interface SidebarBrandProps {
  title: string;
  icon?: React.ReactNode;
  collapsed?: boolean;
  onToggle?: () => void;
}

const SidebarBrand: React.FC<SidebarBrandProps> = ({ 
  title, 
  icon,
  collapsed = false,
  onToggle 
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-6 border-b border-border">
      <Link href="/dashboard" className="flex items-center gap-3 group">
        {/* Logo/Brand Icon */}
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 text-primary-foreground flex items-center justify-center font-bold text-lg shadow-md group-hover:shadow-lg transition-shadow">
          {icon || title.charAt(0)}
        </div>
        
        {/* Brand Title */}
        {!collapsed && (
          <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            {title}
          </span>
        )}
      </Link>

      {/* Toggle button for mobile/collapsed state */}
      {onToggle && (
        <button
          onClick={onToggle}
          className="lg:hidden p-2 rounded-lg hover:bg-card-hover text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Toggle sidebar"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SidebarBrand;