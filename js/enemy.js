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

    }
}