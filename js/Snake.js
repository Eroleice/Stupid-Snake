class Snake {
    constructor(num, seed) {
        this.width = 25;
        this.height = 25;
        this.num = num;
        this.seed = seed;
        this.live = true;
        this.hunger = 50;
        this.color = getRandomColor(this.seed);
        Math.seedrandom(this.seed + this.num);
        this.body = [
            {
                'x': Math.floor(Math.random() * this.width),
                'y': Math.floor(Math.random() * this.height)
            }
        ];
        this.direction = {
            'x': 1,
            'y': 0
        };
        this.movements = 0;

        print('New snake generated at ' + JSON.stringify(this.body[0]) + '.');
    }

    // ÅÀ¡­¡­ÅÀÐÐ ¡ª¡ª ÉßÊÇÅÀÐÐ¶¯Îï!
    move() {
        this.movements += 1;
        this.hunger -= 1;
        let newHead = {
            'x': this.body[0].x + this.direction.x,
            'y': this.body[0].y + this.direction.y
        };

        // ËÀÍö¼ì²â
        if (this.deathCheck(newHead)) {
            this.live = false;
            return undefined;
        }

        this.body.unshift(newHead);
        print('Snake moves to ' + JSON.stringify(newHead) + '. Hunger left: ' + this.hunger + '.');

        // ³ÔÆ»¹û¼ì²â
        if (!hitCheck(newHead, population[this.num].Apple.coordination)) {
            this.body.pop();
        } else {
            this.health = 50 * this.body.length;
            population[this.num].Apple.spawn(this);
        }    
    }

    // ×ó×ª
    turnLeft() {
        let newDirection = {
            'x': 0,
            'y': 0
        };
        if (this.direction.y == 1) {
            newDirection.x = 1;
        } else if (this.direction.y == -1) {
            newDirection.x = -1;
        } else if (this.direction.x == 1) {
            newDirection.y = -1;
        } else if (this.direction.x == -1) {
            newDirection.y = 1
        }
        this.direction = newDirection;
        this.move();
    }

    // ÓÒ×ª
    turnRight() {
        let newDirection = {
            'x': 0,
            'y': 0
        };
        if (this.direction.y == 1) {
            newDirection.x = -1;
        } else if (this.direction.y == -1) {
            newDirection.x = 1;
        } else if (this.direction.x == 1) {
            newDirection.y = 1;
        } else if (this.direction.x == -1) {
            newDirection.y = -1
        }
        this.direction = newDirection;
        this.move();
    }

    // Ö±ÐÐ
    goStraight() {
        this.move();
    }

    // ËÀÍö¼ì²â
    deathCheck(head) {
        // ×²Ç½¼ì²â
        if (head.x < 0 || head.x > (this.width - 1) || head.y < 0 || head.y > (this.height - 1)) {
            print('Snake hits the wall, rip.');
            return true;
        }
        // ×²×Ô¼º¼ì²â
        if (this.body.length > 4) {
            for (let i = 4; i < this.body.length; i++) {
                if (hitCheck(head, this.body[i])) {
                    print('Snake hits itself, rip.');
                    return true;
                }
            }
        }
        // ¶öËÀ¼ì²â
        if (this.hunger < 0) {
            print('Snake dies of hunger, rip.');
            return true;
        }
        return false;        
    }

    // ¸´»î!
    raise() {
        this.live = true;
        this.hunger = 50;
        Math.seedrandom(this.seed + this.num);
        this.body = [
            {
                'x': Math.floor(Math.random() * this.width),
                'y': Math.floor(Math.random() * this.height)
            }
        ];
        this.direction = {
            'x': 1,
            'y': 0
        };
        this.movements = 0;

        print('New snake generated at ' + JSON.stringify(this.body[0]) + '.');
    }
}

function getRandomColor(seed) {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        Math.seedrandom(seed + i);
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}