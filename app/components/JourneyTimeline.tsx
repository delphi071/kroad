"use client";
import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n/LanguageContext";

const SLOT_H = 360;
const MAX_INDEX = 5;

const OPACITIES = [1, 0.45, 0.14];

function getOpacity(i: number, activeIndex: number): number {
  const pos = i - activeIndex;
  if (pos < 0 || pos > 2) return 0;
  return OPACITIES[pos];
}

// JourneyTimeline 섹션의 피그마 Y 시작점 (BOTTOM_A 끝)
const FIGMA_SECTION_TOP = 7700;
// sub1-vector8.svg의 피그마 절대 좌표
const VECTOR8_FIGMA_TOP = 768.08;
const VECTOR8_H = 8921.27;

export default function JourneyTimeline() {
  const { t, lang } = useLang();
  const ITEMS = t.subpage1.journey.items;
  const [activeIndex, setActiveIndex] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const slide = wrapper.closest("[data-slide]") as HTMLElement | null;
    if (!slide) return;

    const getWrapperTop = () => {
      const wRect = wrapper.getBoundingClientRect();
      const sRect = slide.getBoundingClientRect();
      return Math.round(wRect.top - sRect.top + slide.scrollTop);
    };

    const onScroll = () => {
      const wrapperTop = getWrapperTop();
      const vh = slide.clientHeight;
      const rel = Math.round(slide.scrollTop - wrapperTop);
      const index = Math.max(0, Math.min(MAX_INDEX, Math.floor(rel / vh)));
      setActiveIndex(index);
    };

    let cooldown = false;
    let endHold = false;
    let endHoldTimer: ReturnType<typeof setTimeout> | null = null;

    const onWheel = (e: WheelEvent) => {
      /* Mobile uses natural scroll over the static vertical timeline — skip. */
      if (!window.matchMedia("(min-width: 1024px)").matches) return;
      if (!e.deltaY || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;

      const wrapperTop = getWrapperTop();
      const vh = slide.clientHeight;
      const relativeScroll = Math.round(slide.scrollTop - wrapperTop);
      const dir = e.deltaY > 0 ? 1 : -1;

      // zone 밖이면 cooldown 리셋 후 브라우저 스크롤 허용
      if (relativeScroll < 0 || relativeScroll >= (MAX_INDEX + 1) * vh) {
        cooldown = false;
        return;
      }

      const currentIndex = Math.max(0, Math.min(MAX_INDEX, Math.floor(relativeScroll / vh)));
      const nextIndex = currentIndex + dir;

      // zone 위로 이탈 → cooldown 리셋 후 허용
      if (nextIndex < 0) {
        cooldown = false;
        return;
      }

      // zone 아래로 이탈 → endHold 중이면 막기, 아니면 허용
      if (nextIndex > MAX_INDEX) {
        if (endHold) e.preventDefault();
        return;
      }

      e.preventDefault();
      if (cooldown) return;

      cooldown = true;
      slide.scrollTop = wrapperTop + nextIndex * vh;

      if (nextIndex === MAX_INDEX) {
        endHold = true;
        if (endHoldTimer) clearTimeout(endHoldTimer);
        endHoldTimer = setTimeout(() => { endHold = false; }, 1200);
      }

      if (dir < 0) {
        cooldown = false;
      } else {
        setTimeout(() => { cooldown = false; }, 700);
      }
    };

    slide.addEventListener("scroll", onScroll, { passive: true });
    slide.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      slide.removeEventListener("scroll", onScroll);
      slide.removeEventListener("wheel", onWheel);
      if (endHoldTimer) clearTimeout(endHoldTimer);
    };
  }, []);

  return (
    <>
      {/* ============= MOBILE — Journey title + vector8 curve + vertical event list =============
          Layout matches Figma node 525:24181 at 390-wide reference frame.
          All offsets (vector8 position, padding-top 454, padding-left 96) are scaled with
          viewport width so proportions stay consistent across mobile sizes. */}
      <div className="bg-grayscale-100 relative overflow-hidden lg:hidden">
        {/* Vector8 mobile curving green line — uses MOBILE-specific SVG.
            Figma coords (left:-42.52, top:0, w:269.517, h:1877.81) scaled with viewport. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/figma/sub1-vector8-mobile.svg"
          alt=""
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            left: "calc(100vw * -42.52 / 390)",
            top: 0,
            width: "calc(100vw * 269.517 / 390)",
            height: "calc(100vw * 1877.81 / 390)",
          }}
        />

        {/* Content positioned to clear the vector's top-right horizontal segment.
            Figma puts header at top:454 / left:96 / width:254 — scaled here to viewport. */}
        <div
          className="relative flex flex-col gap-[40px]"
          style={{
            paddingTop: "calc(100vw * 454 / 390)",
            paddingLeft: "calc(100vw * 96 / 390)",
            paddingRight: "calc(100vw * 40 / 390)",
            paddingBottom: 64,
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-[10px] whitespace-nowrap leading-none">
            <p className="font-pretendard text-grayscale-900 text-[14px] font-extrabold tracking-[-0.56px]">
              {t.subpage1.journey.label}
            </p>
            <p className="font-montserrat text-grayscale-400 text-[14px] font-bold tracking-[-0.56px]">
              {t.subpage1.journey.labelEn}
            </p>
          </div>

          {/* Big title */}
          <div className="font-pretendard text-grayscale-900 text-[50px] font-bold leading-[1.2] tracking-[-1.3px] whitespace-nowrap">
            {t.subpage1.journey.headline.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          {/* Intro paragraph */}
          <div className="font-pretendard text-grayscale-900 text-[16px] tracking-[-0.8px] leading-[1.4]">
            {t.subpage1.journey.intro.map((line, i) => (
              <p key={i}>{line || "\u00A0"}</p>
            ))}
          </div>

          {/* Events list */}
          <div className="flex flex-col gap-[40px] mt-[24px]">
            {ITEMS.map((item) => (
              <div key={item.year} className="flex items-start gap-[16px]">
                <div className="w-[80px] shrink-0">
                  <p className="font-montserrat text-grayscale-900 text-[32px] font-extrabold leading-[1.1] tracking-[-0.32px]">
                    {item.year}
                  </p>
                </div>
                <div className="flex flex-1 flex-col gap-[16px]">
                  {item.events.map((ev, j) => (
                    <div key={j} className="flex items-start gap-[10px]">
                      {ev.month && (
                        <p className="font-montserrat text-grayscale-700 text-[18px] font-extrabold leading-[1.1] tracking-[-0.18px] w-[28px] shrink-0">
                          {ev.month}
                        </p>
                      )}
                      <div className="flex-1">
                        <p className="font-pretendard text-grayscale-700 text-[14px] font-bold leading-[1.5] tracking-[-0.7px]">
                          {ev.title}
                        </p>
                        {ev.desc && (
                          <p className="font-pretendard text-grayscale-600 text-[12px] leading-[1.5] tracking-[-0.6px] mt-[3px]">
                            {ev.desc}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ============= DESKTOP — sticky scroll timeline ============= */}
      <div
        ref={wrapperRef}
        className="hidden lg:block bg-grayscale-100
          [--jt-list-top:0px]
          [--jt-circle-top:70px]
          lg:[--jt-list-top:400px]
          lg:[--jt-circle-top:470px]
        "
        style={{ height: `${(MAX_INDEX + 1) * 100}vh` }}
      >
      <div
        className="sticky top-0 overflow-hidden bg-grayscale-100"
        style={{ height: "100vh" }}
      >
        <div
          className="bg-grayscale-100 relative overflow-hidden text-black"
          style={{
            width: 1920,
            height: 1080,
            transformOrigin: "top left",
            transform: "scale(calc(100vw / 1920px))",
          }}
        >
          {/* sub1-vector8.svg 연속 — 이 섹션의 Y 오프셋으로 정확히 이어짐 */}
          <div
            className="absolute"
            style={{
              left: -62.5,
              top: VECTOR8_FIGMA_TOP - FIGMA_SECTION_TOP,
              width: 1990.5,
              height: VECTOR8_H,
            }}
            aria-hidden
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/sub1-vector8.svg" alt="" className="block h-full w-full" />
          </div>

          {/* 빈 원(테두리만) — 피그마 Ellipse6 위치 */}
          <div
            className="absolute rounded-full bg-grayscale-100"
            style={{
              left: 251,
              top: "var(--jt-circle-top)",
              width: 80,
              height: 80,
              border: "8px solid #0ac200",
            }}
            aria-hidden
          />

          {/* 슬라이딩 연혁 목록 */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "var(--jt-list-top)",
              transform: `translateY(${-activeIndex * SLOT_H}px)`,
              transition: "transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            {ITEMS.map((item, i) => (
              <div
                key={item.year}
                style={{
                  position: "relative",
                  height: SLOT_H,
                  opacity: getOpacity(i, activeIndex),
                  transition: "opacity 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              >
                <p
                  className="absolute font-montserrat font-extrabold leading-[1.1] tracking-[-1px]"
                  style={{ left: 414, top: 60, fontSize: lang === "en" ? 80 : 100 }}
                >
                  {item.year}
                </p>
                {item.events.map((ev, j) => (
                  <div key={j}>
                    {ev.month && (
                      <p
                        className="absolute font-montserrat font-extrabold leading-[1.1] tracking-[-0.6px] text-grayscale-700"
                        style={{ left: 732, top: 78 + j * 160, fontSize: lang === "en" ? 48 : 60 }}
                      >
                        {ev.month}
                      </p>
                    )}
                    <p
                      className={`absolute font-pretendard font-extrabold leading-[1.1] tracking-[-0.36px] text-grayscale-700 ${lang === "en" ? "" : "whitespace-nowrap"}`}
                      style={{ left: 871, top: 91 + j * 160, fontSize: lang === "en" ? 28 : 36, maxWidth: lang === "en" ? 950 : "none" }}
                    >
                      {ev.title}
                    </p>
                    {ev.desc && (
                      <p
                        className={`absolute font-pretendard leading-[1.3] tracking-[-0.24px] ${lang === "en" ? "" : "whitespace-nowrap"}`}
                        style={{ left: 871, top: 160 + j * 160, fontSize: lang === "en" ? 20 : 24, maxWidth: lang === "en" ? 950 : "none" }}
                      >
                        {ev.desc}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
// trigger
