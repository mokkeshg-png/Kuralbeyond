import { UserProfile, StandardGrade, AgeMode } from '../types';
import { LocalStorageAdapter } from './storageAdapter';
import { SupabaseAdapter } from './supabaseAdapter';
import { supabase, isSupabaseConfigured } from './supabaseClient';

export interface IAuthService {
  getCurrentUser(): Promise<UserProfile | null>;
  signIn(email: string, password: string): Promise<UserProfile>;
  signUp(email: string, password: string, displayName: string, grade: StandardGrade, isChild?: boolean): Promise<UserProfile>;
  verifyParentalConsent(parentEmail: string, verificationCode: string): Promise<boolean>;
  updateProfile(updates: Partial<UserProfile>): Promise<UserProfile>;
  signOut(): Promise<void>;
  enableDemoMode(): Promise<UserProfile>;
  restoreSession(): Promise<UserProfile | null>;
}

export class AuthService implements IAuthService {
  // ──────────────────────────────────────────────────────────────────────────
  // Restore session after browser refresh
  // ──────────────────────────────────────────────────────────────────────────
  async restoreSession(): Promise<UserProfile | null> {
    if (!isSupabaseConfigured()) return LocalStorageAdapter.getProfile();
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return null;
      return await SupabaseAdapter.getCurrentUser();
    } catch {
      return null;
    }
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Get current authenticated user
  // ──────────────────────────────────────────────────────────────────────────
  async getCurrentUser(): Promise<UserProfile | null> {
    if (!isSupabaseConfigured()) return LocalStorageAdapter.getProfile();
    const user = await SupabaseAdapter.getCurrentUser();
    if (user) {
      LocalStorageAdapter.setProfile(user); // Keep local in sync
      return user;
    }
    return null;
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Sign in with email + password
  // ──────────────────────────────────────────────────────────────────────────
  async signIn(email: string, password: string): Promise<UserProfile> {
    if (!isSupabaseConfigured()) {
      // Mock fallback for offline demo
      const current = LocalStorageAdapter.getProfile();
      const updated: UserProfile = { ...current, email, updated_at: new Date().toISOString() };
      LocalStorageAdapter.setProfile(updated);
      return updated;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    if (!data.user) throw new Error('Sign-in succeeded but no user returned.');

    // Fetch or create profile
    const profile = await SupabaseAdapter.getCurrentUser();
    if (!profile) throw new Error('Profile not found after sign-in.');
    LocalStorageAdapter.setProfile(profile);
    return profile;
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Sign up a new user
  // ──────────────────────────────────────────────────────────────────────────
  async signUp(
    email: string,
    password: string,
    displayName: string,
    grade: StandardGrade,
    isChild = true
  ): Promise<UserProfile> {
    const ageMode: AgeMode = grade <= 3 ? 'sprouts' : grade <= 6 ? 'explorers' : 'scholars';

    if (!isSupabaseConfigured()) {
      const newProfile: UserProfile = {
        id: 'usr-' + Math.random().toString(36).substring(2, 9),
        email,
        display_name: displayName,
        interface_language: 'en',
        grade,
        age_mode: ageMode,
        is_child: isChild,
        parental_consent: !isChild,
        avatar_id: 'avatar-kili',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      LocalStorageAdapter.setProfile(newProfile);
      return newProfile;
    }

    // Register with Supabase Auth — pass profile metadata for the trigger
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
          grade: grade.toString(),
          age_mode: ageMode,
          is_child: isChild.toString(),
          avatar_id: 'avatar-kili',
          interface_language: 'en',
        },
      },
    });

    if (error) throw new Error(error.message);
    if (!data.user) throw new Error('Sign-up failed: no user returned.');

    // The DB trigger handle_new_user creates the profile automatically.
    // Poll briefly to allow trigger to commit, then fetch.
    await new Promise(r => setTimeout(r, 500));
    const profile = await SupabaseAdapter.getCurrentUser();

    const localProfile: UserProfile = profile ?? {
      id: data.user.id,
      email,
      display_name: displayName,
      interface_language: 'en',
      grade,
      age_mode: ageMode,
      is_child: isChild,
      parental_consent: !isChild,
      avatar_id: 'avatar-kili',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    LocalStorageAdapter.setProfile(localProfile);
    return localProfile;
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Parental consent verification
  // ──────────────────────────────────────────────────────────────────────────
  async verifyParentalConsent(parentEmail: string, verificationCode: string): Promise<boolean> {
    if (verificationCode.trim().length === 4) {
      const current = LocalStorageAdapter.getProfile();
      const updated: UserProfile = {
        ...current,
        parental_consent: true,
        parent_email: parentEmail,
        updated_at: new Date().toISOString(),
      };
      LocalStorageAdapter.setProfile(updated);
      if (isSupabaseConfigured()) {
        await SupabaseAdapter.updateProfile({ parental_consent: true, parent_email: parentEmail });
      }
      return true;
    }
    return false;
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Update profile fields
  // ──────────────────────────────────────────────────────────────────────────
  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    const updated = await SupabaseAdapter.updateProfile(updates);
    LocalStorageAdapter.setProfile(updated);
    return updated;
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Sign out
  // ──────────────────────────────────────────────────────────────────────────
  async signOut(): Promise<void> {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
    // Reset local storage to defaults so next visitor starts fresh
    LocalStorageAdapter.resetAll();
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Demo / guest mode (no real auth)
  // ──────────────────────────────────────────────────────────────────────────
  async enableDemoMode(): Promise<UserProfile> {
    const demoProfile: UserProfile = {
      id: 'usr-demo-guest',
      email: 'guest@kuralbeyond.demo',
      display_name: 'Explorer Guest',
      interface_language: 'en',
      grade: 4,
      age_mode: 'explorers',
      is_child: false,
      parental_consent: true,
      avatar_id: 'avatar-kili',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    LocalStorageAdapter.setProfile(demoProfile);
    return demoProfile;
  }
}

export const authService = new AuthService();
