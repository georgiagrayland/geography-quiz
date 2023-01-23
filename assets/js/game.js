//Collecting the elements needed 
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progress-bar-full');
const timer = document.getElementById("question-timer");


//Game variables
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
var timeLeft = 20;
var time = setInterval(setTimer, 1000);


//Setting questions
let questions = [
    {
        question: "What is the Capital City of the USA?",
        choice1: "New York City",
        choice2: "Washington D.C.",
        choice3: "Toronto",
        choice4: "Budapest",
        answer: 2,
    },
    {
        question: "Which is the largest Ocean on Earth?",
        choice1: "The Pacific Ocean",
        choice2: "The Atlantic Ocean",
        choice3: "The Southern Ocean",
        choice4: "The Indian Ocean",
        answer: 1,
    },
    {
        question: "Where are the Andes Mountains?",
        choice1: "Europe",
        choice2: "Australia",
        choice3: "Asia",
        choice4: "South America",
        answer: 4,
    },
    {
        question: "Which is the largest waterfall on Earth?",
        choice1: "Angel Falls",
        choice2: "Niagra Falls",
        choice3: "Victoria Falls",
        choice4: "Sutherland Falls",
        answer: 3,
    },
    {
        question: "What is the highest country (by elevation) in the world?",
        choice1: "Bhutan",
        choice2: "China",
        choice3: "Peru",
        choice4: "Switzerland",
        answer: 1,
    },
    {
        question: "Which is the second most populous country in the world?",
        choice1: "Russia",
        choice2: "India",
        choice3: "Brazil",
        choice4: "Germany",
        answer: 2,
    },
    {
        question: "Which sea separates Europe and Africa?",
        choice1: "The Baltic Sea",
        choice2: "The Dead Sea",
        choice3: "The North Sea",
        choice4: "The Mediterranean Sea",
        answer: 4,
    },
    {
        question: "What is Earth's approximate water to land ratio?",
        choice1: "71:29",
        choice2: "55:45",
        choice3: "42:58",
        choice4: "87:13",
        answer: 1,
    },
    {
        question: "Which country has the greatest number of international land borders?",
        choice1: "Indonesia",
        choice2: "France",
        choice3: "China",
        choice4: "Cameroon",
        answer: 3,
    },
    {
        question: "What is the oldest city on earth?",
        choice1: "London",
        choice2: "Rome",
        choice3: "Athens",
        choice4: "Damascus",
        answer: 4,
    }
];

//Const for points for each question and maximum questions per game 
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

/** Credit for some of this function from: Briancodex - quiz-app-js (on GitHub) */
/**Function to set the parameters at the start of the game and call first question */
function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    nextQuestion();
    setTimer();
}

function setTimer(){
    document.getElementById('question-timer').innerHTML = timeLeft;
    timeLeft--;
    if (timeLeft == -1) {
        clearInterval(time)
        timer.innerHTML = "Time is Up!";
    }
}

/** Credit for majority of NextQuestion Function: taken from Briancodex - quiz-app-js (on GitHub) */
/**Looping through questions list and incrementing progress */

function nextQuestion(){
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('./end.html');
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset.number;
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset.number;
        
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        // Increment score on correct answer 
        // Show message depending on question answered and if answered correct or not 
        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
            question.innerHTML = "Correct answer, well done!";
            question.classList.add("question");
            setTimeout(function(){
            }, 6000);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            nextQuestion();
            clearTimeout(timer);
            timeLeft = 20;
        }, 1000);
    });
});

/**Credit for the structure and writing of this function: Taken from Briancodex - quiz-app-js (on GitHub) */
/**Incrementing score*/
function incrementScore (num) {
    score +=num;
    scoreText.innerText = score;
}


startGame();


