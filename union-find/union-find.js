'use strict';

function FindUnion(n) {
    this.items = Array.apply(null, { length: n }).map(Function.call, Number);
}

FindUnion.prototype = {

    connected(p, q) {
        return this._root(p) === this._root(q);
    },

    _root(i) {
        while (this.items[i] !== i) {
            i = this.items[i];
        }
        return i;
    },

    union(p, q) {
        if (!this.connected(p, q)) {
            this.items[this._root(p)] = this._root(q);
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

module.exports = FindUnion;
