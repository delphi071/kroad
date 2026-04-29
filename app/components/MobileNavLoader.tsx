"use client";

import { useEffect, useState } from "react";

const SHOW_MS = 1000;
const FADE_MS = 300;

export default function MobileNavLoader() {
  const [phase, setPhase] = useState<"hidden" | "visible" | "fading">("hidden");

  useEffect(() => {
    let showTimer: number | undefined;
    let fadeTimer: number | undefined;
    const onStart = () => {
      window.clearTimeout(showTimer);
      window.clearTimeout(fadeTimer);
      setPhase("visible");
      showTimer = window.setTimeout(() => {
        setPhase("fading");
        fadeTimer = window.setTimeout(() => setPhase("hidden"), FADE_MS);
      }, SHOW_MS);
    };
    window.addEventListener("mobile-nav-start", onStart);
    return () => {
      window.removeEventListener("mobile-nav-start", onStart);
      window.clearTimeout(showTimer);
      window.clearTimeout(fadeTimer);
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      className="lg:hidden fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity"
      style={{
        opacity: phase === "visible" ? 1 : 0,
        transitionDuration: `${FADE_MS}ms`,
        pointerEvents: phase === "visible" ? "auto" : "none",
      }}
      aria-live="polite"
      aria-busy={phase === "visible"}
    >
      <span
        className="block size-[48px] animate-spin rounded-full border-[6px] border-white/20 border-t-primary"
        aria-hidden
      />
    </div>
  );
}
