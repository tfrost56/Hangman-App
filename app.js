//Inital answers for game
    const countries = [
        "Zimbabwe",
        "Turkey", 
        "Uganda", 
        "Australia", 
        "Indonesia", 
        "Malaysia",
        "Thailand",
        "Georgia",
        "Tanzania",
        "Chad",
        "Brazil",
        "Chile",
        "Singapore",
        "Canada",
        "Argentina",
        "Svalbard",
        "Norway",
        "Mongolia",
        "Uzbekistan",
        "Mozambique"
    ];
    
    //Initialising the variables
    let answer = ""; 
    let lives = 6;
    let guessed = [];
    let wordStatus = null;
    let orginalText = document.querySelector(".keyboard").innerHTML;
    let replayBtn = document.querySelector("#replayBtn");
    let letters = document.getElementsByClassName("btn"); //obtaining all keys on keyboard

    //first function - create a random choice of the possible answers. 
    function randomWord(){
        answer = countries[Math.floor(Math.random() * countries.length)].toUpperCase();
        return answer;
    };
    
     //add event listner to each key whilst extracting text content.
     function keyEvent() {
        for(let el of letters){
            el.addEventListener("click", function(){
                let letter = el.textContent.toUpperCase();
                el.classList.add("background"); //removes picked option
                handleGuess(letter);
                el.setAttribute("disabled", true); //prevents a letter to be pressed multiples times
            });        
        };      
    };
    
    //Generate the chosen word in a hidden capacity.
    function guessedWord(){
        wordStatus = answer.split("").map(function (letter){
            if(guessed.indexOf(letter) >= 0){
                return letter; //check all letters of the answer against the guessed array and return matches. 
            } else return " _ ";
        }).join("");
        document.querySelector(".guess p").innerHTML = wordStatus;
    };

    //Handle the picked character
    function handleGuess(pickedLetter){
        if(guessed.indexOf(pickedLetter) === -1){
            guessed.push(pickedLetter); //store all picked letters that are clicked
        } 
    
        if(answer.indexOf(pickedLetter) >= 0){ //if there is a letter within answer that matches 
            guessedWord();  //run function to check answer against guessed array and print the results.
            checkIfWon(); //end point 
        } else {
            lives--;
            updateLivesUi(); 
            checkIfLost(); //end point
            updateHangmanImage(); //
        }
    }

    function updateHangmanImage(){
       const img = document.getElementById("hangmanImg");
       img.setAttribute("src", `/Hangman/${lives}.jpg`); //images change name in corrospondence with lives
    }

    function updateLivesUi(){document.querySelector(".lives span").innerHTML = lives;}

    //Checking procedure to make sure the game ends in one way or another.
    function checkIfWon() {
        if(answer === wordStatus){document.querySelector(".keyboard").innerHTML = "YOU WIN";}}
    function checkIfLost() {
        if(lives < 1){document.querySelector(".keyboard").innerHTML = `YOU LOOSE THE ANSWER IS ${answer}.`;}}
    function resetKeyboard(){
        document.querySelector(".keyboard").innerHTML = orginalText;
    }
    
    function difficulty (){
        document.querySelector("#hard").addEventListener("click", function(){
            lives = 3;
            updateLivesUi();
        });
    };

    function replay (){
        replayBtn.addEventListener("click", function(){
        guessed = [];
        lives = 6;
        wordStatus = null;
        resetKeyboard();
        updateLivesUi();
        keyEvent();
        randomWord();
        guessedWord();
        updateHangmanImage();
        });
    };

    difficulty();
    updateLivesUi();
    keyEvent();
    randomWord();
    guessedWord();
    replay();





