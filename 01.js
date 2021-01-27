const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

//search states.json and filter it
const searchStates = async searchText => {
    const res = await fetch('json/01.json');
    const states = await res.json();
    console.log(states);

    //Get matches to current text input
    let matches = states.filter(state => {
        const regex = new RegExp(`${searchText}`, 'i');
        if (state.name.match(regex) != null || state.code.match(regex) != null) {
            return state.name.match(regex) || state.code.match(regex);
        }
        else {
            matchList.innerHTML = 'Không có giá trị phù hợp';
        }
    });
    if (searchText.length == 0) {
        matches = [];
        matchList.innerHTML = '';
    }
    console.log(matches);
    outputHTML(matches);

    //Bold String chỉnh sửa html
    const BoldString = (node, find) => {
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

    //this is just pulling the test HTML from above
    var oldTexts = document.querySelectorAll(".top-result");
    //calls boldString() function and passes in the old-text content and looks for the string "ch"
    oldTexts.forEach(oldText => {

        BoldString(oldText, searchText);
        // //this is just for this example, but updates the new-text element with the result of the function
        // oldText.innerHTML = result;
    })
};

// Show result
const outputHTML = matches => {
    if (matches.length > 0) {
        const html = matches.slice(0, 5).map(match => `                                          
            <a href="https://www.youtube.com" class="card card-body mb-1 result">
                <h4 class="top-result">${match.name} (${match.code}) <span class="text-primary"> 
                    ${match.name_with_type}
                </span></h4>
            </a>
        `)
            .join('');         //slice để chỉ lấy 5 giá trị, join là giữa 2 kết quả sẽ có cái gì

        matchList.innerHTML = html;

        let results = document.querySelectorAll('.result');
        let index = -1;                                                        //Chuyển index về 0 nếu muốn dòng đầu tiên được chọn
        // if (results.length != 0) {                                          //Nếu muốn dòng đầu tiên được lựa chon
        //     results[index].classList.add('active');
        // }
        document.addEventListener('keydown', function () {
            if (event.keyCode == 38) {
                index--;
                if (index <= -1) {
                    index = results.length - 1;
                }
                results.forEach(result => { result.classList.remove('active'); })
                results[index].classList.add('active');
                // searchInput.value = results[index].textContent;
            }
            if (event.keyCode == 40) {
                index++;
                if (index == results.length) {
                    index = 0;
                }
                results.forEach(result => { result.classList.remove('active'); })
                results[index].classList.add('active');
                // searchInput.value = results[index].textContent;
            }
            if (event.keyCode == 13) {
                document.querySelector('.active').click();
            }


        })

    }
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

// //Xử lí hiện tượng di chuyển trỏ chuột khi nhấn arrown up and down
// var ignoreKey = false;
// var handler = function (e) {
//     if (e.keyCode == 38 || e.keyCode == 40) {
//         var pos = this.selectionStart;
//         console.log(e)
//         this.value = (e.keyCode == 38 ? 1 : -1) + parseInt(this.value, 10);
//         this.selectionStart = pos; this.selectionEnd = pos;

//         ignoreKey = true; setTimeout(function () { ignoreKey = false }, 1);
//         e.preventDefault();
//     }
// };

// document.addEventListener('keydown', handler, false);
// document.addEventListener('keypress', handler, false);

search.addEventListener('input', () => {
    // console.log(search.value)
    searchStates(search.value)
});


