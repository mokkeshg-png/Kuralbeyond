import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Sparkles, 
  Check, 
  CheckCircle2, 
  Heart, 
  Home, 
  TreePine, 
  Users,
  ArrowLeft,
  BookOpen
} from 'lucide-react';
import { RealLifeMission } from '../types';
import { missionService } from '../services/missionService';
import { KiliParrot } from '../components/mascot/KiliParrot';

export const MissionsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isTa = i18n.language === 'ta';

  const [missions, setMissions] = useState<RealLifeMission[]>([]);
  const [activeMission, setActiveMission] = useState<RealLifeMission | null>(null);
  const [reflectionText, setReflectionText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMissions() {
      const data = await missionService.getMissions();
      setMissions(data);
      setLoading(false);
    }
    loadMissions();
  }, []);

  const handleOpenCompleteModal = (mission: RealLifeMission) => {
    setActiveMission(mission);
    setReflectionText('');
  };

  const handleSubmitComplete = async () => {
    if (!activeMission) return;
    const completed = await missionService.completeMission(activeMission.id, reflectionText);
    if (completed) {
      setMissions(prev => prev.map(m => m.id === completed.id ? completed : m));
    }
    setActiveMission(null);
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'family': return Users;
      case 'home': return Home;
      case 'nature': return TreePine;
      default: return Heart;
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
            {t('common.missions')}
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-ink">
            {t('missions.title')}
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted">
            {t('missions.subtitle')}
          </p>
        </div>

        {/* Mascot Prompt */}
        <div className="flex justify-center">
          <KiliParrot
            mood="talking"
            speechText="Tamil lives in everyday smiles! Complete real missions with family."
            speechTextTa="தமிழ் நம் அன்றாடப் புன்னகையில் வாழ்கிறது! நிஜ உலகப் பணிகளைச் செய்து மகிழுங்கள்."
            size="md"
          />
        </div>

        {/* Missions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {missions.map(mission => {
            const Icon = getCategoryIcon(mission.category);

            return (
              <div
                key={mission.id}
                className={`p-6 rounded-3xl border-2 transition-all flex flex-col justify-between space-y-4 ${
                  mission.is_completed
                    ? 'bg-paper-dark border-leaf/40 shadow-sm'
                    : 'bg-paper border-sand hover:border-teal/50 shadow-card-elevated'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand text-ink text-xs font-bold uppercase tracking-wider">
                      <Icon size={14} className="text-teal" />
                      {mission.category}
                    </span>

                    <span className="inline-flex items-center gap-1 text-xs font-extrabold text-gold-dark bg-gold-surface px-2.5 py-0.5 rounded-full">
                      <Sparkles size={14} className="text-gold" />
                      +{mission.xp_reward} XP
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-ink">
                    {isTa ? mission.title_ta : mission.title_en}
                  </h3>

                  <p className="text-xs text-ink-muted leading-relaxed">
                    {isTa ? mission.prompt_ta : mission.prompt_en}
                  </p>

                  {/* Target Tamil Words Pill */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {mission.target_words_ta.map((w, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-xl bg-teal-surface text-teal font-tamil font-bold text-xs"
                      >
                        {w}
                      </span>
                    ))}
                  </div>

                  {mission.student_reflection && (
                    <div className="p-3 bg-paper rounded-2xl border border-sand text-xs text-ink italic">
                      "{mission.student_reflection}"
                    </div>
                  )}
                </div>

                <div>
                  {mission.is_completed ? (
                    <div className="py-2.5 px-4 bg-leaf-surface text-leaf font-extrabold text-xs rounded-2xl flex items-center justify-center gap-1.5">
                      <CheckCircle2 size={16} />
                      {t('missions.missionCompleted')}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleOpenCompleteModal(mission)}
                      className="w-full py-3 bg-teal hover:bg-teal-light text-white font-extrabold text-xs rounded-2xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      <Check size={16} />
                      {t('missions.markCompleted')}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reflection Modal */}
      {activeMission && (
        <div className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-paper rounded-3xl max-w-md w-full p-6 border-4 border-teal shadow-2xl space-y-4 animate-pop">
            <h3 className="font-heading font-bold text-xl text-ink">
              {isTa ? activeMission.title_ta : activeMission.title_en}
            </h3>

            <p className="text-xs text-ink-muted">
              {isTa ? activeMission.prompt_ta : activeMission.prompt_en}
            </p>

            <div>
              <label className="block text-xs font-bold text-ink mb-1.5">
                {isTa ? 'எப்படி இருந்தது? உங்கள் அனுபவத்தைப் பகிருங்கள்:' : 'How did it go? Share your experience:'}
              </label>
              <textarea
                value={reflectionText}
                onChange={e => setReflectionText(e.target.value)}
                placeholder={t('missions.reflectionPlaceholder')}
                className="w-full h-24 p-3 rounded-2xl bg-paper-dark border-2 border-sand focus:border-teal focus:outline-none text-xs text-ink"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setActiveMission(null)}
                className="px-5 py-3 rounded-2xl bg-sand hover:bg-sand-dark text-ink font-bold text-xs"
              >
                {t('common.cancel')}
              </button>
              <button
                type="button"
                onClick={handleSubmitComplete}
                className="flex-1 py-3 bg-teal hover:bg-teal-light text-white font-extrabold text-xs rounded-2xl shadow-md"
              >
                {t('common.confirm')} & Claim XP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
