import { UserProfile, StandardGrade, AgeMode } from '../types';
import { LocalStorageAdapter } from './storageAdapter';
import { SupabaseAdapter } from './supabaseAdapter';
import { supabase, isSupabaseConfigured } from './supabaseClient';

export interface IAuthService {
  getCurrentUser(): Promise<UserProfile | null>;
  signIn(email: string, password?: string): Promise<UserProfile>;
  signUp(email: string, displayName: string, grade: StandardGrade, isChild?: boolean, password?: string): Promise<UserProfile>;
  verifyParentalConsent(parentEmail: string, verificationCode: string): Promise<boolean>;
  updateProfile(updates: Partial<UserProfile>): Promise<UserProfile>;
  signOut(): Promise<void>;
  enableDemoMode(): Promise<UserProfile>;
}

export class AuthService implements IAuthService {
  async getCurrentUser(): Promise<UserProfile | null> {
    const user = await SupabaseAdapter.getCurrentUser();
    return user || LocalStorageAdapter.getProfile();
  }


  async signIn(email: string, password?: string): Promise<UserProfile> {
    // If Supabase is configured and a password was supplied, use real auth
    if (isSupabaseConfigured() && password) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw new Error(error.message);
      if (data.user) {
        // Try to load profile from Supabase
        const profile = await SupabaseAdapter.getCurrentUser();
        if (profile) return profile;
      }
    }

    // Fallback: local-only session (existing behaviour)
    const current = LocalStorageAdapter.getProfile();
    const updated: UserProfile = {
      ...current,
      email,
      updated_at: new Date().toISOString(),
    };
    LocalStorageAdapter.setProfile(updated);
    return updated;
  }

  async signUp(
    email: string, 
    displayName: string, 
    grade: StandardGrade, 
    isChild = true,
    password?: string
  ): Promise<UserProfile> {
    const ageMode: AgeMode = grade <= 3 ? 'sprouts' : grade <= 6 ? 'explorers' : 'scholars';

    // ── Real Supabase Auth signup ──────────────────────────────────────────
    if (isSupabaseConfigured() && password) {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { display_name: displayName } },
      });

      if (authError) throw new Error(authError.message);

      if (authData.user) {
        const authUserId = authData.user.id;

        // Insert profile row; use the auth UUID as user_id
        const profileRow = {
          user_id: authUserId,
          display_name: displayName,
          interface_language: 'en' as const,
          grade,
          age_mode: ageMode,
          is_child: isChild,
          parental_consent: !isChild,
          avatar_id: 'avatar-kili',
        };

        const { data: inserted, error: insertError } = await supabase
          .from('profiles')
          .insert(profileRow)
          .select()
          .single();

        if (insertError) {
          console.warn('[authService.signUp] Profile insert failed:', insertError.message);
        }

        const profileId: string = (inserted as any)?.id ?? authUserId;

        const newProfile: UserProfile = {
          id: profileId,
          email,
          display_name: displayName,
          interface_language: 'en',
          grade,
          age_mode: ageMode,
          is_child: isChild,
          parental_consent: !isChild,
          avatar_id: 'avatar-kili',
          created_at: (inserted as any)?.created_at ?? new Date().toISOString(),
          updated_at: (inserted as any)?.updated_at ?? new Date().toISOString(),
        };

        // Store auth UUID separately so the UI can display it
        (newProfile as any).auth_user_id = authUserId;

        SupabaseAdapter.setActiveProfileId(profileId);
        LocalStorageAdapter.setProfile(newProfile);
        return newProfile;
      }
    }

    // ── Fallback: local-only (no Supabase / no password supplied) ──────────
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

  async verifyParentalConsent(parentEmail: string, verificationCode: string): Promise<boolean> {
    // Mock realistic 4-digit code verification
    if (verificationCode.trim().length === 4) {
      const current = LocalStorageAdapter.getProfile();
      const updated: UserProfile = {
        ...current,
        parental_consent: true,
        parent_email: parentEmail,
        updated_at: new Date().toISOString(),
      };
      LocalStorageAdapter.setProfile(updated);
      return true;
    }
    return false;
  }

  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    const updated = await SupabaseAdapter.updateProfile(updates);
    LocalStorageAdapter.setProfile(updated);
    return updated;
  }


  async signOut(): Promise<void> {
    // Keep local progress intact, but mark session if needed
  }

  async enableDemoMode(): Promise<UserProfile> {
    const demoProfile: UserProfile = {
      id: 'usr-demo-guest',
      email: 'guest@tamilpalam.demo',
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
