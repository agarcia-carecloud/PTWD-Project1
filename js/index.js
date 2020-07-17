const gettingStarted = document.getElementById("getting-started");
const startBtn = document.getElementById('start-btn');

startBtn.addEventListener('click', (event) => {
    gettingStarted.style.display = 'none';
    const myGame = new Game();
    myGame.init();
})