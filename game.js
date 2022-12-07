const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progress-bar-full');

let currentQuestion = {}
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {//question 1
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
    {
        question: "What is the capital city of the USA?",
        choice1: "New York City",
        choice2: "Washington D.C.",
        choice3: "Toronto",
        choice4: "Budapest",
        answer: 2,
    },
    {
        question: "What is the capital city of the USA?",
        choice1: "New York City",
        choice2: "Washington D.C.",
        choice3: "Toronto",
        choice4: "Budapest",
        answer: 2,
    },
    {//question 10 
        question: "What is the capital city of the USA?",
        choice1: "New York City",
        choice2: "Washington D.C.",
        choice3: "Toronto",
        choice4: "Budapest",
        answer: 2,
    },
]