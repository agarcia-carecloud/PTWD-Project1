class Player extends Component {
    constructor(game, x, y, width, height) {
        super(game, x, y, width, height);
        this.lives = 3;
    }

    //method to generate a bullet every time the player presses the shoot button
    shoot() {
        const bullet = new Component(this.game, this.x + this.width, this.y + (this.height / 4.5), 50, 50);
        this.game.playerBullets.push(bullet);
        // console.log('Buster shot!'); 

    }

    //Declaring controls for player
    controls() {
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
                    if (this.game.playerBullets.length < 2) {
                        this.shoot();
                    } else console.log(`reloading!`)
                    break;
            }
        });
    }
}