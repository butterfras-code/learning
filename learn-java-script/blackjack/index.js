let userData = {
    name: "Justin",
    chips: 145
}
let numPlayers=1
let cards=[]
let hasBlackjack=false
let isAlive=true
let message=""
let sum = 0
let messageEl=document.getElementById("message-el")
let sumEl=document.getElementById("sum-el")
let cardsEl=document.getElementById("cards-el") 
let userDataEl=document.getElementById("user-data-el")

function dealCards() {
    for (let i=0;i<numPlayers;i++) {
        cards.push([])
        cards[i]=[]
        cards[i].push(randomCard(),randomCard())
        
    }

}

function randomCard() {
    let card=Math.floor( Math.random()*13 ) + 1
    if (card>10) {
        card=10
    } else if (card===1) {
        card=11
    }   
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
    cardsEl=document.getElementById("cards-el") 
    sumEl=document.getElementById("sum-el")
    userDataEl=document.getElementById("user-data-el")
    cardsEl.textContent="Cards: "+cards[player].join(" ")
    sumEl.textContent="Sum: "+sum
    userDataEl.textContent="Player: "+userData.name+" $"+userData.chips

       // while (isAlive && !hasBlackjack) {
        if (sum <= 20) {
        message="Do you want to draw a new card?"
        document.getElementById("new-card-btn").style.display="inline"
        document.getElementById("start-btn").style.display="none"
    } else if (sum === 21) {
        hasBlackjack=true
        message="You've got Blackjack!"
        document.getElementById("new-card-btn").style.display="none"
        document.getElementById("reset-btn").style.display="inline"
    } else {
        isAlive=false
        message="You're out of the game!"
        document.getElementById("new-card-btn").style.display="none"
        document.getElementById("reset-btn").style.display="inline"
    }
    messageEl.textContent=message
    // }
}
function newCard() {
    let player=0
    if (isAlive && !hasBlackjack) {
        cards[player].push(randomCard())
    } 
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
    document.getElementById("start-btn").style.display="inline"
    document.getElementById("reset-btn").style.display="none"
    document.getElementById("new-card-btn").style.display="none"

}