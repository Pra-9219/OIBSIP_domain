const display = document.getElementById("display");
const historyEl = document.getElementById("history");
const buttons = document.querySelectorAll(".btn, .operator");
const clearBtn = document.getElementById("clear");
const equalsBtn = document.getElementById("equals");
const plusMinusBtn = document.getElementById("plusMinus");
const funcButtons = document.querySelectorAll(".func-btn");
const themeToggle = document.getElementById("themeToggle");

let currentInput = "";
let lastResult = "";
let memory = 0;

function updateDisplay() {
    display.value = currentInput || "0";
    historyEl.textContent = lastResult;
}


buttons.forEach(button => {
    button.addEventListener("click", () => {
        currentInput += button.getAttribute("data-value");
        updateDisplay();
    });
});


clearBtn.addEventListener("click", () => {
    currentInput = "";
    lastResult = "";
    updateDisplay();
});


equalsBtn.addEventListener("click", () => {
    try {
        lastResult = currentInput + " =";
        currentInput = eval(currentInput).toString();
        updateDisplay();
    } catch {
        display.value = "Error";
        currentInput = "";
    }
});

plusMinusBtn.addEventListener("click", () => {
    if (currentInput) {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay();
    }
});


funcButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const action = btn.getAttribute("data-action");
        if (action === "%") {
            currentInput = (parseFloat(currentInput) / 100).toString();
        } else if (action === "sqrt") {
            currentInput = Math.sqrt(parseFloat(currentInput)).toString();
        } else if (action === "MC") {
            memory = 0;
        } else if (action === "MR") {
            currentInput += memory.toString();
        } else if (action === "M+") {
            memory += parseFloat(currentInput) || 0;
        } else if (action === "M-") {
            memory -= parseFloat(currentInput) || 0;
        }
        updateDisplay();
    });
});


themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

updateDisplay();
