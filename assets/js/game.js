//Collecting the elements needed 
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const gameContainer = document.querySelector("#conatiner");


//Game variables
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let timeSpent;


//Setting questions
let questions = [
    {
        question: "What is the Capital City of the USA?",
        choice1: "New York City",
        choice2: "Washington D.C.",
        choice3: "Toronto",
        choice4: "Budapest",
        answer: 2,
        message: "Incorrect! Washington D.C is the Capital",
    },
    {
        question: "Which is the largest Ocean on Earth?",
        choice1: "The Pacific Ocean",
        choice2: "The Atlantic Ocean",
        choice3: "The Southern Ocean",
        choice4: "The Indian Ocean",
        answer: 1,
        message: "Wrong answer! The Pacific is the largest, covering more than 30% of the Earth's surface",
    },
    {
        question: "Where are the Andes Mountains?",
        choice1: "Europe",
        choice2: "Australia",
        choice3: "Asia",
        choice4: "South America",
        answer: 4,
        message: "No! The Andes are on the West coast of South America",
    }, 
    {
        question: "Which is the largest waterfall on Earth?",
        choice1: "Angel Falls",
        choice2: "Niagra Falls",
        choice3: "Victoria Falls",
        choice4: "Sutherland Falls",
        answer: 3,
        message: "Incorrect, Victoria Falls in Southern Africa is the largest!",
    },
    {
        question: "What is the highest country (by elevation) in the world?",
        choice1: "Bhutan",
        choice2: "China",
        choice3: "Peru",
        choice4: "Switzerland",
        answer: 1,
        message: "Unlucky, Bhutan is the highest, at 8,000m above sea level"
    },
    {
        question: "Which is the second most populous country in the world?",
        choice1: "Russia",
        choice2: "India",
        choice3: "Brazil",
        choice4: "Germany",
        answer: 2,
        message: "Wrong! India is the answer, with a population of 1.4 billion"
    },
    {
        question: "Which sea separates Europe and Africa?",
        choice1: "The Baltic Sea",
        choice2: "The Dead Sea",
        choice3: "The North Sea",
        choice4: "The Mediterranean Sea",
        answer: 4,
        message: "Incorrect! The Mediterranean is between Europe and Africa"
    },
    {
        question: "What is Earth's approximate water to land ratio?",
        choice1: "71:29",
        choice2: "55:45",
        choice3: "42:58",
        choice4: "87:13",
        answer: 1,
        message: "No! 71% of Earth is covered by water, so the answer is 71:29"
    },
    {
        question: "Which country has the greatest number of international land borders?",
        choice1: "Indonesia",
        choice2: "France",
        choice3: "China",
        choice4: "Cameroon",
        answer: 3,
        message: "Difficult one! China has the greatest, having borders with 14 other countries"
    },
    {
        question: "What is the oldest city on earth?",
        choice1: "London",
        choice2: "Rome",
        choice3: "Athens",
        choice4: "Damascus",
        answer: 4,
        message: "Incorrect, Damascus is the oldest. The ancient city was founded in the 3rd Millennium B.C. "
    }
];

//Const for points for each question and maximum questions per game 
const SCORE_POINTS = 10;
const MAX_QUESTIONS = 10;

/** Credit for some of this function from: Brian Design YouTube Tutorial- 
 * GitHub Source for the YouTube tutorial: https://github.com/briancodex/quiz-app-js
/**Function to set the parameters at the start of the game and call first question */
function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    nextQuestion();
    setTimer();
}

/** Sets timer for the quiz
 * Overall time taken for the quiz displayed to user at end
 * Useful if playing with friends so can compare times
 * Credit for idea and structure of the timer: Madalin on Codepen https://codepen.io/madalin_
 */
function setTimer(){
    let timer = document.getElementById('timer');
    let s = 0;
    let m = 0;
    let h = 0;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    
    quizTimer = setInterval(function() {
        s++;

        if (s > 59) {
            s = 0;
            m++;
            seconds = "0" + s;
          };

          if (m > 59) {
            m = 0;
            h++;
            minutes = "00";
          };
        
          seconds = s > 9 ? s : "0" + s;
          minutes = m > 9 ? m : "0" + m;
          hours = h > 9 ? h : "0" + h;

          timeSpent = h 
            ? hours + ":" + minutes + ":" + seconds
            : minutes + ":" + seconds;
          timer.textContent = timeSpent;
          timeSpentNumber = JSON.stringify(timeSpent);
          localStorage.setItem("timeSpent", timeSpentNumber);
        }, 1000);
}


/** Credit for first part of NextQuestion Function: taken from Brian Design YouTube tutorial - 
 * GitHub Source for the YouTube tutorial: https://github.com/briancodex/quiz-app-js
/**Looping through questions list and incrementing progress */

function nextQuestion(){
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('./end.html');
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} / ${MAX_QUESTIONS}`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;
    question.style.color = "";

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

        // Show message depending on question answered
        //Tells user correct answer if answered incorrectly
        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
            question.innerHTML = "Correct answer, well done!";
            question.style.color = "green";
            question.classList.add("question-correct");
            setTimeout(function(){
            }, 6000);
        }
        if(classToApply !== 'correct') {
            question.innerText = currentQuestion.message;
            question.classList.add("question-incorrect");
            question.style.color = 'red';
            setTimeout(function(){
            }, 6000);
        };

        selectedChoice.parentElement.classList.add(classToApply);
        
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            nextQuestion();
        }, 1000); // Make this 5 seconds for better UX 
        });
    });
    
/**Credit for the structure and writing of this function: Taken from Briancodex YouTube tutorial- 
 * GitHub Source for the YouTube tutorial: https://github.com/briancodex/quiz-app-js
*/
/**Incrementing score*/
function incrementScore (num) {
    score +=num;
    scoreText.innerText = score;
}


startGame();


