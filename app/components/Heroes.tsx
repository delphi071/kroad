"use client";

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
export function Hero1() {
  return (
    <HeroLayout
      activeMenuIndex={0}
      bgImage="/img01.jpg"
      linearOverlay={0.3}
      radialOverlay={0.66}
      collapsedLine1="길"
      collapsedLine2="그 이상의 연결"
    >
      {/* Vertical L-curve vector (left side, rotated 90deg) - inline SVG */}
      <div
        className="absolute"
        style={{ left: -37, top: 571, width: 484.247, height: 205 }}
      >
        <div className="flex h-full w-full items-center justify-center">
          <div
            className="origin-center rotate-90"
            style={{ width: 205, height: 484.247 }}
          >
            <div
              className="absolute"
              style={{ inset: "-2.79% -6.59% 0 0" }}
            >
              <svg
                preserveAspectRatio="none"
                width="100%"
                height="100%"
                viewBox="0 0 218.5 497.747"
                fill="none"
                style={{ overflow: "visible", display: "block" }}
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M0 13.5L25 13.5A180 180 0 0 1 205 193.5L205 497.747"
                  stroke="#0AC200"
                  strokeWidth={31}
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal vector line (right side) */}
      <div
        className="absolute"
        style={{ left: 1048, top: 571 - 14 - 2, width: 878.497, height: 28 }}
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/figma/hero1-vec-h.svg" alt="" className="block h-full w-full" />
      </div>

      <HeroHeading text="길" left={102.07} top={200} width={175.089} />
      <HeroHeading
        text="그 이상의 연결"
        left={102.07}
        top={400}
        width={1071.547}
      />

      <HeroButton left={1312} top={479} />

      <HeroSubtitle
        enText="Beyond the Route"
        enLeft={1041}
        enTop={624}
        krLines={[
          "단순한 이동을 넘어,",
          "길 위에 숨겨진 가치를 연결하는 여정이 시작되는 지점",
        ]}
        krLeft={1041}
        krTop={682}
        krWidth={259}
      />
    </HeroLayout>
  );
}

/* ============= HERO 2: 같은 길, 다른 시선 ============= */
export function Hero2() {
  return (
    <HeroLayout
      activeMenuIndex={1}
      bgImage="/figma/hero2-bg.png"
      linearOverlay={0.2}
      radialOverlay={0.8}
      collapsedLine1="같은 길"
      collapsedLine2="다른 시선"
    >
      {/* Vector 3 (left S-curve) - inline SVG with arc commands */}
      <div
        className="absolute"
        style={{ left: 2, top: 347.5, width: 433.5, height: 236 }}
        aria-hidden
      >
        <svg
          preserveAspectRatio="none"
          width="100%"
          height="100%"
          viewBox="0 0 433.5 236"
          fill="none"
          style={{ overflow: "visible", display: "block" }}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path
            d="M433.5 12.5L304.5 12.5A105.5 105.5 0 0 0 199 118A105.5 105.5 0 0 1 93.5 223.5L0 223.5"
            stroke="#0AC200"
            strokeWidth={29}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* Vector 4 (right, scaleY(-1) rotate(180deg) per Figma) - inline SVG */}
      <div
        className="absolute"
        style={{ left: 1016, top: 620, width: 905, height: 229 }}
        aria-hidden
      >
        <div
          style={{
            width: 905,
            height: 229,
            transform: "scaleY(-1) rotate(180deg)",
          }}
        >
          <div
            className="absolute"
            style={{ inset: "0 -1.46% -5.79% 0" }}
          >
            <svg
              preserveAspectRatio="none"
              width="100%"
              height="100%"
              viewBox="0 0 918.25 242.25"
              fill="none"
              style={{ overflow: "visible", display: "block" }}
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M0 229H795A110 110 0 0 0 905 119V0"
                stroke="#0AC200"
                strokeWidth={33}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>
      </div>

      <HeroHeading text="같은 길" left={337} top={341} />
      <HeroHeading text="다른 시선" left={881} top={538} />

      <HeroButton left={1402} top={432} />

      <HeroSubtitle
        enText="Speciality"
        enLeft={365}
        enTop={560}
        krLines={[
          "표준을 설계하는 전문성과",
          "현장의 맥락을 읽는 기획력의 결합",
        ]}
        krLeft={365}
        krTop={618}
        krWidth={259}
      />
    </HeroLayout>
  );
}

/* ============= HERO 3: 우리가 걷는 길 ============= */
export function Hero3() {
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
  return (
    <HeroLayout
      activeMenuIndex={3}
      bgImage="/figma/hero4-bg.png"
      linearOverlay={0.4}
      radialOverlay={0.5}
      collapsedLine1="함께 걷는"
      collapsedLine2="사람들"
    >
      {/* Vector 5 (left, rotate-180) */}
      <div
        className="absolute"
        style={{ left: -3, top: 305, width: 411, height: 169 }}
        aria-hidden
      >
        <div
          className="flex h-full w-full items-center justify-center"
          style={{ transform: "rotate(180deg)" }}
        >
          <div
            className="absolute"
            style={{ inset: "0 0 -7.69% -3.16%" }}
          >
            <svg
              preserveAspectRatio="none"
              width="100%"
              height="100%"
              viewBox="0 0 424 182"
              fill="none"
              style={{ overflow: "visible", display: "block" }}
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M424 169H123A110 110 0 0 1 13 59V0"
                stroke="#0AC200"
                strokeWidth={32}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Vector 4 (right, rotate-180) */}
      <div
        className="absolute"
        style={{ left: 1282, top: 304, width: 642, height: 201 }}
        aria-hidden
      >
        <div
          className="flex h-full w-full items-center justify-center"
          style={{ transform: "rotate(180deg)" }}
        >
          <div
            className="absolute"
            style={{ inset: "0 -2.06% -6.57% 0" }}
          >
            <svg
              preserveAspectRatio="none"
              width="100%"
              height="100%"
              viewBox="0 0 655.2 214.2"
              fill="none"
              style={{ overflow: "visible", display: "block" }}
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M0 201H532A110 110 0 0 0 642 91V0"
                stroke="#0AC200"
                strokeWidth={32}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>
      </div>

      <HeroHeading text="함께 걷는" left={624} top={454} centered />
      <HeroHeading text="사람들" left={1396.5} top={454} centered />

      <HeroButton left={1455} top={674} />

      <HeroSubtitle
        enText="Network"
        enLeft={303}
        enTop={669}
        krLines={["길의 다음을 함께 만드는 파트너를 기다립니다."]}
        krLeft={477}
        krTop={674}
        krNowrap
      />
    </HeroLayout>
  );
}

/* ============= HERO 5: 알리는 이야기 ============= */
export function Hero5() {
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
export function Hero6() {
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
