class PlayGround {
    constructor(id) {
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext('2d');
        this.cellSize = 20;
    }

    clear() {
        this.ctx.fillStyle = '#fff';
        this.ctx.strokeStyle = '#ddd';
        this.ctx.fillRect(0, 0, this.canvas.height, this.canvas.width);
        for (let x = 0.5; x < this.canvas.width; x += this.cellSize) {
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
        }
        for (let y = 0.5; y < this.canvas.height; y += this.cellSize) {
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
        }

        this.ctx.stroke();
    }

    fillSquare(x, y, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
    }

    draw(arr, color) {
        for (let i = 0; i < arr.length; i++) {
            this.fillSquare(arr[i].x, arr[i].y, color);
        }
    }
}