 
 ((d) => {
    
    //create Player object constructor 
    class Player {
        constructor(name, rating) {
            this.name = name
            this.rating = rating;
        }

        getName() {
            return this.name;
        }

        getRating() {
            return this.rating;
        }
    }

    //initialise document elements
    let enterPoolSize = d.getElementById("enterPoolSize");
    let enterName = d.getElementById("enterName");
    let enterRating = d.getElementById("enterRating");
    let submitName = d.getElementById("submitName");
    let generate = d.getElementById("generate");
    let homeTeam = d.getElementById("homeTeam");
    let awayTeam = d.getElementById("awayTeam");
    let playerPool = d.getElementById("playerPool");
    let setPlayerNames = d.getElementById("setPlayerNames");
    let setRatings = d.getElementById("setRatings");
    let setPoolSize = d.getElementById("setPoolSize");
    let stepOne = d.getElementById("stepOne");
    let stepTwo = d.getElementById("stepTwo");
    let stepThree = d.getElementById("stepThree");
    let generator = d.getElementById("generator");
    let prepTeam = d.getElementById("prepTeam");
    let reset = d.getElementById("reset");

    //initialise arrays
    let pool = [];
    let home = [];
    let away = [];
    let homeRating = [];
    let awayRating = [];

    //initialise team rating and poolsize
    let homeScore = 0;
    let awayScore = 0;
    let poolSize = 10;
    
    //initialise booleans
    let balance = false;

    //initialise reducer for team ratings
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    //Handler for setting team size
    enterPoolSize.addEventListener("change", () => {
        poolSize = enterPoolSize.value;
        stepOne.className = "alert alert-warning";
        stepOne.textContent = "Squad Size: " + poolSize / 2 + " players.";
    })

    //handler for resetting to start
    reset.addEventListener("click", ()=> {
        document.location.reload(true);
    })

    //New Player button listener
    //adds name as new object if array length below pool maximum
    //display pool full when maximum reached
    //clear input field and set focus back to it if there are players still to add
    submitName.addEventListener("click", () => {
        if ( pool.length < poolSize ) {
            let count = pool.length;
            let inputName = enterName.value ? enterName.value : "Player " + (count + 1);
            let inputRating = enterRating.value ? enterRating.value : "1";
            let newPlayer = new Player(
                inputName,
                inputRating,
            );
            let content = newPlayer.getName() + " / " + newPlayer.getRating();
            playerPool.className = "card bg-light border-dark";
            populateSection(playerPool, "P", content);
            pool.push(newPlayer);
            remainers();
            enterName.value = "";
            enterName.focus();
        } else {
            stepTwo.className = "alert alert-warning"; 
            stepTwo.textContent = "Player pool full";
            generate.focus();
        }
    })

    //Generate Teams button listener
    //calls teamsplitter function
    //if pool not yet full then display remaining number of players needed
    generate.addEventListener("click", ()=>{
        if (pool.length === +poolSize) {
            stepThree.textContent = "";
            teamSplitter();
        } else {
            remainers();
            enterName.focus();
        }  
    })

    //calculate and display remaining players required to meet pool size
    function remainers() {
        let remaining = poolSize - pool.length;
        stepTwo.className = "alert alert-warning";
        stepTwo.textContent = "You need " + remaining + " more players.";
    }

    //function to enable differences to be found when either number may be higher
    function difference (num1, num2) {
        if (num1 > num2) {
          return num1 - num2
        } else {
          return num2 - num1
        }
    }

    //generate a random integer below the max permissable value
    function generateRandom(min, max) {
        return Math.ceil( Math.random() * ( max - min ) );
    }
        
    //populate array with random integers
    //test that integer does not already exist
    //return array of random index positions
    function generatePlayerIndex(players) {
        let playerNumbers = [];
        while ( playerNumbers.length < players ) {
            var newIndex = (generateRandom(0, players)) - 1;
            if (playerNumbers.indexOf(newIndex) == -1) {
            playerNumbers.push(newIndex);
        }
    }
        return playerNumbers;
    }
    
    //assign randomly generated index to new array
    //split in half to populate home and away teams
    //re-calculate if difference between team is too wide
    //output teams to page
    function teamSplitter() {
        //loop checks if balance between teams has been enabled
        while ( balance == false ) {
            //return variables/arrays to initial values
            home = [];
            away = [];
            homeScore = 0;
            awayScore = 0;
            teamDifference = 0;
            homeRating = [];
            awayRating = [];

            //generate teams from randomised Player Index
            let playerIndex = generatePlayerIndex(pool.length);
            for ( i = 0; i < (pool.length); i++ ) {
                home.push(pool[playerIndex[i]]);
            }
            away = home.splice(0, poolSize/2);
            
            //store player rating for each team in array
            home.forEach((home)=>homeRating.push(+home.getRating()));
            away.forEach((away)=>awayRating.push(+away.getRating()));

            //reduce to a single value the ratings for each team
            homeScore = Math.floor(homeRating.reduce(reducer));
            awayScore = Math.floor(awayRating.reduce(reducer));

            //2 is the tipping point as it is the difference between 1 and 3
            //set loop exit variable to true
            if ( difference(homeScore, awayScore ) <= 2 ) {
                balance = true;
            } else {
                playerIndex = [];
            }
        }
        createPage();
    }

    //create output after generation showing randomised balanced teams
    //use clearsection and populate section calls to populate
    //parameters extend the existing heading structure for accessibility purposes
    function createPage() {

        clearSection(setPoolSize);
        clearSection(setPlayerNames);
        clearSection(setRatings);
        clearSection(playerPool);
        clearSection(generator);
        clearSection(prepTeam);

        homeTeam.className = "col card bg-light border-dark";
        awayTeam.className = "col card bg-light border-dark";
        
        populateSection(homeTeam, "H3", "Home Team");
        home.forEach((home)=>populateSection(homeTeam, "P", home.getName() + " / " + home.getRating() ));
        populateSection(homeTeam, "H4", "Rating: " + homeScore)
        
        populateSection(awayTeam, "H3", "Away Team");
        away.forEach((away)=>populateSection(awayTeam, "P", away.getName() + " / " + away.getRating() ));
        populateSection(awayTeam, "H4g", "Rating: " + awayScore);

        reset.focus();
    }

    // Populate sections by generating an element and attaching content to it
     function populateSection(section, element, content) {
        let para = document.createElement(element);                     
        let t = document.createTextNode(content);                       
        para.appendChild(t);                                            
        section.appendChild(para);                                       
    }

    //Remove class info and remove content
    function clearSection(section) {
        section.className="";
        while(section.firstChild){
            section.removeChild(section.firstChild);
        }
    }

})(document)
 