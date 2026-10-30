/* =========================================================
   BOLETIM DIGITAL - 8º ANO
   Dados fictícios apenas para demonstração.
   ========================================================= */

/* ---------- CONFIGURAÇÃO FIXA DO ALUNO ---------- */
// Turma e número de chamada ficam fixos neste projeto
const CONFIG_ALUNO = {
  turma: "8A",
  numeroChamada: 7,
  apiUrl: "https://boletim-api.profbt.com.br"
};

/* ---------- DADOS BRUTOS (fictícios) ---------- */
// Array de objetos: cada objeto é uma disciplina
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
const MEDIA_MINIMA = 6.0; // média mínima de referência

// Referência INTERNA de risco (não exibir na interface!)
const REFERENCIA_FALTAS = 350;

/* =========================================================
   FUNÇÃO: normalizarNota(valor)
   Converte qualquer formato de nota para a escala 0–10.
   (Usada para os dados antigos do projeto e para dados da API.)
   Regras:
   - vazio / null / undefined  -> null (nota não lançada)
   - 0 a 10                    -> mantém
   - >10 e <=100               -> divide por 10
   - aceita ponto ou vírgula
   - fora das regras           -> null (inválida)
   ========================================================= */
function normalizarNota(valor) {
  // Se estiver vazio, nulo ou indefinido, consideramos "não lançada"
  if (valor === null || valor === undefined || valor === "") {
    return null;
  }

  // Se vier como texto com vírgula, trocamos por ponto
  if (typeof valor === "string") {
    valor = valor.replace(",", ".");
  }

  // Convertemos para número
  const numero = Number(valor);

  // Se não for um número válido, retornamos null
  if (isNaN(numero)) {
    return null;
  }

  // Regras de escala
  if (numero >= 0 && numero <= 10) {
    return numero;
  }
  if (numero > 10 && numero <= 100) {
    return numero / 10;
  }

  // Fora das regras -> inválida
  return null;
}

/* =========================================================
   FUNÇÃO: calcularMedia(notas)
   Recebe um array de notas já normalizadas (ou null).
   Calcula a média APENAS com as notas disponíveis.
   Se não houver nenhuma nota válida, retorna null.
   ========================================================= */
function calcularMedia(notas) {
  // Filtra somente as notas que existem (não nulas)
  const validas = notas.filter((n) => n !== null);

  if (validas.length === 0) {
    return null; // nenhuma nota disponível
  }

  // Soma todas e divide pela quantidade
  let soma = 0;
  validas.forEach((n) => {
    soma += n;
  });

  return soma / validas.length;
}

/* =========================================================
   FUNÇÃO: definirSituacao(media)
   Usa a média (ou null) para decidir a situação.
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
   FUNÇÃO: somarFaltas(listaFaltas)
   Soma os valores inteiros de um array de faltas.
   ========================================================= */
function somarFaltas(listaFaltas) {
  let total = 0;
  listaFaltas.forEach((f) => {
    total += f;
  });
  return total;
}

/* =========================================================
   FUNÇÃO: formatarNota(nota)
   Mostra a nota com 1 casa decimal ou o aviso padrão.
   ========================================================= */
function formatarNota(nota) {
  if (nota === null) {
    return "Ainda não lançada";
  }
  return nota.toFixed(1).replace(".", ",");
}

/* =========================================================
   FUNÇÃO: classeSituacao(situacao)
   Retorna a classe CSS correspondente à situação.
   ========================================================= */
function classeSituacao(situacao) {
  if (situacao === "Bom desempenho") return "situacao-bom";
  if (situacao === "Atenção") return "situacao-atencao";
  return "situacao-neutra";
}

/* =========================================================
   ESTADO DA PÁGINA
   - dadosAtuais: disciplinas mostradas na tela (locais ou da API)
   - pinSessao: PIN guardado SOMENTE na memória (variável)
   ========================================================= */
let dadosAtuais = [];
let pinSessao = "";
let modoEdicao = false;
let ocupado = false; // evita cliques repetidos durante uma conexão
let camposEdicao = []; // referências dos campos de edição

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

// Mostra turma e chamada (somente leitura)
document.getElementById("acesso-turma").textContent = CONFIG_ALUNO.turma;
document.getElementById("acesso-chamada").textContent = CONFIG_ALUNO.numeroChamada;

/* =========================================================
   FUNÇÃO: mostrarMensagem(elemento, texto, tipo)
   tipo: "erro", "sucesso" ou nada (mensagem neutra)
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
   FUNÇÃO: obterFaltas(d)
   Garante um array com 3 números inteiros (1º, 2º e 3º tri).
   ========================================================= */
function obterFaltas(d) {
  const lista = Array.isArray(d.faltas) ? d.faltas : [];
  return [0, 1, 2].map((i) => {
    const v = Number(lista[i]);
    return Number.isInteger(v) && v >= 0 ? v : 0;
  });
}

/* =========================================================
   PROCESSAMENTO DOS DADOS
   Percorremos cada disciplina, normalizamos e guardamos
   os resultados em um novo array chamado "resultados".
   Agora é uma função, para poder rodar várias vezes.
   ========================================================= */
function processarDados(lista) {
  return lista.map((d) => {
    // Normaliza cada trimestre
    const n1 = normalizarNota(d.tri1);
    const n2 = normalizarNota(d.tri2);
    const n3 = normalizarNota(d.tri3);

    // Calcula a média somente com as notas disponíveis
    const media = calcularMedia([n1, n2, n3]);

    // Soma as faltas
    const faltasPorTri = obterFaltas(d);
    const faltas = somarFaltas(faltasPorTri);

    // Define a situação
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
   FUNÇÕES DOS CAMPOS DE EDIÇÃO
   ========================================================= */

// Transforma uma nota em texto para o campo (7.5 -> "7,5"; null -> "")
function notaParaCampo(nota) {
  if (nota === null) {
    return "";
  }
  return String(Math.round(nota * 100) / 100).replace(".", ",");
}

// Cria um campo de texto para edição
function criarCampo(valorInicial, rotulo, tipoTeclado) {
  const campo = document.createElement("input");
  campo.type = "text";
  campo.className = "campo-edicao";
  campo.value = valorInicial;
  campo.setAttribute("inputmode", tipoTeclado);
  campo.setAttribute("aria-label", rotulo);
  campo.autocomplete = "off";

  // Quando o estudante volta a digitar, tiramos o aviso de erro
  campo.addEventListener("input", () => {
    campo.classList.remove("campo-invalido");
  });

  return campo;
}

// Valida a nota digitada no editor (somente 0 a 10, com ponto ou vírgula)
function validarNotaDigitada(texto) {
  const t = texto.trim();

  // Vazio vira null (sem nota)
  if (t === "") {
    return { valido: true, valor: null };
  }

  // Somente dígitos com ponto ou vírgula decimal
  if (!/^\d+([.,]\d+)?$/.test(t)) {
    return { valido: false, valor: null };
  }

  const numero = Number(t.replace(",", "."));
  if (isNaN(numero) || numero < 0 || numero > 10) {
    return { valido: false, valor: null };
  }

  return { valido: true, valor: numero };
}

// Valida as faltas digitadas (somente inteiro, zero ou maior)
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
   DESENHAR A TABELA (DOM)
   Limpa o corpo da tabela e cria uma linha <tr> para cada
   disciplina. Pode ser chamada várias vezes sem duplicar.
   ========================================================= */
function desenharTabela(resultados) {
  // Limpa a tabela antes de reconstruir
  corpoTabela.textContent = "";
  camposEdicao = [];

  resultados.forEach((r) => {
    // Criamos o elemento da linha
    const linha = document.createElement("tr");

    // Célula da disciplina (textContent = seguro contra HTML)
    const tdDisciplina = document.createElement("td");
    tdDisciplina.textContent = r.disciplina;
    linha.appendChild(tdDisciplina);

    const notas = [r.tri1, r.tri2, r.tri3];
    const camposNotas = [];

    // Células das três notas
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

    // Célula da média
    const tdMedia = document.createElement("td");
    tdMedia.textContent = formatarNota(r.media);
    linha.appendChild(tdMedia);

    // Célula das faltas
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

    // Célula da situação
    const tdSituacao = document.createElement("td");
    tdSituacao.className = classeSituacao(r.situacao);
    tdSituacao.textContent = r.situacao;
    linha.appendChild(tdSituacao);

    // Guardamos os campos para ler na hora de salvar
    if (modoEdicao) {
      camposEdicao.push({
        disciplina: r.disciplina,
        notas: camposNotas,
        faltas: camposFaltas
      });
    }

    // Adicionamos a linha ao corpo da tabela
    corpoTabela.appendChild(linha);
  });
}

/* =========================================================
   CARDS DE RESUMO
   ========================================================= */
function atualizarCards(resultados) {
  // 1) Média geral: média das médias disponíveis (ignora null)
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

  // 2) Total de faltas (soma de todas as disciplinas)
  let totalFaltas = 0;
  resultados.forEach((r) => (totalFaltas += r.faltas));
  document.getElementById("total-faltas").textContent = totalFaltas;

  // 3) Quantidade com "Bom desempenho"
  const totalBom = resultados.filter((r) => r.situacao === "Bom desempenho").length;
  document.getElementById("total-bom").textContent = totalBom;

  // 4) Quantidade com "Atenção"
  const totalAtencao = resultados.filter((r) => r.situacao === "Atenção").length;
  document.getElementById("total-atencao").textContent = totalAtencao;

  // 5) Frequência DEMONSTRATIVA
  // IMPORTANTE: este valor é apenas fictício para demonstração.
  // No futuro, a frequência será tratada de outra forma (não calculada a partir das faltas).
  const frequenciaDemonstrativa = 92;
  document.getElementById("frequencia").textContent = frequenciaDemonstrativa + "%";
  document.getElementById("frequencia-status").textContent = "Frequência adequada";
}

/* =========================================================
   FUNÇÃO: renderizar()
   Atualiza a tabela e os cards com os dados atuais.
   (Também atualiza os gráficos, no final.)
   ========================================================= */
function renderizar() {
  const resultados = processarDados(dadosAtuais);
  desenharTabela(resultados);
  atualizarCards(resultados);
  atualizarGraficos(); // apenas leitura: desenha os gráficos a partir de dadosAtuais
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
   FUNÇÃO: lerCamposEdicao()
   Lê e valida todos os campos. Se algum for inválido,
   marca o campo e retorna null (nada é salvo).
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
   FUNÇÃO: textoErroHttp(status)
   Mensagens para os erros da API.
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
   ABRIR O BOLETIM (POST /api/v1/boletins/abrir)
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

    // DADOS DA API > DADOS LOCAIS
    if (corpo && corpo.dados !== null && corpo.dados !== undefined) {
      if (!Array.isArray(corpo.dados.disciplinas)) {
        mostrarMensagem(mensagemAcesso, "Os dados recebidos estão em um formato inesperado.", "erro");
        return;
      }
      // Usa exatamente o que veio da API
      dadosAtuais = corpo.dados.disciplinas;
    } else {
      // Sem dados salvos: usa as disciplinas que já existem aqui (sem salvar)
      dadosAtuais = JSON.parse(JSON.stringify(disciplinas));
    }

    // Login bem-sucedido: guarda o PIN só na memória e limpa o campo
    pinSessao = pinDigitado;
    campoPin.value = "";
    mostrarMensagem(mensagemAcesso, "", "");

    areaAcesso.hidden = true;
    areaBoletim.hidden = false;

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
   SALVAR ALTERAÇÕES (PUT /api/v1/boletins/salvar)
   ========================================================= */
async function salvarAlteracoes() {
  if (ocupado) {
    return;
  }

  // Valida antes de enviar
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
          disciplinas: novasDisciplinas
        }
      })
    });

    if (!resposta.ok) {
      // Mantém os campos como estão para nova tentativa
      mostrarMensagem(mensagemEdicao, textoErroHttp(resposta.status), "erro");
      return;
    }

    // Sucesso: atualiza os dados e a tela
    dadosAtuais = novasDisciplinas;
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
   EVENTOS DOS BOTÕES
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
   =========================================================
   GRÁFICOS (Chart.js)
   =========================================================
   - Apenas LEITURA dos dados já carregados (dadosAtuais).
   - Nunca altera notas, faltas, disciplinas ou estado.
   - Nunca envia nada para a API.
   ========================================================= */

/* ---------- Instâncias dos gráficos ---------- */
let graficoMedias = null;
let graficoEvolucao = null;
let graficoFaltas = null;

/* ---------- Utilitário: lê uma variável de cor do CSS ---------- */
function corDoTema(nomeVariavel, padrao) {
  const valor = getComputedStyle(document.documentElement)
    .getPropertyValue(nomeVariavel)
    .trim();
  return valor || padrao;
}

/* ---------- Configuração comum de fonte/tooltip ---------- */
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

/* =========================================================
   GRÁFICO 1 — Média por disciplina (barras horizontais)
   ========================================================= */
function atualizarGraficoMedias() {
  const canvas = document.getElementById("graficoMediasDisciplinas");
  if (!canvas) return;

  // Processa os dados (leitura — não altera nada)
  const resultados = processarDados(dadosAtuais);

  // Nomes das disciplinas e médias (null vira null mesmo)
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

/* =========================================================
   GRÁFICO 2 — Evolução da média geral (linha)
   ========================================================= */
function atualizarGraficoEvolucao() {
  const canvas = document.getElementById("graficoEvolucaoTrimestres");
  if (!canvas) return;

  // Lê os tri1, tri2 e tri3 de cada disciplina e calcula a média
  // geral de cada trimestre usando SOMENTE notas válidas.
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

/* =========================================================
   GRÁFICO 3 — Faltas por trimestre (barras verticais)
   + avaliação interna de risco (referência 350 — NÃO exibir)
   ========================================================= */
function atualizarGraficoFaltas() {
  const canvas = document.getElementById("graficoFaltasTrimestres");
  if (!canvas) return;

  // Soma as faltas de cada trimestre entre todas as disciplinas.
  // Usa SOMENTE o array de faltas. Não usa notas.
  let faltasTri1 = 0;
  let faltasTri2 = 0;
  let faltasTri3 = 0;

  dadosAtuais.forEach((d) => {
    const f = obterFaltas(d);
    faltasTri1 += f[0];
    faltasTri2 += f[1];
    faltasTri3 += f[2];
  });
