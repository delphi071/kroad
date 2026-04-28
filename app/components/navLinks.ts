/* Centralized navigation link map.
   Each (parentIdx, subIdx) → URL hash combining slide + optional sub-section anchor.
   Subpage components listen for the sub-section part to activate tabs/carousels/scroll.
*/

const SUB_LINKS: Record<number, Record<number, string>> = {
  // 우리의 길 (slide 1)
  0: {
    0: "#h1-mission",       // 설립목적
    1: "#h1-vision",        // 비전 및 핵심가치
    2: "#h1-journey",       // 주요 연혁
    3: "#h1-people",        // 사람들
    4: "#h1-location",      // 오시는 길
  },
  // 같은 길, 다른 시선 (slide 2)
  1: {
    0: "#h2-expertise",     // 전문역량
  },
  // 우리가 걷는 길 (slide 3)
  2: {
    0: "#h3-korea",         // 코리아둘레길
    1: "#h3-regional",      // 지역길 조사 및 연구/계획
    2: "#h3-culture",       // 걷기 문화 프로그램
    3: "#h3-goods",         // 굿즈 개발 및 판매
  },
  // 함께 걷는 사람들 (slide 4)
  3: {
    0: "#h4-kta",           // 한국걷는길연합
    1: "#h4-atn",           // ATN
    2: "#h4-wtn",           // WTN
    3: "#h4-gko",           // 코리아둘레길 완보자 클럽
  },
  // 알리는 이야기 (slide 5)
  4: {
    0: "#h5-notices",       // 공지사항
    1: "#h5-news",          // 소식받기
    2: "#h5-contact",       // 문의하기
  },
  // 마음잇기 (slide 6)
  5: {
    0: "#h6-donate",        // 후원하기
    1: "#h6-reports",       // 연간기금 및 활동 실적내역
  },
};

export function getMainHref(parentIdx: number): string {
  return `#h${parentIdx + 1}`;
}

export function getSubHref(parentIdx: number, subIdx: number): string {
  return SUB_LINKS[parentIdx]?.[subIdx] ?? getMainHref(parentIdx);
}
