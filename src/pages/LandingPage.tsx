import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Sparkles, 
  ArrowRight, 
  Volume2, 
  ShieldCheck, 
  Feather, 
  Award, 
  CheckCircle2, 
  Play
} from 'lucide-react';
import { authService } from '../services/authService';
import { audioService } from '../services/audioService';
import { AudioButton } from '../components/common/AudioButton';
import { KiliParrot } from '../components/mascot/KiliParrot';

export const LandingPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [selectedPreviewAge, setSelectedPreviewAge] = useState<'sprouts' | 'explorers' | 'scholars'>('explorers');
  const isTa = i18n.language === 'ta';

  const handleStart = () => {
    navigate('/auth');
  };

  const handleDemo = async () => {
    await authService.enableDemoMode();
    navigate('/dashboard');
  };

  const playHeroAudio = () => {
    audioService.play('vocab_vanakkam', 'வணக்கம்');
  };

  return (
    <div className="min-h-screen bg-paper bg-kolam-subtle flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8 border-b-2 border-sand">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Hero Content */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-surface border border-teal/20 text-teal text-xs sm:text-sm font-bold shadow-sm">
              <Sparkles size={16} className="text-gold" />
              <span>{isTa ? 'வகுப்பு 1 முதல் 12 மாணவர்களுக்கான தமிழ் களம்' : 'For School Students (Standard 1 to 12)'}</span>
            </div>

            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-ink tracking-tight leading-[1.2]">
              {isTa ? (
                <>
                  தங்கிலிஷிலிருந்து <br />
                  <span className="text-teal">தூய தமிழ் எழுத்தறிவிற்கு</span>
                </>
              ) : (
                <>
                  From Tanglish to <br />
                  <span className="text-teal">Authentic Tamil Script</span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-ink-muted max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {t('common.appTagline')} — an audio-first, gamified platform designed specifically for students from non-Tamil-speaking backgrounds.
            </p>

            {/* Quick Hero Pronunciation Pill */}
            <div className="inline-flex items-center gap-3 p-2 pr-4 bg-paper-dark border-2 border-sand rounded-2xl shadow-sm">
              <button
                type="button"
                onClick={playHeroAudio}
                className="w-10 h-10 rounded-xl bg-teal text-white flex items-center justify-center hover:bg-teal-light transition-colors shadow-sm"
                aria-label="Play Tamil greeting audio"
              >
                <Volume2 size={20} />
              </button>
              <div className="text-left">
                <span className="font-tamil font-bold text-lg text-teal block leading-none">
                  வணக்கம்
                </span>
                <span className="text-xs text-ink-muted font-medium">
                  vanakkam • Greetings / Hello
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                type="button"
                onClick={handleStart}
                className="w-full sm:w-auto px-8 py-4 bg-teal hover:bg-teal-light text-white font-extrabold rounded-2xl text-base shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 group"
              >
                <span>{isTa ? 'கற்கத் தொடங்குங்கள்' : 'Start Learning Free'}</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={handleDemo}
                className="w-full sm:w-auto px-6 py-4 bg-paper-dark hover:bg-sand border-2 border-sand text-ink font-bold rounded-2xl text-base transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Play size={18} fill="currentColor" className="text-teal" />
                <span>{t('auth.demoAction')}</span>
              </button>
            </div>

            {/* Safe & Ad-Free Shield */}
            <div className="flex items-center justify-center lg:justify-start gap-4 text-xs text-ink-muted pt-2 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-leaf" />
                COPPA 2.0 & GDPR-K Safe
              </span>
              <span>•</span>
              <span>100% Ad-Free</span>
              <span>•</span>
              <span>No Punitive Hearts</span>
            </div>
          </div>

          {/* Right Mascot & Hero 3D Card Showcase */}
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <div 
              onClick={() => navigate('/lesson/l0-1')}
              className="relative z-10 w-72 h-80 sm:w-80 sm:h-96 bg-paper rounded-3xl border-4 border-sand shadow-card-elevated p-8 flex flex-col items-center justify-between text-center bg-palm-subtle hover:scale-105 hover:border-teal transition-all cursor-pointer group"
              title="Click to try Lesson 1 immediately!"
            >
              <div className="w-full flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-teal bg-teal-surface px-3 py-1 rounded-full group-hover:bg-teal group-hover:text-white transition-colors">
                  Uyir Vowel 1 • Start Lesson →
                </span>
                <div onClick={(e) => e.stopPropagation()}>
                  <AudioButton
                    audioId="vocab_vanakkam"
                    fallbackText="வணக்கம்"
                    size="sm"
                    showFallbackBadge={false}
                  />
                </div>
              </div>

              {/* Large Tamil Letter */}
              <div className="my-4">
                <span className="font-tamil font-extrabold text-8xl text-teal block filter drop-shadow group-hover:scale-110 transition-transform">
                  அ
                </span>
                <span className="text-xl font-bold text-ink mt-2 block">
                  a • அம்மா (Mother)
                </span>
              </div>

              <div className="w-full bg-sand/60 rounded-xl p-2.5 text-xs text-ink-muted font-medium flex items-center justify-center gap-1.5 group-hover:bg-teal-surface group-hover:text-teal transition-colors">
                <span>Stage A: Full Tanglish Bridge Active</span>
                <ArrowRight size={14} />
              </div>
            </div>

            {/* Friendly Kili Parrot Companion */}
            <div className="mt-4 sm:mt-6 cursor-pointer" onClick={() => navigate('/dashboard')}>
              <KiliParrot
                mood="cheering"
                speechText="Vanakkam! I'm Kili. Let's learn Tamil together!"
                speechTextTa="வணக்கம்! நான் கிளி. ஒன்றாகத் தமிழ் கற்போம்!"
                size="md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works 3-Step Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-paper-dark border-b-2 border-sand">
        <div className="w-full max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-ink">
              {isTa ? 'எப்படி இயங்குகிறது?' : 'How TamilPalam Works'}
            </h2>
            <p className="text-sm sm:text-base text-ink-muted">
              {isTa 
                ? 'அறிவியல் பூர்வமான 5-படிநிலை தங்கிலிஷ் வழிகாட்டல் முறை' 
                : 'A research-backed 5-stage model bridging English phonics to authentic Tamil literacy.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div 
              onClick={() => navigate('/lesson/l0-1')}
              className="bg-paper p-6 rounded-3xl border-2 border-sand hover:border-teal shadow-sm hover:shadow-md transition-all cursor-pointer space-y-4 flex flex-col justify-between group"
            >
              <div className="w-12 h-12 rounded-2xl bg-teal text-white flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                1
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-ink group-hover:text-teal transition-colors">
                  {isTa ? '1. ஒலியும் தங்கிலிஷும்' : '1. Audio & Tanglish Bridge'}
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {isTa 
                    ? 'தெரிந்த ஆங்கில எழுத்துக்களில் (Tanglish) உச்சரிப்பைக் கேட்டுப் பழகி, பயமின்றித் தொடங்கலாம்.' 
                    : 'Start with familiar Roman spellings and native speaker audio. Zero intimidation for beginners.'}
                </p>
              </div>
              <div className="p-3 bg-sand/40 rounded-2xl text-xs font-semibold text-teal flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  Stage A & B Support
                </span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Step 2 */}
            <div 
              onClick={() => navigate('/lesson/l0-2')}
              className="bg-paper p-6 rounded-3xl border-2 border-sand hover:border-gold shadow-sm hover:shadow-md transition-all cursor-pointer space-y-4 flex flex-col justify-between group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gold text-ink flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                2
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-ink group-hover:text-gold-dark transition-colors">
                  {isTa ? '2. விரலால் வரைந்து கற்றல்' : '2. Guided Outline Tracing'}
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {isTa 
                    ? 'வட்ட வடிவத் தமிழ் எழுத்துக்களின் எல்லைக்கோட்டின் மீது விரலால் வரைந்து தசை நினைவாற்றலை வளருங்கள்.' 
                    : 'Trace curvy Tamil glyphs directly on screen with touch or mouse to build shape recognition and muscle memory.'}
                </p>
              </div>
              <div className="p-3 bg-sand/40 rounded-2xl text-xs font-semibold text-gold-dark flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Feather size={16} />
                  Interactive Tracing
                </span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Step 3 */}
            <div 
              onClick={() => navigate('/learn')}
              className="bg-paper p-6 rounded-3xl border-2 border-sand hover:border-leaf shadow-sm hover:shadow-md transition-all cursor-pointer space-y-4 flex flex-col justify-between group"
            >
              <div className="w-12 h-12 rounded-2xl bg-leaf text-white flex items-center justify-center font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                3
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-ink group-hover:text-leaf-dark transition-colors">
                  {isTa ? '3. தூய தமிழ் எழுத்தறிவு' : '3. Pure Script Independence'}
                </h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  {isTa 
                    ? 'துல்லியமான இடைவெளி மீள்பார்வையுடன் தங்கிலிஷ் மெதுவாக மறைந்து முழுத் தமிழ் வாசிப்பு ஆற்றல் பிறக்கிறது.' 
                    : 'Watch your Script Power meter reach Stage E. Read real words, sentences, and heritage stories independently.'}
                </p>
              </div>
              <div className="p-3 bg-sand/40 rounded-2xl text-xs font-semibold text-leaf-dark flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Award size={16} />
                  Full Script Independence
                </span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Age Modes Interactive Showcase */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b-2 border-sand">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-ink">
              {isTa ? 'மூன்று வயதுப் பயன்முறைகள்' : 'Three Tailored Age Modes'}
            </h2>
            <p className="text-sm sm:text-base text-ink-muted">
              One unified platform that dynamically adjusts touch target sizes, font scale, copy tone, and guidance.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center justify-center gap-2 bg-paper-dark p-1.5 rounded-2xl border border-sand max-w-md mx-auto">
            <button
              type="button"
              onClick={() => setSelectedPreviewAge('sprouts')}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                selectedPreviewAge === 'sprouts'
                  ? 'bg-teal text-white shadow-sm'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              Sprouts (Std 1–3)
            </button>
            <button
              type="button"
              onClick={() => setSelectedPreviewAge('explorers')}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                selectedPreviewAge === 'explorers'
                  ? 'bg-teal text-white shadow-sm'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              Explorers (Std 4–6)
            </button>
            <button
              type="button"
              onClick={() => setSelectedPreviewAge('scholars')}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
                selectedPreviewAge === 'scholars'
                  ? 'bg-teal text-white shadow-sm'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              Scholars (Std 7–12)
            </button>
          </div>

          {/* Live Preview Card */}
          <div className="bg-paper-dark p-6 sm:p-8 rounded-3xl border-2 border-sand shadow-md">
            {selectedPreviewAge === 'sprouts' && (
              <div className="space-y-4 text-center">
                <span className="inline-block px-3 py-1 rounded-full bg-leaf-surface text-leaf-dark text-xs font-bold">
                  Sprouts Mode: Ages 6–9
                </span>
                <h3 className="font-heading font-bold text-2xl text-ink">
                  Audio-Led, Giant Touch Targets, Pure Delight
                </h3>
                <p className="text-sm text-ink-muted max-w-lg mx-auto">
                  64px touch targets, spoken instructions, max 6 words per prompt, large 96px Tamil letters, and tap-to-select only.
                </p>
                <div className="pt-4 flex justify-center">
                  <button
                    type="button"
                    onClick={() => navigate('/lesson/l0-1')}
                    className="h-16 px-8 rounded-2xl bg-teal text-white font-extrabold text-lg shadow-lg hover:bg-teal-light active:scale-95 transition-all flex items-center gap-2"
                  >
                    <span>அம்மா (amma)</span>
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {selectedPreviewAge === 'explorers' && (
              <div className="space-y-4 text-center">
                <span className="inline-block px-3 py-1 rounded-full bg-gold-surface text-gold-dark text-xs font-bold">
                  Explorers Mode: Ages 9–12 (Primary Focus)
                </span>
                <h3 className="font-heading font-bold text-2xl text-ink">
                  Interactive Quizzes, Missions & Kili Mascot
                </h3>
                <p className="text-sm text-ink-muted max-w-lg mx-auto">
                  52px touch targets, drag-and-drop tiles with tap alternatives, streak calendar, real-life missions, and badge showcase.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => navigate('/lesson/l1-1')}
                    className="px-5 py-3 rounded-2xl bg-sand font-bold text-ink text-sm shadow-tile hover:bg-teal-surface hover:text-teal transition-all active:scale-95"
                  >
                    எனக்கு
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/lesson/l1-1')}
                    className="px-5 py-3 rounded-2xl bg-sand font-bold text-ink text-sm shadow-tile hover:bg-teal-surface hover:text-teal transition-all active:scale-95"
                  >
                    பழம்
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/lesson/l1-1')}
                    className="px-5 py-3 rounded-2xl bg-teal text-white font-bold text-sm shadow-tile hover:bg-teal-light transition-all active:scale-95 flex items-center gap-1.5"
                  >
                    <span>பிடிக்கும்</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {selectedPreviewAge === 'scholars' && (
              <div className="space-y-4 text-center">
                <span className="inline-block px-3 py-1 rounded-full bg-sand text-ink text-xs font-bold">
                  Scholars Mode: Ages 12–18
                </span>
                <h3 className="font-heading font-bold text-2xl text-ink">
                  Fast Cadence, Clean Typography, Deep Mastery
                </h3>
                <p className="text-sm text-ink-muted max-w-lg mx-auto">
                  44px touch targets, mascot-free layout, subtle heritage colors, rapid lesson cadence, and focus on grammar & literature.
                </p>
                <div className="pt-4 flex justify-center">
                  <button
                    type="button"
                    onClick={() => navigate('/lesson/l4-1')}
                    className="px-6 py-2.5 rounded-xl bg-ink hover:bg-ink-muted text-paper font-semibold text-sm transition-all active:scale-95 flex items-center gap-2"
                  >
                    <span>திருக்குறள் • வாய்மை எனப்படுவது யாதெனின்...</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 px-4 text-center bg-gradient-to-b from-paper to-paper-dark border-b border-sand">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-ink">
            {isTa ? 'இன்றே உங்கள் தமிழ் பயணத்தைத் தொடங்குங்கள்!' : 'Start Your Tamil Journey Today!'}
          </h2>
          <p className="text-sm text-ink-muted">
            {isTa ? '100% இலவசம், பாதுகாப்பானது மற்றும் விளம்பரங்களற்றது.' : '100% free, child-safe, and ad-free.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={handleStart}
              className="w-full sm:w-auto px-8 py-4 bg-teal hover:bg-teal-light text-white font-extrabold rounded-2xl text-base shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span>{isTa ? 'இலவசமாகக் கற்க' : 'Get Started Free'}</span>
              <ArrowRight size={20} />
            </button>
            <button
              type="button"
              onClick={handleDemo}
              className="w-full sm:w-auto px-6 py-4 bg-paper hover:bg-sand border-2 border-sand text-ink font-bold rounded-2xl text-base transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Play size={18} fill="currentColor" className="text-teal" />
              <span>{t('auth.demoAction')}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 px-4 text-center text-xs text-ink-muted border-t border-sand">
        <p className="font-semibold text-ink">
          TamilPalam (தமிழ் பாலம்) • Built with love for Tamil heritage and young learners.
        </p>
        <p className="mt-1">
          Compliant with COPPA 2.0 & GDPR-K child safety regulations.
        </p>
      </footer>
    </div>
  );
};
