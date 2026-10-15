import { RevisionItem } from '../types';
import { LocalStorageAdapter } from './storageAdapter';

const INTERVAL_STEPS = [1, 3, 7, 14, 30, 60];

export interface IRevisionService {
  getDueItems(): Promise<RevisionItem[]>;
  getAllItems(): Promise<RevisionItem[]>;
  recordReview(itemId: string, remembered: boolean): Promise<RevisionItem | null>;
  addToQueue(item: {
    item_type: 'letter' | 'word' | 'sentence';
    item_id: string;
    content_ta: string;
    content_tanglish: string;
    content_en: string;
    audio_id: string;
  }): Promise<RevisionItem>;
}

export class RevisionService implements IRevisionService {
  async getAllItems(): Promise<RevisionItem[]> {
    return LocalStorageAdapter.getRevisionQueue();
  }

  async getDueItems(): Promise<RevisionItem[]> {
    const queue = LocalStorageAdapter.getRevisionQueue();
    const now = new Date().toISOString();
    return queue.filter(item => item.next_review_at <= now);
  }

  async recordReview(itemId: string, remembered: boolean): Promise<RevisionItem | null> {
    const queue = LocalStorageAdapter.getRevisionQueue();
    const item = queue.find(i => i.id === itemId);
    if (!item) return null;

    if (remembered) {
      item.consecutive_correct += 1;
      const stepIndex = Math.min(item.consecutive_correct, INTERVAL_STEPS.length - 1);
      item.interval_days = INTERVAL_STEPS[stepIndex];
    } else {
      // Failed recall resets interval to 1 day per PRD Section 24
      item.consecutive_correct = 0;
      item.interval_days = 1;
    }

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + item.interval_days);
    item.next_review_at = nextDate.toISOString();

    LocalStorageAdapter.setRevisionQueue(queue);
    return item;
  }

  async addToQueue(data: {
    item_type: 'letter' | 'word' | 'sentence';
    item_id: string;
    content_ta: string;
    content_tanglish: string;
    content_en: string;
    audio_id: string;
  }): Promise<RevisionItem> {
    const profile = LocalStorageAdapter.getProfile();
    const queue = LocalStorageAdapter.getRevisionQueue();

    const existing = queue.find(i => i.item_id === data.item_id);
    if (existing) {
      return existing;
    }

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1);

    const newItem: RevisionItem = {
      id: 'rev-' + Math.random().toString(36).substring(2, 9),
      profile_id: profile.id,
      item_type: data.item_type,
      item_id: data.item_id,
      content_ta: data.content_ta,
      content_tanglish: data.content_tanglish,
      content_en: data.content_en,
      audio_id: data.audio_id,
      next_review_at: nextDate.toISOString(),
      interval_days: 1,
      ease_factor: 2.5,
      consecutive_correct: 0,
    };

    queue.push(newItem);
    LocalStorageAdapter.setRevisionQueue(queue);
    return newItem;
  }
}

export const revisionService = new RevisionService();
