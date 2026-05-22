import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Trophy, Check, X as XIcon } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { HERO_IMAGES } from "@/lib/mock-data";

export const Route = createFileRoute("/games/guess-the-car")({ component: GuessGame });

const QUESTIONS = [
  { image: HERO_IMAGES[0], answer: "BMW 7 Series", options: ["Mercedes S-Class", "BMW 7 Series", "Audi A8", "Lexus LS"] },
  { image: HERO_IMAGES[1], answer: "Rolls-Royce Cullinan", options: ["Bentley Bentayga", "Range Rover", "Rolls-Royce Cullinan", "Maybach GLS"] },
  { image: HERO_IMAGES[2], answer: "Ford Mustang", options: ["Dodge Challenger", "Chevrolet Camaro", "Ford Mustang", "Nissan 370Z"] },
];

function GuessGame() {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [time, setTime] = useState(15);
  const [picked, setPicked] = useState<string | null>(null);
  const [flash, setFlash] = useState<"correct" | "wrong" | null>(null);

  useEffect(() => {
    if (picked) return;
    if (time <= 0) { handlePick(""); return; }
    const id = setTimeout(() => setTime((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [time, picked]);

  const q = QUESTIONS[idx % QUESTIONS.length];

  function handlePick(p: string) {
    setPicked(p);
    if (p === q.answer) {
      setFlash("correct");
      setScore((s) => s + 100 + streak * 10);
      setStreak((s) => s + 1);
    } else {
      setFlash("wrong");
      setStreak(0);
    }
    setTimeout(() => {
      setIdx((i) => i + 1);
      setPicked(null);
      setTime(15);
      setFlash(null);
    }, 1800);
  }

  return (
    <SiteLayout>
      <div className={`relative transition-colors duration-300 ${flash === "correct" ? "bg-success/10" : flash === "wrong" ? "bg-destructive/10" : ""}`}>
        <div className="container-x py-10">
          <div className="flex items-center justify-between mb-6">
            <div className="overline">Guess The Car</div>
            <div className="flex gap-6 text-sm">
              <span className="inline-flex items-center gap-2"><Trophy className="w-4 h-4 text-primary" /> <span className="font-mono">{score}</span></span>
              <span>Streak: <span className="font-mono text-primary">{streak}</span></span>
            </div>
          </div>

          <div className="h-1 bg-border mb-6 overflow-hidden">
            <div className="h-full bg-primary transition-all" style={{ width: `${(time / 15) * 100}%` }} />
          </div>

          <div className="aspect-[16/9] bg-card overflow-hidden mb-8 relative">
            <img src={q.image} alt="" className={`w-full h-full object-cover transition-all ${picked ? "scale-100" : "scale-[1.6]"}`} style={picked ? {} : { objectPosition: "30% 40%" }} />
            {flash && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/70">
                {flash === "correct" ? <Check className="w-32 h-32 text-success" /> : <XIcon className="w-32 h-32 text-destructive" />}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {q.options.map((o) => {
              const isCorrect = picked && o === q.answer;
              const isWrong = picked === o && o !== q.answer;
              return (
                <button
                  key={o}
                  disabled={!!picked}
                  onClick={() => handlePick(o)}
                  className={`h-14 px-5 text-left font-display text-xl tracking-wider border transition-colors ${
                    isCorrect ? "border-success bg-success/10 text-success" :
                    isWrong ? "border-destructive bg-destructive/10 text-destructive" :
                    "border-border hover:border-primary"
                  }`}
                >
                  {o}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
