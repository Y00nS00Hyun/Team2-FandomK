# 🎤 FANDOM-K

> 내가 좋아하는 아이돌을 가장 쉽게 덕질 하는 방법 ✨

K-pop 팬을 위한 아이돌 응원 플랫폼입니다. 매달 진행되는 차트 투표에 참여해 내 아티스트를 1등으로 만들고, 모집 중인 조공에 크레딧을 후원하며, 좋아하는 아티스트들의 소식을 한 곳에서 모아볼 수 있습니다.

Codeit 스프린트 프론트엔드 부트캠프 7기 Part 2 · Team 2 프로젝트.

---

## ✨ 주요 기능

### 🏆 이달의 차트 투표
- 남자/여자 아이돌별 월간 인기 차트를 제공합니다.
- 크레딧(1,000 크레딧)을 사용해 좋아하는 아이돌에게 투표할 수 있습니다.
- 투표 직후 차트가 자동 새로고침되어 순위 변동을 즉시 확인할 수 있습니다.

### 💝 후원하기 (조공)
- 모집 중인 조공 리스트를 슬라이드 형태로 탐색합니다.
- 남은 일수와 목표 달성률을 한눈에 확인할 수 있습니다.
- 보유 크레딧을 사용해 원하는 조공에 참여합니다.

### 💰 크레딧 충전
- 마이 크레딧 영역에서 크레딧을 충전합니다.
- 충전 정보는 `localStorage`에 보관되어 새로고침해도 유지됩니다.

### ⭐ 마이페이지 — 나만의 아티스트
- 관심 아이돌을 즐겨찾기로 등록/해제할 수 있습니다.
- 즐겨찾기 목록은 디바이스에 보관되어 다음 방문 시에도 유지됩니다.

### 📱 반응형 UI
- 모바일(<768px) / 태블릿(<1200px) / 데스크탑(≥1200px) 세 가지 브레이크포인트 대응.
- Swiper, Slick 등의 인터랙션을 디바이스별로 최적화해 제공합니다.

---

## 🛠️ 기술 스택

| 영역 | 사용 라이브러리 |
| --- | --- |
| 코어 | React 18, React Router v6, Create React App |
| 스타일 | styled-components, CSS Modules |
| 인터랙션 | Swiper, react-slick, react-marquee-slider, react-spinners, react-slot-counter, react-transition-group, canvas-confetti, countup.js, progressbar.js |
| 유틸 | lodash, react-helmet-async |
| 아이콘 | Font Awesome |

---

## 📁 디렉터리 구조

```
src/
├── api/                # FANDOM-K REST API 클라이언트
│   ├── config.js       # API_BASE_URL 등 공통 설정
│   ├── httpClient.js   # fetch 래퍼 (GET / POST / PUT / PATCH / DELETE)
│   ├── chartsApi.js    # 차트 / 투표 결과
│   ├── donationsApi.js # 조공 모집 / 후원
│   ├── idolsApi.js     # 아이돌 목록
│   └── voteApi.js      # 투표 등록
├── assets/             # 이미지 / 아이콘
├── components/         # 재사용 컴포넌트 (Button, Avatar, Modal …)
├── context/            # 전역 상태 (MyCreditContext)
├── hooks/              # 커스텀 훅 (useAsync, useMediaQuery)
├── layout/             # RootHeader / RootFooter
├── pages/
│   ├── LandingPage/    # 랜딩 (스크롤 패럴랙스 인트로)
│   ├── ListPage/       # 메인: 크레딧, 조공, 차트
│   ├── MyPage/         # 마이페이지: 즐겨찾기 관리
│   └── PageNotFound/   # 404
├── App.jsx             # 레이아웃 셸 (헤더/푸터/Outlet)
├── Main.jsx            # 라우터 + HelmetProvider
└── index.jsx           # 엔트리
```

---

## 🌐 API

API는 외부 FANDOM-K 서버(`https://fandom-k-api.vercel.app/7-2`)를 사용합니다. 베이스 URL은 [`src/api/config.js`](src/api/config.js)에서 관리합니다.

| 메서드 | 엔드포인트 | 모듈 | 설명 |
| --- | --- | --- | --- |
| GET | `/charts/{gender}` | `chartsApi.getChartData` | 성별별 월간 차트 조회 (cursor 페이지네이션) |
| POST | `/votes` | `voteApi.voteIdol` | 아이돌 투표 등록 |
| GET | `/donations` | `donationsApi.getDonationList` | 조공 모집 리스트 |
| PUT | `/donations/:id/contribute` | `donationsApi.donateCredit` | 크레딧 후원 (최소 1,000) |
| GET | `/idols` | `idolsApi.getIdolList` | 아이돌 검색/목록 |

비동기 호출에는 [`useAsync`](src/hooks/useAsync.js)를 통해 pending / error / refetch 상태를 일괄 관리합니다.

---

## 🚀 시작하기

### 요구 사항
- Node.js 18 이상 권장
- npm 9 이상

### 설치 및 실행
```bash
npm install
npm start
```
개발 서버는 [http://localhost:3000](http://localhost:3000)에서 실행됩니다.

### 프로덕션 빌드
```bash
npm run build
```
빌드 산출물은 `build/` 폴더에 생성됩니다.

### 테스트
```bash
npm test
```

---

## 🧭 라우트

| 경로 | 컴포넌트 | 설명 |
| --- | --- | --- |
| `/` | `LandingPage` | Swiper 패럴랙스 인트로 (헤더/푸터 숨김) |
| `/list` | `ListPage` | 크레딧 + 조공 + 차트 |
| `/mypage` | `MyPage` | 즐겨찾기 아이돌 / 추가 |
| `*` | `PageNotFound` | 404 |

---

## 👥 팀

Codeit Sprint Front-End Bootcamp · 7th Cohort · Part2 — Team 2

> Sprinter 모임

---

## 📄 라이선스

© Codeit7. All rights reserved.
