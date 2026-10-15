import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ShieldCheck, 
  Download, 
  Clock, 
  Award, 
  Flame, 
  TrendingUp, 
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import { ParentSummary, SkillType } from '../types';
import { parentService } from '../services/parentService';

export const ParentDashboardPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isTa = i18n.language === 'ta';

  const [summary, setSummary] = useState<ParentSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSummary() {
      const data = await parentService.getParentSummary();
      setSummary(data);
      setLoading(false);
    }
    loadSummary();
  }, []);

  const handleExportData = async () => {
    const jsonStr = await parentService.exportProgressJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tamilpalam_progress_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const skillLabels: Record<SkillType, { en: string; ta: string }> = {
    letter_recognition: { en: 'Letter Phonics & Tracing', ta: 'எழுத்து அறிதல்' },
    word_reading: { en: 'Everyday Word Reading', ta: 'சொல் வாசிப்பு' },
    sentence_comprehension: { en: 'Sentence Building', ta: 'வாக்கிய உருவாக்கம்' },
    listening: { en: 'Listening Comprehension', ta: 'கேட்டல் திறன்' },
    speaking: { en: 'Oral Pronunciation', ta: 'பேச்சு உச்சரிப்பு' },
  };

  if (loading || !summary) {
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
            <span>{t('learn.title')}</span>
          </button>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand pb-6">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-surface text-teal font-bold text-xs uppercase tracking-wider">
              <ShieldCheck size={14} className="text-leaf" />
              <span>{t('parent.title')}</span>
            </span>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-ink">
              {summary.child_name}'s Learning Journey
            </h1>
            <p className="text-xs text-ink-muted">
              {t('parent.subtitle')}
            </p>
          </div>

          <button
            type="button"
            onClick={handleExportData}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-teal hover:bg-teal-light text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 flex-shrink-0"
          >
            <Download size={18} />
            <span>{t('parent.exportDataAction')}</span>
          </button>
        </div>

        {/* 4 Metrics Summary Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-paper rounded-3xl border-2 border-sand p-5 space-y-1 shadow-sm">
            <span className="text-[10px] font-bold text-ink-muted uppercase">
              {t('parent.totalMinutes')}
            </span>
            <div className="flex items-center gap-2 text-2xl font-extrabold text-teal">
              <Clock size={20} className="text-teal" />
              <span>{summary.total_minutes_week}m</span>
            </div>
          </div>

          <div className="bg-paper rounded-3xl border-2 border-sand p-5 space-y-1 shadow-sm">
            <span className="text-[10px] font-bold text-ink-muted uppercase">
              {t('parent.lessonsPassed')}
            </span>
            <div className="flex items-center gap-2 text-2xl font-extrabold text-leaf">
              <CheckCircle2 size={20} className="text-leaf" />
              <span>{summary.completed_lessons_count}</span>
            </div>
          </div>

          <div className="bg-paper rounded-3xl border-2 border-sand p-5 space-y-1 shadow-sm">
            <span className="text-[10px] font-bold text-ink-muted uppercase">
              {t('parent.currentStreak')}
            </span>
            <div className="flex items-center gap-2 text-2xl font-extrabold text-maroon">
              <Flame size={20} fill="currentColor" className="text-maroon" />
              <span>{summary.current_streak}d</span>
            </div>
          </div>

          <div className="bg-paper rounded-3xl border-2 border-sand p-5 space-y-1 shadow-sm">
            <span className="text-[10px] font-bold text-ink-muted uppercase">
              Total XP
            </span>
            <div className="flex items-center gap-2 text-2xl font-extrabold text-gold-dark">
              <Award size={20} className="text-gold" />
              <span>{summary.total_xp}</span>
            </div>
          </div>
        </div>

        {/* 5-Skill Competency Mastery Matrix */}
        <div className="bg-paper rounded-3xl border-2 border-sand p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-xl text-ink flex items-center gap-2">
              <TrendingUp size={20} className="text-teal" />
              <span>{t('parent.skillBreakdown')}</span>
            </h2>
            <span className="text-xs font-semibold text-ink-muted">
              Evaluated across recognition, recall, and production
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(Object.keys(summary.mastery_by_skill) as SkillType[]).map(skill => {
              const score = summary.mastery_by_skill[skill];
              const pct = Math.round(score * 100);

              return (
                <div key={skill} className="p-4 rounded-2xl bg-paper-dark border border-sand space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-ink">
                      {isTa ? skillLabels[skill].ta : skillLabels[skill].en}
                    </span>
                    <span className="text-teal font-extrabold">{pct}%</span>
                  </div>

                  <div className="h-2.5 w-full bg-sand/60 rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-teal rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly Minutes Activity Bar */}
        <div className="bg-paper rounded-3xl border-2 border-sand p-6 sm:p-8 space-y-4 shadow-sm">
          <h2 className="font-heading font-bold text-xl text-ink">
            {t('parent.weeklyPractice')}
          </h2>

          <div className="grid grid-cols-6 sm:grid-cols-6 gap-3 pt-2">
            {summary.recent_activity.map(act => (
              <div key={act.date} className="p-3 bg-paper-dark rounded-2xl border border-sand text-center space-y-1">
                <span className="text-[10px] text-ink-muted font-bold block">
                  {act.date.split('-').slice(1).join('/')}
                </span>
                <span className="text-lg font-extrabold text-teal block">
                  {act.minutes_spent}m
                </span>
                <span className="text-[9px] text-ink-muted block">
                  {act.lessons_completed} lessons
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Child Privacy & Safety Shield Statement */}
        <div className="p-5 rounded-3xl bg-teal-surface border-2 border-teal/20 text-ink flex items-start gap-3.5">
          <ShieldCheck size={24} className="text-leaf flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-ink">
              COPPA 2.0 & GDPR-K Compliance Guarantee
            </h4>
            <p className="text-xs text-ink-muted leading-relaxed">
              {t('parent.privacyAssurance')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
