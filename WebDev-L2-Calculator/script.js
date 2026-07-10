const display = document.getElementById("display");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const decimalButton = document.querySelector(".decimal");
const equalButton = document.querySelector(".equal");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");

let current = "";
let previous = "";
let operator = "";

// Number buttons
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        current += button.textContent;
        display.value = previous + operator + current;
    });
});

// Decimal button
decimalButton.addEventListener("click", () => {
    if (!current.includes(".")) {
        if (current === "") current = "0";
        current += ".";
        display.value = previous + operator + current;
    }
});

// Operator buttons
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {

        if (current === "" && previous === "") return;

        if (previous !== "" && current !== "") {
            calculate();
        }

        operator = button.textContent;
        previous = current;
        current = "";

        display.value = previous + operator;
    });
});

// Equal button
equalButton.addEventListener("click", () => {
    if (previous !== "" && current !== "") {
        calculate();
        operator = "";
    }
});

// Clear button
clearButton.addEventListener("click", () => {
    current = "";
    previous = "";
    operator = "";
    display.value = "";
});

// Delete button
deleteButton.addEventListener("click", () => {
    if (current !== "") {
        current = current.slice(0, -1);
        display.value = previous + operator + current;
    }
});

function calculate() {

    let num1 = parseFloat(previous);
    let num2 = parseFloat(current);
    let result;

    switch (operator) {

        case "+":
            result = num1 + num2;
            break;

        case "-":
            result = num1 - num2;
            break;

        case "×":
            result = num1 * num2;
            break;

        case "÷":
            if (num2 === 0) {
                display.value = "Error";
                current = "";
                previous = "";
                operator = "";
                return;
            }
            result = num1 / num2;
            break;

        default:
            return;
    }

    display.value = result;
    current = result.toString();
    previous = "";
}
