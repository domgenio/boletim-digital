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
let lojaAtual = { gasto: 0, bonus: 0, poderes: [] };

/* NOVO: teto total do bônus ganho nos minigames difíceis */
const TETO_BONUS = 500;
/* NOVO: de onde o poder aberto veio ("loja" ou "poderes") — o botão Voltar usa isso */
let origemPoder = "loja";
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
/* NOVO: elementos da área “Meus Poderes” (🎒) */
const botaoPoderes = document.getElementById("botao-poderes");
const areaPoderes = document.getElementById("area-poderes");
const botaoVoltarPoderes = document.getElementById("botao-voltar-poderes");
const mensagemPoderes = document.getElementById("mensagem-poderes");
const poderesComprados = document.getElementById("poderes-comprados");
const poderesSaldo = document.getElementById("poderes-saldo");

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
  atualizarLoja();     // atualiza pontos e cartões da loja
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
      lojaAtual = { gasto: 0, bonus: 0, poderes: [] };
      dadosVemDaApi = false; // loja bloqueada até salvar
    }

    pinSessao = pinDigitado;
    campoPin.value = "";
    mostrarMensagem(mensagemAcesso, "", "");

    areaAcesso.hidden = true;
    areaBoletim.hidden = false;
    areaLoja.hidden = true;
    if (areaPoderes) {
      areaPoderes.hidden = true; // NOVO: esconde também o 🎒 Meus Poderes
    }
    origemPoder = "loja"; // NOVO

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
   quanto foi gasto e quais poderes foram comprados (dados.loja).
   =========================================================================
   ========================================================================= */

/* ---------- CONSTANTES DA LOJA ---------- */
const ALVO_TESOURO = 7.0; // média que serve de "tesouro" no mapa, no boss e na corrida

const PODERES = [
  {
    id: "arte",
    icone: "🖌️",
    materia: "Arte",
    nome: "Pincel Mágico",
    preco: 150,
    descricao: "Desenhe um bichinho e veja ele ganhar vida e andar pela página. Clique nele para pular!"
  },
  {
    id: "geografia",
    icone: "🧭",
    materia: "Geografia",
    nome: "Expedição do Tesouro",
    preco: 180,
    descricao: "Minigame: guie o explorador até o tesouro com passos limitados. Vencer dá bônus de pontos! 🏅"
  },
  {
    id: "matematica",
    icone: "⚔️",
    materia: "Matemática",
    nome: "Calculadora de Boss",
    preco: 120,
    descricao: "Cada matéria vira um chefe. Simule uma nota e veja a vida dele cair."
  },
  {
    id: "educacao-fisica",
    icone: "🏃",
    materia: "Educação Física",
    nome: "Corrida de Obstáculos",
    preco: 130,
    descricao: "Minigame: pule e role pelos obstáculos até a bandeira. Vencer dá bônus de pontos! 🏅"
  },
  {
    id: "experimentais",
    icone: "🧪",
    materia: "Práticas Experimentais",
    nome: "Laboratório de Poções",
    preco: 150,
    descricao: "Misture poções que enchem a página de átomos, bolhas, neve de cristais ou aurora."
  },
  /* ----- NOVO: LOTE 2 ----- */
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
  {
    id: "digital",
    icone: "🕶️",
    materia: "Educação Digital",
    nome: "Missão de Invasão",
    preco: 130,
    descricao: "Minigame: quebre as camadas do firewall repetindo sequências. Vencer dá bônus de pontos! 🏅"
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
   Valida o que veio da API: só aceita poderes conhecidos
   e um gasto inteiro maior ou igual a zero.
   ========================================================= */
function normalizarLoja(bruta) {
  const padrao = { gasto: 0, bonus: 0, poderes: [] };
  if (!bruta || typeof bruta !== "object") {
    return padrao;
  }

  const gasto =
    Number.isSafeInteger(bruta.gasto) && bruta.gasto >= 0 ? bruta.gasto : 0;

  // NOVO: bônus ganho nos minigames (inteiro entre 0 e o teto de 500)
  const bonus =
    Number.isSafeInteger(bruta.bonus) && bruta.bonus >= 0
      ? Math.min(bruta.bonus, TETO_BONUS)
      : 0;

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
function calcularSaldo() {
  const ganhos = calcularPontosGanhos(processarDados(dadosAtuais));
  const bonus = lojaAtual.bonus || 0; // NOVO: o bônus soma no saldo
  return Math.max(0, ganhos + bonus - lojaAtual.gasto);
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

/* ---------- AJUDANTES DE CÁLCULO (mapa e boss) ---------- */
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
  botaoLoja.disabled = modoEdicao; // não abre a loja no meio de uma edição
  // NOVO: botão 🎒 e selo de saldo da área Meus Poderes
  if (botaoPoderes) {
    botaoPoderes.disabled = modoEdicao;
  }
  definirSaldoPoderes(saldo + " pts · bônus " + (lojaAtual.bonus || 0) + "/" + TETO_BONUS);
  desenharLoja(saldo);
  desenharMeusPoderes(); // NOVO
}

function desenharLoja(saldo) {
  lojaPoderes.textContent = "";

  PODERES.forEach((poder) => {
    const comprado = lojaAtual.poderes.includes(poder.id);
    const podeComprar = !comprado && saldo >= poder.preco;

    const card = criarEl("div", "poder-card");
    if (comprado) {
      card.classList.add("poder-comprado");
    } else if (podeComprar) {
      card.classList.add("poder-disponivel");
    } else {
      card.classList.add("poder-bloqueado");
    }

    card.appendChild(criarEl("span", "poder-icone", poder.icone));
    card.appendChild(criarEl("span", "poder-materia", poder.materia));
    card.appendChild(criarEl("span", "poder-nome", poder.nome));
    card.appendChild(criarEl("span", "poder-descricao", poder.descricao));

    const preco = comprado ? "Comprado ✅" : "🪙 " + poder.preco + " pts";
    card.appendChild(criarEl("span", "poder-preco", preco));

    const botao = criarEl("button", "botao");
    botao.type = "button";

    if (comprado) {
      botao.textContent = "Usar poder";
      botao.addEventListener("click", () => abrirPoder(poder.id, "loja")); // NOVO: lembra a origem
    } else if (podeComprar) {
      botao.textContent = "Comprar";
      botao.addEventListener("click", () => comprarPoder(poder.id));
    } else {
      botao.textContent = "Faltam " + (poder.preco - saldo) + " pts";
      botao.disabled = true;
    }

    card.appendChild(botao);
    lojaPoderes.appendChild(card);
  });
}

/* =========================================================
   NOVO: definirSaldoPoderes(valor)
   Escreve o saldo no selo da área Meus Poderes, funcionando
   tanto se o id estiver no número quanto no selo inteiro.
   ========================================================= */
function definirSaldoPoderes(valor) {
  let alvo = null;
  if (poderesSaldo) {
    alvo = poderesSaldo.querySelector(".loja-saldo-valor") || poderesSaldo;
  } else if (areaPoderes) {
    alvo = areaPoderes.querySelector(".loja-saldo-valor");
  }
  if (alvo) {
    alvo.textContent = valor;
  }
}

/* =========================================================
   NOVO: desenharMeusPoderes()
   Mostra na área 🎒 só os poderes comprados, prontos para usar.
   ========================================================= */
function desenharMeusPoderes() {
  if (!poderesComprados) {
    return;
  }
  poderesComprados.textContent = "";

  const comprados = PODERES.filter((p) => lojaAtual.poderes.includes(p.id));

  if (comprados.length === 0) {
    poderesComprados.appendChild(
      criarEl(
        "p",
        "loja-explicacao",
        "Você ainda não tem poderes. Abra a 🛒 Loja e compre o primeiro!"
      )
    );
    return;
  }

  comprados.forEach((poder) => {
    const card = criarEl("div", "poder-card poder-comprado");
    card.appendChild(criarEl("span", "poder-icone", poder.icone));
    card.appendChild(criarEl("span", "poder-materia", poder.materia));
    card.appendChild(criarEl("span", "poder-nome", poder.nome));
    card.appendChild(criarEl("span", "poder-descricao", poder.descricao));
    card.appendChild(criarEl("span", "poder-preco", "Comprado ✅"));

    const botao = criarEl("button", "botao botao-usar", "Usar poder ▶");
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
    bonus: lojaAtual.bonus || 0, // NOVO: mantém o bônus ao comprar
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
    mostrarMensagem(mensagemLoja, "Poder comprado! Clique em “Usar poder” para jogar.", "sucesso");
  } catch (erro) {
    mostrarMensagem(mensagemLoja, "Não foi possível conectar ao servidor. Tente novamente.", "erro");
  } finally {
    ocupado = false;
  }
}

/* =========================================================
   NOVO: BÔNUS DOS MINIGAMES DIFÍCEIS
   Vencer a Expedição, a Missão de Invasão ou a Corrida de
   Obstáculos dá pontos de bônus. Quanto maior a média geral,
   maior o bônus (média × 10; a Expedição × 1,5). O total é
   guardado na API em loja.bonus, com teto de 500 (TETO_BONUS).
   ========================================================= */
function ganhoBonusDoJogo(idJogo) {
  const resultados = processarDados(dadosAtuais);
  const media = calcularMediaGeral(resultados);
  if (media === null) {
    return 0;
  }
  let ganho = Math.round(media * 10);
  if (idJogo === "geografia") {
    ganho = Math.round(media * 10 * 1.5); // a Expedição do Tesouro dá 1,5x
  }
  return ganho;
}

async function creditarBonus(idJogo) {
  // Sem dados salvos na API não há onde guardar o bônus
  if (!dadosVemDaApi || ocupado) {
    return { ganhou: false, ganho: 0, teto: false, zero: false };
  }

  const ganhoCheio = ganhoBonusDoJogo(idJogo);
  const bonusAtual = lojaAtual.bonus || 0;
  const espaco = TETO_BONUS - bonusAtual;

  if (espaco <= 0) {
    return { ganhou: false, ganho: 0, teto: true, zero: false };
  }
  if (ganhoCheio <= 0) {
    return { ganhou: false, ganho: 0, teto: false, zero: true };
  }

  const ganho = Math.min(ganhoCheio, espaco);
  const novaLoja = {
    gasto: lojaAtual.gasto,
    bonus: bonusAtual + ganho,
    poderes: lojaAtual.poderes
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
      // A API pode estar ocupada (429). O jogo continua; o bônus só não salva.
      return { ganhou: false, ganho: 0, teto: false, zero: false };
    }

    lojaAtual = novaLoja;
    atualizarLoja();
    return { ganhou: true, ganho: ganho, teto: false, zero: false };
  } catch (erro) {
    return { ganhou: false, ganho: 0, teto: false, zero: false };
  } finally {
    ocupado = false;
  }
}

/* =========================================================
   NOVO: TELA DE FIM DE JOGO (comum aos 3 minigames)
   Mostra o resultado, os pontos da rodada e a pílula do bônus.
   Devolve a pílula para o jogo atualizar quando a API responder.
   ========================================================= */
function mostrarFimDeJogo(palco, opcoes) {
  const tela = criarEl("div", "jogo-fim");
  tela.appendChild(
    criarEl("div", "jogo-fim-titulo " + (opcoes.venceu ? "vitoria" : "derrota"), opcoes.titulo)
  );

  if (opcoes.texto) {
    tela.appendChild(criarEl("div", "jogo-fim-texto", opcoes.texto));
  }

  if (opcoes.pontos > 0) {
    tela.appendChild(criarEl("div", "jogo-fim-pontos", "🎮 " + opcoes.pontos + " pts na rodada"));
  }

  let pilulaBonus = null;
  if (opcoes.venceu) {
    pilulaBonus = criarEl("div", "jogo-fim-bonus", "🏅 Salvando bônus...");
    tela.appendChild(pilulaBonus);
  }

  const botao = criarEl("button", "botao", opcoes.rotuloBotao || "Jogar de novo");
  botao.type = "button";
  botao.addEventListener("click", () => {
    tela.remove();
    opcoes.recomecar();
  });
  tela.appendChild(botao);

  palco.appendChild(tela);
  return { tela: tela, bonus: pilulaBonus };
}

/* NOVO: escreve na pílula o que a API respondeu sobre o bônus */
function atualizarPilulaBonus(pilula, resultado) {
  if (!pilula || !resultado) {
    return;
  }
  if (resultado.teto) {
    pilula.classList.add("bonus-teto");
    pilula.textContent = "🏅 Bônus máximo atingido (500 pts)!";
  } else if (resultado.zero) {
    pilula.textContent = "🏅 Sua média ainda não gera bônus.";
  } else if (resultado.ganhou) {
    pilula.textContent =
      "🏅 Bônus: +" + resultado.ganho + " pts (agora " + (lojaAtual.bonus || 0) + "/" + TETO_BONUS + ")";
  } else {
    pilula.textContent = "🏅 O bônus não pôde ser salvo agora. Vença de novo para tentar!";
  }
}

/* =========================================================
   NAVEGAÇÃO: boletim <-> loja <-> poder
   Tudo dentro do mesmo arquivo, então o PIN continua em memória.
   ========================================================= */
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
  fecharPoder();
  atualizarLoja();
  areaBoletim.hidden = true;
  areaLoja.hidden = false;
  if (areaPoderes) {
    areaPoderes.hidden = true; // NOVO
  }
  window.scrollTo(0, 0);
}

/* NOVO: abre a área 🎒 Meus Poderes (usar os poderes comprados) */
function abrirMeusPoderes() {
  if (ocupado) {
    return;
  }
  if (modoEdicao) {
    mostrarMensagem(mensagemEdicao, "Termine ou cancele a edição antes de abrir os poderes.", "erro");
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
  if (mensagemPoderes) {
    mostrarMensagem(mensagemPoderes, "", "");
  }
  fecharPoder();
  atualizarLoja();
  areaBoletim.hidden = true;
  areaLoja.hidden = true;
  if (areaPoderes) {
    areaPoderes.hidden = false;
  }
  window.scrollTo(0, 0);
}

function voltarAoBoletim() {
  fecharPoder();
  areaLoja.hidden = true;
  if (areaPoderes) {
    areaPoderes.hidden = true; // NOVO
  }
  areaBoletim.hidden = false;
  atualizarGraficos(); // os gráficos são redesenhados ao voltar, para pegar o tamanho certo
  window.scrollTo(0, 0);
}

// NOVO: função de limpeza do poder aberto (para jogos, digitação, teclado etc.)
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

  // NOVO: lembra de onde o poder foi aberto, para o Voltar voltar pro lugar certo
  origemPoder = origem === "poderes" ? "poderes" : "loja";
  if (botaoVoltarLoja) {
    botaoVoltarLoja.textContent =
      origemPoder === "poderes" ? "← Voltar ao Meus Poderes" : "← Voltar à loja";
  }

  mostrarMensagem(mensagemLoja, "", "");
  if (mensagemPoderes) {
    mostrarMensagem(mensagemPoderes, "", "");
  }
  poderTitulo.textContent = poder.icone + " " + poder.nome;
  poderPalco.textContent = "";
  limpezaPoder = null;
  construtor(poderPalco);

  if (origemPoder === "poderes") {
    if (areaPoderes) {
      areaPoderes.hidden = true; // NOVO: esconde a lista enquanto joga
    }
  } else {
    lojaPoderes.hidden = true;
  }
  poderTela.hidden = false;
  window.scrollTo(0, 0);
}

function fecharPoder() {
  // NOVO: para temporizadores e teclado do poder que estava aberto
  if (limpezaPoder) {
    limpezaPoder();
    limpezaPoder = null;
  }
  poderPalco.textContent = "";
  poderTela.hidden = true;
  lojaPoderes.hidden = false;
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
   NOVO: PODER 2 — EXPEDIÇÃO DO TESOURO (Geografia)
   Tabuleiro de 7x5. Use as setas (no celular, toque nelas;
   no teclado, use as setas do teclado) para guiar o explorador
   até o tesouro antes que os passos acabem. Gemas valem pontos
   extras e armadilhas escondidas gastam passos.
   Vencer dá bônus de pontos!
   ========================================================= */
const EXPEDICAO_COLUNAS = 7;
const EXPEDICAO_LINHAS = 5;
const EXPEDICAO_PASSOS = 24;
const EXPEDICAO_GEMAS = 4;
const EXPEDICAO_ARMADILHAS = 4;
const TERRENO_EXPEDICAO = ["🌿", "🌾", "🪨", "🌳"];

function montarExpedicao(palco) {
  palco.appendChild(
    criarEl(
      "p",
      "poder-texto",
      "Guie o explorador 🧭 até o tesouro 🏆 usando as setas. Cada passo gasta 1 movimento, armadilhas escondidas 🪤 gastam 3 e cada gema 💎 vale pontos. Chegou no tesouro? Vitória com bônus!"
    )
  );

  const container = criarEl("div", "expedicao");

  /* ----- HUD: passos e gemas ----- */
  const hud = criarEl("div", "expedicao-hud");
  const hudPassos = criarEl("span", "expedicao-hud-item", "Passos: ");
  const valorPassos = criarEl("strong", "", String(EXPEDICAO_PASSOS));
  hudPassos.appendChild(valorPassos);
  const hudGemas = criarEl("span", "expedicao-hud-item", "Gemas: ");
  const valorGemas = criarEl("strong", "", "0/" + EXPEDICAO_GEMAS);
  hudGemas.appendChild(valorGemas);
  hud.appendChild(hudPassos);
  hud.appendChild(hudGemas);
  container.appendChild(hud);

  const mapa = criarEl("div", "expedicao-map");
  container.appendChild(mapa);

  const msg = criarEl("p", "expedicao-msg", "Use as setas para andar pelo mapa.");
  container.appendChild(msg);

  const controles = criarEl("div", "expedicao-controles");
  const setas = {};
  [
    ["cima", "⬆️", "Andar para cima"],
    ["baixo", "⬇️", "Andar para baixo"],
    ["esquerda", "⬅️", "Andar para a esquerda"],
    ["direita", "➡️", "Andar para a direita"]
  ].forEach(([nome, icone, descricao]) => {
    const botao = criarEl("button", "expedicao-seta", icone);
    botao.type = "button";
    botao.setAttribute("aria-label", descricao);
    setas[nome] = botao;
    controles.appendChild(botao);
  });
  container.appendChild(controles);

  palco.appendChild(container);

  /* ----- Sorteia gemas e armadilhas (sem repetir posição) ----- */
  function chave(l, c) {
    return l + "-" + c;
  }

  const especiais = {};
  const proibidas = [chave(2, 0), chave(2, EXPEDICAO_COLUNAS - 1)];

  function sortear(tipo, quantas) {
    let colocados = 0;
    while (colocados < quantas) {
      const l = Math.floor(Math.random() * EXPEDICAO_LINHAS);
      const c = Math.floor(Math.random() * EXPEDICAO_COLUNAS);
      const k = chave(l, c);
      if (proibidas.includes(k) || especiais[k]) {
        continue;
      }
      especiais[k] = tipo;
      colocados++;
    }
  }

  sortear("gema", EXPEDICAO_GEMAS);
  sortear("armadilha", EXPEDICAO_ARMADILHAS);

  /* ----- Monta o tabuleiro ----- */
  const celulas = [];
  for (let l = 0; l < EXPEDICAO_LINHAS; l++) {
    celulas[l] = [];
    for (let c = 0; c < EXPEDICAO_COLUNAS; c++) {
      const celula = criarEl("div", "expedicao-celula");
      const k = chave(l, c);
      if (especiais[k] === "gema") {
        celula.classList.add("gema");
        celula.textContent = "💎";
      } else if (l === 2 && c === EXPEDICAO_COLUNAS - 1) {
        celula.classList.add("tesouro");
        celula.textContent = "🏆";
      } else {
        // terreno comum — as armadilhas ficam escondidas nele
        celula.textContent = TERRENO_EXPEDICAO[Math.floor(Math.random() * TERRENO_EXPEDICAO.length)];
      }
      celulas[l][c] = celula;
      mapa.appendChild(celula);
    }
  }

  /* ----- Estado da partida ----- */
  let jogador = { linha: 2, coluna: 0 };
  let passos = EXPEDICAO_PASSOS;
  let gemas = 0;
  let encerrado = false;

  const explorador = criarEl("span", "expedicao-jogador", "🧭");

  function colocarJogador() {
    celulas[jogador.linha][jogador.coluna].appendChild(explorador);
  }

  function atualizarSetas() {
    setas.cima.disabled = encerrado || jogador.linha === 0;
    setas.baixo.disabled = encerrado || jogador.linha === EXPEDICAO_LINHAS - 1;
    setas.esquerda.disabled = encerrado || jogador.coluna === 0;
    setas.direita.disabled = encerrado || jogador.coluna === EXPEDICAO_COLUNAS - 1;
  }

  function recomecar() {
    palco.textContent = "";
    montarExpedicao(palco);
  }

  function vencer() {
    encerrado = true;
    atualizarSetas();
    msg.textContent = "Tesouro encontrado! 🏆";
    soltarConfete();
    const fim = mostrarFimDeJogo(container, {
      venceu: true,
      titulo: "Tesouro encontrado! 🏆",
      texto:
        "Você pegou " + gemas + " gema(s) e ainda tinha " + Math.max(0, passos) + " passo(s) de sobra.",
      pontos: gemas * 15 + Math.max(0, passos) * 5,
      rotuloBotao: "Explorar de novo",
      recomecar: recomecar
    });
    creditarBonus("geografia").then((resultado) => {
      atualizarPilulaBonus(fim.bonus, resultado);
    });
  }

  function perder() {
    encerrado = true;
    atualizarSetas();
    msg.textContent = "Os passos acabaram...";
    mostrarFimDeJogo(container, {
      venceu: false,
      titulo: "Os passos acabaram! 😵",
      texto: "Você pegou " + gemas + " gema(s). Tente um caminho mais curto!",
      pontos: gemas * 15,
      rotuloBotao: "Explorar de novo",
      recomecar: recomecar
    });
  }

  function mover(dLinha, dColuna) {
    if (encerrado) {
      return;
    }
    const novaLinha = jogador.linha + dLinha;
    const novaColuna = jogador.coluna + dColuna;
    if (novaLinha < 0 || novaLinha >= EXPEDICAO_LINHAS || novaColuna < 0 || novaColuna >= EXPEDICAO_COLUNAS) {
      return;
    }

    jogador = { linha: novaLinha, coluna: novaColuna };
    passos--;
    const celula = celulas[novaLinha][novaColuna];
    celula.classList.add("explorada");
    const tipo = especiais[chave(novaLinha, novaColuna)];

    // Pisou no tesouro: vitória na hora
    if (celula.classList.contains("tesouro")) {
      colocarJogador();
      vencer();
      return;
    }

    if (tipo === "armadilha") {
      especiais[chave(novaLinha, novaColuna)] = "usada";
      celula.classList.add("revelada");
      celula.textContent = "🪤";
      passos -= 3;
      msg.textContent = "Armadilha! 🪤 Você perdeu 3 passos extras.";
    } else if (tipo === "gema") {
      especiais[chave(novaLinha, novaColuna)] = "usada";
      celula.classList.remove("gema");
      celula.textContent = "";
      gemas++;
      valorGemas.textContent = gemas + "/" + EXPEDICAO_GEMAS;
      msg.textContent = "Gema coletada! 💎 (" + gemas + " de " + EXPEDICAO_GEMAS + ")";
    } else {
      msg.textContent = "Andando... restam " + Math.max(0, passos) + " passo(s).";
    }

    valorPassos.textContent = String(Math.max(0, passos));
    colocarJogador();
    atualizarSetas();

    if (passos <= 0) {
      perder();
    }
  }

  setas.cima.addEventListener("click", () => mover(-1, 0));
  setas.baixo.addEventListener("click", () => mover(1, 0));
  setas.esquerda.addEventListener("click", () => mover(0, -1));
  setas.direita.addEventListener("click", () => mover(0, 1));

  /* ----- Teclado: as setas do teclado também andam ----- */
  function aoTeclado(e) {
    if (encerrado) {
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      mover(-1, 0);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      mover(1, 0);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      mover(0, -1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      mover(0, 1);
    }
  }
  document.addEventListener("keydown", aoTeclado);

  // NOVO: ao sair do poder, remove o teclado da página inteira
  limpezaPoder = () => document.removeEventListener("keydown", aoTeclado);

  celulas[2][0].classList.add("explorada");
  colocarJogador();
  atualizarSetas();
}

/* =========================================================
   PODER 3 — CALCULADORA DE BOSS (Matemática)
   Cada matéria é um chefe. A simulação NÃO altera as notas.
   ========================================================= */
function textoDoBoss(r) {
  if (r.media === null) {
    return "Sem notas ainda. " + textoNotaNecessaria(r);
  }
  if (r.media >= ALVO_TESOURO) {
    return "Média " + formatarNota(r.media) + ". Boss derrotado! 🎉";
  }
  return "Média " + formatarNota(r.media) + ". " + textoNotaNecessaria(r);
}

function montarBoss(palco) {
  const resultados = processarDados(dadosAtuais);

  palco.appendChild(
    criarEl(
      "p",
      "poder-texto",
      "Cada matéria é um chefe. A barra de vida mostra o quanto falta para a média 7. Digite uma nota e ataque para simular. A simulação não muda suas notas reais."
    )
  );

  const lista = criarEl("div", "boss-lista");

  resultados.forEach((r) => {
    const card = criarEl("div", "boss-card");
    card.appendChild(criarEl("div", "boss-nome", "👾 " + r.disciplina));

    const barra = criarEl("div", "boss-barra");
    const vida = criarEl("div", "boss-vida");
    vida.style.width = vidaDoBoss(r.media) + "%";
    barra.appendChild(vida);
    card.appendChild(barra);

    const info = criarEl("div", "boss-info", textoDoBoss(r));
    card.appendChild(info);

    if (r.media !== null && r.media >= ALVO_TESOURO) {
      card.classList.add("boss-derrotado");
    }

    const resumo = resumoNotas(r);
    if (resumo.n < 3) {
      const linha = criarEl("div", "pincel-ferramentas");
      const campo = criarCampo("", r.disciplina + " - nota para simular", "decimal");
      const botaoAtacar = criarEl("button", "botao", "Atacar ⚔️");
      botaoAtacar.type = "button";

      botaoAtacar.addEventListener("click", () => {
        const lida = validarNotaDigitada(campo.value);
        if (!lida.valido || lida.valor === null) {
          campo.classList.add("campo-invalido");
          info.textContent = "Digite uma nota de 0 a 10 para atacar.";
          return;
        }
        const novaMedia = (resumo.soma + lida.valor) / (resumo.n + 1);
        vida.style.width = vidaDoBoss(novaMedia) + "%";
        const derrotado = novaMedia >= ALVO_TESOURO;
        card.classList.toggle("boss-derrotado", derrotado);
        info.textContent =
          "Com " + formatarNota(lida.valor) + " sua média ficaria " + formatarNota(novaMedia) +
          (derrotado ? ". Boss derrotado! 🎉" : ". O boss ainda está de pé.");
      });

      linha.appendChild(campo);
      linha.appendChild(botaoAtacar);
      card.appendChild(linha);
    }

    lista.appendChild(card);
  });

  palco.appendChild(lista);
}

/* =========================================================
   NOVO: PODER 4 — CORRIDA DE OBSTÁCULOS (Educação Física)
   Pule (⬆️) os obstáculos de chão 🚧 e role (⬇️) por baixo
   dos altos 🛸. Chegue na bandeira 🏁 sem perder as 3 vidas.
   Vencer dá bônus de pontos!
   ========================================================= */
function soltarConfete() {
  const cores = ["#a259ff", "#4ade80", "#fbbf24", "#ef4444", "#7ec8ff", "#f472b6"];
  for (let i = 0; i < 40; i++) {
    const pedaco = criarEl("div", "confete");
    pedaco.style.left = Math.random() * 100 + "%";
    pedaco.style.background = cores[i % cores.length];
    pedaco.style.animationDelay = Math.random() * 0.8 + "s";
    document.body.appendChild(pedaco);
    setTimeout(() => pedaco.remove(), 4500);
  }
}

const CORRIDA_META_M = 200;   // distância até a bandeira, em metros
const CORRIDA_INTERVALO = 50; // ms entre cada passo do jogo

function montarCorridaObstaculos(palco) {
  palco.appendChild(
    criarEl(
      "p",
      "poder-texto",
      "Corra até a bandeira 🏁! Pule os obstáculos de chão 🚧 com “Pular” e role por baixo dos altos 🛸 com “Rolar” (no teclado: seta para cima e para baixo). Você tem 3 vidas. Chegou na bandeira? Vitória com bônus!"
    )
  );

  const container = criarEl("div", "corrida-jogo");

  /* ----- HUD: distância e vidas ----- */
  const hud = criarEl("div", "corrida-hud");
  const hudDistancia = criarEl("span", "corrida-hud-item", "Distância: ");
  const valorDistancia = criarEl("strong", "", "0 m");
  hudDistancia.appendChild(valorDistancia);
  const hudVidas = criarEl("span", "corrida-hud-item", "Vidas: ");
  const valorVidas = criarEl("strong", "", "❤️❤️❤️");
  hudVidas.appendChild(valorVidas);
  hud.appendChild(hudDistancia);
  hud.appendChild(hudVidas);
  container.appendChild(hud);

  const arena = criarEl("div", "corrida-arena");
  const jogador = criarEl("span", "corrida-jogador", "🏃");
  arena.appendChild(jogador);
  container.appendChild(arena);

  const msg = criarEl("p", "corrida-msg", "Aperte “Correr!” para começar.");
  container.appendChild(msg);

  const botoes = criarEl("div", "corrida-botoes");
  const botaoCorrer = criarEl("button", "botao", "Correr! 🏁");
  botaoCorrer.type = "button";
  const botaoPular = criarEl("button", "botao", "Pular ⬆️");
  botaoPular.type = "button";
  botaoPular.disabled = true;
  const botaoRolar = criarEl("button", "botao", "Rolar ⬇️");
  botaoRolar.type = "button";
  botaoRolar.disabled = true;
  botoes.appendChild(botaoPular);
  botoes.appendChild(botaoRolar);
  botoes.appendChild(botaoCorrer);
  container.appendChild(botoes);

  palco.appendChild(container);

  /* ----- Estado da corrida ----- */
  let rodando = false;
  let distancia = 0; // em metros
  let vidas = 3;
  let invulneravelAte = 0;
  let obstaculos = []; // { el, x, alto, passou }
  let metaEl = null;   // { el, x }
  let proximoSpawn = 10;
  let timerJogo = null;
  let timerPulo = null;
  let timerRolar = null;

  function pararTimers() {
    clearInterval(timerJogo);
    clearTimeout(timerPulo);
    clearTimeout(timerRolar);
    timerJogo = null;
    timerPulo = null;
    timerRolar = null;
  }

  function recomecar() {
    palco.textContent = "";
    montarCorridaObstaculos(palco);
  }

  function atualizarVidas() {
    valorVidas.textContent = vidas > 0 ? "❤️".repeat(vidas) : "💔";
  }

  function criarObstaculo() {
    const alto = Math.random() < 0.4;
    const el = criarEl("span", "corrida-obstaculo" + (alto ? " alto" : ""), alto ? "🛸" : "🚧");
    el.style.left = arena.clientWidth + "px";
    arena.appendChild(el);
    obstaculos.push({ el: el, x: arena.clientWidth, alto: alto, passou: false });
  }

  function criarMeta() {
    const el = criarEl("span", "corrida-meta", "🏁");
    el.style.left = arena.clientWidth + "px";
    arena.appendChild(el);
    metaEl = { el: el, x: arena.clientWidth };
  }

  function limparObstaculos() {
    obstaculos.forEach((o) => o.el.remove());
    obstaculos = [];
    if (metaEl) {
      metaEl.el.remove();
      metaEl = null;
    }
  }

  function bater() {
    if (!rodando) {
      return;
    }
    vidas--;
    invulneravelAte = Date.now() + 900;
    atualizarVidas();
    arena.classList.remove("dano");
    void arena.offsetWidth;
    arena.classList.add("dano");
    msg.textContent = "Bateu! Restam " + vidas + " vida(s).";
    if (vidas <= 0) {
      perder();
    }
  }

  function vencer() {
    pararJogo();
    msg.textContent = "Chegou na bandeira! 🏁";
    soltarConfete();
    const fim = mostrarFimDeJogo(container, {
      venceu: true,
      titulo: "Chegada! 🏁",
      texto:
        "Você percorreu " + Math.floor(distancia) + " m e guardou " + vidas + " vida(s).",
      pontos: Math.floor(distancia) + vidas * 30,
      rotuloBotao: "Correr de novo",
      recomecar: recomecar
    });
    creditarBonus("educacao-fisica").then((resultado) => {
      atualizarPilulaBonus(fim.bonus, resultado);
    });
  }

  function perder() {
    pararJogo();
    msg.textContent = "Você bateu demais...";
    mostrarFimDeJogo(container, {
      venceu: false,
      titulo: "Três pancadas e acabou! 😵",
      texto: "Você percorreu " + Math.floor(distancia) + " m. Dá para chegar mais longe!",
      pontos: Math.floor(distancia),
      rotuloBotao: "Correr de novo",
      recomecar: recomecar
    });
  }

  function pararJogo() {
    rodando = false;
    pararTimers();
    botaoPular.disabled = true;
    botaoRolar.disabled = true;
    botaoCorrer.disabled = false;
  }

  function passoDoJogo() {
    if (!rodando) {
      return;
    }

    // A velocidade cresce um pouquinho com a distância
    const passoPx = 9 + Math.min(distancia / 40, 4);
    distancia += passoPx / 10;
    valorDistancia.textContent = Math.floor(distancia) + " m";

    /* A bandeira aparece quando a distância é atingida */
    if (!metaEl && distancia >= CORRIDA_META_M) {
      criarMeta();
    }

    /* Novos obstáculos só até a bandeira aparecer */
    if (!metaEl && distancia >= proximoSpawn) {
      criarObstaculo();
      proximoSpawn = distancia + 12 + Math.random() * 10;
    }

    /* Move tudo para a esquerda */
    obstaculos.forEach((o) => {
      o.x -= passoPx;
      o.el.style.left = o.x + "px";
    });
    if (metaEl) {
      metaEl.x -= passoPx;
      metaEl.el.style.left = metaEl.x + "px";
    }

    /* A bandeira cruzou o corredor: vitória */
    const jogadorX = jogador.offsetLeft;
    const jogadorLargura = jogador.offsetWidth || 40;
    if (metaEl && metaEl.x <= jogadorX + jogadorLargura) {
      vencer();
      return;
    }

    /* Colisões: cada obstáculo é testado uma vez só */
    obstaculos.forEach((o) => {
      const largura = o.el.offsetWidth || 32;
      const naZona = o.x < jogadorX + jogadorLargura && o.x + largura > jogadorX;
      if (!o.passou && naZona) {
        o.passou = true;
        const salvou = o.alto
          ? jogador.classList.contains("abaixando")
          : jogador.classList.contains("pulando");
        if (!salvou && Date.now() > invulneravelAte) {
          bater();
        }
      }
    });

    /* Remove o que já passou da esquerda */
    obstaculos = obstaculos.filter((o) => {
      if (o.x + (o.el.offsetWidth || 32) < -10) {
        o.el.remove();
        return false;
      }
      return true;
    });
  }

  function iniciar() {
    limparObstaculos();
    distancia = 0;
    vidas = 3;
    proximoSpawn = 10;
    invulneravelAte = 0;
    atualizarVidas();
    valorDistancia.textContent = "0 m";
    msg.textContent = "Correndo! Pule 🚧 e role por baixo de 🛸.";
    rodando = true;
    botaoCorrer.disabled = true;
    botaoPular.disabled = false;
    botaoRolar.disabled = false;
    timerJogo = setInterval(passoDoJogo, CORRIDA_INTERVALO);
  }

  function pular() {
    if (!rodando) {
      return;
    }
    jogador.classList.remove("abaixando");
    jogador.classList.remove("pulando");
    void jogador.offsetWidth;
    jogador.classList.add("pulando");
    clearTimeout(timerPulo);
    timerPulo = setTimeout(() => jogador.classList.remove("pulando"), 480);
  }

  function rolar() {
    if (!rodando) {
      return;
    }
    jogador.classList.remove("pulando");
    jogador.classList.add("abaixando");
    clearTimeout(timerRolar);
    timerRolar = setTimeout(() => jogador.classList.remove("abaixando"), 520);
  }

  botaoCorrer.addEventListener("click", iniciar);
  botaoPular.addEventListener("click", pular);
  botaoRolar.addEventListener("click", rolar);

  /* ----- Teclado: seta para cima pula, para baixo rola ----- */
  function aoTeclado(e) {
    if (!rodando) {
      return;
    }
    if (e.key === "ArrowUp" || e.key === " ") {
      e.preventDefault();
      pular();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      rolar();
    }
  }
  document.addEventListener("keydown", aoTeclado);

  // NOVO: ao sair do poder, para tudo e remove o teclado
  limpezaPoder = () => {
    pararTimers();
    document.removeEventListener("keydown", aoTeclado);
  };
}

/* =========================================================
   PODER 5 — LABORATÓRIO DE POÇÕES (Práticas Experimentais)
   As poções enchem a página de partículas ou de aurora.
   Tudo é só visual e dura até recarregar a página.
   ========================================================= */
const POCOES = [
  { id: "atomos",   nome: "Chuva de átomos",   icone: "⚛️", tipo: "particulas", emoji: "⚛️", subir: false },
  { id: "bolhas",   nome: "Bolhas",            icone: "🫧", tipo: "particulas", emoji: "🫧", subir: true },
  { id: "cristais", nome: "Neve de cristais",  icone: "❄️", tipo: "particulas", emoji: "❄️", subir: false },
  { id: "aurora",   nome: "Aurora",            icone: "🌌", tipo: "aurora" },
  { id: "antidoto", nome: "Antídoto",          icone: "🧴", tipo: "limpar" }
];

let efeitoParticulas = null; // id da poção de partículas ligada (ou null)
let timerParticulas = null;

function pararParticulas() {
  if (timerParticulas !== null) {
    clearInterval(timerParticulas);
    timerParticulas = null;
  }
  efeitoParticulas = null;
  document.querySelectorAll(".particula").forEach((p) => p.remove());
}

function criarParticula(pocao) {
  const particula = criarEl("span", "particula", pocao.emoji);
  if (pocao.subir) {
    particula.classList.add("particula-subir");
  }
  particula.style.left = Math.random() * 96 + "%";
  particula.style.fontSize = 1 + Math.random() * 1.2 + "rem";
  document.body.appendChild(particula);
  setTimeout(() => particula.remove(), 6200);
}

function iniciarParticulas(pocao) {
  pararParticulas();
  efeitoParticulas = pocao.id;
  timerParticulas = setInterval(() => criarParticula(pocao), 450);
}

function montarLaboratorio(palco) {
  palco.appendChild(
    criarEl(
      "p",
      "poder-texto",
      "Clique em uma poção para misturar. Os efeitos ficam na página até você usar o Antídoto ou recarregar."
    )
  );

  const bancada = criarEl("div", "lab-bancada");
  const botoes = [];

  function atualizarAtivas() {
    botoes.forEach((item) => {
      let ativa = false;
      if (item.pocao.tipo === "particulas") {
        ativa = efeitoParticulas === item.pocao.id;
      } else if (item.pocao.tipo === "aurora") {
        ativa = document.body.classList.contains("efeito-aurora");
      }
      item.botao.classList.toggle("ativa", ativa);
    });
  }

  POCOES.forEach((pocao) => {
    const botao = criarEl("button", "lab-pocao");
    botao.type = "button";
    botao.appendChild(criarEl("span", "lab-pocao-icone", pocao.icone));
    botao.appendChild(document.createTextNode(pocao.nome));

    botao.addEventListener("click", () => {
      if (pocao.tipo === "particulas") {
        if (efeitoParticulas === pocao.id) {
          pararParticulas();
        } else {
          iniciarParticulas(pocao);
        }
      } else if (pocao.tipo === "aurora") {
        document.body.classList.toggle("efeito-aurora");
      } else {
        pararParticulas();
        document.body.classList.remove("efeito-aurora");
      }
      atualizarAtivas();
    });

    botoes.push({ pocao: pocao, botao: botao });
    bancada.appendChild(botao);
  });

  palco.appendChild(bancada);
  atualizarAtivas();
}

/* =========================================================================
   =========================================================================
   NOVO: LOTE 2 DE PODERES
   Máquina de Letras, Terrário Vivo, Máquina do Tempo,
   Modo Player 2 e Terminal Hacker.
   Nada aqui é salvo na API: só os IDs dos poderes comprados.
   Cada poder que usa temporizadores define limpezaPoder, para
   tudo parar quando o aluno volta para a loja.
   =========================================================================
   ========================================================================= */

/* =========================================================
   PODER 6 — MÁQUINA DE LETRAS (Língua Portuguesa)
   Palavras caem. Digite cada uma (sem acento) para explodir.
   1 minuto, 3 vidas. Os pontos são só do jogo.
   ========================================================= */
const PALAVRAS_LETRAS = [
  "crase", "verbo", "sujeito", "acento", "texto", "frase", "poema", "conto",
  "virgula", "adjetivo", "pronome", "silaba", "predicado", "ortografia",
  "leitura", "gramatica", "redacao", "narrador", "paragrafo", "ponto",
  "versos", "rima", "fabula", "cronica", "artigo", "numeral", "adverbio",
  "palavra", "letra", "dicionario", "pontuacao", "sinonimo", "antonimo"
];

let recordeLetras = 0; // só durante a sessão

function montarLetras(palco) {
  const DURACAO = 60;

  palco.appendChild(
    criarEl(
      "p",
      "poder-texto",
      "Palavras caem do céu! Digite cada uma (sem acento) para explodi-la. Você tem 3 vidas e 1 minuto. Se uma palavra chegar ao chão, você perde uma vida."
    )
  );

  /* ----- Placar ----- */
  const hud = criarEl("div", "letras-hud");

  function criarItemHud(rotulo, valorInicial) {
    const item = criarEl("span", "letras-hud-item", rotulo);
    const valor = criarEl("strong", "", String(valorInicial));
    item.appendChild(valor);
    hud.appendChild(item);
    return valor;
  }

  const hudPontos = criarItemHud("Pontos", 0);
  const hudVidas = criarItemHud("Vidas", "❤️❤️❤️");
  const hudTempo = criarItemHud("Tempo", DURACAO + "s");
  const hudRecorde = criarItemHud("Recorde", recordeLetras);
  palco.appendChild(hud);

  /* ----- Arena e campo de digitação ----- */
  const arena = criarEl("div", "letras-arena");
  palco.appendChild(arena);

  const campo = document.createElement("input");
  campo.type = "text";
  campo.className = "acesso-campo letras-campo";
  campo.autocomplete = "off";
  campo.placeholder = "Digite a palavra aqui";
  campo.setAttribute("autocapitalize", "none");
  campo.setAttribute("spellcheck", "false");
  campo.setAttribute("aria-label", "Digite a palavra que está caindo");
  palco.appendChild(campo);

  /* ----- Estado do jogo ----- */
  let palavras = []; // { texto, el, y }
  let pontos = 0;
  let vidas = 3;
  let restante = DURACAO;
  let rodando = false;
  let timerQueda = null;
  let timerCriar = null;
  let timerRelogio = null;

  function pararJogo() {
    clearInterval(timerQueda);
    clearInterval(timerCriar);
    clearInterval(timerRelogio);
    timerQueda = null;
    timerCriar = null;
    timerRelogio = null;
    rodando = false;
  }

  function atualizarHud() {
    hudPontos.textContent = pontos;
    hudVidas.textContent = vidas > 0 ? "❤️".repeat(vidas) : "💔";
    hudTempo.textContent = restante + "s";
  }

  function removerPalavras() {
    palavras.forEach((p) => p.el.remove());
    palavras = [];
  }

  function mostrarTela(titulo, texto, rotuloBotao) {
    const tela = criarEl("div", "letras-fim");
    tela.appendChild(criarEl("div", "letras-fim-titulo", titulo));
    tela.appendChild(criarEl("div", "letras-fim-texto", texto));
    const botao = criarEl("button", "botao", rotuloBotao);
    botao.type = "button";
    botao.addEventListener("click", () => {
      tela.remove();
      iniciar();
    });
    tela.appendChild(botao);
    arena.appendChild(tela);
  }

  function terminar(titulo) {
    pararJogo();
    removerPalavras();
    let texto = "Você fez " + pontos + " pontos.";
    if (pontos > recordeLetras) {
      recordeLetras = pontos;
      hudRecorde.textContent = recordeLetras;
      texto += " Novo recorde! 🏆";
    }
    mostrarTela(titulo, texto, "Jogar de novo");
  }

  function perderVida() {
    if (!rodando) {
      return;
    }
    vidas--;
    atualizarHud();
    if (vidas <= 0) {
      terminar("Fim de jogo!");
    }
  }

  function criarPalavra() {
    if (!rodando) {
      return;
    }
    const usadas = palavras.map((p) => p.texto);
    const livres = PALAVRAS_LETRAS.filter((t) => !usadas.includes(t));
    if (livres.length === 0) {
      return;
    }
    const texto = livres[Math.floor(Math.random() * livres.length)];
    const el = criarEl("div", "letras-palavra", texto);
    arena.appendChild(el);
    const maxX = Math.max(0, arena.clientWidth - el.offsetWidth - 4);
    el.style.left = Math.random() * maxX + "px";
    const palavra = { texto: texto, el: el, y: -30 };
    el.style.top = palavra.y + "px";
    palavras.push(palavra);
  }

  function mover() {
    const altura = arena.clientHeight;
    // Fica um pouco mais rápido conforme o tempo passa
    const velocidade = 1.5 + (DURACAO - restante) * 0.03;
    palavras.slice().forEach((p) => {
      if (!rodando) {
        return;
      }
      p.y += velocidade;
      p.el.style.top = p.y + "px";
      if (p.y > altura - 30) {
        palavras = palavras.filter((x) => x !== p);
        p.el.remove();
        perderVida();
      }
    });
  }

  function explodir(palavra) {
    palavras = palavras.filter((x) => x !== palavra);
    palavra.el.classList.remove("alvo");
    palavra.el.classList.add("explodindo");
    setTimeout(() => palavra.el.remove(), 450);
    pontos += palavra.texto.length * 10;
  }

  function verificarDigitado() {
    palavras.forEach((p) => p.el.classList.remove("alvo"));
    const digitado = semAcento(campo.value.trim().toLowerCase());
    if (digitado === "" || !rodando) {
      return;
    }
    const exata = palavras.find((p) => p.texto === digitado);
    if (exata) {
      explodir(exata);
      campo.value = "";
      atualizarHud();
      return;
    }
    // Destaca a palavra mais baixa que começa com o que foi digitado
    const candidatas = palavras
      .filter((p) => p.texto.startsWith(digitado))
      .sort((a, b) => b.y - a.y);
    if (candidatas.length > 0) {
      candidatas[0].el.classList.add("alvo");
    }
  }

  function iniciar() {
    pararJogo();
    removerPalavras();
    pontos = 0;
    vidas = 3;
    restante = DURACAO;
    rodando = true;
    atualizarHud();
    campo.value = "";
    campo.focus();
    criarPalavra();
    timerQueda = setInterval(mover, 50);
    timerCriar = setInterval(criarPalavra, 1800);
    timerRelogio = setInterval(() => {
      restante--;
      atualizarHud();
      if (restante <= 0) {
        terminar("Tempo esgotado!");
      }
    }, 1000);
  }

  campo.addEventListener("input", verificarDigitado);

  limpezaPoder = pararJogo;

  mostrarTela("Máquina de Letras", "Pronto para o desafio de 1 minuto?", "Começar");
}

/* =========================================================
   PODER 7 — TERRÁRIO VIVO (Ciências)
   Média 7 ou mais = animal | 6 a 7 = planta | abaixo de 6 = ovo.
   Matérias sem nota não aparecem.
   ========================================================= */
const SERES_ANIMAIS = {
  "Língua Portuguesa": "🦉",
  "Matemática": "🦊",
  "Ciências": "🦎",
  "História": "🐢",
  "Geografia": "🦅",
  "Língua Inglesa": "🦜",
  "Arte": "🦋",
  "Educação Física": "🐆",
  "Educação Digital": "🐙",
  "Educação Financeira": "🐿️",
  "Estudo Orientado": "🐘",
  "Redação e Leitura": "🐝",
  "Pensamento Lógico": "🐬",
  "Literatura Arte e Movimento": "🦢",
  "Práticas Experimentais": "🐸"
};

const SERES_PLANTAS = ["🌱", "🌿", "🌻", "🌷", "🌵", "🍀"];

function emojiAnimal(nomeDisciplina) {
  if (Object.prototype.hasOwnProperty.call(SERES_ANIMAIS, nomeDisciplina)) {
    return SERES_ANIMAIS[nomeDisciplina];
  }
  return "🐾";
}

function montarTerrario(palco) {
  const resultados = processarDados(dadosAtuais);

  palco.appendChild(
    criarEl(
      "p",
      "poder-texto",
      "Cada matéria vira um ser vivo. Quanto melhor a média, mais evoluído ele fica. Clique em um ser para saber quem ele é."
    )
  );

  const terrario = criarEl("div", "terrario");
  const info = criarEl("div", "terrario-info", "Clique em um ser para saber quem ele é.");

  let escolhido = null;
  let indicePlanta = 0;
  let total = 0;

  resultados.forEach((r) => {
    if (r.media === null) {
      return;
    }
    total++;

    const ser = criarEl("span", "terrario-ser");
    let emoji;
    let estado;
    let topo;

    if (r.media >= ALVO_TESOURO) {
      emoji = emojiAnimal(r.disciplina);
      estado = "animal solto";
      topo = 8 + Math.random() * 52;
    } else if (r.media >= MEDIA_MINIMA) {
      emoji = SERES_PLANTAS[indicePlanta % SERES_PLANTAS.length];
      indicePlanta++;
      estado = "planta crescendo";
      topo = 72 + Math.random() * 10;
      ser.classList.add("terrario-planta");
    } else {
      emoji = "🥚";
      estado = "ovo esperando para chocar";
      topo = 74 + Math.random() * 8;
      ser.classList.add("terrario-ovo");
    }

    ser.textContent = emoji;
    ser.style.left = 4 + Math.random() * 68 + "%";
    ser.style.top = topo + "%";
    ser.style.setProperty("--dx", Math.round(Math.random() * 100 - 50) + "px");
    ser.style.setProperty("--dy", Math.round(Math.random() * 50 - 25) + "px");
    ser.style.setProperty("--duracao", (8 + Math.random() * 8).toFixed(1) + "s");
    ser.setAttribute("role", "button");
    ser.setAttribute("tabindex", "0");
    ser.setAttribute("aria-label", r.disciplina + ": " + estado);

    function escolher() {
      if (escolhido) {
        escolhido.classList.remove("terrario-escolhido");
      }
      ser.classList.add("terrario-escolhido");
      escolhido = ser;
      info.textContent =
        emoji + " " + r.disciplina + " — média " + formatarNota(r.media) + " (" + estado + ")";
    }

    ser.addEventListener("click", escolher);
    ser.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        escolher();
      }
    });

    terrario.appendChild(ser);
  });

  if (total === 0) {
    info.textContent = "Ainda não há notas para povoar o terrário.";
  }

  palco.appendChild(terrario);
  palco.appendChild(info);
  palco.appendChild(
    criarEl(
      "p",
      "terrario-legenda",
      "🦊 animal: média 7 ou mais · 🌿 planta: média de 6 a 7 · 🥚 ovo: média abaixo de 6 · matérias sem nota ainda não aparecem"
    )
  );
}

/* =========================================================
   PODER 8 — MÁQUINA DO TEMPO (História)
   O viajante passa pelos 3 trimestres. Cada personagem
   comenta se a média subiu, caiu ou ficou igual.
   ========================================================= */
const ERAS_TEMPO = [
  { era: "1º Tri · Egito Antigo", personagem: "👑" },
  { era: "2º Tri · Idade Média", personagem: "🤺" },
  { era: "3º Tri · Futuro", personagem: "🧑‍🚀" }
];

function falaDaEra(indice, atual, anterior) {
  if (atual === null) {
    return "Ainda não há notas neste trimestre. A viagem continua quando elas chegarem!";
  }
  const nota = formatarNota(atual);
  const temComparacao = indice > 0 && anterior !== null;
  const diferenca = temComparacao ? atual - anterior : 0;
  const mudanca = formatarNota(Math.abs(diferenca));

  if (indice === 0) {
    if (atual >= ALVO_TESOURO) {
      return "Por Rá! Média " + nota + ". Seu boletim merece uma pirâmide!";
    }
    if (atual >= MEDIA_MINIMA) {
      return "Média " + nota + ". Boa fundação: até as pirâmides começaram com uma pedra.";
    }
    return "Média " + nota + ". Todo grande império começa com um desafio. Hora de reconstruir!";
  }

  if (indice === 1) {
    if (!temComparacao) {
      return "Média " + nota + ". Uma nova batalha começou, de armadura e tudo!";
    }
    if (diferenca > 0.05) {
      return "Média " + nota + ": subiu " + mudanca + " ponto(s)! Seu escudo está cada vez mais forte.";
    }
    if (diferenca < -0.05) {
      return "Média " + nota + ": caiu " + mudanca + " ponto(s). A batalha foi dura, mas cavaleiros se levantam.";
    }
    return "Média " + nota + ": firme como um castelo.";
  }

  if (!temComparacao) {
    return "Média " + nota + ". Nova missão iniciada, rumo ao espaço!";
  }
  if (diferenca > 0.05) {
    return "Média " + nota + ": subiu " + mudanca + " ponto(s). Decolagem perfeita! 🚀";
  }
  if (diferenca < -0.05) {
    return "Média " + nota + ": caiu " + mudanca + " ponto(s). Turbulência, mas dá para corrigir a rota.";
  }
  return "Média " + nota + ": órbita estável.";
}

function montarTempo(palco) {
  const resultados = processarDados(dadosAtuais);

  const medias = ["tri1", "tri2", "tri3"].map((campo) => {
    const notas = resultados.map((r) => r[campo]).filter((n) => n !== null);
    if (notas.length === 0) {
      return null;
    }
    let soma = 0;
    notas.forEach((n) => (soma += n));
    return soma / notas.length;
  });

  palco.appendChild(
    criarEl(
      "p",
      "poder-texto",
      "Viaje pelos 3 trimestres e veja o que cada personagem tem a dizer sobre a sua média geral."
    )
  );

  const linha = criarEl("div", "tempo-linha");
  const trilho = criarEl("div", "tempo-trilho");
  const progresso = criarEl("div", "tempo-progresso");
  trilho.appendChild(progresso);
  linha.appendChild(trilho);

  const viajante = criarEl("div", "tempo-viajante", "⏳");
  linha.appendChild(viajante);

  const paradas = ERAS_TEMPO.map((era, i) => {
    // Compara com o último trimestre que tem nota antes deste
    let anterior = null;
    for (let j = i - 1; j >= 0; j--) {
      if (medias[j] !== null) {
        anterior = medias[j];
        break;
      }
    }

    const parada = criarEl("div", "tempo-parada");
    parada.appendChild(criarEl("span", "tempo-era", era.era));
    parada.appendChild(criarEl("span", "tempo-personagem", era.personagem));
    parada.appendChild(criarEl("span", "tempo-nota", medias[i] === null ? "—" : formatarNota(medias[i])));
    parada.appendChild(criarEl("span", "tempo-fala", falaDaEra(i, medias[i], anterior)));
    linha.appendChild(parada);
    return parada;
  });

  palco.appendChild(linha);

  const resumo = criarEl("p", "corrida-resultado", "");
  palco.appendChild(resumo);

  // Texto final comparando o primeiro e o último trimestre com nota
  function textoResumo() {
    const comNota = medias.filter((m) => m !== null);
    if (comNota.length < 2) {
      return "Viagem concluída! Continue lançando notas para ver sua evolução.";
    }
    const diferenca = comNota[comNota.length - 1] - comNota[0];
    if (diferenca > 0.05) {
      return "Resumo: sua média geral subiu " + formatarNota(diferenca) + " ponto(s) ao longo da viagem. 🚀";
    }
    if (diferenca < -0.05) {
      return "Resumo: sua média geral caiu " + formatarNota(Math.abs(diferenca)) + " ponto(s). Ainda dá tempo de virar o jogo!";
    }
    return "Resumo: sua média geral ficou estável ao longo da viagem.";
  }

  const botao = criarEl("button", "botao", "Viajar no tempo ⏳");
  botao.type = "button";
  palco.appendChild(botao);

  const timers = [];

  function limparTimers() {
    timers.forEach((t) => clearTimeout(t));
    timers.length = 0;
  }

  function viajar() {
    limparTimers();
    botao.disabled = true;
    resumo.textContent = "";
    paradas.forEach((p) => p.classList.remove("visivel"));
    progresso.style.width = "0%";
    viajante.style.left = "16.66%";

    const passos = [
      { t: 400,  left: "16.66%", progresso: "0%" },
      { t: 2000, left: "50%",    progresso: "50%" },
      { t: 3600, left: "83.33%", progresso: "100%" }
    ];

    passos.forEach((passo, i) => {
      timers.push(
        setTimeout(() => {
          viajante.style.left = passo.left;
          progresso.style.width = passo.progresso;
          paradas[i].classList.add("visivel");
        }, passo.t)
      );
    });

    timers.push(
      setTimeout(() => {
        resumo.textContent = textoResumo();
        botao.disabled = false;
      }, 5000)
    );
  }

  botao.addEventListener("click", viajar);
  limpezaPoder = limparTimers;

  viajar(); // a viagem começa sozinha ao abrir o poder
}

/* =========================================================
   PODER 9 — MODO PLAYER 2 (Língua Inglesa)
   Um robô narra o boletim em inglês (efeito de digitação),
   com a legenda em português logo depois.
   ========================================================= */
function montarPlayer2(palco) {
  const resultados = processarDados(dadosAtuais);
  const comNota = resultados.filter((r) => r.media !== null);
  const mediaGeral = calcularMediaGeral(resultados);

  const falas = [];
  falas.push({
    en: "Hello, Player One! I am Player Two.",
    pt: "Olá, Jogador 1! Eu sou o Jogador 2."
  });

  if (mediaGeral === null) {
    falas.push({
      en: "No scores yet. Come back when you have some grades!",
      pt: "Ainda não há notas. Volte quando tiver algumas!"
    });
  } else {
    falas.push({
      en: "Your overall score is " + mediaGeral.toFixed(1) + ".",
      pt: "Sua média geral é " + formatarNota(mediaGeral) + "."
    });

    const ordenadas = comNota.slice().sort((a, b) => b.media - a.media);
    const melhor = ordenadas[0];
    const pior = ordenadas[ordenadas.length - 1];

    falas.push({
      en: "Your best quest is " + melhor.disciplina + ", with " + melhor.media.toFixed(1) + ".",
      pt: "Sua melhor missão é " + melhor.disciplina + ", com " + formatarNota(melhor.media) + "."
    });

    if (pior.media < ALVO_TESOURO) {
      falas.push({
        en: "Boss fight ahead: " + pior.disciplina + ", at " + pior.media.toFixed(1) + ". You can beat it!",
        pt: "Chefão à vista: " + pior.disciplina + ", com " + formatarNota(pior.media) + ". Você consegue vencer!"
      });
    } else {
      falas.push({
        en: "No boss fights left. Every quest is cleared!",
        pt: "Nenhum chefão sobrando. Todas as missões estão vencidas!"
      });
    }

    const boas = resultados.filter((r) => r.situacao === "Bom desempenho").length;
    const atencao = resultados.filter((r) => r.situacao === "Atenção").length;
    falas.push({
      en:
        boas + (boas === 1 ? " quest is" : " quests are") + " going great, and " +
        atencao + (atencao === 1 ? " needs" : " need") + " attention.",
      pt:
        boas + (boas === 1 ? " missão está" : " missões estão") + " indo muito bem e " +
        atencao + (atencao === 1 ? " precisa" : " precisam") + " de atenção."
    });
  }

  falas.push({
    en: "Game on! Keep leveling up.",
    pt: "Bora jogar! Continue subindo de nível."
  });

  palco.appendChild(
    criarEl(
      "p",
      "poder-texto",
      "Seu parceiro Player 2 vai narrar o seu boletim em inglês. A tradução aparece logo depois de cada fala."
    )
  );

  const cena = criarEl("div", "player2-cena");
  cena.appendChild(criarEl("div", "player2-personagem", "🤖"));

  const balao = criarEl("div", "player2-balao");
  const fala = criarEl("div", "player2-fala");
  const legenda = criarEl("div", "player2-legenda");
  balao.appendChild(fala);
  balao.appendChild(legenda);
  cena.appendChild(balao);
  palco.appendChild(cena);

  const botoes = criarEl("div", "player2-botoes");
  const botaoProxima = criarEl("button", "botao", "Próxima fala ▶");
  botaoProxima.type = "button";
  const botaoRecomecar = criarEl("button", "botao", "Recomeçar ↺");
  botaoRecomecar.type = "button";
  botoes.appendChild(botaoProxima);
  botoes.appendChild(botaoRecomecar);
  palco.appendChild(botoes);

  let indice = 0;
  let timerDigitar = null;

  function pararDigitacao() {
    if (timerDigitar !== null) {
      clearInterval(timerDigitar);
      timerDigitar = null;
    }
  }

  function mostrar(i) {
    pararDigitacao();
    indice = i;
    const atual = falas[i];
    fala.textContent = "";
    legenda.textContent = "";
    fala.classList.add("player2-digitando");
    botaoProxima.disabled = true;

    let n = 0;
    timerDigitar = setInterval(() => {
      n++;
      fala.textContent = atual.en.slice(0, n);
      if (n >= atual.en.length) {
        pararDigitacao();
        fala.classList.remove("player2-digitando");
        legenda.textContent = "Tradução: " + atual.pt;
        botaoProxima.disabled = i >= falas.length - 1;
      }
    }, 35);
  }

  botaoProxima.addEventListener("click", () => {
    if (indice < falas.length - 1) {
      mostrar(indice + 1);
    }
  });

  botaoRecomecar.addEventListener("click", () => mostrar(0));

  limpezaPoder = pararDigitacao;

  mostrar(0);
}

/* =========================================================
   NOVO: PODER 10 — MISSÃO DE INVASÃO (Educação Digital)
   O firewall tem 5 camadas. Observe a sequência de símbolos
   e repita ela para quebrar cada camada (fica mais longa e
   mais rápida a cada uma). 3 erros e a invasão falha.
   Vencer dá bônus de pontos!
   ========================================================= */
const INVASAO_CAMADAS = 5;
const INVASAO_SIMBOLOS = ["🔑", "💾", "⚡", "🖥️"];

function montarInvasao(palco) {
  palco.appendChild(
    criarEl(
      "p",
      "poder-texto",
      "Invada o firewall! Observe a sequência de símbolos que o sistema mostra e repita ela para quebrar a camada. Cada camada é mais longa e mais rápida. Três erros e o alarme dispara. Quebrou todas? Vitória com bônus!"
    )
  );

  const container = criarEl("div", "invasao");

  /* ----- HUD: camadas e tentativas ----- */
  const hud = criarEl("div", "invasao-hud");
  const hudCamadas = criarEl("span", "invasao-hud-item", "Camadas: ");
  const valorCamadas = criarEl("strong", "", "0/" + INVASAO_CAMADAS);
  hudCamadas.appendChild(valorCamadas);
  const hudTentativas = criarEl("span", "invasao-hud-item", "Tentativas: ");
  const valorTentativas = criarEl("strong", "", "❤️❤️❤️");
  hudTentativas.appendChild(valorTentativas);
  hud.appendChild(hudCamadas);
  hud.appendChild(hudTentativas);
  container.appendChild(hud);

  const firewall = criarEl("div", "invasao-firewall");
  const camadasEl = [];
  for (let i = 0; i < INVASAO_CAMADAS; i++) {
    const camada = criarEl("div", "invasao-camada");
    firewall.appendChild(camada);
    camadasEl.push(camada);
  }
  container.appendChild(firewall);

  const msg = criarEl("p", "invasao-msg", "Aperte “Iniciar invasão” para começar.");
  container.appendChild(msg);

  const simbolos = criarEl("div", "invasao-simbolos");
  const botoesSimbolo = INVASAO_SIMBOLOS.map((emoji) => {
    const botao = criarEl("button", "invasao-simbolo", emoji);
    botao.type = "button";
    botao.disabled = true;
    simbolos.appendChild(botao);
    return botao;
  });
  container.appendChild(simbolos);

  const botaoIniciar = criarEl("button", "botao", "Iniciar invasão 🔓");
  botaoIniciar.type = "button";
  container.appendChild(botaoIniciar);

  palco.appendChild(container);

  /* ----- Estado da invasão ----- */
  let camadaAtual = 0;    // camadas já quebradas
  let tentativas = 3;
  let sequencia = [];     // índices dos símbolos da rodada
  let posicaoJogador = 0; // quantos o jogador já acertou da rodada
  let tocando = false;    // está mostrando a sequência?
  let encerrado = false;
  const timers = [];

  function limparTimers() {
    timers.forEach((t) => clearTimeout(t));
    timers.length = 0;
  }

  // NOVO: ao sair do poder, para tudo
  limpezaPoder = limparTimers;

  function definirBotoes(ativar) {
    botoesSimbolo.forEach((b) => (b.disabled = !ativar));
  }

  function atualizarHud() {
    valorCamadas.textContent = camadaAtual + "/" + INVASAO_CAMADAS;
    valorTentativas.textContent = tentativas > 0 ? "❤️".repeat(tentativas) : "💔";
    camadasEl.forEach((camada, i) => {
      camada.classList.toggle("quebrada", i < camadaAtual);
    });
  }

  function recomecar() {
    palco.textContent = "";
    montarInvasao(palco);
  }

  function acenderSimbolo(indice, classe, duracao) {
    const botao = botoesSimbolo[indice];
    if (!botao) {
      return;
    }
    botao.classList.add(classe);
    timers.push(setTimeout(() => botao.classList.remove(classe), duracao));
  }

  function tocarSequencia() {
    tocando = true;
    definirBotoes(false);
    msg.textContent = "Observe a sequência...";
    const velocidade = 650 - camadaAtual * 60; // fica mais rápido por camada
    sequencia.forEach((indice, i) => {
      timers.push(
        setTimeout(() => {
          acenderSimbolo(indice, "acesa", Math.max(240, velocidade - 160));
        }, i * velocidade)
      );
    });
    timers.push(
      setTimeout(() => {
        tocando = false;
        posicaoJogador = 0;
        definirBotoes(true);
        msg.textContent = "Sua vez! Repita a sequência.";
      }, sequencia.length * velocidade + 150)
    );
  }

  function novaRodada() {
    const tamanho = 3 + camadaAtual; // 3, 4, 5, 6 e 7 símbolos
    sequencia = [];
    for (let i = 0; i < tamanho; i++) {
      sequencia.push(Math.floor(Math.random() * INVASAO_SIMBOLOS.length));
    }
    tocarSequencia();
  }

  function vencer() {
    encerrado = true;
    definirBotoes(false);
    botaoIniciar.disabled = true;
    msg.textContent = "Firewall invadido! 💚";
    soltarConfete();
    const fim = mostrarFimDeJogo(container, {
      venceu: true,
      titulo: "Firewall invadido! 💚",
      texto:
        "Você quebrou as " + INVASAO_CAMADAS + " camadas com " + tentativas + " tentativa(s) de sobra.",
      pontos: INVASAO_CAMADAS * 40 + tentativas * 40,
      rotuloBotao: "Invadir de novo",
      recomecar: recomecar
    });
    creditarBonus("digital").then((resultado) => {
      atualizarPilulaBonus(fim.bonus, resultado);
    });
  }

  function perder() {
    encerrado = true;
    definirBotoes(false);
    botaoIniciar.disabled = true;
    msg.textContent = "A invasão falhou...";
    mostrarFimDeJogo(container, {
      venceu: false,
      titulo: "Invasão detectada! 🚨",
      texto:
        "Você quebrou " + camadaAtual + " de " + INVASAO_CAMADAS + " camadas. Tente mais uma vez!",
      pontos: camadaAtual * 40,
      rotuloBotao: "Tentar de novo",
      recomecar: recomecar
    });
  }

  function clicarSimbolo(indice) {
    if (encerrado || tocando) {
      return;
    }
    if (indice === sequencia[posicaoJogador]) {
      acenderSimbolo(indice, "acerto", 220);
      posicaoJogador++;
      if (posicaoJogador >= sequencia.length) {
        camadaAtual++;
        atualizarHud();
        if (camadaAtual >= INVASAO_CAMADAS) {
          vencer();
        } else {
          msg.textContent =
            "Camada quebrada! 🔓 Restam " + (INVASAO_CAMADAS - camadaAtual) + ".";
          definirBotoes(false);
          timers.push(setTimeout(novaRodada, 900));
        }
      }
    } else {
      acenderSimbolo(indice, "erro", 350);
      tentativas--;
      atualizarHud();
      if (tentativas <= 0) {
        perder();
      } else {
        msg.textContent =
          "Erro! Restam " + tentativas + " tentativa(s). Observe de novo...";
        definirBotoes(false);
        timers.push(setTimeout(tocarSequencia, 900));
      }
    }
  }

  botoesSimbolo.forEach((botao, indice) => {
    botao.addEventListener("click", () => clicarSimbolo(indice));
  });

  botaoIniciar.addEventListener("click", () => {
    if (encerrado) {
      return;
    }
    botaoIniciar.disabled = true;
    novaRodada();
  });
}

/* ---------- Qual função monta cada poder ---------- */
const CONSTRUTORES_PODER = {
  "arte": montarPincel,
  "geografia": montarExpedicao, // NOVO: Expedição do Tesouro
  "matematica": montarBoss,
  "educacao-fisica": montarCorridaObstaculos, // NOVO: Corrida de Obstáculos
  "experimentais": montarLaboratorio,
  "portugues": montarLetras,
  "ciencias": montarTerrario,
  "historia": montarTempo,
  "ingles": montarPlayer2,
  "digital": montarInvasao // NOVO: Missão de Invasão
};

/* ---------- EVENTOS DA LOJA ---------- */
botaoLoja.addEventListener("click", abrirLoja);
botaoVoltarBoletim.addEventListener("click", voltarAoBoletim);
/* NOVO: 🎒 Meus Poderes e o voltar dessa área */
if (botaoPoderes) {
  botaoPoderes.addEventListener("click", abrirMeusPoderes);
}
if (botaoVoltarPoderes) {
  botaoVoltarPoderes.addEventListener("click", voltarAoBoletim);
}
botaoVoltarLoja.addEventListener("click", () => {
  const eraPoderes = origemPoder === "poderes";
  fecharPoder();
  mostrarMensagem(mensagemLoja, "", "");
  if (eraPoderes && areaPoderes) {
    areaPoderes.hidden = false; // volta para o 🎒 em vez da loja
    origemPoder = "loja";
    window.scrollTo(0, 0);
  }
});