class Team{
    constructor(tName, batting = false){
        this.teamName = tName;
        this.wickets = 0;
        this.ballPlayed = 0;
        this.onBatting = batting;
        this.totalRun = 0;
        this.target = 0;
    }

    play(){
        let n = (Math.random() + Math.floor(Math.random() * 5) + 5);
        n = Number(n.toFixed(3));
        document.querySelector("#circle").style.transform = `rotate(${n}turn)`;

        let score;
        let x = (n - Math.floor(n)).toFixed(3);
        if(x < .125){
            score = 4;  
        }else if(x > .125 && x < .25){
            score = "out";
        }else if(x > .25 && x < .375){
            score = 1;
        }else if(x > .375 && x < .5){
            score = 6;
        }else if(x > .5 && x < .625){
            score = "out";
        }else if(x > .625 && x < .75){
            score = 3;
        }else if(x > .75 && x < .875){
            score = 2;
        }else if(x > .875 && x < 1){
            score = 0;
        }else{
            score = 0;
        }

        this.updateScore(score);
    }

    updateScore(score){
        if (score === "out"){
            this.wickets++;
        }else if(score !== 0){
            this.totalRun += score;
        }
        this.ballPlayed++;
    }

    resetCircle(){
        document.querySelector("#circle").style.transform = `rotate(0turn)`;
    }
}

function simulate(team){
    let teamOne = team;
    let teamTwo;
    if (teamOne === team_A){
        teamTwo = team_B;
    }else{
        teamTwo = team_A;
    }

    if(!teamOne.target && (teamOne.wickets === fixedWicket || teamOne.ballPlayed === fixedOver*6)){
        console.log(`Target = ${teamOne.totalRun}`);

        setTimeout(() => {
            displayTitle(`1st innings over, Target: ${teamOne.totalRun}`);
        }, 2000)

        teamTwo.target = teamOne.totalRun;

    }else if (teamOne.target) {
        let str;
        if (teamOne.wickets === fixedWicket || teamOne.ballPlayed === fixedOver*6 || teamOne.totalRun > teamOne.target){
            if (teamOne.totalRun > teamOne.target){
                str = `Team ${teamOne.teamName} won the match by ${fixedWicket-teamOne.wickets} wicket`;
            }else if (teamOne.totalRun < teamOne.target){
                str = `Team ${teamTwo.teamName} won the match by ${teamOne.target - teamOne.totalRun} run`;
            }else if (teamOne.totalRun === teamOne.target){
                str = "Match draw....";
            }

            setTimeout(() => {
                displayResult(str);
            }, 2500)
            teamOne.onBatting = false;
        }
    }

    setTimeout(() => {
        displayScore(teamOne);
    }, 2000);
    

    setTimeout(() => {
        teamOne.resetCircle();
        setTimeout(() => {
            play.disabled = false;
            play.style.opacity = "1";
        }, 2000)
    }, 3500);
}

function displayTitle(string){
    infoText.innerText = string;
    play.style.display = "none";
    innings.style.display = "inline-block";
}

function displayResult(string){
    field.style.display = "none";
    result.style.display = "flex";
    
    if (string.includes('Draw')){
        resultDraw.children[0].innerText = string;
        resultWin.style.display = "none";
        resultDraw.style.display = "block";
    }else{
        resultWin.children[0].innerText = string;
        resultWin.style.display = "block";
        resultDraw.style.display = "none";
    }

}

function displayScore(team){

    let templateOne = `<li class="list__item">Total Run: ${team.totalRun}</li>
                        <li class="list__item">Wickets: ${team.wickets}</li>
                        <li class="list__item">Overs: ${Math.floor(team.ballPlayed/6)+'.'+(team.ballPlayed%6)}</li>`

    let templateTwo = `<li class="list__item">Total Run: ${team.totalRun}</li>
                        <li class="list__item">Wickets: ${team.wickets}</li>
                        <li class="list__item">Overs: ${Math.floor(team.ballPlayed/6)+'.'+(team.ballPlayed%6)}</li>
                        <li class="list__item">Require Run: ${team.target - team.totalRun < 0 ? 0 : team.target - team.totalRun}</li>
                        <li class="list__item">Target: ${team.target}</li>`

    if (team === team_A){
        if (!team.target){
            teamAScore.innerHTML = templateOne;
        }else{
            teamAScore.innerHTML = templateTwo;
        }
        
    }else{
        if (!team.target){
            teamBScore.innerHTML = templateOne;
        }else{
            teamBScore.innerHTML = templateTwo;
        }
    }
}

function clearScoreBoard(){
    let template = `<li class="list__item">Total Run: </li>
                    <li class="list__item">Wickets: </li>
                    <li class="list__item">Overs: </li>`

    teamBScore.innerHTML = template;
    teamAScore.innerHTML = template;
}

function createTeam(){
    if (firstBat === "teamA"){
        team_A = new Team("A", true);
        team_B = new Team("B", false);
    }else{
        team_A = new Team("A", false);
        team_B = new Team("B", true);
    }
}

function startGame(){
    homeView.style.display = "none";
    mainView.style.display = "block";
    if (team_A.onBatting){
        infoText.innerText = "Team A on batting";
    }else{
        infoText.innerText = "Team B on batting";
    }
}

function exitGame(){
    clearScoreBoard();
    mainView.style.display = "none";
    result.style.display = "none";
    field.style.display = "flex";
    homeView.style.display = "block";
}

function playAgain(){
    result.style.display = "none";
    field.style.display = "flex";
    clearScoreBoard();
    createTeam();
    startGame();
}

let play = document.querySelector("#play");
let innings = document.querySelector("#inngs"); 
let infoText = document.querySelector("#info");
let teamAScore = document.querySelector("#list-A");
let teamBScore = document.querySelector("#list-B");
let result = document.querySelector("#result");
let resultDraw = document.querySelector("#resultDraw");
let resultWin= document.querySelector("#resultWin");
let field = document.querySelector("#fieldId");
let bg_A = document.querySelector("#A-bg");
let bg_B = document.querySelector("#B-bg");
let startBtn = document.querySelector("#startBtn");
let form = document.querySelector("#formData");
let homeView = document.querySelector("#homeView");
let mainView = document.querySelector("#mainView");
let playAgainBtn = document.querySelector("#playAgainBtn");
let exitBtn = document.querySelector("#exitBtn");


let team_A;
let team_B;

let fixedWicket;
let fixedOver;
let firstBat;

let formData;

startBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    formData = new FormData(form);
    [fixedWicket, fixedOver, firstBat] = [...formData.values()];
    fixedWicket = Number(fixedWicket);
    fixedOver = Number(fixedOver);
    setTimeout(() => {
        createTeam();
        startGame();
    }, 1000);
})

exitBtn.addEventListener('click', () => {
    exitGame();
})

playAgainBtn.addEventListener('click', () => {
    playAgain();
})

play.addEventListener('click', () => {
    if (team_A.onBatting){
        infoText.innerText = `Team ${team_A.teamName} on batting`;
        bg_A.style.backgroundImage = "url(./images/img9.jpg)";
        team_A.play();
        play.disabled = true;
        play.style.opacity = ".5";
        simulate(team_A);
    }else{
        bg_A.style.backgroundImage = "url(./images/img12.jpg)";
    }

    if (team_B.onBatting){
        infoText.innerText = `Team ${team_B.teamName} on batting`;
        bg_B.style.backgroundImage = "url(./images/img9.jpg)";
        team_B.play();
        play.disabled = true;
        play.style.opacity = ".5";
        simulate(team_B);
    }else{
        bg_B.style.backgroundImage = "url(./images/img12.jpg)";
    }
})

innings.addEventListener('click', () => {
    if (!team_A.onBatting){
        team_B.onBatting = false;
        team_A.onBatting = true;
        infoText.innerText = `Team ${team_A.teamName} on batting`;
    }else{
        team_A.onBatting = false;
        team_B.onBatting = true;
        infoText.innerText = `Team ${team_B.teamName} on batting`;
    }
    play.style.display = "inline-block";
    innings.style.display = "none";
})
