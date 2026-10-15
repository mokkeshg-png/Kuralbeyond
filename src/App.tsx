import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { BottomTabs } from './components/layout/BottomTabs';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { ParentConsentPage } from './pages/ParentConsentPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { AssessmentPage } from './pages/AssessmentPage';
import { DashboardPage } from './pages/DashboardPage';
import { LevelMapPage } from './pages/LevelMapPage';
import { LessonPlayerPage } from './pages/LessonPlayerPage';
import { ResultsPage } from './pages/ResultsPage';
import { ProgressPage } from './pages/ProgressPage';
import { RevisionPage } from './pages/RevisionPage';
import { MissionsPage } from './pages/MissionsPage';
import { ProfilePage } from './pages/ProfilePage';
import { ParentDashboardPage } from './pages/ParentDashboardPage';
import { authService } from './services/authService';
import { progressService } from './services/progressService';
import { supabase, isSupabaseConfigured } from './services/supabaseClient';
import { UserProfile, UserStats } from './types';

const AppContent: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const location = useLocation();

  // Listen for Supabase auth state changes (sign in / sign out / token refresh)
  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
      if (event === 'SIGNED_OUT') {
        setProfile(null);
        setStats(null);
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION') {
        const u = await authService.getCurrentUser();
        setProfile(u);
        if (u) {
          document.documentElement.setAttribute('data-age-mode', u.age_mode);
          const s = await progressService.getStats();
          setStats(s);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    async function refreshUserState() {
      const u = await authService.getCurrentUser();
      setProfile(u);
      if (u) {
        document.documentElement.setAttribute('data-age-mode', u.age_mode);
        const s = await progressService.getStats();
        setStats(s);
      }
    }
    refreshUserState();
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar profile={profile} stats={stats} />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/parent-consent" element={<ParentConsentPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/learn" element={<LevelMapPage />} />
          <Route path="/lesson/:lessonId" element={<LessonPlayerPage />} />
          <Route path="/lesson/:lessonId/results" element={<ResultsPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/revision" element={<RevisionPage />} />
          <Route path="/missions" element={<MissionsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/parent" element={<ParentDashboardPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <BottomTabs />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
