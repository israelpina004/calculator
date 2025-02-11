const container = document.getElementById('container');
const display = document.getElementById('display');
const controls = document.getElementById('controls');
const digits = document.getElementById('digits');
const operators = document.getElementById('operators');

display.textContent = '0';
let firstNum = '';
let secondNum = '';
let currentOperator = '';
let clear = true;
let addFirstNum = true;
let result = '';

function updateDisplay(value) {
    if(clear) {
        display.textContent = '';
        display.textContent += value;
        clear = false;
    }
    else {
        display.textContent += value;
    }
    if(addFirstNum) {
        firstNum += value;
    }
    else {
        secondNum += value;
    }
}

function clearDisplay() {
    display.textContent = '0';
    firstNum = '';
    secondNum = '';
    currentOperator = '';
    result = '';
    clear = true;
}

function createButtons() {
    for(let i = 1; i < 10; i++) {
        const button = document.createElement('button');
        button.textContent = `${i}`;
        button.addEventListener('click', ()=> updateDisplay(i));
        digits.appendChild(button);
    }

    const zeroButton = document.createElement('button');
    zeroButton.textContent = '0';
    zeroButton.addEventListener('click', ()=> updateDisplay('0'));
    digits.appendChild(zeroButton);

    const clearButton = document.createElement('button');
    clearButton.textContent = 'C';
    clearButton.addEventListener('click', clearDisplay);
    digits.appendChild(clearButton);
}

function createOperators() {
    const operatorSymbols = ['+', '-', 'x', '÷', '='];
    operatorSymbols.forEach(symbol => {
        const button = document.createElement('button');
        button.textContent = symbol;
        button.addEventListener('click', ()=> handleOperator(symbol));
        operators.appendChild(button);
    });
}

function handleOperator(operator) {
    clear = true;
    if(operator === '=') {
        res = String(operate(parseFloat(firstNum), currentOperator, parseFloat(secondNum)));
        display.textContent = res;
        firstNum = '';
        secondNum = '';
        currentOperator = '';
        result = '';
        addFirstNum = true;
    }
    else {
        addFirstNum = false;
        if(currentOperator && secondNum) {
            res = String(operate(parseFloat(firstNum), currentOperator, parseFloat(secondNum)));
            display.textContent = res
            firstNum = res;
            secondNum = '';
            currentOperator = operator;
            result = res;
        }
        else {
            currentOperator = operator;
        }
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return 'Error';
    }
    return a / b;
}

function operate(a, operator, b) {
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
        default:
            return;
    }
}

createButtons();
createOperators();