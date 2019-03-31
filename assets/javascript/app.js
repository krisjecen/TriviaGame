// js for TriviaGame

// add a window.onload function around everything

// variables / objects
var questionTimer = 5;
var questionTimerRunning = false;
var questionIntervalID = null;

var answerTimer = 3;
var answerTimerRunning = false;
var answerIntervalID = null;

var nthQuestion = 0;
var userCorrect = null;


// TO DO: make a good structure for our questions
//        assign class to correct answer only?
var questions = {
    1: {
        text: "what color is the sky?",
        choices: {
            one: "blue",
            two: "tentative",
            three: "checkerboard",
            four: "candied yams",
            correct: "blue"
        }
    },
    2: {
        text: "what do they say the moon is made of?",
        choices: {
            one: "cheese",
            two: "beans",
            three: "backgammon",
            four: "thermometer",
            correct: "cheese"
        }
    },
    3: {
        text: "why are dry erase markers dry?",
        choices: {
            one: "God",
            two: "they asked nicely",
            three: "their solvent is not water",
            four: "the grapes ripened perfectly",
            correct: "their solvent is not water"
        }
    },
    

};

// delete later
// console.log(questionNumbers[nthQuestion]);

var qCorrect = 0; // initial value for # of Qs the user has answered correctly
var qIncorrect = 0; // initial value for # of Qs the user has answered incorrectly
var questionsCount = Object.keys(questions);
var qUnanswered = questionsCount.length; // initial value for # of Qs the user has not answered
console.log(qUnanswered);
var correctAnswer = null;


// timer at the top of the page
// gets reset on each new question


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
            stopQT()
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
            stopAT()
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

// function to display a new question (initializing)

function triviaQuestion() {
    // stops the answer timer
    stopAT()
    // starts the question timer
    startQT()
    // increment the question so we display the correct content
    nthQuestion += 1;
    // display question number so user has an idea of their progress in the game
    document.getElementById("questionCount").textContent = `Question ${nthQuestion} of ${questionsCount.length}`;
    // display question text
    document.getElementById("triviaTextarea").textContent = questions[nthQuestion].text;
    // assign classes to answer choices & display them
    document.getElementById("triviaChoices").innerHTML = 
    `<p class="possibleAnswer">${questions[nthQuestion].choices.one}</p>
    <p class="possibleAnswer">${questions[nthQuestion].choices.two}</p>
    <p class="possibleAnswer">${questions[nthQuestion].choices.three}</p>
    <p class="possibleAnswer">${questions[nthQuestion].choices.four}</p>`;
    // need to remove these classes (does clearing the innerHTML not remove the classes?)
    
    // assign the correct answer to a separate variable that won't get caught up in the click listener
    correctAnswer = questions[nthQuestion].choices.correct;

    // add event listener for clicks in the container
    // need to remove the event listener after this function ends
    // need to assign this function a name so I can call it later when I remove event listener
    document.querySelector("#container").addEventListener("click", function(event) {
        // if the player clicks one of the answer choices (given the class .possibleAnswer)
        // need to re-validate this
        if (event.target.matches(".possibleAnswer")) {
            console.log(`you clicked an answer choice`);
            // decrement qUnanswered
            qUnanswered--;
            // need to remove the classes assigned to the p elements

            // if the answer the player clicks is correct
            if (event.target.textContent === questions[nthQuestion].choices.correct) {
                console.log(`you clicked ${correctAnswer}`);
                // assign true to userCorrect, which will be used in showAnswer
                userCorrect = true;
                
                // immediately show the answer instead of waiting for time to run out
                showAnswer()
            } else {
                // assign false to userCorrect, which will be used in showAnswer
                userCorrect = false;
                
                // immediately show the answer instead of waiting for time to run out
                showAnswer()
            }
        }
        
    });
    // show the answer after a set time if the user does not select a response
    setTimeout(showAnswer, 3200);


}

// check if there aren't anymore questions to ask
function lastQuestioncheck() {
    if (nthQuestion === questionsCount.length) {
        displayUserStats()
    } else {
        triviaQuestion()
    }
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

    document.getElementById("questionCount").innerHTML = "";
    document.getElementById("triviaChoices").innerHTML = "";

    
    // if the user selected the correct answer
    if (userCorrect) {
        // increment the number of questions they've answered correctly
        qCorrect++;
        // display "good job" / correct answer text
        document.getElementById("triviaTextarea").innerHTML =
        `<p>Good job! The answer was</p>
        <p>${correctAnswer}</p>`;
    }
    // display "good job!" along with additional info

    // else if the user selected an incorrect answer
    else if (userCorrect === false) {
        // increment the number of questions they've answered incorrectly
        qIncorrect++;
        //
        document.getElementById("triviaTextarea").innerHTML =
        `<p>Nope. The answer was</p>
        <p>${correctAnswer}</p>`;
    } else {                        //the user ran out of time
    // display "out of time" message along with correct answer & additional info
        document.getElementById("triviaTextarea").innerHTML =
        `<p>Sorry, out of time. The answer was</p>
        <p>${correctAnswer}</p>`;
    }

    // wait a few seconds, then check to see if the question just asked was the last question
    // in the questions object    
    setTimeout(lastQuestioncheck, 2500);
}

function resetGamedata() {
    nthQuestion = 0;
    userCorrect = null;
    qCorrect = 0; // initial value for # of Qs the user has answered correctly
    qIncorrect = 0; // initial value for # of Qs the user has answered incorrectly
    questionsCount = Object.keys(questions);
    qUnanswered = questionsCount.length; // initial value for # of Qs the user has not answered
    correctAnswer = null;
    clearInterval(questionIntervalID);
    clearInterval(answerIntervalID);
}

function displayUserStats() {
    // stop the answerTimer
    stopAT()
    // reset the question counter
    // clear out the other fields
    document.getElementById("questionCount").innerHTML = "";
    document.getElementById("questionTimer").innerHTML = "";
    document.getElementById("triviaChoices").innerHTML = "";

    // display the user stats
    document.getElementById("triviaTextarea").innerHTML = `<p>Here's how you did!</><p>Correct answers: ${qCorrect}</p>
    <p>Incorrect answers: ${qIncorrect}</p><p>Unanswered questions: ${qUnanswered}</p>`;

    // reset the game data
    resetGamedata()
    // display button for gameresults page
    document.getElementById("playAgain").style.display = "block";
    
}

triviaQuestion();
// on-click events for each answer choice