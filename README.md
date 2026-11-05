# 하이브리드 클라우드 기반 AI 서비스 플랫폼 운영 엔지니어 양성과정 — 안내 웹사이트

한국정보교육원 2026 K-디지털 트레이닝(신기술과정) 과정 안내 페이지입니다.
HTML · CSS · JavaScript(라이브러리 없음)로 만든 정적 사이트로, GitHub Pages에 그대로 올려 사용합니다.

## 폴더 구성

```
hybrid-cloud-course/
├── index.html            # 본문 (모든 내용은 HTML에 있음 — JS가 꺼져도 읽힘)
├── css/style.css         # 디자인 토큰 + 반응형 (모바일 <640 / 태블릿 640–1023 / PC ≥1024)
├── js/main.js            # 메뉴, 탭, 용어 검색, 차트 애니메이션, 원본 이미지 보기
├── assets/
│   ├── favicon.svg
│   └── img/
│       ├── work24-institution.png     # 고용24 기관 평균 취업률 캡처
│       └── work24-ncs-occupation.png  # 고용24 NCS 정보기술운영 직종 취업률 캡처
├── DESIGN.md             # 디자인 시스템 (밝은 캔버스 · 파랑 안내 / 분홍 강조)
├── .nojekyll             # GitHub Pages가 파일을 그대로 서비스하도록 설정
└── README.md
```

## GitHub Pages 배포

1. GitHub에서 새 저장소 생성 (예: `hybrid-cloud-course`)
2. 이 폴더 안의 파일 전체를 저장소 최상위에 업로드 (`index.html`이 최상위에 있어야 함)
3. 저장소 **Settings → Pages → Build and deployment**
   - Source: `Deploy from a branch`
   - Branch: `main` / `/(root)` → Save
4. 1~2분 후 `https://<계정명>.github.io/hybrid-cloud-course/` 에서 확인

## 운영 전 수정할 곳

| 항목 | 위치 | 내용 |
|---|---|---|
| 상담 신청 링크 | `js/main.js` `SITE_CONFIG.applyUrl` + `index.html` 상담 신청 버튼 href | 현재 홈페이지 상담 신청 페이지 |
| 카카오톡 상담 | `SITE_CONFIG.kakaoUrl` + `index.html` 카카오톡 버튼 href | 현재 카카오톡 채널 채팅 |
| 상담 전화 | `SITE_CONFIG.phone` | 입력하면 문의 영역에 표시 |
| 취업률 | `index.html` `#results` | 막대 높이는 `style="--v:85.4"` 값, 표 숫자, 캡처 이미지를 함께 교체 |

### 취업률 갱신 방법
1. 고용24에서 새 화면을 캡처해 `assets/img/`의 같은 파일명으로 덮어쓰기
2. `#results`의 각 막대 `style="--v:값"`과 아래 표(`data-table`) 숫자 수정
3. 상단 차이값(`+32.5%p` 등)과 하단 출처 문구의 조회 시점 수정

### 용어 추가 방법
`#glossary-list` 안에 아래 형식으로 한 줄 추가하면 검색·분류에 자동 반영됩니다.
`data-cat` 값: `cloud` · `devops` · `ops` · `ai` · `career`

```html
<div class="term" data-cat="devops"><dt>용어 <span>English</span></dt><dd>설명<em>관련 교과</em></dd></div>
```

## 웹표준·접근성 반영 사항
- 시맨틱 마크업(header/nav/main/section/footer), 본문 바로가기 링크
- 탭은 WAI-ARIA Tabs 패턴(방향키·Home·End 이동), 모바일 메뉴 `aria-expanded`, Esc로 닫기
- 차트는 막대 + 데이터 표를 함께 제공(스크린리더는 표를 읽음)
- 키보드 포커스 링 표시, 터치 영역 44px 이상
- `prefers-reduced-motion` 설정 시 애니메이션 해제, 인쇄용 스타일 포함

## 자료 기준
- 과정 내용: 2026년 K-디지털 트레이닝 훈련운영계획서(2026.07.31)
- 취업률: 고용24 훈련기관 정보 공시 화면(2026년 11월 조회)
- 기관 3년·5년 평균 취업률 80% 이상: 기관 자체 집계(KDT 과정 기준)
