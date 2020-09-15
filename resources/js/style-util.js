function extrairValorPixel(valorPixel) {
    return parseInt(valorPixel.replace('px',''));
}

function getStyle(elem, attr) {
    return elem.style[attr] ? elem.style[attr] : getComputedStyle(elem)[attr];
}

function getStyleFormatado(elem, attr){
    return extrairValorPixel(getStyle(elem, attr));
}