
//Collecting elements 
const highScoresList = document.querySelector('#high-scores-list');
const highScores = JSON.parse(localStorage.getItem('high-scores')) || [];

//Adding list item for name and scores leaderboard
highScoresList.innerHTML = highScores.map(score => {
    return ` <li class="high-score">${score.name} - ${score.score}</li>`;
}).join('');