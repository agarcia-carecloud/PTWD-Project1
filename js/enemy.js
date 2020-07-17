class Enemy extends Player {
    constructor(game, x, y, width, height, name) {
        super(game, x, y, width, height)
        this.name = name;
        this.isAlive = true;
        this.lives = 5;
    }

    shoot() {
        const enemyBullet = new Component(this.game, this.x, this.y, 50, 50);
        this.game.enemyBullets.push(enemyBullet);

    }

    // shootTwo() {
    //     if (myGame.enemyTwoAlive) {
    //         const enemyTwoBullet = new Component(this.game, this.x, this.y, 50, 50);
    //         this.game.enemyTwoBullets.push(enemyTwoBullet);
    //     }
    // }


    randomMove() {

        let successfulMoves = 0;

        setInterval(() => {
            let newX;
            let newY;
            if (this.isAlive) {
                do {
                    newX = Math.floor(Math.random() * 2);
                    // console.log(newX)
                    newY = Math.floor(Math.random() * 3);
                    // console.log(newY)
                } while (this.game.grid[newX][newY] === 1)

                this.game.grid[newX][newY] = 1;
                this.game.grid[(this.x - 800) / 100][(this.y - 200) / 100] = 0;
                switch (newX) {
                    case 0: //this case was implemented to prevent out of bounds movement
                        newX = 800;
                        break;
                    case 1:
                        newX = 900;
                        break;
                    case 2:
                        newX = 900;
                        break;

                }

                switch (newY) {
                    case 0: //this case was implemented to prevent out of bounds movement
                        newY = 200;
                        break;
                    case 1:
                        newY = 300;
                        break;
                    case 2:
                        newY = 400;
                        break;
                    case 3:
                        newY = 400;
                        break;
                }
                this.x = newX;
                this.y = newY;
                // console.log(this.x, this.y)
                successfulMoves++;

                if (successfulMoves === 4) {
                    successfulMoves = 0;
                    this.shoot();
                    console.log(`${this.name} shooting`)
                }
            }
        }, 800);

        /*  [800,200],[900,200]
            [800,300],[900,300]
            [800,400],[900,400]
            */
    }
}