import { UserProfile, StandardGrade, AgeMode } from '../types';
import { LocalStorageAdapter } from './storageAdapter';
import { SupabaseAdapter } from './supabaseAdapter';
import { supabase, isSupabaseConfigured, checkSupabaseConnection } from './supabaseClient';

export interface IAuthService {
  getCurrentUser(): Promise<UserProfile | null>;
  signIn(email: string, password?: string): Promise<UserProfile>;
  signUp(
    email: string,
    password: string,
    displayName: string,
    grade: StandardGrade,
    isChild?: boolean,
  ): Promise<UserProfile>;
  verifyParentalConsent(parentEmail: string, verificationCode: string): Promise<boolean>;
  updateProfile(updates: Partial<UserProfile>): Promise<UserProfile>;
  signOut(): Promise<void>;
  enableDemoMode(): Promise<UserProfile>;
  restoreSession(): Promise<UserProfile | null>;
}

export class AuthService implements IAuthService {
  // ── Restore session after browser refresh ────────────────────────────────
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

  // ── Get current authenticated user ───────────────────────────────────────
  // IMPORTANT: when Supabase IS configured, we do NOT fall back to
  // localStorage if the user is not authenticated. Silent localStorage
  // "success" on other devices is the root cause of the multi-device bug.
  async getCurrentUser(): Promise<UserProfile | null> {
    if (!isSupabaseConfigured()) return LocalStorageAdapter.getProfile();
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return null; // unauthenticated
      const user = await SupabaseAdapter.getCurrentUser();
      if (user) LocalStorageAdapter.setProfile(user);
      return user;
    } catch {
      return null;
    }
  }

  // ── Sign in ───────────────────────────────────────────────────────────────
  async signIn(email: string, password?: string): Promise<UserProfile> {
    if (!isSupabaseConfigured()) {
      // Offline / demo fallback only
      const current = LocalStorageAdapter.getProfile();
      const updated: UserProfile = {
        ...current,
        email,
        updated_at: new Date().toISOString(),
      };
      LocalStorageAdapter.setProfile(updated);
      return updated;
    }

    if (!password) {
      throw new Error('Password is required for Supabase authentication.');
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    if (!data.user) throw new Error('Sign-in succeeded but no user was returned.');

    const profile = await SupabaseAdapter.getCurrentUser();
    if (!profile) {
      throw new Error('Your profile could not be loaded. Please contact support.');
    }
    LocalStorageAdapter.setProfile(profile);
    return profile;
  }

  // ── Sign up ───────────────────────────────────────────────────────────────
  // Creates auth account; the DB trigger handle_new_user automatically
  // creates public.users, public.profiles, streaks, and user_roles.
  async signUp(
    email: string,
    password: string,
    displayName: string,
    grade: StandardGrade,
    isChild = true,
  ): Promise<UserProfile> {
    const ageMode: AgeMode =
      grade <= 3 ? 'sprouts' : grade <= 6 ? 'explorers' : 'scholars';

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
      (newProfile as any).auth_user_id = newProfile.id;
      LocalStorageAdapter.setProfile(newProfile);
      return newProfile;
    }

    // Verify connectivity to the correct shared Supabase project BEFORE
    // attempting signup. This catches "wrong URL / no internet" early.
    const conn = await checkSupabaseConnection();
    if (!conn.ok) {
      throw new Error(
        `Cannot reach Supabase (${conn.url}). ` +
        `Check your internet connection and environment configuration. ` +
        (conn.error ?? '')
      );
    }

    // Register via Supabase Auth. Metadata is picked up by handle_new_user
    // trigger to populate public.users and public.profiles automatically.
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name:          displayName,
          display_name:       displayName,
          grade:              String(grade),
          age_mode:           ageMode,
          is_child:           String(isChild),
          avatar_id:          'avatar-kili',
          interface_language: 'en',
        },
      },
    });

    if (error) throw new Error(error.message);
    if (!data.user) throw new Error('Registration failed: no user returned from Supabase.');

    // When email confirmation is required, data.session is null.
    // Return a provisional profile flagged for the UI.
    if (!data.session) {
      const provisional: UserProfile = {
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
      // Flag so AuthPage can show "check your email" message
      (provisional as any).__emailConfirmationRequired = true;
      (provisional as any).auth_user_id = data.user.id;
      LocalStorageAdapter.setProfile(provisional);
      return provisional;
    }

    // Email confirmation is off — trigger already ran. Allow a short delay
    // for the trigger to commit before we query the profile.
    await new Promise(r => setTimeout(r, 600));

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
    (localProfile as any).auth_user_id = data.user.id;
    LocalStorageAdapter.setProfile(localProfile);
    return localProfile;
  }

  // ── Parental consent ──────────────────────────────────────────────────────
  async verifyParentalConsent(
    parentEmail: string,
    verificationCode: string,
  ): Promise<boolean> {
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
        await SupabaseAdapter.updateProfile({
          parental_consent: true,
          parent_email: parentEmail,
        });
      }
      return true;
    }
    return false;
  }

  // ── Update profile ────────────────────────────────────────────────────────
  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    const updated = await SupabaseAdapter.updateProfile(updates);
    LocalStorageAdapter.setProfile(updated);
    return updated;
  }

  // ── Sign out ──────────────────────────────────────────────────────────────
  async signOut(): Promise<void> {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
    LocalStorageAdapter.resetAll();
  }

  // ── Demo / guest mode ─────────────────────────────────────────────────────
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
