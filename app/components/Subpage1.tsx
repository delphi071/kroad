"use client";

import { useEffect, useRef } from "react";
import Footer from "./Footer";
import CoreValues from "./CoreValues";
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
            설립목적
          </p>
          <p className="font-montserrat text-grayscale-400 text-[14px] font-bold tracking-[-0.56px]">
            Mission
          </p>
        </div>

        {/* Mission big text — Regular block + Bold block */}
        <div className="flex flex-col items-center gap-[24px] text-center font-pretendard text-grayscale-900 tracking-[-1.3px] whitespace-nowrap">
          <div>
            <p className="text-[50px] leading-[1.2]">길 위에서</p>
            <p className="text-[50px] leading-[1.2]">사람과 지역,</p>
            <p className="text-[50px] leading-[1.2]">자연을 잇고</p>
          </div>
          <div>
            <p className="text-[50px] font-bold leading-[1.2]">지속가능한</p>
            <p className="text-[50px] font-bold leading-[1.2]">걷기문화를</p>
            <p className="text-[50px] font-bold leading-[1.2]">만듭니다</p>
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
            <p>출범 이후 지난 십여년간 걷기여행길에 문화를</p>
            <p>입히고 지속가능한 걷기여행길과</p>
            <p>올바른 걷기문화를 위한 방향을 제시하며</p>
            <p>다양한 활동을 해왔습니다.</p>
            <p>&nbsp;</p>
            <p>대한민국을 대표하는 코리아둘레길, 경기둘레길을 포함한 다양한 걷기 길을 지속적으로</p>
            <p>연구∙관리·운영하는 가운데,</p>
            <p>새로운 걷기 기반 문화 프로그램을 운영하며</p>
            <p>걷기 문화 확산을 위한 걸음을 이어가고 있습니다.</p>
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
            {
              src: "/figma/sub1-mission-card1.png",
              text: ["좋은 길을 찾고", "길에 문화와 이야기를 입혀", "길에 숨을 불어 넣는다."],
            },
            {
              src: "/figma/sub1-mission-card2.png",
              text: [
                "길위에서",
                "사람과 지역, 자연을 연결하여",
                "지속가능한 사회적 가치를 창출한다.",
              ],
            },
            {
              src: "/figma/sub1-mission-card3.png",
              text: [
                "길을 통해 치유와 배움 등을",
                "제공하여 창조적 걷기 여행 문화를",
                "만들고 길의 이용을 활성화한다.",
              ],
            },
          ].map((card, i) => (
            <div key={i} className="flex flex-col gap-[16px] w-full">
              <div className="aspect-square w-full overflow-hidden bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.src}
                  alt=""
                  className="block h-full w-full object-cover"
                />
              </div>
              <div className="font-pretendard text-primary text-[12px] tracking-[-0.6px] text-center">
                {card.text.map((line, j) => (
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
          {/* 걷는 [pill img347] 길이 */}
          <div className="flex items-center gap-[6px] justify-center">
            <p className="text-primary text-[46px] font-bold leading-[1.2]">걷는</p>
            <div className="h-[50px] w-[94px] overflow-hidden rounded-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/figma/sub1-vision-img347.png"
                alt=""
                aria-hidden
                className="block h-full w-full object-cover"
              />
            </div>
            <p className="text-[46px] font-bold leading-[1.2] text-grayscale-900">
              <span className="text-primary">길</span>이
            </p>
          </div>

          {/* 행복한 [pill img349] */}
          <div className="flex items-center gap-[6px] justify-center">
            <p className="text-grayscale-900 text-[46px] font-bold leading-[1.2]">행복한</p>
            <div className="h-[50px] w-[67px] overflow-hidden rounded-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/figma/sub1-vision-img349.png"
                alt=""
                aria-hidden
                className="block h-full w-full object-cover"
              />
            </div>
          </div>

          {/* 이야기가 되는 곳 [img350] */}
          <div className="flex items-center gap-[6px] justify-center">
            <p className="text-[46px] font-bold leading-[1.2] text-grayscale-900">
              <span className="text-primary">이야기</span>가 되는 곳
            </p>
            <div className="h-[50px] w-[68px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/figma/sub1-vision-img350.png"
                alt=""
                aria-hidden
                className="block h-full w-full object-cover"
              />
            </div>
          </div>

          {/* 대한민국 [Korea map SVG] */}
          <div className="flex items-center gap-[6px] justify-center">
            <p className="text-grayscale-900 text-[46px] font-bold leading-[1.2]">대한민국</p>
            <div className="h-[50px] w-[31px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/figma/sub1-vision-group39.svg"
                alt=""
                aria-hidden
                className="block h-full w-full object-contain"
              />
            </div>
          </div>

          {/* 걷기 문화의 [img346] 중심 */}
          <div className="flex items-center gap-[6px] justify-center">
            <p className="text-grayscale-900 text-[46px] font-bold leading-[1.2]">걷기 문화의</p>
            <div className="size-[50px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/figma/sub1-vision-img346.png"
                alt=""
                aria-hidden
                className="block h-full w-full object-cover"
              />
            </div>
            <p className="text-grayscale-900 text-[46px] font-bold leading-[1.2]">중심</p>
          </div>
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
              설립목적
            </p>
            <p className="font-montserrat text-[32px] font-bold leading-none tracking-[-1.28px] text-grayscale-400">
              Mission
            </p>
          </div>

          <div
            className="absolute font-pretendard tracking-[-1px]"
            style={{ left: 190, top: F(1000) }}
          >
            <p className="text-[100px] font-normal leading-[1.1]">길 위에서</p>
            <p className="text-[100px] font-normal leading-[1.1]">
              사람과 지역, 자연을 잇고
            </p>
            <p className="text-[100px] font-bold leading-[1.1]">
              지속가능한 걷기문화를 만듭니다
            </p>
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
            <p className="leading-[1.3]">한국의길과문화는 단순히 길을 관리 하는 곳이 아니라</p>
            <p className="leading-[1.3]">이야기와 문화가 숨쉬는 길을 통해</p>
            <p className="leading-[1.3]">지역경제를 활성화하고, 생태계를 보전하며,</p>
            <p className="leading-[1.3]">탐방객에게 치유와 배움을 제공하여</p>
            <p className="leading-[1.3]">
              지속 가능한 탐방 문화를 일구겠다는 존재 이유로 설립되었습니다.
            </p>
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
              {
                src: "/figma/sub1-mission-card1.png",
                text: ["좋은 길을 찾고", "길에 문화와 이야기를 입혀", "길에 숨을 불어 넣는다."],
              },
              {
                src: "/figma/sub1-mission-card2.png",
                text: [
                  "길위에서",
                  "사람과 지역, 자연을 연결하여",
                  "지속가능한 사회적 가치를 창출한다.",
                ],
              },
              {
                src: "/figma/sub1-mission-card3.png",
                text: [
                  "길을 통해 치유와 배움 등을",
                  "제공하여 창조적 걷기 여행 문화를",
                  "만들고 길의 이용을 활성화한다.",
                ],
              },
            ].map((card, i) => (
              <div key={i} className="flex flex-1 flex-col items-start gap-[98px]">
                <div className="aspect-square w-full overflow-hidden bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={card.src} alt="" className="block h-full w-full object-cover" />
                </div>
                <div className="w-full text-center font-pretendard text-[30px] tracking-[-0.9px] text-primary">
                  {card.text.map((line, j) => (
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
              우리가 꿈꾸는 미래
            </p>
            <p className="font-montserrat text-[32px] font-bold leading-none tracking-[-1.28px] text-grayscale-400">
              Vision
            </p>
          </div>

          <div
            className="absolute flex -translate-x-1/2 flex-col items-center gap-[34px] whitespace-nowrap"
            style={{ left: "50%", top: F(3810) }}
          >
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
              주요 연혁
            </p>
            <p className="font-montserrat text-[32px] font-bold leading-none tracking-[-1.28px] text-grayscale-400">
              Our Journey
            </p>
          </div>

          <p
            className="absolute font-pretendard text-[100px] font-bold leading-[1.1] tracking-[-1px]"
            style={{ left: 414, top: FB(6925) }}
          >
            우리가 걸어온 길
          </p>

          <div
            className="absolute font-pretendard text-[36px] leading-[1.3] tracking-[-0.72px] whitespace-nowrap"
            style={{ left: 414, top: FB(7100) }}
          >
            <p>출범 이후 지난 십여년간 걷기여행길에 문화를 입히고</p>
            <p>지속가능한 걷기여행길과 올바른 걷기문화를 위한 방향을 제시하며 다양한 활동을 해왔습니다.</p>
            <p>&nbsp;</p>
            <p>대한민국을 대표하는 코리아둘레길, 경기둘레길을 포함한</p>
            <p>다양한 걷기 길을 지속적으로 연구∙관리·운영하는 가운데,</p>
            <p>새로운 걷기 기반 문화 프로그램을 운영하며 걷기 문화 확산을 위한 걸음을 이어가고 있습니다.</p>
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
              사람들
            </p>
            <p className="font-montserrat text-[32px] font-bold leading-none tracking-[-1.28px] text-grayscale-400">
              Our People
            </p>
          </div>

          <p
            className="absolute font-pretendard text-[100px] font-bold leading-[1.1] tracking-[-1px]"
            style={{ left: 226, top: FC(10118) }}
          >
            한국의 길과 문화를 만들어가는 사람들
          </p>

          <div
            className="absolute flex -translate-x-1/2 items-center justify-center rounded-full bg-primary p-[40px]"
            style={{ left: "50%", top: FC(10475), width: 300 }}
          >
            <p className="font-pretendard text-[36px] font-extrabold leading-[1.1] tracking-[-0.36px] text-white">
              이사장
            </p>
          </div>

          <div
            className="absolute flex items-center justify-center rounded-full bg-primary py-[40px]"
            style={{ left: 381, top: FC(11040), width: 1158 }}
          >
            <p className="font-pretendard text-[36px] font-extrabold leading-[1.1] tracking-[-0.36px] text-white">
              사무처
            </p>
          </div>

          <div
            className="absolute flex items-center justify-center rounded-full bg-primary p-[40px]"
            style={{ left: 1139, top: FC(10758), width: 300 }}
          >
            <p className="font-pretendard text-[36px] font-extrabold leading-[1.1] tracking-[-0.36px] text-white">
              감사
            </p>
          </div>

          <div
            className="absolute flex gap-[19px]"
            style={{ left: 381, top: FC(11279), width: 1158 }}
          >
            {["탐방로팀", "문화콘텐츠팀", "운영지원팀"].map((team) => (
              <div
                key={team}
                className="flex flex-1 items-center justify-center rounded-full border-[3px] border-solid border-primary py-[40px]"
              >
                <p className="font-pretendard text-[30px] font-bold leading-[1.5] tracking-[-1.2px] text-primary">
                  {team}
                </p>
              </div>
            ))}
          </div>

          <div
            className="absolute flex items-stretch gap-[19px]"
            style={{ left: 381, top: FC(11433), width: 1158 }}
          >
            {[
              ["코리아둘레길 사업", "연구사업", "컨설팅 사업"],
              ["콘텐츠 사업", "교육사업", "교류사업"],
              ["조직관리", "홍보마케팅", "협의체 관리"],
            ].map((items, idx) => (
              <div
                key={idx}
                className="flex flex-1 flex-col items-center justify-center gap-[24px] rounded-[30px] border-[3px] border-solid border-primary py-[50px]"
              >
                {items.map((item) => (
                  <p
                    key={item}
                    className="font-pretendard text-[30px] leading-[1.3] tracking-[-0.9px] text-primary"
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
            <p className="font-pretendard text-[30px] font-extrabold leading-[1.2] tracking-[-0.78px]">
              오시는 길
            </p>
            <p className="font-montserrat text-[32px] font-bold leading-none tracking-[-1.28px] text-grayscale-400">
              Location
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
              <p style={{ position:"absolute", left:284.5, top:257.83, width:59.508, fontFamily:"Pretendard, sans-serif", fontSize:17.651, lineHeight:1.5, textAlign:"center", letterSpacing:-0.8825, color:"#000" }}>
                삼각지역<br/>3번 출구
              </p>
              <p style={{ position:"absolute", left:520.7, top:77.4, width:74.385, fontFamily:"Pretendard, sans-serif", fontSize:17.651, lineHeight:1.5, textAlign:"center", letterSpacing:-0.8825, color:"#000" }}>
                전쟁기념관
              </p>
              <p style={{ position:"absolute", left:34, top:473, width:59.508, fontFamily:"Pretendard, sans-serif", fontSize:17.651, lineHeight:1.5, textAlign:"center", letterSpacing:-0.8825, color:"#000" }}>
                신용산역<br/>1번 출구
              </p>
            </div>
            {/* 우측 정보 패널 */}
            <div className="flex h-[610px] w-[706px] shrink-0 flex-col justify-between px-[50px] py-[70px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/footer-beyond-logo.svg" alt="Beyond the Trails" style={{ width:200, height:84 }} />
              <div className="flex flex-col gap-[34px]">
                <div className="flex items-center gap-[24px]">
                  <div className="size-[40px] shrink-0 rounded-full border border-solid border-primary" />
                  <p className="font-pretendard text-[24px] leading-[1.3] tracking-[-0.24px] whitespace-nowrap">
                    서울특별시 용산구 한강대로52길 25-8, DB Tower 402호
                  </p>
                </div>
                <div className="flex items-center gap-[24px]">
                  <div className="size-[40px] shrink-0 rounded-full border border-solid border-primary" />
                  <p className="font-pretendard text-[24px] leading-[1.3] tracking-[-0.24px] whitespace-nowrap">
                    02-6013-6610
                  </p>
                </div>
                <div className="flex items-center gap-[24px]">
                  <div className="size-[40px] shrink-0 rounded-full border border-solid border-primary" />
                  <p className="font-pretendard text-[24px] leading-[1.3] tracking-[-0.24px] whitespace-nowrap">
                    ktnc@tnc.or.kr
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
            사람들
          </p>
          <p className="font-montserrat text-grayscale-400 text-[14px] font-bold tracking-[-0.56px]">
            Our People
          </p>
        </div>

        {/* People big text */}
        <div className="text-center font-pretendard text-grayscale-900 text-[50px] font-bold leading-[1.2] tracking-[-1.3px] whitespace-nowrap">
          <p>한국의 길과 문화를</p>
          <p>만들어가는 사람들</p>
        </div>

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
              <p className="font-pretendard text-white text-[12px] font-extrabold leading-[1.1] tracking-[-0.12px]">
                이사장
              </p>
            </div>

            {/* 감사 — right branch pill */}
            <div
              className="bg-primary absolute flex items-center justify-center rounded-full"
              style={{ left: 255, top: 76, width: 101, height: 35 }}
            >
              <p className="font-pretendard text-white text-[12px] font-extrabold leading-[1.1] tracking-[-0.12px]">
                감사
              </p>
            </div>

            {/* 사무처 — full-width pill */}
            <div
              className="bg-primary absolute flex items-center justify-center rounded-full"
              style={{ left: 0, top: 161, width: 390, height: 35 }}
            >
              <p className="font-pretendard text-white text-[12px] font-extrabold leading-[1.1] tracking-[-0.12px]">
                사무처
              </p>
            </div>

            {/* 3 team pills (outlined) */}
            <div
              className="absolute flex gap-[6px]"
              style={{ left: 0, top: 231, width: 390, height: 37 }}
            >
              {["탐방로팀", "문화콘텐츠팀", "운영지원팀"].map((team) => (
                <div
                  key={team}
                  className="border border-primary flex flex-1 items-center justify-center rounded-full"
                >
                  <p className="font-pretendard text-primary text-[10px] font-bold leading-[1.5] tracking-[-0.4px] whitespace-nowrap">
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
              {[
                ["코리아둘레길 사업", "연구사업", "컨설팅 사업"],
                ["콘텐츠 사업", "교육사업", "교류사업"],
                ["조직관리", "홍보마케팅", "협의체 관리"],
              ].map((items, idx) => (
                <div
                  key={idx}
                  className="border border-primary flex flex-1 flex-col items-center justify-center gap-[6px] rounded-[10px] px-[4px] py-[12px]"
                >
                  {items.map((item) => (
                    <p
                      key={item}
                      className="font-pretendard text-primary text-[10px] leading-[1.3] tracking-[-0.3px] text-center whitespace-nowrap"
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
          <p className="font-pretendard text-grayscale-900 text-[14px] font-extrabold tracking-[-0.56px]">
            오시는 길
          </p>
          <p className="font-montserrat text-grayscale-400 text-[14px] font-bold tracking-[-0.56px]">
            Location
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
              className="absolute -translate-x-1/2 font-pretendard text-grayscale-900 text-[12px] text-center tracking-[-0.6px] leading-[1.5] whitespace-nowrap"
              style={{ left: "46.47%", top: "41.42%" }}
            >
              삼각지역
              <br />
              3번 출구
            </p>
            <p
              className="absolute -translate-x-1/2 font-pretendard text-grayscale-900 text-[12px] text-center tracking-[-0.6px] leading-[1.5] whitespace-nowrap"
              style={{ left: "80.45%", top: "12.71%" }}
            >
              전쟁기념관
            </p>
            <p
              className="absolute -translate-x-1/2 font-pretendard text-grayscale-900 text-[12px] text-center tracking-[-0.6px] leading-[1.5] whitespace-nowrap"
              style={{ left: "8.91%", top: "75.97%" }}
            >
              신용산역
              <br />
              1번 출구
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
            <div className="flex items-center gap-[12px]">
              <div className="border border-primary rounded-full size-[24px] shrink-0" />
              <p className="font-pretendard text-grayscale-900 text-[14px] tracking-[-0.7px] leading-[1.5]">
                서울특별시 용산구 한강대로52길 25-8,
                <br />
                DB Tower 402호
              </p>
            </div>
            <div className="flex items-center gap-[12px]">
              <div className="border border-primary rounded-full size-[24px] shrink-0" />
              <p className="font-pretendard text-grayscale-900 text-[14px] tracking-[-0.7px] leading-[1.5] whitespace-nowrap">
                02-6013-6610
              </p>
            </div>
            <div className="flex items-center gap-[12px]">
              <div className="border border-primary rounded-full size-[24px] shrink-0" />
              <p className="font-pretendard text-grayscale-900 text-[14px] tracking-[-0.7px] leading-[1.5] whitespace-nowrap">
                ktnc@tnc.or.kr
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
        {/* Beyond logo with Korean Trails subtitle positioned WITHIN logo bounds (per Figma 320:2981).
            Union covers logo, subtitle absolute at the lower-right corner. */}
        <div className="relative" style={{ width: 281, height: 215 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/figma/footer-union.svg"
            alt="Beyond the Route"
            className="absolute block"
            style={{ left: 0, top: 0, width: "100%", height: "100%" }}
          />
          <p
            className="font-montserrat text-primary absolute font-semibold leading-none whitespace-nowrap"
            style={{
              left: "61%",
              top: "92%",
              fontSize: 10,
            }}
          >
            Korean Trails and Culture Foundation
          </p>
        </div>

        {/* Nav columns — 2 rows × 3 cols */}
        <div className="flex flex-col gap-[24px] w-full">
          <div className="flex items-start justify-between w-full">
            {NAV_COLS.slice(0, 3).map((col, colIdx) => (
              <div key={col.title} className="flex flex-col items-center gap-[10px] w-[100px]">
                <a href={getMainHref(colIdx)} className="font-pretendard text-grayscale-900 text-[12px] font-bold leading-none text-center whitespace-nowrap hover:text-primary">
                  {col.title}
                </a>
                <div className="flex flex-col items-center gap-[6px]">
                  {col.items.map((item, itemIdx) => (
                    <a
                      key={item}
                      href={getSubHref(colIdx, itemIdx)}
                      className="font-pretendard text-grayscale-600 text-[12px] leading-[1.5] tracking-[-0.6px] text-center hover:text-primary"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-start justify-between w-full">
            {NAV_COLS.slice(3, 6).map((col, colIdx) => (
              <div key={col.title} className="flex flex-col items-center gap-[10px] w-[100px]">
                <a href={getMainHref(colIdx + 3)} className="font-pretendard text-grayscale-900 text-[12px] font-bold leading-none text-center whitespace-nowrap hover:text-primary">
                  {col.title}
                </a>
                <div className="flex flex-col items-center gap-[6px]">
                  {col.items.map((item, itemIdx) => (
                    <a
                      key={item}
                      href={getSubHref(colIdx + 3, itemIdx)}
                      className="font-pretendard text-grayscale-600 text-[12px] leading-[1.5] tracking-[-0.6px] text-center hover:text-primary"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            ))}
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
