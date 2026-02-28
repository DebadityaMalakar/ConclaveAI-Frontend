'use client';

import React from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import TopContextBar from '@/components/dashboard/TopContextBar';
import { Bell, Search } from 'lucide-react';

export interface DashboardLayoutProps {
  children: React.ReactNode;
  userName?: string;
  userRole?: string;
  userStatus?: 'online' | 'offline' | 'away' | 'busy';
  userAvatar?: string;
  onLogout?: () => void;
  onSettings?: () => void;
  contextLabel?: string;
  variant?: 'default' | 'minimal';
  showSearch?: boolean;
  showNotifications?: boolean;
  showThemeSwitcher?: boolean;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  userName,
  userRole,
  userStatus,
  userAvatar,
  onLogout,
  onSettings,
  contextLabel = "Case Dashboard",
  variant = 'default',
  showSearch = false,
  showNotifications = false,
  showThemeSwitcher = true,
}) => {
  // Additional right content for the top bar
  const rightContent = (
    <>
      {showSearch && (
        <button
          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>
      )}
      {showNotifications && (
        <button
          className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors relative"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      <Sidebar
        userName={userName}
        userRole={userRole}
        userStatus={userStatus}
        userAvatar={userAvatar}
        onLogout={onLogout}
        onSettings={onSettings}
      />
      
      <div className="transition-all duration-300 lg:ml-64">
        {/* Top Context Bar */}
        <TopContextBar 
          contextLabel={contextLabel}
          rightContent={rightContent}
          variant={variant}
          showThemeSwitcher={showThemeSwitcher}
        />
        
        {/* Main Content */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;