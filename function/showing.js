import { getEle, getEles } from "./global.js";

const showingJS = () => {
   
    getEles('[data-toggle*=showing]').forEach(btn => {
        let showingModeArr = btn.dataset.showingModes.split(' ');
        let targetArr = btn.dataset.targets.split(', ')
        let relpLevel = parseInt(btn.dataset.relpLevel);
        let eventArr = btn.dataset.events ? btn.dataset.events.split(' ') : ['click']; 
        let isArr = (eventArr.length > 1)?true:false;

        for (const eventInx in eventArr) {
            let event = eventArr[eventInx]?eventArr[eventInx]:'click';
            btn.addEventListener(event, () => {
                for (let targetInx in targetArr) {
                    let inx = isArr?eventInx:targetInx
                    let mode = showingModeArr[inx]
                    let targetNodeArr = getEles(targetArr[inx])

                    targetNodeArr.forEach(targetNode => {
                        relpLevel &&
                            // targetEle = btn;
                            (() => {
                                for (let t = 0; t < relpLevel; t++) {
                                    targetNode = targetNode.parentElement;
                                }
                            }).call(this);

                        // targetEle = getEle(targetEleName, targetEle)

                        switch (mode) {
                            case 'toggle':
                                targetNode.classList.toggle('hide');
                                break;
                            case 'show':
                                
                                targetNode.classList.remove('hide');
                                break;

                            case 'hide':
                                console.log(event);
                                targetNode.classList.add('hide');
                                break;
                            default:
                                console.log("Không có mode");

                                break
                        }
                    })
                    if (isArr) {
                        break;
                    }
                }
            })
        }
    })
}

showingJS();

