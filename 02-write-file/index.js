const fs = require('fs');
const path = require('path');
const { stdout, stdin } = require("process");

stdout.write('Привет! Самое время ввести какой-нибудь текст или exit для выхода\n');
const writeStream = new fs.createWriteStream(path.join(__dirname, 'new-text.txt'), {encoding:'utf8'});
stdin.on('data', (chunk)=> {
    if (chunk.toString().trim() === 'exit') {
        stdout.write("\nНормально же общались(\n")
        process.exit();}
        writeStream.write(chunk)
        stdout.write("Если нашлись дела поважнее, введите exit\n")
        
    })
process.on('exit', () => stdout.write('Хорошего дня!\n'));
process.on('SIGINT', () => process.exit());

