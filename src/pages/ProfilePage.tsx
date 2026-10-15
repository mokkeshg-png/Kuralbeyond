import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Globe, 
  Check,
  Shield,
  ArrowLeft
} from 'lucide-react';
import { UserProfile, UserPreferences, AgeMode } from '../types';
import { authService } from '../services/authService';
import { LocalStorageAdapter } from '../services/storageAdapter';

export const ProfilePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<UserProfile>(LocalStorageAdapter.getProfile());
  const [preferences, setPreferences] = useState<UserPreferences>(LocalStorageAdapter.getPreferences());
  const [showResetModal, setShowResetModal] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-age-mode', profile.age_mode);
  }, [profile.age_mode]);

  const handleAgeModeChange = async (mode: AgeMode) => {
    const updated = await authService.updateProfile({ age_mode: mode });
    setProfile(updated);
    document.documentElement.setAttribute('data-age-mode', mode);
  };

  const handleLanguageChange = (lang: 'en' | 'ta') => {
    i18n.changeLanguage(lang);
    localStorage.setItem('kuralbeyond_language', lang);
    authService.updateProfile({ interface_language: lang });
    setProfile(prev => ({ ...prev, interface_language: lang }));
  };

  const handleSpeedChange = (speed: number) => {
    const updated = { ...preferences, audio_speed: speed };
    setPreferences(updated);
    LocalStorageAdapter.setPreferences(updated);
  };

  const handleReduceMotionToggle = () => {
    const updated = { ...preferences, reduced_motion: !preferences.reduced_motion };
    setPreferences(updated);
    LocalStorageAdapter.setPreferences(updated);
    if (updated.reduced_motion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  };

  const handleResetData = () => {
    LocalStorageAdapter.resetAll();
    setShowResetModal(false);
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-paper bg-kolam-subtle pb-28 md:pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-paper border border-sand hover:border-teal text-ink font-bold text-xs shadow-sm transition-all active:scale-95"
          >
            <ArrowLeft size={16} />
            <span>{t('common.home')}</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/learn')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-teal-surface border border-teal/20 hover:bg-teal hover:text-white text-teal font-bold text-xs shadow-sm transition-all active:scale-95"
          >
            <span>{t('learn.title')}</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-teal bg-teal-surface px-3 py-1 rounded-full">
            {t('common.profile')}
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-ink">
            {t('settings.title')}
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted">
            {t('settings.subtitle')}
          </p>
        </div>

        {/* Profile Identity Card */}
        <div className="bg-paper rounded-3xl border-2 border-sand p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-teal text-white flex items-center justify-center font-tamil font-extrabold text-3xl shadow-md">
              அ
            </div>
            <div className="space-y-0.5 text-center sm:text-left">
              <h2 className="font-heading font-extrabold text-xl text-ink">
                {profile.display_name}
              </h2>
              <p className="text-xs text-ink-muted">
                {profile.email} • Standard {profile.grade}
              </p>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-sand text-ink text-[11px] font-bold mt-1 uppercase tracking-wider">
                {profile.age_mode} Mode
              </span>
            </div>
          </div>

          <Link
            to="/parent"
            className="px-5 py-2.5 rounded-2xl bg-teal-surface border-2 border-teal/20 hover:bg-teal hover:text-white text-teal font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <Shield size={16} />
            <span>{t('common.parentZone')}</span>
          </Link>
        </div>

        {/* Settings Sections */}
        <div className="bg-paper rounded-3xl border-2 border-sand p-6 sm:p-8 space-y-6 shadow-sm">
          {/* 1. Interface Language */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-ink">
              {t('settings.interfaceLanguage')}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleLanguageChange('en')}
                className={`py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm transition-all border-2 flex items-center justify-center gap-2 ${
                  i18n.language === 'en'
                    ? 'bg-teal text-white border-teal shadow-sm'
                    : 'bg-paper-dark border-sand text-ink hover:border-sand-dark'
                }`}
              >
                <Globe size={16} />
                <span>English</span>
                {i18n.language === 'en' && <Check size={14} />}
              </button>

              <button
                type="button"
                onClick={() => handleLanguageChange('ta')}
                className={`py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm transition-all border-2 flex items-center justify-center gap-2 ${
                  i18n.language === 'ta'
                    ? 'bg-teal text-white border-teal shadow-sm'
                    : 'bg-paper-dark border-sand text-ink hover:border-sand-dark'
                }`}
              >
                <Globe size={16} />
                <span>தமிழ் (Tamil)</span>
                {i18n.language === 'ta' && <Check size={14} />}
              </button>
            </div>
          </div>

          {/* 2. Age Experience Mode */}
          <div className="space-y-2 pt-2 border-t border-sand">
            <label className="block text-xs font-bold text-ink">
              {t('settings.ageMode')}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'sprouts', title: 'Sprouts (Std 1–3)', desc: 'Giant targets, spoken voice' },
                { id: 'explorers', title: 'Explorers (Std 4–6)', desc: 'Full activities, Kili mascot' },
                { id: 'scholars', title: 'Scholars (Std 7–12)', desc: 'Clean, dense, mascot-free' },
              ].map(mode => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => handleAgeModeChange(mode.id as AgeMode)}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all ${
                    profile.age_mode === mode.id
                      ? 'border-teal bg-teal-surface/60 shadow-sm ring-2 ring-teal/20'
                      : 'border-sand bg-paper-dark hover:border-sand-dark'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-ink">{mode.title}</span>
                    {profile.age_mode === mode.id && <Check size={14} className="text-teal" />}
                  </div>
                  <span className="text-[11px] text-ink-muted block mt-1 leading-tight">{mode.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Audio Playback Speed */}
          <div className="space-y-2 pt-2 border-t border-sand">
            <label className="block text-xs font-bold text-ink">
              {t('settings.audioSpeed')}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { speed: 0.5, label: t('settings.speedSlow') },
                { speed: 0.75, label: t('settings.speedMedium') },
                { speed: 1.0, label: t('settings.speedNormal') },
              ].map(s => (
                <button
                  key={s.speed}
                  type="button"
                  onClick={() => handleSpeedChange(s.speed)}
                  className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition-all border-2 text-center ${
                    preferences.audio_speed === s.speed
                      ? 'bg-teal text-white border-teal shadow-sm'
                      : 'bg-paper-dark border-sand text-ink hover:border-sand-dark'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Accessibility Toggles */}
          <div className="space-y-3 pt-2 border-t border-sand">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-paper-dark border border-sand">
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-ink">{t('settings.reduceMotion')}</h4>
                <p className="text-[11px] text-ink-muted">Disable 3D card flips, celebratory particles, and spring transitions</p>
              </div>
              <input
                type="checkbox"
                checked={preferences.reduced_motion}
                onChange={handleReduceMotionToggle}
                className="w-5 h-5 rounded text-teal focus:ring-teal cursor-pointer"
              />
            </div>
          </div>

          {/* Reset Learning Data */}
          <div className="pt-4 border-t border-sand flex justify-between items-center">
            <div>
              <h4 className="font-bold text-xs text-maroon">{t('settings.resetData')}</h4>
              <p className="text-[11px] text-ink-muted">Clear all streaks, badges, and cached lessons</p>
            </div>
            <button
              type="button"
              onClick={() => setShowResetModal(true)}
              className="px-4 py-2 rounded-2xl bg-maroon/10 hover:bg-maroon hover:text-white text-maroon font-bold text-xs transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-paper rounded-3xl max-w-sm w-full p-6 border-4 border-maroon shadow-2xl text-center space-y-4 animate-pop">
            <h3 className="font-heading font-bold text-lg text-ink">
              {t('settings.resetData')}
            </h3>
            <p className="text-xs text-ink-muted">
              {t('settings.resetWarning')}
            </p>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="flex-1 py-2.5 rounded-2xl bg-sand font-bold text-xs text-ink"
              >
                {t('common.cancel')}
              </button>
              <button
                type="button"
                onClick={handleResetData}
                className="flex-1 py-2.5 rounded-2xl bg-maroon text-white font-extrabold text-xs shadow-md"
              >
                {t('common.confirm')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
