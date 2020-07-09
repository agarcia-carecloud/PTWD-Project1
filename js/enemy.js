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

        //REMINDER to wrap in setInterval to delay moving between positions. 

        /* declare a variable to store the current position of an enemy in the movement grid (2 columns, 3 rows. )
        

        How do I assign a value to each position of the movement grid? A nested array?
            
        Then, use Math.random to select a different position in the grid to move to. 
        
        Create a conditional statement to check if any other enemies are already in that position. If true, use recursive function to check for another free space on the grid. */

        let grid = [
            [this.x, this.y, this.x + 100, this.y],
            [this.x, this.y - 100, this.x + 100, this.y - 100],
            [this.x, this.y - 200, this.x + 100, this.y - 200]
        ]

        let enemyPosX = grid[0][0];
        let enemyPosY = grid[0][1];
        console.log(enemyPosX, enemyPosY)



    }
}