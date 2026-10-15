import { UserProfile, StandardGrade, AgeMode } from '../types';
import { LocalStorageAdapter } from './storageAdapter';
import { SupabaseAdapter } from './supabaseAdapter';

export interface IAuthService {
  getCurrentUser(): Promise<UserProfile | null>;
  signIn(email: string): Promise<UserProfile>;
  signUp(email: string, displayName: string, grade: StandardGrade, isChild?: boolean): Promise<UserProfile>;
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


  async signIn(email: string): Promise<UserProfile> {
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
    isChild = true
  ): Promise<UserProfile> {
    const ageMode: AgeMode = grade <= 3 ? 'sprouts' : grade <= 6 ? 'explorers' : 'scholars';
    const newProfile: UserProfile = {
      id: 'usr-' + Math.random().toString(36).substring(2, 9),
      email,
      display_name: displayName,
      interface_language: 'en',
      grade,
      age_mode: ageMode,
      is_child: isChild,
      parental_consent: !isChild, // If under 13, consent flow is triggered
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
