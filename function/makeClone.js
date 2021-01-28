//makeClone v2.0
//Chỉ support tối đa 3 cấp
import { getEle, getEles } from "./global.js";

export const makeClone = (DataObjArr, data) => {

    DataObjArr.forEach((obj) => {
        let originNodes = getEles(obj.className);
        originNodes.forEach(originNode => {
            let parentNode = originNode.parentElement;            //Nơi chứa cụm bản sao
            let levelData = obj.levelData ? obj.levelData : 1;
            let finalHTML = '';

            // cloneHTML = cloneOrigin(originNode, parentNode, obj.numClone)
            for (let cloneInx = 0; cloneInx < obj.numClone; cloneInx++) {
                let cloneNode = originNode.cloneNode(true)
                let filterElements = getEles("[data-sets]", cloneNode);
                let bindingElements = getEles("[data-binding]", cloneNode);
                // console.log(bindingElements);
    
    
                filterElements.forEach(filterElement => {
                    let data_set_arr = filterElement.getAttribute('data-sets') ? filterElement.getAttribute('data-sets').split(' ') : [];
                    let data_prop_arr = filterElement.getAttribute('data-props') ? filterElement.getAttribute('data-props').split(' ') : [];
                    let isRemoveData = true;
                   
                    for (const i in data_set_arr) {
                        let data_set = data_set_arr[i];
                        let data_prop = data_prop_arr[i]
                        
                        switch (data_prop) {
                            case 'text':
                                let textNode = filterElement.childNodes[0];
    
                                textNode.nodeValue = data[data_set][cloneInx];
                                break;
    
                            case 'src':
                                filterElement.src = data[data_set][cloneInx]
                                break;
                            case 'link':
                                filterElement.href = data[data_set][cloneInx];
                                break;
                            case 'linkText':
                                filterElement.href = data[data_set][cloneInx];
                                let linkTextNode = filterElement.childNodes[0];
                                linkTextNode.nodeValue = data[data_set][cloneInx];
                                break;
                            case 'data-src':
                                filterElement.setAttribute("data-src", data[data_set][cloneInx]);
                                let srcNode = filterElement.childNodes[0];
                                srcNode.nodeValue = data[data_set][cloneInx];
                                break;
                            case 'class':
                                for (let i in data[data_set].length) {
                                    data[data_set][i] && filterElement.classList.remove(data[data_set][i]);
                                }
                                data[data_set][cloneInx] && filterElement.classList.add(data[data_set][cloneInx])
                                break;
                            case 'binding':
                                let bindingArr = data[data_set][cloneInx].split(', ');
                                filterElement.setAttribute('data-sets', bindingArr[0]);
                                filterElement.setAttribute('data-props', bindingArr[1]);
                                isRemoveData = false;
                                break;
                            default:
                                filterElement.setAttribute(data_prop, data[data_set][cloneInx])
                                break;
                        }
                    }
    
                    isRemoveData && (()=>{
                        filterElement.removeAttribute('data-props')
                        filterElement.removeAttribute('data-sets')
                    }).call(this)
                    
    
                })
                // console.log(bindingElements);
                bindingElements &&
                    bindingElements.forEach(bindingElement => {
    
                        console.log(bindingElement.getAttribute('data-binding'));
    
                        let dataValue = data[bindingElement.getAttribute('data-binding')][cloneInx] ? data[bindingElement.getAttribute('data-binding')][cloneInx].split(', ') : [];
                        let dataNames = dataValue[0];
                        let dataProps = dataValue[1];
    
                        bindingElement.removeAttribute('data-binding');
                        bindingElement.setAttribute('data-props', dataProps);
                        bindingElement.setAttribute('data-sets', dataNames);
    
                    })
    
                parentNode.appendChild(cloneNode)
            }
    
            parentNode.removeChild(originNode)
            for (let i = 0; i < obj.loopTimes; i++) {
                finalHTML += parentNode.innerHTML;
            }
            parentNode.innerHTML = finalHTML;

        })
    })
}