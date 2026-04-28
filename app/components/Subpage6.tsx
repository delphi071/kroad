"use client";

import { useEffect, useState } from "react";
import Footer from "./Footer";
import { showToast } from "./Toast";

type TabId = "donate" | "reports";

const REPORTS = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  date: "2026.03",
  title: "코리아둘레길 지킴이 모집",
}));

/* Detail body (cloned from Hero5 notice detail, adjusted for 연간기금) */
const DETAIL_BODY_LINES = [
  "[2025년 연간기금 및 활동실적 내역]",
  "",
  "사단법인 한국의길과문화는 후원자 여러분의 따뜻한 마음을 모아 한 해 동안 다양한 활동을 펼쳤습니다.",
  "",
  "후원금은 걷기길 조성·유지보수, 걷기여행 교육·문화 프로그램 운영, 자원봉사 운영 등에 투명하게 사용되었습니다.",
  "자세한 내역은 첨부 자료를 통해 확인하실 수 있으며, 앞으로도 지속 가능한 길의 가치를 함께 만들어 가겠습니다.",
];

const DONATE_CIRCLES = [
  { img: "/figma/sub6-circle1.png", lines: ["걷기여행길 조성 및", "유지보수"] },
  { img: "/figma/sub6-circle2.png", lines: ["걷기여행길", "교육&문화 프로그램 운영"] },
  { img: "/figma/sub6-circle3.png", lines: ["자원봉사 운영 등"] },
];

const NAV_COLS = [
  { title: "우리의 길", items: ["설립목적", "비전 및 핵심가치", "주요 연혁", "사람들", "오시는 길"] },
  { title: "같은 길, 다른 시선", items: ["전문역량"] },
  { title: "우리가 걷는 길", items: ["코리아둘레길", "지역길 조사 및 계획", "걷기 문화 프로그램", "굿즈 개발 및 판매"] },
  { title: "함께 걷는 사람들", items: ["한국걷는길연합", "ATN", "WTN", "코리아둘레길\n완보자 클럽"] },
  { title: "알리는 이야기", items: ["공지사항", "소식받기", "문의하기"] },
  { title: "마음잇기", items: ["후원하기", "연간기금 및\n활동 실적내역"] },
];

const FOOTER_HEIGHT = 675;
const HERO_HEIGHT = 613;
const F = (figmaY: number) => figmaY - HERO_HEIGHT;

const PC_FRAME_HEIGHTS: Record<string, number> = {
  donate: 2600 - HERO_HEIGHT + FOOTER_HEIGHT,
  list: 2400 - HERO_HEIGHT + FOOTER_HEIGHT,
  detail: 3580 - HERO_HEIGHT + FOOTER_HEIGHT,
};

/* ---------- shared icons ---------- */
function ArrowLeft({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M15 6l-6 6 6 6" stroke="#9c9c9c" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CircleArrowLeft({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx={28} cy={28} r={27} stroke="#bdbdbd" />
      <path d="M32 18l-10 10 10 10" stroke="#9c9c9c" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CircleArrowRight({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx={28} cy={28} r={27} stroke="#bdbdbd" />
      <path d="M24 18l10 10-10 10" stroke="#9c9c9c" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CopyIcon({ size = 52 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x={9} y={9} width={11} height={11} rx={1.5} stroke="white" strokeWidth={1.5} />
      <path d="M16 9V5.5A1.5 1.5 0 0 0 14.5 4H5.5A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H9" stroke="white" strokeWidth={1.5} />
    </svg>
  );
}

/* ---------- Mobile footer ---------- */
function MobileFooter() {
  return (
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
  );
}

/* ---------- PC tabs (2 tabs) ---------- */
function PCTabs({ tab, onSelect }: { tab: TabId; onSelect: (t: TabId) => void }) {
  const items: { id: TabId; korean: string; english: string; left: number }[] = [
    { id: "donate", korean: "후원하기", english: "Donate", left: 198 },
    { id: "reports", korean: "연간기금 및 활동실적 내역", english: "Reports", left: 469 },
  ];
  return (
    <>
      {items.map((it) => {
        const active = it.id === tab;
        return active ? (
          <button
            key={it.id}
            type="button"
            onClick={() => onSelect(it.id)}
            className="absolute flex flex-col items-start gap-[12px] cursor-pointer text-grayscale-900 text-left"
            style={{ left: it.left, top: F(722), width: 700 }}
          >
            <p className="font-montserrat font-bold leading-none tracking-[-1.28px]" style={{ fontSize: 32 }}>{it.english}</p>
            <p className="font-pretendard font-bold leading-[1.3] tracking-[-1.56px] whitespace-nowrap" style={{ fontSize: 60 }}>{it.korean}</p>
          </button>
        ) : (
          <button
            key={it.id}
            type="button"
            onClick={() => onSelect(it.id)}
            className="absolute font-pretendard font-bold leading-[1.3] tracking-[-1.56px] whitespace-nowrap text-grayscale-200 cursor-pointer hover:text-grayscale-400"
            style={{ left: it.left, top: F(770.38), fontSize: 60 }}
          >
            {it.korean}
          </button>
        );
      })}
    </>
  );
}

/* ---------- Mobile tabs ---------- */
function MobileTabs({ tab, onSelect }: { tab: TabId; onSelect: (t: TabId) => void }) {
  const items: { id: TabId; korean: string; english: string }[] = [
    { id: "donate", korean: "후원하기", english: "Donate" },
    { id: "reports", korean: "연간기금 및 활동실적 내역", english: "Reports" },
  ];
  return (
    <div className="flex gap-[30px] items-end justify-center w-full">
      {items.map((it) => {
        const active = it.id === tab;
        return active ? (
          <button
            key={it.id}
            type="button"
            onClick={() => onSelect(it.id)}
            className="flex flex-col items-start gap-[6.893px] text-grayscale-900 cursor-pointer"
          >
            <p className="font-montserrat font-bold leading-none tracking-[-0.64px]" style={{ fontSize: 16 }}>{it.english}</p>
            <p className="font-pretendard font-bold leading-[1.5] tracking-[-0.96px] whitespace-nowrap" style={{ fontSize: 24 }}>{it.korean}</p>
          </button>
        ) : (
          <button
            key={it.id}
            type="button"
            onClick={() => onSelect(it.id)}
            className="font-pretendard font-bold leading-[1.5] tracking-[-0.96px] whitespace-nowrap text-grayscale-200 cursor-pointer hover:text-grayscale-400"
            style={{ fontSize: 24 }}
          >
            {it.korean}
          </button>
        );
      })}
    </div>
  );
}

/* =================================================================== */
/* PC DONATE                                                            */
/* =================================================================== */
function PCDonate() {
  const handleCopy = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("3010061804901");
      showToast("계좌번호가 복사되었습니다.");
    }
  };
  return (
    <>
      {/* Heading */}
      <p className="absolute font-pretendard font-bold leading-[1.1] text-grayscale-900 whitespace-nowrap" style={{ left: 198, top: F(955), fontSize: 100, letterSpacing: "-1px" }}>
        후원은 길이 다시 살고 빛나게 합니다.
      </p>
      {/* Subheader 1 */}
      <p className="absolute font-pretendard leading-[1.3] text-grayscale-900 whitespace-nowrap" style={{ left: 198, top: F(1131), fontSize: 36, letterSpacing: "-0.72px" }}>
        걷기 길의 지속가능한 발전을 지원해주세요.
      </p>
      {/* Subheader 2 */}
      <p className="absolute font-pretendard font-bold leading-[1.3] text-grayscale-900 whitespace-nowrap" style={{ left: 198, top: F(1178), fontSize: 36, letterSpacing: "-0.72px" }}>
        모아주신 후원금은 걷기 길의 지속가능한 발전을 위한 다양한 활동에 사용됩니다.
      </p>
      {/* Bank info card */}
      <div className="absolute flex flex-col gap-[46px] items-start justify-center py-[40px]" style={{ left: 200, top: F(1460), width: 1520 }}>
        <div className="flex flex-col gap-[8px] items-start">
          <div className="flex gap-[42px] items-center">
            <p className="font-pretendard font-bold leading-[1.2] text-grayscale-900 tracking-[-1.3px] whitespace-nowrap" style={{ fontSize: 50 }}>농협 301-0061-8049-01</p>
            <button
              type="button"
              onClick={handleCopy}
              className="bg-primary flex items-center justify-center p-[16px] cursor-pointer hover:opacity-90 transition-opacity"
              style={{ borderTopLeftRadius: 20, borderBottomRightRadius: 20 }}
              aria-label="계좌번호 복사"
            >
              <span className="block size-[52px]"><CopyIcon size={52} /></span>
            </button>
          </div>
          <p className="font-pretendard leading-[1.1] text-grayscale-900 tracking-[-0.36px] whitespace-nowrap" style={{ fontSize: 36, fontWeight: 800 }}>사단법인 한국의길과문화</p>
        </div>
        <p className="font-pretendard leading-[1.3] text-primary tracking-[-0.72px]" style={{ fontSize: 36, width: 394 }}>
          일시후원/정기후원 모두 가능
        </p>
      </div>
      {/* 후원금 사용처 heading */}
      <p className="absolute font-pretendard leading-[1.1] text-grayscale-900 whitespace-nowrap" style={{ left: 198, top: F(1989), fontSize: 36, fontWeight: 800, letterSpacing: "-0.36px" }}>
        후원금 사용처
      </p>
      {/* 3 circles */}
      <div className="absolute flex gap-[50px] items-center" style={{ left: 200, top: F(2102), width: 1520 }}>
        {DONATE_CIRCLES.map((c, idx) => (
          <div key={idx} className="aspect-[1/1] flex-1 min-w-px overflow-clip relative rounded-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.img} alt="" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-black/40 rounded-full" />
            <div className="absolute left-1/2 -translate-x-1/2 font-pretendard text-white text-center tracking-[-0.36px] whitespace-nowrap" style={{ top: "calc(50% - 39.67px)", fontSize: 36, fontWeight: 800, lineHeight: 1.1 }}>
              {c.lines.map((line, i) => (
                <p key={i} className="leading-[1.1]" style={{ marginBottom: 0 }}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* =================================================================== */
/* PC REPORTS LIST                                                      */
/* =================================================================== */
function PCReportsList({ onSelect }: { onSelect: (id: number) => void }) {
  return (
    <>
      <div className="absolute flex flex-col items-start whitespace-nowrap" style={{ left: 198, top: F(954), width: 1520 }}>
        {REPORTS.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => onSelect(r.id)}
            className="flex gap-[57px] items-center px-[50px] w-full border-t border-solid border-grayscale-400 text-left cursor-pointer hover:bg-primary transition-colors"
            style={{ height: 121 }}
          >
            <p className="font-montserrat font-bold leading-none text-grayscale-600 shrink-0" style={{ fontSize: 20 }}>{r.date}</p>
            <p className="font-pretendard font-bold leading-[1.3] text-grayscale-900 tracking-[-0.72px]" style={{ fontSize: 36 }}>{r.title}</p>
          </button>
        ))}
      </div>
      {/* Pagination */}
      <div className="absolute flex gap-[51px] items-center" style={{ left: 685, top: F(2259) }}>
        <button type="button" aria-label="이전" className="size-[56px] cursor-pointer">
          <CircleArrowLeft size={56} />
        </button>
        <div className="flex gap-[28px] items-center">
          {[1, 2, 3, 4, 5].map((p, i) => (
            <button
              key={p}
              type="button"
              className={`flex items-center justify-center p-[10px] cursor-pointer font-montserrat font-medium leading-none whitespace-nowrap ${i === 0 ? "text-grayscale-900" : "text-grayscale-400"}`}
              style={{ fontSize: 20 }}
            >
              {String(p).padStart(2, "0")}
            </button>
          ))}
        </div>
        <button type="button" aria-label="다음" className="size-[56px] cursor-pointer">
          <CircleArrowRight size={56} />
        </button>
      </div>
    </>
  );
}

/* =================================================================== */
/* PC REPORT DETAIL (cloned from Hero5 notice detail pattern)           */
/* =================================================================== */
function PCReportDetail({ reportId, onBack }: { reportId: number; onBack: () => void }) {
  const r = REPORTS.find((x) => x.id === reportId) ?? REPORTS[0];
  return (
    <>
      <button
        type="button"
        onClick={onBack}
        className="absolute flex gap-[14px] items-center justify-center py-[10px] cursor-pointer"
        style={{ left: 190, top: F(716) }}
      >
        <span className="block size-[24px]"><ArrowLeft size={24} /></span>
        <span className="font-pretendard leading-[1.3] text-[#9c9c9c] tracking-[-0.24px] whitespace-nowrap" style={{ fontSize: 24 }}>목록</span>
      </button>
      <div
        className="absolute border-b border-solid border-grayscale-400 flex items-center justify-between whitespace-nowrap"
        style={{ left: 195, top: F(763), width: 1520, height: 121 }}
      >
        <p className="font-pretendard font-bold leading-[1.3] text-grayscale-900 tracking-[-1.56px]" style={{ fontSize: 60 }}>{r.title}</p>
        <p className="font-montserrat font-bold leading-none text-grayscale-600" style={{ fontSize: 20 }}>{r.date}</p>
      </div>
      <div
        className="absolute border-b border-solid border-grayscale-400 flex flex-col gap-[57px] items-start justify-center"
        style={{ left: 200, top: F(949), width: 1520, padding: 50 }}
      >
        <div className="font-pretendard leading-[0] text-grayscale-900 whitespace-pre-wrap" style={{ fontSize: 24, letterSpacing: "-0.24px" }}>
          {DETAIL_BODY_LINES.map((line, i) => (
            <p key={i} className="leading-[1.3]" style={{ marginBottom: 0 }}>{line || "\u00A0"}</p>
          ))}
        </div>
        <div className="relative w-full" style={{ aspectRatio: "2480 / 3508" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/figma/sub5-notice-detail.png" alt="연간기금 및 활동실적 내역 첨부 자료" className="absolute inset-0 size-full object-cover" />
        </div>
      </div>
      <div className="absolute flex gap-[12px] items-center justify-end" style={{ left: 250, top: F(3376), width: 1420 }}>
        <button type="button" aria-label="이전 글" className="size-[56px] cursor-pointer">
          <CircleArrowLeft size={56} />
        </button>
        <button type="button" aria-label="다음 글" className="size-[56px] cursor-pointer">
          <CircleArrowRight size={56} />
        </button>
      </div>
    </>
  );
}

/* =================================================================== */
/* MOBILE DONATE                                                        */
/* =================================================================== */
function MobileDonate() {
  const handleCopy = () => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("3010061804901");
      showToast("계좌번호가 복사되었습니다.");
    }
  };
  return (
    <div className="flex flex-col gap-[100px] items-center justify-center w-full">
      <div className="font-pretendard font-bold leading-[1.2] text-grayscale-900 text-center w-full" style={{ fontSize: 50, letterSpacing: "-1.3px" }}>
        <p className="leading-[1.2]">후원은 길이</p>
        <p className="leading-[1.2]">다시 살고 빛나게 합니다.</p>
      </div>
      <div className="flex flex-col gap-[14px] items-start font-pretendard text-grayscale-900 text-center w-full" style={{ fontSize: 24, letterSpacing: "-0.24px" }}>
        <div className="w-full">
          <p className="leading-[1.3]">걷기 길의 지속가능한</p>
          <p className="leading-[1.3]">발전을 지원해주세요.</p>
        </div>
        <div className="w-full">
          <p className="leading-[1.3]">모아주신 후원금은</p>
          <p className="leading-[1.3]">걷기 길의 지속가능한 발전을 위한</p>
          <p className="leading-[1.3]">다양한 활동에 사용됩니다.</p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex flex-col gap-[8px] items-center">
          <div className="flex gap-[14px] items-center">
            <p className="font-pretendard font-bold leading-[1.5] text-grayscale-900 tracking-[-0.96px] whitespace-nowrap" style={{ fontSize: 24 }}>농협 301-0061-8049-01</p>
            <button
              type="button"
              onClick={handleCopy}
              className="bg-primary flex items-center justify-center p-[6.095px] cursor-pointer hover:opacity-90 transition-opacity"
              style={{ borderTopLeftRadius: 7.619, borderBottomRightRadius: 7.619 }}
              aria-label="계좌번호 복사"
            >
              <span className="block size-[19.81px]"><CopyIcon size={19.81} /></span>
            </button>
          </div>
          <p className="font-pretendard leading-[1.3] text-grayscale-900 tracking-[-0.24px] whitespace-nowrap" style={{ fontSize: 24 }}>사단법인 한국의길과문화</p>
        </div>
        <div className="flex items-center justify-center">
          <p className="font-pretendard leading-[1.5] text-primary tracking-[-0.8px] whitespace-nowrap" style={{ fontSize: 16 }}>일시후원/정기후원 모두 가능</p>
        </div>
      </div>
      <div className="flex flex-col gap-[50px] items-center w-full">
        <p className="font-pretendard font-bold leading-[1.5] text-grayscale-900 tracking-[-0.8px] whitespace-nowrap" style={{ fontSize: 16 }}>후원금 사용처</p>
        <div className="flex flex-col gap-[50px] items-start justify-center w-full">
          {DONATE_CIRCLES.map((c, idx) => (
            <div key={idx} className="aspect-[1/1] overflow-clip relative rounded-full w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.img} alt="" className="absolute inset-0 size-full object-cover" />
              <div className="absolute inset-0 bg-black/40 rounded-full" />
              <div className="absolute left-1/2 -translate-x-1/2 font-pretendard font-bold text-white text-center tracking-[-0.96px] whitespace-nowrap" style={{ top: "calc(50% - 36px)", fontSize: 24, lineHeight: 1.5 }}>
                {c.lines.map((line, i) => (
                  <p key={i} className="leading-[1.5]" style={{ marginBottom: 0 }}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =================================================================== */
/* MOBILE REPORTS LIST                                                  */
/* =================================================================== */
function MobileReportsList({ onSelect }: { onSelect: (id: number) => void }) {
  return (
    <div className="flex flex-col gap-[36px] items-center w-full">
      <div className="flex flex-col items-start font-pretendard font-bold w-screen -mx-[20px]">
        {REPORTS.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => onSelect(r.id)}
            className="border-t border-solid border-grayscale-400 flex gap-[30px] items-center px-[20px] py-[24px] w-full text-left cursor-pointer active:bg-primary transition-colors"
          >
            <p className="leading-none text-grayscale-600 shrink-0" style={{ fontSize: 12, fontWeight: 700 }}>{r.date}</p>
            <p className="leading-[1.5] text-grayscale-900 tracking-[-0.8px]" style={{ fontSize: 16, fontWeight: 700 }}>{r.title}</p>
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between w-full">
        <button type="button" aria-label="이전" className="size-[32px] cursor-pointer">
          <CircleArrowLeft size={32} />
        </button>
        <div className="flex gap-[12px] items-center">
          {[1, 2, 3, 4, 5].map((p, i) => (
            <button
              key={p}
              type="button"
              className={`flex items-center justify-center p-[10px] cursor-pointer font-montserrat font-bold leading-none whitespace-nowrap ${i === 0 ? "text-grayscale-900" : "text-grayscale-400"}`}
              style={{ fontSize: 14 }}
            >
              {String(p).padStart(2, "0")}
            </button>
          ))}
        </div>
        <button type="button" aria-label="다음" className="size-[32px] cursor-pointer">
          <CircleArrowRight size={32} />
        </button>
      </div>
    </div>
  );
}

/* =================================================================== */
/* MOBILE REPORT DETAIL                                                 */
/* =================================================================== */
function MobileReportDetail({ reportId, onBack }: { reportId: number; onBack: () => void }) {
  const r = REPORTS.find((x) => x.id === reportId) ?? REPORTS[0];
  return (
    <div className="flex flex-col items-start pb-[39px] pt-[15px] w-screen -mx-[20px]">
      <button
        type="button"
        onClick={onBack}
        className="flex gap-[14px] items-center justify-center px-[20px] py-[10px] cursor-pointer"
      >
        <span className="block size-[24px]"><ArrowLeft size={24} /></span>
        <span className="font-pretendard font-bold leading-[1.5] text-[#9c9c9c] tracking-[-0.8px]" style={{ fontSize: 16 }}>목록</span>
      </button>
      <div className="border-b border-solid border-grayscale-400 flex items-center py-[24px] w-full">
        <div className="flex flex-1 flex-col gap-[12px] items-start min-w-px px-[20px] whitespace-nowrap">
          <p className="font-pretendard font-bold leading-[1.3] text-grayscale-900 tracking-[-0.8961px]" style={{ fontSize: 34.465 }}>{r.title}</p>
          <p className="font-montserrat font-bold leading-none text-grayscale-600 tracking-[-0.56px]" style={{ fontSize: 14 }}>{r.date}</p>
        </div>
      </div>
      <div className="border-b border-solid border-grayscale-400 flex flex-col gap-[57px] items-start justify-center px-[20px] py-[50px] w-full">
        <div className="font-pretendard leading-[0] text-grayscale-900 w-full whitespace-pre-wrap" style={{ fontSize: 16, letterSpacing: "-0.8px" }}>
          {DETAIL_BODY_LINES.map((line, i) => (
            <p key={i} className="leading-[1.4]" style={{ marginBottom: 0 }}>{line || "\u00A0"}</p>
          ))}
        </div>
        <div className="relative w-full" style={{ aspectRatio: "2480 / 3508" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/figma/sub5-notice-detail.png" alt="연간기금 및 활동실적 내역 첨부 자료" className="absolute inset-0 size-full object-cover" />
        </div>
      </div>
      <div className="flex gap-[12px] items-center justify-end px-[20px] py-[15px] w-full">
        <button type="button" aria-label="이전 글" className="size-[32px] cursor-pointer">
          <CircleArrowLeft size={32} />
        </button>
        <button type="button" aria-label="다음 글" className="size-[32px] cursor-pointer">
          <CircleArrowRight size={32} />
        </button>
      </div>
    </div>
  );
}

/* =================================================================== */
/* MAIN                                                                  */
/* =================================================================== */
export default function Subpage6() {
  const [tab, setTab] = useState<TabId>("donate");
  const [reportId, setReportId] = useState<number | null>(null);

  // Reset detail view when hero is expanded back (X button)
  useEffect(() => {
    const handler = () => setReportId(null);
    window.addEventListener("hero-expanded", handler);
    return () => window.removeEventListener("hero-expanded", handler);
  }, []);

  const view: "donate" | "list" | "detail" =
    tab === "donate" ? "donate" : reportId !== null ? "detail" : "list";

  const pcHeight = PC_FRAME_HEIGHTS[view];

  const handleTabSelect = (next: TabId) => {
    setReportId(null);
    setTab(next);
  };

  return (
    <div className="bg-grayscale-100">
      {/* ============================== MOBILE ============================== */}
      <div className="lg:hidden bg-grayscale-100 flex flex-col items-center gap-[63px] px-[20px] py-[84px]">
        {view !== "detail" && (
          <div className="flex flex-col gap-[36px] items-center w-full">
            <MobileTabs tab={tab} onSelect={handleTabSelect} />
            {tab === "donate" && <MobileDonate />}
            {tab === "reports" && view === "list" && (
              <MobileReportsList onSelect={(id) => setReportId(id)} />
            )}
          </div>
        )}
        {view === "detail" && reportId !== null && (
          <MobileReportDetail reportId={reportId} onBack={() => setReportId(null)} />
        )}
      </div>
      <MobileFooter />

      {/* ============================== DESKTOP ============================== */}
      <div
        className="hidden lg:block relative w-full overflow-hidden bg-grayscale-100"
        style={{ height: `calc(100vw * ${pcHeight} / 1920)` }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{ width: 1920, height: pcHeight, transform: "scale(calc(100vw / 1920px))" }}
        >
          {view !== "detail" && <PCTabs tab={tab} onSelect={handleTabSelect} />}

          {view === "donate" && <PCDonate />}
          {view === "list" && <PCReportsList onSelect={(id) => setReportId(id)} />}
          {view === "detail" && reportId !== null && (
            <PCReportDetail reportId={reportId} onBack={() => setReportId(null)} />
          )}

          {/* Footer */}
          <div className="absolute" style={{ left: 0, top: pcHeight - FOOTER_HEIGHT, width: 1920 }}>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
