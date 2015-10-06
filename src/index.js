import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import marked from 'marked';

const buildPath = '_site';
const postsPath = path.join(__dirname, 'posts');
const layoutPath = path.join(__dirname, 'layout.html');

async function mkDir(path) {
  return new Promise(function(resolve, reject) {
    fs.mkdir(path, function(err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
}

async function readDir(path) {
  return new Promise(function(resolve, reject) {
    fs.readdir(path, function(err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
}

async function readFile(path) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path, 'utf8', function(err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
}

async function writeFile(path, content) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(path, content, 'utf8', function(err, data) {
      if (err) reject(err);
      resolve(data);
    });
  });
}

function filterMdFiles(files) {
  return files.filter(file => { return file.match(/.md|.markdown/); });
}

async () => {
  try {
    await mkDir(buildPath);
    const files = await readDir(postsPath);
    const mdFilenames = filterMdFiles(files);
    for (let mdFilename of mdFilenames) {
      let mdFilePath = path.join(postsPath, mdFilename);
      let mdData = await readFile(mdFilePath);
      let mdHTML = marked(mdData);

      let layout = await readFile(layoutPath);
      let template = handlebars.compile(layout);
      let html = template({ markup: mdHTML });
      await writeFile(`${buildPath}/${mdFilename.split('.')[0]}.html`, html);
    }
  } catch (err) {
    console.error(err);
  }
}()


//fs.readdir(postsPath, function(err, files) {
//  if (err) throw err;

//  files
//    .filter(function(file) { return file.match(/.md|.markdown/); })
//    .forEach(function(name) {
//      const filePath = path.join(postsPath, name);

//      fs.readFile(filePath, 'utf8', function(err, data) {
//        if (err) throw err;
//        const markdownHTML = marked(data);

//        fs.readFile(layoutPath, 'utf8', function(err, data) {
//          const template = handlebars.compile(data);

//          console.log(template({ markup: markdownHTML }));
//        });
//      });
//    });
//});


//fs.readdir(postsPath, function(err, files) {
//  if (err) throw err;

//  files
//    .filter(function(file) { return file.match(/.md|.markdown/); })
//    .forEach(function(name) {
//      const filePath = path.join(postsPath, name);

//      fs.readFile(filePath, 'utf8', function(err, data) {
//        if (err) throw err;
//        const markdownHTML = marked(data);

//        fs.readFile(layoutPath, 'utf8', function(err, data) {
//          const template = handlebars.compile(data);

//          console.log(template({ markup: markdownHTML }));
//        });
//      });
//    });
//});
