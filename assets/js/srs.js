/* ============================================================
   SRS — REVISÃO ESPAÇADA (estilo Anki)
   Motor de agendamento SM-2 simplificado, sem dependências.
   Mantém o estado de cada cartão em memória; a persistência
   fica a cargo do app (localStorage).
   ============================================================ */

const SRS = (() => {

  const MIN = 60000;
  const DAY = 86400000;

  /* passos de aprendizado, em minutos (como no Anki) */
  const LEARNING_STEPS = [1, 10];

  /* teto diário de cartões novos — evita montanha de revisão */
  const NEW_PER_DAY = 20;

  const RATINGS = [
    { id: 1, key: 'again', label: 'Errei',      hint: 'não lembrei',      cls: 'again' },
    { id: 2, key: 'hard',  label: 'Difícil',    hint: 'lembrei com custo', cls: 'hard' },
    { id: 3, key: 'good',  label: 'Bom',        hint: 'lembrei bem',      cls: 'good' },
    { id: 4, key: 'easy',  label: 'Fácil',      hint: 'foi imediato',     cls: 'easy' }
  ];

  /* ---------------- estado inicial de um cartão ---------------- */
  function newCard(now) {
    return {
      state: 'new',   // new · learning · review
      step: 0,
      ease: 2.5,
      ivl: 0,         // intervalo em dias
      reps: 0,
      lapses: 0,
      due: now || Date.now(),
      last: 0
    };
  }

  /* ---------------- agendamento ---------------- */
  function schedule(card, rating, now) {
    now = now || Date.now();
    const c = Object.assign({}, card || newCard(now));
    c.reps = (c.reps || 0) + 1;
    c.last = now;

    const learning = c.state === 'new' || c.state === 'learning';

    if (learning) {
      if (rating === 1) {
        // errei: volta ao primeiro passo
        c.state = 'learning';
        c.step = 0;
        c.due = now + LEARNING_STEPS[0] * MIN;
      } else if (rating === 2) {
        // difícil: fica mais tempo no aprendizado
        c.state = 'learning';
        c.step = 0;
        c.due = now + 6 * MIN;
      } else if (rating === 3) {
        // bom: avança um passo; no fim, gradua
        const next = (c.step || 0) + 1;
        if (next >= LEARNING_STEPS.length) {
          c.state = 'review';
          c.ivl = 1;
          c.due = now + DAY;
        } else {
          c.state = 'learning';
          c.step = next;
          c.due = now + LEARNING_STEPS[next] * MIN;
        }
      } else {
        // fácil: sai do aprendizado direto
        c.state = 'review';
        c.ivl = 4;
        c.ease = 2.65;
        c.due = now + 4 * DAY;
      }
      return c;
    }

    /* ---- cartão em revisão ---- */
    if (rating === 1) {
      c.lapses = (c.lapses || 0) + 1;
      c.ease = Math.max(1.3, c.ease - 0.2);
      c.state = 'learning';
      c.step = 0;
      c.ivl = Math.max(1, Math.round(c.ivl * 0.4));
      c.due = now + 10 * MIN;
    } else if (rating === 2) {
      c.ease = Math.max(1.3, c.ease - 0.15);
      c.ivl = Math.max(1, c.ivl * 1.2);
      c.due = now + Math.round(c.ivl * DAY);
    } else if (rating === 3) {
      c.ivl = Math.max(1, c.ivl * c.ease);
      c.due = now + Math.round(c.ivl * DAY);
    } else {
      c.ease = Math.min(3.2, c.ease + 0.15);
      c.ivl = Math.max(1, c.ivl * c.ease * 1.3);
      c.due = now + Math.round(c.ivl * DAY);
    }
    return c;
  }

  /* ---------------- texto do intervalo ("10 min", "3 d") ---------------- */
  function intervalLabel(card, rating, now) {
    now = now || Date.now();
    const c = schedule(card, rating, now);
    return humanize(c.due - now);
  }

  function humanize(ms) {
    if (ms < 0) ms = 0;
    if (ms < MIN) return '<1 min';
    if (ms < 60000 * 60) return Math.round(ms / MIN) + ' min';
    if (ms < DAY) {
      const h = Math.round(ms / (60000 * 60));
      return h + ' h';
    }
    const d = ms / DAY;
    if (d < 30) return (d < 10 ? d.toFixed(1).replace('.0', '') : Math.round(d)) + ' d';
    const m = d / 30;
    if (m < 12) return Math.round(m) + ' mês' + (Math.round(m) > 1 ? 'es' : '');
    return (d / 365).toFixed(1) + ' a';
  }

  /* ---------------- classificação para a fila de hoje ---------------- */
  function isDue(card, now) {
    now = now || Date.now();
    return !!card && card.due <= now;
  }

  function isNew(card) {
    return !card || card.state === 'new';
  }

  /* ---------------- montagem dos baralhos ---------------- */
  function glossaryCards() {
    const mod = (typeof MODULES !== 'undefined' ? MODULES : []).find(m => m.id === 'glossario');
    if (!mod) return [];
    const sec = mod.sections.find(s => s.type === 'flashcards');
    if (!sec) return [];
    return sec.cards.map((c, i) => ({
      id: 'g:' + i,
      deck: 'glossario',
      front: c.q,
      back: c.a,
      tag: 'glossario'
    }));
  }

  function questionCards() {
    const list = (typeof QUESTIONS !== 'undefined' ? QUESTIONS : []);
    return list.map((q, i) => {
      const correct = q.o[q.a];
      const back = '<b>' + correct + '</b>' + (q.e ? '<br><br>' + q.e : '');
      return {
        id: 'q:' + i,
        deck: 'questoes',
        front: q.q,
        back: back,
        tag: 'questao',
        src: q.src || null
      };
    });
  }

  function decks() {
    const g = glossaryCards();
    const q = questionCards();
    return [
      { id: 'glossario', name: 'Glossário', icon: '📖', cards: g,
        desc: 'Termos e definições do glossário' },
      { id: 'questoes', name: 'Questões', icon: '🧪', cards: q,
        desc: 'Pergunta de um lado, resposta comentada do outro' },
      { id: 'tudo', name: 'Tudo', icon: '🎯', cards: g.concat(q),
        desc: 'Glossário + questões em um só baralho' }
    ];
  }

  function deckById(id) {
    return decks().find(d => d.id === id) || decks()[0];
  }

  /* ---------------- fila do dia ----------------
     Ordem como no Anki: aprendizado atrasado → revisão vencida → novos. */
  function buildQueue(deckId, cardsState, now, newLimit) {
    now = now || Date.now();
    const deck = deckById(deckId);
    const state = cardsState || {};
    const limit = newLimit == null ? NEW_PER_DAY : newLimit;

    const learning = [], review = [], fresh = [];

    deck.cards.forEach(card => {
      const st = state[card.id];
      if (!st || st.state === 'new') { fresh.push(card); return; }
      if (st.due > now) return;                       // ainda não venceu
      if (st.state === 'learning') learning.push(card);
      else review.push(card);
    });

    const byDue = (a, b) => (state[a.id] ? state[a.id].due : 0) - (state[b.id] ? state[b.id].due : 0);
    learning.sort(byDue);
    review.sort(byDue);

    // novos entram até o limite diário; o resto espera outro dia
    const novos = fresh.slice(0, limit);

    return {
      queue: learning.concat(review).concat(novos),
      counts: {
        learning: learning.length,
        review: review.length,
        newCards: novos.length,
        newRemaining: Math.max(0, fresh.length - novos.length),
        total: learning.length + review.length + novos.length
      }
    };
  }

  /* ---------------- estatísticas gerais ---------------- */
  function deckStats(deckId, cardsState, now) {
    now = now || Date.now();
    const deck = deckById(deckId);
    const state = cardsState || {};
    let seen = 0, matured = 0, learning = 0, dueNow = 0, fresh = 0;

    deck.cards.forEach(c => {
      const st = state[c.id];
      if (!st || st.state === 'new') { fresh++; return; }
      seen++;
      if (st.state === 'learning') learning++;
      if (st.state === 'review') {
        matured++;
        if (st.due <= now) dueNow++;
      }
      if (st.state === 'learning' && st.due <= now) dueNow++;
    });

    return { total: deck.cards.length, seen, matured, learning, dueNow, fresh };
  }

  /* ---------------- exportação para o Anki ----------------
     O Anki importa texto com cabeçalho: #separator / #html / #deck. */
  function toAnkiText(deckId) {
    const deck = deckById(deckId);
    const lines = [
      '#separator:tab',
      '#html:true',
      '#deck:Sofrimento Fetal',
      '#notetype:Basic'
    ];
    deck.cards.forEach(c => {
      const back = String(c.back).replace(/\t/g, ' ');
      lines.push(String(c.front).replace(/\t/g, ' ') + '\t' + back + '\t' + (c.tag || ''));
    });
    return lines.join('\n');
  }

  return {
    MIN, DAY, NEW_PER_DAY, LEARNING_STEPS, RATINGS,
    newCard, schedule, intervalLabel, humanize, isDue, isNew,
    decks, deckById, glossaryCards, questionCards,
    buildQueue, deckStats, toAnkiText
  };
})();
