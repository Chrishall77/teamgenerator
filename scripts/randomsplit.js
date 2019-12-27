 
 ((d) => {

    //initialise arrays
    let pool = [];
    let home = [];
    let away = [];

    //initiaise document elements
    let enterName = d.getElementById("enterName");
    let submitName = d.getElementById("submitName");
    let output = d.getElementById("output");
    let generate = d.getElementById("generate");
    let homeTeam = d.getElementById("homeTeam");
    let awayTeam = d.getElementById("awayTeam");
    let playerPool = d.getElementById("playerPool");

    //New Player button listener
    //adds name if array length below pool maximum
    //display pool
    //clear blanks
    submitName.addEventListener("click", () => {
        pool.length < 10 ? pool.push(enterName.value) : output.textContent = "Pool full";
        playerPool.textContent = pool;
        enterName.value = "";
    })

    //Generate Teams button listener
    //calls teamsplitter function
    generate.addEventListener("click", ()=>{
        teamSplitter();
    })

    //generate a random integer below the max permissable value
    function generateRandom(min, max) {
        return Math.ceil( Math.random() * ( max - min ) );
    }
        
    //populate array with random integers
    //test that integer does not already exist
    //return array
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
    //push to home or away based on whether the index is odd or even
    //output teams to page
    function teamSplitter() {
        
        let playerIndex = generatePlayerIndex(pool.length);
         
        for ( i = 0; i < (pool.length); i++ ) {
            playerIndex[i] % 2 === 0 ? home.push(pool[playerIndex[i]]) : away.push(pool[playerIndex[i]]);
        }
        
       homeTeam.textContent = home;
       awayTeam.textContent = away;
    }
    
})(document)
 