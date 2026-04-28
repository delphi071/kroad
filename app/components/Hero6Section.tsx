"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
    subs: ["코리아둘레길", "지역길 조사 및 연구", "걷기 문화 프로그램", "굿즈 개발 및 판매"],
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

const ACTIVE_INDEX = 5;
const OVERLAY_DESKTOP = `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), radial-gradient(ellipse 96% 54% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)`;
const OVERLAY_MOBILE = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), radial-gradient(ellipse 19.5% 42.2% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)`;

export default function Hero6Section() {
  const sectionRef = useRef<HTMLElement>(null);
  const [navHovered, setNavHovered] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [navOnLight, setNavOnLight] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const slide = sectionRef.current?.closest("[data-slide]") as HTMLElement | null;
    if (!slide) return;
    const onScroll = () => setNavOnLight(slide.scrollTop > slide.clientHeight * 0.8);
    onScroll();
    slide.addEventListener("scroll", onScroll, { passive: true });
    return () => slide.removeEventListener("scroll", onScroll);
  }, []);

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
  const isDesktop = () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches;

  const handleScrollDown = () => {
    if (isDesktop()) {
      collapse();
      return;
    }
    const slide = sectionRef.current?.closest("[data-slide]") as HTMLElement | null;
    const section = sectionRef.current;
    if (!slide || !section) return;
    const sectionBottomInSlide =
      section.getBoundingClientRect().bottom - slide.getBoundingClientRect().top + slide.scrollTop;
    slide.scrollTo({ top: sectionBottomInSlide - 64, behavior: "smooth" });
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
    window.dispatchEvent(new CustomEvent("hero-expanded"));
  };

  const sectionClasses = collapsed
    ? "relative h-screen lg:sticky lg:top-0 lg:z-50 lg:h-[calc(100vw*370/1920)]"
    : "relative h-screen";

  return (
    <>
      {/* Mobile sticky nav */}
      <nav
        className={`lg:hidden sticky top-0 z-30 flex h-[64px] items-center justify-between backdrop-blur px-[18px] transition-colors duration-200 ${
          navOnLight
            ? "bg-grayscale-100/90 border-b border-grayscale-200"
            : "bg-white/10 border-b border-l border-r border-white"
        }`}
        aria-label="주 메뉴"
      >
        <div
          aria-label="한국의길과문화 공식 로고"
          role="img"
          className={`block h-[40px] w-[95px] transition-colors duration-200 ${navOnLight ? "bg-primary" : "bg-white"}`}
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
          className={`block size-[24px] cursor-pointer transition-colors duration-200 ${navOnLight ? "text-primary" : "text-white"}`}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="block size-full" aria-hidden>
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden bg-black/50 backdrop-blur-sm">
          <div className="relative z-10 flex h-full w-full flex-col bg-white/10">
            <div className="flex shrink-0 items-center justify-between border-b border-l border-r border-white bg-white/10 px-[18px] py-[12px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/logo.svg" alt="한국의길과문화 공식 로고" className="block h-[40px] w-[95px] object-contain" />
              <button type="button" aria-label="메뉴 닫기" onClick={() => setMenuOpen(false)} className="block size-[24px] cursor-pointer text-white">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="block size-full" aria-hidden>
                  <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            {NAV_MENU.map((item, idx) => {
              const titleText = item.label || `${item.line1} ${item.line2}`;
              const titleColor = idx === ACTIVE_INDEX ? "text-primary" : "text-grayscale-100";
              return (
                <div key={idx} className="flex flex-1 flex-col items-end justify-end gap-[10px] border-b border-l border-r border-white bg-white/10 px-[18px] py-[12px]">
                  <p className={`font-pretendard whitespace-nowrap text-right text-[16px] font-extrabold leading-[1.3] tracking-[-0.32px] ${titleColor}`}>{titleText}</p>
                  <div className="flex flex-wrap items-start justify-end gap-x-[12px] gap-y-[4px]">
                    {item.subs.map((sub) => (
                      <a key={sub} href="#" className="font-pretendard whitespace-nowrap text-[12px] leading-[1.3] tracking-[-0.24px] text-white hover:text-primary">{sub}</a>
                    ))}
                  </div>
                </div>
              );
            })}
            <div className="flex flex-1 items-center justify-end border-b border-l border-r border-white bg-white/10 px-[50px] py-[12px]">
              <div className="flex items-center gap-[39px]">
                <a href="#" aria-label="Instagram" className="block size-[24px]">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/figma/icon-instagram.svg" alt="" className="size-full" /></a>
                <a href="#" aria-label="스토어" className="block size-[24px]">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/figma/icon-store.svg" alt="" className="size-full" /></a>
                <a href="#" aria-label="후원" className="block size-[24px]">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/figma/icon-donate.svg" alt="" className="size-full" /></a>
                <span className="bg-grayscale-200 block h-[25px] w-px" aria-hidden />
                <a href="#" aria-label="언어" className="block size-[28px]">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/figma/icon-globe.svg" alt="" className="size-full" /></a>
              </div>
            </div>
          </div>
        </div>
      )}

      <section
        ref={sectionRef}
        className={`w-full overflow-hidden bg-black -mt-[64px] lg:mt-0 transition-[height] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${sectionClasses}`}
      >
        <Image src="/figma/hero6-bg.png" alt="" fill priority sizes="100vw" className="absolute inset-0 object-cover" />
        <div className="absolute inset-0 lg:hidden" style={{ backgroundImage: OVERLAY_MOBILE }} aria-hidden />
        <div className="absolute inset-0 hidden lg:block" style={{ backgroundImage: OVERLAY_DESKTOP }} aria-hidden />

        {/* MOBILE LAYOUT — "마음 / 잇기" stacked centered (per Figma 525:24929) */}
        <div className="relative z-10 h-full w-full lg:hidden">
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-suite font-black text-primary text-center"
            style={{
              fontSize: "clamp(60px, 25.12vw, 110px)",
              lineHeight: 1,
              letterSpacing: "-0.05em",
              fontWeight: 900,
              whiteSpace: "nowrap",
            }}
          >
            <p>마음</p>
            <p>잇기</p>
          </div>

          <button
            type="button"
            aria-label="아래로 스크롤"
            onClick={handleScrollDown}
            className="absolute bottom-[28px] left-1/2 flex -translate-x-1/2 cursor-pointer flex-col items-center gap-[10px] text-white"
          >
            <span className="relative block h-[33px] w-[20px] rounded-[10px] border border-white">
              <span className="absolute left-1/2 top-[8px] block h-[7px] w-[3px] -translate-x-1/2 rounded-[2px] bg-white" />
            </span>
            <span className="font-montserrat whitespace-nowrap text-[10px] font-bold leading-[1.5]">SCROLL TO DISCOVER</span>
          </button>
        </div>

        {/* DESKTOP LAYOUT */}
        <div className="hidden lg:block">
          <div className="absolute left-0 top-0 origin-top-left" style={{ width: 1920, height: 1080, transform: "scale(calc(100vw / 1920px))" }}>
            <div aria-hidden={collapsed} style={{ opacity: collapsed ? 0 : 1, pointerEvents: collapsed ? "none" : "auto", transition: "opacity 0.3s" }}>
              {/* Vector 4 (left) */}
              <div className="absolute" style={{ left: 0, top: 457, width: 760.5, height: 302 }} aria-hidden>
                <div className="absolute" style={{ inset: "0 -1.78% -4.47% 0" }}>
                  <svg preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 774 315.5" fill="none" style={{ overflow: "visible", display: "block" }} xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 302H650.5A110 110 0 0 0 760.5 192V0" stroke="#0AC200" strokeWidth={40} vectorEffect="non-scaling-stroke" />
                  </svg>
                </div>
              </div>

              {/* Vector 5 (right, scaleY(-1)) */}
              <div className="absolute" style={{ left: 1098.1, top: 304, width: 821.898, height: 271 }} aria-hidden>
                <div className="flex h-full w-full items-center justify-center" style={{ transform: "scaleY(-1)" }}>
                  <div className="absolute" style={{ inset: "0 0 -4.98% -1.64%" }}>
                    <svg preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 835.398 284.5" fill="none" style={{ overflow: "visible", display: "block" }} xmlns="http://www.w3.org/2000/svg">
                      <path d="M835.398 271H123.5A110 110 0 0 1 13.5 161V0" stroke="#0AC200" strokeWidth={40} vectorEffect="non-scaling-stroke" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Heading - "마음잇기" single line centered */}
              <p className="font-suite text-primary absolute -translate-x-1/2 whitespace-nowrap" style={{ left: "calc(50% + 0.5px)", top: 457, fontSize: 201.5, lineHeight: 0.9, letterSpacing: "-10.075px", fontWeight: 900, margin: 0 }}>
                마음잇기
              </p>

              {/* CTA */}
              <button
                type="button"
                onClick={collapse}
                className="absolute flex h-[49px] w-[169px] cursor-pointer items-center justify-center bg-white p-[10px]"
                style={{ left: 411, top: 582, borderTopLeftRadius: 20, borderBottomRightRadius: 20 }}
              >
                <span className="font-pretendard text-primary whitespace-nowrap" style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.5, letterSpacing: "-0.8px" }}>
                  자세히 보기
                </span>
              </button>

              {/* Subtitle */}
              <p className="font-montserrat absolute whitespace-nowrap text-white" style={{ left: 1324, top: 501, fontSize: 30.395, lineHeight: 1.3, letterSpacing: "-0.6079px", fontWeight: 800 }}>
                Walk with Us
              </p>
              <div className="font-pretendard absolute whitespace-nowrap text-white" style={{ left: 1324, top: 550, fontSize: 20, lineHeight: 1.5, letterSpacing: "-0.2px", fontWeight: 500 }}>
                <p>길 위에 가치를 더하는 여정에 함께하세요.</p>
              </div>
            </div>

            {/* Collapsed compact title — single line centered */}
            {collapsed && (
              <p
                className="font-suite text-primary absolute -translate-x-1/2 whitespace-nowrap"
                style={{ left: "50%", top: 175, fontSize: 130, lineHeight: 1, fontWeight: 900, letterSpacing: "-6.5px" }}
              >
                마음잇기
              </p>
            )}

            {collapsed && (
              <button type="button" aria-label="히어로 닫기" onClick={expand} className="text-primary absolute z-30 cursor-pointer" style={{ left: 1810, top: 243, fontSize: 64, lineHeight: 1 }}>
                ✕
              </button>
            )}

            {/* Top navigation */}
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
              <div className="relative w-[303px] shrink-0 border-b border-l border-r border-solid border-white transition-[height] duration-200" style={{ height: navHeightDesktop }}>
                <div className="absolute left-[86px] top-[37.19px] h-[54.628px] w-[130px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/figma/logo.svg" alt="한국의길과문화 공식 로고" className="block h-full w-full object-contain" />
                </div>
              </div>
              {NAV_MENU.map((item, idx) => {
                const colorClass = idx === ACTIVE_INDEX ? "text-primary" : "text-grayscale-100";
                const isTwoLine = !item.label;
                return (
                  <div key={idx} className="relative w-[184px] shrink-0 border-b border-l border-r border-solid border-white transition-[height] duration-200" style={{ height: navHeightDesktop }}>
                    <div className={`font-pretendard absolute right-[18px] whitespace-nowrap text-right text-[16px] font-extrabold leading-[1.3] tracking-[-0.32px] ${colorClass}`} style={{ top: isTwoLine ? 75 : 96 }}>
                      {item.label ? <p>{item.label}</p> : <><p>{item.line1}</p><p>{item.line2}</p></>}
                    </div>
                    <div className="absolute right-[18px] flex flex-col items-end gap-[12px] transition-opacity duration-200" style={{ top: 158, opacity: navHovered ? 1 : 0, pointerEvents: navHovered ? "auto" : "none" }} aria-hidden={!navHovered}>
                      {item.subs.map((sub) => (
                        <a key={sub} href="#" className="font-pretendard hover:text-primary whitespace-nowrap text-right text-[16px] font-normal leading-[1.4] tracking-[-0.8px] text-white">
                          {sub}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
              <div className="relative w-[513px] shrink-0 border-b border-l border-r border-solid border-white transition-[height] duration-200" style={{ height: navHeightDesktop }}>
                <div className="absolute right-[49.5px] top-[50.5px] flex items-center gap-[39px]">
                  <a href="#" aria-label="Instagram" className="block size-[24px]">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/figma/icon-instagram.svg" alt="" className="size-full" /></a>
                  <a href="#" aria-label="스토어" className="block size-[24px]">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/figma/icon-store.svg" alt="" className="size-full" /></a>
                  <a href="#" aria-label="후원" className="block size-[24px]">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/figma/icon-donate.svg" alt="" className="size-full" /></a>
                  <span className="bg-grayscale-200 block h-[25px] w-px" aria-hidden />
                  <a href="#" aria-label="언어" className="block size-[28px]">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/figma/icon-globe.svg" alt="" className="size-full" /></a>
                </div>
              </div>
            </nav>
          </div>

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
              <span className="absolute border-4 border-solid border-white" style={{ left: "calc(100% * 218 / 516)", top: 0, width: "calc(100% * 80 / 516)", height: "calc(100% * 132 / 244)", borderRadius: "calc(100vw * 24 / 1920)" }} />
              <span className="absolute bg-white" style={{ left: "calc(100% * 254 / 516)", top: "calc(100% * 28 / 244)", width: "calc(100% * 12 / 516)", height: "calc(100% * 28 / 244)", borderRadius: "calc(100vw * 12 / 1920)" }} />
              <span className="font-montserrat absolute whitespace-nowrap text-white" style={{ left: 0, top: "calc(100% * 168 / 244)", fontSize: "calc(100vw * 26.4 / 1920)", lineHeight: 1.5, fontWeight: 500 }}>
                CLICK TO DISCOVER
              </span>
            </button>
          )}
        </div>
      </section>
    </>
  );
}
