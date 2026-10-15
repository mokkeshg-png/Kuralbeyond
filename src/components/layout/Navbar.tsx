import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Flame, Sparkles, User, Globe, Shield } from 'lucide-react';
import { UserProfile, UserStats } from '../../types';

interface NavbarProps {
  profile: UserProfile | null;
  stats: UserStats | null;
}

export const Navbar: React.FC<NavbarProps> = ({ profile, stats }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'ta' : 'en';
    i18n.changeLanguage(nextLang);
    localStorage.setItem('tamilpalam_language', nextLang);
  };

  const isLessonActive = location.pathname.startsWith('/lesson/');

  // Don't show standard navbar inside full-screen lesson player (which has its own focused header)
  if (isLessonActive) return null;

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-md border-b border-sand px-4 sm:px-6 lg:px-8 py-3.5 transition-colors">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <Link 
          to={profile ? "/dashboard" : "/"} 
          className="flex items-center gap-2.5 group"
          aria-label="TamilPalam Home"
        >
          <div className="w-10 h-10 rounded-2xl bg-teal flex items-center justify-center text-paper font-bold text-2xl font-tamil shadow-md group-hover:scale-105 transition-transform">
            அ
          </div>
          <div>
            <span className="font-heading font-bold text-xl sm:text-2xl text-teal tracking-tight block leading-tight">
              தமிழ் பாலம்
            </span>
            <span className="text-[10px] font-semibold text-ink-muted uppercase tracking-wider block">
              TamilPalam
            </span>
          </div>
        </Link>

        {/* Desktop Quick Links */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/dashboard"
            className={`font-bold text-sm transition-colors hover:text-teal ${
              location.pathname === '/dashboard' ? 'text-teal border-b-2 border-teal pb-1' : 'text-ink-muted'
            }`}
          >
            {t('common.home')}
          </Link>
          <Link
            to="/learn"
            className={`font-bold text-sm transition-colors hover:text-teal ${
              location.pathname === '/learn' ? 'text-teal border-b-2 border-teal pb-1' : 'text-ink-muted'
            }`}
          >
            {t('common.learn')}
          </Link>
          <Link
            to="/revision"
            className={`font-bold text-sm transition-colors hover:text-teal ${
              location.pathname === '/revision' ? 'text-teal border-b-2 border-teal pb-1' : 'text-ink-muted'
            }`}
          >
            {t('common.revision')}
          </Link>
          <Link
            to="/missions"
            className={`font-bold text-sm transition-colors hover:text-teal ${
              location.pathname === '/missions' ? 'text-teal border-b-2 border-teal pb-1' : 'text-ink-muted'
            }`}
          >
            {t('common.missions')}
          </Link>
          <Link
            to="/progress"
            className={`font-bold text-sm transition-colors hover:text-teal ${
              location.pathname === '/progress' ? 'text-teal border-b-2 border-teal pb-1' : 'text-ink-muted'
            }`}
          >
            {t('common.progress')}
          </Link>
          <Link
            to="/parent"
            className={`font-bold text-sm transition-colors hover:text-teal flex items-center gap-1 ${
              location.pathname === '/parent' ? 'text-teal border-b-2 border-teal pb-1' : 'text-ink-muted'
            }`}
          >
            <Shield size={14} />
            <span>{t('common.parentZone')}</span>
          </Link>
        </nav>

        {/* Right Status / Toggles */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak Counter */}
          {stats && (
            <div 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sand text-ink text-xs sm:text-sm font-bold shadow-sm"
              title={`${stats.streak_days} Day Streak`}
            >
              <Flame size={18} className="text-maroon fill-maroon animate-pulse" />
              <span>{stats.streak_days}</span>
              {stats.streak_freeze_active && (
                <span className="text-[10px] bg-sky text-teal-dark px-1.5 py-0.2 rounded-md ml-0.5">
                  🛡️
                </span>
              )}
            </div>
          )}

          {/* XP Pill */}
          {stats && (
            <div 
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold-surface border border-gold/40 text-ink text-xs sm:text-sm font-bold shadow-sm"
              title={`${stats.xp} Total XP`}
            >
              <Sparkles size={16} className="text-gold fill-gold" />
              <span>{stats.xp}</span>
            </div>
          )}

          {/* Language Toggle (EN / தமிழ்) */}
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label="Toggle language between English and Tamil"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-2xl bg-paper-dark border-2 border-teal/20 text-xs sm:text-sm font-bold text-teal hover:border-teal/50 hover:bg-teal-surface active:scale-95 transition-all shadow-sm"
          >
            <Globe size={16} />
            <span>{i18n.language === 'en' ? 'தமிழ்' : 'EN'}</span>
          </button>

          {/* Profile / Settings Button */}
          {profile ? (
            <button
              type="button"
              onClick={() => navigate('/profile')}
              aria-label="Profile and Settings"
              className="w-10 h-10 rounded-2xl bg-sand hover:bg-sand-dark text-ink flex items-center justify-center transition-colors active:scale-95 shadow-sm"
            >
              <User size={20} />
            </button>
          ) : (
            <Link
              to="/auth"
              className="px-4 py-2 rounded-2xl bg-teal text-white font-bold text-xs sm:text-sm hover:bg-teal-light transition-all shadow-md active:scale-95"
            >
              {t('auth.signInAction')}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
