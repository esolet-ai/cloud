---
version: 2.0
name: hybrid-cloud-ops-course
description: 한국정보교육원 「하이브리드 클라우드 기반 AI 서비스 플랫폼 운영 엔지니어 양성과정」 안내 웹사이트 디자인 시스템. 국내 커머스 디자인 시스템 분석 문서(gs-shop design.md)의 시각 처리 — 밝은 캔버스, 2색 역할 분리, 8px 버튼과 12~16px 카드, 얕은 그림자, 제목 1.25 / 본문 1.5 타입 리듬 — 를 교육과정 안내 맥락으로 옮겼다. 원본 브랜드의 이름·로고·클래스 체계는 가져오지 않는다.

colors:
  ## Brand — Blue : 안내·구조
  brand: "#0F78FF"          # 섹션 라벨, 단계 번호, 탭 인디케이터, 링크, 정규교과 막대, 성과 띠 배경
  brand-dark: "#0A61EB"
  brand-middle: "#2C8AFC"
  brand-light: "#ECF4FE"    # 정보형 배지 바탕
  ## Action — Pink : 행동·성과
  cta: "#FF2F93"            # 상담 신청 버튼, 기관 취업률 막대, 프로젝트 표시
  cta-active: "#E5157A"     # 눌림·hover (원본 미정의, 파생값)
  cta-light: "#FEF1F8"      # 검색어 하이라이트 바탕
  accent: "#ED0777"         # 성과 수치·차이값(+32.5%p) 글자
  ## Content
  ink: "#191923"            # 제목·본문 강조
  ink-2: "#424252"          # 본문
  ink-3: "#72728A"          # 보조 설명
  ink-4: "#9595B2"          # placeholder, 비활성
  ## Background & Border
  bg: "#FFFFFF"
  bg-2: "#F9FAFC"           # 카드 내부 패널
  bg-3: "#F5F6FA"           # 교차 섹션 바탕, 입력창
  border: "#D2D4E5"         # 아웃라인 버튼, 차트 비교 막대
  border-2: "#EAECF5"       # 카드·행 구분선
  ## Dark sub-section (히어로·프로젝트·CTA·푸터)
  dark: "#191923"
  dark-raised: "#22222F"
  dark-line: "#34344A"

typography:
  family: "'Pretendard Variable', Pretendard, -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif"
  display-mega: { size: "clamp(34px, 5.4vw, 60px)", weight: 700, lineHeight: 1.25 }
  display-xl:   { size: "clamp(26px, 3.4vw, 38px)", weight: 700, lineHeight: 1.3 }
  display-lg:   { size: "clamp(22px, 2.6vw, 30px)", weight: 700, lineHeight: 1.35 }
  title:        { size: "18–20px", weight: 700, lineHeight: 1.35 }
  label:        { size: "12–16px", weight: 600, lineHeight: 1.25 }
  body:         { size: "14–16px", weight: 400, lineHeight: 1.6 }   # 원본 1.5 → 한글 장문 가독성 위해 1.6
  number:       { size: "clamp(36px, 4.8vw, 60px)", weight: 800, letterSpacing: "-0.04em" }
  letterSpacing: "-0.025em (제목·버튼) / -0.01em (본문)"

rounded: { m: 8px (버튼·입력창·아이콘 박스), l: 12px (용어 카드·문서 타일), xl: 16px (카드·패널·차트), pill: 9999px (배지·칩·필터) }
spacing: "4px 배수. 카드 간격 12px, 카드 내부 20–32px, 섹션 64–104px"
elevation:
  shadow-1: "0 1px 8px rgba(0,0,0,.08)"   # 스크롤 시 헤더, 용어 카드 hover
  shadow-4: "0 3px 20px rgba(0,0,0,.08)"  # 카드 hover
motion:
  standard: "cubic-bezier(.68,0,.28,1)"   # 탭·아코디언
  decelerate: "cubic-bezier(.23,1,.5,1)"  # 스크롤 진입 (300ms 이상)
  button: "all .2s ease-in-out"
---

# 디자인 원칙 — "흰 지면, 파랑은 길잡이, 분홍은 한 방"

## 1. 색 역할 분리 (가장 중요한 규칙)

| 역할 | 색 | 쓰는 곳 |
|---|---|---|
| 안내·구조 | 파랑 `brand` | 섹션 라벨 배지, STEP·번호, 탭 밑줄, 링크, 정규교과 막대, 80% 성과 띠 배경 |
| 행동 | 분홍 `cta` | 상담 신청 버튼 (화면당 1개) |
| 성과·강조 | 분홍 `cta`/`accent` | 기관 취업률 막대·수치, 차이값(+%p), 80%+ 숫자 카드, 프로젝트 표시 |
| 비교 기준 | 회색 `border` | 소재지역·직종 평균 막대 |

- 파랑은 넓게 깔지 않는다. 배지·선·번호처럼 **작은 면적**에만 쓰고, 넓은 면은 성과 띠 1곳뿐이다.
- 분홍은 "눈이 가야 할 곳"에만 쓴다. 한 화면에 분홍 면이 2개를 넘지 않게 한다.
- 두 색이 한 화면에 있으면 분홍이 최종 행동·결론이다.

## 2. 영역 배치

| 영역 | 바탕 |
|---|---|
| 헤더 | 흰 앱바 + 하단 1px 선, 스크롤 시 shadow-1 |
| 히어로 · 숫자 카드 | 다크 서브섹션 (파랑·분홍 은은한 광원) |
| 과정소개 · 수료 후 · 취업성과 · 용어사전 · FAQ | 흰색 |
| 커리큘럼 · 참여기업 · 지원안내 | `bg-3` 연회색 |
| 프로젝트 | 다크 서브섹션 |
| 80% 성과 띠 | 파랑 풀블리드 그라데이션 (페이지당 1회) |
| 상담 신청 · 푸터 | 다크 |

## 3. 컴포넌트

| 컴포넌트 | 규격 |
|---|---|
| `btn-primary` | 분홍 바탕, 흰 글자, 높이 48px, radius 8px, 16px/600 |
| `btn-outline` | 투명 바탕, 1px `border`, radius 8px |
| `label` (섹션 라벨) | 높이 28px pill, `brand-light` 바탕 + `brand` 글자 |
| `card` | 흰 바탕, 1px `border-2`, radius 16px, hover 시 shadow-4 + 2px 상승 |
| `ops-flow` (탭) | 라인 탭. 선택 항목은 700 굵기 + 파랑 3px 밑줄 |
| `phase` (커리큘럼 단계) | 카드형. 교과별 시간 막대(정규=파랑, 프로젝트=분홍) |
| `chart` | 카드 안 막대차트 + 데이터 표. 막대 상단 radius 6px |
| `chip` (용어 필터) | 높이 36px pill. 선택 시 `ink` 바탕 + 흰 글자 |
| `search` | 높이 48px, `bg-3` 바탕, 포커스 시 흰 바탕 + `ink` 테두리 |
| `faq` | 카드형 아코디언, 행 최소 56px, "Q" 파랑 표시 |
| `spec-cell` | 다크 위 카드 4개, 마지막(80%+)만 분홍 면 |

## 4. 반응형
- small(<600px): 1열, 숫자 카드 2×2, 전체화면 흰 메뉴, 일정표 카드형 재배치, 필터 칩 가로 스크롤
- medium(600–1023px): 카드 2열, 히어로 1단
- large(≥1024px): 콘텐츠 최대폭 1080px, 커리큘럼 4단, 카드 3열
- 터치 영역 최소 44px (버튼 48px, 칩 36px + 행 간격)

## 5. 하지 말 것
- 파랑을 큰 면적 배경으로 반복하지 않는다 (성과 띠 1곳만).
- 분홍을 장식·제목색으로 쓰지 않는다.
- 원본 커머스 브랜드의 이름, 워드마크, 클래스 접두, 아이콘 체계를 쓰지 않는다.
- 편성표·ON AIR·카운트다운 같은 근거 없는 긴급성 장치를 넣지 않는다.
- 근거 없는 수치·과장 문구 금지. 모든 수치에 출처 또는 기준 시점을 붙인다.
