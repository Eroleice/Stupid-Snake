var population = [];
var snakeCount = 1;
var age = 0;
var bestSnake = {
    'ID': null,
    'DNA': null,
    'fitness': 0
};
var DNAPool = [];
var parentsPool = [];
var frame = 10;
var loop;

var PG = new PlayGround('canvas');
PG.clear();
var play = null;

population = [];

for (let i = 0; i < 50; i++) {

    let seed = seedGen();

    population[i] = {
        'ID': '#' + snakeCount,
        'Seed': seed,
        'Snape': new Snake(i, seed),
        'Apple': new Fruit(i, seed),
        'NN': new NeuralNetwork(4, 12, 3),
        'DNA': null,
        'fitness': 0,
        'path': {
            'Snape': null,
            'Apple': null
        }
    };
    population[i].DNA = population[i].NN.printDNA();
    
    snakeCount += 1;
}

for (let j = 0; j < population.length; j++) {

    population[j].Apple.spawn();

    while (population[j].Snape.live) {
        update(population[j], false);
    }

    population[j].fitness = population[j].Snape.movements + (population[j].Snape.body.length - 5) * 250;
    population[j].path.Snape = JSON.parse(JSON.stringify(population[j].Snape.path));
    population[j].path.Apple = JSON.parse(JSON.stringify(population[j].Apple.path));

    document.getElementById('population-list').innerHTML += '<p class="snakes" onclick="releaseSnake(' + j + ')">' + population[j].ID + ' Fitness: ' + population[j].fitness + '.</p>';
}

function releaseSnake(num) {
    if (play !== null) {
        clearInterval(play);
    }

    let Snape = population[num].Snape;
    let Apple = population[num].Apple;
    let NN = population[num].NN;

    Snape.raise(); // 复活!
    Apple.raise();

    // 刷新PlayGround
    PG.clear();
    PG.draw(Snape.body, Snape.color);
    PG.draw([Apple.coordination], Apple.color);

    play = setInterval(update, frame, population[num]);
}


function update(data, draw = true) {
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
    let angle = fruitAngle(Snape, Apple); // 苹果和前进方向的角度 - 0为前方, -0.5为正左, 0.5为正右, 1为正后.
    let nninputs = [0, 0, 0, angle];
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
    // 身体检测
    if (Snape.body.length > 4) {
        for (let i = 3; i < (Snape.body.length - 1); i++) {
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
    }
    // console.log(JSON.stringify(nninputs));
    let nnoutputs = NN.feedForward(nninputs);
    let choice = nnoutputs.indexOf(Math.max.apply(Math, nnoutputs));
    if (choice == 0) {
        Snape.turnLeft();
    } else if (choice == 1) {
        Snape.goStraight();
    } else if (choice == 2) {
        Snape.turnRight();
    }

    if (draw) {
        // 刷新PlayGround
        PG.clear();
        PG.draw(Snape.body, Snape.color);
        PG.draw([Apple.coordination], Apple.color);
    }
    
    if (!Snape.live && play !== null) {
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

function chooseParents(population) {
    population.sort(function (a, b) {
        return b.fitness - a.fitness;
    });
    let perfect = [];
    for (let i = 0; i < 2; i++) {
        perfect[i] = population[0].DNA;
        population.shift();
    }
    let excellent = [];
    for (let j = 0; j < 8; j++) {
        excellent[j] = population[0].DNA;
        population.shift();
    }
    let good = [];
    for (let k = 0; k < 15; k++) {
        good[k] = population[0].DNA;
        population.shift();
    }
    shuffle(perfect);
    shuffle(excellent);
    shuffle(good);
    let chosen = [perfect[0], perfect[1], excellent[0], excellent[1], good[0]];
    return chosen;
}

function randomCross(chosen) {
    shuffle(chosen);
    let dna = crossDNA(chosen[0], chosen[1]);
    return dna;
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function newAge() {

    // 选取5个母体
    parentsPool = chooseParents(population);

    // 重置population
    population = [];

    // 添加child
    for (let i = 0; i < 40; i++) {

        let seed = seedGen();

        let dna = randomCross(parentsPool);
        let mutatedDNA = mutateDNA(dna, 0.2, 5);

        population[i] = {
            'ID': '#' + snakeCount,
            'Seed': seed,
            'Snape': new Snake(i, seed),
            'Apple': new Fruit(i, seed),
            'NN': new NeuralNetwork(4, 12, 3, mutatedDNA),
            'DNA': mutatedDNA,
            'fitness': 0,
            'path': {
                'Snape': null,
                'Apple': null
            }
        };

        snakeCount += 1;

    }

    // 添加母体
    for (let m = 0; m < parentsPool.length; m++) {
        let seed = seedGen();
        let dna = parentsPool[m];
        population.push({
            'ID': '&' + snakeCount,
            'Seed': seed,
            'Snape': new Snake((m+40), seed),
            'Apple': new Fruit((m+40), seed),
            'NN': new NeuralNetwork(4, 12, 3, dna),
            'DNA': dna,
            'fitness': 0,
            'path': {
                'Snape': null,
                'Apple': null
            }
        });
        snakeCount += 1;
    }

    // 添加母体变异
    for (let n = 0; n < parentsPool.length; n++) {
        let seed = seedGen();
        let dna = parentsPool[n];
        let mutatedDNA = mutateDNA(dna, 1, 2);
        population.push({
            'ID': '#' + snakeCount,
            'Seed': seed,
            'Snape': new Snake((n+45), seed),
            'Apple': new Fruit((n+45), seed),
            'NN': new NeuralNetwork(4, 12, 3, mutatedDNA),
            'DNA': mutatedDNA,
            'fitness': 0,
            'path': {
                'Snape': null,
                'Apple': null
            }
        });
        snakeCount += 1;
    }

    document.getElementById('population-list').innerHTML = '';

    for (let j = 0; j < population.length; j++) {

        population[j].Snape.raise();
        population[j].Apple.raise();

        while (population[j].Snape.live) {
            update(population[j], false);
        }

        population[j].fitness = population[j].Snape.movements + (population[j].Snape.body.length - 5) * 250;
        population[j].path.Snape = JSON.parse(JSON.stringify(population[j].Snape.path));
        population[j].path.Apple = JSON.parse(JSON.stringify(population[j].Apple.path));

        document.getElementById('population-list').innerHTML += '<p class="snakes" onclick="releaseSnake(' + j + ')">' + population[j].ID + ' Fitness: ' + population[j].fitness + '.</p>';
    }

}

function fruitAngle(Snape, Apple) {
    let origin = Snape.body[0];
    let front = Snape.direction;
    let fruit = {
        'x': Apple.coordination.x - origin.x,
        'y': Apple.coordination.y - origin.y
    };
    let radian = Math.atan2(fruit.y, fruit.x) - Math.atan2(front.y, front.x);
    let degree = radian * 180 / Math.PI;
    return Math.round((degree / 180) * 10000) / 10000;
}

function startGenLoop() {
    loop = setInterval(newAge, 1000);
}

function stopGenLoop() {
    clearInterval(loop);
}