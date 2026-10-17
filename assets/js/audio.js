/* ============================================================
   MOTOR DE SOM AMBIENTE — 100% Web Audio API
   Nenhum arquivo de áudio externo: tudo é sintetizado ao vivo.
   Isso garante que funcione offline e no GitHub Pages sem CORS.
   ============================================================ */

const Sound = (() => {
  let ctx = null;
  let master = null;
  let current = null;      // nó atual do ambiente
  let currentType = null;
  let started = false;

  const state = {
    enabled: false,
    type: 'chuva',
    volume: 0.35,
    fxEnabled: true
  };

  /* ---------- utilidades ---------- */
  function ensureCtx() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    return ctx;
  }

  /* Buffer de ruído branco (base para todos os ambientes) */
  function noiseBuffer(seconds = 4) {
    const len = ctx.sampleRate * seconds;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    return buf;
  }

  /* Converte ruído branco em marrom (integração) */
  function brownBuffer(seconds = 6) {
    const len = ctx.sampleRate * seconds;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      last = (last + 0.02 * w) / 1.02;
      d[i] = last * 3.5;
    }
    return buf;
  }

  /* Converte em rosa (filtro aproximado de Voss simplificado) */
  function pinkBuffer(seconds = 6) {
    const len = ctx.sampleRate * seconds;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + w * 0.0555179;
      b1 = 0.99332 * b1 + w * 0.0750759;
      b2 = 0.96900 * b2 + w * 0.1538520;
      b3 = 0.86650 * b3 + w * 0.3104856;
      b4 = 0.55000 * b4 + w * 0.5329522;
      b5 = -0.7616 * b5 - w * 0.0168980;
      d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
      b6 = w * 0.115926;
    }
    return buf;
  }

  /* ---------- construtores de ambiente ---------- */
  const builders = {

    /* CHUVA: ruído rosa filtrado + gotas aleatórias */
    chuva() {
      const src = ctx.createBufferSource();
      src.buffer = pinkBuffer(8);
      src.loop = true;

      const hp = ctx.createBiquadFilter();
      hp.type = 'highpass'; hp.frequency.value = 320;

      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = 6500; lp.Q.value = 0.4;

      const g = ctx.createGain(); g.gain.value = 0.55;

      src.connect(hp).connect(lp).connect(g);
      src.start();

      // camada de "gotas" — bursts curtos em alta frequência
      const dropGain = ctx.createGain(); dropGain.gain.value = 0.16;
      dropGain.connect(master);
      const dropTimer = setInterval(() => {
        if (!state.enabled) return;
        const n = 1 + Math.floor(Math.random() * 3);
        for (let i = 0; i < n; i++) {
          const o = ctx.createOscillator();
          const og = ctx.createGain();
          const f = 2200 + Math.random() * 4200;
          o.type = 'triangle';
          o.frequency.setValueAtTime(f, ctx.currentTime);
          o.frequency.exponentialRampToValueAtTime(f * 0.55, ctx.currentTime + 0.06);
          og.gain.setValueAtTime(0, ctx.currentTime);
          og.gain.linearRampToValueAtTime(0.5 * Math.random(), ctx.currentTime + 0.004);
          og.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.09);
          o.connect(og).connect(dropGain);
          o.start(); o.stop(ctx.currentTime + 0.1);
        }
      }, 260);

      return { nodes: [g], out: g, cleanups: [() => clearInterval(dropTimer), () => { try { src.stop(); } catch (e) {} }] };
    },

    /* OCEANO: ruído marrom + LFO lento de volume e filtro = ondas */
    oceano() {
      const src = ctx.createBufferSource();
      src.buffer = brownBuffer(10);
      src.loop = true;

      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = 700; lp.Q.value = 0.9;

      const g = ctx.createGain(); g.gain.value = 0.35;

      // LFO de onda
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.075;               // ~1 onda a cada 13 s
      const lfoGain = ctx.createGain(); lfoGain.gain.value = 0.28;
      lfo.connect(lfoGain).connect(g.gain);

      const lfo2 = ctx.createOscillator();
      lfo2.frequency.value = 0.075;
      const lfo2Gain = ctx.createGain(); lfo2Gain.gain.value = 420;
      lfo2.connect(lfo2Gain).connect(lp.frequency);

      src.connect(lp).connect(g);
      src.start(); lfo.start(); lfo2.start();

      return {
        nodes: [g], out: g,
        cleanups: [() => { try { src.stop(); lfo.stop(); lfo2.stop(); } catch (e) {} }]
      };
    },

    /* RUÍDO MARROM: o clássico "concentração" */
    marrom() {
      const src = ctx.createBufferSource();
      src.buffer = brownBuffer(10);
      src.loop = true;
      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass'; lp.frequency.value = 1400;
      const g = ctx.createGain(); g.gain.value = 0.5;
      src.connect(lp).connect(g);
      src.start();
      return { nodes: [g], out: g, cleanups: [() => { try { src.stop(); } catch (e) {} }] };
    },

    /* RUÍDO ROSA: mais suave, bom para leitura */
    rosa() {
      const src = ctx.createBufferSource();
      src.buffer = pinkBuffer(8);
      src.loop = true;
      const g = ctx.createGain(); g.gain.value = 0.42;
      src.connect(g);
      src.start();
      return { nodes: [g], out: g, cleanups: [() => { try { src.stop(); } catch (e) {} }] };
    },

    /* FOCO (binaural 40 Hz — ondas gama) + pad suave */
    foco() {
      const merger = ctx.createChannelMerger(2);
      const base = 200;

      const l = ctx.createOscillator(); l.type = 'sine'; l.frequency.value = base;
      const r = ctx.createOscillator(); r.type = 'sine'; r.frequency.value = base + 40; // batimento 40 Hz

      const lg = ctx.createGain(); lg.gain.value = 0.10;
      const rg = ctx.createGain(); rg.gain.value = 0.10;

      l.connect(lg).connect(merger, 0, 0);
      r.connect(rg).connect(merger, 0, 1);

      // pad de fundo
      const pad = ctx.createBufferSource();
      pad.buffer = pinkBuffer(8); pad.loop = true;
      const padLp = ctx.createBiquadFilter();
      padLp.type = 'lowpass'; padLp.frequency.value = 500;
      const padG = ctx.createGain(); padG.gain.value = 0.18;
      pad.connect(padLp).connect(padG).connect(merger);

      const g = ctx.createGain(); g.gain.value = 0.9;
      merger.connect(g);

      l.start(); r.start(); pad.start();

      return {
        nodes: [g], out: g,
        cleanups: [() => { try { l.stop(); r.stop(); pad.stop(); } catch (e) {} }]
      };
    },

    /* BATIMENTO FETAL (140 bpm) — ambiente clínico/monitor */
    batimento() {
      const g = ctx.createGain(); g.gain.value = 0.85;

      // som de fundo do monitor
      const bg = ctx.createBufferSource();
      bg.buffer = brownBuffer(6); bg.loop = true;
      const bgLp = ctx.createBiquadFilter();
      bgLp.type = 'lowpass'; bgLp.frequency.value = 380;
      const bgG = ctx.createGain(); bgG.gain.value = 0.10;
      bg.connect(bgLp).connect(bgG).connect(g);
      bg.start();

      const BPM = 140;
      const interval = 60000 / BPM;   // ~429 ms

      function thump(when, freq, amp) {
        const o = ctx.createOscillator();
        const og = ctx.createGain();
        o.type = 'sine';
        o.frequency.setValueAtTime(freq, when);
        o.frequency.exponentialRampToValueAtTime(freq * 0.55, when + 0.13);
        og.gain.setValueAtTime(0, when);
        og.gain.linearRampToValueAtTime(amp, when + 0.012);
        og.gain.exponentialRampToValueAtTime(0.0001, when + 0.19);
        o.connect(og).connect(g);
        o.start(when); o.stop(when + 0.22);
      }

      let next = ctx.currentTime + 0.1;
      const timer = setInterval(() => {
        if (!state.enabled) return;
        while (next < ctx.currentTime + 0.4) {
          // "lub-dub" do coração fetal (sons agudos, tipo Doppler)
          thump(next, 420, 0.30);
          thump(next + 0.11, 330, 0.18);
          next += interval / 1000;
        }
      }, 120);

      return { nodes: [g], out: g, cleanups: [() => clearInterval(timer), () => { try { bg.stop(); } catch (e) {} }] };
    }
  };

  /* ---------- API pública ---------- */
  function fadeTo(target, ms = 700) {
    if (!master) return;
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(target, now + ms / 1000);
  }

  function stopAmbient(fade = true) {
    if (current) {
      const old = current;
      current = null;
      if (fade) {
        try {
          const now = ctx.currentTime;
          old.nodes.forEach(n => {
            if (n.gain) {
              n.gain.cancelScheduledValues(now);
              n.gain.setValueAtTime(n.gain.value, now);
              n.gain.linearRampToValueAtTime(0.0001, now + 0.5);
            }
          });
        } catch (e) {}
        setTimeout(() => old.cleanups.forEach(fn => { try { fn(); } catch (e) {} }), 620);
      } else {
        old.cleanups.forEach(fn => { try { fn(); } catch (e) {} });
      }
    }
    currentType = null;
  }

  function playAmbient(type) {
    ensureCtx();
    if (ctx.state === 'suspended') ctx.resume();
    if (!builders[type]) type = 'chuva';
    if (current && currentType === type) return;
    stopAmbient();
    const built = builders[type]();
    current = built;
    currentType = type;
    built.out.connect(master);
    fadeTo(state.volume, 900);
    state.enabled = true;
  }

  function setVolume(v) {
    state.volume = Math.max(0, Math.min(1, v));
    if (state.enabled && master) fadeTo(state.volume, 150);
  }

  function toggle() {
    if (state.enabled) {
      state.enabled = false;
      fadeTo(0, 500);
      setTimeout(() => { if (!state.enabled) stopAmbient(false); }, 520);
    } else {
      playAmbient(state.type);
    }
    return state.enabled;
  }

  function setType(type) {
    state.type = type;
    if (state.enabled) playAmbient(type);
  }

  /* ---------- efeitos de interface ---------- */
  function tone(freq, dur, type = 'sine', vol = 0.18, delay = 0) {
    if (!state.fxEnabled) return;
    ensureCtx();
    if (ctx.state === 'suspended') ctx.resume();
    const t0 = ctx.currentTime + delay;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(vol, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g).connect(ctx.destination);
    o.start(t0); o.stop(t0 + dur + 0.05);
  }

  const fx = {
    click()   { tone(660, 0.07, 'triangle', 0.10); },
    hover()   { tone(880, 0.045, 'sine', 0.045); },
    correct() { [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, 0.24, 'sine', 0.16, i * 0.075)); },
    wrong()   { tone(233, 0.22, 'sawtooth', 0.10); tone(174, 0.32, 'sawtooth', 0.09, 0.11); },
    xp()      { [783.99, 1046.5].forEach((f, i) => tone(f, 0.14, 'triangle', 0.11, i * 0.06)); },
    levelUp() { [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((f, i) => tone(f, 0.45, 'sine', 0.19, i * 0.11)); },
    badge()   { [880, 1108.7, 1318.5].forEach((f, i) => tone(f, 0.3, 'triangle', 0.14, i * 0.09)); },
    complete(){ [392, 523.25, 659.25, 783.99].forEach((f, i) => tone(f, 0.5, 'sine', 0.17, i * 0.13)); },
    error()   { tone(150, 0.3, 'square', 0.07); },
    /* batida do monitor fetal (Doppler) — usada pelo simulador de CTG */
    monitorBeat() { tone(1050, 0.05, 'square', 0.045); tone(700, 0.09, 'triangle', 0.035, 0.012); }
  };

  return {
    state, fx, toggle, playAmbient, stopAmbient, setVolume, setType,
    get type() { return currentType; },
    get isPlaying() { return state.enabled; },
    unlock() { ensureCtx(); if (ctx.state === 'suspended') ctx.resume(); }
  };
})();
