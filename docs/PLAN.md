# TamilPalam (தமிழ் பாலம்) — Master Implementation Plan

## Overview
This plan specifies the architecture, sequence of implementation phases, task checklist, and verification gates for building the complete, production-quality frontend of **TamilPalam**.

---

## Phase Breakdown & Checklist

### Phase 1: Foundation, Design System & Project Setup
- [ ] Initialize Vite + React 18 + TypeScript project with strict mode.
- [ ] Configure Tailwind CSS with heritage design tokens:
  - Colors: Warm Ivory `#FDF8F0`, Deep Charcoal `#1A1A2E`, Heritage Teal `#0F4C5C`, Turmeric Gold `#E8B84B`, Temple Maroon `#7B2D26`, Palm Green `#4A7C59`, Soft Sand `#E8DCC8`, Morning Sky `#8ECAE6`.
  - Typography: Noto Sans Tamil, Noto Serif Tamil, Inter (self-hosted / Google fonts fallback).
  - Age mode design tokens (Sprouts: 64px min target / 72px buttons / 96-140px Tamil; Explorers: 52px target; Scholars: 44px target).
- [ ] Setup `react-i18next` with complete English (`en`) and Tamil (`ta`) translation dictionaries across common, onboarding, dashboard, lessons, progress, and errors.
- [ ] Build script for i18n key parity and NFC normalization.

### Phase 2: Typed Service Layer & Mock Data Adapters
- [ ] Define comprehensive TypeScript interfaces matching the PRD data dictionary (`Profile`, `UserPreferences`, `LearningLevel`, `Lesson`, `LessonItem`, `Exercise`, `Question`, `LessonProgress`, `QuizAttempt`, `LearnerSkillMastery`, `RevisionItem`, `Achievement`, `Mission`).
- [ ] Implement local mock adapter backed by `localStorage` / `IndexedDB`:
  - `authService` (Sign in, Sign up, Guest demo, Parental consent status).
  - `curriculumService` (Levels 0–7 data, full Level 0–4 lesson & exercise seed).
  - `progressService` (Lesson progress, quiz scores, XP accumulation, daily goal ring).
  - `masteryService` (Exponential decay recency formula, skill mastery calculation).
  - `tanglishService` (5-stage Progressive Tanglish Reduction model, Script Power meter).
  - `revisionService` (Spaced repetition queue at 1, 3, 7, 14, 30, 60 day intervals).
  - `audioService` (Manifest lookup, HTML5 audio player with Web Speech API `ta-IN` fallback, speed controls 0.5x/0.75x/1.0x).
  - `missionService` (Real-life Tamil missions with verification).
  - `parentService` (Weekly activity stats, skill matrix, JSON export).

### Phase 3: Seed Curriculum & Audio Manifest
- [ ] Seed full Level 0 (Discovery & Assessment).
- [ ] Seed full Level 1 (Uyir Vowels அ–ஔ + Aytham ஃ + Mei Consonants க்–ட்).
- [ ] Seed full Level 2 (First Words: Family, Greetings, Numbers, Colors, Animals, Food).
- [ ] Seed full Level 3 (Uyirmei Syllables & Word Reading).
- [ ] Seed full Level 4 (Simple Sentences: S-O-V, Family, Basic Questions).
- [ ] Seed Level 5–7 structure with authentic verified cultural stories and proverbs.
- [ ] Create comprehensive `audioManifest.json` and document native voice needs in `docs/AUDIO_TODO.md`.

### Phase 4: App Shell, Navigation & Core Layout
- [ ] Setup React Router 6 routes with route-based code splitting.
- [ ] Responsive navigation shell:
  - Mobile: Bottom tab bar (Home, Learn, Progress, Me) with minimum 52-64px touch targets.
  - Desktop: Clean top navigation bar with quick profile and language toggles.
- [ ] In-lesson focused header with progress segments, sound toggle, Script Power gauge, and safe Exit confirmation dialog.
- [ ] Mascot integration: Original friendly companion **Kili the Parrot (கிளி)** for hints and cheer (disabled in Scholars mode).

### Phase 5: Core Screens Implementation
- [ ] **Screen 1 — Landing Page:** Hero, live EN/TA switch, interactive feature demo, age-mode preview, direct CTAs.
- [ ] **Screen 2 — Auth Flow:** Sign up / Sign in forms with validation, guest demo bypass.
- [ ] **Screen 3 — Parental Consent:** Realistic COPPA/GDPR-K under-13 consent flow with verification code mock.
- [ ] **Screen 4 — Onboarding Flow:** Welcome carousel, name input, grade selector (Std 1–12) setting age mode, preference selection.
- [ ] **Screen 5 — Initial Assessment:** 10 adaptive questions, instant scoring, Level 0–4 recommendation with student override.
- [ ] **Screen 6 — Home Dashboard:** Daily goal ring, continue learning hero card, streak counter with freeze badge, Script Power, recent achievements.
- [ ] **Screen 7 — Level Map (Learn):** 3D-perspective milestone trail with unlocked/locked states, kolam patterns, and level details modal.
- [ ] **Screen 8 — Lesson Player (All Activity Types):**
  - Letter Phonics & Tracing (SVG canvas with outline and draw feedback).
  - Vocabulary card with audio, image, and Tanglish bridge.
  - Multiple Choice (MCQ).
  - Tap-to-match pairs.
  - Fill in the blank.
  - 3D sentence tile ordering (tap-to-place and drag-and-drop).
  - Listening comprehension with speed controls.
  - Speaking practice with MediaRecorder record-and-compare & self-assessment.
  - Reading comprehension passage.
  - Picture & Cultural stories (4-panel illustrated story reader).
- [ ] **Screen 9 — Quiz / Lesson Results:** XP pop, star rating, weak item remediation, celebration.
- [ ] **Screen 10 — Progress & Mastery:** 5-skill radar/bar charts, streak calendar, badge shelf.
- [ ] **Screen 11 — Spaced Repetition Revision:** Interactive review queue with flashcard flips.
- [ ] **Screen 12 — Real-Life Missions:** Interactive checklist for offline practice.
- [ ] **Screen 13 — Profile & Settings:** Age mode toggle, language switcher, audio speed, reduce motion, font size, data export/reset.
- [ ] **Screen 14 — Parent Dashboard:** Supervisory analytics, weekly summary, skill matrix, JSON download.
- [ ] **Screen 15 — System & Edge States:** Kind error boundaries, offline banner, empty states, audio fallback badges.

### Phase 6: Polish, Motion & Accessibility
- [ ] CSS 3D flip cards, tilting letter tiles, snap animations.
- [ ] Full `prefers-reduced-motion` compliance.
- [ ] WCAG 2.1 AA color contrast audit and keyboard navigation.
- [ ] Mid-lesson state persistence (refresh resumes exact item).

### Phase 7: Verification & Quality Gates
- [ ] `tsc --noEmit` clean with zero errors.
- [ ] Automated tests: Vitest for logic (mastery formula, PTR state transitions, spaced repetition, streak calculation, i18n parity).
- [ ] Visual browser inspection across all 3 age modes and both languages at 320px, 375px, 768px, 1024px, 1440px.
- [ ] Generate comprehensive `docs/QA_REPORT.md`.
