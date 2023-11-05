// <!-- <h2>Player One:<span id="playerOne-sum"></span></h2>
//     <div id="playerOne-card"></div>
//     <button id="btnHit">Hit</button>
//     <button id="btnStay">Stay</button>
//     <p id="playerOneHandSum"></p>
//     <p id="resultsOne"></p>

//     <h2>Player Two:<span id="playerTwo-sum"></span></h2>
//     <div id="playerTwo-card"></div>
//     <button id="btnHit">Hit</button>
//     <button id="btnStay">Stay</button>
//     <p id="resultsTwo"></p> -->

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
    let suits = ["Spade", "Heart", "Clover", "Diamond"]
    allDecks = [];

    for (let i = 0; i < suits.length; i++) {
        for (let x = 0; x < ranks.length; x++) {
            allDecks.push(ranks[x] + "of" + suits[i]);
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

function createPlayers(playerTwoHand) {
    playerTwoHand = new Array();
    for (let i = 1; i < playerTwoHand; i++){
        var hand = new Array();
        var playerTwoHand = { Name:'Player' + i, ID: i, Points: 0, Hand: hand };
        createPlayers.push(playerTwoHand);
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
    console.log('hidden value', getValue(hidden));

    //counting the Ace
    dealerAceCount += checkAce(hidden);
  
    //dealer
    while (dealerSum < 17) {
        //creating image tag
        let cardImg = document.createElement("img");
        let card = allDecks.pop();
        cardImg.src = "./deckofcards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById('dealer-cards').append(cardImg);
        console.log('dealerSum 1 ',getValue(card), dealerSum);
    }
    console.log('dealerSum', dealerSum);

    //player 1
    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement('img');
        let card = allDecks.pop();
        cardImg.src = "./deckofcards/" + card + '.png';
        playerOneHandSum += getValue(card);
        playerOneHandAceCount += checkAce(card);
        document.getElementById("playerOne-card").append(cardImg);
    }
    console.log('playerOneHandSum --> ', playerOneHandSum);
    document.getElementById("btnHit").addEventListener("click", hit);
    document.getElementById("btnStay").addEventListener("click",stay);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement('img');
        let card = allDecks.pop();
        cardImg.src = './deckofcards/' + card + '.png';
        playerTwoHandSum += getValue(card);
        playerTwoHandAceCount += checkAce(card);
        document.getElementById("playerTwo-card").append(cardImg);
    }
    console.log('playerTwoHandSum --> ', playerTwoHandSum);
    document.getElementById("btnHit").addEventListener("click", btnHit);
}

function stay() {
    //dealerSum = reduceAce(dealerSum, dealerAceCount);
    playerOneHandSum = reduceAce(playerOneHandSum, playerOneHandAceCount);
    //playerTwoHandSum = reduceAce(playerTwoHandSum, playerTwoHandAceCount);

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
    console.log('message -->', message);
    document.getElementById("dealerSum").innerText = dealerSum;
    document.getElementById("playerOneHandSum").innerText = playerOneHandSum;
    document.getElementById("resultsOne").innerText = message;
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

    console.log('playerOneHandSum -->', playerOneHandSum);
    console.log('playHit -->', playHit);
}
 
function getValue(card) {
    let data = card.split("of");
    //EightofClover
    //[0]Eight
    //[1]Clover
    let value = data[0]; //Eight

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

//Ace Value is either 11 or 1
//reducing of Ace - depending on player's onhand card, the value will be reduce to 1 when the player's value card is more than 21
function reduceAce(playerOneHandSum, playerOneHandAceCount, playerTwoHandSum, playerTwoHandAceCount) {
    while (playerOneHandSum > 21 && playerOneHandAceCount > 0) {
        playerOneHandSum -= 10;
        playerOneHandAceCount -= 1;
    }
    return playerOneHandSum;
}

this.gameEnded = function(str){
    this.setMessage(str);
    this.dealButton.disabled = false;
    this.hitButton.disabled = true;
    this.standButton.disabled = true;

}

var initialMoney = [];
var betAmounts = [];

function playMoney() {
    let money = initialMoney;
    let bet = 0;
    let dealerSum = [];
    let players = [];

    document.getElementById()
}