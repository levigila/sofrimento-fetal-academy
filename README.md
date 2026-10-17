# 🫀 Sofrimento Fetal Academy

Plataforma web **interativa e gamificada** para estudar **sofrimento fetal** — feita para estudantes de medicina.

Site 100% estático (HTML + CSS + JavaScript puro, **sem build e sem dependências**), publicado no GitHub Pages.

---

## ✨ O que tem dentro

| Recurso | Descrição |
|---|---|
| **9 módulos guiados** | Do conceito fundamental até as repercussões neonatais |
| **8 ilustrações SVG animadas** | Desenhadas à mão, funcionam offline, sem imagens externas |
| **Simulador de CTG ao vivo** | 10 traçados clínicos gerados em canvas, com animação em tempo real |
| **Modo desafio de CTG** | Traçado aleatório + 4 opções + pontuação |
| **41 questões comentadas** | Banco de questões com explicação de cada alternativa |
| **23 questões de provas reais** | Concursos, títulos de especialista e residência, com banca/órgão/ano e filtro próprio |
| **5 casos clínicos** | Decisões reais de plantão com conduta comentada |
| **20 flashcards** | Glossário com virada de carta em 3D |
| **Gamificação completa** | XP, 8 níveis de carreira, 12 selos, sequência de acertos |
| **Som ambiente** | 6 paisagens sonoras sintetizadas ao vivo (Web Audio API) |
| **Música do YouTube** | Player oficial com fila que emenda sozinha a próxima faixa |

---

## 🎓 Trilha de estudo

1. **O Conceito Fundamental** — o que é sofrimento fetal
2. **Fisiopatologia** — troca gasosa e centralização fetal
3. **Crônico vs. Agudo** — dois cenários, duas velocidades
4. **Causas & Fatores de Risco** — mãe, placenta ou cordão
5. **Como Diagnosticar** — mobilograma, CTG, mecônio, PBF e Doppler
6. **CTG na Prática** — DR C BRAVADO e os 4 tipos de desaceleração
7. **Conduta Médica** — L.O.S.S. e decisão da via de parto
8. **Repercussões Neonatais** — Apgar, gasometria, EHI e hipotermia
9. **Glossário & Flashcards** — fixação do vocabulário

---

## 🚀 Como rodar localmente

Como é estático, basta abrir o `index.html`. Para servir por HTTP:

```bash
# com Node.js
npx serve .

# ou com Python
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

---

## 🎮 Gamificação

- **XP** por ler módulos, acertar questões, resolver casos e vencer desafios de CTG
- **8 níveis**: Calouro(a) de Medicina → Lenda da Obstetrícia
- **12 selos** com progresso visível
- **Sequência de acertos** com bônus de XP crescente
- Progresso salvo automaticamente no `localStorage` (sem servidor, sem conta)

---

## 🎧 Som ambiente

Todos os sons são **sintetizados no navegador** com a Web Audio API — nenhum arquivo de áudio é baixado:

- 🌧️ Chuva · 🌊 Oceano · 🎧 Foco · 🫀 Batimento fetal · 🟤 Ruído marrom · 🌸 Ruído rosa

O áudio só é ativado após a primeira interação (exigência dos navegadores).

---

## 🎵 Música

A aba **Música** do painel de som toca faixas do canal oficial da artista pelo player do YouTube
(`youtube-nocookie`), sem hospedar nenhum arquivo aqui.

- Ao terminar uma faixa, **a próxima da lista começa sozinha** (e a última volta para a primeira)
- O botão **⏭ auto** liga/desliga essa emenda, e a escolha fica salva
- Também aceita link ou playlist colada no campo do painel

---

## 📄 Questões de prova

Além das questões autorais, o banco traz **23 questões reais** de concursos públicos, provas de
título de especialista e exames de residência médica. Cada uma carrega a origem completa
(banca · órgão · ano · tipo de exame), exibida no card, no feedback e na revisão dos erros.

Para treinar só com elas: **Início → Questões de Prova** (ou `#quiz/prova`).

---

## 📁 Estrutura

```
.
├── index.html              # shell da aplicação
├── assets/
│   ├── css/style.css       # design system completo
│   └── js/
│       ├── content.js      # conteúdo dos 9 módulos, 64 questões (23 de provas reais) e 5 casos
│       ├── illustrations.js# 8 ilustrações SVG animadas
│       ├── audio.js        # motor de som ambiente (Web Audio API)
│       ├── ctg.js          # gerador e renderizador de traçados de CTG
│       └── app.js          # roteador, gamificação e renderização
└── .nojekyll               # garante que o Pages sirva os assets
```

---

## 📚 Base científica

Conteúdo construído a partir de manual de estudos de obstetrícia e alinhado às diretrizes
**FIGO**, **NICHD**, **ACOG** e **FEBRASGO**.

> ⚠️ **Aviso:** material com finalidade **exclusivamente educacional**. Não substitui julgamento
> clínico, protocolos institucionais ou orientação de preceptores.

---

## 🛠️ Tecnologia

Sem frameworks, sem bundler, sem dependências npm. JavaScript ES6+, Canvas 2D, SVG animado e Web Audio API.
Basta abrir e usar — inclusive offline.
