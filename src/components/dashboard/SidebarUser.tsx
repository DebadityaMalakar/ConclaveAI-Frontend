'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/util';
import { LogOut, Settings, User } from 'lucide-react';

export interface SidebarUserProps {
  name: string;
  role: string;
  status: 'online' | 'offline' | 'away' | 'busy';
  avatar?: string;
  collapsed?: boolean;
  onLogout?: () => void;
  onSettings?: () => void;
}

const SidebarUser: React.FC<SidebarUserProps> = ({ 
  name, 
  role, 
  status,
  avatar,
  collapsed = false,
  onLogout,
  onSettings
}) => {
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500'
  };

  return (
    <div className={cn(
      'border-t border-border p-4',
      collapsed ? 'space-y-3' : 'space-y-4'
    )}>
      {/* User Profile */}
      <div className="flex items-center gap-3">
        {/* Avatar with status indicator */}
        <div className="relative flex-shrink-0">
          {avatar ? (
            <Image
              src={avatar}
              alt={name}
              width={40}
              height={40}
              className="rounded-full ring-2 ring-primary/20"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground flex items-center justify-center font-semibold text-lg">
              {name.charAt(0)}
            </div>
          )}
          <span className={cn(
            'absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2 ring-card',
            statusColors[status]
          )} />
        </div>

        {/* User Info */}
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">{name}</p>
            <p className="text-xs text-muted-foreground truncate">{role}</p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {!collapsed ? (
        <div className="flex items-center gap-2">
          <button
            onClick={onSettings}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-lg bg-card-hover text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <button
            onClick={onLogout}
            className="flex items-center justify-center p-2 text-xs font-medium rounded-lg bg-card-hover text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <button
            onClick={onSettings}
            className="p-2 rounded-lg bg-card-hover text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-colors"
            title="Settings"
          >
            <Settings className="w-4 h-4 mx-auto" />
          </button>
          <button
            onClick={onLogout}
            className="p-2 rounded-lg bg-card-hover text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4 mx-auto" />
          </button>
        </div>
      )}

      {/* Status text for collapsed view */}
      {collapsed && (
        <div className="flex justify-center">
          <span className={cn(
            'w-2 h-2 rounded-full',
            statusColors[status]
          )} />
        </div>
      )}
    </div>
  );
};

export default SidebarUser;