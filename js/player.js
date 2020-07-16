class Player extends Component {
    constructor(game, x, y, width, height) {
        super(game, x, y, width, height);
        this.lives = 3;

    }

    shoot() { //method to generate a bullet every time the player presses the shoot button
        const bullet = new Component(this.game, this.x + this.width, this.y + (this.height / 4.5), 50, 50);
        this.game.playerBullets.push(bullet);
        console.log('Buster shot!'); //check that method is called successfully.

    }


    //Code not implemented yet
    //could I roll this into the shoot method? Attack should only trigger if it hits an enemy. 
    onHit() {



        return `Take that!`
    }

    takeDamage() {
        this.lives -= 1;
        if (this.lives <= 0) {

            this.game.gameOver();
        } else return `Ouch!`
    }

    controls() { //should I refactor this?
        document.addEventListener('keydown', event => {
            event.preventDefault();
            switch (event.keyCode) {
                case 37:
                case 65:
                    if (this.x > 0) this.x -= this.width;
                    break;
                case 39:
                case 68:
                    if (this.x < this.width) this.x += this.width;
                    break;

                case 38:
                case 87:
                    if (this.y > this.height * 2) this.y -= this.height;
                    break;

                case 40:
                case 83:
                    if (this.y < 500 - this.height) this.y += this.height;
                    break;
                case 32:
                    if (this.game.playerBullets.length < 3) {
                        this.shoot();
                    } else console.log(`reloading!`)
                    break;
            }
        });
    }
}