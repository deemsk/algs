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


function print(arr) {
    const len = arr.length;
    console.log('\u00B7'.repeat(len));
}

cmd.question('Enter the size of the set: ', (answer) => {
    const n = parseInt(answer);

    if (isNaN(n)) {
        console.error('You entered not a number.');
    }
    else {
        console.log(`N = ${answer}`);
        dataSet = new Percolation(n);
        print(dataSet.items);
    }
});
