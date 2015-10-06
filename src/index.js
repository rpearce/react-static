import path from 'path';
import handlebars from 'handlebars';
import marked from 'marked';
import fsp from 'fs-promise';

const buildPath = '_site';
const postsPath = path.join(__dirname, 'posts');
const layoutPath = path.join(__dirname, 'layout.html');

function filterMdFiles(files) {
  return files.filter(file => { return file.match(/.md|.markdown/); });
}

async function outputMdFileAsHTML(mdFilename) {
  var mdFilePath = path.join(postsPath, mdFilename);
  var mdData = await fsp.readFile(mdFilePath, 'utf8');
  var mdHTML = marked(mdData);
  var layout = await fsp.readFile(layoutPath, 'utf8');
  var template = handlebars.compile(layout);
  var html = template({ markup: mdHTML });
  await fsp.writeFile(`${buildPath}/${mdFilename.split('.')[0]}.html`, html, 'utf8');
}

async () => {
  try {
    await fsp.mkdir(buildPath);
    const files = await fsp.readdir(postsPath);
    const mdFilenames = filterMdFiles(files);
    for (let mdFilename of mdFilenames) {
      await outputMdFileAsHTML(mdFilename);
    }
  } catch (err) {
    console.error(err);
  }
}();
