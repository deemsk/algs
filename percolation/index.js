'use strict';

const readline = require('readline');
const fs = require('fs');
const colors = require('colors');
const Percolation = require('./percolation');


const inputFileArgument = process.argv[2];
const cmd = readline.createInterface({
    input: inputFileArgument ?
           fs.createReadStream(inputFileArgument) :
           process.stdin,
    output: process.stdout
});

let dataSet;
let n;

function print(debug) {
    const width = 3;

    for (var i = 0; i < n * n; i++) {
        const value = dataSet.nodes.items[i];
        let str;

        if (value === undefined) {
            str = '  \u00B7'.grey;
        }
        else if (debug) {
            str = value.toString();
            str = ' '.repeat(width - str.length) + str;
        }
        else {
            str = '  \u25FC'.green;
        }

        cmd.write(str);
        if ((i + 1) % n === 0) {
            cmd.write('\n');
        }
    }
}

function fillRandomly(num) {
    const size = n * n;
    let sites = [];

    if (num > size) {
        num = size;
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            sites.push([i, j]);
        }
    }

    while (sites.length > size - num) {
        try {
            const i = Math.floor(Math.random() * sites.length);
            const coords = sites.splice(i, 1)[0];
            dataSet.open(...coords);
        } catch (e) {
            console.error(e.message);
            break;
        }
    }
}

cmd.question('Enter the size of the set: ', (answer) => {
    if (!answer.length) {
        n = 10; // default
    }
    else {
        n = parseInt(answer, 10);
    }

    if (isNaN(n)) {
        console.error('You entered not a number.');
    }
    else {
        console.log(`N = ${n}`);
        dataSet = new Percolation(n);
        fillRandomly(14);
        print(false);
        cmd.write('\n\n');
        cmd.close();
    }
});
