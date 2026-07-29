# GitHub Pages 프로필 포트폴리오 사이트 설계

## 1. 개요

정보보안/DevSecOps 신입 지원용 개인 포트폴리오 사이트. `Zman927.github.io` 저장소로
GitHub Pages에 배포하는 독립 정적 웹사이트다. 채용담당자가 짧은 시간에 이력·기술
스택·프로젝트를 훑어볼 수 있는 것이 최우선 목표이며, 화려한 연출보다 신뢰감 있는
정보 전달에 집중한다.

## 2. 목표 / 비목표

**목표**
- 이력서(`이력서_허진오.md`) 내용을 웹으로 재구성해 링크 하나로 공유 가능하게 함
- 프로젝트 4개(익명 게시판 CRUD, 컨테이너 보안 파이프라인, 웹 해킹 교육 플랫폼, 쇼핑몰)를
  카드 형태로 요약 소개
- 모바일에서도 무리 없이 읽히는 반응형 레이아웃

**비목표**
- 블로그/TIL 기능, CMS, 다크모드 등은 이번 범위에 넣지 않는다 (YAGNI)
- 백엔드/서버 없음 — 완전한 정적 페이지
- 프로젝트별 상세 페이지 분리는 하지 않는다 (한 페이지 스크롤로 확정)

## 3. 기술 스택

| 영역 | 선택 |
|------|------|
| 마크업/스타일 | 순수 HTML5 + CSS3 (빌드 도구, 프레임워크 없음) |
| 상호작용 | 최소한의 JS (스무스 스크롤, 모바일 네비 토글 정도) |
| 배포 | GitHub Pages — 저장소 `Zman927.github.io`, `main` 브랜치 루트 서빙 |
| 폰트 | 시스템 산세리프 스택 (`-apple-system, "Segoe UI", sans-serif`) — 외부 폰트 CDN 의존 없음 |

## 4. 정보 구조 (콘텐츠)

한 페이지 스크롤, 상단 고정 네비게이션으로 각 섹션에 앵커 이동.

```
[Nav] HEO JINOH · Home · About · Skills · Projects · Contact
├─ Hero
│    이름, "정보보안 / DevSecOps 지망생", 한 줄 소개
│    ("Docker·Trivy·GitHub Actions로 보안 파이프라인을 만듭니다" 류)
│    CTA 버튼 → Projects 섹션으로 스크롤
│
├─ About
│    짧은 자기소개 2~3문장 (자소서 소재의 "왜?"라는 질문으로 성장 스토리 압축)
│    학력: 명지전문대학교 컴퓨터보안공학과 전공심화, 2027.02 졸업 예정, 학점 4.2/4.5
│    병역: 육군 만기 전역
│
├─ Skills
│    카테고리별 배지 나열
│    - Languages: Java, Python, C
│    - Infra/DevOps: Docker, GitHub Actions, Trivy
│    - Backend/Runtime: Node.js
│    - Frontend: Vue.js, HTML/CSS/JS
│    - Database: SQL, MongoDB
│
├─ Projects (카드 4개, 최신순)
│    1. 익명 게시판 CRUD (개인 프로젝트)
│       로그인 없는 CRUD 게시판. Vercel Serverless Functions + MongoDB Atlas.
│       게시글/댓글 CRUD, 비밀번호 기반 권한, 페이지네이션.
│       배지: HTML/CSS/JS, Vercel, MongoDB
│       GitHub 링크: (배포/푸시 완료 후 연결 — 4.1절 참고)
│
│    2. 컨테이너 보안 파이프라인 구축 (개인 프로젝트)
│       Docker·Trivy·GitHub Actions로 이미지 취약점 스캔부터 CI 보안 게이트까지 구축.
│       Trivy 스캔으로 20건(HIGH 18, CRITICAL 2) 발견 → 베이스 이미지를
│       Alpine으로 교체해 0건으로 제거. ignore-unfixed 설정의 허점을 발견해
│       게이트용/리포트용 2단계 스캔 정책으로 개선.
│       배지: Docker, Trivy, GitHub Actions
│       GitHub 링크: github.com/Zman927/docker-python-first
│
│    3. 웹 해킹 보안 교육 플랫폼 (캡스톤디자인, 4인 팀 · 프론트엔드 담당)
│       클라이언트/서버 사이드 웹 취약점을 실습하는 교육 플랫폼.
│       Docker 기반 실습 환경 구축, Vue.js로 프론트엔드 전담 구현.
│       JWT 인증 오류를 라이브러리 버전 충돌로 규명·해결. 교내 경진대회 본선 진출.
│       배지: Vue.js, Docker
│       GitHub 링크: 없음 (팀 프로젝트 중 프론트엔드만 담당, 개인 저장소 없음) — 텍스트 카드로만 소개
│
│    4. 쇼핑몰 웹사이트 (개인 프로젝트)
│       Node.js 기반 쇼핑몰 프론트엔드 단독 개발. 상품 목록·화면 구성 구현.
│       배지: Node.js, HTML
│       GitHub 링크: 없음 (별도 저장소로 관리되지 않음) — 텍스트 카드로만 소개
│
└─ Contact
     이메일: wlddj67@gmail.com (mailto 링크)
     GitHub: github.com/Zman927
     전화번호는 공개하지 않는다.
```

### 4.1 익명 게시판 프로젝트 링크 처리

`C:/Claude/WebService`는 아직 GitHub 원격 저장소가 없다(로컬 전용, Vercel 배포도 보류
상태). 포트폴리오 카드 자체는 이번 범위에 포함하되, GitHub 링크는 실제 저장소가
푸시된 뒤 연결한다. 그 전까지는 링크 없이 카드 텍스트만 노출한다.

## 5. 미해결 항목 (진행 전 확인 필요)

- 익명 게시판 프로젝트는 GitHub 푸시 후 링크 연결 (4.1절). 그 전까지는 링크 없이
  텍스트 카드로만 노출한다.

## 6. 비주얼 디자인 스펙

브레인스토밍 중 3안(A/B/C) 목업을 비교해 **A안(미니멀 프로페셔널)**로 확정.

- 배경: 흰색(#ffffff)
- 포인트 컬러: 짙은 네이비(#1a1a2e 계열)
- 본문 텍스트: 다크 그레이(#333 계열), 보조 텍스트는 연한 그레이(#666~#888)
- 폰트: 시스템 산세리프
- 프로젝트 카드: 옅은 테두리/그림자로 구분, 배지는 네이비 배경 흰 텍스트의 작은 pill 형태
- 버튼(CTA): 네이비 배경, 흰 텍스트, 각진 사각형에 가까운 낮은 radius

## 7. 반응형 전략

뷰포트 폭 600px 이하에서:
- 상단 네비게이션은 햄버거 토글 또는 세로 스택으로 전환
- Projects 카드 그리드는 다열 → 1열로 전환
- Hero 폰트 크기 축소

## 8. 파일 구조

```
Zman927.github.io/          (= C:/Claude/portfolio, GitHub 저장소 루트)
├── index.html               모든 섹션 포함 단일 HTML
├── css/
│   └── style.css
├── js/
│   └── main.js               스무스 스크롤, 모바일 네비 토글
└── docs/
    └── superpowers/           (설계 문서, 배포 산출물에는 영향 없음)
```

## 9. 배포 절차

1. GitHub에 `Zman927.github.io` 이름의 public 저장소 생성 (이름은 정확히 일치해야 함)
2. 로컬 저장소(`C:/Claude/portfolio`)를 해당 원격에 연결 후 `main` 브랜치 푸시
3. GitHub Settings → Pages에서 소스가 `main` 브랜치 루트로 잡혀 있는지 확인
   (레포지토리 이름이 `<username>.github.io` 형식이면 보통 자동 활성화됨)
4. `https://zman927.github.io` 접속 확인

## 10. 검증 전략

서버 로직이 없는 순수 정적 페이지이므로 자동화 테스트 스위트는 만들지 않는다.

- 로컬에서 `index.html`을 브라우저로 직접 열어(또는 간단한 정적 서버로) 각 섹션이
  의도대로 렌더링되는지 확인
- 모든 외부 링크(GitHub, mailto)가 올바른 대상으로 연결되는지 클릭 확인
- 브라우저 개발자 도구로 모바일 폭(예: 375px)에서 레이아웃이 깨지지 않는지 확인
- 배포 후 실제 `zman927.github.io` URL에서 위 항목 재확인
