// import { makeClone } from "../function/makeClone.js"
import {getData} from "../function/getData.js"


let getDataValue= async ()=>{
    let data = await getData('../data/data.json');
    console.log(data);
}

getDataValue();





// makeClone([
//     {
//         className: '.anime-list__item',
//         numClone: 6,
//         loopTimes: 1,
//         // levelData: 1,
//     },
//     {
//         className: '.detail-list__item',
//         numClone: 3,
//         loopTimes: 1,
//         levelData: 2,
//     },
// ])