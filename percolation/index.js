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


function print(arr, debug) {
    arr.forEach(item => {
        if (Number.isInteger(item)) {
            if (!debug) {
                cmd.write(' \u25FC '.grey);
            }
            else {
                const str = item.toString();
                const width = 3;
                cmd.write(' '.repeat(width - str.length) + str);
            }
        }
        else {
            cmd.write('\n');
            print(item);
        }
    });
}

cmd.question('Enter the size of the set: ', (answer) => {
    let n;
    if (!answer.length) {
        n = 5; // default
    }
    else {
        n = parseInt(answer, 10);
    }

    if (isNaN(n)) {
        console.error('You entered not a number.');
    }
    else {
        console.log(`N = ${answer}`);
        dataSet = new Percolation(n);
        print(dataSet.items);
        cmd.write('\n\n');
        cmd.close();
    }
});
