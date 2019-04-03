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
var outOftimeQuestion = null;
var outOftimeAnswer = null;

// trying to avoid running through the stats twice
// this seems to to solve it
var userStatsDisplayed = false;

// trivia questions object
// to do: 
var questions = {
    1: {
        text: "A lake has a patch of lily pads growing in it. The lily pad patch doubles in surface area every day. After 48 days, the lily pads have covered the entire surface of the lake. How long did it take them to cover half of the lake?",
        choices: {
            one: "24",
            two: "25",
            three: "46",
            four: "47",
            correct: "47"
        },
        result: null,
    },
    2: {
        text: "When someone you don't know well uses group pronouns (like 'we' or 'us') or implies you have a shared predicament, even though it isn't true, it's referred to as...",
        choices: {
            one: "typecasting",
            two: "forced teaming",
            three: "bikeshedding",
            four: "charm injection",
            correct: "forced teaming"
        },
        result: null,
    },
    3: {
        text: "The only 2020 Presidential candidate running on a platform of Universal Basic Income is...",
        choices: {
            one: "Andrew Yang",
            two: "Kamala Harris",
            three: "Bernie Sanders",
            four: "Elizabeth Warren",
            correct: "Andrew Yang"
        },
        result: null,
    },
    

};


var qCorrect = 0; // initial value for # of Qs the user has answered correctly
var qIncorrect = 0; // initial value for # of Qs the user has answered incorrectly
var questionsCount = Object.keys(questions);
var numberOfQuestions = questionsCount.length;
var qUnanswered = 0;
var correctAnswer = null;


// timer functions
//
// question timer functions - stop, decrement, start
//
function stopQT() {
    if (questionTimerRunning === true) {
        questionTimerRunning = false;
        clearInterval(questionIntervalID);
        questionTimer = 0;
    }
}

function decrementQT() {
    if (questionTimerRunning === true) {
        if (questionTimer === 0) {
            document.getElementById("questionTimer").textContent = `Time remaining: ${questionTimer}`;
            stopQT()
        } else {
        document.getElementById("questionTimer").textContent = `Time remaining: ${questionTimer}`;
        questionTimer--;
        }
    }
    
}

function startQT() {
    if (questionTimerRunning === false) {
        questionTimerRunning = true;
        questionTimer = 5;
        questionIntervalID = setInterval(decrementQT, 500); // fast interval for testing only! change for submission!
    }
}
//
//
// answer timer functions
//
function stopAT() {
    if (answerTimerRunning === true) {    
        answerTimerRunning = false;
        clearInterval(answerIntervalID);
        answerTimer = 0;
    }
}

function decrementAT() {
    if (answerTimerRunning === true) {
        if (answerTimer === 0) {
            document.getElementById("questionTimer").textContent = `Next question in: ${answerTimer}`;
            stopAT()
        } else {
        document.getElementById("questionTimer").textContent = `Next question in: ${answerTimer}`;
        answerTimer--;
        }
        //console.log(answerTimer);
        
    }
    
}

function startAT() {
    if (answerTimerRunning === false) {
        answerTimerRunning = true;
        answerTimer = 3;
        answerIntervalID = setInterval(decrementAT, 500); // fast interval for testing only! change for submission!
    }
}

// to do: arrange the remaining functions in a sensible order

// function to select answer (capture click)
function selectAnswer(event) {
    // if the player clicks one of the answer choices (given the class .possibleAnswer)
    // need to re-validate this
    if (event.target.matches(".possibleAnswer")) {
        document.querySelector("#container").removeEventListener("click", selectAnswer);
        //console.log(event.target.textContent);
        event.stopPropagation(selectAnswer);
        
        
        // stop the timers associated with the question
        stopQT()
        clearTimeout(outOftimeQuestion);
        
        //console.log(`you clicked an answer choice`);
        
        // need to remove the classes assigned to the p elements
        document.getElementById("triviaChoices").className = document.getElementById("triviaChoices").className.replace(/\bpossibleAnswer\b/g, "");

        // if the answer the player clicks is correct
        if (event.target.textContent === correctAnswer) {
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
    
}

// function to display a new question (initializing)
// to do: replace the bulk of selectAnswer code with a selectAnswer function call
function triviaQuestion() {
    // stops the answer timer
    stopAT()
    // starts the question timer & displays it (shifted the text display to here from timer fn)
    startQT()
    document.getElementById("questionTimer").textContent = `Time remaining: ${questionTimer}`;

    // increment the question so we display the correct content
    nthQuestion += 1;
    console.log(`${nthQuestion} of ${numberOfQuestions}`);
    // reset userCorrect from previous question response
    userCorrect = null;
    // display question number so user has an idea of their progress in the game
    document.getElementById("questionCount").innerHTML = `<p>Question ${nthQuestion} of ${numberOfQuestions}</p>`;
    // display question text
    document.getElementById("triviaTextarea").innerHTML = `<p>${questions[nthQuestion].text}</p>`;
    // assign classes to answer choices & display them
    document.getElementById("triviaChoices").innerHTML = 
    `<p class="possibleAnswer">${questions[nthQuestion].choices.one}</p>
    <p class="possibleAnswer">${questions[nthQuestion].choices.two}</p>
    <p class="possibleAnswer">${questions[nthQuestion].choices.three}</p>
    <p class="possibleAnswer">${questions[nthQuestion].choices.four}</p>`;
    // need to remove these classes (does clearing the innerHTML not remove the classes?)

    
    // assign the correct answer to a separate variable that won't get caught up in the click listener
    correctAnswer = questions[nthQuestion].choices.correct;

    // show the answer after a set time if the user does not select a response
    // 
    outOftimeQuestion = setTimeout(showAnswer, 3200);
    

    // add event listener for clicks in the container
    // need to remove the event listener after this function ends
    // need to assign this function a name so I can call it later when I remove event listener
    document.querySelector("#container").addEventListener("click", function selectAnswer(event) {
    
        // if the player clicks one of the answer choices (given the class .possibleAnswer)
        // need to re-validate this
        if (event.target.matches(".possibleAnswer")) {
            document.querySelector("#container").removeEventListener("click", selectAnswer);
            //console.log(event.target.textContent);
            event.stopPropagation(selectAnswer);
            
            
            // stop the timers associated with the question
            stopQT()
            clearTimeout(outOftimeQuestion);
            
            //console.log(`you clicked an answer choice`);
            
            // need to remove the classes assigned to the p elements
            document.getElementById("triviaChoices").className = document.getElementById("triviaChoices").className.replace(/\bpossibleAnswer\b/g, "");

            // if the answer the player clicks is correct
            if (event.target.textContent === correctAnswer) {
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

}

// check that there are still questions remaining to display
function checkIfNextQuestionExists() {
    clearTimeout(outOftimeAnswer);
    console.log(`checking nthQuestion: ${nthQuestion}`);
    if (nthQuestion < numberOfQuestions) {
        triviaQuestion()
    } else if (nthQuestion === numberOfQuestions && userStatsDisplayed === false) {
        userStatsDisplayed = true;
        displayUserStats()
    }
}   
// targets & updates question text
// targets & updates answer choices

// function to display the correct answer for the previous question
//
function showAnswer() {
    document.querySelector("#container").removeEventListener("click", selectAnswer);
    stopQT()
    clearTimeout(outOftimeQuestion);
    // debugging
    console.log(`showAnswer is running for target ${correctAnswer}`);
    console.log(userCorrect);
    // start countdown to next question & display it (shifted from timer fn)
    
    if (nthQuestion != numberOfQuestions) {
        startAT()
        // do i need this next line? yes the UX seems better with it
        document.getElementById("questionTimer").textContent = `Next question in: ${answerTimer}`;
    } else {
        document.getElementById("questionTimer").innerHTML = "";
    }

    document.getElementById("questionCount").innerHTML = "";
    document.getElementById("triviaChoices").innerHTML = "";

    
    // if the user selected the correct answer
    if (userCorrect === true) {
        // increment the number of questions they've answered correctly
        //qCorrect++;
        // decrement qUnanswered
        //qUnanswered--;
        // testing "result" property of questions object instead of qCorrect, qUnanswered counters
        questions[nthQuestion].result = true;

        // display "good job" / correct answer text
        document.getElementById("triviaTextarea").innerHTML =
        `<p>Good job! The answer is</p>
        <p>${correctAnswer}</p>`;
    }
    // else if the user selected an incorrect answer
    else if (userCorrect === false) {
        // increment the number of questions they've answered incorrectly
        // qIncorrect++;
        // decrement qUnanswered
        // qUnanswered--;
        //
        // testing "result" property of questions object instead of qCorrect, qUnanswered counters
        questions[nthQuestion].result = false;

        document.getElementById("triviaTextarea").innerHTML =
        `<p>Nope. The answer is</p>
        <p>${correctAnswer}</p>`;
    } else { 
    //the user ran out of time                       
    // display "out of time" message along with correct answer & additional info
        document.getElementById("triviaTextarea").innerHTML =
        `<p>Sorry, out of time. The answer is</p>
        <p>${correctAnswer}</p>`;
        // testing "result" property of questions object instead of qCorrect, qUnanswered counters
        questions[nthQuestion].result = null;
    }

    // wait a few seconds, then check to see if there's another question to display
    outOftimeAnswer = setTimeout(checkIfNextQuestionExists, 2500);
}

function resetVariables() {
    nthQuestion = 0;
    userCorrect = null;
    qCorrect = 0; // initial value for # of Qs the user has answered correctly
    qIncorrect = 0; // initial value for # of Qs the user has answered incorrectly
    questionsCount = Object.keys(questions);
    qUnanswered = 0;
    correctAnswer = null;
    userStatsDisplayed = false;
    clearInterval(questionIntervalID);
    clearInterval(answerIntervalID);
    clearTimeout(outOftimeQuestion);
    clearTimeout(outOftimeAnswer);
}

function clearPreviousResults() {
    for (i = 1; i < (numberOfQuestions + 1); i++) {
        console.log(`before: ${questions[i].result}`);
        questions[i].result = null;
        console.log(`after: ${questions[i].result}`);
    }
}

function resetGame() {
    clearPreviousResults()
    document.getElementById("triviaTextarea").innerHTML = "";
    document.getElementById("playAgain").style.display = "none";
    resetVariables()
    triviaQuestion()
}

// testing "result" property of questions object -- this is our tallier function to be run at the end of the game
function calculateUserStats() {
    
    console.log(`stats before generation: ${qCorrect}, ${qIncorrect}, ${qUnanswered}`);
    for (i = 1; i < (numberOfQuestions + 1); i++) {
        if (questions[i].result === true) {
            qCorrect++;
        } else if (questions[i].result === false) {
            qIncorrect++;
        } else if (questions[i].result === null) {
            qUnanswered++;
        }
        console.log(`stats generating: ${qCorrect}, ${qIncorrect}, ${qUnanswered}`);

    }
}

function displayUserStats() {
    
    calculateUserStats()
    
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

    
    // display button for gameresults page
    document.getElementById("playAgain").style.display = "block";
    
}

// start the game
triviaQuestion()