'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  FolderOpen,
  Activity,
  BookOpen,
  Eye,
  BarChart3,
  Settings,
  Users,
  FileText,
  Shield,
  Bell
} from 'lucide-react';

import SidebarBrand from './SidebarBrand';
import SidebarNav, { NavItemData } from './SidebarNav';
import SidebarUser from './SidebarUser';
import { cn } from '@/lib/util';

export interface SidebarProps {
  brandTitle?: string;
  userName?: string;
  userRole?: string;
  userStatus?: 'online' | 'offline' | 'away' | 'busy';
  userAvatar?: string;
  onLogout?: () => void;
  onSettings?: () => void;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  brandTitle = "NeuroTrace",
  userName = "John Doe",
  userRole = "Sr. Analyst",
  userStatus = "online",
  userAvatar,
  onLogout,
  onSettings,
  className
}) => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Navigation items with icons and active state detection
  const navItems: NavItemData[] = [
    { 
      label: "Case Files", 
      icon: <FolderOpen className="w-5 h-5" />, 
      href: "/dashboard/case-files",
      active: pathname?.startsWith('/dashboard/case-files')
    },
    { 
      label: "Live Monitor", 
      icon: <Activity className="w-5 h-5" />, 
      href: "/dashboard/live-monitor",
      active: pathname?.startsWith('/dashboard/live-monitor')
    },
    { 
      label: "Audit Ledger", 
      icon: <BookOpen className="w-5 h-5" />, 
      href: "/dashboard/audit-ledger",
      active: pathname?.startsWith('/dashboard/audit-ledger')
    },
    { 
      label: "Oversight", 
      icon: <Eye className="w-5 h-5" />, 
      href: "/dashboard/oversight",
      active: pathname?.startsWith('/dashboard/oversight')
    },
    { 
      label: "Reports", 
      icon: <BarChart3 className="w-5 h-5" />, 
      href: "/dashboard/reports",
      active: pathname?.startsWith('/dashboard/reports')
    },
    { 
      label: "System", 
      icon: <Settings className="w-5 h-5" />, 
      href: "/dashboard/system",
      active: pathname?.startsWith('/dashboard/system')
    }
  ];

  // Additional navigation items (optional secondary section)
  const secondaryNavItems: NavItemData[] = [
    { 
      label: "Team", 
      icon: <Users className="w-5 h-5" />, 
      href: "/dashboard/team",
      active: pathname?.startsWith('/dashboard/team')
    },
    { 
      label: "Documents", 
      icon: <FileText className="w-5 h-5" />, 
      href: "/dashboard/documents",
      active: pathname?.startsWith('/dashboard/documents')
    },
    { 
      label: "Compliance", 
      icon: <Shield className="w-5 h-5" />, 
      href: "/dashboard/compliance",
      active: pathname?.startsWith('/dashboard/compliance')
    },
    { 
      label: "Notifications", 
      icon: <Bell className="w-5 h-5" />, 
      href: "/dashboard/notifications",
      active: pathname?.startsWith('/dashboard/notifications')
    }
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full bg-card border-r border-border transition-all duration-300',
          'flex flex-col',
          collapsed ? 'w-20' : 'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          className
        )}
      >
        {/* Brand Header */}
        <SidebarBrand
          title={brandTitle}
          collapsed={collapsed}
          onToggle={() => setMobileOpen(!mobileOpen)}
        />

        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-border">
          <SidebarNav 
            items={navItems} 
            collapsed={collapsed}
            onItemClick={() => setMobileOpen(false)}
          />
          
          {/* Divider for secondary navigation */}
          {!collapsed && (
            <div className="px-4 py-2">
              <div className="h-px bg-border" />
            </div>
          )}
          
          {/* Secondary Navigation */}
          <SidebarNav 
            items={secondaryNavItems} 
            collapsed={collapsed}
            onItemClick={() => setMobileOpen(false)}
          />
        </div>

        {/* User Profile Footer */}
        <SidebarUser
          name={userName}
          role={userRole}
          status={userStatus}
          avatar={userAvatar}
          collapsed={collapsed}
          onLogout={onLogout}
          onSettings={onSettings}
        />

        {/* Collapse Toggle (Desktop) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-card border border-border rounded-full items-center justify-center hover:bg-card-hover transition-colors"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg
            className={cn(
              'w-4 h-4 text-muted-foreground transition-transform',
              collapsed && 'rotate-180'
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </aside>

      {/* Main content offset */}
      <div className={cn(
        'transition-all duration-300',
        collapsed ? 'lg:ml-20' : 'lg:ml-64'
      )} />
    </>
  );
};

export default Sidebar;