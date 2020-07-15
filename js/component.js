class Component {
    constructor(game, x, y, width, height) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = new Image();
    }

    drawComponent(imgSource) {
        const theCtx = this.game.ctx;
        this.img.src = imgSource;
        theCtx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    getLeft() {
        return this.x;
    }

    getRight() {
        return this.x + this.width - 30;
    }

    getTop() {
        return this.y + 30;
    }

    getBottom() {
        return this.y + this.height - 50;
    }

    didCollide(otherComp) {
        // const crossLeft = otherComp.x >= this.getLeft() && otherComp.x <= this.getRight();
        // const crossRight =
        //     otherComp.x + otherComp.width >= this.getLeft() && otherComp.x + otherComp.width <= this.getRight();
        // const crossTop = otherComp.y <= this.getBottom() && otherComp.y >= this.getTop();

        // const crossBottom =
        //     otherComp.y + otherComp.height >= this.getTop() && otherComp.y + otherComp.height <= this.getBottom();

        // if ((crossLeft || crossRight) && (crossBottom || crossTop)) {
        //     return true;
        // }
        // return false;
        if (
            this.getRight() >= otherComp.x &&
            this.getLeft() <= otherComp.x + otherComp.width &&
            this.getBottom() >= otherComp.y &&
            this.getTop() <= otherComp.y + otherComp.height
        ) {
            return true;
        }
        return false;
    }
}