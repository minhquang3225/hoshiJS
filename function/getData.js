// import { getEle, getEles } from '../function/global.js'

export function getData(path) {
    return fetch(path)
            .then(response => {
                //catch error in response
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then(json => { return json })
            .catch(error => {
                console.log("error", error);
            });
}