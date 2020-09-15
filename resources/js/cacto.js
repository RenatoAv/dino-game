function geradorDeObstaculos() {
    let intervalosObstaculos = [];
    let observers = [];

    function subscribe(observer) {
        observers.push(observer);
    }

    function notifyAll(colidiu) {
        for(const observer of observers) {
            observer(colidiu);
        }
    }
    
    function novoCacto() {
        let cacto = document.createElement('div');
        let pedra = document.createElement('div');
        cacto.classList.add('cacto');
        pedra.classList.add('pedra');
        cacto.appendChild(pedra);
        return cacto;
    }
    
    function getDistanciaAtual(elem){
        return getStyleFormatado(elem, 'left');
    }
    
    function adicionarCacto(){
       const cacto = exibir(novoCacto());
       //mover(cacto);
       return cacto;
    }
    
    function exibir(elem){
        return document.getElementsByTagName('body')[0].appendChild(elem);
    }
    
    function removerCacto(cacto){
        document.getElementsByTagName('body')[0].removeChild(cacto);
    }
    
    function mover(cacto){
        let velocidade = 2; 

        let intervaloCacto = setInterval(() => {
            let distanciaAtual = getDistanciaAtual(cacto);
            cacto.style.left = (distanciaAtual - velocidade) + 'px';
            
            notifyAll(cacto);
            if(distanciaAtual <= 0){
                clearInterval(intervaloCacto);
                intervalosObstaculos
                removerCacto(cacto);
            }
        }, 0);
    
        intervalosObstaculos.push(intervaloCacto);
    }

    return {
        subscribe,
        adicionarCacto,
        getDistanciaAtual,
        notifyAll,
        removerCacto,
        intervalosObstaculos
    }
}

