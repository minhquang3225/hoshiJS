async function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /*loop through a collection of all HTML elements:*/
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("insert");
        if (file) {
            /*make an HTTP request using the attribute value as the file name:*/
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /*remove the attribute, and call this function once more:*/
                    elmnt.removeAttribute("insert");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /*exit the function:*/
            return;
        }
    }
};
includeHTML();



getEle = (ele) => {
    return document.querySelector(ele);
}

getEles = (ele) => {
    return document.querySelectorAll(ele);
}


//Back to top

if (getEle('.scrollTop') != null) {
    window.addEventListener('scroll', () => {
        getEle('.scrollTop').classList.toggle('active', window.scrollY > 500)   //Có điều kiện trong toggle
    })
}

scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    })
}

//Tạo dữ liệu mẫu
let data = {
    
}

function makeClone(className, numData, times) {
    let origin = document.querySelector(className);   
    // console.log(origin) 
    let parentE = origin.parentElement;
    // console.log(parentE);
    let finalContent = '';
    let content = ''

    let makeContent = () => {
        for (let i = 0; i < numData; i++) {
            // console.log(content);
            
            content += changeOrigin(origin, parentE, i).outerHTML;
        }
        return content;

    }

    for (let i = 0; i < times; i++) {
        finalContent += makeContent();
    }

    parentE.innerHTML = finalContent;
};

function changeOrigin(origin, parentE, i) {
    // console.log(origin);
    
    let childOrigin = origin;
    // console.log(childOrigin);
    
    dataElements = parentE.querySelectorAll("[data-set^=data]");
    // console.log(dataElements);

    dataElements.forEach(e => {
        let E_data_set = e.getAttribute('data-set');
        let E_data_props = e.getAttribute('data-props');
        
        switch (E_data_props) {
            case 'text':
                // console.log(data[E_data_set][i]);
                let textNode = e.childNodes[0];
                textNode.nodeValue = data[E_data_set][i];
                // console.log(textNode);
                
                break;

            case 'src':
                e.src = data[E_data_set][i]
                break;
            case 'link':
                e.href = data[E_data_set][i];
                break;
            case 'linkText':
                e.href = data[E_data_set][i];
                let linkTextNode = e.childNodes[0];
                linkTextNode.nodeValue = data[E_data_set][i];
                break;
            case 'data-src':
                e.setAttribute("data-src", data[E_data_set][i]);
                let srcNode = e.childNodes[0];
                srcNode.nodeValue = data[E_data_set][i];
                break;
        }
        
    })
    
    origin.innerHTML = childOrigin.innerHTML;
    return origin;
}

