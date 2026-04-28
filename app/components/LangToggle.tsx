"use client";

import { useLang } from "../i18n/LanguageContext";

export default function LangToggle({ className = "block size-[28px]" }: { className?: string }) {
  const { toggle, lang } = useLang();
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggle();
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseDown={(e) => e.stopPropagation()}
      aria-label={lang === "ko" ? "Switch to English" : "한국어로 전환"}
      title={lang === "ko" ? "EN" : "KO"}
      className={`${className} cursor-pointer relative z-50 inline-flex items-center justify-center`}
      style={{ pointerEvents: "auto" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/figma/icon-globe.svg" alt="" className="size-full pointer-events-none" />
    </button>
  );
}
