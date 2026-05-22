// /src/lib/questionFilter.ts
// Client-side algorithm for filtering game questions

import type {
  Difficulty,
  EngineCategory,
  GameType,
  GameMode,
  EngineSoundClip,
} from "../data/games";

interface FilterConfig {
  mode: GameMode;
  excludeIds: string[]; // already played this session
  difficulty?: Difficulty;
  gameType: GameType;
  playerHistory: string[]; // all question IDs ever answered correctly
  preferredCategories?: EngineCategory[];
}

export function selectNextQuestion(pool: EngineSoundClip[], config: FilterConfig): EngineSoundClip {
  // STEP 1: Hard exclusions
  let candidates = pool.filter((q) => !config.excludeIds.includes(q.id));

  // STEP 2: Mode-based difficulty filter
  if (config.mode === "quick_play") {
    candidates = candidates.filter((q) => q.difficulty !== "legendary");
  }
  if (config.mode === "daily") {
    // Daily challenge uses a seeded pseudo-random — same for all users on same day
    const seed = new Date().toISOString().split("T")[0]; // "2025-01-03"
    candidates = deterministicShuffle(candidates, seed);
    return candidates[0];
  }

  // STEP 3: Adaptive difficulty based on recent performance
  // If player got last 3 correct: increase difficulty weight
  // If player got last 3 wrong: decrease difficulty weight
  const recentAnswers = config.playerHistory.slice(-3);
  const recentCorrectRate =
    recentAnswers.length > 0 ? recentAnswers.filter(Boolean).length / recentAnswers.length : 0.5;

  const difficultyWeights: Record<Difficulty, number> = {
    easy: recentCorrectRate > 0.8 ? 0.1 : 0.4,
    medium: 0.4,
    hard: recentCorrectRate > 0.6 ? 0.35 : 0.15,
    legendary: recentCorrectRate > 0.9 ? 0.15 : 0.05,
  };

  // STEP 4: Weighted random selection
  const weighted = candidates.flatMap((q) => {
    const weight = Math.ceil((difficultyWeights[q.difficulty] ?? 0.25) * 100);
    return Array(weight).fill(q);
  });

  // STEP 5: Prefer questions player hasn't seen before
  const unseen = weighted.filter((q) => !config.playerHistory.includes(q.id));
  const finalPool = unseen.length > 0 ? unseen : weighted;

  return finalPool[Math.floor(Math.random() * finalPool.length)];
}

function deterministicShuffle<T>(arr: T[], seed: string): T[] {
  // Simple seeded shuffle — same seed = same order every time
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return [...arr].sort((a, b) => {
    const rng = Math.abs(Math.sin(hash++) * 10000) % 1;
    return rng - 0.5;
  });
}
