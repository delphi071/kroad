"use client";

import { Children, useEffect, useRef, useState } from "react";

export default function HeroCarousel({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const slides = Children.count(children);
  const [anyCollapsed, setAnyCollapsed] = useState(false);

  // Watch for any slide entering collapsed state OR scrolled into subpage (mobile) — disable horizontal swipe
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const slidesEls = el.querySelectorAll<HTMLElement>("[data-slide]");

    const recompute = () => {
      const blocked = Array.from(slidesEls).some(
        (s) => s.dataset.heroCollapsed === "true" || s.scrollTop > 10
      );
      setAnyCollapsed(blocked);
    };

    const observer = new MutationObserver(recompute);
    slidesEls.forEach((s) => {
      observer.observe(s, { attributes: true, attributeFilter: ["data-hero-collapsed"] });
      s.addEventListener("scroll", recompute, { passive: true });
    });
    recompute();
    return () => {
      observer.disconnect();
      slidesEls.forEach((s) => s.removeEventListener("scroll", recompute));
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const slideWidth = () => el.clientWidth;

    const activeSlide = (): HTMLElement | null => {
      const idx = Math.round(el.scrollLeft / slideWidth());
      const slidesEls = el.querySelectorAll<HTMLElement>("[data-slide]");
      return slidesEls[idx] ?? null;
    };

    // Scroll to slide based on URL hash (#h1 through #h6, optionally with -subKey suffix)
    const scrollToHash = (smooth = false) => {
      const m = window.location.hash.match(/^#h([1-6])(?:-(.+))?$/);
      if (!m) return;
      const idx = parseInt(m[1], 10) - 1;
      const subKey = m[2];
      const isMobile = window.matchMedia("(max-width: 1023.98px)").matches;
      const slidesEls = el.querySelectorAll<HTMLElement>("[data-slide]");
      const target = slidesEls[idx];

      // Reset all slides' collapsed state so overflow-x reopens for programmatic scroll
      slidesEls.forEach((s) => {
        delete s.dataset.heroCollapsed;
        if (s !== target) s.scrollTop = 0;
      });
      if (target) target.scrollTop = 0;

      el.scrollTo({ left: idx * slideWidth(), behavior: smooth ? "smooth" : "auto" });

      const fire = () =>
        subKey &&
        window.dispatchEvent(
          new CustomEvent(`nav-h${idx + 1}`, { detail: { subKey } })
        );

      if (isMobile && subKey && target) {
        // Mobile: scroll past hero so subpage is visible, then fire event
        window.setTimeout(() => {
          target.scrollTo({ top: target.clientHeight - 64, behavior: "smooth" });
          window.setTimeout(fire, 400);
        }, smooth ? 350 : 0);
      } else if (subKey) {
        if (smooth) window.setTimeout(fire, 350);
        else fire();
      }
    };

    // Initial scroll
    requestAnimationFrame(() => scrollToHash(false));

    // Listen for hash changes (when nav/footer links are clicked)
    const onHashChange = () => scrollToHash(true);
    window.addEventListener("hashchange", onHashChange);

    let cooldown = false;

    const onWheel = (e: WheelEvent) => {
      const slide = activeSlide();
      // 히어로가 collapsed 상태이거나 서브페이지로 스크롤된 경우 세로 스크롤 허용
      if (slide && (slide.scrollTop > 10 || slide.dataset.heroCollapsed)) {
        return;
      }

      // Trackpad horizontal pans pass through
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;

      // Allow downward wheel to act as horizontal step ONLY when not at end of vertical scroll capacity
      e.preventDefault();
      if (cooldown) return;

      const dir = e.deltaY > 0 ? 1 : -1;
      const current = Math.round(el.scrollLeft / slideWidth());
      const next = Math.max(0, Math.min(slides - 1, current + dir));
      if (next !== current) {
        cooldown = true;
        el.scrollTo({ left: next * slideWidth(), behavior: "smooth" });
        window.setTimeout(() => {
          cooldown = false;
        }, 600);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const slide = activeSlide();
        // collapsed 상태이거나 서브페이지로 스크롤된 경우 좌우 화살표 무시
        if (slide && (slide.scrollTop > 10 || slide.dataset.heroCollapsed)) return;
        e.preventDefault();
        const dir = e.key === "ArrowRight" ? 1 : -1;
        const current = Math.round(el.scrollLeft / slideWidth());
        const next = Math.max(0, Math.min(slides - 1, current + dir));
        el.scrollTo({ left: next * slideWidth(), behavior: "smooth" });
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);

    return () => {
      el.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [slides]);

  return (
    <div
      ref={ref}
      className={`hero-carousel relative h-screen w-screen overflow-y-hidden ${anyCollapsed ? "overflow-x-hidden" : "overflow-x-auto"}`}
      style={{ scrollBehavior: "smooth", scrollSnapType: anyCollapsed ? "none" : "x mandatory", touchAction: anyCollapsed ? "pan-y" : "auto" }}
    >
      <div className="flex h-full" style={{ width: `${slides * 100}vw` }}>
        {children}
      </div>
    </div>
  );
}
