let chooseBox = document.querySelectorAll('.rock-container, .paper-container, .scissor-container');
let optionArr = ['rock', 'paper', 'scissor'];
let imagePaths = {
    rock: 'images/stone.project.png',
    paper: 'images/paper.project.png',
    scissor: 'images/scissors.project.png',
};
let yourPoint = 0;
let pcPoint = 0;

let tryAgain = document.querySelector('.tie-message');
let initialOn = document.querySelector('.selection-on');
let initialOff = document.querySelector('.selection-off');
let playerScore = document.querySelector('#player-score');
let computerScore = document.querySelector('#computer-score');
let rulesModal = document.querySelector('.rules-modal');

chooseBox.forEach(element => {
    element.addEventListener('click', () => {
        let userClicked = element.className.split('-')[0];
        let randomComp = Math.floor(Math.random() * 3);
        let compClicked = optionArr[randomComp];
        checkWin(userClicked, compClicked);
    });
});

function checkWin(user, comp) {
    if (user === comp) {
        setTie(user, comp);
    } else {
        tryAgain.style.display = 'none';
        if (
            (user === 'rock' && comp === 'scissor') ||
            (user === 'paper' && comp === 'rock') ||
            (user === 'scissor' && comp === 'paper')
        ) {
            setArea(user, 'WIN', comp);
        } else {
            setArea(user, 'LOSE', comp);
        }
    }
}

function setArea(user, result, comp) {
    initialOn.style.display = 'none';
    initialOff.style.display = 'flex';
    initialOff.style.flexDirection = 'column';
    initialOff.style.justifyContent = 'center';
    initialOff.style.alignItems = 'center';
    initialOff.style.gap = '40px';

    const userBorderColor = result === 'WIN' ? '#007BFF' : '#FFA500';
    const compBorderColor = result === 'WIN' ? '#FFA500' : '#007BFF';

    initialOff.innerHTML = `
        <h2 style="font-family: 'Roboto', sans-serif; font-size: 39px; font-weight: 800; line-height: 45.7px; letter-spacing: 0.1em; text-align: center; text-transform: uppercase; margin-bottom: 20px; color: #FFFFFF;">
            YOU ${result} AGAINST PC
        </h2>
        <div style="display: flex; justify-content: center; align-items: center; gap: 100px;">
            <div style="text-align: center;">
                <p style="font-family: 'Roboto', sans-serif; font-size: 16px; font-weight: 500; margin-bottom: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #FFFFFF;">You Picked</p>
                <div class="box" style="width: 120px; height: 120px; display: flex; justify-content: center; align-items: center; border-radius: 50%; background-color: #fff; box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2); border: 10px solid ${userBorderColor};">
                    <img src="${imagePaths[user]}" alt="${user}" style="width: 60px; border: none;">
                </div>
            </div>
            <div style="text-align: center;">
                <p style="font-family: 'Roboto', sans-serif; font-size: 16px; font-weight: 500; margin-bottom: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: #FFFFFF;">PC Picked</p>
                <div class="box" style="width: 120px; height: 120px; display: flex; justify-content: center; align-items: center; border-radius: 50%; background-color: #fff; box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2); border: 10px solid ${compBorderColor};">
                    <img src="${imagePaths[comp]}" alt="${comp}" style="width: 60px; border: none;">
                </div>
            </div>
        </div>
        <button onclick="playAgain()" style="padding: 10px 30px; font-size: 15px; font-family: 'Roboto', sans-serif; font-weight: 600; line-height: 17.58px; letter-spacing: 0.1em; text-align: center; background-color: #FFFFFF; color: #000000; border: none; border-radius: 5px; cursor: pointer;">
            Play Again
        </button>
    `;

    if (result === 'WIN') {
        yourPoint++;
        playerScore.innerHTML = yourPoint;
    } else if (result === 'LOSE') {
        pcPoint++;
        computerScore.innerHTML = pcPoint;
    }
}

function playAgain() {
    initialOn.style.display = 'flex';
    initialOff.style.display = 'none';
    tryAgain.style.display = 'none';
}

function gameRule() {
    rulesModal.style.display = rulesModal.style.display === 'none' || rulesModal.style.display === '' ? 'block' : 'none';
}
