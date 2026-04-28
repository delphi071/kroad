"use client";
import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n/LanguageContext";

/* Image/layout per card — text comes from dictionary by lang */
const CARD_LAYOUT = [
  {
    img: "/figma/sub1-corevalue-sustainability.svg",
    imgW: 344,
    imgH: 344,
    imgLeft: "50%" as string,
    imgTopMobile: "calc(50% - 82px)",
    imgTopDesktop: "calc(50% + 120px)",
    imgTransform: "translate(-50%, -50%)",
  },
  {
    img: "/figma/sub1-corevalue-trust.svg",
    imgW: 314.4,
    imgH: 269.6,
    imgLeft: "calc(50% + 0.5px)" as string,
    imgTopMobile: "calc(50% - 81.5px)",
    imgTopDesktop: "calc(50% + 120.5px)",
    imgTransform: "translate(-50%, -50%)",
  },
  {
    img: "/figma/sub1-corevalue-connection.svg",
    imgW: 465.4,
    imgH: 206.4,
    imgLeft: "calc(50% - 9.5px)" as string,
    imgTopMobile: "329px",
    imgTopDesktop: "530px",
    imgTransform: "translateX(-50%)",
  },
  {
    img: "/figma/sub1-corevalue-discovery.svg",
    imgW: 320,
    imgH: 320,
    imgLeft: "50%" as string,
    imgTopMobile: "calc(50% - 82px)",
    imgTopDesktop: "calc(50% + 120px)",
    imgTransform: "translate(-50%, -50%)",
  },
];

export default function CoreValues() {
  const { t, lang } = useLang();
  const items = t.subpage1.coreValues.items;
  const CARDS = CARD_LAYOUT.map((layout, i) => ({ ...layout, ...items[i] }));
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
      const progress = Math.round(slide.scrollTop - wrapperTop);
      const index = Math.max(0, Math.min(3, Math.floor(progress / vh)));
      setActiveIndex(index);
    };

    let cooldown = false;

    const onWheel = (e: WheelEvent) => {
      /* Mobile uses natural scroll over the static vertical stack — skip. */
      if (!window.matchMedia("(min-width: 1024px)").matches) return;
      if (!e.deltaY || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;

      const wrapperTop = getWrapperTop();
      const vh = slide.clientHeight;
      const relativeScroll = Math.round(slide.scrollTop - wrapperTop);
      const dir = e.deltaY > 0 ? 1 : -1;

      // zone 밖이면 cooldown 리셋 후 허용
      if (relativeScroll < 0 || relativeScroll >= 4 * vh) {
        cooldown = false;
        return;
      }

      const currentIndex = Math.max(0, Math.min(3, Math.floor(relativeScroll / vh)));
      const nextIndex = currentIndex + dir;

      // zone 이탈 → cooldown 리셋 후 허용
      if (nextIndex < 0 || nextIndex > 3) {
        cooldown = false;
        return;
      }

      e.preventDefault();
      if (cooldown) return;

      cooldown = true;
      slide.scrollTop = wrapperTop + nextIndex * vh;

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
    };
  }, []);

  /* Two layouts:
     - Mobile (lg:hidden): static vertical stack matching the Figma mobile design.
       No 400vh wrapper, no sticky scroll — content flows naturally.
     - Desktop (hidden lg:block): existing 400vh sticky stack with cards animating in. */
  return (
    <>
      {/* ============= MOBILE ============= */}
      <div className="bg-grayscale-100 flex flex-col items-center gap-[60px] px-[20px] py-[64px] lg:hidden">
        <div className="flex items-center gap-[10px] whitespace-nowrap">
          <p className="font-pretendard text-[14px] font-extrabold tracking-[-0.56px] leading-none text-grayscale-900">
            {t.subpage1.coreValues.label}
          </p>
          <p className="font-montserrat text-grayscale-400 text-[14px] font-bold tracking-[-0.56px] leading-none">
            {t.subpage1.coreValues.labelEn}
          </p>
        </div>

        {/* Single combined Group55 icon at the top per Figma mobile design */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/figma/sub1-corevalue-group55.svg"
          alt=""
          aria-hidden
          className="block size-[200px] object-contain"
        />

        {CARDS.map((card) => (
          <div
            key={card.eng}
            className="flex flex-col items-center gap-[24px] w-full max-w-[295px] text-center"
          >
            <div className="flex flex-col items-center gap-[6px]">
              <p className="font-montserrat text-primary text-[20px] font-bold leading-none">
                {card.eng}
              </p>
              <p className="font-pretendard text-grayscale-900 text-[60px] font-bold leading-[1.3] tracking-[-1.56px]">
                {card.kor}
              </p>
              <p className="font-pretendard text-grayscale-700 text-[24px] tracking-[-0.24px] leading-[1.3]">
                {card.tagline}
              </p>
            </div>
            <div className="font-pretendard text-grayscale-900 text-[24px] tracking-[-0.24px] leading-[1.3]">
              {card.desc.map((line, j) => (
                <p key={j}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ============= DESKTOP ============= */}
      <div
        ref={wrapperRef}
        style={{ height: "400vh" }}
        className="
          hidden lg:block
          bg-grayscale-100
          [--cv-header-top:98px]
          [--cv-text-top:872px]
          lg:[--cv-header-top:400px]
          lg:[--cv-text-top:870px]
        "
      >
      <div
        className="bg-grayscale-100 sticky top-0 overflow-hidden"
        style={{ height: "100vh" }}
      >
        <div
          className="bg-grayscale-100 relative text-black"
          style={{
            width: 1920,
            height: 1080,
            transformOrigin: "top left",
            transform: "scale(calc(100vw / 1920px)) translateZ(0)",
            backfaceVisibility: "hidden",
          }}
        >
          {/* Fixed header — sits above all sliding cards */}
          <div
            className="absolute z-10 flex -translate-x-1/2 items-end gap-[14px] whitespace-nowrap"
            style={{ left: "calc(50% + 0.5px)", top: "var(--cv-header-top)" }}
          >
            <p className="font-pretendard text-[30px] font-extrabold leading-[1.2] tracking-[-0.78px]">
              {t.subpage1.coreValues.label}
            </p>
            <p className="font-montserrat text-grayscale-400 text-[32px] font-bold leading-none tracking-[-1.28px]">
              {t.subpage1.coreValues.labelEn}
            </p>
          </div>

          {CARDS.map((card, i) => (
            <div
              key={card.eng}
              aria-hidden={i !== activeIndex}
              className="bg-grayscale-100
                [--card-svg-top:var(--card-svg-top-mobile)]
                lg:[--card-svg-top:var(--card-svg-top-desktop)]
              "
              style={{
                position: "absolute",
                inset: 0,
                zIndex: i,
                transform: i <= activeIndex ? "translateY(0%)" : "translateY(100%)",
                transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                ["--card-svg-top-mobile" as string]: card.imgTopMobile,
                ["--card-svg-top-desktop" as string]: card.imgTopDesktop,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={card.img}
                alt=""
                aria-hidden
                style={{
                  position: "absolute",
                  left: card.imgLeft,
                  top: "var(--card-svg-top)",
                  width: card.imgW,
                  height: card.imgH,
                  transform: card.imgTransform,
                }}
              />

              <div
                className="absolute flex -translate-x-1/2 items-center whitespace-nowrap"
                style={{ left: "50%", top: "var(--cv-text-top)", gap: lang === "en" ? 100 : 200 }}
              >
                <div className="flex flex-col items-start gap-[12px]">
                  <p className="font-montserrat text-primary text-[44px] font-semibold leading-[1.1] tracking-[-0.44px]">
                    {card.eng}
                  </p>
                  <div className="flex items-center gap-[24px]">
                    {lang === "ko" && (
                      <span className="font-pretendard text-[60px] font-bold leading-[1.3] tracking-[-1.56px]">
                        {card.kor}
                      </span>
                    )}
                    <span className={`font-pretendard text-grayscale-700 leading-[1.3] tracking-[-0.84px] ${lang === "en" ? "text-[28px]" : "text-[42px]"}`}>
                      {card.tagline}
                    </span>
                  </div>
                </div>
                <div className={`font-pretendard leading-[1.3] tracking-[-0.84px] ${lang === "en" ? "text-[24px]" : "text-[42px]"}`}>
                  {card.desc.map((line, j) => (
                    <p key={j}>{line}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
