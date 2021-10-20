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
    let guessed = {};
    let wordStatus = null;
    let orginalText = document.querySelector(".keyboard").innerHTML; //Initial state of the keyboard
    let replayBtn = document.querySelector("#replayBtn");
    let letters = document.getElementsByClassName("btn"); //obtaining all keys on keyboard
    let difficultyBtn = document.querySelector("#difficulty");

    // Create a random choice of the possible answers. 
    function randomAnswer(){
        answer = countries[Math.floor(Math.random() * countries.length)].toUpperCase();
        return answer;
    };
    function generateKeyboard () {
        let alphabet = "abcdefghijklmnopqrstuvwxyz".split("").map(letter => { 
           return `<button class = btn>` + letter + `</button>`
        }).join("");
        let keys = document.querySelector(".keyboard");
        keys.innerHTML =  alphabet;
    }
    //add event listner to each key whilst extracting text content.
    function keyEvent() {
        for(let el of letters){
            el.addEventListener("click", function(){
                let chosenLetter = el.textContent.toUpperCase();
                el.classList.add("background"); //removes picked option with Aesthetic 
                handleGuess(chosenLetter);
                el.setAttribute("disabled", true); //prevents a letter to be pressed multiples times
                difficultyBtn.setAttribute("disabled", true);
            });        
        };      
    };

    //Generate the chosen word in a hidden capacity.
    function guessedWord(){
        wordStatus = answer.split("").map(function (letter){
            if(guessed[letter]){
                return letter; //check all letters of the answer against the guessed array and return matches. 
            } else return " _ "; //initally the guessed array will be empty and everything will be _
        }).join("");
        document.querySelector(".guess p").innerHTML = wordStatus;
    };
    
    //Handle the picked character
    function handleGuess(pickedLetter){
        if(!guessed[pickedLetter]){
            guessed[pickedLetter] = "guessed"; //store all picked letters that are clicked
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
    //change image as lives decrease.
    function updateHangmanImage(){
       const img = document.getElementById("hangmanImg");
       img.setAttribute("src", `Images/${lives}.jpg`); //images change name in corrospondence with lives
    }

    function updateLivesUi(){document.querySelector(".lives span").innerHTML = lives;}

    //Checking procedure to make sure the game ends in one way or another.
    function checkIfWon() {
        if(answer === wordStatus){document.querySelector(".keyboard").innerHTML = "YOU WIN";}}
    function checkIfLost() {
        if(lives < 1){document.querySelector(".keyboard").innerHTML = `YOU LOOSE THE ANSWER IS ${answer}.`;}}
    
    //click event to change lives.
    function difficulty (){
        
        difficultyBtn.addEventListener("click", function(){
            if(difficultyBtn.innerHTML === "Hard"){
                difficultyBtn.innerHTML = "Easy";
                lives = 3;
                updateLivesUi();
                
            } else {
                difficultyBtn.innerHTML = "Hard";
                lives = 6;
                updateLivesUi();
            }
        });
    };

    function recreateKeyboard(){
        document.querySelector(".keyboard").innerHTML = orginalText;
        difficultyBtn.removeAttribute("disabled");
    }

    //refactored a little
    function gameReset() {
        generateKeyboard();
        updateLivesUi();
        keyEvent();
        randomAnswer();
        guessedWord();
        updateHangmanImage();
        
    };

    //click event to restart the program
    function replay (){
        replayBtn.addEventListener("click", function(){
        guessed = {};
        lives = 6;
        wordStatus = null;
        recreateKeyboard();
        generateKeyboard();
        gameReset();
        
        });
    };
    
    difficulty();
    gameReset();
    replay();













