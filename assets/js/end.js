//Collecting elements needed 
const username = document.querySelector('#username');
const saveScore = document.querySelector('#save-score');
const finalScore = document.querySelector('#final-score');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const resultMessage = document.querySelector('#result-message');

const highScores = JSON.parse(localStorage.getItem('high-scores')) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;
resultMessage.innerHTML = showResultMessage();

username.addEventListener("keyup", () => {
    saveScore.disabled = !username.value;
});

//Showing a message based off the end score

function showResultMessage() {
    if (mostRecentScore < 400) {
        return "enter text for bad";
    } else if (mostRecentScore >= 400 && mostRecentScore < 700) {
        return "enter text here for ok";
    } else if (mostRecentScore >= 700 && mostRecentScore <= 900) {
        return "enter text here for good";
    } else if (mostRecentScore === 1000) {
        return "enter text here for very good";
    }
}

//Saving scores for the leaderboard section
saveHighScore = e => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };

    highScores.push(score);

    highScores.sort((a,b) => {
        return b.score - a.score;
    });

    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    window.location.assign('/');
};

