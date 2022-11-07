const path = require('path');
const fs = require('fs/promises');
const { createWriteStream, createReadStream } = require('fs');

  const bundle = createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'), 'utf-8');
  fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true })
  .then((items) => items.forEach(item => {
    if (item.isFile() && path.extname(item.name) === '.css') {
      (createReadStream(path.join(path.join(__dirname, 'styles'), item.name), 'utf-8')).on('data', (chunk)=>{
          bundle.write(chunk)
      })
    }
  }))
