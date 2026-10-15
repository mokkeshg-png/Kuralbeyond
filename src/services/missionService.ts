import { RealLifeMission } from '../types';
import { LocalStorageAdapter } from './storageAdapter';

export interface IMissionService {
  getMissions(): Promise<RealLifeMission[]>;
  completeMission(missionId: string, reflection?: string): Promise<RealLifeMission | null>;
}

export class MissionService implements IMissionService {
  async getMissions(): Promise<RealLifeMission[]> {
    return LocalStorageAdapter.getMissions();
  }

  async completeMission(missionId: string, reflection = ''): Promise<RealLifeMission | null> {
    const missions = LocalStorageAdapter.getMissions();
    const mission = missions.find(m => m.id === missionId);
    if (!mission) return null;

    if (!mission.is_completed) {
      mission.is_completed = true;
      mission.completed_at = new Date().toISOString().split('T')[0];
      mission.student_reflection = reflection;

      // Award XP
      const stats = LocalStorageAdapter.getStats();
      stats.xp += mission.xp_reward;
      LocalStorageAdapter.setStats(stats);
      LocalStorageAdapter.setMissions(missions);
    }

    return mission;
  }
}

export const missionService = new MissionService();
