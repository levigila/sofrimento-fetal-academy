/* ============================================================
   SOFRIMENTO FETAL — ACADEMY
   Banco de conteúdo dos módulos (baseado no manual de estudos
   fornecido + diretrizes FIGO/NICHD/ACOG/FEBRASGO)
   ============================================================ */

const MODULES = [
  /* ==========================================================
     1. CONCEITO FUNDAMENTAL
     ========================================================== */
  {
    id: 'conceito',
    icon: '🌊',
    color: '#38bdf8',
    title: 'O Conceito Fundamental',
    subtitle: 'O que é sofrimento fetal?',
    xp: 40,
    sections: [
      {
        type: 'lead',
        text: 'Sofrimento fetal <b>não é uma doença</b>. É um <b>estado</b> — uma via final comum para vários problemas diferentes. Sempre que você ouvir "sofrimento fetal", traduza mentalmente para: <i>"o feto está ficando sem oxigênio e acumulando ácido"</i>.'
      },
      {
        type: 'definition',
        term: 'Sofrimento fetal',
        aka: 'Frequência cardíaca fetal não tranquilizadora · Asfixia fetal · Hipóxia fetal progressiva',
        text: 'Estado de <b>asfixia progressiva</b> em que o feto não recebe oxigênio (hipóxia) nem nutrientes em quantidade ideal através da placenta, gerando acúmulo de gás carbônico (hipercapnia) e resíduos metabólicos (acidose) no organismo do bebê.'
      },
      { type: 'fig', id: 'mergulhador', caption: 'O bebê é um mergulhador: depende de um tubo flexível (cordão umbilical) ligado a um cilindro na superfície (a placenta).' },
      {
        type: 'analogy',
        icon: '🤿',
        title: 'Analogia Prática: O Mergulhador e o Tubo de Oxigênio',
        text: 'Pense no bebê como um <b>mergulhador no fundo do mar</b>. Ele depende exclusivamente de um tubo flexível — o <b>cordão umbilical</b> — conectado a um cilindro na superfície — a <b>placenta da mãe</b>.<br><br>Se o cilindro começar a esvaziar devagar (insuficiência placentária), ou se alguém <b>pisar no tubo</b> de repente (compressão de cordão), o mergulhador entra em apuros. <b>Isso é o sofrimento fetal.</b>'
      },
      {
        type: 'chain',
        title: 'A cascata do sofrimento fetal',
        steps: [
          { icon: '🫁', label: 'Hipóxia', desc: 'Oferta de O₂ insuficiente para a demanda' },
          { icon: '🔋', label: 'Metabolismo anaeróbio', desc: 'A célula passa a produzir energia sem oxigênio' },
          { icon: '🧪', label: 'Acidose lática', desc: 'Acúmulo de lactato + CO₂ → pH cai' },
          { icon: '🧠', label: 'Lesão de órgão-alvo', desc: 'Cérebro, coração, rim e intestino são atingidos' },
          { icon: '⚠️', label: 'Óbito / sequela', desc: 'Se não revertido: encefalopatia, óbito fetal ou neonatal' }
        ]
      },
      {
        type: 'key',
        title: 'Por que isso importa tanto?',
        items: [
          'É a <b>principal causa evitável</b> de óbito fetal e de paralisia cerebral de origem perinatal.',
          'A maioria dos casos ocorre <b>durante o trabalho de parto</b> — ou seja, dentro do hospital, com a equipe presente.',
          'É a principal indicação de <b>cesariana de emergência</b>.',
          'Reconhecer precocemente e agir rápido <b>muda o desfecho neurológico</b> do bebê.'
        ]
      },
      {
        type: 'pearl',
        text: 'Pérola de prova: "sofrimento fetal" é um termo clínico e <b>funcional</b>, não um diagnóstico etiológico. A pergunta certa nunca é só "tem sofrimento fetal?", mas sim <b>"qual é a causa e quanto tempo eu tenho?"</b>'
      }
    ]
  },

  /* ==========================================================
     2. FISIOPATOLOGIA
     ========================================================== */
  {
    id: 'fisiopato',
    icon: '🔬',
    color: '#a78bfa',
    title: 'Fisiopatologia',
    subtitle: 'Como o feto troca gases e como isso falha',
    xp: 50,
    sections: [
      {
        type: 'lead',
        text: 'Para entender sofrimento fetal você precisa entender <b>uma única troca</b>: O₂ entra, CO₂ sai, através da <b>vilosidade corial</b> (a unidade funcional da placenta). Todo o resto é consequência de quando essa troca falha.'
      },
      { type: 'fig', id: 'trocagasosa', caption: 'Barreira placentária: sangue materno e sangue fetal ficam separados por poucas camadas — é aí que o O₂ atravessa.' },
      {
        type: 'grid',
        title: 'Os 3 componentes que precisam funcionar',
        cards: [
          { icon: '🩸', title: 'Fluxo materno', text: 'A artéria uterina precisa levar sangue oxigenado ao espaço interviloso. Cai na <b>pré-eclâmpsia</b>, hipertensão, hipotensão, contração excessiva.' },
          { icon: '🧽', title: 'Superfície placentária', text: 'A área de vilosidades precisa estar íntegra. Perde na <b>insuficiência placentária</b>, infarto placentário, DPP, pós-datismo.' },
          { icon: '🔌', title: 'Fluxo umbilical', text: 'O cordão precisa estar livre. Obstrui no <b>prolapso</b>, circular de cordão apertada, oligodrâmnio, nó verdadeiro.' }
        ]
      },
      {
        type: 'subtitle',
        text: 'Mecanismos de compensação — o feto é um ótimo negociador'
      },
      {
        type: 'accordion',
        items: [
          {
            title: '1. Centralização fetal (brain-sparing)',
            icon: '🧠',
            body: 'Quando falta O₂, o feto faz <b>vasoconstrição periférica</b> (mesentério, rim, membros, pulmão) e <b>vasodilatação</b> seletiva de cérebro, coração e adrenais. É um "desvio de verba": o pouco oxigênio vai para o que é vital.<br><br><b>Consequência clínica:</b> o bebê para de crescer (RCIU/PIG), o líquido amniótico diminui (o rim produz menos urina) e a Doppler de artéria umbilical mostra <b>índice de pulsatilidade aumentado</b> / diástole zero ou reversa.'
          },
          {
            title: '2. Redução do metabolismo e da movimentação',
            icon: '😴',
            body: 'O feto em hipóxia <b>se mexe menos</b> e reduz o consumo energético. É por isso que <b>mobilograma reduzido</b> é um sinal precoce de sofrimento crônico.<br><br><b>Analogia:</b> quando estamos com muita fome ou fracos, evitamos correr e gastar energia. O feto faz exatamente o mesmo.'
          },
          {
            title: '3. Taquicardia inicial → bradicardia final',
            icon: '💓',
            body: 'Na hipóxia inicial o coração acelera (tentativa de compensar). Quando a reserva se esgota, o miocárdio é deprimido e o feto evolui para <b>bradicardia</b> — que é o sinal mais grave.<br><br><b>Mnemônico:</b> <i>"primeiro o coração corre, depois ele cansa, depois ele desiste"</i>.'
          },
          {
            title: '4. Relaxamento dos esfíncteres → mecônio',
            icon: '🟢',
            body: 'Na hipóxia há <b>hiperperistalse</b> intestinal + relaxamento do esfíncter anal → o feto <b>evacua dentro do útero</b>. O líquido amniótico fica esverdeado e espesso.'
          }
        ]
      },
      {
        type: 'key',
        title: 'A reserva fisiológica: por que nem toda hipóxia vira sofrimento',
        items: [
          'O feto normal tem uma <b>reserva de oxigênio</b> que aguenta uma contração uterina sem sofrer (a contração interrompe a perfusão por alguns segundos).',
          'Se a reserva está intacta → após a contração, o batimento volta ao normal e aparecem <b>acelerações</b> (sinal tranquilizador!).',
          'Se a reserva está esgotada → aparece <b>desaceleração tardia</b> após a contração (DIP II). É o sinal de alarme clássico.'
        ]
      },
      {
        type: 'pearl',
        text: 'Pérola: <b>aceleração = reserva boa. Desaceleração tardia = reserva esgotada.</b> Se você guardar apenas uma frase desta fisiopatologia, guarde essa.'
      }
    ]
  },

  /* ==========================================================
     3. CLASSIFICAÇÃO
     ========================================================== */
  {
    id: 'classificacao',
    icon: '⚖️',
    color: '#f59e0b',
    title: 'Crônico vs. Agudo',
    subtitle: 'Dois cenários, duas velocidades',
    xp: 50,
    sections: [
      {
        type: 'lead',
        text: 'A medicina divide o sofrimento fetal em dois grandes cenários clínicos, dependendo da <b>velocidade</b> com que o problema se instala. Isso muda completamente o quadro, o diagnóstico e a conduta.'
      },
      { type: 'fig', id: 'comparacao', caption: 'À esquerda, falha lenta e progressiva (placenta). À direita, interrupção súbita (cordão).' },
      {
        type: 'compare',
        left: {
          icon: '🐌',
          title: 'CRÔNICO — Lento e progressivo',
          color: '#f59e0b',
          blocks: [
            { h: 'Tempo de instalação', t: 'Semanas a meses' },
            { h: 'Momento principal', t: 'Durante o pré-natal' },
            { h: 'Mecanismo', t: 'Envelhecimento / falha crônica da placenta (insuficiência placentária)' },
            { h: 'Fisiopatologia', t: 'O bebê se adapta: desacelera o crescimento e faz <b>centralização fetal</b> (sangue vai para cérebro, coração e adrenais).' },
            { h: 'Impacto no feto', t: 'Bebê pequeno (RCIU/PIG), oligodrâmnio, pouca movimentação' },
            { h: 'Causas comuns', t: 'Hipertensão na gestação (pré-eclâmpsia), diabetes descompensado, tabagismo, desnutrição materna, colagenoses, pós-datismo' },
            { h: 'Como aparece', t: 'RCIU, oligodrâmnio, Doppler alterado, mobilograma reduzido, CTG com padrão não tranquilizador no pré-natal' }
          ]
        },
        right: {
          icon: '⚡',
          title: 'AGUDO — Rápido e emergencial',
          color: '#ef4444',
          blocks: [
            { h: 'Tempo de instalação', t: 'Minutos a horas' },
            { h: 'Momento principal', t: 'Durante o trabalho de parto' },
            { h: 'Mecanismo', t: 'Interrupção mecânica ou súbita do fluxo' },
            { h: 'Fisiopatologia', t: '<b>Não há tempo para adaptação.</b> A queda brusca do O₂ leva rapidamente à acidose metabólica.' },
            { h: 'Impacto no feto', t: 'Alteração imediata do batimento cardíaco e acidose' },
            { h: 'Causas comuns', t: 'Descolamento prematuro da placenta (DPP), prolapso de cordão, taquissistolia/hiperestimulação uterina, rotura uterina, circular apertada' },
            { h: 'Como aparece', t: 'Bradicardia fetal, DIP II, DIP III complicada, líquido meconial' }
          ]
        }
      },
      {
        type: 'mnemonic',
        title: 'Mnemônico para não esquecer',
        items: [
          { k: 'CRÔNICO', v: '"C" de <b>C</b>resce pouco — bebê pequeno, pouco líquido, Doppler alterado.' },
          { k: 'AGUDO', v: '"A" de <b>A</b>gora — tem que sair agora. Batimento cai de repente.' }
        ]
      },
      {
        type: 'table',
        title: 'Quadro comparativo de resumo (do manual)',
        head: ['Característica', 'Crônico', 'Agudo'],
        rows: [
          ['Tempo de instalação', 'Semanas a meses', 'Minutos a horas'],
          ['Momento principal', 'Durante o pré-natal', 'Durante o trabalho de parto'],
          ['Impacto no feto', 'Bebê pequeno (RCIU) e pouco líquido', 'Alteração imediata do batimento e acidose'],
          ['Mecanismo principal', 'Envelhecimento / falha crônica da placenta', 'Interrupção mecânica ou súbita do fluxo'],
          ['Sinal-chave', 'RCIU + oligodrâmnio + Doppler alterado', 'Bradicardia + DIP II + mecônio'],
          ['Janela de ação', 'Dias — dá tempo de planejar', 'Minutos — decisão imediata']
        ]
      },
      {
        type: 'warning',
        title: '⚠️ Cuidado com a pegadinha clássica',
        text: 'Um feto que já vem com <b>sofrimento crônico</b> (RCIU, oligodrâmnio) tem <b>reserva reduzida</b>. Durante o trabalho de parto ele descompensa <b>muito mais rápido</b>. Ou seja: o crônico é o terreno fértil do agudo.'
      }
    ]
  },

  /* ==========================================================
     4. ETIOLOGIA
     ========================================================== */
  {
    id: 'causas',
    icon: '🎯',
    color: '#f472b6',
    title: 'Causas & Fatores de Risco',
    subtitle: 'Onde procurar o problema',
    xp: 45,
    sections: [
      {
        type: 'lead',
        text: 'Sempre que houver suspeita de sofrimento fetal, faça a pergunta: <b>"o problema é a mãe, a placenta ou o cordão?"</b> Quase tudo se encaixa nessas três caixas.'
      },
      {
        type: 'grid',
        title: 'Os 3 compartimentos',
        cards: [
          { icon: '🤰', title: 'Materno', text: '<b>Pré-eclâmpsia</b> / hipertensão, diabetes descompensado, anemia grave, hipotensão (anestesia, hipovolemia), hipoxemia materna (asma grave, cardiopatia, COVID), tabagismo, drogas, desnutrição, idade extrema, colagenoses.' },
          { icon: '🧽', title: 'Placentário', text: '<b>Insuficiência placentária</b>, descolamento prematuro (DPP), placenta prévia com sangramento, infarto placentário, pós-datismo (placenta "envelhecida"), gestação múltipla, trombofilias, inserção velamentosa.' },
          { icon: '🔌', title: 'Cordão / útero', text: '<b>Prolapso de cordão</b>, circular de cordão apertada, nó verdadeiro, oligodrâmnio (corda comprime), <b>taquissistolia</b> / hiperestimulação com ocitocina, rotura uterina, trabalho de parto muito prolongado.' }
        ]
      },
      {
        type: 'subtitle',
        text: 'As causas agudas que você PRECISA reconhecer na hora'
      },
      {
        type: 'accordion',
        items: [
          {
            title: 'Prolapso de cordão',
            icon: '🚨',
            body: 'O cordão sai <b>antes do bebê</b> e é comprimido entre a apresentação fetal e a pelve materna. Ocorre após a rotura das membranas.<br><br><b>Sinais:</b> bradicardia fetal súbita e profunda logo após a amniorrexe; cordão palpável/visível no toque vaginal ou na vulva.<br><br><b>Conduta:</b> emergência absoluta — manobra de elevação da apresentação (ou Trendelenburg/genupeitoral) e <b>cesariana imediata</b>. Não perca tempo com LOSSS prolongado.'
          },
          {
            title: 'Descolamento prematuro da placenta (DPP)',
            icon: '💥',
            body: 'A placenta se descola antes do nascimento. Sangue se acumula entre placenta e parede uterina → a área de troca gasosa desaparece de uma vez.<br><br><b>Sinais:</b> dor abdominal intensa e súbita, útero endurecido ("barriga de tábua"), sangramento vaginal (pode ser oculto!), hipertonia uterina, sofrimento fetal agudo.<br><br><b>Conduta:</b> estabilizar a mãe (acesso venoso, reposição volêmica) e <b>resolução imediata da gestação</b>.'
          },
          {
            title: 'Taquissistolia / hiperestimulação uterina',
            icon: '🌀',
            body: 'Mais de <b>5 contrações em 10 minutos</b> (média em 30 min) ou contrações sem intervalo de descanso. Cada contração interrompe a perfusão placentária — sem pausa, o feto nunca reoxigena.<br><br><b>Causa iatrogênica frequente:</b> ocitocina em dose alta. <b>Conduta:</b> suspender a ocitocina (o "S" do LOSSS), lateralizar, hidratar, O₂. Se não reverter, cesariana.'
          },
          {
            title: 'Rotura uterina',
            icon: '🔪',
            body: 'Mais comum em útero com cicatriz prévia (cesárea anterior, miomectomia) submetido a trabalho de parto. Ocorre <b>parada súbita das contrações + dor abdominal intensa + bradicardia fetal profunda + instabilidade materna</b>.<br><br><b>Conduta:</b> laparotomia de emergência imediata.'
          }
        ]
      },
      {
        type: 'key',
        title: 'Fatores de risco para sofrimento fetal crônico',
        items: [
          'Pré-eclâmpsia / hipertensão crônica — <b>a causa número 1</b>',
          'Diabetes mellitus descompensado (especialmente com vasculopatia)',
          'Pós-datismo (> 41 semanas) — placenta envelhecida',
          'Tabagismo, uso de cocaína/crack',
          'Gestação gemelar e restrição de crescimento de um dos fetos',
          'História prévia de RCIU, óbito fetal ou pré-eclâmpsia',
          'Doenças autoimunes (LES, SAF) e trombofilias',
          'Desnutrição materna / ganho de peso insuficiente'
        ]
      },
      {
        type: 'pearl',
        text: 'Pérola de prova: em prova de residência, <b>prolapso de cordão</b> e <b>DPP</b> são as causas agudas mais cobradas. <b>Pré-eclâmpsia</b> é a causa crônica mais cobrada.'
      }
    ]
  },

  /* ==========================================================
     5. DIAGNÓSTICO
     ========================================================== */
  {
    id: 'diagnostico',
    icon: '🩺',
    color: '#34d399',
    title: 'Como Diagnosticar',
    subtitle: 'Sinais clínicos e exames',
    xp: 60,
    sections: [
      {
        type: 'lead',
        text: 'Existem <b>três ferramentas principais</b> no dia a dia, e algumas de apoio. Comece sempre pelo mais simples e barato: <b>perguntar para a mãe</b>.'
      },
      {
        type: 'numbered',
        title: '1. Mobilograma (contagem de movimentos fetais)',
        icon: '🤱',
        body: 'A própria mãe monitora os movimentos. Se o bebê costumava se mexer muito e <b>de repente passa horas imóvel</b>, é sinal de alerta.<br><br><b>Analogia:</b> quando estamos com muita fome ou fracos, evitamos correr e gastar energia; o feto faz o mesmo.',
        extras: [
          'Método clássico: contar 6 movimentos em até 2 horas (ou 10 movimentos em 2h, conforme o protocolo).',
          'É o <b>teste de triagem mais sensível e mais barato</b> para sofrimento fetal crônico.',
          'Redução da movimentação precede a alteração da CTG em dias.',
          'Orientação: deitar em decúbito lateral esquerdo após refeição e contar.'
        ]
      },
      { type: 'fig', id: 'mobilograma', caption: 'Mobilograma: a mãe é a primeira "monitora" do bebê. Queda na movimentação = sinal de alerta.' },
      {
        type: 'numbered',
        title: '2. Cardiotocografia (CTG) — o exame-chave',
        icon: '📈',
        body: 'É o exame que "escuta" o coração do bebê e mede as contrações da mãe <b>ao mesmo tempo</b>. O batimento cardíaco fetal normal varia entre <b>110 e 160 bpm</b>.<br><br>Sinais de sofrimento na CTG incluem: taquicardia (&gt;160 bpm) ou bradicardia (&lt;110 bpm) sustentadas e <b>desacelerações tardias (DIP II)</b> — quedas no batimento do bebê que acontecem <b>depois</b> que a contração da mãe termina. Isso indica que a placenta não tem reserva de oxigênio.',
        extras: [
          '<b>DIP I (precoce)</b> — desce junto com a contração. Causa: compressão do polo cefálico. É <b>benigno</b>.',
          '<b>DIP II (tardia)</b> — desce depois do pico da contração e volta depois que ela termina. Causa: <b>insuficiência placentária</b>. É <b>o sinal clássico de sofrimento fetal</b>.',
          '<b>DIP III (variável)</b> — queda brusca e em "V", sem relação fixa com a contração. Causa: <b>compressão de cordão</b>.'
        ]
      },
      {
        type: 'cta',
        text: 'Você vai praticar CTG no simulador interativo do módulo "CTG na Prática".',
        action: 'ctg',
        label: 'Ir para o Simulador de CTG →'
      },
      {
        type: 'numbered',
        title: '3. Presença de mecônio verdoso',
        icon: '🟢',
        body: 'O mecônio são as <b>primeiras fezes do bebê</b>. Em situações de estresse e falta de oxigênio, o esfíncter anal do feto relaxa e ele <b>evacua dentro do útero</b>, deixando o líquido amniótico esverdeado e espesso.<br><br>Importante: mecônio isolado <b>não é sinônimo</b> de sofrimento fetal — pode ser fisiológico no termo/pós-termo. Mas mecônio <b>espesso + alteração da CTG</b> = sofrimento fetal instalado.',
        extras: [
          'Mecônio pode causar <b>SAM</b> (síndrome de aspiração meconial) — risco de pneumonite química e hipertensão pulmonar.',
          'A presença de mecônio muda a conduta: <b>não aspiar a via aérea de rotina</b> antes de completar o nascimento (diretriz atual); aspirar apenas se obstrução evidente.'
        ]
      },
      { type: 'fig', id: 'meconio', caption: 'Mecônio: a hipóxia relaxa o esfíncter anal e o feto evacua no líquido amniótico.' },
      {
        type: 'subtitle',
        text: 'Exames complementares (pré-natal de alto risco)'
      },
      {
        type: 'grid',
        cards: [
          { icon: '🎯', title: 'Perfil Biofísico Fetal (PBF)', text: '5 parâmetros por USG: movimentos respiratórios, movimentos corporais, tônus, reatividade cardíaca (NST) e ILA. Cada um vale 2 pontos. <b>8-10 = normal; 6 = suspeito; ≤4 = sofrimento fetal / conduta imediata.</b>' },
          { icon: '🩸', title: 'Doppler de artéria umbilical', text: 'Mede a resistência da placenta. Achados de gravidade: <b>diástole zero</b> e depois <b>diástole reversa</b> → insuficiência placentária grave. O ducto venoso e a ACM ajudam a decidir o momento do parto.' },
          { icon: '💧', title: 'Índice de líquido amniótico (ILA)', text: 'Oligodrâmnio (ILA ≤ 5 cm) sugere centralização renal crônica — o rim fetal produz menos urina. É um dos sinais de sofrimento crônico.' },
          { icon: '🔊', title: 'Ausculta intermitente', text: 'Com estetoscópio de Pinard ou Doppler, a cada 15-30 min na 1ª fase e 5 min na 2ª fase. Alternativa à CTG em gestações de baixo risco (reduz cesarianas).' }
        ]
      },
      {
        type: 'table',
        title: 'Categorias da CTG (NICHD / ACOG)',
        head: ['Categoria', 'Significado', 'Achados', 'Conduta'],
        rows: [
          ['<b>I — Normal</b>', 'Preditivo de pH normal', 'Basal 110-160, variabilidade moderada, sem desacelerações; acelerações podem estar presentes', 'Seguir vigilância de rotina'],
          ['<b>II — Indeterminada</b>', 'Não prediz pH anormal — "zona cinzenta"', 'Taquicardia, bradicardia com variabilidade normal, variabilidade mínima, desacelerações variáveis típicas', 'Vigilância contínua, medidas de reanimação intrauterina, reavaliar'],
          ['<b>III — Anormal</b>', 'Preditivo de pH anormal — emergência', 'Ausência de variabilidade + desacelerações tardias/variáveis recorrentes ou bradicardia; <b>padrão sinusoidal</b>', 'Reanimação intrauterina + parto imediato']
        ]
      },
      {
        type: 'warning',
        title: '⚠️ Nunca interprete um traçado isolado',
        text: 'A CTG tem <b>alto valor preditivo negativo</b> (traçado normal = feto bem) e <b>baixo valor preditivo positivo</b> (traçado alterado ≠ feto doente). Por isso: sempre correlacione com o contexto clínico, e nunca tome decisão cirúrgica apenas com base em um traçado duvidoso sem reavaliação.'
      },
      {
        type: 'pearl',
        text: 'Pérola: <b>variabilidade moderada (6-25 bpm) é o sinal tranquilizador mais importante da CTG.</b> Ela reflete um SNC oxigenado e íntegro. Se a variabilidade está boa, respire — mas não relaxe.'
      }
    ]
  },

  /* ==========================================================
     6. CTG NA PRÁTICA (com simulador)
     ========================================================== */
  {
    id: 'ctg',
    icon: '📈',
    color: '#22d3ee',
    title: 'CTG na Prática',
    subtitle: 'Leia o traçado como uma obstetra',
    xp: 80,
    sections: [
      {
        type: 'lead',
        text: 'A CTG é o exame mais cobrado e mais mal interpretado da obstetrícia. Vamos destravar isso com uma <b>receita de bolo</b> — e depois você treina no simulador.'
      },
      {
        type: 'mnemonic',
        title: 'DR C BRAVADO — a ordem de leitura',
        items: [
          { k: 'DR', v: '<b>D</b>efine <b>R</b>isk — qual o risco daquela gestação?' },
          { k: 'C', v: '<b>C</b>ontractions — quantas contrações em 10 minutos? (normal ≤ 5)' },
          { k: 'BRA', v: '<b>B</b>aseline <b>R</b>ate — qual a frequência de base? (normal 110-160 bpm)' },
          { k: 'V', v: '<b>V</b>ariability — qual a variabilidade? (normal: moderada, 6-25 bpm)' },
          { k: 'A', v: '<b>A</b>ccelerations — tem acelerações? (presentes = tranquilizador)' },
          { k: 'D', v: '<b>D</b>ecelerations — tem desacelerações? Qual tipo?' },
          { k: 'O', v: '<b>O</b>verall — qual a impressão geral e a tendência?' }
        ]
      },
      {
        type: 'subtitle',
        text: 'Os 4 tipos de desaceleração — decore assim'
      },
      {
        type: 'decel',
        items: [
          { id: 'dip1', name: 'DIP I', alias: 'Precoce / Early', shape: 'gradual', timing: 'Junto com a contração (nadir no pico)', cause: 'Compressão do polo cefálico (reflexo vagal)', severity: 'benigno', color: '#34d399', meaning: 'Fisiológico. Não indica hipóxia.' },
          { id: 'dip2', name: 'DIP II', alias: 'Tardia / Late', shape: 'gradual', timing: 'Começa depois do início e nadir DEPOIS do pico; recupera depois do fim da contração', cause: 'Insuficiência placentária / hipóxia', severity: 'grave', color: '#ef4444', meaning: 'SINAL CLÁSSICO DE SOFRIMENTO FETAL. Indica que a placenta não tem reserva de O₂.' },
          { id: 'dip3', name: 'DIP III', alias: 'Variável / Variable', shape: 'abrupta', timing: 'Sem relação fixa com a contração', cause: 'Compressão de cordão umbilical', severity: 'depende', color: '#f59e0b', meaning: 'Típica (com aceleracões iniciais/finais) = geralmente benigna. Complicada (sem retorno, overshoot, taquicardia de rebote, perda de variabilidade) = gravidade.' },
          { id: 'dip0', name: 'Desaceleração prolongada', alias: 'Prolonged', shape: 'prolongada', timing: '≥ 2 minutos e < 10 minutos abaixo da linha de base', cause: 'Hipóxia aguda, prolapso de cordão, hipotensão materna, taquissistolia', severity: 'grave', color: '#a855f7', meaning: 'Emergência. Reanimação intrauterina imediata + resolver a causa.' }
        ]
      },
      { type: 'fig', id: 'dips', caption: 'Formato das desacelerações em relação à contração uterina (curva de baixo).' },
      {
        type: 'ctg-simulator'
      },
      {
        type: 'key',
        title: 'Os 5 sinais que gritam "SOFRIMENTO FETAL"',
        items: [
          '<b>Bradicardia</b> sustentada (&lt; 110 bpm), especialmente &lt; 100 bpm',
          '<b>DIP II recorrentes</b> (em ≥ 50% das contrações)',
          '<b>Ausência de variabilidade</b> associada a desacelerações',
          '<b>Desaceleração prolongada</b> ≥ 2 minutos',
          '<b>Padrão sinusoidal</b> — oscilação regular em "onda", sinal de anemia fetal grave (aloisoimunização, hemorragia fetomaterna)'
        ]
      },
      {
        type: 'pearl',
        text: 'Pérola: a variabilidade é o <b>juiz</b> da CTG. DIP II com variabilidade moderada = ainda tem reserva, pode tentar reanimação. DIP II com variabilidade ausente = o feto já está descompensado, parto imediato.'
      }
    ]
  },

  /* ==========================================================
     7. CONDUTA
     ========================================================== */
  {
    id: 'conduta',
    icon: '🚑',
    color: '#ef4444',
    title: 'Conduta Médica',
    subtitle: 'O que fazer — passo a passo',
    xp: 70,
    sections: [
      {
        type: 'lead',
        text: 'Diante de suspeita de sofrimento fetal agudo durante o parto, a conduta segue passos lógicos de <b>reanimação intrauterina</b> antes de decidir pela via de parto. Grave este mnemônico: <b>L.O.S.S.</b>'
      },
      { type: 'fig', id: 'loss', caption: 'Manobra de L.O.S.S. — quatro gestos que ganham tempo e oxigênio para o feto.' },
      {
        type: 'loss',
        title: 'Manobra de L.O.S.S. — Reanimação Intrauterina',
        items: [
          { letter: 'L', word: 'Lateralização', icon: '🛏️', color: '#38bdf8',
            body: 'Mudar a mãe para <b>decúbito lateral esquerdo</b>. Isso tira o peso do útero de cima da <b>veia cava inferior</b>, melhorando o retorno venoso para o coração e, consequentemente, o fluxo para a placenta.<br><br><i>Alternativa:</i> se não puder lateralizar, deslocamento manual do útero para a esquerda.',
            why: 'Aumenta o débito cardíaco materno → mais sangue na placenta → mais O₂ para o feto.' },
          { letter: 'O', word: 'Oxigenação', icon: '💨', color: '#34d399',
            body: 'Oferecer <b>oxigênio por máscara</b> para a mãe (10-15 L/min), com o objetivo de aumentar a saturação materna e, com ela, o aporte que chega ao bebê.',
            why: 'Sobe a PaO₂ materna → aumenta o gradiente de difusão pela barreira placentária.' },
          { letter: 'S', word: 'Suspensão', icon: '⏸️', color: '#f59e0b',
            body: 'Cortar <b>imediatamente a ocitocina</b> se houver bomba de infusão ativa. Parar as contrações para dar descanso ao útero e permitir a reoxigenação fetal entre as contrações.',
            why: 'Cada contração interrompe a perfusão. Sem pausa, o feto nunca recupera.' },
          { letter: 'S', word: 'Soro', icon: '💧', color: '#a78bfa',
            body: 'Hidratação venosa rápida (soro fisiológico ou Ringer lactato) para <b>expandir o volume sanguíneo materno</b> e melhorar a pressão arterial e a perfusão uteroplacentária.',
            why: 'Corrige hipotensão e hipovolemia — causas frequentes e reversíveis de má perfusão placentária.' }
        ]
      },
      {
        type: 'key',
        title: 'Complementos que também valem ouro',
        items: [
          '<b>Toque vaginal</b> — excluir prolapso de cordão e avaliar a dilatação (o que define a via de parto).',
          '<b>Amnioinfusão</b> — instilar soro no útero para aliviar compressão de cordão (desacelerações variáveis).',
          '<b>Suspender outras drogas</b> que causem hipotensão ou hipertonia uterina.',
          '<b>Reavaliar em 10-15 minutos</b> — se o padrão melhorar, pode-se continuar o trabalho de parto com vigilância contínua.'
        ]
      },
      {
        type: 'subtitle',
        text: 'E se o LOSSS não funcionar? A via de parto'
      },
      {
        type: 'decision',
        title: 'Decisão da via de parto',
        branches: [
          { cond: 'Bebê já está prestes a sair (dilatação completa + apresentação baixa)', icon: '🩹', action: 'Parto instrumental', detail: 'Fórceps ou vácuo-extrator — extração rápida e segura quando há condições técnicas.', color: '#f59e0b' },
          { cond: 'Bebê ainda alto / sem condições de parto vaginal', icon: '🔪', action: 'Cesariana de emergência', detail: 'Decisão imediata, sem tentar mais manobras. Tempo é cérebro.', color: '#ef4444' },
          { cond: 'Padrão melhorou com LOSSS', icon: '✅', action: 'Continuar com vigilância', detail: 'Manter CTG contínua, monitorar de perto e estar pronto para reintervir.', color: '#34d399' }
        ]
      },
      {
        type: 'timeline',
        title: 'A regra do tempo',
        items: [
          { t: '0 min', d: 'Reconhece padrão não tranquilizador → inicia LOSSS, chama a equipe, monta a sala.' },
          { t: '10 min', d: 'Reavalia. Se não houve melhora → decide via de parto.' },
          { t: '30 min', d: 'Limite máximo entre a decisão e o nascimento (intervalo decisão-parto) para não haver sequela.' },
          { t: 'Após', d: 'Coletar gasometria de cordão, pesar, Apgar, reanimação neonatal se necessário.' }
        ]
      },
      {
        type: 'pearl',
        text: 'Pérola: o intervalo <b>decisão-nascimento</b> ideal é &lt; 30 minutos. Quanto maior a acidose no momento da decisão, mais rápido precisa ser.'
      }
    ]
  },

  /* ==========================================================
     8. NEONATAL
     ========================================================== */
  {
    id: 'neonatal',
    icon: '👶',
    color: '#fbbf24',
    title: 'Repercussões Neonatais',
    subtitle: 'O que acontece depois do nascimento',
    xp: 55,
    sections: [
      {
        type: 'lead',
        text: 'O sofrimento fetal não termina no parto — ele define os primeiros minutos (e às vezes os primeiros anos) de vida daquele bebê. Aqui entram o <b>Apgar</b> e a <b>gasometria de cordão</b>.'
      },
      {
        type: 'grid',
        title: 'Avaliação imediata',
        cards: [
          { icon: '🔢', title: 'Apgar (1º e 5º minuto)', text: '<b>A</b>parência (cor), <b>P</b>ulso (FC), <b>G</b>rimace (reflexo), <b>A</b>tividade (tônus), <b>R</b>espiração. Cada um 0-2. <b>≥ 7 normal; 4-6 deprimido; ≤ 3 asfixia grave.</b> Não serve para diagnóstico de asfixia — é para reanimação.' },
          { icon: '🧪', title: 'Gasometria de cordão', text: 'Coletada da <b>artéria umbilical</b> (não da veia!). O melhor indicador de asfixia intraparto. <b>pH &lt; 7,00</b> e <b>base excess (BE) &lt; -12 mEq/L</b> definem acidemia metabólica significativa.' },
          { icon: '🫁', title: 'Reanimação neonatal', text: 'Sala de parto preparada com equipe de neonatologia, berço aquecido, aspiração e ventilação com pressão positiva (VPP). Atualização: <b>não aspirar a via aérea de rotina</b> em mecônio.' }
        ]
      },
      {
        type: 'subtitle',
        text: 'As 3 complicações neonatais clássicas'
      },
      {
        type: 'accordion',
        items: [
          {
            title: 'Encefalopatia hipóxico-isquêmica (EHI)',
            icon: '🧠',
            body: 'É a complicação mais temida. Lesão cerebral por hipóxia-isquemia perinatal, com evolução em <b>3 fases</b>:<br><br><b>1ª — Fase latente:</b> o cérebro parece recuperar (minutos a horas).<br><b>2ª — Fase de latência:</b> queda do metabolismo, janela terapêutica (aproximadamente 6 horas).<br><b>3ª — Falência energética secundária:</b> morte neuronal, convulsões, edema cerebral.<br><br><b>Tratamento:</b> <b>hipotermia terapêutica</b> — resfriamento corporal a 33,5-34,5 °C por 72 horas, iniciado <b>dentro da janela de 6 horas</b>. Reduz mortalidade e paralisia cerebral.<br><br><b>Sarnat (estadiamento):</b> leve, moderada e grave.'
          },
          {
            title: 'Síndrome de aspiração meconial (SAM)',
            icon: '🫁',
            body: 'O feto hipóxico faz movimentos respiratórios profundos <b>dentro do útero</b> e aspira mecônio espesso.<br><br><b>Consequências:</b> obstrução mecânica das vias aéreas (atapetamento), pneumonite química, hipertensão pulmonar persistente do recém-nascido (HPPRN) e pneumonia.<br><br><b>Manejo:</b> suporte respiratório, oxigênio, VPP/ventilação mecânica, óxido nítrico inalatório (HPPRN), antibióticos. Uso de surfactante conforme protocolo.'
          },
          {
            title: 'Morte fetal / neonatal',
            icon: '⚫',
            body: 'Quando a asfixia é profunda e prolongada, há falência de múltiplos órgãos: rins (necrose tubular aguda), coração (miocardiopatia), fígado, intestino (enterocolite), coagulação (CIVD).<br><br><b>Definição de morte fetal:</b> ausência de batimentos cardíacos fetais a partir de 20-22 semanas (ou 500 g), conforme critério adotado.'
          }
        ]
      },
      {
        type: 'key',
        title: 'A tríade que define asfixia perinatal (AAP/ACOG)',
        items: [
          '1. <b>Acidemia metabólica</b> na gasometria de cordão: pH &lt; 7,00 e BE ≤ -12',
          '2. <b>Apgar de 5 minutos ≤ 5</b>',
          '3. <b>Encefalopatia neonatal</b> (convulsões, hipotonia, coma) e/ou disfunção de múltiplos órgãos',
          'Os três precisam estar presentes para falarmos de asfixia perinatal com consequência neurológica.'
        ]
      },
      {
        type: 'pearl',
        text: 'Pérola: <b>Apgar baixo não é asfixia.</b> Apgar é uma ferramenta de reanimação, não de diagnóstico. O diagnóstico exige gasometria. Muitos bebês prematuros têm Apgar baixo com pH normal.'
      }
    ]
  },

  /* ==========================================================
     9. GLOSSÁRIO
     ========================================================== */
  {
    id: 'glossario',
    icon: '📖',
    color: '#94a3b8',
    title: 'Glossário & Flashcards',
    subtitle: 'Fixe o vocabulário',
    xp: 35,
    sections: [
      {
        type: 'lead',
        text: 'Clique em cada carta para virar e revelar a definição. Terminologia é metade da prova.'
      },
      {
        type: 'flashcards',
        cards: [
          { q: 'Sofrimento fetal', a: 'Estado de asfixia progressiva com hipóxia, hipercapnia e acidose por falha na troca placentária.' },
          { q: 'Centralização fetal (brain-sparing)', a: 'Redistribuição do débito cardíaco fetal: vasoconstrição periférica e vasodilatação de cérebro, coração e adrenais.' },
          { q: 'RCIU / PIG', a: 'Restrição do crescimento intrauterino / Pequeno para a idade gestacional. Peso abaixo do percentil 10 (PIG) ou com falha de crescimento (RCIU).' },
          { q: 'DIP I', a: 'Desaceleração precoce: gradual, junto com a contração, por compressão do polo cefálico. Benigna.' },
          { q: 'DIP II', a: 'Desaceleração tardia: gradual, após o pico da contração, por insuficiência placentária. Sinal clássico de sofrimento fetal.' },
          { q: 'DIP III', a: 'Desaceleração variável: abrupta, em "V", por compressão de cordão. Complicada = gravidade.' },
          { q: 'Taquissistolia', a: 'Mais de 5 contrações em 10 minutos (média em 30 min). Reduz a reoxigenação fetal entre contrações.' },
          { q: 'Prolapso de cordão', a: 'Cordão exteriorizado antes do feto, comprimido entre apresentação e pelve. Emergência cirúrgica.' },
          { q: 'DPP', a: 'Descolamento prematuro de placenta normalmente inserida. Dor súbita, útero hipertônico, sangramento (pode ser oculto).' },
          { q: 'LOSSS', a: 'Lateralização, Oxigenação, Suspensão da ocitocina e Soro — manobra de reanimação intrauterina.' },
          { q: 'Mecônio', a: 'Primeiras fezes do feto. Hipóxia → relaxamento do esfíncter anal → líquido amniótico esverdeado.' },
          { q: 'Perfil Biofísico Fetal', a: '5 parâmetros (mov. respiratórios, mov. corporais, tônus, reatividade e ILA), 0-2 pontos cada. ≤4 = sofrimento.' },
          { q: 'Diástole zero/reversa', a: 'Achado grave do Doppler de artéria umbilical: fluxo ausente ou invertido na diástole → insuficiência placentária grave.' },
          { q: 'Padrão sinusoidal', a: 'Oscilação regular em onda na CTG. Indica anemia fetal grave (aloisoimunização, hemorragia fetomaterna).' },
          { q: 'Encefalopatia hipóxico-isquêmica', a: 'Lesão cerebral perinatal por hipóxia-isquemia. Tratamento: hipotermia terapêutica nas primeiras 6 horas.' },
          { q: 'Base excess (BE)', a: 'Excesso/déficit de base na gasometria. BE ≤ -12 mEq/L junto com pH < 7,00 indica acidemia metabólica grave.' },
          { q: 'Amnioinfusão', a: 'Instilação de soro fisiológico intrauterino para aliviar compressão de cordão (oligodrâmnio / DIP III).' },
          { q: 'Hipotermia terapêutica', a: 'Resfriamento a 33,5-34,5 °C por 72 h, iniciado em até 6 h de vida, em EHI moderada a grave.' },
          { q: 'Intervalo decisão-parto', a: 'Tempo entre a decisão de interromper e o nascimento. Ideal < 30 minutos em sofrimento fetal agudo.' },
          { q: 'Padrão não tranquilizador', a: 'Termo atual preferido a "sofrimento fetal" — mais preciso e menos estigmatizante.' }
        ]
      }
    ]
  }
];

/* ============================================================
   CASOS CLÍNICOS INTERATIVOS
   ============================================================ */
const CASES = [
  {
    id: 'caso1',
    icon: '🚨',
    title: 'Caso 1 — A queda súbita',
    difficulty: 'Fácil',
    xp: 40,
    stem: 'Primípara, 39 semanas, em trabalho de parto, 5 cm de dilatação. A bolsa rompeu agora e saiu líquido claro. Imediatamente após a amniorrexe, a CTG mostra <b>bradicardia fetal de 70 bpm</b> que não recupera.',
    question: 'Qual é a sua primeira hipótese e qual a conduta?',
    options: [
      { t: 'Prolapso de cordão. Toque vaginal imediato + manobra de elevação da apresentação e cesariana de emergência.', correct: true, why: 'Exato. Bradicardia súbita e profunda logo após amniorrexe é a assinatura clássica do prolapso de cordão. O toque confirma (cordão palpável), a elevação da apresentação descomprime e a cesariana é imediata.' },
      { t: 'DIP I fisiológico. Apenas observar.', correct: false, why: 'DIP I é uma desaceleração gradual que acompanha a contração, não uma bradicardia profunda súbita após amniorrexe.' },
      { t: 'Sofrimento fetal crônico. Solicitar perfil biofísico fetal.', correct: false, why: 'O quadro é agudo, intraparto. Não há tempo nem indicação para PBF.' },
      { t: 'Fase de latência normal. Aguardar 1 hora.', correct: false, why: 'Bradicardia de 70 bpm não recuperada é emergência. Aguardar uma hora significaria lesão cerebral grave ou óbito.' }
    ]
  },
  {
    id: 'caso2',
    icon: '📈',
    title: 'Caso 2 — A placenta cansada',
    difficulty: 'Médio',
    xp: 50,
    stem: 'Gestante de 37 semanas com pré-eclâmpsia grave, em uso de ocitocina para indução. CTG mostra: linha de base 145 bpm, variabilidade moderada, acelerações ausentes, e <b>desacelerações graduais que começam após o início da contração e cujo nadir ocorre depois do pico, retornando à base após o fim da contração</b>. Frequência: em 5 de 6 contrações.',
    question: 'Que tipo de desaceleração é essa e o que ela significa?',
    options: [
      { t: 'DIP I — compressão de polo cefálico, conduta expectante.', correct: false, why: 'DIP I tem nadir no pico da contração. Aqui o nadir é depois do pico.' },
      { t: 'DIP II (tardias) — insuficiência placentária. Iniciar LOSSS e reavaliar em 10-15 min.', correct: true, why: 'Perfeito. Desaceleração gradual, recorrente, com nadir após o pico da contração = DIP II. Contexto de pré-eclâmpsia reforça insuficiência placentária. LOSSS é o primeiro passo, com reavaliação rápida.' },
      { t: 'DIP III — compressão de cordão, fazer amnioinfusão.', correct: false, why: 'DIP III é abrupta e em "V", sem relação fixa com a contração. Esta é gradual e recorrente com a contração.' },
      { t: 'Traçado normal — apenas seguir observando.', correct: false, why: 'DIP II recorrente em 83% das contrações é padrão não tranquilizador, categoria II/III conforme a variabilidade.' }
    ]
  },
  {
    id: 'caso3',
    icon: '⚡',
    title: 'Caso 3 — O útero sem descanso',
    difficulty: 'Médio',
    xp: 50,
    stem: 'Gestante em trabalho de parto com ocitocina a 20 mUI/min. O tocodinamômetro mostra <b>7 contrações em 10 minutos</b>, sem intervalo de descanso entre elas. A CTG começa a mostrar desacelerações variáveis recorrentes e queda da variabilidade.',
    question: 'Qual a primeira medida?',
    options: [
      { t: 'Aumentar a ocitocina para acelerar o parto.', correct: false, why: 'Aumentaria ainda mais a hiperestimulação. Conduta exatamente oposta.' },
      { t: 'Suspender a ocitocina, lateralizar a paciente, oferecer O₂ e hidratar (LOSSS).', correct: true, why: 'Exato. A taquissistolia é iatrogênica e reversível. O "S" de Suspensão é a medida mais eficaz aqui, combinada com os demais passos do LOSSS.' },
      { t: 'Cesariana imediata sem outras medidas.', correct: false, why: 'Antes de indicar cirurgia, é obrigatório tentar reverter a causa reversível (hiperestimulação). Muitos casos revertem completamente com o LOSSS.' },
      { t: 'Realizar toque vaginal e aguardar 1 hora.', correct: false, why: 'Aguardar uma hora com hiperestimulação e desacelerações recorrentes é negligência.' }
    ]
  },
  {
    id: 'caso4',
    icon: '🟢',
    title: 'Caso 4 — O líquido verde',
    difficulty: 'Fácil',
    xp: 40,
    stem: 'Gestante de 41 semanas e 2 dias chega em trabalho de parto. À amnioscopia/amniorrexe, o líquido é <b>esverdeado e espesso</b>. A CTG está normal (categoria I).',
    question: 'Como você interpreta?',
    options: [
      { t: 'Sofrimento fetal instalado — cesariana imediata.', correct: false, why: 'Mecônio isolado com CTG normal não indica cesariana. A CTG é o que define a urgência.' },
      { t: 'Mecônio isolado, provavelmente por pós-datismo, com CTG tranquilizadora. Manter vigilância contínua e preparar a sala de parto com neonatologia.', correct: true, why: 'Mecônio pode ser fisiológico no termo/pós-termo (maturação intestinal). O que muda a conduta é a associação com CTG alterada. Vigilância contínua + equipe neonatal preparada.' },
      { t: 'Rotura prematura de membranas — apenas aguardar.', correct: false, why: 'Não há informação sobre rotura prematura, e a questão central é a interpretação do mecônio.' },
      { t: 'Indicar amnioinfusão de rotina.', correct: false, why: 'Amnioinfusão é considerada em desacelerações variáveis por compressão de cordão, não de rotina por mecônio.' }
    ]
  },
  {
    id: 'caso5',
    icon: '🧠',
    title: 'Caso 5 — O recém-nascido deprimido',
    difficulty: 'Difícil',
    xp: 60,
    stem: 'Nasceu um RN de 39 semanas após cesariana de emergência por DIP II recorrentes. Apgar 3 no 1º minuto e 5 no 5º minuto. Gasometria de <b>artéria umbilical</b>: pH 6,90 e base excess -16. Ao exame, o RN está hipotônico, com reflexos diminuídos e apresentou convulsão aos 40 minutos de vida.',
    question: 'Qual o diagnóstico e a conduta mais importante?',
    options: [
      { t: 'Asfixia perinatal com EHI moderada a grave. Iniciar hipotermia terapêutica em até 6 horas de vida.', correct: true, why: 'Perfeito. Tríade completa: acidemia metabólica grave (pH 6,90 e BE -16), Apgar 5 min ≤ 5 e encefalopatia com convulsão. Hipotermia terapêutica dentro da janela de 6 h reduz mortalidade e paralisia cerebral.' },
      { t: 'Sepse neonatal precoce. Iniciar antibióticos e aguardar culturas.', correct: false, why: 'O quadro é claramente hipóxico-isquêmico pelo contexto (DIP II, acidemia grave, encefalopatia precoce). Antibióticos podem ser associados, mas não são a conduta central.' },
      { t: 'Hipoglicemia neonatal. Apenas corrigir glicemia.', correct: false, why: 'Hipoglicemia deve ser excluída, mas não explica acidemia de pH 6,90 com BE -16.' },
      { t: 'Observar por 24 horas e reavaliar.', correct: false, why: 'A janela terapêutica da hipotermia é de 6 horas. Observar significa perder a única intervenção que muda o prognóstico.' }
    ]
  }
];

/* ============================================================
   BANCO DE QUESTÕES
   ============================================================ */
const QUESTIONS = [
  /* --- CONCEITO / FISIOPATO --- */
  { m: 'conceito', q: 'Sofrimento fetal é melhor definido como:', o: ['Uma doença placentária específica', 'Um estado de asfixia progressiva por falha na oferta de O₂ e nutrientes', 'Uma malformação cardíaca fetal', 'Uma infecção intrauterina'], a: 1, e: 'Não é uma doença, e sim um estado — a via final comum de vários processos que levam à hipóxia fetal.' },
  { m: 'fisiopato', q: 'A "centralização fetal" (brain-sparing) consiste em:', o: ['Aumento do fluxo para os membros inferiores', 'Vasoconstrição periférica com vasodilatação de cérebro, coração e adrenais', 'Redução do débito cardíaco fetal', 'Aumento da produção de líquido amniótico'], a: 1, e: 'O feto desvia o sangue para os órgãos vitais, às custas do crescimento e da função renal (oligodrâmnio).' },
  { m: 'fisiopato', q: 'Na hipóxia fetal crônica, qual achado Doppler da artéria umbilical indica gravidade?', o: ['Índice de pulsatilidade reduzido', 'Diástole zero ou reversa', 'Aumento do fluxo diastólico', 'Fluxo turbulento'], a: 1, e: 'Diástole zero e depois reversa indicam resistência placentária extrema — insuficiência placentária grave.' },
  { m: 'fisiopato', q: 'Qual é o principal sinal tranquilizador da CTG?', o: ['Bradicardia leve', 'Variabilidade moderada (6-25 bpm)', 'Ausência de acelerações', 'Desacelerações variáveis típicas'], a: 1, e: 'A variabilidade moderada reflete SNC oxigenado e íntegro — é o melhor preditor de pH normal.' },

  /* --- CLASSIFICAÇÃO --- */
  { m: 'classificacao', q: 'O sofrimento fetal CRÔNICO caracteriza-se por:', o: ['Instalação em minutos a horas durante o parto', 'Instalação em semanas a meses, geralmente no pré-natal, com RCIU e oligodrâmnio', 'Bradicardia fetal súbita após amniorrexe', 'Sempre evoluir para óbito fetal imediato'], a: 1, e: 'O crônico é lento, com adaptação fetal (centralização), levando a RCIU, oligodrâmnio e Doppler alterado.' },
  { m: 'classificacao', q: 'Qual das alternativas é causa TÍPICA de sofrimento fetal agudo?', o: ['Pré-eclâmpsia', 'Tabagismo materno', 'Prolapso de cordão', 'Diabetes descompensado de longa data'], a: 2, e: 'Prolapso de cordão, DPP e taquissistolia são causas agudas clássicas. Pré-eclâmpsia, tabagismo e DM são causas crônicas.' },
  { m: 'classificacao', q: 'Um feto com RCIU e oligodrâmnio, durante o trabalho de parto:', o: ['Tem reserva aumentada, descompensa mais devagar', 'Tem reserva reduzida e descompensa mais rapidamente', 'Não sofre influência do trabalho de parto', 'Nunca evolui para acidose'], a: 1, e: 'O crônico é o terreno fértil do agudo: a reserva já está consumida.' },

  /* --- CAUSAS --- */
  { m: 'causas', q: 'Mais de 5 contrações em 10 minutos (média em 30 min) define:', o: ['Taquissistolia', 'Bradissistolia', 'Trabalho de parto normal', 'Hipossistolia'], a: 0, e: 'Taquissistolia/hiperestimulação. Cada contração interrompe a perfusão placentária — sem pausa, o feto nunca reoxigena.' },
  { m: 'causas', q: 'Causa mais comum de sofrimento fetal crônico:', o: ['Prolapso de cordão', 'Pré-eclâmpsia / síndromes hipertensivas', 'Rotura uterina', 'Circular de cordão'], a: 1, e: 'As síndromes hipertensivas são a principal causa de insuficiência placentária crônica.' },
  { m: 'causas', q: 'Na suspeita de DPP, qual achado clínico é típico?', o: ['Útero hipotônico e indolor', 'Útero hipertônico, doloroso, com sangramento que pode ser oculto', 'Ausência de sangramento e dor', 'Aumento da movimentação fetal'], a: 1, e: 'Clássico: dor súbita, útero endurecido ("barriga de tábua") e sangramento que pode estar oculto atrás da placenta.' },

  /* --- DIAGNÓSTICO --- */
  { m: 'diagnostico', q: 'A frequência cardíaca fetal basal normal na CTG é:', o: ['90-110 bpm', '110-160 bpm', '160-200 bpm', '100-140 bpm'], a: 1, e: '110 a 160 bpm. Abaixo disso é bradicardia; acima, taquicardia.' },
  { m: 'diagnostico', q: 'O DIP II (desaceleração tardia) indica:', o: ['Compressão do polo cefálico', 'Compressão de cordão umbilical', 'Insuficiência placentária com reserva esgotada', 'Variabilidade normal'], a: 2, e: 'DIP II = queda gradual com nadir após o pico da contração, por insuficiência placentária. É o sinal clássico de sofrimento fetal.' },
  { m: 'diagnostico', q: 'DIP III (variável) em "V", abrupta, está classicamente associada a:', o: ['Compressão de cordão umbilical', 'Insuficiência placentária', 'Compressão do polo cefálico', 'Anemia fetal'], a: 0, e: 'As desacelerações variáveis decorrem de compressão de cordão — a causa reversível com lateralização e amnioinfusão.' },
  { m: 'diagnostico', q: 'Qual o método de triagem MAIS simples e sensível para sofrimento fetal crônico?', o: ['Cardiotocografia', 'Perfil biofísico fetal', 'Mobilograma', 'Doppler de artéria umbilical'], a: 2, e: 'O mobilograma — a contagem de movimentos pela própria mãe. É barato, precoce e sensível.' },
  { m: 'diagnostico', q: 'No Perfil Biofísico Fetal, uma pontuação de 4 significa:', o: ['Normal', 'Suspeito, repetir em 24 h', 'Sofrimento fetal, conduta imediata', 'Exame inconclusivo'], a: 2, e: '8-10 normal; 6 suspeito; ≤4 indica sofrimento fetal com necessidade de conduta imediata.' },
  { m: 'diagnostico', q: 'Qual é o peso do líquido amniótico meconial no diagnóstico?', o: ['É sinônimo absoluto de sofrimento fetal', 'Nunca tem significado clínico', 'Pode ser fisiológico no termo/pós-termo; ganha significado com CTG alterada', 'Indica sempre infecção'], a: 2, e: 'Mecônio isolado não é sinônimo de sofrimento. Mecônio espesso + CTG alterada = sofrimento instalado.' },
  { m: 'diagnostico', q: 'A categoria III da CTG (NICHD) inclui:', o: ['Basal 110-160 com variabilidade moderada', 'Ausência de variabilidade com desacelerações tardias recorrentes ou padrão sinusoidal', 'Taquicardia com variabilidade moderada', 'DIP I isolado'], a: 1, e: 'Categoria III prediz pH anormal: ausência de variabilidade + desacelerações recorrentes/bradicardia, ou padrão sinusoidal. Requer ação imediata.' },

  /* --- CTG --- */
  { m: 'ctg', q: 'O mnemônico "DR C BRAVADO" serve para:', o: ['Classificar o mecônio', 'Sistematizar a leitura da CTG', 'Calcular o Apgar', 'Estadiar a EHI'], a: 1, e: 'DR (define risk), C (contractions), BRA (baseline rate), V (variability), A (accelerations), D (decelerations), O (overall).' },
  { m: 'ctg', q: 'Uma aceleração na CTG (≥15 bpm por ≥15 s) significa:', o: ['Hipóxia fetal instalada', 'Reserva de oxigênio preservada — sinal tranquilizador', 'Compressão de cordão', 'Acidose metabólica'], a: 1, e: 'Acelerações indicam reatividade e reserva intacta. Ausência delas é que preocupa.' },
  { m: 'ctg', q: 'Padrão sinusoidal na CTG sugere:', o: ['Hipóxia leve', 'Anemia fetal grave (aloisoimunização, hemorragia fetomaterna)', 'Compressão de polo cefálico', 'Taquissistolia'], a: 1, e: 'O padrão sinusoidal é uma oscilação regular em onda, associada a anemia fetal grave. É categoria III.' },
  { m: 'ctg', q: 'Desaceleração prolongada é definida como queda de pelo menos 15 bpm por:', o: ['15 segundos', '30 segundos', '2 minutos ou mais', '10 minutos ou mais'], a: 2, e: '≥ 2 minutos e < 10 minutos. Se durar 10 minutos ou mais, passa a ser considerada mudança de linha de base.' },
  { m: 'ctg', q: 'A variabilidade mínima pode ser causada por:', o: ['Ciclo de sono fetal, medicamentos e prematuridade', 'Apenas hipóxia grave', 'Apenas compressão de cordão', 'Nada — é sempre artefato'], a: 0, e: 'Cuidado: sono fetal, sedativos/opioides, prematuridade extrema e anomalias do SNC também reduzem a variabilidade. Nem toda variabilidade mínima é hipóxia.' },

  /* --- CONDUTA --- */
  { m: 'conduta', q: 'O mnemônico L.O.S.S. significa:', o: ['Lateralização, Oxigenação, Suspensão, Soro', 'Lavagem, Observação, Sedação, Sutura', 'Ligadura, Ocitocina, Sonda, Soro', 'Lateralização, Ocitocina, Sondagem, Sutura'], a: 0, e: 'Lateralização (decúbito lateral esquerdo), Oxigenação, Suspensão da ocitocina e Soro (hidratação venosa rápida).' },
  { m: 'conduta', q: 'Por que a lateralização melhora o sofrimento fetal?', o: ['Reduz a dor materna', 'Descomprime a veia cava inferior, melhorando o retorno venoso e a perfusão placentária', 'Aumenta as contrações', 'Reduz a frequência cardíaca materna'], a: 1, e: 'O útero comprime a veia cava em decúbito dorsal (síndrome da hipotensão supina). Lateralizar restaura o retorno venoso.' },
  { m: 'conduta', q: 'O intervalo decisão-parto ideal em sofrimento fetal agudo é:', o: ['Até 2 horas', 'Até 1 hora', 'Menos de 30 minutos', 'Não importa'], a: 2, e: 'Menos de 30 minutos. Quanto maior a acidose, mais rápido precisa ser — tempo é cérebro.' },
  { m: 'conduta', q: 'Após iniciar o LOSSS, quando reavaliar o traçado?', o: ['Em 2 horas', 'Em 10-15 minutos', 'No dia seguinte', 'Apenas após o nascimento'], a: 1, e: 'A reavaliação rápida define se é possível continuar o trabalho de parto ou se é necessário interromper.' },
  { m: 'conduta', q: 'Diante de prolapso de cordão confirmado, a conduta é:', o: ['LOSSS por 1 hora antes de decidir', 'Amnioinfusão e aguardar', 'Elevação da apresentação + cesariana imediata', 'Aguardar parto vaginal espontâneo'], a: 2, e: 'É emergência absoluta: descomprimir (elevação da apresentação, Trendelenburg/genupeitoral) e cesariana imediata.' },
  { m: 'conduta', q: 'A amnioinfusão é mais útil em:', o: ['DIP II por insuficiência placentária', 'Desacelerações variáveis por compressão de cordão em oligodrâmnio', 'Bradicardia por DPP', 'Padrão sinusoidal'], a: 1, e: 'Instilar soro no útero cria um "colchão" que reduz a compressão do cordão. Não resolve insuficiência placentária.' },

  /* --- NEONATAL --- */
  { m: 'neonatal', q: 'A gasometria para avaliação de asfixia perinatal deve ser coletada de:', o: ['Veia umbilical', 'Artéria umbilical', 'Veia materna', 'Artéria radial do RN'], a: 1, e: 'Artéria umbilical — reflete o que o feto recebia. A veia umbilical reflete o que chega pela placenta.' },
  { m: 'neonatal', q: 'Critérios de acidemia metabólica significativa na gasometria de cordão:', o: ['pH < 7,20 e BE > -5', 'pH < 7,00 e BE ≤ -12 mEq/L', 'pH < 7,35 e BE -2', 'pCO₂ > 40 mmHg'], a: 1, e: 'pH < 7,00 e BE ≤ -12 mEq/L definem acidemia metabólica significativa.' },
  { m: 'neonatal', q: 'O tratamento com evidência de melhora de desfecho na EHI moderada a grave é:', o: ['Corticoterapia', 'Hipotermia terapêutica iniciada em até 6 horas de vida', 'Fenobarbital profilático', 'Fototerapia'], a: 1, e: 'Hipotermia a 33,5-34,5 °C por 72 h, iniciada na janela de 6 horas, reduz mortalidade e paralisia cerebral.' },
  { m: 'neonatal', q: 'O escore de Apgar avalia:', o: ['Apenas a frequência cardíaca', 'Cor, frequência cardíaca, reflexos, tônus e respiração', 'pH, pCO₂ e BE', 'Peso, comprimento e perímetro cefálico'], a: 1, e: 'Apgar = Aparência, Pulso, Grimace (reflexo), Atividade (tônus), Respiração. Cada item 0-2, total 0-10.' },
  { m: 'neonatal', q: 'Apgar de 5 minutos ≤ 5, acidemia metabólica e encefalopatia neonatal definem:', o: ['Sepse neonatal', 'Asfixia perinatal com risco de sequela neurológica', 'Prematuridade', 'Síndrome de aspiração meconial'], a: 1, e: 'A tríade da asfixia perinatal (AAP/ACOG). Os três critérios precisam estar presentes.' },
  { m: 'neonatal', q: 'A síndrome de aspiração meconial pode causar:', o: ['Apenas desconforto leve', 'Pneumonite química e hipertensão pulmonar persistente', 'Anemia hemolítica', 'Hipoglicemia isolada'], a: 1, e: 'SAM → obstrução, pneumonite química, HPPRN e pneumonia.' },
  { m: 'neonatal', q: 'Qual é o estadiamento clínico da encefalopatia hipóxico-isquêmica?', o: ['Silverman-Andersen', 'Sarnat', 'Ballard', 'Apgar'], a: 1, e: 'A classificação de Sarnat divide em leve, moderada e grave.' },

  /* --- MISTAS / CLÍNICAS --- */
  { m: 'misto', q: 'Gestante de 41 semanas, mobilograma reduzido há 2 dias, ILA de 4 cm e Doppler de artéria umbilical com diástole reversa. Qual o quadro?', o: ['Sofrimento fetal crônico com sinais de gravidade', 'Sofrimento fetal agudo intraparto', 'Gravidez normal de termo', 'Corioamnionite'], a: 0, e: 'Pós-datismo + oligodrâmnio + Doppler com diástole reversa = insuficiência placentária crônica grave. Indica resolução da gestação.' },
  { m: 'misto', q: 'Qual NÃO é uma causa de bradicardia fetal?', o: ['Prolapso de cordão', 'Hipotensão materna', 'Compressão de polo cefálico', 'Hipóxia grave'], a: 2, e: 'A compressão do polo cefálico causa DIP I (desaceleração precoce), não bradicardia sustentada.' },
  { m: 'misto', q: 'Qual é o termo atual preferido em vez de "sofrimento fetal"?', o: ['Asfixia fetal', 'Padrão cardíaco fetal não tranquilizador', 'Angústia fetal', 'Insuficiência fetal'], a: 1, e: 'O termo foi substituído por ser mais preciso e menos estigmatizante, evitando intervenções desnecessárias.' },
  { m: 'misto', q: 'Uma CTG categoria I significa:', o: ['Feto com pH anormal', 'Feto com acidose', 'Feto com estado ácido-base normal no momento da observação', 'Necessidade de cesariana imediata'], a: 2, e: 'Categoria I é altamente preditiva de estado ácido-base normal — pode seguir vigilância de rotina.' },
  { m: 'misto', q: 'Qual conjunto de achados exige parto IMEDIATO?', o: ['DIP I isolado com variabilidade moderada', 'Bradicardia com ausência de variabilidade e desacelerações recorrentes', 'Acelerações presentes e basal 140 bpm', 'DIP III típica com variabilidade normal'], a: 1, e: 'Esse é o padrão categoria III — prediz acidose e exige reanimação intrauterina e parto imediato.' },
  { m: 'misto', q: 'Oligodrâmnio no sofrimento fetal crônico ocorre por:', o: ['Aumento da diurese fetal', 'Redução da produção de urina fetal por centralização renal', 'Aumento da produção de líquido pulmonar', 'Rotura prematura de membranas obrigatória'], a: 1, e: 'Na centralização o rim é um território "sacrificado" — o feto produz menos urina e o líquido diminui.' }
];

/* Ordem embaralhada determinística por seed simples */
const QUIZ_SHUFFLE_SEED = 20261016;
