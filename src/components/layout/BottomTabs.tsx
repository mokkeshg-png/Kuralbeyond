import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, BookOpen, RotateCw, BarChart3, User } from 'lucide-react';

export const BottomTabs: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();

  // Hide in lesson player
  if (location.pathname.startsWith('/lesson/')) {
    return null;
  }

  const tabs = [
    { to: '/dashboard', label: t('common.home'), icon: Home },
    { to: '/learn', label: t('common.learn'), icon: BookOpen },
    { to: '/revision', label: t('common.revision'), icon: RotateCw },
    { to: '/progress', label: t('common.progress'), icon: BarChart3 },
    { to: '/profile', label: t('common.profile'), icon: User },
  ];

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-paper/95 backdrop-blur-md border-t-2 border-sand px-2 py-1.5 shadow-lg safe-area-pb"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.to;

          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={`flex flex-col items-center justify-center flex-1 py-1.5 px-2 rounded-2xl transition-all min-h-[56px] ${
                isActive
                  ? 'text-teal font-extrabold bg-teal-surface/60'
                  : 'text-ink-muted hover:text-ink font-semibold'
              }`}
            >
              <Icon size={24} className={isActive ? 'stroke-[2.5]' : 'stroke-2'} />
              <span className="text-[11px] mt-0.5 tracking-tight truncate max-w-[70px]">
                {tab.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
