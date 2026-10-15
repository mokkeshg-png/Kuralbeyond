import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  ChevronRight, 
  Volume2, 
  Heart 
} from 'lucide-react';
import { authService } from '../services/authService';
import { StandardGrade, AgeMode } from '../types';
import { LocalStorageAdapter } from '../services/storageAdapter';

export const OnboardingPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [slideIndex, setSlideIndex] = useState(0);

  const [name, setName] = useState(LocalStorageAdapter.getProfile().display_name || '');
  const [grade, setGrade] = useState<StandardGrade>(LocalStorageAdapter.getProfile().grade || 4);
  const [ageMode, setAgeMode] = useState<AgeMode>(
    grade <= 3 ? 'sprouts' : grade <= 6 ? 'explorers' : 'scholars'
  );

  const slides = [
    {
      title: t('onboarding.slide1Title'),
      desc: t('onboarding.slide1Desc'),
      icon: Sparkles,
      color: 'bg-teal text-white',
    },
    {
      title: t('onboarding.slide2Title'),
      desc: t('onboarding.slide2Desc'),
      icon: Volume2,
      color: 'bg-gold text-ink',
    },
    {
      title: t('onboarding.slide3Title'),
      desc: t('onboarding.slide3Desc'),
      icon: Heart,
      color: 'bg-leaf text-white',
    },
  ];

  const handleGradeSelect = (newGrade: StandardGrade) => {
    setGrade(newGrade);
    // Auto-update default age mode based on grade
    if (newGrade <= 3) setAgeMode('sprouts');
    else if (newGrade <= 6) setAgeMode('explorers');
    else setAgeMode('scholars');
  };

  const handleSaveAndProceed = async (skipAssessment = false) => {
    await authService.updateProfile({
      display_name: name || 'Aarav',
      grade,
      age_mode: ageMode,
    });

    if (skipAssessment) {
      navigate('/dashboard');
    } else {
      navigate('/assessment');
    }
  };

  return (
    <div className="min-h-screen bg-paper bg-kolam-subtle flex flex-col items-center justify-center p-4">
      <div className="max-w-xl w-full bg-paper rounded-3xl border-4 border-sand shadow-card-elevated p-6 sm:p-8 space-y-6 animate-pop">
        {/* Progress indicator */}
        <div className="flex items-center gap-2">
          <div className={`h-2 flex-1 rounded-full transition-colors ${step >= 1 ? 'bg-teal' : 'bg-sand'}`} />
          <div className={`h-2 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-teal' : 'bg-sand'}`} />
          <div className={`h-2 flex-1 rounded-full transition-colors ${step >= 3 ? 'bg-teal' : 'bg-sand'}`} />
        </div>

        {/* Step 1: Welcome Carousel */}
        {step === 1 && (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center shadow-md transition-all">
              {React.createElement(slides[slideIndex].icon, {
                size: 32,
                className: slideIndex === 1 ? 'text-gold fill-gold' : 'text-teal',
              })}
            </div>

            <div className="space-y-2">
              <h2 className="font-heading font-extrabold text-2xl text-ink">
                {slides[slideIndex].title}
              </h2>
              <p className="text-sm text-ink-muted leading-relaxed max-w-md mx-auto">
                {slides[slideIndex].desc}
              </p>
            </div>

            {/* Slide dots */}
            <div className="flex justify-center items-center gap-2 pt-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSlideIndex(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    slideIndex === idx ? 'w-8 bg-teal' : 'w-2.5 bg-sand hover:bg-sand-dark'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-3 pt-4">
              {slideIndex < slides.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setSlideIndex(slideIndex + 1)}
                  className="w-full py-3.5 bg-teal text-white font-extrabold rounded-2xl text-sm shadow-md hover:bg-teal-light transition-all flex items-center justify-center gap-2"
                >
                  <span>{t('common.continue')}</span>
                  <ChevronRight size={18} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3.5 bg-teal text-white font-extrabold rounded-2xl text-sm shadow-md hover:bg-teal-light transition-all flex items-center justify-center gap-2"
                >
                  <span>{t('common.continue')}</span>
                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Name & Grade Selection */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <h2 className="font-heading font-bold text-2xl text-ink">
                {t('onboarding.namePrompt')}
              </h2>
              <p className="text-xs text-ink-muted">
                {t('onboarding.gradeDesc')}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder={t('onboarding.namePlaceholder')}
                  className="w-full px-5 py-4 rounded-2xl bg-paper-dark border-2 border-sand focus:border-teal focus:outline-none text-base font-bold text-ink text-center shadow-inner"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-2">
                  {t('onboarding.selectGrade')}
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(g => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => handleGradeSelect(g as StandardGrade)}
                      className={`py-3 rounded-2xl font-extrabold text-sm transition-all shadow-sm active:scale-95 flex flex-col items-center justify-center ${
                        grade === g
                          ? 'bg-teal text-white ring-4 ring-teal/20 shadow-md'
                          : 'bg-paper-dark border-2 border-sand text-ink hover:border-teal/40'
                      }`}
                    >
                      <span className="text-base">{g}</span>
                      <span className="text-[9px] font-medium opacity-80">Std</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-3.5 bg-sand hover:bg-sand-dark text-ink font-bold rounded-2xl text-sm transition-all"
              >
                {t('common.back')}
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 py-3.5 bg-teal hover:bg-teal-light text-white font-extrabold rounded-2xl text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>{t('common.continue')}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Experience Mode Selection & Assessment Choice */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <h2 className="font-heading font-bold text-2xl text-ink">
                {t('onboarding.ageModePrompt')}
              </h2>
              <p className="text-xs text-ink-muted">
                Optimized for Standard {grade}. You can change this anytime in Settings.
              </p>
            </div>

            {/* 3 Age Mode Selection Cards */}
            <div className="space-y-3">
              {/* Sprouts */}
              <div
                onClick={() => setAgeMode('sprouts')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                  ageMode === 'sprouts'
                    ? 'border-teal bg-teal-surface/60 shadow-md ring-2 ring-teal/20'
                    : 'border-sand bg-paper-dark hover:border-sand-dark'
                }`}
              >
                <div className="w-6 h-6 rounded-full border-2 border-teal flex items-center justify-center mt-0.5 flex-shrink-0">
                  {ageMode === 'sprouts' && <Check size={14} className="text-teal stroke-[3]" />}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-ink">{t('onboarding.sproutsTitle')}</h4>
                  <p className="text-xs text-ink-muted leading-relaxed mt-0.5">{t('onboarding.sproutsDesc')}</p>
                </div>
              </div>

              {/* Explorers */}
              <div
                onClick={() => setAgeMode('explorers')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                  ageMode === 'explorers'
                    ? 'border-teal bg-teal-surface/60 shadow-md ring-2 ring-teal/20'
                    : 'border-sand bg-paper-dark hover:border-sand-dark'
                }`}
              >
                <div className="w-6 h-6 rounded-full border-2 border-teal flex items-center justify-center mt-0.5 flex-shrink-0">
                  {ageMode === 'explorers' && <Check size={14} className="text-teal stroke-[3]" />}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-ink">{t('onboarding.explorersTitle')}</h4>
                  <p className="text-xs text-ink-muted leading-relaxed mt-0.5">{t('onboarding.explorersDesc')}</p>
                </div>
              </div>

              {/* Scholars */}
              <div
                onClick={() => setAgeMode('scholars')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 ${
                  ageMode === 'scholars'
                    ? 'border-teal bg-teal-surface/60 shadow-md ring-2 ring-teal/20'
                    : 'border-sand bg-paper-dark hover:border-sand-dark'
                }`}
              >
                <div className="w-6 h-6 rounded-full border-2 border-teal flex items-center justify-center mt-0.5 flex-shrink-0">
                  {ageMode === 'scholars' && <Check size={14} className="text-teal stroke-[3]" />}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-ink">{t('onboarding.scholarsTitle')}</h4>
                  <p className="text-xs text-ink-muted leading-relaxed mt-0.5">{t('onboarding.scholarsDesc')}</p>
                </div>
              </div>
            </div>

            {/* Assessment Options */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => handleSaveAndProceed(false)}
                className="w-full py-4 bg-teal hover:bg-teal-light text-white font-extrabold rounded-2xl text-sm shadow-md transition-all active:scale-98 flex items-center justify-center gap-2"
              >
                <Sparkles size={18} className="text-gold-light" />
                <span>{t('onboarding.startAssessment')}</span>
              </button>

              <button
                type="button"
                onClick={() => handleSaveAndProceed(true)}
                className="w-full py-3 bg-sand hover:bg-sand-dark text-ink font-semibold rounded-2xl text-xs transition-colors"
              >
                {t('onboarding.skipToLevel0')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
