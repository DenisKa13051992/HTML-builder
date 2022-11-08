const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');


async function copyFolder(src, whither) {
  await fsPromises.rm(whither, { recursive: true, force: true });
  await fsPromises.mkdir(whither, { recursive: true });
  const files = await fsPromises.readdir(src, { withFileTypes: true });

  
  for (let item of files) {
    const srcName = path.join(src, item.name);
    const whitherName = path.join(whither, item.name);
    if (item.isFile()) {
      await fsPromises.copyFile(srcName, whitherName);
    } else {
      await copyFolder(srcName, whitherName);
    }
  }
}


async function createBunStyles() {
    const bundle = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
  const files = await fsPromises.readdir(path.join(__dirname, 'styles'), { withFileTypes: true });
  for (const item of files) {
    const srcFilePath = path.join(path.join(__dirname, 'styles'), item.name);
    if (item.isFile() && path.extname(srcFilePath) === '.css') {      

      fs.createReadStream(srcFilePath, 'utf8').pipe(bundle);

    }
  }
}


async function createTemplate() {
  await fsPromises.copyFile(path.join(__dirname, 'template.html'), path.join(__dirname, 'project-dist', 'index.html'));
  let htmlInfo = await fsPromises.readFile(path.join(__dirname, 'project-dist', 'index.html'), 'utf-8');
  const files = await fsPromises.readdir(path.join(__dirname, 'components'), { withFileTypes: true });
  
  for (const item of files) {
    const srcFilePath = path.join(path.join(__dirname, 'components'), item.name);
    if (item.isFile() && path.extname(srcFilePath) === '.html') {
      const FileNamesrc = path.parse(srcFilePath).name;
      const htmComponentInfo = await fsPromises.readFile(srcFilePath, 'utf-8');
      htmlInfo = htmlInfo.replace(`{{${FileNamesrc}}}`, htmComponentInfo);
    }
  }

  fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html')).write(htmlInfo);

}


(async () => {
  try {
    
    await fsPromises.rm(path.join(__dirname, 'project-dist'), { recursive: true, force: true });
    await fsPromises.mkdir(path.join(__dirname, 'project-dist'), { recursive: true });
    
    await copyFolder(path.join(__dirname, 'assets'), path.join(__dirname, 'project-dist', 'assets'));
    await createBunStyles();
    await createTemplate();
    
    console.log('Completed!');

  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
})();