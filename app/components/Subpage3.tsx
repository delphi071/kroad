"use client";

import { useEffect, useRef, useState } from "react";
import Footer from "./Footer";
import { getMainHref, getSubHref } from "./navLinks";

/* Carousel items for Section 1 (코리아둘레길) — multiple items, click main or peek to swap */
type KoreaItem = {
  id: string;
  heading: string;        // 50px green
  subTitle: string;       // 36px black
  blocks: { subHeading: string; subBody: string }[]; // each block: 20px Bold lead + 20px Regular body
  image: string;
};

const KOREA_ITEMS: KoreaItem[] = [
  {
    id: "korea-main",
    heading: "코리아둘레길",
    subTitle: "코리아둘레길",
    blocks: [
      {
        subHeading: "코리아둘레길은",
        subBody:
          "한반도를 따라 이어지는 국내 최초의 통합 국가 트레일로, 삼면이 바다인 한반도의 해안과 내륙을 아우르는 장거리 걷기길입니다. 산과 들, 하천과 해안, 마을의 길을 따라 지역의 삶을 따라 걷는 여정을 통해 한국의 다양한 풍경과 문화를 경험할 수 있습니다.",
      },
      {
        subHeading: "코리아둘레길의 통합관리·운영",
        subBody:
          "코리아둘레길의 통합관리·운영을 통해 전국을 잇는 국가 트레일의 품질과 일관성을 높이고 있습니다. 노선 관리, 정보 제공, 이용자 경험 개선 등 전반적인 운영 체계를 구축하고 통합적인 운영관리를 통해 지속가능한 걷기길을 만들어 나가고 있습니다.",
      },
    ],
    image: "/figma/sub3-korea-map.png",
  },
  {
    id: "korea-keepers",
    heading: "코리아둘레길",
    subTitle: "지킴이 운영",
    blocks: [
      {
        subHeading: "코리아둘레길 지킴이는",
        subBody:
          "코리아둘레길을 직접 걸으며 길의 상태를 점검하고, 안내리본 설치 및 시설물 이상 여부를 확인하는 현장 중심의 관리 활동입니다. 코리아둘레길의 해파랑길, 남파랑길, 서해랑길, DMZ평화의길 전 구간을 대상으로 길의 연결성과 안전성을 유지하고, 여행자가 보다 편안하게 길을 이용할 수 있도록 지원하는 역할을 수행합니다.",
      },
      {
        subHeading: "현장기반 상시 점검 체계",
        subBody:
          "코리아둘레길 지킴이 운영을 통해 현장 기반의 상시 점검체계를 구축하고 있습니다. 지킴이 활동을 통해 수집된 현장 정보를 바탕으로 노선 정비, 시설물 개선, 안내체계 보완 등을 지속적으로 추진하고 있으며, 체계적인 교육과 관리·운영을 통해 길의 품질을 유지하고 걷기여행 경험을 향상시키고 있습니다.",
      },
    ],
    image: "/figma/sub3-tab1-map.png",
  },
  {
    id: "korea-monitor",
    heading: "코리아둘레길",
    subTitle: "길 모니터링",
    blocks: [
      {
        subHeading: "길 모니터링은",
        subBody:
          "지킴이 활동을 통해 접수된 신고내용과 안내사무국으로 접수된 이용자 의견을 바탕으로 현장점검을 실시하는 관리 활동입니다. 노선 훼손, 시설물 이상, 안내 오류, 통행 불편 구간 등을 직접 확인하여 실제 이용 환경에서 발생하는 문제를 점검하고 개선하기 위한 역할을 수행합니다.",
      },
      {
        subHeading: "체계적인 소통과 현장 대응",
        subBody:
          "체계적인 신고 접수 및 현장점검 체계를 기반으로 길 모니터링을 운영하고 있습니다. 지킴이와 여행자로부터 수집된 정보를 바탕으로 신속한 현장 대응을 실시하고, 점검 결과를 반영하여 시설물 정비, 노선 보완, 안내정보 개선 등 후속 조치를 지속적으로 추진하고 있습니다.",
      },
    ],
    image: "/figma/sub3-tab1-monitor.png",
  },
  {
    id: "korea-edu",
    heading: "코리아둘레길",
    subTitle: "찾아가는 교육",
    blocks: [
      {
        subHeading: "찾아가는 교육은",
        subBody:
          "각 지자체 담당자의 코리아둘레길 사업 이해도가 상이한 점을 고려하여, 교육이 필요한 지자체의 신청을 받아 직접 현장을 방문해 교육을 제공하는 지원 프로그램입니다. 코리아둘레길의 사업 개요, 운영 방향, 관리 기준 등을 공유하여 지자체 담당자의 이해도를 높이고, 원활한 사업 추진을 돕는 것을 목적으로 합니다.",
      },
      {
        subHeading: "현장 맞춤형 교육",
        subBody:
          "지자체 대상 찾아가는 교육을 통해 코리아둘레길의 통합적인 운영 방향과 관리 기준을 체계적으로 컨설팅하고 있습니다. 현장 맞춤형 교육을 통해 실무 이해도를 제고하고, 지자체와의 협력체계를 강화하여 사업의 일관성과 실행력을 높여가고 있습니다.",
      },
    ],
    image: "/figma/sub3-tab1-edu.png",
  },
  {
    id: "korea-rest",
    heading: "코리아둘레길",
    subTitle: "쉼터",
    blocks: [
      {
        subHeading: "코리아둘레길 쉼터는",
        subBody:
          "코리아둘레길 여행의 시작과 휴식을 함께하는 거점 공간으로, 길을 걷다 잠시 쉬어가고 싶은 여행자부터 코리아둘레길 완주에 도전하는 여행자까지 누구나 이용할 수 있는 열린 공간입니다. 전 권역에 걸쳐 균형 있게 조성된 쉼터에서는 걷기 정보 제공, 구간 추천, 지역 연계 프로그램 등 다양한 서비스를 통해 이용자의 편의를 지원하고 있습니다.",
      },
      {
        subHeading: "지역과 길을 연결하는 거점",
        subBody:
          "코리아둘레길 쉼터 운영 활성화를 위한 컨설팅을 통해 공간 활용도와 프로그램 운영의 실효성을 높이고 있습니다. 쉼터별 특성과 이용 수요를 반영한 운영 방안을 제시하고, 프로그램 기획 및 운영 방향 개선을 지원함으로써 쉼터가 단순 휴식 공간을 넘어 지역과 길을 연결하는 거점으로 기능할 수 있도록 하고 있습니다.",
      },
    ],
    image: "/figma/sub3-tab1-rest.png",
  },
  {
    id: "korea-office",
    heading: "코리아둘레길",
    subTitle: "안내사무국",
    blocks: [
      {
        subHeading: "코리아둘레길 안내사무국은",
        subBody:
          "코리아둘레길 여행자를 대상으로 길 안내, 이용 정보 제공, 민원 응대 등을 수행하는 운영 지원 창구입니다. 전화, 두루누비 등을 통해 접수되는 다양한 문의와 의견을 바탕으로 이용자의 불편사항을 해소하고, 보다 안전하고 편리한 걷기 환경을 제공하는 역할을 수행합니다.",
      },
      {
        subHeading: "이용자 중심의 소통",
        subBody:
          "코리아둘레길 안내사무국 운영을 통해 이용자 중심의 소통 체계를 구축하고 있습니다. 접수된 문의 및 민원 사항을 체계적으로 관리하고, 필요한 경우 관계기관 및 현장과 연계하여 신속한 대응이 이루어질 수 있도록 지원하고 있으며, 이를 바탕으로 노선 및 운영 개선에 반영하는 선순환 체계를 만들어가고 있습니다.",
      },
    ],
    image: "/figma/sub3-tab1-office.png",
  },
];

/* Section 2: 지역길 조사 및 연구 — image-left/text-right carousel with CTA */
type RegionalItem = {
  id: string;
  heading: string;
  subTitle: string;
  blocks: { subHeading: string; subBody: string }[];
  image: string;
  cta?: { label: string; href: string };
};

const REGIONAL_ITEMS: RegionalItem[] = [
  {
    id: "gyeonggi",
    heading: "지역길 조사 및 연구",
    subTitle: "경기둘레길 통합관리운영",
    blocks: [
      {
        subHeading: "경기둘레길은",
        subBody:
          "경기도 전역을 순환하는 총연장 약 860km의 장거리 걷기길로, 15개 시·군을 연결하는 경기도 대표 걷기여행길입니다. 해안, 산림, 하천, 도심 등 다양한 자연환경과 지역의 역사·문화를 따라 걷는 여정을 통해 경기도의 다채로운 풍경과 이야기를 경험할 수 있습니다.",
      },
      {
        subHeading: "경기둘레길 통합관리운영",
        subBody:
          "경기둘레길의 체계적인 관리·운영을 통해 안전하고 쾌적한 걷기 환경을 조성하고 있습니다. 노선 관리, 시설물 유지보수, 정보 제공, 이용자 경험 개선 등 전반적인 운영체계를 구축하고 있으며, 자원활동가 및 임도지킴이 운영과 모니터링 현장 점검을 기반으로 지속가능한 걷기길을 만들어 나가고 있습니다.",
      },
    ],
    image: "/figma/sub3-tab2-8.png",
    cta: { label: "자세히 보기", href: "#" },
  },
  {
    id: "chungnam-religion",
    heading: "지역길 조사 및 연구",
    subTitle: "충청남도 종교문화의길 조성 정비 기본계획 수립",
    blocks: [
      {
        subHeading: "충청남도 종교문화의 길은",
        subBody:
          "충청남도 전역에 분포한 천주교, 불교, 유교 등 다양한 종교·역사 자원을 연결하는 걷기길로, 신앙과 사색, 치유의 여정을 담은 문화탐방형 트레일입니다. 각 지역의 성지, 사찰, 향교 등 종교문화 자산과 자연환경을 함께 경험할 수 있으며, 길을 따라 형성된 역사와 삶의 이야기를 통해 충청남도의 깊이 있는 문화적 가치를 체감할 수 있습니다.",
      },
      {
        subHeading: "체계적인 종합 계획",
        subBody:
          "충청남도 종교문화의 길 조성 및 정비 기본계획 수립을 통해 노선 체계 구축, 콘텐츠 발굴, 운영 방향 설정 등 종합적인 계획을 마련했습니다. 노선 선정 및 연계성 확보, 안내체계 구축, 프로그램 개발 등 실행 기반을 체계적으로 설계하여 지속가능한 걷기길로 조성하고, 지역 관광 활성화와 문화자원 활용을 동시에 도모하고 있습니다.",
      },
    ],
    image: "/figma/sub3-tab2-religion.png",
    cta: { label: "자세히 보기", href: "#" },
  },
];

/* Section 3: 걷기기반 문화 프로그램 — image RIGHT + text LEFT, peek shifted right-down (mirror of Section 2) */
type CultureItem = {
  id: string;
  heading: string;
  subTitle: string;
  blocks: { subHeading: string; subBody: string }[];
  image: string;
  cta?: { label: string; href: string };
};

const CULTURE_ITEMS: CultureItem[] = [
  {
    id: "youth-school",
    heading: "걷기기반 문화 프로그램",
    subTitle: "청소년여행문화학교",
    blocks: [
      {
        subHeading: "청소년여행문화학교는",
        subBody:
          "청소년이 역사·문화·생태를 아우르는 걷기 여행을 통해 추억을 만들고 정서적 교감을 나눔으로써, 국토와 지역문화의 소중한 의미를 배우고 삶의 방향성을 모색할 수 있는 계기를 제공하고자 청소년 여행문화학교를 기획·운영하고 있습니다.",
      },
      {
        subHeading: "이어지는 사회공헌 프로그램",
        subBody:
          "2010년부터 2016년까지 문화체육관광부가 지원하는 청소년 대상 사업으로 '이야기가 있는 문화생태탐방' 이란 주제로 진행하였으며, 2017년부터는 사단법인 한국의길과문화의 자체적인 사회공헌사업으로 그 가치를 이어가고 있습니다. 지금까지 2천 여명의 멘토와 멘티가 함께 걸었습니다.",
      },
    ],
    image: "/figma/sub3-tab3-3.png",
    cta: { label: "자세히 보기", href: "#" },
  },
  {
    id: "girigiri",
    heading: "걷기기반 문화 프로그램",
    subTitle: "길이 길이 여행",
    blocks: [
      {
        subHeading: "길이 길이 여행",
        subBody:
          "가본 길이라도, 같은 지역이라도 색다른 시선으로 다가갈 수 있는 몰입형 로컬 테마 여행입니다. 당신의 인생에 길이길이 남을 장면을 선물합니다.",
      },
      {
        subHeading: "",
        subBody:
          "길은 단순한 이동이 아니라 시간과 삶이 흐르는 공간, 소비가 아니라 기억과 관계를 남기는 경험, 관광지가 아니라 사람의 이야기로 완성되는 장소- 길을 걸으며 사람과 이야기를 만나, 오래도록 남는 여행을 만들어가고 있습니다.",
      },
    ],
    image: "/figma/sub3-tab3-girigiri.png",
  },
  {
    id: "gildongmu",
    heading: "걷기기반 문화 프로그램",
    subTitle: "길동무 프로그램",
    blocks: [
      {
        subHeading: "든든한 동반자가 함께 걷는 길",
        subBody:
          "함께 걷는 순간이 길의 경험을 바꾼다는 데 주목합니다. 같은 길이라도 누군가와 나누는 걸음은 더 가볍고, 더 깊게 남습니다. 길동무가 참여자가 동행하며 길 위의 이야기와 순간을 나누고, 길에 대한 해설과 체험이 결합되어 코스를 보다 깊이 있게 이해할 수 있습니다.",
      },
      {
        subHeading: "",
        subBody:
          "혼자일 때보다 덜 힘들고 더 즐거운 걸음 속에서, 사람과 사람, 그리고 길이 자연스럽게 이어이고, 걷는 시간 자체가 하나의 기억으로 남습니다. 혼자가 아닌 '함께 걷는 길'의 의미를 자연스럽게 만들어갑니다.",
      },
    ],
    image: "/figma/sub3-tab3-gildongmu.png",
  },
  {
    id: "festival",
    heading: "걷기기반 문화 프로그램",
    subTitle: "걷기 축제",
    blocks: [
      {
        subHeading: "참여형 걷기 축제",
        subBody:
          "길 위에서 지역의 이야기와 문화를 즐기는 참여형 걷기 축제를 만들어갑니다. 단순한 축제를 넘어, 걷기 문화를 확산하고 지역과의 지속적인 연결을 만들어갑니다.",
      },
      {
        subHeading: "",
        subBody:
          "참여자의 걸음이 로컬 콘텐츠가 유기적으로 연결되어 지역의 매력에 몰입하고, 길과 지역에 대한 새로운 모습을 만날 수 있습니다. 걷는 순간마다 새로운 경험이 펼쳐지며, 사람과 지역이 함께 어우러지는 축제의 장을 만듭니다.",
      },
    ],
    image: "/figma/sub3-tab3-festival.png",
  },
  {
    id: "archive",
    heading: "걷기기반 문화 프로그램",
    subTitle: "길 문화 아카이빙",
    blocks: [
      {
        subHeading: "길과 지역 문화 자산화",
        subBody:
          "수년간 현장에서 축적된 길과 지역에 대한 높은 이해를 바탕으로 길 위에 축적된 역사와 문화, 사람의 이야기를 체계적으로 수집·기록하고 이를 데이터와 콘텐츠로 탄생시킵니다. 이렇게 축적된 아카이브는 길의 정체성을 보존하는 동시에, 다양한 프로그램과 콘텐츠로 확장되어 새로운 길 경험으로 이어집니다.",
      },
      {
        subHeading: "",
        subBody:
          "현장 조사와 인터뷰, 기록물 수집 등을 통해 지역 고유의 스토리를 발굴하고, 이를 영상·텍스트·지도 등 다양한 형태로 구조화합니다. 출판, 프로그램, 디지털 플랫폼 등으로 바로 연계되어 누구나 접근하고 활용할 수 있도록 확장됩니다.",
      },
    ],
    image: "/figma/sub3-tab3-archive.png",
  },
];

/* Section 4: 굿즈 기획 및 판매 — Section 1 패턴 (text LEFT, image RIGHT with peek), 스토어 바로가기 CTA */
type GoodsItem = {
  id: string;
  heading: string;
  subTitle: string;
  blocks: { subHeading: string; subBody: string }[];
  image: string;
};

const GOODS_ITEMS: GoodsItem[] = [
  {
    id: "stamp-book",
    heading: "굿즈 기획 및 판매",
    subTitle: "해파랑길 스탬프북",
    blocks: [
      {
        subHeading: "해파랑길 스탬프북은",
        subBody:
          "동해안을 따라 이어지는 길과 그 안에 담긴 지역의 풍경과 문화를 새롭게 바라보게 하는 기록 도구입니다. 코스를 걸으며 하나씩 찍히는 스탬프는 지나온 시간과 순간을 자연스럽게 남겨주고, 걸음에 소소한 즐거움과 동기를 더합니다.",
      },
      {
        subHeading: "",
        subBody:
          "해파랑길 스탬프북은 상·하권으로 나뉘어 각 구간의 지리적 흐름과 지역의 특색을 담아 구성되어 있습니다. 상권은 강원도의 해안 절경과 자연 중심의 길을 따라 이어지며, 시원하게 펼쳐진 동해의 풍경과 함께 걷는 경험을 제공합니다. 하권은 경상도의 해안과 도시, 어촌이 어우러진 길로 이어지며 지역의 생활과 문화가 보다 가까이 느껴지는 여정을 담고 있습니다.",
      },
    ],
    image: "/figma/sub3-tab4-2.png",
  },
  {
    id: "korea-keyring",
    heading: "굿즈 기획 및 판매",
    subTitle: "코리아둘레길 키링",
    blocks: [
      {
        subHeading: "길의 흐름과 연결의 상징을 담아낸 오브제",
        subBody:
          "실제 로고와 그래픽 요소를 기반으로, 길이 연결되는 구조와 방향성을 직관적으로 표현했습니다.",
      },
      {
        subHeading: "",
        subBody:
          "작지만 분명한 형태로 코리아둘레길의 아이덴티티를 드러내며, 일상 속에서도 길의 기억을 자연스럽게 이어줍니다. 단순한 기념품이 아닌, 코리아둘레길의 상징과 체계를 직관적으로 보여주는 아이템으로, 작지만 선명하게 '길'을 드러냅니다.",
      },
    ],
    image: "/figma/sub3-tab4-keyring.png",
  },
  {
    id: "haeroji-keyring",
    heading: "굿즈 기획 및 판매",
    subTitle: "해로지 키링",
    blocks: [
      {
        subHeading: "함께 걷는 작은 여행친구",
        subBody:
          "길을 따라 걷는 즐거움과 코리아둘레길의 정체성을 친근한 캐릭터로 풀어내어, 일상 속에서도 자연스럽게 길을 떠올리게 합니다. 함께 달고 다니는 것만으로도 다시 걷고 싶은 마음을 불러오는 아이템입니다.",
      },
    ],
    image: "/figma/sub3-tab4-haeroji.png",
  },
];

type SectionData = {
  id: string;
  heading: string;        // 50px green
  subTitle: string;       // 36px black
  body: string[];         // body paragraphs
  subHeading?: string;
  subBody?: string[];
  images: string[];
  cta?: { label: string; href: string };
};

const SECTIONS: SectionData[] = [
  {
    id: "korea",
    heading: "코리아둘레길",
    subTitle: "코리아둘레길",
    body: ["한반도 전역을 잇는 국가 장거리 걷기길로, 동해·서해·남해·DMZ를 따라 이어지는 통합 트레일입니다."],
    subHeading: "코리아둘레길의 통합관리·운영",
    subBody: [
      "코리아둘레길의 통합관리·운영을 통해 전국을 잇는 국가 트레일의 품질과 일관성을 높이고 있습니다. 노선 관리, 정보 제공, 이용자 경험 개선 등 전반적인 운영 체계를 구축하고 통합적인 운영관리를 통해 지속가능한 걷기길을 만들어 나가고 있습니다.",
    ],
    images: ["/figma/sub3-tab1.png"],
  },
  {
    id: "regional",
    heading: "지역길 조사 및 연구",
    subTitle: "경기둘레길 통합관리운영",
    body: [
      "경기도 전역을 순환하는 총연장 약 860km의 장거리 걷기길로, 15개 시·군을 연결하는 경기도 대표 걷기여행길입니다.",
      "해안, 산림, 하천, 도심 등 다양한 자연환경과 지역의 역사·문화를 따라 걷는 여정을 통해 경기도의 다채로운 풍경과 이야기를 경험할 수 있습니다.",
    ],
    subHeading: "경기둘레길 통합관리운영",
    subBody: [
      "경기둘레길의 체계적인 관리·운영을 통해 안전하고 쾌적한 걷기 환경을 조성하고 있습니다.",
      "노선 관리, 시설물 유지보수, 정보 제공, 이용자 경험 개선 등 전반적인 운영체계를 구축하고 있으며, 자원활동가 및 임도지킴이 운영과 모니터링 현장 점검을 기반으로 지속가능한 걷기길을 만들어 나가고 있습니다.",
    ],
    images: [
      "/figma/sub3-tab2-1.png",
      "/figma/sub3-tab2-2.png",
      "/figma/sub3-tab2-3.png",
      "/figma/sub3-tab2-4.png",
    ],
  },
  {
    id: "culture",
    heading: "걷기기반 문화 프로그램",
    subTitle: "청소년여행문화학교",
    body: [
      "청소년이 역사·문화·생태를 아우르는 걷기 여행을 통해 추억을 만들고 정서적 교감을 나눔으로써, 국토와 지역문화의 소중한 의미를 배우고 삶의 방향성을 모색할 수 있는 계기를 제공하고자 청소년 여행문화학교를 기획·운영하고 있습니다.",
      "2010년부터 2016년까지 문화체육관광부가 지원하는 청소년 대상 사업으로 '이야기가 있는 문화생태탐방' 이란 주제로 진행하였으며, 2017년부터는 사단법인 한국의길과문화의 자체적인 사회공헌사업으로 그 가치를 이어가고 있습니다. 지금까지 2천 여명의 멘토와 멘티가 함께 걸었습니다.",
    ],
    images: ["/figma/sub3-tab3-1.png", "/figma/sub3-tab3-2.png"],
  },
  {
    id: "goods",
    heading: "굿즈 기획 및 판매",
    subTitle: "해파랑길 스탬프북",
    body: [
      "동해안을 따라 이어지는 길과 그 안에 담긴 지역의 풍경과 문화를 새롭게 바라보게 하는 기록 도구입니다. 코스를 걸으며 하나씩 찍히는 스탬프는 지나온 시간과 순간을 자연스럽게 남겨주고, 걸음에 소소한 즐거움과 동기를 더합니다.",
      "해파랑길 스탬프북은 상·하권으로 나뉘어 각 구간의 지리적 흐름과 지역의 특색을 담아 구성되어 있습니다. 상권은 강원도의 해안 절경과 자연 중심의 길을 따라 이어지며, 시원하게 펼쳐진 동해의 풍경과 함께 걷는 경험을 제공합니다. 하권은 경상도의 해안과 도시, 어촌이 어우러진 길로 이어지며 지역의 생활과 문화가 보다 가까이 느껴지는 여정을 담고 있습니다.",
    ],
    images: ["/figma/sub3-tab4-1.png", "/figma/sub3-tab4-2.png"],
    cta: { label: "스토어 바로가기", href: "#store" },
  },
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

function ExternalIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M14 4h6v6M20 4l-9 9M19 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- Mobile carousel item card (unified for all 4 sections) ---------- */
type MobileCardItem = {
  id: string;
  heading: string;
  subTitle: string;
  blocks: { subHeading: string; subBody: string }[];
  image: string;
};

function MobileItemCard({ item, hasStoreButton, sectionKey }: { item: MobileCardItem; hasStoreButton?: boolean; sectionKey?: string }) {
  return (
    <div data-section={sectionKey} style={{ scrollMarginTop: 80 }} className="flex flex-col gap-[32px] w-full items-center">
      <div className="flex flex-col gap-[12px] items-center w-full text-center">
        <p className="font-pretendard font-bold leading-[1.2] text-primary tracking-[-1.02px]" style={{ fontSize: 34 }}>{item.heading}</p>
        <p className="font-pretendard leading-[1.2] text-grayscale-900 tracking-[-0.48px]" style={{ fontSize: 24, fontWeight: 800 }}>{item.subTitle}</p>
      </div>
      <div className="w-full overflow-hidden rounded-[12px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image} alt={item.subTitle} className="block w-full h-auto" />
      </div>
      <div className="flex flex-col gap-[20px] items-start w-full">
        {item.blocks.map((b, i) => (
          <div key={i} className="flex flex-col gap-[10px] items-start w-full">
            {b.subHeading && (
              <p className="font-pretendard font-bold leading-[1.3] text-grayscale-900 tracking-[-0.32px]" style={{ fontSize: 16 }}>{b.subHeading}</p>
            )}
            <p className="font-pretendard leading-[1.5] text-grayscale-700 tracking-[-0.32px] whitespace-pre-wrap" style={{ fontSize: 16 }}>{b.subBody}</p>
          </div>
        ))}
      </div>
      {hasStoreButton && (
        <a
          href="https://smartstore.naver.com/koreatnc"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary flex items-center justify-center gap-[10px] px-[20px] py-[16px] cursor-pointer hover:opacity-90 transition-opacity w-full"
          style={{ borderTopLeftRadius: 20, borderBottomRightRadius: 20 }}
        >
          <span className="font-pretendard font-bold leading-[1.5] text-white tracking-[-0.32px] whitespace-nowrap" style={{ fontSize: 16 }}>스토어 바로가기</span>
          <span className="block size-[18px] text-white"><ExternalIcon size={18} /></span>
        </a>
      )}
    </div>
  );
}

/* ---------- Mobile footer ---------- */
function MobileFooter() {
  return (
    <div className="lg:hidden bg-grayscale-100 flex flex-col items-center gap-[40px] px-[20px] pt-[80px] pb-[64px]">
      <div className="flex flex-col items-center gap-[8px] mb-[80px]">
        <div className="relative" style={{ width: 220, height: 169 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/figma/footer-union.svg" alt="Beyond the Route" className="absolute inset-0 size-full" />
        </div>
        <p className="font-montserrat text-primary font-semibold leading-none whitespace-nowrap text-center" style={{ fontSize: 10 }}>
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

/* ---------- PC Korea carousel (Section 1) — title TOP, then [body + image with peek] ---------- */
function PCKoreaCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = KOREA_ITEMS[activeIdx];
  const nextIdx = (activeIdx + 1) % KOREA_ITEMS.length;
  const next = KOREA_ITEMS[nextIdx];

  return (
    <div className="flex flex-col gap-[60px] w-full">
      {/* Title row — TOP, separate */}
      <div className="flex flex-col gap-[18px] items-start">
        <p className="font-pretendard font-bold leading-[1.2] text-primary tracking-[-1.3px]" style={{ fontSize: 50 }}>{active.heading}</p>
        <p className="font-pretendard leading-[1.1] text-grayscale-900 tracking-[-0.36px]" style={{ fontSize: 36, fontWeight: 800 }}>{active.subTitle}</p>
      </div>

      {/* Below: body text + image carousel side by side */}
      <div className="flex gap-[60px] items-start w-full">
        {/* Body text column (smaller) */}
        <div className="w-[480px] shrink-0 flex flex-col gap-[36px] items-start">
          {active.blocks.map((b, i) => (
            <div key={i} className="flex flex-col gap-[13px] items-start w-full">
              <p className="font-pretendard font-bold leading-[1.3] text-grayscale-900 tracking-[-0.4px]" style={{ fontSize: 20 }}>{b.subHeading}</p>
              <p className="font-pretendard leading-[1.5] text-grayscale-700 tracking-[-0.4px] whitespace-pre-wrap" style={{ fontSize: 20 }}>{b.subBody}</p>
            </div>
          ))}
        </div>

        {/* Image carousel area (main + peek behind, layered 3D) */}
        <div className="flex-1 relative" style={{ aspectRatio: "980 / 600" }}>
          <button
            type="button"
            onClick={() => setActiveIdx(nextIdx)}
            aria-label={`다음 항목: ${next.subTitle}`}
            className="absolute z-0 inset-0 overflow-hidden rounded-[20px] cursor-pointer transition-transform duration-300"
            style={{ transform: "translate(420px, 80px)", filter: "blur(4px)", opacity: 0.85 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={next.image} alt="" className="absolute inset-0 size-full object-cover" />
          </button>
          <button
            type="button"
            onClick={() => setActiveIdx(nextIdx)}
            aria-label={`다음 항목 보기: ${next.subTitle}`}
            className="absolute z-10 inset-0 overflow-hidden rounded-[20px] cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={active.image} alt={active.subTitle} className="absolute inset-0 size-full object-cover" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- PC Regional carousel (Section 2) — title TOP, then [image with peek + body] ---------- */
function PCRegionalCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = REGIONAL_ITEMS[activeIdx];
  const nextIdx = (activeIdx + 1) % REGIONAL_ITEMS.length;
  const next = REGIONAL_ITEMS[nextIdx % REGIONAL_ITEMS.length];

  return (
    <div className="flex flex-col gap-[60px] w-full">
      {/* Title row — TOP, separate */}
      <div className="flex flex-col gap-[18px] items-start">
        <p className="font-pretendard font-bold leading-[1.2] text-primary tracking-[-1.3px]" style={{ fontSize: 50 }}>{active.heading}</p>
        <p className="font-pretendard leading-[1.1] text-grayscale-900 tracking-[-0.36px]" style={{ fontSize: 36, fontWeight: 800 }}>{active.subTitle}</p>
      </div>

      {/* Below: image (left) + body text (right) */}
      <div className="flex gap-[60px] items-start w-full">
        {/* Image carousel area (main + peek behind, peek shifted LEFT-down) */}
        <div className="flex-1 relative" style={{ aspectRatio: "980 / 600" }}>
          {REGIONAL_ITEMS.length > 1 && (
            <button
              type="button"
              onClick={() => setActiveIdx(nextIdx)}
              aria-label={`다음 항목: ${next.subTitle}`}
              className="absolute z-0 inset-0 overflow-hidden rounded-[20px] cursor-pointer transition-transform duration-300"
              style={{ transform: "translate(-420px, 80px)", filter: "blur(4px)", opacity: 0.85 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={next.image} alt="" className="absolute inset-0 size-full object-cover" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setActiveIdx(nextIdx)}
            aria-label={`다음 항목 보기`}
            className="absolute z-10 inset-0 overflow-hidden rounded-[20px] cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={active.image} alt={active.subTitle} className="absolute inset-0 size-full object-cover" />
          </button>
        </div>

        {/* Body text column — RIGHT */}
        <div className="w-[480px] shrink-0 flex flex-col gap-[36px] items-start">
          {active.blocks.map((b, i) => (
            <div key={i} className="flex flex-col gap-[13px] items-start w-full">
              <p className="font-pretendard font-bold leading-[1.3] text-grayscale-900 tracking-[-0.4px]" style={{ fontSize: 20 }}>{b.subHeading}</p>
              <p className="font-pretendard leading-[1.5] text-grayscale-700 tracking-[-0.4px] whitespace-pre-wrap" style={{ fontSize: 20 }}>{b.subBody}</p>
            </div>
          ))}
          {/* 자세히 보기 버튼 — 주석 처리
          {active.cta && (
            <a href={active.cta.href} className="bg-primary inline-flex items-center justify-center px-[30px] py-[16px]" style={{ borderTopLeftRadius: 20, borderBottomRightRadius: 20 }}>
              <span className="font-pretendard font-bold text-white" style={{ fontSize: 16 }}>{active.cta.label}</span>
            </a>
          )}
          */}
        </div>
      </div>
    </div>
  );
}

/* ---------- PC Culture carousel (Section 3) — image LEFT + text RIGHT (Section 2 패턴), peek shifted right-down ---------- */
function PCCultureCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = CULTURE_ITEMS[activeIdx];
  const nextIdx = (activeIdx + 1) % CULTURE_ITEMS.length;
  const next = CULTURE_ITEMS[nextIdx];

  return (
    <div className="flex flex-col gap-[60px] w-full">
      {/* Title row — TOP, separate (위치는 content area left, NOT viewport edge) */}
      <div className="flex flex-col gap-[18px] items-start">
        <p className="font-pretendard font-bold leading-[1.2] text-primary tracking-[-1.3px]" style={{ fontSize: 50 }}>{active.heading}</p>
        <p className="font-pretendard leading-[1.1] text-grayscale-900 tracking-[-0.36px]" style={{ fontSize: 36, fontWeight: 800 }}>{active.subTitle}</p>
      </div>

      {/* Below: image (flush left, breaks out -ml-200) + body text (right) */}
      <div className="flex items-start w-full">
        {/* Image carousel area — flush against viewport left edge */}
        <div className="relative shrink-0" style={{ width: 980, aspectRatio: "980 / 600", marginLeft: -200 }}>
          {CULTURE_ITEMS.length > 1 && (
            <button
              type="button"
              onClick={() => setActiveIdx(nextIdx)}
              aria-label={`다음 항목: ${next.subTitle}`}
              className="absolute z-0 inset-0 overflow-hidden rounded-[20px] cursor-pointer transition-transform duration-300"
              style={{ transform: "translate(150px, 100px)", filter: "blur(4px)", opacity: 0.85 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={next.image} alt="" className="absolute inset-0 size-full object-cover" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setActiveIdx(nextIdx)}
            aria-label={`다음 항목 보기`}
            className="absolute z-10 inset-0 overflow-hidden rounded-[20px] cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={active.image} alt={active.subTitle} className="absolute inset-0 size-full object-cover" />
          </button>
        </div>

        {/* Body text column — RIGHT (ml-auto pushes to right edge) */}
        <div className="w-[480px] shrink-0 ml-auto flex flex-col gap-[36px] items-start">
          {active.blocks.map((b, i) => (
            <div key={i} className="flex flex-col gap-[13px] items-start w-full">
              {b.subHeading && (
                <p className="font-pretendard font-bold leading-[1.3] text-grayscale-900 tracking-[-0.4px]" style={{ fontSize: 20 }}>{b.subHeading}</p>
              )}
              <p className="font-pretendard leading-[1.5] text-grayscale-700 tracking-[-0.4px] whitespace-pre-wrap" style={{ fontSize: 20 }}>{b.subBody}</p>
            </div>
          ))}
        {/* 자세히 보기 버튼 — 주석 처리 (활성화 시 아래 블록 복원)
        {active.cta && (
          <a
            href={active.cta.href}
            className="bg-primary inline-flex items-center justify-center px-[30px] py-[16px] cursor-pointer hover:opacity-90 transition-opacity"
            style={{ borderTopLeftRadius: 20, borderBottomRightRadius: 20 }}
          >
            <span className="font-pretendard font-bold leading-[1.5] text-white tracking-[-0.32px] whitespace-nowrap" style={{ fontSize: 16 }}>{active.cta.label}</span>
          </a>
        )}
        */}
        {/* 신청하기 버튼 — 주석 처리 (활성화 시 아래 블록 복원)
        <a
          href="#apply"
          className="border-[2px] border-primary inline-flex items-center justify-center gap-[8px] px-[30px] py-[14px] cursor-pointer hover:bg-primary/10 transition-colors"
          style={{ borderTopLeftRadius: 20, borderBottomRightRadius: 20 }}
        >
          <span className="font-pretendard font-bold leading-[1.5] text-primary tracking-[-0.32px] whitespace-nowrap" style={{ fontSize: 16 }}>신청하기</span>
          <span className="block size-[18px] text-primary">
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M14 4h6v6M20 4l-9 9M19 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>
        */}
        </div>
      </div>
    </div>
  );
}

/* ---------- PC Goods carousel (Section 4) — Section 1 패턴 (text LEFT + image RIGHT with peek), 스토어 바로가기 CTA ---------- */
function PCGoodsCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = GOODS_ITEMS[activeIdx];
  const nextIdx = (activeIdx + 1) % GOODS_ITEMS.length;
  const next = GOODS_ITEMS[nextIdx];

  return (
    <div className="flex flex-col gap-[60px] w-full">
      {/* Title row — TOP, separate */}
      <div className="flex flex-col gap-[18px] items-start">
        <p className="font-pretendard font-bold leading-[1.2] text-primary tracking-[-1.3px]" style={{ fontSize: 50 }}>{active.heading}</p>
        <p className="font-pretendard leading-[1.1] text-grayscale-900 tracking-[-0.36px]" style={{ fontSize: 36, fontWeight: 800 }}>{active.subTitle}</p>
      </div>

      {/* Below: body text (left) + image carousel (right with peek) */}
      <div className="flex gap-[60px] items-start w-full">
        {/* Body text column — LEFT */}
        <div className="w-[480px] shrink-0 flex flex-col gap-[36px] items-start">
          {active.blocks.map((b, i) => (
            <div key={i} className="flex flex-col gap-[13px] items-start w-full">
              {b.subHeading && (
                <p className="font-pretendard font-bold leading-[1.3] text-grayscale-900 tracking-[-0.4px]" style={{ fontSize: 20 }}>{b.subHeading}</p>
              )}
              <p className="font-pretendard leading-[1.5] text-grayscale-700 tracking-[-0.4px] whitespace-pre-wrap" style={{ fontSize: 20 }}>{b.subBody}</p>
            </div>
          ))}
          {/* 스토어 바로가기 버튼 — 새창 링크 */}
          <a
            href="https://smartstore.naver.com/koreatnc"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary inline-flex items-center justify-center gap-[10px] px-[30px] py-[16px] cursor-pointer hover:opacity-90 transition-opacity"
            style={{ borderTopLeftRadius: 20, borderBottomRightRadius: 20 }}
          >
            <span className="font-pretendard font-bold leading-[1.5] text-white tracking-[-0.32px] whitespace-nowrap" style={{ fontSize: 16 }}>스토어 바로가기</span>
            <span className="block size-[20px] text-white">
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M14 4h6v6M20 4l-9 9M19 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        </div>

        {/* Image carousel area — RIGHT, peek shifted right-down (Section 1 패턴) */}
        <div className="flex-1 relative" style={{ aspectRatio: "980 / 600" }}>
          {GOODS_ITEMS.length > 1 && (
            <button
              type="button"
              onClick={() => setActiveIdx(nextIdx)}
              aria-label={`다음 항목: ${next.subTitle}`}
              className="absolute z-0 inset-0 overflow-hidden rounded-[20px] cursor-pointer transition-transform duration-300"
              style={{ transform: "translate(420px, 80px)", filter: "blur(4px)", opacity: 0.85 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={next.image} alt="" className="absolute inset-0 size-full object-cover" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setActiveIdx(nextIdx)}
            aria-label={`다음 항목 보기`}
            className="absolute z-10 inset-0 overflow-hidden rounded-[20px] cursor-pointer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={active.image} alt={active.subTitle} className="absolute inset-0 size-full object-cover" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- PC text column (heading, body, sub, CTA) ---------- */
function PCTextColumn({ section }: { section: SectionData }) {
  return (
    <div className="flex flex-col gap-[40px] items-start">
      <div className="flex flex-col gap-[20px] items-start">
        <p className="font-pretendard font-bold leading-[1.2] text-primary tracking-[-1.3px]" style={{ fontSize: 50 }}>{section.heading}</p>
        <p className="font-pretendard leading-[1.1] text-grayscale-900 tracking-[-0.36px]" style={{ fontSize: 36, fontWeight: 800 }}>{section.subTitle}</p>
      </div>
      <div className="flex flex-col gap-[16px] items-start font-pretendard leading-[1.5] text-grayscale-700 tracking-[-0.4px]" style={{ fontSize: 20 }}>
        {section.body.map((p, i) => (
          <p key={i} className="leading-[1.5]" style={{ marginBottom: 0 }}>{p}</p>
        ))}
      </div>
      {section.subHeading && section.subBody && (
        <div className="flex flex-col gap-[14px] items-start mt-[20px]">
          <p className="font-pretendard font-bold leading-[1.3] text-grayscale-900 tracking-[-0.4px]" style={{ fontSize: 20 }}>{section.subHeading}</p>
          <div className="flex flex-col gap-[12px] items-start font-pretendard leading-[1.5] text-grayscale-700 tracking-[-0.4px]" style={{ fontSize: 20 }}>
            {section.subBody.map((p, i) => (
              <p key={i} className="leading-[1.5]" style={{ marginBottom: 0 }}>{p}</p>
            ))}
          </div>
        </div>
      )}
      {section.cta && (
        <a
          href={section.cta.href}
          className="bg-primary inline-flex items-center justify-center gap-[10px] px-[24px] py-[16px] cursor-pointer hover:opacity-90 transition-opacity"
          style={{ borderTopLeftRadius: 20, borderBottomRightRadius: 20 }}
        >
          <span className="font-pretendard font-bold leading-[1.5] text-white tracking-[-0.32px] whitespace-nowrap" style={{ fontSize: 16 }}>{section.cta.label}</span>
          <span className="block size-[20px] text-white"><ExternalIcon size={20} /></span>
        </a>
      )}
    </div>
  );
}

/* ---------- PC image column (single or grid) ---------- */
function PCImageColumn({ section }: { section: SectionData }) {
  if (section.images.length === 1) {
    return (
      <div className="aspect-[700/500] w-full overflow-hidden rounded-[16px] bg-grayscale-200 relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={section.images[0]} alt={section.heading} className="absolute inset-0 size-full object-cover" />
      </div>
    );
  }
  if (section.images.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-[20px] w-full">
        {section.images.map((src, i) => (
          <div key={i} className="aspect-[340/500] overflow-hidden rounded-[16px] bg-grayscale-200 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="absolute inset-0 size-full object-cover" />
          </div>
        ))}
      </div>
    );
  }
  // 4 images grid 2x2
  return (
    <div className="grid grid-cols-2 gap-[20px] w-full">
      {section.images.slice(0, 4).map((src, i) => (
        <div key={i} className="aspect-square overflow-hidden rounded-[12px] bg-grayscale-200 relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt="" className="absolute inset-0 size-full object-cover" />
        </div>
      ))}
    </div>
  );
}

/* ---------- PC section row (alternating layout) ---------- */
function PCSection({ section, reversed }: { section: SectionData; reversed: boolean }) {
  return (
    <div className="grid grid-cols-2 gap-[80px] items-start w-full">
      {reversed ? (
        <>
          <PCImageColumn section={section} />
          <PCTextColumn section={section} />
        </>
      ) : (
        <>
          <PCTextColumn section={section} />
          <PCImageColumn section={section} />
        </>
      )}
    </div>
  );
}

/* ---------- Mobile section ---------- */
function MobileSection({ section }: { section: SectionData }) {
  return (
    <div className="flex flex-col gap-[32px] w-full">
      <div className="flex flex-col gap-[14px] items-start">
        <p className="font-pretendard font-bold leading-[1.2] text-primary tracking-[-1.3px]" style={{ fontSize: 36 }}>{section.heading}</p>
        <p className="font-pretendard leading-[1.2] text-grayscale-900 tracking-[-0.48px]" style={{ fontSize: 24, fontWeight: 800 }}>{section.subTitle}</p>
      </div>
      <div className="flex flex-col gap-[14px] items-start font-pretendard leading-[1.5] text-grayscale-700 tracking-[-0.32px]" style={{ fontSize: 16 }}>
        {section.body.map((p, i) => (
          <p key={i} className="leading-[1.5]" style={{ marginBottom: 0 }}>{p}</p>
        ))}
      </div>

      {section.images.length === 1 && (
        <div className="w-full overflow-hidden rounded-[12px] aspect-[350/240] relative bg-grayscale-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={section.images[0]} alt={section.heading} className="absolute inset-0 size-full object-cover" />
        </div>
      )}
      {section.images.length === 2 && (
        <div className="grid grid-cols-2 gap-[12px] w-full">
          {section.images.map((src, i) => (
            <div key={i} className="aspect-[170/240] overflow-hidden rounded-[12px] bg-grayscale-200 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="absolute inset-0 size-full object-cover" />
            </div>
          ))}
        </div>
      )}
      {section.images.length === 4 && (
        <div className="grid grid-cols-2 gap-[10px] w-full">
          {section.images.map((src, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-[8px] bg-grayscale-200 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="absolute inset-0 size-full object-cover" />
            </div>
          ))}
        </div>
      )}

      {section.subHeading && section.subBody && (
        <div className="flex flex-col gap-[12px] items-start">
          <p className="font-pretendard font-bold leading-[1.3] text-grayscale-900 tracking-[-0.32px]" style={{ fontSize: 16 }}>{section.subHeading}</p>
          <div className="flex flex-col gap-[10px] items-start font-pretendard leading-[1.5] text-grayscale-700 tracking-[-0.32px]" style={{ fontSize: 16 }}>
            {section.subBody.map((p, i) => (
              <p key={i} className="leading-[1.5]" style={{ marginBottom: 0 }}>{p}</p>
            ))}
          </div>
        </div>
      )}

      {section.cta && (
        <a
          href={section.cta.href}
          className="bg-primary inline-flex items-center justify-center gap-[8px] px-[20px] py-[14px] cursor-pointer hover:opacity-90 transition-opacity self-start"
          style={{ borderTopLeftRadius: 16, borderBottomRightRadius: 16 }}
        >
          <span className="font-pretendard font-bold leading-[1.5] text-white tracking-[-0.32px] whitespace-nowrap" style={{ fontSize: 14 }}>{section.cta.label}</span>
          <span className="block size-[16px] text-white"><ExternalIcon size={16} /></span>
        </a>
      )}
    </div>
  );
}

/* =================================================================== */
/* MAIN                                                                 */
/* =================================================================== */
export default function Subpage3() {
  const innerRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(7800);

  useEffect(() => {
    const measure = () => {
      if (innerRef.current) {
        setContentHeight(innerRef.current.scrollHeight);
      }
    };
    measure();
    // re-measure after images load
    const t = setTimeout(measure, 500);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // React to nav links like #h3-korea / #h3-regional / #h3-culture / #h3-goods
  useEffect(() => {
    const handler = (e: Event) => {
      const subKey = (e as CustomEvent<{ subKey?: string }>).detail?.subKey;
      if (!subKey) return;
      const root = rootRef.current;
      if (!root) return;
      const slide = root.closest("[data-slide]") as HTMLElement | null;
      if (!slide) return;
      const isMobile = window.matchMedia("(max-width: 1023.98px)").matches;
      const targets = root.querySelectorAll<HTMLElement>(`[data-section="${subKey}"]`);
      const target = Array.from(targets).find((el) => el.offsetParent !== null);
      if (!target) return;
      const offsetTop =
        target.getBoundingClientRect().top - slide.getBoundingClientRect().top + slide.scrollTop;
      slide.scrollTo({ top: offsetTop - (isMobile ? 80 : 0), behavior: "smooth" });
    };
    window.addEventListener("nav-h3", handler);
    return () => window.removeEventListener("nav-h3", handler);
  }, []);

  return (
    <div ref={rootRef} className="bg-grayscale-100">
      {/* ============================== MOBILE: all carousel items unrolled vertically ============================== */}
      <div className="lg:hidden bg-grayscale-100 flex flex-col items-center gap-[80px] px-[20px] py-[84px]">
        <div className="flex flex-col gap-[14px] items-center w-full text-center">
          <p className="font-montserrat font-bold leading-none tracking-[-0.96px] text-grayscale-400" style={{ fontSize: 24 }}>What We Do</p>
          <p className="font-pretendard leading-[1.2] text-grayscale-900 tracking-[-1.5px]" style={{ fontSize: 50 }}>길의 본질부터</p>
          <p className="font-pretendard font-bold leading-[1.2] text-grayscale-900 tracking-[-1.5px]" style={{ fontSize: 50 }}>일상의 가치까지,</p>
          <p className="font-pretendard font-bold leading-[1.2] text-grayscale-900 tracking-[-1.5px]" style={{ fontSize: 50 }}>통합적인 솔루션을 제안합니다.</p>
        </div>
        {/* Section 1: 코리아둘레길 — 6개 항목 */}
        {KOREA_ITEMS.map((item, i) => (
          <MobileItemCard key={item.id} item={item} sectionKey={i === 0 ? "korea" : undefined} />
        ))}
        {/* Section 2: 지역길 조사 및 연구 — 2개 항목 */}
        {REGIONAL_ITEMS.map((item, i) => (
          <MobileItemCard key={item.id} item={item} sectionKey={i === 0 ? "regional" : undefined} />
        ))}
        {/* Section 3: 걷기기반 문화 프로그램 — 5개 항목 */}
        {CULTURE_ITEMS.map((item, i) => (
          <MobileItemCard key={item.id} item={item} sectionKey={i === 0 ? "culture" : undefined} />
        ))}
        {/* Section 4: 굿즈 기획 및 판매 — 3개 항목, 각각 스토어 바로가기 버튼 */}
        {GOODS_ITEMS.map((item, i) => (
          <MobileItemCard key={item.id} item={item} hasStoreButton sectionKey={i === 0 ? "goods" : undefined} />
        ))}
      </div>
      <MobileFooter />

      {/* ============================== DESKTOP: vertical stack with 2-column alternating layout ============================== */}
      <div className="hidden lg:block relative z-0 w-full overflow-hidden bg-grayscale-100" style={{ height: `calc(100vw * ${contentHeight} / 1920)` }}>
        <div className="origin-top-left" style={{ width: 1920, transform: "scale(calc(100vw / 1920px))", transformOrigin: "top left" }}>
          <div ref={innerRef} className="flex flex-col" style={{ width: 1920 }}>
            {/* Header — "What We Do" + heading */}
            <div className="px-[200px] pt-[160px] pb-[260px] flex flex-col gap-[42px] items-start">
              <p className="font-montserrat font-bold leading-none tracking-[-1.28px] text-grayscale-400" style={{ fontSize: 32 }}>What We Do</p>
              <div className="font-pretendard text-grayscale-900 tracking-[-1px]">
                <p className="leading-[1.1] font-normal" style={{ fontSize: 100 }}>길의 본질부터 일상의 가치까지,</p>
                <p className="leading-[1.1] font-bold" style={{ fontSize: 100 }}>통합적인 솔루션을 제안합니다.</p>
              </div>
            </div>

            {/* 4 sections — all carousels. pb-[320] gives wider space before footer. */}
            <div className="px-[200px] pb-[320px] flex flex-col gap-[480px]">
              <div data-section="korea"><PCKoreaCarousel /></div>
              <div data-section="regional"><PCRegionalCarousel /></div>
              <div data-section="culture"><PCCultureCarousel /></div>
              <div data-section="goods"><PCGoodsCarousel /></div>
            </div>

            {/* Footer */}
            <div style={{ width: 1920, height: FOOTER_HEIGHT }}>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
