"use client";
import { useEffect, useRef, useState } from "react";

/* Two sets of positions per element — original 1080-tall frame for mobile,
   and shifted positions for desktop (so content sits below the collapsed hero
   without being clipped). Frame itself stays 1920×1080 — no vertical compression
   so text is never clipped. */
const CARDS = [
  {
    eng: "Sustainability",
    kor: "지속",
    tagline: "오늘의 길이 내일에도 이어지도록",
    desc: ["자연 생태계를 보전하고 지역 경제를 살려", "내일의 길을 지켜나갑니다."],
    img: "/figma/sub1-corevalue-sustainability.svg",
    imgW: 344,
    imgH: 344,
    imgLeft: "50%" as string,
    imgTopMobile: "calc(50% - 82px)",
    imgTopDesktop: "calc(50% + 120px)",
    imgTransform: "translate(-50%, -50%)",
  },
  {
    eng: "Trust",
    kor: "신뢰",
    tagline: "안심하고 걷는 길, 믿음으로 쌓는 문화",
    desc: ["누구나 믿고 걸을 수 있도록", "체계적인 관리와 운영의 전문성을 갖춥니다."],
    img: "/figma/sub1-corevalue-trust.svg",
    imgW: 314.4,
    imgH: 269.6,
    imgLeft: "calc(50% + 0.5px)" as string,
    imgTopMobile: "calc(50% - 81.5px)",
    imgTopDesktop: "calc(50% + 120.5px)",
    imgTransform: "translate(-50%, -50%)",
  },
  {
    eng: "Connection",
    kor: "연결",
    tagline: "길은 사람과 지역을 잇는 다리다",
    desc: ["지역과 사람, 자연과 여행자를", "따뜻한 유대감으로 잇습니다."],
    img: "/figma/sub1-corevalue-connection.svg",
    imgW: 465.4,
    imgH: 206.4,
    imgLeft: "calc(50% - 9.5px)" as string,
    imgTopMobile: "329px",
    imgTopDesktop: "530px",
    imgTransform: "translateX(-50%)",
  },
  {
    eng: "Discovery",
    kor: "발견",
    tagline: "모든 길에는 이야기가 흐른다",
    desc: ["길 위의 숨은 역사와 문화를 찾아", "매력적인 콘텐츠로 만듭니다."],
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
            핵심가치
          </p>
          <p className="font-montserrat text-grayscale-400 text-[14px] font-bold tracking-[-0.56px] leading-none">
            Core Value
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
              핵심가치
            </p>
            <p className="font-montserrat text-grayscale-400 text-[32px] font-bold leading-none tracking-[-1.28px]">
              Core Value
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
                className="absolute flex -translate-x-1/2 items-center gap-[200px] whitespace-nowrap"
                style={{ left: "50%", top: "var(--cv-text-top)" }}
              >
                <div className="flex flex-col items-start gap-[12px]">
                  <p className="font-montserrat text-primary text-[44px] font-semibold leading-[1.1] tracking-[-0.44px]">
                    {card.eng}
                  </p>
                  <div className="flex items-center gap-[24px]">
                    <span className="font-pretendard text-[60px] font-bold leading-[1.3] tracking-[-1.56px]">
                      {card.kor}
                    </span>
                    <span className="font-pretendard text-grayscale-700 text-[42px] leading-[1.3] tracking-[-0.84px]">
                      {card.tagline}
                    </span>
                  </div>
                </div>
                <div className="font-pretendard text-[42px] leading-[1.3] tracking-[-0.84px]">
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
