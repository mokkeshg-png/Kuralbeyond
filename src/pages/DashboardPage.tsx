import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Play, 
  BookOpen, 
  ArrowRight, 
  CheckCircle2, 
  RotateCw, 
  Award 
} from 'lucide-react';
import { UserProfile, UserStats, LearningLevel, Lesson, AchievementBadge } from '../types';
import { authService } from '../services/authService';
import { progressService } from '../services/progressService';
import { curriculumService } from '../services/curriculumService';
import { DailyGoalRing } from '../components/common/DailyGoalRing';
import { ScriptPowerMeter } from '../components/common/ScriptPowerMeter';
import { KiliParrot } from '../components/mascot/KiliParrot';

export const DashboardPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isTa = i18n.language === 'ta';

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [currentLevel, setCurrentLevel] = useState<LearningLevel | null>(null);
  const [nextLesson, setNextLesson] = useState<Lesson | null>(null);
  const [badges, setBadges] = useState<AchievementBadge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      const user = await authService.getCurrentUser();
      if (!user) {
        navigate('/auth');
        return;
      }
      setProfile(user);

      const userStats = await progressService.getStats();
      setStats(userStats);

      const levels = await curriculumService.getLevels();
      const activeLvl = levels.find(l => !l.is_completed && l.is_unlocked) || levels[0];
      setCurrentLevel(activeLvl);

      const lessons = await curriculumService.getLessonsByLevel(activeLvl.level_number);
      const uncompleted = lessons.find(l => !l.is_completed) || lessons[0];
      setNextLesson(uncompleted);

      const allBadges = await progressService.getBadges();
      setBadges(allBadges);

      setLoading(false);
    }
    loadDashboardData();
  }, [navigate]);

  const handleStartLesson = () => {
    if (nextLesson) {
      navigate(`/lesson/${nextLesson.id}`);
    } else {
      navigate('/learn');
    }
  };

  if (loading || !profile || !stats || !currentLevel) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center p-4">
        <div className="w-10 h-10 border-4 border-teal border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const isScholars = profile.age_mode === 'scholars';

  return (
    <div className="min-h-screen bg-paper bg-kolam-subtle pb-24 md:pb-12">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Top Greeting & Companion Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-paper rounded-3xl border-2 border-sand p-6 shadow-sm">
          <div className="space-y-1">
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-ink">
              {t('dashboard.greeting', { name: profile.display_name })}
            </h1>
            <p className="text-sm text-ink-muted">
              {t('dashboard.subgreeting')}
            </p>
          </div>

          {/* Kili Mascot greeting (hidden for Scholars mode) */}
          {!isScholars && (
            <KiliParrot
              mood="talking"
              speechText="Ready to learn with joy today?"
              speechTextTa="இன்று மகிழ்வோடு கற்கத் தயாரா?"
              size="sm"
            />
          )}
        </div>

        {/* Hero "Continue Learning" & Daily Goal Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Action Card (2 cols) */}
          <div className="md:col-span-2 bg-paper rounded-3xl border-4 border-sand shadow-card-elevated p-6 sm:p-8 flex flex-col justify-between space-y-6 relative overflow-hidden bg-palm-subtle">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-teal bg-teal-surface px-3 py-1 rounded-full">
                {t('dashboard.continueLearning')}
              </span>
              <span className="text-xs font-bold text-ink-muted flex items-center gap-1">
                <BookOpen size={14} />
                Level {currentLevel.level_number}: {isTa ? currentLevel.title_ta : currentLevel.title_en}
              </span>
            </div>

            <div className="space-y-2 max-w-full">
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-ink break-words">
                {nextLesson ? (isTa ? nextLesson.title_ta : nextLesson.title_en) : 'All Caught Up!'}
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted line-clamp-2 break-words">
                {nextLesson?.description_en}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                type="button"
                onClick={handleStartLesson}
                className="py-4 px-8 bg-teal hover:bg-teal-light text-white font-extrabold rounded-2xl text-base shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 group"
              >
                <Play size={20} fill="currentColor" />
                <span>{t('learn.startLesson')}</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <Link
                to="/learn"
                className="py-3.5 px-5 bg-paper-dark hover:bg-sand border-2 border-sand text-ink font-bold rounded-2xl text-xs sm:text-sm transition-all text-center"
              >
                {t('learn.title')}
              </Link>
            </div>
          </div>

          {/* Daily Goal & Streak Card (1 col) */}
          <div 
            onClick={() => navigate('/learn')}
            className="bg-paper rounded-3xl border-2 border-sand hover:border-teal shadow-sm hover:shadow-md transition-all p-6 flex flex-col items-center justify-center text-center space-y-4 cursor-pointer group"
            title="Click to view lessons and complete daily goal!"
          >
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-ink group-hover:text-teal transition-colors">
                {t('dashboard.dailyGoalTitle')}
              </h3>
              <p className="text-xs text-ink-muted">
                {t('dashboard.dailyGoalProgress', {
                  completed: stats.daily_goal_progress,
                  target: stats.daily_goal_target,
                })}
              </p>
            </div>

            <DailyGoalRing
              completed={stats.daily_goal_progress}
              target={stats.daily_goal_target}
              size={96}
              strokeWidth={8}
            />

            {stats.daily_goal_progress >= stats.daily_goal_target ? (
              <span className="text-xs font-bold text-leaf bg-leaf-surface px-3 py-1 rounded-full flex items-center gap-1">
                <CheckCircle2 size={14} />
                {t('dashboard.dailyGoalComplete')}
              </span>
            ) : (
              <span className="text-xs font-medium text-ink-muted group-hover:text-teal transition-colors">
                Tap to complete today's lesson →
              </span>
            )}
          </div>
        </div>

        {/* Script Power & Quick Action Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Script Power Card */}
          <div 
            onClick={() => navigate('/progress')}
            className="md:col-span-2 cursor-pointer hover:scale-[1.01] transition-transform"
            title="Click to view detailed Script Power progress"
          >
            <ScriptPowerMeter
              stage={stats.script_power_stage}
              percentage={stats.script_power_percentage}
            />
          </div>

          {/* Review items due */}
          <Link
            to="/revision"
            className="bg-paper-dark rounded-2xl border-2 border-sand p-4 flex items-center justify-between hover:border-teal/40 transition-colors shadow-sm group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-surface text-teal flex items-center justify-center group-hover:scale-105 transition-transform">
                <RotateCw size={18} />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-xs sm:text-sm text-ink">
                  {t('dashboard.practiceRevision', { count: 3 })}
                </h4>
                <p className="text-[11px] text-ink-muted">
                  Spaced Repetition Deck
                </p>
              </div>
            </div>
            <ArrowRight size={16} className="text-ink-muted group-hover:text-teal group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Real-Life Mission Banner */}
        <div className="bg-gold-surface border-2 border-gold/40 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-maroon bg-white px-2.5 py-0.5 rounded-full">
              {t('dashboard.realLifeMission')}
            </span>
            <h3 className="font-bold text-base sm:text-lg text-ink">
              Say "வணக்கம்" (vanakkam) to a family member today!
            </h3>
            <p className="text-xs text-ink-muted">
              Greet your parents or grandparents with hands together and earn +25 bonus XP.
            </p>
          </div>
          <Link
            to="/missions"
            className="px-5 py-2.5 bg-ink text-paper rounded-2xl font-bold text-xs hover:bg-ink-muted transition-colors flex-shrink-0"
          >
            {t('common.missions')}
          </Link>
        </div>

        {/* Recent Achievements Showcase */}
        <div className="bg-paper rounded-3xl border-2 border-sand p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-ink flex items-center gap-2">
              <Award size={18} className="text-gold" />
              <span>{t('dashboard.recentBadges')}</span>
            </h3>
            <Link to="/progress" className="text-xs font-bold text-teal hover:underline">
              {t('dashboard.viewAllBadges')}
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {badges.slice(0, 4).map(b => (
              <div
                key={b.id}
                onClick={() => navigate('/progress')}
                className={`p-3.5 rounded-2xl border text-center space-y-1.5 transition-all cursor-pointer hover:scale-105 ${
                  b.is_earned
                    ? 'bg-paper-dark border-gold/30 shadow-sm hover:border-gold'
                    : 'bg-sand/30 border-dashed border-sand text-ink-muted opacity-60 hover:opacity-100'
                }`}
                title="Click to view all achievements in Progress"
              >
                <div className={`w-10 h-10 rounded-xl mx-auto flex items-center justify-center font-bold text-lg ${
                  b.is_earned ? 'bg-gold text-ink shadow-sm' : 'bg-sand text-ink-muted'
                }`}>
                  {b.is_earned ? '🏆' : '🔒'}
                </div>
                <h4 className="font-bold text-xs text-ink truncate">
                  {isTa ? b.name_ta : b.name_en}
                </h4>
                <p className="text-[10px] text-ink-muted line-clamp-1">
                  {b.description_en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
