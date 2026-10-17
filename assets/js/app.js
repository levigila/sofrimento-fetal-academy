/* ============================================================
   SOFRIMENTO FETAL ACADEMY — aplicação
   Roteador por hash, renderização do conteúdo, gamificação
   (XP, níveis, selos), quiz, casos clínicos, flashcards,
   simulador de CTG e som ambiente.
   ============================================================ */

(() => {
  'use strict';

  /* ==========================================================
     1. CONSTANTES
     ========================================================== */
  const STORE_KEY = 'sfa_v1';
  const STORE_VERSION = 1;

  const LEVELS = [
    { name: 'Calouro(a) de Medicina',        xp: 0,    icon: '📚' },
    { name: 'Ciclo Básico',                  xp: 120,  icon: '🧪' },
    { name: 'Interno(a) de Medicina',        xp: 320,  icon: '🩺' },
    { name: 'Plantonista de Obstetrícia',    xp: 640,  icon: '🏥' },
    { name: 'Residente de GO',               xp: 1050, icon: '👩‍⚕️' },
    { name: 'Obstetra Sênior',               xp: 1600, icon: '🎓' },
    { name: 'Especialista em Medicina Fetal', xp: 2300, icon: '🔬' },
    { name: 'Lenda da Obstetrícia',          xp: 3200, icon: '👑' }
  ];

  const AMBIENTS = [
    { id: 'chuva',     icon: '🌧️', name: 'Chuva' },
    { id: 'oceano',    icon: '🌊', name: 'Oceano' },
    { id: 'foco',      icon: '🎧', name: 'Foco' },
    { id: 'batimento', icon: '🫀', name: 'Batimento fetal' },
    { id: 'marrom',    icon: '🟤', name: 'Ruído marrom' },
    { id: 'rosa',      icon: '🌸', name: 'Ruído rosa' }
  ];

  const MODULE_NAMES = {
    conceito: 'O Conceito Fundamental',
    fisiopato: 'Fisiopatologia',
    classificacao: 'Crônico vs. Agudo',
    causas: 'Causas & Fatores de Risco',
    diagnostico: 'Como Diagnosticar',
    ctg: 'CTG na Prática',
    conduta: 'Conduta Médica',
    neonatal: 'Repercussões Neonatais',
    glossario: 'Glossário & Flashcards'
  };

  const BADGES = [
    { id: 'primeiro-passo', icon: '🌱', name: 'Primeiro Passo',
      desc: 'Conclua o seu primeiro módulo.',
      test: s => Object.keys(s.modulesRead).length >= 1,
      prog: s => [Math.min(Object.keys(s.modulesRead).length, 1), 1] },
    { id: 'leitora-dedicada', icon: '📖', name: 'Leitora Dedicada',
      desc: 'Conclua 4 módulos da trilha.',
      test: s => Object.keys(s.modulesRead).length >= 4,
      prog: s => [Math.min(Object.keys(s.modulesRead).length, 4), 4] },
    { id: 'maratonista', icon: '🏁', name: 'Maratonista',
      desc: 'Conclua todos os 9 módulos.',
      test: s => Object.keys(s.modulesRead).length >= MODULES.length,
      prog: s => [Math.min(Object.keys(s.modulesRead).length, MODULES.length), MODULES.length] },
    { id: 'primeira-questao', icon: '❓', name: 'Primeira Questão',
      desc: 'Responda a sua primeira questão.',
      test: s => s.qTotal >= 1, prog: s => [Math.min(s.qTotal, 1), 1] },
    { id: 'centuriao', icon: '💯', name: 'Centurião',
      desc: 'Responda 50 questões no total.',
      test: s => s.qTotal >= 50, prog: s => [Math.min(s.qTotal, 50), 50] },
    { id: 'sniper', icon: '🎯', name: 'Sniper',
      desc: 'Acerte 5 questões seguidas.',
      test: s => s.bestStreak >= 5, prog: s => [Math.min(s.bestStreak, 5), 5] },
    { id: 'imparavel', icon: '🔥', name: 'Imparável',
      desc: 'Acerte 10 questões seguidas.',
      test: s => s.bestStreak >= 10, prog: s => [Math.min(s.bestStreak, 10), 10] },
    { id: 'diagnostico-perfeito', icon: '🧠', name: 'Diagnóstico Perfeito',
      desc: 'Feche um quiz com 100% de acerto (mínimo 8 questões).',
      test: s => !!s.perfectQuiz, prog: s => [s.perfectQuiz ? 1 : 0, 1] },
    { id: 'mao-na-massa', icon: '🩺', name: 'Mão na Massa',
      desc: 'Resolva os 5 casos clínicos corretamente.',
      test: s => CASES.every(c => s.casesSolved[c.id]),
      prog: s => [CASES.filter(c => s.casesSolved[c.id]).length, CASES.length] },
    { id: 'olho-clinico', icon: '📈', name: 'Olho Clínico',
      desc: 'Acerte 5 desafios no simulador de CTG.',
      test: s => s.ctgCorrect >= 5, prog: s => [Math.min(s.ctgCorrect, 5), 5] },
    { id: 'vocabulario', icon: '📇', name: 'Vocabulário Sólido',
      desc: 'Revele os 20 flashcards do glossário.',
      test: s => Object.keys(s.flashcards).length >= 20,
      prog: s => [Math.min(Object.keys(s.flashcards).length, 20), 20] },
    { id: 'especialista', icon: '👑', name: 'Especialista',
      desc: 'Acumule 1500 XP.',
      test: s => s.xp >= 1500, prog: s => [Math.min(s.xp, 1500), 1500] }
  ];

  /* ==========================================================
     2. ESTADO
     ========================================================== */
  function defaultState() {
    return {
      v: STORE_VERSION,
      xp: 0,
      streak: 0,
      bestStreak: 0,
      modulesRead: {},
      qTotal: 0,
      qCorrect: 0,
      byModule: {},
      casesSolved: {},
      badges: {},
      flashcards: {},
      perfectQuiz: false,
      ctgCorrect: 0,
      ctgTotal: 0,
      lastModule: null,
      sound: { type: 'chuva', volume: 0.35, fx: true, wanted: true }
    };
  }

  let state = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      if (!parsed || parsed.v !== STORE_VERSION) return defaultState();
      return Object.assign(defaultState(), parsed, {
        sound: Object.assign(defaultState().sound, parsed.sound || {})
      });
    } catch (e) {
      return defaultState();
    }
  }

  let saveTimer = null;
  function saveState() {
    if (saveTimer) return;
    saveTimer = setTimeout(() => {
      saveTimer = null;
      try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
    }, 180);
  }

  /* ==========================================================
     3. UTILITÁRIOS
     ========================================================== */
  const $  = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  function esc(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function levelIndexFor(xp) {
    let idx = 0;
    for (let i = 0; i < LEVELS.length; i++) if (xp >= LEVELS[i].xp) idx = i;
    return idx;
  }

  function levelInfo(xp) {
    const i = levelIndexFor(xp);
    const cur = LEVELS[i];
    const next = LEVELS[i + 1] || null;
    const span = next ? next.xp - cur.xp : 1;
    const into = next ? xp - cur.xp : 1;
    return {
      index: i,
      name: cur.name,
      icon: cur.icon,
      next,
      pct: next ? Math.max(0, Math.min(100, (into / span) * 100)) : 100,
      remaining: next ? next.xp - xp : 0
    };
  }

  function moduleById(id) { return MODULES.find(m => m.id === id) || null; }
  function caseById(id) { return CASES.find(c => c.id === id) || null; }

  function totalQuestionsIn(modId) {
    return QUESTIONS.filter(q => q.m === modId).length;
  }

  function allQuestionsAnswered() {
    return QUESTIONS.length;
  }

  /* ==========================================================
     4. GAMIFICAÇÃO: XP, NÍVEL, SELOS, TOASTS, CONFETES
     ========================================================== */
  function addXP(amount, opts) {
    opts = opts || {};
    if (!amount) return;
    const before = levelInfo(state.xp);
    state.xp += amount;
    const after = levelInfo(state.xp);

    if (opts.float !== false) xpFloat(amount, opts.x, opts.y);
    if (opts.silent !== true) Sound.fx.xp();
    bumpPill('xpPill');

    saveState();
    renderStats();

    if (after.index > before.index) {
      setTimeout(() => {
        Sound.fx.levelUp();
        confetti(140);
        toast('lvl', '🎉', 'Subiu de nível!', 'Agora você é <b>' + after.name + '</b>');
        renderStats();
      }, 420);
    }
  }

  function bumpPill(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('bump');
    void el.offsetWidth;
    el.classList.add('bump');
  }

  function xpFloat(amount, x, y) {
    const layer = document.getElementById('xpFloatLayer');
    if (!layer) return;
    const span = document.createElement('span');
    span.className = 'xp-float';
    span.textContent = (amount > 0 ? '+' : '') + amount + ' XP';
    const px = (typeof x === 'number') ? x : window.innerWidth / 2;
    const py = (typeof y === 'number') ? y : window.innerHeight / 2;
    span.style.left = px + 'px';
    span.style.top = py + 'px';
    layer.appendChild(span);
    setTimeout(() => span.remove(), 1250);
  }

  function toast(kind, icon, title, sub, ms) {
    const wrap = document.getElementById('toasts');
    if (!wrap) return;
    const node = document.createElement('div');
    node.className = 'toast ' + (kind || '');
    node.innerHTML =
      '<span class="toast-ico">' + icon + '</span>' +
      '<span class="toast-txt"><span>' + title + '</span>' +
      (sub ? '<small>' + sub + '</small>' : '') + '</span>';
    wrap.appendChild(node);
    setTimeout(() => {
      node.classList.add('out');
      setTimeout(() => node.remove(), 340);
    }, ms || 3400);
  }

  /* ---- confetti ---- */
  let confettiParts = [];
  let confettiRAF = null;

  function confetti(count) {
    const canvas = document.getElementById('confetti');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const colors = ['#38bdf8', '#a78bfa', '#34d399', '#f59e0b', '#f472b6', '#22d3ee', '#fff'];
    for (let i = 0; i < (count || 90); i++) {
      confettiParts.push({
        x: Math.random() * window.innerWidth,
        y: -20 - Math.random() * 120,
        vx: (Math.random() - 0.5) * 3.4,
        vy: 2.4 + Math.random() * 4.2,
        w: 6 + Math.random() * 8,
        h: 4 + Math.random() * 7,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.28,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1
      });
    }
    if (!confettiRAF) confettiLoop();
  }

  function confettiLoop() {
    const canvas = document.getElementById('confetti');
    if (!canvas) { confettiRAF = null; return; }
    const ctx = canvas.getContext('2d');
    const W = window.innerWidth, H = window.innerHeight;
    ctx.clearRect(0, 0, W, H);

    for (let i = confettiParts.length - 1; i >= 0; i--) {
      const p = confettiParts[i];
      p.x += p.vx; p.y += p.vy; p.vy += 0.045; p.rot += p.vr;
      if (p.y > H + 40) { confettiParts.splice(i, 1); continue; }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.92;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }

    if (confettiParts.length) {
      confettiRAF = requestAnimationFrame(confettiLoop);
    } else {
      ctx.clearRect(0, 0, W, H);
      confettiRAF = null;
    }
  }

  /* ---- selos ---- */
  function checkBadges() {
    let unlockedNow = [];
    BADGES.forEach(b => {
      if (state.badges[b.id]) return;
      let ok = false;
      try { ok = !!b.test(state); } catch (e) { ok = false; }
      if (ok) {
        state.badges[b.id] = Date.now();
        unlockedNow.push(b);
      }
    });
    if (unlockedNow.length) {
      saveState();
      unlockedNow.forEach((b, i) => {
        setTimeout(() => {
          Sound.fx.badge();
          confetti(80);
          toast('badge', b.icon, '🏆 Selo desbloqueado: ' + b.name, b.desc, 4600);
          renderStats();
        }, 380 + i * 900);
      });
    }
    return unlockedNow;
  }

  /* ---- painel de estatísticas ---- */
  function renderStats() {
    const lv = levelInfo(state.xp);
    const setTxt = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = val; };

    setTxt('xpValue', state.xp);
    setTxt('streakValue', state.streak);
    setTxt('levelName', lv.icon + ' ' + lv.name);
    setTxt('levelSub', lv.next
      ? (state.xp + ' / ' + lv.next.xp + ' XP para ' + lv.next.name)
      : 'Nível máximo alcançado! 🏆');
    setTxt('avatarEmoji', lv.icon);

    const fill = document.getElementById('levelFill');
    if (fill) fill.style.width = lv.pct + '%';
    const pfill = document.getElementById('profileFill');
    if (pfill) pfill.style.width = lv.pct + '%';

    const readCount = Object.keys(state.modulesRead).length;
    setTxt('poModules', readCount + '/' + MODULES.length);
    setTxt('poQuestions', state.qCorrect + '/' + state.qTotal);
    setTxt('poCases', Object.keys(state.casesSolved).length + '/' + CASES.length);
    setTxt('poBadges', Object.keys(state.badges).length + '/' + BADGES.length);
    setTxt('badgesCount', Object.keys(state.badges).length + '/' + BADGES.length);

    renderNav();
  }

  /* ---- navegação lateral ---- */
  function renderNav() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    const current = currentRoute();
    let html = '<div class="nav-label">Trilha de estudo</div>';

    html += navItem('inicio', '🏠', 'Início', 'painel de progresso', current);
    MODULES.forEach((m, i) => {
      html += navItem('modulo/' + m.id, m.icon, (i + 1) + '. ' + m.title, m.subtitle, current,
        !!state.modulesRead[m.id]);
    });

    html += '<div class="nav-label">Treino</div>';
    html += navItem('quiz', '🧪', 'Banco de Questões', allQuestionsAnswered() + ' questões', current);
    html += navItem('casos', '🩺', 'Casos Clínicos', CASES.length + ' casos', current);
    html += navItem('ctg', '📈', 'Simulador de CTG', 'treine o traçado ao vivo', current);
    html += navItem('selos', '🏆', 'Meus Selos', Object.keys(state.badges).length + '/' + BADGES.length + ' conquistados', current);

    nav.innerHTML = html;
  }

  function navItem(hash, icon, title, sub, current, done) {
    const active = current === hash || (hash !== 'inicio' && current.indexOf(hash + '/') === 0);
    return '<button class="nav-item' + (active ? ' active' : '') + (done ? ' done' : '') +
      '" data-nav="' + hash + '">' +
      '<span class="nav-ico">' + icon + '</span>' +
      '<span><span class="nav-title">' + title + '</span>' +
      (sub ? '<span class="nav-sub">' + sub + '</span>' : '') + '</span>' +
      '<span class="nav-check">✓</span>' +
      '</button>';
  }

  /* ==========================================================
     5. SOM
     ========================================================== */
  let soundArmed = false;

  function initSound() {
    Sound.state.volume = state.sound.volume;
    Sound.state.type = state.sound.type;
    Sound.state.fxEnabled = state.sound.fx;
    syncSoundUI();

    const arm = () => {
      if (soundArmed) return;
      soundArmed = true;
      Sound.unlock();
      if (state.sound.wanted) {
        Sound.playAmbient(state.sound.type);
        toast('', '🎧', 'Som ambiente ligado', 'Escolha outro som no botão de alto-falante.', 3800);
      }
      syncSoundUI();
    };
    window.addEventListener('pointerdown', arm, { once: true });
    window.addEventListener('keydown', arm, { once: true });
  }

  function syncSoundUI() {
    const icon = document.getElementById('soundIcon');
    const playing = Sound.isPlaying;
    if (icon) icon.textContent = playing ? '🔊' : '🔇';
    const btn = document.getElementById('soundBtn');
    if (btn) btn.classList.toggle('on', playing);

    $$('#spGrid .sp-item').forEach(el => {
      el.classList.toggle('on', el.dataset.sound === state.sound.type);
    });
  }

  function buildSoundPanel() {
    const grid = document.getElementById('spGrid');
    if (grid) {
      grid.innerHTML = AMBIENTS.map(a =>
        '<button class="sp-item" data-sound="' + a.id + '">' +
        '<span class="sp-ico">' + a.icon + '</span>' +
        '<span class="sp-name">' + a.name + '</span>' +
        '</button>'
      ).join('');
    }

    const vol = document.getElementById('spVolume');
    const volLabel = document.getElementById('spVolLabel');
    if (vol) {
      vol.value = Math.round(state.sound.volume * 100);
      if (volLabel) volLabel.textContent = vol.value + '%';
      vol.addEventListener('input', () => {
        state.sound.volume = vol.value / 100;
        Sound.setVolume(state.sound.volume);
        if (volLabel) volLabel.textContent = vol.value + '%';
        saveState();
      });
    }

    const fx = document.getElementById('spFx');
    if (fx) {
      fx.checked = state.sound.fx;
      fx.addEventListener('change', () => {
        state.sound.fx = fx.checked;
        Sound.state.fxEnabled = fx.checked;
        saveState();
        if (fx.checked) Sound.fx.click();
      });
    }
  }

  function toggleSoundPanel(force) {
    const panel = document.getElementById('soundPanel');
    if (!panel) return;
    const open = typeof force === 'boolean' ? force : !panel.classList.contains('open');
    panel.classList.toggle('open', open);
    const btn = document.getElementById('soundBtn');
    if (btn) btn.classList.toggle('on', open);
  }

  /* ==========================================================
     6. ROTEADOR
     ========================================================== */
  let currentView = 'inicio';
  let cleanupView = null;

  function currentRoute() {
    const h = (location.hash || '').replace(/^#\/?/, '');
    return h || 'inicio';
  }

  function go(hash) {
    if (currentRoute() === hash) { render(); return; }
    location.hash = hash;
  }

  function onHashChange() {
    render();
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function render() {
    if (typeof cleanupView === 'function') {
      try { cleanupView(); } catch (e) {}
      cleanupView = null;
    }

    const route = currentRoute();
    const content = document.getElementById('content');
    if (!content) return;

    closeSidebar();

    const parts = route.split('/');
    const head = parts[0];

    if (head === 'inicio' || head === '') {
      currentView = 'inicio';
      content.innerHTML = renderHome();
    } else if (head === 'modulo') {
      currentView = 'modulo';
      content.innerHTML = renderModule(parts[1]);
    } else if (head === 'quiz') {
      currentView = 'quiz';
      content.innerHTML = '<div class="view quiz-shell" id="quizShell"></div>';
      startQuiz(parts[1] || null);
    } else if (head === 'casos') {
      currentView = 'casos';
      content.innerHTML = renderCasesList();
    } else if (head === 'caso') {
      currentView = 'caso';
      content.innerHTML = renderCaseDetail(parts[1]);
    } else if (head === 'ctg') {
      currentView = 'ctg';
      content.innerHTML = renderCTGPage();
      mountLab($('#labSlot'));
    } else if (head === 'selos') {
      currentView = 'selos';
      content.innerHTML = renderBadgesPage();
    } else {
      currentView = 'inicio';
      content.innerHTML = renderHome();
    }

    renderStats();
    attachViewHandlers(content);
    updateReadProgress();
  }

  function attachViewHandlers(content) {
    content.querySelectorAll('[data-nav]').forEach(el => {
      el.addEventListener('click', () => {
        Sound.fx.click();
        go(el.dataset.nav);
      });
    });
    content.querySelectorAll('[data-action]').forEach(el => {
      el.addEventListener('click', () => handleAction(el, el.dataset.action));
    });
    wireSections(content);
    if (currentView === 'caso') wireCase(content);
  }

  function handleAction(el, action) {
    switch (action) {
      case 'ctg':
        Sound.fx.click();
        go('ctg');
        break;
      case 'quiz-all':
        go('quiz');
        break;
      case 'start':
        go(state.lastModule ? 'modulo/' + state.lastModule : 'modulo/' + MODULES[0].id);
        break;
      case 'continue':
        go(state.lastModule ? 'modulo/' + state.lastModule : 'modulo/' + MODULES[0].id);
        break;
      case 'next-module': {
        const id = el.dataset.module;
        go('modulo/' + id);
        break;
      }
      case 'complete-module':
        completeModule(el.dataset.module);
        break;
      case 'reset-quiz':
        startQuiz(el.dataset.module || null);
        break;
      case 'start-quiz-module':
        go('quiz/' + el.dataset.module);
        break;
    }
  }

  /* ==========================================================
     7. VIEW: HOME
     ========================================================== */
  function renderHome() {
    const lv = levelInfo(state.xp);
    const readCount = Object.keys(state.modulesRead).length;
    const acc = state.qTotal ? Math.round((state.qCorrect / state.qTotal) * 100) : 0;
    const nextMod = MODULES.find(m => !state.modulesRead[m.id]) || MODULES[0];
    const last = state.lastModule ? moduleById(state.lastModule) : null;

    let html = '<div class="view">';

    html +=
      '<section class="hero">' +
        '<span class="hero-kicker">🫀 Obstetrícia · Medicina Fetal</span>' +
        '<h1>Entenda <span class="grad">sofrimento fetal</span> de uma vez por todas.</h1>' +
        '<p class="hero-sub">Um guia visual e interativo feito para estudar de verdade: ' +
          'você lê, vê as ilustrações, mexe no simulador de cardiotocografia, resolve casos clínicos ' +
          'e ganha XP a cada passo. Comece de onde quiser — a trilha já está montada.</p>' +
        '<div class="hero-actions">' +
          '<button class="btn primary big" data-action="' + (last ? 'continue' : 'start') + '">' +
            (last ? '▶ Continuar em ' + esc(last.title) : '▶ Começar a estudar') + '</button>' +
          '<button class="btn big" data-nav="quiz">🧪 Treinar com questões</button>' +
          '<button class="btn ghost big" data-nav="ctg">📈 Simulador de CTG</button>' +
        '</div>' +
      '</section>';

    html +=
      '<div class="quick-stats">' +
        statCard(lv.icon, state.xp, 'XP acumulado') +
        statCard('📚', readCount + '/' + MODULES.length, 'módulos concluídos') +
        statCard('✅', acc + '%', 'acerto nas questões') +
        statCard('🏆', Object.keys(state.badges).length, 'selos conquistados') +
      '</div>';

    if (!state.qTotal && !readCount) {
      html +=
        '<section class="sec sec-analogy" style="--mc:#f59e0b">' +
          '<div class="analogy-head"><span class="analogy-ico">👋</span>' +
          '<span>Como aproveitar melhor este site</span></div>' +
          '<div class="analogy-body">' +
            '<b>1.</b> Siga a trilha na ordem (são 9 módulos curtos, com ilustrações animadas).<br>' +
            '<b>2.</b> No fim de cada módulo, clique em <b>“Concluir módulo”</b> para ganhar XP.<br>' +
            '<b>3.</b> Use o <b>Banco de Questões</b> para fixar e o <b>Simulador de CTG</b> para treinar a leitura do traçado.<br>' +
            '<b>4.</b> Ligue o <b>som ambiente</b> (alto-falante no topo) para concentrar.' +
          '</div>' +
        '</section>';
    }

    html += '<h2 class="section-title">Trilha de estudo <span class="st-sub">9 módulos · do conceito à conduta</span></h2>';
    html += '<div class="module-grid">';
    MODULES.forEach((m, i) => {
      const done = !!state.modulesRead[m.id];
      const qCount = totalQuestionsIn(m.id);
      html +=
        '<button class="module-card' + (done ? ' done' : '') + '" style="--mc:' + m.color + '" data-nav="modulo/' + m.id + '">' +
          '<div class="mc-top">' +
            '<span class="mc-icon">' + m.icon + '</span>' +
            '<span class="mc-titles">' +
              '<span class="mc-title">' + (i + 1) + '. ' + esc(m.title) + '</span>' +
              '<span class="mc-sub">' + esc(m.subtitle) + '</span>' +
            '</span>' +
          '</div>' +
          '<div class="mc-text">' + esc(moduleBlurb(m.id)) + '</div>' +
          '<div class="mc-meta">' +
            '<span class="mc-tag' + (done ? ' done' : '') + '">' + (done ? '✓ Concluído' : m.sections.length + ' seções') + '</span>' +
            '<span class="mc-xp">+' + m.xp + ' XP' + (qCount ? ' · ' + qCount + ' questões' : '') + '</span>' +
          '</div>' +
          '<div class="mc-bar"><div style="width:' + (done ? 100 : 0) + '%"></div></div>' +
        '</button>';
    });
    html += '</div>';

    html += '<h2 class="section-title">Treino e prática</h2>';
    html +=
      '<div class="shortcut-grid">' +
        shortcut('🧪', 'Banco de Questões', allQuestionsAnswered() + ' questões comentadas · por módulo ou geral', 'quiz') +
        shortcut('🩺', 'Casos Clínicos', CASES.length + ' casos reais com conduta comentada', 'casos') +
        shortcut('📈', 'Simulador de CTG', '10 traçados ao vivo + modo desafio com pontuação', 'ctg') +
        shortcut('🏆', 'Meus Selos', Object.keys(state.badges).length + ' de ' + BADGES.length + ' conquistados', 'selos') +
      '</div>';

    html +=
      '<section class="sec sec-pearl" style="margin-top:26px">' +
        '<b>Próximo passo sugerido:</b> ' +
        '<button class="btn sm primary" style="margin-left:6px" data-nav="modulo/' + nextMod.id + '">' +
          nextMod.icon + ' ' + esc(nextMod.title) + '</button>' +
      '</section>';

    html += '</div>';
    return html;
  }

  function statCard(icon, val, lbl) {
    return '<div class="qs"><span class="qs-val">' + icon + ' ' + val + '</span>' +
      '<span class="qs-lbl">' + lbl + '</span></div>';
  }

  function shortcut(icon, title, desc, hash) {
    return '<button class="shortcut" data-nav="' + hash + '">' +
      '<span class="shortcut-ico">' + icon + '</span>' +
      '<span><span class="shortcut-t">' + title + '</span>' +
      '<span class="shortcut-d">' + desc + '</span></span>' +
      '</button>';
  }

  function moduleBlurb(id) {
    const blurbs = {
      conceito: 'O que é, por que importa e a cascata que leva à acidose fetal.',
      fisiopato: 'Troca gasosa, centralização fetal e a reserva que decide tudo.',
      classificacao: 'Crônico x agudo: dois cenários, duas velocidades, duas condutas.',
      causas: 'Mãe, placenta ou cordão? Onde procurar o problema.',
      diagnostico: 'Mobilograma, CTG, mecônio, perfil biofísico e Doppler.',
      ctg: 'DR C BRAVADO, os 4 tipos de desaceleração e o simulador ao vivo.',
      conduta: 'L.O.S.S., reanimação intrauterina e decisão da via de parto.',
      neonatal: 'Apgar, gasometria de cordão, EHI e hipotermia terapêutica.',
      glossario: '20 flashcards para fixar o vocabulário de prova.'
    };
    return blurbs[id] || '';
  }

  /* ==========================================================
     8. VIEW: MÓDULO
     ========================================================== */
  function renderModule(id) {
    const mod = moduleById(id);
    if (!mod) return '<div class="view"><p>Módulo não encontrado.</p>' +
      '<button class="btn primary" data-nav="inicio">Voltar ao início</button></div>';

    const idx = MODULES.indexOf(mod);
    const done = !!state.modulesRead[mod.id];
    const prev = MODULES[idx - 1] || null;
    const next = MODULES[idx + 1] || null;
    const qCount = totalQuestionsIn(mod.id);

    state.lastModule = mod.id;
    saveState();

    let html = '<div class="view">';

    html +=
      '<header class="mod-header" style="--mc:' + mod.color + '">' +
        '<div class="mod-head-row">' +
          '<span class="mod-icon">' + mod.icon + '</span>' +
          '<div>' +
            '<h1 class="mod-title">' + esc(mod.title) + '</h1>' +
            '<p class="mod-sub">' + esc(mod.subtitle) + '</p>' +
          '</div>' +
        '</div>' +
        '<div class="mod-meta">' +
          '<span class="chip">Módulo ' + (idx + 1) + ' de ' + MODULES.length + '</span>' +
          '<span class="chip xp">+' + mod.xp + ' XP</span>' +
          '<span class="chip">' + mod.sections.length + ' seções</span>' +
          (qCount ? '<span class="chip">' + qCount + ' questões</span>' : '') +
          (done ? '<span class="chip done">✓ já concluído</span>' : '') +
        '</div>' +
      '</header>';

    html += '<div class="sections" id="sections">';
    mod.sections.forEach((sec, i) => {
      html += '<div class="sec-wrap" data-sec="' + i + '" style="--mc:' + mod.color + '">' +
        renderSection(sec, mod) + '</div>';
    });
    html += '</div>';

    html +=
      '<div class="mod-footer">' +
        '<div class="mf-side">' +
          (prev ? '<button class="btn" data-nav="modulo/' + prev.id + '">← ' + esc(prev.title) + '</button>' : '') +
        '</div>' +
        '<div class="mf-hint" id="mfHint">' +
          (done ? 'Módulo concluído ✓ — siga em frente!' : 'Leu tudo? Marque como concluído para ganhar ' + mod.xp + ' XP.') +
        '</div>' +
        '<div class="mf-side">' +
          (next ? '<button class="btn" data-nav="modulo/' + next.id + '">' + esc(next.title) + ' →</button>' : '') +
          (!done ? '<button class="btn primary" data-action="complete-module" data-module="' + mod.id + '">✓ Concluir módulo</button>' : '') +
          (qCount ? '<button class="btn" data-action="start-quiz-module" data-module="' + mod.id + '">🧪 Treinar questões</button>' : '') +
        '</div>' +
      '</div>';

    html += '</div>';
    return html;
  }

  function completeModule(id) {
    const mod = moduleById(id);
    if (!mod || state.modulesRead[id]) return;
    state.modulesRead[id] = Date.now();
    Sound.fx.complete();
    confetti(110);
    addXP(mod.xp, { silent: true });
    toast('ok', '✅', 'Módulo concluído: ' + mod.title, '+' + mod.xp + ' XP · ' + Object.keys(state.modulesRead).length + '/' + MODULES.length + ' módulos');
    checkBadges();
    saveState();
    render();
  }

  /* ---- renderizador de seções ---- */
  function renderSection(sec, mod) {
    const mc = mod.color;

    switch (sec.type) {

      case 'lead':
        return '<div class="sec sec-lead">' + sec.text + '</div>';

      case 'subtitle':
        return '<div class="sec sec-subtitle">' + sec.text + '</div>';

      case 'definition':
        return '<div class="sec sec-definition">' +
          '<div class="def-term">' + esc(sec.term) + '</div>' +
          (sec.aka ? '<div class="def-aka">também chamado de: ' + esc(sec.aka) + '</div>' : '') +
          '<div class="def-text">' + sec.text + '</div>' +
          '</div>';

      case 'fig':
        return '<div class="sec sec-fig"><div class="fig-box">' + getFig(sec.id) + '</div>' +
          (sec.caption ? '<div class="fig-cap">' + esc(sec.caption) + '</div>' : '') + '</div>';

      case 'analogy':
        return '<div class="sec sec-analogy">' +
          '<div class="analogy-head">' +
            '<span class="analogy-ico">' + (sec.icon || '💡') + '</span>' +
            '<span>' + esc(sec.title) + '</span>' +
          '</div>' +
          '<div class="analogy-body">' + sec.text + '</div>' +
          '</div>';

      case 'chain':
        return '<div class="sec sec-chain">' +
          '<div class="chain-title">' + esc(sec.title) + '</div>' +
          '<div class="chain">' +
            sec.steps.map((s, i) =>
              '<div class="chain-step">' +
                '<span class="chain-ico">' + s.icon + '</span>' +
                '<div><div class="chain-label">' + (i + 1) + '. ' + esc(s.label) + '</div>' +
                '<div class="chain-desc">' + esc(s.desc) + '</div></div>' +
              '</div>'
            ).join('') +
          '</div>' +
          '</div>';

      case 'key':
        return '<div class="sec sec-key">' +
          '<div class="key-title">' + esc(sec.title || 'Pontos-chave') + '</div>' +
          '<ul class="key-list">' + sec.items.map(i => '<li>' + i + '</li>').join('') + '</ul>' +
          '</div>';

      case 'pearl':
        return '<div class="sec sec-pearl">' + sec.text + '</div>';

      case 'warning':
        return '<div class="sec sec-warning">' +
          '<div class="warn-title">' + (sec.title || 'Atenção') + '</div>' +
          '<div class="warn-text">' + sec.text + '</div>' +
          '</div>';

      case 'grid':
        return '<div class="sec sec-grid">' +
          (sec.title ? '<div class="chain-title">' + esc(sec.title) + '</div>' : '') +
          '<div class="grid-cards">' +
            sec.cards.map(c =>
              '<div class="gcard">' +
                '<div class="gcard-ico">' + c.icon + '</div>' +
                '<div class="gcard-title">' + esc(c.title) + '</div>' +
                '<div class="gcard-text">' + c.text + '</div>' +
              '</div>'
            ).join('') +
          '</div>' +
          '</div>';

      case 'accordion':
        return '<div class="sec sec-accordion">' +
          sec.items.map((it, i) =>
            '<div class="acc-item" data-acc="' + i + '">' +
              '<button class="acc-head" data-acc-toggle="' + i + '">' +
                '<span class="acc-ico">' + (it.icon || '▸') + '</span>' +
                '<span class="acc-title">' + esc(it.title) + '</span>' +
                '<span class="acc-chev">▼</span>' +
              '</button>' +
              '<div class="acc-body"><div><div class="acc-inner">' + it.body + '</div></div></div>' +
            '</div>'
          ).join('') +
          '</div>';

      case 'compare':
        return '<div class="sec sec-compare">' +
          compareCol(sec.left) + compareCol(sec.right) +
          '</div>';

      case 'mnemonic':
        return '<div class="sec sec-mnemonic">' +
          '<div class="mn-title">' + esc(sec.title || 'Mnemônico') + '</div>' +
          '<div class="mn-list">' +
            sec.items.map(it =>
              '<div class="mn-item">' +
                '<span class="mn-k">' + esc(it.k) + '</span>' +
                '<span class="mn-v">' + it.v + '</span>' +
              '</div>'
            ).join('') +
          '</div>' +
          '</div>';

      case 'table':
        return '<div class="sec sec-table">' +
          (sec.title ? '<div class="chain-title">' + esc(sec.title) + '</div>' : '') +
          '<div class="table-wrap"><table class="tbl">' +
            '<thead><tr>' + sec.head.map(h => '<th>' + esc(h) + '</th>').join('') + '</tr></thead>' +
            '<tbody>' + sec.rows.map(r =>
              '<tr>' + r.map(c => '<td>' + c + '</td>').join('') + '</tr>'
            ).join('') + '</tbody>' +
          '</table></div>' +
          '</div>';

      case 'numbered':
        return '<div class="sec sec-numbered">' +
          '<div class="num-head">' +
            '<span class="num-ico">' + (sec.icon || '🔹') + '</span>' +
            '<span class="num-title">' + esc(sec.title) + '</span>' +
          '</div>' +
          '<div class="num-body">' + sec.body + '</div>' +
          (sec.extras && sec.extras.length
            ? '<ul class="num-extras">' + sec.extras.map(e => '<li>' + e + '</li>').join('') + '</ul>'
            : '') +
          '</div>';

      case 'cta':
        return '<div class="sec sec-cta">' +
          '<span class="cta-text">' + esc(sec.text) + '</span>' +
          '<button class="btn primary" data-action="' + esc(sec.action) + '">' + esc(sec.label) + '</button>' +
          '</div>';

      case 'decel':
        return '<div class="sec sec-decel">' + sec.items.map(decelCard).join('') + '</div>';

      case 'loss':
        return '<div class="sec sec-loss">' +
          '<div class="chain-title">' + esc(sec.title) + '</div>' +
          '<div class="loss-list">' +
            sec.items.map(it =>
              '<div class="loss-item" style="--lc:' + it.color + '">' +
                '<div class="loss-top">' +
                  '<span class="loss-letter">' + esc(it.letter) + '</span>' +
                  '<span class="loss-word">' + (it.icon || '') + ' ' + esc(it.word) + '</span>' +
                '</div>' +
                '<div class="loss-body">' + it.body + '</div>' +
                '<div class="loss-why">' + esc(it.why) + '</div>' +
              '</div>'
            ).join('') +
          '</div>' +
          '</div>';

      case 'decision':
        return '<div class="sec sec-decision">' +
          '<div class="chain-title">' + esc(sec.title) + '</div>' +
          '<div class="dec-list">' +
            sec.branches.map(b =>
              '<div class="dec-branch" style="--dc:' + b.color + '">' +
                '<span class="dec-ico">' + b.icon + '</span>' +
                '<div>' +
                  '<div class="dec-cond">' + esc(b.cond) + '<span class="dec-arrow">→</span></div>' +
                  '<div class="dec-action">' + esc(b.action) + '</div>' +
                  '<div class="dec-detail">' + esc(b.detail) + '</div>' +
                '</div>' +
              '</div>'
            ).join('') +
          '</div>' +
          '</div>';

      case 'timeline':
        return '<div class="sec sec-timeline">' +
          '<div class="chain-title">' + esc(sec.title) + '</div>' +
          '<div class="tl">' +
            sec.items.map(it =>
              '<div class="tl-item">' +
                '<div class="tl-t">' + esc(it.t) + '</div>' +
                '<div class="tl-d">' + esc(it.d) + '</div>' +
              '</div>'
            ).join('') +
          '</div>' +
          '</div>';

      case 'flashcards':
        return '<div class="sec sec-flashcards">' +
          sec.cards.map((c, i) => {
            const key = 'fc:' + mod.id + ':' + i;
            const known = !!state.flashcards[key];
            return '<button class="fc' + (known ? ' known' : '') + '" data-flash="' + esc(key) + '">' +
              '<span class="fc-inner">' +
                '<span class="fc-face fc-front">' +
                  '<span class="fc-q">' + esc(c.q) + '</span>' +
                  '<span class="fc-hint">clique para revelar</span>' +
                '</span>' +
                '<span class="fc-face fc-back">' +
                  '<span class="fc-a">' + esc(c.a) + '</span>' +
                '</span>' +
              '</span>' +
              '</button>';
          }).join('') +
          '</div>';

      case 'ctg-simulator':
        return '<div class="sec sec-ctg-sim" id="labSlot"></div>';

      default:
        return '';
    }
  }

  function compareCol(col) {
    if (!col) return '';
    return '<div class="cmp-col" style="--cc:' + col.color + '">' +
      '<div class="cmp-head">' +
        '<span class="cmp-ico">' + col.icon + '</span>' +
        '<span class="cmp-title">' + esc(col.title) + '</span>' +
      '</div>' +
      '<div class="cmp-blocks">' +
        col.blocks.map(b =>
          '<div class="cmp-block">' +
            '<div class="cmp-h">' + esc(b.h) + '</div>' +
            '<div class="cmp-t">' + b.t + '</div>' +
          '</div>'
        ).join('') +
      '</div>' +
      '</div>';
  }

  function decelCard(d) {
    return '<div class="decel-card" style="--dc:' + d.color + '">' +
      '<div class="dc-head">' +
        '<span class="dc-shape">' + shapeSVG(d.shape, d.color) + '</span>' +
        '<span>' +
          '<span class="dc-name">' + esc(d.name) + '</span><br>' +
          '<span class="dc-alias">' + esc(d.alias) + '</span>' +
        '</span>' +
      '</div>' +
      '<div class="dc-rows">' +
        row('Formato', d.shape) +
        row('Relação com a contração', d.timing) +
        row('Causa', d.cause) +
      '</div>' +
      '<span class="dc-badge ' + d.severity + '">' + severityLabel(d.severity) + '</span>' +
      '<div class="dc-meaning">' + esc(d.meaning) + '</div>' +
      '</div>';
  }

  function row(k, v) {
    return '<div class="dc-row"><span class="dc-k">' + esc(k) + '</span>' + esc(v) + '</div>';
  }

  function severityLabel(s) {
    if (s === 'benigno') return 'benigno';
    if (s === 'grave') return 'grave — agir';
    return 'depende do contexto';
  }

  function shapeSVG(shape, color) {
    const c = color || '#38bdf8';
    if (shape === 'abrupta') {
      return '<svg viewBox="0 0 40 40"><path d="M3,12 L14,12 L20,32 L26,12 L37,12" fill="none" stroke="' + c + '" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/></svg>';
    }
    if (shape === 'prolongada') {
      return '<svg viewBox="0 0 40 40"><path d="M3,12 C10,12 12,30 20,30 C28,30 30,12 37,12" fill="none" stroke="' + c + '" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/></svg>';
    }
    return '<svg viewBox="0 0 40 40"><path d="M3,12 C11,12 13,28 20,28 C27,28 29,12 37,12" fill="none" stroke="' + c + '" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/></svg>';
  }

  /* ---- interações das seções ---- */
  function wireSections(root) {
    root.querySelectorAll('[data-acc-toggle]').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.acc-item');
        if (!item) return;
        const open = item.classList.toggle('open');
        Sound.fx.click();
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
    });

    root.querySelectorAll('[data-flash]').forEach(el => {
      el.addEventListener('click', () => {
        const key = el.dataset.flash;
        el.classList.toggle('flipped');
        Sound.fx.click();
        if (el.classList.contains('flipped') && !state.flashcards[key]) {
          state.flashcards[key] = 1;
          saveState();
          addXP(3, { x: window.innerWidth / 2, y: window.innerHeight - 120 });
          checkBadges();
          renderStats();
        }
      });
    });
  }

  /* ==========================================================
     9. VIEW: QUIZ
     ========================================================== */
  let quiz = null;

  function startQuiz(modId) {
    const shell = document.getElementById('quizShell');
    if (!shell) return;

    let pool = modId ? QUESTIONS.filter(q => q.m === modId) : QUESTIONS.slice();
    if (!pool.length) pool = QUESTIONS.slice();
    pool = shuffle(pool);

    quiz = {
      module: modId || null,
      items: pool.map(buildQuizItem),
      i: 0,
      correct: 0,
      wrong: [],
      xpEarned: 0,
      answered: false
    };

    renderQuizShell();
    renderQuestion();
  }

  function buildQuizItem(q) {
    const order = shuffle(q.o.map((_, i) => i));
    return {
      module: q.m,
      q: q.q,
      e: q.e,
      options: order.map(i => q.o[i]),
      answer: order.indexOf(q.a)
    };
  }

  function renderQuizShell() {
    const shell = document.getElementById('quizShell');
    if (!shell) return;
    const mod = quiz.module ? moduleById(quiz.module) : null;
    shell.innerHTML =
      '<div class="quiz-top">' +
        '<span class="chip">' + (mod ? mod.icon + ' ' + esc(mod.title) : '🌐 Todos os módulos') + '</span>' +
        '<div class="quiz-progress"><div id="quizBar"></div></div>' +
        '<span class="quiz-counter" id="quizCounter">1 / ' + quiz.items.length + '</span>' +
      '</div>' +
      '<div id="quizBody"></div>';
  }

  function renderQuestion() {
    const body = document.getElementById('quizBody');
    if (!body) return;
    const item = quiz.items[quiz.i];
    if (!item) { renderQuizResult(); return; }

    quiz.answered = false;

    const bar = document.getElementById('quizBar');
    if (bar) bar.style.width = ((quiz.i) / quiz.items.length * 100) + '%';
    const counter = document.getElementById('quizCounter');
    if (counter) counter.textContent = (quiz.i + 1) + ' / ' + quiz.items.length;

    const modName = MODULE_NAMES[item.module] || item.module;

    body.innerHTML =
      '<div class="q-card">' +
        '<span class="q-module">' + esc(modName) + '</span>' +
        '<div class="q-text">' + esc(item.q) + '</div>' +
        '<div class="q-options" id="qOptions">' +
          item.options.map((o, i) =>
            '<button class="q-opt" data-opt="' + i + '">' +
              '<span class="q-key">' + 'ABCD'[i] + '</span>' +
              '<span>' + esc(o) + '</span>' +
            '</button>'
          ).join('') +
        '</div>' +
        '<div id="qFeedback"></div>' +
        '<div class="q-actions" id="qActions"></div>' +
      '</div>';

    body.querySelectorAll('[data-opt]').forEach(btn => {
      btn.addEventListener('click', () => answerQuestion(parseInt(btn.dataset.opt, 10), btn));
    });
  }

  function answerQuestion(choice, btnEl) {
    if (quiz.answered) return;
    quiz.answered = true;

    const item = quiz.items[quiz.i];
    const isRight = choice === item.answer;
    const opts = $$('#qOptions .q-opt');

    opts.forEach((el, i) => {
      el.disabled = true;
      if (i === item.answer) el.classList.add('correct');
      else if (i === choice) el.classList.add('wrong');
      else el.classList.add('dim');
    });

    state.qTotal += 1;
    if (!state.byModule[item.module]) state.byModule[item.module] = { t: 0, c: 0 };
    state.byModule[item.module].t += 1;

    let gained = 0;
    if (isRight) {
      quiz.correct += 1;
      state.qCorrect += 1;
      state.byModule[item.module].c += 1;
      state.streak += 1;
      state.bestStreak = Math.max(state.bestStreak, state.streak);
      gained = 10 + Math.min(state.streak - 1, 5) * 2;
      Sound.fx.correct();
      confetti(46);
    } else {
      quiz.wrong.push({ q: item.q, a: item.options[item.answer], e: item.e });
      state.streak = 0;
      gained = 3;
      Sound.fx.wrong();
    }

    quiz.xpEarned += gained;

    const rect = btnEl ? btnEl.getBoundingClientRect() : null;
    addXP(gained, {
      silent: true,
      x: rect ? rect.left + rect.width / 2 : window.innerWidth / 2,
      y: rect ? rect.top : window.innerHeight / 2
    });
    saveState();
    renderStats();

    const fb = document.getElementById('qFeedback');
    if (fb) {
      fb.innerHTML =
        '<div class="q-feedback ' + (isRight ? 'ok' : 'no') + '">' +
          '<div class="qf-head">' + (isRight ? '✅ Isso! Resposta correta.' : '❌ Não foi essa. Veja o porquê:') + '</div>' +
          '<div><b>Resposta certa:</b> ' + esc(item.options[item.answer]) + '</div>' +
          '<div style="margin-top:8px">' + esc(item.e) + '</div>' +
        '</div>';
    }

    const actions = document.getElementById('qActions');
    if (actions) {
      const last = quiz.i === quiz.items.length - 1;
      actions.innerHTML =
        '<button class="btn primary" id="qNext">' + (last ? '🏁 Ver resultado' : 'Próxima questão →') + '</button>' +
        (state.streak >= 2 ? '<span class="q-streak">🔥 ' + state.streak + ' seguidas</span>' : '');
      const next = document.getElementById('qNext');
      if (next) next.addEventListener('click', () => { quiz.i += 1; renderQuestion(); });
    }

    checkBadges();
  }

  function renderQuizResult() {
    const body = document.getElementById('quizBody');
    if (!body) return;
    const total = quiz.items.length;
    const pct = total ? Math.round((quiz.correct / total) * 100) : 0;

    if (pct === 100 && total >= 8) state.perfectQuiz = true;
    saveState();

    let emoji = '📚', title = 'Continue treinando!';
    if (pct >= 90) { emoji = '🏆'; title = 'Excelente!'; }
    else if (pct >= 75) { emoji = '🎉'; title = 'Muito bem!'; }
    else if (pct >= 60) { emoji = '👍'; title = 'Bom caminho!'; }
    else { emoji = '💪'; title = 'Vamos revisar!'; }

    const bar = document.getElementById('quizBar');
    if (bar) bar.style.width = '100%';
    const counter = document.getElementById('quizCounter');
    if (counter) counter.textContent = total + ' / ' + total;

    if (pct >= 75) { confetti(150); Sound.fx.complete(); }

    body.innerHTML =
      '<div class="result-card">' +
        '<div class="result-emoji">' + emoji + '</div>' +
        '<div class="result-title">' + title + '</div>' +
        '<div class="result-sub">Você acertou <b>' + quiz.correct + '</b> de <b>' + total + '</b> questões' +
          (quiz.module ? ' de ' + esc(MODULE_NAMES[quiz.module] || '') : '') + '.</div>' +
        '<div class="result-stats">' +
          '<div class="rs"><div class="rs-v">' + pct + '%</div><div class="rs-l">aproveitamento</div></div>' +
          '<div class="rs"><div class="rs-v">+' + quiz.xpEarned + '</div><div class="rs-l">XP nesta rodada</div></div>' +
          '<div class="rs"><div class="rs-v">' + state.bestStreak + '</div><div class="rs-l">melhor sequência</div></div>' +
        '</div>' +
        '<div class="result-actions">' +
          '<button class="btn primary" data-action="reset-quiz" data-module="' + (quiz.module || '') + '">↻ Refazer este quiz</button>' +
          '<button class="btn" data-nav="quiz">🌐 Quiz geral</button>' +
          '<button class="btn" data-nav="ctg">📈 Simulador de CTG</button>' +
          '<button class="btn ghost" data-nav="inicio">🏠 Início</button>' +
        '</div>' +
        (quiz.wrong.length
          ? '<div class="review-list"><h3 class="section-title" style="margin-top:26px">Revisão dos erros (' + quiz.wrong.length + ')</h3>' +
            quiz.wrong.map(w =>
              '<div class="review-item">' +
                '<div class="review-q">' + esc(w.q) + '</div>' +
                '<div class="review-a">✅ ' + esc(w.a) + '</div>' +
                '<div class="review-e">' + esc(w.e) + '</div>' +
              '</div>'
            ).join('') + '</div>'
          : '<div class="sec sec-pearl" style="margin-top:24px;text-align:left">' +
            '<b>Zero erros!</b> Você dominou este bloco. Que tal tentar o quiz geral ou o simulador de CTG?</div>') +
      '</div>';

    checkBadges();
    renderStats();

    const shell = document.getElementById('quizShell');
    if (shell) attachViewHandlers(shell);
  }

  /* ==========================================================
     10. VIEW: CASOS CLÍNICOS
     ========================================================== */
  function renderCasesList() {
    const solved = Object.keys(state.casesSolved).length;
    let html = '<div class="view">' +
      '<header class="mod-header" style="--mc:#ef4444">' +
        '<div class="mod-head-row">' +
          '<span class="mod-icon">🩺</span>' +
          '<div><h1 class="mod-title">Casos Clínicos</h1>' +
          '<p class="mod-sub">Do plantão para o seu caderno — decisões reais, comentadas</p></div>' +
        '</div>' +
        '<div class="mod-meta">' +
          '<span class="chip">' + CASES.length + ' casos</span>' +
          '<span class="chip done">' + solved + ' resolvidos</span>' +
          '<span class="chip xp">até +' + CASES.reduce((a, c) => a + c.xp, 0) + ' XP</span>' +
        '</div>' +
      '</header>' +
      '<div class="cases-grid">';

    CASES.forEach((c, i) => {
      const done = !!state.casesSolved[c.id];
      html += '<button class="case-card' + (done ? ' done' : '') + '" data-nav="caso/' + c.id + '">' +
        '<div class="cc-head">' +
          '<span class="cc-ico">' + c.icon + '</span>' +
          '<span><span class="cc-title">' + esc(c.title) + '</span><br>' +
          '<span class="diff ' + c.difficulty + '">' + esc(c.difficulty) + '</span></span>' +
        '</div>' +
        '<div class="mc-text">' + esc(stripTags(c.stem).slice(0, 118)) + '…</div>' +
        '<div class="mc-meta">' +
          '<span class="mc-tag' + (done ? ' done' : '') + '">' + (done ? '✓ Resolvido' : 'Caso ' + (i + 1)) + '</span>' +
          '<span class="mc-xp">+' + c.xp + ' XP</span>' +
        '</div>' +
        '</button>';
    });

    html += '</div></div>';
    return html;
  }

  function stripTags(s) { return String(s || '').replace(/<[^>]*>/g, ''); }

  function renderCaseDetail(id) {
    const c = caseById(id);
    if (!c) return '<div class="view"><p>Caso não encontrado.</p>' +
      '<button class="btn primary" data-nav="casos">Ver todos os casos</button></div>';

    const done = !!state.casesSolved[c.id];

    return '<div class="view case-shell">' +
      '<button class="btn sm ghost" data-nav="casos" style="margin-bottom:14px">← Todos os casos</button>' +
      '<header class="mod-header" style="--mc:#ef4444">' +
        '<div class="mod-head-row">' +
          '<span class="mod-icon">' + c.icon + '</span>' +
          '<div><h1 class="mod-title">' + esc(c.title) + '</h1>' +
          '<p class="mod-sub"><span class="diff ' + c.difficulty + '">' + esc(c.difficulty) + '</span>' +
          (done ? ' <span class="chip done">✓ resolvido</span>' : '') + '</p></div>' +
        '</div>' +
      '</header>' +
      '<div class="case-stem">' + c.stem + '</div>' +
      '<div class="q-card">' +
        '<div class="case-q">' + esc(c.question) + '</div>' +
        '<div class="q-options" id="caseOptions">' +
          c.options.map((o, i) =>
            '<button class="q-opt" data-case-opt="' + i + '">' +
              '<span class="q-key">' + 'ABCD'[i] + '</span>' +
              '<span>' + esc(o.t) + '</span>' +
            '</button>'
          ).join('') +
        '</div>' +
        '<div id="caseFeedback"></div>' +
        '<div class="q-actions" id="caseActions">' +
          '<button class="btn ghost" data-nav="casos">← Voltar</button>' +
        '</div>' +
      '</div>' +
      '</div>';
  }

  function wireCase(root) {
    root.querySelectorAll('[data-case-opt]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = currentRoute().split('/')[1];
        const c = caseById(id);
        if (!c) return;
        const choice = parseInt(btn.dataset.caseOpt, 10);
        const chosen = c.options[choice];
        const correctIdx = c.options.findIndex(o => o.correct);

        const opts = $$('#caseOptions .q-opt');
        opts.forEach((el, i) => {
          el.disabled = true;
          if (i === correctIdx) el.classList.add('correct');
          else if (i === choice) el.classList.add('wrong');
          else el.classList.add('dim');
        });

        const already = !!state.casesSolved[c.id];

        if (chosen.correct) {
          Sound.fx.correct();
          confetti(90);
          if (!already) {
            state.casesSolved[c.id] = Date.now();
            addXP(c.xp, { silent: true, x: window.innerWidth / 2, y: window.innerHeight / 2 });
            toast('ok', '🩺', 'Caso resolvido!', '+' + c.xp + ' XP · ' +
              Object.keys(state.casesSolved).length + '/' + CASES.length + ' casos');
            checkBadges();
          }
        } else {
          Sound.fx.wrong();
          if (!already) addXP(5, { silent: true });
        }

        saveState();
        renderStats();

        const fb = document.getElementById('caseFeedback');
        if (fb) {
          fb.innerHTML = '<div class="q-feedback ' + (chosen.correct ? 'ok' : 'no') + '">' +
            '<div class="qf-head">' + (chosen.correct ? '✅ Conduta correta!' : '❌ Revise este raciocínio') + '</div>' +
            '<div>' + esc(chosen.why) + '</div>' +
            '</div>';
        }

        const actions = document.getElementById('caseActions');
        if (actions) {
          const nextCase = CASES[CASES.indexOf(c) + 1];
          actions.innerHTML =
            '<button class="btn ghost" data-nav="casos">← Todos os casos</button>' +
            (!chosen.correct ? '<button class="btn" id="caseRetry">↻ Tentar de novo</button>' : '') +
            (nextCase ? '<button class="btn primary" data-nav="caso/' + nextCase.id + '">Próximo caso →</button>' : '') +
            '<button class="btn" data-nav="quiz">🧪 Treinar questões</button>';
          const retry = document.getElementById('caseRetry');
          if (retry) retry.addEventListener('click', () => { render(); });
          attachViewHandlers(actions);
        }
      });
    });
  }

  /* ==========================================================
     11. VIEW: SELOS
     ========================================================== */
  function renderBadgesPage() {
    const got = Object.keys(state.badges).length;
    const lv = levelInfo(state.xp);

    let html = '<div class="view">' +
      '<header class="mod-header" style="--mc:#f59e0b">' +
        '<div class="mod-head-row">' +
          '<span class="mod-icon">🏆</span>' +
          '<div><h1 class="mod-title">Meus Selos</h1>' +
          '<p class="mod-sub">' + got + ' de ' + BADGES.length + ' conquistados · nível atual: ' + lv.icon + ' ' + esc(lv.name) + '</p></div>' +
        '</div>' +
        '<div class="mod-meta">' +
          '<span class="chip xp">' + state.xp + ' XP</span>' +
          '<span class="chip">' + state.qCorrect + '/' + state.qTotal + ' questões certas</span>' +
          '<span class="chip">' + Object.keys(state.modulesRead).length + '/' + MODULES.length + ' módulos</span>' +
          '<span class="chip">' + Object.keys(state.casesSolved).length + '/' + CASES.length + ' casos</span>' +
        '</div>' +
      '</header>' +
      '<div class="badges-grid">';

    BADGES.forEach(b => {
      const unlocked = !!state.badges[b.id];
      let p = [0, 1];
      try { p = b.prog(state); } catch (e) {}
      const pct = Math.round((p[0] / p[1]) * 100);
      html += '<div class="badge-card ' + (unlocked ? 'unlocked' : 'locked') + '">' +
        '<div class="badge-ico">' + (unlocked ? b.icon : '🔒') + '</div>' +
        '<div class="badge-name">' + esc(b.name) + '</div>' +
        '<div class="badge-desc">' + esc(b.desc) + '</div>' +
        (unlocked
          ? '<div class="mc-bar" style="margin-top:12px"><div style="width:100%;background:var(--amber)"></div></div>'
          : '<div class="mc-bar" style="margin-top:12px"><div style="width:' + pct + '%;background:var(--muted)"></div></div>' +
            '<div class="mc-xp" style="margin-top:7px">' + p[0] + ' / ' + p[1] + '</div>') +
        '</div>';
    });

    html += '</div>';

    html += '<h2 class="section-title">Sua evolução</h2>' +
      '<div class="quick-stats">' +
        statCard(lv.icon, state.xp, 'XP total') +
        statCard('🔥', state.bestStreak, 'melhor sequência') +
        statCard('🧪', state.qTotal, 'questões respondidas') +
        statCard('📈', state.ctgCorrect + '/' + state.ctgTotal, 'desafios de CTG') +
      '</div>' +
      '<div class="sec sec-key" style="margin-top:16px">' +
        '<div class="key-title">Níveis da carreira</div>' +
        '<ul class="key-list">' +
          LEVELS.map((l, i) =>
            '<li>' + (i <= lv.index ? '<b>' : '') + l.icon + ' ' + esc(l.name) +
            ' — ' + l.xp + ' XP' + (i <= lv.index ? ' ✓</b>' : '') + '</li>'
          ).join('') +
        '</ul>' +
      '</div>';

    html += '</div>';
    return html;
  }

  /* ==========================================================
     12. SIMULADOR DE CTG
     ========================================================== */
  let lab = null;
  let labChallenge = null;

  function renderCTGPage() {
    return '<div class="view">' +
      '<header class="mod-header" style="--mc:#22d3ee">' +
        '<div class="mod-head-row">' +
          '<span class="mod-icon">📈</span>' +
          '<div><h1 class="mod-title">Simulador de CTG</h1>' +
          '<p class="mod-sub">Traçados gerados ao vivo — leia, interprete e teste no modo desafio</p></div>' +
        '</div>' +
        '<div class="mod-meta">' +
          '<span class="chip">10 padrões clínicos</span>' +
          '<span class="chip xp">+25 XP por acerto no desafio</span>' +
          '<span class="chip done">' + state.ctgCorrect + '/' + state.ctgTotal + ' desafios certos</span>' +
        '</div>' +
      '</header>' +
      '<div id="labSlot"></div>' +
      '<div class="sec sec-key" style="margin-top:16px">' +
        '<div class="key-title">Como ler em 20 segundos — DR C BRAVADO</div>' +
        '<ul class="key-list">' +
          '<li><b>DR</b> — Define Risk: qual o risco dessa gestação?</li>' +
          '<li><b>C</b> — Contractions: quantas contrações em 10 minutos? (normal ≤ 5)</li>' +
          '<li><b>BRA</b> — Baseline Rate: frequência de base (normal 110-160 bpm)</li>' +
          '<li><b>V</b> — Variability: variabilidade (normal: moderada, 6-25 bpm)</li>' +
          '<li><b>A</b> — Accelerations: tem acelerações? (presentes = tranquilizador)</li>' +
          '<li><b>D</b> — Decelerations: tem desacelerações? De que tipo?</li>' +
          '<li><b>O</b> — Overall: impressão geral e tendência</li>' +
        '</ul>' +
      '</div>' +
      '</div>';
  }

  function getLab() {
    if (lab) return lab;

    const host = document.createElement('div');
    host.className = 'ctg-lab';
    host.innerHTML =
      '<div class="ctg-lab-head">' +
        '<span class="ctg-lab-title">🖥️ Monitor fetal · cardiotocografia</span>' +
        '<span class="ctg-live">ao vivo</span>' +
      '</div>' +
      '<div class="ctg-stage"><div class="ctg-wrap" id="ctgWrap"><canvas class="ctg-canvas" id="ctgCanvas"></canvas></div></div>' +
      '<div class="ctg-controls">' +
        '<button class="btn sm primary" id="ctgPlay">⏸ Pausar</button>' +
        '<div class="ctg-ctl-group">' +
          '<span class="ctg-ctl-label">Velocidade</span>' +
          '<div class="seg" id="ctgSpeed">' +
            '<button data-speed="1">1x</button>' +
            '<button data-speed="2">2x</button>' +
            '<button data-speed="4" class="on">4x</button>' +
            '<button data-speed="8">8x</button>' +
          '</div>' +
        '</div>' +
        '<div class="ctg-ctl-group">' +
          '<span class="ctg-ctl-label">Som do batimento</span>' +
          '<button class="icon-btn small" id="ctgSound">🔇</button>' +
        '</div>' +
        '<button class="btn sm" id="ctgRandom" style="margin-left:auto">🎲 Traçado aleatório</button>' +
      '</div>' +
      '<div class="ctg-presets" id="ctgPresets"></div>' +
      '<div class="ctg-readout" id="ctgReadout"></div>' +
      '<div class="ctg-challenge" id="ctgChallenge"></div>';

    const canvas = host.querySelector('#ctgCanvas');
    const wrap = host.querySelector('#ctgWrap');

    lab = { host, canvas, wrap, playing: true, sound: false, preset: 'normal' };

    CTG.init(canvas, wrap, (evt, data) => {
      if (evt === 'load' && data && data.preset) {
        lab.preset = data.key;
        if (!labChallenge) updateReadout(data.preset, data.key);
        highlightPreset(data.key);
      }
    });

    buildPresetButtons(host);
    buildChallenge(host);
    wireLabControls(host);
    updateReadout(CTG.PRESETS[lab.preset], lab.preset);

    return lab;
  }

  function buildPresetButtons(host) {
    const wrap = host.querySelector('#ctgPresets');
    wrap.innerHTML = Object.keys(CTG.PRESETS).map(k => {
      const p = CTG.PRESETS[k];
      return '<button class="ctg-preset" data-preset="' + k + '" style="--pc:' + p.color + '">' +
        '<span class="dot"></span>' + esc(p.label) + '</button>';
    }).join('');
    wrap.addEventListener('click', e => {
      const btn = e.target.closest('[data-preset]');
      if (!btn) return;
      Sound.fx.click();
      labChallenge = null;
      lab.playing = true;
      setPlayButton(true);
      CTG.load(btn.dataset.preset, { seed: Math.floor(Math.random() * 1e6) });
      CTG.setPlaying(true);
      buildChallenge(host);
    });
  }

  function highlightPreset(key) {
    if (!lab) return;
    lab.host.querySelectorAll('[data-preset]').forEach(b => {
      b.classList.toggle('on', b.dataset.preset === key);
    });
  }

  function wireLabControls(host) {
    host.querySelector('#ctgPlay').addEventListener('click', () => {
      lab.playing = !lab.playing;
      CTG.setPlaying(lab.playing);
      setPlayButton(lab.playing);
      Sound.fx.click();
    });

    host.querySelector('#ctgSpeed').addEventListener('click', e => {
      const btn = e.target.closest('[data-speed]');
      if (!btn) return;
      CTG.setSpeed(parseFloat(btn.dataset.speed));
      host.querySelectorAll('#ctgSpeed button').forEach(b => b.classList.toggle('on', b === btn));
      Sound.fx.click();
    });

    host.querySelector('#ctgSound').addEventListener('click', e => {
      lab.sound = !lab.sound;
      CTG.setSound(lab.sound);
      e.currentTarget.textContent = lab.sound ? '🔊' : '🔇';
      e.currentTarget.classList.toggle('on', lab.sound);
      if (lab.sound) { Sound.unlock(); Sound.fx.monitorBeat(); }
    });

    host.querySelector('#ctgRandom').addEventListener('click', () => {
      Sound.fx.click();
      labChallenge = null;
      const keys = Object.keys(CTG.PRESETS);
      const key = keys[Math.floor(Math.random() * keys.length)];
      lab.playing = true;
      setPlayButton(true);
      CTG.load(key, { seed: Math.floor(Math.random() * 1e6) });
      CTG.setPlaying(true);
      buildChallenge(host);
    });
  }

  function setPlayButton(playing) {
    if (!lab) return;
    const b = lab.host.querySelector('#ctgPlay');
    if (b) b.textContent = playing ? '⏸ Pausar' : '▶ Retomar';
  }

  function variabilityLabel(v) {
    if (v <= 1) return 'Ausente';
    if (v < 6) return 'Mínima';
    if (v <= 25) return 'Moderada';
    return 'Aumentada';
  }

  function updateReadout(preset, key) {
    if (!lab || !preset) return;
    const out = lab.host.querySelector('#ctgReadout');
    if (!out) return;
    const per10 = Math.round(600 / preset.contractions.interval);

    out.innerHTML =
      '<div class="ctg-metrics">' +
        metric('Linha de base', preset.baseline + ' bpm') +
        metric('Variabilidade', variabilityLabel(preset.variability)) +
        metric('Acelerações', preset.accel === 'frequente' ? 'Frequentes' : (preset.accel === 'presente' ? 'Presentes' : 'Ausentes')) +
        metric('Contrações/10min', per10) +
        metric('Categoria', preset.category) +
      '</div>' +
      '<div class="ctg-read"><b>' + esc(preset.label) + '</b> — ' + esc(preset.read) + '</div>' +
      '<div class="ctg-verdict" style="--vc:' + preset.color + '">' + esc(preset.verdict) + '</div>';
  }

  function metric(k, v) {
    return '<div class="ctg-metric"><span class="cm-k">' + esc(k) + '</span><span class="cm-v">' + esc(v) + '</span></div>';
  }

  function buildChallenge(host) {
    const box = host.querySelector('#ctgChallenge');
    if (!box) return;

    if (labChallenge && labChallenge.answered) {
      const preset = CTG.PRESETS[labChallenge.key];
      box.innerHTML =
        '<div class="ctg-ch-head">' +
          '<span class="ctg-ch-title">🎯 Desafio</span>' +
          '<span class="ctg-score">' + state.ctgCorrect + '/' + state.ctgTotal + '</span>' +
        '</div>' +
        '<div class="ctg-ch-feedback">' +
          (labChallenge.right ? '✅ <b>Acertou!</b> ' : '❌ <b>Era ' + esc(preset.label) + '.</b> ') +
          esc(preset.verdict) +
        '</div>' +
        '<div style="margin-top:13px">' +
          '<button class="btn primary" id="ctgNextCh">🎲 Próximo desafio (+25 XP)</button>' +
        '</div>';
      box.querySelector('#ctgNextCh').addEventListener('click', () => { startChallenge(host); });
      return;
    }

    if (labChallenge) {
      const keys = Object.keys(CTG.PRESETS);
      const wrongs = shuffle(keys.filter(k => k !== labChallenge.key)).slice(0, 3);
      const options = shuffle([labChallenge.key].concat(wrongs));
      box.innerHTML =
        '<div class="ctg-ch-head">' +
          '<span class="ctg-ch-title">🎯 Modo desafio</span>' +
          '<span class="ctg-ch-sub">Observe o traçado e escolha o diagnóstico</span>' +
          '<span class="ctg-score">' + state.ctgCorrect + '/' + state.ctgTotal + '</span>' +
        '</div>' +
        '<div class="ctg-answers">' +
          options.map(k => '<button class="ctg-answer" data-answer="' + k + '">' + esc(CTG.PRESETS[k].label) + '</button>').join('') +
        '</div>';
      box.querySelectorAll('[data-answer]').forEach(b => {
        b.addEventListener('click', () => answerChallenge(b.dataset.answer, host));
      });
      return;
    }

    box.innerHTML =
      '<div class="ctg-ch-head">' +
        '<span class="ctg-ch-title">🎯 Modo desafio</span>' +
        '<span class="ctg-ch-sub">Teste sua leitura: um traçado aleatório, 4 opções, +25 XP por acerto.</span>' +
      '</div>' +
      '<button class="btn primary" id="ctgStartCh">▶ Começar desafio</button>';
    box.querySelector('#ctgStartCh').addEventListener('click', () => { startChallenge(host); });
  }

  function startChallenge(host) {
    Sound.fx.click();
    const key = CTG.randomChallenge();
    lab.preset = key;
    lab.playing = true;
    setPlayButton(true);
    labChallenge = { key, answered: false, right: false };
    highlightPreset(key);

    const out = host.querySelector('#ctgReadout');
    if (out) {
      out.innerHTML = '<div class="ctg-read">🔎 <b>Modo desafio ativo.</b> ' +
        'O veredito fica escondido até você responder. Use o DR C BRAVADO: ' +
        'contrações → linha de base → variabilidade → acelerações → desacelerações.</div>';
    }
    buildChallenge(host);
  }

  function answerChallenge(key, host) {
    if (!labChallenge || labChallenge.answered) return;
    const right = key === labChallenge.key;
    labChallenge.answered = true;
    labChallenge.right = right;

    state.ctgTotal += 1;
    if (right) {
      state.ctgCorrect += 1;
      Sound.fx.correct();
      confetti(80);
      addXP(25, { silent: true });
      toast('ok', '🎯', 'Diagnóstico correto!', '+25 XP · ' + state.ctgCorrect + '/' + state.ctgTotal + ' desafios');
    } else {
      Sound.fx.wrong();
      addXP(5, { silent: true });
    }
    saveState();
    renderStats();

    host.querySelectorAll('[data-answer]').forEach(b => {
      b.disabled = true;
      if (b.dataset.answer === labChallenge.key) b.classList.add('correct');
      else if (b.dataset.answer === key) b.classList.add('wrong');
    });

    updateReadout(CTG.PRESETS[labChallenge.key], labChallenge.key);
    checkBadges();

    setTimeout(() => buildChallenge(host), 520);
  }

  function mountLab(slot) {
    if (!slot) return;
    const l = getLab();
    slot.appendChild(l.host);

    if (!slot.classList.contains('sec-ctg-sim')) {
      slot.classList.add('sec');
    }

    requestAnimationFrame(() => {
      CTG.resize();
      highlightPreset(l.preset);
      l.playing = true;
      setPlayButton(true);
      CTG.setPlaying(true);
      CTG.setSound(l.sound);
    });

    cleanupView = () => {
      CTG.setPlaying(false);
      CTG.setSound(false);
    };
  }

  /* ==========================================================
     13. BARRA DE PROGRESSO DE LEITURA
     ========================================================== */
  let readBar = null;

  function updateReadProgress() {
    if (!readBar) {
      readBar = document.createElement('div');
      readBar.className = 'read-progress';
      document.body.appendChild(readBar);
    }
    onScroll();
  }

  function onScroll() {
    if (!readBar) return;
    if (currentView !== 'modulo' && currentView !== 'caso') {
      readBar.style.width = '0';
      return;
    }
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const pct = h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 100;
    readBar.style.width = pct + '%';

    if (pct > 96) {
      const hint = document.getElementById('mfHint');
      if (hint && !hint.dataset.pulsed) {
        hint.dataset.pulsed = '1';
        hint.innerHTML = '🎉 Você chegou ao fim! Marque como concluído para ganhar XP.';
      }
    }
  }

  /* ==========================================================
     14. SIDEBAR MOBILE
     ========================================================== */
  function openSidebar() {
    const sb = document.getElementById('sidebar');
    const sc = document.getElementById('scrim');
    if (sb) sb.classList.add('open');
    if (sc) sc.classList.add('show');
  }

  function closeSidebar() {
    const sb = document.getElementById('sidebar');
    const sc = document.getElementById('scrim');
    if (sb) sb.classList.remove('open');
    if (sc) sc.classList.remove('show');
  }

  /* ==========================================================
     15. INICIALIZAÇÃO
     ========================================================== */
  function init() {
    buildSoundPanel();
    initSound();

    const menuBtn = document.getElementById('menuBtn');
    if (menuBtn) menuBtn.addEventListener('click', () => {
      const sb = document.getElementById('sidebar');
      if (sb && sb.classList.contains('open')) closeSidebar(); else openSidebar();
      Sound.fx.click();
    });

    const scrim = document.getElementById('scrim');
    if (scrim) scrim.addEventListener('click', closeSidebar);

    const soundBtn = document.getElementById('soundBtn');
    if (soundBtn) soundBtn.addEventListener('click', () => {
      Sound.unlock();
      toggleSoundPanel();
      Sound.fx.click();
    });

    const spClose = document.getElementById('spClose');
    if (spClose) spClose.addEventListener('click', () => toggleSoundPanel(false));

    const spGrid = document.getElementById('spGrid');
    if (spGrid) spGrid.addEventListener('click', e => {
      const item = e.target.closest('[data-sound]');
      if (!item) return;
      state.sound.type = item.dataset.sound;
      state.sound.wanted = true;
      Sound.setType(state.sound.type);
      if (!Sound.isPlaying) Sound.playAmbient(state.sound.type);
      saveState();
      syncSoundUI();
      Sound.fx.click();
    });

    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) resetBtn.addEventListener('click', () => {
      if (confirm('Apagar todo o progresso (XP, selos, módulos e respostas)? Isso não pode ser desfeito.')) {
        try { localStorage.removeItem(STORE_KEY); } catch (e) {}
        location.hash = 'inicio';
        location.reload();
      }
    });

    const nav = document.getElementById('nav');
    if (nav) nav.addEventListener('click', e => {
      const item = e.target.closest('[data-nav]');
      if (!item) return;
      Sound.fx.click();
      go(item.dataset.nav);
    });

    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => { if (readBar) onScroll(); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') { closeSidebar(); toggleSoundPanel(false); }
      if (currentView !== 'quiz' || !quiz) return;
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= 4 && !quiz.answered) {
        const btn = $$('#qOptions .q-opt')[n - 1];
        if (btn) btn.click();
      }
      if (e.key === 'Enter' && quiz.answered) {
        const next = document.getElementById('qNext');
        if (next) next.click();
      }
    });

    if (!location.hash) location.hash = 'inicio';
    render();
    renderStats();
    checkBadges();

    const lv = levelInfo(state.xp);
    setTimeout(() => {
      if (!state.qTotal && !Object.keys(state.modulesRead).length) {
        toast('', '👩‍⚕️', 'Bem-vinda ao Sofrimento Fetal Academy!',
          'Você está no nível <b>' + lv.name + '</b>. Comece pelo módulo 1.', 6200);
      }
    }, 1200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
