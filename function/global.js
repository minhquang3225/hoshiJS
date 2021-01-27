export const getEle = (eleName, eleNode) => {
    if (eleNode) {
        return eleNode.querySelector(eleName);
    }
    return document.querySelector(eleName);
}

export const getEles = (eleName, eleNode) => {
    if (eleNode) {
        return eleNode.querySelectorAll(eleName);
    }
    return document.querySelectorAll(eleName);
}