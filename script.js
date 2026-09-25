<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <!-- Deixa o site funcionar bem no celular -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Boletim Digital</title>
  <!-- Liga o HTML ao CSS -->
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <!-- CABEÇALHO -->
  <header class="cabecalho">
    <h1>Boletim Digital</h1>
    <p class="subtitulo">8º Ano</p>
    <p class="estudante">Estudante Exemplo</p>
  </header>

  <main class="conteudo">

    <!-- ÁREA DOS CARDS DE RESUMO -->
    <!-- Os valores serão preenchidos pelo JavaScript -->
    <section class="cards" id="cards">
      <div class="card">
        <span class="card-icone">📊</span>
        <span class="card-titulo">Média Geral</span>
        <span class="card-valor" id="media-geral">—</span>
      </div>

      <div class="card">
        <span class="card-icone">📌</span>
        <span class="card-titulo">Total de Faltas</span>
        <span class="card-valor" id="total-faltas">—</span>
      </div>

      <div class="card">
        <span class="card-icone">✅</span>
        <span class="card-titulo">Bom Desempenho</span>
        <span class="card-valor" id="total-bom">—</span>
      </div>

      <div class="card">
        <span class="card-icone">⚠️</span>
        <span class="card-titulo">Precisam de Atenção</span>
        <span class="card-valor" id="total-atencao">—</span>
      </div>

      <div class="card">
        <span class="card-icone">🗓️</span>
        <span class="card-titulo">Frequência</span>
        <span class="card-valor" id="frequencia">—</span>
        <span class="card-extra" id="frequencia-status">—</span>
      </div>
    </section>

    <!-- TABELA DE NOTAS -->
    <!-- As linhas serão criadas pelo JavaScript -->
    <section class="tabela-area">
      <table class="tabela-boletim">
        <thead>
          <tr>
            <th>Disciplina</th>
            <th>1º Tri</th>
            <th>2º Tri</th>
            <th>3º Tri</th>
            <th>Média</th>
            <th>Faltas</th>
            <th>Situação</th>
          </tr>
        </thead>
        <tbody id="corpo-tabela">
          <!-- As linhas serão inseridas aqui pelo script.js -->
        </tbody>
      </table>
    </section>

  </main>

  <!-- Liga o HTML ao JavaScript -->
  <script src="script.js"></script>
</body>
</html>