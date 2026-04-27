"use client";

import Image from "next/image";
import { createContext, useContext, useRef, useState } from "react";

const HeroCollapseCtx = createContext<(() => void) | null>(null);
export function useHeroCollapse() { return useContext(HeroCollapseCtx); }

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

type HeroLayoutProps = {
  activeMenuIndex: number;
  bgImage: string;
  linearOverlay?: number;
  radialOverlay?: number;
  scrollIndicatorWeight?: "medium" | "bold";
  /** collapsed 상태에서 표시할 제목 (1~2줄) */
  collapsedLine1: string;
  collapsedLine2?: string;
  children: React.ReactNode;
};

export default function HeroLayout({
  activeMenuIndex,
  bgImage,
  linearOverlay = 0.3,
  radialOverlay = 0.66,
  scrollIndicatorWeight = "medium",
  collapsedLine1,
  collapsedLine2,
  children,
}: HeroLayoutProps) {
  const overlayBg = `linear-gradient(rgba(0,0,0,${linearOverlay}), rgba(0,0,0,${linearOverlay})), radial-gradient(ellipse 96% 54% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,${radialOverlay}) 100%)`;
  const scrollFontWeight = scrollIndicatorWeight === "bold" ? 700 : 500;

  const [navHovered, setNavHovered] = useState(false);
  const navHeight = navHovered ? 325 : 129;

  const [collapsed, setCollapsed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  /* collapsed 높이: nav(129) + 상단여백 + 제목 2줄(90×2+gap12) + 하단여백 ≈ 370px (1920 기준) */
  const COLLAPSED_H = 370;

  return (
    <HeroCollapseCtx.Provider value={collapse}>
      <section
        ref={sectionRef}
        className="relative w-full overflow-hidden bg-black"
        style={{
          height: collapsed ? `calc(100vw * ${COLLAPSED_H} / 1920)` : "100vh",
          transition: "height 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          /* collapsed 시 상단 sticky */
          position: collapsed ? "sticky" : "relative",
          top: collapsed ? 0 : "auto",
          zIndex: collapsed ? 50 : "auto",
        }}
      >
        {/* Background image */}
        <Image
          src={bgImage}
          alt=""
          fill
          priority={activeMenuIndex === 0}
          sizes="100vw"
          className="absolute inset-0 object-cover"
        />

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundImage: overlayBg }}
          aria-hidden
        />

        {/* 1920px scaled frame */}
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            width: 1920,
            height: 1080,
            transform: "scale(calc(100vw / 1920px))",
          }}
        >
          {/* ── Hero 고유 콘텐츠 (장식선·버튼·자막) ─ collapsed 시 숨김 */}
          <div
            aria-hidden={collapsed}
            style={{
              opacity: collapsed ? 0 : 1,
              pointerEvents: collapsed ? "none" : "auto",
              transition: "opacity 0.3s",
            }}
          >
            {children}
          </div>

          {/* ── Collapsed 전용 compact 제목 */}
          {collapsed && (
            <div
              className="absolute"
              style={{ left: 80, top: 152 }}
            >
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
                {collapsedLine1}
              </p>
              {collapsedLine2 && (
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
                  {collapsedLine2}
                </p>
              )}
            </div>
          )}

          {/* ── Collapsed X 버튼 */}
          {collapsed && (
            <button
              type="button"
              aria-label="히어로 닫기"
              onClick={expand}
              className="absolute z-30 cursor-pointer text-primary"
              style={{ left: 1810, top: 243, fontSize: 64, lineHeight: 1 }}
            >
              ✕
            </button>
          )}

          {/* Top navigation (항상 표시) */}
          <nav
            className="absolute left-0 top-0 z-20 flex items-start bg-white/10 transition-[height,backdrop-filter] duration-200 ease-out"
            aria-label="주 메뉴"
            onMouseEnter={() => setNavHovered(true)}
            onMouseLeave={() => setNavHovered(false)}
            style={{
              height: navHeight,
              backdropFilter: navHovered ? "blur(20px)" : "blur(0px)",
              WebkitBackdropFilter: navHovered ? "blur(20px)" : "blur(0px)",
            }}
          >
            {/* Logo cell */}
            <div
              className="relative w-[303px] shrink-0 border-b border-l border-r border-solid border-white transition-[height] duration-200"
              style={{ height: navHeight }}
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

            {/* Menu cells */}
            {NAV_MENU.map((item, idx) => {
              const colorClass =
                idx === activeMenuIndex ? "text-primary" : "text-grayscale-100";
              const isTwoLine = !item.label;
              return (
                <div
                  key={idx}
                  className="relative w-[184px] shrink-0 border-b border-l border-r border-solid border-white transition-[height] duration-200"
                  style={{ height: navHeight }}
                >
                  <div
                    className={`absolute right-[18px] font-pretendard text-right text-[16px] font-extrabold leading-[1.3] tracking-[-0.32px] whitespace-nowrap ${colorClass}`}
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
                  </div>

                  <div
                    className="absolute right-[18px] flex flex-col items-end gap-[12px] transition-opacity duration-200"
                    style={{
                      top: 158,
                      opacity: navHovered ? 1 : 0,
                      pointerEvents: navHovered ? "auto" : "none",
                    }}
                    aria-hidden={!navHovered}
                  >
                    {item.subs.map((sub) => (
                      <a
                        key={sub}
                        href="#"
                        className="font-pretendard text-right text-[16px] font-normal leading-[1.4] tracking-[-0.8px] text-white whitespace-nowrap hover:text-primary"
                      >
                        {sub}
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Right icons cell */}
            <div
              className="relative w-[513px] shrink-0 border-b border-l border-r border-solid border-white transition-[height] duration-200"
              style={{ height: navHeight }}
            >
              <div className="absolute right-[49.5px] top-[50.5px] flex items-center gap-[39px]">
                <a href="#" aria-label="Instagram" className="block size-[24px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/figma/icon-instagram.svg" alt="" className="size-full" />
                </a>
                <a href="#" aria-label="스토어" className="block size-[24px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/figma/icon-store.svg" alt="" className="size-full" />
                </a>
                <a href="#" aria-label="후원" className="block size-[24px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/figma/icon-donate.svg" alt="" className="size-full" />
                </a>
                <span className="block h-[25px] w-px bg-grayscale-200" aria-hidden />
                <a href="#" aria-label="언어" className="block size-[28px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/figma/icon-globe.svg" alt="" className="size-full" />
                </a>
              </div>
            </div>
          </nav>
        </div>

        {/* CLICK TO DISCOVER — expanded 상태에서만 표시 */}
        {!collapsed && (
          <button
            type="button"
            aria-label="아래로 스크롤"
            onClick={collapse}
            className="absolute left-1/2 -translate-x-1/2 cursor-pointer"
            style={{ bottom: 28, width: 516, height: 244 }}
          >
            <span
              className="absolute border-4 border-solid border-white"
              style={{ left: 218, top: 0, width: 80, height: 132, borderRadius: 40 }}
            />
            <span
              className="absolute bg-white"
              style={{ left: 254, top: 28, width: 12, height: 28, borderRadius: 20 }}
            />
            <span
              className="absolute font-montserrat text-white whitespace-nowrap"
              style={{
                left: 0,
                top: 168,
                fontSize: 44,
                lineHeight: 1.5,
                fontWeight: scrollFontWeight,
              }}
            >
              CLICK TO DISCOVER
            </span>
          </button>
        )}
      </section>
    </HeroCollapseCtx.Provider>
  );
}
