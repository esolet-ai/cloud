/* =========================================================
   Hybrid Cloud Ops Course — main.js
   의존성 없음 (Vanilla JS). JS가 꺼져 있어도 모든 내용은 HTML로 읽힘.
   ========================================================= */

/* ---------------------------------------------------------
   0. 사이트 설정 — 운영 시 이 부분만 수정하세요
   - applyUrl : 홈페이지 상담 신청 링크
   - kakaoUrl : 카카오톡 채널 상담 링크
   - phone    : 상담 전화번호 (비워 두면 표시하지 않음)
   ※ index.html의 버튼에도 같은 주소가 들어 있어 JS가 꺼져도 동작합니다.
--------------------------------------------------------- */
const SITE_CONFIG = {
  applyUrl: 'https://www.keduit.com/general/register.php?c_branch=&c_empkind=&c_idx=',
  kakaoUrl: 'https://pf.kakao.com/_bCxenxd/chat',
  phone: ''       // 예: '상담 문의 02-000-0000'
};

document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  applyConfig();
  initHeader();
  initNav();
  initTabs();
  initReveal();
  initCounters();
  initCharts();
  initGlossary();
  initDialog();
});

/* ---------- 1. 설정값 반영 ---------- */
function applyConfig() {
  document.querySelectorAll('[data-config-href]').forEach((el) => {
    const value = SITE_CONFIG[el.dataset.configHref];
    if (value) {
      el.href = value;
      if (/^https?:/.test(value)) { el.target = '_blank'; el.rel = 'noopener'; }
    } else if (el.dataset.configHref === 'applyUrl') {
      el.href = '#contact';          // 링크 미설정 시 문의 영역으로 이동
    }
  });
  document.querySelectorAll('[data-config-text]').forEach((el) => {
    const value = SITE_CONFIG[el.dataset.configText];
    if (value) { el.textContent = value; el.hidden = false; }
  });
}

/* ---------- 2. 헤더 스크롤 상태 · 맨 위로 버튼 ---------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  const toTop = document.querySelector('.to-top');
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 8);
    toTop.classList.toggle('is-visible', y > window.innerHeight * 1.2);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---------- 3. 내비게이션 (모바일 메뉴 · 현재 섹션 표시) ---------- */
function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  const label = toggle.querySelector('.sr-only');

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
    label.textContent = open ? '메뉴 닫기' : '메뉴 열기';
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => { if (e.matches) setOpen(false); });

  // 현재 보고 있는 섹션 메뉴 강조
  const links = [...nav.querySelectorAll('ul a[href^="#"]')];
  const map = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
  const sections = [...map.keys()].map((id) => document.getElementById(id)).filter(Boolean);
  if (!('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((a) => { a.classList.remove('is-active'); a.removeAttribute('aria-current'); });
        const link = map.get(entry.target.id);
        if (link) { link.classList.add('is-active'); link.setAttribute('aria-current', 'true'); }
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => io.observe(s));
}

/* ---------- 4. 탭 (운영 흐름) — WAI-ARIA Tabs 패턴 ---------- */
function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach((root) => {
    const tabs = [...root.querySelectorAll('[role="tab"]')];
    const select = (tab, focus = true) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) tab.focus();
      tab.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(tab, false));
      tab.addEventListener('keydown', (e) => {
        let next = null;
        if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
        if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === 'Home') next = tabs[0];
        if (e.key === 'End') next = tabs[tabs.length - 1];
        if (next) { e.preventDefault(); select(next); }
      });
    });
  });
}

/* ---------- 5. 스크롤 등장 효과 ---------- */
function initReveal() {
  const targets = document.querySelectorAll(
    '.section-head, .ops-flow, .card-grid, .hours-bar, .phase, .project, .row-list, .career-col, .chart, .partner-stats, .glossary-list, .adm-grid > div, .score-grid, .schedule, .flow-line, .faq, .livery-inner'
  );
  // 커리큘럼 막대: 단계(STEP)와 교과 순서에 따라 차오르는 시점을 조금씩 늦춤
  document.querySelectorAll('.phase').forEach((phase, p) => {
    phase.querySelectorAll('.course-list summary').forEach((sum, i) => {
      sum.style.setProperty('--d', `${0.25 + p * 0.12 + i * 0.14}s`);
    });
  });
  if (!('IntersectionObserver' in window)) { targets.forEach((el) => el.classList.add('is-in')); return; }
  targets.forEach((el) => el.classList.add('reveal'));
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-in'); obs.unobserve(entry.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  targets.forEach((el) => io.observe(el));
}

/* ---------- 6. 숫자 카운트업 ---------- */
function initCounters() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const els = document.querySelectorAll('[data-count]');
  if (reduce || !('IntersectionObserver' in window)) return;
  const format = (n, el) => (el.dataset.format === 'comma' ? n.toLocaleString('ko-KR') : String(n));
  const run = (el) => {
    const end = Number(el.dataset.count);
    const dur = 1200;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = format(Math.round(end * eased), el);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { run(entry.target); obs.unobserve(entry.target); }
    });
  }, { threshold: 0.5 });
  els.forEach((el) => io.observe(el));
}

/* ---------- 7. 막대 차트 성장 ---------- */
function initCharts() {
  const bars = document.querySelectorAll('.bars');
  if (!('IntersectionObserver' in window)) { bars.forEach((b) => b.classList.add('is-in')); return; }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-in'); obs.unobserve(entry.target); }
    });
  }, { threshold: 0.35 });
  bars.forEach((b) => io.observe(b));
}

/* ---------- 8. 용어 사전 검색 · 분류 ---------- */
function initGlossary() {
  const input = document.getElementById('glossary-search');
  const list = document.getElementById('glossary-list');
  if (!input || !list) return;
  const terms = [...list.querySelectorAll('.term')];
  const chips = [...document.querySelectorAll('.filter-chips .chip')];
  const countEl = document.getElementById('glossary-count');
  const emptyEl = document.getElementById('glossary-empty');
  const moreBtn = document.getElementById('glossary-more');
  let category = 'all';
  let expanded = false;
  const previewCount = () => {
    if (window.matchMedia('(max-width: 639px)').matches) return 6;
    if (window.matchMedia('(max-width: 1023px)').matches) return 8;
    return 9;
  };

  // 원본 텍스트 보관 (하이라이트 복원용)
  terms.forEach((t) => {
    t.dataset.text = t.textContent.toLowerCase().replace(/\s+/g, ' ');
    t.querySelectorAll('dt, dd').forEach((n) => { n.dataset.html = n.innerHTML; });
  });

  const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const highlight = (node, q) => {
    node.innerHTML = node.dataset.html;
    if (!q) return;
    const re = new RegExp(`(${escapeRe(q)})`, 'gi');
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
    const texts = [];
    while (walker.nextNode()) texts.push(walker.currentNode);
    texts.forEach((txt) => {
      if (!re.test(txt.nodeValue)) return;
      const span = document.createElement('span');
      span.innerHTML = txt.nodeValue.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c])).replace(re, '<mark>$1</mark>');
      txt.replaceWith(...span.childNodes);
      re.lastIndex = 0;
    });
  };

  const apply = () => {
    const q = input.value.trim().toLowerCase();
    let matched = 0;
    // 전체·검색어 없음 상태에서는 일부만 먼저 보여주고 '전체 보기'로 펼침
    const limit = (category === 'all' && !q && !expanded) ? previewCount() : Infinity;
    terms.forEach((t) => {
      const ok = (category === 'all' || t.dataset.cat === category) && (!q || t.dataset.text.includes(q));
      if (ok) matched += 1;
      t.hidden = !ok || matched > limit;
      t.querySelectorAll('dt, dd').forEach((n) => highlight(n, ok ? input.value.trim() : ''));
    });
    countEl.textContent = matched;
    emptyEl.hidden = matched !== 0;
    moreBtn.hidden = !(matched > limit);
    moreBtn.textContent = `용어 전체 보기 (${matched}개)`;
    moreBtn.setAttribute('aria-expanded', String(expanded));
  };

  let timer;
  input.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(apply, 120); });
  moreBtn.addEventListener('click', () => {
    const firstHidden = terms.find((t) => t.hidden);
    expanded = true; apply();
    if (firstHidden) {
      const dt = firstHidden.querySelector('dt');
      dt.setAttribute('tabindex', '-1');
      dt.focus({ preventScroll: true });   // 키보드 사용자가 새로 펼쳐진 위치에서 이어 읽도록
    }
  });
  chips.forEach((chip) => chip.addEventListener('click', () => {
    category = chip.dataset.filter;
    chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
    apply();
  }));
  apply();
}

/* ---------- 9. 원본 자료 이미지 보기 ---------- */
function initDialog() {
  const dialog = document.getElementById('img-dialog');
  if (!dialog) return;
  const img = dialog.querySelector('img');
  let opener = null;
  document.querySelectorAll('[data-dialog-src]').forEach((btn) => {
    btn.addEventListener('click', () => {
      img.src = btn.dataset.dialogSrc;
      img.alt = btn.dataset.dialogAlt || '';
      opener = btn;
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else window.open(btn.dataset.dialogSrc, '_blank');
    });
  });
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { if (opener) opener.focus(); });
}
