import { supabase, isSupabaseConfigured } from './supabaseClient';
import { LocalStorageAdapter } from './storageAdapter';
import { 
  UserProfile, 
  QuizAttempt, 
  LearnerSkillMastery, 
  RevisionItem, 
  UserStats,
  ParentSummary,
  LearningLevel,
  Lesson,
  Exercise,
  SkillType,
  TanglishStage,
  StandardGrade,
  AgeMode
} from '../types';

export class SupabaseAdapter {
  private static activeProfileId: string | null = null;

  static setActiveProfileId(id: string | null) {
    this.activeProfileId = id;
  }

  static getActiveProfileId(): string | null {
    return this.activeProfileId;
  }

  // ==========================================
  // Auth & Profile
  // ==========================================
  static async getCurrentUser(): Promise<UserProfile | null> {
    if (!isSupabaseConfigured()) {
      return LocalStorageAdapter.getProfile();
    }

    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session?.user) {
        return LocalStorageAdapter.getProfile();
      }

      // Query profile matching user_id or active child profile
      let query: any = supabase
        .from('profiles')
        .select('*');

      if (this.activeProfileId) {
        query = query.eq('id', this.activeProfileId);
      } else {
        query = query.or(`user_id.eq.${session.user.id},parent_user_id.eq.${session.user.id}`);
      }

      const { data: profiles, error: pErr } = await query.limit(1);

      if (pErr || !profiles || (profiles as any[]).length === 0) {
        return LocalStorageAdapter.getProfile();
      }

      const p: any = (profiles as any[])[0];
      const profile: UserProfile = {
        id: p.id,
        email: session.user.email || p.parent_email || 'learner@kuralbeyond.edu',
        display_name: p.display_name,
        interface_language: p.interface_language,
        grade: p.grade as StandardGrade,
        age_mode: p.age_mode as AgeMode,
        is_child: p.is_child,
        parental_consent: p.parental_consent,
        parent_email: p.parent_email || undefined,
        parent_phone: p.parent_phone || undefined,
        avatar_id: p.avatar_id,
        created_at: p.created_at,
        updated_at: p.updated_at,
      };

      this.activeProfileId = profile.id;
      return profile;
    } catch (e) {
      console.warn('[SupabaseAdapter.getCurrentUser] Network error, fallback to local', e);
      return LocalStorageAdapter.getProfile();
    }
  }

  static async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    if (!isSupabaseConfigured()) {
      return LocalStorageAdapter.setProfile({
        ...LocalStorageAdapter.getProfile(),
        ...updates,
        updated_at: new Date().toISOString(),
      }), LocalStorageAdapter.getProfile();
    }

    const current = await this.getCurrentUser();
    if (!current) throw new Error('No active user profile');

    const updatePayload: any = {};
    if (updates.display_name !== undefined) updatePayload.display_name = updates.display_name;
    if (updates.interface_language !== undefined) updatePayload.interface_language = updates.interface_language;
    if (updates.grade !== undefined) updatePayload.grade = updates.grade;
    if (updates.age_mode !== undefined) updatePayload.age_mode = updates.age_mode;
    if (updates.is_child !== undefined) updatePayload.is_child = updates.is_child;
    if (updates.parental_consent !== undefined) updatePayload.parental_consent = updates.parental_consent;
    if (updates.parent_email !== undefined) updatePayload.parent_email = updates.parent_email;
    if (updates.parent_phone !== undefined) updatePayload.parent_phone = updates.parent_phone;
    if (updates.avatar_id !== undefined) updatePayload.avatar_id = updates.avatar_id;

    const { data, error } = await (supabase
      .from('profiles')
      .update(updatePayload)
      .eq('id', current.id)
      .select()
      .single() as any);

    if (error || !data) {
      console.warn('[SupabaseAdapter.updateProfile] Error updating in Supabase, fallback', error);
      return LocalStorageAdapter.setProfile({ ...current, ...updates }), LocalStorageAdapter.getProfile();
    }

    return {
      ...current,
      ...updates,
      updated_at: (data as any).updated_at,
    };
  }

  // ==========================================
  // Curriculum (Single Query, Zero N+1)
  // ==========================================
  static async getLevels(): Promise<LearningLevel[]> {
    if (!isSupabaseConfigured()) {
      return null as any; // Trigger fallback in curriculumService
    }

    try {
      const profile = await this.getCurrentUser();
      const profileId = profile?.id;

      const { data: levels, error: lErr } = await supabase
        .from('learning_levels')
        .select('*')
        .order('level_number', { ascending: true });

      if (lErr || !levels || (levels as any[]).length === 0) return null as any;

      // Fetch user's completed lessons in single query
      const { data: progressList } = await supabase
        .from('lesson_progress')
        .select('lesson_id, status')
        .eq('profile_id', profileId || '')
        .eq('status', 'completed');

      const completedSet = new Set((progressList || []).map((p: any) => p.lesson_id));

      const { data: allLessons } = await supabase
        .from('lessons')
        .select('id, level_number');

      return (levels as any[]).map((lvl: any) => {
        const lvlLessons = (allLessons || []).filter((l: any) => l.level_number === lvl.level_number);
        const completedCount = lvlLessons.filter((l: any) => completedSet.has(l.id)).length;
        const isCompleted = lvlLessons.length > 0 && completedCount === lvlLessons.length;
        const isUnlocked = lvl.level_number <= 1 || completedCount > 0;

        return {
          id: lvl.id,
          level_number: lvl.level_number,
          title_en: lvl.name_en,        // DB: name_en → FE: title_en
          title_ta: lvl.name_ta,        // DB: name_ta → FE: title_ta
          description_en: lvl.description_en || '',
          description_ta: lvl.description_ta || '',
          cefr: lvl.cefr,
          estimated_minutes: lvl.total_lessons * 10 || 30,  // estimated from lesson count
          total_lessons: lvlLessons.length || lvl.total_lessons,
          completed_lessons: completedCount,
          is_unlocked: isUnlocked,
          is_completed: isCompleted,
          icon: lvl.icon,
        };
      });
    } catch {
      return null as any;
    }
  }

  static async getLessonsByLevel(levelNumber: number): Promise<Lesson[]> {
    if (!isSupabaseConfigured()) return null as any;

    try {
      const profile = await this.getCurrentUser();
      const profileId = profile?.id;

      const { data: lessons, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('level_number' as any, levelNumber)
        .order('display_order', { ascending: true });

      if (error || !lessons) return null as any;

      const { data: progressList } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('profile_id', profileId || '');

      const progressMap = new Map((progressList || []).map((p: any) => [p.lesson_id, p]));

      return (lessons as any[]).map((l: any) => {
        const p: any = progressMap.get(l.id);
        return {
          id: l.id,
          level_id: l.level_id,
          level_number: l.level_number,
          title_en: l.title_en,
          title_ta: l.title_ta,
          description_en: l.description_en || '',
          description_ta: l.description_ta || '',
          sequence_order: l.sequence_order || l.display_order,
          lesson_type: l.lesson_type,
          estimated_minutes: l.estimated_minutes,
          tanglish_stage: l.tanglish_stage,
          items_count: l.items_count,
          is_completed: p?.status === 'completed',
          score: p?.accuracy_percentage,        // DB: accuracy_percentage → FE: score
          last_item_index: p?.current_item_index || 0,  // DB: current_item_index → FE: last_item_index
        };
      });
    } catch {
      return null as any;
    }
  }

  static async getLessonExercises(lessonId: string): Promise<Exercise[]> {
    if (!isSupabaseConfigured()) return null as any;

    try {
      // Single query with nested relation: exercises -> questions -> answer_options
      const { data: exercises, error } = await supabase
        .from('exercises')
        .select(`
          id,
          lesson_id,
          exercise_type,
          prompt_en,
          prompt_ta,
          sequence_order,
          questions (
            id,
            exercise_id,
            exercise_type,
            prompt_en,
            prompt_ta,
            audio_prompt_id,
            audio_id,
            content_ta,
            content_tanglish,
            content_en,
            correct_answer,
            explanation_en,
            explanation_ta,
            word_bank,
            ordered_solution,
            pairs,
            reading_passage_ta,
            reading_passage_tanglish,
            story_panels,
            tracing_data,
            sequence_order,
            answer_options (
              id,
              option_text,
              option_tanglish,
              option_en,
              is_correct,
              audio_id,
              image_url
            )
          )
        `)
        .eq('lesson_id', lessonId)
        .order('sequence_order', { ascending: true });

      if (error || !exercises || (exercises as any[]).length === 0) return null as any;

      return (exercises as any[]).map((ex: any) => ({
        id: ex.id,
        lesson_id: ex.lesson_id,
        exercise_type: ex.exercise_type,
        prompt_en: ex.prompt_en,
        prompt_ta: ex.prompt_ta,
        sequence_order: ex.sequence_order,
        questions: (ex.questions || []).map((q: any) => ({
          id: q.id,
          exercise_id: q.exercise_id,
          exercise_type: q.exercise_type,
          prompt_en: q.prompt_en,
          prompt_ta: q.prompt_ta,
          audio_prompt_id: q.audio_prompt_id,
          audio_id: q.audio_id,
          content_ta: q.content_ta,
          content_tanglish: q.content_tanglish,
          content_en: q.content_en,
          correct_answer: q.correct_answer,
          explanation_en: q.explanation_en,
          explanation_ta: q.explanation_ta,
          word_bank: q.word_bank,
          ordered_solution: q.ordered_solution,
          pairs: q.pairs,
          reading_passage_ta: q.reading_passage_ta,
          reading_passage_tanglish: q.reading_passage_tanglish,
          story_panels: q.story_panels,
          tracing_data: q.tracing_data,
          options: (q.answer_options || []).map((opt: any) => ({
            id: opt.id,
            option_text: opt.option_text,
            option_tanglish: opt.option_tanglish,
            option_en: opt.option_en,
            is_correct: opt.is_correct,
            audio_id: opt.audio_id,
            image_url: opt.image_url,
          })),
        })),
      }));
    } catch {
      return null as any;
    }
  }

  // ==========================================
  // Progress & Gamification (Server-Authoritative RPCs)
  // ==========================================
  static async getStats(): Promise<UserStats> {
    if (!isSupabaseConfigured()) return LocalStorageAdapter.getStats();

    try {
      const profile = await this.getCurrentUser();
      if (!profile) return LocalStorageAdapter.getStats();

      const { data, error } = await (supabase.rpc as any)('get_dashboard_summary', {
        p_profile_id: profile.id,
      });

      if (error || !data) {
        return LocalStorageAdapter.getStats();
      }

      const res: any = data;
      return {
        xp: res.xp || 0,
        streak_days: res.streak_days || 0,
        streak_freeze_available: res.streak_freeze_available ?? true,
        streak_freeze_active: res.streak_freeze_active ?? false,
        last_streak_date: res.last_streak_date || new Date().toISOString().split('T')[0],
        script_power_stage: (res.script_power_stage || 'A') as TanglishStage,
        script_power_percentage: res.script_power_percentage || 10,
        words_learned: res.words_learned || 0,
        letters_mastered: res.letters_mastered || 0,
        daily_goal_progress: res.daily_goal_progress || 0,
        daily_goal_target: res.daily_goal_target || 1,
      };
    } catch {
      return LocalStorageAdapter.getStats();
    }
  }

  static async completeLesson(
    lessonId: string,
    correctCount: number,
    totalCount: number,
    timeSpentSeconds: number
  ): Promise<QuizAttempt> {
    if (!isSupabaseConfigured()) {
      return null as any; // Fallback to local
    }

    try {
      const profile = await this.getCurrentUser();
      if (!profile) return null as any;

      const idempotencyKey = `comp_${profile.id}_${lessonId}_${Date.now()}`;

      const accuracyPct = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 100;

      const { data, error } = await (supabase.rpc as any)('complete_lesson', {
        p_profile_id: profile.id,
        p_lesson_id: lessonId,
        p_accuracy_percentage: accuracyPct,
        p_time_spent_seconds: timeSpentSeconds,
        p_idempotency_key: idempotencyKey,
      });

      if (error || !data) {
        console.warn('[Supabase complete_lesson RPC error]', error);
        return null as any;
      }

      const res: any = data;
      return {
        id: res.quiz_attempt_id || 'qa-' + Math.random().toString(36).substring(2, 9),
        profile_id: profile.id,
        lesson_id: lessonId,
        score: res.score,
        correct_count: correctCount,
        total_count: totalCount,
        time_spent_seconds: timeSpentSeconds,
        created_at: new Date().toISOString(),
        weak_item_ids: [],
      };
    } catch {
      return null as any;
    }
  }

  static async submitItemAnswer(
    skillType: SkillType,
    itemId: string,
    isCorrect: boolean,
    difficultyModifier = 1.0
  ): Promise<LearnerSkillMastery | null> {
    if (!isSupabaseConfigured()) return null;

    try {
      const profile = await this.getCurrentUser();
      if (!profile) return null;

      const { data, error } = await (supabase.rpc as any)('submit_item_answer', {
        p_profile_id: profile.id,
        p_lesson_id: itemId,  // item_id used as lesson_id reference
        p_item_id: itemId,
        p_is_correct: isCorrect,
        p_response_time_ms: Math.round(difficultyModifier * 1000),
        p_quality: isCorrect ? 4 : 1,
      });

      if (error || !data) return null;

      const res: any = data;
      return {
        id: 'sm-' + itemId,
        profile_id: profile.id,
        skill_type: skillType,
        skill_item_id: itemId,
        mastery_score: res.mastery_score,
        attempts: 1,
        correct: isCorrect ? 1 : 0,
        last_attempted_at: new Date().toISOString(),
        tanglish_stage: res.tanglish_stage as TanglishStage,
      };
    } catch {
      return null;
    }
  }

  // ==========================================
  // Spaced Repetition (Revision Queue)
  // ==========================================
  static async getDueRevisionItems(): Promise<RevisionItem[]> {
    if (!isSupabaseConfigured()) return LocalStorageAdapter.getRevisionQueue();

    try {
      const profile = await this.getCurrentUser();
      if (!profile) return LocalStorageAdapter.getRevisionQueue();

      const { data, error } = await supabase
        .from('revision_queue')
        .select('*')
        .eq('profile_id', profile.id)
        .lte('next_review_at', new Date().toISOString());

      if (error || !data) return LocalStorageAdapter.getRevisionQueue();

      return (data as any[]).map((d: any) => ({
        id: d.id,
        profile_id: d.profile_id,
        item_type: d.item_type,
        item_id: d.item_id,
        content_ta: d.content_ta,
        content_tanglish: d.content_tanglish || '',
        content_en: d.content_en || '',
        audio_id: d.audio_id || '',
        next_review_at: d.next_review_at,
        interval_days: d.interval_days,
        ease_factor: d.ease_factor,
        consecutive_correct: d.consecutive_correct,
      }));
    } catch {
      return LocalStorageAdapter.getRevisionQueue();
    }
  }

  // ==========================================
  // Parent Dashboard Summary
  // ==========================================
  static async getParentSummary(): Promise<ParentSummary> {
    if (!isSupabaseConfigured()) {
      return null as any;
    }

    try {
      const profile = await this.getCurrentUser();
      if (!profile) return null as any;

      const { data, error } = await (supabase.rpc as any)('get_parent_summary', {
        p_child_profile_id: profile.id,
      });

      if (error || !data) return null as any;

      const res: any = data;
      const activityLogs = LocalStorageAdapter.getActivityLogs();

      return {
        child_name: res.child_name || profile.display_name,
        grade: (res.grade || profile.grade) as StandardGrade,
        age_mode: (res.age_mode || profile.age_mode) as AgeMode,
        total_xp: res.total_xp || 0,
        current_streak: res.current_streak || 0,
        total_minutes_week: res.total_minutes_week || 45,
        completed_lessons_count: res.completed_lessons_count || 1,
        mastery_by_skill: res.mastery_by_skill || {
          letter_recognition: 0.85,
          word_reading: 0.70,
          sentence_comprehension: 0.60,
          listening: 0.80,
          speaking: 0.65,
        },
        recent_activity: activityLogs.slice(-7),
        items_needing_revision: res.items_needing_revision || 0,
      };
    } catch {
      return null as any;
    }
  }
}
