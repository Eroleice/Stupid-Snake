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
                'x': 13,
                'y': 13
            },
            {
                'x': 12,
                'y': 13
            },
            {
                'x': 11,
                'y': 13
            },
            {
                'x': 10,
                'y': 13
            },
            {
                'x': 9,
                'y': 13
            }
        ];
        this.direction = {
            'x': 1,
            'y': 0
        };
        this.movements = 0;
        // this.path = [this.body[0]];

        print('New snake generated at ' + JSON.stringify(this.body[0]) + '.');
    }

    // ���������� ���� �������ж���!
    move() {
        
        this.hunger -= 1;

        let newHead = {
            'x': this.body[0].x + this.direction.x,
            'y': this.body[0].y + this.direction.y
        };

        // �������
        if (this.deathCheck(newHead)) {
            this.live = false;
            return undefined;
        }

        this.body.unshift(newHead);
        // this.path.push(newHead);
        print('Snake moves to ' + JSON.stringify(newHead) + '. Hunger left: ' + this.hunger + '.');

        // ��ƻ�����
        if (!hitCheck(newHead, population[this.num].Apple.coordination)) {
            this.body.pop();
        } else {
            this.hunger = 25 + 25 * this.body.length;
            population[this.num].Apple.spawn();
        }

        this.movements += 1;
    }

    // ��ת
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

    // ��ת
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

    // ֱ��
    goStraight() {
        this.move();
    }

    // �������
    deathCheck(head) {
        // ײǽ���
        if (head.x < 0 || head.x > (this.width - 1) || head.y < 0 || head.y > (this.height - 1)) {
            print('Snake hits the wall, rip.');
            return true;
        }
        // ײ�Լ����
        if (this.body.length > 4) {
            for (let i = 3; i < (this.body.length - 1); i++) {
                if (hitCheck(head, this.body[i])) {
                    print('Snake hits itself, rip.');
                    return true;
                }
            }
        }
        // �������
        if (this.hunger < 0) {
            print('Snake dies of hunger, rip.');
            return true;
        }
        return false;        
    }

    // ����!
    raise() {
        this.live = true;
        this.hunger = 50;
        Math.seedrandom(this.seed + this.num);
        this.body = [
            {
                'x': 13,
                'y': 13
            },
            {
                'x': 12,
                'y': 13
            },
            {
                'x': 11,
                'y': 13
            },
            {
                'x': 10,
                'y': 13
            },
            {
                'x': 9,
                'y': 13
            }
        ];
        this.direction = {
            'x': 1,
            'y': 0
        };
        this.movements = 0;
        // this.path = [];

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