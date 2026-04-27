"use client";
import { useEffect, useRef, useState } from "react";

const ITEMS = [
  {
    year: "2010",
    events: [
      { month: "08", title: "법인 설립", desc: "문화생태탐방로 사업 진행" },
      { month: "09", title: "동해안 걷기여행길 '해파랑길' 사업 진행", desc: "" },
    ],
  },
  {
    year: "2013",
    events: [
      { month: "07", title: "전국 걷기여행길 현황 조사", desc: "걷기여행길 (현 두루누비) 홈페이지 콘텐츠 조사" },
    ],
  },
  {
    year: "2016",
    events: [
      { month: "05", title: "7일 동해안 걷기여행길 '해파랑길' 개통", desc: "50개 코스, 750KM" },
      { month: "06", title: "17일 코리아둘레길 계획 발표", desc: "남파랑길, 서해랑길, DMZ평화의길 노선조사 참여" },
    ],
  },
  {
    year: "2020",
    events: [
      { month: "10", title: '31일 남해안 걷기여행길 "남파랑길" 개통', desc: "90개 코스, 1,470km" },
      { month: "", title: "코리아둘레길 모니터링 및 안내사무국 운영", desc: "" },
    ],
  },
  {
    year: "2022",
    events: [
      { month: "06", title: '22일 서해안 걷기여행길 "서해랑길" 개통', desc: "109개 코스, 1,800km" },
    ],
  },
  {
    year: "2024",
    events: [
      { month: "09", title: '23일 DMZ 접경지역 걷기여행길 "평화의길" 개통', desc: "35개 코스, 510km / 우회노선 13개 코스" },
    ],
  },
];

const SLOT_H = 360;
// 2024가 맨 위로 올 수 있도록 MAX_INDEX = 마지막 인덱스
const MAX_INDEX = ITEMS.length - 1; // 5

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
    <div ref={wrapperRef} style={{ height: `${(MAX_INDEX + 1) * 100}vh` }}>
      <div
        className="sticky top-0 overflow-hidden bg-grayscale-100"
        style={{ height: "100vh" }}
      >
        <div
          className="relative overflow-hidden text-black"
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
              top: 70,
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
              top: 0,
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
                  style={{ left: 414, top: 60, fontSize: 100 }}
                >
                  {item.year}
                </p>
                {item.events.map((ev, j) => (
                  <div key={j}>
                    {ev.month && (
                      <p
                        className="absolute font-montserrat font-extrabold leading-[1.1] tracking-[-0.6px] text-grayscale-700"
                        style={{ left: 732, top: 78 + j * 160, fontSize: 60 }}
                      >
                        {ev.month}
                      </p>
                    )}
                    <p
                      className="absolute font-pretendard font-extrabold leading-[1.1] tracking-[-0.36px] text-grayscale-700 whitespace-nowrap"
                      style={{ left: 871, top: 91 + j * 160, fontSize: 36 }}
                    >
                      {ev.title}
                    </p>
                    {ev.desc && (
                      <p
                        className="absolute font-pretendard leading-[1.3] tracking-[-0.24px] whitespace-nowrap"
                        style={{ left: 871, top: 160 + j * 160, fontSize: 24 }}
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
  );
}
