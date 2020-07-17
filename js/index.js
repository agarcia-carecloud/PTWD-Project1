const gettingStarted = document.getElementById("getting-started");
const startBtn = document.getElementById('start-btn');
const playAgain = document.getElementById('play-again');
playAgain.style.display = 'none';

startBtn.addEventListener('click', (event) => {
    gettingStarted.style.display = 'none';
    const myGame = new Game();
    myGame.init();
})

playAgain.addEventListener("click", (event) => {
    location.reload(true)
});