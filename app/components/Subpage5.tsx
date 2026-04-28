"use client";

import { useEffect, useState } from "react";
import Footer from "./Footer";
import { showToast } from "./Toast";
import { getMainHref, getSubHref } from "./navLinks";

type TabId = "notices" | "news" | "contact";

const NOTICES = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  date: "2026.03",
  title: "코리아둘레길 지킴이 모집",
}));

const SAMPLE_BODY_LINES = [
  "[2026 코리아둘레길 지킴이 모집 안내]",
  "",
  "안녕하세요. 한국관광공사에서는 2026년 코리아둘레길의 안전과 편의를 위해 활동해주실 '코리아둘레길 지킴이'를 모집합니다.",
  "",
  "접수 및 자세한 내용은 두루누비 공지사항을 확인해주세요.",
  "우리 국토 외곽을 잇는 국내 최장 거리 걷기여행길 '코리아둘레길' 관리에 함께해 주실 분들의 관심과 참여를 기다립니다.",
];

const NEWS_CARDS = [
  {
    title: "둘레길지킴이",
    img: "/figma/sub5-news-img1.png",
    body: [
      "유니크 로컬 체험 ‘길문화학교’, 청소년 멘토링 걷기여행 ‘청소년여행문화학교’ 등 걷기여행을 운영하고",
      "있습니다. 개인은 물론 단체/기업 참여가 가능합니다.",
    ],
  },
  {
    title: "자원봉사",
    img: "/figma/sub5-news-img2.png",
    body: [
      "걷기길 관리/운영 봉사활동을 하고 있습니다.",
      "제초, 정비, 플로깅(환경보호) 등 우리의 길을 지키기",
      "위한 다양한 활동을 비정기적 운영하고 있습니다.",
    ],
  },
  {
    title: "걷기문화 프로그램",
    img: "/figma/sub5-news-img3.png",
    body: [
      "매년 모집/선발된 둘레길 지킴이 선생님들이",
      "편안하고 안전한 둘레길 여행을 위해",
      "각 지역/구간을 정기적 관리하고 있습니다.",
    ],
  },
];

const INTEREST_OPTIONS = ["둘레길지킴이", "자원봉사", "걷기문화 프로그램"];

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

/* PC frame heights per view (figma frame end → +footer) */
const PC_FRAME_HEIGHTS: Record<string, number> = {
  list: 2900 - HERO_HEIGHT + FOOTER_HEIGHT,
  detail: 3580 - HERO_HEIGHT + FOOTER_HEIGHT,
  news: 3060 - HERO_HEIGHT + FOOTER_HEIGHT,
  contact: 2320 - HERO_HEIGHT + FOOTER_HEIGHT,
};

/* ---------- shared icons ---------- */
function ArrowLeft({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M15 6l-6 6 6 6" stroke="#9c9c9c" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ArrowRight({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M9 6l6 6-6 6" stroke="#9c9c9c" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
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
function Checkbox({ checked, size = 24 }: { checked: boolean; size?: number }) {
  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${checked ? "bg-primary" : "border border-grayscale-400"}`}
      style={{ width: size, height: size, borderRadius: 2 }}
      aria-hidden
    >
      {checked && (
        <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 6.5l2.5 2.5L10 3.5" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
  );
}

/* ---------- Mobile footer (matches Subpage4 mobile footer) ---------- */
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
          {NAV_COLS.slice(0, 3).map((col, colIdx) => (
            <div key={col.title} className="flex flex-col items-center gap-[10px] w-[100px]">
              <a href={getMainHref(colIdx)} className="font-pretendard text-grayscale-900 text-[12px] font-bold leading-none text-center whitespace-nowrap hover:text-primary">{col.title}</a>
              <div className="flex flex-col items-center gap-[6px]">
                {col.items.map((item, itemIdx) => (
                  <a key={item} href={getSubHref(colIdx, itemIdx)} className="font-pretendard text-grayscale-600 text-[12px] leading-[1.5] tracking-[-0.6px] text-center hover:text-primary" style={{ whiteSpace: "pre-line" }}>{item}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-start justify-between w-full">
          {NAV_COLS.slice(3, 6).map((col, colIdx) => (
            <div key={col.title} className="flex flex-col items-center gap-[10px] w-[100px]">
              <a href={getMainHref(colIdx + 3)} className="font-pretendard text-grayscale-900 text-[12px] font-bold leading-none text-center whitespace-nowrap hover:text-primary">{col.title}</a>
              <div className="flex flex-col items-center gap-[6px]">
                {col.items.map((item, itemIdx) => (
                  <a key={item} href={getSubHref(colIdx + 3, itemIdx)} className="font-pretendard text-grayscale-600 text-[12px] leading-[1.5] tracking-[-0.6px] text-center hover:text-primary" style={{ whiteSpace: "pre-line" }}>{item}</a>
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
          <a href="https://www.instagram.com/koreatnc1" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="block size-[32px]">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/figma/footer-icon-instagram.svg" alt="" className="size-full" /></a>
          <a href="https://smartstore.naver.com/koreatnc" target="_blank" rel="noopener noreferrer" aria-label="스토어" className="block size-[32px]">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/figma/footer-icon-store.svg" alt="" className="size-full" /></a>
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

/* ---------- PC tab cluster (3 tabs at fixed positions) ---------- */
function PCTabs({ tab, onSelect }: { tab: TabId; onSelect: (t: TabId) => void }) {
  const items: { id: TabId; korean: string; english: string; left: number }[] = [
    { id: "notices", korean: "공지사항", english: "Notice", left: 200 },
    { id: "news", korean: "소식받기", english: "News", left: 463 },
    { id: "contact", korean: "문의하기", english: "Contact Us", left: 726 },
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
            style={{ left: it.left, top: F(1155), width: 220 }}
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
            style={{ left: it.left, top: F(1199), fontSize: 60 }}
          >
            {it.korean}
          </button>
        );
      })}
    </>
  );
}

/* ---------- PC Header "알리고 나누어 / 길을 더 풍성하게 합니다." ---------- */
function PCHeader() {
  return (
    <div className="absolute" style={{ left: 200, top: F(773), width: 1327 }}>
      <p className="font-pretendard leading-[1.1] text-grayscale-900" style={{ fontSize: 100, letterSpacing: "-1px" }}>알리고 나누어</p>
      <p className="font-pretendard leading-[1.1] text-grayscale-900 font-bold" style={{ fontSize: 100, letterSpacing: "-1px" }}>길을 더 풍성하게 합니다.</p>
    </div>
  );
}

/* ---------- mobile header ---------- */
function MobileHeader() {
  return (
    <div className="font-pretendard text-grayscale-900 w-full" style={{ letterSpacing: "-0.96px" }}>
      <p className="leading-[1.5]" style={{ fontSize: 24 }}>알리고 나누어</p>
      <p className="leading-[1.5] font-bold" style={{ fontSize: 24 }}>길을 더 풍성하게 합니다.</p>
    </div>
  );
}

/* ---------- mobile tabs ---------- */
function MobileTabs({ tab, onSelect }: { tab: TabId; onSelect: (t: TabId) => void }) {
  const items: { id: TabId; korean: string; english: string }[] = [
    { id: "notices", korean: "공지사항", english: "Notice" },
    { id: "news", korean: "소식받기", english: "News" },
    { id: "contact", korean: "문의하기", english: "Contact Us" },
  ];
  return (
    <div className="flex gap-[30px] items-end w-full">
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
/* PC NOTICE LIST                                                       */
/* =================================================================== */
function PCNoticeList({ onSelect }: { onSelect: (id: number) => void }) {
  return (
    <>
      {/* List rows */}
      <div className="absolute flex flex-col items-start whitespace-nowrap" style={{ left: 200, top: F(1387), width: 1520 }}>
        {NOTICES.map((n) => (
          <button
            key={n.id}
            type="button"
            onClick={() => onSelect(n.id)}
            className="flex gap-[57px] items-center px-[50px] w-full border-t border-solid border-grayscale-400 text-left cursor-pointer hover:bg-primary transition-colors"
            style={{ height: 121 }}
          >
            <p className="font-montserrat font-bold leading-none text-grayscale-600 shrink-0" style={{ fontSize: 20 }}>{n.date}</p>
            <p className="font-pretendard font-bold leading-[1.3] text-grayscale-900 tracking-[-0.72px]" style={{ fontSize: 36 }}>{n.title}</p>
          </button>
        ))}
      </div>
      {/* Pagination */}
      <div className="absolute flex gap-[51px] items-center" style={{ left: 685, top: F(2692) }}>
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
/* PC NOTICE DETAIL                                                     */
/* =================================================================== */
function PCNoticeDetail({ noticeId, onBack }: { noticeId: number; onBack: () => void }) {
  const n = NOTICES.find((x) => x.id === noticeId) ?? NOTICES[0];
  return (
    <>
      {/* 목록 button */}
      <button
        type="button"
        onClick={onBack}
        className="absolute flex gap-[14px] items-center justify-center py-[10px] cursor-pointer"
        style={{ left: 190, top: F(716) }}
      >
        <span className="block size-[24px]"><ArrowLeft size={24} /></span>
        <span className="font-pretendard leading-[1.3] text-[#9c9c9c] tracking-[-0.24px] whitespace-nowrap" style={{ fontSize: 24 }}>목록</span>
      </button>
      {/* Title row */}
      <div
        className="absolute border-b border-solid border-grayscale-400 flex items-center justify-between whitespace-nowrap"
        style={{ left: 195, top: F(763), width: 1520, height: 121 }}
      >
        <p className="font-pretendard font-bold leading-[1.3] text-grayscale-900 tracking-[-1.56px]" style={{ fontSize: 60 }}>{n.title}</p>
        <p className="font-montserrat font-bold leading-none text-grayscale-600" style={{ fontSize: 20 }}>{n.date}</p>
      </div>
      {/* Content card */}
      <div
        className="absolute border-b border-solid border-grayscale-400 flex flex-col gap-[57px] items-start justify-center"
        style={{ left: 200, top: F(949), width: 1520, padding: 50 }}
      >
        <div className="font-pretendard leading-[0] text-grayscale-900 whitespace-pre-wrap" style={{ fontSize: 24, letterSpacing: "-0.24px" }}>
          {SAMPLE_BODY_LINES.map((line, i) => (
            <p key={i} className="leading-[1.3]" style={{ marginBottom: 0 }}>{line || "\u00A0"}</p>
          ))}
        </div>
        <div className="relative w-full" style={{ aspectRatio: "2480 / 3508" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/figma/sub5-notice-detail.png" alt="코리아둘레길 지킴이 모집 안내 포스터" className="absolute inset-0 size-full object-cover" />
        </div>
      </div>
      {/* Prev/next */}
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
/* PC NEWS (소식받기)                                                    */
/* =================================================================== */
function PCNews({
  form,
  setForm,
  interests,
  toggleInterest,
  agree,
  setAgree,
  onSubmit,
}: {
  form: { name: string; phone: string; email: string };
  setForm: React.Dispatch<React.SetStateAction<{ name: string; phone: string; email: string }>>;
  interests: Set<string>;
  toggleInterest: (k: string) => void;
  agree: boolean;
  setAgree: (b: boolean) => void;
  onSubmit: () => void;
}) {
  return (
    <div
      className="absolute flex flex-col gap-[120px] items-center justify-center"
      style={{ left: 207, top: F(1387), width: 1534 }}
    >
      {/* 3 cards */}
      <div className="flex gap-[40px] items-center w-full">
        {NEWS_CARDS.map((c) => (
          <div key={c.title} className="flex flex-1 flex-col gap-[60px] items-end justify-center">
            <div className="h-[400px] w-full relative overflow-hidden">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={c.img} alt={c.title} className="absolute inset-0 size-full object-cover" /></div>
            <div className="flex flex-col gap-[16px] items-center justify-center w-full">
              <p className="font-pretendard leading-[1.1] text-grayscale-900 tracking-[-0.36px] w-full" style={{ fontSize: 36, fontWeight: 800 }}>{c.title}</p>
              <div className="font-pretendard leading-[0] text-grayscale-600 w-full" style={{ fontSize: 24, letterSpacing: "-0.24px" }}>
                {c.body.map((line, i) => (
                  <p key={i} className="leading-[1.3]" style={{ marginBottom: 0 }}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="flex flex-col gap-[60px] items-start justify-center w-full">
        {/* Name */}
        <div className="flex flex-col gap-[30px] items-start w-full">
          <p className="font-pretendard leading-[1.3] text-grayscale-900 tracking-[-0.24px] whitespace-nowrap" style={{ fontSize: 24 }}>소식 받는 분 성함</p>
          <div className="flex flex-col gap-[25px] items-start w-full">
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="소식 받는 분 성함을 입력 해주세요."
              className="font-pretendard leading-[1.3] text-grayscale-900 tracking-[-0.24px] w-full bg-transparent outline-none placeholder:text-[#bdbdbd]"
              style={{ fontSize: 24 }}
            />
            <div className="h-px w-full bg-grayscale-900" />
          </div>
        </div>
        {/* Phone */}
        <div className="flex flex-col gap-[30px] items-start w-full">
          <p className="font-pretendard leading-[1.3] text-grayscale-900 tracking-[-0.24px] whitespace-nowrap" style={{ fontSize: 24 }}>소식 받는 분 연락처</p>
          <div className="flex flex-col gap-[25px] items-start w-full">
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              placeholder="소식 받는 분 연락처를 입력 해주세요."
              className="font-pretendard leading-[1.3] text-grayscale-900 tracking-[-0.24px] w-full bg-transparent outline-none placeholder:text-[#bdbdbd]"
              style={{ fontSize: 24 }}
            />
            <div className="h-px w-full bg-grayscale-900" />
          </div>
        </div>
        {/* Email */}
        <div className="flex flex-col gap-[30px] items-start w-full">
          <p className="font-pretendard leading-[1.3] text-grayscale-900 tracking-[-0.24px] whitespace-nowrap" style={{ fontSize: 24 }}>소식 받을 이메일</p>
          <div className="flex flex-col gap-[25px] items-start w-full">
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="소식 받을 이메일을 입력 해주세요."
              className="font-pretendard leading-[1.3] text-grayscale-900 tracking-[-0.24px] w-full bg-transparent outline-none placeholder:text-[#bdbdbd]"
              style={{ fontSize: 24 }}
            />
            <div className="h-px w-full bg-grayscale-900" />
          </div>
        </div>
        {/* Interests */}
        <div className="flex flex-col gap-[40px] items-start w-full">
          <p className="font-pretendard leading-[1.3] text-grayscale-900 tracking-[-0.24px] w-full" style={{ fontSize: 24 }}>관심분야</p>
          <div className="flex gap-[80px] items-start">
            {INTEREST_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => toggleInterest(opt)}
                className="flex gap-[10px] items-center justify-center cursor-pointer"
              >
                <Checkbox checked={interests.has(opt)} size={24} />
                <span className="font-pretendard leading-[1.3] text-grayscale-900 tracking-[-0.24px] whitespace-nowrap" style={{ fontSize: 24 }}>{opt}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Agree + submit */}
      <div className="flex gap-[60px] items-center justify-end w-full">
        <button
          type="button"
          onClick={() => setAgree(!agree)}
          className="flex gap-[10px] items-center cursor-pointer"
        >
          <Checkbox checked={agree} size={24} />
          <span className="font-pretendard leading-[1.3] text-grayscale-900 tracking-[-0.24px] whitespace-nowrap" style={{ fontSize: 24 }}>개인정보 수집 및 활용에 동의합니다.</span>
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="bg-primary flex items-center justify-center p-[16px] cursor-pointer hover:opacity-90 transition-opacity"
          style={{ borderTopLeftRadius: 20, borderBottomRightRadius: 20, width: 224 }}
        >
          <span className="font-pretendard font-bold leading-[1.5] text-grayscale-900 tracking-[-0.96px] whitespace-nowrap" style={{ fontSize: 24 }}>신청</span>
        </button>
      </div>
    </div>
  );
}

/* =================================================================== */
/* PC CONTACT (문의하기)                                                 */
/* =================================================================== */
function PCContact({
  form,
  setForm,
  onSubmit,
}: {
  form: { name: string; email: string; message: string };
  setForm: React.Dispatch<React.SetStateAction<{ name: string; email: string; message: string }>>;
  onSubmit: () => void;
}) {
  return (
    <div className="absolute flex gap-[60px] items-start" style={{ left: 200, top: F(1387), width: 1534 }}>
      <div className="font-pretendard leading-[0] text-grayscale-900 whitespace-nowrap shrink-0" style={{ fontSize: 36, letterSpacing: "-0.72px" }}>
        <p className="leading-[1.3]">궁금하신 사항을 남겨주세요.</p>
        <p className="leading-[1.3]">빠른 시간 안에 답변 드리겠습니다.</p>
      </div>
      <div className="flex flex-1 flex-col gap-[60px] items-end min-w-px">
        <div className="flex flex-col gap-[60px] items-start justify-center w-full">
          <div className="flex gap-[60px] items-start w-full">
            <div className="flex flex-1 flex-col gap-[30px] items-start min-w-px">
              <p className="font-pretendard leading-[1.3] text-grayscale-900 tracking-[-0.24px] whitespace-nowrap" style={{ fontSize: 24 }}>문의하시는 분 성함</p>
              <div className="flex flex-col gap-[25px] items-start w-full">
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="성함을 입력해주세요."
                  className="font-pretendard leading-[1.3] text-grayscale-900 tracking-[-0.24px] w-full bg-transparent outline-none placeholder:text-[#bdbdbd]"
                  style={{ fontSize: 24 }}
                />
                <div className="h-px w-full bg-grayscale-900" />
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-[30px] items-start min-w-px">
              <p className="font-pretendard leading-[1.3] text-grayscale-900 tracking-[-0.24px] whitespace-nowrap" style={{ fontSize: 24 }}>답변 받을 이메일</p>
              <div className="flex flex-col gap-[25px] items-start w-full">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="이메일을 입력해주세요."
                  className="font-pretendard leading-[1.3] text-grayscale-900 tracking-[-0.24px] w-full bg-transparent outline-none placeholder:text-[#bdbdbd]"
                  style={{ fontSize: 24 }}
                />
                <div className="h-px w-full bg-grayscale-900" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[30px] items-start w-full">
            <p className="font-pretendard leading-[1.3] text-grayscale-900 tracking-[-0.24px] whitespace-nowrap" style={{ fontSize: 24 }}>문의하실 내용</p>
            <div className="flex flex-col gap-[140px] items-start w-full">
              <textarea
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="문의내용을 입력해주세요."
                rows={4}
                className="font-pretendard leading-[1.3] text-grayscale-900 tracking-[-0.24px] w-full bg-transparent outline-none placeholder:text-[#bdbdbd] resize-none"
                style={{ fontSize: 24, minHeight: 24 * 1.3 }}
              />
              <div className="h-px w-full bg-grayscale-900" />
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={onSubmit}
          className="bg-primary flex items-center justify-center p-[16px] cursor-pointer hover:opacity-90 transition-opacity"
          style={{ borderTopLeftRadius: 20, borderBottomRightRadius: 20, width: 224 }}
        >
          <span className="font-pretendard font-bold leading-[1.5] text-grayscale-900 tracking-[-0.96px] whitespace-nowrap" style={{ fontSize: 24 }}>보내기</span>
        </button>
      </div>
    </div>
  );
}

/* =================================================================== */
/* MOBILE NOTICE LIST                                                   */
/* =================================================================== */
function MobileNoticeList({ onSelect }: { onSelect: (id: number) => void }) {
  return (
    <div className="flex flex-col gap-[36px] items-center w-full">
      <div className="flex flex-col items-start font-pretendard font-bold w-screen -mx-[20px]">
        {NOTICES.map((n) => (
          <button
            key={n.id}
            type="button"
            onClick={() => onSelect(n.id)}
            className="border-t border-solid border-grayscale-400 flex gap-[30px] items-center px-[20px] py-[24px] w-full text-left cursor-pointer active:bg-primary transition-colors"
          >
            <p className="leading-none text-grayscale-600 shrink-0" style={{ fontSize: 12, fontWeight: 700 }}>{n.date}</p>
            <p className="leading-[1.5] text-grayscale-900 tracking-[-0.8px]" style={{ fontSize: 16, fontWeight: 700 }}>{n.title}</p>
          </button>
        ))}
      </div>
      {/* Pagination */}
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
/* MOBILE NOTICE DETAIL                                                 */
/* =================================================================== */
function MobileNoticeDetail({ noticeId, onBack }: { noticeId: number; onBack: () => void }) {
  const n = NOTICES.find((x) => x.id === noticeId) ?? NOTICES[0];
  return (
    <div className="flex flex-col items-start pb-[39px] pt-[15px] w-screen -mx-[20px]">
      {/* 목록 */}
      <button
        type="button"
        onClick={onBack}
        className="flex gap-[14px] items-center justify-center px-[20px] py-[10px] cursor-pointer"
      >
        <span className="block size-[24px]"><ArrowLeft size={24} /></span>
        <span className="font-pretendard font-bold leading-[1.5] text-[#9c9c9c] tracking-[-0.8px]" style={{ fontSize: 16 }}>목록</span>
      </button>
      {/* Title row */}
      <div className="border-b border-solid border-grayscale-400 flex items-center py-[24px] w-full">
        <div className="flex flex-1 flex-col gap-[12px] items-start min-w-px px-[20px] whitespace-nowrap">
          <p className="font-pretendard font-bold leading-[1.3] text-grayscale-900 tracking-[-0.8961px]" style={{ fontSize: 34.465 }}>{n.title}</p>
          <p className="font-montserrat font-bold leading-none text-grayscale-600 tracking-[-0.56px]" style={{ fontSize: 14 }}>{n.date}</p>
        </div>
      </div>
      {/* Content */}
      <div className="border-b border-solid border-grayscale-400 flex flex-col gap-[57px] items-start justify-center px-[20px] py-[50px] w-full">
        <div className="font-pretendard leading-[0] text-grayscale-900 w-full whitespace-pre-wrap" style={{ fontSize: 16, letterSpacing: "-0.8px" }}>
          {SAMPLE_BODY_LINES.map((line, i) => (
            <p key={i} className="leading-[1.4]" style={{ marginBottom: 0 }}>{line || "\u00A0"}</p>
          ))}
        </div>
        <div className="relative w-full" style={{ aspectRatio: "2480 / 3508" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/figma/sub5-notice-detail.png" alt="코리아둘레길 지킴이 모집 안내 포스터" className="absolute inset-0 size-full object-cover" />
        </div>
      </div>
      {/* Prev/next */}
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
/* MOBILE NEWS (소식받기)                                                 */
/* =================================================================== */
function MobileNews({
  form,
  setForm,
  interests,
  toggleInterest,
  agree,
  setAgree,
  onSubmit,
}: {
  form: { name: string; phone: string; email: string };
  setForm: React.Dispatch<React.SetStateAction<{ name: string; phone: string; email: string }>>;
  interests: Set<string>;
  toggleInterest: (k: string) => void;
  agree: boolean;
  setAgree: (b: boolean) => void;
  onSubmit: () => void;
}) {
  return (
    <div className="flex flex-col gap-[46px] items-start w-full">
      <div className="flex flex-col gap-[32px] items-start w-full">
        {/* Name */}
        <div className="flex flex-col gap-[20px] items-start w-full">
          <p className="font-pretendard leading-[1.5] text-grayscale-900 tracking-[-0.8px] whitespace-nowrap" style={{ fontSize: 16 }}>소식받는 분 성함</p>
          <div className="flex flex-col gap-[16px] items-start w-full">
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="성함을 입력해주세요."
              className="font-pretendard leading-[1.4] text-grayscale-900 tracking-[-0.8px] w-full bg-transparent outline-none placeholder:text-[#bdbdbd]"
              style={{ fontSize: 16 }}
            />
            <div className="h-px w-full bg-grayscale-900" />
          </div>
        </div>
        {/* Phone */}
        <div className="flex flex-col gap-[20px] items-start w-full">
          <p className="font-pretendard leading-[1.5] text-grayscale-900 tracking-[-0.8px] whitespace-nowrap" style={{ fontSize: 16 }}>소식 받는 분 연락처</p>
          <div className="flex flex-col gap-[16px] items-start w-full">
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              placeholder="연락처를 입력해주세요."
              className="font-pretendard leading-[1.4] text-grayscale-900 tracking-[-0.8px] w-full bg-transparent outline-none placeholder:text-[#bdbdbd]"
              style={{ fontSize: 16 }}
            />
            <div className="h-px w-full bg-grayscale-900" />
          </div>
        </div>
        {/* Email */}
        <div className="flex flex-col gap-[20px] items-start w-full">
          <p className="font-pretendard leading-[1.5] text-grayscale-900 tracking-[-0.8px] whitespace-nowrap" style={{ fontSize: 16 }}>소식 받을 이메일</p>
          <div className="flex flex-col gap-[16px] items-start w-full">
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="이메일을 입력해주세요."
              className="font-pretendard leading-[1.4] text-grayscale-900 tracking-[-0.8px] w-full bg-transparent outline-none placeholder:text-[#bdbdbd]"
              style={{ fontSize: 16 }}
            />
            <div className="h-px w-full bg-grayscale-900" />
          </div>
        </div>
        {/* Interests */}
        <div className="flex flex-col gap-[30px] items-start w-full">
          <p className="font-pretendard leading-[1.4] text-grayscale-900 tracking-[-0.8px] w-full" style={{ fontSize: 16 }}>관심분야</p>
          <div className="flex flex-col gap-[14px] items-start">
            {INTEREST_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => toggleInterest(opt)}
                className="flex gap-[10px] items-center justify-center cursor-pointer"
              >
                <Checkbox checked={interests.has(opt)} size={24} />
                <span className="font-pretendard leading-[1.4] text-grayscale-900 tracking-[-0.8px] whitespace-nowrap" style={{ fontSize: 16 }}>{opt}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Agree + submit */}
      <div className="flex flex-col gap-[24px] items-end justify-center w-full">
        <button
          type="button"
          onClick={() => setAgree(!agree)}
          className="flex gap-[10px] items-center w-full cursor-pointer"
        >
          <Checkbox checked={agree} size={24} />
          <span className="font-pretendard leading-[1.5] text-grayscale-900 tracking-[-0.8px] whitespace-nowrap" style={{ fontSize: 16 }}>개인정보 수집 및 활용에 동의합니다.</span>
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="bg-primary flex items-center justify-center p-[16px] w-full cursor-pointer hover:opacity-90 transition-opacity"
          style={{ borderTopLeftRadius: 20, borderBottomRightRadius: 20 }}
        >
          <span className="font-pretendard font-bold leading-[1.5] text-grayscale-900 tracking-[-0.8px] whitespace-nowrap" style={{ fontSize: 16 }}>신청</span>
        </button>
      </div>
      {/* 3 cards */}
      <div className="flex flex-col gap-[40px] items-start justify-center w-full">
        {NEWS_CARDS.map((c) => (
          <div key={c.title} className="flex flex-col gap-[60px] items-end justify-center w-full">
            <div className="h-[400px] w-full relative overflow-hidden">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={c.img} alt={c.title} className="absolute inset-0 size-full object-cover" /></div>
            <div className="flex flex-col gap-[16px] items-center justify-center w-full">
              <p className="font-pretendard leading-[1.1] text-grayscale-900 tracking-[-0.36px] w-full" style={{ fontSize: 36, fontWeight: 800 }}>{c.title}</p>
              <div className="font-pretendard leading-[0] text-grayscale-600 w-full" style={{ fontSize: 16, letterSpacing: "-0.8px" }}>
                {c.body.map((line, i) => (
                  <p key={i} className="leading-[1.4]" style={{ marginBottom: 0 }}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =================================================================== */
/* MOBILE CONTACT (문의하기)                                              */
/* =================================================================== */
function MobileContact({
  form,
  setForm,
  onSubmit,
}: {
  form: { name: string; email: string; message: string };
  setForm: React.Dispatch<React.SetStateAction<{ name: string; email: string; message: string }>>;
  onSubmit: () => void;
}) {
  return (
    <div className="flex flex-col gap-[60px] items-start w-full">
      <div className="font-pretendard leading-[0] text-grayscale-900 whitespace-nowrap" style={{ fontSize: 24, letterSpacing: "-0.24px" }}>
        <p className="leading-[1.3]">궁금하신 사항을 남겨주세요.</p>
        <p className="leading-[1.3]">빠른 시간 안에 답변 드리겠습니다.</p>
      </div>
      <div className="flex flex-col gap-[70px] items-end w-full">
        <div className="flex flex-col gap-[60px] items-start justify-center w-full">
          <div className="flex flex-col gap-[60px] items-start w-full">
            {/* Name */}
            <div className="flex flex-col gap-[20px] items-start w-full">
              <p className="font-pretendard leading-[1.5] text-grayscale-900 tracking-[-0.8px] whitespace-nowrap" style={{ fontSize: 16 }}>문의하시는 분 성함</p>
              <div className="flex flex-col gap-[16px] items-start w-full">
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="성함을 입력해주세요."
                  className="font-pretendard leading-[1.4] text-grayscale-900 tracking-[-0.8px] w-full bg-transparent outline-none placeholder:text-[#bdbdbd]"
                  style={{ fontSize: 16 }}
                />
                <div className="h-px w-full bg-grayscale-900" />
              </div>
            </div>
            {/* Email */}
            <div className="flex flex-col gap-[20px] items-start w-full">
              <p className="font-pretendard leading-[1.5] text-grayscale-900 tracking-[-0.8px] whitespace-nowrap" style={{ fontSize: 16 }}>답변 받을 이메일</p>
              <div className="flex flex-col gap-[16px] items-start w-full">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="이메일을 입력해주세요."
                  className="font-pretendard leading-[1.4] text-grayscale-900 tracking-[-0.8px] w-full bg-transparent outline-none placeholder:text-[#bdbdbd]"
                  style={{ fontSize: 16 }}
                />
                <div className="h-px w-full bg-grayscale-900" />
              </div>
            </div>
          </div>
          {/* Message */}
          <div className="flex flex-col gap-[20px] items-start w-full">
            <p className="font-pretendard leading-[1.5] text-grayscale-900 tracking-[-0.8px] whitespace-nowrap" style={{ fontSize: 16 }}>문의하실 내용</p>
            <div className="flex flex-col gap-[140px] items-start w-full">
              <textarea
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="문의내용을 입력해주세요."
                rows={3}
                className="font-pretendard leading-[1.4] text-grayscale-900 tracking-[-0.8px] w-full bg-transparent outline-none placeholder:text-[#bdbdbd] resize-none"
                style={{ fontSize: 16 }}
              />
              <div className="h-px w-full bg-grayscale-900" />
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={onSubmit}
          className="bg-primary flex items-center justify-center p-[16px] w-full cursor-pointer hover:opacity-90 transition-opacity"
          style={{ borderTopLeftRadius: 20, borderBottomRightRadius: 20 }}
        >
          <span className="font-pretendard font-bold leading-[1.5] text-grayscale-900 tracking-[-0.8px] whitespace-nowrap" style={{ fontSize: 16 }}>보내기</span>
        </button>
      </div>
    </div>
  );
}

/* =================================================================== */
/* MAIN                                                                  */
/* =================================================================== */
export default function Subpage5() {
  const [tab, setTab] = useState<TabId>("notices");
  const [noticeId, setNoticeId] = useState<number | null>(null);
  const [newsForm, setNewsForm] = useState({ name: "", phone: "", email: "" });
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [interests, setInterests] = useState<Set<string>>(new Set(["둘레길지킴이"]));
  const [agree, setAgree] = useState(false);

  // Reset notice detail view when hero is expanded back (X button on collapsed hero)
  useEffect(() => {
    const handler = () => setNoticeId(null);
    window.addEventListener("hero-expanded", handler);
    return () => window.removeEventListener("hero-expanded", handler);
  }, []);

  // React to nav links like #h5-news / #h5-contact / #h5-notices
  useEffect(() => {
    const handler = (e: Event) => {
      const subKey = (e as CustomEvent<{ subKey?: string }>).detail?.subKey;
      if (subKey === "notices" || subKey === "news" || subKey === "contact") {
        setNoticeId(null);
        setTab(subKey);
      }
    };
    window.addEventListener("nav-h5", handler);
    return () => window.removeEventListener("nav-h5", handler);
  }, []);

  const view: "list" | "detail" | "news" | "contact" =
    tab === "notices" ? (noticeId !== null ? "detail" : "list")
      : tab === "news" ? "news" : "contact";

  const pcHeight = PC_FRAME_HEIGHTS[view];

  const toggleInterest = (k: string) => {
    setInterests((prev) => {
      const next = new Set(prev);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  };

  const handleTabSelect = (next: TabId) => {
    setNoticeId(null);
    setTab(next);
  };

  const handleNewsSubmit = () => {
    if (!newsForm.name.trim()) {
      showToast("성함을 입력해주세요.");
      return;
    }
    if (!newsForm.phone.trim()) {
      showToast("연락처를 입력해주세요.");
      return;
    }
    if (!newsForm.email.trim()) {
      showToast("이메일을 입력해주세요.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsForm.email)) {
      showToast("올바른 이메일 형식을 입력해주세요.");
      return;
    }
    if (interests.size === 0) {
      showToast("관심분야를 1개 이상 선택해주세요.");
      return;
    }
    if (!agree) {
      showToast("개인정보 수집 및 활용에 동의해주세요.");
      return;
    }
    showToast("신청이 완료 되었습니다.");
    setNewsForm({ name: "", phone: "", email: "" });
    setInterests(new Set());
    setAgree(false);
  };

  const handleContactSubmit = () => {
    if (!contactForm.name.trim()) {
      showToast("성함을 입력해주세요.");
      return;
    }
    if (!contactForm.email.trim()) {
      showToast("이메일을 입력해주세요.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)) {
      showToast("올바른 이메일 형식을 입력해주세요.");
      return;
    }
    if (!contactForm.message.trim()) {
      showToast("문의내용을 입력해주세요.");
      return;
    }
    showToast("정상적으로 접수 되었습니다.");
    setContactForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-grayscale-100">
      {/* ============================== MOBILE ============================== */}
      <div className="lg:hidden bg-grayscale-100 flex flex-col items-center gap-[63px] px-[20px] py-[84px]">
        {view !== "detail" && <MobileHeader />}
        {view !== "detail" && (
          <div className="flex flex-col gap-[36px] items-start w-full">
            <MobileTabs tab={tab} onSelect={handleTabSelect} />
            {tab === "notices" && (
              <MobileNoticeList onSelect={(id) => setNoticeId(id)} />
            )}
            {tab === "news" && (
              <MobileNews
                form={newsForm}
                setForm={setNewsForm}
                interests={interests}
                toggleInterest={toggleInterest}
                agree={agree}
                setAgree={setAgree}
                onSubmit={handleNewsSubmit}
              />
            )}
            {tab === "contact" && (
              <MobileContact form={contactForm} setForm={setContactForm} onSubmit={handleContactSubmit} />
            )}
          </div>
        )}
        {view === "detail" && noticeId !== null && (
          <MobileNoticeDetail noticeId={noticeId} onBack={() => setNoticeId(null)} />
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
          {view !== "detail" && <PCHeader />}
          {view !== "detail" && <PCTabs tab={tab} onSelect={handleTabSelect} />}

          {view === "list" && (
            <PCNoticeList onSelect={(id) => setNoticeId(id)} />
          )}
          {view === "detail" && noticeId !== null && (
            <PCNoticeDetail noticeId={noticeId} onBack={() => setNoticeId(null)} />
          )}
          {view === "news" && (
            <PCNews
              form={newsForm}
              setForm={setNewsForm}
              interests={interests}
              toggleInterest={toggleInterest}
              agree={agree}
              setAgree={setAgree}
              onSubmit={handleNewsSubmit}
            />
          )}
          {view === "contact" && (
            <PCContact form={contactForm} setForm={setContactForm} onSubmit={handleContactSubmit} />
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
