import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Play,
  Volume2,
  Trophy,
  Flame,
  Check,
  X as XIcon,
  RotateCcw,
  Timer,
  VolumeX,
  Lightbulb,
  Image as ImageIcon,
} from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { engineSoundQuestions, engineSoundGameConfig } from "@/data/games";
import { useGameStore } from "@/store/gameStore";
import { selectNextQuestion } from "@/lib/questionFilter";

export const Route = createFileRoute("/games/engine-sound")({ component: EngineSoundGame });

function EngineSoundGame() {
  const { activeSession, startSession, recordAnswer, endSession } = useGameStore();
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(15);
  const [flash, setFlash] = useState<"correct" | "wrong" | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [sessionQuestions, setSessionQuestions] = useState<typeof engineSoundQuestions>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentQuestion = sessionQuestions[idx];
  const score = activeSession?.totalPoints ?? 0;
  const streak = activeSession?.currentStreak ?? 0;
  const bestStreak = activeSession?.bestStreak ?? 0;

  // Initialize session
  useEffect(() => {
    if (!isInitialized && engineSoundQuestions.length > 0) {
      startSession("engine_sound", "quick_play", null);
      // Select 10 random questions for quick play
      const shuffled = [...engineSoundQuestions].sort(() => Math.random() - 0.5).slice(0, 10);
      setSessionQuestions(shuffled);
      setIsInitialized(true);
    }
  }, [isInitialized, engineSoundQuestions, startSession]);

  // Timer
  const handlePick = useCallback(
    (p: string) => {
      if (picked || gameOver || !currentQuestion) return;
      setPicked(p);
      setIsPlaying(false);
      if (audioRef.current) audioRef.current.pause();

      const isCorrect = p === currentQuestion.correctAnswer;
      setFlash(isCorrect ? "correct" : "wrong");

      // Calculate points
      let points = 0;
      if (isCorrect) {
        const timeLeft = time;
        const speedMultiplier = timeLeft >= 10 ? 2.0 : timeLeft >= 5 ? 1.5 : 1.0;
        const difficultyMultiplier =
          engineSoundGameConfig.difficultyMultipliers[
            currentQuestion.difficulty as keyof typeof engineSoundGameConfig.difficultyMultipliers
          ];
        points = Math.floor(100 * speedMultiplier * difficultyMultiplier);

        // Streak bonus
        const streakBonus = engineSoundGameConfig.streakBonuses.find(
          (b) => b.streak === streak + 1,
        );
        if (streakBonus) points += streakBonus.bonusPoints;
      }

      recordAnswer({
        questionId: currentQuestion.id,
        correct: isCorrect,
        timeTaken:
          engineSoundGameConfig.timeByDifficulty[
            currentQuestion.difficulty as keyof typeof engineSoundGameConfig.timeByDifficulty
          ] - time,
        pointsEarned: points,
        usedHint: showHint,
      });

      if (idx === sessionQuestions.length - 1) {
        setTimeout(() => {
          setShowReveal(true);
          setTimeout(() => setGameOver(true), 3000);
        }, 1500);
      } else {
        setTimeout(() => {
          setIdx((i) => i + 1);
          setPicked(null);
          setTime(15);
          setFlash(null);
          setShowHint(false);
          setShowReveal(false);
          setIsPlaying(false);
        }, 2500);
      }
    },
    [
      picked,
      gameOver,
      currentQuestion,
      time,
      streak,
      showHint,
      idx,
      sessionQuestions.length,
      recordAnswer,
    ],
  );

  useEffect(() => {
    if (picked || gameOver || !isPlaying) return;
    if (time <= 0) {
      handlePick("");
      return;
    }
    const id = setTimeout(() => setTime((t) => t - 0.1), 100);
    return () => clearTimeout(id);
  }, [time, picked, gameOver, isPlaying, handlePick]);

  // Audio cleanup
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  function handlePlay() {
    if (!currentQuestion) return;
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const audio = new Audio(currentQuestion.mp3Url);
    audioRef.current = audio;
    audio.play().catch(() => {});
    setIsPlaying(true);
    setTime(
      engineSoundGameConfig.timeByDifficulty[
        currentQuestion.difficulty as keyof typeof engineSoundGameConfig.timeByDifficulty
      ],
    );
    audio.onended = () => setIsPlaying(false);
  }

  function handleHint() {
    if (showHint || !currentQuestion) return;
    setShowHint(true);
    // Deduct hint cost
    if (activeSession) {
      recordAnswer({
        questionId: currentQuestion.id,
        correct: false,
        timeTaken: 0,
        pointsEarned: -engineSoundGameConfig.hintCost,
        usedHint: true,
      });
    }
  }

  function handleRestart() {
    setIdx(0);
    setPicked(null);
    setIsPlaying(false);
    setGameOver(false);
    setTime(15);
    setFlash(null);
    setShowHint(false);
    setShowReveal(false);
    setIsInitialized(false);
    setSessionQuestions([]);
  }


  if (gameOver) {
    endSession();
    return (
      <SiteLayout>
        <div className="container-x py-24 text-center">
          <div className="overline text-primary mb-4">Challenge Complete</div>
          <h1 className="font-display text-7xl md:text-9xl tracking-wider">HALL OF FAME</h1>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto">
            <div className="bg-card border border-border p-4 sm:p-6">
              <div className="overline text-[10px] sm:text-xs">Final Score</div>
              <div className="font-display text-2xl sm:text-4xl text-primary mt-1 sm:mt-2">{score}</div>
            </div>
            <div className="bg-card border border-border p-4 sm:p-6">
              <div className="overline text-[10px] sm:text-xs">Best Streak</div>
              <div className="font-display text-2xl sm:text-4xl mt-1 sm:mt-2">{bestStreak}</div>
            </div>
            <div className="bg-card border border-border p-4 sm:p-6">
              <div className="overline text-[10px] sm:text-xs">Correct</div>
              <div className="font-display text-2xl sm:text-4xl mt-1 sm:mt-2">
                {activeSession?.correctAnswers ?? 0}/10
              </div>
            </div>
            <div className="bg-card border border-border p-4 sm:p-6">
              <div className="overline text-[10px] sm:text-xs">Accuracy</div>
              <div className="font-display text-2xl sm:text-4xl mt-1 sm:mt-2">
                {activeSession
                  ? Math.round(
                      (activeSession.correctAnswers / activeSession.questionsAnswered) * 100,
                    )
                  : 0}
                %
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <button
              onClick={handleRestart}
              className="h-14 px-8 bg-primary text-primary-foreground font-mono uppercase tracking-widest text-sm transition-colors"
            >
              Play Again
            </button>
            <Link
              to="/games"
              className="h-14 px-8 border border-border hover:border-foreground font-mono uppercase tracking-widest text-sm inline-flex items-center"
            >
              Back to Arcade
            </Link>
          </div>
        </div>
      </SiteLayout>
    );
  }

  if (!currentQuestion) {
    return (
      <SiteLayout>
        <div className="container-x py-24 text-center">
          <div className="overline">Loading</div>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div
        className={`min-h-[calc(100vh-64px)] transition-colors duration-500 ${flash === "correct" ? "bg-success/5" : flash === "wrong" ? "bg-destructive/5" : "bg-background"}`}
      >
        {/* Timer Bar */}
        <div className="h-1.5 w-full bg-surface relative overflow-hidden">
          <div
            className={`h-full transition-all duration-100 linear ${time < 4 ? "bg-destructive" : "bg-primary"}`}
            style={{
              width: `${(time / engineSoundGameConfig.timeByDifficulty[currentQuestion.difficulty as keyof typeof engineSoundGameConfig.timeByDifficulty]) * 100}%`,
            }}
          />
        </div>

        <div className="container-x py-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="overline tracking-[0.2em] text-[10px] sm:text-xs">
                Engine {idx + 1}/{sessionQuestions.length}
              </div>
              <div
                className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest ${
                  currentQuestion.difficulty === "easy"
                    ? "text-green-400"
                    : currentQuestion.difficulty === "medium"
                      ? "text-yellow-400"
                      : currentQuestion.difficulty === "hard"
                        ? "text-orange-400"
                        : "text-red-400"
                }`}
              >
                {currentQuestion.difficulty}
              </div>
              {streak > 1 && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-[10px] font-mono uppercase tracking-widest animate-bounce">
                  <Flame className="w-3 h-3 fill-current" /> {streak} Streak
                </div>
              )}
            </div>
            <div className="flex gap-4 sm:gap-8 items-center">
              <div className="flex flex-col items-end">
                <div className="overline text-[9px] sm:text-[10px] opacity-50">Score</div>
                <div className="font-display text-2xl sm:text-3xl tracking-wider text-primary">{score}</div>
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-10 bg-card border border-border p-6 sm:p-12 flex flex-col items-center relative overflow-hidden">
            {/* Background Visualizer */}
            <div className="absolute inset-0 opacity-10 flex items-center justify-center gap-1 pointer-events-none">
              {Array.from({ length: 60 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-primary transition-all duration-200"
                  style={{
                    height: isPlaying ? `${Math.random() * 80 + 20}%` : "10%",
                    opacity: isPlaying ? 1 : 0.3,
                  }}
                />
              ))}
            </div>

            <button
              onClick={handlePlay}
              disabled={!!picked}
              className={`relative z-10 h-24 w-24 sm:h-32 sm:w-32 rounded-full flex items-center justify-center transition-all duration-500 ${
                isPlaying
                  ? "bg-primary text-primary-foreground scale-110 shadow-[0_0_40px_rgba(232,93,4,0.3)]"
                  : picked
                    ? "bg-surface text-muted-foreground opacity-50"
                    : "bg-surface text-foreground hover:bg-card border border-border"
              }`}
            >
              {isPlaying ? <VolumeX className="w-10 h-10 sm:w-12 sm:h-12" /> : <Play className="w-10 h-10 sm:w-12 sm:h-12 ml-2" />}
            </button>

            <div className="relative z-10 mt-6 sm:mt-10 w-full max-w-2xl">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2 text-primary">
                  <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />{" "}
                  <span className="overline tracking-widest text-[9px] sm:text-[10px]">Acoustic Signature</span>
                </div>
                <div className="font-mono text-xs sm:text-sm">{time.toFixed(1)}s</div>
              </div>
              <div className="h-16 sm:h-24 flex items-center gap-0.5 sm:gap-1 overflow-hidden px-3 sm:px-4 bg-black/20 border border-white/5 rounded-sm">
                {Array.from({ length: 100 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 transition-all duration-300 ${isPlaying ? "bg-primary" : "bg-primary/20"}`}
                    style={{
                      height: isPlaying
                        ? `${Math.abs(Math.sin(i * 0.2 + Date.now() * 0.005)) * 70 + 10}%`
                        : `${Math.abs(Math.sin(i * 0.2)) * 20 + 5}%`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Hint Button */}
            {!picked && !showHint && currentQuestion.hintText && (
              <button
                onClick={handleHint}
                className="relative z-10 mt-6 flex items-center gap-2 px-4 py-2 bg-surface border border-border hover:border-primary text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                <Lightbulb className="w-4 h-4" />
                <span>Hint (-{engineSoundGameConfig.hintCost} pts)</span>
              </button>
            )}

            {showHint && currentQuestion.hintText && (
              <div className="relative z-10 mt-6 p-4 bg-primary/10 border border-primary/20 text-primary text-sm max-w-md text-center">
                {currentQuestion.hintText}
              </div>
            )}

            {flash && (
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center backdrop-blur-md animate-fade-in ${flash === "correct" ? "bg-success/20" : "bg-destructive/20"}`}
              >
                <div className="bg-background/95 p-6 sm:p-10 border border-border flex flex-col items-center max-w-sm text-center">
                  {flash === "correct" ? (
                    <>
                      <Check className="w-12 h-12 sm:w-16 sm:h-16 text-success mb-3 sm:mb-4 animate-scale-in" />
                      <div className="font-display text-2xl sm:text-4xl tracking-widest text-success">
                        IDENTIFIED
                      </div>
                      <div className="font-mono text-sm mt-3 opacity-70 italic">
                        "{currentQuestion.funFact}"
                      </div>
                    </>
                  ) : (
                    <>
                      <XIcon className="w-16 h-16 text-destructive mb-4 animate-scale-in" />
                      <div className="font-display text-4xl tracking-widest text-destructive">
                        MISIDENTIFIED
                      </div>
                      <div className="font-mono text-sm mt-3">
                        TARGET: {currentQuestion.correctAnswer.toUpperCase()}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {showReveal && (
              <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-md animate-fade-in bg-background/95">
                <div className="flex flex-col items-center max-w-lg text-center">
                  <img
                    src={currentQuestion.revealImageUrl}
                    alt={currentQuestion.correctAnswer}
                    className="w-full h-48 object-cover rounded-lg mb-6"
                  />
                  <div className="font-display text-3xl tracking-widest text-primary">
                    {currentQuestion.correctAnswer}
                  </div>
                  <div className="font-mono text-sm mt-2 text-muted-foreground">
                    {currentQuestion.carMake} {currentQuestion.carModel} {currentQuestion.carYear}
                  </div>
                  <div className="mt-4 text-sm opacity-70 italic">"{currentQuestion.funFact}"</div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[currentQuestion.correctAnswer, ...currentQuestion.wrongOptions]
              .sort(() => Math.random() - 0.5)
              .map((o) => {
                const isCorrect = picked && o === currentQuestion.correctAnswer;
                const isWrong = picked === o && o !== currentQuestion.correctAnswer;
                return (
                  <button
                    key={o}
                    disabled={
                      !!picked ||
                      (!isPlaying &&
                        time ===
                          engineSoundGameConfig.timeByDifficulty[
                            currentQuestion.difficulty as keyof typeof engineSoundGameConfig.timeByDifficulty
                          ])
                    }
                    onClick={() => handlePick(o)}
                    className={`relative h-20 px-8 text-left transition-all duration-300 border-2 font-display text-xl tracking-wider ${
                      isCorrect
                        ? "border-success bg-success/10 text-success"
                        : isWrong
                          ? "border-destructive bg-destructive/10 text-destructive"
                          : !isPlaying && !picked
                            ? "opacity-30 border-border cursor-not-allowed"
                            : "border-border bg-card hover:border-primary hover:bg-surface"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={picked && !isCorrect && !isWrong ? "opacity-30" : ""}>
                        {o.toUpperCase()}
                      </span>
                      {isCorrect && <Check className="w-6 h-6" />}
                      {isWrong && <XIcon className="w-6 h-6" />}
                    </div>
                  </button>
                );
              })}
          </div>

          {!isPlaying &&
            !picked &&
            time ===
              engineSoundGameConfig.timeByDifficulty[
                currentQuestion.difficulty as keyof typeof engineSoundGameConfig.timeByDifficulty
              ] && (
              <div className="mt-12 p-8 bg-primary/5 border border-primary/20 flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <Play className="w-6 h-6 ml-1" />
                </div>
                <h3 className="font-display text-2xl tracking-wider">READY TO LISTEN?</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-md">
                  Press play to start the engine. The timer begins as soon as the sound starts.
                  Identify the engine signature as fast as possible.
                </p>
              </div>
            )}

          <div className="mt-12 p-6 bg-surface border border-border flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Timer className="w-5 h-5" />
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground font-medium">Expert Mode:</span> Listen for the turbo
              spool and cylinder count. High streaks unlock legendary status in the Vault.
            </p>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
