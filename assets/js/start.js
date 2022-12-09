
//Showing the rules on click on the button on homepage
const rulesList = document.getElementById('rules');
    rulesList.addEventListener('click', function(){
   document.getElementById("show-rules").innerHTML = `<p id="clicked-rules">There will be 10 questions to answer. <br>The color will show if you have answered correct or not. 
    <br> You will be told your final score at the end of the game.</p>`;
})