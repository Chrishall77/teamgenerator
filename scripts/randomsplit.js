 
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

    //initialise arrays
    let pool = [];
    let home = [];
    let away = [];
    let homeRating = [];
    let awayRating = [];

    //initialise team rating
    let homeScore = 0;
    let awayScore = 0;

    //initialise booleans
    let balance = false;

    //initialise document elements
    let enterName = d.getElementById("enterName");
    let enterRating = d.getElementById("enterRating");
    let submitName = d.getElementById("submitName");
    let output = d.getElementById("output");
    let generate = d.getElementById("generate");
    let homeTeam = d.getElementById("homeTeam");
    let awayTeam = d.getElementById("awayTeam");
    let playerPool = d.getElementById("playerPool");

    //initialise reducer for team ratings
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    //New Player button listener
    //adds name as new object if array length below pool maximum
    //display pool full when maximum reached
    //clear input field
    submitName.addEventListener("click", () => {
        if ( pool.length < 10 ) {
            let inputName = enterName.value ? enterName.value : "Player";
            let inputRating = enterRating.value ? enterRating.value : "1";
            let newPlayer = new Player(
                inputName,
                inputRating,
            );
            let content = newPlayer.getName() + " / " + newPlayer.getRating();
            populateSection(playerPool, "P", content);
            pool.push(newPlayer);
            enterName.value = "";
            enterName.focus();
        } else {
            output.textContent = "Pool full";
            generate.focus();
        }
    })

    //Generate Teams button listener
    //calls teamsplitter function
    generate.addEventListener("click", ()=>{
        if (pool.length === 10) {
            output.textContent = "";
            teamSplitter();
        } else {
            let remaining = 10 - pool.length;
            output.textContent = "You need " + remaining + " more players.";
        }  
    })

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
            away = home.splice(0, 5);
            
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

    function createPage() {

        clearSection(playerPool);
       
        populateSection(homeTeam, "H2", "Home");
        home.forEach((home)=>populateSection(homeTeam, "P", home.getName() + " / " + home.getRating() ));
        populateSection(homeTeam, "H3", "Team Rating: " + homeScore)
        
        populateSection(awayTeam, "H2", "Away");
        away.forEach((away)=>populateSection(awayTeam, "P", away.getName() + " / " + away.getRating() ));
        populateSection(awayTeam, "H3", "Team Rating: " + awayScore);

        consoleLogs();
    }

     function populateSection(section, element, content) {
        let para = document.createElement(element);                     // Create an element node
        let t = document.createTextNode(content);                       // Create a content node
        para.appendChild(t);                                            // Append the content to element
        section.appendChild(para);                                      // Append element to section 
    }

    function clearSection(section) {
        while(section.firstChild){
            section.removeChild(section.firstChild);
        }
    }

   function consoleLogs() {
        pool.forEach((player)=>console.log(player.getName() + " / " + player.getRating()));
        console.log(homeRating);
        console.log(awayRating);
        console.log("Home Team rating: " + homeRating.reduce(reducer));
        console.log("Away Team rating : " + awayRating.reduce(reducer));
   }
    
})(document)
 