"use client";

import Hero1Section from "./Hero1Section";
import Hero2Section from "./Hero2Section";
import Hero3Section from "./Hero3Section";
import Hero4Section from "./Hero4Section";
import Hero5Section from "./Hero5Section";
import Hero6Section from "./Hero6Section";
import HeroLayout, { useHeroCollapse } from "./HeroLayout";

// Shared CTA button (자세히 보기) — clicking scrolls current slide down to subpage
function HeroButton({
  left,
  top,
  variant = "default",
}: {
  left: number;
  top: number;
  variant?: "default" | "hero6";
}) {
  const isHero6 = variant === "hero6";
  const collapse = useHeroCollapse();
  const handleClick = () => { if (collapse) collapse(); };
  return (
    <button
      type="button"
      onClick={handleClick}
      className="absolute flex h-[49px] w-[169px] cursor-pointer items-center justify-center bg-white p-[10px]"
      style={{ left, top, borderTopLeftRadius: 20, borderBottomRightRadius: 20 }}
    >
      <span
        className="font-pretendard text-primary whitespace-nowrap"
        style={
          isHero6
            ? {
              fontSize: 16,
              fontWeight: 700,
              lineHeight: 1.5,
              letterSpacing: "-0.8px",
            }
            : {
              fontSize: 15,
              fontWeight: 800,
              lineHeight: 1.3,
              letterSpacing: "-0.3px",
            }
        }
      >
        자세히 보기
      </span>
    </button>
  );
}

// Display heading (SUITE Heavy 201.5px)
function HeroHeading({
  text,
  left,
  top,
  width,
  centered,
}: {
  text: string;
  left: number | string;
  top: number;
  width?: number;
  centered?: boolean;
}) {
  const transformClass = centered ? "-translate-x-1/2" : "";
  return (
    <p
      className={`absolute font-suite text-primary whitespace-nowrap ${transformClass}`}
      style={{
        left,
        top,
        width,
        fontSize: 201.5,
        lineHeight: 0.9,
        letterSpacing: "-10.075px",
        fontWeight: 900,
        textAlign: centered ? "center" : "left",
        margin: 0,
      }}
    >
      {text}
    </p>
  );
}

// Subtitle block: English heading + Korean description
function HeroSubtitle({
  enText,
  enLeft,
  enTop,
  enWidth,
  krLines,
  krLeft,
  krTop,
  krWidth,
  krNowrap,
}: {
  enText: string;
  enLeft: number | string;
  enTop: number | string;
  enWidth?: number;
  krLines: string[];
  krLeft: number | string;
  krTop: number | string;
  krWidth?: number;
  krNowrap?: boolean;
}) {
  return (
    <>
      <p
        className="absolute font-montserrat text-white whitespace-nowrap"
        style={{
          left: enLeft,
          top: enTop,
          width: enWidth,
          fontSize: 30.395,
          lineHeight: 1.3,
          letterSpacing: "-0.6079px",
          fontWeight: 800,
        }}
      >
        {enText}
      </p>
      <div
        className={`absolute font-pretendard text-white ${krNowrap ? "whitespace-nowrap" : ""
          }`}
        style={{
          left: krLeft,
          top: krTop,
          width: krWidth,
          fontSize: 20,
          lineHeight: 1.5,
          letterSpacing: "-0.2px",
          fontWeight: 500,
        }}
      >
        {krLines.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    </>
  );
}

/* ============= HERO 1: 우리의 길 ============= */
/* Hero1 is fully responsive (mobile + desktop). It owns its own nav, collapse logic, and content.
   Hero2-6 below still use the legacy HeroLayout until they are migrated. */
export function Hero1() {
  return <Hero1Section />;
}

/* ============= HERO 2: 같은 길, 다른 시선 ============= */
/* Hero2는 Hero1처럼 자체 반응형 컴포넌트로 분리. PC scale-frame + 모바일 레이아웃 + sticky nav. */
export function Hero2() {
  return <Hero2Section />;
}

/* ============= HERO 3: 우리가 걷는 길 ============= */
/* Hero3는 Hero1처럼 자체 반응형 컴포넌트로 분리. PC scale-frame + 모바일 레이아웃 + sticky nav. */
export function Hero3() {
  return <Hero3Section />;
}

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
function _Hero3Legacy() {
  return (
    <HeroLayout
      activeMenuIndex={2}
      bgImage="/figma/hero3-bg.png"
      linearOverlay={0.3}
      radialOverlay={0.6}
      collapsedLine1="우리가"
      collapsedLine2="걷는 길"
    >
      {/* Vector 4 (left) - inline SVG with arc commands */}
      <div
        className="absolute"
        style={{ left: 4, top: 461, width: 609, height: 386 }}
        aria-hidden
      >
        <div className="absolute" style={{ inset: "-3.24% 0" }}>
          <svg
            preserveAspectRatio="none"
            width="100%"
            height="100%"
            viewBox="0 0 609 411"
            fill="none"
            style={{ overflow: "visible", display: "block" }}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M-5 398.5H231.198A110 110 0 0 0 341.198 288.5V122.5A110 110 0 0 1 451.198 12.5H609"
              stroke="#0AC200"
              strokeWidth={32}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>

      {/* Vector 5 (right, rotate-180) - inline SVG */}
      <div
        className="absolute"
        style={{ left: 1281, top: 305, width: 639, height: 335 }}
        aria-hidden
      >
        <div
          className="flex h-full w-full items-center justify-center"
          style={{ transform: "rotate(180deg)" }}
        >
          <div
            className="absolute"
            style={{ inset: "0 -2.11% -4.03% 0" }}
          >
            <svg
              preserveAspectRatio="none"
              width="100%"
              height="100%"
              viewBox="0 0 652.5 348.5"
              fill="none"
              style={{ overflow: "visible", display: "block" }}
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M0 335H529A110 110 0 0 0 639 225V0"
                stroke="#0AC200"
                strokeWidth={42}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>
      </div>

      <HeroHeading text="우리가" left={691.5} top={349} centered />
      <HeroHeading text="걷는 길" left={1042.5} top={549} centered />

      <HeroButton left={982} top={455} />

      <HeroSubtitle
        enText="Solution"
        enLeft={1332}
        enTop={549}
        krLines={[
          "길의 본질부터 일상의 가치까지,",
          "통합적인 솔루션을 제안합니다.",
        ]}
        krLeft={1332}
        krTop={605}
        krNowrap
      />
    </HeroLayout>
  );
}

/* ============= HERO 4: 함께 걷는 사람들 ============= */
export function Hero4() {
  return <Hero4Section />;
}

/* ============= HERO 5: 알리는 이야기 ============= */
/* Hero5는 Hero1처럼 자체 반응형 컴포넌트로 분리. PC scale-frame + 모바일 레이아웃 + sticky nav. */
export function Hero5() {
  return <Hero5Section />;
}

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
function _Hero5Legacy() {
  return (
    <HeroLayout
      activeMenuIndex={4}
      bgImage="/figma/hero5-bg.png"
      linearOverlay={0.3}
      radialOverlay={0.6}
      collapsedLine1="알리는"
      collapsedLine2="이야기"
    >
      {/* Vector 4 (left, scaleY(-1)) - inline SVG */}
      <div
        className="absolute"
        style={{ left: -28, top: 304, width: 751, height: 175 }}
        aria-hidden
      >
        <div
          className="flex h-full w-full items-center justify-center"
          style={{ transform: "scaleY(-1)" }}
        >
          <div
            className="absolute"
            style={{ inset: "0 -1.8% -7.71% 0" }}
          >
            <svg
              preserveAspectRatio="none"
              width="100%"
              height="100%"
              viewBox="0 0 764.5 188.5"
              fill="none"
              style={{ overflow: "visible", display: "block" }}
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M0 175H641A110 110 0 0 0 751 65V0"
                stroke="#0AC200"
                strokeWidth={32}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Vector 5 (right, no transform) - inline SVG */}
      <div
        className="absolute"
        style={{ left: 1143, top: 616, width: 776, height: 143 }}
        aria-hidden
      >
        <div className="absolute" style={{ inset: "0 0 -9.44% -1.74%" }}>
          <svg
            preserveAspectRatio="none"
            width="100%"
            height="100%"
            viewBox="0 0 789.5 156.5"
            fill="none"
            style={{ overflow: "visible", display: "block" }}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M789.5 143H123.5A110 110 0 0 1 13.5 33V0"
              stroke="#0AC200"
              strokeWidth={32}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>

      <HeroHeading text="알리는" left="calc(50% - 546px)" top={457} />
      <HeroHeading text="이야기" left="calc(50% + 41px)" top={457} width={516} />

      <HeroButton left={1529} top={582} />

      <HeroSubtitle
        enText="News"
        enLeft={776}
        enTop={659}
        enWidth={133}
        krLines={["새로운 길 이야기를 전합니다"]}
        krLeft={887}
        krTop={666}
        krNowrap
      />
    </HeroLayout>
  );
}

/* ============= HERO 6: 마음잇기 ============= */
/* Hero6는 Hero1처럼 자체 반응형 컴포넌트로 분리. PC scale-frame + 모바일 레이아웃 + sticky nav. */
export function Hero6() {
  return <Hero6Section />;
}

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
function _Hero6Legacy() {
  return (
    <HeroLayout
      activeMenuIndex={5}
      bgImage="/figma/hero6-bg.png"
      linearOverlay={0.4}
      radialOverlay={0.4}
      collapsedLine1="마음잇기"
    >
      {/* Vector 4 (left) - inline SVG */}
      <div
        className="absolute"
        style={{ left: 0, top: 457, width: 760.5, height: 302 }}
        aria-hidden
      >
        <div className="absolute" style={{ inset: "0 -1.78% -4.47% 0" }}>
          <svg
            preserveAspectRatio="none"
            width="100%"
            height="100%"
            viewBox="0 0 774 315.5"
            fill="none"
            style={{ overflow: "visible", display: "block" }}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M0 302H650.5A110 110 0 0 0 760.5 192V0"
              stroke="#0AC200"
              strokeWidth={40}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>

      {/* Vector 5 (right, scaleY(-1)) - inline SVG */}
      <div
        className="absolute"
        style={{ left: 1098.1, top: 304, width: 821.898, height: 271 }}
        aria-hidden
      >
        <div
          className="flex h-full w-full items-center justify-center"
          style={{ transform: "scaleY(-1)" }}
        >
          <div
            className="absolute"
            style={{ inset: "0 0 -4.98% -1.64%" }}
          >
            <svg
              preserveAspectRatio="none"
              width="100%"
              height="100%"
              viewBox="0 0 835.398 284.5"
              fill="none"
              style={{ overflow: "visible", display: "block" }}
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M835.398 271H123.5A110 110 0 0 1 13.5 161V0"
                stroke="#0AC200"
                strokeWidth={40}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>
      </div>

      <HeroHeading text="마음잇기" left="calc(50% + 0.5px)" top={457} centered />

      <HeroButton left={411} top={582} variant="hero6" />

      <HeroSubtitle
        enText="Walk with Us"
        enLeft={1324}
        enTop={501}
        krLines={["길 위에 가치를 더하는 여정에 함께하세요."]}
        krLeft={1324}
        krTop={550}
        krNowrap
      />
    </HeroLayout>
  );
}
