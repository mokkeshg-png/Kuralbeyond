import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Play, ArrowRight } from 'lucide-react';
import { authService } from '../services/authService';
import { StandardGrade } from '../types';

export const AuthPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isTa = i18n.language === 'ta';

  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [grade, setGrade] = useState<StandardGrade>(4);
  const [error, setError] = useState<string | null>(null);
<<<<<<< HEAD
  const [newUserId, setNewUserId] = useState<string | null>(null);
=======
  const [emailConfirmPending, setEmailConfirmPending] = useState(false);
>>>>>>> d02263589388d2a4afdded61d0928b2574ee939f

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError(isTa ? 'மின்னஞ்சல் மற்றும் கடவுச்சொல்லை உள்ளிடவும்' : 'Please enter email and password');
      return;
    }

    try {
      if (isSignUp) {
        if (!displayName) {
          setError(isTa ? 'மாணவரின் பெயரை உள்ளிடவும்' : 'Please enter learner name');
          return;
        }
<<<<<<< HEAD
        const profile = await authService.signUp(email, displayName, grade, true, password);
        // Display the Supabase auth UUID (stored as auth_user_id) or profile id
        const displayId: string = (profile as any).auth_user_id ?? profile.id;
        setNewUserId(displayId);

=======
        const profile = await authService.signUp(email, password, displayName, grade, true);
        // Check if email confirmation is required
        if ((profile as Record<string, unknown>)['__emailConfirmationRequired']) {
          setEmailConfirmPending(true);
          return;
        }
>>>>>>> d02263589388d2a4afdded61d0928b2574ee939f
        if (profile.is_child && !profile.parental_consent) {
          // Brief pause so the user can see their ID before navigating
          setTimeout(() => navigate('/parent-consent'), 2500);
        } else {
          setTimeout(() => navigate('/onboarding'), 2500);
        }
      } else {
        await authService.signIn(email, password);
        navigate('/dashboard');
      }
<<<<<<< HEAD
    } catch (err: any) {
      setError(err?.message ?? t('errors.somethingWrong'));
=======
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : t('errors.somethingWrong');
      setError(msg);
>>>>>>> d02263589388d2a4afdded61d0928b2574ee939f
    }
  };

  const handleDemoMode = async () => {
    await authService.enableDemoMode();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-paper bg-kolam-subtle flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-paper rounded-3xl border-4 border-sand shadow-card-elevated p-6 sm:p-8 space-y-6 animate-pop">
        {/* Back Link */}
        <div className="flex justify-start">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="text-xs font-bold text-ink-muted hover:text-teal transition-colors flex items-center gap-1"
          >
            ← {isTa ? 'முகப்புக்குத் திரும்பு' : 'Back to Home'}
          </button>
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <div 
            onClick={() => { window.location.href = '/'; }}
            className="w-14 h-14 rounded-2xl bg-teal text-paper font-tamil font-extrabold text-3xl mx-auto flex items-center justify-center shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            title="Kuralbeyond - Click to refresh"
          >
            அ
          </div>
          <h1 className="font-heading font-extrabold text-2xl text-ink">
            {isSignUp ? t('auth.signUpTitle') : t('auth.signInTitle')}
          </h1>
          <p className="text-xs text-ink-muted">
            {isSignUp ? t('auth.signUpSubtitle') : t('auth.signInSubtitle')}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-bold text-ink mb-1.5">
                {t('auth.nameLabel')}
              </label>
              <input
                type="text"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                placeholder="e.g. Aarav, Meera"
                className="w-full px-4 py-3 rounded-2xl bg-paper-dark border-2 border-sand focus:border-teal focus:outline-none text-sm font-semibold text-ink"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-ink mb-1.5">
              {t('auth.emailLabel')}
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-4 py-3 rounded-2xl bg-paper-dark border-2 border-sand focus:border-teal focus:outline-none text-sm font-semibold text-ink"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink mb-1.5">
              {t('auth.passwordLabel')}
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-2xl bg-paper-dark border-2 border-sand focus:border-teal focus:outline-none text-sm font-semibold text-ink"
              required
            />
          </div>

          {isSignUp && (
            <div>
              <label className="block text-xs font-bold text-ink mb-1.5">
                {t('auth.gradeLabel')}
              </label>
              <select
                value={grade}
                onChange={e => setGrade(Number(e.target.value) as StandardGrade)}
                className="w-full px-4 py-3 rounded-2xl bg-paper-dark border-2 border-sand focus:border-teal focus:outline-none text-sm font-semibold text-ink"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map(g => (
                  <option key={g} value={g}>
                    {isTa ? `வகுப்பு ${g} (Standard ${g})` : `Standard (Grade) ${g}`}
                    {g <= 3 ? ' — Sprouts' : g <= 6 ? ' — Explorers' : ' — Scholars'}
                  </option>
                ))}
              </select>
            </div>
          )}

        {/* Email confirmation pending */}
        {emailConfirmPending && (
          <div className="p-4 rounded-2xl bg-teal-surface border-2 border-teal/30 text-center space-y-2 animate-pop">
            <p className="text-sm font-bold text-teal">
              {isTa ? 'உங்கள் மின்னஞ்சலை உறுதிப்படுத்தவும்' : '📧 Check your email'}
            </p>
            <p className="text-xs text-ink-muted">
              {isTa
                ? `${email} முகவரிக்கு ஒரு உறுதிப்படுத்தல் இணைப்பு அனுப்பப்பட்டுள்ளது. அதை சொடுக்கியதும் உள்நுழைக.`
                : `A confirmation link was sent to ${email}. Click it then sign in below.`}
            </p>
            <button
              type="button"
              onClick={() => { setEmailConfirmPending(false); setIsSignUp(false); }}
              className="mt-2 text-xs font-bold text-teal underline"
            >
              {isTa ? 'உள்நுழைய செல்க' : 'Go to Sign In'}
            </button>
          </div>
        )}

        {error && (
          <p className="text-xs font-bold text-maroon bg-maroon/10 p-3 rounded-xl text-center">
            {error}
          </p>
        )}

          {newUserId && (
            <div className="bg-teal/10 border-2 border-teal/40 rounded-2xl p-4 space-y-1 text-center">
              <p className="text-xs font-bold text-teal uppercase tracking-wide">
                {isTa ? '✓ கணக்கு உருவாக்கப்பட்டது!' : '✓ Account Created!'}
              </p>
              <p className="text-[10px] text-ink-muted font-semibold">
                {isTa ? 'உங்கள் தனிப்பட்ட அடையாளம்' : 'Your unique User ID'}
              </p>
              <p className="font-mono text-xs text-ink bg-paper border border-sand rounded-xl px-3 py-2 break-all select-all">
                {newUserId}
              </p>
              <p className="text-[10px] text-ink-muted">
                {isTa ? 'இதை குறித்துக்கொள்ளுங்கள்' : 'Save this for your records'}
              </p>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-teal hover:bg-teal-light text-white font-extrabold rounded-2xl text-sm shadow-md hover:shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2"
          >
            <span>{isSignUp ? t('auth.signUpAction') : t('auth.signInAction')}</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Demo Mode Bypass */}
        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-sand"></div>
          <span className="flex-shrink mx-3 text-xs font-semibold text-ink-muted uppercase">or</span>
          <div className="flex-grow border-t border-sand"></div>
        </div>

        <button
          type="button"
          onClick={handleDemoMode}
          className="w-full py-3 bg-gold-surface border-2 border-gold/40 hover:bg-gold text-ink font-bold rounded-2xl text-sm transition-all shadow-sm active:scale-98 flex items-center justify-center gap-2"
        >
          <Play size={16} fill="currentColor" className="text-teal" />
          <span>{t('auth.demoAction')}</span>
        </button>

        {/* Toggle Sign Up / Sign In */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
            }}
            className="text-xs font-bold text-teal hover:underline"
          >
            {isSignUp ? t('auth.switchToSignIn') : t('auth.switchToSignUp')}
          </button>
        </div>

        {/* Child Safety Tag */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-ink-muted text-center pt-1 border-t border-sand">
          <ShieldCheck size={14} className="text-leaf" />
          <span>{t('auth.ageNote')}</span>
        </div>
      </div>
    </div>
  );
};
