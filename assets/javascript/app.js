// js for TriviaGame

// variables / objects
var questionTimer = 5;
var questionTimerRunning = false;
var questionIntervalID = null;

var answerTimer = 3;
var answerTimerRunning = false;
var answerIntervalID = null;

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
//document.getElementById("questionTimer").textContent = `Time remaining: ${questionTimer}`;


// i think i can delete this
//questionIntervalID = setInterval(decrementQT, 1000);


// should i make general start / stop timer functions and pass in a value for their countdown times?
// since the values will probably be different for question vs answer timing

// question timer functions - stop, decrement, start
function stopQT() {
    if (questionTimerRunning === true) {
        questionTimerRunning = false;
        clearInterval(questionIntervalID);
        questionTimer = 0;
        document.getElementById("questionTimer").textContent = `Time remaining: ${questionTimer}`;
    }
}

function decrementQT() {
    if (questionTimerRunning === true) {
        if (questionTimer === 0) {
            stopQT();
        }
        document.getElementById("questionTimer").textContent = `Time remaining: ${questionTimer}`;
        questionTimer--;
        
    }
    
}

function startQT() {
    if (questionTimerRunning === false) {
        questionTimerRunning = true;
        questionTimer = 5;
        document.getElementById("questionTimer").textContent = `Time remaining: ${questionTimer}`;
        questionIntervalID = setInterval(decrementQT, 500); // fast interval for testing only! change for submission!
    }
}


// answer timer functions
//
function stopAT() {
    if (answerTimerRunning === true) {    
        answerTimerRunning = false;
        clearInterval(answerIntervalID);
        answerTimer = 0;
        document.getElementById("questionTimer").textContent = `Next question in: ${answerTimer}`;
    }
}

function decrementAT() {
    if (answerTimerRunning === true) {
        if (answerTimer === 0) {
            stopAT();
        }
        document.getElementById("questionTimer").textContent = `Next question in: ${answerTimer}`;
        answerTimer--;
        console.log(answerTimer);
        
    }
    
}

function startAT() {
    if (answerTimerRunning === false) {
        answerTimerRunning = true;
        answerTimer = 3;
        document.getElementById("questionTimer").textContent = `Next question in: ${answerTimer}`;
        answerIntervalID = setInterval(decrementAT, 500); // fast interval for testing only! change for submission!
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
    stopAT()
    startQT()
    nthQuestion += 1;
    document.getElementById("questionCount").textContent = `Question ${nthQuestion} of ${questionsCount.length}`;
    
    if (nthQuestion === 1) {
        document.getElementById("triviaTextarea").textContent = questions.q1.text;
        document.getElementById("triviaChoices").innerHTML = `<p>${questions.q1.choices.correct}</p>
        <p>${questions.q1.choices.incorrect1}</p>`;

    }
    if (nthQuestion === 2) {
        document.getElementById("triviaTextarea").textContent = `Here is the second trivia question.`;
        document.getElementById("triviaChoices").textContent = `Possible answer for 2nd question.`;

    }
    // document.getElementById("triviaChoices").textContent = `Possible answer.`;

    setTimeout(showAnswer, 3200);


}
// targets & updates question text
// targets & updates answer choices

// function to display the correct answer for the previous question
//
function showAnswer() {
    // stop the questiontimer
    stopQT()
    // start countdown to next question
    startAT()

    
    // if the user selected the correct answer
    // display "good job!" along with additional info
    // decrement qUnanswered

    // else if the user selected an incorrect answer
    // display "incorrect,..." along with additional info
    // decrement qUnanswered

    // else if the user ran out of time
    // display "out of time" message along with correct answer & additional info

    

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
    setTimeout(lastQuestioncheck, 2500);
}

function displayUserStats() {
    stopAT()
    // clear out the other fields
    document.getElementById("questionCount").textContent = "";
    document.getElementById("questionTimer").textContent = "";
    document.getElementById("triviaTextarea").textContent = "Here's how you did!";
    document.getElementById("triviaChoices").textContent = "";

    // display the user stats
    document.getElementById("userResults").innerHTML = `<p>Correct answers: ${qCorrect}</p>
    <p>Incorrect answers: ${qIncorrect}</p>`;


    // button for gameresults page -- still need to code it to reset the game tho!
    document.getElementById("playAgain").style.display = "block";
}

triviaQuestion();
// on-click events for each answer choice