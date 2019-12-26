function generateRandom(min, max) {
    return Math.ceil( Math.random() * ( max - min ) );
}

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

function teamSplitter() {
    let pool = [
        "Jack Daniels",
        "Jim Beam",
        "Tony Stark",
        "Levi Strauss",
        "Calvin Klein",
        "Freddy Krueger",
        "Jason Vorhees",
        "Michael Myers",
        "Tony Montana",
        "Nino Brown"
    ];
    
    let reds = [];
    let blues = [];

    let playerIndex = generatePlayerIndex(pool.length);
    console.log(playerIndex);

    for ( i = 0; i < (pool.length); i++ ) {
       playerIndex[i] % 2 === 0 ? reds.push(pool[playerIndex[i]]) : blues.push(pool[playerIndex[i]]);
    }

    console.log(reds);
    console.log(blues);
}

teamSplitter();