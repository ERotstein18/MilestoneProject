const allDecks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

//to shuffle the deck
function shuffleDeck(allDecks) {
    for (let i = allDecks.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [allDecks[i], allDecks[j] = [allDecks[j], allDecks[i]]];
    }
}

//to draw a card from the deck 
function drawCard(allDecks) {
    return allDecks.pop();
}

//calculate the hand's score
function calculateScore(hand) {
    let score = 0;
    let checkAce = 0;

    for (const card) {
        if(card === 'A') {
            checkAce++;
            score += 11;
} else if (card === 'K' || card === 'Q' || card === 'J') {
    score += 10;
} else {
    score += parseInt(card);
}
}
while (score > 21 && checkAce > 0) {
    score -= 10;
    checkAce--;
}
return score;
}

//
shuffleDeck(allDecks);

const dealerHand = [drawCard(allDecks)];
const playerHands = [[drawCard(allDecks), drawCard(allDecks)]];

//player's hit action
function playerHit(playerIndex) {
    const card = drawCard(allDecks);
    playerHands[playerIndex].push(card);
    const score = calculateScore(playerHands[playerIndex]);

    if (score > 21) {
        console.log('Player ${playerIndex + 1} busted!')
    }
}
