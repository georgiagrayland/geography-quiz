//Collecting the elements needed 
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progress-bar-full');

//Game variables
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];


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
    {//question 5
        question: "What is the highest country (by elevation) in the world?",
        choice1: "Bhutan",
        choice2: "China",
        choice3: "Peru",
        choice4: "Switzerland",
        answer: 1,
    },
    {//question 6 
        question: "Which is the second most populous country in the world?",
        choice1: "Russia",
        choice2: "India",
        choice3: "Brazil",
        choice4: "Germany",
        answer: 2,
    },
    {//question 7
        question: "Which sea separates Europe and Africa?",
        choice1: "The Baltic Sea",
        choice2: "The Dead Sea",
        choice3: "The North Sea",
        choice4: "The Mediterranean Sea",
        answer: 4,
    },
    {//q8
        question: "What is Earth's approximate water to land ratio?",
        choice1: "71:29",
        choice2: "55:45",
        choice3: "42:58",
        choice4: "87:13",
        answer: 1,
    },
    {//q9
        question: "Which country has the greatest number of international land borders?",
        choice1: "Indonesia",
        choice2: "France",
        choice3: "China",
        choice4: "Cameroon",
        answer: 3,
    },
    {//question 10 
        question: "What is the oldest city on earth?",
        choice1: "London",
        choice2: "Rome",
        choice3: "Athens",
        choice4: "Damascus",
        answer: 4,
    }
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;


//Set the parameters at the start of the game
function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}


//Looping through questions list and incrementing progress 
function getNewQuestion() {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('/end.html');
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        
        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});


//Incrementing score
function incrementScore (num) {
    score +=num;
    scoreText.innerText = score;
};

startGame();