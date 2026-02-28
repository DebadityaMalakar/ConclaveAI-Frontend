'use client';

import React from 'react';
import NavItem from './NavItem';

export interface NavItemData {
  label: string;
  icon: React.ReactNode;
  href: string;
  active?: boolean;
}

export interface SidebarNavProps {
  items: NavItemData[];
  collapsed?: boolean;
  onItemClick?: () => void;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ 
  items, 
  collapsed = false,
  onItemClick 
}) => {
  return (
    <nav className={cn(
      "flex-1 overflow-y-auto py-4",
      collapsed ? "px-2" : "px-3"
    )}>
      <div className="space-y-1">
        {items.map((item) => (
          <NavItem
            key={item.href}
            icon={item.icon}
            label={collapsed ? '' : item.label}
            href={item.href}
            active={item.active}
            onClick={onItemClick}
          />
        ))}
      </div>
    </nav>
  );
};

// Helper function to conditionally apply classes
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export default SidebarNav;