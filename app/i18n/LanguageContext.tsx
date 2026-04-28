"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import dict from "./dictionary.json";

export type Lang = "ko" | "en";

type Dict = typeof dict;
type LangDict = Dict[Lang];

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: LangDict;
};

const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "koreanroad.lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ko");

  // Load saved lang on mount
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "ko" || saved === "en") setLangState(saved);
    } catch {
      // ignore
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore
    }
    // Reflect on <html lang="..."> for accessibility / CSS hooks
    if (typeof document !== "undefined") {
      document.documentElement.lang = l;
    }
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "ko" ? "en" : "ko");
  }, [lang, setLang]);

  const value = useMemo<Ctx>(
    () => ({ lang, setLang, toggle, t: dict[lang] }),
    [lang, setLang, toggle]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
