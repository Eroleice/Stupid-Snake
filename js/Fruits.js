class Fruit {
    constructor(num, seed) {
        this.width = 25;
        this.height = 25;
        this.num = num;
        this.seed = seed;
        this.attempt = 0;
        this.coordination = {
            'x': null,
            'y': null
        };
        this.color = '#ff3636';
        // this.path = [];
    }

    spawn() {
        let newFruit;
        let check = false;
        while (!check) {
            check = true;
            Math.seedrandom(this.attempt);
            newFruit = {
                'x': Math.floor(Math.random() * this.width),
                'y': Math.floor(Math.random() * this.height)
            };
            for (let i = 0; i < population[this.num].Snape.body.length; i++) {
                if (hitCheck(newFruit, population[this.num].Snape.body[i])) {
                    check = false;
                    this.attempt += 1;
                }
            }
        }
        Math.seedrandom();
        this.attempt += 1;
        this.coordination = newFruit;
        // this.path.push(newFruit);
        print('New fruit generated at ' + JSON.stringify(newFruit) + '.');
    }

    raise() {
        this.attempt = 0;
        this.coordination = {
            'x': null,
            'y': null
        };
        // this.path = [];
        this.spawn();
    }
}