const SITEMAP = [
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
    items: [
      "코리아둘레길",
      "지역길 조사 및 계획",
      "걷기 문화 프로그램",
      "굿즈 개발 및 판매",
    ],
  },
  {
    title: "함께 걷는 사람들",
    items: ["한국걷는길연합", "ATN", "WTN", "코리아둘레길 완보자 클럽"],
  },
  {
    title: "알리는 이야기",
    items: ["공지사항", "소식받기", "문의하기"],
  },
  {
    title: "마음잇기",
    items: ["후원하기", "연간기금 및 활동 실적내역"],
  },
];

export default function Footer() {
  return (
    <footer className="relative bg-grayscale-100 px-6 py-12 md:px-[200px] md:py-[120px]">
      {/* Sitemap (desktop) */}
      <div className="hidden md:flex md:justify-end md:gap-[60px]">
        {SITEMAP.map((column) => (
          <div key={column.title} className="flex w-[110px] flex-col items-end gap-[20px]">
            <p className="font-pretendard text-right text-[16px] font-extrabold leading-[1.3] text-black tracking-[-0.32px] whitespace-nowrap">
              {column.title}
            </p>
            <div className="flex flex-col items-end gap-[12px]">
              {column.items.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="font-pretendard text-right text-[16px] font-normal leading-[1.4] text-[#737373] tracking-[-0.8px] whitespace-nowrap hover:text-primary"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Sitemap (mobile, accordion-like simple list) */}
      <div className="flex flex-col gap-6 md:hidden">
        {SITEMAP.map((column) => (
          <div key={column.title}>
            <p className="font-pretendard text-[15px] font-extrabold text-black mb-2">
              {column.title}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {column.items.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="font-pretendard text-[13px] text-[#737373]"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Brand mark + tagline (desktop) */}
      <div className="mt-16 hidden md:block">
        <p className="font-montserrat text-[14.447px] font-semibold text-primary">
          Korean Trails and Culture Foundation
        </p>
      </div>

      {/* Company info */}
      <div className="mt-8 flex flex-col gap-2 text-[#737373] md:mt-12">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-pretendard text-[12px] font-bold">
          <span>대표 : 홍성운</span>
          <span className="hidden h-3 w-px bg-[#737373] md:block" aria-hidden />
          <span>사업자등록번호 : 123-82-14123</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-pretendard text-[12px] font-bold">
          <span>주소 : 서울특별시 용산구 한강대로52길 25-8, DB Tower 402호</span>
          <span className="hidden h-3 w-px bg-[#737373] md:block" aria-hidden />
          <span>대표전화 : 02-6013-6610</span>
          <span>팩스 : 02-6937-0259</span>
          <span className="hidden h-3 w-px bg-[#737373] md:block" aria-hidden />
          <span>이메일 : ktnc@tnc.or.kr</span>
          <span className="hidden h-3 w-px bg-[#737373] md:block" aria-hidden />
          <span>개인정보보호책임자 : 최해선</span>
        </div>
        <p className="mt-4 font-pretendard text-[12px] font-bold">
          Copyrightⓒ Korea Trails and Culture Foundation , All Rights Reserved.
        </p>
      </div>

      {/* Social icons (top-right of footer area) */}
      <div className="absolute right-6 top-12 flex items-center gap-6 md:right-[200px] md:top-[120px] md:gap-[39px]">
        <a href="#" aria-label="Instagram" className="block size-7 md:size-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/figma/icon-instagram.svg"
            alt=""
            className="size-full [filter:brightness(0)]"
          />
        </a>
        <a href="#" aria-label="스토어" className="block size-7 md:size-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/figma/icon-store.svg"
            alt=""
            className="size-full [filter:brightness(0)]"
          />
        </a>
        <a href="#" aria-label="후원" className="block size-7 md:size-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/figma/icon-donate.svg"
            alt=""
            className="size-full [filter:brightness(0)]"
          />
        </a>
      </div>
    </footer>
  );
}
