// Wait until the DOM has loaded before running the game
// Get the button elements, and add event listeners to them

document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer();
            } else {
                let gameType = this.getAttribute("data-type");
                runGame(gameType);
            }
        });
    }

    document.getElementById("answer-box").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    })

    runGame("addition");

});

// The main game "loop", called when the script is first loaded
// and after the user's answer has been processed

function runGame(gameType) {

    document.getElementById("answer-box").value = "";
    document.getElementById("answer-box").focus();

    // Creates two numbers with a value of between 1 and 25
    let add1 = Math.floor(Math.random() * 25) + 1;
    let add2 = Math.floor(Math.random() * 25) + 1;

    let time1 = Math.floor(Math.random() * 12) +1;
    let time2 = Math.floor(Math.random() * 12) +1;

    let sub1 = Math.floor(Math.random() * 25) +1;
    let sub2 = Math.floor(Math.random() * 25) +1;

    let div1 = Math.floor(Math.random() * 12) +1;
    let div2 = Math.floor(Math.random() * 12) +1;

    // Selects and displays the question depending on the gameType
    // which we set when we called the function

    if (gameType === "addition") {
        displayAdditionQuestion(add1, add2);
    } else if (gameType === "multiply"){
        displayMultiplyQuestion(time1, time2)
    } else if (gameType === "subtract") {
        displaySubtractQuestion(sub1, sub2)
    } else if (gameType === "division") {
        displayDivisionQuestion(div1, div2)
    } else {
        alert(`Unknown game type: ${gameType}`);
        throw `Unknown game type ${gameType}, aborting`;
    }

}

// Called when the user clicks the Submit button or presses Enter

function checkAnswer() {

    let userAnswer = parseInt(document.getElementById("answer-box").value);
    let calculatedAnswer = calculateRightAnswer(); // calculatedAnswer is an array
    let isCorrect = userAnswer === calculatedAnswer[0]; // isCorrect has a true or false value

    if (isCorrect) {
        alert("Hey! You got it right :D");
        incrementScore();
    }
    else {
        alert(`Awww...you answered ${userAnswer}, the correct answer was ${calculatedAnswer[0]} :(`);
        incrementWrongAnswer();
    }

    runGame(calculatedAnswer[1]);
}

function calculateRightAnswer() {

    // Gets the operands (the numbers) and the operator (plus, minus sign etc.)
    // directly from the DOM

    let operand1 = parseInt(document.getElementById("operand1").innerText);
    let operand2 = parseInt(document.getElementById("operand2").innerText);
    let operator = document.getElementById("operator").innerText;

    if (operator === "+") { // This is the addition game
        return [operand1 + operand2, "addition"]; // return an array containing the correct answer and game type
    } else if (operator === "x") {
        return [operand1 * operand2, "multiply"];
    } else if (operator === "-") {
        return [operand1 - operand2, "subtract"];
    } else if (operator === "/") {
        return [operand1 / operand2, "division"]
    } else {
        alert(`Unimplemented operator: ${operator}`);
        throw `Unimplemented operator ${operator}, aborting`;
    }

    
}

function incrementScore() {

    let correct = parseInt(document.getElementById('score').innerText);
    document.getElementById("score").innerText = ++correct;

}

function incrementWrongAnswer() {

    let incorrect = parseInt(document.getElementById("incorrect").innerText);
    document.getElementById("incorrect").innerText = ++incorrect;

}

// Displays the questions.

function displayAdditionQuestion(operand1, operand2) {

    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "+";
}

function displaySubtractQuestion(operand1, operand2) {

    document.getElementById("operand1").textContent = operand1 > operand2 ? operand1 : operand2;
    document.getElementById("operand2").textContent = operand1 > operand2 ? operand2 : operand1;
    document.getElementById("operator").textContent = "-";

}

function displayMultiplyQuestion(operand1, operand2) {

    document.getElementById("operand1").textContent = operand1; 
    document.getElementById("operand2").textContent = operand2;
    document.getElementById("operator").textContent = "x";

}

function displayDivisionQuestion(operand1, operand2) {
    operand1 = operand1 * operand2;

    document.getElementById("operand1").textContent = operand1;
    document.getElementById("operand2").textContent = operand2
    document.getElementById("operator").textContent = "/";

}