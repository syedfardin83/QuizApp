const username = document.getElementById("username");
const saveScoreButton = document.getElementById("saveScoreButton");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const MAX_HIGH_SCORES = 5;

const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScores);

finalScore.innerText = mostRecentScore;
username.addEventListener('keyup', () => {
    //console.log(username.value);

    saveScoreBtn.disabled = !username.value;

});
saveHighScore = (e) => {
    //console.log("Clicked the save button!");
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        // score: Math.floor(Math.random()*100),
        username: username.value
    }

    highScores.push(score)

    highScores.sort( (a,b)=> b.score - a.score);

    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    console.log(highScores);
    window.location.assign('/');

}