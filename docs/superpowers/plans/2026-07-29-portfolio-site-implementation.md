# GitHub Pages 포트폴리오 사이트 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `Zman927.github.io`에 배포할 정보보안/DevSecOps 신입 지원용 한 페이지 포트폴리오 사이트를 순수 HTML/CSS/JS로 만든다.

**Architecture:** 단일 `index.html`에 Hero/About/Skills/Projects/Contact 5개 섹션을 앵커 네비게이션으로 연결한 한 페이지 스크롤 사이트. 스타일은 `css/style.css` 하나, 상호작용(모바일 메뉴 토글)은 `js/main.js` 하나로 최소화한다. 백엔드 없음, 빌드 도구 없음.

**Tech Stack:** HTML5, CSS3(커스텀 프로퍼티 + 미디어쿼리), Vanilla JS. 외부 CDN/폰트/프레임워크 없음. 배포는 GitHub Pages.

## Global Constraints

- 순수 HTML5 + CSS3, 빌드 도구·프레임워크 사용 금지
- 외부 폰트 CDN 의존 없음 — 시스템 산세리프 스택만 사용
- 한 페이지 스크롤 구조 유지 — 프로젝트별 상세 페이지 분리 금지
- 반응형 브레이크포인트: 600px 이하
- 자동화 테스트 스위트를 만들지 않는다 — 각 태스크는 브라우저 수동 확인으로 검증한다
- 저장소 이름은 정확히 `Zman927.github.io`, `main` 브랜치 루트에서 서빙
- 전화번호는 노출하지 않는다 — 연락처는 이메일(`wlddj67@gmail.com`)과 GitHub(`https://github.com/Zman927`)만
- 캡스톤(웹 해킹 교육 플랫폼)·쇼핑몰 프로젝트는 GitHub 링크 없이 텍스트 카드로만 소개
- 익명 게시판 프로젝트는 아직 GitHub에 푸시되지 않았으므로 링크 없이 텍스트 카드로만 소개 (추후 별도 작업으로 연결)

---

## File Structure

```
C:/Claude/portfolio/
├── index.html
├── css/
│   └── style.css
└── js/
    └── main.js
```

---

### Task 1: 스캐폴드 + Nav + Hero 섹션

**Files:**
- Create: `index.html`
- Create: `css/style.css`

**Interfaces:**
- Produces (CSS 커스텀 프로퍼티, 이후 태스크가 재사용):
  `--color-bg`, `--color-navy`, `--color-navy-dark`, `--color-text`,
  `--color-text-secondary`, `--color-text-muted`, `--color-border`,
  `--radius-sm`, `--max-width`, `--font-base`
- Produces (재사용 클래스): `.container`, `.btn`, `.navbar`, `.nav-links`, `.hero`
- Produces (HTML 앵커): `#home`

- [ ] **Step 1: 디렉터리 생성**

```bash
mkdir -p "C:/Claude/portfolio/css" "C:/Claude/portfolio/js"
```

- [ ] **Step 2: `css/style.css` 작성**

```css
:root {
  --color-bg: #ffffff;
  --color-navy: #1a1a2e;
  --color-navy-dark: #12121f;
  --color-text: #333333;
  --color-text-secondary: #666666;
  --color-text-muted: #888888;
  --color-border: #e5e5e5;
  --radius-sm: 4px;
  --max-width: 960px;
  --font-base: -apple-system, BlinkMacSystemFont, "Segoe UI", "Malgun Gothic", sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-base);
  color: var(--color-text);
  background: var(--color-bg);
  line-height: 1.6;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
}

/* Navbar */
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
}

.navbar .container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.navbar .logo {
  font-weight: 700;
  letter-spacing: 0.05em;
}

.navbar .nav-links {
  display: flex;
  gap: 24px;
}

.navbar .nav-links a {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.navbar .nav-links a:hover {
  color: var(--color-navy);
}

/* Hero */
.hero {
  padding: 96px 0 72px;
  text-align: center;
}

.hero .eyebrow {
  display: inline-block;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-navy);
  background: #eef0f7;
  padding: 4px 12px;
  border-radius: 999px;
  margin-bottom: 16px;
}

.hero h1 {
  font-size: 36px;
  font-weight: 800;
  margin-bottom: 12px;
}

.hero p {
  font-size: 16px;
  color: var(--color-text-secondary);
  max-width: 480px;
  margin: 0 auto 28px;
}

.btn {
  display: inline-block;
  background: var(--color-navy);
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  padding: 12px 28px;
  border-radius: var(--radius-sm);
  border: none;
  cursor: pointer;
}

.btn:hover {
  background: var(--color-navy-dark);
}
```

- [ ] **Step 3: `index.html` 작성**

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>허진오 — 정보보안 / DevSecOps 포트폴리오</title>
  <meta name="description" content="정보보안 / DevSecOps 지망생 허진오의 포트폴리오">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <nav class="navbar">
    <div class="container">
      <a href="#home" class="logo">HEO JINOH</a>
      <ul class="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  </nav>

  <header id="home" class="hero">
    <div class="container">
      <span class="eyebrow">정보보안 / DevSecOps 지망생</span>
      <h1>허진오</h1>
      <p>Docker·Trivy·GitHub Actions로 보안 파이프라인을 만듭니다.</p>
      <a href="#projects" class="btn">프로젝트 보기</a>
    </div>
  </header>

</body>
</html>
```

- [ ] **Step 4: 브라우저에서 확인**

```bash
powershell -Command "Start-Process 'C:\Claude\portfolio\index.html'"
```

확인할 것: 상단 네비게이션(HEO JINOH + 5개 링크)이 보이는지, Hero 섹션에 이름·태그라인·"프로젝트 보기" 버튼이 흰 배경/네이비 톤으로 렌더링되는지. (다른 섹션이 없으므로 About/Skills/Projects/Contact 링크는 아직 빈 화면으로 스크롤됨 — 정상)

- [ ] **Step 5: 커밋**

```bash
cd "C:/Claude/portfolio"
git add index.html css/style.css
git commit -m "feat: add scaffold, nav, and hero section"
```

---

### Task 2: About + Skills 섹션

**Files:**
- Modify: `index.html`
- Modify: `css/style.css`

**Interfaces:**
- Consumes: `.container`, `--color-navy`, `--color-text-secondary`, `--color-border` (Task 1)
- Produces: `.section`, `.section-title`, `.about-text`, `.about-facts`, `.skill-groups`, `.skill-group`, `.badge-list`, `.badge` — Task 3(Projects)와 Task 4(반응형)가 재사용
- Produces (HTML 앵커): `#about`, `#skills`

- [ ] **Step 1: `index.html`에 About/Skills 섹션 삽입**

`</header>` 바로 다음, `</body>` 앞에 삽입한다.

```html
  </header>

  <section id="about" class="section about">
    <div class="container">
      <h2 class="section-title">About</h2>
      <p class="about-text">
        "왜?"라는 질문이 생기면 이해될 때까지 파고드는 편입니다. 개발 자체보다
        보안에 관심이 많아 DevSecOps — 개발부터 배포까지 이어지는 보안 파이프라인을
        공부하고 있습니다.
      </p>
      <dl class="about-facts">
        <div class="fact">
          <dt>학력</dt>
          <dd>명지전문대학교 컴퓨터보안공학과 전공심화과정 (2027.02 졸업 예정, 학점 4.2 / 4.5)</dd>
        </div>
        <div class="fact">
          <dt>병역</dt>
          <dd>육군 만기 전역</dd>
        </div>
      </dl>
    </div>
  </section>

  <section id="skills" class="section skills">
    <div class="container">
      <h2 class="section-title">Skills</h2>
      <div class="skill-groups">
        <div class="skill-group">
          <h3>Languages</h3>
          <ul class="badge-list">
            <li class="badge">Java</li>
            <li class="badge">Python</li>
            <li class="badge">C</li>
          </ul>
        </div>
        <div class="skill-group">
          <h3>Infra / DevOps</h3>
          <ul class="badge-list">
            <li class="badge">Docker</li>
            <li class="badge">GitHub Actions</li>
            <li class="badge">Trivy</li>
          </ul>
        </div>
        <div class="skill-group">
          <h3>Backend / Runtime</h3>
          <ul class="badge-list">
            <li class="badge">Node.js</li>
          </ul>
        </div>
        <div class="skill-group">
          <h3>Frontend</h3>
          <ul class="badge-list">
            <li class="badge">Vue.js</li>
            <li class="badge">HTML/CSS/JS</li>
          </ul>
        </div>
        <div class="skill-group">
          <h3>Database</h3>
          <ul class="badge-list">
            <li class="badge">SQL</li>
            <li class="badge">MongoDB</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

</body>
</html>
```

- [ ] **Step 2: `css/style.css` 끝에 스타일 추가**

```css
.section {
  padding: 64px 0;
  border-top: 1px solid var(--color-border);
}

.section-title {
  font-size: 24px;
  font-weight: 800;
  margin-bottom: 32px;
}

/* About */
.about-text {
  color: var(--color-text-secondary);
  max-width: 640px;
  margin-bottom: 32px;
}

.about-facts {
  display: grid;
  gap: 16px;
}

.about-facts .fact {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 16px;
  font-size: 14px;
}

.about-facts dt {
  font-weight: 700;
  color: var(--color-navy);
}

.about-facts dd {
  color: var(--color-text-secondary);
}

/* Skills */
.skill-groups {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
}

.skill-group h3 {
  font-size: 14px;
  font-weight: 700;
  color: var(--color-text-secondary);
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.badge-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.badge {
  background: var(--color-navy);
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 999px;
}
```

- [ ] **Step 3: 브라우저에서 확인**

```bash
powershell -Command "Start-Process 'C:\Claude\portfolio\index.html'"
```

확인할 것: 상단 "About" 링크 클릭 시 학력/병역 정보로 스무스 스크롤 이동, "Skills" 링크 클릭 시 5개 카테고리 배지가 네이비 pill 형태로 나열되는지.

- [ ] **Step 4: 커밋**

```bash
cd "C:/Claude/portfolio"
git add index.html css/style.css
git commit -m "feat: add about and skills sections"
```

---

### Task 3: Projects(카드 4개) + Contact + Footer 섹션

**Files:**
- Modify: `index.html`
- Modify: `css/style.css`

**Interfaces:**
- Consumes: `.section`, `.section-title`, `.about-text`, `.badge-list`, `.badge`, `.btn`, `--color-navy`, `--color-border` (Task 1, 2)
- Produces: `.project-grid`, `.project-card`, `.badge-outline`, `.project-link`, `.contact-links`, `.btn-outline`, `.footer` — Task 4(반응형)가 재사용
- Produces (HTML 앵커): `#projects`, `#contact`

- [ ] **Step 1: `index.html`에 Projects/Contact/Footer 삽입**

Skills `</section>` 바로 다음, `</body>` 앞에 삽입한다.

```html
  </section>

  <section id="projects" class="section projects">
    <div class="container">
      <h2 class="section-title">Projects</h2>
      <div class="project-grid">

        <article class="project-card">
          <h3>익명 게시판 CRUD</h3>
          <p class="project-desc">
            로그인 없는 CRUD 게시판. Vercel Serverless Functions와 MongoDB Atlas로
            구현했습니다. 게시글·댓글 CRUD, 비밀번호 기반 권한, 페이지네이션을 지원합니다.
          </p>
          <ul class="badge-list">
            <li class="badge badge-outline">HTML/CSS/JS</li>
            <li class="badge badge-outline">Vercel</li>
            <li class="badge badge-outline">MongoDB</li>
          </ul>
        </article>

        <article class="project-card">
          <h3>컨테이너 보안 파이프라인 구축</h3>
          <p class="project-desc">
            Docker·Trivy·GitHub Actions로 이미지 취약점 스캔부터 CI 보안 게이트까지
            구축했습니다. Trivy 스캔으로 20건(HIGH 18, CRITICAL 2)을 발견해 베이스
            이미지를 Alpine으로 교체, 0건으로 제거했습니다. ignore-unfixed 설정이
            미해결 CRITICAL 취약점을 조용히 통과시키는 허점을 발견해 게이트용·
            리포트용 2단계 스캔 정책으로 개선했습니다.
          </p>
          <ul class="badge-list">
            <li class="badge badge-outline">Docker</li>
            <li class="badge badge-outline">Trivy</li>
            <li class="badge badge-outline">GitHub Actions</li>
          </ul>
          <a class="project-link" href="https://github.com/Zman927/docker-python-first" target="_blank" rel="noopener">GitHub →</a>
        </article>

        <article class="project-card">
          <h3>웹 해킹 보안 교육 플랫폼</h3>
          <p class="project-desc">
            캡스톤디자인 4인 팀 프로젝트(프론트엔드 담당). 클라이언트·서버 사이드
            웹 취약점을 직접 실습하는 교육 플랫폼으로, Docker 기반 실습 환경을
            구축하고 Vue.js로 프론트엔드를 전담 구현했습니다. JWT 인증 오류의
            원인이 라이브러리 버전 충돌임을 규명해 해결했습니다. 교내 캡스톤디자인
            경진대회 본선에 진출했습니다.
          </p>
          <ul class="badge-list">
            <li class="badge badge-outline">Vue.js</li>
            <li class="badge badge-outline">Docker</li>
          </ul>
        </article>

        <article class="project-card">
          <h3>쇼핑몰 웹사이트</h3>
          <p class="project-desc">
            Node.js 기반 쇼핑몰 프론트엔드를 단독으로 개발했습니다. 상품 목록과
            화면 구성 등 사용자 인터페이스를 구현했습니다.
          </p>
          <ul class="badge-list">
            <li class="badge badge-outline">Node.js</li>
            <li class="badge badge-outline">HTML</li>
          </ul>
        </article>

      </div>
    </div>
  </section>

  <section id="contact" class="section contact">
    <div class="container">
      <h2 class="section-title">Contact</h2>
      <p class="about-text">언제든 편하게 연락 주세요.</p>
      <div class="contact-links">
        <a class="btn" href="mailto:wlddj67@gmail.com">이메일 보내기</a>
        <a class="btn btn-outline" href="https://github.com/Zman927" target="_blank" rel="noopener">GitHub 방문하기</a>
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="container">
      <p>&copy; 2026 Heo Jinoh</p>
    </div>
  </footer>

</body>
</html>
```

- [ ] **Step 2: `css/style.css` 끝에 스타일 추가**

```css
/* Projects */
.project-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.project-card {
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.project-card h3 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
}

.project-desc {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin-bottom: 16px;
}

.badge-outline {
  background: transparent;
  color: var(--color-navy);
  border: 1px solid var(--color-navy);
}

.project-link {
  display: inline-block;
  margin-top: 12px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-navy);
}

.project-link:hover {
  text-decoration: underline;
}

/* Contact */
.contact-links {
  display: flex;
  gap: 16px;
}

.btn-outline {
  background: transparent;
  color: var(--color-navy);
  border: 1px solid var(--color-navy);
}

.btn-outline:hover {
  background: #eef0f7;
}

/* Footer */
.footer {
  padding: 24px 0;
  border-top: 1px solid var(--color-border);
  text-align: center;
  font-size: 13px;
  color: var(--color-text-muted);
}
```

- [ ] **Step 3: 브라우저에서 확인**

```bash
powershell -Command "Start-Process 'C:\Claude\portfolio\index.html'"
```

확인할 것:
- Projects 섹션에 카드 4개가 2열 그리드로 표시되는지
- "컨테이너 보안 파이프라인" 카드에만 "GitHub →" 링크가 있고 클릭 시 `github.com/Zman927/docker-python-first`로 이동하는지 (새 탭)
- 캡스톤/쇼핑몰 카드에는 GitHub 링크가 없는지 (텍스트만)
- Contact 섹션의 "이메일 보내기" 버튼이 `mailto:wlddj67@gmail.com`을 여는지, "GitHub 방문하기"가 `github.com/Zman927`로 이동하는지 (새 탭)
- 페이지 최하단에 Footer 저작권 표기가 보이는지

- [ ] **Step 4: 커밋**

```bash
cd "C:/Claude/portfolio"
git add index.html css/style.css
git commit -m "feat: add projects, contact, and footer sections"
```

---

### Task 4: 모바일 네비 토글 + 반응형 CSS

**Files:**
- Modify: `index.html`
- Modify: `css/style.css`
- Create: `js/main.js`

**Interfaces:**
- Consumes: `.navbar`, `.nav-links` (Task 1); `.project-grid`, `.about-facts .fact`, `.contact-links`, `.hero h1`, `.hero p` (Task 1~3)
- Produces: `.nav-toggle`, `.nav-links.open` (JS가 토글하는 클래스) — 이 태스크가 마지막이므로 이후 태스크 없음

- [ ] **Step 1: `index.html`의 navbar에 햄버거 버튼 삽입**

```html
      <a href="#home" class="logo">HEO JINOH</a>
      <button class="nav-toggle" id="navToggle" aria-label="메뉴 열기" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <ul class="nav-links">
```

- [ ] **Step 2: `index.html`의 `</body>` 앞에 스크립트 태그 삽입**

```html
  <footer class="footer">
    <div class="container">
      <p>&copy; 2026 Heo Jinoh</p>
    </div>
  </footer>

  <script src="js/main.js" defer></script>
</body>
</html>
```

- [ ] **Step 3: `js/main.js` 작성**

```js
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});
```

- [ ] **Step 4: `css/style.css` 끝에 토글 버튼 기본 스타일 + 반응형 미디어쿼리 추가**

```css
/* Mobile nav toggle (desktop: hidden) */
.nav-toggle {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
}

.nav-toggle span {
  width: 22px;
  height: 2px;
  background: var(--color-navy);
}

@media (max-width: 600px) {
  .nav-toggle {
    display: flex;
  }

  .navbar .nav-links {
    display: none;
    position: absolute;
    top: 64px;
    left: 0;
    right: 0;
    flex-direction: column;
    gap: 0;
    background: var(--color-bg);
    border-bottom: 1px solid var(--color-border);
  }

  .navbar .nav-links.open {
    display: flex;
  }

  .navbar .nav-links a {
    padding: 16px 24px;
    border-top: 1px solid var(--color-border);
  }

  .hero h1 {
    font-size: 28px;
  }

  .hero p {
    font-size: 15px;
  }

  .project-grid {
    grid-template-columns: 1fr;
  }

  .about-facts .fact {
    grid-template-columns: 1fr;
    gap: 4px;
  }

  .contact-links {
    flex-direction: column;
  }
}
```

- [ ] **Step 5: 브라우저에서 확인 (데스크톱 폭)**

```bash
powershell -Command "Start-Process 'C:\Claude\portfolio\index.html'"
```

확인할 것: 햄버거 버튼이 보이지 않고(데스크톱 폭이므로), 기존 5개 nav 링크가 그대로 가로로 보이는지. 콘솔에 JS 에러가 없는지 개발자 도구로 확인.

- [ ] **Step 6: 브라우저 개발자 도구로 모바일 폭(375px) 확인**

브라우저에서 F12 → 기기 툴바 토글 → 폭 375px로 설정 후:
- 데스크톱 nav 링크가 사라지고 햄버거 버튼만 보이는지
- 햄버거 버튼 클릭 시 5개 링크가 세로로 펼쳐지는지, 다시 클릭하면 닫히는지
- 링크 클릭 시 해당 섹션으로 스크롤 이동하면서 메뉴가 자동으로 닫히는지
- Projects 카드가 1열로 쌓이는지, About의 학력/병역 항목이 세로로 쌓이는지, Contact 버튼 2개가 세로로 쌓이는지

- [ ] **Step 7: 커밋**

```bash
cd "C:/Claude/portfolio"
git add index.html css/style.css js/main.js
git commit -m "feat: add mobile nav toggle and responsive layout"
```

---

### Task 5: GitHub Pages 배포

**Files:**
- 없음 (git/GitHub 작업만)

**Interfaces:**
- Consumes: Task 1~4에서 완성된 `index.html`, `css/style.css`, `js/main.js`

> **주의:** 이 태스크는 공개 GitHub 저장소를 생성하고 코드를 푸시하는, 되돌리기 번거로운 공개 작업이다. 실행 직전에 사용자에게 "지금 `Zman927.github.io` 공개 저장소를 만들고 푸시해도 될까요?"라고 확인한 뒤 진행한다.

- [ ] **Step 1: 기본 브랜치를 `main`으로 정리**

```bash
cd "C:/Claude/portfolio"
git branch -M main
git log --oneline
```

Expected: 모든 커밋이 `main` 브랜치에 그대로 남아있음 (브랜치 이름만 변경됨)

- [ ] **Step 2: GitHub 공개 저장소 생성 + 푸시 (사용자 확인 후 실행)**

```bash
cd "C:/Claude/portfolio"
gh repo create Zman927.github.io --public --source=. --remote=origin --push
```

Expected: 명령 출력에 `https://github.com/Zman927/Zman927.github.io` 저장소 생성 및 `main` 브랜치 푸시 완료 메시지

- [ ] **Step 3: GitHub Pages 활성화 확인**

```bash
gh api repos/Zman927/Zman927.github.io/pages --jq '{status,html_url}'
```

Expected: `status`가 `built` 또는 `building`, `html_url`이 `https://zman927.github.io/`

만약 404가 나오면 (자동 활성화가 안 된 경우) 브라우저로 `https://github.com/Zman927/Zman927.github.io/settings/pages`에 접속해 Source를 `main` 브랜치 `/ (root)`로 수동 설정한다.

- [ ] **Step 4: 배포된 사이트 최종 확인**

```bash
powershell -Command "Start-Process 'https://zman927.github.io'"
```

Task 4의 Step 5·6 체크리스트(데스크톱 nav, 모바일 375px 햄버거 메뉴, 모든 링크)를 로컬 파일이 아닌 **실제 배포 URL**에서 그대로 재확인한다. 추가로:
- 브라우저 개발자 도구 콘솔에 404나 JS 에러가 없는지 (특히 `css/style.css`, `js/main.js` 경로가 배포 환경에서도 정상 로드되는지)
- 이메일/전화번호가 의도한 대로만(이메일만) 노출되는지 최종 확인

---

## Self-Review Notes

- **스펙 커버리지:** 스펙 4절(정보구조)의 5개 섹션 → Task 1~3에서 전부 구현. 6절(비주얼)의 색상/폰트/카드/배지/버튼 스펙 → Task 1~3 CSS에 반영. 7절(반응형) → Task 4. 9절(배포 절차) → Task 5. 10절(검증) → 각 태스크의 브라우저 확인 단계로 대체(자동화 테스트 없음, 스펙과 일치).
- **미해결 항목 반영:** 게시판/캡스톤/쇼핑몰 카드는 스펙 4.1·5절 결정대로 링크 없이 텍스트만 포함시켰다.
- **스무스 스크롤 구현 방식:** 스펙 3절은 "최소한의 JS"로 스무스 스크롤을 언급하지만, `html { scroll-behavior: smooth; }` CSS 한 줄로 동일한 효과를 낼 수 있어 JS 없이 처리했다(Task 1). JS는 모바일 메뉴 토글에만 사용해 스펙의 "최소한의 JS" 취지를 더 충실히 따른다.
