// js for TriviaGame

// variables / objects
var questionTimer = 3;
var questionTimerRunning = false;
var nthQuestion = 0;



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

var qCorrect = 0; // initial value for # of Qs the user has answered correctly
var qIncorrect = 0; // initial value for # of Qs the user has answered incorrectly
var questionsCount = Object.keys(questions);
var qUnanswered = questionsCount.length; // initial value for # of Qs the user has not answered
console.log(qUnanswered);

console.log(questions.q1.text); // logs correctly "what color is the sky?"
console.log(questions.q1.choices.incorrect2); // logs correctly "checkerboard"



// timer at the top of the page
// gets reset on each new question
document.getElementById("questionTimer").textContent = `Time remaining: ${questionTimer}`;



questionIntervalID = setInterval(decrementQT, 1000);

// should i make general start / stop timer functions and pass in a value for their countdown times?
// since the values will probably be different for question vs answer timing

function stopQT() {
    questionTimerRunning = false;
    clearInterval(questionIntervalID);
    questionTimer = 3;
}

function decrementQT() {
    if (questionTimerRunning === true) {
        document.getElementById("questionTimer").textContent = `Time remaining: ${questionTimer}`;
        questionTimer--;
        if (questionTimer === 0) {
            stopQT();
        }
    }
    
}


// tiny TriviaGame:
    // one question, one answer choice, and timer
    // if the one answer is selected, you win
    // if time runs out, you lose

// likely functions:
//
// function to display a new question (initializing)

function triviaQuestion() {
    // starts the timer at X seconds
    questionTimer = 3;
    questionTimerRunning = true;
    setInterval(decrementQT, 1000);
    nthQuestion += 1;
    document.getElementById("questionCount").textContent = `Question ${nthQuestion} of ${questionsCount.length}`;
    document.getElementById("triviaTextarea").textContent = `Here is the trivia question.`;
    document.getElementById("triviaChoices").textContent = `Possible answer.`;

    setTimeout(showAnswer, 4000);


}
// targets & updates question text
// targets & updates answer choices

// function to display the correct answer for the previous question
//
function showAnswer() {
    // stop the timer
    stopQT()

    
    // if the user selected the correct answer
    // display "good job!" along with additional info
    // decrement qUnanswered

    // else if the user selected an incorrect answer
    // display "incorrect,..." along with additional info
    // decrement qUnanswered

    // else if the user ran out of time
    // display "out of time" message along with correct answer & additional info

    // start countdown to next question
    // leaving this here because we will change it into a separate answer timer function that will get called
    // within this showAnswer function
    questionTimer = 3;
    questionTimerRunning = true;
    setInterval(decrementQT, 1000);
    document.getElementById("questionTimer").textContent = `Next question in: ${questionTimer}`;


    // display the answer to the previous question -- should look different for correct vs incorrect response
    document.getElementById("questionCount").textContent = "";
    document.getElementById("triviaTextarea").textContent = `Here is the answer.`;
    document.getElementById("triviaChoices").textContent = "";

    // check if there aren't anymore questions to ask
    function lastQuestioncheck() {
        if (nthQuestion === questionsCount.length) {
            displayUserStats()
        } else {
            triviaQuestion()
        }
    }
    setTimeout(lastQuestioncheck, 4000);
}

function displayUserStats() {
    stopQT()

    // button for gameresults page -- still need to code it to reset the game tho!
    document.getElementById("playAgain").style.display = "block";
}

triviaQuestion();
// on-click events for each answer choice

