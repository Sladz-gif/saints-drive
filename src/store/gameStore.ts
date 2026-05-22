// /src/store/gameStore.ts
// Full leaderboard + gamification state

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type GameType = "engine_sound" | "guess_the_car";
export type GameMode = "quick_play" | "ranked" | "daily" | "marathon";

export interface GameSession {
  id: string;
  gameType: GameType;
  mode: GameMode;
  userId: string | null;
  startedAt: string;
  endedAt?: string;
  questionsAnswered: number;
  correctAnswers: number;
  totalPoints: number;
  bestStreak: number;
  currentStreak: number;
  hintsUsed: number;
  difficulty: string;
  answers: SessionAnswer[];
}

export interface SessionAnswer {
  questionId: string;
  correct: boolean;
  timeTaken: number;
  pointsEarned: number;
  usedHint: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  userId: string;
  displayName: string;
  avatar: string;
  totalPoints: number;
  gamesPlayed: number;
  bestStreak: number;
  correctAnswers: number;
  accuracy: number;
  favouriteCar?: string;
  badges: string[];
  lastPlayed: string;
  isCurrentUser?: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earnedAt?: string;
  progress?: number;
  requirement: number;
}

export interface UserGameProfile {
  userId: string;
  displayName: string;
  totalPoints: number;
  totalGamesPlayed: number;
  totalCorrectAnswers: number;
  totalQuestionsAnswered: number;
  globalRank: number;
  bestStreak: number;
  currentStreak: number;
  dailyStreakDays: number;
  lastPlayedDate: string;
  badges: Badge[];
  soundGamePoints: number;
  guessGamePoints: number;
  soundGameGamesPlayed: number;
  guessGameGamesPlayed: number;
  dailyChallengesCompleted: number;
  perfectGames: number;
  favouriteCarBrand?: string;
  hardestCorrect?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// MOCK LEADERBOARD DATA (top 20 — realistic Ghanaian names)
// ─────────────────────────────────────────────────────────────────────────────

export const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    userId: "u_top1",
    displayName: "GT3_Kwame",
    avatar: "GK",
    totalPoints: 148400,
    gamesPlayed: 412,
    bestStreak: 23,
    correctAnswers: 3680,
    accuracy: 89,
    favouriteCar: "Porsche 911 GT3",
    badges: ["legendary_ear", "perfect_10", "speed_demon", "jdm_scholar"],
    lastPlayed: "2025-01-03T14:00:00Z",
  },
  {
    rank: 2,
    userId: "u_top2",
    displayName: "AccraSpeed_85",
    avatar: "AS",
    totalPoints: 134200,
    gamesPlayed: 388,
    bestStreak: 18,
    correctAnswers: 3290,
    accuracy: 85,
    favouriteCar: "Lamborghini Huracán",
    badges: ["v8_theologian", "vtec_believer", "sharp_eyes"],
    lastPlayed: "2025-01-03T13:00:00Z",
  },
  {
    rank: 3,
    userId: "u_top3",
    displayName: "JDM_Kofi",
    avatar: "JK",
    totalPoints: 121800,
    gamesPlayed: 302,
    bestStreak: 15,
    correctAnswers: 2710,
    accuracy: 90,
    favouriteCar: "Toyota Supra A80",
    badges: ["jdm_scholar", "turbo_ear", "perfect_10"],
    lastPlayed: "2025-01-02T22:00:00Z",
  },
  {
    rank: 4,
    userId: "u_top4",
    displayName: "GH_Drifter",
    avatar: "GD",
    totalPoints: 108900,
    gamesPlayed: 277,
    bestStreak: 12,
    correctAnswers: 2440,
    accuracy: 88,
    favouriteCar: "Nissan GT-R R35",
    badges: ["turbo_ear", "v8_theologian"],
    lastPlayed: "2025-01-02T18:00:00Z",
  },
  {
    rank: 5,
    userId: "u_top5",
    displayName: "TurboAma",
    avatar: "TA",
    totalPoints: 95500,
    gamesPlayed: 241,
    bestStreak: 11,
    correctAnswers: 2100,
    accuracy: 87,
    favouriteCar: "Ferrari 458 Italia",
    badges: ["first_listen", "audiophile"],
    lastPlayed: "2025-01-01T20:00:00Z",
  },
  {
    rank: 6,
    userId: "u_top6",
    displayName: "V12_Esi",
    avatar: "VE",
    totalPoints: 88700,
    gamesPlayed: 198,
    bestStreak: 14,
    correctAnswers: 1820,
    accuracy: 92,
    favouriteCar: "Ferrari LaFerrari",
    badges: ["audiophile", "legendary_ear"],
    lastPlayed: "2025-01-03T10:00:00Z",
  },
  {
    rank: 7,
    userId: "u_top7",
    displayName: "NsafoAuto",
    avatar: "NA",
    totalPoints: 76200,
    gamesPlayed: 180,
    bestStreak: 10,
    correctAnswers: 1540,
    accuracy: 86,
    favouriteCar: "BMW M5 E60",
    badges: ["sharp_eyes", "speed_demon"],
    lastPlayed: "2025-01-02T16:00:00Z",
  },
  {
    rank: 8,
    userId: "u_top8",
    displayName: "KoforiduaRacer",
    avatar: "KR",
    totalPoints: 68800,
    gamesPlayed: 165,
    bestStreak: 9,
    correctAnswers: 1410,
    accuracy: 85,
    favouriteCar: "Lexus LFA",
    badges: ["first_listen", "vtec_believer"],
    lastPlayed: "2025-01-01T14:00:00Z",
  },
  {
    rank: 9,
    userId: "u_top9",
    displayName: "EmeAkosua",
    avatar: "EA",
    totalPoints: 61400,
    gamesPlayed: 144,
    bestStreak: 8,
    correctAnswers: 1220,
    accuracy: 85,
    favouriteCar: "Honda S2000",
    badges: ["vtec_believer", "ghana_expert"],
    lastPlayed: "2025-01-03T08:00:00Z",
  },
  {
    rank: 10,
    userId: "u_top10",
    displayName: "TemaCarguy",
    avatar: "TC",
    totalPoints: 54100,
    gamesPlayed: 130,
    bestStreak: 7,
    correctAnswers: 1080,
    accuracy: 83,
    favouriteCar: "Mercedes C63 AMG",
    badges: ["v8_theologian"],
    lastPlayed: "2025-01-02T11:00:00Z",
  },
  {
    rank: 11,
    userId: "u_top11",
    displayName: "CumsiTurbo",
    avatar: "CT",
    totalPoints: 47200,
    gamesPlayed: 112,
    bestStreak: 7,
    correctAnswers: 940,
    accuracy: 84,
    favouriteCar: "Lamborghini Aventador",
    badges: ["turbo_ear"],
    lastPlayed: "2025-01-01T19:00:00Z",
  },
  {
    rank: 12,
    userId: "u_top12",
    displayName: "AbenaGTR",
    avatar: "AG",
    totalPoints: 41800,
    gamesPlayed: 98,
    bestStreak: 6,
    correctAnswers: 820,
    accuracy: 84,
    favouriteCar: "Nissan GT-R R35",
    badges: ["first_listen"],
    lastPlayed: "2025-01-03T07:00:00Z",
  },
  {
    rank: 13,
    userId: "u_top13",
    displayName: "AkraAMG",
    avatar: "AA",
    totalPoints: 36500,
    gamesPlayed: 90,
    bestStreak: 6,
    correctAnswers: 720,
    accuracy: 80,
    favouriteCar: "Mercedes CLK GTR",
    badges: ["v8_theologian"],
    lastPlayed: "2025-01-02T12:00:00Z",
  },
  {
    rank: 14,
    userId: "u_top14",
    displayName: "PorscheYaw",
    avatar: "PY",
    totalPoints: 31200,
    gamesPlayed: 78,
    bestStreak: 5,
    correctAnswers: 610,
    accuracy: 78,
    favouriteCar: "Porsche 918 Spyder",
    badges: ["first_listen"],
    lastPlayed: "2025-01-01T21:00:00Z",
  },
  {
    rank: 15,
    userId: "u_top15",
    displayName: "OseiSports",
    avatar: "OS",
    totalPoints: 26800,
    gamesPlayed: 66,
    bestStreak: 5,
    correctAnswers: 520,
    accuracy: 79,
    favouriteCar: "Bugatti Chiron",
    badges: ["first_listen"],
    lastPlayed: "2025-01-02T09:00:00Z",
  },
  {
    rank: 16,
    userId: "u_top16",
    displayName: "KwesiF1",
    avatar: "KF",
    totalPoints: 22400,
    gamesPlayed: 54,
    bestStreak: 4,
    correctAnswers: 430,
    accuracy: 80,
    badges: ["first_listen"],
    lastPlayed: "2025-01-01T17:00:00Z",
  },
  {
    rank: 17,
    userId: "u_top17",
    displayName: "FrancaVTEC",
    avatar: "FV",
    totalPoints: 18900,
    gamesPlayed: 47,
    bestStreak: 4,
    correctAnswers: 360,
    accuracy: 77,
    badges: ["first_listen"],
    lastPlayed: "2025-01-03T06:00:00Z",
  },
  {
    rank: 18,
    userId: "u_top18",
    displayName: "SarpongDrift",
    avatar: "SD",
    totalPoints: 15300,
    gamesPlayed: 38,
    bestStreak: 3,
    correctAnswers: 290,
    accuracy: 76,
    badges: [],
    lastPlayed: "2025-01-02T15:00:00Z",
  },
  {
    rank: 19,
    userId: "u_top19",
    displayName: "NiiCar",
    avatar: "NC",
    totalPoints: 11800,
    gamesPlayed: 29,
    bestStreak: 3,
    correctAnswers: 220,
    accuracy: 76,
    badges: [],
    lastPlayed: "2025-01-01T13:00:00Z",
  },
  {
    rank: 20,
    userId: "u_top20",
    displayName: "AkyeaSpeed",
    avatar: "AS",
    totalPoints: 8400,
    gamesPlayed: 21,
    bestStreak: 3,
    correctAnswers: 160,
    accuracy: 76,
    badges: [],
    lastPlayed: "2025-01-03T05:00:00Z",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// BADGE DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

export const allBadges: Badge[] = [
  {
    id: "first_blood",
    name: "First Blood",
    description: "Complete your first game",
    icon: "Sword",
    color: "text-slate-400",
    requirement: 1,
  },
  {
    id: "speed_demon",
    name: "Speed Demon",
    description: "Answer 10 questions in under 2 seconds each",
    icon: "Zap",
    color: "text-yellow-400",
    requirement: 10,
  },
  {
    id: "perfect_10",
    name: "Perfect 10",
    description: "Score 100% in a 10-round session",
    icon: "Target",
    color: "text-orange-400",
    requirement: 1,
  },
  {
    id: "legendary_ear",
    name: "Legendary Ear",
    description: "Reach 100,000 lifetime points",
    icon: "Trophy",
    color: "text-yellow-300",
    requirement: 100000,
  },
  {
    id: "ghana_expert",
    name: "Ghana Expert",
    description: "Identify all 10 Ghana Roads mode cars",
    icon: "MapPin",
    color: "text-green-400",
    requirement: 10,
  },
  {
    id: "daily_warrior",
    name: "Daily Warrior",
    description: "Complete 7 daily challenges in a row",
    icon: "CalendarCheck",
    color: "text-blue-400",
    requirement: 7,
  },
  {
    id: "the_obsessed",
    name: "The Obsessed",
    description: "Play 100 games total",
    icon: "Flame",
    color: "text-red-400",
    requirement: 100,
  },
  {
    id: "first_listen",
    name: "First Listen",
    description: "Complete your first Engine Sound game",
    icon: "Headphones",
    color: "text-slate-400",
    requirement: 1,
  },
  {
    id: "v8_theologian",
    name: "V8 Theologian",
    description: "Identify 10 V8 engines correctly",
    icon: "CircleDot",
    color: "text-orange-500",
    requirement: 10,
  },
  {
    id: "vtec_believer",
    name: "VTEC Believer",
    description: "Identify 5 VTEC Honda engines correctly",
    icon: "Gauge",
    color: "text-red-400",
    requirement: 5,
  },
  {
    id: "turbo_ear",
    name: "Turbo Ear",
    description: "Identify 10 turbo engines by sound alone",
    icon: "Wind",
    color: "text-cyan-400",
    requirement: 10,
  },
  {
    id: "audiophile",
    name: "The Audiophile",
    description: "Score 100% in a Hard difficulty sound session",
    icon: "Music",
    color: "text-purple-400",
    requirement: 1,
  },
  {
    id: "rotary_fan",
    name: "Rotary Faithful",
    description: "Identify all 3 Mazda rotary sounds correctly",
    icon: "RotateCcw",
    color: "text-red-300",
    requirement: 3,
  },
  {
    id: "classic_ear",
    name: "Classic Ear",
    description: "Identify 5 pre-1980 engines correctly",
    icon: "Clock",
    color: "text-amber-400",
    requirement: 5,
  },
  {
    id: "sharp_eyes",
    name: "Sharp Eyes",
    description: "Get 15 correct from headlights clues only",
    icon: "Eye",
    color: "text-cyan-300",
    requirement: 15,
  },
  {
    id: "jdm_scholar",
    name: "JDM Scholar",
    description: "Identify 20 Japanese cars correctly",
    icon: "BookOpen",
    color: "text-red-400",
    requirement: 20,
  },
  {
    id: "supercar_spotter",
    name: "Supercar Spotter",
    description: "Identify 10 supercars from silhouettes",
    icon: "Scan",
    color: "text-yellow-400",
    requirement: 10,
  },
  {
    id: "streak_master",
    name: "Streak Master",
    description: "Reach a 15-answer correct streak",
    icon: "TrendingUp",
    color: "text-green-400",
    requirement: 15,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ZUSTAND STORE
// ─────────────────────────────────────────────────────────────────────────────

interface GameStoreState {
  activeSession: GameSession | null;
  userProfile: UserGameProfile | null;
  leaderboard: LeaderboardEntry[];
  leaderboardTimeframe: "daily" | "weekly" | "allTime";
  startSession: (type: GameType, mode: GameMode, userId: string | null) => void;
  recordAnswer: (answer: SessionAnswer) => void;
  endSession: () => void;
  setLeaderboardTimeframe: (tf: "daily" | "weekly" | "allTime") => void;
  getUserRank: (userId: string) => number;
  awardBadge: (badgeId: string) => void;
}

export const useGameStore = create<GameStoreState>()(
  persist(
    (set, get) => ({
      activeSession: null,
      userProfile: null,
      leaderboard: mockLeaderboard,
      leaderboardTimeframe: "allTime",

      startSession: (type, mode, userId) =>
        set({
          activeSession: {
            id: crypto.randomUUID(),
            gameType: type,
            mode,
            userId,
            startedAt: new Date().toISOString(),
            questionsAnswered: 0,
            correctAnswers: 0,
            totalPoints: 0,
            bestStreak: 0,
            currentStreak: 0,
            hintsUsed: 0,
            difficulty: "mixed",
            answers: [],
          },
        }),

      recordAnswer: (answer) =>
        set((state) => {
          if (!state.activeSession) return state;
          const s = state.activeSession;
          const newStreak = answer.correct ? s.currentStreak + 1 : 0;
          return {
            activeSession: {
              ...s,
              questionsAnswered: s.questionsAnswered + 1,
              correctAnswers: answer.correct ? s.correctAnswers + 1 : s.correctAnswers,
              totalPoints: s.totalPoints + answer.pointsEarned,
              currentStreak: newStreak,
              bestStreak: Math.max(s.bestStreak, newStreak),
              hintsUsed: answer.usedHint ? s.hintsUsed + 1 : s.hintsUsed,
              answers: [...s.answers, answer],
            },
          };
        }),

      endSession: () =>
        set((state) => {
          if (!state.activeSession) return state;
          const s = state.activeSession;
          const updatedLeaderboard = state.leaderboard
            .map((entry) =>
              entry.userId === s.userId
                ? { ...entry, totalPoints: entry.totalPoints + s.totalPoints }
                : entry,
            )
            .sort((a, b) => b.totalPoints - a.totalPoints)
            .map((entry, i) => ({ ...entry, rank: i + 1 }));

          return {
            activeSession: null,
            leaderboard: updatedLeaderboard,
          };
        }),

      setLeaderboardTimeframe: (tf) => set({ leaderboardTimeframe: tf }),

      getUserRank: (userId) => {
        const entry = get().leaderboard.find((e) => e.userId === userId);
        return entry?.rank ?? 999;
      },

      awardBadge: (badgeId) =>
        set((state) => {
          if (!state.userProfile) return state;
          const badge = allBadges.find((b) => b.id === badgeId);
          if (!badge) return state;
          const alreadyHas = state.userProfile.badges.some((b) => b.id === badgeId);
          if (alreadyHas) return state;
          return {
            userProfile: {
              ...state.userProfile,
              badges: [
                ...state.userProfile.badges,
                { ...badge, earnedAt: new Date().toISOString() },
              ],
            },
          };
        }),
    }),
    { name: "saints_garage_game_store" },
  ),
);
