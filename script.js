const equipes = [];
const provas = [];
const pontuacoes = {};
const jogadores = {};
const pontuacoesJogadores = {};

function cadastrarEquipe() {
  const nome = document.getElementById('nomeEquipe').value.trim();
  if (nome && !equipes.includes(nome)) {
    equipes.push(nome);
    jogadores[nome] = [];
    atualizarListaEquipes();
    document.getElementById('nomeEquipe').value = '';
  }
}

function cadastrarJogador() {
  const nome = document.getElementById('nomeJogador').value.trim();
  const equipe = document.getElementById('equipeJogador').value;

  if (nome && equipe && !jogadores[equipe].includes(nome)) {
    jogadores[equipe].push(nome);
    atualizarListaJogadores();
    document.getElementById('nomeJogador').value = '';
  }
}

function cadastrarProva() {
  const nome = document.getElementById('nomeProva').value.trim();
  if (nome && !provas.includes(nome)) {
    provas.push(nome);
    atualizarListaProvas();
    document.getElementById('nomeProva').value = '';
  }
}

function atualizarSelects() {
  const selectEquipe = document.getElementById('selectEquipe');
  const selectProva = document.getElementById('selectProva');
  const equipeJogador = document.getElementById('equipeJogador');
  const selectJogador = document.getElementById('selectJogador');

  selectEquipe.innerHTML = equipes.map(e => `<option>${e}</option>`).join('');
  equipeJogador.innerHTML = equipes.map(e => `<option>${e}</option>`).join('');
  selectProva.innerHTML = provas.map(p => `<option>${p}</option>`).join('');

  let todasEquipes = [];
  for (let equipe in jogadores) {
    todasEquipes = todasEquipes.concat(jogadores[equipe].map(j => `${j} - ${equipe}`));
  }

  selectJogador.innerHTML = todasEquipes.map(j => `<option>${j}</option>`).join('');
}

function registrarPontuacao() {
  const equipe = document.getElementById('selectEquipe').value;
  const pontos = parseInt(document.getElementById('pontos').value) || 0;

  if (!pontuacoes[equipe]) pontuacoes[equipe] = 0;
  pontuacoes[equipe] += pontos;

  mostrarPlacarEquipes();
  mostrarPodio();
  document.getElementById('pontos').value = '';
}

function registrarPontuacaoJogador() {
  const jogadorStr = document.getElementById('selectJogador').value;
  const pontos = parseInt(document.getElementById('pontosJogador').value) || 0;

  if (!jogadorStr) return;

  const jogador = jogadorStr.split(" - ")[0];

  if (!pontuacoesJogadores[jogador]) pontuacoesJogadores[jogador] = 0;
  pontuacoesJogadores[jogador] += pontos;

  mostrarPlacarJogadores();
  document.getElementById('pontosJogador').value = '';
}

function mostrarPlacarEquipes() {
  const placar = document.getElementById('placar');
  placar.innerHTML = '';
  const sorted = Object.entries(pontuacoes).sort((a, b) => b[1] - a[1]);
  for (const [equipe, pontos] of sorted) {
    placar.innerHTML += `<li>${equipe}: ${pontos} pontos</li>`;
  }
}

function mostrarPlacarJogadores() {
  const placar = document.getElementById('placarJogadores');
  placar.innerHTML = '';
  const sorted = Object.entries(pontuacoesJogadores).sort((a, b) => b[1] - a[1]);
  for (const [jogador, pontos] of sorted) {
    placar.innerHTML += `<li>${jogador}: ${pontos} pontos</li>`;
  }
}

function mostrarPodio() {
  const podio = document.getElementById('podio');
  podio.innerHTML = '';

  const sorted = Object.entries(pontuacoes).sort((a, b) => b[1] - a[1]).slice(0, 3);
  const posicoes = ['🥇 1º', '🥈 2º', '🥉 3º'];

  sorted.forEach(([equipe, pontos], index) => {
    podio.innerHTML += `<li>${posicoes[index]} - ${equipe}: ${pontos} pontos</li>`;
  });
}

function atualizarListaEquipes() {
  const lista = document.getElementById('listaEquipes');
  lista.innerHTML = '';

  equipes.forEach((nome, index) => {
    lista.innerHTML += `<li>${nome} <button onclick="removerEquipe(${index})">❌</button></li>`;
  });

  atualizarSelects();
}

function removerEquipe(index) {
  const nome = equipes[index];
  equipes.splice(index, 1);
  delete jogadores[nome];
  delete pontuacoes[nome];

  atualizarListaEquipes();
  atualizarListaJogadores();
  mostrarPlacarEquipes();
  mostrarPodio();
}

function atualizarListaJogadores() {
  const lista = document.getElementById('listaJogadores');
  lista.innerHTML = '';

  for (let equipe in jogadores) {
    jogadores[equipe].forEach((jogador, index) => {
      lista.innerHTML += `<li>${jogador} (Equipe: ${equipe}) <button onclick="removerJogador('${equipe}', ${index})">❌</button></li>`;
    });
  }

  atualizarSelects();
}

function removerJogador(equipe, index) {
  const jogador = jogadores[equipe][index];
  jogadores[equipe].splice(index, 1);
  delete pontuacoesJogadores[jogador];

  atualizarListaJogadores();
  mostrarPlacarJogadores();
}

function atualizarListaProvas() {
  const lista = document.getElementById('listaProvas');
  lista.innerHTML = '';

  provas.forEach((nome, index) => {
    lista.innerHTML += `<li>${nome} <button onclick="removerProva(${index})">❌</button></li>`;
  });

  atualizarSelects();
}

function removerProva(index) {
  provas.splice(index, 1);
  atualizarListaProvas();
}
