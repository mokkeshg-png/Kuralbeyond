import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Award, 
  Flame, 
  TrendingUp, 
  Calendar,
  ArrowLeft,
  BookOpen
} from 'lucide-react';
import { AchievementBadge, DailyActivityLog, SkillType } from '../types';
import { progressService } from '../services/progressService';
import { masteryService } from '../services/masteryService';
import { ScriptPowerMeter } from '../components/common/ScriptPowerMeter';
import { LocalStorageAdapter } from '../services/storageAdapter';

export const ProgressPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isTa = i18n.language === 'ta';

  const [badges, setBadges] = useState<AchievementBadge[]>([]);
  const [activityLogs, setActivityLogs] = useState<DailyActivityLog[]>([]);
  const [skillMasteries, setSkillMasteries] = useState<Record<SkillType, number>>({
    letter_recognition: 0.85,
    word_reading: 0.70,
    sentence_comprehension: 0.60,
    listening: 0.80,
    speaking: 0.65,
  });
  const [badgeFilter, setBadgeFilter] = useState<'all' | 'earned' | 'locked'>('all');
  const [loading, setLoading] = useState(true);

  const stats = LocalStorageAdapter.getStats();

  useEffect(() => {
    async function loadProgressData() {
      const bList = await progressService.getBadges();
      setBadges(bList);

      const logs = await progressService.getActivityLogs();
      setActivityLogs(logs);

      const smMap = await masteryService.getMasteryBySkillType();
      setSkillMasteries(smMap);

      setLoading(false);
    }
    loadProgressData();
  }, []);

  const filteredBadges = badges.filter(b => {
    if (badgeFilter === 'earned') return b.is_earned;
    if (badgeFilter === 'locked') return !b.is_earned;
    return true;
  });

  const skillLabels: Record<SkillType, { en: string; ta: string }> = {
    letter_recognition: { en: 'Letter Recognition', ta: 'எழுத்து அறிதல்' },
    word_reading: { en: 'Word Reading', ta: 'சொல் வாசிப்பு' },
    sentence_comprehension: { en: 'Sentence Building', ta: 'வாக்கிய உருவாக்கம்' },
    listening: { en: 'Listening Comprehension', ta: 'கேட்டல் திறன்' },
    speaking: { en: 'Pronunciation / Speaking', ta: 'பேச்சு உச்சரிப்பு' },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center p-4">
        <div className="w-10 h-10 border-4 border-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper bg-kolam-subtle pb-28 md:pb-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
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
            <BookOpen size={16} />
            <span>{t('learn.title')}</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-teal bg-teal-surface px-3 py-1 rounded-full">
            {t('common.progress')}
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-ink">
            {t('progress.title')}
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted">
            {t('progress.subtitle')}
          </p>
        </div>

        {/* Script Power Gauge */}
        <div className="max-w-2xl mx-auto">
          <ScriptPowerMeter
            stage={stats.script_power_stage}
            percentage={stats.script_power_percentage}
          />
        </div>

        {/* 5-Skill Competencies Bar Charts */}
        <div className="bg-paper rounded-3xl border-2 border-sand p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-xl text-ink flex items-center gap-2">
              <TrendingUp size={20} className="text-teal" />
              <span>{t('progress.skillRadarTitle')}</span>
            </h2>
            <span className="text-xs font-semibold text-ink-muted">
              Recency-Weighted Mastery
            </span>
          </div>

          <div className="space-y-4">
            {(Object.keys(skillMasteries) as SkillType[]).map(skill => {
              const score = skillMasteries[skill];
              const pct = Math.round(score * 100);

              return (
                <div key={skill} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
                    <span className="text-ink">
                      {isTa ? skillLabels[skill].ta : skillLabels[skill].en}
                    </span>
                    <span className="text-teal font-extrabold">{pct}%</span>
                  </div>

                  <div className="h-3 w-full bg-sand/60 rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-teal rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Streak Activity Calendar */}
        <div className="bg-paper rounded-3xl border-2 border-sand p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-xl text-ink flex items-center gap-2">
              <Calendar size={20} className="text-maroon" />
              <span>{t('progress.streakCalendarTitle')}</span>
            </h2>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-maroon bg-sand px-3 py-1 rounded-full">
              <Flame size={16} fill="currentColor" />
              {stats.streak_days} Days Active
            </span>
          </div>

          {/* 7-Day Dots Grid */}
          <div className="grid grid-cols-7 gap-2 pt-2 text-center">
            {activityLogs.slice(-7).map((log, idx) => (
              <div
                key={log.date}
                className="p-3 rounded-2xl bg-paper-dark border border-sand flex flex-col items-center justify-center space-y-1"
              >
                <span className="text-[10px] text-ink-muted uppercase font-bold">
                  Day {idx + 1}
                </span>
                <div className="w-8 h-8 rounded-full bg-gold/20 text-maroon flex items-center justify-center">
                  <Flame size={18} fill="currentColor" />
                </div>
                <span className="text-[10px] font-bold text-ink">
                  {log.lessons_completed} {t('common.lesson')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Badge Trophy Collection */}
        <div className="bg-paper rounded-3xl border-2 border-sand p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="font-heading font-bold text-xl text-ink flex items-center gap-2">
              <Award size={20} className="text-gold" />
              <span>{t('progress.badgesTitle')}</span>
            </h2>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 bg-paper-dark p-1 rounded-2xl border border-sand">
              <button
                type="button"
                onClick={() => setBadgeFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  badgeFilter === 'all' ? 'bg-teal text-white shadow-sm' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {t('common.all')}
              </button>
              <button
                type="button"
                onClick={() => setBadgeFilter('earned')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  badgeFilter === 'earned' ? 'bg-teal text-white shadow-sm' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {t('common.completed')}
              </button>
              <button
                type="button"
                onClick={() => setBadgeFilter('locked')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  badgeFilter === 'locked' ? 'bg-teal text-white shadow-sm' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {t('common.locked')}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredBadges.map(badge => (
              <div
                key={badge.id}
                className={`p-5 rounded-3xl border-2 transition-all flex items-start gap-4 ${
                  badge.is_earned
                    ? 'bg-paper-dark border-gold/40 shadow-sm'
                    : 'bg-sand/30 border-dashed border-sand opacity-60'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-2xl flex-shrink-0 ${
                  badge.is_earned ? 'bg-gold text-ink shadow-sm' : 'bg-sand text-ink-muted'
                }`}>
                  {badge.is_earned ? '🏆' : '🔒'}
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-ink leading-tight">
                    {isTa ? badge.name_ta : badge.name_en}
                  </h4>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {isTa ? badge.description_ta : badge.description_en}
                  </p>
                  {badge.is_earned && badge.earned_at && (
                    <span className="text-[10px] text-teal font-semibold block pt-1">
                      {t('progress.earnedOn', { date: badge.earned_at })}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
