const btn = document.querySelectorAll(".button");
const scrInput = document.querySelector(".header>input:first-child");
const scrResult = document.querySelector(".header>input:last-child");
const ac = document.querySelector(".ac");
const del = document.querySelector(".del");
const div = document.querySelector(".div");
const equal = document.querySelector(".lbtn");
const operation = document.querySelectorAll(".gorcoxutyun");
const point = document.querySelector(".point");


btn.forEach((button)=>{
    button.addEventListener("click", handleClick);
})

document.addEventListener('keydown', handleKeyDown);

function handleKeyDown(event){
    const key = event.key;
    let value;
    const isNumber = /[0-9]/.test(key);

    if(isNumber){
        handleAction(key);
        return;
    }

    switch(key){
        case 'Enter': value = '='; break;
        case 'Backspace': value = 'AC'; break;
        case '+': value = '+'; break;
        case '-': value = '-'; break;
        case '*': value = '*'; break;
        case '/': value = '/'; break;
        case '.': value = '.'; break;
        default : return;
    }

    handleAction(value);
}

function handleClick(event){
    handleAction(event.target.innerText);
}

function handleAction(event){
    let innerText = event;

    if(scrInput.value == 0){
        scrInput.value = innerText;
    }
    else{
        scrInput.value += innerText;
    }

    let screenInnerText = scrInput.value;

    const operatorIndex = screenInnerText.search(/[+\-x\/\%]/);

    const isOperator = Number.isNaN(+innerText);

    if (operatorIndex !== -1 && operatorIndex !== screenInnerText.length - 1 && isOperator) {

        const operator = screenInnerText[operatorIndex];
        const expArr = screenInnerText.slice(0, screenInnerText.length - 1).split(operator);

        if (innerText === '=') {
            innerText = '';
        }
        calculate(operator, expArr, innerText);
        return;
    }
    
}

function calculate(operator, expression, innerText) {
    let result = 0;
    
    switch (operator) {
        case '+': result = +expression[0] + +expression[1] + innerText; break;
        case '-': result = +expression[0] - +expression[1] + innerText; break;
        case 'x': result = +expression[0] * +expression[1] + innerText; break;
        case '/': result = +expression[0] / +expression[1] + innerText; break;
        case '%': result = +expression[0] % +expression[1] + innerText; break;
    }
    if(scrInput.value.includes("=")){
        scrInput.value = innerText;
    }
    scrResult.value = `= ${result}`;
}

operation.forEach((op)=>{
    op.addEventListener("click", operat);
})

function operat(event){
    if(scrInput.value == 0 || scrInput.value == "" || scrInput.value.search(/[+\-x\/\%]/) >= 1){
        return;
    }
    else{
        let innerText = event.target.innerText;
        if(scrInput.value == 0){
            scrInput.value = innerText;
        }
        else{
            scrInput.value += innerText;
        }
    }
    
}

// equal.onclick = ()=>{
//     if(scrInput.value == 0 || scrInput.value == ""){
//         return;
//     }
//     else{
//         // scrInput.value += "="
//     }
// }

del.onclick = ()=>{
    let length = scrInput.value.length;
    scrInput.value = scrInput.value.substring(0, length - 1);
}

ac.onclick = ()=>{
    scrInput.value = "";
    scrResult.value = "";
}

point.onclick = ()=>{
    let a = scrInput.value.search(/[.\\]/);
    console.log(a);
    if(scrInput.value.search(/[.\\]/) >= 1){
        let b = a.split(".");
        if(b[0] == "." || b[1] == "."){
            return;
        }
        else{
            if(scrInput.value == 0 || scrInput.value == ""){
                return;
            }
            else{
                scrInput.value += "."
            }
        }
    }
    else{
        if(scrInput.value == 0 || scrInput.value == ""){
            return;
        }
        else{
            scrInput.value += "."
        }
    }
}

div.onclick = ()=>{
    if(scrInput.value == 0 || scrInput.value == "" || scrInput.value.search(/[+\-x\/\%]/) >= 1){
        return;
    }
    else{
        scrInput.value += "/"
    }
    
}

