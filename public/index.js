let ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K',]
let suits = ['♠', '♥', '♣', '♦']
let allDecks = [];
let game = [];
let playerOneHand = $('#player-one');
let playerTwoHand = $('#player-two');
let casino = $('.casino');


function buildDeck() {
    let deck = [];
    for (let i = 0; i < ranks.length; i++)
    {
        for (let x = 0; x < suits.length; x++)
        {
            let weight = parseInt(ranks[i]);
            if (ranks[i] == 'J' || ranks[i] == 'Q' || ranks[i] == 'K')
                weight = 10;
            if (ranks[i] == 'A');
                weight = 11;
            let card = { Rank: ranks[i], Suit: suits[x], weight: weight };
            deck.push(card);
        }
        return(deck);
    }
}

function shuffleDecks(num) {
    for (let i = 0; i < num; i++){
        let location1 = Math.floor((Math.random() * deck.length));
        let location2 = Math.floor((Math.random() * deck.length));
        let newDeck = allDecks[location1];
        
        allDecks[location1] = allDecks[location2];
        allDecks[location2 = newDeck];
    }
}

function selectRandomCard() {
    let randomIndex = Math.floor(Math.random() * allDecks.length);
    let card = allDecks[randomIndex];
    allDecks.splice(randomIndex, 1);
    return card;
}
    
    
function dealHands () {
    dealerHand = [selectRandomCard(), selectRandomCard()];
    dealerHand.forEach((card, index) => {
        const newCard = 
    })
}

function startGame() {
   document.getElementById('btnStart').value =
}