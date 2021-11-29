const QUANTIDADE_CELULAS = 25
const QUANTIDADE_BOMBAS = 10
const QUANTIDADE_NARVAL = 3
const QUANTIDADE_QUESTOES = 12

function revela(i){
    const card = document.getElementById(i)
    card.classList.toggle("flipCard")
}

function constroiJogo(){

    var jogoElement = document.querySelector('.jogo')
    jogoElement.innerHTML = ""

    for(i = 0; i < QUANTIDADE_CELULAS; i++){
        var carta = ""
        carta += `<div class="card" id = "${i}" onclick="revela(${i})">`
        carta += `    <div class="frente">${calculaPosicao(i)}</div>`
        carta += `    <div class="verso ${retornaConteudoCarta(i)}"></div>`
        carta += `</div>\n`

        jogoElement.innerHTML += carta
    }
}

function calculaPosicao(i){
    letra = ['A', 'B', 'C', 'D', 'E']
    ret = letra[Math.trunc(i/5)]
    
    return ret+((i%5)+1)
}

function sorteiaCartas(){
    ret = []
    array = Array.from(Array(QUANTIDADE_CELULAS).keys())
    
    while(array.length > 0){
        array = array.sort(() => 0.5 - Math.random())
        a = array.pop(0)
        ret.push(a)
    }
    return ret
}

function retornaConteudoCarta(id){
    var index = conteudoCartas.indexOf(id)
    if(index < QUANTIDADE_BOMBAS)
        return 'bomba'
    else if (index < QUANTIDADE_NARVAL + QUANTIDADE_BOMBAS)
        return 'narval'
    return 'questao'
}

let conteudoCartas = sorteiaCartas()

constroiJogo()