import { getEle, getEles } from "../function/global.js";

export default function makeClone() {

    const makeClone = (DataObjArr) => {
        DataObjArr.forEach((obj) => {
            let origins = document.querySelectorAll(obj.className);
            origins.forEach(origin => {
                let parentOrigin = origin.parentElement;            //Nơi chứa cụm bản sao
                let levelData = obj.levelData ? obj.levelData : 1;
                let content = ''                               //Cụm bản sao sau khi copy ra
                let finalContent = '';

                for (let numClone = 0; numClone < obj.numClone; numClone++) {
                    content += changeOrigin(origin, parentOrigin, numClone, levelData).outerHTML;
                }
                for (let i = 0; i < obj.loopTimes; i++) {
                    finalContent += content;
                }
                parentOrigin.innerHTML = finalContent;

            })
        })
    };
    const changeOrigin = (origin, parentOrigin, numClone, levelData) => {
        switch (levelData) {
            case 1:
                dataElements = parentOrigin.querySelectorAll("[data-sets^=data]");
                dataBindings = parentOrigin.querySelectorAll("[data-binding]");
                break;
            case 2:
                dataElements = parentOrigin.querySelectorAll("[data-sets^=lv2-data]");
                break;
            case 3:
                dataElements = parentOrigin.querySelectorAll("[data-sets^=lv3-data]");
                break;
        }
        dataElements.forEach(dataElement => {
            let E_data_sets = dataElement.getAttribute('data-sets') ? dataElement.getAttribute('data-sets').split(' ') : [];
            let E_data_props = dataElement.getAttribute('data-props') ? dataElement.getAttribute('data-props').split(' ') : [];

            for (const i in E_data_sets) {
                let E_data_set = E_data_sets[i];
                let E_data_prop = E_data_props[i];

                switch (E_data_prop) {
                    case 'text':
                        let textNode = dataElement.childNodes[0];

                        textNode.nodeValue = data[E_data_set][numClone];
                        break;

                    case 'src':
                        dataElement.src = data[E_data_set][numClone]
                        break;
                    case 'link':
                        dataElement.href = data[E_data_set][numClone];
                        break;
                    case 'linkText':
                        dataElement.href = data[E_data_set][numClone];
                        let linkTextNode = dataElement.childNodes[0];
                        linkTextNode.nodeValue = data[E_data_set][numClone];
                        break;
                    case 'data-src':
                        dataElement.setAttribute("data-src", data[E_data_set][numClone]);
                        let srcNode = dataElement.childNodes[0];
                        srcNode.nodeValue = data[E_data_set][numClone];
                        break;
                    default:
                        dataElement.setAttribute(E_data_prop, data[E_data_set][numClone])
                        break;
                }
            }


        })
        dataBindings.forEach(dataBinding => {
            dataValue = data[dataBinding.getAttribute('data-binding')][numClone] ? data[dataBinding.getAttribute('data-binding')][numClone].split(', ') : [];
            dataNames = dataValue[0];
            dataProps = dataValue[1];

            dataBinding.setAttribute('data-props', dataProps);
            dataBinding.setAttribute('data-sets', dataNames);
        })
        return origin;
    }
}