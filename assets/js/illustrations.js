/* ============================================================
   ILUSTRAÇÕES SVG ANIMADAS
   Todas desenhadas à mão em SVG puro (sem imagens externas,
   funcionam offline e no GitHub Pages).
   ============================================================ */

const FIGS = {

  /* ---------------------------------------------------------
     O MERGULHADOR E O TUBO DE OXIGÊNIO
     --------------------------------------------------------- */
  mergulhador: () => `
<svg viewBox="0 0 800 460" class="fig-svg" role="img" aria-label="Analogia do mergulhador">
  <defs>
    <linearGradient id="agua" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#0369a1" stop-opacity="0.75"/>
    </linearGradient>
    <linearGradient id="ceu" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <radialGradient id="bolha" cx="35%" cy="30%">
      <stop offset="0%" stop-color="#fff" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#7dd3fc" stop-opacity="0.15"/>
    </radialGradient>
  </defs>

  <rect width="800" height="460" fill="url(#ceu)" rx="18"/>
  <rect y="120" width="800" height="340" fill="url(#agua)" rx="18"/>

  <!-- superfície ondulada -->
  <path d="M0,120 Q100,100 200,120 T400,120 T600,120 T800,120 V140 H0 Z" fill="#38bdf8" opacity="0.5">
    <animate attributeName="d"
      values="M0,120 Q100,100 200,120 T400,120 T600,120 T800,120 V140 H0 Z;
              M0,120 Q100,140 200,120 T400,120 T600,120 T800,120 V140 H0 Z;
              M0,120 Q100,100 200,120 T400,120 T600,120 T800,120 V140 H0 Z"
      dur="5s" repeatCount="indefinite"/>
  </path>

  <!-- CILINDRO = PLACENTA -->
  <g transform="translate(600,42)">
    <rect x="0" y="0" width="130" height="62" rx="12" fill="#334155" stroke="#64748b" stroke-width="2"/>
    <rect x="0" y="0" width="130" height="62" rx="12" fill="#22c55e" opacity="0.25">
      <animate attributeName="opacity" values="0.25;0.08;0.25" dur="3s" repeatCount="indefinite"/>
    </rect>
    <text x="65" y="26" text-anchor="middle" font-size="13" fill="#e2e8f0" font-weight="700">PLACENTA</text>
    <text x="65" y="46" text-anchor="middle" font-size="11" fill="#94a3b8">(cilindro de O₂)</text>
  </g>

  <!-- TUBO = CORDÃO UMBILICAL -->
  <path id="tubo" d="M660,104 C660,180 480,180 430,240 C380,300 300,300 250,352"
        fill="none" stroke="#f1f5f9" stroke-width="9" stroke-linecap="round" opacity="0.85"/>
  <path d="M660,104 C660,180 480,180 430,240 C380,300 300,300 250,352"
        fill="none" stroke="#38bdf8" stroke-width="4" stroke-linecap="round" stroke-dasharray="14 16">
    <animate attributeName="stroke-dashoffset" from="60" to="0" dur="1.6s" repeatCount="indefinite"/>
  </path>
  <text x="470" y="200" font-size="13" fill="#e0f2fe" font-weight="700" transform="rotate(-18 470 200)">CORDÃO UMBILICAL</text>

  <!-- MERGULHADOR = FETO -->
  <g transform="translate(160,300)">
    <ellipse cx="60" cy="60" rx="72" ry="52" fill="#fbbf24" opacity="0.14"/>
    <!-- corpo -->
    <ellipse cx="60" cy="62" rx="34" ry="44" fill="#f8fafc" opacity="0.95"/>
    <!-- cabeça -->
    <circle cx="60" cy="26" r="26" fill="#fde68a" stroke="#f59e0b" stroke-width="2"/>
    <!-- olhos fechados/olhos -->
    <circle cx="50" cy="22" r="3.4" fill="#1e293b"/>
    <circle cx="70" cy="22" r="3.4" fill="#1e293b"/>
    <path d="M50,36 Q60,44 70,36" stroke="#b45309" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <!-- máscara -->
    <path d="M38,30 Q60,54 82,30" stroke="#0ea5e9" stroke-width="3" fill="none"/>
    <!-- membros -->
    <path d="M30,60 Q6,70 14,92" stroke="#f8fafc" stroke-width="10" fill="none" stroke-linecap="round"/>
    <path d="M90,60 Q114,70 106,92" stroke="#f8fafc" stroke-width="10" fill="none" stroke-linecap="round"/>
    <path d="M48,104 Q40,124 34,138" stroke="#f8fafc" stroke-width="11" fill="none" stroke-linecap="round"/>
    <path d="M72,104 Q80,124 86,138" stroke="#f8fafc" stroke-width="11" fill="none" stroke-linecap="round"/>
    <!-- respiração -->
    <animateTransform attributeName="transform" type="translate"
      values="160,300;160,292;160,300" dur="4s" repeatCount="indefinite" additive="replace"/>
  </g>

  <!-- bolhas -->
  <g fill="url(#bolha)">
    <circle cx="200" cy="270" r="7"><animate attributeName="cy" values="270;150" dur="4s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.9;0" dur="4s" repeatCount="indefinite"/></circle>
    <circle cx="176" cy="290" r="5"><animate attributeName="cy" values="290;170" dur="5.2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.8;0" dur="5.2s" repeatCount="indefinite"/></circle>
    <circle cx="216" cy="286" r="4"><animate attributeName="cy" values="286;180" dur="6s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.7;0" dur="6s" repeatCount="indefinite"/></circle>
  </g>

  <!-- rótulos -->
  <g font-size="12" fill="#cbd5e1">
    <text x="24" y="410">⬆ Sem O₂ suficiente → hipóxia → acidose → sofrimento fetal</text>
  </g>
</svg>`,

  /* ---------------------------------------------------------
     TROCA GASOSA NA BARREIRA PLACENTÁRIA
     --------------------------------------------------------- */
  trocagasosa: () => `
<svg viewBox="0 0 800 420" class="fig-svg" role="img" aria-label="Barreira placentária">
  <defs>
    <linearGradient id="sangueMae" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#b91c1c"/><stop offset="100%" stop-color="#ef4444"/>
    </linearGradient>
    <linearGradient id="sangueFeto" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#1d4ed8"/><stop offset="100%" stop-color="#3b82f6"/>
    </linearGradient>
  </defs>
  <rect width="800" height="420" rx="18" fill="#0f172a"/>

  <text x="400" y="34" text-anchor="middle" font-size="15" fill="#e2e8f0" font-weight="700">Barreira placentária — onde o O₂ atravessa</text>

  <!-- lado materno -->
  <rect x="30" y="60" width="180" height="320" rx="14" fill="url(#sangueMae)" opacity="0.85"/>
  <text x="120" y="88" text-anchor="middle" font-size="13" fill="#fee2e2" font-weight="700">SANGUE MATERNO</text>
  <text x="120" y="108" text-anchor="middle" font-size="11" fill="#fecaca">espaço interviloso</text>
  <g fill="#fecaca" font-size="12">
    <text x="120" y="150" text-anchor="middle">O₂ ●●●●●</text>
    <text x="120" y="180" text-anchor="middle">CO₂ ○</text>
    <text x="120" y="210" text-anchor="middle">glicose ▲▲▲</text>
    <text x="120" y="240" text-anchor="middle">pH 7,40</text>
  </g>
  <text x="120" y="360" text-anchor="middle" font-size="11" fill="#fee2e2">Artéria uterina →</text>

  <!-- vilosidades -->
  <g>
    ${[110, 200, 290, 350].map(y => `
      <path d="M300,${y} q60,-34 120,0 q60,34 120,0" fill="none" stroke="#fda4af" stroke-width="4" opacity="0.8"/>`).join('')}
    <rect x="290" y="60" width="140" height="320" rx="12" fill="#7f1d1d" opacity="0.35"/>
    <text x="360" y="398" text-anchor="middle" font-size="12" fill="#fda4af" font-weight="700">VILOSIDADES CORIAIS (superfície de troca)</text>
  </g>

  <!-- setas de troca -->
  <g stroke-width="3" fill="none">
    <path d="M225,150 L285,150" stroke="#22c55e" marker-end="url(#arrowG)"/>
    <path d="M295,185 L235,185" stroke="#a78bfa" marker-end="url(#arrowP)"/>
  </g>
  <defs>
    <marker id="arrowG" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#22c55e"/></marker>
    <marker id="arrowP" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#a78bfa"/></marker>
  </defs>
  <text x="255" y="140" text-anchor="middle" font-size="11" fill="#22c55e" font-weight="700">O₂ →</text>
  <text x="255" y="205" text-anchor="middle" font-size="11" fill="#a78bfa" font-weight="700">← CO₂</text>

  <!-- lado fetal -->
  <rect x="450" y="60" width="320" height="320" rx="14" fill="url(#sangueFeto)" opacity="0.85"/>
  <text x="610" y="88" text-anchor="middle" font-size="13" fill="#dbeafe" font-weight="700">SANGUE FETAL</text>
  <text x="610" y="108" text-anchor="middle" font-size="11" fill="#bfdbfe">capilares vilosos</text>
  <g fill="#dbeafe" font-size="12">
    <text x="610" y="150" text-anchor="middle">O₂ ●●●●● recebido</text>
    <text x="610" y="180" text-anchor="middle">CO₂ ○ devolvido</text>
    <text x="610" y="210" text-anchor="middle">pH fetal 7,30-7,35</text>
  </g>

  <!-- veia umbilical -->
  <path d="M770,220 L690,220" stroke="#f8fafc" stroke-width="8" stroke-linecap="round"/>
  <text x="700" y="248" text-anchor="middle" font-size="11" fill="#e2e8f0">Veia umbilical (O₂)</text>
  <path d="M690,300 L770,300" stroke="#93c5fd" stroke-width="8" stroke-linecap="round" opacity="0.8"/>
  <text x="700" y="328" text-anchor="middle" font-size="11" fill="#bfdbfe">Artérias umbilicais (CO₂)</text>

  <!-- aviso -->
  <rect x="30" y="392" width="740" height="0" fill="none"/>
</svg>`,

  /* ---------------------------------------------------------
     COMPARAÇÃO CRÔNICO x AGUDO
     --------------------------------------------------------- */
  comparacao: () => `
<svg viewBox="0 0 800 340" class="fig-svg" role="img" aria-label="Comparação crônico e agudo">
  <rect width="800" height="340" rx="18" fill="#0f172a"/>

  <!-- CRÔNICO -->
  <g>
    <rect x="24" y="24" width="360" height="292" rx="14" fill="#f59e0b" opacity="0.08" stroke="#f59e0b" stroke-width="2"/>
    <text x="204" y="56" text-anchor="middle" font-size="15" fill="#fbbf24" font-weight="800">CRÔNICO 🐌</text>
    <text x="204" y="78" text-anchor="middle" font-size="11" fill="#fcd34d">falha lenta da placenta</text>
    <!-- gráfico descendente lento -->
    <path d="M56,140 L360,230" stroke="#f59e0b" stroke-width="3" fill="none" stroke-dasharray="6 6"/>
    <path d="M56,140 C140,150 240,180 360,230" stroke="#fbbf24" stroke-width="3.5" fill="none">
      <animate attributeName="stroke-dasharray" values="0 900;900 0" dur="3s" fill="freeze"/>
    </path>
    <text x="204" y="262" text-anchor="middle" font-size="12" fill="#fde68a">Semanas a meses · pré-natal</text>
    <text x="204" y="284" text-anchor="middle" font-size="12" fill="#fde68a">RCIU · oligodrâmnio · Doppler alterado</text>
    <text x="204" y="304" text-anchor="middle" font-size="11" fill="#fbbf24" font-style="italic">dá tempo de planejar</text>
  </g>

  <!-- AGUDO -->
  <g>
    <rect x="416" y="24" width="360" height="292" rx="14" fill="#ef4444" opacity="0.08" stroke="#ef4444" stroke-width="2"/>
    <text x="596" y="56" text-anchor="middle" font-size="15" fill="#f87171" font-weight="800">AGUDO ⚡</text>
    <text x="596" y="78" text-anchor="middle" font-size="11" fill="#fca5a5">interrupção súbita do fluxo</text>
    <!-- gráfico queda abrupta -->
    <path d="M448,140 L548,140 L560,250 L640,250 L700,140 L728,140"
          stroke="#f87171" stroke-width="3.5" fill="none"/>
    <circle cx="560" cy="250" r="6" fill="#ef4444">
      <animate attributeName="r" values="5;9;5" dur="1.1s" repeatCount="indefinite"/>
    </circle>
    <text x="596" y="262" text-anchor="middle" font-size="12" fill="#fecaca">Minutos a horas · trabalho de parto</text>
    <text x="596" y="284" text-anchor="middle" font-size="12" fill="#fecaca">Bradicardia · DIP II · mecônio</text>
    <text x="596" y="304" text-anchor="middle" font-size="11" fill="#f87171" font-style="italic">tempo é cérebro</text>
  </g>
</svg>`,

  /* ---------------------------------------------------------
     MOBILOGRAMA
     --------------------------------------------------------- */
  mobilograma: () => `
<svg viewBox="0 0 800 340" class="fig-svg" role="img" aria-label="Mobilograma">
  <rect width="800" height="340" rx="18" fill="#0f172a"/>
  <text x="400" y="36" text-anchor="middle" font-size="15" fill="#e2e8f0" font-weight="700">Mobilograma — a mãe é a primeira monitora</text>

  <!-- barriga materna -->
  <g transform="translate(80,70)">
    <path d="M60,20 C130,20 160,90 150,150 C142,205 90,225 40,215 C-6,206 -20,140 -10,90 C-2,48 18,20 60,20 Z"
          fill="#fbcfe8" stroke="#f472b6" stroke-width="2.5" opacity="0.35"/>
    <!-- feto -->
    <g transform="translate(58,110)">
      <circle cx="0" cy="0" r="26" fill="#fde68a" stroke="#f59e0b" stroke-width="2"/>
      <ellipse cx="0" cy="42" rx="24" ry="32" fill="#f8fafc" opacity="0.9"/>
      <circle cx="-9" cy="-4" r="3" fill="#1e293b"/>
      <circle cx="9" cy="-4" r="3" fill="#1e293b"/>
      <path d="M-8,8 Q0,15 8,8" stroke="#b45309" stroke-width="2" fill="none" stroke-linecap="round"/>
      <!-- chutes animados -->
      <g>
        <path d="M-14,62 L-34,76" stroke="#f8fafc" stroke-width="9" stroke-linecap="round">
          <animateTransform attributeName="transform" type="rotate" values="0 -14 62;-22 -14 62;0 -14 62" dur="1.6s" repeatCount="indefinite"/>
        </path>
        <path d="M14,62 L34,76" stroke="#f8fafc" stroke-width="9" stroke-linecap="round">
          <animateTransform attributeName="transform" type="rotate" values="0 14 62;20 14 62;0 14 62" dur="1.9s" repeatCount="indefinite"/>
        </path>
      </g>
    </g>
    <text x="66" y="248" text-anchor="middle" font-size="11" fill="#f9a8d4">útero materno</text>
  </g>

  <!-- contador -->
  <g transform="translate(300,80)">
    <rect width="460" height="190" rx="14" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
    <text x="24" y="34" font-size="13" fill="#94a3b8" font-weight="700">TABELA DE CONTAGEM</text>
    <g font-size="12" fill="#cbd5e1">
      <text x="24" y="66">Manhã (após café)</text>
      <text x="24" y="98">Tarde</text>
      <text x="24" y="130">Noite (deitada em DLE)</text>
      <text x="24" y="162">Total em 2 h</text>
    </g>
    <g font-size="12" font-weight="700">
      <text x="420" y="66" fill="#22c55e">✓✓✓✓✓✓✓ 7</text>
      <text x="420" y="98" fill="#22c55e">✓✓✓✓✓ 5</text>
      <text x="420" y="130" fill="#f59e0b">✓✓ 2 ⚠</text>
      <text x="420" y="162" fill="#f59e0b">14 movimentos</text>
    </g>
  </g>

  <g transform="translate(300,286)">
    <text font-size="12" fill="#fbbf24">⚠ Queda na movimentação = sinal de alerta precoce (precede a CTG alterada em dias)</text>
  </g>
</svg>`,

  /* ---------------------------------------------------------
     MECÔNIO
     --------------------------------------------------------- */
  meconio: () => `
<svg viewBox="0 0 800 340" class="fig-svg" role="img" aria-label="Mecônio">
  <defs>
    <radialGradient id="liqLimpo" cx="50%" cy="50%">
      <stop offset="0%" stop-color="#bae6fd" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#0284c7" stop-opacity="0.35"/>
    </radialGradient>
    <radialGradient id="liqVerde" cx="50%" cy="50%">
      <stop offset="0%" stop-color="#86efac" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#15803d" stop-opacity="0.55"/>
    </radialGradient>
  </defs>
  <rect width="800" height="340" rx="18" fill="#0f172a"/>
  <text x="400" y="34" text-anchor="middle" font-size="15" fill="#e2e8f0" font-weight="700">Mecônio: o feto evacuou dentro do útero</text>

  <!-- normal -->
  <g transform="translate(40,60)">
    <circle cx="140" cy="130" r="112" fill="url(#liqLimpo)"/>
    <text x="140" y="24" text-anchor="middle" font-size="13" fill="#7dd3fc" font-weight="700">LÍQUIDO CLARO ✅</text>
    <g transform="translate(140,130)">
      <circle cx="0" cy="-8" r="30" fill="#fde68a" stroke="#f59e0b" stroke-width="2"/>
      <ellipse cx="0" cy="38" rx="28" ry="36" fill="#f8fafc" opacity="0.9"/>
      <circle cx="-10" cy="-12" r="3.5" fill="#1e293b"/><circle cx="10" cy="-12" r="3.5" fill="#1e293b"/>
      <path d="M-9,2 Q0,10 9,2" stroke="#b45309" stroke-width="2" fill="none" stroke-linecap="round"/>
    </g>
    <text x="140" y="272" text-anchor="middle" font-size="12" fill="#7dd3fc">Sem estresse · esfíncter fechado</text>
  </g>

  <!-- seta -->
  <g transform="translate(360,190)">
    <path d="M0,0 L60,0" stroke="#64748b" stroke-width="4" marker-end="url(#aG)"/>
    <defs><marker id="aG" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#64748b"/></marker></defs>
    <text x="30" y="-14" text-anchor="middle" font-size="11" fill="#94a3b8">hipóxia</text>
  </g>

  <!-- meconial -->
  <g transform="translate(460,60)">
    <circle cx="140" cy="130" r="112" fill="url(#liqVerde)"/>
    <text x="140" y="24" text-anchor="middle" font-size="13" fill="#4ade80" font-weight="700">LÍQUIDO MECONIAL ⚠</text>
    <g transform="translate(140,130)">
      <circle cx="0" cy="-8" r="30" fill="#fde68a" stroke="#f59e0b" stroke-width="2"/>
      <ellipse cx="0" cy="38" rx="28" ry="36" fill="#f8fafc" opacity="0.9"/>
      <circle cx="-10" cy="-12" r="3.5" fill="#1e293b"/><circle cx="10" cy="-12" r="3.5" fill="#1e293b"/>
      <path d="M-11,4 Q0,-4 11,4" stroke="#b45309" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    </g>
    <!-- partículas de mecônio -->
    <g fill="#166534" opacity="0.75">
      ${[[60,60],[210,80],[80,200],[200,205],[140,50],[45,130],[235,140],[130,225],[100,100],[180,175]]
        .map(([x,y],i) => `<circle cx="${x}" cy="${y}" r="${3 + (i % 3)}"><animate attributeName="opacity" values="0.75;0.25;0.75" dur="${2 + (i % 4) * 0.5}s" repeatCount="indefinite"/></circle>`).join('')}
    </g>
    <text x="140" y="272" text-anchor="middle" font-size="12" fill="#4ade80">Hipóxia → hiperperistalse + esfíncter relaxa</text>
  </g>
</svg>`,

  /* ---------------------------------------------------------
     TIPOS DE DESACELERAÇÃO
     --------------------------------------------------------- */
  dips: () => {
    const baseY = 110, amp = 62;
    // helper para gerar traçado
    const trace = (pts) => pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ');
    // contração uterina (curva em sino) repetida
    const contracoes = (x0, w) => `M${x0},250 Q${x0 + w / 2},205 ${x0 + w},250`;
    const contracoesMulti = (x0, w, n) => Array.from({ length: n }, (_, i) => contracoes(x0 + i * (w + 30), w)).join(' ');

    return `
<svg viewBox="0 0 820 620" class="fig-svg" role="img" aria-label="Tipos de desaceleração">
  <rect width="820" height="620" rx="18" fill="#0f172a"/>
  <text x="410" y="30" text-anchor="middle" font-size="15" fill="#e2e8f0" font-weight="700">Desacelerações na CTG — formato e relação com a contração</text>

  <!-- ===== DIP I ===== -->
  <g transform="translate(0,44)">
    <rect x="20" y="0" width="780" height="120" rx="10" fill="#052e16" opacity="0.5"/>
    <text x="34" y="22" font-size="13" fill="#34d399" font-weight="800">DIP I — PRECOCE (benigna)</text>
    <path d="${trace([[60,baseY],[110,baseY],[130,baseY],[160,baseY+amp],[190,baseY],[240,baseY],[260,baseY],[290,baseY+amp],[320,baseY],[370,baseY],[390,baseY],[420,baseY+amp],[450,baseY],[520,baseY],[600,baseY],[700,baseY]])}"
          fill="none" stroke="#34d399" stroke-width="2.4"/>
    <path d="${contracoesMulti(120, 70, 3)}" fill="none" stroke="#94a3b8" stroke-width="2" opacity="0.8" transform="translate(0,-40)"/>
    <text x="770" y="112" text-anchor="end" font-size="10" fill="#94a3b8">contração ▁▁▁</text>
  </g>

  <!-- ===== DIP II ===== -->
  <g transform="translate(0,178)">
    <rect x="20" y="0" width="780" height="120" rx="10" fill="#450a0a" opacity="0.55"/>
    <text x="34" y="22" font-size="13" fill="#f87171" font-weight="800">DIP II — TARDIA (insuficiência placentária · SOFRIMENTO FETAL)</text>
    <path d="${trace([[60,baseY],[120,baseY],[150,baseY+10],[180,baseY+amp],[210,baseY+20],[250,baseY],[290,baseY],[320,baseY+10],[350,baseY+amp],[380,baseY+20],[420,baseY],[460,baseY],[490,baseY+10],[520,baseY+amp],[550,baseY+20],[590,baseY],[640,baseY],[700,baseY]])}"
          fill="none" stroke="#f87171" stroke-width="2.4"/>
    <path d="${contracoesMulti(110, 70, 3)}" fill="none" stroke="#94a3b8" stroke-width="2" opacity="0.8" transform="translate(0,-40)"/>
    <g fill="#fca5a5" font-size="10">
      <text x="110" y="112">início</text>
      <text x="205" y="112">nadir após o pico</text>
      <text x="300" y="112">retorno após o fim</text>
    </g>
  </g>

  <!-- ===== DIP III ===== -->
  <g transform="translate(0,312)">
    <rect x="20" y="0" width="780" height="120" rx="10" fill="#451a03" opacity="0.55"/>
    <text x="34" y="22" font-size="13" fill="#fbbf24" font-weight="800">DIP III — VARIÁVEL (compressão de cordão)</text>
    <path d="${trace([[60,baseY],[100,baseY],[110,baseY+amp],[150,baseY],[200,baseY],[220,baseY],[230,baseY+amp-14],[270,baseY],[330,baseY],[360,baseY],[370,baseY+amp],[410,baseY],[470,baseY],[520,baseY],[528,baseY+amp-20],[566,baseY],[620,baseY],[700,baseY]])}"
          fill="none" stroke="#fbbf24" stroke-width="2.4"/>
    <path d="${contracoesMulti(130, 70, 3)}" fill="none" stroke="#94a3b8" stroke-width="2" opacity="0.8" transform="translate(0,-40)"/>
    <text x="770" y="112" text-anchor="end" font-size="10" fill="#fcd34d">queda abrupta em "V" · sem relação fixa</text>
  </g>

  <!-- ===== PROLONGADA ===== -->
  <g transform="translate(0,446)">
    <rect x="20" y="0" width="780" height="120" rx="10" fill="#2e1065" opacity="0.6"/>
    <text x="34" y="22" font-size="13" fill="#c4b5fd" font-weight="800">DESACELERAÇÃO PROLONGADA (≥ 2 min) — EMERGÊNCIA</text>
    <path d="${trace([[60,baseY],[180,baseY],[200,baseY+amp+10],[280,baseY+amp+14],[380,baseY+amp+10],[440,baseY+6],[470,baseY],[560,baseY],[700,baseY]])}"
          fill="none" stroke="#a855f7" stroke-width="2.4"/>
    <path d="${contracoesMulti(140, 70, 3)}" fill="none" stroke="#94a3b8" stroke-width="2" opacity="0.8" transform="translate(0,-40)"/>
    <g stroke="#c4b5fd" stroke-width="1.2" stroke-dasharray="4 4">
      <line x1="200" y1="34" x2="200" y2="108"/><line x1="430" y1="34" x2="430" y2="108"/>
    </g>
    <text x="315" y="48" text-anchor="middle" font-size="10" fill="#c4b5fd">≥ 2 minutos abaixo da linha de base</text>
  </g>
</svg>`;
  },

  /* ---------------------------------------------------------
     L.O.S.S.
     --------------------------------------------------------- */
  loss: () => `
<svg viewBox="0 0 820 360" class="fig-svg" role="img" aria-label="Manobra de LOSSS">
  <rect width="820" height="360" rx="18" fill="#0f172a"/>
  <text x="410" y="32" text-anchor="middle" font-size="15" fill="#e2e8f0" font-weight="700">Manobra de L.O.S.S. — reanimação intrauterina</text>

  ${[
    { x: 30,  letter: 'L', name: 'Lateralização', color: '#38bdf8', icon: '🛏️', desc: 'Decúbito lateral\nesquerdo' },
    { x: 225, letter: 'O', name: 'Oxigenação',    color: '#34d399', icon: '💨', desc: 'O₂ por máscara\n10-15 L/min' },
    { x: 420, letter: 'S', name: 'Suspensão',     color: '#f59e0b', icon: '⏸️', desc: 'Parar a\nocitocina' },
    { x: 615, letter: 'S', name: 'Soro',          color: '#a78bfa', icon: '💧', desc: 'Hidratação\nvenosa rápida' }
  ].map((p, i) => `
  <g transform="translate(${p.x},58)">
    <rect width="175" height="268" rx="14" fill="${p.color}" opacity="0.10" stroke="${p.color}" stroke-width="2"/>
    <circle cx="87" cy="58" r="34" fill="${p.color}" opacity="0.22">
      <animate attributeName="r" values="34;39;34" dur="${2 + i * 0.3}s" repeatCount="indefinite"/>
    </circle>
    <text x="87" y="72" text-anchor="middle" font-size="36" font-weight="900" fill="${p.color}">${p.letter}</text>
    <text x="87" y="128" text-anchor="middle" font-size="22">${p.icon}</text>
    <text x="87" y="164" text-anchor="middle" font-size="14" font-weight="800" fill="${p.color}">${p.name}</text>
    ${p.desc.split('\n').map((l, j) => `<text x="87" y="${194 + j * 20}" text-anchor="middle" font-size="12" fill="#cbd5e1">${l}</text>`).join('')}
  </g>`).join('')}

  <text x="410" y="348" text-anchor="middle" font-size="12" fill="#fbbf24">⏱ Reavaliar em 10-15 minutos. Se não reverter → parto imediato (instrumental ou cesariana).</text>
</svg>`,

  /* ---------------------------------------------------------
     FETO / PLACENTA / CORDÃO (esquema geral)
     --------------------------------------------------------- */
  anatomia: () => `
<svg viewBox="0 0 820 420" class="fig-svg" role="img" aria-label="Anatomia fetal">
  <rect width="820" height="420" rx="18" fill="#0f172a"/>
  <text x="410" y="32" text-anchor="middle" font-size="15" fill="#e2e8f0" font-weight="700">Os três componentes que precisam funcionar</text>

  <!-- útero -->
  <path d="M300,70 C480,50 590,150 570,290 C555,390 420,410 340,395 C230,376 190,250 220,160 C240,102 260,78 300,70 Z"
        fill="#f9a8d4" opacity="0.12" stroke="#f472b6" stroke-width="2.5"/>
  <text x="700" y="120" font-size="12" fill="#f9a8d4">ÚTERO</text>
  <line x1="690" y1="116" x2="590" y2="170" stroke="#f472b6" stroke-width="1.5" stroke-dasharray="4 4"/>

  <!-- placenta -->
  <g>
    <ellipse cx="270" cy="140" rx="72" ry="42" fill="#7f1d1d" opacity="0.85" transform="rotate(-24 270 140)"/>
    <ellipse cx="270" cy="140" rx="72" ry="42" fill="none" stroke="#fca5a5" stroke-width="2" transform="rotate(-24 270 140)"/>
    <text x="120" y="96" font-size="12" fill="#fca5a5" font-weight="700">PLACENTA</text>
    <line x1="160" y1="100" x2="235" y2="128" stroke="#fca5a5" stroke-width="1.5" stroke-dasharray="4 4"/>
  </g>

  <!-- feto -->
  <g transform="translate(400,240)">
    <ellipse cx="0" cy="60" rx="56" ry="76" fill="#f8fafc" opacity="0.92"/>
    <circle cx="0" cy="-24" r="52" fill="#fde68a" stroke="#f59e0b" stroke-width="2.5"/>
    <circle cx="-18" cy="-32" r="6" fill="#1e293b"/><circle cx="18" cy="-32" r="6" fill="#1e293b"/>
    <path d="M-16,-6 Q0,10 16,-6" stroke="#b45309" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M-40,20 Q-80,50 -72,86" stroke="#f8fafc" stroke-width="16" fill="none" stroke-linecap="round"/>
    <path d="M40,20 Q80,50 72,86" stroke="#f8fafc" stroke-width="16" fill="none" stroke-linecap="round"/>
    <path d="M-24,128 Q-40,166 -46,186" stroke="#f8fafc" stroke-width="18" fill="none" stroke-linecap="round"/>
    <path d="M24,128 Q40,166 46,186" stroke="#f8fafc" stroke-width="18" fill="none" stroke-linecap="round"/>
    <!-- coração -->
    <g transform="translate(0,30)">
      <circle r="14" fill="#ef4444" opacity="0.9"/>
      <circle r="14" fill="none" stroke="#fca5a5" stroke-width="1.5">
        <animate attributeName="r" values="14;26" dur="1.1s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.9;0" dur="1.1s" repeatCount="indefinite"/>
      </circle>
      <text x="0" y="5" text-anchor="middle" font-size="14">🫀</text>
    </g>
  </g>

  <!-- cordão -->
  <path d="M400,150 C400,120 340,140 320,150 C300,160 310,180 320,190"
        fill="none" stroke="#f1f5f9" stroke-width="12" stroke-linecap="round" opacity="0.9"/>
  <path d="M400,150 C400,120 340,140 320,150 C300,160 310,180 320,190"
        fill="none" stroke="#38bdf8" stroke-width="4" stroke-dasharray="12 14" stroke-linecap="round">
    <animate attributeName="stroke-dashoffset" from="52" to="0" dur="1.4s" repeatCount="indefinite"/>
  </path>
  <text x="470" y="140" font-size="12" fill="#e0f2fe" font-weight="700">CORDÃO UMBILICAL</text>
  <text x="470" y="158" font-size="11" fill="#94a3b8">2 artérias + 1 veia · vasos de Wharton</text>

  <!-- rótulos laterais -->
  <g font-size="11.5">
    <text x="40" y="300" fill="#fca5a5">1️⃣ Placenta</text>
    <text x="40" y="322" fill="#cbd5e1">área de troca gasosa</text>
    <text x="40" y="356" fill="#e0f2fe">2️⃣ Cordão</text>
    <text x="40" y="378" fill="#cbd5e1">"tubo de oxigênio"</text>
    <text x="640" y="330" fill="#fde68a">3️⃣ Feto</text>
    <text x="640" y="352" fill="#cbd5e1">o mergulhador</text>
  </g>
</svg>`
};

/* Retorna o SVG ou um placeholder */
function getFig(id) {
  return (FIGS[id] && FIGS[id]()) || `<div class="fig-missing">Ilustração "${id}" indisponível</div>`;
}
