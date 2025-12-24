let Scores= [0,0]

function updateScores() {
    document.getElementById("homeScore").textContent = Scores[0]
    document.getElementById("guestScore").textContent = Scores[1]
}

function increaseScore(team, points) {
    Scores[team] += points
    updateScores()
}