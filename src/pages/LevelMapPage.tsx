import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Lock, 
  Check, 
  Play, 
  Sparkles, 
  Star, 
  BookOpen, 
  Layers, 
  Feather, 
  Award,
  Grid,
  Puzzle,
  MessageCircle,
  ArrowLeft
} from 'lucide-react';
import { LearningLevel, Lesson } from '../types';
import { curriculumService } from '../services/curriculumService';
import { KiliParrot } from '../components/mascot/KiliParrot';
import { LocalStorageAdapter } from '../services/storageAdapter';

export const LevelMapPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isTa = i18n.language === 'ta';

  const [levels, setLevels] = useState<LearningLevel[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<LearningLevel | null>(null);
  const [levelLessons, setLevelLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  const profile = LocalStorageAdapter.getProfile();
  const isScholars = profile.age_mode === 'scholars';

  useEffect(() => {
    async function loadLevels() {
      const data = await curriculumService.getLevels();
      setLevels(data);
      // Select the first active level
      const active = data.find(l => !l.is_completed && l.is_unlocked) || data[0];
      setSelectedLevel(active);
      const lessons = await curriculumService.getLessonsByLevel(active.level_number);
      setLevelLessons(lessons);
      setLoading(false);
    }
    loadLevels();
  }, []);

  const handleSelectLevel = async (lvl: LearningLevel) => {
    if (!lvl.is_unlocked) return;
    setSelectedLevel(lvl);
    const lessons = await curriculumService.getLessonsByLevel(lvl.level_number);
    setLevelLessons(lessons);
  };

  const handleStartLesson = (lessonId: string) => {
    navigate(`/lesson/${lessonId}`);
  };

  const getLevelIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return Sparkles;
      case 'BookOpen': return BookOpen;
      case 'Grid': return Grid;
      case 'Puzzle': return Puzzle;
      case 'Layers': return Layers;
      case 'MessageCircle': return MessageCircle;
      case 'Feather': return Feather;
      case 'Award': default: return Award;
    }
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
            onClick={() => navigate('/revision')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-teal-surface border border-teal/20 hover:bg-teal hover:text-white text-teal font-bold text-xs shadow-sm transition-all active:scale-95"
          >
            <span>{t('common.revision')}</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-surface text-teal font-bold text-xs uppercase tracking-wider">
            <Sparkles size={14} className="text-gold" />
            <span>Levels 0 to 7</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-ink">
            {t('learn.title')}
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted">
            {t('learn.subtitle')}
          </p>
        </div>

        {/* 3D-Perspective Milestones Trail */}
        <div className="relative py-8">
          {/* S-curve decorative trail line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-2.5 bg-sand rounded-full hidden sm:block" />

          <div className="space-y-6 sm:space-y-10 relative z-10">
            {levels.map((lvl, idx) => {
              const isSelected = selectedLevel?.id === lvl.id;
              const Icon = getLevelIcon(lvl.icon);
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={lvl.id}
                  className={`flex flex-col sm:flex-row items-center gap-4 ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Info Card on one side */}
                  <div
                    onClick={() => handleSelectLevel(lvl)}
                    className={`flex-1 w-full sm:w-auto p-5 rounded-3xl border-2 transition-all cursor-pointer ${
                      lvl.is_unlocked
                        ? isSelected
                          ? 'bg-paper-dark border-teal shadow-card-elevated ring-4 ring-teal/10'
                          : 'bg-paper border-sand hover:border-teal/50 shadow-sm'
                        : 'bg-sand/30 border-sand text-ink-muted opacity-70 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-teal bg-teal-surface px-2.5 py-0.5 rounded-full">
                        {lvl.cefr}
                      </span>
                      {lvl.is_completed ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-leaf bg-leaf-surface px-2.5 py-0.5 rounded-full">
                          <Check size={12} strokeWidth={3} />
                          {t('learn.completedBadge')}
                        </span>
                      ) : !lvl.is_unlocked ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-ink-muted">
                          <Lock size={12} />
                          {t('common.locked')}
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-gold-dark">
                          {lvl.completed_lessons}/{lvl.total_lessons} {t('common.lesson')}s
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading font-bold text-lg text-ink">
                      Level {lvl.level_number}: {isTa ? lvl.title_ta : lvl.title_en}
                    </h3>
                    <p className="text-xs text-ink-muted mt-1 leading-relaxed line-clamp-2">
                      {isTa ? lvl.description_ta : lvl.description_en}
                    </p>
                  </div>

                  {/* Center Node / Gopuram Silhouette Motif */}
                  <button
                    type="button"
                    onClick={() => handleSelectLevel(lvl)}
                    disabled={!lvl.is_unlocked}
                    aria-label={`Select Level ${lvl.level_number}`}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center font-bold text-2xl transition-all shadow-tile active:scale-95 flex-shrink-0 z-20 ${
                      lvl.is_completed
                        ? 'bg-leaf text-white ring-4 ring-leaf/30'
                        : lvl.is_unlocked
                        ? isSelected
                          ? 'bg-gold text-ink ring-4 ring-gold/40 shadow-glow-gold scale-105'
                          : 'bg-teal text-white hover:bg-teal-light'
                        : 'bg-sand text-ink-muted cursor-not-allowed shadow-none'
                    }`}
                  >
                    {lvl.is_completed ? (
                      <Check size={32} strokeWidth={3} />
                    ) : lvl.is_unlocked ? (
                      <Icon size={30} />
                    ) : (
                      <Lock size={26} />
                    )}
                  </button>

                  {/* Empty spacer for alignment on opposite side */}
                  <div className="flex-1 hidden sm:block" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Level Lessons Detail Sheet */}
        {selectedLevel && (
          <div className="bg-paper rounded-3xl border-4 border-sand shadow-card-elevated p-6 sm:p-8 space-y-6 animate-pop">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sand pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal">
                  Level {selectedLevel.level_number} Curriculum
                </span>
                <h2 className="font-heading font-extrabold text-2xl text-ink">
                  {isTa ? selectedLevel.title_ta : selectedLevel.title_en}
                </h2>
                <p className="text-xs text-ink-muted mt-0.5">
                  {isTa ? selectedLevel.description_ta : selectedLevel.description_en}
                </p>
              </div>

              {!isScholars && (
                <KiliParrot
                  mood="happy"
                  speechText="Pick a lesson and let's earn stars!"
                  speechTextTa="பாடத்தைத் தேர்ந்தெடுங்கள், நட்சத்திரங்களை வெல்லலாம்!"
                  size="sm"
                />
              )}
            </div>

            {/* Lesson Cards List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {levelLessons.map((lesson, idx) => (
                <div
                  key={lesson.id}
                  onClick={() => handleStartLesson(lesson.id)}
                  className="p-5 rounded-2xl bg-paper-dark border-2 border-sand hover:border-teal/60 hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg flex-shrink-0 transition-transform group-hover:scale-105 ${
                      lesson.is_completed
                        ? 'bg-leaf text-white shadow-sm'
                        : 'bg-teal text-white shadow-sm'
                    }`}>
                      {lesson.is_completed ? (
                        <Check size={22} strokeWidth={3} />
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-teal bg-teal-surface px-2 py-0.5 rounded-full">
                          {lesson.lesson_type}
                        </span>
                        {lesson.stars && (
                          <div className="flex items-center text-gold">
                            {Array.from({ length: lesson.stars }).map((_, s) => (
                              <Star key={s} size={12} fill="currentColor" />
                            ))}
                          </div>
                        )}
                      </div>

                      <h4 className="font-bold text-sm text-ink group-hover:text-teal transition-colors break-words">
                        {isTa ? lesson.title_ta : lesson.title_en}
                      </h4>
                      <p className="text-xs text-ink-muted line-clamp-1 break-words">
                        {lesson.description_en}
                      </p>
                    </div>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-sand group-hover:bg-teal group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0">
                    {lesson.is_completed ? (
                      <RotateCwIcon size={16} />
                    ) : (
                      <Play size={16} fill="currentColor" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const RotateCwIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
  </svg>
);
