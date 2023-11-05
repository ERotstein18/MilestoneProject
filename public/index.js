var dealerSum = 0;
var players = [];
var stayCount = 0;

//keeping the track of Ace
var dealerAceCount = 0;

//keeping track of the hidden cards
var hidden;
var allDecks;

//allowing the player to draw while the player sum <= 21
var playHit = true;


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

//creating player(s)
function createPlayers(playerCount) {
    for (let i = 1; i <= playerCount; i++){
        var playerOneHand = { Name:'Player ' + i, ID: i, HandSum: 0, AceCount: 0, playHit: true};
        players.push(playerOneHand);
    }
}

//shuffling the deck of cards; switching the values of two random cards
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
        let cardImg = document.createElement("img");
        let card = allDecks.pop();
        cardImg.src = "./deckofcards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById('dealer-cards').append(cardImg);
        console.log('dealerSum 1 ',getValue(card), dealerSum);
    }
    console.log('dealerSum', dealerSum);

    //players
    for (let i = 0; i < players.length; i++) {
        let player = players[i];

        let playerTitle = document.createElement('h2');
        playerTitle.innerText = player.Name;
        document.getElementById("player-container").append(playerTitle);

        let playerDiv = document.createElement('div');
        playerDiv.setAttribute("id", "card-container-" + player.ID);
        //cards
        for (let x = 0; x < 2; x++) {
            let cardImg = document.createElement('img');
            let card = allDecks.pop();
            cardImg.src = "./deckofcards/" + card + '.png';
            player.HandSum += getValue(card);
            player.AceCount += checkAce(card);
            playerDiv.append(cardImg);
        }

        document.getElementById("player-container").append(playerDiv);

        let hitButton = document.createElement('button');
        hitButton.textContent = 'Hit';
        hitButton.setAttribute("class", "button-hit");
        hitButton.addEventListener("click", function(){
            hit(player.ID);
        });

        let stayButton = document.createElement('button');
        stayButton.textContent = 'Stay';
        stayButton.setAttribute("class", "button-hit");
        stayButton.addEventListener("click", function () {
            stay(player.ID);  
        });

        let handSum = document.createElement('p');
        handSum.setAttribute("id", "hand-sum-" + player.ID);

        let result = document.createElement('p');
        result.setAttribute("id", "result-" + player.ID);

        document.getElementById("player-container").append(hitButton);
        document.getElementById("player-container").append(stayButton);
        document.getElementById("player-container").append(handSum);
        document.getElementById("player-container").append(result);
    }
}

function stay(playerId) {
    let player = players[playerId - 1];

    player.HandSum = reduceAce(player.HandSum, player.AceCount);

    player.playHit = false;

    stayCount += 1;

    if (stayCount == players.length) {
        //dealer card
        document.getElementById("hidden").src = "./deckofcards/" + hidden + ".png";
        //console.log('message -->', message);
        document.getElementById("dealerSum").innerText = dealerSum;

        for(let i = 0; i < players.length; i++){
            let curPlayer = players[i];
            let message = "";

            if (curPlayer.HandSum > 21) {
                message = `${curPlayer.Name} Lose!`;
            }
            else if (dealerSum > 21) {
                message = `${curPlayer.Name} Win!`;
            }
            //both the players and the dealer <= 21
            else if (curPlayer.HandSum == dealerSum) {
                message = "Tie!";
            }
            else if (curPlayer.HandSum > dealerSum) {
                message = `${curPlayer.Name} Win!`;
            }
            else if (curPlayer.HandSum < dealerSum) {
                message = `${curPlayer.Name} Lose!`;
            }
            document.getElementById("hand-sum-" + curPlayer.ID).innerText = curPlayer.HandSum;
            document.getElementById("result-" + curPlayer.ID).innerText = message;
        }
    }
}

function hit(playerId) {
    let player = players[playerId - 1];

    if (!player.playHit) {
        return;
    }
    
    let cardImg = document.createElement('img');
    let card = allDecks.pop();
    cardImg.src = './deckofcards/' + card + '.png';
    player.HandSum += getValue(card);
    player.AceCount += checkAce(card);
    document.getElementById("card-container-" + playerId).append(cardImg);

    if (reduceAce(player.HandSum, player.AceCount) > 21) {
        player.playHit = false;
    }

    console.log('player.HandSum -->', player.HandSum);
    console.log('player.playHit -->', player.playHit);
}

//getting the value or count of the card
function getValue(card) {
    let data = card.split("of");
    let value = data[0];

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
function reduceAce(playerHandSum, playerAceCount) {
    while (playerHandSum > 21 && playerAceCount > 0) {
        playerHandSum -= 10;
        playerAceCount -= 1;
    }
    return playerHandSum;
}

var initialMoney = [];
var minBet = 5;
var maxBet = 50;

function playMoney(amount) {
    let money = initialMoney;
    let bet = 0;

    if (amount < minBet || amount > maxBet) {
        console.log('Invalid bet amount. Please bet between $5 and $50.');
        return;
    }
    if (amount > money) {
        console.log('Not enogh money to place that bet.');
        return;
    }

    //deduct the bet amount from the player's money
    money -= amount;
    bet = amount;

    console.log('You place a bet of $${bet}.');
    console.log('Remaining money: $ ${money}');
}

window.onload = function () {
    buildDeck();
    shuffleDeck();
    createPlayers(2);
    startGame();
}