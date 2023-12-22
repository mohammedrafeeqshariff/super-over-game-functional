// Getting all html tags to update

const teamScore1 = document.querySelector("#score-team1");
const  wicketTeam1 = document.querySelector("#wickets-team1")

const teamScore2 = document.querySelector("#score-team2");
const  wicketTeam2 = document.querySelector("#wickets-team2")

const resetButton = document.querySelector("#reset")
const strikeButton = document.querySelector("#strike")

// Audio files to play when event occurs

const strikeAudio = new Audio("http://bit.ly/so-ball-hit");
const gameOverAudio = new Audio("http://bit.ly/so-crowd-cheer");

// variables to keep the track of scores, balls, wickets

var team1Score = 0;
var team1Wicket = 0;
var team1BallFaced = 0;

var team2Score = 0;
var team2Wicket = 0;
var team2BallFaced = 0;



var  turn = 1;

var possibleOutcomes = [0,1,2,3,4,6,"W"];

// scores update
function getUpdate(){
    teamScore1.innerText = team1Score;
    teamScore2.innerText = team2Score;

    wicketTeam1.innerText = team1Wicket;
    wicketTeam2.innerText = team2Wicket;
}

function gameOver(){
    gameOverAudio.play();

    if (team1Score > team2Score){
        alert("Team 1 WINS");
    }
    else if(team2Score > team1Score){
        alert("Team 2 WINS");
    }
    else{
        alert("It's a DRAW")
    }
}

strikeButton.addEventListener("click",()=>{
    strikeAudio.play()
    if (turn == 1){
        team1BallFaced++;
        const currentScore = possibleOutcomes[Math.floor(Math.random()*possibleOutcomes.length)];
        if (currentScore =='W'){
            team1Wicket++;
            const currentBall  = document.querySelector(`#team1-superover div:nth-child(${team1BallFaced})`);
            currentBall.innerText="W"
        }
        else{
            const currentBall  = document.querySelector(`#team1-superover div:nth-child(${team1BallFaced})`);
            currentBall.innerText= currentScore;
            team1Score += currentScore
        }
        if ((team1BallFaced==6) || (team1Wicket==2)){
            turn = 2;
        }
    }

    else if (turn = 2){
        team2BallFaced++;
        const currentScore = possibleOutcomes[Math.floor(Math.random()*possibleOutcomes.length)];
        if (currentScore =='W'){
            team2Wicket++;
            const currentBall  = document.querySelector(`#team2-superover div:nth-child(${team2BallFaced})`);
            currentBall.innerText="W"

        }
        else{
            const currentBall  = document.querySelector(`#team2-superover div:nth-child(${team2BallFaced})`);
            currentBall.innerText= currentScore;
            team2Score  += currentScore
        }
        if ((team2BallFaced===6) || (team2Wicket==2) || team1Score < team2Score){
            turn = null;

            gameOver()
        }
    }
    getUpdate()
})

resetButton.addEventListener("click", ()=>{
    window.location.reload()
})