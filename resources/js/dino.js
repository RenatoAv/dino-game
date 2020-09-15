let intervaloPulo;

function criarDinossauro() {
    let observers = [];
    const dinoHTML = document.getElementById('dino');
    const alturaInicial = 490;
    const alturaMaxima = alturaInicial - 120;
    const alturaAtual = alturaMaxima;

    let prop = {
        elemento: dinoHTML,
        alturaInicial,
        alturaMaxima,
        alturaAtual,
        velocidadePulo: 3,
        variadorVelocidade: 1.1,
        emAcao: false
    }
    
    function subscribe(observer) {
        observers.push(observer);
    }

    function notifyAll() {
        for(const observer of observers) {
            observer();
        }
    }

    async function pular(event){
        mudarEmAcao(true);
        let res = await subir();
        await descer(res);
        notifyAll();
    }
    
    function subir(){
        var velocidadeAtual = prop.velocidadePulo;

        return new Promise(resolve => {
            intervaloPulo = setInterval(() => {
                prop.alturaAtual = getAlturaAtualDoPulo(prop.elemento);

                if(prop.alturaAtual > prop.alturaMaxima){
                    velocidadeAtual = calcularVelocidadeSubida(prop.alturaAtual, velocidadeAtual);
                    prop.elemento.style.top = (prop.alturaAtual - velocidadeAtual) + 'px';
                } else {
                    clearInterval(intervaloPulo);
                    resolve(velocidadeAtual);
                }
            }, 1)
        })		
    }
    
    function descer(velocidadeAtual){
        return new Promise(resolve => {
            intervaloPulo = setInterval(() => {
                prop.alturaAtual = getAlturaAtualDoPulo(prop.elemento);	
                
                if(prop.alturaInicial > prop.alturaAtual){
                    velocidadeAtual = calcularVelocidadeDescida(prop.alturaAtual, velocidadeAtual);
                    prop.elemento.style.top = (prop.alturaAtual + velocidadeAtual) + 'px';
                } else {
                    clearInterval(intervaloPulo);
                    resolve();
                }
            }, 1)
        })	
    }

    return {
        prop,
        subscribe,
        pular
    }
}

function getAlturaAtualDoPulo(elemento) {
    return getStyleFormatado(elemento, 'top');
}	

function calcularVelocidadeSubida(alturaAtual, velocidadeAtual){
    return alturaAtual <= 410 ? velocidadeAtual / dino.prop.variadorVelocidade : velocidadeAtual;
}

function calcularVelocidadeDescida(alturaAtual, velocidadeAtual){
    let alturaFinal = alturaAtual <= 420 ? velocidadeAtual * dino.prop.variadorVelocidade : velocidadeAtual;
    return Math.min(alturaFinal, dino.prop.velocidadePulo);
}

function mudarEmAcao(valor) {
    dino.prop.emAcao = valor;
}

const dino = criarDinossauro();
dino.subscribe(() => {
    mudarEmAcao(false)
});

document.onkeydown = (event) => {
    if(event.key == 'ArrowUp') {
        if(!dino.prop.emAcao && !pausado) {
            dino.pular();
        }
    }
}
