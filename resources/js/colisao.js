function criarColisaoListener() {
    let observers = [];

    function subscribe(observer) {
        observers.push(observer);
    }

    function notifyAll() {
        for(const observer of observers) {
            observer();
        }
    }
    
    function colidiu(elem, obstaculo) {
        const elemIniX = getStyleFormatado(elem, 'left')
        const elemFinX = elemIniX + getStyleFormatado(elem, 'width');
        const elemIniY = getStyleFormatado(elem, 'top')
        const elemFinY = elemIniY + getStyleFormatado(elem, 'height');
        const obstaculoIniX = getStyleFormatado(obstaculo, 'left');
        const obstaculoFinX = obstaculoIniX + getStyleFormatado(obstaculo, 'width');
        const obstaculoIniY = getStyleFormatado(obstaculo, 'top');
        const obstaculoFinY = obstaculoIniY + getStyleFormatado(obstaculo, 'height');
    
        const colidiu = (validarEixo(elemIniX, elemFinX, obstaculoIniX, obstaculoFinX) &&
                        validarEixo(elemIniY, elemFinY, obstaculoIniY, obstaculoFinY)) ||
                        (validarEixo(obstaculoIniX, obstaculoFinX, elemIniX, elemFinX) &&
                        validarEixo(obstaculoIniY, obstaculoFinY, elemIniY, elemFinY));

        if(colidiu) notifyAll();
    }
    
    function validarEixo(aIni, aFin, bIni, bFin) {
        return (aIni >= bIni && aIni <= bFin) ||
               (aFin >= bIni && aFin <= bFin);
    }

    return {
        subscribe,
        colidiu
    }
}


