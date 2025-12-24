let numPlayers=1
let cards=[]
let hasBlackjack=false
let isAlive=true
let message=""
let sum = 0
let messageEl=document.getElementById("message-el")
let sumEl=document.getElementById("sum-el")
let cardsEl=document.getElementById("cards-el") 

function dealCards() {
    for (let i=0;i<numPlayers;i++) {
        cards.push([])
        cards[i]=[]
        cards[i].push(randomCard(),randomCard())
        
    }

}

function randomCard() {
    let card=Math.floor(Math.random()*10)+2
    return card
}

function showHand(player) {
    console.log("Player "+(player+1)+": "+cards[player])
}
function sumHand(player) {
    let sum = cards[player].reduce((a,b) => a + b, 0)
    return sum
}

function startGame() {
    let player=0
    dealCards()
    renderGame(player)
}

function renderGame(player) {
    sum = sumHand(player)
    messageEl=document.getElementById("message-el")
    sumEl=document.getElementById("sum-el")
    cardsEl=document.getElementById("cards-el") 
    sumEl.textContent="Sum: "+sum
    cardsEl.textContent="Cards: "+cards[player].join(" ")
       // while (isAlive && !hasBlackjack) {
        if (sum <= 20) {
        message="Do you want to draw a new card?"
    } else if (sum === 21) {
        hasBlackjack=true
        message="You've got Blackjack!"
    } else {
        isAlive=false
        message="You're out of the game!"
    }
    messageEl.textContent=message
    // }
}
function newCard() {
    let player=0
    cards[player].push(randomCard())
    renderGame(player)
}

function resetGame() {
    cards=[]
    hasBlackjack=false
    isAlive=true
    message=""
    sum = 0
    messageEl.textContent="Want to play a round?"
    sumEl.textContent="Sum: "
    cardsEl.textContent="Cards: "
}