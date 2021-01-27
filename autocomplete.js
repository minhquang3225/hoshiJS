//Mục tiêu: Lấy giá trị của  phần chọn vào ô input
//Biến phần input trở thành only uncapital

const searchInput = document.getElementById('search');
const matchList = document.getElementById('match-list');


//Bắt đầu
search.addEventListener('input', () => {
    // console.log(searchInput.value)
    SearchFn(searchInput.value);
    // SearchFn(EscapeRegExp(searchInput.value));   //Dành cho không lọc data chứa (. * ())

})

function setLocalStorage(data, localName) {
    localStorage.setItem(localName,
        JSON.stringify(data)
    )
}

function getLocalStorage(localName) {
    if (localStorage.getItem(localName) != null) {
        mangTraVe = JSON.parse(
            localStorage.getItem(localName)
        );
        return mangTraVe;
    }
    //Viết code ở đây VD như:
    //hienThi(mangTraVe);
}

// const EscapeRegExp = (str)=> {
//     return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
// }

//Hàm sử dụng

const SearchFn = async searchText => {
    let data;
    if (getLocalStorage("localData")) {
        data = getLocalStorage("localData");
    }
    else {
        data = await GetData();
        
    }
    // console.log(data);
    let matches = data.results.filter(item => {
        const regex = new RegExp(`${searchText}`, 'i');
        //Điều kiện đúng
        if (item.name.match(regex) || item.code.match(regex) || item.capital.match(regex)) {
            return item.name.match(regex) || item.code.match(regex) || item.capital.match(regex)
        }
        else {
            matchList.innerHTML = 'Không có giá trị phù hợp'
        }

    })
    if (searchText.length == 0) {
        matches = [];
        matchList.innerHTML = '';
    }
    OutputHTML(matches);

    let oldTexts = document.querySelectorAll(".top-result");
    oldTexts.forEach(oldText => {
        BoldString(oldText, searchText)
    })
}

const GetData = () => {
    const where = encodeURIComponent(JSON.stringify({
        "name": {
            "$exists": true
        }
    }));
    const options = {
        method: 'GET',
        url: `https://parseapi.back4app.com/classes/Country?count=1&limit=1000&excludeKeys=currency,shape&where=${where}`,
        headers: {
            'X-Parse-Application-Id': 'mxsebv4KoWIGkRntXwyzg6c6DhKWQuit8Ry9sHja', // This is the fake app's application id
            'X-Parse-Master-Key': 'TpO0j3lG2PmEVMXlKYQACoOXKQrL3lwM0HwR9dbH', // This is the fake app's readonly master key
        }
    };

    const data = axios.request(options).then(function (response) {
        // console.log(response.data);
        setLocalStorage(response.data, "localData")
        return response.data;
    }).catch(function (error) {
        console.error(error);
    });

    return data;
}

const OutputHTML = matches => {
    // console.log(matches);

    const htmlEle = matches.slice(0, 6).map(match => `
        <a href="https://www.youtube.com" class="card card-body mb-1 result" data-value="${match.name} (${match.code})  ${match.capital}" data-id="${match.objectId}">
            <h4 class="top-result">${match.name} (${match.code}) <span class="text-primary"> 
                ${match.capital}
            </span></h4>
        </a>
    `).join('');

    matchList.innerHTML = htmlEle;
    let results = document.querySelectorAll('.result');
    let index = -1;

    searchInput.addEventListener('keydown', function () {
        if (event.keyCode == 38) {
            index--;
            if (index <= -1) {
                index = results.length - 1;
            }
            results.forEach(result => { result.classList.remove('active'); })
            results[index].classList.add('active');
        }
        if (event.keyCode == 40) {
            index++;
            if (index == results.length) {
                index = 0;
            }
            results.forEach(result => { result.classList.remove('active'); })
            results[index].classList.add('active');
        }
        if (event.keyCode == 13) {
            document.querySelector('.active').click();
        }
    })
}

const BoldString = (node, find) => {
    // let textNodes = node.childNodes;
    // let str = "";
    // for (i = 0; i < textNodes.length; i++) {
    //     str += textNodes[i].textContent;
    // }

    // let re = new RegExp(find, 'gi');  //Chỉnh sửa regular expression đê chỉ lấy nội dung trong các tag mà ko lấy tag
    // return str.replaceAll(re,  '<b>' + find + '</b>');
    let textNode = node.parentElement.querySelectorAll('*');
    textNode.forEach(node => {
        console.log(node.childNodes);
        matchText(
            node.childNodes,
            new RegExp(find, "gi"),
            function (node, match, offset) {
                var span = document.createElement("span");
                span.className = "search-term";
                span.textContent = match;
                return span;
            }
        );
    })
}
const matchText = (node, regex, callback, excludeElements) => {
    excludeElements ||
        (excludeElements = ["script", "style", "iframe", "canvas"]);

    var child = node[0];
    // console.log(node)

    while (child) {
        switch (child.nodeType) {
            // case 1:
            //   if (excludeElements.indexOf(child.tagName.toLowerCase()) > -1) break;
            //   matchText(child, regex, callback, excludeElements);
            //   break;
            case 3:
                // console.log(child);
                var bk = 0;
                child.data.replace(regex, function (all) {
                    var args = [].slice.call(arguments),
                        offset = args[args.length - 2],
                        newTextNode = child.splitText(offset + bk),
                        tag;
                    bk -= child.data.length + all.length;

                    newTextNode.data = newTextNode.data.substr(all.length);
                    tag = callback.apply(window, [child].concat(args));
                    child.parentNode.insertBefore(tag, newTextNode);
                    child = newTextNode;
                });
                regex.lastIndex = 0;
                // console.log(node[0]);
                break;
        }

        child = child.nextSibling;
    }

    return node;
};
