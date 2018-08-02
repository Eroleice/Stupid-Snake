class DNA {
    constructor(str) {
        let obj = JSON.parse(str);
        this.data = obj;
        this.length = this.data.length;
    }

    printDNA() {
        return JSON.stringify(this.data);
    }

    mutate(rate) {
        if (Math.random() < rate) {
            let i = Math.floor(Math.random() * this.data.length);
            let j = Math.floor(Math.random() * this.data[i].length);
            let m = Math.floor(Math.random() * this.data[i][j].length);
            let n = Math.floor(Math.random() * this.data[i][j][m].length);
            this.data[i][j][m][n] = Math.random() * 2 - 1;
        }
    }
}

function crossDNA(strA, strB) {
    let a = new DNA(strA);
    let b = new DNA(strB);
    if (a.length !== b.length) {
        console.log('DNA length does not match, unable to cross!');
        return undefined;
    }
    let choice = [a, b];
    let arr = [];
    for (let i = 0; i < a.length; i++) {
        arr.push([]);
    }
    let d = new DNA(JSON.stringify(arr));
    for (let j = 0; j < d.length; j++) {
        d.data[j] = choice[Math.floor(Math.random() * 2)].data[j];
    }
    return d.printDNA();
}

function mutateDNA(str, rate, t) {
    let d = new DNA(str);
    for (let i = 0; i < t; i++) {
        d.mutate(rate);
    }
    return d.printDNA();
}