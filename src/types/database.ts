export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type GenericRelationship = {
  foreignKeyName: string;
  columns: string[];
  isOneToOne?: boolean;
  referencedRelation: string;
  referencedColumns: string[];
};

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          avatar_url: string | null;
          interface_language: 'en' | 'ta';
          learning_language: string;
          onboarding_done: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          interface_language?: 'en' | 'ta';
          learning_language?: string;
          onboarding_done?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
        Relationships: GenericRelationship[];
      };
      profiles: {
        Row: {
          id: string;
          user_id: string | null;
          parent_user_id: string | null;
          display_name: string;
          interface_language: 'en' | 'ta';
          grade: number;
          age_mode: 'sprouts' | 'explorers' | 'scholars';
          date_of_birth: string | null;
          is_child: boolean;
          parental_consent: boolean;
          parent_email: string | null;
          parent_phone: string | null;
          avatar_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          parent_user_id?: string | null;
          display_name: string;
          interface_language?: 'en' | 'ta';
          grade?: number;
          age_mode?: 'sprouts' | 'explorers' | 'scholars';
          date_of_birth?: string | null;
          is_child?: boolean;
          parental_consent?: boolean;
          parent_email?: string | null;
          parent_phone?: string | null;
          avatar_id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
        Relationships: GenericRelationship[];
      };
      user_roles: {
        Row: {
          user_id: string;
          role: 'learner' | 'parent' | 'teacher' | 'admin';
          created_at: string;
        };
        Insert: {
          user_id: string;
          role: 'learner' | 'parent' | 'teacher' | 'admin';
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['user_roles']['Insert']>;
        Relationships: GenericRelationship[];
      };
      user_preferences: {
        Row: {
          id: string;
          profile_id: string;
          daily_goal_minutes: number;
          voice_enabled: boolean;
          sfx_enabled: boolean;
          bgm_enabled: boolean;
          haptics_enabled: boolean;
          high_contrast: boolean;
          large_text: boolean;
          reduced_motion: boolean;
          offline_download: boolean;
          tanglish_subtitles: boolean;
          learning_mode: 'standard' | 'revision' | 'challenge';
          daily_reminder: boolean;
          reminder_time: string;
          recording_practice_enabled: boolean;
          updated_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          daily_goal_minutes?: number;
          voice_enabled?: boolean;
          sfx_enabled?: boolean;
          bgm_enabled?: boolean;
          haptics_enabled?: boolean;
          high_contrast?: boolean;
          large_text?: boolean;
          reduced_motion?: boolean;
          offline_download?: boolean;
          tanglish_subtitles?: boolean;
          learning_mode?: 'standard' | 'revision' | 'challenge';
          daily_reminder?: boolean;
          reminder_time?: string;
          recording_practice_enabled?: boolean;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['user_preferences']['Insert']>;
        Relationships: GenericRelationship[];
      };
      learning_levels: {
        Row: {
          id: string;
          level_number: number;
          name_en: string;
          name_ta: string;
          description_en: string | null;
          description_ta: string | null;
          curriculum_phase: 'oral_foundations' | 'letter_system' | 'word_formation' | 'reading_sentences' | 'fluency_comprehension';
          total_lessons: number;
          required_xp: number;
          unlocked_by_default: boolean;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id: string;
          level_number: number;
          name_en: string;
          name_ta: string;
          description_en?: string | null;
          description_ta?: string | null;
          curriculum_phase: 'oral_foundations' | 'letter_system' | 'word_formation' | 'reading_sentences' | 'fluency_comprehension';
          total_lessons?: number;
          required_xp?: number;
          unlocked_by_default?: boolean;
          display_order: number;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['learning_levels']['Insert']>;
        Relationships: GenericRelationship[];
      };
      lessons: {
        Row: {
          id: string;
          level_id: string;
          unit_number: number;
          lesson_number: number;
          title_en: string;
          title_ta: string;
          description_en: string | null;
          description_ta: string | null;
          lesson_type: 'letter_intro' | 'word_builder' | 'grammar_concept' | 'reading' | 'speaking' | 'quiz' | 'story' | 'review';
          prerequisite_lesson_id: string | null;
          xp_reward: number;
          pass_score_percentage: number;
          estimated_minutes: number;
          is_active: boolean;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id: string;
          level_id: string;
          unit_number?: number;
          lesson_number: number;
          title_en: string;
          title_ta: string;
          description_en?: string | null;
          description_ta?: string | null;
          lesson_type: 'letter_intro' | 'word_builder' | 'grammar_concept' | 'reading' | 'speaking' | 'quiz' | 'story' | 'review';
          prerequisite_lesson_id?: string | null;
          xp_reward?: number;
          pass_score_percentage?: number;
          estimated_minutes?: number;
          is_active?: boolean;
          display_order: number;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['lessons']['Insert']>;
        Relationships: GenericRelationship[];
      };
      lesson_items: {
        Row: {
          id: string;
          lesson_id: string;
          item_type: 'letter' | 'word' | 'sentence' | 'story_page' | 'exercise' | 'explanation';
          content_ref_id: string | null;
          order_index: number;
          instruction_en: string | null;
          instruction_ta: string | null;
          tanglish_stage: 'A' | 'B' | 'C' | 'D' | 'E';
          primary_text_ta: string | null;
          primary_text_en: string | null;
          secondary_text: string | null;
          audio_url: string | null;
          slow_audio_url: string | null;
          image_url: string | null;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id: string;
          lesson_id: string;
          item_type: 'letter' | 'word' | 'sentence' | 'story_page' | 'exercise' | 'explanation';
          content_ref_id?: string | null;
          order_index: number;
          instruction_en?: string | null;
          instruction_ta?: string | null;
          tanglish_stage?: 'A' | 'B' | 'C' | 'D' | 'E';
          primary_text_ta?: string | null;
          primary_text_en?: string | null;
          secondary_text?: string | null;
          audio_url?: string | null;
          slow_audio_url?: string | null;
          image_url?: string | null;
          metadata?: Json;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['lesson_items']['Insert']>;
        Relationships: GenericRelationship[];
      };
      tamil_letters: {
        Row: {
          id: string;
          character: string;
          letter_type: 'uyir' | 'mei' | 'uyirmei' | 'aaydham' | 'grantha';
          base_consonant: string | null;
          vowel_sign: string | null;
          transliteration_iso: string;
          transliteration_ipa: string;
          audio_asset_id: string | null;
          stroke_order_data: Json | null;
          frequency_rank: number | null;
          needs_review: boolean;
        };
        Insert: {
          id: string;
          character: string;
          letter_type: 'uyir' | 'mei' | 'uyirmei' | 'aaydham' | 'grantha';
          base_consonant?: string | null;
          vowel_sign?: string | null;
          transliteration_iso: string;
          transliteration_ipa: string;
          audio_asset_id?: string | null;
          stroke_order_data?: Json | null;
          frequency_rank?: number | null;
          needs_review?: boolean;
        };
        Update: Partial<Database['public']['Tables']['tamil_letters']['Insert']>;
        Relationships: GenericRelationship[];
      };
      vocabulary_items: {
        Row: {
          id: string;
          word_ta: string;
          word_en: string;
          transliteration: string;
          ipa: string | null;
          level_id: string | null;
          category: string;
          pos: string | null;
          difficulty: 'beginner' | 'intermediate' | 'advanced';
          audio_asset_id: string | null;
          image_url: string | null;
          needs_review: boolean;
        };
        Insert: {
          id: string;
          word_ta: string;
          word_en: string;
          transliteration: string;
          ipa?: string | null;
          level_id?: string | null;
          category: string;
          pos?: string | null;
          difficulty?: 'beginner' | 'intermediate' | 'advanced';
          audio_asset_id?: string | null;
          image_url?: string | null;
          needs_review?: boolean;
        };
        Update: Partial<Database['public']['Tables']['vocabulary_items']['Insert']>;
        Relationships: GenericRelationship[];
      };
      lesson_progress: {
        Row: {
          id: string;
          profile_id: string;
          lesson_id: string;
          status: 'not_started' | 'in_progress' | 'completed' | 'locked';
          current_item_index: number;
          completed_items_count: number;
          total_items_count: number;
          accuracy_percentage: number;
          xp_earned: number;
          time_spent_seconds: number;
          attempts_count: number;
          first_completed_at: string | null;
          last_completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          lesson_id: string;
          status?: 'not_started' | 'in_progress' | 'completed' | 'locked';
          current_item_index?: number;
          completed_items_count?: number;
          total_items_count?: number;
          accuracy_percentage?: number;
          xp_earned?: number;
          time_spent_seconds?: number;
          attempts_count?: number;
          first_completed_at?: string | null;
          last_completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['lesson_progress']['Insert']>;
        Relationships: GenericRelationship[];
      };
      quiz_attempts: {
        Row: {
          id: string;
          profile_id: string;
          lesson_id: string | null;
          score: number;
          total_questions: number;
          percentage: number;
          time_spent_seconds: number;
          answers_detail: Json;
          passed: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          lesson_id?: string | null;
          score: number;
          total_questions: number;
          percentage: number;
          time_spent_seconds?: number;
          answers_detail?: Json;
          passed: boolean;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['quiz_attempts']['Insert']>;
        Relationships: GenericRelationship[];
      };
      learner_skill_mastery: {
        Row: {
          id: string;
          profile_id: string;
          skill_type: 'letter' | 'word' | 'grammar' | 'reading' | 'listening' | 'speaking';
          target_ref_id: string;
          mastery_score: number;
          review_count: number;
          successful_reviews: number;
          consecutive_successes: number;
          last_reviewed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          skill_type: 'letter' | 'word' | 'grammar' | 'reading' | 'listening' | 'speaking';
          target_ref_id: string;
          mastery_score?: number;
          review_count?: number;
          successful_reviews?: number;
          consecutive_successes?: number;
          last_reviewed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['learner_skill_mastery']['Insert']>;
        Relationships: GenericRelationship[];
      };
      revision_queue: {
        Row: {
          id: string;
          profile_id: string;
          item_type: 'letter' | 'word' | 'sentence' | 'grammar';
          item_id: string;
          interval_days: number;
          ease_factor: number;
          repetitions: number;
          due_date: string;
          last_quality: number | null;
          last_reviewed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          item_type: 'letter' | 'word' | 'sentence' | 'grammar';
          item_id: string;
          interval_days?: number;
          ease_factor?: number;
          repetitions?: number;
          due_date: string;
          last_quality?: number | null;
          last_reviewed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['revision_queue']['Insert']>;
        Relationships: GenericRelationship[];
      };
      achievements: {
        Row: {
          id: string;
          title_en: string;
          title_ta: string;
          description_en: string;
          description_ta: string;
          icon_name: string;
          xp_reward: number;
          category: 'letters' | 'vocabulary' | 'reading' | 'streak' | 'mastery';
          criteria_type: string;
          criteria_value: number;
          created_at: string;
        };
        Insert: {
          id: string;
          title_en: string;
          title_ta: string;
          description_en: string;
          description_ta: string;
          icon_name: string;
          xp_reward?: number;
          category: 'letters' | 'vocabulary' | 'reading' | 'streak' | 'mastery';
          criteria_type: string;
          criteria_value?: number;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['achievements']['Insert']>;
        Relationships: GenericRelationship[];
      };
      user_achievements: {
        Row: {
          id: string;
          profile_id: string;
          achievement_id: string;
          earned_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          achievement_id: string;
          earned_at?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['user_achievements']['Insert']>;
        Relationships: GenericRelationship[];
      };
      daily_learning_activity: {
        Row: {
          id: string;
          profile_id: string;
          activity_date: string;
          minutes_practiced: number;
          lessons_completed: number;
          exercises_completed: number;
          xp_earned: number;
          goal_met: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          activity_date: string;
          minutes_practiced?: number;
          lessons_completed?: number;
          exercises_completed?: number;
          xp_earned?: number;
          goal_met?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['daily_learning_activity']['Insert']>;
        Relationships: GenericRelationship[];
      };
      streaks: {
        Row: {
          id: string;
          profile_id: string;
          current_streak: number;
          longest_streak: number;
          freeze_count: number;
          last_active_date: string | null;
          streak_started_at: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          current_streak?: number;
          longest_streak?: number;
          freeze_count?: number;
          last_active_date?: string | null;
          streak_started_at?: string | null;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['streaks']['Insert']>;
        Relationships: GenericRelationship[];
      };
      xp_ledger: {
        Row: {
          id: string;
          profile_id: string;
          amount: number;
          reason: 'lesson_completed' | 'daily_goal_bonus' | 'review_completed' | 'streak_bonus' | 'achievement_unlocked' | 'mission_completed' | 'manual_adjustment';
          source_id: string | null;
          idempotency_key: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          amount: number;
          reason: 'lesson_completed' | 'daily_goal_bonus' | 'review_completed' | 'streak_bonus' | 'achievement_unlocked' | 'mission_completed' | 'manual_adjustment';
          source_id?: string | null;
          idempotency_key?: string | null;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['xp_ledger']['Insert']>;
        Relationships: GenericRelationship[];
      };
      missions: {
        Row: {
          id: string;
          mission_type: 'daily' | 'weekly';
          title_en: string;
          title_ta: string;
          description_en: string;
          description_ta: string;
          xp_reward: number;
          target_count: number;
          metric: 'complete_lessons' | 'practice_minutes' | 'perfect_exercises' | 'review_items' | 'letters_practiced';
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id: string;
          mission_type: 'daily' | 'weekly';
          title_en: string;
          title_ta: string;
          description_en: string;
          description_ta: string;
          xp_reward?: number;
          target_count?: number;
          metric: 'complete_lessons' | 'practice_minutes' | 'perfect_exercises' | 'review_items' | 'letters_practiced';
          is_active?: boolean;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['missions']['Insert']>;
        Relationships: GenericRelationship[];
      };
      mission_progress: {
        Row: {
          id: string;
          profile_id: string;
          mission_id: string;
          current_count: number;
          is_completed: boolean;
          completed_at: string | null;
          period_start: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          mission_id: string;
          current_count?: number;
          is_completed?: boolean;
          completed_at?: string | null;
          period_start: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['mission_progress']['Insert']>;
        Relationships: GenericRelationship[];
      };
      audio_assets: {
        Row: {
          id: string;
          content_type: 'letter' | 'word' | 'sentence' | 'story_line' | 'feedback_sfx';
          content_id: string | null;
          tamil_text: string;
          voice_name: string;
          pace: number;
          format: 'wav' | 'mp3';
          sample_rate_hz: number;
          storage_bucket: string;
          storage_path: string;
          public_url: string | null;
          sha256_hash: string;
          status: 'pending_review' | 'approved' | 'rejected';
          reviewed_by: string | null;
          reviewed_at: string | null;
          reviewer_notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          content_type: 'letter' | 'word' | 'sentence' | 'story_line' | 'feedback_sfx';
          content_id?: string | null;
          tamil_text: string;
          voice_name?: string;
          pace?: number;
          format?: 'wav' | 'mp3';
          sample_rate_hz?: number;
          storage_bucket?: string;
          storage_path: string;
          public_url?: string | null;
          sha256_hash: string;
          status?: 'pending_review' | 'approved' | 'rejected';
          reviewed_by?: string | null;
          reviewed_at?: string | null;
          reviewer_notes?: string | null;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['audio_assets']['Insert']>;
        Relationships: GenericRelationship[];
      };
      speaking_recordings: {
        Row: {
          id: string;
          profile_id: string;
          lesson_item_id: string | null;
          target_text_ta: string;
          storage_bucket: string;
          storage_path: string;
          duration_seconds: number;
          stt_transcript: string | null;
          similarity_score: number | null;
          is_retained: boolean;
          retention_expires_at: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          lesson_item_id?: string | null;
          target_text_ta: string;
          storage_bucket?: string;
          storage_path: string;
          duration_seconds: number;
          stt_transcript?: string | null;
          similarity_score?: number | null;
          is_retained?: boolean;
          retention_expires_at?: string;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['speaking_recordings']['Insert']>;
        Relationships: GenericRelationship[];
      };
      consent_records: {
        Row: {
          id: string;
          parent_user_id: string;
          child_profile_id: string;
          consent_method: 'email_verification' | 'sms_otp' | 'credit_card_auth' | 'digitally_signed_form';
          policy_version: string;
          evidence: Json;
          is_revoked: boolean;
          revoked_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          parent_user_id: string;
          child_profile_id: string;
          consent_method: 'email_verification' | 'sms_otp' | 'credit_card_auth' | 'digitally_signed_form';
          policy_version: string;
          evidence?: Json;
          is_revoked?: boolean;
          revoked_at?: string | null;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['consent_records']['Insert']>;
        Relationships: GenericRelationship[];
      };
      parent_child_relationships: {
        Row: {
          id: string;
          parent_user_id: string;
          child_profile_id: string;
          relationship_type: 'parent' | 'guardian' | 'teacher';
          verified: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          parent_user_id: string;
          child_profile_id: string;
          relationship_type?: 'parent' | 'guardian' | 'teacher';
          verified?: boolean;
          created_at?: string;
        };
        Update: Partial<Database['public']['Tables']['parent_child_relationships']['Insert']>;
        Relationships: GenericRelationship[];
      };
      content_reports: {
        Row: {
          id: string;
          profile_id: string | null;
          lesson_id: string | null;
          lesson_item_id: string | null;
          report_type: 'spelling_error' | 'audio_mismatch' | 'cultural_issue' | 'ui_bug' | 'other';
          description: string;
          status: 'open' | 'investigating' | 'resolved' | 'dismissed';
          resolution_notes: string | null;
          resolved_by: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          profile_id?: string | null;
          lesson_id?: string | null;
          lesson_item_id?: string | null;
          report_type: 'spelling_error' | 'audio_mismatch' | 'cultural_issue' | 'ui_bug' | 'other';
          description: string;
          status?: 'open' | 'investigating' | 'resolved' | 'dismissed';
          resolution_notes?: string | null;
          resolved_by?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['content_reports']['Insert']>;
        Relationships: GenericRelationship[];
      };
      feature_flags: {
        Row: {
          key: string;
          enabled: boolean;
          description: string | null;
          rollout_percentage: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          key: string;
          enabled?: boolean;
          description?: string | null;
          rollout_percentage?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['feature_flags']['Insert']>;
        Relationships: GenericRelationship[];
      };
      voice_usage: {
        Row: {
          id: string;
          usage_date: string;
          profile_id: string | null;
          tts_character_count: number;
          stt_second_count: number;
          estimated_cost_inr: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          usage_date: string;
          profile_id?: string | null;
          tts_character_count?: number;
          stt_second_count?: number;
          estimated_cost_inr?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['voice_usage']['Insert']>;
        Relationships: GenericRelationship[];
      };
    };
    Views: Record<string, never>;
    Functions: {
      get_my_user: {
        Args: Record<string, never>;
        Returns: Json;
      };
      submit_item_answer: {
        Args: {
          p_profile_id: string;
          p_lesson_id: string;
          p_item_id: string;
          p_is_correct: boolean;
          p_response_time_ms: number;
          p_quality: number;
        };
        Returns: Json;
      };
      complete_lesson: {
        Args: {
          p_profile_id: string;
          p_lesson_id: string;
          p_accuracy_percentage: number;
          p_time_spent_seconds: number;
          p_idempotency_key?: string;
        };
        Returns: Json;
      };
      get_resume_point: {
        Args: {
          p_profile_id: string;
          p_lesson_id: string;
        };
        Returns: Json;
      };
      get_dashboard_summary: {
        Args: {
          p_profile_id: string;
        };
        Returns: Json;
      };
      recommend_next_lesson: {
        Args: {
          p_profile_id: string;
        };
        Returns: Json;
      };
      get_parent_summary: {
        Args: {
          p_child_profile_id: string;
        };
        Returns: Json;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
