var showingSourceCode = false;
var isInEditMode = true;


function defaultContent(){
    orionTextField.document.getElementsByTagName('body')[0].textContent = 'Bắt đầu viết nội dung ở đây';
}

function orionFormatText(){
    let link = document.createElement("link");
    link.href = "./css/orionTextField.css";      /**** your CSS file ****/ 
    link.rel = "stylesheet"; 
    link.type = "text/css"; 
    frames[0].document.head.appendChild(link); /**** 0 is an index of your iframe ****/ 
}
async function enableEditMode(){
    await orionFormatText();
    await defaultContent();
    orionTextField.document.designMode = 'On';
}

function execCmd(command){
    orionTextField.document.execCommand(command, false, null);
}
function execCommandWithArg(command, arg) {
    orionTextField.document.execCommand(command, false, arg);
}
function toggleSource(){
    if(showingSourceCode){
        orionTextField.document.getElementsByTagName('body')[0].innerHTML = orionTextField.document.getElementsByTagName('body')[0].textContent;
        showingSourceCode = false;
    }
    else{
        orionTextField.document.getElementsByTagName('body')[0].textContent = orionTextField.document.getElementsByTagName('body')[0].innerHTML;
        showingSourceCode = true;
    }
}

function toggleEdit() {
    if (isInEditMode) {
        orionTextField.document.designMode = "Off"
        isInEditMode = false;
    } else{
        orionTextField.document.designMode = "On"
        isInEditMode = true;
    }
}

function sendData(){
    document.querySelector('.result').innerHTML = orionTextField.document.getElementsByTagName('body')[0].innerHTML;
}