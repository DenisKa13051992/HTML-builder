const fs = require('fs');
const path = require('path');

function copyDir(){ 
fs.rm(path.join(__dirname, 'files-copy'), { recursive: true }, ()=>{fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
    if (err) {
      console.error(err)
      return;
    }
  })
fs.readdir(path.join(__dirname, 'files'), (err, files)=>{
    if (err) {
        console.error(err)
        return;
      }
    files.forEach(file => {
    fs.copyFile(`${path.join(__dirname, 'files')}/${file}`, `${path.join(__dirname, 'files-copy')}/${file}`, err => {    
      if(err) throw err;    
    });    
    });
})})
}
copyDir()
