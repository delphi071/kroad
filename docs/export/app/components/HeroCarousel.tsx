"use client";

import { Children, useCallback, useEffect, useRef, useState } from "react";

export default function HeroCarousel({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const slides = Children.count(children);
  const [anyCollapsed, setAnyCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // Index of the slide currently in view, and whether that slide is showing
  // its hero (not collapsed, not scrolled into the subpage content below).
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inHeroView, setInHeroView] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 1023.98px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Track collapsed/scrolled state of slides, the active slide index, and
  // whether the active slide is currently showing its hero.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const slidesEls = el.querySelectorAll<HTMLElement>("[data-slide]");

    const recompute = () => {
      const blocked = Array.from(slidesEls).some(
        (s) => s.dataset.heroCollapsed === "true" || s.scrollTop > 10
      );
      setAnyCollapsed(blocked);

      const idx = el.clientWidth
        ? Math.round(el.scrollLeft / el.clientWidth)
        : 0;
      setCurrentIndex(idx);

      const active = slidesEls[idx];
      setInHeroView(
        !!active &&
          active.scrollTop <= 10 &&
          active.dataset.heroCollapsed !== "true"
      );
    };

    const observer = new MutationObserver(recompute);
    slidesEls.forEach((s) => {
      observer.observe(s, { attributes: true, attributeFilter: ["data-hero-collapsed"] });
      s.addEventListener("scroll", recompute, { passive: true });
    });
    el.addEventListener("scroll", recompute, { passive: true });
    recompute();
    return () => {
      observer.disconnect();
      slidesEls.forEach((s) => s.removeEventListener("scroll", recompute));
      el.removeEventListener("scroll", recompute);
    };
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const slideWidth = () => el.clientWidth;

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

    // While a hero is in view, block wheel/trackpad scrolling entirely — the
    // wheel no longer changes slides AND it must not scroll into the content
    // either. Content opens only via the "CLICK TO DISCOVER" button; slides
    // change only via the ‹ › arrows or keyboard. Once scrolled into the
    // content (or collapsed) normal vertical scrolling is allowed again.
    const onWheel = (e: WheelEvent) => {
      const idx = Math.round(el.scrollLeft / slideWidth());
      const slidesEls = el.querySelectorAll<HTMLElement>("[data-slide]");
      const slide = slidesEls[idx];
      if (slide && (slide.scrollTop > 10 || slide.dataset.heroCollapsed)) return;
      e.preventDefault();
    };

    // Keyboard arrows still step between slides while viewing a hero.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const idx = Math.round(el.scrollLeft / slideWidth());
        const slidesEls = el.querySelectorAll<HTMLElement>("[data-slide]");
        const slide = slidesEls[idx];
        // collapsed 상태이거나 서브페이지로 스크롤된 경우 좌우 화살표 무시
        if (slide && (slide.scrollTop > 10 || slide.dataset.heroCollapsed)) return;
        e.preventDefault();
        const dir = e.key === "ArrowRight" ? 1 : -1;
        const next = Math.max(0, Math.min(slides - 1, idx + dir));
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

  // Step to an adjacent slide — used by the on-screen ‹ › arrows.
  const goTo = useCallback(
    (idx: number) => {
      const el = ref.current;
      if (!el) return;
      const clamped = Math.max(0, Math.min(slides - 1, idx));
      el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
    },
    [slides]
  );

  // Desktop: when a slide is collapsed or scrolled into subpage, lock horizontal navigation.
  // Mobile: always allow horizontal swipe, even inside the content area.
  const horizDisabled = anyCollapsed && !isMobile;

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div
        ref={ref}
        className={`hero-carousel h-full w-full overflow-y-hidden ${horizDisabled ? "overflow-x-hidden" : "overflow-x-auto"}`}
        style={{ scrollBehavior: "smooth", scrollSnapType: horizDisabled ? "none" : "x mandatory", touchAction: horizDisabled ? "pan-y" : "auto" }}
      >
        <div className="flex h-full" style={{ width: `${slides * 100}vw` }}>
          {children}
        </div>
      </div>

      {/* On-screen prev / next arrows — desktop only. Shown while a hero is in
          view (not collapsed, not scrolled into the subpage content). Mobile
          navigates between slides via touch swipe instead. */}
      {!isMobile && inHeroView && currentIndex > 0 && (
        <button
          type="button"
          aria-label="이전 슬라이드"
          onClick={() => goTo(currentIndex - 1)}
          className="absolute left-[12px] top-1/2 z-40 flex h-[44px] w-[44px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/40 bg-black/30 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/55 sm:left-[24px] sm:h-[68px] sm:w-[68px]"
        >
          <svg viewBox="0 0 24 24" fill="none" className="block h-[28px] w-[28px] sm:h-[34px] sm:w-[34px]" aria-hidden>
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      {!isMobile && inHeroView && currentIndex < slides - 1 && (
        <button
          type="button"
          aria-label="다음 슬라이드"
          onClick={() => goTo(currentIndex + 1)}
          className="absolute right-[12px] top-1/2 z-40 flex h-[44px] w-[44px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/40 bg-black/30 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/55 sm:right-[24px] sm:h-[68px] sm:w-[68px]"
        >
          <svg viewBox="0 0 24 24" fill="none" className="block h-[28px] w-[28px] sm:h-[34px] sm:w-[34px]" aria-hidden>
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
