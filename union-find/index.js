'use strict';

const readline = require('readline');
const fs = require('fs');
const colors = require('colors');
const FindUnion = require('./union-find');


function parseLine(line) {
    if (!line) {
        return;
    }

    const reFunctionCall = /^([^_][\w$]+)\((.*)\);?$/;
    const parsedLine = reFunctionCall.exec(line);

    if (parsedLine) {
        return {
            command: parsedLine[1],
            args: parsedLine[2].split(',').map(Number)
        };
    }
    else {
        return {
            command: line,
            args: []
        };
    }
}


let elements;

const inputFileArgument = process.argv[2];

const cmd = readline.createInterface({
    input: inputFileArgument ?
           fs.createReadStream(inputFileArgument) :
           process.stdin,
    output: process.stdout
});


cmd.setPrompt('> ');

cmd.question('Enter the size of the set: ', (answer) => {
    const n = parseInt(answer);

    if (isNaN(n)) {
        console.error('You entered not a number.');
    }
    else {
        console.log(`N = ${answer}`);
        elements = new FindUnion(n);
        elements.print();
    }
    cmd.prompt();
});

cmd.on('line', (line) => {
    line = line.trim();
    const parsedLine = parseLine(line);

    switch (parsedLine.command) {
        case 'exit':
            cmd.close();
            return;

        default:
            if (typeof elements[parsedLine.command] === 'function') {
                let result = elements[parsedLine.command](...parsedLine.args);
                if (typeof result !== 'undefined') {
                    console.log(result);
                }
                if (parsedLine.command === 'union') {
                    elements.print();
                }
            }
            else {
                console.error(`Command "${parsedLine.command}" doesn't exist`);
            }
    }

    cmd.prompt();
});
