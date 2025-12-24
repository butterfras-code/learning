

let firstCard=randomCard()
let secondCard=randomCard()
let sum=firstCard+secondCard
let numPlayers=1
let cards=[]
let hasBlackjack=false
let isAlive=true
let message=""

function dealCards() {
    for (let i=0;i<numPlayers;i++) {
        cards.push([])
        cards[i]=[]
        cards[i].push(randomCard(),randomCard())
        console.log("Player "+(i+1)+": "+cards[i])
    }

}

function randomCard() {
    let card=Math.floor(Math.random()*10)+2
    return card
}

function showHand(player) {
    console.log("Cards: "+firstCard+" "+secondCard)
    console.log("Sum: "+sum)
}

function checkHand(player) {
    let sum = cards[player].reduce((a,b) => a + b, 0)
    if (sum <= 20) {
        message="Do you want to draw a new card?"
    } else if (sum === 21) {
        hasBlackjack=true
        message="You've got Blackjack!"
    } else {
        isAlive=false
        message="You're out of the game!"
    }
    console.log(message)
}

