const QUANTIDADE_CELULAS = 25;
const QUANTIDADE_BOMBAS = 10;
const QUANTIDADE_NARVAL = 4;
const QUANTIDADE_QUESTOES = 11;

let contQuestoes = 1;
let revelando = false;

function revela(i) {
  if (revelando) return;
  if (revelados.has(i)) return;

  revelados.add(i);
  switch (retornaConteudoCarta(i)) {
    case "questao":
      constroiQuestao();
      qntQuestoes--;
      break;
    case "narval":
      qntBonus--;
      break;
    case "bomba":
      qntBombas--;
      break;
    default:
      break;
  }

  const card = document.getElementById(i);
  card.classList.toggle("flipCard");
  revelando = true;
  if (retornaConteudoCarta(i) == "questao") {
    setTimeout(function () {
      const headerQuestao = document.querySelector(".questao header");
      headerQuestao.innerHTML = "Questão " + contQuestoes;
      contQuestoes++;

      const questaoConteudo = document.querySelector(".questao .texto");

      document.querySelector(`.questoes`).style.display = "flex";
      revelando = false;
      atualizaDescricao();
    }, 1000);
  } else
    setTimeout(() => {
      revelando = false;
      atualizaDescricao();
    }, 1000);
}

function constroiQuestao() {
  var jogoElement = document.querySelector(".questao .texto");

  if (questoesAleat.length > 0)
    jogoElement.innerHTML = bancoQuestoes[questoesAleat.shift()];
  else alert("Acabaram as questoes 😞");
}

function constroiJogo() {
  atualizaDescricao();

  var jogoElement = document.querySelector(".jogo");
  jogoElement.innerHTML = "";

  for (i = 0; i < QUANTIDADE_CELULAS; i++) {
    var carta = "";
    carta += `<div class="card" id = "${i}" onclick="revela(${i})">`;
    carta += `    <div class="frente">${calculaPosicao(i)}</div>`;
    carta += `    <div class="verso"><img src="./img/${retornaConteudoCarta(
      i
    )}.svg"
                    alt="${retornaConteudoCarta(i)}"></div>`;
    carta += `</div>\n`;

    jogoElement.innerHTML += carta;
  }
}

function calculaPosicao(i) {
  letra = ["A", "B", "C", "D", "E"];
  ret = letra[Math.trunc(i / 5)];

  return ret + ((i % 5) + 1);
}

function sorteiaCartas() {
  ret = [];
  array = Array.from(Array(QUANTIDADE_CELULAS).keys());

  while (array.length > 0) {
    array = array.sort(() => 0.5 - Math.random());
    a = array.pop(0);
    ret.push(a);
  }
  return ret;
}

function retornaConteudoCarta(id) {
  var index = conteudoCartas.indexOf(id);
  if (index < QUANTIDADE_BOMBAS) return "bomba";
  else if (index < QUANTIDADE_NARVAL + QUANTIDADE_BOMBAS) return "narval";
  return "questao";
}

function mudarNome(id) {
  headerElement = document.querySelector(`.time${id} header`);
  var novoNome = prompt(`Digite o novo nome para a equipe ${id}:`);
  if (novoNome != null && novoNome.length < 18)
    headerElement.innerHTML = novoNome.toLowerCase();
  else alert("O novo nome deve conter no maximo 18 caracteres.");
}

function reduzPontos(id) {
  headerElement = document.querySelector(`.time${id} h1`);
  valor = parseInt(headerElement.innerHTML);
  valor -= 50;

  headerElement.innerHTML = Math.max(valor, 0);
}

function incrementaPontos(id) {
  headerElement = document.querySelector(`.time${id} h1`);
  valor = parseInt(headerElement.innerHTML);
  valor += 50;

  headerElement.innerHTML = Math.min(9950, valor);
}

function fecharQuestao() {
  document.querySelector(`.questoes`).style.display = "none";
}

function atualizaDescricao() {
  const bombasElement = document.querySelector(`.bombas h2`);
  bombasElement.innerHTML = `Quantitade de bombas: ${qntBombas}`;

  const questElement = document.querySelector(`.perguntas h2`);
  questElement.innerHTML = `Quantitade de questões: ${qntQuestoes}`;

  const bonusElement = document.querySelector(`.bonus h2`);
  bonusElement.innerHTML = `Quantitade de bônus: ${qntBonus}`;
}

let conteudoCartas = sorteiaCartas();
let qntBombas = QUANTIDADE_BOMBAS;
let qntQuestoes = QUANTIDADE_QUESTOES;
let qntBonus = QUANTIDADE_NARVAL;
let revelados = new Set();

const bancoQuestoes = [
  "Qual a diferença entre mamíferos prototérios, metatérios e eutérios? Dê um exemplo de cada.",
  "Cite duas adaptações que facilitam o vôo nas aves.",
  "O que define a classe mamalia?",
  "Que característica as aves e os mamíferos possuem que os permitem ser mais ativos, independente das condições ambientais?",
  "Qual a função da moela?",
  "Qual a função do sacos aéreos?",
  "As aves e mamíferos surgiram após a extinção dos dinossauros. <div><h2> Certo </h2> ou <h2>Errado</h2></div>",
  "Qual a função da glândula uropigial?",
  "Como são os ossos das aves?",
  "Diferencie aves ratitas de carinatas.",
  "Explique a principal teoria sobre a evolução da placenta.",
];

questoesAleat = Array.from(Array(QUANTIDADE_QUESTOES).keys());
questoesAleat = questoesAleat.sort(() => 0.5 - Math.random());

constroiJogo();
