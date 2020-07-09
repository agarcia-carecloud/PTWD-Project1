class Game {
    constructor() {
        this.myCanvas = undefined;
        this.ctx = undefined;
        this.megaman = new Player(this, 0, 200, 100, 100);
        this.enemy1 = new Enemy(this, 800, 200, 60, 75);
        this.enemy2 = new Enemy(this, 900, 300, 60, 75);
        this.score = 0;
    }

    init() {
        this.myCanvas = document.querySelector('#my-canvas');
        this.ctx = this.myCanvas.getContext('2d');
        this.drawBackground();
        this.drawCharacters();
        this.megaman.move();
        this.megaman.shoot();
        this.enemy1.randomMove();
        this.enemy2.randomMove();
        const interval = setInterval(() => {
            this.clear();
            this.drawBackground();
            this.drawCharacters();
            // if (this.megaman.didCollide(this.enemies)) { //placeholder code to update with projectile collision
            //     // alert('collision');
            //     clearInterval(interval);
            //     this.gameOver();
            // }
        }, 1000 / 60);
    }


    drawBackground() {
        this.ctx.fillStyle = 'yellow';
        //background                          1000, 500
        this.ctx.fillRect(0, 0, this.myCanvas.width, this.myCanvas.height);

        //creating grid for characters(needs refactoring there has to be a way to wrap this in a loop)
        this.ctx.fillStyle = 'grey'
        this.ctx.fillRect(0, 200, this.megaman.width * 2, this.megaman.height * 3)
        this.ctx.fillRect(800, 200, this.megaman.width * 2, this.megaman.height * 3)
        this.ctx.fillStyle = 'black'
        this.ctx.strokeRect(0, 200, this.megaman.width, this.megaman.height)
        this.ctx.strokeRect(100, 200, this.megaman.width, this.megaman.height)
        this.ctx.strokeRect(0, 300, this.megaman.width, this.megaman.height)
        this.ctx.strokeRect(100, 300, this.megaman.width, this.megaman.height)
        this.ctx.strokeRect(0, 400, this.megaman.width, this.megaman.height)
        this.ctx.strokeRect(100, 400, this.megaman.width, this.megaman.height)
        this.ctx.strokeRect(800, 200, this.megaman.width, this.megaman.height)
        this.ctx.strokeRect(900, 200, this.megaman.width, this.megaman.height)
        this.ctx.strokeRect(800, 300, this.megaman.width, this.megaman.height)
        this.ctx.strokeRect(900, 300, this.megaman.width, this.megaman.height)
        this.ctx.strokeRect(800, 400, this.megaman.width, this.megaman.height)
        this.ctx.strokeRect(900, 400, this.megaman.width, this.megaman.height)
    }

    clear() {
        this.ctx.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);
    }

    drawCharacters() {
        this.enemy1.drawComponent('/images/sword-enemy.png');
        this.enemy2.drawComponent('/images/sword-enemy.png');
        this.megaman.drawComponent('/images/megaman.png');
    }

    gameOver() { //game over state not implemented yet
        this.clear();
        this.drawBackground();
        this.ctx.font = '70px Arial';
        this.ctx.fillStyle = 'red';
        this.ctx.fillText('Game Over!!!', 300, this.myCanvas.height / 2);
    }

}