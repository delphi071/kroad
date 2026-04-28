"use client";

import Footer from "./Footer";
import { getMainHref, getSubHref } from "./navLinks";
import { useLang } from "../i18n/LanguageContext";

/* Figma slide 2 PC base: hero is top 0-613, content extends to footer at top:8780.
   Subpage2 = the part below the hero, scaled in a 1920-wide frame.
   SUBPAGE_HEIGHT includes the footer (675px tall) so it doesn't get clipped. */
const F2 = (figmaY: number) => figmaY - 613;
const FOOTER_HEIGHT = 675;
const SUBPAGE_HEIGHT = 8780 - 613 + FOOTER_HEIGHT; // 8842

const SECTION_IMAGES: { leftImg: string; rightImg: string; centerImg?: string }[] = [
  { leftImg: "/figma/sub2-img-gyeonggi.png", rightImg: "/figma/sub2-img-294.png" },
  { leftImg: "/figma/sub2-img-youth.png", rightImg: "/figma/sub2-img-294.png", centerImg: "/figma/sub2-img-namparang46.png" },
  { leftImg: "/figma/sub2-img-namparang22.png", rightImg: "/figma/sub2-img-namparang44.png" },
];

export default function Subpage2() {
  const { t, lang } = useLang();
  const SECTIONS = SECTION_IMAGES.map((img, i) => ({ ...t.subpage2.sections[i], ...img }));
  return (
    <div className="bg-grayscale-100">
      {/* ============================== MOBILE — Figma 525:24297 ============================== */}
      <div className="lg:hidden bg-grayscale-100 flex flex-col items-center gap-[83px] px-[20px] py-[64px]">
        {/* "What Sets Us Apart" header */}
        <p className="font-montserrat text-grayscale-400 text-[14px] font-bold tracking-[-0.56px] leading-none whitespace-nowrap">
          {t.subpage2.headerTagline}
        </p>

        {/* 24px subtitle */}
        <div className="font-pretendard text-grayscale-900 text-[24px] tracking-[-0.24px] leading-[1.3] text-center">
          {t.subpage2.subTitle.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        {/* 50px Big heading — Regular block + Bold block */}
        <div className={`flex flex-col items-center gap-[24px] text-center font-pretendard text-grayscale-900 tracking-[-1.3px] ${lang === "en" ? "" : "whitespace-nowrap"}`}>
          <div>
            {t.subpage2.bigHeadingRegular.map((line, i) => (
              <p key={i} className={`${lang === "en" ? "text-[36px]" : "text-[50px]"} leading-[1.2]`}>{line}</p>
            ))}
          </div>
          <div>
            {t.subpage2.bigHeadingBold.map((line, i) => (
              <p key={i} className={`${lang === "en" ? "text-[36px]" : "text-[50px]"} font-bold leading-[1.2]`}>{line}</p>
            ))}
          </div>
        </div>

        {/* Vector8 area — long curve on left with intro text + tagline overlaid */}
        <div className="relative w-full" style={{ height: 1070 }}>
          {/* Vector8 mobile SVG — left:-50, w:225, h:882 (with -1.81% top inset) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/figma/sub2-vector8-mobile.svg"
            alt=""
            aria-hidden
            className="pointer-events-none absolute"
            style={{ left: -50, top: -16, width: 241, height: 898 }}
          />
          {/* Intro text @ top:422, left:28, w:295, 16px Regular center */}
          <div className="absolute" style={{ left: 28, top: 422, width: 295 }}>
            <div className="font-pretendard text-grayscale-900 text-[16px] tracking-[-0.8px] leading-[1.4] text-center">
              {t.subpage2.introBody.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
          {/* Tagline @ top:920, left:28, w:295, 24px Bold center */}
          <div className="absolute" style={{ left: 28, top: 920, width: 295 }}>
            <div className="font-pretendard text-grayscale-900 text-[24px] font-bold tracking-[-0.96px] leading-[1.5] text-center">
              {t.subpage2.tagline.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        </div>

        {/* Vector9 — vertical decoration line h:399 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/figma/sub2-vector9-mobile.svg"
          alt=""
          aria-hidden
          className="block"
          style={{ height: 399, width: 32 }}
        />

        {/* SECTION 01 */}
        <div className="relative" style={{ width: 250, height: 365 }}>
          <p className="absolute left-1/2 -translate-x-1/2 font-montserrat text-grayscale-200 text-[160px] font-semibold leading-[1.3] tracking-[-4.16px] whitespace-nowrap text-center" style={{ top: 0 }}>{SECTIONS[0].num}</p>
          <p className={`absolute left-1/2 -translate-x-1/2 font-pretendard text-grayscale-200 ${lang === "en" ? "text-[60px]" : "text-[100px]"} font-bold leading-[1.3] tracking-[-2.6px] whitespace-nowrap text-center`} style={{ top: 161 }}>{SECTIONS[0].label}</p>
        </div>
        <div className={`flex flex-col items-center gap-[46px] font-pretendard ${lang === "en" ? "" : "whitespace-nowrap"}`}>
          <div className="flex flex-col items-center gap-[18px]">
            <p className="text-primary text-[24px] font-bold tracking-[-0.96px] leading-[1.5]">{SECTIONS[0].enHook}</p>
            <p className={`text-grayscale-900 ${lang === "en" ? "text-[36px]" : "text-[50px]"} font-bold tracking-[-1.3px] leading-[1.2] text-center`}>{SECTIONS[0].title}</p>
          </div>
          <div className="text-grayscale-900 text-[24px] tracking-[-0.96px] leading-[1.5] text-center">
            {SECTIONS[0].bigText.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
        {/* Section 01 image+text block (350×615) */}
        <div className="relative" style={{ width: 350, height: 615 }}>
          <div className="absolute font-pretendard text-grayscale-700 text-[16px] tracking-[-0.8px] leading-[1.4]" style={{ left: 0, top: 0, width: 350 }}>
            {SECTIONS[0].rightDesc.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <div className="bg-grayscale-900 absolute overflow-hidden" style={{ right: 0, top: 114, width: 219, height: 160 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/sub2-img-gyeonggi.png" alt="" className="block h-full w-full object-cover" />
          </div>
          <div className="absolute font-pretendard text-grayscale-700 text-[16px] tracking-[-0.8px] leading-[1.4]" style={{ left: 0, top: 414, width: 350 }}>
            {SECTIONS[0].leftDesc.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <div className="bg-grayscale-900 absolute overflow-hidden" style={{ left: 0, top: 506, width: 287, height: 109 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/sub2-img-294.png" alt="" className="block h-full w-full object-cover" />
          </div>
        </div>

        {/* SECTION 02 */}
        <div className="relative" style={{ width: 250, height: 365 }}>
          <p className="absolute left-1/2 -translate-x-1/2 font-montserrat text-grayscale-200 text-[160px] font-semibold leading-[1.3] tracking-[-4.16px] whitespace-nowrap text-center" style={{ top: 0 }}>{SECTIONS[1].num}</p>
          <p className={`absolute left-1/2 -translate-x-1/2 font-pretendard text-grayscale-200 ${lang === "en" ? "text-[60px]" : "text-[100px]"} font-bold leading-[1.3] tracking-[-2.6px] whitespace-nowrap text-center`} style={{ top: 161 }}>{SECTIONS[1].label}</p>
        </div>
        <div className={`flex flex-col items-center gap-[46px] font-pretendard ${lang === "en" ? "" : "whitespace-nowrap"}`}>
          <div className="flex flex-col items-center gap-[18px]">
            <p className="text-primary text-[24px] font-bold tracking-[-0.96px] leading-[1.5]">{SECTIONS[1].enHook}</p>
            <p className={`text-grayscale-900 ${lang === "en" ? "text-[36px]" : "text-[50px]"} font-bold tracking-[-1.3px] leading-[1.2] text-center`}>{SECTIONS[1].title}</p>
          </div>
          <div className="text-grayscale-900 text-[24px] tracking-[-0.96px] leading-[1.5] text-center">
            {SECTIONS[1].bigText.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
        {/* Section 02 image+text block (350×726) */}
        <div className="relative" style={{ width: 350, height: 726 }}>
          <div className={`absolute font-pretendard text-grayscale-700 ${lang === "en" ? "text-[13px]" : "text-[16px]"} tracking-[-0.8px] leading-[1.4]`} style={{ left: 0, top: 0, width: lang === "en" ? 200 : 350 }}>
            {SECTIONS[1].rightDesc.map((line, i) => (
              <p key={i}>{line || "\u00A0"}</p>
            ))}
          </div>
          <div className="bg-grayscale-900 absolute overflow-hidden" style={{ right: 0, top: 71, width: 140, height: 201 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/sub2-img-namparang46.png" alt="" className="block h-full w-full object-cover" style={{ objectPosition: "15% center" }} />
          </div>
          <div className="bg-grayscale-900 absolute overflow-hidden" style={{ left: 0, top: 217, width: 173, height: 108 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/sub2-img-youth.png" alt="" className="block h-full w-full object-cover" />
          </div>
          <div className={`absolute font-pretendard text-grayscale-700 ${lang === "en" ? "text-[13px]" : "text-[16px]"} tracking-[-0.8px] leading-[1.4] ${lang === "en" ? "" : "whitespace-nowrap"}`} style={{ left: 69, top: lang === "en" ? 350 : 380, maxWidth: lang === "en" ? 281 : "none" }}>
            {SECTIONS[1].leftDesc.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <div className="bg-grayscale-900 absolute overflow-hidden" style={{ left: 0, top: 476, width: 294, height: 166 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/sub2-img-frame.png" alt="" className="block h-full w-full object-cover" />
          </div>
          <div className="absolute font-pretendard text-grayscale-700 text-[16px] tracking-[-0.8px] leading-[1.4]" style={{ left: 0, top: 660, width: 350 }}>
            {SECTIONS[1].extraDesc.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>

        {/* SECTION 03 */}
        <div className="relative" style={{ width: 250, height: 365 }}>
          <p className="absolute left-1/2 -translate-x-1/2 font-montserrat text-grayscale-200 text-[160px] font-semibold leading-[1.3] tracking-[-4.16px] whitespace-nowrap text-center" style={{ top: 0 }}>{SECTIONS[2].num}</p>
          <p className={`absolute left-1/2 -translate-x-1/2 font-pretendard text-grayscale-200 ${lang === "en" ? "text-[60px]" : "text-[100px]"} font-bold leading-[1.3] tracking-[-2.6px] whitespace-nowrap text-center`} style={{ top: 161 }}>{SECTIONS[2].label}</p>
        </div>
        <div className={`flex flex-col items-center gap-[46px] font-pretendard ${lang === "en" ? "" : "whitespace-nowrap"}`}>
          <div className="flex flex-col items-center gap-[18px]">
            <p className="text-primary text-[24px] font-bold tracking-[-0.96px] leading-[1.5]">{SECTIONS[2].enHook}</p>
            <p className={`text-grayscale-900 ${lang === "en" ? "text-[36px]" : "text-[50px]"} font-bold tracking-[-1.3px] leading-[1.2] text-center`}>{SECTIONS[2].title}</p>
          </div>
          <div className="text-grayscale-900 text-[24px] tracking-[-0.96px] leading-[1.5] text-center">
            {SECTIONS[2].bigText.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
        {/* Section 03 image+text block (350×726) */}
        <div className="relative" style={{ width: 350, height: 726 }}>
          <div className="absolute font-pretendard text-grayscale-700 text-[16px] tracking-[-0.8px] leading-[1.4]" style={{ left: 0, top: 0, width: 350 }}>
            {SECTIONS[2].rightDesc.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <div className="bg-grayscale-900 absolute overflow-hidden" style={{ right: 0, top: 71, width: 241, height: 144 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/sub2-img-namparang44.png" alt="" className="block h-full w-full object-cover" />
          </div>
          <div className={`absolute font-pretendard text-grayscale-700 text-[16px] tracking-[-0.8px] leading-[1.4] ${lang === "en" ? "" : "whitespace-nowrap"}`} style={{ left: 69, top: 258, maxWidth: lang === "en" ? 281 : "none" }}>
            {SECTIONS[2].extraDesc.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
          <div className="bg-grayscale-900 absolute overflow-hidden" style={{ left: 0, top: 413, width: 220, height: 220 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/sub2-img-namparang22.png" alt="" className="block h-full w-full object-cover" />
          </div>
          <div className="absolute font-pretendard text-grayscale-700 text-[16px] tracking-[-0.8px] leading-[1.4]" style={{ left: 0, top: 660, width: 350 }}>
            {SECTIONS[2].leftDesc.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>

      </div>

      {/* ===========================================================================
          MOBILE FOOTER — Same structure as Subpage1 mobile footer (Figma 320:2748)
          =========================================================================== */}
      <div className="lg:hidden bg-grayscale-100 flex flex-col items-center gap-[40px] px-[20px] pt-[140px] pb-[64px]">
        {/* Beyond logo with Korean Trails subtitle inside logo bounds */}
        <div className="flex flex-col items-center gap-[8px]">
          <div className="relative" style={{ width: 281, height: 215 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/figma/footer-union.svg"
              alt="Beyond the Route"
              className="absolute block"
              style={{ left: 0, top: 0, width: "100%", height: "100%" }}
            />
          </div>
          <p
            className="font-montserrat text-primary font-semibold leading-none whitespace-nowrap"
            style={{ fontSize: 10 }}
          >
            Korean Trails and Culture Foundation
          </p>
        </div>

        {/* Nav columns — 2 rows × 3 cols */}
        <div className="flex flex-col gap-[24px] w-full">
          <div className="flex items-start justify-between w-full">
            {[
              { title: "우리의 길", items: ["설립목적", "비전 및 핵심가치", "주요 연혁", "사람들", "오시는 길"] },
              { title: "같은 길, 다른 시선", items: ["전문역량"] },
              { title: "우리가 걷는 길", items: ["코리아둘레길", "지역길 조사 및 계획", "걷기 문화 프로그램", "굿즈 개발 및 판매"] },
            ].map((col, colIdx) => {
              const dictCol = t.footer.cols[colIdx];
              return (
              <div key={col.title} className="flex flex-col items-center gap-[10px] w-[100px]">
                <a href={getMainHref(colIdx)} className="font-pretendard text-grayscale-900 text-[12px] font-bold leading-none text-center hover:text-primary" style={{ whiteSpace: "pre-line" }}>
                  {dictCol.title || col.title}
                </a>
                <div className="flex flex-col items-center gap-[6px]">
                  {col.items.map((item, itemIdx) => (
                    <a
                      key={item}
                      href={getSubHref(colIdx, itemIdx)}
                      className="font-pretendard text-grayscale-600 text-[12px] leading-[1.5] tracking-[-0.6px] text-center hover:text-primary"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {dictCol.items[itemIdx] || item}
                    </a>
                  ))}
                </div>
              </div>
              );
            })}
          </div>
          <div className="flex items-start justify-between w-full">
            {[
              { title: "함께 걷는 사람들", items: ["한국걷는길연합", "ATN", "WTN", "코리아둘레길\n완보자 클럽"] },
              { title: "알리는 이야기", items: ["공지사항", "소식받기", "문의하기"] },
              { title: "마음잇기", items: ["후원하기", "연간기금 및\n활동 실적내역"] },
            ].map((col, colIdx) => {
              const dictCol = t.footer.cols[colIdx + 3];
              return (
              <div key={col.title} className="flex flex-col items-center gap-[10px] w-[100px]">
                <a href={getMainHref(colIdx + 3)} className="font-pretendard text-grayscale-900 text-[12px] font-bold leading-none text-center hover:text-primary" style={{ whiteSpace: "pre-line" }}>
                  {dictCol.title || col.title}
                </a>
                <div className="flex flex-col items-center gap-[6px]">
                  {col.items.map((item, itemIdx) => (
                    <a
                      key={item}
                      href={getSubHref(colIdx + 3, itemIdx)}
                      className="font-pretendard text-grayscale-600 text-[12px] leading-[1.5] tracking-[-0.6px] text-center hover:text-primary"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {dictCol.items[itemIdx] || item}
                    </a>
                  ))}
                </div>
              </div>
              );
            })}
          </div>
        </div>

        {/* Calligraphy + social icons */}
        <div className="flex items-center justify-between w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/figma/footer-group32.svg" alt="사단법인 한국의길과문화" className="block shrink-0" style={{ width: 134, height: 56 }} />
          <div className="flex items-center gap-[24px] shrink-0">
            <a href="https://www.instagram.com/koreatnc1" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="block size-[32px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/footer-icon-instagram.svg" alt="" className="size-full" />
            </a>
            <a href="https://smartstore.naver.com/koreatnc" target="_blank" rel="noopener noreferrer" aria-label="스토어" className="block size-[32px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/footer-icon-store.svg" alt="" className="size-full" />
            </a>
          </div>
        </div>

        {/* Cert buttons */}
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

        {/* Company info */}
        <div className="flex flex-col items-center gap-[6px] text-center">
          <p className="font-pretendard text-grayscale-600 text-[10px] font-bold leading-none">
            대표 : 홍성운 · 사업자등록번호 : 123-82-14123
          </p>
          <p className="font-pretendard text-grayscale-600 text-[10px] font-bold leading-[1.5]">
            서울특별시 용산구 한강대로52길 25-8, DB Tower 402호
          </p>
          <p className="font-pretendard text-grayscale-600 text-[10px] font-bold leading-none">
            대표전화 : 02-6013-6610 · 팩스 : 02-6937-0259
          </p>
          <p className="font-pretendard text-grayscale-600 text-[10px] font-bold leading-none">
            이메일 : ktnc@tnc.or.kr
          </p>
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
          {/* Vector 8 top decorative curve */}
          <div
            className="absolute"
            style={{ left: 0, top: F2(1297), width: 1590, height: 1401 }}
            aria-hidden
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/sub2-vector8.svg" alt="" className="block h-full w-full" />
          </div>

          {/* Vector 51 — long S-curve through 3 sections */}
          <div
            className="absolute"
            style={{ left: 544, top: F2(2949), width: 1002, height: 6144 }}
            aria-hidden
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/sub2-vector51.svg" alt="" className="block h-full w-full" />
          </div>

          {/* Header section: "What Sets Us Apart" + intro + big heading — all left-aligned */}
          <div
            className="absolute flex flex-col items-start gap-[42px]"
            style={{ left: 200, top: F2(784), width: 1246 }}
          >
            <p className="font-montserrat text-grayscale-400 text-[32px] font-bold leading-none tracking-[-1.28px]">
              {t.subpage2.headerTagline}
            </p>
            <p className={`font-pretendard text-grayscale-900 text-[36px] tracking-[-0.72px] leading-[1.3] ${lang === "en" ? "" : "whitespace-nowrap"}`}>
              {t.subpage2.subTitle.join(lang === "en" ? " " : " ")}
            </p>
            <div className={`font-pretendard text-grayscale-900 ${lang === "en" ? "text-[80px]" : "text-[100px]"} font-regular tracking-[-1px] leading-[1.1]`}>
              {t.subpage2.bigHeadingRegular.map((line, i) => (
                <p key={`r${i}`}>{line}</p>
              ))}
              {t.subpage2.bigHeadingBold.map((line, i) => (
                <p key={`b${i}`} className="font-bold">{line}</p>
              ))}
            </div>
          </div>

          {/* Right intro text */}
          <div
            className={`absolute font-pretendard text-grayscale-900 text-[36px] tracking-[-0.72px] leading-[1.3] text-right ${lang === "en" ? "" : "whitespace-nowrap"}`}
            style={{ left: 1610, top: F2(1723), transform: "translateX(-100%)", width: lang === "en" ? 1410 : "auto" }}
          >
            {lang === "en" ? (
              <p>{t.subpage2.introBody.join(" ")}</p>
            ) : (
              t.subpage2.introBody.map((line, i) => (
                <p key={i}>{line}</p>
              ))
            )}
          </div>

          {/* Tagline */}
          <div
            className={`absolute font-pretendard text-grayscale-900 ${lang === "en" ? "text-[44px]" : "text-[60px]"} font-bold tracking-[-1.56px] leading-[1.3] ${lang === "en" ? "" : "whitespace-nowrap"}`}
            style={{ left: "calc(50% - 437px)", top: F2(2742) }}
          >
            {t.subpage2.tagline.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          {/* SECTION 01 */}
          <p
            className="absolute font-montserrat text-grayscale-200 text-[220px] font-semibold leading-[1.3] tracking-[22px] whitespace-nowrap text-right"
            style={{ left: 455, top: F2(3610), transform: "translateX(-100%)" }}
          >
            {SECTIONS[0].num}
          </p>
          <p
            className={`absolute font-pretendard text-grayscale-200 ${lang === "en" ? "text-[64px]" : "text-[150px]"} font-bold leading-[1.3] tracking-[-3.9px] whitespace-nowrap text-right`}
            style={{ left: 456, top: F2(3832), transform: "translateX(-100%)" }}
          >
            {SECTIONS[0].label}
          </p>
          <p
            className="absolute font-pretendard text-primary text-[60px] font-bold leading-[1.3] tracking-[-1.56px] whitespace-nowrap"
            style={{ left: "calc(50% - 333px)", top: F2(3666) }}
          >
            {SECTIONS[0].enHook}
          </p>
          <p
            className={`absolute z-10 font-pretendard text-grayscale-900 ${lang === "en" ? "text-[72px]" : "text-[100px]"} font-bold leading-[1.1] tracking-[-1px] whitespace-nowrap`}
            style={{ left: 627, top: F2(3764) }}
          >
            {SECTIONS[0].title}
          </p>
          <div
            className={`absolute z-10 font-pretendard text-grayscale-900 ${lang === "en" ? "text-[36px]" : "text-[50px]"} font-bold tracking-[-1.3px] ${lang === "en" ? "" : "whitespace-nowrap"}`}
            style={{ left: 627, top: F2(3979) }}
          >
            {SECTIONS[0].bigText.map((line, i) => (
              <p key={i} className="leading-[1.2]">{line}</p>
            ))}
          </div>
          {/* Section 1 photos — left: 경기둘레길(coast), right: image294(forest) per Figma */}
          <div className="bg-grayscale-900 absolute" style={{ left: 729, top: F2(4230), width: 378, height: 277, overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/sub2-img-gyeonggi.png" alt="" className="block h-full w-full object-cover" />
          </div>
          <div className="bg-grayscale-900 absolute" style={{ left: 1224, top: F2(4517), width: 496, height: 188, overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/sub2-img-294.png" alt="" className="block h-full w-full object-cover" />
          </div>
          {/* Section 1 descriptions */}
          <div
            className={`absolute font-pretendard text-grayscale-700 text-[24px] tracking-[-0.24px] ${lang === "en" ? "" : "whitespace-nowrap"}`}
            style={{ left: 1144, top: F2(4248), maxWidth: lang === "en" ? 700 : "none" }}
          >
            {SECTIONS[0].rightDesc.map((line, i) => (
              <p key={i} className="leading-[1.3]">{line}</p>
            ))}
          </div>
          <div
            className={`absolute font-pretendard text-grayscale-700 text-[24px] tracking-[-0.24px] ${lang === "en" ? "" : "whitespace-nowrap"}`}
            style={{ left: 729, top: F2(4588), maxWidth: lang === "en" ? 700 : "none" }}
          >
            {SECTIONS[0].leftDesc.map((line, i) => (
              <p key={i} className="leading-[1.3]">{line}</p>
            ))}
          </div>

          {/* SECTION 02 */}
          <p
            className="absolute font-montserrat text-grayscale-200 text-[220px] font-semibold leading-[1.3] tracking-[-4.4px] whitespace-nowrap text-right"
            style={{ left: 473, top: F2(5190), transform: "translateX(-100%)", width: 272 }}
          >
            {SECTIONS[1].num}
          </p>
          <p
            className={`absolute font-pretendard text-grayscale-200 ${lang === "en" ? "text-[64px]" : "text-[150px]"} font-bold leading-[1.3] tracking-[-3.9px] whitespace-nowrap text-right`}
            style={{ left: 465, top: F2(5412), transform: "translateX(-100%)" }}
          >
            {SECTIONS[1].label}
          </p>
          <p
            className="absolute font-pretendard text-primary text-[60px] font-bold leading-[1.3] tracking-[-1.56px] whitespace-nowrap"
            style={{ left: "calc(50% - 333px)", top: F2(5247) }}
          >
            {SECTIONS[1].enHook}
          </p>
          <p
            className={`absolute z-10 font-pretendard text-grayscale-900 ${lang === "en" ? "text-[72px]" : "text-[100px]"} font-bold leading-[1.1] tracking-[-1px] whitespace-nowrap`}
            style={{ left: 627, top: F2(5345) }}
          >
            {SECTIONS[1].title}
          </p>
          <div
            className={`absolute z-10 font-pretendard text-grayscale-900 ${lang === "en" ? "text-[36px]" : "text-[50px]"} font-bold tracking-[-1.3px] ${lang === "en" ? "" : "whitespace-nowrap"}`}
            style={{ left: 627, top: F2(5560) }}
          >
            {SECTIONS[1].bigText.map((line, i) => (
              <p key={i} className="leading-[1.2]">{line}</p>
            ))}
          </div>
          {/* Section 2 photos — top:namparang46 (shifted right to center person), middle:youth, bottom:wooden frame */}
          <div className="bg-grayscale-900 absolute" style={{ left: 1261, top: F2(5333.5), width: 302, height: 433, overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/sub2-img-namparang46.png" alt="" className="block h-full w-full object-cover" style={{ objectPosition: "15% center" }} />
          </div>
          <div className="bg-grayscale-900 absolute" style={{ left: 744, top: F2(5910.5), width: 346, height: 217, overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/sub2-img-youth.png" alt="" className="block h-full w-full object-cover" />
          </div>
          <div className="bg-grayscale-900 absolute" style={{ left: 1224, top: F2(6006), width: 496, height: 280, overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/sub2-img-frame.png" alt="" className="block h-full w-full object-cover" />
          </div>
          {/* Section 2 descriptions */}
          <div
            className={`absolute font-pretendard text-grayscale-700 text-[24px] tracking-[-0.24px] ${lang === "en" ? "" : "whitespace-nowrap"}`}
            style={{ left: 1165, top: F2(5841), maxWidth: lang === "en" ? 700 : "none" }}
          >
            {SECTIONS[1].rightDesc.map((line, i) => (
              <p key={i} className="leading-[1.3]">{line || "\u00A0"}</p>
            ))}
          </div>
          <div
            className={`absolute font-pretendard text-grayscale-700 text-[24px] tracking-[-0.24px] ${lang === "en" ? "" : "whitespace-nowrap"}`}
            style={{ left: 729, top: F2(6169), maxWidth: lang === "en" ? 480 : "none" }}
          >
            {SECTIONS[1].leftDesc.map((line, i) => (
              <p key={i} className="leading-[1.3]">{line}</p>
            ))}
          </div>
          <div
            className={`absolute font-pretendard text-grayscale-700 text-[24px] tracking-[-0.24px] ${lang === "en" ? "" : "whitespace-nowrap"}`}
            style={{ left: 1117, top: F2(6358), maxWidth: lang === "en" ? 700 : "none" }}
          >
            {SECTIONS[1].extraDesc.map((line, i) => (
              <p key={i} className="leading-[1.3]">{line}</p>
            ))}
          </div>

          {/* SECTION 03 — 길을 걷다 */}
          <p
            className="absolute font-montserrat text-grayscale-200 text-[220px] font-semibold leading-[1.3] tracking-[-4.4px] whitespace-nowrap text-right"
            style={{ left: 473, top: F2(6696), transform: "translateX(-100%)", width: 272 }}
          >
            {SECTIONS[2].num}
          </p>
          <p
            className={`absolute font-pretendard text-grayscale-200 ${lang === "en" ? "text-[64px]" : "text-[150px]"} font-bold leading-[1.3] tracking-[-3.9px] whitespace-nowrap text-right`}
            style={{ left: 465, top: F2(6918), transform: "translateX(-100%)" }}
          >
            {SECTIONS[2].label}
          </p>
          <p
            className="absolute font-pretendard text-primary text-[60px] font-bold leading-[1.3] tracking-[-1.56px] whitespace-nowrap"
            style={{ left: "calc(50% - 333px)", top: F2(6750) }}
          >
            {SECTIONS[2].enHook}
          </p>
          <p
            className={`absolute z-10 font-pretendard text-grayscale-900 ${lang === "en" ? "text-[72px]" : "text-[100px]"} font-bold leading-[1.1] tracking-[-1px] whitespace-nowrap`}
            style={{ left: 627, top: F2(6848) }}
          >
            {SECTIONS[2].title}
          </p>
          <div
            className={`absolute z-10 font-pretendard text-grayscale-900 ${lang === "en" ? "text-[36px]" : "text-[50px]"} font-bold tracking-[-1.3px] ${lang === "en" ? "" : "whitespace-nowrap"}`}
            style={{ left: 627, top: F2(7063) }}
          >
            {SECTIONS[2].bigText.map((line, i) => (
              <p key={i} className="leading-[1.2]">{line}</p>
            ))}
          </div>
          {/* Section 3 photos */}
          <div className="bg-grayscale-900 absolute" style={{ left: 1356, top: F2(7152), width: 364, height: 218, overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/sub2-img-namparang44.png" alt="" className="block h-full w-full object-cover" />
          </div>
          <div className="bg-grayscale-900 absolute" style={{ left: 747, top: F2(7261), width: 333, height: 333, overflow: "hidden" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/sub2-img-namparang22.png" alt="" className="block h-full w-full object-cover" />
          </div>
          {/* Section 3 descriptions */}
          <div
            className={`absolute font-pretendard text-grayscale-700 text-[24px] tracking-[-0.24px] ${lang === "en" ? "" : "whitespace-nowrap"}`}
            style={{ left: 1130, top: F2(7417), maxWidth: lang === "en" ? 700 : "none" }}
          >
            {SECTIONS[2].rightDesc.map((line, i) => (
              <p key={i} className="leading-[1.3]">{line}</p>
            ))}
          </div>
          <div
            className={`absolute font-pretendard text-grayscale-700 text-[24px] tracking-[-0.24px] ${lang === "en" ? "" : "whitespace-nowrap"}`}
            style={{ left: 1301, top: F2(7548), maxWidth: lang === "en" ? 700 : "none" }}
          >
            {SECTIONS[2].extraDesc.map((line, i) => (
              <p key={i} className="leading-[1.3]">{line}</p>
            ))}
          </div>
          <div
            className={`absolute font-pretendard text-grayscale-700 text-[24px] tracking-[-0.24px] ${lang === "en" ? "" : "whitespace-nowrap"}`}
            style={{ left: 729, top: F2(7672), maxWidth: lang === "en" ? 700 : "none" }}
          >
            {SECTIONS[2].leftDesc.map((line, i) => (
              <p key={i} className="leading-[1.3]">{line}</p>
            ))}
          </div>

          {/* Footer at bottom */}
          <div className="absolute" style={{ left: 0, top: F2(8780), width: 1920 }}>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}
