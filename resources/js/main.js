window.onload = gameStart;
var aceleracao = 1000;
var pausado = false;
var intervaloStart;
var intervaloContador;
var intervaloChao;
const contador = document.getElementById('contador');
var intervaloPrincipal = criarIntervaloPrincial();
var intervalo;
var intervaloSpawn;
var intervaloCactoTemp = [];
var cactosCriados = [];

const gerador = geradorDeObstaculos();
const colisao = criarColisaoListener();

function criarIntervaloPrincial() {
    let observers = [];

    function subscribe(observer) {
        observers.push(observer);
    }

    function notifyAll() {
        for(const observer of observers) {
            observer();
        }
    } 
    
    function iniciar() {
        return setInterval(() => {
            notifyAll();
        }, 1)
    }

    return {
        subscribe,
        iniciar
    }
}


gerador.subscribe(cacto => {
    colisao.colidiu(dino.prop.elemento, cacto);
})

colisao.subscribe(() => {
    gameOver();
})

function gameStart() {
    //intervaloStart = setInterval(iniciar, aceleracao);
    //intervaloChao = setInterval(moverChao, 0);
    moverTudo();
    intervaloContador = setInterval(iniciarContador, 100);
}

function moverTudo() {
    intervaloPrincipal.subscribe(() => {
        moverCactos();
        moverChao();
    })
    
    intervalo = intervaloPrincipal.iniciar();
    intervaloSpawn = setInterval(() => {
        cactosCriados.push(gerador.adicionarCacto());
    }, aceleracao);
}

function moverCactos() {
    for(let cacto of cactosCriados) {
        mover(cacto);
    }
}

function mover(cacto){
    let velocidade = 2; 

    let distanciaAtual = gerador.getDistanciaAtual(cacto);
    cacto.style.left = (distanciaAtual - velocidade) + 'px';
        
    gerador.notifyAll(cacto);
    if(distanciaAtual <= 0){
        cactosCriados.shift();
        removerCacto(cacto);
    }

}

function removerCacto(cacto){
    document.getElementsByTagName('body')[0].removeChild(cacto);
}

function iniciar(){
    if(!pausado){
        gerador.adicionarCacto();
    } else {
        gameOver();
    }
}

function moverChao(){
    /*var campo = document.getElementById('campo')
    var percentual = parseInt(campo.style.backgroundPositionX.replace('%','')) || 100;
    if(percentual == 0){
        campo.style.backgroundPositionX = "100%";
    } else {
        campo.style.backgroundPositionX = (percentual - 1) + "%";
    }*/

    let campo = document.getElementById('campo');
    let posicao = parseInt(campo.style.backgroundPositionX) 

    if(isNaN(posicao)) {
        posicao = getStyleFormatado(document.getElementsByTagName('body')[0], 'width');
    }

    if(posicao >= (getStyleFormatado(document.getElementsByTagName('body')[0], 'width') * -1)) {
        campo.style.backgroundPositionX = posicao - 2 + "px";
    } else {
        campo.style.backgroundPositionX = getStyle(document.getElementsByTagName('body')[0], 'width');
    }
}

function iniciarContador() {
    contador.innerHTML = parseInt(contador.innerHTML) + 1;
}

function gameOver() {
    limparIntervalos();
}

function limparIntervalos() {
    pararImagemDeFundo();
    clearInterval(intervaloPulo);
    gerador.intervalosObstaculos.forEach(i => clearInterval(i));
    clearInterval(intervaloStart);
    clearInterval(intervaloContador);
    clearInterval(intervaloChao);
    clearInterval(intervalo);
    clearInterval(intervaloSpawn);
    pausado = true;
}

function pararImagemDeFundo() {
    const fundo = document.getElementById('campo');
    const posicaoFinal = getComputedStyle(fundo).backgroundPositionX;

    fundo.classList.remove('animar');
    fundo.style.backgroundPositionX = posicaoFinal;
}
