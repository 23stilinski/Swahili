/* ============================================================
   KUJIFUNZA KISWAHILI — Main JavaScript
   js/main.js
   ============================================================ */

/* ── LESSON REGISTRY ──────────────────────────────────────────
   TO ADD A NEW LESSON each week:
   1. Create your lesson HTML file in the /lessons/ folder
   2. Add a new entry to the LESSONS array below
   3. That's it! The site handles everything automatically.
   ─────────────────────────────────────────────────────────── */

const LESSONS = [
  /* ── GRAMMAR ── */
  {
    id: 'tenses',
    title: 'Swahili Tenses',
    description: 'All 8 tenses — past, present, perfect, habitual, future and conditional — with tables and interactive quizzes.',
    icon: '📅',
    category: 'grammar',
    badge: 'LESSON',
    week: 1,
    file: 'lessons/swahili_tenses_lesson.html',
    tags: ['tenses', 'past', 'future', 'present', 'verb'],
    isNew: false,
  },
  {
    id: 'negation',
    title: 'Negation — Kukanusha',
    description: 'How to say "I don\'t", "She isn\'t", "They won\'t" — full negation tables for all 3 persons and all tenses.',
    icon: '🚫',
    category: 'grammar',
    badge: 'LESSON',
    week: 2,
    file: 'lessons/swahili_negation.html',
    tags: ['negation', 'kukanusha', 'hapana', 'verb'],
    isNew: false,
  },
  {
    id: 'sentences',
    title: 'Sentence Structure',
    description: 'Build proper Swahili sentences from scratch — subject, tense marker, verb, and object all explained clearly.',
    icon: '🧩',
    category: 'grammar',
    badge: 'LESSON',
    week: 3,
    file: 'lessons/swahili_sentence_structure.html',
    tags: ['sentence', 'structure', 'subject', 'verb', 'object'],
    isNew: false,
  },
  {
    id: 'infixes',
    title: 'Object Infixes',
    description: 'Say "I see him", "She told them" — embedding the object directly inside the Swahili verb.',
    icon: '🔗',
    category: 'grammar',
    badge: 'LESSON',
    week: 4,
    file: 'lessons/swahili_object_infixes.html',
    tags: ['infixes', 'object', 'verb', 'him', 'her', 'them'],
    isNew: false,
  },
  {
    id: 'pa-ku-mu',
    title: 'PA · KU · MU',
    description: 'The three Swahili locatives — how to talk about WHERE something is, happens, or goes. Includes KU as infinitive prefix.',
    icon: '📍',
    category: 'grammar',
    badge: 'LESSON',
    week: 5,
    file: 'lessons/swahili_pa_ku_mu.html',
    tags: ['locative', 'pa', 'ku', 'mu', 'place', 'infinitive'],
    isNew: false,
  },
  {
    id: 'a-of-association',
    title: 'A of Association',
    description: 'Noun classes and the "of" connector — ya, cha, wa, la, vya and when to use each one.',
    icon: '🔑',
    category: 'grammar',
    badge: 'LESSON',
    week: 6,
    file: 'lessons/swahili_a_of_association.html',
    tags: ['noun class', 'possessive', 'ya', 'cha', 'wa', 'la', 'vya'],
    isNew: false,
  },
  {
    id: 'word-order',
    title: 'Word Order',
    description: 'Personal possessives vs -A of association — two different systems, two different rules for word order.',
    icon: '📐',
    category: 'grammar',
    badge: 'LESSON',
    week: 7,
    file: 'lessons/swahili_word_order.html',
    tags: ['word order', 'possessive', 'adjective', 'demonstrative'],
    isNew: true,
  },

  /* ── VOCABULARY ── */
  {
    id: 'body-lesson',
    title: 'Body Parts — Mwili',
    description: 'Every body part with silly memory tricks, pronunciation guides, real sentences, and a sing-along song!',
    icon: '🫀',
    category: 'vocab',
    badge: 'VOCAB',
    week: 5,
    file: 'lessons/swahili_body_lesson.html',
    tags: ['body', 'mwili', 'kichwa', 'mkono', 'vocabulary'],
    isNew: false,
  },

  /* ── GAMES ── */
  {
    id: 'animals-game',
    title: 'Wanyama! Animal Game',
    description: 'Guess 45 animal names in Swahili against the clock! 3 difficulty levels, streak bonuses and a personal best tracker.',
    icon: '🦁',
    category: 'game',
    badge: 'GAME',
    week: 2,
    file: 'lessons/swahili_animal_game.html',
    tags: ['animals', 'wanyama', 'game', 'quiz', 'vocabulary'],
    isNew: false,
  },
  {
    id: 'body-game',
    title: 'Mwili Wangu! Body Game',
    description: 'Flashcards first, then a timed quiz on body parts. Vocabulary table and pronunciation tips included.',
    icon: '💪',
    category: 'game',
    badge: 'GAME',
    week: 5,
    file: 'lessons/swahili_body_parts_game.html',
    tags: ['body', 'mwili', 'game', 'quiz', 'flashcard'],
    isNew: false,
  },
];

/* ── STATE ──────────────────────────────────────────────────── */
const state = {
  currentModule: null,
  visited: new Set(JSON.parse(localStorage.getItem('sw_visited') || '[]')),
  activeFilter: 'all',
  searchQuery: '',
};

/* ── DOM REFS ───────────────────────────────────────────────── */
const dom = {
  homePanel:    () => document.getElementById('home-panel'),
  modulePanel:  () => document.getElementById('module-panel'),
  moduleScroll: () => document.getElementById('module-scroll'),
  crumbCurrent: () => document.getElementById('crumb-current'),
  crumbIcon:    () => document.getElementById('crumb-icon'),
  progFill:     () => document.getElementById('prog-fill'),
  progCount:    () => document.getElementById('prog-count'),
  visitedDots:  () => document.getElementById('visited-dots'),
  cardsGrid:    () => document.getElementById('cards-grid'),
  searchInput:  () => document.getElementById('search-input'),
  sidebar:      () => document.getElementById('sidebar'),
};

/* ── INIT ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderCards();
  renderSidebar();
  renderProgress();
  setupSearch();
  setupFilters();
  setupSidebarClose();
  showHome();
});

/* ── RENDER CARDS ───────────────────────────────────────────── */
function renderCards() {
  const grid = dom.cardsGrid();
  if (!grid) return;

  grid.innerHTML = '';

  LESSONS.forEach(lesson => {
    const card = buildCard(lesson);
    grid.appendChild(card);
  });
}

function buildCard(lesson) {
  const isVisited = state.visited.has(lesson.id);
  const catColors = getCategoryColors(lesson.category);

  const card = document.createElement('div');
  card.className = 'module-card';
  card.dataset.id = lesson.id;
  card.dataset.category = lesson.category;
  card.dataset.tags = lesson.tags.join(' ');

  card.innerHTML = `
    ${lesson.isNew ? '<div class="new-ribbon">NEW</div>' : ''}
    <div class="mc-top">
      <div class="mc-icon" style="background:${catColors.bg}">${lesson.icon}</div>
      <div class="mc-meta">
        <span class="mc-badge" style="background:${catColors.badgeBg};color:${catColors.badgeColor}">${lesson.badge}</span>
        <div class="mc-title">${lesson.title}</div>
      </div>
    </div>
    <div class="mc-desc">${lesson.description}</div>
    <div class="mc-footer">
      <span class="mc-week">Week ${lesson.week}</span>
      <span style="display:flex;align-items:center;gap:6px">
        <span style="width:7px;height:7px;border-radius:50%;background:${isVisited ? 'var(--green)' : 'var(--border)'}"></span>
        <span class="mc-open">${lesson.category === 'game' ? 'Play →' : 'Open →'}</span>
      </span>
    </div>
  `;

  card.addEventListener('click', () => openModule(lesson.id));
  return card;
}

/* ── RENDER SIDEBAR ─────────────────────────────────────────── */
function renderSidebar() {
  const grammarSection = document.getElementById('sidebar-grammar');
  const vocabSection   = document.getElementById('sidebar-vocab');
  const gameSection    = document.getElementById('sidebar-games');

  const sections = {
    grammar: grammarSection,
    vocab:   vocabSection,
    game:    gameSection,
  };

  // Clear
  Object.values(sections).forEach(s => { if (s) s.innerHTML = ''; });

  LESSONS.forEach(lesson => {
    const section = sections[lesson.category];
    if (!section) return;

    const btn = document.createElement('button');
    btn.className = 'sidebar-item';
    btn.id = `si-${lesson.id}`;
    btn.dataset.id = lesson.id;

    const catColors = getCategoryColors(lesson.category);
    btn.innerHTML = `
      <div class="si-icon" style="background:${catColors.bg}">${lesson.icon}</div>
      <div class="si-text">
        <span class="si-title">${lesson.title}</span>
        <span class="si-sub">Week ${lesson.week}</span>
      </div>
      ${lesson.isNew ? '<span class="si-new">NEW</span>' : ''}
      <span class="si-arrow">›</span>
    `;
    btn.addEventListener('click', () => openModule(lesson.id));
    section.appendChild(btn);
  });
}

/* ── RENDER PROGRESS ────────────────────────────────────────── */
function renderProgress() {
  const total = LESSONS.length;
  const done  = state.visited.size;
  const pct   = total > 0 ? (done / total * 100) : 0;

  const fill  = dom.progFill();
  const count = dom.progCount();
  const dots  = dom.visitedDots();

  if (fill)  fill.style.width = pct + '%';
  if (count) count.textContent = `${done} / ${total}`;

  if (dots) {
    dots.innerHTML = '';
    LESSONS.forEach(lesson => {
      const dot = document.createElement('div');
      dot.className = 'v-dot' + (state.visited.has(lesson.id) ? ' done' : '');
      dot.title = lesson.title;
      dot.addEventListener('click', () => openModule(lesson.id));
      dots.appendChild(dot);
    });
  }
}

/* ── OPEN MODULE ────────────────────────────────────────────── */
function openModule(id) {
  const lesson = LESSONS.find(l => l.id === id);
  if (!lesson) return;

  // Load content
  const scroll = dom.moduleScroll();
  if (scroll) {
    scroll.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:center;height:200px;color:var(--muted);font-family:var(--font-mono);font-size:13px;gap:12px">
        <span style="animation:spin 1s linear infinite;display:inline-block">⟳</span>
        Loading ${lesson.title}...
      </div>
      <style>@keyframes spin{to{transform:rotate(360deg)}}</style>
    `;
  }

  // Update breadcrumb
  const crumb = dom.crumbCurrent();
  const icon  = dom.crumbIcon();
  if (crumb) crumb.textContent = lesson.title;
  if (icon)  icon.textContent  = lesson.icon;

  // Show module panel
  dom.homePanel().classList.remove('visible');
  dom.modulePanel().classList.add('visible');

  // Update nav
  document.querySelectorAll('.sidebar-item').forEach(s => s.classList.remove('active'));
  const si = document.getElementById(`si-${id}`);
  if (si) si.classList.add('active');

  state.currentModule = id;

  // Load lesson via fetch then inject
  fetch(lesson.file)
    .then(r => {
      if (!r.ok) throw new Error('File not found');
      return r.text();
    })
    .then(html => {
      if (!scroll) return;
      // Extract just the body content + styles + scripts
      const parser  = new DOMParser();
      const doc     = parser.parseFromString(html, 'text/html');
      const styles  = [...doc.querySelectorAll('style')].map(s => s.outerHTML).join('\n');
      const bodyHTML = doc.body.innerHTML;
      const scripts = [...doc.querySelectorAll('script')].map(s => s.textContent).join('\n');

      scroll.innerHTML = `
        <div class="lesson-wrapper">
          ${styles}
          ${bodyHTML}
        </div>
      `;

      // Execute scripts
      if (scripts.trim()) {
        const scriptEl = document.createElement('script');
        scriptEl.textContent = `(function(){\n${scripts}\n})();`;
        scroll.appendChild(scriptEl);
      }

      scroll.scrollTop = 0;
    })
    .catch(() => {
      if (scroll) {
        scroll.innerHTML = `
          <div style="padding:48px;text-align:center;color:var(--muted)">
            <div style="font-size:48px;margin-bottom:16px">📂</div>
            <div style="font-family:var(--font-display);font-size:22px;color:var(--text);margin-bottom:8px">Lesson file not found</div>
            <div style="font-size:14px">Make sure <code style="background:var(--card);padding:2px 6px;border-radius:4px;font-family:var(--font-mono)">${lesson.file}</code> exists in your project folder.</div>
          </div>
        `;
      }
    });

  // Track visit
  state.visited.add(id);
  localStorage.setItem('sw_visited', JSON.stringify([...state.visited]));
  renderProgress();

  // Close mobile sidebar
  dom.sidebar().classList.remove('open');
}

/* ── SHOW HOME ──────────────────────────────────────────────── */
function showHome() {
  dom.homePanel().classList.add('visible');
  dom.modulePanel().classList.remove('visible');
  document.querySelectorAll('.sidebar-item').forEach(s => s.classList.remove('active'));
  state.currentModule = null;

  // Clear module scroll to save memory
  const scroll = dom.moduleScroll();
  if (scroll) scroll.innerHTML = '';
}

/* ── SEARCH ─────────────────────────────────────────────────── */
function setupSearch() {
  const input = dom.searchInput();
  if (!input) return;

  input.addEventListener('input', () => {
    state.searchQuery = input.value.toLowerCase().trim();
    filterCards();
  });
}

function filterCards() {
  const cards = document.querySelectorAll('.module-card');
  cards.forEach(card => {
    const title    = card.querySelector('.mc-title')?.textContent.toLowerCase() || '';
    const desc     = card.querySelector('.mc-desc')?.textContent.toLowerCase()  || '';
    const tags     = (card.dataset.tags || '').toLowerCase();
    const category = card.dataset.category || '';

    const matchSearch = !state.searchQuery ||
      title.includes(state.searchQuery) ||
      desc.includes(state.searchQuery)  ||
      tags.includes(state.searchQuery);

    const matchFilter = state.activeFilter === 'all' || category === state.activeFilter;

    card.classList.toggle('hidden', !matchSearch || !matchFilter);
  });
}

/* ── FILTERS ────────────────────────────────────────────────── */
function setupFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeFilter = btn.dataset.filter;
      filterCards();
    });
  });
}

/* ── SIDEBAR CLOSE (MOBILE) ─────────────────────────────────── */
function setupSidebarClose() {
  document.addEventListener('click', e => {
    const sb  = dom.sidebar();
    const tog = document.querySelector('.mob-toggle');
    if (sb.classList.contains('open') && !sb.contains(e.target) && e.target !== tog) {
      sb.classList.remove('open');
    }
  });
}

/* ── TOGGLE SIDEBAR (MOBILE) ────────────────────────────────── */
function toggleSidebar() {
  dom.sidebar().classList.toggle('open');
}

/* ── CATEGORY COLORS ────────────────────────────────────────── */
function getCategoryColors(category) {
  const map = {
    grammar: {
      bg:          'rgba(74,154,232,0.12)',
      badgeBg:     'rgba(74,154,232,0.12)',
      badgeColor:  '#4a9ae8',
    },
    vocab: {
      bg:          'rgba(232,150,74,0.12)',
      badgeBg:     'rgba(232,150,74,0.12)',
      badgeColor:  '#e8964a',
    },
    game: {
      bg:          'rgba(77,184,122,0.12)',
      badgeBg:     'rgba(77,184,122,0.12)',
      badgeColor:  '#4db87a',
    },
  };
  return map[category] || map.grammar;
}

/* ── ADD NEW LESSON (HELPER FOR TEACHERS) ───────────────────── */
/* 
  HOW TO ADD A NEW LESSON EACH WEEK:
  ====================================
  1. Create your lesson as an HTML file (e.g. "week8_colours.html")
  2. Put it in the /lessons/ folder
  3. Add a new object to the LESSONS array at the top of this file:

  {
    id: 'colours',                        // unique ID, no spaces
    title: 'Colours — Rangi',             // title shown on card
    description: 'Learn all the...',      // short description
    icon: '🎨',                           // emoji icon
    category: 'vocab',                    // 'grammar', 'vocab', or 'game'
    badge: 'VOCAB',                       // badge text
    week: 8,                              // week number
    file: 'lessons/week8_colours.html',   // path to your file
    tags: ['colours', 'rangi', 'red'],    // search keywords
    isNew: true,                          // shows NEW badge
  },

  4. Save main.js — the card and sidebar item appear automatically!
*/
