/* =========================================================
   BOLETIM DIGITAL - 8º ANO
   Dados fictícios apenas para demonstração.
   ========================================================= */

/* ---------- CONFIGURAÇÃO FIXA DO ALUNO ---------- */
const CONFIG_ALUNO = {
  turma: "8A",
  numeroChamada: 7,
  apiUrl: "https://boletim-api.profbt.com.br"
};

/* ---------- DADOS BRUTOS (fictícios) ---------- */
const disciplinas = [
  { disciplina: "Língua Portuguesa",       tri1: 82,   tri2: "7,8", tri3: 85,   faltas: [2, 1, 1] },
  { disciplina: "Matemática",              tri1: 52,   tri2: "5,8", tri3: null, faltas: [3, 2, 1] },
  { disciplina: "Ciências",                tri1: "8,1", tri2: 76,   tri3: 8.0,  faltas: [1, 2, 0] },
  { disciplina: "História",                tri1: 7.0,  tri2: 84,   tri3: null, faltas: [1, 1, 1] },
  { disciplina: "Geografia",               tri1: 68,   tri2: 7.3,  tri3: "7,9", faltas: [0, 1, 1] },
  { disciplina: "Língua Inglesa",          tri1: 86,   tri2: "8,1", tri3: 8.7,  faltas: [1, 0, 0] },
  { disciplina: "Arte",                    tri1: 9.0,  tri2: 92,   tri3: null, faltas: [1, 1, 0] },
  { disciplina: "Educação Física",         tri1: 95,   tri2: 9.0,  tri3: "9,4", faltas: [0, 1, 0] },
  { disciplina: "Educação Digital",        tri1: 88,   tri2: 9.1,  tri3: 93,   faltas: [1, 0, 1] },
  { disciplina: "Educação Financeira",     tri1: 74,   tri2: "7,8", tri3: null, faltas: [1, 1, 1] },
  { disciplina: "Estudo Orientado",        tri1: 8.0,  tri2: 83,   tri3: "8,5", faltas: [0, 1, 0] },
  { disciplina: "Redação e Leitura",       tri1: 62,   tri2: "6,8", tri3: null, faltas: [2, 1, 1] },
  { disciplina: "Pensamento Lógico",       tri1: 48,   tri2: 5.6,  tri3: "6,0", faltas: [2, 2, 1] },
  { disciplina: "Literatura Arte e Movimento", tri1: "7,7", tri2: 80, tri3: null, faltas: [1, 0, 1] },
  { disciplina: "Práticas Experimentais",  tri1: 58,   tri2: "6,2", tri3: 6.4,  faltas: [1, 1, 1] }
];

/* ---------- CONSTANTES ---------- */
const MEDIA_MINIMA = 6.0;

// Referência INTERNA de risco (não exibir na interface!)
const REFERENCIA_FALTAS = 350;

/* ---------- FRASES GEEK (uma para cada matéria) ---------- */
const FRASES_GEEK = {
  "Língua Portuguesa": "Crase é igual a Creeper: aparece onde você menos espera, mas dá pra desarmar 💥",
  "Matemática": "Nível de dificuldade: Dark Souls. Mas todo boss tem um padrão 🧮",
  "Ciências": "Seu experimento tem mais chance de dar certo que a poção do Snape 🧪",
  "História": "Quem não estuda o passado repete a mesma fase em loop, tipo Dia da Marmota 🏰",
  "Geografia": "Mapa desbloqueado! Agora é só não se perder fora do minimapa 🗺️",
  "Língua Inglesa": "Speak, friend, and enter, como nas portas de Moria 🗝️",
  "Arte": "Sua criatividade tem mais cores que um bloco de lã no Minecraft 🎨",
  "Educação Física": "Barra de stamina cheia, vamos pro próximo round 🏃",
  "Educação Digital": "Ctrl+S salva vidas, e também o seu trabalho 💾",
  "Educação Financeira": "Moedas não caem em árvore, mas dá pra juntar rupees pra comprar o item certo 💰",
  "Estudo Orientado": "O mentor aparece, entrega o mapa e agora a jornada é sua, jovem padawan 🧭",
  "Redação e Leitura": "Cada parágrafo é um golpe combo: introdução, desenvolvimento e finalização ✍️",
  "Pensamento Lógico": "Puzzle de Zelda: a solução sempre estava na sala, só faltava olhar de outro jeito 🧩",
  "Literatura Arte e Movimento": "Toda grande saga começou com uma boa história, e a sua está no capítulo atual 📚",
  "Práticas Experimentais": "Modo laboratório ativado: errar faz parte do tutorial 🔬"
};

const FRASE_GEEK_PADRAO = "Missão secundária desbloqueada: dominar esta matéria! 🎮";

/* =========================================================
   normalizarNota(valor)
   ========================================================= */
function normalizarNota(valor) {
  if (valor === null || valor === undefined || valor === "") {
    return null;
  }
  if (typeof valor === "string") {
    valor = valor.replace(",", ".");
  }
  const numero = Number(valor);
  if (isNaN(numero)) {
    return null;
  }
  if (numero >= 0 && numero <= 10) {
    return numero;
  }
  if (numero > 10 && numero <= 100) {
    return numero / 10;
  }
  return null;
}

/* =========================================================
   calcularMedia(notas)
   ========================================================= */
function calcularMedia(notas) {
  const validas = notas.filter((n) => n !== null);
  if (validas.length === 0) {
    return null;
  }
  let soma = 0;
  validas.forEach((n) => {
    soma += n;
  });
  return soma / validas.length;
}

/* =========================================================
   definirSituacao(media)
   ========================================================= */
function definirSituacao(media) {
  if (media === null) {
    return "Nota ainda não disponível";
  }
  if (media >= MEDIA_MINIMA) {
    return "Bom desempenho";
  }
  return "Atenção";
}

/* =========================================================
   somarFaltas(listaFaltas)
   ========================================================= */
function somarFaltas(listaFaltas) {
  let total = 0;
  listaFaltas.forEach((f) => {
    total += f;
  });
  return total;
}

/* =========================================================
   formatarNota(nota)
   ========================================================= */
function formatarNota(nota) {
  if (nota === null) {
    return "Ainda não lançada";
  }
  return nota.toFixed(1).replace(".", ",");
}

/* =========================================================
   classeSituacao(situacao)
   ========================================================= */
function classeSituacao(situacao) {
  if (situacao === "Bom desempenho") return "situacao-bom";
  if (situacao === "Atenção") return "situacao-atencao";
  return "situacao-neutra";
}

/* =========================================================
   fraseGeek(nomeDisciplina)
   Devolve a frase geek da matéria (ou a frase padrão).
   ========================================================= */
function fraseGeek(nomeDisciplina) {
  if (Object.prototype.hasOwnProperty.call(FRASES_GEEK, nomeDisciplina)) {
    return FRASES_GEEK[nomeDisciplina];
  }
  return FRASE_GEEK_PADRAO;
}

/* =========================================================
   ESTADO DA PÁGINA
   ========================================================= */
let dadosAtuais = [];
let pinSessao = "";
let modoEdicao = false;
let ocupado = false;
let camposEdicao = [];

/* Estado da loja (fica na API junto com as disciplinas) */
// NOVO: bonus = pontos extra ganhos nos jogos novos (teto de TETO_BONUS)
let lojaAtual = { gasto: 0, bonus: 0, poderes: [] };
// Só vira true quando os dados vieram da API ou foram salvos com sucesso.
// Enquanto for false, a loja fica bloqueada (para não salvar dados fictícios sem o aluno pedir).
let dadosVemDaApi = false;

/* ---------- ELEMENTOS DA PÁGINA ---------- */
const corpoTabela = document.getElementById("corpo-tabela");
const formAcesso = document.getElementById("form-acesso");
const campoPin = document.getElementById("campo-pin");
const botaoEntrar = document.getElementById("botao-entrar");
const mensagemAcesso = document.getElementById("mensagem-acesso");
const areaAcesso = document.getElementById("area-acesso");
const areaBoletim = document.getElementById("area-boletim");
const botaoEditar = document.getElementById("botao-editar");
const botaoSalvar = document.getElementById("botao-salvar");
const mensagemEdicao = document.getElementById("mensagem-edicao");
const bolinhasTema = document.querySelectorAll(".bolinha-tema");

/* Elementos da loja */
const botaoLoja = document.getElementById("botao-loja");
const lojaPontosBotao = document.getElementById("loja-pontos-botao");
const areaLoja = document.getElementById("area-loja");
const botaoVoltarBoletim = document.getElementById("botao-voltar-boletim");
const lojaSaldo = document.getElementById("loja-saldo");
const mensagemLoja = document.getElementById("mensagem-loja");
const lojaPoderes = document.getElementById("loja-poderes");
const poderTela = document.getElementById("poder-tela");
const poderTitulo = document.getElementById("poder-titulo");
const poderPalco = document.getElementById("poder-palco");
const botaoVoltarLoja = document.getElementById("botao-voltar-loja");
const camadaBichos = document.getElementById("camada-bichos");

/* NOVO: elementos da área "Meus Poderes" */
const botaoPoderes = document.getElementById("botao-poderes");
const areaPoderes = document.getElementById("area-poderes");
const botaoVoltarPoderes = document.getElementById("botao-voltar-poderes");
const poderesSaldo = document.getElementById("poderes-saldo");
const mensagemPoderes = document.getElementById("mensagem-poderes");
const poderesComprados = document.getElementById("poderes-comprados");

document.getElementById("acesso-turma").textContent = CONFIG_ALUNO.turma;
document.getElementById("acesso-chamada").textContent = CONFIG_ALUNO.numeroChamada;

/* =========================================================
   mostrarMensagem
   ========================================================= */
function mostrarMensagem(elemento, texto, tipo) {
  elemento.textContent = texto;
  elemento.className = "mensagem";
  if (tipo === "erro") {
    elemento.classList.add("mensagem-erro");
  }
  if (tipo === "sucesso") {
    elemento.classList.add("mensagem-sucesso");
  }
}

/* =========================================================
   obterFaltas(d)
   ========================================================= */
function obterFaltas(d) {
  const lista = Array.isArray(d.faltas) ? d.faltas : [];
  return [0, 1, 2].map((i) => {
    const v = Number(lista[i]);
    return Number.isInteger(v) && v >= 0 ? v : 0;
  });
}

/* =========================================================
   processarDados(lista)
   ========================================================= */
function processarDados(lista) {
  return lista.map((d) => {
    const n1 = normalizarNota(d.tri1);
    const n2 = normalizarNota(d.tri2);
    const n3 = normalizarNota(d.tri3);
    const media = calcularMedia([n1, n2, n3]);
    const faltasPorTri = obterFaltas(d);
    const faltas = somarFaltas(faltasPorTri);
    const situacao = definirSituacao(media);
    return {
      disciplina: String(d.disciplina),
      tri1: n1,
      tri2: n2,
      tri3: n3,
      media: media,
      faltas: faltas,
      faltasPorTri: faltasPorTri,
      situacao: situacao
    };
  });
}

/* =========================================================
   CAMPOS DE EDIÇÃO
   ========================================================= */
function notaParaCampo(nota) {
  if (nota === null) {
    return "";
  }
  return String(Math.round(nota * 100) / 100).replace(".", ",");
}

function criarCampo(valorInicial, rotulo, tipoTeclado) {
  const campo = document.createElement("input");
  campo.type = "text";
  campo.className = "campo-edicao";
  campo.value = valorInicial;
  campo.setAttribute("inputmode", tipoTeclado);
  campo.setAttribute("aria-label", rotulo);
  campo.autocomplete = "off";
  campo.addEventListener("input", () => {
    campo.classList.remove("campo-invalido");
  });
  return campo;
}

function validarNotaDigitada(texto) {
  const t = texto.trim();
  if (t === "") {
    return { valido: true, valor: null };
  }
  if (!/^\d+([.,]\d+)?$/.test(t)) {
    return { valido: false, valor: null };
  }
  const numero = Number(t.replace(",", "."));
  if (isNaN(numero) || numero < 0 || numero > 10) {
    return { valido: false, valor: null };
  }
  return { valido: true, valor: numero };
}

function validarFaltaDigitada(texto) {
  const t = texto.trim();
  if (!/^\d+$/.test(t)) {
    return { valido: false, valor: 0 };
  }
  const numero = Number(t);
  if (!Number.isSafeInteger(numero)) {
    return { valido: false, valor: 0 };
  }
  return { valido: true, valor: numero };
}

/* =========================================================
   desenharTabela(resultados)
   ========================================================= */
function desenharTabela(resultados) {
  corpoTabela.textContent = "";
  camposEdicao = [];

  resultados.forEach((r) => {
    const linha = document.createElement("tr");

    const tdDisciplina = document.createElement("td");
    tdDisciplina.textContent = r.disciplina;

    // Frase geek: aparece ao passar o mouse ou tocar na linha (fora do modo de edição)
    if (!modoEdicao) {
      const frase = document.createElement("div");
      frase.className = "frase-geek";
      frase.textContent = fraseGeek(r.disciplina);
      tdDisciplina.appendChild(frase);

      linha.classList.add("linha-geek");
      linha.addEventListener("click", () => {
        linha.classList.toggle("linha-aberta");
      });
    }

    linha.appendChild(tdDisciplina);

    const notas = [r.tri1, r.tri2, r.tri3];
    const camposNotas = [];

    notas.forEach((nota, i) => {
      const td = document.createElement("td");
      if (modoEdicao) {
        const campo = criarCampo(
          notaParaCampo(nota),
          r.disciplina + " - nota do " + (i + 1) + "º trimestre",
          "decimal"
        );
        camposNotas.push(campo);
        td.appendChild(campo);
      } else {
        td.textContent = formatarNota(nota);
      }
      linha.appendChild(td);
    });

    const tdMedia = document.createElement("td");
    tdMedia.textContent = formatarNota(r.media);
    linha.appendChild(tdMedia);

    const tdFaltas = document.createElement("td");
    const camposFaltas = [];
    if (modoEdicao) {
      const caixa = document.createElement("div");
      caixa.className = "edicao-faltas";
      r.faltasPorTri.forEach((f, i) => {
        const campo = criarCampo(
          String(f),
          r.disciplina + " - faltas do " + (i + 1) + "º trimestre",
          "numeric"
        );
        camposFaltas.push(campo);
        caixa.appendChild(campo);
      });
      tdFaltas.appendChild(caixa);
    } else {
      tdFaltas.textContent = r.faltas;
    }
    linha.appendChild(tdFaltas);

    const tdSituacao = document.createElement("td");
    tdSituacao.className = classeSituacao(r.situacao);
    tdSituacao.textContent = r.situacao;
    linha.appendChild(tdSituacao);

    if (modoEdicao) {
      camposEdicao.push({
        disciplina: r.disciplina,
        notas: camposNotas,
        faltas: camposFaltas
      });
    }

    corpoTabela.appendChild(linha);
  });
}

/* =========================================================
   atualizarCards(resultados)
   ========================================================= */
function atualizarCards(resultados) {
  const mediasValidas = resultados
    .map((r) => r.media)
    .filter((m) => m !== null);

  let mediaGeral = null;
  if (mediasValidas.length > 0) {
    let soma = 0;
    mediasValidas.forEach((m) => (soma += m));
    mediaGeral = soma / mediasValidas.length;
  }

  document.getElementById("media-geral").textContent =
    mediaGeral === null ? "—" : mediaGeral.toFixed(1).replace(".", ",");

  let totalFaltas = 0;
  resultados.forEach((r) => (totalFaltas += r.faltas));
  document.getElementById("total-faltas").textContent = totalFaltas;

  const totalBom = resultados.filter((r) => r.situacao === "Bom desempenho").length;
  document.getElementById("total-bom").textContent = totalBom;

  const totalAtencao = resultados.filter((r) => r.situacao === "Atenção").length;
  document.getElementById("total-atencao").textContent = totalAtencao;

  // Frequência DEMONSTRATIVA (fictícia — não calculada a partir das faltas)
  const frequenciaDemonstrativa = 92;
  document.getElementById("frequencia").textContent = frequenciaDemonstrativa + "%";
  document.getElementById("frequencia-status").textContent = "Frequência adequada";
}

/* =========================================================
   renderizar()
   ========================================================= */
function renderizar() {
  const resultados = processarDados(dadosAtuais);
  desenharTabela(resultados);
  atualizarCards(resultados);
  atualizarGraficos(); // atualiza os gráficos (somente leitura)
  atualizarLoja();     // atualiza pontos e cartões da loja e dos meus poderes
}

/* =========================================================
   MODO DE EDIÇÃO
   ========================================================= */
function entrarModoEdicao() {
  modoEdicao = true;
  botaoEditar.textContent = "Cancelar edição";
  botaoSalvar.hidden = false;
  mostrarMensagem(mensagemEdicao, "", "");
  renderizar();
}

function sairModoEdicao() {
  modoEdicao = false;
  botaoEditar.textContent = "Alterar dados";
  botaoSalvar.hidden = true;
  renderizar();
}

/* =========================================================
   lerCamposEdicao()
   ========================================================= */
function lerCamposEdicao() {
  let tudoValido = true;
  const novasDisciplinas = [];

  camposEdicao.forEach((item) => {
    const notasValidadas = item.notas.map((campo) => {
      const resultado = validarNotaDigitada(campo.value);
      if (!resultado.valido) {
        campo.classList.add("campo-invalido");
        tudoValido = false;
      }
      return resultado.valor;
    });

    const faltasValidadas = item.faltas.map((campo) => {
      const resultado = validarFaltaDigitada(campo.value);
      if (!resultado.valido) {
        campo.classList.add("campo-invalido");
        tudoValido = false;
      }
      return resultado.valor;
    });

    novasDisciplinas.push({
      disciplina: item.disciplina,
      tri1: notasValidadas[0],
      tri2: notasValidadas[1],
      tri3: notasValidadas[2],
      faltas: faltasValidadas
    });
  });

  return tudoValido ? novasDisciplinas : null;
}

/* =========================================================
   textoErroHttp(status)
   ========================================================= */
function textoErroHttp(status) {
  if (status === 401) {
    return "Turma, chamada ou PIN inválidos.";
  }
  if (status === 429) {
    return "Muitas tentativas. Aguarde um minuto e tente novamente.";
  }
  return "Não foi possível concluir a operação. Tente novamente.";
}

/* =========================================================
   abrirBoletim
   ========================================================= */
async function abrirBoletim(evento) {
  evento.preventDefault();

  if (ocupado) {
    return;
  }

  const pinDigitado = campoPin.value;
  if (pinDigitado === "") {
    mostrarMensagem(mensagemAcesso, "Digite o PIN.", "erro");
    return;
  }

  ocupado = true;
  botaoEntrar.disabled = true;
  mostrarMensagem(mensagemAcesso, "Conectando...", "");

  try {
    const resposta = await fetch(CONFIG_ALUNO.apiUrl + "/api/v1/boletins/abrir", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        turma: CONFIG_ALUNO.turma,
        numero_chamada: CONFIG_ALUNO.numeroChamada,
        pin: pinDigitado
      })
    });

    if (!resposta.ok) {
      mostrarMensagem(mensagemAcesso, textoErroHttp(resposta.status), "erro");
      return;
    }

    const corpo = await resposta.json();

    if (corpo && corpo.dados !== null && corpo.dados !== undefined) {
      if (!Array.isArray(corpo.dados.disciplinas)) {
        mostrarMensagem(mensagemAcesso, "Os dados recebidos estão em um formato inesperado.", "erro");
        return;
      }
      dadosAtuais = corpo.dados.disciplinas;
      lojaAtual = normalizarLoja(corpo.dados.loja);
      dadosVemDaApi = true;
    } else {
      dadosAtuais = JSON.parse(JSON.stringify(disciplinas));
      lojaAtual = { gasto: 0, bonus: 0, poderes: [] }; // NOVO: bonus entra no padrão
      dadosVemDaApi = false; // loja bloqueada até salvar
    }

    pinSessao = pinDigitado;
    campoPin.value = "";
    mostrarMensagem(mensagemAcesso, "", "");

    areaAcesso.hidden = true;
    areaBoletim.hidden = false;
    areaLoja.hidden = true;
    areaPoderes.hidden = true; // NOVO: garante a área nova fechada também

    modoEdicao = false;
    botaoEditar.textContent = "Alterar dados";
    botaoSalvar.hidden = true;
    renderizar();
  } catch (erro) {
    mostrarMensagem(mensagemAcesso, "Não foi possível conectar ao servidor. Tente novamente.", "erro");
  } finally {
    ocupado = false;
    botaoEntrar.disabled = false;
  }
}

/* =========================================================
   salvarAlteracoes
   ========================================================= */
async function salvarAlteracoes() {
  if (ocupado) {
    return;
  }

  const novasDisciplinas = lerCamposEdicao();
  if (novasDisciplinas === null) {
    mostrarMensagem(
      mensagemEdicao,
      "Há campos inválidos. Notas: de 0 a 10 (ponto ou vírgula) ou vazio. Faltas: número inteiro, zero ou maior.",
      "erro"
    );
    return;
  }

  ocupado = true;
  botaoSalvar.disabled = true;
  botaoEditar.disabled = true;
  mostrarMensagem(mensagemEdicao, "Salvando...", "");

  try {
    const resposta = await fetch(CONFIG_ALUNO.apiUrl + "/api/v1/boletins/salvar", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        turma: CONFIG_ALUNO.turma,
        numero_chamada: CONFIG_ALUNO.numeroChamada,
        pin: pinSessao,
        dados: {
          disciplinas: novasDisciplinas,
          loja: lojaAtual // a loja vai junto, para não ser apagada
        }
      })
    });

    if (!resposta.ok) {
      mostrarMensagem(mensagemEdicao, textoErroHttp(resposta.status), "erro");
      return;
    }

    dadosAtuais = novasDisciplinas;
    dadosVemDaApi = true; // agora os dados estão salvos na API
    sairModoEdicao();
    mostrarMensagem(mensagemEdicao, "Dados salvos com sucesso.", "sucesso");
  } catch (erro) {
    mostrarMensagem(mensagemEdicao, "Não foi possível conectar ao servidor. Tente novamente.", "erro");
  } finally {
    ocupado = false;
    botaoSalvar.disabled = false;
    botaoEditar.disabled = false;
  }
}

/* =========================================================
   TEMAS DE COR
   O tema fica só em memória: ao abrir a página, volta ao roxo.
   ========================================================= */
const TEMAS_VALIDOS = ["roxo", "azul", "amarelo", "vermelho"];

function aplicarTema(nome) {
  if (!TEMAS_VALIDOS.includes(nome)) {
    return;
  }

  // O roxo é o tema padrão (sem atributo). Os outros usam data-tema.
  if (nome === "roxo") {
    document.documentElement.removeAttribute("data-tema");
  } else {
    document.documentElement.setAttribute("data-tema", nome);
  }

  // Destaca a bolinha escolhida
  bolinhasTema.forEach((bolinha) => {
    const ativa = bolinha.getAttribute("data-tema") === nome;
    bolinha.classList.toggle("ativa", ativa);
    bolinha.setAttribute("aria-pressed", ativa ? "true" : "false");
  });

  // Os gráficos leem as cores ao serem criados, então precisam ser refeitos
  atualizarGraficos();
}

bolinhasTema.forEach((bolinha) => {
  bolinha.addEventListener("click", () => {
    aplicarTema(bolinha.getAttribute("data-tema"));
  });
});

/* =========================================================
   EVENTOS
   ========================================================= */
botaoEditar.addEventListener("click", () => {
  if (ocupado) {
    return;
  }
  if (modoEdicao) {
    sairModoEdicao();
    mostrarMensagem(mensagemEdicao, "", "");
  } else {
    entrarModoEdicao();
  }
});

botaoSalvar.addEventListener("click", salvarAlteracoes);

formAcesso.addEventListener("submit", abrirBoletim);

/* =========================================================
   GRÁFICOS (Chart.js)
   Somente leitura. Nunca altera o estado.
   ========================================================= */

let graficoMedias = null;
let graficoEvolucao = null;
let graficoFaltas = null;

function corDoTema(nomeVariavel, padrao) {
  const valor = getComputedStyle(document.documentElement)
    .getPropertyValue(nomeVariavel)
    .trim();
  return valor || padrao;
}

function configuracaoComum() {
  const textoClaro = corDoTema("--texto-claro", "#f1f1f7");
  const textoFraco = corDoTema("--texto-fraco", "#b8b8c8");
  const borda = corDoTema("--borda-card", "rgba(255,255,255,0.15)");

  return {
    color: textoClaro,
    plugins: {
      legend: { labels: { color: textoClaro } },
      tooltip: {
        backgroundColor: "rgba(18,18,28,0.95)",
        titleColor: textoClaro,
        bodyColor: textoFraco,
        borderColor: borda,
        borderWidth: 1
      }
    },
    scales: {
      x: {
        ticks: { color: textoFraco },
        grid: { color: borda }
      },
      y: {
        ticks: { color: textoFraco },
        grid: { color: borda }
      }
    }
  };
}

/* GRÁFICO 1 — Média por disciplina */
function atualizarGraficoMedias() {
  const canvas = document.getElementById("graficoMediasDisciplinas");
  if (!canvas) return;

  const resultados = processarDados(dadosAtuais);
  const labels = resultados.map((r) => r.disciplina);
  const medias = resultados.map((r) => (r.media === null ? null : Number(r.media.toFixed(1))));

  const roxo = corDoTema("--roxo", "#a259ff");
  const azul = corDoTema("--azul-suave", "#7ec8ff");
  const base = configuracaoComum();

  if (graficoMedias) {
    graficoMedias.destroy();
  }

  graficoMedias = new Chart(canvas, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Média",
          data: medias,
          backgroundColor: roxo,
          borderColor: azul,
          borderWidth: 1,
          borderRadius: 6
        }
      ]
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      color: base.color,
      plugins: {
        legend: { display: false },
        tooltip: {
          ...base.plugins.tooltip,
          callbacks: {
            label: (ctx) => {
              const v = ctx.parsed.x;
              return v === null || v === undefined
                ? "Ainda não lançada"
                : "Média: " + Number(v).toFixed(1).replace(".", ",");
            }
          }
        }
      },
      scales: {
        x: {
          min: 0,
          max: 10,
          ticks: { color: base.scales.x.ticks.color },
          grid: { color: base.scales.x.grid.color }
        },
        y: {
          ticks: { color: base.scales.y.ticks.color, autoSkip: false },
          grid: { color: base.scales.y.grid.color }
        }
      }
    }
  });
}

/* GRÁFICO 2 — Evolução da média geral */
function atualizarGraficoEvolucao() {
  const canvas = document.getElementById("graficoEvolucaoTrimestres");
  if (!canvas) return;

  function mediaDoTrimestre(campo) {
    const validas = dadosAtuais
      .map((d) => normalizarNota(d[campo]))
      .filter((n) => n !== null);

    if (validas.length === 0) return null;

    let soma = 0;
    validas.forEach((n) => (soma += n));
    return Number((soma / validas.length).toFixed(1));
  }

  const valores = [
    mediaDoTrimestre("tri1"),
    mediaDoTrimestre("tri2"),
    mediaDoTrimestre("tri3")
  ];

  const roxo = corDoTema("--roxo", "#a259ff");
  const azul = corDoTema("--azul-suave", "#7ec8ff");
  const base = configuracaoComum();

  if (graficoEvolucao) {
    graficoEvolucao.destroy();
  }

  graficoEvolucao = new Chart(canvas, {
    type: "line",
    data: {
      labels: ["1º Tri", "2º Tri", "3º Tri"],
      datasets: [
        {
          label: "Média geral",
          data: valores,
          borderColor: azul,
          backgroundColor: roxo,
          pointBackgroundColor: roxo,
          pointBorderColor: azul,
          tension: 0.3,
          fill: false,
          spanGaps: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      color: base.color,
      plugins: {
        legend: { display: false },
        tooltip: {
          ...base.plugins.tooltip,
          callbacks: {
            label: (ctx) => {
              const v = ctx.parsed.y;
              return v === null || v === undefined
                ? "Ainda não disponível"
                : "Média: " + Number(v).toFixed(1).replace(".", ",");
            }
          }
        }
      },
      scales: {
        x: {
          ticks: { color: base.scales.x.ticks.color },
          grid: { color: base.scales.x.grid.color }
        },
        y: {
          min: 0,
          max: 10,
          ticks: { color: base.scales.y.ticks.color },
          grid: { color: base.scales.y.grid.color }
        }
      }
    }
  });
}

/* GRÁFICO 3 — Faltas por trimestre + avaliação interna de risco */
function atualizarGraficoFaltas() {
  const canvas = document.getElementById("graficoFaltasTrimestres");
  if (!canvas) return;

  // Soma as faltas de cada trimestre entre todas as disciplinas
  let faltasTri1 = 0;
  let faltasTri2 = 0;
  let faltasTri3 = 0;

  dadosAtuais.forEach((d) => {
    const f = obterFaltas(d);
    faltasTri1 += f[0];
    faltasTri2 += f[1];
    faltasTri3 += f[2];
  });

  const totalInterno = faltasTri1 + faltasTri2 + faltasTri3;

  // Avaliação interna de risco: se o total chega à referência, mostramos "Perigo".
  // NUNCA exibimos o valor 350, nem percentuais, nem a regra usada.
  const estadoFaltas = document.getElementById("estadoFaltas");
  const cardFaltas = document.getElementById("card-faltas");

  if (estadoFaltas && cardFaltas) {
    estadoFaltas.textContent = "";
    cardFaltas.classList.remove("card-perigo");

    if (totalInterno >= REFERENCIA_FALTAS) {
      const badge = document.createElement("span");
      badge.className = "badge-perigo";
      badge.textContent = "Perigo";
      estadoFaltas.appendChild(badge);
      cardFaltas.classList.add("card-perigo");
    }
  }

  const atencao = corDoTema("--atencao", "#fbbf24");
  const roxo = corDoTema("--roxo", "#a259ff");
  const base = configuracaoComum();

  if (graficoFaltas) {
    graficoFaltas.destroy();
  }

  graficoFaltas = new Chart(canvas, {
    type: "bar",
    data: {
      labels: ["1º Tri", "2º Tri", "3º Tri"],
      datasets: [
        {
          label: "Faltas",
          data: [faltasTri1, faltasTri2, faltasTri3],
          backgroundColor: [roxo, roxo, roxo],
          borderColor: atencao,
          borderWidth: 1,
          borderRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      color: base.color,
      plugins: {
        legend: { display: false },
        tooltip: {
          ...base.plugins.tooltip,
          callbacks: {
            label: (ctx) => {
              const v = ctx.parsed.y;
              return v + " falta" + (v === 1 ? "" : "s");
            }
          }
        }
      },
      scales: {
        x: {
          ticks: { color: base.scales.x.ticks.color },
          grid: { color: base.scales.x.grid.color }
        },
        y: {
          beginAtZero: true,
          ticks: { color: base.scales.y.ticks.color, precision: 0 },
          grid: { color: base.scales.y.grid.color }
        }
      }
    }
  });
}

/* =========================================================
   atualizarGraficos()
   Ponto único de atualização dos gráficos.
   ========================================================= */
function atualizarGraficos() {
  atualizarGraficoMedias();
  atualizarGraficoEvolucao();
  atualizarGraficoFaltas();
}

/* =========================================================================
   =========================================================================
   LOJA DE PODERES
   Os poderes são só diversão: nunca mudam as notas reais.
   Os pontos são calculados a partir das notas. A API guarda apenas
   quanto foi gasto, o bônus ganho nos jogos e quais poderes foram
   comprados (dados.loja).
   =========================================================================
   ========================================================================= */

/* ---------- CONSTANTES DA LOJA ---------- */
const ALVO_TESOURO = 7.0; // média usada como "meta" no boss e nos jogos novos

// NOVO: teto do bônus acumulado nos jogos e o multiplicador de cada um.
// Bônus = média geral × 10 × multiplicador (arredondado).
// Expedição é mais longa e paga 1,5x; Invasão e Corrida pagam 1x.
const TETO_BONUS = 500;
const BONUS_EXPEDICAO = 1.5;
const BONUS_PADRAO = 1.0;

function bonusDaMedia(mediaGeral, multiplicador) {
  if (mediaGeral === null) {
    return 0;
  }
  return Math.round(mediaGeral * 10 * multiplicador);
}

const PODERES = [
  {
    id: "arte",
    icone: "🖌️",
    materia: "Arte",
    nome: "Pincel Mágico",
    preco: 150,
    descricao: "Desenhe um bichinho e veja ele ganhar vida e andar pela página. Clique nele para pular!"
  },
  /* NOVO: Geografia virou um jogo de verdade (antes era só olhar o mapa) */
  {
    id: "geografia",
    icone: "⛵",
    materia: "Geografia",
    nome: "Expedição do Tesouro",
    preco: 180,
    descricao: "Navegue com o barco, colete baús nas ilhas das matérias e desvie dos redemoinhos. Juntou as moedas? O tesouro abre e dá bônus!"
  },
  {
    id: "matematica",
    icone: "⚔️",
    materia: "Matemática",
    nome: "Calculadora de Boss",
    preco: 120,
    descricao: "Cada matéria vira um chefe. Simule uma nota e veja a vida dele cair."
  },
  /* NOVO: Educação Física virou um runner (antes era só assistir o corredor) */
  {
    id: "educacao-fisica",
    icone: "🏃",
    materia: "Educação Física",
    nome: "Corrida de Obstáculos",
    preco: 130,
    descricao: "Pule as bolas de faltas e aguentе 1 minuto na pista. Sua média geral dá vidas extras!"
  },
  {
    id: "experimentais",
    icone: "🧪",
    materia: "Práticas Experimentais",
    nome: "Laboratório de Poções",
    preco: 150,
    descricao: "Misture poções que enchem a página de átomos, bolhas, neve de cristais ou aurora."
  },
  {
    id: "portugues",
    icone: "🔤",
    materia: "Língua Portuguesa",
    nome: "Máquina de Letras",
    preco: 120,
    descricao: "Minigame de 1 minuto: palavras caem do céu e você digita cada uma para explodi-la."
  },
  {
    id: "ciencias",
    icone: "🦎",
    materia: "Ciências",
    nome: "Terrário Vivo",
    preco: 150,
    descricao: "Um mini ecossistema onde cada matéria vira um animal, uma planta ou um ovo, conforme a média."
  },
  {
    id: "historia",
    icone: "⏳",
    materia: "História",
    nome: "Máquina do Tempo",
    preco: 130,
    descricao: "Viaje pelos 3 trimestres e ouça personagens de cada época comentarem sua evolução."
  },
  {
    id: "ingles",
    icone: "🕹️",
    materia: "Língua Inglesa",
    nome: "Modo Player 2",
    preco: 110,
    descricao: "Um robô narra o seu boletim em inglês, com legenda em português."
  },
  /* NOVO: Educação Digital ganhou uma missão com história (o terminal continua!) */
  {
    id: "digital",
    icone: "💻",
    materia: "Educação Digital",
    nome: "Missão de Invasão",
    preco: 130,
    descricao: "Comandos de hacker (de mentirinha) para invadir o servidor e recuperar o arquivo de notas. Venceu? Bônus!"
  }
];

/* ---------- PEQUENO AJUDANTE PARA CRIAR ELEMENTOS ---------- */
// O texto sempre entra com textContent (nunca innerHTML).
function criarEl(tag, classe, texto) {
  const el = document.createElement(tag);
  if (classe) {
    el.className = classe;
  }
  if (texto !== undefined) {
    el.textContent = texto;
  }
  return el;
}

/* Remove acentos e deixa o texto pronto para comparar (usado nos poderes) */
function semAcento(texto) {
  return String(texto).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/* =========================================================
   normalizarLoja(bruta)
   Valida o que veio da API: só aceita poderes conhecidos,
   um gasto inteiro maior ou igual a zero e, NOVO, um bônus
   inteiro entre 0 e o teto.
   ========================================================= */
function normalizarLoja(bruta) {
  const padrao = { gasto: 0, bonus: 0, poderes: [] };
  if (!bruta || typeof bruta !== "object") {
    return padrao;
  }

  const gasto =
    Number.isSafeInteger(bruta.gasto) && bruta.gasto >= 0 ? bruta.gasto : 0;

  // NOVO: bônus vindo da API (inteiro entre 0 e TETO_BONUS)
  let bonus =
    Number.isSafeInteger(bruta.bonus) && bruta.bonus > 0 ? bruta.bonus : 0;
  if (bonus > TETO_BONUS) {
    bonus = TETO_BONUS;
  }

  const idsValidos = PODERES.map((p) => p.id);
  const poderes = Array.isArray(bruta.poderes)
    ? bruta.poderes.filter(
        (id, i, lista) =>
          typeof id === "string" &&
          idsValidos.includes(id) &&
          lista.indexOf(id) === i
      )
    : [];

  return { gasto: gasto, bonus: bonus, poderes: poderes };
}

/* =========================================================
   PONTOS
   6 a 7,9 = 10 pts | 8 a 8,9 = 20 pts | 9 ou mais = 30 pts
   Sem nota ou abaixo de 6 = 0 pts. Cada trimestre conta.
   ========================================================= */
function pontosDaNota(nota) {
  if (nota === null) return 0;
  if (nota >= 9) return 30;
  if (nota >= 8) return 20;
  if (nota >= MEDIA_MINIMA) return 10;
  return 0;
}

function calcularPontosGanhos(resultados) {
  let total = 0;
  resultados.forEach((r) => {
    total += pontosDaNota(r.tri1) + pontosDaNota(r.tri2) + pontosDaNota(r.tri3);
  });
  return total;
}

// O saldo nunca fica negativo, mesmo que o aluno baixe uma nota depois de comprar.
// NOVO: agora soma o bônus ganho nos jogos.
function calcularSaldo() {
  const ganhos = calcularPontosGanhos(processarDados(dadosAtuais));
  return Math.max(0, ganhos + (lojaAtual.bonus || 0) - lojaAtual.gasto);
}

function calcularMediaGeral(resultados) {
  const medias = resultados.map((r) => r.media).filter((m) => m !== null);
  if (medias.length === 0) {
    return null;
  }
  let soma = 0;
  medias.forEach((m) => (soma += m));
  return soma / medias.length;
}

/* ---------- AJUDANTES DE CÁLCULO (boss e jogos) ---------- */
function resumoNotas(r) {
  const notas = [r.tri1, r.tri2, r.tri3].filter((n) => n !== null);
  let soma = 0;
  notas.forEach((n) => (soma += n));
  return { n: notas.length, soma: soma };
}

// Texto: quanto precisa tirar no próximo trimestre para fechar média 7
function textoNotaNecessaria(r) {
  const resumo = resumoNotas(r);
  if (resumo.n >= 3) {
    return "Todos os trimestres já foram lançados.";
  }
  const necessaria = ALVO_TESOURO * (resumo.n + 1) - resumo.soma;
  if (necessaria <= 0) {
    return "Já garantido: o próximo trimestre mantém a média acima de 7.";
  }
  if (necessaria > 10) {
    return "Mesmo com 10 no próximo trimestre a média fica abaixo de 7, mas cada ponto ajuda!";
  }
  return "Precisa de " + formatarNota(Math.ceil(necessaria * 10) / 10) + " no próximo trimestre para chegar a 7.";
}

// Vida do boss: 100% sem nota, e cai até 0% quando a média chega a 7
function vidaDoBoss(media) {
  if (media === null) {
    return 100;
  }
  return Math.max(0, Math.min(100, ((ALVO_TESOURO - media) / ALVO_TESOURO) * 100));
}

/* =========================================================
   LOJA: desenhar cartões, atualizar saldo
   ========================================================= */
function atualizarLoja() {
  const saldo = calcularSaldo();
  lojaPontosBotao.textContent = saldo;
  lojaSaldo.textContent = saldo;
  poderesSaldo.textContent = saldo; // NOVO: saldo também na área "Meus Poderes"
  botaoLoja.disabled = modoEdicao;
  botaoPoderes.disabled = modoEdicao; // NOVO: 🎒 bloqueado durante a edição
  desenharLoja(saldo);
  desenharMeusPoderes(); // NOVO: redesenha também os poderes comprados
}

function desenharLoja(saldo) {
  lojaPoderes.textContent = "";

  PODERES.forEach((poder) => {
    const comprado = lojaAtual.poderes.includes(poder.id);
    if (comprado) {
      // NOVO: quem já foi comprado agora mora em "Meus Poderes" (botão 🎒),
      // para não misturar comprar e usar.
      return;
    }
    const podeComprar = saldo >= poder.preco;

    const card = criarEl("div", "poder-card");
    if (podeComprar) {
      card.classList.add("poder-disponivel");
    } else {
      card.classList.add("poder-bloqueado");
    }

    card.appendChild(criarEl("span", "poder-icone", poder.icone));
    card.appendChild(criarEl("span", "poder-materia", poder.materia));
    card.appendChild(criarEl("span", "poder-nome", poder.nome));
    card.appendChild(criarEl("span", "poder-descricao", poder.descricao));

    card.appendChild(criarEl("span", "poder-preco", "🪙 " + poder.preco + " pts"));

    const botao = criarEl("button", "botao");
    botao.type = "button";

    if (podeComprar) {
      botao.textContent = "Comprar";
      botao.addEventListener("click", () => comprarPoder(poder.id));
    } else {
      botao.textContent = "Faltam " + (poder.preco - saldo) + " pts";
      botao.disabled = true;
    }

    card.appendChild(botao);
    lojaPoderes.appendChild(card);
  });

  // NOVO: se tudo já foi comprado, a loja avisa em vez de ficar vazia
  if (lojaPoderes.children.length === 0) {
    const card = criarEl("div", "poder-card");
    card.appendChild(criarEl("span", "poder-icone", "🏆"));
    card.appendChild(criarEl("span", "poder-nome", "Você já tem todos os poderes!"));
    card.appendChild(
      criarEl("span", "poder-descricao", "Use eles no botão 🎒 Meus Poderes.")
    );
    lojaPoderes.appendChild(card);
  }
}

/* NOVO: desenha a área "Meus Poderes" (só os comprados, com botão de usar) */
function desenharMeusPoderes() {
  poderesComprados.textContent = "";

  const meus = PODERES.filter((p) => lojaAtual.poderes.includes(p.id));

  if (meus.length === 0) {
    const vazio = criarEl("div", "poder-card");
    vazio.appendChild(criarEl("span", "poder-icone", "🎒"));
    vazio.appendChild(criarEl("span", "poder-nome", "Nenhum poder ainda"));
    vazio.appendChild(
      criarEl(
        "span",
        "poder-descricao",
        "Visite a Loja pelo botão 🎮 e compre seu primeiro poder com os pontos das suas notas."
      )
    );
    poderesComprados.appendChild(vazio);
    return;
  }

  meus.forEach((poder) => {
    const card = criarEl("div", "poder-card poder-comprado");
    card.appendChild(criarEl("span", "poder-icone", poder.icone));
    card.appendChild(criarEl("span", "poder-materia", poder.materia));
    card.appendChild(criarEl("span", "poder-nome", poder.nome));
    card.appendChild(criarEl("span", "poder-descricao", poder.descricao));
    card.appendChild(criarEl("span", "poder-preco", "Comprado ✅"));

    const botao = criarEl("button", "botao", "Usar poder");
    botao.type = "button";
    botao.addEventListener("click", () => abrirPoder(poder.id, "poderes"));
    card.appendChild(botao);

    poderesComprados.appendChild(card);
  });
}

/* =========================================================
   comprarPoder(id)
   Salva na API (disciplinas + loja juntas). Se falhar,
   nada muda na tela e os pontos continuam os mesmos.
   ========================================================= */
async function comprarPoder(id) {
  if (ocupado || !dadosVemDaApi) {
    return;
  }

  const poder = PODERES.find((p) => p.id === id);
  if (!poder || lojaAtual.poderes.includes(id)) {
    return;
  }

  if (calcularSaldo() < poder.preco) {
    mostrarMensagem(mensagemLoja, "Você ainda não tem pontos suficientes para este poder.", "erro");
    return;
  }

  const novaLoja = {
    gasto: lojaAtual.gasto + poder.preco,
    bonus: lojaAtual.bonus || 0, // NOVO: o bônus vai junto no salvamento
    poderes: lojaAtual.poderes.concat([id])
  };

  ocupado = true;
  mostrarMensagem(mensagemLoja, "Comprando...", "");

  try {
    const resposta = await fetch(CONFIG_ALUNO.apiUrl + "/api/v1/boletins/salvar", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        turma: CONFIG_ALUNO.turma,
        numero_chamada: CONFIG_ALUNO.numeroChamada,
        pin: pinSessao,
        dados: {
          disciplinas: dadosAtuais,
          loja: novaLoja
        }
      })
    });

    if (!resposta.ok) {
      mostrarMensagem(mensagemLoja, textoErroHttp(resposta.status), "erro");
      return;
    }

    lojaAtual = novaLoja;
    atualizarLoja();
    mostrarMensagem(mensagemLoja, "Poder comprado! Use ele no botão 🎒 Meus Poderes.", "sucesso");
  } catch (erro) {
    mostrarMensagem(mensagemLoja, "Não foi possível conectar ao servidor. Tente novamente.", "erro");
  } finally {
    ocupado = false;
  }
}

/* =========================================================
   NOVO: creditarBonus(pontosPedidos)
   Os jogos novos dão um bônus de pontos quando o aluno vence.
   O bônus é maior quanto maior a média geral e tem um teto de
   TETO_BONUS pontos no total. Ele é salvo na API em
   dados.loja.bonus (com disciplinas, como tudo mais).
   Se o salvamento falhar, nada muda na tela.
   Devolve { ganho, motivo }, com motivo: "ok" | "teto" | "erro".
   ========================================================= */
async function creditarBonus(pontosPedidos) {
  if (!dadosVemDaApi || ocupado) {
    return { ganho: 0, motivo: "erro" };
  }

  const bonusAtual = lojaAtual.bonus || 0;
  const espaco = Math.max(0, TETO_BONUS - bonusAtual);
  const ganho = Math.min(pontosPedidos, espaco);

  if (ganho <= 0) {
    return { ganho: 0, motivo: "teto" };
  }

  const novaLoja = {
    gasto: lojaAtual.gasto,
    bonus: bonusAtual + ganho,
    poderes: lojaAtual.poderes.slice()
  };

  ocupado = true;
  try {
    const resposta = await fetch(CONFIG_ALUNO.apiUrl + "/api/v1/boletins/salvar", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        turma: CONFIG_ALUNO.turma,
        numero_chamada: CONFIG_ALUNO.numeroChamada,
        pin: pinSessao,
        dados: {
          disciplinas: dadosAtuais,
          loja: novaLoja
        }
      })
    });

    if (!resposta.ok) {
      return { ganho: 0, motivo: "erro" };
    }

    lojaAtual = novaLoja;
    atualizarLoja();
    return { ganho: ganho, motivo: "ok" };
  } catch (erro) {
    return { ganho: 0, motivo: "erro" };
  } finally {
    ocupado = false;
  }
}

/* =========================================================
   NOVO: NAVEGAÇÃO: boletim <-> loja <-> meus poderes <-> poder
   Tudo dentro do mesmo arquivo, então o PIN continua em memória.
   ========================================================= */
// NOVO: guarda de onde o poder foi aberto ("loja" ou "poderes"),
// para o botão "Voltar" devolver para o lugar certo.
let origemPoder = "loja";

function abrirLoja() {
  if (ocupado) {
    return;
  }
  if (modoEdicao) {
    mostrarMensagem(mensagemEdicao, "Termine ou cancele a edição antes de abrir a loja.", "erro");
    return;
  }
  if (!dadosVemDaApi) {
    mostrarMensagem(
      mensagemEdicao,
      "Salve seus dados em “Alterar dados” para liberar a loja.",
      "erro"
    );
    return;
  }

  mostrarMensagem(mensagemEdicao, "", "");
  mostrarMensagem(mensagemLoja, "", "");
  mostrarMensagem(mensagemPoderes, "", ""); // NOVO
  origemPoder = "loja"; // NOVO
  fecharPoder();
  atualizarLoja();
  areaBoletim.hidden = true;
  areaPoderes.hidden = true; // NOVO
  areaLoja.hidden = false;
  window.scrollTo(0, 0);
}

// NOVO: abre a área "Meus Poderes" (mesmas regras da loja)
function abrirMeusPoderes() {
  if (ocupado) {
    return;
  }
  if (modoEdicao) {
    mostrarMensagem(mensagemEdicao, "Termine ou cancele a edição antes de usar os poderes.", "erro");
    return;
  }
  if (!dadosVemDaApi) {
    mostrarMensagem(
      mensagemEdicao,
      "Salve seus dados em “Alterar dados” para liberar os poderes.",
      "erro"
    );
    return;
  }

  mostrarMensagem(mensagemEdicao, "", "");
  mostrarMensagem(mensagemLoja, "", "");
  mostrarMensagem(mensagemPoderes, "", "");
  origemPoder = "poderes";
  fecharPoder();
  atualizarLoja();
  areaBoletim.hidden = true;
  areaLoja.hidden = true;
  areaPoderes.hidden = false;
  window.scrollTo(0, 0);
}

function voltarAoBoletim() {
  fecharPoder();
  areaLoja.hidden = true;
  areaPoderes.hidden = true; // NOVO
  areaBoletim.hidden = false;
  atualizarGraficos(); // os gráficos são redesenhados ao voltar, para pegar o tamanho certo
  window.scrollTo(0, 0);
}

let timerCorrida = null;
// Função de limpeza do poder aberto (para jogos, digitação, terminal etc.)
let limpezaPoder = null;

function abrirPoder(id, origem) {
  if (!lojaAtual.poderes.includes(id)) {
    return;
  }
  const poder = PODERES.find((p) => p.id === id);
  const construtor = CONSTRUTORES_PODER[id];
  if (!poder || !construtor) {
    return;
  }

  // NOVO: lembra a origem para o botão "Voltar" e para o fecharPoder
  origemPoder = origem === "poderes" ? "poderes" : "loja";

  mostrarMensagem(mensagemLoja, "", "");
  mostrarMensagem(mensagemPoderes, "", ""); // NOVO
  poderTitulo.textContent = poder.icone + " " + poder.nome;
  poderPalco.textContent = "";
  limpezaPoder = null;
  construtor(poderPalco);

  lojaPoderes.hidden = true;
  poderesComprados.hidden = true; // NOVO
  // NOVO: o texto do botão de voltar muda conforme de onde o poder foi aberto
  botaoVoltarLoja.textContent =
    origemPoder === "poderes" ? "← Voltar aos meus poderes" : "← Voltar à loja";
  poderTela.hidden = false;
}

function fecharPoder() {
  clearTimeout(timerCorrida);
  // Para temporizadores do poder que estava aberto
  if (limpezaPoder) {
    limpezaPoder();
    limpezaPoder = null;
  }
  poderPalco.textContent = "";
  poderTela.hidden = true;
  // NOVO: mostra de novo a lista da área de origem
  if (origemPoder === "poderes") {
    poderesComprados.hidden = false;
  } else {
    lojaPoderes.hidden = false;
  }
}

/* =========================================================
   PODER 1 — PINCEL MÁGICO (Arte)
   O desenho vira um bichinho que anda pela página.
   Os desenhos NÃO são salvos (só ficam durante a sessão).
   ========================================================= */
const CORES_PINCEL = ["#f1f1f7", "#a259ff", "#4ade80", "#fbbf24", "#ef4444", "#7ec8ff"];
const MAX_BICHOS = 5;
const bichos = [];
let timerBichos = null;

function pularBicho(elemento) {
  elemento.classList.remove("bicho-pulando");
  void elemento.offsetWidth; // reinicia a animação
  elemento.classList.add("bicho-pulando");
  setTimeout(() => elemento.classList.remove("bicho-pulando"), 550);
}

function criarBicho(canvasMini) {
  // Se já houver o máximo, o mais antigo vai embora
  if (bichos.length >= MAX_BICHOS) {
    const antigo = bichos.shift();
    antigo.el.remove();
  }

  const el = criarEl("div", "bicho");
  el.appendChild(canvasMini);
  camadaBichos.appendChild(el);

  const tam = el.offsetWidth || 72;
  const largura = window.innerWidth;
  const altura = window.innerHeight;

  const bicho = {
    el: el,
    canvas: canvasMini,
    tam: tam,
    x: Math.random() * Math.max(1, largura - tam),
    y: Math.random() * Math.max(1, altura - tam),
    vx: Math.random() < 0.5 ? -3 : 3,
    vy: Math.random() < 0.5 ? -2 : 2,
    alvo: null
  };

  el.style.left = bicho.x + "px";
  el.style.top = bicho.y + "px";

  el.addEventListener("click", (evento) => {
    evento.stopPropagation(); // clicar no bichinho não chama os outros
    pularBicho(el);
  });

  bichos.push(bicho);

  if (timerBichos === null) {
    timerBichos = setInterval(moverBichos, 100);
  }
}

function moverBichos() {
  const largura = window.innerWidth;
  const altura = window.innerHeight;

  bichos.forEach((b) => {
    if (b.alvo) {
      // Anda até o ponto onde o aluno clicou na página
      const dx = b.alvo.x - b.tam / 2 - b.x;
      const dy = b.alvo.y - b.tam / 2 - b.y;
      const distancia = Math.sqrt(dx * dx + dy * dy);
      if (distancia < 10) {
        b.alvo = null;
        pularBicho(b.el);
      } else {
        b.vx = (dx / distancia) * 9;
        b.vy = (dy / distancia) * 9;
      }
    } else if (Math.random() < 0.05) {
      // De vez em quando muda de direção
      b.vx = (Math.random() * 2 - 1) * 4;
      b.vy = (Math.random() * 2 - 1) * 3;
    }

    b.x += b.vx;
    b.y += b.vy;

    // Quica nas bordas da tela
    if (b.x < 0) {
      b.x = 0;
      b.vx = Math.abs(b.vx);
    }
    if (b.x > largura - b.tam) {
      b.x = Math.max(0, largura - b.tam);
      b.vx = -Math.abs(b.vx);
    }
    if (b.y < 0) {
      b.y = 0;
      b.vy = Math.abs(b.vy);
    }
    if (b.y > altura - b.tam) {
      b.y = Math.max(0, altura - b.tam);
      b.vy = -Math.abs(b.vy);
    }

    b.el.style.left = b.x + "px";
    b.el.style.top = b.y + "px";
    b.canvas.style.transform = b.vx < 0 ? "scaleX(-1)" : "none";
  });
}

function removerBichos() {
  bichos.forEach((b) => b.el.remove());
  bichos.length = 0;
  if (timerBichos !== null) {
    clearInterval(timerBichos);
    timerBichos = null;
  }
}

// Clicar em qualquer lugar da página chama os bichinhos até lá
document.addEventListener("click", (evento) => {
  if (bichos.length === 0) {
    return;
  }
  bichos.forEach((b) => {
    b.alvo = { x: evento.clientX, y: evento.clientY };
  });
});

function montarPincel(palco) {
  const area = criarEl("div", "pincel-area");
  area.appendChild(
    criarEl(
      "p",
      "poder-texto",
      "Desenhe um bichinho (gato, dragão, peixe...), depois clique em “Dar vida”. Ele vai passear pela página. Clique nele para pular e clique em qualquer lugar para chamá-lo."
    )
  );

  const TAMANHO = 400;
  const canvas = criarEl("canvas", "pincel-canvas");
  canvas.width = TAMANHO;
  canvas.height = TAMANHO;
  const ctx = canvas.getContext("2d");
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = 8;

  let cor = CORES_PINCEL[1];
  let desenhando = false;
  let ultimo = null;
  let caixa = null; // retângulo que contém o desenho

  function pontoDoEvento(e) {
    const retangulo = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - retangulo.left) * canvas.width) / retangulo.width,
      y: ((e.clientY - retangulo.top) * canvas.height) / retangulo.height
    };
  }

  function expandirCaixa(p) {
    if (caixa === null) {
      caixa = { minX: p.x, minY: p.y, maxX: p.x, maxY: p.y };
    } else {
      caixa.minX = Math.min(caixa.minX, p.x);
      caixa.minY = Math.min(caixa.minY, p.y);
      caixa.maxX = Math.max(caixa.maxX, p.x);
      caixa.maxY = Math.max(caixa.maxY, p.y);
    }
  }

  canvas.addEventListener("pointerdown", (e) => {
    desenhando = true;
    canvas.setPointerCapture(e.pointerId);
    const p = pontoDoEvento(e);
    ultimo = p;
    ctx.fillStyle = cor;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
    ctx.fill();
    expandirCaixa(p);
    e.preventDefault();
  });

  canvas.addEventListener("pointermove", (e) => {
    if (!desenhando) {
      return;
    }
    const p = pontoDoEvento(e);
    ctx.strokeStyle = cor;
    ctx.beginPath();
    ctx.moveTo(ultimo.x, ultimo.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    ultimo = p;
    expandirCaixa(p);
  });

  function pararDesenho() {
    desenhando = false;
  }
  canvas.addEventListener("pointerup", pararDesenho);
  canvas.addEventListener("pointercancel", pararDesenho);

  area.appendChild(canvas);

  const ferramentas = criarEl("div", "pincel-ferramentas");

  const botoesCor = [];
  CORES_PINCEL.forEach((valorCor, i) => {
    const botaoCor = criarEl("button", "pincel-cor");
    botaoCor.type = "button";
    botaoCor.style.background = valorCor;
    botaoCor.setAttribute("aria-label", "Cor " + (i + 1));
    if (valorCor === cor) {
      botaoCor.classList.add("ativa");
    }
    botaoCor.addEventListener("click", () => {
      cor = valorCor;
      botoesCor.forEach((b) => b.classList.remove("ativa"));
      botaoCor.classList.add("ativa");
    });
    botoesCor.push(botaoCor);
    ferramentas.appendChild(botaoCor);
  });

  function limparDesenho() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    caixa = null;
  }

  const botaoLimpar = criarEl("button", "botao", "Limpar");
  botaoLimpar.type = "button";
  botaoLimpar.addEventListener("click", limparDesenho);
  ferramentas.appendChild(botaoLimpar);

  const botaoVida = criarEl("button", "botao", "Dar vida ✨");
  botaoVida.type = "button";
  botaoVida.addEventListener("click", () => {
    if (caixa === null) {
      mostrarMensagem(mensagemLoja, "Desenhe alguma coisa primeiro!", "erro");
      return;
    }

    // Recorta o desenho em um quadrado, com uma margem em volta
    const margem = 20;
    let lado = Math.max(caixa.maxX - caixa.minX, caixa.maxY - caixa.minY) + margem * 2;
    lado = Math.min(Math.max(lado, 60), TAMANHO);
    const centroX = (caixa.minX + caixa.maxX) / 2;
    const centroY = (caixa.minY + caixa.maxY) / 2;
    const origemX = Math.min(Math.max(centroX - lado / 2, 0), TAMANHO - lado);
    const origemY = Math.min(Math.max(centroY - lado / 2, 0), TAMANHO - lado);

    const mini = document.createElement("canvas");
    mini.width = 144;
    mini.height = 144;
    mini.getContext("2d").drawImage(canvas, origemX, origemY, lado, lado, 0, 0, 144, 144);

    criarBicho(mini);
    limparDesenho();
    mostrarMensagem(mensagemLoja, "Seu bichinho ganhou vida! Ele está passeando pela página.", "sucesso");
  });
  ferramentas.appendChild(botaoVida);

  const botaoRemover = criarEl("button", "botao", "Remover bichinhos");
  botaoRemover.type = "button";
  botaoRemover.addEventListener("click", () => {
    removerBichos();
    mostrarMensagem(mensagemLoja, "Os bichinhos foram embora.", "");
  });
  ferramentas.appendChild(botaoRemover);

  area.appendChild(ferramentas);
  palco.appendChild(area);
}

/* =========================================================
   NOVO: a PARTE 2 do script (poderes 2 a 10, com os três
   jogos novos) deve ser colada EXATAMENTE aqui, logo abaixo.
   ========================================================= */