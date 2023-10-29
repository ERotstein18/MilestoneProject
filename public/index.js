var dealerSum = 0;
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0;

var ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K',]
var suits = ['♠', '♥', '♣', '♦']
var deck = [];
var game = [];
var playerHand = $('#player-one');
var playerHand = $('#player-two');
var casino = $('.casino');


window.onload = function () {
    buildDeck();
    shuffleDecks();
    startGame();
}

function buildDeck() {
    let deck = new Array();
    for (let i = 0; i < ranks.length; i++)
    {
        for (let x = 0; x < suits.length; x++)
        {
            var weight = parseInt(ranks[i]);
            if (ranks[i] == 'J' || ranks[i] == 'Q' || ranks[i] == 'K')
                weight = 10;
            if (ranks[i] == 'A');
                weight = 11;
            let card = { Rank: ranks[i], Suit: suits[x], weight: weight };
            deck.push(card);
        }
        console.log(deck);
    }
}

function shuffleDecks() {
    for (var i = 0; i < 1000; i++){
        var location1 = Math.floor((Math.random() * deck.length));
        var location2 = Math.floor((Math.random() * deck.length));
        var tmp = deck[location1];
        
        deck[location1] = deck[location2];
        deck[location2 = tmp;]
    }
}

const dealHands = () => {
    dealerHand = [selectRandomCard(), selectRandomCard()];
    dealerHand.forEach((card, index) => {
        const newCard = 
    })
}