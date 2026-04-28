import Footer from "./Footer";

/* Figma slide 4 PC: hero 0-613, content from 820 onwards. Footer at bottom of frame.
   Bottom row cards (top:2057) with image+title+body+CTA + padding ≈ 800px → cards end ~2860.
   Add buffer + footer height so cards have full clearance before footer starts. */
const F4 = (figmaY: number) => figmaY - 613;
const FOOTER_HEIGHT = 675;
const SUBPAGE_HEIGHT = 2900 - 613 + FOOTER_HEIGHT; // ~2962

/* 4 partner cards data — order differs per Figma:
   PC: 2x2 grid (KTA top-left, ATN top-right, WTN bottom-left, GKO bottom-right)
   Mobile: vertical (KTA, WTN, ATN, GKO) */
type PartnerData = {
  img: string;
  imgPC: { width: number; height: number; withCircle?: boolean };
  imgMobile: { width: number; height: number; withCircle?: boolean };
  title: string;
  titleMobile: string[];
  body: string;
  link: string;
};
const PARTNERS: Record<"kta" | "atn" | "wtn" | "gko", PartnerData> = {
  kta: {
    img: "/figma/sub4-img-kta.png",
    imgPC: { width: 332, height: 240 },
    imgMobile: { width: 277, height: 199 },
    title: "한국걷는길연합",
    titleMobile: ["한국걷는길연합"],
    body: "한국걷는길연합(KTA)은 한국의 도보 여행길을 운영하고 관리하는 단체들의 모임으로, 도보여행을 통해 자연의 소중함을 알리고, 지역문화를 재발견하여 지속 가능한 지역관광 활성화와 공동체 발전을 목표로 활동하는 단체입니다. 사단법인 한국의문화를 포함한 20개에 이르는 걷기 길 단체가 모여 지속가능한 걷기 문화를 만들어 나가고 있습니다.",
    link: "https://cafe.daum.net/koreantrails",
  },
  atn: {
    img: "/figma/sub4-img-atn.png",
    imgPC: { width: 266, height: 240 },
    imgMobile: { width: 222, height: 200 },
    title: "아시아 트레일즈 네트워크(ATN)",
    titleMobile: ["ATN", "아시아 트레일즈 네트워크"],
    body: "아시아 각국의 트레일을 연결하는 지역 기반 국제 네트워크로, 국가 간 교류와 공동 프로그램을 통해 아시아 트레일의 다양성과 연결성을 강화하는 다양한 사업을 진행하고 있습니다. 사단법인 한국의길과문화는 ATN과 함께 한국의 길을 아시아 맥락 속에서 해석하고, 한국의 길을 아시아와 잇는 역할을 수행하고 있습니다.",
    link: "https://www.facebook.com/asiatrailsnetwork/",
  },
  wtn: {
    img: "/figma/sub4-img-wtn.png",
    imgPC: { width: 240, height: 240, withCircle: true },
    imgMobile: { width: 200, height: 200, withCircle: true },
    title: "월드 트레일즈 네트워크(WTN)",
    titleMobile: ["WTN", "월드 트레이즈 네트워크"],
    body: "전 세계의 트레일과 걷기길을 연결하는 글로벌 협력 네트워크입니다. 각국의 운영 주체들이 교류하며 트레일 보전과 지속가능한 이용, 걷기 관광의 가치를 함께 만들어가고 있습니다. 한국의길과문화는 WTN과의 협력을 통해 한국의 길을 세계와 연결하고, 그 경험과 콘텐츠를 확장하고 있습니다. 길을 매개로 사람과 자연, 지역을 잇는 글로벌 흐름을 함께 만들어가고 있습니다.",
    link: "https://worldtrailsnetwork.org",
  },
  gko: {
    img: "/figma/sub4-img-gko.png",
    imgPC: { width: 242, height: 240 },
    imgMobile: { width: 202, height: 200 },
    title: "GKO(코리아둘레길 완보자클럽)",
    titleMobile: ["GKO", "코리아둘레길 완보자클럽"],
    body: "코리아둘레길(해파랑길, 남파랑길, 서해랑길, DMZ평화의길) 중 1개 이상을 완주한 사람들이 모인 코리아둘레길 완보자 클럽은 지속 가능한 걷기 여행 문화 확산을 목적으로 2024년 5월 발족한 모임입니다. 4500km 전 구간 완주자(그랜드슬램)를 포함한 회원들이 정보를 교류하며, 단순한 걷기 모임을 넘어 코리아둘레길 관련 행사 및 홍보 활동을 주도하고 있습니다.",
    link: "https://cafe.naver.com/greatkodullers",
  },
};

const NAV_COLS = [
  { title: "우리의 길", items: ["설립목적", "비전 및 핵심가치", "주요 연혁", "사람들", "오시는 길"] },
  { title: "같은 길, 다른 시선", items: ["전문역량"] },
  { title: "우리가 걷는 길", items: ["코리아둘레길", "지역길 조사 및 계획", "걷기 문화 프로그램", "굿즈 개발 및 판매"] },
  { title: "함께 걷는 사람들", items: ["한국걷는길연합", "ATN", "WTN", "코리아둘레길\n완보자 클럽"] },
  { title: "알리는 이야기", items: ["공지사항", "소식받기", "문의하기"] },
  { title: "마음잇기", items: ["후원하기", "연간기금 및\n활동 실적내역"] },
];

type Partner = (typeof PARTNERS)[keyof typeof PARTNERS];

function PCPartnerCard({
  partner,
  left,
  top,
  width,
}: {
  partner: Partner;
  left: number;
  top: number;
  width: number;
}) {
  return (
    <div
      className="absolute flex flex-col items-center gap-[50px] overflow-hidden px-[40px] pt-[50px] pb-[40px]"
      style={{ left, top, width }}
    >
      <div className="relative shrink-0" style={{ width: partner.imgPC.width, height: partner.imgPC.height }}>
        {partner.imgPC.withCircle && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src="/figma/sub4-ellipse52.svg" alt="" aria-hidden className="absolute inset-0 size-full" />
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={partner.img} alt="" className="absolute inset-0 size-full object-contain" />
      </div>
      <div className="flex w-full flex-col items-center gap-[52px]">
        <div className="flex w-full flex-col items-start gap-[32px] text-center">
          <p className="font-pretendard text-grayscale-900 text-[50px] font-bold leading-[1.2] tracking-[-1.3px] w-full">
            {partner.title}
          </p>
          <p className="font-pretendard text-grayscale-700 text-[24px] leading-[1.3] tracking-[-0.24px] w-full">
            {partner.body}
          </p>
        </div>
        <a
          href={partner.link}
          target="_blank"
          rel="noreferrer"
          className="bg-primary flex h-[49px] w-[169px] items-center justify-center p-[10px] hover:opacity-90 transition-opacity"
          style={{ borderTopLeftRadius: 20, borderBottomRightRadius: 20 }}
        >
          <span className="font-pretendard whitespace-nowrap text-[15px] font-extrabold leading-[1.3] tracking-[-0.3px] text-white">
            자세히 보기
          </span>
        </a>
      </div>
    </div>
  );
}

function MobilePartnerCard({ partner }: { partner: Partner }) {
  return (
    <div className="flex flex-col items-center gap-[50px] overflow-hidden pt-[50px] pb-[40px] w-full">
      <div className="relative shrink-0" style={{ width: partner.imgMobile.width, height: partner.imgMobile.height }}>
        {partner.imgMobile.withCircle && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src="/figma/sub4-ellipse52.svg" alt="" aria-hidden className="absolute inset-0 size-full" />
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={partner.img} alt="" className="absolute inset-0 size-full object-contain" />
      </div>
      <div className="flex w-full flex-col items-center gap-[52px]">
        <div className="flex w-full flex-col items-start gap-[32px] text-center">
          <div className="font-pretendard text-grayscale-900 text-[34px] font-bold leading-[1.2] tracking-[-0.884px] w-full">
            {partner.titleMobile.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <p className="font-pretendard text-grayscale-700 text-[16px] leading-[1.5] tracking-[-0.8px] w-full">
            {partner.body}
          </p>
        </div>
        <a
          href={partner.link}
          target="_blank"
          rel="noreferrer"
          className="bg-primary flex h-[49px] w-[169px] items-center justify-center p-[10px] hover:opacity-90 transition-opacity"
          style={{ borderTopLeftRadius: 20, borderBottomRightRadius: 20 }}
        >
          <span className="font-pretendard whitespace-nowrap text-[15px] font-extrabold leading-[1.3] tracking-[-0.3px] text-white">
            자세히 보기
          </span>
        </a>
      </div>
    </div>
  );
}

export default function Subpage4() {
  return (
    <div className="bg-grayscale-100">
      {/* ============================== MOBILE ============================== */}
      <div className="lg:hidden bg-grayscale-100 flex flex-col items-center gap-[100px] px-[20px] py-[64px]">
        <p className="font-montserrat text-grayscale-400 text-[14px] font-bold tracking-[-0.56px] leading-none whitespace-nowrap">
          What We Do
        </p>

        <div className="flex flex-col items-center gap-[24px] text-center font-pretendard text-grayscale-900 tracking-[-1.3px] whitespace-nowrap">
          <div>
            <p className="text-[50px] leading-[1.2]">함께 걸어서</p>
            <p className="text-[50px] leading-[1.2]">아름다운 길,</p>
          </div>
          <div>
            <p className="text-[50px] font-bold leading-[1.2]">같이 해서 힘이 되는</p>
            <p className="text-[50px] font-bold leading-[1.2]">길을 걷습니다</p>
          </div>
        </div>

        <MobilePartnerCard partner={PARTNERS.kta} />
        <MobilePartnerCard partner={PARTNERS.wtn} />
        <MobilePartnerCard partner={PARTNERS.atn} />
        <MobilePartnerCard partner={PARTNERS.gko} />
      </div>

      {/* MOBILE FOOTER */}
      <div className="lg:hidden bg-grayscale-100 flex flex-col items-center gap-[40px] px-[20px] py-[64px]">
        <div className="relative" style={{ width: 281, height: 215 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/figma/footer-union.svg" alt="Beyond the Route" className="absolute block" style={{ left: 0, top: 0, width: "100%", height: "100%" }} />
          <p className="font-montserrat text-primary absolute font-semibold leading-none whitespace-nowrap" style={{ left: "61%", top: "92%", fontSize: 10 }}>
            Korean Trails and Culture Foundation
          </p>
        </div>

        <div className="flex flex-col gap-[24px] w-full">
          <div className="flex items-start justify-between w-full">
            {NAV_COLS.slice(0, 3).map((col) => (
              <div key={col.title} className="flex flex-col items-center gap-[10px] w-[100px]">
                <p className="font-pretendard text-grayscale-900 text-[12px] font-bold leading-none text-center whitespace-nowrap">{col.title}</p>
                <div className="flex flex-col items-center gap-[6px]">
                  {col.items.map((item) => (
                    <a key={item} href="#" className="font-pretendard text-grayscale-600 text-[12px] leading-[1.5] tracking-[-0.6px] text-center hover:text-primary" style={{ whiteSpace: "pre-line" }}>{item}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-start justify-between w-full">
            {NAV_COLS.slice(3, 6).map((col) => (
              <div key={col.title} className="flex flex-col items-center gap-[10px] w-[100px]">
                <p className="font-pretendard text-grayscale-900 text-[12px] font-bold leading-none text-center whitespace-nowrap">{col.title}</p>
                <div className="flex flex-col items-center gap-[6px]">
                  {col.items.map((item) => (
                    <a key={item} href="#" className="font-pretendard text-grayscale-600 text-[12px] leading-[1.5] tracking-[-0.6px] text-center hover:text-primary" style={{ whiteSpace: "pre-line" }}>{item}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/figma/footer-group32.svg" alt="사단법인 한국의길과문화" className="block shrink-0" style={{ width: 134, height: 56 }} />
          <div className="flex items-center gap-[24px] shrink-0">
            <a href="#" aria-label="Instagram" className="block size-[32px]">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/figma/footer-icon-instagram.svg" alt="" className="size-full" /></a>
            <a href="#" aria-label="스토어" className="block size-[32px]">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/figma/footer-icon-store.svg" alt="" className="size-full" /></a>
            <a href="#" aria-label="후원" className="block size-[32px]">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/figma/footer-icon-donate.svg" alt="" className="size-full" /></a>
          </div>
        </div>

        <div className="flex items-center gap-[12px]">
          <div className="relative h-[40px] w-[160px]">
            <div className="absolute size-[40px]" style={{ left: 0 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/footer-group.svg" alt="" className="block size-full" />
            </div>
            <div className="absolute" style={{ left: 50, top: 12, right: 0, height: 16 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/footer-group1.svg" alt="국민권익위원회" className="block size-full object-contain" />
            </div>
          </div>
          <div className="h-[40px] w-[90px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/footer-frame371.svg" alt="국세청" className="block size-full object-contain" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-[6px] text-center">
          <p className="font-pretendard text-grayscale-600 text-[10px] font-bold leading-none">대표 : 홍성운 · 사업자등록번호 : 123-82-14123</p>
          <p className="font-pretendard text-grayscale-600 text-[10px] font-bold leading-[1.5]">서울특별시 용산구 한강대로52길 25-8, DB Tower 402호</p>
          <p className="font-pretendard text-grayscale-600 text-[10px] font-bold leading-none">대표전화 : 02-6013-6610 · 팩스 : 02-6937-0259</p>
          <p className="font-pretendard text-grayscale-600 text-[10px] font-bold leading-none">이메일 : ktnc@tnc.or.kr</p>
          <p className="font-pretendard text-grayscale-600 text-[10px] font-bold leading-none mt-[12px]">
            Copyrightⓒ Korea Trails and Culture Foundation, All Rights Reserved.
          </p>
        </div>
      </div>

      {/* ============================== DESKTOP ============================== */}
      <div
        className="hidden lg:block relative w-full overflow-hidden bg-grayscale-100"
        style={{ height: `calc(100vw * ${SUBPAGE_HEIGHT} / 1920)` }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{ width: 1920, height: SUBPAGE_HEIGHT, transform: "scale(calc(100vw / 1920px))" }}
        >
          {/* Header section: "Cooperate" + 100px heading */}
          <div className="absolute flex flex-col gap-[50px] items-start" style={{ left: 194, top: F4(820), width: 1327 }}>
            <div className="flex flex-col gap-[42px] items-start w-full">
              <p className="font-montserrat text-grayscale-400 text-[32px] font-bold leading-none tracking-[-1.28px] whitespace-nowrap">
                Cooperate
              </p>
              <div className="font-pretendard text-grayscale-900 tracking-[-1px]">
                <p className="text-[100px] leading-[1.1]">함께 걸어서 아름다운 길,</p>
                <p className="text-[100px] font-bold leading-[1.1]">같이 해서 힘이 되는 길을 걷습니다</p>
              </div>
            </div>
          </div>

          {/* 4 partner cards 2x2 grid */}
          <PCPartnerCard partner={PARTNERS.kta} left={192} top={F4(1279)} width={743} />
          <PCPartnerCard partner={PARTNERS.atn} left={985} top={F4(1279)} width={717} />
          <PCPartnerCard partner={PARTNERS.wtn} left={192} top={F4(2057)} width={743} />
          <PCPartnerCard partner={PARTNERS.gko} left={985} top={F4(2057)} width={721} />

          {/* Footer */}
          <div className="absolute" style={{ left: 0, top: SUBPAGE_HEIGHT - FOOTER_HEIGHT, width: 1920 }}>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
