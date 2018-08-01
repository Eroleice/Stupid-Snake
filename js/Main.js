var population = [];
var snakeCount = 1;

var PG = new PlayGround('canvas');
PG.clear();
var play = null;

for (let i = 0; i < 50; i++) {
    let seed = seedGen();
    population[i] = {
        'ID': '#' + snakeCount,
        'Seed': seed,
        'Snape': new Snake(i, seed),
        'Apple': new Fruit(i, seed),
        'NN': new NeuralNetwork(3, 12, 3),
        'DNA': null,
        'fitness': 0
    };
    document.getElementById('population-list').innerHTML += '<p class="snakes" onclick="releaseSnake(' + i + ')">' + population[i].ID + '</p>';
    snakeCount += 1;
}

function releaseSnake(num) {
    if (play !== null) {
        clearInterval(play);
    }

    let Snape = population[num].Snape;
    let Apple = population[num].Apple;
    let NN = population[num].NN;

    Snape.raise(); // 复活!
    Apple.spawn(Snape);

    play = setInterval(update, 250, population[num]);
}


function update(data) {
    let Snape = data.Snape;
    let Apple = data.Apple;
    let NN = data.NN;

    // 获取NN inputs
    let leftDirection, frontDirection, rightDirection;
    frontDirection = Snape.direction;
    if (Snape.direction.y == 1) {
        leftDirection = { 'x': 1, 'y': 0 };
        rightDirection = { 'x': -1, 'y': 0 };
    } else if (Snape.direction.y == -1) {
        leftDirection = { 'x': -1, 'y': 0 };
        rightDirection = { 'x': 1, 'y': 0 };
    } else if (Snape.direction.x == 1) {
        leftDirection = { 'x': 0, 'y': -1 };
        rightDirection = { 'x': 0, 'y': 1 };
    } else if (Snape.direction.x == -1) {
        leftDirection = { 'x': 0, 'y': 1 };
        rightDirection = { 'x': 0, 'y': -1 };
    }
    let left = {
        'x': Snape.body[0].x + leftDirection.x,
        'y': Snape.body[0].y + leftDirection.y
    };
    let front = {
        'x': Snape.body[0].x + frontDirection.x,
        'y': Snape.body[0].y + frontDirection.y
    };
    let right = {
        'x': Snape.body[0].x + rightDirection.x,
        'y': Snape.body[0].y + rightDirection.y
    };
    let nninputs = [0, 0, 0];
    // 墙壁探测
    if (left.x < 0 || left.x > 24 || left.y < 0 || left.y > 24) {
        nninputs[0] = 1
    };
    if (front.x < 0 || front.x > 24 || front.y < 0 || front.y > 24) {
        nninputs[1] = 1
    };
    if (right.x < 0 || right.x > 24 || right.y < 0 || right.y > 24) {
        nninputs[2] = 1
    };
    for (let i = 0; i < Snape.body.length; i++) {
        if (hitCheck(left, Snape.body[i])) {
            nninputs[0] = 1
        }
        if (hitCheck(front, Snape.body[i])) {
            nninputs[1] = 1
        }
        if (hitCheck(right, Snape.body[i])) {
            nninputs[2] = 1
        }
    }
    let nnoutputs = NN.feedForward(nninputs);
    let choice = nnoutputs.indexOf(Math.max.apply(Math, nnoutputs));
    if (choice == 0) {
        Snape.turnLeft();
    } else if (choice == 1) {
        Snape.goStraight();
    } else if (choice == 2) {
        Snape.turnRight();
    }

    // 刷新PlayGround
    PG.clear();
    PG.draw(Snape.body, Snape.color);
    PG.draw([Apple.coordination], Apple.color);
    if (!Snape.live) {
        clearInterval(play);
    }
}


function print(str) {
    document.getElementById('console').innerHTML = str;
}

function hitCheck(a, b) {
    if (a.x == b.x && a.y == b.y) {
        return true;
    } else {
        return false;
    }
}

function seedGen() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

