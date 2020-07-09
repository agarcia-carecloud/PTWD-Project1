class Player extends Component {
    constructor(game, x, y, width, height, health, strength) {
        super(game, x, y, width, height);
        this.health = health;
        this.strength = strength;
    }

    shoot() {
        document.addEventListener('keydown', event => {
            if (event.keyCode === 32) {
                console.log('Buster shot!');
            }
        })
    }

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

    move() { //didnt use nested arrays, consider refactoring this later
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
            }
        });
    }
}