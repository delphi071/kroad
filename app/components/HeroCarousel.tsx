"use client";

import { Children, useEffect, useRef } from "react";

export default function HeroCarousel({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const slides = Children.count(children);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const slideWidth = () => el.clientWidth;

    const activeSlide = (): HTMLElement | null => {
      const idx = Math.round(el.scrollLeft / slideWidth());
      const slidesEls = el.querySelectorAll<HTMLElement>("[data-slide]");
      return slidesEls[idx] ?? null;
    };

    // Initial scroll from URL hash (#h1 through #h6)
    const hashMatch = window.location.hash.match(/^#h([1-6])$/);
    if (hashMatch) {
      const idx = parseInt(hashMatch[1], 10) - 1;
      requestAnimationFrame(() => {
        el.scrollLeft = idx * slideWidth();
      });
    }

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
        if (slide && slide.scrollTop > 10) return; // in subpage, ignore arrow keys
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
    };
  }, [slides]);

  return (
    <div
      ref={ref}
      className="hero-carousel relative h-screen w-screen overflow-x-auto overflow-y-hidden"
      style={{ scrollBehavior: "smooth", scrollSnapType: "x mandatory" }}
    >
      <div className="flex h-full" style={{ width: `${slides * 100}vw` }}>
        {children}
      </div>
    </div>
  );
}
