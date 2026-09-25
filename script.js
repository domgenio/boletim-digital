/* =========================================================
   BOLETIM DIGITAL - 8º ANO
   Dados fictícios apenas para demonstração.
   ========================================================= */

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

/* =========================================================
   FUNÇÃO: normalizarNota(valor)
   Converte qualquer formato de nota para a escala 0–10.
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
   PROCESSAMENTO DOS DADOS
   Percorremos cada disciplina, normalizamos e guardamos
   os resultados em um novo array chamado "resultados".
   ========================================================= */
const resultados = disciplinas.map((d) => {
  // Normaliza cada trimestre
  const n1 = normalizarNota(d.tri1);
  const n2 = normalizarNota(d.tri2);
  const n3 = normalizarNota(d.tri3);

  // Calcula a média somente com as notas disponíveis
  const media = calcularMedia([n1, n2, n3]);

  // Soma as faltas
  const faltas = somarFaltas(d.faltas);

  // Define a situação
  const situacao = definirSituacao(media);

  return {
    disciplina: d.disciplina,
    tri1: n1,
    tri2: n2,
    tri3: n3,
    media: media,
    faltas: faltas,
    situacao: situacao
  };
});

/* =========================================================
   PREENCHER A TABELA (DOM)
   Criamos uma linha <tr> para cada disciplina e inserimos
   dentro do <tbody id="corpo-tabela">.
   ========================================================= */
const corpoTabela = document.getElementById("corpo-tabela");

resultados.forEach((r) => {
  // Criamos o elemento da linha
  const linha = document.createElement("tr");

  // Montamos o HTML interno da linha
  linha.innerHTML = `
    <td>${r.disciplina}</td>
    <td>${formatarNota(r.tri1)}</td>
    <td>${formatarNota(r.tri2)}</td>
    <td>${formatarNota(r.tri3)}</td>
    <td>${formatarNota(r.media)}</td>
    <td>${r.faltas}</td>
    <td class="${classeSituacao(r.situacao)}">${r.situacao}</td>
  `;

  // Adicionamos a linha ao corpo da tabela
  corpoTabela.appendChild(linha);
});

/* =========================================================
   CARDS DE RESUMO
   ========================================================= */

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