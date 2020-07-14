class Player extends Component {
    constructor(game, x, y, width, height, health, strength) {
        super(game, x, y, width, height);
        this.health = 50;
        this.strength = 10;

    }

    shoot() { //method to generate a bullet every time the player presses the shoot button
        const bullet = new Component(this.game, this.x + this.width, this.y + (this.height / 4.5), 50, 50);
        this.game.playerBullets.push(bullet);
        console.log('Buster shot!'); //check that method is called successfully.

    }


    //Code not implemented yet
    //could I roll this into the shoot method? Attack should only trigger if it hits an enemy. 
    attack() {
        return this.strength;
    }

    takeDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            return `something died.`
        } else return `damage should be deducted from health.`
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
                    this.shoot();
                    break;
            }
        });
    }
}