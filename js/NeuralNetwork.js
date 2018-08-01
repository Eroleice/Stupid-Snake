class NeuralNetwork {
    constructor(inputNodes, hiddenNodes, outputNodes) {
        this.inputNodes = inputNodes;
        this.hiddenNodes = hiddenNodes;
        this.outputNodes = outputNodes;

        // 权重
        this.weights = {
            'ih': new Matrix(this.hiddenNodes, this.inputNodes),
            'ho': new Matrix(this.outputNodes, this.hiddenNodes)
        };
        this.weights.ih.randomize();
        this.weights.ho.randomize();

        // 偏差值
        this.bias = {
            'h': new Matrix(this.hiddenNodes, 1),
            'o': new Matrix(this.outputNodes, 1)
        };
        this.bias.h.randomize();
        this.bias.o.randomize();
    }

    feedForward(arr) {

        // 建立 Inputs Nodes
        let inputs = Matrix.fromArray(arr);

        // 建立 Hidden Nodes
        let hidden = Matrix.multiply(this.weights.ih, inputs);
        hidden.add(this.bias.h);
        hidden.map(sigmoid);

        // 建立 Outputs Nodes
        let outputs = Matrix.multiply(this.weights.ho, hidden);
        outputs.add(this.bias.o);
        outputs.map(sigmoid);

        // 返回结果
        return outputs.toArray();
    }

    applyDNA(DNA) {
        let data = JSON.parse(DNA);
        this.weights.ih = Matrix.fromObj(data[0][0]);
        this.weights.ho = data[0][1];
        this.bias.h = data[1][0];
        this.bias.o = data[1][1];
    }
}

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}