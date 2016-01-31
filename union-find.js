'use strict';

const readline = require('readline');
const colors = require('colors');


function FindUnion(n) {
    this.items = Array.apply(null, { length: n }).map(Function.call, Number);
}

FindUnion.prototype = {
    connected(p, q) {
        return this.items[p] === this.items[q];
    },
    root(p) {
        let i = p;
        while (this.items[i] !== i) {
            i = this.items[i];
        }
        return i;
    },
    union(p, q) {
        if (!this.connected(p, q)) {
            this.items[this.root(q)] = this.root(p);
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


let dots;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the size of the set: ', answer => {
    const n = parseInt(answer);

    if (isNaN(n)) {
        console.error('You entered not a number.');
    }
    else {
        console.log(`N = ${answer}`);
        dots = new FindUnion(n);
        dots.print();
    }

    rl.prompt();
});

rl.setPrompt('> ');

rl.on('line', (input) => {
    const reFunctionCall = /^([^_][\w$]+)\((.*)\);?$/;
    input = input.trim();

    if (input === 'exit') {
        rl.close();
        return;
    }

    let parsedInput = reFunctionCall.exec(input);
    if (parsedInput) {
        let method = parsedInput[1];
        let args = parsedInput[2].split(',').map(Number);
        if (typeof dots[method] === 'function') {
            let result = dots[method](...args);
            result && console.log(result);
            if (method !== 'print') {
                dots.print();
            }
        }
        else {
            console.error(`Method "${method}" doesn't exist`);
        }
    }

    rl.prompt();
});
