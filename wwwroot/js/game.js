let gameOver = true;  // The play state of the game. If true, record stats and allow user to play again.
let numTurns = 0;   // Number of game turns

const suits = ['H', 'D', 'C', 'S'];     // Card suits, hearts, diamonds, clubs, spades
const cards = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];  // Card values. 11, 12, 13 and 14 are Jack, Queen, King and Ace, respectively.

let deck = makeDeck(suits, cards);  // Deck of cards, to be dealt to players
let pile = [];  // Cards in play. If there's a draw, add three cards to pile and draw again. Winner receives pile.

let playerDeck = [];    // Player's deck
let playerPile = [];    // Player's winnings. When deck === 0, replenish with pile.

let opponentDeck = [];  // Opponent's deck
let opponentPile = [];  // Opponent's winnings. When deck === 0, relenish with pile.

let playerCur = [];     // Current card in play by player
let opponentCur = [];   // Current card in play by opponent

let warDeclared = false;    // War has been declared, i.e. two cards of equal rank have been played.

// Button click listener
$(".btn-next").click(function (e) {
    if (gameOver === true) {     // Start new game
        console.log("Start new game.");
        setUpGame();
    } else {
        turn();
    }
});

// Game simulation listener. Click to skip to end of game.
$(".btn-sim").click(function (e) {
    while (gameOver === false) {
        turn();
    }
});


// Game save listener. Click to save game.
$(".btn-save").click(function (e) {
    submit();
})

// Submit data with AJAX
function submit() {
    console.log("Here!");

    //$.post();
}

// Generate a deck. s = suits, c = cards
function makeDeck(s, c) {
    let deck = [];
    for (let i = 0; i < s.length; i++) {
        for (let j = 0; j < c.length; j++) {
            deck.push([c[j], s[i]]);
        }
    }
    return deck;
}

// Shuffle cards
function shuffle(cards) {
    let shuffled = [];
    for (let i = 0; i < cards.length; i++) {
        let randomPos = Math.floor(Math.random() * shuffled.length);    // Position in shuffled deck to place new card
        shuffled.splice(randomPos, 0, cards[i]);
    }

    return shuffled;
}

// Set up game
function setUpGame() {
    numTurns = 0;

    deck = shuffle(deck);       // Shuffle the deck

    playerDeck = deck.slice(0, 26); // Give player half the cards
    playerPile = [];    // Reset the player pile

    opponentDeck = deck.slice(26);  // Give opponent half the cards
    opponentPile = [];  // Reset the opponent pile

    gameOver = false;   // Set game over flag to false

    // Reset UI
    $(".btn-next").text("NEXT TURN");
    $(".indicator-val").html(`<i class="fas fa-times"></i>`);
    $(".player-card-val").text("-");
    $(".opponent-card-val").text("-");
    $(".player-cards-left").text((playerDeck.length + playerPile.length).toString() + " cards");
    $(".opponent-cards-left").text((opponentDeck.length + opponentPile.length).toString() + " cards");
    $(".num-turns").text(``);
    $(".turn-result-val").text("");
    $(".btn-sim").toggle();
}

// Run a turn of the game
function turn() {
    numTurns++;
    $(".num-turns").text(`Turn #${numTurns.toString()}`);

    // Scenario if war is declared
    if (warDeclared) {
        // Make sure each player has enough cards to put down for war (i.e. one to the pile and one for battle)
        if (playerDeck.length > 0) {
            pile.push(playerDeck.shift());
        }

        if (opponentDeck.length > 0) {
            pile.push(opponentDeck.shift());
        }
        warDeclared = false;    // War conditions satisfied, reset
        $(".indicator-val").html(`<i class="fas fa-times"></i>`);
    }

    // Compare cards
    if (playerDeck.length > 0) {
        playerCur = playerDeck[0];
        pile.push(playerDeck.shift());
    }

    if (opponentDeck.length > 0) {
        opponentCur = opponentDeck[0];
        pile.push(opponentDeck.shift());
    }

    if (playerCur[0] > opponentCur[0]) {
        playerPile = playerPile.concat(pile);
        pile = [];
        $(".turn-result-val").text("Player wins hand.");
        console.log(`Player wins hand.`);
    } else if (opponentCur[0] > playerCur[0]) {
        opponentPile = opponentPile.concat(pile);
        pile = [];
        console.log(`Opponent wins hand.`);
        $(".turn-result-val").text("Opponent wins hand.");
    } else if (opponentCur[0] === playerCur[0]) {
        warDeclared = true;
        $(".indicator-val").text("War!");
        $(".turn-result-val").text("Even hand.");
        console.log("War!");
    }

    // Check for empty decks, reshuffle winnings or end game as necessary
    if ((playerDeck.length + playerPile.length === 0) && (opponentDeck.length + opponentPile.length === 0)) {
        endGame(3); // Call end game with code 3 (draw, very rare!)
    } else if (playerDeck.length === 0) {
        if (playerPile.length === 0 && warDeclared === false) {
            endGame(2); // Call end game with code 2 (opponent wins)
        } else {
            playerDeck = shuffle(playerPile);
            playerPile = [];
        }
    } else if (opponentDeck.length === 0) {
        if (opponentPile.length === 0 && warDeclared === false) {
            endGame(1); // Call end game with code 1 (player wins)
        } else {
            opponentDeck = shuffle(opponentPile);
            opponentPile = [];
        }
    }

    // Change colour of cards based on suit
    if (playerCur[1] === "H" || playerCur[1] === "D") {
        $(".player-card-val").css("color", "red");
    } else {
        $(".player-card-val").css("color", "black");
    }

    if (opponentCur[1] === "H" || opponentCur[1] === "D") {
        $(".opponent-card-val").css("color", "red");
    } else {
        $(".opponent-card-val").css("color", "black");
    }

    //Update UI
    $(".player-card-val").text(renderCard(playerCur));
    $(".opponent-card-val").text(renderCard(opponentCur));
    $(".player-cards-left").text((playerDeck.length + playerPile.length).toString() + " cards");
    $(".opponent-cards-left").text((opponentDeck.length + opponentPile.length).toString() + " cards");
    console.log(`Player: ${playerDeck.length + playerPile.length}, Opponent: ${opponentDeck.length + opponentPile.length}`);
}

// Used to render cards based on suit and rank
function renderCard(card) {
    let rendered = "";

    //Check rank
    if (card[0] >= 2 && card[0] <= 10) {
        rendered = card[0].toString();
    } else {
        switch (card[0]) {
            case 11:
                rendered = "J";
                break;
            case 12:
                rendered = "Q";
                break;
            case 13:
                rendered = "K";
                break;
            case 14:
                rendered = "A";
                break;
        }
    }

    //Check suit
    if (card[1] === "S") {
        rendered = rendered.concat("♠");
    } else if (card[1] === "C") {
        rendered = rendered.concat("♣");
    } else if (card[1] === "D") {
        rendered = rendered.concat("♦");
    } else if (card[1] === "H") {
        rendered = rendered.concat("♥");
    }

    return rendered;
}

// Function to end the game. Code values: 1 = player victory, 2 = opponent victory, 3 = draw
function endGame(code) {
    gameOver = true;
    if (code === 1) {
        $(".turn-result-val").text(`Player wins in ${numTurns} turns!`);
        console.log(`Player wins in ${numTurns} turns!`);
    } else if (code === 2) {
        $(".turn-result-val").text(`Opponent wins in ${numTurns} turns!`);
        console.log(`Opponent wins in ${numTurns} turns!`);
    } else if (code === 3) {
        $(".turn-result-val").text(`Draw in ${numTurns} turns!`);
        console.log(`Draw in ${numTurns} turns!`);
    }
    $(".btn-next").text("NEW GAME");
    $(".btn-sim").toggle();
}





