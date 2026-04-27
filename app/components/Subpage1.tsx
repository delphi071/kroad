import Footer from "./Footer";

// Figma PC base: page total ~14000px, banner-area is 0..613, subpage content from 613.
// In our slide architecture the hero already takes 100vh, so subpage starts at y=0
// here. We translate Figma y by -613 to map.

const F = (figmaY: number) => figmaY - 613;
const TOTAL_HEIGHT = 14000 - 613; // ≈ 13387

export default function Subpage1() {
  return (
    <div
      className="relative w-full overflow-hidden bg-grayscale-100"
      style={{
        height: `calc(100vw * ${TOTAL_HEIGHT} / 1920)`,
      }}
    >
      <div
        className="absolute left-0 top-0 origin-top-left text-black"
        style={{
          width: 1920,
          height: TOTAL_HEIGHT,
          transform: "scale(calc(100vw / 1920px))",
        }}
      >
        {/* Long green decorative path (Vector 8) — Figma top:768, subpage y=155 */}
        <div
          className="absolute"
          style={{
            left: -62.5,
            top: F(768.08),
            width: 1990.5,
            height: 8921.27,
          }}
          aria-hidden
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/figma/sub1-vector8.svg"
            alt=""
            className="block h-full w-full"
          />
        </div>

        {/* ============= SECTION 1: Mission (설립목적) ============= */}
        {/* Section header: Figma top:900 */}
        <div
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

        {/* Big tagline: Figma top:1000ish */}
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

        {/* Quote intro: Figma top:1788 */}
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

        {/* Mission cards: 3 images at Figma top:2211 */}
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
              text: ["길위에서", "사람과 지역, 자연을 연결하여", "지속가능한 사회적 가치를 창출한다."],
            },
            {
              src: "/figma/sub1-mission-card3.png",
              text: ["길을 통해 치유와 배움 등을", "제공하여 창조적 걷기 여행 문화를", "만들고 길의 이용을 활성화한다."],
            },
          ].map((card, i) => (
            <div key={i} className="flex flex-1 flex-col items-start gap-[98px]">
              <div className="aspect-square w-full overflow-hidden bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.src}
                  alt=""
                  className="block h-full w-full object-cover"
                />
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

        {/* Vertical green line (vector68) — between mission cards and Vision header */}
        <div
          className="absolute -translate-x-1/2 bg-primary"
          style={{ left: "50%", top: F(3018), width: 32, height: 556.5 }}
          aria-hidden
        />

        {/* ============= SECTION 2: Vision (우리가 꿈꾸는 미래) ============= */}
        {/* Header at Figma top:3664 (centered) */}
        <div
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

        {/* Big quote at Figma top:3810 (centered) */}
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
            <span>
              <span>이야기</span>가&nbsp; 되는 곳
            </span>
          </div>
          <div className="flex items-center justify-center gap-[20px] font-pretendard text-[124px] font-bold leading-[1.2] tracking-[-7.44px]">
            <span>대한민국</span>
            <span className="text-primary">걷기 문화의</span>
            <span className="text-primary">중심</span>
          </div>
        </div>

        {/* Vertical green line (vector69) — between big quote and Core Value header */}
        <div
          className="absolute -translate-x-1/2 bg-primary"
          style={{ left: "50%", top: F(4451), width: 32, height: 616 }}
          aria-hidden
        />

        {/* ============= SECTION 3: Core Value (핵심가치) ============= */}
        {/* Header at Figma top:5170 (centered) */}
        <div
          className="absolute flex -translate-x-1/2 items-end gap-[14px] whitespace-nowrap"
          style={{ left: "50%", top: F(5170) }}
        >
          <p className="font-pretendard text-[30px] font-extrabold leading-[1.2] tracking-[-0.78px]">
            핵심가치
          </p>
          <p className="font-montserrat text-[32px] font-bold leading-none tracking-[-1.28px] text-grayscale-400">
            Core Value
          </p>
        </div>

        {/* Discovery brand pillar at Figma top:5944 (centered, two columns) */}
        <div
          className="absolute flex -translate-x-1/2 items-center gap-[200px] whitespace-nowrap"
          style={{ left: "50%", top: F(5944) }}
        >
          <div className="flex flex-col items-start gap-[12px]">
            <p className="font-montserrat text-[44px] font-semibold leading-[1.1] tracking-[-0.44px] text-primary">
              Discovery
            </p>
            <div className="flex items-center gap-[24px]">
              <span className="font-pretendard text-[60px] font-bold leading-[1.3] tracking-[-1.56px]">
                발견
              </span>
              <span className="font-pretendard text-[42px] leading-[1.3] tracking-[-0.84px] text-grayscale-700">
                모든 길에는 이야기가 흐른다
              </span>
            </div>
          </div>
          <div className="font-pretendard text-[42px] leading-[1.3] tracking-[-0.84px]">
            <p>길 위의 숨은 역사와 문화를 찾아</p>
            <p>매력적인 콘텐츠로 만듭니다.</p>
          </div>
        </div>

        {/* ============= SECTION 4: Our Journey (주요 연혁) ============= */}
        {/* Header at Figma top:6833 */}
        <div
          className="absolute flex items-end gap-[14px] whitespace-nowrap"
          style={{ left: 414, top: F(6833) }}
        >
          <p className="font-pretendard text-[30px] font-extrabold leading-[1.2] tracking-[-0.78px]">
            주요 연혁
          </p>
          <p className="font-montserrat text-[32px] font-bold leading-none tracking-[-1.28px] text-grayscale-400">
            Our Journey
          </p>
        </div>

        {/* Big text 우리가 걸어온 길 */}
        <p
          className="absolute font-pretendard text-[100px] font-bold leading-[1.1] tracking-[-1px]"
          style={{ left: 414, top: F(6925) }}
        >
          우리가 걸어온 길
        </p>

        {/* Description text */}
        <div
          className="absolute font-pretendard text-[36px] leading-[1.3] tracking-[-0.72px] whitespace-nowrap"
          style={{ left: 414, top: F(7100) }}
        >
          <p>출범 이후 지난 십여년간 걷기여행길에 문화를 입히고</p>
          <p>지속가능한 걷기여행길과 올바른 걷기문화를 위한 방향을 제시하며 다양한 활동을 해왔습니다.</p>
          <p>&nbsp;</p>
          <p>대한민국을 대표하는 코리아둘레길, 경기둘레길을 포함한</p>
          <p>다양한 걷기 길을 지속적으로 연구∙관리·운영하는 가운데,</p>
          <p>새로운 걷기 기반 문화 프로그램을 운영하며 걷기 문화 확산을 위한 걸음을 이어가고 있습니다.</p>
        </div>

        {/* Timeline: 2010 at Figma top:7753 */}
        <div className="absolute" style={{ left: 414, top: F(7753) }}>
          <p className="font-montserrat text-[100px] font-extrabold leading-[1.1] tracking-[-1px]">
            2010
          </p>
        </div>
        <div className="absolute" style={{ left: 772.5, top: F(7771) }}>
          <p className="-translate-x-1/2 font-montserrat text-[60px] font-extrabold leading-[1.1] tracking-[-0.6px] text-grayscale-700">
            08
          </p>
        </div>
        <p
          className="absolute font-pretendard text-[36px] font-extrabold leading-[1.1] tracking-[-0.36px] text-grayscale-700 whitespace-nowrap"
          style={{ left: 871, top: F(7784) }}
        >
          법인 설립
        </p>
        <p
          className="absolute font-pretendard text-[24px] leading-[1.3] tracking-[-0.24px] whitespace-nowrap"
          style={{ left: 871, top: F(7853) }}
        >
          문화생태탐방로 사업 진행
        </p>
        <p
          className="absolute -translate-x-1/2 font-montserrat text-[60px] font-extrabold leading-[1.1] tracking-[-0.6px] text-grayscale-700"
          style={{ left: 772, top: F(7983) }}
        >
          09
        </p>
        <p
          className="absolute font-pretendard text-[36px] font-extrabold leading-[1.1] tracking-[-0.36px] text-grayscale-700 whitespace-nowrap"
          style={{ left: 871, top: F(7996) }}
        >
          {"동해안 걷기여행길 ‘해파랑길' 사업 진행"}
        </p>

        {/* Timeline: 2013 at Figma top:8349 */}
        <div className="absolute opacity-45" style={{ left: 414, top: F(8349) }}>
          <p className="font-montserrat text-[100px] font-extrabold leading-[1.1] tracking-[-1px]">
            2013
          </p>
        </div>
        <p
          className="absolute -translate-x-1/2 font-montserrat text-[60px] font-extrabold leading-[1.1] tracking-[-0.6px] text-grayscale-700 opacity-45"
          style={{ left: 772.5, top: F(8367) }}
        >
          07
        </p>
        <p
          className="absolute font-pretendard text-[36px] font-extrabold leading-[1.1] tracking-[-0.36px] text-grayscale-700 opacity-45 whitespace-nowrap"
          style={{ left: 871, top: F(8380) }}
        >
          전국 걷기여행길 현황 조사
        </p>
        <p
          className="absolute font-pretendard text-[24px] leading-[1.3] tracking-[-0.24px] opacity-45 whitespace-nowrap"
          style={{ left: 871, top: F(8449) }}
        >
          걷기여행길 (현 두루누비) 홈페이지 콘텐츠 조사
        </p>

        {/* Timeline: 2016 at Figma top:8775 */}
        <div className="absolute opacity-[0.14]" style={{ left: 414, top: F(8775) }}>
          <p className="font-montserrat text-[100px] font-extrabold leading-[1.1] tracking-[-1px]">
            2016
          </p>
        </div>
        <p
          className="absolute -translate-x-1/2 font-montserrat text-[60px] font-extrabold leading-[1.1] tracking-[-0.6px] text-grayscale-700 opacity-[0.14]"
          style={{ left: 772.5, top: F(8793) }}
        >
          05
        </p>
        <p
          className="absolute font-pretendard text-[36px] font-extrabold leading-[1.1] tracking-[-0.36px] text-grayscale-700 opacity-[0.14] whitespace-nowrap"
          style={{ left: 871, top: F(8806) }}
        >
          {"7일 동해안 걷기여행길 ‘해파랑길' 개통"}
        </p>
        <p
          className="absolute font-pretendard text-[24px] leading-[1.3] tracking-[-0.24px] opacity-[0.14] whitespace-nowrap"
          style={{ left: 871, top: F(8875) }}
        >
          50개 코스, 750KM
        </p>

        {/* ============= SECTION 5: Our People (사람들) ============= */}
        {/* Header at Figma top:10026 */}
        <div
          className="absolute flex items-end gap-[14px] whitespace-nowrap"
          style={{ left: 226, top: F(10026) }}
        >
          <p className="font-pretendard text-[30px] font-extrabold leading-[1.2] tracking-[-0.78px]">
            사람들
          </p>
          <p className="font-montserrat text-[32px] font-bold leading-none tracking-[-1.28px] text-grayscale-400">
            Our People
          </p>
        </div>

        {/* Big text */}
        <p
          className="absolute font-pretendard text-[100px] font-bold leading-[1.1] tracking-[-1px]"
          style={{ left: 226, top: F(10118) }}
        >
          한국의 길과 문화를 만들어가는 사람들
        </p>

        {/* Org chart: 이사장 at Figma top:10475 (centered) */}
        <div
          className="absolute flex -translate-x-1/2 items-center justify-center rounded-full bg-primary p-[40px]"
          style={{ left: "50%", top: F(10475), width: 300 }}
        >
          <p className="font-pretendard text-[36px] font-extrabold leading-[1.1] tracking-[-0.36px] text-white">
            이사장
          </p>
        </div>

        {/* 사무처 box at Figma top:11040 */}
        <div
          className="absolute flex items-center justify-center rounded-full bg-primary py-[40px]"
          style={{ left: 381, top: F(11040), width: 1158 }}
        >
          <p className="font-pretendard text-[36px] font-extrabold leading-[1.1] tracking-[-0.36px] text-white">
            사무처
          </p>
        </div>

        {/* 감사 at Figma top:10758 (right side) */}
        <div
          className="absolute flex items-center justify-center rounded-full bg-primary p-[40px]"
          style={{ left: 1139, top: F(10758), width: 300 }}
        >
          <p className="font-pretendard text-[36px] font-extrabold leading-[1.1] tracking-[-0.36px] text-white">
            감사
          </p>
        </div>

        {/* 3 teams at top:11279 */}
        <div
          className="absolute flex gap-[19px]"
          style={{ left: 381, top: F(11279), width: 1158 }}
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

        {/* Sub teams details at top:11433 */}
        <div
          className="absolute flex items-stretch gap-[19px]"
          style={{ left: 381, top: F(11433), width: 1158 }}
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

        {/* ============= SECTION 6: Location (오시는 길) ============= */}
        {/* Header at Figma top:12188 */}
        <div
          className="absolute flex items-end gap-[14px] whitespace-nowrap"
          style={{ left: 200, top: F(12188) }}
        >
          <p className="font-pretendard text-[30px] font-extrabold leading-[1.2] tracking-[-0.78px]">
            오시는 길
          </p>
          <p className="font-montserrat text-[32px] font-bold leading-none tracking-[-1.28px] text-grayscale-400">
            Location
          </p>
        </div>

        {/* Map + address container at Figma top:12364 */}
        <div
          className="absolute flex items-center"
          style={{ left: 200, top: F(12364), width: 1400, height: 610 }}
        >
          {/* Map placeholder */}
          <div className="relative h-[610px] w-[694px] overflow-hidden bg-white">
            <div className="flex h-full w-full items-center justify-center">
              <p className="font-pretendard text-[24px] text-grayscale-700">
                지도
              </p>
            </div>
          </div>
          {/* Address card */}
          <div className="flex h-[610px] w-[706px] flex-col justify-between px-[50px] py-[70px]">
            <p className="font-montserrat text-[24px] font-semibold tracking-[-0.5px] text-primary">
              Korean Trails and Culture Foundation
            </p>
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
        <div className="absolute" style={{ left: 0, top: F(13325), width: 1920 }}>
          <Footer />
        </div>
      </div>
    </div>
  );
}
