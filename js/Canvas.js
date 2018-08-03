class PlayGround {
    constructor(id) {
        this.canvas = document.getElementById(id);
        this.ctx = this.canvas.getContext('2d');
        this.cellSize = 20;
    }

    clear() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.height, this.canvas.width);
    }

    fillSquare(x, y, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * this.cellSize + 1, y * this.cellSize + 1, this.cellSize - 2, this.cellSize - 2);
    }

    draw(arr, color) {

        for (let i = 0; i < arr.length; i++) {
            this.fillSquare(arr[i].x, arr[i].y, color);
        }

        /* 画格子会导致后期延迟
        if (arr.length > 1) {
            this.ctx.strokeStyle = '#ddd';
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
        */
    }
}