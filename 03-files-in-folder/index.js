const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');

readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true})
.then(items => items.forEach(item => {
    if (item.isFile()) {
        const allPath = path.join(__dirname, 'secret-folder', item.name);
        fs.stat(allPath, (err, stats) => {
            const size = +stats.size/1024;
            console.log((item.name).slice(0, (item.name).lastIndexOf('.')) + ' - '
            + path.extname(allPath).slice(1) + ' - ' 
            + size + 'kb')
        })
    }
}));