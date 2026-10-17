/* ============================================================
   SIMULADOR DE CARDIOTOCOGRAFIA (CTG)
   Gera traçados sintéticos realistas em canvas, com animação
   ao vivo, presets didáticos e modo desafio com pontuação.
   ============================================================ */

const CTG = (() => {

  /* ---------------- presets didáticos ---------------- */
  const PRESETS = {
    normal: {
      label: 'Normal',
      short: 'Categoria I',
      baseline: 140, variability: 7, accel: 'frequente',
      decel: null,
      contractions: { interval: 185, duration: 55 },
      category: 'I',
      color: '#22c55e',
      read: 'Linha de base 140 bpm · variabilidade moderada · acelerações presentes · sem desacelerações · 3 contrações/10 min.',
      verdict: 'Categoria I — estado ácido-base normal. Seguir vigilância de rotina.'
    },
    dip1: {
      label: 'DIP I',
      short: 'Precoce',
      baseline: 138, variability: 8, accel: 'presente',
      decel: { type: 'dip1', depth: 26 },
      contractions: { interval: 175, duration: 58 },
      category: 'I',
      color: '#34d399',
      read: 'Desacelerações graduais que começam e terminam junto com a contração; nadir no pico da contração.',
      verdict: 'DIP I (precoce) — compressão do polo cefálico. Fisiológico, sem indicação de intervenção.'
    },
    dip2: {
      label: 'DIP II',
      short: 'Tardia',
      baseline: 145, variability: 6, accel: 'ausente',
      decel: { type: 'dip2', depth: 32 },
      contractions: { interval: 180, duration: 60 },
      category: 'II',
      color: '#ef4444',
      read: 'Desacelerações graduais com nadir DEPOIS do pico da contração e recuperação após o fim da contração, recorrentes.',
      verdict: 'DIP II (tardias) — insuficiência placentária. SINAL CLÁSSICO DE SOFRIMENTO FETAL. Iniciar L.O.S.S. e reavaliar em 10-15 min.'
    },
    dip3: {
      label: 'DIP III',
      short: 'Variável',
      baseline: 142, variability: 9, accel: 'presente',
      decel: { type: 'dip3', depth: 45 },
      contractions: { interval: 165, duration: 55 },
      category: 'II',
      color: '#f59e0b',
      read: 'Quedas abruptas, em "V", com início, profundidade e duração variáveis, sem relação fixa com a contração.',
      verdict: 'DIP III (variáveis) — compressão de cordão. Se típicas, geralmente benignas; se complicadas (sem retorno, perda de variabilidade, overshoot), exigem ação.'
    },
    bradi: {
      label: 'Bradicardia',
      short: 'Basal < 110',
      baseline: 92, variability: 4, accel: 'ausente',
      decel: null,
      contractions: { interval: 190, duration: 55 },
      category: 'II',
      color: '#f43f5e',
      read: 'Linha de base sustentada abaixo de 110 bpm (92 bpm), com variabilidade reduzida.',
      verdict: 'Bradicardia — sinal grave. Excluir prolapso de cordão (toque vaginal), hipotensão materna e DPP. Reanimação intrauterina imediata.'
    },
    taqui: {
      label: 'Taquicardia',
      short: 'Basal > 160',
      baseline: 178, variability: 5, accel: 'ausente',
      decel: null,
      contractions: { interval: 185, duration: 55 },
      category: 'II',
      color: '#fb923c',
      read: 'Linha de base sustentada acima de 160 bpm (178 bpm).',
      verdict: 'Taquicardia — considerar febre/intra-amniotic infection, corioamnionite, hipóxia inicial, anemia fetal, uso de drogas (beta-agonistas).'
    },
    variabausente: {
      label: 'Variabilidade ausente',
      short: 'Linha "reta"',
      baseline: 148, variability: 0.8, accel: 'ausente',
      decel: { type: 'dip2', depth: 22 },
      contractions: { interval: 175, duration: 58 },
      category: 'III',
      color: '#a855f7',
      read: 'Traçado praticamente sem oscilação da linha de base, associado a desacelerações tardias recorrentes.',
      verdict: 'Categoria III — ausência de variabilidade + desacelerações tardias recorrentes. Prediz acidose. Parto imediato.'
    },
    sinusoidal: {
      label: 'Padrão sinusoidal',
      short: 'Ondas regulares',
      baseline: 145, variability: 0, accel: 'ausente',
      decel: null, sinusoidal: true,
      contractions: { interval: 200, duration: 50 },
      category: 'III',
      color: '#e879f9',
      read: 'Oscilação regular, em forma de onda, com frequência de 3-5 ciclos por minuto e amplitude fixa.',
      verdict: 'Padrão sinusoidal — anemia fetal grave (aloisoimunização Rh, hemorragia fetomaterna). Categoria III. Investigar e resolver a gestação.'
    },
    taquissistolia: {
      label: 'Taquissistolia',
      short: '> 5 contrações/10 min',
      baseline: 150, variability: 5, accel: 'ausente',
      decel: { type: 'dip3', depth: 40 },
      contractions: { interval: 78, duration: 60 },
      category: 'II',
      color: '#f97316',
      read: 'Mais de 5 contrações em 10 minutos (aqui ~7), sem intervalo de descanso adequado, com desacelerações variáveis recorrentes.',
      verdict: 'Taquissistolia / hiperestimulação uterina — causa iatrogênica frequente (ocitocina). Suspender a ocitocina, lateralizar, O₂ e hidratar.'
    },
    prolongada: {
      label: 'Desaceleração prolongada',
      short: '≥ 2 minutos',
      baseline: 146, variability: 5, accel: 'ausente',
      decel: { type: 'prolongada', depth: 62 },
      contractions: { interval: 180, duration: 55 },
      category: 'III',
      color: '#8b5cf6',
      read: 'Queda de mais de 15 bpm que permanece abaixo da linha de base por 2 minutos ou mais.',
      verdict: 'Desaceleração prolongada — emergência. Reanimação intrauterina imediata e exclusão de prolapso de cordão, DPP e hipotensão.'
    }
  };

  /* ---------------- gerador de traçado ---------------- */
  function mulberry32(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  const smooth = p => p * p * (3 - 2 * p);

  function dipAt(t, s, n, e, depth) {
    if (t < s || t > e) return 0;
    if (t <= n) return -depth * smooth((t - s) / Math.max(1, n - s));
    return -depth * (1 - smooth((t - n) / Math.max(1, e - n)));
  }

  function bumpAt(t, start, dur, height) {
    if (t < start || t > start + dur) return 0;
    const p = (t - start) / dur;
    return height * Math.sin(Math.PI * p) ** 1.6;
  }

  function uaAt(t, conts, dur, peak) {
    for (const c of conts) {
      if (t >= c && t <= c + dur) {
        const p = (t - c) / dur;
        return peak * Math.sin(Math.PI * p) ** 1.5;
      }
    }
    return 2 + Math.random() * 1.5;
  }

  function buildTrace(key, totalSec, seed) {
    const p = PRESETS[key];
    const rnd = mulberry32(seed);

    // contrações
    const conts = [];
    const cInterval = p.contractions.interval;
    const cDur = p.contractions.duration;
    for (let c = 35; c < totalSec + cDur; c += cInterval) conts.push(c);

    const fhr = new Float32Array(totalSec + 1);
    const ua = new Float32Array(totalSec + 1);

    // eventos de desaceleração
    const decels = [];
    if (p.decel) {
      if (p.decel.type === 'prolongada') {
        decels.push({ s: 130, n: 235, e: 315, depth: p.decel.depth });
      } else {
        for (const c of conts) {
          const peak = c + cDur / 2;
          if (p.decel.type === 'dip1') {
            decels.push({ s: peak - 46, n: peak, e: peak + 46, depth: p.decel.depth * (0.9 + rnd() * 0.2) });
          } else if (p.decel.type === 'dip2') {
            decels.push({ s: c + 18, n: c + cDur + 4, e: c + cDur + 46, depth: p.decel.depth * (0.9 + rnd() * 0.2) });
          } else { // dip3
            const off = -10 + rnd() * 55;
            const depth = p.decel.depth * (0.55 + rnd() * 0.8);
            const s = c + off;
            decels.push({ s, n: s + 8, e: s + 34 + rnd() * 22, depth, abrupt: true });
          }
        }
      }
    }

    // acelerações
    const accels = [];
    if (p.accel === 'frequente' || p.accel === 'presente') {
      const step = p.accel === 'frequente' ? 55 : 95;
      for (let a = 20; a < totalSec; a += step + rnd() * 30) {
        accels.push({ s: a, dur: 16 + rnd() * 8, h: 16 + rnd() * 12 });
      }
    }

    for (let t = 0; t <= totalSec; t++) {
      let v = p.baseline;

      if (p.sinusoidal) {
        // padrão sinusoidal puro: onda regular 4 ciclos/min
        v += 9 * Math.sin((2 * Math.PI * t) / 15);
        v += (rnd() - 0.5) * 1.2;
      } else {
        // variabilidade da linha de base
        const amp = p.variability;
        v += Math.sin(t * 0.33) * amp * 0.45;
        v += Math.sin(t * 0.81 + 1.7) * amp * 0.30;
        v += Math.sin(t * 1.9 + 0.4) * amp * 0.18;
        v += (rnd() - 0.5) * amp * 0.75;

        // acelerações
        for (const a of accels) v += bumpAt(t, a.s, a.dur, a.h);

        // desacelerações
        for (const d of decels) {
          if (d.abrupt) {
            // formato em "V" abrupto
            if (t >= d.s && t <= d.e) {
              const down = 9, up = 9;
              let k;
              if (t <= d.n) k = smooth((t - d.s) / down);
              else if (t >= d.e - up) k = smooth((d.e - t) / up);
              else k = 1;
              v -= d.depth * Math.min(1, Math.max(0, k));
            }
          } else {
            v += dipAt(t, d.s, d.n, d.e, d.depth);
          }
        }
      }

      fhr[t] = Math.max(50, Math.min(205, v));
      ua[t] = uaAt(t, conts, cDur, 62 + rnd() * 10);
    }

    return { fhr, ua, conts, decels, preset: p, key, totalSec };
  }

  /* ---------------- estado ---------------- */
  const S = {
    canvas: null, ctx: null, wrap: null,
    trace: null, key: 'normal',
    t: 0, playing: true, speed: 4,
    window: 600,            // 10 minutos visíveis
    raf: null, lastTs: 0,
    dpr: 1,
    soundOn: false,
    lastBeat: 0,
    challenge: null,
    onEvent: null
  };

  /* ---------------- desenho ---------------- */
  function resize() {
    if (!S.canvas || !S.wrap) return;
    const w = S.wrap.clientWidth;
    const h = Math.max(320, Math.min(460, w * 0.46));
    S.dpr = Math.min(window.devicePixelRatio || 1, 2);
    S.canvas.width = w * S.dpr;
    S.canvas.height = h * S.dpr;
    S.canvas.style.width = w + 'px';
    S.canvas.style.height = h + 'px';
    S.ctx.setTransform(S.dpr, 0, 0, S.dpr, 0, 0);
    draw();
  }

  function draw() {
    const c = S.ctx;
    if (!c) return;
    const W = S.canvas.width / S.dpr;
    const H = S.canvas.height / S.dpr;

    // fundo
    c.fillStyle = '#0b1220';
    c.fillRect(0, 0, W, H);

    const padL = 52, padR = 14, padT = 16, padB = 18;
    const fhrH = (H - padT - padB) * 0.62;
    const uaH = (H - padT - padB) * 0.30;
    const uaTop = padT + fhrH + (H - padT - padB) * 0.08;

    const fhrMin = 60, fhrMax = 200;
    const xOf = t => padL + ((t - (S.t - S.window)) / S.window) * (W - padL - padR);
    const yFhr = v => padT + ((fhrMax - v) / (fhrMax - fhrMin)) * fhrH;
    const yUa = v => uaTop + uaH - (v / 100) * uaH;

    /* ---- grade ---- */
    const t0 = Math.floor((S.t - S.window) / 60) * 60;
    c.strokeStyle = 'rgba(56,189,248,0.10)';
    c.lineWidth = 1;
    for (let tt = t0; tt <= S.t + 1; tt += 30) {
      const x = xOf(tt);
      if (x < padL - 1 || x > W - padR + 1) continue;
      c.beginPath(); c.moveTo(x, padT); c.lineTo(x, padT + fhrH); c.stroke();
    }
    // linhas de minuto mais fortes
    c.strokeStyle = 'rgba(56,189,248,0.22)';
    for (let tt = Math.ceil((S.t - S.window) / 60) * 60; tt <= S.t; tt += 60) {
      const x = xOf(tt);
      if (x < padL || x > W - padR) continue;
      c.beginPath(); c.moveTo(x, padT); c.lineTo(x, padT + fhrH); c.stroke();
      c.beginPath(); c.moveTo(x, uaTop); c.lineTo(x, uaTop + uaH); c.stroke();
    }
    // horizontais FHR
    c.strokeStyle = 'rgba(148,163,184,0.16)';
    for (let v = 60; v <= 200; v += 10) {
      const y = yFhr(v);
      c.beginPath(); c.moveTo(padL, y); c.lineTo(W - padR, y); c.stroke();
    }
    // faixa normal 110-160
    c.fillStyle = 'rgba(34,197,94,0.07)';
    c.fillRect(padL, yFhr(160), W - padL - padR, yFhr(110) - yFhr(160));
    c.strokeStyle = 'rgba(34,197,94,0.30)';
    c.setLineDash([5, 5]);
    [110, 160].forEach(v => { const y = yFhr(v); c.beginPath(); c.moveTo(padL, y); c.lineTo(W - padR, y); c.stroke(); });
    c.setLineDash([]);

    // rótulos eixo FHR
    c.fillStyle = '#64748b';
    c.font = '600 10px ui-monospace, monospace';
    c.textAlign = 'right';
    for (let v = 60; v <= 200; v += 20) c.fillText(v + '', padL - 7, yFhr(v) + 3.5);

    // rótulo eixo UA
    c.textAlign = 'right';
    c.fillStyle = '#64748b';
    c.fillText('100', padL - 7, uaTop + 6);
    c.fillText('0', padL - 7, uaTop + uaH);

    // separadores de bloco
    c.fillStyle = 'rgba(148,163,184,0.55)';
    c.font = '700 10px Inter, sans-serif';
    c.textAlign = 'left';
    c.fillText('FC fetal (bpm)', padL + 4, padT + 11);
    c.fillText('Contrações uterinas', padL + 4, uaTop + 11);
    c.fillText('min →', W - padR - 34, uaTop + uaH + 13);

    if (!S.trace) return;

    /* ---- traçado FC fetal ---- */
    const start = Math.max(0, Math.floor(S.t - S.window));
    const end = Math.min(S.trace.fhr.length - 1, Math.floor(S.t));

    // área preenchida
    c.beginPath();
    for (let t = start; t <= end; t++) {
      const x = xOf(t), y = yFhr(S.trace.fhr[t]);
      if (t === start) c.moveTo(x, y); else c.lineTo(x, y);
    }
    c.strokeStyle = S.trace.preset.color;
    c.lineWidth = 1.7;
    c.lineJoin = 'round';
    c.shadowColor = S.trace.preset.color;
    c.shadowBlur = 7;
    c.stroke();
    c.shadowBlur = 0;

    /* ---- contrações ---- */
    c.beginPath();
    for (let t = start; t <= end; t++) {
      const x = xOf(t), y = yUa(S.trace.ua[t]);
      if (t === start) c.moveTo(x, y); else c.lineTo(x, y);
    }
    c.strokeStyle = '#94a3b8';
    c.lineWidth = 1.6;
    c.stroke();
    c.lineTo(xOf(end), uaTop + uaH);
    c.lineTo(xOf(start), uaTop + uaH);
    c.closePath();
    c.fillStyle = 'rgba(148,163,184,0.13)';
    c.fill();

    /* ---- marcadores de evento ---- */
    const colX = xOf(S.t);
    if (colX > padL && colX < W - padR) {
      c.strokeStyle = 'rgba(226,232,240,0.55)';
      c.lineWidth = 1;
      c.setLineDash([3, 4]);
      c.beginPath(); c.moveTo(colX, padT); c.lineTo(colX, uaTop + uaH); c.stroke();
      c.setLineDash([]);
    }

    // legenda de categoria
    const cat = S.trace.preset.category;
    const catColor = cat === 'I' ? '#22c55e' : cat === 'II' ? '#f59e0b' : '#ef4444';
    c.font = '800 11px Inter, sans-serif';
    c.textAlign = 'right';
    c.fillStyle = catColor;
    if (!S.challenge) c.fillText('Categoria ' + cat, W - padR - 4, padT + 11);
  }

  /* ---- som do monitor (batimento sincronizado) ---- */
  function monitorTick() {
    if (!S.soundOn || !S.trace || !S.playing) return;
    const idx = Math.min(S.trace.fhr.length - 1, Math.floor(S.t));
    const bpm = S.trace.fhr[idx];
    const interval = 60000 / bpm;
    const now = performance.now();
    if (now - S.lastBeat >= interval) {
      S.lastBeat = now;
      Sound.fx.monitorBeat();
    }
  }

  /* ---------------- loop ---------------- */
  function frame(ts) {
    if (!S.lastTs) S.lastTs = ts;
    const dt = Math.min(0.1, (ts - S.lastTs) / 1000);
    S.lastTs = ts;

    if (S.playing && S.trace) {
      S.t += dt * S.speed;
      if (S.t >= S.trace.totalSec) {
        // reinicia mantendo continuidade visual
        S.t = 40;
      }
    }
    monitorTick();
    draw();
    S.raf = requestAnimationFrame(frame);
  }

  function startLoop() {
    if (S.raf) return;
    S.lastTs = 0;
    S.raf = requestAnimationFrame(frame);
  }

  /* ---------------- API ---------------- */
  function load(key, opts = {}) {
    const seed = opts.seed != null ? opts.seed : (Date.now() % 100000);
    S.trace = buildTrace(key, 900, seed);
    S.key = key;
    S.t = opts.reset === false ? S.t : 60;
    draw();
    if (S.onEvent) S.onEvent('load', { key, preset: PRESETS[key] });
  }

  function init(canvasEl, wrapEl, onEvent) {
    S.canvas = canvasEl;
    S.wrap = wrapEl;
    S.ctx = canvasEl.getContext('2d');
    S.onEvent = onEvent || null;
    resize();
    if (window.ResizeObserver) new ResizeObserver(resize).observe(wrapEl);
    window.addEventListener('resize', resize);
    load('normal', { seed: 42 });
    startLoop();
    return S;
  }

  function setPlaying(v) { S.playing = v; }
  function setSpeed(v) { S.speed = v; }
  function setSound(v) { S.soundOn = v; }

  function randomChallenge() {
    const keys = Object.keys(PRESETS);
    const key = keys[Math.floor(Math.random() * keys.length)];
    const seed = Math.floor(Math.random() * 1e6);
    S.challenge = key;
    S.trace = buildTrace(key, 900, seed);
    S.key = key;
    S.t = 40;
    S.playing = true;
    return key;
  }

  function revealCurrent() { return PRESETS[S.key]; }

  return { init, load, setPlaying, setSpeed, setSound, randomChallenge, revealCurrent, PRESETS, S, resize };
})();
