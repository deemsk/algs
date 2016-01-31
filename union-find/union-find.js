'use strict';

function UnionFind(n) {
    // this.items = Array.apply(null, { length: n }).map(Function.call, Number);
    this.items = [];
    for (var i = 0; i < n; i++) {
        this.items[i] = i;
    }
    this.size = [];
}

UnionFind.prototype = {

    connected(p, q) {
        return this._root(p) === this._root(q);
    },

    _root(i) {
        while (this.items[i] !== i) {
            this.items[i] = this.items[this.items[i]];
            i = this.items[i];
        }
        return i;
    },

    union(p, q) {
        const i = this._root(p);
        const j = this._root(q);
        if (i === j) {
            return;
        }
        if (this.size[i] < this.size[j]) {
            this.items[i] = j;
            this.size[j] += this.size[i];
        }
        else {
            this.items[j] = i;
            this.size[i] += this.size[j];
        }
    },

    print() {
        let sz = [];

        function format(list) {
            const sep = ' '.repeat(3);
            return sep + list.join(sep) + sep;
        }

        console.log(format(Object.keys(this.items)));
        console.log(format(this.items).green);
    }
};

module.exports = UnionFind;
