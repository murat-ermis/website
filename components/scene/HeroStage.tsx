"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "@/content/i18n";
import { phaseLabels, ui } from "@/content/site";
import { type PhaseId, phaseStart } from "./poses";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

// The Canvas needs a real DOM, so it is kept out of the static prerender.
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <SceneFallback />,
});

/** Phase the "skip" button jumps to: the character standing up from the desk. */
const EXERCISE_PHASE = 1;

function SceneFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-ink-900">
      <span className="size-2 animate-ping rounded-full bg-sky-400" />
    </div>
  );
}

export function HeroStage({ locale }: { locale: Locale }) {
  const speedRef = useRef(1);
  const clockRef = useRef(0);
  const [phase, setPhase] = useState<PhaseId>("coding");
  const reducedMotion = usePrefersReducedMotion();
  // null means "follow the OS setting"; a boolean is an explicit user choice.
  const [override, setOverride] = useState<boolean | null>(null);
  const playing = override ?? !reducedMotion;

  useEffect(() => {
    speedRef.current = playing ? 1 : 0;
  }, [playing]);

  const togglePlaying = useCallback(() => {
    setOverride(!playing);
  }, [playing]);

  const skipToExercise = useCallback(() => {
    clockRef.current = phaseStart(EXERCISE_PHASE);
    setOverride(true);
  }, []);

  const label = phaseLabels[phase][locale];

  return (
    <div className="relative h-[46vh] min-h-[330px] w-full overflow-hidden rounded-2xl border border-white/10 bg-ink-900 shadow-2xl shadow-black/40 sm:h-[60vh] lg:h-[34rem]">
      <HeroScene
        speedRef={speedRef}
        clockRef={clockRef}
        onPhaseChange={setPhase}
      />

      {/* Vignette so the overlay text stays readable over the render. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent" />

      <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-medium text-slate-200 backdrop-blur">
        <span
          className={`size-1.5 rounded-full ${
            phase === "coding" ? "bg-sky-400" : "bg-emerald-400"
          } ${playing ? "animate-pulse" : ""}`}
        />
        <span aria-live="polite">{label}</span>
      </div>

      <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={togglePlaying}
          className="rounded-full border border-white/15 bg-black/45 px-3.5 py-1.5 text-xs font-medium text-slate-100 backdrop-blur transition hover:border-white/35 hover:bg-black/65"
        >
          {playing ? ui.scenePlaying[locale] : ui.scenePaused[locale]}
        </button>
        <button
          type="button"
          onClick={skipToExercise}
          className="rounded-full border border-white/15 bg-black/45 px-3.5 py-1.5 text-xs font-medium text-slate-100 backdrop-blur transition hover:border-white/35 hover:bg-black/65"
        >
          {ui.sceneSkip[locale]}
        </button>
      </div>

      <p className="pointer-events-none absolute bottom-4 right-4 hidden text-[11px] text-slate-400 sm:block">
        {ui.sceneDrag[locale]}
      </p>

      <span className="sr-only">{ui.sceneDescription[locale]}</span>
    </div>
  );
}
