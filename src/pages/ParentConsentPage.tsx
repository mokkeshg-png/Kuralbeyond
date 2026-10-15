import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { authService } from '../services/authService';

export const ParentConsentPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isTa = i18n.language === 'ta';

  const [parentEmail, setParentEmail] = useState('');
  const [code, setCode] = useState('7842'); // pre-fill mock code for seamless testing
  const [hasAgreed, setHasAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasAgreed) {
      setError(isTa ? 'பெற்றோர் ஒப்புதல் பெட்டியைத் தேர்ந்தெடுக்கவும்' : 'Please check the parental consent box to proceed');
      return;
    }

    const success = await authService.verifyParentalConsent(parentEmail || 'parent@example.com', code);
    if (success) {
      navigate('/onboarding');
    } else {
      setError(isTa ? 'செல்லுபடியாகாத 4-இலக்க குறியீடு' : 'Please enter a valid 4-digit code (e.g. 7842)');
    }
  };

  return (
    <div className="min-h-screen bg-paper bg-kolam-subtle flex flex-col items-center justify-center p-4">
      <div className="max-w-lg w-full bg-paper rounded-3xl border-4 border-sand shadow-card-elevated p-6 sm:p-8 space-y-6 animate-pop">
        {/* Header with Shield */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-teal-surface border-2 border-teal/20 text-teal mx-auto flex items-center justify-center shadow-sm">
            <ShieldCheck size={36} className="text-leaf" />
          </div>
          <h1 className="font-heading font-extrabold text-2xl text-ink">
            {t('parentConsent.title')}
          </h1>
          <p className="text-xs text-ink-muted leading-relaxed">
            {t('parentConsent.subtitle')}
          </p>
        </div>

        {/* COPPA Safe Highlights */}
        <div className="bg-paper-dark p-4 rounded-2xl border border-sand space-y-2.5 text-xs">
          <div className="flex items-start gap-2">
            <CheckCircle2 size={16} className="text-leaf flex-shrink-0 mt-0.5" />
            <span>Zero advertising, zero third-party commercial analytics.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 size={16} className="text-leaf flex-shrink-0 mt-0.5" />
            <span>Pronunciation audio is stored strictly on this device and auto-deleted.</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 size={16} className="text-leaf flex-shrink-0 mt-0.5" />
            <span>Full parent visibility with download and deletion rights at any time.</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-ink mb-1.5">
              {t('parentConsent.parentEmailLabel')}
            </label>
            <input
              type="email"
              value={parentEmail}
              onChange={e => setParentEmail(e.target.value)}
              placeholder="parent@example.com"
              className="w-full px-4 py-3 rounded-2xl bg-paper-dark border-2 border-sand focus:border-teal focus:outline-none text-sm font-semibold text-ink"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-ink">
                {t('parentConsent.verificationCodeLabel')}
              </label>
              <span className="text-[10px] text-teal font-semibold">
                Test code: 7842
              </span>
            </div>
            <div className="relative">
              <input
                type="text"
                maxLength={4}
                value={code}
                onChange={e => setCode(e.target.value)}
                placeholder="4-digit code"
                className="w-full px-4 py-3 rounded-2xl bg-paper-dark border-2 border-sand focus:border-teal focus:outline-none text-center text-lg font-mono tracking-widest text-ink font-bold"
                required
              />
              <Lock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-muted" />
            </div>
          </div>

          <label className="flex items-start gap-3 p-3 rounded-2xl bg-sand/30 border border-sand cursor-pointer">
            <input
              type="checkbox"
              checked={hasAgreed}
              onChange={e => setHasAgreed(e.target.checked)}
              className="mt-1 w-4 h-4 rounded text-teal focus:ring-teal"
            />
            <span className="text-xs text-ink font-medium leading-relaxed">
              {t('parentConsent.consentCheckbox')}
            </span>
          </label>

          {error && (
            <p className="text-xs font-bold text-maroon bg-maroon/10 p-2.5 rounded-xl text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-teal hover:bg-teal-light text-white font-extrabold rounded-2xl text-sm shadow-md hover:shadow-lg transition-all active:scale-98 flex items-center justify-center gap-2"
          >
            <span>{t('parentConsent.verifyAndProceed')}</span>
            <ArrowRight size={18} />
          </button>

          <button
            type="button"
            onClick={async () => {
              await authService.verifyParentalConsent('parent@example.com', '7842');
              navigate('/onboarding');
            }}
            className="w-full py-2.5 bg-paper-dark hover:bg-sand border-2 border-sand text-ink font-bold rounded-2xl text-xs transition-all active:scale-95 text-center"
          >
            {isTa ? 'மாதிரி ஒப்புதலுடன் தொடர்க (Demo Consent)' : 'Continue with Demo Consent (Instant)'}
          </button>

          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => navigate('/auth')}
              className="text-xs font-bold text-teal hover:underline"
            >
              ← {isTa ? 'உள்நுழைவுக்குத் திரும்பவும்' : 'Back to Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
