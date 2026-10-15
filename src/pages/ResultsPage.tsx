import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import confetti from 'canvas-confetti';
import { Star, Sparkles, ArrowRight } from 'lucide-react';
import { LocalStorageAdapter } from '../services/storageAdapter';
import { curriculumService } from '../services/curriculumService';

export const ResultsPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const preferences = LocalStorageAdapter.getPreferences();
  const attempts = LocalStorageAdapter.getQuizAttempts();
  const latestAttempt = attempts.find(a => a.lesson_id === lessonId) || attempts[0];
  const accuracy = latestAttempt ? latestAttempt.score : 100;
  const stars = accuracy >= 90 ? 3 : accuracy >= 70 ? 2 : 1;

  useEffect(() => {
    // Only launch celebration if reduced motion is disabled
    if (!preferences.reduced_motion) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#0F4C5C', '#E8B84B', '#4A7C59', '#7B2D26'],
      });
    }
  }, [preferences.reduced_motion]);

  const handleNextLesson = async () => {
    const levels = await curriculumService.getLevels();
    const activeLevel = levels.find(l => !l.is_completed && l.is_unlocked) || levels[0];
    const lessons = await curriculumService.getLessonsByLevel(activeLevel.level_number);
    const next = lessons.find(l => !l.is_completed);

    if (next) {
      navigate(`/lesson/${next.id}`);
    } else {
      navigate('/learn');
    }
  };

  return (
    <div className="min-h-screen bg-paper bg-kolam-subtle flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-paper rounded-3xl border-4 border-sand shadow-card-elevated p-6 sm:p-8 space-y-6 text-center animate-pop">
        {/* Celebration Stars */}
        <div className="flex justify-center items-center gap-2">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                idx < stars
                  ? 'bg-gold text-ink shadow-glow-gold scale-105'
                  : 'bg-sand/60 text-ink-muted'
              }`}
            >
              <Star size={28} fill={idx < stars ? 'currentColor' : 'none'} />
            </div>
          ))}
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h1 className="font-heading font-extrabold text-3xl text-ink">
            {accuracy === 100 ? t('results.perfect') : t('results.title')}
          </h1>
          <p className="text-xs text-ink-muted">
            {t('results.wellDone')}
          </p>
        </div>

        {/* Accuracy and XP Pill */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 bg-paper-dark rounded-2xl border border-sand">
            <span className="text-[10px] font-bold text-ink-muted uppercase">
              {t('results.accuracy')}
            </span>
            <div className="text-2xl font-extrabold text-teal mt-0.5">
              {accuracy}%
            </div>
          </div>

          <div className="p-4 bg-gold-surface rounded-2xl border border-gold/40">
            <span className="text-[10px] font-bold text-gold-dark uppercase">
              XP Earned
            </span>
            <div className="text-2xl font-extrabold text-ink mt-0.5 flex items-center justify-center gap-1">
              <Sparkles size={20} className="text-gold" />
              <span>+25 XP</span>
            </div>
          </div>
        </div>

        {/* Remediation & Revision Queue Preview */}
        <div 
          onClick={() => navigate('/revision')}
          className="bg-paper-dark rounded-2xl p-4 border border-sand hover:border-teal/40 transition-colors text-left space-y-2 cursor-pointer group"
          title="Click to practice revision cards now"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-ink group-hover:text-teal transition-colors">
              {t('results.remediationTitle')}
            </span>
            <span className="text-[10px] text-teal font-semibold flex items-center gap-1">
              <span>Added to Spaced Deck</span>
              <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
          <p className="text-[11px] text-ink-muted leading-relaxed">
            {t('results.remediationDesc')}
          </p>
          <div className="flex items-center gap-2 pt-1">
            <span className="px-3 py-1 rounded-xl bg-sand font-tamil font-bold text-sm text-ink">
              அம்மா (amma)
            </span>
            <span className="px-3 py-1 rounded-xl bg-sand font-tamil font-bold text-sm text-ink">
              பூனை (poonai)
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={handleNextLesson}
            className="w-full py-4 bg-teal hover:bg-teal-light text-white font-extrabold rounded-2xl text-sm shadow-md hover:shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2"
          >
            <span>{t('results.nextLesson')}</span>
            <ArrowRight size={18} />
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => navigate('/learn')}
              className="py-3 bg-sand hover:bg-sand-dark text-ink font-bold rounded-2xl text-xs transition-colors"
            >
              {t('results.backToMap')}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="py-3 bg-paper-dark hover:bg-sand border border-sand text-ink font-bold rounded-2xl text-xs transition-colors"
            >
              {t('common.home')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
