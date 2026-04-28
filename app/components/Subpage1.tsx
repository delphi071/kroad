"use client";

import { useEffect, useRef } from "react";
import Footer from "./Footer";
import CoreValues from "./CoreValues";
import { useLang } from "../i18n/LanguageContext";
import JourneyTimeline from "./JourneyTimeline";
import { getMainHref, getSubHref } from "./navLinks";

/* Mobile footer nav columns — duplicated from Footer.tsx since that one is desktop-only. */
const NAV_COLS = [
  {
    title: "우리의 길",
    items: ["설립목적", "비전 및 핵심가치", "주요 연혁", "사람들", "오시는 길"],
  },
  { title: "같은 길, 다른 시선", items: ["전문역량"] },
  {
    title: "우리가 걷는 길",
    items: ["코리아둘레길", "지역길 조사 및 계획", "걷기 문화 프로그램", "굿즈 개발 및 판매"],
  },
  {
    title: "함께 걷는 사람들",
    items: ["한국걷는길연합", "ATN", "WTN", "코리아둘레길\n완보자 클럽"],
  },
  { title: "알리는 이야기", items: ["공지사항", "소식받기", "문의하기"] },
  { title: "마음잇기", items: ["후원하기", "연간기금 및\n활동 실적내역"] },
];

// Figma PC base: page total ~14000px, banner-area is 0..613.
const F  = (figmaY: number) => figmaY - 613;   // TOP section
const FB = (figmaY: number) => figmaY - 5940;  // BOTTOM_A section (journey header + intro)
const FC = (figmaY: number) => figmaY - 10026; // BOTTOM_B section (people + location + footer)

const TOP_HEIGHT      = 5072 - 613;   // 4459
const BOTTOM_A_HEIGHT = 7700 - 5940;  // 1760
const BOTTOM_GAP_HEIGHT = 10026 - 8780; // 1246
const BOTTOM_B_HEIGHT = 14000 - 10026; // 3974

export default function Subpage1() {
  const { t, lang } = useLang();
  const rootRef = useRef<HTMLDivElement>(null);

  // React to nav links like #h1-mission, #h1-vision, #h1-journey, #h1-people, #h1-location
  useEffect(() => {
    const handler = (e: Event) => {
      const subKey = (e as CustomEvent<{ subKey?: string }>).detail?.subKey;
      if (!subKey) return;
      const root = rootRef.current;
      if (!root) return;
      const slide = root.closest("[data-slide]") as HTMLElement | null;
      if (!slide) return;
      const isMobile = window.matchMedia("(max-width: 1023.98px)").matches;
      const selector = subKey === "journey" && isMobile
        ? `[data-section="journey-mobile"]`
        : `[data-section="${subKey}"]`;
      const targets = root.querySelectorAll<HTMLElement>(selector);
      const target = Array.from(targets).find((el) => el.offsetParent !== null);
      if (!target) return;
      const offsetTop =
        target.getBoundingClientRect().top - slide.getBoundingClientRect().top + slide.scrollTop;
      slide.scrollTo({ top: offsetTop - (isMobile ? 80 : 0), behavior: "smooth" });
    };
    window.addEventListener("nav-h1", handler);
    return () => window.removeEventListener("nav-h1", handler);
  }, []);

  return (
    <div ref={rootRef} className="bg-grayscale-100">
      {/* ===========================================================================
          MOBILE — Mission + Vision (matches Figma node 525:24085 mobile layout)
          Centered single column, 50px headings, quote box, 3 vertical full-width
          mission cards. The PC TOP section below is hidden on mobile.
          =========================================================================== */}
      <div className="lg:hidden flex flex-col items-center gap-[83px] px-[20px] py-[64px]">
        {/* Mission header */}
        <div data-section="mission" className="flex items-center gap-[10px] whitespace-nowrap leading-none" style={{ scrollMarginTop: 80 }}>
          <p className="font-pretendard text-grayscale-900 text-[14px] font-extrabold tracking-[-0.56px]">
            {t.subpage1.mission.label}
          </p>
          <p className="font-montserrat text-grayscale-400 text-[14px] font-bold tracking-[-0.56px]">
            {t.subpage1.mission.labelEn}
          </p>
        </div>

        {/* Mission big text — Regular block + Bold block */}
        <div className={`flex flex-col items-center gap-[24px] text-center font-pretendard text-grayscale-900 tracking-[-1.3px] ${lang === "en" ? "" : "whitespace-nowrap"}`}>
          <div>
            {t.subpage1.mission.bigRegularMobile.map((line, i) => (
              <p key={i} className={`${lang === "en" ? "text-[36px]" : "text-[50px]"} leading-[1.2]`}>{line}</p>
            ))}
          </div>
          <div>
            {t.subpage1.mission.bigBoldMobile.map((line, i) => (
              <p key={i} className={`${lang === "en" ? "text-[36px]" : "text-[50px]"} font-bold leading-[1.2]`}>{line}</p>
            ))}
          </div>
        </div>

        {/* Quote box — actual Figma SVG quote marks */}
        <div className="flex flex-col items-center gap-[24px] w-[295px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/figma/sub1-quote-open.svg"
            alt=""
            aria-hidden
            className="block h-[22px] w-[24px]"
          />
          <div className="font-pretendard text-grayscale-900 text-[16px] tracking-[-0.8px] leading-[1.4] text-center">
            {t.subpage1.mission.quoteMobile.map((line, i) => (
              <p key={i}>{line || "\u00A0"}</p>
            ))}
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/figma/sub1-quote-close.svg"
            alt=""
            aria-hidden
            className="block h-[22px] w-[24px]"
          />
        </div>

        {/* 3 Mission cards — vertical full-width stack */}
        <div className="flex flex-col gap-[40px] w-full">
          {[
            "/figma/sub1-mission-card1.png",
            "/figma/sub1-mission-card2.png",
            "/figma/sub1-mission-card3.png",
          ].map((src, i) => (
            <div key={i} className="flex flex-col gap-[16px] w-full">
              <div className="aspect-square w-full overflow-hidden bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  className="block h-full w-full object-cover"
                />
              </div>
              <div className="font-pretendard text-primary text-[12px] tracking-[-0.6px] text-center">
                {t.subpage1.mission.cards[i].map((line, j) => (
                  <p key={j} className="leading-[1.5]">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Vector68 vertical green decorative line (Figma SVG) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/figma/sub1-vector68.svg"
          alt=""
          aria-hidden
          className="block h-[300px] w-[24px] object-contain"
        />

        {/* Vision — text + inline pill images per Figma. Each row is text with a 50px-tall image
            embedded between words. Pill-shaped (rounded-full) images use overflow-hidden. */}
        <div data-section="vision" className="flex flex-col items-center gap-[24px] text-center font-pretendard tracking-[-1.196px] whitespace-nowrap" style={{ scrollMarginTop: 80 }}>
          {lang === "ko" ? (
            <>
              {/* 걷는 [pill img347] 길이 */}
              <div className="flex items-center gap-[6px] justify-center">
                <p className="text-primary text-[46px] font-bold leading-[1.2]">걷는</p>
                <div className="h-[50px] w-[94px] overflow-hidden rounded-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/figma/sub1-vision-img347.png" alt="" aria-hidden className="block h-full w-full object-cover" />
                </div>
                <p className="text-[46px] font-bold leading-[1.2] text-grayscale-900">
                  <span className="text-primary">길</span>이
                </p>
              </div>
              <div className="flex items-center gap-[6px] justify-center">
                <p className="text-grayscale-900 text-[46px] font-bold leading-[1.2]">행복한</p>
                <div className="h-[50px] w-[67px] overflow-hidden rounded-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/figma/sub1-vision-img349.png" alt="" aria-hidden className="block h-full w-full object-cover" />
                </div>
              </div>
              <div className="flex items-center gap-[6px] justify-center">
                <p className="text-[46px] font-bold leading-[1.2] text-grayscale-900">
                  <span className="text-primary">이야기</span>가 되는 곳
                </p>
                <div className="h-[50px] w-[68px] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/figma/sub1-vision-img350.png" alt="" aria-hidden className="block h-full w-full object-cover" />
                </div>
              </div>
              <div className="flex items-center gap-[6px] justify-center">
                <p className="text-grayscale-900 text-[46px] font-bold leading-[1.2]">대한민국</p>
                <div className="h-[50px] w-[31px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/figma/sub1-vision-group39.svg" alt="" aria-hidden className="block h-full w-full object-contain" />
                </div>
              </div>
              <div className="flex items-center gap-[6px] justify-center">
                <p className="text-grayscale-900 text-[46px] font-bold leading-[1.2]">걷기 문화의</p>
                <div className="size-[50px] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/figma/sub1-vision-img346.png" alt="" aria-hidden className="block h-full w-full object-cover" />
                </div>
                <p className="text-grayscale-900 text-[46px] font-bold leading-[1.2]">중심</p>
              </div>
            </>
          ) : (
            t.subpage1.vision.tagline.map((line, i) => (
              <p key={i} className="text-grayscale-900 text-[28px] font-bold leading-[1.3] text-center">
                {line}
              </p>
            ))
          )}
        </div>

        {/* Vector68 vertical green decorative line (closing) — same SVG as top */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/figma/sub1-vector68.svg"
          alt=""
          aria-hidden
          className="block h-[300px] w-[24px] object-contain"
        />
      </div>

      {/* ===== TOP: Mission + Vision (DESKTOP ONLY) ===== */}
      <div
        className="hidden lg:block relative w-full overflow-hidden bg-grayscale-100"
        style={{ height: `calc(100vw * ${TOP_HEIGHT} / 1920)` }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left text-black"
          style={{
            width: 1920,
            height: TOP_HEIGHT,
            transform: "scale(calc(100vw / 1920px))",
          }}
        >
          {/* Long green decorative path (Vector 8) */}
          <div
            className="absolute"
            style={{ left: -62.5, top: F(768.08), width: 1990.5, height: 8921.27 }}
            aria-hidden
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/sub1-vector8.svg" alt="" className="block h-full w-full" />
          </div>

          {/* ============= SECTION 1: Mission (설립목적) ============= */}
          <div
            data-section="mission"
            className="absolute flex items-end gap-[14px] whitespace-nowrap"
            style={{ left: 190, top: F(900) }}
          >
            <p className="font-pretendard text-[30px] font-extrabold leading-[1.2] tracking-[-0.78px]">
              {t.subpage1.mission.label}
            </p>
            <p className="font-montserrat text-[32px] font-bold leading-none tracking-[-1.28px] text-grayscale-400">
              {t.subpage1.mission.labelEn}
            </p>
          </div>

          <div
            className="absolute font-pretendard tracking-[-1px]"
            style={{ left: 190, top: F(1000) }}
          >
            {t.subpage1.mission.bigRegular.map((line, i) => (
              <p key={`r${i}`} className={`${lang === "en" ? "text-[80px]" : "text-[100px]"} font-normal leading-[1.1]`}>{line}</p>
            ))}
            {t.subpage1.mission.bigBold.map((line, i) => (
              <p key={`b${i}`} className={`${lang === "en" ? "text-[80px]" : "text-[100px]"} font-bold leading-[1.1]`}>{line}</p>
            ))}
          </div>

          <p
            className="absolute font-serif text-[124.444px] leading-none"
            style={{ left: 713, top: F(1744) }}
            aria-hidden
          >
            &ldquo;
          </p>
          <div
            className="absolute font-pretendard text-[36px] tracking-[-0.72px] whitespace-nowrap"
            style={{ left: 788, top: F(1788) }}
          >
            {t.subpage1.mission.quote.map((line, i) => (
              <p key={i} className="leading-[1.3]">{line || "\u00A0"}</p>
            ))}
          </div>
          <p
            className="absolute font-serif text-[124.444px] leading-none"
            style={{ left: 1667, top: F(1909) }}
            aria-hidden
          >
            &rdquo;
          </p>

          <div
            className="absolute flex gap-[10px]"
            style={{ left: 190, top: F(2211), width: 1530 }}
          >
            {[
              "/figma/sub1-mission-card1.png",
              "/figma/sub1-mission-card2.png",
              "/figma/sub1-mission-card3.png",
            ].map((src, i) => (
              <div key={i} className="flex flex-1 flex-col items-start gap-[98px]">
                <div className="aspect-square w-full overflow-hidden bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt="" className="block h-full w-full object-cover" />
                </div>
                <div className="w-full text-center font-pretendard text-[30px] tracking-[-0.9px] text-primary">
                  {t.subpage1.mission.cards[i].map((line, j) => (
                    <p key={j} className="leading-[1.3]">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Vision 위쪽 초록 세로 막대 (Mission cards 아래 ↔ Vision 헤더 위) */}
          <div
            className="absolute -translate-x-1/2 bg-primary"
            style={{ left: "50%", top: F(3018), width: 32, height: 556.5 }}
            aria-hidden
          />

          {/* ============= SECTION 2: Vision ============= */}
          <div
            data-section="vision"
            className="absolute flex -translate-x-1/2 items-end gap-[14px] whitespace-nowrap"
            style={{ left: "50%", top: F(3664) }}
          >
            <p className="font-pretendard text-[30px] font-extrabold leading-[1.2] tracking-[-0.78px]">
              {t.subpage1.vision.label}
            </p>
            <p className="font-montserrat text-[32px] font-bold leading-none tracking-[-1.28px] text-grayscale-400">
              {t.subpage1.vision.labelEn}
            </p>
          </div>

          <div
            className="absolute flex -translate-x-1/2 flex-col items-center gap-[34px] whitespace-nowrap"
            style={{ left: "50%", top: F(3810) }}
          >
            {lang === "ko" ? (
              <>
                <div className="flex items-center justify-center gap-[20px] font-pretendard text-[124px] font-bold leading-[1.2] tracking-[-7.44px]">
                  <span className="text-primary">걷는</span>
                  <span>
                    <span className="text-primary">길</span>이
                  </span>
                </div>
                <div className="flex items-center justify-center gap-[20px] font-pretendard text-[124px] font-bold leading-[1.2] tracking-[-7.44px]">
                  <span>행복한</span>
                  <span>이야기가&nbsp; 되는 곳</span>
                </div>
                <div className="flex items-center justify-center gap-[20px] font-pretendard text-[124px] font-bold leading-[1.2] tracking-[-7.44px]">
                  <span>대한민국</span>
                  <span className="text-primary">걷기 문화의</span>
                  <span className="text-primary">중심</span>
                </div>
              </>
            ) : (
              <>
                {t.subpage1.vision.tagline.map((line, i) => (
                  <div key={i} className="font-pretendard text-[80px] font-bold leading-[1.2] tracking-[-3.2px] text-center">
                    {line}
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Vision 아래쪽 초록 세로 막대 */}
          <div
            className="absolute -translate-x-1/2 bg-primary"
            style={{ left: "50%", top: F(4451), width: 32, height: 616 }}
            aria-hidden
          />
        </div>
      </div>

      {/* ===== SECTION 3: Core Value (핵심가치) — sticky scroll ===== */}
      <CoreValues />

      {/* ===== BOTTOM_A: Journey header + intro (DESKTOP ONLY) ===== */}
      <div
        className="hidden lg:block relative w-full overflow-hidden bg-grayscale-100"
        style={{ height: `calc(100vw * ${BOTTOM_A_HEIGHT} / 1920)` }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left text-black"
          style={{
            width: 1920,
            height: BOTTOM_A_HEIGHT,
            transform: "scale(calc(100vw / 1920px))",
          }}
        >
          {/* Vector 8 continuation */}
          <div
            className="absolute"
            style={{ left: -62.5, top: FB(768.08), width: 1990.5, height: 8921.27 }}
            aria-hidden
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/sub1-vector8.svg" alt="" className="block h-full w-full" />
          </div>

          {/* ============= SECTION 4: Our Journey (주요 연혁) ============= */}
          <div
            data-section="journey"
            className="absolute flex items-end gap-[14px] whitespace-nowrap"
            style={{ left: 414, top: FB(6833) }}
          >
            <p className="font-pretendard text-[30px] font-extrabold leading-[1.2] tracking-[-0.78px]">
              {t.subpage1.journey.label}
            </p>
            <p className="font-montserrat text-[32px] font-bold leading-none tracking-[-1.28px] text-grayscale-400">
              {t.subpage1.journey.labelEn}
            </p>
          </div>

          <p
            className={`absolute font-pretendard ${lang === "en" ? "text-[80px]" : "text-[100px]"} font-bold leading-[1.1] tracking-[-1px]`}
            style={{ left: 414, top: FB(6925) }}
          >
            {t.subpage1.journey.headline.join(" ")}
          </p>

          <div
            className="absolute font-pretendard text-[36px] leading-[1.3] tracking-[-0.72px] whitespace-nowrap"
            style={{ left: 414, top: FB(7100) }}
          >
            {t.subpage1.journey.intro.map((line, i) => (
              <p key={i}>{line || "\u00A0"}</p>
            ))}
          </div>
        </div>
      </div>

      {/* ===== SECTION 4 Timeline: Journey entries (sticky scroll, 3 visible at a time) ===== */}
      <div data-section="journey-mobile" className="lg:hidden" style={{ scrollMarginTop: 80 }} />
      <JourneyTimeline />

      {/* ===== BOTTOM_GAP: Vector8 곡선 — 연혁과 사람들 사이 (DESKTOP ONLY) ===== */}
      <div
        className="hidden lg:block relative w-full overflow-hidden bg-grayscale-100"
        style={{ height: `calc(100vw * ${BOTTOM_GAP_HEIGHT} / 1920)` }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: 1920,
            height: BOTTOM_GAP_HEIGHT,
            transform: "scale(calc(100vw / 1920px))",
          }}
        >
          <div
            className="absolute"
            style={{ left: -62.5, top: 768.08 - 8780, width: 1990.5, height: 8889.419 }}
            aria-hidden
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/sub1-vector8.svg" alt="" className="block h-full w-full" />
          </div>
        </div>
      </div>

      {/* ===== BOTTOM_B: Our People + Location + Footer (DESKTOP ONLY) ===== */}
      <div
        className="hidden lg:block relative w-full overflow-hidden bg-grayscale-100"
        style={{ height: `calc(100vw * ${BOTTOM_B_HEIGHT} / 1920)` }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left text-black"
          style={{
            width: 1920,
            height: BOTTOM_B_HEIGHT,
            transform: "scale(calc(100vw / 1920px))",
          }}
        >
          {/* ============= SECTION 5: Our People (사람들) ============= */}
          <div
            data-section="people"
            className="absolute flex items-end gap-[14px] whitespace-nowrap"
            style={{ left: 226, top: FC(10026) }}
          >
            <p className="font-pretendard text-[30px] font-extrabold leading-[1.2] tracking-[-0.78px]">
              {t.subpage1.people.label}
            </p>
            <p className="font-montserrat text-[32px] font-bold leading-none tracking-[-1.28px] text-grayscale-400">
              {t.subpage1.people.labelEn}
            </p>
          </div>

          <p
            className={`absolute font-pretendard ${lang === "en" ? "text-[80px]" : "text-[100px]"} font-bold leading-[1.1] tracking-[-1px]`}
            style={{ left: 226, top: FC(10118), maxWidth: 1500 }}
          >
            {t.subpage1.people.headline}
          </p>

          <div
            className="absolute flex -translate-x-1/2 items-center justify-center rounded-full bg-primary p-[40px]"
            style={{ left: "50%", top: FC(10475), width: 300 }}
          >
            <p className="font-pretendard text-[36px] font-extrabold leading-[1.1] tracking-[-0.36px] text-white">
              {t.subpage1.people.chairperson}
            </p>
          </div>

          <div
            className="absolute flex items-center justify-center rounded-full bg-primary py-[40px]"
            style={{ left: 381, top: FC(11040), width: 1158 }}
          >
            <p className="font-pretendard text-[36px] font-extrabold leading-[1.1] tracking-[-0.36px] text-white">
              {t.subpage1.people.secretariat}
            </p>
          </div>

          <div
            className="absolute flex items-center justify-center rounded-full bg-primary p-[40px]"
            style={{ left: 1139, top: FC(10758), width: 300 }}
          >
            <p className="font-pretendard text-[36px] font-extrabold leading-[1.1] tracking-[-0.36px] text-white">
              {t.subpage1.people.auditor}
            </p>
          </div>

          <div
            className="absolute flex gap-[19px]"
            style={{ left: 381, top: FC(11279), width: 1158 }}
          >
            {t.subpage1.people.teams.map((team, i) => (
              <div
                key={i}
                className="flex flex-1 items-center justify-center rounded-full border-[3px] border-solid border-primary py-[40px]"
              >
                <p className={`font-pretendard ${lang === "en" ? "text-[24px]" : "text-[30px]"} font-bold leading-[1.5] tracking-[-1.2px] text-primary text-center`}>
                  {team}
                </p>
              </div>
            ))}
          </div>

          <div
            className="absolute flex items-stretch gap-[19px]"
            style={{ left: 381, top: FC(11433), width: 1158 }}
          >
            {t.subpage1.people.teamItems.map((items, idx) => (
              <div
                key={idx}
                className="flex flex-1 flex-col items-center justify-center gap-[24px] rounded-[30px] border-[3px] border-solid border-primary py-[50px]"
              >
                {items.map((item, j) => (
                  <p
                    key={j}
                    className={`font-pretendard ${lang === "en" ? "text-[24px]" : "text-[30px]"} leading-[1.3] tracking-[-0.9px] text-primary text-center`}
                  >
                    {item}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* ============= 조직도 연결선 ============= */}
          <svg
            className="absolute pointer-events-none"
            style={{ left: 0, top: 0, width: 1920, height: BOTTOM_B_HEIGHT, overflow: "visible" }}
            aria-hidden
          >
            <g stroke="#0ac200" strokeWidth="3" strokeDasharray="5 8" fill="none">
              {/* 이사장 하단 → 사무처 상단 수직선 */}
              <line x1="960" y1={FC(10475) + 120} x2="960" y2={FC(11040)} />
              {/* 감사 분기 수평선 */}
              <line x1="960" y1={FC(10758) + 60} x2="1139" y2={FC(10758) + 60} />
              {/* 사무처 하단 → 팀 분기점 수직선 */}
              <line x1="960" y1={FC(11040) + 120} x2="960" y2={FC(11279) - 40} />
              {/* 팀 분기 수평선 */}
              <line x1="568" y1={FC(11279) - 40} x2="1352" y2={FC(11279) - 40} />
              {/* 각 팀으로 수직 드롭 — 박스 내부까지 */}
              <line x1="568"  y1={FC(11279) - 40} x2="568"  y2={FC(11279) + 38} />
              <line x1="960"  y1={FC(11279) - 40} x2="960"  y2={FC(11279) + 38} />
              <line x1="1352" y1={FC(11279) - 40} x2="1352" y2={FC(11279) + 38} />
            </g>
            {/* 팀 내부 연결 점 */}
            <circle cx="568"  cy={FC(11279) + 38} r="6" fill="#0ac200" />
            <circle cx="960"  cy={FC(11279) + 38} r="6" fill="#0ac200" />
            <circle cx="1352" cy={FC(11279) + 38} r="6" fill="#0ac200" />
          </svg>

          {/* ============= SECTION 6: Location (오시는 길) ============= */}
          <div
            data-section="location"
            className="absolute flex items-end gap-[14px] whitespace-nowrap"
            style={{ left: 200, top: FC(12188) }}
          >
            {t.subpage1.location.label && (
              <p className="font-pretendard text-[30px] font-extrabold leading-[1.2] tracking-[-0.78px]">
                {t.subpage1.location.label}
              </p>
            )}
            <p className={`font-montserrat text-[32px] font-bold leading-none tracking-[-1.28px] ${lang === "en" ? "text-grayscale-900" : "text-grayscale-400"}`}>
              {t.subpage1.location.labelEn}
            </p>
          </div>

          <div
            className="absolute flex items-center"
            style={{ left: 200, top: FC(12364), width: 1400, height: 610 }}
          >
            {/* 지도 일러스트 */}
            <div className="relative h-[610px] w-[694px] shrink-0 overflow-hidden bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/sub1-map-vector21.svg" alt="" aria-hidden style={{ position:"absolute", left:-7, top:-40.41, width:421.807, height:640.477 }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/sub1-map-vector22.svg" alt="" aria-hidden style={{ position:"absolute", left:186.45, top:-24.63, width:525.016, height:180.386 }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/sub1-map-vector23.svg" alt="" aria-hidden style={{ position:"absolute", left:81.76, top:109.96, width:419.892, height:470.643 }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/sub1-map-vector24.svg" alt="" aria-hidden style={{ position:"absolute", left:408.86, top:-3.72, width:68.069, height:143.285 }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/sub1-map-vector25.svg" alt="" aria-hidden style={{ position:"absolute", left:329.58, top:-27.62, width:69.731, height:146.029 }} />
              <div style={{ position:"absolute", left:61.95, top:492.15, width:64.122, height:102.558, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <div style={{ transform:"rotate(8.31deg)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/figma/sub1-map-vector36.svg" alt="" aria-hidden style={{ display:"block", width:50.751, height:96.235 }} />
                </div>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/sub1-map-ellipse12.svg" alt="" aria-hidden style={{ position:"absolute", left:313.01, top:363.24, width:29.685, height:29.685 }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/sub1-map-ellipse13.svg" alt="" aria-hidden style={{ position:"absolute", left:259.31, top:260.79, width:15.321, height:15.321 }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/sub1-map-ellipse13.svg" alt="" aria-hidden style={{ position:"absolute", left:54.91, top:537.35, width:15.321, height:15.321 }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/sub1-map-ellipse14.svg" alt="" aria-hidden style={{ position:"absolute", left:551.44, top:57.3, width:15.321, height:15.321 }} />
              {/* 역명 라벨 */}
              <p style={{ position:"absolute", left:284.5, top:257.83, width: lang === "en" ? 110 : 59.508, fontFamily:"Pretendard, sans-serif", fontSize: lang === "en" ? 14 : 17.651, lineHeight:1.5, textAlign:"center", letterSpacing:-0.8825, color:"#000" }}>
                {t.subpage1.location.samgakji.map((line, i) => (<span key={i}>{i > 0 && <br/>}{line}</span>))}
              </p>
              <p style={{ position:"absolute", left:520.7, top:77.4, width: lang === "en" ? 160 : 74.385, fontFamily:"Pretendard, sans-serif", fontSize: lang === "en" ? 14 : 17.651, lineHeight:1.5, textAlign:"center", letterSpacing:-0.8825, color:"#000" }}>
                {t.subpage1.location.warMemorial}
              </p>
              <p style={{ position:"absolute", left:34, top:473, width: lang === "en" ? 110 : 59.508, fontFamily:"Pretendard, sans-serif", fontSize: lang === "en" ? 14 : 17.651, lineHeight:1.5, textAlign:"center", letterSpacing:-0.8825, color:"#000" }}>
                {t.subpage1.location.sinyongsan.map((line, i) => (<span key={i}>{i > 0 && <br/>}{line}</span>))}
              </p>
            </div>
            {/* 우측 정보 패널 */}
            <div className="flex h-[610px] w-[706px] shrink-0 flex-col justify-between px-[50px] py-[70px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/footer-beyond-logo.svg" alt="Beyond the Trails" style={{ width:200, height:84 }} />
              <div className="flex flex-col gap-[34px]">
                <div className="flex items-start gap-[24px]">
                  <div className="size-[40px] shrink-0 rounded-full border border-solid border-primary" />
                  <div className={`font-pretendard ${lang === "en" ? "text-[20px]" : "text-[24px]"} leading-[1.3] tracking-[-0.24px]`}>
                    {t.subpage1.location.address.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-[24px]">
                  <div className="size-[40px] shrink-0 rounded-full border border-solid border-primary" />
                  <p className="font-pretendard text-[24px] leading-[1.3] tracking-[-0.24px] whitespace-nowrap">
                    {t.subpage1.location.phone}
                  </p>
                </div>
                <div className="flex items-center gap-[24px]">
                  <div className="size-[40px] shrink-0 rounded-full border border-solid border-primary" />
                  <p className="font-pretendard text-[24px] leading-[1.3] tracking-[-0.24px] whitespace-nowrap">
                    {t.subpage1.location.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ============= FOOTER ============= */}
          <div className="absolute" style={{ left: 0, top: FC(13325), width: 1920 }}>
            <Footer />
          </div>
        </div>
      </div>

      {/* ===========================================================================
          MOBILE — People + Location + Green map block + Footer
          (placed after the desktop sections so on mobile the order is:
           Mission/Vision mobile → CoreValues mobile → JourneyTimeline mobile → here)
          =========================================================================== */}
      <div className="lg:hidden flex flex-col items-center gap-[83px] px-[20px] py-[64px]">
        {/* People header */}
        <div data-section="people" className="flex items-center gap-[10px] whitespace-nowrap leading-none" style={{ scrollMarginTop: 80 }}>
          <p className="font-pretendard text-grayscale-900 text-[14px] font-extrabold tracking-[-0.56px]">
            {t.subpage1.people.label}
          </p>
          <p className="font-montserrat text-grayscale-400 text-[14px] font-bold tracking-[-0.56px]">
            {t.subpage1.people.labelEn}
          </p>
        </div>

        {/* People big text */}
        <p className={`text-center font-pretendard text-grayscale-900 ${lang === "en" ? "text-[32px]" : "text-[50px]"} font-bold leading-[1.2] tracking-[-1.3px]`}>
          {t.subpage1.people.headline}
        </p>

        {/* Org chart — Figma node 525:24213. 390-frame scaled to 90vw with 5vw margin each side. */}
        <div
          className="relative -mx-[20px]"
          style={{ width: "calc(100% + 40px)", height: "calc(90vw * 380 / 390)" }}
        >
          <div
            className="absolute top-0"
            style={{
              left: "5vw",
              width: 390,
              height: 380,
              transformOrigin: "top left",
              transform: "scale(calc(90vw / 390px))",
            }}
          >
            {/* Dashed connector lines via inline SVG (matches Figma vector65/66/71 pattern) */}
            <svg
              className="absolute left-0 top-0 pointer-events-none"
              width={390}
              height={380}
              viewBox="0 0 390 380"
              aria-hidden
            >
              <g stroke="#0ac200" strokeWidth="1.5" strokeDasharray="4 5" fill="none">
                {/* 이사장 하단(195, 35) → 사무처 상단(195, 161) 수직선 */}
                <line x1="195" y1="35" x2="195" y2="161" />
                {/* 감사 분기 수평선 (이사장-사무처 중간 y=93에서 우측 감사 중심으로) */}
                <line x1="195" y1="93" x2="305" y2="93" />
                {/* 사무처 하단(195, 196) → 팀 분기점(195, 215) 수직선 */}
                <line x1="195" y1="196" x2="195" y2="215" />
                {/* 팀 분기 수평선 (3 팀 중심을 가로로 잇는 선) */}
                <line x1="63" y1="215" x2="325" y2="215" />
                {/* 각 팀으로 수직 드롭 (분기선에서 팀 박스 상단까지) */}
                <line x1="63" y1="215" x2="63" y2="231" />
                <line x1="195" y1="215" x2="195" y2="231" />
                <line x1="325" y1="215" x2="325" y2="231" />
              </g>
              {/* 팀 진입점 원형 마커 */}
              <circle cx="63" cy="231" r="3.5" fill="#0ac200" />
              <circle cx="195" cy="231" r="3.5" fill="#0ac200" />
              <circle cx="325" cy="231" r="3.5" fill="#0ac200" />
            </svg>

            {/* 이사장 — top center pill */}
            <div
              className="bg-primary absolute flex items-center justify-center rounded-full"
              style={{ left: 145, top: 0, width: 101, height: 35 }}
            >
              <p className="font-pretendard text-white text-[12px] font-extrabold leading-[1.1] tracking-[-0.12px] whitespace-nowrap">
                {t.subpage1.people.chairperson}
              </p>
            </div>

            {/* 감사 — right branch pill */}
            <div
              className="bg-primary absolute flex items-center justify-center rounded-full"
              style={{ left: 255, top: 76, width: 101, height: 35 }}
            >
              <p className="font-pretendard text-white text-[12px] font-extrabold leading-[1.1] tracking-[-0.12px] whitespace-nowrap">
                {t.subpage1.people.auditor}
              </p>
            </div>

            {/* 사무처 — full-width pill */}
            <div
              className="bg-primary absolute flex items-center justify-center rounded-full"
              style={{ left: 0, top: 161, width: 390, height: 35 }}
            >
              <p className="font-pretendard text-white text-[12px] font-extrabold leading-[1.1] tracking-[-0.12px] whitespace-nowrap">
                {t.subpage1.people.secretariat}
              </p>
            </div>

            {/* 3 team pills (outlined) */}
            <div
              className="absolute flex gap-[6px]"
              style={{ left: 0, top: 231, width: 390, height: 37 }}
            >
              {t.subpage1.people.teams.map((team, i) => (
                <div
                  key={i}
                  className="border border-primary flex flex-1 items-center justify-center rounded-full px-[4px]"
                >
                  <p className={`font-pretendard text-primary ${lang === "en" ? "text-[8px]" : "text-[10px]"} font-bold leading-[1.5] tracking-[-0.4px] text-center`}>
                    {team}
                  </p>
                </div>
              ))}
            </div>

            {/* 3 detail boxes */}
            <div
              className="absolute flex gap-[6px]"
              style={{ left: 0, top: 280, width: 390, height: 96 }}
            >
              {t.subpage1.people.teamItems.map((items, idx) => (
                <div
                  key={idx}
                  className="border border-primary flex flex-1 flex-col items-center justify-center gap-[6px] rounded-[10px] px-[4px] py-[12px]"
                >
                  {items.map((item, j) => (
                    <p
                      key={j}
                      className={`font-pretendard text-primary ${lang === "en" ? "text-[8px]" : "text-[10px]"} leading-[1.3] tracking-[-0.3px] text-center`}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Location header */}
        <div data-section="location" className="flex items-center gap-[10px] whitespace-nowrap leading-none" style={{ scrollMarginTop: 80 }}>
          {t.subpage1.location.label && (
            <p className="font-pretendard text-grayscale-900 text-[14px] font-extrabold tracking-[-0.56px]">
              {t.subpage1.location.label}
            </p>
          )}
          <p className={`font-montserrat text-[14px] font-bold tracking-[-0.56px] ${lang === "en" ? "text-grayscale-900" : "text-grayscale-400"}`}>
            {t.subpage1.location.labelEn}
          </p>
        </div>

        {/* Location body — map + logo + address, all LEFT-aligned (per Figma items-start) */}
        <div className="flex flex-col items-start gap-[32px] w-full">
          {/* Map illustration — proportional 362×318 frame (Figma 597:10106) */}
          <div className="bg-white relative w-full aspect-[362/318] overflow-hidden">
            {/* Main road grid (vector21) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/figma/sub1-map-vector21.svg"
              alt=""
              aria-hidden
              className="absolute"
              style={{ left: "-1.01%", top: "-6.64%", width: "60.86%", height: "105.2%" }}
            />
            {/* Top horizontal road (vector22) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/figma/sub1-map-vector22.svg"
              alt=""
              aria-hidden
              className="absolute"
              style={{ left: "26.9%", top: "-4.05%", width: "75.75%", height: "29.63%" }}
            />
            {/* Lower road network (vector23) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/figma/sub1-map-vector23.svg"
              alt=""
              aria-hidden
              className="absolute"
              style={{ left: "11.79%", top: "18.06%", width: "60.58%", height: "77.3%" }}
            />
            {/* Vertical small roads (vector24, vector25) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/figma/sub1-map-vector24.svg"
              alt=""
              aria-hidden
              className="absolute"
              style={{ left: "58.99%", top: "-0.61%", width: "9.82%", height: "23.53%" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/figma/sub1-map-vector25.svg"
              alt=""
              aria-hidden
              className="absolute"
              style={{ left: "47.55%", top: "-4.54%", width: "10.06%", height: "23.99%" }}
            />
            {/* Bottom rotated piece (vector36) — rotated 8.31deg per Figma */}
            <div
              className="absolute flex items-center justify-center"
              style={{ left: "8.94%", top: "80.83%", width: "9.25%", height: "16.85%" }}
            >
              <div className="rotate-[8.31deg]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/figma/sub1-map-vector36.svg"
                  alt=""
                  aria-hidden
                  className="block"
                  style={{ width: 26, height: 50 }}
                />
              </div>
            </div>
            {/* 삼각지역 green marker (ellipse12) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/figma/sub1-map-ellipse12.svg"
              alt=""
              aria-hidden
              className="absolute"
              style={{ left: "45.16%", top: "59.66%", width: "4.28%", height: "4.88%" }}
            />
            {/* Small black markers — building (ellipse13) and 신용산역 */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/figma/sub1-map-ellipse13.svg"
              alt=""
              aria-hidden
              className="absolute"
              style={{ left: "37.41%", top: "42.83%", width: "2.21%", height: "2.52%" }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/figma/sub1-map-ellipse13.svg"
              alt=""
              aria-hidden
              className="absolute"
              style={{ left: "7.92%", top: "88.26%", width: "2.21%", height: "2.52%" }}
            />
            {/* 전쟁기념관 black marker (ellipse14) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/figma/sub1-map-ellipse14.svg"
              alt=""
              aria-hidden
              className="absolute"
              style={{ left: "79.35%", top: "9.41%", width: "2.21%", height: "2.52%" }}
            />
            {/* Labels */}
            <p
              className="absolute font-pretendard text-grayscale-900 text-[12px] text-center tracking-[-0.6px] leading-[1.5] whitespace-nowrap"
              style={{ left: "46.47%", top: "41.42%", transform: "translateX(-50%)" }}
            >
              {t.subpage1.location.samgakji.map((line, i) => (<span key={i}>{i > 0 && <br />}{line}</span>))}
            </p>
            <p
              className="absolute font-pretendard text-grayscale-900 text-[12px] tracking-[-0.6px] leading-[1.5] whitespace-nowrap"
              style={{
                left: "80.45%",
                top: "12.71%",
                transform: lang === "en" ? "translateX(-100%)" : "translateX(-50%)",
                textAlign: lang === "en" ? "right" : "center",
              }}
            >
              {t.subpage1.location.warMemorial}
            </p>
            <p
              className="absolute font-pretendard text-grayscale-900 text-[12px] tracking-[-0.6px] leading-[1.5] whitespace-nowrap"
              style={{
                left: "8.91%",
                top: "75.97%",
                transform: lang === "en" ? "translateX(0)" : "translateX(-50%)",
                textAlign: lang === "en" ? "left" : "center",
              }}
            >
              {t.subpage1.location.sinyongsan.map((line, i) => (<span key={i}>{i > 0 && <br />}{line}</span>))}
            </p>
          </div>

          {/* Beyond logo — left-aligned */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/figma/footer-beyond-logo.svg"
            alt="Beyond the Trails"
            className="block w-[110px] h-[46px] object-contain"
          />

          {/* Address / phone / email — left-aligned */}
          <div className="flex flex-col items-start gap-[20px]">
            <div className="flex items-start gap-[12px]">
              <div className="border border-primary rounded-full size-[24px] shrink-0 mt-[2px]" />
              <div className="font-pretendard text-grayscale-900 text-[14px] tracking-[-0.7px] leading-[1.5]">
                {t.subpage1.location.address.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-[12px]">
              <div className="border border-primary rounded-full size-[24px] shrink-0" />
              <p className="font-pretendard text-grayscale-900 text-[14px] tracking-[-0.7px] leading-[1.5] whitespace-nowrap">
                {t.subpage1.location.phone}
              </p>
            </div>
            <div className="flex items-center gap-[12px]">
              <div className="border border-primary rounded-full size-[24px] shrink-0" />
              <p className="font-pretendard text-grayscale-900 text-[14px] tracking-[-0.7px] leading-[1.5] whitespace-nowrap">
                {t.subpage1.location.email}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===========================================================================
          MOBILE FOOTER — Figma node 320:2748 mobile layout (390-frame)
          Beyond logo with subtitle overlaid (under "Route"), 6 nav cols (2x3),
          calligraphy + social icons row, cert buttons row, company info.
          =========================================================================== */}
      <div className="lg:hidden bg-grayscale-100 flex flex-col items-center gap-[40px] px-[20px] py-[64px]">
        <div className="flex flex-col items-center gap-[8px]">
          <div className="relative" style={{ width: 281, height: 215 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/figma/footer-union.svg"
              alt="Beyond the Route"
              className="absolute block"
              style={{ left: 0, top: 0, width: "100%", height: "100%" }}
            />
          </div>
          <p
            className="font-montserrat text-primary font-semibold leading-none whitespace-nowrap"
            style={{ fontSize: 10 }}
          >
            Korean Trails and Culture Foundation
          </p>
        </div>

        {/* Nav columns — 2 rows × 3 cols */}
        <div className="flex flex-col gap-[24px] w-full">
          <div className="flex items-start justify-between w-full">
            {NAV_COLS.slice(0, 3).map((col, colIdx) => {
              const dictCol = t.footer.cols[colIdx];
              return (
                <div key={col.title} className="flex flex-col items-center gap-[10px] w-[100px]">
                  <a href={getMainHref(colIdx)} className="font-pretendard text-grayscale-900 text-[12px] font-bold leading-none text-center hover:text-primary" style={{ whiteSpace: "pre-line" }}>
                    {dictCol.title || col.title}
                  </a>
                  <div className="flex flex-col items-center gap-[6px]">
                    {col.items.map((item, itemIdx) => (
                      <a
                        key={item}
                        href={getSubHref(colIdx, itemIdx)}
                        className="font-pretendard text-grayscale-600 text-[12px] leading-[1.5] tracking-[-0.6px] text-center hover:text-primary"
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {dictCol.items[itemIdx] || item}
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex items-start justify-between w-full">
            {NAV_COLS.slice(3, 6).map((col, colIdx) => {
              const dictCol = t.footer.cols[colIdx + 3];
              return (
                <div key={col.title} className="flex flex-col items-center gap-[10px] w-[100px]">
                  <a href={getMainHref(colIdx + 3)} className="font-pretendard text-grayscale-900 text-[12px] font-bold leading-none text-center hover:text-primary" style={{ whiteSpace: "pre-line" }}>
                    {dictCol.title || col.title}
                  </a>
                  <div className="flex flex-col items-center gap-[6px]">
                    {col.items.map((item, itemIdx) => (
                      <a
                        key={item}
                        href={getSubHref(colIdx + 3, itemIdx)}
                        className="font-pretendard text-grayscale-600 text-[12px] leading-[1.5] tracking-[-0.6px] text-center hover:text-primary"
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {dictCol.items[itemIdx] || item}
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Calligraphy logo + social icons row — full-width with justify-between.
            Logo pushes to left edge, icons group pushes to right edge (centered group). */}
        <div className="flex items-center justify-between w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/figma/footer-group32.svg"
            alt="사단법인 한국의길과문화"
            className="block shrink-0"
            style={{ width: 134, height: 56 }}
          />
          <div className="flex items-center gap-[24px] shrink-0">
            <a href="https://www.instagram.com/koreatnc1" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="block size-[32px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/footer-icon-instagram.svg" alt="" className="size-full" />
            </a>
            <a href="https://smartstore.naver.com/koreatnc" target="_blank" rel="noopener noreferrer" aria-label="스토어" className="block size-[32px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/footer-icon-store.svg" alt="" className="size-full" />
            </a>
          </div>
        </div>

        {/* Cert buttons */}
        <div className="flex items-center gap-[12px]">
          <div className="relative h-[40px] w-[160px]">
            <div className="absolute size-[40px]" style={{ left: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/footer-group.svg" alt="" className="block size-full" />
            </div>
            <div className="absolute" style={{ left: 50, top: 12, right: 0, height: 16 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/figma/footer-group1.svg"
                alt="국민권익위원회"
                className="block size-full object-contain"
              />
            </div>
          </div>
          <div className="h-[40px] w-[90px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/footer-frame371.svg" alt="국세청" className="block size-full object-contain" />
          </div>
        </div>

        {/* Company info */}
        <div className="flex flex-col items-center gap-[6px] text-center">
          <p className="font-pretendard text-grayscale-600 text-[10px] font-bold leading-none">
            대표 : 홍성운 · 사업자등록번호 : 123-82-14123
          </p>
          <p className="font-pretendard text-grayscale-600 text-[10px] font-bold leading-[1.5]">
            서울특별시 용산구 한강대로52길 25-8, DB Tower 402호
          </p>
          <p className="font-pretendard text-grayscale-600 text-[10px] font-bold leading-none">
            대표전화 : 02-6013-6610 · 팩스 : 02-6937-0259
          </p>
          <p className="font-pretendard text-grayscale-600 text-[10px] font-bold leading-none">
            이메일 : ktnc@tnc.or.kr
          </p>
          <p className="font-pretendard text-grayscale-600 text-[10px] font-bold leading-none mt-[12px]">
            Copyrightⓒ Korea Trails and Culture Foundation, All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}


// trigger
