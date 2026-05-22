import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { Trophy, Check, X as XIcon, Flame, ArrowRight, Timer } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { HERO_IMAGES, VEHICLES } from "@/data/mock-data";

export const Route = createFileRoute("/games/guess-the-car")({ component: GuessGame });

const QUESTIONS = [
  {
    image: VEHICLES[0]?.image || "",
    answer: "BMW 7 Series",
    options: ["Mercedes S-Class", "BMW 7 Series", "Audi A8", "Lexus LS"],
    brand: "BMW",
  },
  {
    image: VEHICLES[1]?.image || "",
    answer: "Rolls-Royce Cullinan",
    options: ["Bentley Bentayga", "Range Rover", "Rolls-Royce Cullinan", "Maybach GLS"],
    brand: "Rolls-Royce",
  },
  {
    image: VEHICLES[2]?.image || "",
    answer: "Ford Mustang",
    options: ["Dodge Challenger", "Chevrolet Camaro", "Ford Mustang", "Nissan 370Z"],
    brand: "Ford",
  },
  {
    image: VEHICLES[3]?.image || "",
    answer: "Toyota Land Cruiser",
    options: ["Nissan Patrol", "Toyota Land Cruiser", "Lexus LX600", "Mitsubishi Pajero"],
    brand: "Toyota",
  },
  {
    image: VEHICLES[4]?.image || "",
    answer: "Mercedes-Benz S-Class",
    options: ["BMW 7 Series", "Audi A8", "Mercedes-Benz S-Class", "Genesis G90"],
    brand: "Mercedes-Benz",
  },
];

function GuessGame() {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [time, setTime] = useState(10); // 10 seconds per round
  const [picked, setPicked] = useState<string | null>(null);
  const [flash, setFlash] = useState<"correct" | "wrong" | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const q = QUESTIONS[idx % QUESTIONS.length];

  const handlePick = useCallback(
    (p: string) => {
      if (picked || gameOver) return;
      setPicked(p);
      if (p === q.answer) {
        setFlash("correct");
        const timeBonus = Math.floor(time * 10);
        setScore((s) => s + 100 + timeBonus + streak * 20);
        setStreak((s) => s + 1);
      } else {
        setFlash("wrong");
        setStreak(0);
        if (p === "") {
          // Time out
          setTimeout(() => setGameOver(true), 1000);
          return;
        }
      }

      if (idx === QUESTIONS.length - 1) {
        setTimeout(() => setGameOver(true), 1800);
      } else {
        setTimeout(() => {
          setIdx((i) => i + 1);
          setPicked(null);
          setTime(10);
          setFlash(null);
        }, 1800);
      }
    },
    [picked, gameOver, q.answer, time, streak, idx],
  );

  useEffect(() => {
    if (picked || gameOver) return;
    if (time <= 0) {
      handlePick("");
      return;
    }
    const id = setTimeout(() => setTime((t) => t - 0.1), 100);
    return () => clearTimeout(id);
  }, [time, picked, gameOver, handlePick]);

  if (gameOver) {
    return (
      <SiteLayout>
        <div className="container-x py-24 text-center">
          <div className="overline text-primary mb-4">Challenge Complete</div>
          <h1 className="font-display text-7xl md:text-9xl tracking-wider">GAME OVER</h1>
          <div className="mt-10 grid grid-cols-2 gap-4 max-w-md mx-auto">
            <div className="bg-card border border-border p-6">
              <div className="overline">Final Score</div>
              <div className="font-display text-5xl text-primary mt-2">{score}</div>
            </div>
            <div className="bg-card border border-border p-6">
              <div className="overline">Best Streak</div>
              <div className="font-display text-5xl mt-2">{streak}</div>
            </div>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => window.location.reload()}
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

  return (
    <SiteLayout>
      <div
        className={`min-h-[calc(100vh-64px)] transition-colors duration-500 ${flash === "correct" ? "bg-success/5" : flash === "wrong" ? "bg-destructive/5" : "bg-background"}`}
      >
        {/* Timer Bar */}
        <div className="h-1.5 w-full bg-surface relative overflow-hidden">
          <div
            className={`h-full transition-all duration-100 linear ${time < 3 ? "bg-destructive" : "bg-primary"}`}
            style={{ width: `${(time / 10) * 100}%` }}
          />
        </div>

        <div className="container-x py-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="overline tracking-[0.2em]">
                Round {idx + 1}/{QUESTIONS.length}
              </div>
              {streak > 1 && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-[10px] font-mono uppercase tracking-widest animate-bounce">
                  <Flame className="w-3 h-3 fill-current" /> {streak} Streak
                </div>
              )}
            </div>
            <div className="flex gap-8 items-center">
              <div className="flex flex-col items-end">
                <div className="overline text-[10px] opacity-50">Score</div>
                <div className="font-display text-3xl tracking-wider text-primary">{score}</div>
              </div>
              <div className="flex flex-col items-end">
                <div className="overline text-[10px] opacity-50">Time</div>
                <div
                  className={`font-mono text-2xl ${time < 3 ? "text-destructive animate-pulse" : "text-foreground"}`}
                >
                  {time.toFixed(1)}s
                </div>
              </div>
            </div>
          </div>

          <div className="relative aspect-[16/9] bg-card overflow-hidden border border-border group">
            {/* Cropped Image for guessing */}
            <img
              src={q.image}
              alt=""
              className={`w-full h-full object-cover transition-all duration-1000 ${picked ? "scale-100 blur-0" : "scale-[2.5] blur-[2px]"}`}
              style={picked ? {} : { objectPosition: "center 20%" }}
            />

            {/* Flash Overlays */}
            {flash && (
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center backdrop-blur-sm animate-fade-in ${flash === "correct" ? "bg-success/20" : "bg-destructive/20"}`}
              >
                <div className="bg-background/90 p-4 sm:p-8 border border-border flex flex-col items-center">
                  {flash === "correct" ? (
                    <>
                      <Check className="w-12 sm:w-20 h-12 sm:h-20 text-success mb-2 sm:mb-4 animate-scale-in" />
                      <div className="font-display text-2xl sm:text-4xl tracking-widest text-success">
                        CORRECT
                      </div>
                      <div className="font-mono text-xs sm:text-sm mt-1 sm:mt-2">
                        +{100 + Math.floor(time * 10)} PTS
                      </div>
                    </>
                  ) : (
                    <>
                      <XIcon className="w-12 sm:w-20 h-12 sm:h-20 text-destructive mb-2 sm:mb-4 animate-scale-in" />
                      <div className="font-display text-2xl sm:text-4xl tracking-widest text-destructive">
                        WRONG
                      </div>
                      <div className="font-mono text-xs sm:text-sm mt-1 sm:mt-2">
                        IT WAS A {q.answer.toUpperCase()}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {q.options.map((o) => {
              const isCorrect = picked && o === q.answer;
              const isWrong = picked === o && o !== q.answer;
              return (
                <button
                  key={o}
                  disabled={!!picked}
                  onClick={() => handlePick(o)}
                  className={`group relative h-16 sm:h-20 px-4 sm:px-8 text-left transition-all duration-300 border-2 ${
                    isCorrect
                      ? "border-success bg-success/10 text-success"
                      : isWrong
                        ? "border-destructive bg-destructive/10 text-destructive"
                        : "border-border bg-card hover:border-primary hover:bg-surface"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`font-display text-lg sm:text-2xl tracking-wider ${picked && !isCorrect && !isWrong ? "opacity-30" : ""}`}
                    >
                      {o.toUpperCase()}
                    </span>
                    {isCorrect && <Check className="w-4 sm:w-6 h-4 sm:h-6" />}
                    {isWrong && <XIcon className="w-4 sm:w-6 h-4 sm:h-6" />}
                    {!picked && (
                      <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    )}
                  </div>
                  {/* Progress background for picked state could go here */}
                </button>
              );
            })}
          </div>

          <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-surface border border-border flex items-center gap-3 sm:gap-4">
            <div className="h-8 sm:h-10 w-8 sm:w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Timer className="w-4 sm:w-5 h-4 sm:h-5" />
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground">
              <span className="text-foreground font-medium">Quick Tip:</span> The faster you guess,
              the higher your time bonus! Correct streaks multiply your score.
            </p>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
