class Game {
    constructor() {
        this.myCanvas = undefined;
        this.ctx = undefined;
        this.megaman = new Player(this, 0, 200, 100, 100);
        this.enemy1 = new Enemy(this, 800, 200, 60, 75, 'enemyOne');
        this.enemy2 = new Enemy(this, 900, 300, 60, 75, 'enemyTwo');
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

        //interval to redraw the canvas elements
        const interval = setInterval(() => {
            this.clear();
            this.drawBackground();
            this.drawCharacters();

            //Player hit detection checks.

            //NOTE: Known bug where EnemyTwo bullets deduct 2 lives from the player instead of 1 when it collides. Unable to identify root cause as this issue does not occur with EnemyOne. 

            this.enemyBullets.forEach((ele) => {
                if (this.megaman.didCollide(ele)) {
                    this.enemyBullets.splice(ele, 1)
                    this.ctx.clearRect(this.megaman.x, this.megaman.y, this.megaman.width, this.megaman.height);
                    this.megaman.lives--;
                    // console.log(`Megaman has ${this.megaman.lives} Lives left`)
                    if (this.megaman.lives <= 0) {
                        clearInterval(interval);
                        this.gameOver();
                    }
                }
            })

            //enemy hit detection checks.
            this.playerBullets.forEach((ele) => {
                if (this.enemy1.didCollide(ele)) {
                    this.playerBullets.splice(ele, 1)
                    this.ctx.clearRect(this.enemy1.x, this.enemy1.y, this.enemy1.width, this.enemy1.height);
                    this.enemy1.lives--;
                    if (!this.enemy1.lives) {
                        this.ctx.clearRect(this.enemy1.x, this.enemy1.y, this.enemy1.width, this.enemy1.height);
                        this.enemy1.isAlive = false;
                        this.enemy1.x = -500; //moving offscreen to remove from canvas
                    } // }else console.log(`enemyOne has ${this.enemy1} lives left`)

                }
            })
            //enemy hit detection checks.
            this.playerBullets.forEach((ele) => {
                if (this.enemy2.didCollide(ele)) {
                    this.playerBullets.splice(ele, 1)
                    this.ctx.clearRect(this.enemy2.x, this.enemy2.y, this.enemy2.width, this.enemy2.height);
                    this.enemy2.lives--;
                    if (!this.enemy2.lives) {
                        this.ctx.clearRect(this.enemy2.x, this.enemy2.y, this.enemy2.width, this.enemy2.height);
                        this.enemy2.isAlive = false;
                        this.enemy2.x = -500; //moving offscreen to remove from canvas
                    } // } else console.log(`enemyTwo has ${this.enemy2} lives left`)
                }
            })
            //check if game is won
            if (!this.enemy1.lives && !this.enemy2.lives) {
                clearInterval(interval);
                this.gameWin();
            }
        }, 1000 / 60);
    }

    //draw the background and movement grids
    drawBackground = () => {

        //setting the scrolling background image
        this.i -= 0.5;
        if (this.i <= -this.myCanvas.width) this.i = this.myCanvas.width;

        this.j -= 0.5;
        if (this.j <= -this.myCanvas.width) this.j = this.myCanvas.width;

        this.ctx.drawImage(this.backgroundImg, this.i, 0, this.myCanvas.width, this.myCanvas.height)
        this.ctx.drawImage(this.backgroundImg2, this.j, 0, this.myCanvas.width, this.myCanvas.height);



        //drawing movement grid for characters on canvas
        this.ctx.fillStyle = 'lightblue'
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

        // this.ctx.fillStyle = 'white';
        // this.ctx.font = '35px Arial';
        // this.ctx.fillText = (`Lives Left: ${this.megaman.lives}`, 50, 90, 200)
    }

    clear() {
        this.ctx.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);
    }
    //drawing all game elements on the page (player, enemy, bullets fired)
    drawCharacters() {
        if (this.enemy1.isAlive) {
            this.enemy1.drawComponent('./images/sword-enemy-one.png');
        }
        if (this.enemy2.isAlive) {
            this.enemy2.drawComponent('./images/sword-enemy-two.png');
        }
        this.megaman.drawComponent('./images/megaman.png');

        //clear fired bullets from playerBullets array after they are off canvas
        this.playerBullets.forEach((bullet, i) => {
            bullet.drawComponent('./images/bullet.png');
            if (bullet.x > this.myCanvas.width) {
                this.playerBullets.splice(i, 1)
            }
            bullet.x += 10; //moving bullets across canvas
        })

        //clear fired bullets from enemyBullets array after they are off canvas
        this.enemyBullets.forEach((enemyBullet, i) => {
            enemyBullet.drawComponent('./images/bullet-enemy.png');
            if (enemyBullet.x < -50) {
                this.enemyBullets.splice(i, 1)
            }
            enemyBullet.x -= 7; //moving bullets across canvas
        })
    }

    gameWin() {
        this.enemy1.isAlive = false;
        this.enemy2.isAlive = false;
        this.clear();
        this.drawBackground();
        this.ctx.font = '70px Arial';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText('You Win!!!', 350, this.myCanvas.height / 4);
        playAgain.style.display = 'block';
    }

    gameOver() {
        this.enemy1.isAlive = false;
        this.enemy2.isAlive = false;
        this.clear();
        this.drawBackground();
        this.ctx.font = '60px Arial';
        this.ctx.fillStyle = 'magenta';
        this.ctx.fillText('Game Over...', 300, this.myCanvas.height / 4);
        playAgain.style.display = 'block';
    }

}