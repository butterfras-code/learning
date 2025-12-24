let countEl = document.getElementById("count-el")
let count = 0

function increment() {
    count = count + 1
    countEl.innerText = count
}

// 1. Create a function, save(), which logs out the count when it's called


function save() {
    console.log(count)
}

let myPoints = 3
function add3Points() {
    myPoints += 3
}
function remove1Point() {
    myPoints -=1
}
