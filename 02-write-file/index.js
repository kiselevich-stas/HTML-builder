const fs = require('fs');
const path = require('path');
const process = require('process');
const { stdin, stdout } = require('process');

const writeStream = fs.createWriteStream(path.join(__dirname, 'output.txt'));

stdout.write('Waiting for input \n');

stdin.on('data', data => {
    let message = data.toString().trim().toLowerCase();

    if (message == 'exit') {
        process.exit();
    }

    try {
        writeStream.write(data);
    } catch(error) {
        stdout.write('Error during writing to file, aborting.');
        process.exit();
    }
});


process.on('exit', () => {
    stdout.write('Aborting.\n');
});

process.on('SIGINT', () => {
    process.exit();
});