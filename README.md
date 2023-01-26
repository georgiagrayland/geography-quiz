# Geography Quiz

This quiz is designed to test geography knowledge. There are 10 questions of varying difficulty, and once an answer has been selected, the colour of the answer bar will change to green if the correct answer has been chosen and red if an incorrect option has been selected. A message will appear to inform the user of the correct answer and its context if they answered incorrectly. There is also a timer and a score counter so players can compare these with others. A high scores leaderboard is also available to see the top 5 scores.

![Responsive Screens](/assets/images/responsive.png) CHANGE THIS

The live link can be found here: https://georgiagrayland.github.io/geography-quiz/

------

## User Experience

### User Goals
- As a user, I want to know the rules and parameters of the quiz game. 
- As a user, I want to know what the game is about.
- As a user, I want to access the game easily.
- As a user, I want to easily navigate through the game site and see all components even on the first visit.
- As a user, I want to be able to see my result and time after completing the quiz.
- As a user, I want to be able to enter the high scores leaderboard by entering my name once seeing my result.

### Site Owner Goals
- As a site owner, I want to build an intuitive, fun, and visually appealing online quiz game.
- As a site owner, I want to build a site which is easy to navigate and accessible.
- As a site owner, I want to build a quiz game which users will want to share. 

### Design
- Background images chosen were in line with the theme, whilst also staying consistent in terms of the color scheme 
- Color scheme was chosen based on the theme of ‘geography’ with blue and green being typical colours of a map. 
- Text color was chosen to contrast with the background colors to make the site readable and visually pleasing. 


## Features 

### Existing Features

 - **Landing Page**

    - On the first page there is a heading and 3 sections to interact with. There is a clearly marked button which, once clicked, will display the rules and parameters for the quiz. Underneath this there is a ‘Play’ button which will enter the quiz questions when clicked, and a ‘High Scores’ button, which will take the user to the leaderboard of the 5 most recent high scores and who obtained them. 
    - There is an animation on the Heading Text which constantly loops through.
    - There is also an interactive globe animation which zooms in and out if the user scrolls over it. 
    
    ![Homepage](/assets/images/homepage.png) CHANGE THIS 

    - **Rules Button:**
    The user is invited to click this button. Once clicked, new text will appear that displays simple rules for the game and how to play. 
    ![Rules List](/assets/images/rules-list.png)

 - ### Quiz Area

    * Once the ‘Play’ button on the landing page has been clicked, the user is taken to the first question of the quiz.

 - **Question Display**

    - The Quiz area is held in a clearly marked box, with the question in the centre, and answer options in bars underneath. 
    - At the top of the quiz box, there is a question tracker to notify the user how far along in the quiz they are.
    - In the quiz area there is a timer that starts when the user first starts the quiz. This timer starts from 0 and counts up in seconds, minutes and hours throughout the time a user is answering the questions in the quiz. The overall time taken is displayed to the user on the end page along with their score.
    - There is also a score counter which increments by 10 if correct answers are chosen throughout the quiz. 
        - The aim of showing the user their time and score is so that they can share the quiz with others and compare times and scores to make it a shared experience and add some competition. 
    - There are 10 questions to answer in the quiz. 
    ![Question Display](/assets/images/question-display.png)

- **Answers**
 * The answer options are marked A-D, which clearly contrasted text in the bars. 
    * If correct answer clicked: the answer bar will turn light green with a dark green border, and the score will be incremented by 10 on the next page.
    * A message will appear in green text, telling the user they have answered the question correctly. 
    * The next question will automatically load after this message is shown.
    ![Correct Answer](/assets/images/correct-answer.png)

    * If incorrect answer clicked: the answer bar will turn pink with a red border, and the score will not increase on the next page. 
    * A message will appear to the user in red text. This message is different for every question. The message will tell the user the correct answer to the question, along with some facts or context of the correct answer. 
     * The next question will automatically load after this message is shown.
    ![Incorrect Answer](/assets/images/incorrect-answer.png)

- ### End of Quiz / Results Page
    * Once the user has completed all 10 questions, the user will be displayed a message telling them they have completed the quiz. 
    * They will see their total points generated from correct answers, with the maximum being 100 points. 
    * They will also see the total time it took them to complete the quiz. 

- **Result Message**
    - Underneath the points and time, there is an automated message. This message varies depending on how many points were generated by the user. There is a different message if the user scores between:
        * 0-4000 points.
        * 4000-7000 points.
        * 7000-9000 points.
        * If the user answered all the questions correct and scored 1000 points, a congratulatory message will appear. 

    ![Result Page](/assets/images/result-page.png)

- ### End of Quiz buttons
    * Underneath the results message there is text inviting the user to enter their name. If they enter a name and click the ‘save’ button underneath, their score will be stored in the high scores list, which is accessible from the home page. 
    * There is a ‘play again’ button, which will take the user back to the beginning of the quiz if clicked. 
    * At the bottom of the page there is a ‘Homepage’ button. When clicked, this will take the user back to the initial landing page, where they can either start a new game or go to the high scores leaderboard. 

**High Scores Leaderboard**
- On the home page, if the user clicks the ‘High Scores' button it will take them to the leaderboard page. 
    * This section stores the most recent top 5 high scores alongside the name that was entered at the end of the quiz. 
    * There is a clearly marked button underneath the scores list to navigate back to the homepage. 

   ![High Scores](/assets/images/leaderboard.png)


## Testing 

- All of the pages in this project are responsive on various screen sizes and maintain very similar layouts and displays. 
- This project was tested on device sizes ranging from an iPhone 11, Ipad, and Laptops of various sizes. 
- I have tested that all buttons and input fields are working and only accept the target data. 
- The project has been tested on the following browsers: Chrome, Firefox, Safari. 

### Validator Testing
- HTML
    - No errors were detected when running the final result through the official HTML W3C Validator - https://validator.w3.org
- CSS
    - No errors were detected when passing through the Jigsaw CSS validator - https://jigsaw.w3.org/css-validator/. 
- JavaScript
    - No errors detected when passed through JSHint - https://jshint.com/

### Lighthouse Testing
![Lighthouse score](/assets/images/lighthouse.png)

### Known Bugs and Fixes
 - The first time parsing code through JSHint came with many warnings. Most of these were corrected when changing the configuration of JSHint to eversion: 6. 
 - On the 'Enter Username' input field, a user is able to enter a space and it will still register on the high scores leaderbaord without a name if the score is high enough. 

### Deployment
**Deploying the site to GitHub Pages**
- This site was deployed to GitHub pages. The steps to deploy are as follows:
    - In the GitHub repository, navigate to the Settings tab.
    - From the source section drop-down menu, select the Main Branch.
    - Once the main branch has been selected, the page will be automatically refreshed with a display of the successful deployment.

The Live Link can be found here: https://georgiagrayland.github.io/geography-quiz/

**Forking the GitHub Repository**
- A GitHub Repository can be forked to make a copy of the original repositiry or make changes to it without impacting the original repository:
    - Find the original GitHub Repository. 
    - At the top of the page to the right, under your account, click the 'Fork' button.
    - This will create a copy of the repository in your GitHub account. 

**Making a Local Clone**
- This can be achieved by:
    * Find the GitHub Repository.
    * Click the 'Code' button.
    * Copy the link shown.
    * In Gitpod, change the directory to the location you would like the cloned directory to be located. 
    * Type git clone, and paste the link copied before. 
    * Press Enter to have the local clone created. 

## Credits

### Content
- Inspiration for some of the quiz questions was taken from the [Edsys](https://www.edsys.in/geography-quiz-for-kids-107-questions-answers/#4) website.


### Code
- I watched some walk along tutorials, and looked at online educational sources to help me understand the logic of functions that needed to be used. Code was used as demonstrated in some videos so that the functions in this project could work:
    - Some parts of the code were taken from a tutorial based on this project: https://github.com/briancodex/quiz-app-js. This has been accredited in the relevant parts of the code.  
    - [Brian Design Youtube Tutorial](https://www.youtube.com/@briandesign)
    - [Mitchell Hudson](https://www.youtube.com/@MitchellHudson)
    - [W3C Schools](https://www.w3schools.com/js/default.asp)

- The text animation on the home page is from Tobias Ahlin: [Moving letters](https://tobiasahlin.com/moving-letters/)

- The original version of the Globe visual on the home page is from Stranger in the Q on Codepen: https://codepen.io/strangerintheq/pen/zXVpQw. I used this code and edited the sizing, ratio, and colors. 
- The code and idea for most of the timer function is from: Madalin on Codepen: https://codepen.io/madalin_
    - All of these have been credited in comments within the code with links included. 

### Media 
- The background images were taken from [Unsplash](https://unsplash.com/)
- Fonts taken from [Google Fonts](https://fonts.google.com/)
- Icons used from [Fontawesome](https://fontawesome.com/)
- Credit for Star icon on leaderboard page: Raj Dev on [Freeicons](https://freeicons.io/)

### Acknowledgements
- I would like to thank my mentor Harry Dhillon for his help and support throughout this project.  



