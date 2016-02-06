function outOfBoundariesCheck(i, j) {
    if (
        (i < 1 || i > this.n) ||
        (j < 1 || j > this.n)
    ) {
        throw new Error(`Index out of bounds (${i},${j})`);
    }
}

function Percolation(n) {
    if (n <= 0) {
        throw new Error('Illegal argument: "n" cannot be lesser than 1');
    }
    this.n = n;
    this.items = [];
    for (var i = 0; i < this.n; i++) {
        this.items[i] = [];
        for (var j = 0; j < this.n; j++) {
            this.items[i][j] = i * this.n + j;
        }
    }
}

Percolation.prototype = {
    open(i, j) {
        outOfBoundariesCheck(i, j);
    },

    isOpen(i, j) {
        outOfBoundariesCheck(i, j);
    },

    isFull(i, j) {
        outOfBoundariesCheck(i, j);
    },

    percolates() {}
};

module.exports = Percolation;
