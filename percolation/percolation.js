'use strict';

const UnionFind = require('../alg-modules/uf-weighted');


function Percolation(n) {
    if (n <= 0) {
        throw new Error('Illegal argument: "n" cannot be lesser than 1');
    }
    this.n = n;
    this.nodes = new UnionFind(this.n * this.n);
}

Percolation.prototype = {
    outOfBoundsCheck(i, j) {
        if (!this._inBounds(i, j)) {
            throw new Error(`Index out of bounds (${i},${j})`);
        }
    },

    _inBounds(i, j) {
        return !(i < 0 || i >= this.n) ||
               !(j < 0 || j >= this.n);
    },

    _addr(i, j) {
        return i * this.n + j;
    },

    _getValue(i, j) {
        this.outOfBoundsCheck(i, j);
        return this.nodes.items[this._addr(i, j)];
    },

    open(i, j) {
        this.outOfBoundsCheck(i, j);
        if (this.isOpen(i, j)) {
            return false;
        }
        let newNodeIndex = this._addr(i, j);
        this.nodes.initNode(newNodeIndex);
        [[i - 1, j], [i, j + 1], [i + 1, j], [i, j - 1]]
            .filter(coords => this._inBounds(...coords) && this.isOpen(...coords))
            .forEach(coords => {
                this.nodes.union(this._addr(...coords), newNodeIndex);
            });
        return true;
    },

    isOpen(i, j) {
        this.outOfBoundsCheck(i, j);
        return Boolean(this._getValue(i, j));
    },

    isFull(i, j) {
        this.outOfBoundsCheck(i, j);
    },

    percolates() {}
};

module.exports = Percolation;
