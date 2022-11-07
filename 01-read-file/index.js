const fs = require('fs');
const path = require('path');

// fs.readFile('./01-read-file/text.txt', 'utf8', (err, data) => {
  
//   console.log(data);
// });

const stream = new fs.createReadStream(path.join(__dirname, 'text.txt'), {encoding:'utf8'});
stream.on('data', (chunk)=> {
    // let data = stream.read();
    console.log(chunk)
})
stream.on('error', error => console.log('Error', error.message));
