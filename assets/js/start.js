// Wrap every letter in a span
var textWrapper = document.querySelector('.ml6 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

//Animation for Title Text
// Credit for animation: Tobias Ahlin Moving letters - https://tobiasahlin.com/moving-letters/*/
anime.timeline({loop: true})
  .add({
    targets: '.ml6 .letter',
    translateY: ["1.5em", 0],
    translateZ: 0,
    duration: 750,
    delay: (el, i) => 50 * i
  }).add({
    targets: '.ml6',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });


//Showing the rules on click on the button on homepage
const rulesList = document.getElementById('rules');
    rulesList.addEventListener('click', function(){
   document.getElementById("show-rules").innerHTML = `<p id="clicked-rules">There will be 10 questions to answer. <br>There is a timer to see how fast you can complete the quiz. <br>The color will show if you have answered correct or not. 
    <br> You will be told your final score at the end of the game.</p>`;
});

