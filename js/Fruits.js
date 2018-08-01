class Fruit {
    constructor(num, seed) {
        this.width = 25;
        this.height = 25;
        this.num = num;
        this.seed = seed;
        this.coordination = {
            'x': null,
            'y': null
        };
        this.color = '#ff3636';
    }

    spawn(snake) {
        let attempt = 0;
        let newFruit;
        Math.seedrandom(this.seed + snake.length + attempt);
        let check = false;
        while (!check) {
            check = true;
            newFruit = {
                'x': Math.floor(Math.random() * this.width),
                'y': Math.floor(Math.random() * this.height)
            };
            for (let i = 0; i < snake.body.length; i++) {
                if (hitCheck(newFruit, snake.body[i])) {
                    check = false;
                }
            }
        }
        this.coordination = newFruit;
        print('New fruit generated at ' + JSON.stringify(newFruit) + '.');
    }
}