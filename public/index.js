//let game = [];
//let playerOneHand = $('#player-one');
// let playerTwoHand = $('#player-two');
//let casino = $('.casino');

var dealerSum = 0;
var playerOneHandSum = 0;
var playerTwoHandSum = 0;

var dealerAceCount = 0;
//keeping the track of Ace
var playerOneHandAceCount = 0;
var playerTwoHandAceCount = 0;

//keep track of the hidden cards
var hidden;
var allDecks;

//allowing the player to draw while the player sum <= 21
var playHit = true;

window.onload = function () {
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck() {
    let ranks = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King",]
    let suits = ["♠", "♥", "♣", "♦"]
    allDecks = [];

    for (let i = 0; i < suits.length; i++) {
        for (let x = 0; x < ranks.length; x++) {
            allDecks.push(ranks[x] + "-" + suits[x]);
        }
    }
    console.log(allDecks);
}

function createPlayers(playerOneHand) {
    playerOneHand = new Array();
    for (let i = 1; i < playerOneHand; i++){
        var hand = new Array();
        var playerOneHand = { Name:'Player' + i, ID: i, Points: 0, Hand: hand };
        createPlayers.push(playerOneHand);
    }
    
}
function shuffleDeck() {
    for (let i = 0; i < allDecks.length; i++){
        let x = Math.floor((Math.random() * allDecks.length));
        let temp = allDecks[i];
        allDecks[i] = allDecks[x];
        allDecks[x] = temp;
    }
    console.log(allDecks);
}

function startGame() {
    hidden = allDecks.pop();
    dealerSum += getValue(hidden);

    //counting the Ace
    dealerAceCount += checkAce(hidden);
  
    while (dealerSum < 17) {
        //creating image tag
        let cardImg = document.createElement("img");
        let card = allDecks.pop();
        cardImg.src = "./deckofcards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById('dealer-cards').append(cardImg);
    }
    console.log(dealerSum);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement('img');
        let card = allDecks.pop();
        cardImg.src = "./deckofcards/" + card + '.png';
        playerOneHandSum += getValue(card);
        playerOneHandAceCount += checkAce(card);
        document.getElementById("playerOne-card").append(cardImg);
    }
    console.log(playerOneHandSum);
    document.getElementById("btnHit").addEventListener("click", btnHit);
    document.getElementById("btnStay").addEventListener("click", btnStay);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement('img');
        let card = allDecks.pop();
        cardImg.src = './deckofcards/' + card + '.png';
        playerTwoHandSum += getValue(card);
        playerTwoHandAceCount += checkAce(card);
        document.getElementById("playerTwo-card").append(cardImg);
    }
    console.log(playerTwoHandSum);
    document.getElementById("btnHit").addEventListener("click", btnHit);
}

function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    playerOneHandSum = reduceAce(playerOneHandSum, playerOneHandAceCount);
    playerTwoHandSum = reduceAce(playerTwoHandSum, playerTwoHandAceCount);

    playHit = false;
    document.getElementById("hidden").src="./deckofcards/" + hidden + ".png";

    let message = "";
    if (playerOneHandSum > 21) {
        message = "Player One Lose!";
    }
    else if (dealerSum > 21) {
        message = "Player One Win!";
    }
    else if (playerOneHandSum == dealerSum) {
        message = "Tie!";
    }
    else if (playerOneHandSum > dealerSum) {
        message = "Player One Lose!"
    }
    else if (playerOneHandSum < dealerSum) {
        message = "Player One Lose!";
    }
    document.getElementById("dealerSum").innerText = dealerSum;
    document.getElementById("playerOneHandSum").innerText = playerOneHandSum;
    dcoument.getElementById("resultsOne").innerText = message;
}

function hit() {
    if (!playHit) {
        return;
    }
    let cardImg = document.createElement('img');
    let card = allDecks.pop();
    cardImg.src = './deckofcards/' + card + '.png';
    playerOneHandSum += getValue(card);
    playerOneHandAceCount += checkAce(card);
    document.getElementById("playerOne-card").append(cardImg);

    if (reduceAce(playerOneHandSum, playerOneHandAceCount) > 21) {
        playHit = false;
    }
}
 
function getValue(card) {
    let data = card.split("-");
    let value = data[];

    if (isNaN(value)) {
        if (value == "Ace") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}
//checking the Ace
function checkAce(card) {
    if (card[0] == 'Ace') {
        return 1;
    }
    return 0;
}

function reduceAce(playerOneHandSum, playerOneHandAceCount, playerTwoHandSum, playerTwoHandAceCount) {
    while (playerOneHandSum > 21 && playerOneHandAceCount > 0) {
        playerOneHandSum -= 10;
        playerOneHandAceCount -= 1;
    }
    return playerOneHandSum;
}