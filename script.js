// Elementy interfejsu użytkownika
const squares = document.querySelectorAll(".square");
const modeButtons = document.querySelectorAll(".mode");
const colorDisplay = document.querySelector("#colorDisplay");
const messageDisplay = document.querySelector("#message");
const h1 = document.querySelector("h1");
const resetButton = document.querySelector("#reset");

let numSquares = 6;
let colors = [];
let pickedColor = "";

// Inicjalizacja gry
function init() {
    setupModeButtons();
    setupSquares();
    reset();
}

// Inicjalizacja trybów gry
function setupModeButtons() {
    modeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            modeButtons.forEach((btn) => btn.classList.remove("selected"));
            button.classList.add("selected");
            numSquares = button.textContent === "Easy" ? 3 : 6;
            reset();
        });
    });
}

// Inicjalizacja kwadratów
function setupSquares() {
    squares.forEach((square) => {
        square.addEventListener("click", () => {
            const clickedColor = square.style.backgroundColor;
            if (clickedColor === pickedColor) {
                messageDisplay.innerText = "Correct!";
                resetButton.textContent = "Play Again?";
                changeColors(clickedColor);
                h1.style.background = clickedColor;
            } else {
                square.style.background = "#232323";
                messageDisplay.innerText = "Try Again";
            }
        });
    });
}

// Funkcja resetująca grę
function reset() {
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";

    squares.forEach((square, index) => {
        if (colors[index]) {
            square.style.display = "block";
            square.style.background = colors[index];
        } else {
            square.style.display = "none";
        }
    });

    h1.style.background = "steelblue";
}

// Funkcja zmieniająca kolory kwadratów
function changeColors(color) {
    squares.forEach((square) => {
        square.style.background = color;
    });
}

// Funkcja losująca kolor
function pickColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

// Funkcja generująca losowe kolory
function generateRandomColors(num) {
    const arr = [];

    for (let i = 0; i < num; i++) {
        arr.push(randomColor());
    }

    return arr;
}

// Funkcja generująca losowy kolor RGB
function randomColor() {
    //pick a "red" from 0 - 255
    const r = Math.floor(Math.random() * 256);
    //pick a "green" from 0 - 255
    const g = Math.floor(Math.random() * 256);
    //pick a "blue" from 0 - 255
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g}, ${b})`;
}

// Inicjalizacja gry po załadowaniu strony
window.addEventListener("load", init);

// Nasłuchiwanie kliknięcia na przycisk reset
resetButton.addEventListener("click", reset);