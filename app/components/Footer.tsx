import { getMainHref, getSubHref } from "./navLinks";

const NAV_COLS = [
  {
    title: "우리의 길",
    items: ["설립목적", "비전 및 핵심가치", "주요 연혁", "사람들", "오시는 길"],
  },
  {
    title: "같은 길, 다른 시선",
    items: ["전문역량"],
  },
  {
    title: "우리가 걷는 길",
    items: ["코리아둘레길", "지역길 조사 및 계획", "걷기 문화 프로그램", "굿즈 개발 및 판매"],
  },
  {
    title: "함께 걷는 사람들",
    items: ["한국걷는길연합", "ATN", "WTN", "코리아둘레길\n완보자 클럽"],
  },
  {
    title: "알리는 이야기",
    items: ["공지사항", "소식받기", "문의하기"],
  },
  {
    title: "마음잇기",
    items: ["후원하기", "연간기금 및\n활동 실적내역"],
  },
];

export default function Footer() {
  return (
    <div
      className="relative bg-grayscale-100"
      style={{ width: 1920, height: 675 }}
    >
      {/* ===== 좌측: Beyond the Route 로고 마크 ===== */}
      <div
        className="absolute"
        style={{ left: 200, top: 195, width: 531, height: 282 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/figma/footer-union.svg" alt="Beyond the Route" className="block h-full w-full" />
      </div>

      {/* "Korean Trails and Culture Foundation" 서브텍스트 */}
      <p
        className="absolute font-montserrat font-semibold text-primary"
        style={{ left: 524.85, top: 467.08, fontSize: 14.447, lineHeight: 1, whiteSpace: "nowrap" }}
      >
        Korean Trails and Culture Foundation
      </p>

      {/* ===== 중앙: 네비게이션 사이트맵 ===== */}
      <div
        className="absolute flex items-start justify-between"
        style={{ left: 880, top: 120, width: 840 }}
      >
        {NAV_COLS.map((col, colIdx) => (
          <div key={col.title} className="flex flex-col items-end gap-[20px]">
            <a href={getMainHref(colIdx)} className="font-pretendard text-right text-[16px] font-extrabold leading-[1.3] text-black tracking-[-0.32px] whitespace-nowrap hover:text-primary">
              {col.title}
            </a>
            <div className="flex flex-col items-end gap-[12px]">
              {col.items.map((item, itemIdx) => (
                <a
                  key={item}
                  href={getSubHref(colIdx, itemIdx)}
                  className="font-pretendard text-right text-[16px] font-normal leading-[1.4] text-[#737373] tracking-[-0.8px] hover:text-primary"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ===== 하단 중앙: 회사 정보 ===== */}
      <div
        className="absolute"
        style={{ left: 880, top: 440 }}
      >
        <div className="flex items-center gap-[10px] px-[10px] py-[5px]">
          <p className="font-pretendard text-[12px] font-bold leading-none text-[#737373] whitespace-nowrap">대표 : 홍성운</p>
          <span className="h-[12px] w-px bg-[#737373]" aria-hidden />
          <p className="font-pretendard text-[12px] font-bold leading-none text-[#737373] whitespace-nowrap">사업자등록번호 : 123-82-14123</p>
        </div>
        <div className="flex items-center gap-[10px] px-[10px] py-[5px]">
          <p className="font-pretendard text-[12px] font-bold leading-none text-[#737373] whitespace-nowrap">주소 : 서울특별시 용산구 한강대로52길 25-8, DB Tower 402호</p>
          <span className="h-[12px] bg-[#737373]" style={{ width: "0.5px" }} aria-hidden />
          <p className="font-pretendard text-[12px] font-bold leading-none text-[#737373] whitespace-nowrap">대표전화  : 02-6013-6610</p>
        </div>
        <div className="flex items-center gap-[10px] px-[10px] py-[5px]">
          <p className="font-pretendard text-[12px] font-bold leading-none text-[#737373] whitespace-nowrap">팩스 : 02-6937-0259</p>
          <span className="h-[12px] bg-[#737373]" style={{ width: "0.5px" }} aria-hidden />
          <p className="font-pretendard text-[12px] font-bold leading-none text-[#737373] whitespace-nowrap">이메일  : ktnc@tnc.or.kr</p>
          <span className="h-[12px] bg-[#737373]" style={{ width: "0.5px" }} aria-hidden />
          <p className="font-pretendard text-[12px] font-bold leading-none text-[#737373] whitespace-nowrap">개인정보보호책임자 : 최해선</p>
        </div>
        <div className="px-[10px]" style={{ paddingTop: 24 }}>
          <p className="font-pretendard text-[12px] font-bold leading-none text-[#737373] whitespace-nowrap">
            Copyrightⓒ Korea Trails and Culture Foundation , All Rights Reserved.
          </p>
        </div>
      </div>

      {/* ===== 우측: 한국의길과문화 캘리그래피 로고 ===== */}
      <div
        className="absolute"
        style={{ left: 1546, top: 374, width: 173.739, height: 73 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/figma/footer-group32.svg" alt="사단법인 한국의길과문화" className="block h-full w-full" />
      </div>

      {/* ===== 우측: 소셜 아이콘 ===== */}
      <div
        className="absolute flex items-center gap-[39px]"
        style={{ left: 1546, top: 465 }}
      >
        <a href="https://www.instagram.com/koreatnc1" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="block size-[32px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/figma/footer-icon-instagram.svg" alt="" className="size-full" />
        </a>
        <a href="https://smartstore.naver.com/koreatnc" target="_blank" rel="noopener noreferrer" aria-label="스토어" className="block size-[32px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/figma/footer-icon-store.svg" alt="" className="size-full" />
        </a>
      </div>

      {/* ===== 하단 우측: 국민권익위원회 버튼 (emblem + 텍스트) ===== */}
      <div
        className="absolute"
        style={{ left: 1432, top: 514, width: 167.979, height: 40 }}
      >
        {/* emblem 원형 */}
        <div className="absolute" style={{ left: 0, top: 0, width: 41.2169, height: 40 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/figma/footer-group.svg" alt="" className="block h-full w-full" />
        </div>
        {/* 텍스트 라벨 */}
        <div className="absolute" style={{ left: 51.3, top: 12.2, right: 0, height: 16.715 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/figma/footer-group1.svg" alt="국민권익위원회" className="block h-full w-full" />
        </div>
      </div>

      {/* ===== 하단 우측: 국세청 버튼 ===== */}
      <div
        className="absolute"
        style={{ left: 1625.13, top: 514, width: 94.715, height: 40 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/figma/footer-frame371.svg" alt="국세청" className="block h-full w-full" />
      </div>
    </div>
  );
}
