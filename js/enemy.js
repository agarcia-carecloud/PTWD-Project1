class Enemy extends Player {
    constructor(game, x, y, width, height, health, strength) {
        super(game, x, y, width, height, health, strength)
    }

    attack() {
        return this.strength;
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            return `something died.`
        } else return `damage should be deducted from health.`
    }


    randomMove() {


        setInterval(() => {
            let newX = Math.round(Math.random() * 2);
            let newY = Math.round(Math.random() * 3);
            let validPos = true;
            console.log(validPos)
            switch (newX) {
                case 1:
                    newX = 800;
                    break;
                case 2:
                    newX = 900;
                    break;

            }

            switch (newY) {
                case 1:
                    newY = 200;
                    break;
                case 2:
                    newY = 300;
                    break;
                case 3:
                    newY = 400;
                    break;
            }
            if (myGame.enemy1.x === newX && myGame.enemy1.y === newY) {
                validPos = false;
            }

            if (myGame.enemy2.x === newX && myGame.enemy2.y === newY) {
                validPos = false;
            }

            if (validPos) {
                this.x = newX;
                this.y = newY;
                console.log(this.x, this.y)
            } else {
                console.log(`didn't move X:${newX} Y:${newY}`);
                this.randomMove();
            }
        }, 1000);

        /*  [800,200],[900,200]
            [800,300],[900,300]
            [800,400],[900,400]
            */
    }
}