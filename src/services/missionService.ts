import { RealLifeMission } from '../types';
import { LocalStorageAdapter } from './storageAdapter';
import { SupabaseAdapter } from './supabaseAdapter';
import { supabase, isSupabaseConfigured } from './supabaseClient';

export interface IMissionService {
  getMissions(): Promise<RealLifeMission[]>;
  completeMission(missionId: string, reflection?: string): Promise<RealLifeMission | null>;
}

/** Returns true when profileId is a demo/default local profile that should not write to Supabase. */
function isDemoProfile(profileId: string | null): boolean {
  if (!profileId) return true;
  return profileId === 'usr-demo-guest' || profileId.startsWith('usr-default');
}

export class MissionService implements IMissionService {
  async getMissions(): Promise<RealLifeMission[]> {
    if (isSupabaseConfigured()) {
      try {
        const { data: missionRows, error: mErr } = await supabase
          .from('missions')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: true });

        if (!mErr && missionRows && (missionRows as any[]).length > 0) {
          const profileId = SupabaseAdapter.getActiveProfileId();

          // Fetch mission_progress for current profile in one query
          let progressMap = new Map<string, any>();
          if (profileId && !isDemoProfile(profileId)) {
            const { data: progressRows } = await supabase
              .from('mission_progress')
              .select('*')
              .eq('profile_id', profileId);
            if (progressRows) {
              for (const row of progressRows as any[]) {
                progressMap.set(row.mission_id, row);
              }
            }
          }

          return (missionRows as any[]).map((row: any): RealLifeMission => {
            const progress = progressMap.get(row.id);
            return {
              id: row.id,
              level_number: 1,
              title_en: row.title_en,
              title_ta: row.title_ta,
              prompt_en: row.description_en || '',
              prompt_ta: row.description_ta || '',
              category: 'family' as RealLifeMission['category'],
              target_words_ta: [],
              target_words_en: [],
              xp_reward: row.xp_reward,
              is_completed: progress?.is_completed ?? false,
              completed_at: progress?.completed_at ?? undefined,
              student_reflection: undefined,
            };
          });
        }
      } catch (e) {
        console.warn('[MissionService.getMissions] Supabase error, falling back to localStorage', e);
      }
    }

    // Fallback: localStorage
    return LocalStorageAdapter.getMissions();
  }

  async completeMission(missionId: string, reflection = ''): Promise<RealLifeMission | null> {
    // 1. Existing localStorage update (always runs first)
    const missions = LocalStorageAdapter.getMissions();
    const mission = missions.find(m => m.id === missionId);
    if (!mission) return null;

    if (!mission.is_completed) {
      mission.is_completed = true;
      mission.completed_at = new Date().toISOString().split('T')[0];
      mission.student_reflection = reflection;

      // Award XP locally
      const stats = LocalStorageAdapter.getStats();
      stats.xp += mission.xp_reward;
      LocalStorageAdapter.setStats(stats);
      LocalStorageAdapter.setMissions(missions);
    }

    // 2. Supabase sync (best-effort — localStorage already updated)
    if (isSupabaseConfigured()) {
      const profileId = SupabaseAdapter.getActiveProfileId();
      if (!isDemoProfile(profileId)) {
        const now = new Date().toISOString();
        try {
          await (supabase
            .from('mission_progress')
            .upsert(
              {
                profile_id: profileId!,
                mission_id: missionId,
                is_completed: true,
                completed_at: now,
                current_count: 1,
                period_start: now.split('T')[0],
                updated_at: now,
              },
              { onConflict: 'profile_id,mission_id' }
            ) as any);
        } catch (e) {
          console.warn('[MissionService.completeMission] mission_progress upsert failed', e);
        }

        try {
          await (supabase
            .from('xp_ledger')
            .insert({
              profile_id: profileId!,
              amount: mission.xp_reward,
              reason: 'mission_completed',
              source_id: missionId,
            }) as any);
        } catch (e) {
          console.warn('[MissionService.completeMission] xp_ledger insert failed', e);
        }
      }
    }

    return mission;
  }
}

export const missionService = new MissionService();
