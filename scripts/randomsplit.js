 
 ((d) => {
    
    //create Player constructor class
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
    let history = [];

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
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    //New Player button listener
    //adds name as new object if array length below pool maximum
    //display pool full when maximum reached
    //clear input field
    submitName.addEventListener("click", () => {
        if ( pool.length < 10 ) {
            let newPlayer = new Player(
                enterName.value,
                enterRating.value
            );
            pool.push(newPlayer);
        } else {
            output.textContent = "Pool full";
        }

        playerPool.textContent = pool;
        enterName.value = "";
    })

    //Generate Teams button listener
    //calls teamsplitter function
    generate.addEventListener("click", ()=>{
        teamSplitter();
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
        console.log(playerNumbers);
        return playerNumbers;
    }
    
    //assign randomly generated index to new array
    //push to home or away based on whether the index is odd or even
    //re-calculate if difference between team is too wide
    //output teams to page
    function teamSplitter() {

        //loop checks if balance between teams has been enabled
        while ( balance == false ) {

            //return variables/arrays to initial values
            home = [];
            away = [];
            let homeScore = 0;
            let awayScore = 0;
            teamDifference = 0;
            homeRating = [];
            awayRating = [];


            let playerIndex = generatePlayerIndex(pool.length);
            
            for ( i = 0; i < (pool.length); i++ ) {
                home.push(pool[playerIndex[i]]);
            }

            away = home.splice(0, 5);
            
            //store player rating for each team in array
            home.forEach((home)=>homeRating.push(+home.rating));
            away.forEach((away)=>awayRating.push(+away.rating));
            console.log("Home: " + home);
            console.log("Away: " + away);

            //reduce to a single value the ratings for each team
            homeScore = Math.floor(homeRating.reduce(reducer));
            awayScore = Math.floor(awayRating.reduce(reducer));
            console.log("HomeScore: " + homeScore);
            console.log("AwayScore: " + awayScore);
            console.log(difference(homeScore, awayScore));

            //2 is the tipping point as it is the difference between 1 and 3
            //set loop exit variable to true
            if ( difference(homeScore, awayScore ) <= 2 ) {
                balance = true;
                console.log(history);
            } else {
                history.push(playerIndex);
                playerIndex = [];
            }

        }

       homeTeam.textContent = home;
       home.forEach((home)=>console.log("Home: " + home.name,home.rating));
       
       console.log(homeRating.reduce(reducer));
       away.forEach((away)=>console.log("Away: " + away.name,away.rating));
       
       awayTeam.textContent = away;
       console.log(homeRating);
       console.log(awayRating);
       console.log("Home Team rating: " + homeRating.reduce(reducer));
       console.log("Away Team rating : " + awayRating.reduce(reducer));
       console.log(history);
    }

    
})(document)
 