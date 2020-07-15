class Game {
    constructor() {
        this.myCanvas = undefined;
        this.ctx = undefined;
        this.megaman = new Player(this, 0, 200, 100, 100);
        this.enemy1 = new Enemy(this, 800, 200, 60, 75);
        this.enemy2 = new Enemy(this, 900, 300, 60, 75);
        // this.playerBullet = new Component(this, this.megaman.x + this.megaman.width, this.megaman.y + this.megaman.height / 4, 50, 50);
        // this.enemyOneBullet = new Component(this, this.enemy1.x + this.enemy1.width, this.enemy1.y + this.enemy1.height / 4, 50, 50);
        // this.enemyTwoBullet = new Component(this, this.enemy2.x + this.enemy2.width, this.enemy2.y + this.enemy2.height / 4, 50, 50);  
        this.score = 0;
        this.playerBullets = [];
        this.enemyBullets = [];
        this.grid = [
            [0, 0],
            [0, 0],
            [0, 0]
        ]
    }

    init() {
        this.myCanvas = document.querySelector('#my-canvas');
        this.ctx = this.myCanvas.getContext('2d');
        this.i = 0;
        this.j = this.myCanvas.width;
        this.backgroundImg = new Image();
        this.backgroundImg.src = "./images/background.png";
        this.backgroundImg2 = new Image();
        this.backgroundImg2.src = "./images/background.png"
        this.drawBackground();
        this.drawCharacters();
        this.megaman.controls();
        this.enemy1.randomMove();
        this.enemy2.randomMove();
        const interval = setInterval(() => {
            this.clear();
            this.drawBackground();
            this.drawCharacters();

            if (this.megaman.didCollide(this.enemyBullets)) {
                console.log('collision');
                clearInterval(interval);
                this.gameOver();
            }

        }, 1000 / 60);
    }


    drawBackground = () => {
        //setting the scrolling background image
        this.i -= 0.5;
        if (this.i <= -this.myCanvas.width) this.i = this.myCanvas.width;

        this.j -= 0.5;
        if (this.j <= -this.myCanvas.width) this.j = this.myCanvas.width;

        this.ctx.drawImage(this.backgroundImg, this.i, 0, this.myCanvas.width, this.myCanvas.height)
        this.ctx.drawImage(this.backgroundImg2, this.j, 0, this.myCanvas.width, this.myCanvas.height);


        //creating grid for characters(needs refactoring there has to be a way to wrap this in a loop)
        this.ctx.fillStyle = 'navy'
        this.ctx.fillRect(0, 200, this.megaman.width * 2, this.megaman.height * 3)
        this.ctx.fillStyle = 'darkred'
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
    //drawing all game elements on the page (player, enemy, bullets fired)
    drawCharacters() {
        this.enemy1.drawComponent('/images/sword-enemy.png');
        this.enemy2.drawComponent('/images/sword-enemy.png');
        this.megaman.drawComponent('/images/megaman.png');
        this.playerBullets.forEach((bullet, i) => {
            bullet.drawComponent('/images/bullet.png');
            if (bullet.x > this.myCanvas.width) {
                this.playerBullets.splice(i, 1)
            }
            bullet.x += 5;
        })
        this.enemyBullets.forEach((enemyBullet, i) => {
            enemyBullet.drawComponent('/images/bullet-enemy.png');
            if (enemyBullet.x < -50) {
                this.enemyBullets.splice(i, 1)
            }
            enemyBullet.x -= 5;
        })
    }


    gameOver() { //game over state not implemented yet
        this.clear();
        this.drawBackground();
        this.ctx.font = '70px Arial';
        this.ctx.fillStyle = 'red';
        this.ctx.fillText('Game Over!!!', 300, this.myCanvas.height / 2);
    }

}