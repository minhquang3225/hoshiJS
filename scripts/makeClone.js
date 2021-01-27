import { makeClone } from "../function/makeClone.js"
import { getData } from "../function/getData.js"


(async () => {
    let data = await getData("../data/data.json");
    await makeClone([
        {
            className: '.anime-list__item',
            numClone: 3,
            loopTimes: 1,
            // levelData: 1,
        },
        {
            className: '.detail-list__item',
            numClone: 3,
            loopTimes: 1,
            // levelData: 1,
        },
        {
            className: '.avatar-list__item',
            numClone: 3,
            loopTimes: 1,
            // levelData: 2,
        },
    ], data)
}).call(this);





