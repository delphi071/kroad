"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getMainHref, getSubHref } from "./navLinks";

type NavItem = {
  label?: string;
  line1?: string;
  line2?: string;
  subs: string[];
};

const NAV_MENU: NavItem[] = [
  {
    label: "우리의 길",
    subs: ["설립목적", "비전 및 핵심가치", "주요 연혁", "사람들", "오시는 길"],
  },
  { line1: "같은 길", line2: "다른 시선", subs: ["전문역량"] },
  {
    line1: "우리가",
    line2: "걷는 길",
    subs: [
      "코리아둘레길",
      "지역길 조사 및 연구",
      "걷기 문화 프로그램",
      "굿즈 개발 및 판매",
    ],
  },
  {
    line1: "함께 걷는",
    line2: "사람들",
    subs: ["한국걷는길연합", "ATN", "WTN", "코리아둘레길 완보자 클럽"],
  },
  {
    line1: "알리는",
    line2: "이야기",
    subs: ["공지사항", "소식받기", "문의하기"],
  },
  { label: "마음잇기", subs: ["후원하기", "연간기금 및 활동 실적내역"] },
];

const ACTIVE_INDEX = 0;
const COLLAPSED_H_DESKTOP = 370; // 1920-frame baseline

const OVERLAY_DESKTOP = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), radial-gradient(ellipse 96% 54% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.66) 100%)`;
const OVERLAY_MOBILE = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), radial-gradient(ellipse 50% 35% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.68) 100%)`;

export default function Hero1Section() {
  const sectionRef = useRef<HTMLElement>(null);
  const [navHovered, setNavHovered] = useState(false);
  /* `collapsed` only takes effect on desktop (lg+). On mobile the hero is always
     a normal full-height section the user scrolls past. */
  const [collapsed, setCollapsed] = useState(false);
  /* Mobile nav adapts to background: white over dark hero, primary green over
     light subpage. Threshold: when slide has scrolled past ~80% of hero height. */
  const [navOnLight, setNavOnLight] = useState(false);
  /* Mobile hamburger menu open state — full-screen overlay (Figma 525:22658). */
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const slide = sectionRef.current?.closest("[data-slide]") as HTMLElement | null;
    if (!slide) return;
    const onScroll = () => {
      setNavOnLight(slide.scrollTop > slide.clientHeight * 0.8);
    };
    onScroll();
    slide.addEventListener("scroll", onScroll, { passive: true });
    return () => slide.removeEventListener("scroll", onScroll);
  }, []);

  /* Reset `collapsed` if viewport drops below lg (e.g. desktop → mobile resize),
     so re-entering mobile doesn't leave the section in a stuck sticky state. */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 1023.98px)");
    const update = () => {
      if (mq.matches && collapsed) {
        setCollapsed(false);
        const slide = sectionRef.current?.closest("[data-slide]") as HTMLElement | null;
        if (slide) delete slide.dataset.heroCollapsed;
      }
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [collapsed]);

  const navHeightDesktop = navHovered ? 325 : 129;

  const isDesktop = () =>
    typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;

  /* Desktop CTAs collapse the hero into a sticky compact bar.
     Mobile button just scrolls the slide down to the subpage in normal flow. */
  const handleScrollDown = () => {
    if (isDesktop()) {
      collapse();
    } else {
      const slide = sectionRef.current?.closest("[data-slide]") as HTMLElement | null;
      if (slide) {
        slide.scrollTo({ top: slide.clientHeight, behavior: "smooth" });
      }
    }
  };

  const collapse = () => {
    setCollapsed(true);
    const slide = sectionRef.current?.closest("[data-slide]") as HTMLElement | null;
    if (slide) {
      slide.scrollTop = 0;
      slide.dataset.heroCollapsed = "true";
    }
  };

  const expand = () => {
    setCollapsed(false);
    const slide = sectionRef.current?.closest("[data-slide]") as HTMLElement | null;
    if (slide) {
      delete slide.dataset.heroCollapsed;
      slide.scrollTop = 0;
    }
  };

  // Auto-collapse when nav link with sub key targets this slide
  useEffect(() => {
    const handler = (e: Event) => {
      const subKey = (e as CustomEvent<{ subKey?: string }>).detail?.subKey;
      if (!subKey) return;
      if (typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches) {
        setCollapsed(true);
        const slide = sectionRef.current?.closest("[data-slide]") as HTMLElement | null;
        if (slide) {
          slide.dataset.heroCollapsed = "true";
        }
      }
    };
    window.addEventListener("nav-h1", handler);
    return () => window.removeEventListener("nav-h1", handler);
  }, []);

  /* Mobile: always relative h-screen — no sticky/collapse.
     Desktop collapsed: sticky top-0 with compact 370/1920 ratio height. */
  const sectionClasses = collapsed
    ? "relative h-screen lg:sticky lg:top-0 lg:z-50 lg:h-[calc(100vw*370/1920)]"
    : "relative h-screen";

  return (
    <>
      {/* ===== Mobile sticky nav — stays at top of viewport across the entire slide scroll =====
          Lives outside the hero <section> so position: sticky binds to the slide's scroll
          container (data-slide), not to the overflow:hidden section. The section below uses
          -mt-[64px] so the hero image extends behind the nav for a full-bleed look. */}
      <nav
        className={`lg:hidden sticky top-0 z-30 flex h-[64px] items-center justify-between backdrop-blur px-[18px] transition-colors duration-200 ${
          navOnLight
            ? "bg-grayscale-100/90 border-b border-grayscale-200"
            : "bg-white/10 border-b border-l border-r border-white"
        }`}
        aria-label="주 메뉴"
      >
        {/* Logo rendered as a CSS mask so its color can toggle with scroll position.
            White over dark hero → primary green over light subpage. */}
        <div
          aria-label="한국의길과문화 공식 로고"
          role="img"
          className={`block h-[40px] w-[95px] transition-colors duration-200 ${
            navOnLight ? "bg-primary" : "bg-white"
          }`}
          style={{
            WebkitMaskImage: "url(/figma/logo.svg)",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            WebkitMaskSize: "contain",
            maskImage: "url(/figma/logo.svg)",
            maskRepeat: "no-repeat",
            maskPosition: "center",
            maskSize: "contain",
          }}
        />
        <button
          type="button"
          aria-label="메뉴 열기"
          onClick={() => setMenuOpen(true)}
          className={`block size-[24px] cursor-pointer transition-colors duration-200 ${
            navOnLight ? "text-primary" : "text-white"
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="block size-full"
            aria-hidden
          >
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </nav>

      {/* ===== Mobile full-screen menu overlay (Figma 525:22658) =====
          Open via hamburger; X icon (top-right) closes. Header + 6 menu rows + social row. */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden bg-black/50 backdrop-blur-sm">
          {/* Menu container — vertical flex of header + 6 rows + social row */}
          <div className="relative z-10 flex h-full w-full flex-col bg-white/10">
            {/* Header — logo + close (X) button */}
            <div className="flex shrink-0 items-center justify-between border-b border-l border-r border-white bg-white/10 px-[18px] py-[12px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/figma/logo.svg"
                alt="한국의길과문화 공식 로고"
                className="block h-[40px] w-[95px] object-contain"
              />
              <button
                type="button"
                aria-label="메뉴 닫기"
                onClick={() => { setMenuOpen(false); setNavHovered(false); }}
                className="block size-[24px] cursor-pointer text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="block size-full"
                  aria-hidden
                >
                  <path
                    d="M6 6L18 18M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* 6 menu rows — equal flex-1 height */}
            {NAV_MENU.map((item, idx) => {
              const titleText = item.label || `${item.line1} ${item.line2}`;
              const titleColor =
                idx === ACTIVE_INDEX ? "text-primary" : "text-grayscale-100";
              return (
                <div
                  key={idx}
                  className="flex flex-1 flex-col items-end justify-end gap-[10px] border-b border-l border-r border-white bg-white/10 px-[18px] py-[12px]"
                >
                  <a href={getMainHref(idx)} onClick={() => { setMenuOpen(false); setNavHovered(false); }}>
                    <p
                      className={`font-pretendard whitespace-nowrap text-right text-[16px] font-extrabold leading-[1.3] tracking-[-0.32px] ${titleColor}`}
                    >
                      {titleText}
                    </p>
                  </a>
                  <div className="flex flex-wrap items-start justify-end gap-x-[12px] gap-y-[4px]">
                    {item.subs.map((sub, subIdx) => (
                      <a
                        key={sub}
                        href={getSubHref(idx, subIdx)}
                        onClick={() => { setMenuOpen(false); setNavHovered(false); }}
                        className="font-pretendard whitespace-nowrap text-[12px] leading-[1.3] tracking-[-0.24px] text-white hover:text-primary"
                      >
                        {sub}
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Social icons row */}
            <div className="flex flex-1 items-center justify-end border-b border-l border-r border-white bg-white/10 px-[50px] py-[12px]">
              <div className="flex items-center gap-[39px]">
                <a href="https://www.instagram.com/koreatnc1" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="block size-[24px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/figma/icon-instagram.svg" alt="" className="size-full" />
                </a>
                <a href="https://smartstore.naver.com/koreatnc" target="_blank" rel="noopener noreferrer" aria-label="스토어" className="block size-[24px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/figma/icon-store.svg" alt="" className="size-full" />
                </a>
                <span className="bg-grayscale-200 block h-[25px] w-px" aria-hidden />
                <a href="#" aria-label="언어" className="block size-[28px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/figma/icon-globe.svg" alt="" className="size-full" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <section
        ref={sectionRef}
        className={`w-full overflow-hidden bg-black -mt-[64px] lg:mt-0 transition-[height] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${sectionClasses}`}
      >
        {/* Background */}
        <Image
          src="/img01.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 object-cover"
        />

        {/* Overlay — different gradient values for mobile vs desktop */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{ backgroundImage: OVERLAY_MOBILE }}
          aria-hidden
        />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{ backgroundImage: OVERLAY_DESKTOP }}
          aria-hidden
        />

        {/* ========================== MOBILE LAYOUT (below lg) ========================== */}
        {/* Mobile nav now lives outside the section as sticky; only heading + scroll button here. */}
        <div className="relative z-10 h-full w-full lg:hidden">
          {/* Big heading 3 lines */}
        <div
          className="absolute font-suite font-black text-primary"
          style={{
            left: "9.74%",
            top: "32.94%",
            fontSize: "clamp(60px, 25.12vw, 110px)",
            lineHeight: 0.9,
            letterSpacing: "-0.05em",
            fontWeight: 900,
          }}
        >
          <p style={{ marginBottom: "0.12em", whiteSpace: "nowrap" }}>길</p>
          <p style={{ marginBottom: "0.12em", whiteSpace: "nowrap" }}>그 이상의</p>
          <p style={{ whiteSpace: "nowrap" }}>연결</p>
        </div>

        {/* Mobile scroll-down indicator — scrolls slide naturally to subpage start */}
        <button
          type="button"
          aria-label="아래로 스크롤"
          onClick={handleScrollDown}
          className="absolute bottom-[28px] left-1/2 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-[10px] text-white"
        >
          <span className="relative block h-[33px] w-[20px] rounded-[10px] border border-white">
            <span className="absolute left-1/2 top-[8px] block h-[7px] w-[3px] -translate-x-1/2 rounded-[2px] bg-white" />
          </span>
          <span className="font-montserrat whitespace-nowrap text-[10px] font-bold leading-[1.5]">
            SCROLL TO DISCOVER
          </span>
        </button>
      </div>

      {/* ========================== DESKTOP LAYOUT (lg+) ========================== */}
      {/* 1920×1080 scale-frame preserves the existing pixel-perfect design */}
      <div className="hidden lg:block">
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: 1920,
            height: 1080,
            transform: "scale(calc(100vw / 1920px))",
          }}
        >
          {/* Hero content — fades out on collapse */}
          <div
            aria-hidden={collapsed}
            style={{
              opacity: collapsed ? 0 : 1,
              pointerEvents: collapsed ? "none" : "auto",
              transition: "opacity 0.3s",
            }}
          >
            {/* Title image (transparent PNG: text + lines + 자세히 보기 visual) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/title_img/ko-hero-01.png"
              alt="길, 그 이상의 연결 — Beyond the Route"
              className="absolute pointer-events-none select-none"
              style={{ left: 0, top: 0, width: 1920, height: 1080 }}
            />

            {/* Invisible click area covering the 자세히 보기 button position */}
            <button
              type="button"
              aria-label="자세히 보기"
              onClick={collapse}
              className="absolute cursor-pointer"
              style={{
                left: 1312,
                top: 479,
                width: 169,
                height: 49,
                background: "transparent",
                border: 0,
              }}
            />
          </div>

          {/* Collapsed compact title (desktop) */}
          {collapsed && (
            <div className="absolute" style={{ left: 80, top: 152 }}>
              <p
                className="font-suite text-primary"
                style={{
                  fontSize: 90,
                  lineHeight: 1,
                  fontWeight: 900,
                  letterSpacing: "-4.5px",
                  whiteSpace: "nowrap",
                }}
              >
                길
              </p>
              <p
                className="font-suite text-primary"
                style={{
                  fontSize: 90,
                  lineHeight: 1,
                  fontWeight: 900,
                  letterSpacing: "-4.5px",
                  whiteSpace: "nowrap",
                  marginTop: 14,
                }}
              >
                그 이상의 연결
              </p>
            </div>
          )}

          {/* Collapsed X */}
          {collapsed && (
            <button
              type="button"
              aria-label="히어로 닫기"
              onClick={expand}
              className="text-primary absolute z-30 cursor-pointer"
              style={{ left: 1810, top: 243, fontSize: 64, lineHeight: 1 }}
            >
              ✕
            </button>
          )}

          {/* Top navigation (always visible) */}
          <nav
            className="absolute left-0 top-0 z-20 flex items-start bg-white/10 transition-[height,backdrop-filter] duration-200 ease-out"
            aria-label="주 메뉴"
            onMouseEnter={() => setNavHovered(true)}
            onMouseLeave={() => setNavHovered(false)}
            style={{
              height: navHeightDesktop,
              backdropFilter: navHovered ? "blur(20px)" : "blur(0px)",
              WebkitBackdropFilter: navHovered ? "blur(20px)" : "blur(0px)",
            }}
          >
            {/* Logo cell */}
            <div
              className="relative w-[303px] shrink-0 border-b border-l border-r border-solid border-white transition-[height] duration-200"
              style={{ height: navHeightDesktop }}
            >
              <div className="absolute left-[86px] top-[37.19px] h-[54.628px] w-[130px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/figma/logo.svg"
                  alt="한국의길과문화 공식 로고"
                  className="block h-full w-full object-contain"
                />
              </div>
            </div>

            {/* Menu cells — fixed 184px wide; only height changes on hover (down expansion only) */}
            {NAV_MENU.map((item, idx) => {
              const colorClass =
                idx === ACTIVE_INDEX ? "text-primary" : "text-grayscale-100";
              const isTwoLine = !item.label;
              return (
                <div
                  key={idx}
                  className="relative w-[184px] shrink-0 border-b border-l border-r border-solid border-white transition-[height] duration-200"
                  style={{ height: navHeightDesktop }}
                >
                  <a
                    href={getMainHref(idx)}
                    onClick={() => { setMenuOpen(false); setNavHovered(false); }}
                    className={`font-pretendard absolute right-[18px] whitespace-nowrap text-right text-[16px] font-extrabold leading-[1.3] tracking-[-0.32px] ${colorClass}`}
                    style={{ top: isTwoLine ? 75 : 96 }}
                  >
                    {item.label ? (
                      <p>{item.label}</p>
                    ) : (
                      <>
                        <p>{item.line1}</p>
                        <p>{item.line2}</p>
                      </>
                    )}
                  </a>

                  <div
                    className="absolute right-[18px] flex flex-col items-end gap-[12px] transition-opacity duration-200"
                    style={{
                      top: 158,
                      opacity: navHovered ? 1 : 0,
                      pointerEvents: navHovered ? "auto" : "none",
                    }}
                    aria-hidden={!navHovered}
                  >
                    {item.subs.map((sub, subIdx) => (
                      <a
                        key={sub}
                        href={getSubHref(idx, subIdx)}
                        onClick={() => { setMenuOpen(false); setNavHovered(false); }}
                        className="font-pretendard hover:text-primary whitespace-nowrap text-right text-[16px] font-normal leading-[1.4] tracking-[-0.8px] text-white"
                      >
                        {sub}
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Right icons cell — fixed 513px wide; only height changes on hover */}
            <div
              className="relative w-[513px] shrink-0 border-b border-l border-r border-solid border-white transition-[height] duration-200"
              style={{ height: navHeightDesktop }}
            >
              <div className="absolute right-[49.5px] top-[50.5px] flex items-center gap-[39px]">
                <a href="https://www.instagram.com/koreatnc1" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="block size-[24px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/figma/icon-instagram.svg" alt="" className="size-full" />
                </a>
                <a href="https://smartstore.naver.com/koreatnc" target="_blank" rel="noopener noreferrer" aria-label="스토어" className="block size-[24px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/figma/icon-store.svg" alt="" className="size-full" />
                </a>
                <span
                  className="bg-grayscale-200 block h-[25px] w-px"
                  aria-hidden
                />
                <a href="#" aria-label="언어" className="block size-[28px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/figma/icon-globe.svg" alt="" className="size-full" />
                </a>
              </div>
            </div>
          </nav>
        </div>

        {/* CLICK TO DISCOVER (desktop, expanded) — 60% size of original Figma spec
            Original: 516×244 outer, 80×132 ring, 12×28 dot, 44px text, radii 40/20.
            All viewport-relative dimensions are pre-multiplied by 0.6. */}
        {!collapsed && (
          <button
            type="button"
            aria-label="아래로 스크롤"
            onClick={collapse}
            className="absolute left-1/2 -translate-x-1/2 cursor-pointer"
            style={{
              bottom: "calc(100vw * 28 / 1920)",
              width: "calc(100vw * 309.6 / 1920)",
              height: "calc(100vw * 146.4 / 1920)",
            }}
          >
            {/* Inner items keep proportional placement against the original 516×244 box */}
            <span
              className="absolute border-4 border-solid border-white"
              style={{
                left: "calc(100% * 218 / 516)",
                top: 0,
                width: "calc(100% * 80 / 516)",
                height: "calc(100% * 132 / 244)",
                borderRadius: "calc(100vw * 24 / 1920)",
              }}
            />
            <span
              className="absolute bg-white"
              style={{
                left: "calc(100% * 254 / 516)",
                top: "calc(100% * 28 / 244)",
                width: "calc(100% * 12 / 516)",
                height: "calc(100% * 28 / 244)",
                borderRadius: "calc(100vw * 12 / 1920)",
              }}
            />
            <span
              className="font-montserrat absolute whitespace-nowrap text-white"
              style={{
                left: 0,
                top: "calc(100% * 168 / 244)",
                fontSize: "calc(100vw * 26.4 / 1920)",
                lineHeight: 1.5,
                fontWeight: 500,
              }}
            >
              CLICK TO DISCOVER
            </span>
          </button>
        )}
      </div>
      </section>
    </>
  );
}

// trigger
