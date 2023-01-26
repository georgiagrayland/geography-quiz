
//Collecting elements needed 
const username = document.querySelector('#username');
const saveScore = document.querySelector('#save-score');
const finalScore = document.querySelector('#final-score');
const mostRecentScore = localStorage.getItem('mostRecentScore');
const resultMessage = document.querySelector('#result-message');
const timeSpentNumber = localStorage.getItem('timeSpentNumber');
//let timeSpent = JSON.parse("timeSpentNumber");
let elapsedTime = document.getElementById("time-spent");

const highScores = JSON.parse(localStorage.getItem('high-scores')) || [];


finalScore.innerText = mostRecentScore;
elapsedTime.innerText = timeSpentNumber;
resultMessage.innerHTML = showResultMessage();

username.addEventListener("keyup", () => {
    saveScore.disabled = !username.value;
});

/**Showing a message based off the user's end score*/

function showResultMessage() {
    if (mostRecentScore < 400) {
        return "Too bad, go and find your encyclopedia!";
    } else if (mostRecentScore >= 400 && mostRecentScore < 700) {
        return "Good try, although you could definitely do better";
    } else if (mostRecentScore >= 700 && mostRecentScore <= 900) {
        return "Above average, you have good knowledge but aren't a geography genius yet!";
    } else if (mostRecentScore == 1000) {
        return "Incredible, you really know your important geography knowledge";
    }
}

/**Saving scores for the leaderboard section*/
/** Credit for code for saving high scores: taken from Brian Design Tutorial
 * Source of Youtube tutorial: https://github.com/briancodex/quiz-app-js  */

//The saveHighScore variable is called in the html of the end page
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

    localStorage.setItem('high-scores', JSON.stringify(highScores));
    window.location.assign('./index.html');
};

