// js for TriviaGame

// variables / objects
// should i make an object for the set of questions?
// for example

var questions = {
    q1: {
        text: "what color is the sky?",
        choices: {
            correct: "blue",
            incorrect1: "tentative",
            incorrect2: "checkerboard",
            incorrect3: "candied yams"
        }
    },
    q2: {
        text: "what do they say the moon is made of?",
        choices: {
            correct: "cheese",
            incorrect1: "beans",
            incorrect2: "backgammon",
            incorrect3: "thermometer"
        }
    },
};

console.log(questions.q1.text); // logs correctly "what color is the sky?"
console.log(questions.q1.choices.incorrect2); // logs correctly "checkerboard"



// timer at the top of the page
// gets reset on each new question

// tiny TriviaGame:
    // one question, one answer choice, and timer
    // if the one answer is selected, you win
    // if time runs out, you lose

// likely functions:
//
// function to display a new question (initializing)
// starts the timer at X seconds
// targets & updates question text
// targets & updates answer choices

// function to display the correct answer for the previous question
//

// on-click events for each answer choice