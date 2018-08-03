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
var frame = 50;
var bestDNA = '';
var loop;
var isPause = false;

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
    // population[j].path.Snape = JSON.parse(JSON.stringify(population[j].Snape.path));
    // population[j].path.Apple = JSON.parse(JSON.stringify(population[j].Apple.path));

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
    bestDNA = population[0].DNA;
    let perfect = [];
    for (let i = 0; i < 5; i++) {
        perfect[i] = population[0].DNA;
        population.shift();
    }
    let excellent = [];
    for (let j = 0; j < 10; j++) {
        excellent[j] = population[0].DNA;
        population.shift();
    }
    let good = [];
    for (let k = 0; k < 10; k++) {
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

function newAge(adoptDNA = null) {

    // 选取母体
    parentsPool = chooseParents(population);

    // 添加DNA
    if (adoptDNA !== null) {
        parentsPool[0] = adoptDNA;
    }

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
            'ID': '#' + snakeCount,
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
        // population[j].path.Snape = JSON.parse(JSON.stringify(population[j].Snape.path));
        // population[j].path.Apple = JSON.parse(JSON.stringify(population[j].Apple.path));

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
    loop = setInterval(newAge, 3000);
}

function stopGenLoop() {
    clearInterval(loop);
}

function showBestDNA() {
    document.getElementById('dna').value = bestDNA;
}

function adoptDNA() {
    bestDNA = document.getElementById('dna').value;
    newAge(bestDNA);
}

function exampleDNA() {
    document.getElementById('dna').value = '[[[[-0.29745993863601183,-0.43329790336314855,-0.8450761914256811,0.5448891465541092],[0.050213629412843686,0.8268834352059158,-0.8320995060546824,-0.5648793463240275],[0.4594545553722571,-0.6878203329164658,0.18696056368542346,-0.7836361998894884],[0.17610188114059766,-0.807809237076944,-0.7002388242081529,-0.3778978639982752],[0.8197170784472794,0.4355345460116864,0.37325928702852185,-0.5983048996455171],[0.1795881067638443,-0.8683526264941185,0.6975122445883231,-0.9159684084892505],[0.6561295285631001,-0.6578566290739374,0.23669427545351462,0.07815320383793911],[0.3871266106401694,-0.6644924001480501,-0.6146465832791501,-0.8876444977529283],[0.08463844727514558,0.14896429686324875,-0.4077162148337322,-0.030960658571865807],[0.3792161720638745,0.9551251674381527,0.7837669728073704,0.18249818493610226],[0.7313274962163558,0.8863269990856562,0.2734479838623425,-0.23881669985582],[-0.5832477822633106,0.559592847499524,-0.08637364409584491,0.38655575618983207]],[[0.6897869074400866,-0.36262672334203383,-0.9267891125370354,-0.2269664322866125,0.9825227363835087,0.912321575182248,-0.7030107698254986,-0.40545395120156613,-0.7916299492486657,-0.006796871422283246,0.46647269908212596,0.8495019888868933],[-0.2922804385831925,-0.862477456032177,0.5593339824872816,0.1248830643954213,0.2017646553973289,-0.4547968205599059,0.45595414982763116,-0.3182952657671585,-0.14805814807480033,-0.048363564923301405,0.8421388039421298,0.5637864605270175],[-0.7004393037283015,0.47739449043694737,0.2315348126521466,-0.06284833706314796,-0.30321648021388203,-0.6334263504574016,0.08242621635017477,0.832383745920231,0.8237584652063428,0.40335983052499813,-0.6644853890021087,0.14832589744864988]]],[[[-0.3694491312040086],[-0.6700005127363114],[-0.056945255301241726],[0.8097918407035516],[-0.8721575546129032],[-0.4318412048350717],[0.7098443286209921],[-0.7920058067609659],[-0.3663205728855038],[0.9474425485162561],[0.2842383649635445],[0.10146575060218566]],[[-0.06664501029756464],[-0.7183784208691726],[-0.360143326348789]]]]';
}