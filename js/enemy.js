class Enemy extends Player {
    constructor(game, x, y, width, height, health, strength, position) {
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
            let newX;
            let newY;
            do {
                newX = Math.floor(Math.random() * 2);
                console.log(newX)
                newY = Math.floor(Math.random() * 3);
                console.log(newY)
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
            console.log(this.x, this.y)
        }, 2000);

        /*  [800,200],[900,200]
            [800,300],[900,300]
            [800,400],[900,400]
            */
    }
}